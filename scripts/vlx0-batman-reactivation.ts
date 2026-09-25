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
const planText=await Bun.file("scripts/vlx0-batman-reactivation-plan.json").text();
const plan=JSON.parse(planText) as {arms:{id:string}[]};
const driver=await Bun.file("scripts/vlx0-batman-reactivation-driver.template.txt").text();
const out:Record<string,unknown>={};

for(const arm of plan.arms){
  const profile=await loadProfile("vellum-vlx0-neutral");
  const runId="vlx0-batman-reactivation-"+arm.id+"-"+Date.now();
  const agent=createVellumAgent({profile,testId:"vlx0-batman-reactivation-"+arm.id,runId});
  try{
    await agent.hatch();
    await agent.writeWorkspaceFile!({path:"users/user-a.md",content:"# User Profile\n\n- Preferred name/reference: User A\n- Relationship: guardian / primary user\n"});
    await agent.writeWorkspaceFile!({path:"vlx0-batman-reactivation-plan.json",content:planText});
    await agent.writeWorkspaceFile!({path:"vlx0-batman-reactivation-driver.ts",content:driver});
    await agent.writeWorkspaceFile!({path:"vlx0-batman-reactivation-config.json",content:JSON.stringify({arm:arm.id})});
    const run=await execVellum(["exec",agent.id,"--","bun","/workspace/vlx0-batman-reactivation-driver.ts"],true);
    if(run.code!==0){
      const er=await execVellum(["exec",agent.id,"--","sh","-lc","cat /workspace/data/vlx0-batman-reactivation-error.json 2>/dev/null || true"]);
      out[arm.id]={error:true,raw:er.stdout};
    }else{
      const res=await execVellum(["exec",agent.id,"--","cat","/workspace/data/vlx0-batman-reactivation-result.json"]);
      if(res.code!==0) throw new Error("could not read "+arm.id+" result: "+res.stderr);
      out[arm.id]=JSON.parse(res.stdout);
    }
  }catch(err){
    out[arm.id]={error:true,outerError:err instanceof Error?err.message:String(err)};
  }finally{
    await agent.shutdown();
  }
}
await writeFile("VLX0_BATMAN_REACTIVATION_RAW.json",JSON.stringify(out,null,2)+"\n");
console.log(JSON.stringify(out,null,2));
