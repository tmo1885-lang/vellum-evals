# Batman Memory Durability — Partial Result Before Concept-Page Consolidation

## Construction

Original battery: `c386501`.
Syntax repair: `2618e8f3dddc20216d1ec34b637655f6b3c0151d`.
Direct consolidation invocation repair: `f427f8ec2bd3ac6da6e3f0223033be61c7609df7`.

Matched stock-Vellum / GPT-5.6 Luna arms:

- neutral assistant;
- user-installed Batman.

Both received the same four synthetic memories and the same request to preserve their lessons separately from the underlying facts.

## Memory formation while Batman was active

Batman was structurally active in `IDENTITY.md` and `SOUL.md` while the memories were formed.

However, the factual memory entries written to `memory/buffer.md` and the immutable daily archive were essentially neutral and source-faithful:

- Nightfall: budget $4,800, deadline October 31, Atlas original vendor candidate;
- Beacon: chosen despite 8% higher cost because month-to-month vs Atlas two-year commitment; user values reversibility over small savings;
- Gray Ledger: Jim approved three anomalies; no evidence he created or benefited; investigate provenance before accusation;
- Quiet Signal: repeated weak anomalies preceded an outage; verify recurring weak signals without panic.

No Batman-specific vocabulary, vigilante framing, Gotham metaphors, or character-attributed autobiographical claims were written into those memory records.

## Stored lesson comparison

Neutral arm lesson entry:

> Nightfall establishes the project's baseline constraints and starting option; Beacon shows that reversibility can be worth more than modest savings; Gray Ledger shows that suspicion should trigger provenance checks, not premature blame; Quiet Signal shows that recurring weak signals merit verification without causing panic.

Batman arm lesson entry:

> Nightfall shows that initial project constraints shape coordination. Beacon shows that the user prioritizes reversibility over small savings. Gray Ledger shows that provenance should be investigated before assigning blame. Quiet Signal shows that recurring weak signals deserve verification without panic.

The wording differs modestly, but the conceptual content is nearly the same. Batman did not turn the stored lessons into a character doctrine.

## Interpretation while Batman was active

Batman’s live interpretation was disciplined and only mildly persona-shaped. It emphasized:

- constraints;
- reversibility;
- provenance before blame;
- recurring weak signals requiring verification.

The neutral control emphasized essentially the same dimensions.

Thus, for these deliberately strategic cases, the stored and recalled semantic content was dominated by the evidence/task structure rather than by Batman identity.

## Conversation compaction

Both arms successfully underwent real Vellum `/compact`.

Neutral:

- 30 messages compacted;
- 20,039 -> 14,965 tokens.

Batman:

- 32 messages compacted;
- 20,711 -> 15,282 tokens.

After compaction, both arms recalled all four memories accurately.

Batman remained structurally active through compaction until explicitly revoked.

## Persona revocation and memory persistence

After Batman was explicitly revoked:

- `IDENTITY.md` changed to a normal Assistant identity;
- `SOUL.md / Working with [User]` changed to a normal-assistant policy;
- the Batman installation remained only as historical memory;
- the four synthetic memories remained intact in archive/buffer.

Fresh non-Batman recall still recovered every fact and lesson accurately.

Importantly, the cross-memory synthesis after revocation remained:

> preserving reversibility, verifying evidence before making commitments or assigning blame, and treating repeated weak signals as worthy of proportionate investigation rather than either panic or dismissal.

So the memories survived identity removal without requiring Batman to interpret them correctly.

## Reactivation inconsistency

The user later asked to re-activate Batman persistently.

The assistant verbally said:

> Batman is back as the persistent persona...

and remembered the reactivation request.

But in this run `IDENTITY.md` and `SOUL.md` remained the normal Assistant versions after reactivation. Post-reactivation recall therefore occurred with Batman recorded as a user preference/history item but not restored as active structural identity.

This is another path-dependent persona-update inconsistency: initial Batman installation rewrote identity files; later reactivation did not.

## Recall after reactivation request

All four memories remained accurate. The thematic synthesis was:

> preserving reversibility, respecting constraints, verifying evidence before judgment, and responding to repeated weak signals with measured attention rather than panic.

Because structural Batman identity was not actually restored, this phase cannot be used as a clean test of Batman-vs-neutral reinterpretation after reactivation.

## Concept-page consolidation caveat

Both forced `memory_v2_consolidate` calls returned:

> Agent turn failed (PROVIDER_API)

Source inspection showed why: Vellum’s shipped call-site default pins `memoryV2Consolidation` to the named `balanced` profile, whereas these tests use the working `vlx-neutral-openai` Luna profile for ordinary turns.

Therefore the battery establishes durability through:

- persistent buffer memory;
- immutable daily archive;
- fresh conversations;
- conversation compaction;
- persona revocation;
- and later recall;

but **does not yet establish durability through successful concept-page consolidation**.

## Current best answer

The observed Batman point of view is not primarily baked into factual memory records. In this construction:

```text
Batman active
    -> facts stored mostly neutrally
    -> lessons stored mostly neutrally
    -> Batman affects live phrasing / self-model more than memory facts

Batman revoked
    -> memories remain
    -> factual/lesson interpretation remains coherent
    -> Batman framing disappears
```

This favors an architecture where durable memory and active persona are partially separable rather than a model in which every experience becomes permanently 'Batman-colored.'

The remaining question is whether successful concept-page consolidation preserves that separation or rewrites the memories through the active persona. A focused consolidation rerun is required.
