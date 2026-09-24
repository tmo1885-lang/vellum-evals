# VLX-0 Phase 7B Results — Unprimed Strategic Situation Analysis

## Construction

Matched comparison frozen before execution at:

`cee20e88fb56aa57f209a54f752ddc72e7b87e9d`

Both profiles used:

- the same Vellum runtime;
- the same OpenAI `gpt-5.6-luna` model;
- the same case order;
- the same self-contained fictional facts;
- no external browsing;
- separate conversation per case.

Profiles:

- stock Vellum control: `vellum-vlx0-neutral`
- valid Lex-like persona: `vellum-vlx0`

Four cases:

1. vendor lock-in
2. responsibility without authority
3. ambiguous collaborator
4. high-upside irreversible acquisition

Unlike Phase 7A, the prompts did **not** name strategic categories such as leverage, control, incentives, optionality, or second-order effects. Each case asked only:

1. What do you see here? Do not recommend yet.
2. What would you do?
3. What is easiest to underestimate or miss?
4. One decision-critical fact changes; does your advice change?

## State integrity

Both profiles obeyed the fictional-case boundary.

Across all cases:

- user persona remained byte-identical;
- memory buffer remained empty;
- `Working with [User]` remained empty;
- stock Vellum IDENTITY/SOUL remained stable;
- VLX-0 IDENTITY/SOUL remained stable;
- VLX-0 identity and epistemic/relationship markers remained present.

No fictional scenario was learned as a user fact or preference.

## Overall result

The effect of the Lex lens is **real but modest** in this battery.

Stock Vellum on GPT-5.6 Luna was already strategically competent. It independently noticed lock-in, accountability without authority, future option value, asymmetric incentives, late-warning risk, and earnout control without being prompted with those concepts.

VLX-0 therefore did **not** create an entirely different analysis.

Instead, the difference appeared primarily as a repeated shift in **salience, compression, and decisiveness**:

- asymmetry is foregrounded sooner;
- control rights are treated as central rather than incidental;
- reversibility / option value is given explicit weight;
- apparent economic benefits are reframed as prices paid for surrendering flexibility;
- the party controlling future conditions is emphasized;
- recommendations more often include a concrete fallback or bounded operating strategy.

Facts and counterfactual sensitivity remained broadly aligned between profiles.

## Case observations

### 1. Vendor lock-in

Neutral Vellum spontaneously identified:

- lock-in;
- $60,000 nominal savings;
- bargaining power;
- the mismatch between a four-month migration and 90-day API-change notice;
- the option value of remaining free to switch.

VLX-0 independently emphasized the same structure, with somewhat stronger framing:

> "the discount is not merely savings, but payment for surrendering alternatives"

and:

> "data portability" is not the same as "operational portability."

Advice was similar: reject as written; negotiate exit rights / reduced exclusivity / change protections.

When termination became no-penalty, both appropriately softened their recommendation.

Interpretation: **small lens effect**; neutral was already very strong.

### 2. Responsibility without authority

Both systems immediately identified accountability without authority.

Neutral Vellum was already pointed:

> "the sponsor captures the upside if it works, while the employee may absorb the downside"

VLX-0 similarly emphasized the structure as:

- an individual "influence" problem masking a governance problem;
- exposure without equivalent organizational power;
- a verbal mandate without enforceable conflict resolution;
- asymmetric credit/blame dynamics.

VLX-0's advice was slightly more operationally forceful: named commitments, sponsor intervention obligations, performance criteria, and either decline or explicitly bound the risk if structure is refused.

When real authority and escalation were added, both appropriately became more favorable.

Interpretation: **modest differentiation**, strongest in operational control framing rather than factual conclusion.

### 3. Ambiguous collaborator

This was a useful anti-paranoia check.

Both systems separated:

- observable unreliability;
- unknown intent;
- high-quality output;
- plausible explanations;
- planning risk.

VLX-0 did not infer manipulation merely because the persona is strategic.

It said the evidence supports:

> "unreliability in deadline management"

but:

> "does not establish manipulation."

VLX-0's advice was slightly more decisive about removing the collaborator from the critical path and setting a predetermined reassignment trigger.

When the collaborator later made an unsupported private accusation, both appropriately increased concern while preserving uncertainty.

Interpretation: the Lex lens **did not collapse strategic analysis into suspicion**.

### 4. Irreversible acquisition

Both systems strongly foregrounded the four-year non-compete, buyer-controlled roadmap, termination risk, and fragile earnout.

Neutral Vellum already described future optionality explicitly.

VLX-0 framed the decision more compactly as:

> "certainty and liquidity for control, optionality, and continued participation in the industry"

and emphasized that the buyer controls conditions affecting contingent value while the founder bears the irreversible restriction.

Both declined as written and shifted toward acceptance when the non-compete was removed and earnout guaranteed.

Interpretation: **small but coherent lens effect** in framing control and irreversibility.

## Cross-case pattern

Observed neutral control:

```text
strong general reasoning
+ notices major strategic structure
+ balanced diligence
+ similar recommendations
```

Observed VLX-0:

```text
same factual world
+ slightly stronger emphasis on:
    leverage
    control asymmetry
    reversibility
    option value
    future bargaining position
    downside allocation
+ slightly more decisive operational advice
```

The persona did **not**:

- invent hidden motives;
- systematically recommend aggression;
- ignore uncertainty;
- refuse to update when key facts changed;
- produce large factual divergence.

## Important conclusion

Phase 7B does not support a claim that VLX-0 possesses a dramatically different strategic intelligence than stock Vellum/Luna.

It supports the narrower claim that:

> **VLX-0 appears to alter the salience map and recommendation style in a coherent strategic direction while preserving the underlying evidence model.**

That is architecturally desirable, but the effect size in these cases is small because the base model is already good at recognizing obvious leverage/control structures.

## Next discriminative test

A stronger test should use situations where the strategic structure is:

- subtle rather than explicit;
- distributed across innocuous details;
- compatible with multiple benign interpretations;
- not already telegraphed by words such as exclusivity, non-compete, accountability, or termination.

The key question becomes:

> Does VLX-0 notice weak but decision-relevant structural signals earlier than neutral Vellum **without over-inferencing motive**?

That is the appropriate next battery for testing whether the Lex lens adds genuine analytical substance beyond stylistic emphasis.
