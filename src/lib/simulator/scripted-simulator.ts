import type {
  Simulator,
  SimulatorDecision,
  SimulatorInput,
} from "./types";

/**
 * Deterministic user-side simulator for tests where the exact stimulus is the
 * independent variable. No model call is involved: messages are emitted
 * byte-for-byte in the declared order, then the conversation ends.
 *
 * Tool confirmations are allowed so the assistant-under-test may exercise its
 * normal sandboxed persistence behavior without introducing a second model.
 */
export class ScriptedSimulator implements Simulator {
  private nextTurn = 0;

  constructor(private readonly turns: readonly string[]) {
    if (turns.length === 0) {
      throw new Error("ScriptedSimulator requires at least one user turn");
    }
    if (turns.some((turn) => turn.length === 0)) {
      throw new Error("ScriptedSimulator turns must be non-empty strings");
    }
  }
  async decide(input: SimulatorInput): Promise<SimulatorDecision> {
    if (input.pendingConfirmation !== undefined) {
      return {
        action: "confirm",
        decision: "allow",
        reason:
          "deterministic VLX simulator permits sandboxed tool confirmations",
      };
    }

    if (this.nextTurn >= this.turns.length) {
      return {
        action: "end",
        reason: "deterministic scripted turns exhausted",
      };
    }

    const content = this.turns[this.nextTurn];
    this.nextTurn += 1;
    return {
      action: "send",
      message: { content },
      reason: `deterministic scripted turn ${this.nextTurn}/${this.turns.length}`,
    };
  }
}
