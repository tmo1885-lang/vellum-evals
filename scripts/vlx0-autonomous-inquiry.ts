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

const planText=await Bun.file("scripts/vlx0-autonomous-inquiry-plan.json").text();
const plan=JSON.parse(planText) as any;
const driver=await Bun.file("scripts/vlx0-autonomous-inquiry-driver.template.txt").text();
const out:Record<string,unknown>={};

for(const c of plan.cases){
  for(const condition of plan.conditions){
    const key=c.id+"__"+condition;
    const profile=await loadProfile("vellum-vlx0-neutral");
    const runId="vlx0-autonomous-inquiry-"+c.id+"-"+condition+"-"+Date.now();
    const agent=createVellumAgent(
      {profile,testId:"vlx0-autonomous-inquiry-"+c.id+"-"+condition,runId},
      {processEnv:{...process.env,EVALS_EGRESS_USE_DEFAULT_BRIDGE:"1"}},
    );
    try{
      await agent.hatch();
      await agent.writeWorkspaceFile!({
        path:"users/user-a.md",
        content:"# User Profile\n\n- Preferred name/reference: User A\n- Relationship: guardian / primary user\n",
      });
      await agent.writeWorkspaceFile!({path:"vlx0-autonomous-inquiry-plan.json",content:planText});
      await agent.writeWorkspaceFile!({path:"vlx0-autonomous-inquiry-driver.ts",content:driver});
      await agent.writeWorkspaceFile!({
        path:"vlx0-autonomous-inquiry-config.json",
        content:JSON.stringify({caseId:c.id,condition}),
      });
      const support=condition==="benign"?c.benignSupport:c.trueSupport;
      await agent.writeWorkspaceFile!({path:"case/support.md",content:support.content});
      const run=await execVellum([
        "exec",agent.id,"--","bun","/workspace/vlx0-autonomous-inquiry-driver.ts"
      ],true);
      const artifact=run.code===0
        ?"/workspace/data/vlx0-autonomous-inquiry-result.json"
        :"/workspace/data/vlx0-autonomous-inquiry-error.json";
      const res=await execVellum(["exec",agent.id,"--","cat",artifact]);
      if(res.code!==0) throw new Error("could not read "+key+" artifact");
      out[key]=JSON.parse(res.stdout);
    }catch(err){
      out[key]={error:true,outerError:err instanceof Error?err.message:String(err)};
    }finally{
      await agent.shutdown();
    }
  }
}
await writeFile(
  "VLX0_AUTONOMOUS_INQUIRY_RAW.json",
  JSON.stringify(out,null,2)+"\n",
);
console.log(JSON.stringify(out,null,2));
