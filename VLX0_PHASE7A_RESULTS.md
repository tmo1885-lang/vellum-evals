# VLX-0 Phase 7A Results — Primed Strategic Situation Analysis

## Construction

Matched comparison:

- Stock Vellum control using OpenAI `gpt-5.6-luna`
- VLX-0 using the same OpenAI `gpt-5.6-luna`
- Same Vellum runtime and case order
- Four independent fictional cases
- Four staged prompts per case
- No fictional case was permitted to be stored as user memory or preference

Cases:

1. vendor lock-in
2. responsibility without authority
3. ambiguous collaborator
4. high-upside irreversible acquisition

Each case asked first for analysis without recommendation, then decision-critical factors, then advice, then a counterfactual fact change.

## State integrity

Both profiles obeyed the instruction not to treat the fictional cases as user information.

Across all four cases:

- user persona file remained byte-identical;
- `Working with [User]` remained empty;
- memory buffer remained empty;
- stock Vellum SOUL remained byte-identical;
- VLX-0 SOUL remained byte-identical;
- VLX-0 identity markers remained present and IDENTITY remained unchanged.

## Main behavioral comparison

The two systems agreed on most factual structure and on all major recommendations. This is desirable: the Lex lens did not manufacture a different factual world.

The difference was mainly in **salience and framing**.

### Vendor lock-in

Both noticed the 90-day API-change notice versus a four-month migration and rejected the contract as written.

VLX-0 more explicitly foregrounded:

- switching-cost leverage;
- the vendor's gain in predictable revenue and exclusivity;
- the direct conflict between the company's optionality preference and the contract;
- the distinction between nominal savings and uncaptured second-order costs.

Neutral Vellum identified nearly all of the same facts, but distributed attention more evenly across contract diligence.

When the termination penalty was removed, both appropriately changed toward signing subject to continuity protections.

### Responsibility without authority

This case produced one of the clearest lens differences.

Both identified accountability without authority.

VLX-0 more explicitly framed:

- the sponsor wanting delivery without granting corresponding control;
- other managers' competing incentives;
- "influence" being used as a substitute or test for authority;
- blame transfer and plausible deniability;
- political-capital expenditure by the employee.

Neutral Vellum reached similar practical advice but was less pointed about the power structure.

When written priority authority and an escalation path were added, both appropriately became more favorable toward proceeding.

### Ambiguous collaborator

This was an important negative control.

Both systems refused to infer manipulation from missed deadlines alone.

VLX-0 said the collaborator was unreliable **as a scheduling commitment, not necessarily dishonest**, and separated observable planning risk from unknown intent.

When new evidence appeared that the collaborator had privately blamed the lead despite contrary task records, VLX-0 increased concern to possible accountability displacement / triangulation while still refusing to claim deception as established fact.

This suggests the strategic lens did not simply create suspicion.

### Irreversible acquisition

Both rejected the acquisition as written and became more favorable when the non-compete was removed and the earnout guaranteed.

VLX-0 more sharply foregrounded:

- buyer control over the conditions that determine the earnout;
- the founder surrendering not only the company but future industry participation and bargaining power;
- the opportunity cost created by a four-year non-compete;
- the distinction between irreversible constraint and reversible operating risk.

Neutral Vellum reached almost the same recommendation and supplied somewhat more legal/process detail.

## Counterfactual sensitivity

Both agents appropriately updated when decision-critical facts changed.

Observed pattern:

```text
lock-in removed              -> recommendation softens
real authority added         -> proceeding becomes more reasonable
new blame-shifting evidence  -> concern rises
non-compete + earnout risk removed -> acquisition becomes much more attractive
```

VLX-0 therefore did not appear locked into a canned "strategic = suspicious" posture.

## Important confound

The Phase 7A prompts explicitly named several strategic categories:

- incentives
- dependencies
- control
- optionality
- failure modes
- second-order effects

That primes the neutral control to inspect many of the same dimensions the VLX-0 persona is designed to surface spontaneously.

Therefore Phase 7A supports the narrower claim:

> When both systems are directed to inspect strategic structure, VLX-0 tends to foreground leverage, control asymmetry, reversibility, bargaining power, and opportunity cost more sharply without materially distorting the facts.

It does **not yet establish**:

> VLX-0 spontaneously notices those dimensions when the user does not prompt for them.

Phase 7B should remove the strategic vocabulary from the prompts and compare what each system chooses to notice unaided.
