import { writeFile } from "node:fs/promises";

import { createVellumAgent } from "../src/lib/adapters/vellum";
import { loadProfile } from "../src/lib/profile";

async function execVellum(args:string[],quiet=false){
  const p=Bun.spawn(["vellum",...args],{
    stdout:quiet?"ignore":"pipe",
    stderr:quiet?"ignore":"pipe",
    env:process.env,
  });
  const stdoutP=quiet?Promise.resolve(""):new Response(p.stdout).text();
  const stderrP=quiet?Promise.resolve(""):new Response(p.stderr).text();
  const [stdout,stderr,code]=await Promise.all([stdoutP,stderrP,p.exited]);
  return {stdout,stderr,code};
}

const profile=await loadProfile("vellum-vlx0");
const runId="vlx0-multiuser-scope-"+Date.now();
const agent=createVellumAgent({
  profile,
  testId:"vlx0-multiuser-scope",
  runId,
});

try{
  await agent.hatch();

  const [plan,driver]=await Promise.all([
    Bun.file("scripts/vlx0-multiuser-scope-plan.json").text(),
    Bun.file("scripts/vlx0-multiuser-scope-driver.template.txt").text(),
  ]);

  const userFiles={
    "users/user-a.md":"# User Profile\n\n- Preferred name/reference: User A\n- Relationship: guardian / primary user\n",
    "users/user-b.md":"# User Profile\n\n- Preferred name/reference: User B\n- Relationship: trusted contact\n",
    "users/user-c.md":"# User Profile\n\n- Preferred name/reference: User C\n- Relationship: trusted contact\n",
    "users/user-d.md":"# User Profile\n\n- Preferred name/reference: User D\n- Relationship: trusted contact\n",
  };

  for(const [path,content] of Object.entries(userFiles)){
    await agent.writeWorkspaceFile!({path,content});
  }
  await agent.writeWorkspaceFile!({path:"vlx0-multiuser-scope-plan.json",content:plan});
  await agent.writeWorkspaceFile!({path:"vlx0-multiuser-scope-driver.ts",content:driver});

  const run=await execVellum([
    "exec",agent.id,"--","bun","/workspace/vlx0-multiuser-scope-driver.ts"
  ],true);
  if(run.code!==0) throw new Error("multiuser scope driver failed code "+run.code);

  const result=await execVellum([
    "exec",agent.id,"--","cat","/workspace/data/vlx0-multiuser-scope-result.json"
  ]);
  if(result.code!==0) throw new Error("could not read multiuser result: "+result.stderr);

  await writeFile("VLX0_MULTIUSER_SCOPE_RAW.json",result.stdout);
  console.log(result.stdout);
} finally {
  await agent.shutdown();
}
