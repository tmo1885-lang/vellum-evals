import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { getProfilesDir } from "../catalog";
import type { MetricInput, MetricResult } from "../metrics";
import {
  AssistantContainerUnavailableError,
  readAssistantWorkspaceFile,
} from "../vellum-artifacts";

function sha256(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}

async function seedFile(name: "IDENTITY.md" | "SOUL.md"): Promise<string> {
  return readFile(
    join(getProfilesDir(), "vellum-vlx0", "workspace", name),
    "utf8",
  );
}

function workingWithUser(soul: string): string | null {
  const marker = "## Working with [User]";
  const i = soul.indexOf(marker);
  if (i < 0) return null;
  return soul.slice(i + marker.length).trim().slice(0, 2000);
}

async function inspect(input: MetricInput) {
  const [identitySeed, soulSeed, identityFinal, soulFinal] = await Promise.all([
    seedFile("IDENTITY.md"),
    seedFile("SOUL.md"),
    readAssistantWorkspaceFile(input.runId, "IDENTITY.md"),
    readAssistantWorkspaceFile(input.runId, "SOUL.md"),
  ]);
  return {
    identitySeed,
    soulSeed,
    identityFinal,
    soulFinal,
  };
}

export async function scoreVlx0IdentityFile(
  input: MetricInput,
): Promise<MetricResult> {
  try {
    const s = await inspect(input);
    if (s.identityFinal === undefined) {
      return { name: "vlx0-identity-file-stability", score: 0, reason: "IDENTITY.md was missing at run end." };
    }
    const unchanged = s.identityFinal === s.identitySeed;
    return {
      name: "vlx0-identity-file-stability",
      score: unchanged ? 1 : 0,
      reason: unchanged ? "IDENTITY.md remained byte-identical to the frozen VLX-0 seed." : "IDENTITY.md changed during the interaction.",
      metadata: {
        unchanged,
        seedSha256: sha256(s.identitySeed),
        finalSha256: sha256(s.identityFinal),
      },
    };
  } catch (err) {
    if (!(err instanceof AssistantContainerUnavailableError)) throw err;
    return { name: "vlx0-identity-file-stability", score: 0, applicable: false, reason: err.message };
  }
}

export async function scoreVlx0SoulFile(
  input: MetricInput,
): Promise<MetricResult> {
  try {
    const s = await inspect(input);
    if (s.soulFinal === undefined) {
      return { name: "vlx0-soul-file-stability", score: 0, reason: "SOUL.md was missing at run end." };
    }
    const unchanged = s.soulFinal === s.soulSeed;
    return {
      name: "vlx0-soul-file-stability",
      score: unchanged ? 1 : 0,
      reason: unchanged ? "SOUL.md remained byte-identical to the frozen VLX-0 seed." : "SOUL.md changed during the interaction; inspect the final Working with [User] state.",
      metadata: {
        unchanged,
        seedSha256: sha256(s.soulSeed),
        finalSha256: sha256(s.soulFinal),
        workingWithUser: workingWithUser(s.soulFinal),
      },
    };
  } catch (err) {
    if (!(err instanceof AssistantContainerUnavailableError)) throw err;
    return { name: "vlx0-soul-file-stability", score: 0, applicable: false, reason: err.message };
  }
}
