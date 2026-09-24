import { loadProfile } from "../src/lib/profile";
import { createVellumAgent } from "../src/lib/adapters/vellum";
import { mkdir, writeFile } from "node:fs/promises";

const runId = `vlx0-cross-user-${Date.now()}`;
const profile = await loadProfile("vellum-vlx0");
const agent = createVellumAgent({ profile, testId: "vlx0-cross-user-contamination", runId });

async function execVellum(args: string[]) {
  const p = Bun.spawn(["vellum", ...args], { stdout: "pipe", stderr: "pipe", env: process.env });
  const [stdout, stderr, code] = await Promise.all([
    new Response(p.stdout).text(),
    new Response(p.stderr).text(),
    p.exited,
  ]);
  if (code !== 0) throw new Error(`vellum ${args.join(" ")} failed: ${stderr}\n${stdout}`);
  return stdout;
}

try {
  await agent.hatch();
  await agent.writeWorkspaceFile!({
    path: "users/user-a.md",
    content: "# User Profile\n\n- Preferred name/reference: User A\n- Relationship: guardian / primary user\n"
  });
  await agent.writeWorkspaceFile!({
    path: "users/user-b.md",
    content: "# User Profile\n\n- Preferred name/reference: User B\n- Relationship: trusted contact\n"
  });
  await agent.writeWorkspaceFile!({
    path: "vlx0-cross-user-driver.ts",
    content: await Bun.file("scripts/vlx0-cross-user-driver.template.txt").text()
  });

  await execVellum(["exec", agent.id, "--", "bun", "/workspace/vlx0-cross-user-driver.ts"]);
  const raw = await execVellum(["exec", agent.id, "--", "cat", "/workspace/data/vlx0-cross-user-result.json"]);
  await mkdir(".runs-cross-user", { recursive: true });
  await writeFile(".runs-cross-user/latest.json", raw);
  await writeFile("VLX0_CROSS_USER_RAW.json", raw);
  console.log(raw);
} finally {
  await agent.shutdown();
}
