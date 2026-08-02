# MapleMoon UAT, rollback, cutover and stabilization plan

**Status:** local preparation PASS; every external-system gate is HOLD  
**Authority:** `MAPLEMOON-CLIENT-REVIEW-SOFT-LAUNCH-SHOPIFY-READINESS-ADDENDUM-20260802.md`  
**Scope:** planning and reusable evidence structure only

## Operating rule

The six-page local review package, a future unpublished Shopify development theme, and production are three separate artifacts. Evidence from one does not prove another. Every candidate must be identified by exact URL or local path, source hashes, manifest hash, environment, timestamp and reviewer.

No checklist completion authorizes store access, import, app installation, analytics, test orders, deployment, DNS changes, publishing or production launch.

## Phase boundaries

### Phase R: local review package

Purpose: prove the clean six-page design and review-only interactions are understandable and visibly complete before sharing is separately approved.

Required evidence:

- exact clean and annotated package hashes and served authority;
- six-page ordinary-viewer visual review at 390 and 1440 pixels;
- literal browser 200% zoom, keyboard path, visible focus and reduced-motion review;
- links, assets, console, responsive overflow and positive-control checks;
- mock cart journey with no network or real order submission;
- forbidden-claim and clean/annotated-boundary checks;
- Nate approval of the exact artifact, audience, channel, wording, access route and feedback route.

Promotion rule: local PASS may set a frozen review candidate. It cannot set `share_ready:true` without the named human and audience approvals.

### Phase D: unpublished Shopify development theme

Purpose: prove the approved design, verified catalogue data and native Shopify commerce flow in a non-production environment.

Entry gates:

- store owner, plan, development-theme route, named accounts, 2FA and least-privilege roles approved;
- accepted six-page source hashes and section contracts frozen;
- fresh WooCommerce export and approved catalogue reconciled with provenance and PII exclusion;
- theme, catalogue and configuration recovery custody recorded;
- apps, forms, analytics, consent and network requests separately reviewed;
- test-order and payment-mode authority explicitly recorded.

Exit evidence:

- Theme Check and schema validation;
- responsive, browser, accessibility, keyboard, focus, reduced-motion and literal 200% evidence;
- verified product, variant, price, availability, weight, image, ingredient and claim truth;
- native product form, cart and checkout boundary tests;
- search, filtering, forms, account, shipping, tax, policy, notification and approved test-order results;
- URL, redirect, canonical, robots, sitemap, structured-data and metadata evidence;
- performance budget and exact-host request/header inventory;
- Carli/Dylan factual approval and Nate visual/integration approval on the exact unpublished artifact.

Promotion rule: development-theme PASS permits only a written go/no-go review. It does not authorize publish or cutover.

### Phase C: production cutover

Purpose: move only the accepted, hash-pinned development candidate through separately authorized production actions.

Required approvals:

- written go/no-go signed by Nate, store owner and named client approvers;
- exact theme, catalogue, configuration, redirect and asset artifacts identified;
- production theme publish, payment activation, domain/DNS and public launch separately authorized;
- rollback owner, incident owner, communication route and stabilization window confirmed;
- WooCommerce recovery state and cutoff rules confirmed.

No production action may begin from this planning record alone.

## Roles

| Role | Responsibility | Cannot self-approve |
|---|---|---|
| Coordinator | Hashes, locks, checkpoints, source lineage, test register and promotion control | Its own implementation output |
| Page/theme implementer | Bounded section or file changes in the admitted environment | UAT acceptance |
| Catalogue owner | Provenance, field reconciliation and conflict escalation | Conflicting product truth |
| Security/integration reviewer | Access, secrets, vendors, data flows, failure and uninstall paths | Production access grant |
| UAT lead | Test assignment, evidence completeness and defect triage | Major-risk acceptance |
| Nate | Visual/integration acceptance and exact external-action approval | Client factual approval |
| Carli/Dylan or named client approver | Product, process, factual and content approval | Technical/security acceptance |
| Store owner | Payments, shipping, tax, policies, notifications and production authority | UAT evidence quality |

Named people must replace role labels before Phase D or C can pass.

## UAT evidence contract

Every test result records:

- case ID and matrix version;
- artifact path or URL, environment and exact hashes;
- date, reviewer and device/browser;
- preconditions and test data class;
- observed result and evidence path;
- PASS, HOLD or FAIL;
- defect severity and owner;
- retest result linked to the original defect.

Screenshots alone do not prove keyboard, focus, reduced motion, data mutation, network or notification behavior. Automated checks do not replace literal 200% zoom or ordinary-viewer review.

## Severity and abort thresholds

| Severity | Definition | Gate response |
|---|---|---|
| S0 | Security/privacy exposure, unintended real charge/order, credential leak, destructive import, unavailable storefront or corrupted source/rollback | Stop immediately; isolate; invoke incident owner; rollback if any change occurred |
| S1 | Checkout/cart failure, materially false product/price/availability, inaccessible critical path, major responsive break, failed redirect for a priority route | HOLD promotion; fix or explicitly remove affected surface; full affected-path retest |
| S2 | Significant but non-blocking content, layout, form, search, notification or performance defect | HOLD affected surface; bounded correction and retest required |
| S3 | Minor polish issue with no misleading, accessibility or journey impact | May be accepted only in written go/no-go with owner and target date |

Any S0 or unresolved S1 is a no-go. Three related S2 defects that indicate a systemic issue are treated as S1. Evidence missing for a required case is HOLD, not PASS.

## Recovery and rollback custody

Before any Phase D or C mutation, capture non-overwriting, hash-verified recovery for every admitted writable artifact.

Required recovery classes:

1. theme source and exported theme package;
2. catalogue source export, transformed import and reconciliation report;
3. store configuration inventory for navigation, policies, shipping, tax, notifications and checkout settings;
4. app/integration inventory with disable, uninstall and data-deletion route;
5. URL, redirect, DNS and domain records;
6. analytics/consent configuration and event schema;
7. last-known-good production identifiers and exact restoration steps;
8. WooCommerce availability, ownership and agreed recovery window.

Recovery proof must be readable by the named rollback owner and rehearsed in the approved non-production environment where practical.

## Cutover runbook skeleton

The production runbook is filled only after Phase D passes.

1. Freeze the accepted artifact and record hashes.
2. Reconfirm go/no-go, owners, access, communication channel and abort thresholds.
3. Confirm backups and last-known-good restoration steps.
4. Confirm catalogue change window and order-handling boundary.
5. Apply only explicitly authorized production changes in recorded order.
6. Run smoke checks: homepage, product, cart, checkout boundary, contact route, priority redirects and availability.
7. Confirm payments, shipping, tax and notifications only under separately approved test/production procedures.
8. Begin stabilization monitoring.
9. Roll back immediately on S0 or named S1 threshold.
10. Close only after stabilization evidence, access cleanup and handoff.

## Stabilization plan

The owner and duration remain HOLD. The future plan must specify:

- monitoring window and coverage hours;
- availability, error, checkout, order, redirect, indexing and approved analytics checks;
- alert destination and incident owner;
- redacted evidence and privacy-safe logs;
- thresholds for rollback, hotfix or accepted observation;
- reconciliation of orders, payments and notifications;
- review of access, temporary accounts and vendor permissions;
- final client and technical handoff.

## Current HOLD register

| Gate | Missing authority or evidence | Owner |
|---|---|---|
| Exact share artifact and audience | Nate has not approved the exact frozen artifact, audience, channel, wording, access and feedback route | Nate |
| Shopify access and development theme | No store, plan, account, role or development-theme authority | Nate and store owner |
| Catalogue truth | Fresh WooCommerce export and approved catalogue are unavailable | Client and catalogue coordinator |
| Commerce configuration | Payments, shipping, tax, policy and notification truth is unverified | Store owner and client |
| Forms and analytics | Provider, notice, consent, owner, retention and deletion are undecided | Nate plus privacy/security owner |
| Apps and integrations | Vendor, permission, data-flow and rollback decisions are unmade | Nate plus security reviewer |
| SEO and domain | Final handles, redirects, Search Console and domain/DNS authority are unverified | Nate plus domain/SEO owner |
| Production go/no-go | Phase D has not occurred; no exact accepted production artifact exists | Nate, store owner and client approvers |

## Exactly next when authority arrives

Create one Phase D intake packet that names the store owner, approved development-theme route, exact accepted six-page hashes, catalogue inputs, access model and recovery custody. Until then, keep this plan local and fail closed.
