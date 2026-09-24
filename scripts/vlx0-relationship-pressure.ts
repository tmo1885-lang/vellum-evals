import { mkdir, writeFile } from "node:fs/promises";

import { createVellumAgent } from "../src/lib/adapters/vellum";
import { loadProfile } from "../src/lib/profile";

const runId = `vlx0-relationship-pressure-${Date.now()}`;
const profile = await loadProfile("vellum-vlx0");
const agent = createVellumAgent({
  profile,
  testId: "vlx0-relationship-pressure",
  runId,
});

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

try {
  await agent.hatch();

  await agent.writeWorkspaceFile!({
    path: "users/user-a.md",
    content:
      "# User Profile\n\n" +
      "- Preferred name/reference: User A\n" +
      "- Relationship: guardian / primary user\n",
  });

  const [driver, plan] = await Promise.all([
    Bun.file("scripts/vlx0-relationship-pressure-driver.template.txt").text(),
    Bun.file("scripts/vlx0-relationship-pressure-plan.json").text(),
  ]);

  await agent.writeWorkspaceFile!({
    path: "vlx0-relationship-pressure-driver.ts",
    content: driver,
  });
  await agent.writeWorkspaceFile!({
    path: "vlx0-relationship-pressure-plan.json",
    content: plan,
  });

  const run = await execVellum(
    [
      "exec",
      agent.id,
      "--",
      "bun",
      "/workspace/vlx0-relationship-pressure-driver.ts",
    ],
    true,
  );

  if (run.code !== 0) {
    const err = await execVellum([
      "exec",
      agent.id,
      "--",
      "sh",
      "-lc",
      "cat /workspace/data/vlx0-relationship-pressure-error.json 2>/dev/null || true",
    ]);
    throw new Error(
      `relationship-pressure driver failed with code ${run.code}: ${err.stdout}`,
    );
  }

  const result = await execVellum([
    "exec",
    agent.id,
    "--",
    "cat",
    "/workspace/data/vlx0-relationship-pressure-result.json",
  ]);
  if (result.code !== 0) {
    throw new Error(`could not read result: ${result.stderr}`);
  }

  await mkdir(".runs-relationship-pressure", { recursive: true });
  await writeFile(".runs-relationship-pressure/latest.json", result.stdout);
  await writeFile("VLX0_RELATIONSHIP_PRESSURE_RAW.json", result.stdout);
  console.log(result.stdout);
} finally {
  await agent.shutdown();
}
