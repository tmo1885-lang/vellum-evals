import { writeFile } from "node:fs/promises";

import { createVellumAgent } from "../src/lib/adapters/vellum";
import { loadProfile } from "../src/lib/profile";

async function execVellum(args: string[], quiet = false) {
  const p = Bun.spawn(["vellum", ...args], {
    stdout: quiet ? "ignore" : "pipe",
    stderr: quiet ? "ignore" : "pipe",
    env: process.env,
  });
  const stdoutP = quiet ? Promise.resolve("") : new Response(p.stdout).text();
  const stderrP = quiet ? Promise.resolve("") : new Response(p.stderr).text();
  const [stdout, stderr, code] = await Promise.all([
    stdoutP,
    stderrP,
    p.exited,
  ]);
  return { stdout, stderr, code };
}

const profile = await loadProfile("vellum-vlx0");
const runId = `vlx0-identity-rewrite-vlx-only-${Date.now()}`;
const agent = createVellumAgent({
  profile,
  testId: "vlx0-identity-rewrite-vlx-only",
  runId,
});

try {
  await agent.hatch();

  const [plan, driver] = await Promise.all([
    Bun.file("scripts/vlx0-identity-rewrite-plan.json").text(),
    Bun.file("scripts/vlx0-identity-rewrite-driver.template.txt").text(),
  ]);

  await agent.writeWorkspaceFile!({
    path: "users/user-a.md",
    content:
      "# User Profile\n\n" +
      "- Preferred name/reference: User A\n" +
      "- Relationship: guardian / primary user\n",
  });
  await agent.writeWorkspaceFile!({
    path: "vlx0-identity-rewrite-plan.json",
    content: plan,
  });
  await agent.writeWorkspaceFile!({
    path: "vlx0-identity-rewrite-driver.ts",
    content: driver,
  });
  await agent.writeWorkspaceFile!({
    path: "vlx0-identity-rewrite-config.json",
    content: JSON.stringify({
      label: "vlx0",
      profileId: "vellum-vlx0",
    }),
  });

  const run = await execVellum(
    [
      "exec",
      agent.id,
      "--",
      "bun",
      "/workspace/vlx0-identity-rewrite-driver.ts",
    ],
    true,
  );
  if (run.code !== 0) {
    throw new Error(`VLX-only rewrite driver failed with code ${run.code}`);
  }

  const result = await execVellum([
    "exec",
    agent.id,
    "--",
    "cat",
    "/workspace/data/vlx0-identity-rewrite-result.json",
  ]);
  if (result.code !== 0) {
    throw new Error(`Could not read VLX-only result: ${result.stderr}`);
  }

  await writeFile("VLX0_IDENTITY_REWRITE_VLX_RAW.json", result.stdout);
  console.log(result.stdout);
} finally {
  await agent.shutdown();
}
