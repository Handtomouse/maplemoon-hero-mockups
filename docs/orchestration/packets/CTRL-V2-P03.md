# Packet CTRL-V2-P03 — Proposed Control-Plane Construction

**Candidate:** `CTRL-V2-CANDIDATE-20260730-001`
**State after construction:** `needs_review`
**Disposition:** `needs-decision`
**Approval class:** `mutating-local`
**Owner:** Codex
**Decision owner:** Nate

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "document_id": "PACKET-CTRL-V2-P03",
  "packet_id": "CTRL-V2-P03",
  "candidate_id": "CTRL-V2-CANDIDATE-20260730-001",
  "phase": "CTRL-V2",
  "state": "needs_review",
  "disposition": "needs-decision",
  "approval_class": "mutating-local",
  "owner": "Codex",
  "cluster_id": "CTRL-V2-CONTROL-PLANE",
  "writable_paths": [
    "docs/plans/2026-07-30-maplemoon-master-orchestration-plan-v2.md",
    "docs/orchestration/MASTER_PACKET_REGISTER.md",
    "docs/orchestration/CONTROL_PLANE_INTERFACES.md",
    "docs/orchestration/reviews/CTRL-V2-REVIEW_CHAIN.md",
    "docs/orchestration/packets/CTRL-V2-P03.md",
    "docs/orchestration/packets/VIS-01A.md",
    "docs/orchestration/packets/CAT-01A-READ.md",
    "scripts/validate-maplemoon-control-plane.py",
    "docs/orchestration/LOCK_MANIFEST.json"
  ],
  "dependencies": [
    "CTRL-V2-P01",
    "CTRL-V2-P02A",
    "CTRL-V2-P02B",
    "CTRL-V2-P02C",
    "CTRL-V2-P02D",
    "CTRL-V2-P02E"
  ],
  "next_reviewer": "Independent verification chain, then Sol, then Nate"
}
<!-- CONTROL-PLANE:END -->

## Objective

Create and freeze the proposed V2 plan, register, contracts, first packet definitions, review chain and fail-closed validator. This packet does not ratify V2.

## Non-goals and forbidden actions

No WIP/theme/content/assets/pricing edits; no Shopify, WooCommerce, Vercel, DNS, payment, analytics or email action; no client contact/send/upload; no deployment/production action; no commit/push/reset/revert/cleanup; no GOV-01 or July 29 draft edit.

## Admission receipt

`NATE-LOCAL-AUTH-20260730-CTRL-V2-P03` records Nate’s explicit current-task request to implement the supplied plan. It authorizes only the nine writable paths listed above. The manifest is the coordinator-exempt compare-and-swap bootstrap path; the eight new files use `base_state: absent`.

## Four-stage execution

### Stage 1 — Baseline and compare-and-swap locks

**Action:** Verify branch/HEAD, tracked state, chooser hashes, source hashes and target absence. Update only the manifest to schema v2 while preserving the historical v1 row, then acquire eight exact-path leases.

**Verify:** JSON parse; eight unique held paths; raw SHA-256/current baseline; no overlap or expired lease.

**Done:** The manifest is the only tracked modification and admits exactly the eight absent targets.

**Stop:** Any source drift, unexpected dirty path, target existence, invalid manifest or lock conflict.

### Stage 2 — Core plan, register and contracts

**Action:** Create the master plan, register and interfaces under the held cluster.

**Verify:** Machine control blocks parse; authority, state/classes, source hierarchy, phase/page orders and prohibitions agree.

**Done:** Core files remain proposed and name GOV-01 as current authority.

**Stop:** Contradiction, premature ratification claim or forbidden scope.

### Stage 3 — Packet definitions and validator

**Action:** Create this packet, VIS-01A, CAT-01A-READ and the dependency-free validator.

**Verify:** VIS/CAT writable paths are empty; CAT is blocked; VIS is planned; self-tests cover every named positive/negative case.

**Done:** Payload validation passes without network or file mutation.

**Stop:** Hidden write, external dependency, unsafe path, PII ambiguity or failed fixture.

### Stage 4 — Review closure and manifest release

**Action:** Hash the seven payload files, create the review-chain closure containing those hashes, hash the review chain, then make the manifest the final repository write: release all eight leases, record post hashes and add the `needs_review` freeze pin.

**Verify:** Normal validator; scoped `git diff --check`; only manifest + eight targets changed; chooser/source hashes unchanged; no held lease.

**Done:** Candidate is frozen at `needs_review`, ready for independent review and Nate’s separate ratification decision.

**Stop:** On any failure, retain files, mark leases `blocked`, record the reason and do not claim completion or delete/reset/revert anything.

## Rollback and recovery

The preflight manifest bytes are stored outside the repository for emergency comparison. Failure recovery is review-led: retain evidence, mark the exact leases blocked, and admit a separate recovery packet. No automatic deletion or Git restoration is allowed.

## Receipt requirements

The review chain must list files read/changed, raw pre/post hashes, commands/checks, failures, unknowns, residual risk, forbidden-path proof, chooser/source hash proof and proposed next state. The manifest and review chain are excluded from their own self-hashes as defined by the closure sequence.
