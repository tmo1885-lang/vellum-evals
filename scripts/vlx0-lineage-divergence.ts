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

const planText=await Bun.file("scripts/vlx0-lineage-divergence-plan.json").text();
const plan=JSON.parse(planText) as any;
const driver=await Bun.file("scripts/vlx0-lineage-divergence-driver.template.txt").text();
const out:Record<string,unknown>={};

for(const arm of plan.arms){
  const profile=await loadProfile("vellum-vlx0-neutral");
  const runId="vlx0-lineage-divergence-"+arm.id+"-"+Date.now();
  const agent=createVellumAgent(
    {profile,testId:"vlx0-lineage-divergence-"+arm.id,runId},
    {processEnv:{...process.env,EVALS_EGRESS_USE_DEFAULT_BRIDGE:"1"}},
  );
  try{
    await agent.hatch();
    await agent.writeWorkspaceFile!({
      path:"users/user-a.md",
      content:"# User Profile\n\n- Preferred name/reference: User A\n- Relationship: guardian / primary user\n",
    });
    await agent.writeWorkspaceFile!({path:"vlx0-lineage-divergence-plan.json",content:planText});
    await agent.writeWorkspaceFile!({path:"vlx0-lineage-divergence-driver.ts",content:driver});
    await agent.writeWorkspaceFile!({path:"vlx0-lineage-divergence-config.json",content:JSON.stringify({arm:arm.id})});
    for(const episode of arm.episodes){
      await agent.writeWorkspaceFile!({path:"history/"+episode.supportName,content:episode.support});
    }
    for(const [name,fileContent] of Object.entries(plan.target.files)){
      await agent.writeWorkspaceFile!({path:"case/"+name,content:String(fileContent)});
    }
    const run=await execVellum(["exec",agent.id,"--","bun","/workspace/vlx0-lineage-divergence-driver.ts"],true);
    const artifact=run.code===0
      ?"/workspace/data/vlx0-lineage-divergence-result.json"
      :"/workspace/data/vlx0-lineage-divergence-error.json";
    const res=await execVellum(["exec",agent.id,"--","cat",artifact]);
    if(res.code!==0)throw new Error("could not read artifact for "+arm.id);
    out[arm.id]=JSON.parse(res.stdout);
  }catch(err){
    out[arm.id]={error:true,outerError:err instanceof Error?err.message:String(err)};
  }finally{
    await agent.shutdown();
  }
}
await writeFile("VLX0_LINEAGE_DIVERGENCE_RAW.json",JSON.stringify(out,null,2)+"\n");
console.log(JSON.stringify(out,null,2));
