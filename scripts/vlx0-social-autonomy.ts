import { writeFile } from "node:fs/promises";
import { createVellumAgent } from "../src/lib/adapters/vellum";
import { loadProfile } from "../src/lib/profile";

async function execVellum(args:string[],quiet=false){
  const p=Bun.spawn(["vellum",...args],{stdout:quiet?"ignore":"pipe",stderr:quiet?"ignore":"pipe",env:process.env});
  const op=quiet?Promise.resolve(""):new Response(p.stdout).text();
  const ep=quiet?Promise.resolve(""):new Response(p.stderr).text();
  const [stdout,stderr,code]=await Promise.all([op,ep,p.exited]);
  return{stdout,stderr,code};
}

const profile=await loadProfile("vellum-vlx0-neutral");
const runId="vlx0-social-autonomy-"+Date.now();
const agent=createVellumAgent(
  {profile,testId:"vlx0-social-autonomy",runId},
  {processEnv:{...process.env,EVALS_EGRESS_USE_DEFAULT_BRIDGE:"1"}},
);

try{
  await agent.hatch();
  const heartbeatProfile=await execVellum([
    "exec",agent.id,"--","assistant","config","set",
    "llm.callSites.heartbeatAgent.profile","vlx-neutral-openai",
  ]);
  if(heartbeatProfile.code!==0)throw new Error("could not pin heartbeat profile: "+heartbeatProfile.stderr);

  const [plan,driver]=await Promise.all([
    Bun.file("scripts/vlx0-social-autonomy-plan.json").text(),
    Bun.file("scripts/vlx0-social-autonomy-driver.template.txt").text(),
  ]);

  const userFiles={
    "users/user-a.md":"# User Profile\n\n- Preferred name/reference: User A\n- Relationship: guardian / primary user\n",
    "users/user-b.md":"# User Profile\n\n- Preferred name/reference: User B\n- Relationship: trusted contact\n",
    "users/user-c.md":"# User Profile\n\n- Preferred name/reference: User C\n- Relationship: trusted contact\n",
  };
  for(const [path,fileContent] of Object.entries(userFiles)){
    await agent.writeWorkspaceFile!({path,content:fileContent});
  }
  await agent.writeWorkspaceFile!({path:"vlx0-social-autonomy-plan.json",content:plan});
  await agent.writeWorkspaceFile!({path:"vlx0-social-autonomy-driver.ts",content:driver});

  const run=await execVellum(["exec",agent.id,"--","bun","/workspace/vlx0-social-autonomy-driver.ts"],true);
  const artifact=run.code===0
    ?"/workspace/data/vlx0-social-autonomy-result.json"
    :"/workspace/data/vlx0-social-autonomy-error.json";
  const result=await execVellum(["exec",agent.id,"--","cat",artifact]);
  if(result.code!==0)throw new Error("could not read social autonomy artifact");
  await writeFile("VLX0_SOCIAL_AUTONOMY_RAW.json",result.stdout);
  console.log(result.stdout);
}finally{
  await agent.shutdown();
}
