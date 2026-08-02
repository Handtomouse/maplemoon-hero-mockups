# MapleMoon Shopify OS2 migration gates

**Status:** local preparation only; every live-system gate is HOLD

## Gate 0 — authority and access

- [ ] Nate approves Shopify development work as a separate phase.
- [ ] Confirm store owner, plan, development-theme route and least-privilege roles.
- [ ] Require individual accounts and 2FA; no shared credentials in files or chat.
- [ ] Record credential custody and incident contact without exposing secrets.
- [ ] Select a base theme only after accessibility, performance, maintainability and licensing review.

## Gate 1 — source and design freeze

- [ ] Record exact accepted six-page source hashes and section contracts.
- [ ] Freeze approved tokens, typography, imagery, responsive behaviour and copy sources.
- [ ] Maintain a decision register for intentionally blocked claims/assets.
- [ ] Preserve a recoverable local package and rollback map.

## Gate 2 — catalogue provenance

- [ ] Receive fresh WooCommerce export and approved retail catalogue.
- [ ] Hash inputs; record provenance, schema, row counts and PII exclusion.
- [ ] Reconcile products, handles/SKUs, variants, prices, weights, selling options, availability, images, ingredients and claims.
- [ ] Stop on conflicts; do not silently prefer one source.
- [ ] Prepare import mapping and dry-run validation before Shopify mutation.

## Gate 3 — unpublished theme foundation

- [ ] Build shared tokens, header, footer, menus, skip link, focus, reduced motion and cart boundary in an unpublished development theme.
- [ ] Implement one section/file owner at a time with schema validation and Theme Check.
- [ ] Prove mobile and desktop image crops, responsive overflow, keyboard access and literal 200% zoom.
- [ ] Keep mock review controls and annotated evidence out of the theme.

## Gate 4 — page and commerce translation

- [ ] Implement the six approved page templates from the translation map.
- [ ] Import only reconciled test catalogue data.
- [ ] Replace mock Add to Cart/cart/checkout with native Shopify product forms, cart and checkout.
- [ ] Verify product, variant, price, availability, shipping/tax/policy and order-notification truth in the approved test environment.
- [ ] Run test orders only with explicit payment/test-mode authority.

## Gate 5 — integrations, privacy and security

- [ ] Inventory every app/script/network request and justify necessity.
- [ ] Review permissions, vendor, data flow, secrets, CSP implications, retention and uninstall/rollback.
- [ ] Approve forms, consent, email/CRM, analytics/customer events and stockist data separately.
- [ ] Prove test/production data separation and redaction.
- [ ] No custom synchronization/webhooks/headless architecture without a separate security-reviewed replan.

## Gate 6 — SEO, redirects and performance

- [ ] Inventory current URLs and map final Shopify routes/redirects.
- [ ] Verify titles, descriptions, canonical rules, robots/noindex transition, sitemap and structured data.
- [ ] Verify favicon, Open Graph/social preview and final-domain behaviour.
- [ ] Establish image, font, JavaScript and Core Web Vitals budgets.
- [ ] Run broken-link, missing-asset, network, console and duplicate-metadata checks.

## Gate 7 — UAT and rollback rehearsal

- [ ] Complete content, responsive, accessibility, browser, search, forms, catalogue, cart, checkout, account, shipping, tax and notification UAT.
- [ ] Obtain Carli/Dylan factual/content approval and Nate visual/integration approval on the exact unpublished artifact.
- [ ] Export/backup theme and configuration records; document WooCommerce and DNS recovery.
- [ ] Rehearse abort criteria, rollback owners and communication route.
- [ ] Record written go/no-go with exact hashes and remaining accepted risks.

## Gate 8 — cutover and stabilization

- [ ] Separate explicit authority for domain/DNS, production theme publish, payment activation and public launch.
- [ ] Keep WooCommerce recoverable during the agreed stabilization window.
- [ ] Monitor availability, checkout, orders, errors, redirects, indexing and approved analytics.
- [ ] Triage critical issues through a named incident owner and rollback threshold.
- [ ] Close only after stabilization evidence, access cleanup and final handoff.

## Current HOLD owners

| Decision | Required owner |
|---|---|
| Shopify store, plan, roles and base theme | Nate/store owner |
| Product/catalogue truth | Carli/client plus catalogue coordinator |
| Payments, shipping, tax and policies | Store owner/client |
| Domain, redirects and SEO cutover | Nate plus domain/SEO owner |
| Analytics, consent, privacy and retention | Nate plus privacy/security owner |
| Apps and integrations | Nate plus security/integration reviewer |
| UAT acceptance and production go/no-go | Nate and named client approvers |

No completed checklist item by itself authorizes store access, import, app installation, test order, deployment, domain change, publish or production action.
