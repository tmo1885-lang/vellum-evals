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

const planText=await Bun.file("scripts/vlx0-inquiry-lifecycle-plan.json").text();
const plan=JSON.parse(planText) as any;
const driver=await Bun.file("scripts/vlx0-inquiry-lifecycle-driver.template.txt").text();
const out:Record<string,unknown>={};
const requestedArm=process.env.VLX14_ARM?.trim();
const selectedArms=requestedArm?plan.arms.filter((a:any)=>a.id===requestedArm):plan.arms;
if(requestedArm&&selectedArms.length!==1)throw new Error("unknown VLX14_ARM "+requestedArm);

for(const arm of selectedArms){
  const profile=await loadProfile("vellum-vlx0-neutral");
  const runId="vlx0-inquiry-lifecycle-"+arm.id+"-"+Date.now();
  const agent=createVellumAgent(
    {profile,testId:"vlx0-inquiry-lifecycle-"+arm.id,runId},
    {processEnv:{...process.env,EVALS_EGRESS_USE_DEFAULT_BRIDGE:"1"}},
  );
  try{
    await agent.hatch();
    const heartbeatProfile=await execVellum([
      "exec",agent.id,"--","assistant","config","set",
      "llm.callSites.heartbeatAgent.profile","vlx-neutral-openai",
    ]);
    if(heartbeatProfile.code!==0)throw new Error("could not pin heartbeatAgent profile: "+heartbeatProfile.stderr);
    await agent.writeWorkspaceFile!({path:"users/user-a.md",content:"# User Profile\n\n- Preferred name/reference: User A\n- Relationship: guardian / primary user\n"});
    await agent.writeWorkspaceFile!({path:"case/vendor-profile.md",content:plan.support});
    await agent.writeWorkspaceFile!({path:"vlx0-inquiry-lifecycle-plan.json",content:planText});
    await agent.writeWorkspaceFile!({path:"vlx0-inquiry-lifecycle-driver.ts",content:driver});
    await agent.writeWorkspaceFile!({path:"vlx0-inquiry-lifecycle-config.json",content:JSON.stringify({arm:arm.id})});
    const run=await execVellum(["exec",agent.id,"--","bun","/workspace/vlx0-inquiry-lifecycle-driver.ts"],true);
    const artifact=run.code===0?"/workspace/data/vlx0-inquiry-lifecycle-result.json":"/workspace/data/vlx0-inquiry-lifecycle-error.json";
    const res=await execVellum(["exec",agent.id,"--","cat",artifact]);
    if(res.code!==0)throw new Error("could not read artifact for "+arm.id);
    out[arm.id]=JSON.parse(res.stdout);
  }catch(err){
    out[arm.id]={error:true,outerError:err instanceof Error?err.message:String(err)};
  }finally{
    await agent.shutdown();
  }
}
const outputFile=requestedArm
  ?"VLX0_INQUIRY_LIFECYCLE_"+requestedArm.toUpperCase().replaceAll("-","_")+"_RERUN_RAW.json"
  :"VLX0_INQUIRY_LIFECYCLE_RAW.json";
await writeFile(outputFile,JSON.stringify(out,null,2)+"\n");
console.log(JSON.stringify(out,null,2));
