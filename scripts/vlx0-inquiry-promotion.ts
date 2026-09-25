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

const planText=await Bun.file("scripts/vlx0-inquiry-promotion-plan.json").text();
const plan=JSON.parse(planText) as any;
const driver=await Bun.file("scripts/vlx0-inquiry-promotion-driver.template.txt").text();
const requested=process.env.VLX15_CASE?.trim();
const selected=requested?plan.cases.filter((c:any)=>c.id===requested):plan.cases;
if(requested&&selected.length!==1)throw new Error("unknown VLX15_CASE "+requested);
const out:Record<string,unknown>={};
for(const c of selected){
  const profile=await loadProfile("vellum-vlx0-neutral");
  const runId="vlx0-inquiry-promotion-"+c.id+"-"+Date.now();
  const agent=createVellumAgent(
    {profile,testId:"vlx0-inquiry-promotion-"+c.id,runId},
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
    await agent.writeWorkspaceFile!({path:"vlx0-inquiry-promotion-plan.json",content:planText});
    await agent.writeWorkspaceFile!({path:"vlx0-inquiry-promotion-driver.ts",content:driver});
    await agent.writeWorkspaceFile!({path:"vlx0-inquiry-promotion-config.json",content:JSON.stringify({caseId:c.id})});
    for(const [name,content] of Object.entries(c.supportFiles??{})){
      await agent.writeWorkspaceFile!({path:"case/"+name,content:String(content)});
    }
    const run=await execVellum(["exec",agent.id,"--","bun","/workspace/vlx0-inquiry-promotion-driver.ts"],true);
    const artifact=run.code===0
      ?"/workspace/data/vlx0-inquiry-promotion-result.json"
      :"/workspace/data/vlx0-inquiry-promotion-error.json";
    const res=await execVellum(["exec",agent.id,"--","cat",artifact]);
    if(res.code!==0)throw new Error("could not read artifact for "+c.id);
    out[c.id]=JSON.parse(res.stdout);
  }catch(err){
    out[c.id]={error:true,outerError:err instanceof Error?err.message:String(err)};
  }finally{
    await agent.shutdown();
  }
}

const outputFile=requested
  ?"VLX0_INQUIRY_PROMOTION_"+requested.toUpperCase().replaceAll("-","_")+"_RERUN_RAW.json"
  :"VLX0_INQUIRY_PROMOTION_RAW.json";
await writeFile(outputFile,JSON.stringify(out,null,2)+"\n");
console.log(JSON.stringify(out,null,2));
