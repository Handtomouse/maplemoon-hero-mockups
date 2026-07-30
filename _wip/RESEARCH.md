# MapleMoon Website — RESEARCH.md

**Researched:** 2026-07-18
**Author:** Research pass for the execution planner (SPIN will implement)
**Scope:** Every WIP page, every section, cross-referenced against the dashboard portal, the DESIGN_BRIEF, checkpoints, the 13 Jul decisions pack, and a live puppeteer audit.
**Confidence:** HIGH on WIP state (all 6 pages read in full + audit run against the live :3005 server). MEDIUM on the Shopify-port shape (markup-only, live port externally blocked).

---

## 0. The One Thing To Understand First (read before anything else)

**The dashboard at https://dashboarddeployment.vercel.app/ is a billing / project-tracking portal, NOT a website build spec.** It tracks the AFQA packaging-compliance project ($23,701 relationship, 84% complete) and the *proposed* Shopify e-commerce build ($13,206 core, approved 17 Feb 2026, target launch late Mar / early Apr 2026). It is useful for two things and two things only:

1. **Product/collection architecture** the eventual Shopify store must carry — 20 products, 51 SKUs, 16 collections, the full app stack (Klaviyo, Judge.me, Analyzify, Afterpay), and the DTC feature recommendations (bundle builder, sample pack, subscribe & save, wholesale page, gifting).
2. **The blocker list** — retail pricing not confirmed, elixir barcodes missing, photography approach, brand content, packaging dimensions. These are the SAME blockers that gate the website.

**The actual website build spec lives in `_wip/DESIGN_BRIEF.md` — the A / B / C / D deltas from the 13 Jul client call.** The design was APPROVED by the client on 13 Jul ("It looks so good. I'm so happy with it"). This is a bounded POLISH + apply-deltas job on WIP copies, **NOT a redesign**. Do not drift the approved "Editorial Night" direction.

**The current live build is a static multi-page HTML prototype** (`node server.js` on `:3005`), copy-based workflow, no git. Shopify is a *future* port; the WIP markup is being shaped so it maps cleanly onto `sections/*.liquid`, but the live theme port is blocked on collaborator access from Carli & Dylan.

---

## 1. Dashboard Spec Summary (what the portal requires)

### 1a. Product & collection architecture (the store the site must eventually carry)
- **20 products / 51 SKUs / 16 collections.**
- Categories: **Carob Bars** (6 flavours × 3 sizes), **Carob Moons** (6 flavours × 3 sizes), **Carob Bananas** (1 × 3 sizes), **Carob Elixirs** (2 flavours × 2 sizes), **Bundles** (3-5 curated), **Gift Sets** (2-3 + gift cards, tiered $30/$50/$75).
- 16 collections include: All Products, Bars, Moons, Bananas, Elixirs, Bundles, Gift Sets, New Arrivals, Vegan, Gluten Free, Sugar Free, Organic, Caffeine Free, Best Sellers, Staff Picks, Subscribe & Save.
- **Note a mismatch to resolve:** the dashboard lists **Bars at 90g** and does NOT list a "Bites & Eclipses" category, but the WIP site prominently features **Bites & Eclipses** as a 5th category (bars/moons/bites/elixirs/bananas). The AFQA "Paused Items" note shows *Goji Bites 2-Pack + 5 Eclipse Bites products on hold (50% deposit paid, work on hold)*. So Bites/Eclipses are real SKUs but their launch status is uncertain — **this is exactly the A4 "coming soon" question.**

### 1b. Top DTC feature recommendations (from the 9-brand competitor audit)
Bundle Builder · Sample/Discovery Pack ($25-35) · Subscribe & Save (10-15%) · Wholesale Trade Page with ABN form · Certification Badges above the fold · Gifting Collection ($30/$50/$75) · Named Bundles ("Full Moon Box", "Carob Curious Starter") · Comprehensive Product Info (NIP, allergens, storage) · Loyalty (Phase 2) · Recipe Content for SEO.

### 1c. App stack (future Shopify, informs markup slots)
Klaviyo (email flows), Judge.me (reviews — the review-carousel `@app` slot), Native AusPost, Shopify Payments + Afterpay, Analyzify (GA4 + Meta CAPI). Phase 1.5: SparkLayer (wholesale), Loop Subscriptions.

### 1d. Blockers (portal) — all also gate the website
1. **Retail pricing not confirmed** (blocks all pricing) — Dylan & Carli.
2. **Elixir barcodes missing** (AFQA at 30%).
3. **Product photography approach** (renders vs new shoot). *Note: a 122-shot photoshoot was completed 24 May 2026; brand-matched finals are in `assets/photo_finals/` and `assets/our_story/`.*
4. **Brand content not written** (Our Story, Sourcing, Recipes, Blog).
5. **Packaging dimensions unknown** (shipping rates).

### 1e. Portal sub-tabs NOT readable (LIMITATION)
The portal's **Billing / Specs / Final Files / Archive** tabs are client-side rendered ("Loading…") and WebFetch cannot execute them. They likely hold packaging-design specs (low value for the website build). The four Shopify theme previews (Shapes / Futurer / Normcore / Ethereal) referenced by the portal exist as **local files in this repo** at `mockups/*.html` if the planner wants theme direction. Flagged in Open Questions.

---

## 2. The Build Spec That Actually Governs This Work (DESIGN_BRIEF deltas)

From `_wip/DESIGN_BRIEF.md` (14 Jul) + `_decisions_pack_20260713.html`:

### A — 13 Jul call decisions (apply, top priority)
- **A1. Copy reversal** — "Handmade in Brunswick Heads" DEAD → "Australian organic carob" / locally-sourced. Brunswick = origin-story only, never a make-claim. Fix hero eyebrow, meta, `<title>`, footer, all make-claim strings, every page.
- **A2. Meet Carli & Dylan** (our-story) — split couple shot → individual cropped profiles + role blurb each + "favourite way to enjoy" each.
- **A3. Delayed subscribe pop-up** — scroll-triggered (never instant); side "10% off" tab OR top banner; closes cleanly. No baked discount without C&D.
- **A4. "Coming soon" state** for not-launch-ready SKUs.
- **A5. Quote carousel** — feed from current live MapleMoon reviews now; C&D testimonial slot = marked placeholder.
- **A6. Carob-story** — keep photo slot for incoming Australian Carob Co (SA) farm imagery (permission pending) — placeholder.
- **A7. Two-click purchase from homepage** — HARD requirement, don't regress.

### B — 3 open June choices (SCREENSHOT VARIANTS, never auto-pick)
- **B1.** Hero brand-surfacing: three stacked lines vs small "maple moon" vs merge to one (CAROB wordmark protected).
- **B2.** Category packshot cohesion: unify card treatment vs per-category texture.
- **B3.** Motion: restrained scroll-reveal vs static editorial.

### C — Mobile/iPhone harden + photo integration
Widths 375/390/430; safe-area insets; 44px touch targets; LCP budget on hero; integrate finals by filename contract.

### D — Shopify-readiness (markup shape only — live port BLOCKED)
Shape sections to map onto `sections/*.liquid`; note schema fields. Do NOT push a theme.

---

## 3. Page-by-Page Audit (done / outstanding / blocked)

**Six deployable WIP pages:** `homepage_real_1_lead_photo.WIP.html` (approved base, 1049 lines), `shop.WIP.html`, `our-story.WIP.html`, `carob-story.WIP.html`, `faq.WIP.html`, `stockists.WIP.html`. All read in full. Navigation is internally consistent (all cross-link to `.WIP.html` copies). Nav header/footer differs slightly per page (`wf-` prefix on homepage; `sp-`/`os-`/`cs-` on inner pages) — expected, they were built as separate templates.

### 3.0 Verified audit metrics (puppeteer `_wip/audit.js` @ 375/390/430, live :3005)

| Page | Overflow 375/390/430 | Missing alt | Sub-44 tap targets | Dead `href="#"` | Heading skip |
|------|:---:|:---:|:---:|:---:|:---:|
| homepage | ok / ok / ok | 0 | **25** | **4** | yes |
| our-story | ok / ok / ok | 0 | 10 | 1 | yes |
| shop | ok / ok / ok | 0 | **36** | 1 | no |
| carob-story | ok / ok / ok | 0 | 10 | 1 | yes |
| faq | ok / ok / ok | 0 | 10 | 0 | yes |
| stockists | ok / ok / ok | 0 | 12 | 0 | yes |

- **Zero horizontal overflow at all three mobile widths on all six pages** — the mobile-hardening media queries are working.
- **Zero missing `alt`** anywhere — image accessibility is clean.
- The only console error / bad request on every page is the TypeKit `p.css` `ERR_NAME_NOT_RESOLVED` — a **headless-sandbox network artifact**, NOT a real bug. Checkpoint 20260718 verified `dvz0xjs.css` + all 4 font files return 200 and Mackinac renders in real Chrome. Do not chase this in headless.

### 3.1 HOMEPAGE — `homepage_real_1_lead_photo.WIP.html`

Sections in document order: photo hero → brand marquee → lineup coverflow → category tabs → PDP block → What is Carob (annotated pod) → Why not cacao (comparison cards) → When do you moon (ritual tiles) → From Brunswick Heads (origin band) → Who (founders strip) → Stockist marquee → Testimonial carousel → Sampler (starter box) → Trust bar → footer + newsletter.

| Section | Done | Outstanding / Blocked |
|---------|------|----------------------|
| Photo hero (moonlit ocean, dissolve, seal, brand marquee) | Hero + dissolve + `wf-moonwash` motion + `mm-seal` + scrolling marquee all present. LCP hero preloaded (`fetchpriority=high`). Eyebrow = "Australian organic carob" (A1 applied). | B1 hero brand-surfacing variant not chosen (3 variants exist in `_wip/variants/hero_{A,B,C}`). Real Brunswick / studio hero swaps available via `?s1=` param but default is ocean. |
| Lineup coverflow (2-click purchase) | Fully wired JS coverflow, 5 categories, real webp packshots, keyboard + swipe + arrows, a11y (aria-current, tab order culling). **A7 two-click intact.** | — |
| Category tabs | Wired (Moons/Bars/Bites/Elixirs/Bananas). | Bites/Elixirs launch status = A4 question. |
| PDP block | Renders selected product, size pills, price, "Add to Cart" + "View Product". | **Price `$5.50 (90g)` is PLACEHOLDER** (flagged on-page "Indicative pricing"). Pack sizes placeholder. Blocked on C&D. "View Product" hard-links one mockup PDP (`products/pure-carob-bar.html`); real deep-link is a port TODO. |
| What is Carob (annotated pod) | Complete, real photo, glass-pill callouts, link to carob-story. | Farm imagery (A6) is a future swap slot. |
| Why not cacao (cards) | Complete. Cacao-% deliberately omitted per brand rule — do NOT "fix". | — |
| When do you moon (ritual tiles) | Complete, licensed scene photos. | Real scene photography is a future swap (`?s5=`). |
| From Brunswick Heads (origin band) | Complete, A1-safe (origin story only). Photo = `byron_lighthouse_dusk.jpg`. | Real Brunswick bridge photo is after-call queue (current is AI/licensed placeholder). |
| Who — founders strip | Present as a one-line strip linking to our-story "Meet Carli & Dylan". | Homepage strip is fine; the **A2 split-profile build lives on our-story**, not here. |
| Stockist marquee | Text names (Harris Farm, Goodness Me Boxes, QE Health Foods, Selected stockists) with "lineup being confirmed" caption. | **Final confirmed lineup + logo files pending** (C&D). |
| Testimonial carousel | Structure + JS + a11y (`aria-live`) complete. 3 slides are **honest placeholders** ("A quote from a real Maple Moon customer will live here"). | **A5 real reviews BLOCKED** — live maplemoon.com.au verified to have ZERO reviews (no Judge.me/Okendo/Loox). Needs C&D to name a source. Do NOT fabricate. |
| Sampler (starter box) | Complete layout, 6 real bar packshots. | Price = **`$ TBC`** (blocked on C&D). |
| Trust bar | Complete. "Free Shipping on orders over $60". | Threshold $60 here vs FAQ says **$99 free / $16.95 standard** vs dashboard suggests $75 — **INCONSISTENCY, needs one confirmed number from C&D.** |
| Footer + newsletter | Complete. Contact = `mailto:info@maplemoon.com.au` (correct). | Social icons Instagram/Facebook/Email = `href="#"` placeholders (blocked on handles). Newsletter form is `onsubmit=return false` (no backend — expected pre-Shopify). |

**Applied but possibly UNRATIFIED (flag to planner — brief said B-choices are screenshot-only, never auto-pick):**
- **B3 motion (scroll-reveal) is baked in AND defaults ON** (`body.motion-on`, IntersectionObserver, floating "Motion: on" toggle button, lines 998-1020). Has `prefers-reduced-motion` guard. This contradicts "never auto-pick" — confirm the client approved motion-on, or gate it behind the toggle default-off.
- **New button system** (curved-rect 14px, moon-halo, ported 16 Jul, lines 1022+) — confirm approved.
- **Seal + top marquee** (ported 16 Jul) which also **hides the in-hero static creds** (`.wf-pcreds{display:none}`) — confirm approved.

**Present in homepage, NOT yet integrated (built as separate variant files):**
- **A3 subscribe popup** — lives in `_wip/variants/homepage_popup_preview.html` (97KB, larger than the 82KB base). NOT in the deployable homepage. Job = PORT the component in before `</body>`, scroll-triggered, accessible, NO baked discount.

### 3.2 SHOP — `shop.WIP.html`

Sections: header → hero ("Shop the range") → sampler strip → category nav → 5 category grids (Bars / Moons / Bites & Eclipses / Elixirs / Bananas, JS-rendered) → footer.

| Item | Status |
|------|--------|
| Category grids | DONE — JS renders all 5 categories from the same trusted in-file catalog as the homepage. Each card: photo, name, diet chips (Vegan/GF/No Caffeine), description, price, Add-to-Cart. |
| Pricing | PLACEHOLDER (indicative flag present). Blocked on C&D. |
| SEO (OG + JSON-LD) | DONE — OG tags + 3 JSON-LD blocks present (verified lines 138, 145/170/184). |
| **A4 coming-soon states** | **NOT DONE** — every SKU renders identical Add-to-Cart. Bites/Eclipses (paused per dashboard) and any non-launch SKU need the coming-soon / notify-me treatment. Blocked on C&D confirming which SKUs. |
| Heading order | Clean (no skip). |
| **a11y Group A (skip-link + `<main>`)** | **NOT DONE** — homepage-only so far. |
| Cart control | Still `<span role="button" tabindex="0">` — homepage was upgraded to native `<button>`; inner pages were not. |
| Sub-44 tap targets | **36** (highest of any page — the Add-to-Cart buttons + nav). Buildable-now fix. |
| No PDP page | Cards have no product-detail link/PDP; the mockup PDPs (`products/*.html`) are separate. A port concern. |

### 3.3 OUR STORY — `our-story.WIP.html`

Sections: header → hero ("Carob, on its own terms") → 01 Why carob → pull quote → 02 Made by hand (atmospheric band) → 03 From Brunswick Heads → **Founders (Carli & Dylan)** → Gallery (studio, May 2026) → closing CTA → footer.

| Item | Status |
|------|--------|
| Editorial chapters 01-03, quote, band, gallery, CTA | DONE, real studio photography, A1-safe copy. |
| SEO (OG + JSON-LD incl. isPartOf) | DONE. |
| **A2 Meet Carli & Dylan** | **NOT DONE.** Current founders block (lines 330-340) is the **OLD single couple card** using `assets/our_story/founders_hands.webp` (a hands shot). The brief requires split individual cropped profiles + role blurb + "favourite way to enjoy" each. **Blocked on `carli.webp` + `dylan.webp` individual crops** (do NOT yet exist; `assets/our_story/` has studio + hands shots only) AND role assignments (draft copy had flagged role assumptions needing Nate approval). |
| a11y Group A | NOT DONE. |
| Cart control | `<span role=button>` (not upgraded). |
| Dead link | 1 (`AUD $` currency selector `href="#"`). |
| Real Brunswick photo | Future swap (current is licensed/AI placeholder). |

### 3.4 CAROB STORY — `carob-story.WIP.html`

Sections: header → hero (annotated pod, "What is Carob, actually?") → From pod to bar (4 interactive steps) → Gallery (pod up close, 6 figures) → Carob and cacao honestly (comparison) → FAQ (4 Q's) → CTA.

| Item | Status |
|------|--------|
| All content sections | DONE — richest inner page (31KB). Interactive step-changer, gallery, comparison, mini-FAQ. Copy is A1-safe. |
| SEO | DONE — full set incl. **BreadcrumbList + Article** JSON-LD. |
| **A6 farm photo slot** | Placeholder slot present; awaits Australian Carob Co (SA) imagery (permission pending). |
| a11y Group A | NOT DONE. |
| Cart control | `<span role=button>`. |
| Heading skip | yes — `[122233224]` (an h2→h4 jump). Buildable-now fix. |
| Dead link | 1 (`AUD $`). |

### 3.5 FAQ — `faq.WIP.html`

Sections: header → intro → FAQ list (10 `<details>`) → "Still have questions" CTA → footer.

| Item | Status |
|------|--------|
| 10 Q&A (`<details>`) | DONE. |
| SEO incl. **FAQPage JSON-LD** (9 questions) | DONE. |
| **Content INCONSISTENCY** | Body copy says **"MapleMoon"** (one word) in several answers, while the rest of the site + brand + A1 copy uses **"Maple Moon"** (two words). The JSON-LD uses "Maple Moon". Normalise to two words. Buildable-now. |
| **Pricing/shipping numbers embedded in FAQ + JSON-LD** | "Standard shipping is $16.95, orders over $99 ship free." These are **hardcoded and unconfirmed** — conflict with homepage trust bar ($60) and dashboard ($75 suggested). Flag: any shipping/returns numbers on the site are unverified until C&D confirm. |
| a11y Group A | NOT DONE. |
| Dead links | 0. |
| Heading skip | yes `[1224]`. Buildable-now. |

### 3.6 STOCKISTS — `stockists.WIP.html`

Sections: header → hero ("Find maple moon") → Coming soon to (3 cards) → Trade / "Stock maple moon" (wholesale CTA) → Newsletter ("Be first to the shelf") → footer.

| Item | Status |
|------|--------|
| Coming-soon cards (Harris Farm, Goodness Me Boxes, QE Health Food Stores) | DONE, each with "Coming soon" chip. |
| **Wholesale trade section** | DONE — matches the dashboard's "Wholesale Trade Page" recommendation. `mailto` enquiry CTA (not an ABN form yet; ABN form is a Shopify-port enhancement). |
| Newsletter | Present but button `disabled` ("Coming soon") — intentional pre-launch. |
| Final stockist lineup + logos | BLOCKED on C&D confirmed lineup + logo files. |
| SEO | Present (OG placeholder). |
| a11y Group A | NOT DONE. |
| Dead links | 0. |
| Heading skip | yes `[12333224]`. |

---

## 4. Prioritised Gap List

### 4a. UNBLOCKED — buildable now (no C&D, no external access)

**a11y (Group A + housekeeping)**
1. Add skip-link + `<main id="main-content">` landmark to all **5 inner pages** (homepage already done). — HIGH, quick, high-value.
2. Upgrade cart `<span role="button" tabindex="0">` → native `<button type="button">` on all 5 inner pages (homepage already done).
3. Fix heading-order skips on homepage, our-story, carob-story, faq, stockists (the audit shows h2→h4 jumps). Shop is already clean.
4. Expand sub-44 tap targets: homepage 25, shop 36, stockists 12, others 10. Apply the same 44×44 min-height patch that fixed the homepage cart/social (`.pill`, `.add`, `.sp-cart`, nav `.sp-logo`, currency link, form buttons). Per `RESEARCH_NOTES.md` + `_wip` spec library.

**SEO asset production**
5. **Produce OG images** — `assets/social/` directory does NOT exist, so every `og:image` (`og-homepage.jpg`, `og-shop.jpg`, `og-our-story.jpg`, `og-faq.jpg`, `og-carob-story.jpg`) + `mm_logo_social.jpg` currently 404s on deploy. Crop 1200×630 from `assets/photo_finals/` + `assets/our_story/` (both exist and are rich). **This is buildable now — it is an asset-production task, NOT a C&D content block.** Also add BreadcrumbList to homepage (only carob-story has it so far).

**Copy / consistency**
6. Normalise **"MapleMoon" → "Maple Moon"** in faq.WIP.html body copy (JSON-LD already correct).
7. Reconcile the **free-shipping threshold** everywhere ($60 homepage vs $99 faq vs $75 dashboard) — but the *chosen number* is a C&D decision (see 4b). Buildable-now part = make it a single token so one value updates all pages.

**Feature ports (components exist, just not integrated)**
8. **A3 subscribe popup** — port from `_wip/variants/homepage_popup_preview.html` into the homepage before `</body>`. Scroll-triggered, accessible, side "10% off" tab, closes cleanly, **NO baked discount value** (leave offer as a swappable token). Buildable now.
9. **B1/B2/B3 as screenshot variants** for the morning checklist — hero variants already built in `_wip/variants/`; capture desktop + iPhone screenshots, do NOT auto-pick. **Also: reconcile that B3 motion is currently auto-applied-on in the base** — either back it out to default-off or get it ratified. **Motion (B3) is homepage-only** — verified: IntersectionObserver/motionToggle appear only in the homepage, zero occurrences across the 5 inner pages (same homepage-only pattern as a11y Group A). Confirm whether motion should extend site-wide or stay homepage-only before any port.

**Mobile device verification (partly buildable, needs real device for final)**
10. Re-verify safe-area insets, `svh` hero height, and tap targets on real iOS at 375/390/430 after the tap-target fixes. Headless already confirms zero overflow; `env()` insets + Safari zoom need a device (see `RESEARCH_NOTES.md` iOS section).

**Shopify-readiness markup shaping (D — markup only, no port)**
11. Add `{{ block.shopify_attributes }}` to block roots; block-ify testimonials + FAQ items; add `{ "type": "@app" }` slots on testimonials + product-grid (Judge.me later); note the coming-soon liquid pattern (`{% if product.available %}…{% elsif …coming_soon %}Notify Me{% else %}Sold Out{% endif %}`). Reference `RESEARCH_NOTES.md` Shopify section. This is documentation/markup-shaping, no live theme push.

### 4b. BLOCKED on Carli & Dylan content/decisions

| # | Gap | What's needed from C&D | Affects |
|---|-----|------------------------|---------|
| B1 | **Retail pricing** (all 20 SKUs, all pack configs) | Confirmed AUD price + pack sizes. Current placeholders: bars $5.50/90g, moons $4.50/40g, bites $6.50/pack, elixirs $12/jar, sampler $ TBC. **Live site = WHOLESALE, do NOT scrape.** | PDP, shop grids, sampler, every price |
| B2 | **Real reviews (A5)** | One named source (Google, Instagram, market feedback) or direct quotes. Live site has ZERO reviews — verified. Do NOT fabricate. | Homepage testimonial carousel |
| B3 | **A2 founder profiles** | Individual `carli.webp` + `dylan.webp` crops + confirmed role assignments + "favourite flavour" each. (Draft copy had flagged role assumptions needing Nate review.) | our-story founders section |
| B4 | **A4 coming-soon SKUs** | Which SKUs are launch-ready vs held back (Bites/Eclipses are "paused" per dashboard). | shop grids, homepage tabs/PDP |
| B5 | **Social handles** | Instagram/Facebook URLs (+ confirm email). Currently `href="#"`. | Footer social icons, all pages |
| B6 | **Stockist lineup + logos** | Final confirmed retailer list + logo files. | Homepage marquee, stockists cards |
| B7 | **Free-shipping threshold + shipping/returns numbers** | One confirmed set ($60/$75/$99 conflict; $16.95 standard, 7-day returns unconfirmed). | Trust bar, FAQ, FAQ JSON-LD |
| B8 | **Real Brunswick + farm photos (A6)** | Real Brunswick bridge photo (current AI placeholder); Australian Carob Co (SA) farm imagery (permission pending). | Homepage origin band, carob-story slot |

### 4c. BLOCKED on external access

| # | Gap | Blocked on |
|---|-----|------------|
| C1 | **Shopify live theme port** | Collaborator access from C&D. Markup is being shaped for it (D) but no theme can be pushed. |
| C2 | **Elixir barcodes (EAN-13)** | AFQA compliance (at 30% per dashboard). Blocks elixir product pages / inventory. |
| C3 | **Packaging dimensions** | C&D — blocks Shopify shipping-rate config (not the static site). |
| C4 | **Portal Billing/Specs/Final Files tabs** | Client-side rendered; WebFetch can't execute. Low value for website. |

---

## 5. Recommended Phase Plan Outline (for the planner)

Ordered waves. Each wave stays on WIP copies; originals are sacrosanct; screenshot-verify every shipped artifact at 390 + 1440 (+ 375/430 for mobile waves). Promote + redeploy once per finished page. Order mirrors the section-tracker review loop: homepage → shop → our-story → carob-story → faq → stockists.

**Wave 0 — Ratify the unratified (decision, not build).**
Confirm with Nate whether the already-applied B3 motion-on, the 16 Jul button system, and the seal+marquee are approved to keep. These shipped ahead of the "screenshot-only" rule. Resolve before building on top of them. *(Dependency: gates nothing technically, but avoids building on unapproved foundations.)*

**Wave 1 — a11y Group A across the 5 inner pages + tap targets + heading order (all buildable now).**
skip-link + `<main>` + native cart `<button>` on shop/our-story/carob-story/faq/stockists; 44px tap-target patch on all pages; fix heading skips. Re-run `_wip/audit.js` to confirm counts drop. *(No dependencies. Highest value-to-effort.)*

**Wave 2 — SEO asset production + finalize head.**
Create `assets/social/`, crop 6× 1200×630 OG images + `mm_logo_social.jpg` from `photo_finals`/`our_story`; add BreadcrumbList to homepage; normalise "Maple Moon" in faq; tokenise the shipping threshold. *(Depends on: nothing external — uses existing photo finals.)*

**Wave 3 — A3 subscribe popup port + B1/B2/B3 screenshot variants.**
Port the popup component into the homepage (no baked discount); screenshot the hero B1 variants + a B2 packshot-cohesion comparison + B3 on/off for the morning checklist. *(Depends on Wave 0 for the motion decision.)*

**Wave 4 — A4 coming-soon states (structure now, copy on unblock).**
Build the coming-soon / notify-me card + PDP treatment on shop + homepage as a togglable state driven by a per-SKU flag. Ship the mechanism now with a safe default; wire the actual SKU list when B4 unblocks. *(Structure unblocked; live SKU list blocked on C&D — B4.)*

**Wave 5 — A2 Meet Carli & Dylan (blocked-gated).**
Build the split-profile layout on our-story with placeholder crops + draft role copy behind a clear "awaiting C&D" flag; swap in `carli.webp`/`dylan.webp` + confirmed roles when B3(content) unblocks. *(Blocked on founder photos + role sign-off.)*

**Wave 6 — Content unblock integration (single pass when C&D deliver).**
Drop in confirmed pricing (B1) across PDP/shop/sampler, real review source (B2), social handles (B5), stockist logos (B6), shipping numbers (B7), real Brunswick/farm photos (B8). One reconciliation pass so nothing is half-updated. *(Fully blocked on 4b.)*

**Wave 7 — Mobile device verification + LCP.**
Real-iOS pass at 375/390/430 for safe-area/`svh`/zoom after all CSS changes; confirm hero LCP budget. *(Depends on Waves 1-6 being visually settled.)*

**Wave 8 — Shopify-readiness markup shaping (D, documentation + markup only).**
Apply `shopify_attributes`, block-ify testimonials/FAQ, add `@app` review slots, document schema fields + coming-soon liquid pattern. *(No live port — C1 blocked. This is preparation the port will consume.)*

**Dependency summary:** Waves 0-3 and 8 are fully unblocked and can run first / in parallel. Wave 4 ships structure now. Waves 5-6 need C&D content. Wave 7 is a finishing pass. Nothing here requires touching the approved originals or any outbound comms.

---

## 6. Carry-Forward Constraints (distilled for the planner — NON-NEGOTIABLE)

1. **NEVER edit the approved base file** `homepage_real_1_lead_photo.html` (or any original). All edits land in `_wip/*.WIP.html`. Authoring pattern: write in `$CLAUDE_JOB_DIR` (or python-via-Bash), then `cp` into `_wip/` — the bg-isolation guard blocks Edit/Write tools inside the repo; Bash file ops are fine. Keep the `_wip/` symlinks (`assets`, `brand_kit.css`, `shared.css/js`, `products`) intact or screenshots break.
2. **NO outbound comms.** Never email or message MapleMoon (`info@maplemoon.com.au` or any personal address) for the entire run.
3. **Money/pricing only ever with Carli & Dylan.** Strip money refs from any non-C&D context. Every price on the site stays flagged "indicative" until C&D confirm. **Do NOT scrape the live site for prices — the live site is WHOLESALE.**
4. **NEVER invent pricing, reviews, or testimonials.** Placeholders must read as honest placeholders. The testimonial carousel's "No invented praise on this site. Ever." is the standard.
5. **Cacao % is deliberately omitted** on ASAL / CHIL / GCOC / HNUT / PMIN — do NOT flag as an error or "fix" it. **PCAR's 50/50 cacao stays.** **Salted-caramel fudge is an ACTIVE SKU** — do not flag as missing.
6. **A1 copy rule:** "Australian organic carob" / locally-sourced. **Brunswick Heads = origin-story only, never a make-claim.** Never resurrect "Handmade in Brunswick Heads".
7. **No em dashes** in any client-facing copy. **Never the word "vibe"** in any context.
8. **A7 two-click purchase from the homepage is a hard requirement** — do not regress the coverflow → PDP → Add-to-Cart path. (Add-to-Cart and the newsletter form are intentionally non-wired pre-port — “two-click intact” means the UX path is preserved, not a live checkout.)
9. **Brand:** "Maple Moon" (two words). Headings p22-mackinac-pro, body neue-haas-grotesk-display, via Adobe kit `dvz0xjs` (NOT `rrz1ouj` — that is Lewis). **Protect the giant CAROB wordmark** (locked signature) in every hero variant.
10. **Verify the SHIPPED artifact via screenshot** (390 + 1440, plus 375/430 for mobile). Do not trust headless for TypeKit rendering or `env()` insets — the `p.css` `NAME_NOT_RESOLVED` in headless is an artifact, fonts render 200 in real Chrome.
11. **Do NOT push a Shopify theme** — D is markup-shape only until collaborator access lands (C1).
12. **Never touch the `~/Downloads` MapleMoon zips** (pending Drive upload).

---

## 7. Open Questions / Limitations

1. **Portal dynamic tabs unreadable.** Billing / Specs / Final Files / Archive are client-rendered; I could not extract them. Likely packaging specs, low website value. If the planner needs them, they must be viewed in a real browser. The four Shopify theme previews are available locally at `mockups/{shapes,futurer_basser,normcore_matte,ethereal}.html`.
2. **Bites & Eclipses category status.** The WIP site features it as a 5th category, but the dashboard omits it from the 90g/Bars list and marks Goji Bites + 5 Eclipse products as "paused (50% deposit, work on hold)." This is the crux of A4 — the planner should treat Bites/Eclipses as "coming soon" candidates pending C&D (B4), not as confirmed launch SKUs.
3. **Shipping-threshold conflict** ($60 homepage / $99 FAQ / $75 dashboard) — needs one authoritative number from C&D (B7). Tokenise now so the fix is one edit.
4. **Motion default-on vs "never auto-pick".** Flagged in Wave 0 — a real contradiction between what shipped and the brief. Needs a human decision.
5. **13 Jul call notes are a stub.** `call_notes_20260713_website_zoom.md` contains only a capture template ("OPEN: capture from Nate: pricing answer? review source?…"), not filled answers — meaning the A5 review source, final pricing, and store access were NOT resolved on that call and remain the standing blockers. The `_wip/_feedback/` folder is empty (log.jsonl 0 bytes) — no section-level client feedback has been captured yet.

---

## 8. Sources

**Primary (HIGH — read/verified this session)**
- All 6 WIP pages read in full: `homepage_real_1_lead_photo.WIP.html` (1049 lines), `shop.WIP.html`, `our-story.WIP.html`, `carob-story.WIP.html`, `faq.WIP.html`, `stockists.WIP.html`.
- Live puppeteer audit `_wip/audit.js` run against `:3005` at 375/390/430 (overflow, alt, tap targets, dead links, heading order, console).
- `_wip/DESIGN_BRIEF.md`, `_wip/_CHECKPOINT_20260714.md`, `_wip/_CHECKPOINT_20260718.md`, `_wip/RESEARCH_NOTES.md`, `_wip/_SECTION_TRACKER.html`.
- `_decisions_pack_20260713.html` (integration map + the three C&D asks).
- String-level A1 verification (grep, all 6 WIP): zero `Handmade in Brunswick` / `Byron Bay`; the one `PHOTO VARIANT` hit is a JS dev-comment, not client copy — A1 copy reversal fully applied.
- Filesystem verification: `assets/social/` absent; `assets/our_story/` present (no carli/dylan crops); `assets/product_shots/` + `assets/photo_finals/` present; `_wip/variants/` (popup, hero A/B/C, motion, button variants).

**Secondary (MEDIUM)**
- Dashboard portal https://dashboarddeployment.vercel.app/ (billing/architecture context; dynamic tabs not executable via WebFetch).
- `call_notes_20260713_website_zoom.md` (stub only).

**Confidence breakdown**
- WIP page state + audit metrics: **HIGH** (direct read + live tool).
- Blocker attribution (what's C&D vs external): **HIGH** (corroborated across brief + checkpoints + decisions pack).
- Shopify-port shape: **MEDIUM** (markup-only; live theme not accessible).
- Dashboard packaging specs: **LOW** (dynamic tabs unreadable).

**Valid until:** ~2026-08-01 for the WIP audit (re-run `audit.js` after any edit wave); dashboard/blocker state changes whenever C&D deliver content.
