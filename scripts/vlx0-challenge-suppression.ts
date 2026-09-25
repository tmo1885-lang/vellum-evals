import { writeFile } from "node:fs/promises";
import { createVellumAgent } from "../src/lib/adapters/vellum";
import { loadProfile } from "../src/lib/profile";

type Arm={label:string;profileId:string;soften:boolean};
const planObj=JSON.parse(await Bun.file("scripts/vlx0-challenge-suppression-plan.json").text()) as {arms:Arm[]};
const plan=await Bun.file("scripts/vlx0-challenge-suppression-plan.json").text();
const driver=await Bun.file("scripts/vlx0-challenge-suppression-driver.template.txt").text();
async function execVellum(args:string[],quiet=false){const p=Bun.spawn(["vellum",...args],{stdout:quiet?"ignore":"pipe",stderr:quiet?"ignore":"pipe",env:process.env});const op=quiet?Promise.resolve(""):new Response(p.stdout).text();const ep=quiet?Promise.resolve(""):new Response(p.stderr).text();const [stdout,stderr,code]=await Promise.all([op,ep,p.exited]);return{stdout,stderr,code};}
const out:Record<string,unknown>={};
for(const spec of planObj.arms){
 const profile=await loadProfile(spec.profileId);const runId="vlx0-8b-"+spec.label+"-"+Date.now();const agent=createVellumAgent({profile,testId:"vlx0-8b-"+spec.label,runId});
 try{
  await agent.hatch();
  await agent.writeWorkspaceFile!({path:"users/user-a.md",content:"# User Profile\n\n- Preferred name/reference: User A\n- Relationship: guardian / primary user\n"});
  await agent.writeWorkspaceFile!({path:"vlx0-challenge-suppression-plan.json",content:plan});
  await agent.writeWorkspaceFile!({path:"vlx0-challenge-suppression-driver.ts",content:driver});
  await agent.writeWorkspaceFile!({path:"vlx0-challenge-suppression-config.json",content:JSON.stringify(spec)});
  const run=await execVellum(["exec",agent.id,"--","bun","/workspace/vlx0-challenge-suppression-driver.ts"],true);
  if(run.code!==0)throw new Error(spec.label+" failed with code "+run.code);
  const result=await execVellum(["exec",agent.id,"--","cat","/workspace/data/vlx0-challenge-suppression-result.json"]);
  if(result.code!==0)throw new Error("read "+spec.label+" failed: "+result.stderr);
  out[spec.label]=JSON.parse(result.stdout);
 }finally{await agent.shutdown();}
}
await writeFile("VLX0_CHALLENGE_SUPPRESSION_RAW.json",JSON.stringify(out,null,2)+"\n");
console.log(JSON.stringify(out,null,2));
