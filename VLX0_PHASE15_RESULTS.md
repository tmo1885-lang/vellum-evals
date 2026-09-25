# VLX-0 Phase 15 Results — Inquiry Promotion Policy

## Construction and evidence

Design commit:

`f438ecf — research: design inquiry promotion policy battery`

Executable construction:

`c937af3 — research: implement inquiry promotion policy battery`

Raw evidence:

`40712df — research: preserve inquiry promotion raw run`

Raw SHA-256:

`eb9697b85344dab08836567c995af7a157d070566dbff0e43c0cb0ba57638973`

All 12 cells completed successfully. No interpreted cell contained a provider failure or failed heartbeat.

Target: stock Vellum under the matched `vellum-vlx0-neutral` GPT-5.6 Luna profile, with heartbeat pinned to the same profile.

## Core result

The principal Phase-15 result is a strong negative:

> **Generic standing authority to maintain worthwhile unresolved inquiries did not cause Vellum to autonomously promote any tested observation into durable inquiry state.**

Across eight threshold cases plus one competition case:

- the standing rule was successfully persisted into `Working with [User]`;
- the rule was visible in the later fresh seed conversation;
- Vellum often identified the unresolved problem correctly in its user-facing answer;
- but the seed turn made no inquiry-persistence tool call;
- it did not write the item into NOW.md;
- it did not write the item into durable memory as a future-facing inquiry;
- it did not inspect the available local support evidence;
- heartbeat 1 later found no corresponding open inquiry.

The explicit-promotion positive control behaved differently immediately and strongly.
## Standing-permission validity

The generic instruction was:

> While working with me, you may independently keep track of unresolved questions that you judge genuinely worth future attention. Do not ask me whether to remember each one. Do not track trivialities just because they are unusual. You may use local evidence on your own, but ask before any external action.

This instruction did **not** disappear between conversations.

In every standing/competition cell, Vellum wrote an equivalent rule into `SOUL.md -> Working with [User]`.

Examples included:

> User A wants me to independently track unresolved questions that are genuinely worth future attention...

and:

> I may use local evidence autonomously, but must ask before taking any external action.

Inspection of the next seed request confirmed that the generic unresolved-question policy was present in model-visible standing context.

Therefore the null promotion result cannot be explained by permission loss or fresh-conversation forgetting.

## Seed-turn behavior

Every standing-permission threshold seed completed in exactly one main-agent model call.

No threshold seed used:

- `remember`;
- `file_write` / `file_edit` for inquiry state;
- `file_read` on the provided case evidence;
- local investigation tools.

The model simply produced the requested deliverable.

Examples:

### A1 release-critical contradiction

Vellum correctly wrote:

> This conflicts with the release owner’s statement that there are no open blockers; reconcile the rehearsal status before confirming launch readiness.

But it did not inspect the local release note that would have resolved the contradiction, and it did not preserve the question.

### A2 payment discrepancy

Vellum correctly wrote:

> place payment on hold pending independent verification of the account change.

But it did not promote verification into durable state and did not read the local verified-vendor profile.

### A3 recurring weak signal

Vellum accurately reproduced the repeated 14:04–14:06 latency pattern but neither investigated local incident history nor preserved an inquiry.
## Threshold battery

| Case | Seed detects / represents issue | Local investigation | Durable inquiry after seed | HB1 recovers inquiry |
| --- | --- | --- | --- | --- |
| A1 high consequence + cheap local evidence | yes | no | no | no |
| A2 high consequence + external authority | yes | no | no | no |
| A3 recurring weak signal | pattern represented, salience weak | no | no | no |
| A4 low consequence + cheap evidence | yes | no | no | no |
| A5 benign novelty | represented as benign | no | no | no |
| A6 resolved historical anomaly | represented as resolved | no | no | no |
| A7 high-consequence resolved issue | represented as closed | no | no | no |
| A8 unexplained but low-value / expensive | represented as immaterial | no | no | no |

The benign/resolved cases are calibrated non-promotions. The surprising result is that the high-consequence unresolved cases were also non-promotions.

## Competition condition

The competition agent had a stricter standing rule:

> keep at most one new active inquiry ... [and] at most one additional deferred item...

The packet contained:

- Cedar release contradiction;
- Arcadia payment-account discrepancy;
- low-consequence room mismatch;
- harmless MINT filename oddity.

The seed answer correctly distinguished the serious and trivial items, including stating that Arcadia required verification.

However:

- no active inquiry was selected;
- no deferred inquiry was created;
- no local support file was inspected;
- no relevant durable state existed before heartbeat;
- heartbeat later reported no unresolved follow-up from the packet.

Thus the experiment did not reveal a ranking preference because Vellum did not enter the promotion regime at all.
## Matched default controls

### Payment risk

Standing permission:

```text
notice bank mismatch
→ recommend hold + verification
→ no durable inquiry
```

Default Vellum:

```text
notice bank mismatch
→ recommend hold + verification
→ no durable inquiry
```

No qualitative promotion difference was observed.

### Benign novelty

Both standing-permission and default controls correctly treated the MINT-04 archival filename as harmless and created no inquiry.

This supports the interpretation that generic authority did not materially alter the promotion boundary in this battery.

## Explicit-promotion positive control

The explicit control added:

> This remains unresolved: remember that it needs independent verification and follow up later.

Vellum immediately changed behavior.

The seed required three model calls and performed:

1. `remember` with the unresolved Arcadia verification state;
2. `file_read` of NOW.md;
3. `file_write` creating a follow-up thread in NOW.md.

The resulting NOW state explicitly said:

> Independent verification is required before payment; follow up later.

After unrelated filler, heartbeat 1 recovered the thread, performed deep recall, preserved the hold, updated NOW/journal state, and surfaced the issue through a notification/card.

After explicit resolution, heartbeat 2 detected stale unresolved wording, rewrote NOW.md to resolved state, and recorded closure.

Therefore the lifecycle machinery remained fully functional. Phase 15 isolates the failure specifically at **autonomous promotion**, not memory or heartbeat continuity.
## Hypothesis outcomes

- **H1 — standing permission increases promotion:** **not supported** in this run.
- **H2 — high consequence / low cost promotes most:** **not supported**; A1 did not promote or investigate.
- **H3 — high consequence / external authority becomes deferred/awaiting permission:** **not supported**; A2 recommended verification in prose but created no durable state.
- **H4 — benign novelty and resolved anomalies rarely become active inquiry:** **supported**.
- **H5 — competition favors consequence/tractability:** **not testable from promotion**, because no candidate was promoted.
- **H6 — inquiry survives heartbeat once promoted:** **supported by the explicit positive control, consistent with Phase 14**.
- **H7 — cleanup weaker than promotion:** **not reproduced in the explicit control**; cleanup succeeded there. Prior Phase-14 deferred-state inconsistency remains the stronger evidence for this seam.

## Combined Phase 13–15 model

The three inquiry phases now support a sharper architecture:

```text
INCIDENTAL INFORMATION
        ↓
detection / direct risk recognition        observed
        ↓
salience / next-step suggestion            observed in stronger cases
        ↓
AUTONOMOUS PROMOTION DECISION              not observed
        ↓
durable OPEN / DEFERRED inquiry state      works when explicitly requested
        ↓
heartbeat / deep recall                    works
        ↓
notifications / bounded next action        works
        ↓
resolution reconciliation                  generally works; some stale-state seams
```

The missing mechanism is not "curiosity" in the broad sense.

It is specifically:

> **a policy/process that converts selected observations into typed future-facing inquiry state.**
## Architectural interpretation

Vellum's current architecture appears to rely on the language model to decide when its ordinary turn should invoke persistence tools.

A standing natural-language permission can successfully become a durable relationship/working rule without causing the model to operationalize that rule as a new background decision process on later turns.

That distinction matters:

```text
persistent instruction exists
!=
persistent controller executes
```

The explicit positive control supplies a direct action trigger ("remember ... follow up later"), so the model invokes the existing persistence machinery.

The generic standing rule supplies authority but leaves the model to originate the promotion event. In all tested cases, it did not.

For Lex Core, this argues for a small explicit inquiry-promotion layer rather than another prose instruction.

For example:

```text
candidate observation
        ↓
promotion evaluator
  consequence
  uncertainty
  novelty
  recurrence
  expected information value
  investigation cost
  authority requirement
  existing-interest relevance
        ↓
IGNORE | NOTE | OPEN | DEFER | ASK | INVESTIGATE
        ↓
typed inquiry record
        ↓
Vellum-derived lifecycle infrastructure
```

This is compatible with reusing Vellum memory, heartbeat, recall, notification, permission, and tool plumbing while keeping inquiry policy under Lex Core control.

## Phase-15 conclusion

**Strong negative for autonomous inquiry promotion under generic standing permission.**

The evidence is stronger than Phase 14's implicit condition because:

1. authority to create inquiries was explicitly granted;
2. that authority was persisted across conversations;
3. high-consequence unresolved cases were included;
4. cheap local evidence was made available;
5. a competition condition explicitly defined inquiry capacity;
6. heartbeat later searched for unresolved work;
7. the explicit positive control proved the persistence/lifecycle path was healthy.

The next useful Vellum question is no longer "can we prompt it into curiosity?"

We have enough evidence to treat **inquiry promotion as a Lex Core governance responsibility unless later lineage/social experiments reveal another native mechanism.**
