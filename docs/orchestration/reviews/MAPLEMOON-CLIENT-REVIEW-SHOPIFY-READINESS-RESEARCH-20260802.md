# MapleMoon client-review, soft-launch and Shopify readiness research synthesis

**Recorded:** 2026-08-02 AEST  
**Authority:** `MAPLEMOON-CLIENT-REVIEW-SOFT-LAUNCH-SHOPIFY-READINESS-ADDENDUM-20260802.md` (`7c541b6f...b712`) beside the frozen overnight handoff (`12689434...b599`)  
**Scope:** local preparation and primary-source research only

## Verdict

**Local preparation: PASS. External action: HOLD.**

The lowest-risk route is:

1. create one local, clean review hub and manual/mock feedback flow first;
2. keep any family-and-friends event collection inactive until Nate approves the audience, questions, fields, notice, destination, retention and deletion path;
3. translate the accepted site into a conventional Shopify Online Store 2.0 theme using native catalogue, cart and checkout surfaces;
4. require named access, 2FA, least privilege, development-theme UAT and a rehearsed rollback before any Shopify or production action.

No evidence supports selecting headless commerce, custom synchronisation, webhooks, third-party analytics or session replay now.

## Current local package inventory

A targeted static scan of `docs/client-review/2026-08-01-saturday-review/staging-v1/clean/` found:

- six page HTML files but no clean review index/hub;
- an SVG favicon reference on all six pages;
- `noindex,nofollow` on all six pages;
- title metadata on all six pages;
- descriptions on Homepage, Shop, FAQ and Stockists, but no description found on Our Story or Carob Story;
- no Open Graph or canonical metadata found by the targeted scan;
- review/mock language still exists in page source and therefore needs ordinary-viewer rendered review before any share decision;
- no live feedback destination or analytics collector is required or authorized.

This inventory is a preparation finding, not approval to mutate or share the frozen package. The absolute site-sharing HOLD remains controlling.

## Decision synthesis

### 1. Review experience

Build one local review hub with the six clean pages, a two-minute guide, and a simple taxonomy: factual/content correction, design preference, missing asset, broken interaction and accessibility. The feedback prototype should use labelled controls, textual validation/status feedback and a clearly fake review-only thank-you state. W3C references: [Forms tutorial](https://www.w3.org/WAI/tutorials/forms/) and [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

The current local package may be prepared for this experience, but the exact artifact, audience, channel, wording, access route and feedback route all require fresh Nate approval after waking.

### 2. Soft-launch measurement

The manual review hub is the only currently actionable mode. A later privacy-reviewed first-party test may use pseudonymous cohorts and only the events required to answer named questions: page/section view, navigation/CTA/product-interest click, mock-cart steps, feedback open/submit/abandon and technical failure. Do not collect names, email, payment data, precise location, full IP, session replay or sensitive free text by default.

OAIC guidance supports collecting only reasonably necessary information and destroying or de-identifying unneeded personal information: [APP 3](https://www.oaic.gov.au/privacy/australian-privacy-principles/australian-privacy-principles-guidelines/chapter-3-app-3-collection-of-solicited-personal-information), [APP 5](https://www.oaic.gov.au/privacy/australian-privacy-principles/australian-privacy-principles-guidelines/chapter-5-app-5-notification-of-the-collection-of-personal-information) and [APP 11](https://www.oaic.gov.au/privacy/australian-privacy-principles/australian-privacy-principles-guidelines/chapter-11-app-11-security-of-personal-information). Whether every APP obligation applies to MapleMoon is unresolved and must not be asserted as legal advice.

### 3. Shopify architecture

Use native OS2 composition as the default. Shopify documents JSON templates as ordered section data/settings and sections as reusable Liquid modules with blocks: [JSON templates](https://shopify.dev/docs/storefronts/themes/architecture/templates/json-templates) and [Sections](https://shopify.dev/docs/storefronts/themes/architecture/sections). Prepare a local page-to-section/block/settings ledger before any theme build.

Treat the current mock cart as a UI reference only. Later map verified products, variants, prices, availability, imagery, collections and metafields to native Shopify catalogue/cart behaviour. Shopify's [WooCommerce migration guide](https://help.shopify.com/en/manual/migrating-to-shopify/migrating-from-woocommerce) requires export reshaping and records mapping limits; checkout configuration is separate and some advanced checkout customization requires Shopify Plus: [Checkout configurations](https://help.shopify.com/en/manual/checkout-settings/customize-checkout-configurations).

Use a development/draft theme for future UAT. Shopify documents draft-theme previews and their expiry, and product CSV imports as non-cancellable with no import history, so source-data backup and rollback custody are mandatory: [Adding and previewing themes](https://help.shopify.com/en/manual/online-store/themes/adding-themes) and [Importing products](https://help.shopify.com/en/manual/products/import-export/import-products).

### 4. Events, redirects and SEO

Keep a platform-neutral event dictionary, then map to Shopify standard events first and namespaced custom events only where justified. Shopify documents customer events and pixel privacy requirements: [Web Pixels API](https://shopify.dev/docs/api/web-pixels-api/emitting-data) and [Pixel privacy](https://shopify.dev/docs/api/web-pixels-api/pixel-privacy). No pixel or cookie is authorized now.

Prepare a source-URL to destination/redirect/canonical ledger locally. Shopify supports redirect CSV import/export: [URL redirects](https://help.shopify.com/en/manual/online-store/menus-and-links/url-redirect). Final handles, canonical exceptions, Search Console ownership and priority traffic URLs remain external/client inputs.

### 5. Security and integration gates

- named accounts, 2FA and task-specific roles; no shared administrator account: [Shopify 2-step authentication](https://help.shopify.com/en/manual/your-account/users/security/two-step-authentication) and [Sensitive permissions](https://help.shopify.com/en/manual/your-account/users/roles/permissions/sensitive-permissions);
- no credentials or tokens in source, screenshots, review files or prompts; future tokens use separately controlled environment configuration: [Shopify CLI](https://shopify.dev/docs/storefronts/themes/tools/cli);
- no new third-party script, app, analytics endpoint or form before an approved request/data-flow register;
- no production as the first test surface;
- no PII collection without a named data owner, notice, minimum fields, access list, retention and deletion route;
- no cutover without a last-known-good artifact, named rollback authority, rehearsal and UAT evidence;
- no claim that CSP/framing is covered until the chosen host's response headers are tested.

## Dependency-ordered local roadmap

1. **Review-hub specification:** clean index, guide, taxonomy, mock form/thank-you, metadata/link-preview checklist.
2. **Soft-launch protocol:** named questions, cohorts, minimal event schema, consent/privacy/retention disposition and analysis template; collection remains off.
3. **Shopify translation matrix:** page/section/block/settings, assets/crops/alt text, product/catalogue fields, native cart/checkout replacement, forms/search/stockists/FAQ ownership, events, redirects and SEO.
4. **Security and UAT register:** access/2FA, secrets, environments, apps/network requests, data ownership, test cases, rollback/cutover/monitoring.
5. **Independent synthesis review:** verify every recommendation against current official sources and current MapleMoon evidence before any implementation packet.

## Genuine approval gates

Nate must separately approve:

- the exact frozen artifact and ordinary-viewer QA result;
- audience, channel, wording, access/expiry model and feedback destination;
- any public or forwardable URL;
- analytics/forms/cookies/pixels/session replay or real-data collection;
- data owner, notice/consent, retention and deletion policy;
- Shopify/store credentials, accounts, plan/app choices and access;
- catalogue import, development-theme use, publish, domain, redirect, cutover and rollback actions.

Until those gates are satisfied, preparation stays local and `share_ready` remains false.

