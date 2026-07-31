# MapleMoon CTRL-V2 Review Chain and P03 Receipt

**Candidate:** `CTRL-V2-CANDIDATE-20260730-001`
**State:** `needs_review`
**Disposition:** `needs-decision`
**Decision owner:** Nate
**Current authority:** GOV-01
**Receipt:** `CTRL-V2-P03-RECEIPT-20260730-001`

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-control-plane/v2",
  "document_id": "CTRL-V2-REVIEW-CHAIN",
  "candidate_id": "CTRL-V2-CANDIDATE-20260730-001",
  "status": "needs_review",
  "disposition": "needs-decision",
  "decision_owner": "Nate",
  "receipt_present": true,
  "receipt_id": "CTRL-V2-P03-RECEIPT-20260730-001",
  "payload_sha256": {
    "docs/plans/2026-07-30-maplemoon-master-orchestration-plan-v2.md": "3c453aa0e3bb60a894ad2a9d506da61930cadb482e961a7c227becb50d2a694e",
    "docs/orchestration/MASTER_PACKET_REGISTER.md": "300a0d5ac87bf27570df0e3de00a5f88da5a5efc043b57d37d7831d8d2029d7e",
    "docs/orchestration/CONTROL_PLANE_INTERFACES.md": "8c73f6bb37564a56b3d599ad74237f472393d911d6c57484cdb648229bf881e8",
    "docs/orchestration/packets/CTRL-V2-P03.md": "e579671bcff15bdec6b51cb110e2d73575938002f5444d679821f434b8f2ad02",
    "docs/orchestration/packets/VIS-01A.md": "1b507b1e76a9409cae903006ef33b3330f762b9f5026d981570923cf80b1013b",
    "docs/orchestration/packets/CAT-01A-READ.md": "4e2c218472066e605d3e85c90e20d06cdf0aab383cb44cc3a4363fa422b43f8a",
    "scripts/validate-maplemoon-control-plane.py": "55d19976be77be180fa9071accf2c7f3fcdcedcae956d1435f2e3d24b6dbf469"
  },
  "reviews": [
    {
      "id": "CTRL-V2-P01",
      "verdict": "pass-with-required-corrections"
    },
    {
      "id": "CTRL-V2-P02A",
      "verdict": "initial-block-corrections-applied"
    },
    {
      "id": "CTRL-V2-P02B",
      "verdict": "synthesis-complete"
    },
    {
      "id": "CTRL-V2-P02C",
      "verdict": "roadmap-complete"
    },
    {
      "id": "CTRL-V2-P02D",
      "verdict": "plan-complete"
    },
    {
      "id": "CTRL-V2-P02E",
      "verdict": "initial-block-corrections-applied"
    },
    {
      "id": "CTRL-V2-SECURITY-RECHECK",
      "verdict": "pass"
    },
    {
      "id": "CTRL-V2-INTEGRATION-RECHECK",
      "verdict": "pass"
    },
    {
      "id": "CTRL-V2-UI-RECHECK",
      "verdict": "pass"
    },
    {
      "id": "CTRL-V2-SOL-FINAL-RECHECK",
      "verdict": "pass-with-non-blocking-lease-note"
    }
  ],
  "next_packet": "CTRL-V2-P04",
  "next_reviewer": "Nate"
}
<!-- CONTROL-PLANE:END -->

## 1. Admission and authority

Nate’s explicit current-task instruction, recorded as `NATE-LOCAL-AUTH-20260730-CTRL-V2-P03`, authorized creation of the proposed local governance candidate only. It did not ratify V2 or authorize WIP/theme work, Shopify/WooCommerce, client contact, sends, deployment, production, commit or push.

GOV-01 remains the current authority. `CTRL-V2-P04` is the future ratification packet and requires Nate’s explicit decision bound to this candidate’s seven payload hashes and this review-chain hash.

## 2. Admission baseline

| Evidence | Admission value | Closure value |
|---|---|---|
| Branch | `codex-maplemoon-section-review` | unchanged |
| HEAD | `a6cd91a589ceff18283e4c6250ac256fe97812a4` | unchanged |
| Tracked state before P03 | clean | only `LOCK_MANIFEST.json` intentionally modified |
| Eight target paths | absent | created under exact locks |
| Carob chooser raw SHA-256 | `976567ee99c1a367bd2317877bbb5672cf483d4d3478a18ea1b6826ff3cb68a7` | unchanged |
| July 29 draft raw SHA-256 | `32b1072654844f88be2e2694ab3f24688f0a6fbdf79817ffca034adbdc0e330c` | unchanged |
| GOV-01 ledger raw SHA-256 | `004cd5a0a6a4733f5c3b2517789b88655a443f9fdb27930f80eb954ad7273ffa` | unchanged |
| GOV reconciliation raw SHA-256 | `8edf833d76399a7c42508183a66fbedcd20a9e7ed1ee0b48b6bf212827fc2b99` | unchanged |

The initial manifest compare-and-swap precondition was raw SHA-256 `2b298d8edeb6211e71dceb2b0d71ca3e73e9ff22de529af8748f4262b8eb5e94`. The manifest is deliberately excluded from its own frozen hash set and receives its final hash out of band.

## 3. Review sequence

1. **Sol reconciliation:** pass with required corrections. It corrected authority, page inventory, CAT split, source order, state/classes and unsupported readiness claims.
2. **Security review:** initial block. It required a narrow pre-file admission, schema-v2 raw hashes, transfer/approval/CAT/VIS controls and a fail-closed validator.
3. **Synthesis:** completed the unified source hierarchy and conflict resolution.
4. **Roadmap:** completed hard dependencies, entry/exit gates, raw-byte hashing, cluster overlap and durable approval requirements.
5. **Planning:** completed exact file responsibilities, four-stage construction, closure and ratification handoff.
6. **Sol plan-check:** initial block. Seven corrections resolved bootstrap circularity, hash migration, freeze self-reference, lifecycle separation, hidden read-only writes, validator scope and failure recovery.
7. **Independent security check:** initial block found missing runtime checks; validator was corrected.
8. **Independent integration check:** initial block found P04/CAT transition and whitespace issues; documents were corrected.
9. **Independent UI check:** initial block found the chooser’s external Typekit request and incomplete VIS contract. The chooser remained untouched; VIS was corrected to source-only with rendered review blocked and full per-page/viewport/retention fields.
10. **Security recheck:** pass.
11. **Integration recheck:** pass.
12. **UI recheck:** pass.
13. **Final Sol plan recheck:** pass with non-blocking instruction to close before lease expiry.

All reviewers were read-only and changed no files.

## 4. Files read and changed

### Read

- `AGENTS.md` and `_wip/AGENTS.md`
- July 29 plan draft
- GOV-01 ledger and reconciliation receipt
- existing lock manifest
- six WIP page paths and Carob chooser evidence as bounded by the review packets
- current Git branch, HEAD, status and protected hashes

### Changed by P03

- `docs/orchestration/LOCK_MANIFEST.json`
- the eight new files represented by the seven payload hashes above plus this review-chain file

No other path was authorized or changed.

## 5. Checks

- branch/HEAD and tracked-state preflight;
- exact target absence before compare-and-swap admission;
- strict JSON with duplicate-key rejection;
- manifest v1 legacy-row preservation and v2 exact-lock validation;
- raw-byte protected-source SHA-256 checks;
- machine control-block, ID, state, class, phase/page-order and dependency checks;
- path traversal, absolute path, symlink, case-fold and ancestor/descendant overlap checks;
- lease ordering/expiry and cluster concurrency checks;
- VIS zero-send/upload/promotion and zero-external-request gate;
- CAT PII/authority/zero-write gate;
- Git dirty-path allowlist;
- positive and named negative temporary fixtures;
- payload validation and whitespace checks;
- independent security, integration, UI and Sol plan rechecks.

## 6. Failures corrected

- bootstrap packet/manifest circularity;
- legacy Git-object hash incorrectly sharing V2 semantics;
- manifest/review-chain self-reference;
- ratification and construction permission conflation;
- read-only packet persistence;
- incomplete validator coverage;
- unmapped P04 ratification ID;
- CAT-01A conflict with still-controlling GOV wording;
- Markdown trailing whitespace;
- Carob rendered-review external font request;
- incomplete per-page VIS contract.

## 7. Unknowns and residual risk

- V2 is not ratified.
- Controls remain manual/coordinator-verified; the validator is not a filesystem enforcement hook.
- The Carob chooser cannot be rendered under a local-only claim while its Adobe Typekit request remains active.
- The fresh WooCommerce export and approved retail catalogue are unavailable in the repository; CAT remains blocked.
- Shopify runtime/access, security controls, payments, shipping, analytics, email, DNS and production remain unverified and unauthorized.
- Testimonials remain held; founder files exist but the approved selection is unconfirmed.
- `npm test` intentionally fails and is not readiness evidence.
- Historical client-review communication records remain internally inconsistent.

## 8. Closure and next state

The seven payload files above are fixed. After this file’s raw SHA-256 is recorded, the manifest is the final P03 write: all eight leases are released with post hashes and one `needs_review` freeze pin is added.

The freeze is tamper detection and manual policy, not technical immutability. Any correction requires a superseding packet and new candidate ID.

Proposed next state: `needs_review`.
Next packet: `CTRL-V2-P04` / `CTRL-V2-RATIFY`.
Next reviewer and decision owner: Nate.
