# MapleMoon V2 Master Packet Register

**Candidate:** `CTRL-V2-CANDIDATE-20260730-001`
**Artifact status:** Proposed / `needs_review`
**Current authority:** GOV-01 until Nate ratifies this exact candidate
**Coordinator:** Codex

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-control-plane/v2",
  "document_id": "MASTER-PACKET-REGISTER",
  "candidate_id": "CTRL-V2-CANDIDATE-20260730-001",
  "status": "needs_review",
  "disposition": "needs-decision",
  "decision_owner": "Nate",
  "states": [
    "planned",
    "ready",
    "in_progress",
    "needs_review",
    "accepted",
    "blocked",
    "rejected",
    "superseded"
  ],
  "evidence_dispositions": [
    "needs-decision"
  ],
  "approval_classes": [
    "read-only",
    "local-review-only",
    "mutating-local",
    "git-gated",
    "external-gated",
    "production-gated"
  ],
  "packets": [
    {
      "id": "CTRL-V2-P01",
      "state": "accepted",
      "approval_class": "read-only",
      "owner": "Sol",
      "next_reviewer": "Codex"
    },
    {
      "id": "CTRL-V2-P02A",
      "state": "accepted",
      "approval_class": "read-only",
      "owner": "Security reviewer",
      "next_reviewer": "Codex"
    },
    {
      "id": "CTRL-V2-P02B",
      "state": "accepted",
      "approval_class": "read-only",
      "owner": "Synthesis reviewer",
      "next_reviewer": "Codex"
    },
    {
      "id": "CTRL-V2-P02C",
      "state": "accepted",
      "approval_class": "read-only",
      "owner": "Roadmap reviewer",
      "next_reviewer": "Codex"
    },
    {
      "id": "CTRL-V2-P02D",
      "state": "accepted",
      "approval_class": "read-only",
      "owner": "Planner",
      "next_reviewer": "Codex"
    },
    {
      "id": "CTRL-V2-P02E",
      "state": "needs_review",
      "disposition": "corrections-applied-pending-independent-verification",
      "approval_class": "read-only",
      "owner": "Plan checker",
      "next_reviewer": "Independent verification chain"
    },
    {
      "id": "CTRL-V2-P03",
      "state": "needs_review",
      "disposition": "needs-decision",
      "approval_class": "mutating-local",
      "owner": "Codex",
      "next_reviewer": "Sol then Nate"
    },
    {
      "id": "CTRL-V2-P04",
      "state": "ready",
      "approval_class": "read-only",
      "owner": "Sol/Codex",
      "purpose": "CTRL-V2-RATIFY",
      "required_bindings": [
        "candidate_id",
        "seven payload sha256-raw values",
        "review-chain sha256-raw",
        "Nate explicit decision and timestamp",
        "GOV-01 and July 29 draft supersession effects"
      ],
      "next_reviewer": "Nate"
    },
    {
      "id": "VIS-01A",
      "state": "planned",
      "approval_class": "local-review-only",
      "owner": "Codex",
      "next_reviewer": "Nate"
    },
    {
      "id": "CAT-01A-READ",
      "state": "blocked",
      "approval_class": "read-only",
      "owner": "Unassigned",
      "next_reviewer": "Codex"
    }
  ]
}
<!-- CONTROL-PLANE:END -->

## Register rules

- Only Codex updates this register under an admitted mutating-local packet.
- A worker may report evidence but may not mark its own packet `accepted`.
- `needs-decision` is valid only as a disposition attached to `needs_review`.
- A state transition needs the prior receipt, current hashes, dependency check and named next reviewer.
- A frozen candidate path cannot be reacquired without an explicit superseding packet and new candidate ID.
- Read-only packets have `writable_paths: []` and return receipts inline/manual. Persisting a receipt is a separate mutation.

## Live packet view

| Packet | Phase | State | Dependency | Gate / evidence | Next reviewer |
|---|---|---|---|---|---|
| `CTRL-V2-P01` | CTRL-V2 | accepted | Baseline | Sol reconciliation returned with required corrections | Codex |
| `CTRL-V2-P02A` | CTRL-V2 | accepted | P01 | Security review; corrections incorporated into P03 design | Codex |
| `CTRL-V2-P02B` | CTRL-V2 | accepted | P01 + P02A | Source/control synthesis | Codex |
| `CTRL-V2-P02C` | CTRL-V2 | accepted | P02B | Goal-backward roadmap | Codex |
| `CTRL-V2-P02D` | CTRL-V2 | accepted | P02C | File-by-file implementation plan | Codex |
| `CTRL-V2-P02E` | CTRL-V2 | needs_review | P02D | Initial BLOCK; seven bounded corrections applied | Independent checks |
| `CTRL-V2-P03` | CTRL-V2 | needs_review | P02A–P02E | Candidate creation and validator receipt | Sol → Nate |
| `CTRL-V2-P04` | CTRL-V2 | ready | P03 review closure | Ratification packet binding candidate/payload/review hashes and explicit supersession effects | Nate |
| `VIS-01A` | VIS-01 | planned | V2 ratification | Carob chooser remains local evidence | Nate |
| `CAT-01A-READ` | CAT-01 | blocked | V2 ratification + both inputs + PII preflight | Inputs unavailable in repository | Codex |

## Current evidence item

| ID | State | Disposition | Owner | Approval class | Evidence |
|---|---|---|---|---|---|
| `VIS-01-EVIDENCE-001` | needs_review | needs-decision | Nate | local-review-only | Carob chooser raw SHA-256 `976567ee99c1a367bd2317877bbb5672cf483d4d3478a18ea1b6826ff3cb68a7` |

Permitted now: source inspection of A/B/C.
Rendered local review: blocked while the chooser can request Adobe Typekit; requires a separately authorized sanitization or verified zero-network route.
Forbidden: selection by inference, WIP/theme merge, Shopify port, client send, upload, publication or production claim.

## Promotion rules

| Result | Action |
|---|---|
| Pass with evidence | Admit the next dependent packet |
| Pass with residual risk | Record owner/deadline; critical gates still need Nate |
| Needs human choice | Keep `needs_review`, add `needs-decision`, name Nate |
| Conflict or missing source | Block and return to source owner |
| Security block | Stop phase; no mutating worker |
| Missing receipt/hash/lock | Fail closed |
| External or production request | Require a new single-use Nate receipt |
