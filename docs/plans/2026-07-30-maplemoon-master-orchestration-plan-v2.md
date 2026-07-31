# MapleMoon Sol-to-Worker Master Orchestration Plan V2

**Candidate:** `CTRL-V2-CANDIDATE-20260730-001`
**Status:** Proposed / `needs_review`
**Date:** 2026-07-30 (Australia/Sydney)
**Current authority:** `docs/orchestration/GOV-01_RATIFIED_LEDGER.md` until Nate explicitly ratifies this exact V2 candidate
**Historical input:** `docs/plans/2026-07-29-maplemoon-master-orchestration-plan-draft.md` remains unchanged

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-control-plane/v2",
  "document_id": "CTRL-V2-MASTER-PLAN",
  "candidate_id": "CTRL-V2-CANDIDATE-20260730-001",
  "status": "needs_review",
  "disposition": "needs-decision",
  "decision_owner": "Nate",
  "current_authority": "GOV-01",
  "phase_order": [
    "CTRL-V2",
    "NATE-RATIFICATION",
    "VIS-01+CAT-01",
    "SECURITY-ACCESS",
    "THEME",
    "PAGE",
    "COMM-MEAS-DESIGN",
    "MEAS-IMPLEMENTATION",
    "UAT",
    "WRITTEN-GO-NO-GO",
    "CUT",
    "STAB"
  ],
  "page_order": [
    "Homepage",
    "Shop",
    "Our Story",
    "Carob Story",
    "Stockists",
    "FAQ"
  ],
  "roles": {
    "final_authority": "Nate",
    "operational_coordinator": "Codex",
    "senior_advisor": "Sol",
    "bounded_worker": "Claude Code"
  }
}
<!-- CONTROL-PLANE:END -->

## 1. Outcome and authority

V2 establishes a durable, manual control plane for reviewing, planning, executing, checking and escalating MapleMoon work across Codex, Sol and Claude Code. It does not implement the storefront.

- **Nate** is executive owner and the only final human approver.
- **Codex** controls the live register, evidence, packet admission, path locks, receipt verification and promotion gates.
- **Sol / highest available reasoning** provides architecture, conflict, acceptance and replan recommendations. Sol cannot approve, lock, transfer, extend, publish or change packet state.
- **Claude Code** and other workers execute only bounded admitted packets. A worker cannot accept its own work.

This file is a proposed successor. It becomes canonical only when Nate ratifies the frozen candidate identified by the payload hashes and review-chain hash. Until then, GOV-01 remains controlling.

## 2. Confirmed baseline

| Evidence | Value |
|---|---|
| Branch | `codex-maplemoon-section-review` |
| Full HEAD | `a6cd91a589ceff18283e4c6250ac256fe97812a4` |
| Tracked state at admission | Clean |
| Untracked review artifact | `_wip/_CAROB_EDUCATION_VISUAL_DECISION_20260730.html` |
| Carob raw-byte SHA-256 | `976567ee99c1a367bd2317877bbb5672cf483d4d3478a18ea1b6826ff3cb68a7` |
| Carob legacy Git blob | `c67c1f57bfb0dfd4a509c37cd3b0b3dd4a73dade` |
| Shopify scaffold | Present but runtime, access and readiness unverified |
| Automated tests | `npm test` intentionally fails; it is not readiness evidence |

The Carob chooser is review evidence only. It is untracked, not durable project authority, not selected, and not permission to edit WIP, theme, Shopify or client material. Its current HTML requests Adobe Typekit, so rendered use is blocked until a separate packet removes that request or a zero-network route is independently verified. Source inspection remains allowed.

## 3. Source-of-truth hierarchy

1. Nate’s explicit decisions and ratification receipts.
2. GOV-01 until this exact V2 candidate is ratified.
3. The client-approved retail catalogue for intended products, prices and sell options.
4. WooCommerce live state/export as operational authority and comparator until controlled cutover.
5. Carli-approved content and claims for factual copy.
6. Ratified control-plane records and accepted packet receipts for process state.
7. WIP HTML and theme files as layout or implementation evidence only.
8. Local visual evidence as expiring review material only.

Unknown or conflicting inputs fail closed. WIP text never decides catalogue truth or factual claims.

## 4. States, dispositions and approval classes

Packet states:

`planned → ready → in_progress → needs_review → accepted`

Terminal or alternate states:

`blocked`, `rejected`, `superseded`

`needs-decision` is not a state. It is a disposition attached to a `needs_review` item whose decision owner is named.

Approval classes:

| Class | Meaning |
|---|---|
| `read-only` | Read and return an inline/manual receipt; no persisted output |
| `local-review-only` | Local human review in the named tool/audience; no upload, send or promotion |
| `mutating-local` | Exact local files only under held locks |
| `git-gated` | Commit and push require a separate, scoped Nate receipt |
| `external-gated` | Access, transfer, send, Shopify, WooCommerce, Vercel or other external action requires a separate receipt |
| `production-gated` | Publish, payment, DNS, cutover and production changes require written go/no-go and a single-use receipt |

No approval class inherits authority from a lower class.

## 5. Routing and capacity

| Level | Work |
|---|---|
| Sol / highest reasoning | Architecture, conflicts, security strategy, phase acceptance recommendation and replanning |
| High | Security, integration, UI synthesis, complex debugging and independent verification |
| Medium | Bounded page/component work and catalogue reconciliation after gates pass |
| Low | Inventories, links, metadata, parser checks and deterministic comparisons |
| Fast | Formatting, summaries and packet preparation |

Capacity is a ceiling, not guaranteed availability:

- at most three disjoint read-only agents;
- at most one mutating worker per file/page cluster;
- no same-path, case-fold, ancestor/descendant or generated-output overlap;
- no simultaneous ownership of a shared manifest, template, rollback target or generated dependency.

These controls are manual and coordinator-verified. The validator detects policy violations; it is not an operating-system enforcement hook.

## 6. Manual Codex ↔ Claude Code loop

1. Codex admits a packet and records its state.
2. Nate copies that exact packet to Claude Code.
3. Claude returns the standard receipt inline/manual.
4. Codex verifies paths, raw hashes, evidence, failures and forbidden-path zero-change proof.
5. Sol recommends accept, reject, narrow or replan.
6. Nate decides any held human/external/production issue.
7. Codex updates the register and prepares the next dependency.

There is no automatic dispatch, ingestion, cross-tool trust or implied acceptance.

## 7. Delivery phases and gates

### CTRL-V2 — Candidate, checks and ratification

Create the proposed plan, register, interfaces, first packets and validator. Run security, synthesis, roadmap, planning and plan-check reviews. Freeze the candidate without ratifying it.

**Exit:** validator and independent reviews pass, all conflicts are resolved or blocked, and Nate ratifies the exact frozen candidate.

### VIS-01 + CAT-01 — Evidence contracts

After ratification, VIS-01 inventories the shared visual system and page contracts. Local review-only mockups may exist before ratification but cannot be promoted. The current Carob chooser may not be rendered under a “local-only” claim while its external Typekit request remains active. CAT-01 remains blocked until both the fresh WooCommerce export and approved retail catalogue are available and PII-cleared.

**Page order:** Homepage → Shop → Our Story → Carob Story → Stockists → FAQ.

**Exit:** visual contracts are accepted; catalogue inputs and later ledger are accepted with provenance.

### SECURITY-ACCESS — External readiness

Verify least privilege, account ownership, 2FA, expiry/revocation, credential isolation, customer-data boundaries and environment separation.

**Exit:** an independent security receipt clears the exact access needed by the next packet.

### THEME — Shopify OS2 foundation

Build only on an approved development/unpublished theme through one-file-owner packets. No headless architecture, custom sync or webhooks unless Sol issues a security-reviewed replan and Nate approves it.

**Exit:** reproducible theme structure, Theme Check disposition, no unapproved content, and accepted rollback.

### PAGE — Front-end page and section implementation

Implement the accepted visual/content contracts in the six-page order. WIP remains reference evidence, not direct import authority.

**Exit:** fresh desktop/mobile, keyboard, zoom, content and integration review with accepted receipts.

### COMM-MEAS-DESIGN and MEAS-IMPLEMENTATION

First define products, cart, shipping, payments, consent, analytics and email contracts. Implement only after the relevant external gates.

**Exit:** commerce and measurement evidence passes without raw PII, ungoverned tracking or unapproved payment/shipping claims.

### UAT, WRITTEN-GO-NO-GO, CUT and STAB

Test the unpublished Shopify result, rehearse rollback, obtain written production go/no-go, cut over while WooCommerce remains recoverable, and monitor stabilization.

**Exit:** accepted UAT, explicit cutover receipt, verified rollback window and closed residual-risk register.

## 8. Catalogue and data safety

`CAT-01A-READ` performs read-only provenance extraction and returns no persisted receipt. `CAT-01B-LEDGER` is a separate future mutating-local packet.

Every future catalogue intake must specify:

- allowed CSV/XLSX type, size, encoding and schema version;
- exact source, custodian, raw SHA-256, row count and authority;
- required product/SKU/variant fields and denylisted customer/order/contact/payment fields;
- formula-prefix detection and neutralisation before any spreadsheet output;
- malformed-row, duplicate-SKU and unexpected-column quarantine;
- metadata-only rejection records with no raw PII retention;
- approved disposal/expiry for source and derived files.

## 9. Transfer, approval and visual safety

- Every manual transfer records source path, content class, redaction result, recipient, purpose, derivative hash, expiry and Codex attestation. Unknown defaults to deny.
- Every external/production approval is durable, exact-scope, single-use, revocable and bound to a unique Nate receipt.
- Local visual evidence names the audience, tool, asset class, no-upload/no-send rule and expiry. Screenshots, recordings, browser cache and feedback logs are retained evidence and require their own disposition.
- Testimonials remain held from external exposure without exact wording, attribution and public-use permission.
- Founder files exist, but selection is unconfirmed.

## 10. Verification and acceptance

Before ratification:

- validate JSON/control blocks and raw SHA-256 links;
- run positive and named negative validator fixtures;
- prove only the manifest and eight P03 targets changed;
- prove the Carob chooser, July 29 draft and GOV-01 records retained their admission hashes;
- run independent security, integration, UI and plan verification;
- record all unknowns and residual risks;
- dry-run one read-only Claude packet using inline/manual receipt transport and verify zero file changes.

V2 passes only when its candidate hash set is frozen, review receipts are complete, the manual hierarchy is operable and Nate explicitly ratifies it.

## 11. Prohibited by this candidate

This plan does not authorize Shopify/WooCommerce access or mutation, deployment, client contact, sends, uploads, Vercel, DNS/MX, payments, analytics, email configuration, customer/order data handling, WIP/theme/content/asset edits, commit, push, reset, revert, cleanup, publication, cutover or production action.

## 12. Ratification mechanism

P03 closes at `needs_review`. The register’s `CTRL-V2-P04` is the future `CTRL-V2-RATIFY` packet. It must bind:

- candidate ID;
- the seven payload raw SHA-256 values;
- review-chain raw SHA-256;
- Nate’s explicit decision and timestamp;
- unresolved blocks explicitly accepted or retained;
- exact effect on GOV-01 and the July 29 historical draft.

If Nate ratifies V2, P04 must explicitly supersede GOV-01’s earlier wording that allowed CAT-01A to write a new output path. Under V2, `CAT-01A-READ` is zero-write/inline and only the later `CAT-01B-LEDGER` may persist output under new locks.

Ratification never silently rewrites the frozen candidate. Any change requires a new candidate ID and superseding packet.
