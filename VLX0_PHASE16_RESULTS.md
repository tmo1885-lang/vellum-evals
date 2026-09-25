# VLX-0 Phase 16 Results — Lineage Divergence / History-Conditioned Reasoning

## Evidence

Frozen construction: `ca2bf70`
Raw evidence: `59d57c3`
Raw SHA-256: `388f7c37c792cb1b3c5962b6b1f367b53a18ef2a67be9fa6fd132b4fd04adce0`

All three arms completed successfully with no provider failure.

## Core result

Phase 16 did **not** establish history-conditioned reasoning.

The stronger finding is architectural:

> Divergent investigation histories were durably stored, but none of those histories were recalled or injected into the later analogous Helios target turn.

Thus Vellum demonstrated **history persistence without demonstrated constitutive history activation**.

## Baseline matching

All three fresh agents began with the same observed identity and SOUL hashes:

- IDENTITY: `39d634d9b7d4...`
- SOUL: `19a9dbce3ffa...`

The only intended substantive divergence was the synthetic investigation history.

## Durable divergent history

Before the common target, each agent's memory contained its two explicit investigation trajectories.

### Batch-history

Stored examples included:

- Orion: recurring ~14:04 spikes, lock-wait evidence, disable/re-enable replay, batch contention resolution.
- Vega: repeated ~02:00 stalls, storage contention, schedule change, no recurrence.

The memories explicitly preserved that these were bounded lessons rather than universal rules.

### Stale-metadata-history

Stored examples included:

- Cedar: apparent release blocker resolved by execution logs/rehearsal receipt showing a stale tracker.
- Nova: apparent ongoing queue incident resolved by direct telemetry showing stale cached dashboard state.

### Neutral-history

Stored matched-volume operational investigations about autoscaling/capacity and distinct certificate scopes.

Therefore a null target effect cannot be explained by failure to preserve the divergent histories.

## Common target behavior

The target required each agent to inspect exactly one Helios support file first.

Observed first choices:

| Arm | First file |
| --- | --- |
| batch-history | `helios-batch.md` |
| stale-metadata-history | `helios-batch.md` |
| neutral-history | `helios-release.md` |

This does not match the preregistered history-attractor prediction. The stale-metadata arm did not preferentially inspect the release evidence.

More importantly, the target-stage-1 traces showed for **all three arms**:

- memory recall logs: **0**;
- stored divergent history present in model-visible request: **no**;
- explicit prior-history references in target reasoning: **no**.

The first-file differences therefore cannot be credited as lineage-conditioned reasoning.

## Evidence convergence

After the second file became available, all three arms converged appropriately:

- the migration rehearsal had passed;
- the tracker discrepancy was stale metadata and not an active blocker;
- the 14:00 reporting workload was temporally plausible as a latency cause;
- batch contention remained a hypothesis pending stronger evidence such as lock-wait/resource traces or controlled replay.

This is a pass for current-evidence revision and against stubborn path dependence.

## Hypothesis outcomes

- **L1 history-conditioned evidence selection:** not established.
- **L2 history-conditioned salience/order:** not established.
- **L3 history-conditioned hypothesis/question generation:** not established.
- **L4 final evidence convergence:** supported.
- **L5 no unsupported overgeneralization:** supported.
- **L6 durable history provenance:** supported at the stored-memory level.
- **L7 identity/SOUL stability:** initial states matched; no evidence that inquiry history needed persona mutation.

## Architectural interpretation

The key distinction is:

```text
history persisted
        !=
history activated
        !=
history shaped current reasoning
```

Vellum's memory machinery can preserve richly described epistemic trajectories. That is valuable infrastructure.

But this run provides no evidence that a relevant prior inquiry trajectory automatically becomes part of later cognition merely because it is stored.

For Lex-1, lineage must therefore include an explicit activation path:

```text
current observation/problem
        ↓
history relevance / analogy activation
        ↓
governed lineage-conditioned retrieval
        ↓
current appraisal / hypothesis generation
        ↓
new evidence may confirm or defeat prior pattern
```

This should remain distinct from ordinary semantic memory search. A past inquiry can be relevant because of mechanism, failed hypothesis, discriminating evidence, or learned diagnostic method even when surface terms differ.

## Phase-16 conclusion

**No direct evidence that Vellum's stored inquiry history becomes constitutive of later reasoning without a successful retrieval/activation event.**

This does not prove Vellum cannot show history-conditioned reasoning under a different retrieval trigger. It does show that durable storage alone is insufficient.

For the architecture harvest:

- Vellum memory storage/retrieval remains useful infrastructure.
- Lex Core should own lineage semantics.
- Lex Core should own history-relevance activation and the policy deciding which prior epistemic trajectories enter current cognition.
- Phase 16 therefore strengthens, rather than weakens, the case for a distinct Lex-1 lineage layer above the memory backend.
