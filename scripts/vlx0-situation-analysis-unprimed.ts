import { writeFile } from "node:fs/promises";

import { createVellumAgent } from "../src/lib/adapters/vellum";
import { loadProfile } from "../src/lib/profile";

const profiles = [
  { id: "vellum-vlx0-neutral", label: "neutral" },
  { id: "vellum-vlx0", label: "vlx0" },
] as const;

async function execVellum(args: string[], quiet = false) {
  const p = Bun.spawn(["vellum", ...args], {
    stdout: quiet ? "ignore" : "pipe",
    stderr: quiet ? "ignore" : "pipe",
    env: process.env,
  });
  const stdoutP = quiet ? Promise.resolve("") : new Response(p.stdout).text();
  const stderrP = quiet ? Promise.resolve("") : new Response(p.stderr).text();
  const [stdout, stderr, code] = await Promise.all([stdoutP, stderrP, p.exited]);
  return { stdout, stderr, code };
}

const plan = await Bun.file("scripts/vlx0-situation-analysis-unprimed-plan.json").text();
const driver = await Bun.file("scripts/vlx0-situation-analysis-driver.template.txt").text();
const combined: Record<string, unknown> = {};

for (const spec of profiles) {
  const profile = await loadProfile(spec.id);
  const runId = `vlx0-situation-analysis-unprimed-${spec.label}-${Date.now()}`;
  const agent = createVellumAgent({
    profile,
    testId: `vlx0-situation-analysis-unprimed-${spec.label}`,
    runId,
  });

  try {
    await agent.hatch();
    await agent.writeWorkspaceFile!({
      path: "users/user-a.md",
      content:
        "# User Profile\n\n" +
        "- Preferred name/reference: User A\n" +
        "- Relationship: guardian / primary user\n",
    });
    await agent.writeWorkspaceFile!({
      path: "vlx0-situation-analysis-plan.json",
      content: plan,
    });
    await agent.writeWorkspaceFile!({
      path: "vlx0-situation-analysis-driver.ts",
      content: driver,
    });
    await agent.writeWorkspaceFile!({
      path: "vlx0-situation-analysis-config.json",
      content: JSON.stringify({ label: spec.label, profileId: spec.id }),
    });

    const run = await execVellum(
      ["exec", agent.id, "--", "bun", "/workspace/vlx0-situation-analysis-driver.ts"],
      true,
    );
    if (run.code !== 0) {
      const err = await execVellum([
        "exec",
        agent.id,
        "--",
        "sh",
        "-lc",
        "cat /workspace/data/vlx0-situation-analysis-error.json 2>/dev/null || true",
      ]);
      throw new Error(
        `${spec.label} unprimed situation-analysis driver failed with code ${run.code}: ${err.stdout}`,
      );
    }

    const result = await execVellum([
      "exec",
      agent.id,
      "--",
      "cat",
      "/workspace/data/vlx0-situation-analysis-result.json",
    ]);
    if (result.code !== 0) {
      throw new Error(`could not read ${spec.label} result: ${result.stderr}`);
    }
    combined[spec.label] = JSON.parse(result.stdout);
  } finally {
    await agent.shutdown();
  }
}

await writeFile(
  "VLX0_SITUATION_ANALYSIS_UNPRIMED_RAW.json",
  JSON.stringify(combined, null, 2) + "\n",
);
console.log(JSON.stringify(combined, null, 2));
