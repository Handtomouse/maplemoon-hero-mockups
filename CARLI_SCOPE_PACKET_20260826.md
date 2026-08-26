# Carli scope-close packet — 2026-08-26

## Answer to the 23 Aug question

Carli asked: “is it just doing the Shopify now and we are done?”

Almost: the agreed work is in the final Shopify, approval, and QA closeout rather than another open-ended design round. It is not safe to say “Shopify is still to be built” or “everything else is done” until the stale Shopify premise and the recorded local QA holds are reconciled.

## What remains in scope

1. **Shopify S1B — current-state reconciliation first.** The 19 Aug repository review says the Etheryx 1.6.0 update was created as a new unpublished theme and measured, with port/render/UAT still open. Radar thread `#1007`, last touched 24 Aug, instead says the site link is live and PASSING and six Eclipse Bites products with 16 priced variants are already in Shopify as DRAFT. That newer radar state makes the older “Shopify is next” premise stale. Confirm the actual store/theme state before estimating or repeating work, then close only the outstanding S1B configuration, port, and QA gates. No publish is authorised here.
2. **Close recorded website QA holds.** These are completion defects within the existing scope, not a new design round: icon hash drift, six design-system baseline holds, sub-44 Shop/FAQ controls, the contaminated 390 ritual proof, and the Our Story mobile semantic/bleed findings.
3. **Final sign-off.** Once Shopify reconciliation, client gates, and QA are closed, the agreed website scope can be called done. Any later feature, catalogue expansion, or design change should be separately scoped.

## What gates on Carli

- **Founder photos / Our Story:** approve the final founder image choices and crops. Current assets are wired and pre-screened, but that is not client acceptance.
- **Bites ruling:** acknowledge the 23 Aug interpretation of her wording — remove the “Bites” label/sections, keep the products. The products should not be deleted on the strength of the wording alone.

## Not a Carli gate

- Nate owns access/authority, final technical acceptance, and any publish decision.
- Current Shopify/store truth must be verified before anyone promises the remaining effort or completion date.
- No push, merge, Shopify change, Vercel action, send, or publish was performed for this packet.

## Draft assumptions

- Tone: concise, warm, and answer-first; the full client thread was not available in this workspace.
- Intent: answer the closeout question, name the two client decisions, and avoid claiming an unverified finish.
- Thread state: based on Nate's supplied 23 Aug quote, the 23 Aug Bites ruling, repository evidence, and read-only radar thread `#1007`.
- Missing detail: the current Shopify S1B state is contradictory across 19–24 Aug records, so the draft describes reconciliation instead of asserting it is complete or untouched.

## Five-line draft for Nate to edit — unsent

Hi Carli — yes, we're in the final Shopify-and-sign-off stretch, rather than another open-ended design round.
The latest project record suggests Shopify may already be further along than that summary, so I'm reconciling the current S1B state before I call it closed.
Could you please confirm the final founder photos for Our Story?
For Bites, I've read your note as removing the “Bites” label/sections while keeping the products — please confirm that's right.
Once those two approvals and the final Shopify/QA checks are closed, the agreed website scope is done.
