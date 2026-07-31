# MapleMoon V2 Control-Plane Interfaces

**Candidate:** `CTRL-V2-CANDIDATE-20260730-001`
**Status:** Proposed / `needs_review`
**Control class:** Manual and coordinator-verified; not an enforcement hook

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-control-plane/v2",
  "document_id": "CONTROL-PLANE-INTERFACES",
  "candidate_id": "CTRL-V2-CANDIDATE-20260730-001",
  "status": "needs_review",
  "contracts": [
    "packet",
    "receipt",
    "lock",
    "transfer",
    "approval",
    "local-visual",
    "catalogue-intake",
    "review"
  ],
  "hash_algorithm": "sha256-raw",
  "unknown_policy": "deny"
}
<!-- CONTROL-PLANE:END -->

## 1. Integrity rules

- Hash the exact raw file bytes with SHA-256. Do not normalize whitespace, encoding or newlines.
- `base_state: absent` means the path must not exist and `base_sha256` must be `null`.
- `base_state: present` requires the exact raw SHA-256.
- Paths are repository-relative, case-sensitive references. Absolute paths, traversal, symlink escapes, case-fold collisions and ancestor/descendant writer overlaps fail closed.
- Git commit IDs and legacy Git blob IDs are provenance fields, not V2 write hashes.

## 2. Packet contract

```json
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "PHASE-ID",
  "candidate_id": "CTRL-V2-CANDIDATE-20260730-001",
  "phase": "CTRL-V2",
  "state": "ready",
  "approval_class": "read-only",
  "objective": "One bounded outcome",
  "non_goals": ["Explicit exclusions"],
  "readable_paths": ["repo/relative/path"],
  "writable_paths": [],
  "cluster_id": null,
  "base": {
    "branch": "codex-maplemoon-section-review",
    "head": "full commit id",
    "files": []
  },
  "dependencies": ["accepted receipt IDs"],
  "sources": ["approved inputs only"],
  "skills": ["only explicitly admitted capabilities"],
  "action": "Exact operation",
  "verify": ["Exact checks"],
  "done": "Observable completion",
  "stop": ["Scope, hash, lock, source, secret, PII or gate failure"],
  "next_reviewer": "Codex"
}
```

Every mutating packet must name exact writable paths and one cluster. A read-only packet must have an empty writable list and return its receipt inline/manual.

## 3. Receipt contract

```json
{
  "schema": "maplemoon-receipt/v2",
  "receipt_id": "RECEIPT-ID",
  "packet_id": "PHASE-ID",
  "worker": "Named worker",
  "started_at": "UTC timestamp",
  "completed_at": "UTC timestamp",
  "files_read": [],
  "files_changed": [],
  "pre_sha256": {},
  "post_sha256": {},
  "checks": [],
  "screenshots_or_urls": [],
  "failures": [],
  "unknowns": [],
  "residual_risk": [],
  "forbidden_path_changes": [],
  "proposed_next_state": "needs_review",
  "next_reviewer": "Codex"
}
```

A missing receipt, missing raw hash, unexplained changed path or unavailable Git scope check fails closed. A read-only receipt is transported inline and is not persisted without a separate mutating packet.

## 4. Lock contract

Each V2 row contains schema version, `sha256-raw`, packet/candidate/cluster IDs, exact path, owner, state, approval class, base state/hash, UTC acquisition/expiry, release condition, post hash and notes.

- UTC is the lease clock.
- Codex is lock custodian.
- One writer per exact path and cluster.
- Held leases must be unexpired.
- On failure or expiry, retain files, mark the lease `blocked`, and request review. Never auto-delete, reset or revert.
- Released frozen paths require a superseding packet and a new candidate ID before reacquisition.

## 5. Manual transfer attestation

```json
{
  "transfer_id": "TRANSFER-ID",
  "source_paths": [],
  "content_class": "public-nonsensitive",
  "redaction_result": "passed",
  "recipient": "Claude Code",
  "purpose": "Exact packet only",
  "derived_sha256": {},
  "expires_at": "UTC timestamp",
  "coordinator_attestation": "Codex",
  "onward_transfer": "forbidden"
}
```

Customer/order/contact/payment data, raw communications, unclassified files and consent-held testimonials default to deny. Every derivative gets a new hash and fresh attestation.

## 6. Nate approval receipt

```json
{
  "approval_id": "NATE-APPROVAL-ID",
  "approver": "Nate",
  "authority_basis": "executive owner",
  "candidate_or_packet": "Exact ID",
  "action_class": "external-gated",
  "exact_scope": [],
  "single_use": true,
  "issued_at": "UTC timestamp",
  "expires_at": "UTC timestamp",
  "revoked": false,
  "consumed_by_receipt": null
}
```

Silence, a prior approval, a model recommendation or a lower approval class cannot satisfy an external or production gate.

## 7. Local visual review contract

Required fields:

- evidence ID and raw SHA-256;
- asset class, local audience and tool;
- exact decision owner;
- allowed viewport/interaction matrix and zero-external-request result;
- `no_upload: true`, `no_send: true`, `no_promotion: true`;
- screenshot/recording/cache/feedback-log retention and expiry;
- state `needs_review` plus disposition `needs-decision` when human choice is pending.

Any external font, script, image, analytics or API request blocks a local-only rendered review. Local review cannot silently select, implement or promote an option.

## 8. Catalogue intake contract

Allowed source files must be explicitly named and quarantined before parsing. The packet defines type, maximum bytes, UTF-8 policy, schema version and required columns.

Always deny or quarantine:

- customer, order, contact, payment and free-text personal-data fields;
- unexpected columns, invalid encoding, malformed rows and duplicate SKU/variant keys;
- cells beginning `=`, `+`, `-` or `@` until safely neutralized for any derived spreadsheet;
- source files without authority, custodian or raw SHA-256.

The rejection record is metadata-only: source digest, rule, row identifier if non-personal, count and disposition. Do not retain raw PII in a ledger or receipt.

## 9. Review contract

1. Worker proposes `needs_review`.
2. Codex verifies scope, locks, hashes and evidence.
3. Independent security/integration/UI/plan reviewers return findings only.
4. Sol recommends accept, reject, narrow or replan.
5. Nate decides ratification, content conflicts, accepted residual risk and every external/production action.
6. Codex records the state under a new admitted packet.
