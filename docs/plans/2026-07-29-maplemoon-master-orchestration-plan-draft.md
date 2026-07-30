# MapleMoon Website — Master Orchestration Plan (Draft)

**Status:** Draft for Sol/user ratification. Not an implementation or launch authorization.
**Date:** 2026-07-29 (Australia/Sydney)
**Source of truth:** Current repository state plus the dated WIP tracker and review evidence. Older `PLAN.md`, legacy roadmap files, and dormant Shopify theme files are historical inputs until reconciled.

## 1. Outcome

Rebuild MapleMoon as a Shopify-native Online Store 2.0 storefront, while WooCommerce remains live and authoritative through catalogue reconciliation, Shopify development-theme work, full UAT, final delta reconciliation, and an explicitly approved cutover. The operating loop is:

1. Sol 5.6 Extra High owns the master intent, phase gates, risk decisions, and replanning.
2. Codex owns evidence collection, packet preparation, integration checking, verification, and the decision ledger.
3. Claude Code executes only admitted, bounded packets with explicit file ownership.
4. Lower-cost agents handle narrow research, inventory, mechanical checks, and test preparation.
5. Results return with a receipt. Sol/Codex either accept, replan, escalate, or stop.

No agent may infer launch readiness from static WIP, dormant theme code, a local preview, or a passing mechanical check.

## 2. Current position

- The checkout is dirty and contains active WIP; preserve it.
- The six WIP HTML pages are design/review evidence, not Shopify import source.
- Shopify theme folders are staged/dormant; runtime integration is unverified.
- There is no useful automated test suite; `npm test` intentionally fails.
- Homepage review contains unresolved P0 observations and stale/partial responsive evidence.
- The canonical content document named by the WIP rules is `~/UFC/ops/handoffs/handoff_20260719_mm_carli_doc_content.md`; it is not yet represented in the CAT-01 source hierarchy.
- Content/catalogue contradictions remain, including 80g/90g bars, 250g/300g powder, Saudi 35g/45g NIP data sharing one barcode, new GS1 barcode requirements, and unreconciled stockist counts.
- Shopify, payment, shipping, analytics, email, DNS/MX, WooCommerce, and customer-data controls were not verified through their external consoles.
- Named testimonials are currently visible in the homepage WIP while marked consent-pending; this is a testimonial-use gate, separate from analytics/ESP consent.

## 3. Non-negotiable operating rules

- No deployment, publishing, DNS/MX change, Shopify Admin mutation, payment activation, customer/order export, webhook, purchase, client contact, commit, or push without a named approval gate.
- Do not modify existing WIP, legacy plans, feedback logs, or theme files while producing this plan.
- Every implementation packet names its base state, exclusive writable files, readable inputs, exclusions, acceptance tests, output path, and rollback method.
- Credentials, customer/order PII, raw communications, and feedback logs do not cross the Codex↔Claude handoff.
- No dual writes during coexistence. WooCommerce is authoritative until cutover approval.
- No custom sync or webhook at launch unless a new threat review proves it necessary.
- Any unresolved conflict becomes an explicit question or blocked gate; it is never silently normalised.

## 4. Phase roadmap and gates

### GOV-01 — Governance and evidence lock

Create the approved master decision ledger, source-of-truth matrix, owner map, packet/receipt schema, escalation ladder, threat register, and dirty-worktree protection rules. Explicitly supersede conflicting legacy payment, shipping, readiness, and deployment statements.

**Exit gate:** user/Sol ratifies the plan, owners, approval classes, threat dispositions, and source-of-truth transitions.

### CAT-01 — Content and catalogue reconciliation

Reconcile products, SKUs, variants, weights, prices, stock, imagery, descriptions, bios, favourites, stockists, policies, shipping claims, returns, allergen/certification claims, barcode/GTIN/NIP data, and availability states. The proposed source hierarchy is: WooCommerce export for live commerce values and stock; Carli's content document for approved copy and claims; WIP HTML for layout/review evidence only; the client context packet for historical risks and provenance leads. Produce an approved import ledger with provenance for every Shopify product/variant/media field. This hierarchy remains proposed until ratified.

**Exit gate:** no unresolved import-critical contradiction; every excluded item has a reason and owner.

**Additional CAT-01 gate:** named testimonials must be `approved`, `held`, or `removed from external-review exposure` with consent provenance. A `consent-pending` testimonial cannot be treated as approved social proof merely because it is visible in local WIP.

### THEME-01 — Shopify foundation and architecture

Build the Shopify OS2 foundation on a development/unpublished theme: settings schema, design tokens, navigation, metafields/metaobjects, templates, sections, snippets, product/cart primitives, environment notes, and Theme Check baseline. Do not treat the existing dormant theme as production-ready.

**Exit gate:** theme structure is reproducible, Theme Check is clean or explicitly dispositioned, and no unapproved claim is embedded.

### PAGE-01 — Six-page structural rebuild

Recompose Homepage, Shop, Our Story, FAQ, Stockists, and supporting commerce views from the approved content/design decisions. Preserve the brand intent while using native OS2 composition and editor-configurable sections.

**Exit gate:** fresh 1440, 1024, 430, 390, 375, and 320px review; 200% zoom and keyboard checks; fresh visual approval; homepage P0 ledger disposition; no fabricated copy or imagery.

### COMM-01 — Commerce assembly

Verify product/variant/SKU joins, PDP and CTA joins, cart add/update/remove, inventory and availability states, shipping profiles/rates, checkout handoff, Shopify Payments test mode, PayPal readiness, refunds, order/fulfilment emails, and cart/checkout failure feedback.

**Exit gate:** UAT evidence passes with Shopify test controls; rates, thresholds, payment/refund authority, and policy copy are approved.

### MEAS-01 — Consent, analytics, and email

Define the event taxonomy and one emitting source per event before configuring measurement. Implement consent-aware analytics and newsletter/transactional email only after purpose, processor, retention, deletion, and copy are approved. Test accept, reject, and no-decision states and event deduplication.

**Exit gate:** no non-essential event fires before consent; no PII is sent in analytics; email capture is either approved and controlled or disabled.

### UAT-01 — Full UAT and operational rehearsal

Keep Shopify password-protected/unpublished. Run catalogue parity, responsive/accessibility, Theme Check, cart and failure-path, Australia-first shipping, payment success/decline/refund, order/fulfilment/refund email, consent/analytics, inventory, WooCommerce coexistence, collaborator revocation, interrupted handoff, rollback, and monitoring/support rehearsals.

**Exit gate:** every critical result is passed or explicitly accepted by the store owner; no open security blocker; final WooCommerce-Shopify delta is known.

### CUT-01 — Controlled cutover

Freeze and snapshot WooCommerce; import/reconcile the final delta; obtain written go/no-go; execute only the approved DNS/domain/publishing sequence; preserve rollback to WooCommerce; verify checkout, email, analytics, support, and monitoring immediately after cutover.

**Exit gate:** named owner confirms live evidence and rollback window. This phase remains approval-gated and is not authorized by this draft.

### STAB-01 — Stabilization

Monitor orders, inventory, checkout, emails, consent, analytics, and support. Log defects with severity and owner. Higher-level review decides whether to patch, roll back, or close the phase.

**Exit gate:** stabilization window closes with a residual-risk register and an approved handoff to maintenance.

## 5. Codex↔Claude Code loop

The bridge should be created only after GOV-01 is ratified. Each packet must contain:

```text
Packet ID / phase / parent decision
Base commit or immutable workspace checkpoint
Objective and non-goals
Readable inputs
Exclusive writable files
Approval class and forbidden actions
Acceptance tests and required evidence
Rollback/recovery method
Output path and due state
```

Claude Code returns a completion receipt containing packet ID, files read, files changed, checks run, evidence paths, residual risks, unresolved questions, and the recommended next gate. A packet is not complete merely because code was edited.

Sol escalation is mandatory for scope expansion, ownership collision, secrets/PII, stale-source conflict, new integration, production access, failed security test, payment/DNS/MX action, or any external communication. The loop stops closed when a receipt is missing, a lock is ambiguous, or an acceptance test fails.

## 6. Agent lanes

| Lane | Best use | Authority |
|---|---|---|
| Sol 5.6 Extra High | Master plan, synthesis, phase admission, risk disposition, replan | Final reasoning/approval recommendation; never self-authorises external action |
| Codex coordinator | Evidence, ledger, packet/receipt control, integration and final verification | Coordinates and blocks promotion |
| Claude Code | Bounded implementation in an admitted packet | Owns only named files |
| Luna/Terra or equivalent lower effort | Narrow research, inventory, static checks, fixture/test preparation | No scope expansion or production access |
| Specialist reviewers | Security, UI, integration, assumptions, plan, debugging | Findings only unless explicitly admitted as a worker |

Use a small number of active agents per phase. Capacity is a concurrency limit, not permission to parallelise everything: completed agents should be released, and parallel writers must have disjoint ownership or fail closed.

## 7. Security register — all currently open unless proven otherwise

1. Governance/threat model and stale-plan supersession.
2. Least-privilege collaborator/theme access, 2FA, expiry, and revocation.
3. Payment and PII boundaries; card data stays in Shopify/PayPal-hosted surfaces.
4. Consent-aware analytics and newsletter retention/deletion controls.
5. WooCommerce authority, freeze, reconciliation, cutover, and rollback.
6. Dirty-worktree and accidental-commit/deploy protection.
7. Codex↔Claude redaction and file allowlist.
8. Enforced file ownership, locks, and interrupted-handoff recovery.
9. Autonomous-action gates and Sol escalation ladder.
10. Full commerce/consent/accessibility/UAT evidence.
11. No custom webhook/sync at launch; any exception requires a fresh threat review.
12. Monitoring, support, incident response, and post-cutover rollback ownership.

The security audit found no exposed Shopify token in its bounded scan, but that is not proof that external credentials, roles, payment accounts, DNS/MX, analytics consoles, WooCommerce orders/inventory, or customer data are safe; those remain unverified prerequisites.

## 8. First executable packet after ratification

`GOV-01-P01 — Ratify and lock evidence`.

It may read the current tracker, WIP review ledgers, existing plan/roadmap files, theme inventory, and git status. It may create only the approved orchestration ledger, threat register, source-of-truth matrix, and handoff schema. It may not edit WIP, theme, catalogue, feedback, Shopify, WooCommerce, DNS/MX, payment, analytics, email, or production files.

## 8A. Dependency and promotion graph

```text
GOV-01
  -> CAT-01 + visual/P0 closure
  -> security/access gate
  -> THEME-01
  -> PAGE-01
  -> COMM-01
  -> MEAS-01 taxonomy/consent design
  -> MEAS-01 implementation
  -> UAT-01
  -> CUT-01
  -> STAB-01
```

`CAT-01` and visual/P0 closure may run as read-only evidence work after GOV-01 starts, but neither may promote implementation until GOV-01 and security/access gates are accepted. Measurement taxonomy and consent design precede ESP or pixel implementation. Production promotion requires UAT-01 plus a written go/no-go; it is never implied by a local or development-theme pass.

The canonical-plan rule is: after ratification, this document (or its approved successor at the same path) is authoritative. `PLAN.md`, `.planning/PROJECT.md`, `.planning/ROADMAP.md`, and legacy handoff/readiness notes must be labelled historical/superseded in the governance ledger; they must not be deleted or silently edited during ratification.

## 8B. Catalogue-to-order contract

The import ledger must have one row per product variant and these fields:

```text
source system / export date / source record ID
Shopify handle / title / product type / vendor / tags
SKU / variant title / weight / unit / price / compare-at price
inventory policy / quantity snapshot / availability state
approved description / claims / allergens / certifications
media filename + checksum / alt text / SEO title + description
shipping dependency / tax note / owner / approval date / disposition
```

Conflict status is one of `confirmed`, `conflict`, `unknown`, `excluded`, or `approval-required`; no agent chooses a winner from WIP alone. Before authority transfer, the process must record: WooCommerce snapshot, Shopify import checksum, dry-run result, rejected/held rows, final delta, freeze start/end, test-order treatment, rollback target, and named owner approval. Shopify becomes operationally authoritative only after that receipt is accepted; until then WooCommerce remains live and authoritative.

## 8C. Packet execution standard

Every task in a phase is written as `Action / Verify / Done`:

| Field | Required content |
|---|---|
| Action | One bounded operation and named file/API scope |
| Verify | Exact command, visual check, or external evidence required |
| Done | Observable pass condition and artifact/receipt path |
| Stop | Any scope change, conflict, secret/PII, failed check, or missing prerequisite |

Example: `CAT-01A` reads only approved local WIP/content paths; verifies extracted claims with line-level evidence; is done when every claim has a status and source; stops when a WooCommerce value is needed but unavailable. `THEME-01B` may write only the admitted theme paths; verifies JSON validity and Theme Check; is done when the development theme renders the approved contract; stops on unapproved content or external access need.

Because `npm test` is intentionally non-functional and no useful suite exists, `Verify` must name the evidence type rather than imply a test command: scoped `git diff --check`, line-level source citations, JSON/schema validation, Theme Check where theme files are involved, manual responsive/accessibility review at 1440/1024/430/390/375/320px where presentation is involved, and a proof that forbidden paths had zero changed bytes. A packet is not allowed to report `tests passed` when it only completed a static scan.

## 8E. Deterministic handoff-lock design

The human phrase "Nate confirms" is not sufficient as a worker lock. GOV-01 must create a coordinator-owned lock manifest with one record per claimed path:

```text
path / packet ID / owner / readable-or-writable / base SHA-256
claimed-at / released-at / release receipt / status
```

Rules: `_wip/*` remains Codex-owned and read-only for Claude unless an explicit exception packet names the file; a worker cannot write without an active lock record; release requires the coordinator's receipt and a post-work hash/diff check; missing, stale, or conflicting records fail closed. Existing live Codex sessions mean no homepage WIP write packet should be admitted until this mechanism and current ownership are reconciled.

## 8D. Promotion matrix

| Result | Sol/Codex action |
|---|---|
| PASS with evidence | Admit the next dependent packet |
| PASS with residual risk | Record owner/deadline; do not promote across a critical gate without explicit acceptance |
| FLAG or unresolved conflict | Return to source owner or run a bounded research packet |
| BLOCK/security finding | Stop the phase; no mutating Claude packet |
| Missing receipt or ambiguous ownership | Fail closed and reissue the packet |
| External prerequisite absent | Keep implementation local/read-only; request the prerequisite explicitly |

## 9. Required approvals/inputs still missing

- Ratify the proposed CAT-01 source hierarchy: WooCommerce for live commerce values, Carli's content document for approved copy/claims, WIP for layout evidence only, and the client packet for risk provenance.
- Decide the testimonial gate: recommended default is hide named consent-pending testimonials before any external review send; otherwise explicitly approve local-only visibility with a no-send restriction.
- Approve the deterministic lock manifest and confirm the current homepage WIP owner before any homepage edit packet.
- Named Sol/user coordinator and phase owners.
- Approved catalogue sources and final product/variant/price/weight/media decisions.
- Dispositions for homepage P0s and fresh visual acceptance criteria.
- Approved bios, favourites, stockist list, policies, shipping/returns, allergens, and certification claims.
- Shopify development-theme access with least privilege; PayPal and Shopify Payments readiness confirmation.
- ESP/transactional email decision and privacy/retention wording.
- Event taxonomy and consent policy.
- UAT accounts/test-payment method, cutover owner, freeze window, DNS/MX owner, rollback authority, and monitoring/support owner.

## 10. Decision

This draft is ready for review, not for implementation or launch. The next step is to ratify GOV-01 and name the owners. After that, create the bridge and issue the first bounded packet; do not dispatch Claude Code against the existing WIP or dormant theme before that gate.

## Official implementation references

- Shopify theme architecture: https://shopify.dev/docs/storefronts/themes/architecture
- JSON templates: https://shopify.dev/docs/storefronts/themes/architecture/templates
- Shopify CLI themes: https://shopify.dev/docs/storefronts/themes/tools/cli
- Theme Check: https://shopify.dev/docs/storefronts/themes/tools/theme-check/index
- Storefront Cart API: https://shopify.dev/docs/api/storefront/latest/objects/cart
- Shopify Payments testing: https://help.shopify.com/en/manual/payments/shopify-payments/testing-shopify-payments
- Shipping zones/rates: https://help.shopify.com/en/manual/shipping/setting-up-shipping-zones
- Customer Privacy API: https://shopify.dev/docs/api/customer-privacy
- Web pixels: https://shopify.dev/docs/apps/build/marketing/pixels
- Webhooks: https://shopify.dev/docs/apps/build/webhooks
