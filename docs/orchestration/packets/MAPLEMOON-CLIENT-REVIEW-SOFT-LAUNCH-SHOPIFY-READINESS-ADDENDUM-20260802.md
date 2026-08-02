# MapleMoon Client Review, Soft Launch and Shopify Readiness Addendum

**Recorded:** 2026-08-02 01:11 AEST  
**Coordinator:** `019fa858-05c9-7631-b26e-8f5cbbf1387a` (`Plan MapleMoon model workflow`)  
**Relationship:** Additive authority beside `MAPLEMOON-OVERNIGHT-BOSS-HANDOFF-20260802.md`; it does not modify that frozen handoff or broaden any active worker packet.  
**Authority:** Nate requested preparation for an easy Carli/Dylan review package, a family-and-friends soft-launch feedback/analytics system, and an evidence-backed Shopify/security/integration transition plan.

## Outcome

Prepare a polished, understandable and portable review/soft-launch system that can later be separately approved for deployment and sharing. It must:

1. give Carli and Dylan one clear review entry point and simple feedback instructions;
2. be easy for them to open and forward without exposing internal/annotated material;
3. present a correct favicon, title, description and social-link preview image;
4. support a safe family-and-friends test with useful, privacy-conscious behavioural and feedback evidence;
5. make the approved design/content/components straightforward to translate into Shopify;
6. include researched security, privacy, analytics, access, integration, UAT, rollback and cutover requirements.

This addendum authorizes local preparation, read-only research, isolated prototypes, test plans and evidence packages only. It does not authorize deployment, a public URL, analytics collection, external sharing, client contact, Shopify/WooCommerce access, credentials, production changes or collection of real user data.

## Deliverable A — Carli and Dylan review package

Prepare a clean external-review package with:

- one obvious index/home URL for the six approved review pages;
- no internal register, WIP, debug, annotated-review or governance content on the clean surface;
- a short welcome explaining what is ready, what is intentionally mocked and what feedback is needed;
- a two-minute “how to review” flow with page and section names;
- one consistent feedback route that records page, section, device, comment type and free-text feedback without asking reviewers to understand technical IDs;
- visible separation between factual/content corrections, design preference, missing asset and broken interaction;
- accessible navigation, mobile usability and a clear way back to the review index;
- a final summary/thank-you state after feedback submission, clearly marked as review-only until the feedback service is separately connected;
- downloadable/printable review guide only if it materially improves clarity;
- exact audience, expiry/access model and feedback destination held for Nate approval before external action.

### Share-link presentation gate

Before any separately approved share:

- verify HTTPS and the exact final URL;
- verify favicon and app icons at relevant sizes;
- verify document title, meta description, canonical/noindex disposition and theme colour;
- verify Open Graph and social preview metadata using a MapleMoon-approved preview image with correct crop, legible text and no unsupported claims;
- verify the link preview in at least the intended message surfaces where technically possible;
- verify that forwarded links do not require Nate's account, expose a Vercel/team login or reveal internal paths;
- provide plain-language access instructions and a fallback contact route;
- test clean pages only as the ordinary-viewer source of truth.

## Deliverable B — family-and-friends soft-launch test

Prepare a bounded test protocol with named cohorts and a start/end window. The test must remain non-commerce unless separately connected to an approved Shopify development environment.

Required evidence design:

- anonymous or pseudonymous cohort/source marker;
- page and section views;
- navigation, CTA and product-interest clicks;
- mock Add-to-Cart, cart-open, quantity/remove and mock-checkout journey events;
- feedback-open, feedback-submit and abandonment events;
- device category, viewport family, browser family, performance/error events and broken-link/image failures;
- task-success questions, comprehension questions, confidence/rating and optional qualitative feedback;
- funnel and drop-off definitions established before launch;
- event names and properties documented in a versioned schema;
- a test-data flag so soft-launch events can be separated from later production data;
- an export/report format that supports later comparison and migration.

### Data minimisation and consent

- collect no payment information and no real order submission;
- avoid names, email, precise location, full IP, free-form sensitive data or persistent cross-site identifiers unless separately justified and approved;
- define lawful notice/consent, retention, deletion, access control and data owner before collection;
- use only the minimum analytics needed to answer named test questions;
- do not activate third-party analytics, cookies, session replay or external forms before a security/privacy review and Nate approval;
- document known blind spots rather than silently increasing tracking.

## Deliverable C — Shopify translation map

Prepare a source-to-Shopify map covering:

- shared design tokens, typography, spacing, colour, icons and responsive rules;
- Shopify Online Store 2.0 sections, blocks, JSON templates and theme settings for each six-page section;
- global header, navigation, footer, announcement and accessibility behaviour;
- product, collection, variant, pricing, availability, image and metafield mapping from verified WooCommerce/catalogue evidence only;
- mock cart and checkout behaviours that must be replaced by native Shopify cart/checkout behaviour;
- forms, notifications, search, filtering, stockists, FAQ and editorial content ownership;
- asset formats, crops, alt text, responsive image requirements and CDN treatment;
- URLs, redirects, canonical metadata, structured data, sitemap and SEO migration;
- analytics event portability into the approved Shopify/customer-events stack;
- consent/privacy integration, email/CRM boundaries and third-party app review;
- development theme, test data, UAT, backup, rollback, cutover and post-launch monitoring.

Do not choose headless commerce, custom synchronisation or webhooks by default. Those require a separate architecture/security replan and Nate approval.

## Research and review stack

Main may admit up to three disjoint read-only research/review lanes when current page work is not blocked by them:

1. **Shopify architecture and migration:** official current Shopify documentation first; OS2 theme architecture, product/catalogue import, checkout limitations, customer events, redirects, development themes, UAT and rollback.
2. **Security, privacy and integrations:** secrets/credentials, least privilege, 2FA, environment separation, forms, analytics/consent, PII, retention, third-party scripts/apps, CSP/network requests, incident and rollback planning.
3. **Client review and soft-launch measurement:** review UX, accessible feedback collection, link/access design, Open Graph/favicons, test cohorts, event schema, funnel/questions, reporting and production-data separation.

Use Low/Fast for inventories and deterministic comparisons, High for security/privacy/integration review, and the strongest model only to reconcile genuine cross-lane conflicts. A separate independent reviewer must verify the final synthesis. Research must rely on current primary/official sources and cite them near each decision. Do not spin up broad unbounded research or repeat existing work.

## Required outputs

Prepare versioned local records for:

- client-review package specification and send checklist;
- feedback taxonomy, reviewer guide and mock submission/thank-you flow;
- soft-launch research questions, cohort plan, event schema, privacy/consent/retention plan and analysis template;
- social-link preview/favicon/metadata asset checklist and validation evidence;
- Shopify source-to-section/data/event translation matrix;
- security and integration threat/gate register;
- Shopify research synthesis with source links, decisions, unknowns and recommended architecture;
- UAT, rollback, cutover and post-launch monitoring plan;
- one dependency-ordered roadmap separating local preparation, external approvals, development-theme implementation and production launch.

## Acceptance

Preparation is PASS only when:

- an ordinary non-technical reviewer can understand how to open, navigate and comment;
- the exact clean package contains no internal or visibly unfinished material;
- favicon and social-link preview requirements have verified candidate assets and test procedures;
- every proposed analytic event answers a named question and has a privacy/consent disposition;
- Shopify translation covers every approved page/section and identifies blocked catalogue/client inputs;
- security, access, integration, UAT and rollback gates have owners and acceptance evidence;
- no external action is implied by a local PASS;
- Main records exactly which approval is required before deployment, sharing, analytics activation or Shopify access.

## Stop conditions

HOLD on unsupported product/client facts, unknown data ownership, unclear consent, credentials, live-system access, paid service choice, deployment, public sharing, client contact, overlapping ownership, missing recovery, base-hash drift, failed security/QA or a request to collect real data. Continue other disjoint local preparation where safe.
