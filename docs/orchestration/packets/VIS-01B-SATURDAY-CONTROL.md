# Packet VIS-01B — Saturday Review Control

**Packet ID:** `VIS-01B-SATURDAY-CONTROL`  
**Phase:** `VIS-01`  
**State:** `needs_review` / non-admitted evidence  
**Approval class:** `read-only evidence record`; not execution authority  
**Decision owner:** Nate  
**Coordinator:** Codex  
**Target review date:** `2026-08-01`

## Evidence provenance

Nate approved the Saturday finish line, the bounded agent-team model, the worker-autonomy rule, the visual-decision evidence contract, the copy-approval rule, the page order, the quality threshold, the two-surface review model, the coordinator-owned feedback rule and the section-level lock rule in the current task.

Those decisions inform this evidence record. This file is not a valid V2 mutating packet and does not admit any worker or write. Corrections to this record are governed by `CTRL-V2-P05`.

## Objective

Turn the approved decisions into:

1. a measurable Saturday acceptance gate;
2. a section-level lock map for all six pages;
3. an evidence-backed unresolved queue;
4. dispatch criteria for later page-local worker packets.

## Generated evidence paths

- `docs/orchestration/packets/VIS-01B-SATURDAY-CONTROL.md`
- `docs/orchestration/SATURDAY_REVIEW_ACCEPTANCE_20260801.md`
- `docs/orchestration/VIS_SECTION_LOCK_MAP_20260730.md`
- `docs/orchestration/SATURDAY_FEEDBACK_REGISTER_20260801.md`
- `docs/orchestration/reviews/VIS-01B-SATURDAY-AUDIT.md`

All five paths are currently untracked. Admission-time absence was not independently evidenced. No existing frozen candidate artifact is writable.

## Permitted read-only reviewers

At most three disjoint reviewers may run concurrently:

- UI/source audit across the six pages;
- cross-page integration and staging audit;
- assumptions, evidence and decision-boundary audit.

Reviewers return inline receipts only. Workers cannot accept their own work.

## Section dispositions

- `locked`: accepted evidence and matching hash; no change without a superseding decision.
- `lock-candidate`: structurally/content-ready, but awaiting required rendered or human evidence.
- `technical-fix-allowed`: deterministic, page-local, reversible and acceptance-backed.
- `needs-Nate-decision`: subjective design, prioritisation or final acceptance.
- `needs-Carli-source`: factual copy, claim, biography, asset, catalogue or business-rule source required.
- `blocked-external`: consent, catalogue input, account, access, send, deployment or production dependency.
- `deferred`: intentionally excluded from the Saturday promise and invisible as unfinished work.

## Worker-autonomy rule

A later mutating worker may act without a further micro-decision only when the change is deterministic, reversible, independently testable and confined to the packet's exact page/file. It must stop on subjective design, public copy, factual claims, prices, catalogue data, shared navigation/styles/assets, infrastructure, commit, push, deploy, send or external-system work.

## Action / Verify / Done / Stop

**Action:** inventory and classify through read-only inspection; return findings for a separately admitted coordinator packet.

**Verify:** pre/post status; raw hashes for the six pages; no existing frozen payload change; `git diff --check`; every visible section has a disposition, owner and next gate.

**Done:** the acceptance gate and lock map are independently verified as evidence, and a separate packet can be proposed without reopening settled decisions.

**Stop:** any WIP/theme/content/asset edit, rendered local-only claim while Typekit can make an external request, catalogue inference, testimonial exposure, client contact, send, commit, push, deploy, Shopify, WooCommerce, Vercel or production action.
