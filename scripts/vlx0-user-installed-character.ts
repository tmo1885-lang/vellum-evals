import { writeFile } from "node:fs/promises";
import { createVellumAgent } from "../src/lib/adapters/vellum";
import { loadProfile } from "../src/lib/profile";

const personaIds = ["batman","pirate","evil-lex"] as const;
async function execVellum(args:string[], quiet=false){
  const p=Bun.spawn(["vellum",...args],{stdout:quiet?"ignore":"pipe",stderr:quiet?"ignore":"pipe",env:process.env});
  const op=quiet?Promise.resolve(""):new Response(p.stdout).text();
  const ep=quiet?Promise.resolve(""):new Response(p.stderr).text();
  const [stdout,stderr,code]=await Promise.all([op,ep,p.exited]);
  return {stdout,stderr,code};
}
const plan=await Bun.file("scripts/vlx0-user-installed-character-plan.json").text();
const driver=await Bun.file("scripts/vlx0-user-installed-character-driver.template.txt").text();
const out:Record<string,unknown>={};
for(const personaId of personaIds){
  const profile=await loadProfile("vellum-vlx0-neutral");
  const runId="vlx0-user-character-"+personaId+"-"+Date.now();
  const agent=createVellumAgent({profile,testId:"vlx0-user-character-"+personaId,runId});
  try{
    await agent.hatch();
    await agent.writeWorkspaceFile!({path:"users/user-a.md",content:"# User Profile\n\n- Preferred name/reference: User A\n- Relationship: guardian / primary user\n"});
    await agent.writeWorkspaceFile!({path:"vlx0-user-installed-character-plan.json",content:plan});
    await agent.writeWorkspaceFile!({path:"vlx0-user-installed-character-driver.ts",content:driver});
    await agent.writeWorkspaceFile!({path:"vlx0-user-installed-character-config.json",content:JSON.stringify({personaId})});
    const run=await execVellum(["exec",agent.id,"--","bun","/workspace/vlx0-user-installed-character-driver.ts"],true);
    if(run.code!==0) throw new Error(personaId+" driver failed with code "+run.code);
    const res=await execVellum(["exec",agent.id,"--","cat","/workspace/data/vlx0-user-installed-character-result.json"]);
    if(res.code!==0) throw new Error("read "+personaId+" result failed: "+res.stderr);
    out[personaId]=JSON.parse(res.stdout);
  } finally {
    await agent.shutdown();
  }
}
await writeFile("VLX0_USER_INSTALLED_CHARACTERS_RAW.json",JSON.stringify(out,null,2)+"\n");
console.log(JSON.stringify(out,null,2));
