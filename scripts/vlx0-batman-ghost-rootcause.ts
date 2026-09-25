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
const runId="vlx0-batman-ghost-rootcause-"+Date.now();
const agent=createVellumAgent({profile,testId:"vlx0-batman-ghost-rootcause",runId});
try{
 await agent.hatch();
 await agent.writeWorkspaceFile!({path:"users/user-a.md",content:"# User Profile\n\n- Preferred name/reference: User A\n- Relationship: guardian / primary user\n"});
 const [plan,driver]=await Promise.all([
   Bun.file("scripts/vlx0-batman-ghost-rootcause-plan.json").text(),
   Bun.file("scripts/vlx0-batman-ghost-rootcause-driver.template.txt").text()
 ]);
 await agent.writeWorkspaceFile!({path:"vlx0-batman-ghost-rootcause-plan.json",content:plan});
 await agent.writeWorkspaceFile!({path:"vlx0-batman-ghost-rootcause-driver.ts",content:driver});
 const run=await execVellum(["exec",agent.id,"--","bun","/workspace/vlx0-batman-ghost-rootcause-driver.ts"],true);
 if(run.code!==0){
   const er=await execVellum(["exec",agent.id,"--","sh","-lc","cat /workspace/data/vlx0-batman-ghost-rootcause-error.json 2>/dev/null || true"]);
   await writeFile("VLX0_BATMAN_GHOST_ROOTCAUSE_ERROR.json",er.stdout);
   throw new Error("Batman ghost driver failed "+run.code+": "+er.stdout.slice(0,2000));
 }
 const res=await execVellum(["exec",agent.id,"--","cat","/workspace/data/vlx0-batman-ghost-rootcause-result.json"]);
 if(res.code!==0) throw new Error("could not read ghost result: "+res.stderr);
 await writeFile("VLX0_BATMAN_GHOST_ROOTCAUSE_RAW.json",res.stdout);
 console.log(res.stdout);
} finally { await agent.shutdown(); }
