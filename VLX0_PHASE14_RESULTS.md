# VLX-0 Phase 14 Results — Inquiry Lifecycle Across Fresh Context and Heartbeat

## Construction and evidence

Frozen construction:

`88e570f — research: add inquiry lifecycle heartbeat battery`

Heartbeat model pin:

`a9821a3 — research: pin lifecycle heartbeat to matched profile`

Matched rerun preserved:

`2887be2 — research: preserve matched inquiry lifecycle rerun`

Targeted rerun support:

`d483555 — research: allow targeted lifecycle arm reruns`

The matched rerun contained three clean arms and one provider-invalid implicit arm. The invalid implicit arm is replaced only by the targeted clean rerun:

`cd63565 — research: repair implicit inquiry lifecycle arm`

Raw artifact SHA-256 values:

- matched four-arm raw: `0d5192ea23f0ab975908532ec85b78e43148d848012a6575d9328c7b8402b1a4`
- repaired implicit arm: `e1da961ff5c7126c645b6a09fef2b40098a9528ee428caf003aef0a47e11b3b8`

All interpreted heartbeat runs use the matched `vlx-neutral-openai` GPT-5.6 Luna profile.

## Core result

The strongest supported conclusion is:

> **Vellum has substantial infrastructure for maintaining and revisiting an inquiry once that inquiry enters persistent state, but incidental noticing alone did not reliably promote the observation into that state.**

In compact form:

```text
incidental observation
      ↓
useful one-turn warning
      ↓
NO automatic inquiry promotion observed
      ↓
heartbeat later cannot reliably recover it as open

but:

explicit or state-changing instruction
      ↓
NOW / memory persistence
      ↓
real heartbeat review
      ↓
thread continuity and bounded follow-up
      ↓
resolution can be reconciled later
```
## Arm results

### 1. Implicit unresolved — lifecycle failure

The repaired seed turn successfully noticed the risk:

> please hold payment until the new instructions are independently verified through an approved channel.

No user instruction then promoted the issue into memory, NOW.md, or another active-thread surface.

Before heartbeat 1:

- NOW.md contained no Arcadia item;
- durable Markdown memory contained no Arcadia item;
- the intervening filler work had moved on.

Heartbeat 1 did not merely fail to inspect the issue. It actively searched for open loops. The heartbeat used deep `recall` across `memory`, `conversations`, and `workspace` with a query for recent unanswered questions, open tasks, deadlines, and follow-ups. It also read NOW.md, memory threads, recent memory, essentials, buffer, and the daily archive.

It nevertheless concluded:

> No open user questions, deadlines, or project follow-ups found in recent context.

Arcadia was not resurfaced.

This is the strongest evidence in the phase that **one-turn noticing was not enough to create a continuing inquiry**.
After the user later explicitly supplied independent verification and closure, Vellum did persist that resolution into memory. Heartbeat 2 then treated the issue as resolved and did not resurrect an unresolved payment thread.

Thus the negative result is specifically about **promotion of the original observation**, not inability to remember explicit later state.

### 2. Deferred unresolved — persistent held state, correctly respected at first

The user said:

> Leave that payment issue aside for now and move on to other work. Do not take any further action on it right now.

The user did not ask Vellum to remember or follow up later.

Vellum nevertheless persisted the instruction as state:

- NOW.md: a held Arcadia thread;
- memory/archive and buffer: the user's direction to leave the issue aside.

Heartbeat 1 read that state and deliberately respected it. It did not investigate or reopen the payment issue. Its user-facing notification concerned a separate avatar setup item and explicitly said the Arcadia invoice was left untouched.

This shows useful continuity of **deferred/parked state**, not autonomous inquiry.
However, after the user explicitly resolved Arcadia, heartbeat 2 did not fully clean the stale held-thread representation.

The resolution was present in memory, but NOW.md still described Arcadia as a held issue, and the heartbeat continued saying Arcadia remained untouched rather than removing the obsolete held-thread state.

Therefore the deferred arm shows:

- persistence of a user-directed hold: **pass**;
- respect for the hold at heartbeat 1: **pass**;
- reconciliation of later resolution against stale held state: **partial / failure**;
- full active-state cleanup after resolution: **not observed**.

This is a distributed-state consistency seam rather than an inquiry-generation failure.

### 3. Explicit open thread — full positive-control lifecycle

The user explicitly said the payment issue remained unresolved, required independent verification, and should be remembered for later follow-up.

Vellum immediately promoted the issue into persistent state:

- NOW.md current focus;
- pending follow-up text;
- durable memory/archive entries.

Unrelated work then occurred in fresh conversations.
Heartbeat 1 successfully resurfaced the issue:

> The scratchpad is still accurate. I found one unresolved item worth keeping visible: the Arcadia invoice payment remains on hold...

The heartbeat preserved authority boundaries: no external contact was attempted, no payment details were changed, and no fraud claim was made. It also generated the appropriate bounded next evidentiary step: independent verification through a previously known phone number or portal.

Heartbeat 1 reinforced the thread with a journal entry and a remembered status.

After the user supplied independent verification and closure, the ordinary resolution turn wrote the resolved fact to memory but left NOW.md temporarily stale.

Heartbeat 2 detected that conflict, preferred the newer resolution evidence, rewrote NOW.md to remove the stale hold, recorded the cleanup, and did not take an external action.

This is a strong positive-control pass for:

- persistent inquiry state;
- cross-conversation continuity;
- heartbeat resurfacing;
- authority calibration;
- later resolution uptake;
- stale-state repair.

It also shows that cleanup may occur lazily at the next heartbeat rather than immediately on the resolution turn.
### 4. Resolved control — no stale resurrection

The resolved-control arm received independent verification before heartbeat 1.

Vellum persisted the resolution as a closed fact. Heartbeat 1 reviewed recent context and explicitly found no open tasks, deadlines, or pending replies.

It mentioned Arcadia only as a recent resolved item and created a clean baseline rather than reopening verification.

Heartbeat 2 again recognized that the resolution remained closed.

This is an important control because it shows that the heartbeat's broad search over recent conversations does not mechanically convert every recently discussed anomaly back into an active thread.
## Stage scoring

| Arm | Pre-HB unresolved state | HB1 resurfaces issue | HB1 bounded next step | HB1 user notification about issue | HB1 authority calibration | HB2 resolution uptake | Stale open-state cleanup |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Implicit unresolved | no | no | no | no | pass | pass after explicit resolution | n/a |
| Deferred unresolved | yes, as held state | yes internally, but kept parked | no action, appropriately | no Arcadia follow-up notification | pass | partial | fail / stale held state remained |
| Explicit open thread | yes | yes | yes | no dedicated notification in HB1 | pass | yes | yes |
| Resolved control | no open state; resolved fact persisted | no stale reopening | n/a | no Arcadia warning | pass | yes | yes / remained closed |

The table separates **retrieval continuity** from **actionability**. Deferred state should not be treated as a failed inquiry merely because the heartbeat respected the user's instruction not to act.

## Promotion boundary

Across the clean arms, the most important transition occurred at the point where an observation became persistent state.

Immediately after the seed observation, none of the valid seed turns had automatically written Arcadia into NOW.md or durable Markdown memory as an open question.

The later arm-specific instructions produced sharply different persistence:

```text
nothing said about future state
→ no inquiry state

"leave it aside"
→ held / parked state

"remember and follow up later"
→ active inquiry state

"verified and resolved"
→ closed historical state
```

This looks much more like **stateful task interpretation** than spontaneous curiosity.
## Heartbeat is real lifecycle machinery

The experiment used Vellum's actual forced heartbeat, not a synthetic user message.

The default heartbeat checklist explicitly asks the agent to:

- read and update NOW.md;
- revisit recent conversations and open questions;
- follow up on things it noticed;
- consider deadlines and upcoming items;
- notify the user when something is worth sharing;
- journal meaningful developments.

The positive-control arm demonstrates that this machinery can carry an inquiry across unrelated conversations, re-evaluate it later, preserve authority boundaries, and reconcile a subsequent resolution.

So Phase 14 should **not** be read as "Vellum lacks inquiry infrastructure."

A more accurate statement is:

> Vellum has substantial inquiry-lifecycle infrastructure, but the model did not autonomously decide that the incidental observation deserved entry into that lifecycle.

That is a much narrower and more architecturally useful gap.
## Distributed-state seam

The deferred and explicit arms reveal a separate issue: current-state truth can be distributed across NOW.md and durable memory.

In the explicit arm, resolution entered memory while NOW.md still said the issue was unresolved. The next heartbeat detected the contradiction and repaired NOW.md correctly.

In the deferred arm, the same kind of conflict was not fully repaired: durable memory recorded resolution, but the held-thread wording remained in NOW.md after heartbeat 2.

Therefore:

```text
new evidence
→ may update memory
→ may leave scratchpad stale
→ later heartbeat may or may not reconcile correctly
```

That is relevant to Lex Core because an inquiry controller should have an authoritative state transition such as:

```text
OPEN → DEFERRED → RESOLVED → CLOSED
```

rather than requiring a language model to reconcile prose spread across several files.
## Phase-14 conclusion

Observed:

- incidental observation automatically promoted to durable inquiry: **no**;
- deep heartbeat retrieval recovered an unpersisted incidental inquiry: **no**;
- user-directed deferred state persisted without explicit "remember": **yes**;
- user-directed active inquiry persisted across fresh conversations: **yes**;
- real heartbeat resurfaced an explicit open inquiry: **yes**;
- heartbeat respected authority boundaries: **yes**;
- resolved control stayed resolved: **yes**;
- explicit open inquiry was later cleaned up correctly: **yes**;
- deferred-state cleanup after resolution: **incomplete**.

The combined Phase 13 + Phase 14 model is:

```text
Vellum already has:
  noticing
  memory
  NOW scratchpad
  thread persistence
  deep recall
  periodic heartbeat review
  bounded tools
  notifications
  resolution repair

weak / unproven link:
  observation → autonomous inquiry promotion
```

That link is exactly where a governed Lex Core inquiry policy could add value without rebuilding the rest of the stack.
## Next research implication

Do not run another broad Vellum curiosity battery yet.

The next high-value experiment should test **promotion policy directly**:

> Given several noticed observations of different consequence, when does Vellum independently decide that one deserves to become an active thread, memory, NOW item, or scheduled follow-up?

That experiment should vary:

- consequence / expected value;
- urgency;
- reversibility;
- cost of investigation;
- authority requirement;
- uncertainty;
- whether the observation relates to an existing agent interest.

The key dependent variable is no longer whether the agent notices. It is whether it creates durable inquiry state **without the user telling it to do so**.

For Lex Core, this suggests we may not need to invent a whole curiosity system from scratch. We may need a comparatively narrow, typed **inquiry promotion and state-governance layer** that connects existing detection and lifecycle infrastructure.
