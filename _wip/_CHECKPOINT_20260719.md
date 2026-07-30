# CHECKPOINT — MapleMoon WIP Homepage — 2026-07-19

## Codex content pass - 2026-07-19

Source handoff: `_HANDOFF_CODEX_20260719.md`

### Done
- Homepage sections 7-13 patched from Carli's copy: ritual lead-in, Our Story tease, founders strip, stockists marquee, reviews placeholder, sampler price, trust bar shipping threshold.
- Shop page patched: bars are `$12.95`, Pure Carob Elixir is `$23.95`, Spiced Carob Elixir is `$26.95`; moons, bites and bananas remain pricing placeholders.
- Our Story page patched with Carli's full narrative copy in the chapter, quote, craft, place, founders and CTA sections. Hero and gallery kept.
- Stockists page patched with confirmed National Chains and Independent Stores lists from Carli's content brief.
- `_SECTION_TRACKER.html` updated to `24 / 37 sections cleared`; Homepage Reviews is `content-pending`, not cleared.

### Remaining content blockers
- Real testimonials still pending from Carli.
- Moons, bites and bananas pricing still pending.
- Carob Story and FAQ tracker sections remain pending because they were outside this handoff.

### Launch
- Existing project server is listening on port 3005 from `/Users/handtomouse/maplemoon-website`.
- WIP tracker URL: `http://127.0.0.1:3005/_wip/_SECTION_TRACKER.html`
- WIP homepage URL: `http://127.0.0.1:3005/_wip/homepage_real_1_lead_photo.WIP.html`

---

## Session goal
Step 1 (fonts + layout) full lock on `homepage_real_1_lead_photo.WIP.html` + Wave 0 ratification.

## DONE THIS SESSION (verified in Chrome + Puppeteer)

### Wave 0 ratification [COMPLETE]
- B3 motion ON by default: APPROVED — kept
- New button system (curved-rect 14px, moon-halo glow): APPROVED — kept
- Seal + dark marquee: REMOVED (Nate decision) — static `.wf-pcreds` in-hero creds row restored
  - Note: `.wf-pcreds{display:none}` line removed; the creds row ("Naturally sweet | No caffeine | Nothing added | Organic & vegan") is live again below the hero CTA

### Tap-target 44px pass [COMPLETE]
Added `<style>/* A11Y — 44px tap-target pass */` block (lines ~1036-1047):
- `.skip-link` padding bump (15px top/bottom)
- `.wf-plogo` display:inline-flex + min-height:44px
- `.wf-pnav a` desktop-only `@media(min-width:901px)` inline-flex + min-height:44px
- `.wf-pscroll` flex + min-height:44px
- `.wf-tab` mobile `@media(max-width:900px)` padding:13.5px (was 11px; now 44px hit area)
- `.wf-pill` padding top/bottom 13→15px (~45px total)
- `.wf-sz` padding top/bottom 8→14px (~46px total)
- `.qarw` 42px → 44px
- `.wf-nl button` padding top/bottom 11→15px
- `.wf-ft .fnav a` min-height:44px
- `.wf-more` min-height:44px

### Mobile regression fix [COMPLETE]
`.wf-pnav a` tap-target rule wrapped in `@media(min-width:901px)` to preserve mobile `display:none` on nav links.

### Mobile verify [COMPLETE]
375×812 Puppeteer screenshot: hero clean, nav links hidden, coverflow renders, creds row visible.

## STEP 1 STATUS: LOCKED ✓
Fonts + layout fully locked as of 2026-07-19.

---

## GAP LIST (needs Carli + Dylan)

### Content gaps (cannot fabricate)
- **Retail pricing** — PDP shows `$5.50 (90g)` [indicative]; sampler box shows `$ TBC`
- **Free shipping threshold** — currently `$60` on site; conflicts with FAQ ($99) and dashboard ($75). PLACEHOLDER — needs C&D confirm
- **Real reviews** — 3 placeholder slides. Need source (Google, IG, markets) or direct quotes
- **Founder photos** — carli.webp + dylan.webp not provided. Meet C&D section structurally ready
- **Coming-soon SKU states** — not confirmed from C&D
- **Social handles** — Instagram, Facebook, Email footer links are `href="#"` placeholders

### Asset gaps
- OG image — `assets/social/` doesn't exist. Need 1200×630 crop for meta tags
- Stockist logo set — final confirmed lineup + logo files pending

### Access gaps
- Shopify collaborator access — needed for liquid port

---

## NEXT WAVE ORDER (when unblocked)
Per RESEARCH.md wave plan:
1. Wave 1: a11y + tap targets on inner pages (our-story, shop, carob-story, faq, stockists)
2. Wave 2: SEO — BreadcrumbList JSON-LD (once URL confirmed)
3. Wave 3: A3 subscribe popup (scroll-triggered, accessible, no baked discount)
4. Wave 4: A4 coming-soon SKU states (blocked on C&D)
5. Wave 5: A2 founders section (blocked on C&D photos)
6. Wave 6: content unblock (pricing, reviews — blocked on C&D)
7. Wave 7: mobile device verify (post all CSS changes)
8. Wave 8: Shopify markup shaping (blocked on access)

## CONTRAST NOTE
`--ink-faint` (#a99f87 on #eee9d3) fails WCAG 4.5:1 on supplementary labels. Deferred to final contrast audit — Nate confirmed 2026-07-19.

## CONSTRAINTS (carry-forward)
Cacao % omitted on ASAL/CHIL/GCOC/HNUT/PMIN; PCAR 50/50 stays; salted-caramel fudge = active SKU.
No outbound comms without Nate approval. Money/pricing only with C&D. No em dashes in copy.
TypeKit kit: dvz0xjs (NOT rrz1ouj — that is Lewis). Fonts: p22-mackinac-pro + neue-haas-grotesk-display.

---

## Orchestrated homepage pass closeout - 2026-07-19

Source wrapper: `019f7883-2299-7e20-8520-015a03a39e0f`

### Confirmed
- Trust bar Option B is present in `_wip/homepage_real_1_lead_photo.WIP.html`: three-item reassurance strip, `Orders over $99`, secure checkout, and linked stockists item.
- Reviews remain an honest content-pending block: `Real customer quotes are coming soon.` / `Awaiting approved testimonials`.
- `_SECTION_TRACKER.html` matches the homepage state: Trust bar is `cleared`; Reviews / quote is `content-pending`.
- Port `3005` preview is being served by the existing Node process at `http://127.0.0.1:3005/_wip/homepage_real_1_lead_photo.WIP.html`.

### Verification
- `git diff --check -- _wip/homepage_real_1_lead_photo.WIP.html` passed; direct trailing-whitespace scan passed for the homepage and checkpoint files.
- Visible-copy em dash scan passed for the homepage. Remaining em dashes in the file are inside comments only.
- Browser responsive probe passed at `1440x1100` and `390x900`: no horizontal overflow, trust bar is 3 columns on desktop and 1 column on mobile, with no trust-item overlaps.

### Remaining blockers
- Real customer testimonials from Carli and Dylan.
- Moons, bites, bananas, and any other unresolved pricing or coming-soon SKU states.
- Founder photos, social links, OG image, stockist logo assets, and Shopify collaborator access.

---

## Homepage go-pass - 2026-07-19

Source request: execute the next 10 homepage closeout steps.

### Changed
- `_wip/homepage_real_1_lead_photo.WIP.html`: removed the dead currency `href="#"`, changed the footer email social icon to `mailto:info@maplemoon.com.au`, and tightened homepage tap targets for nav, stockist note, trust link, footer links, logo, and the motion toggle.
- `_wip/_feedback/feedback.js`: tightened WIP feedback overlay tap targets and changed the hidden panel label from an `h4` to a non-heading title so the page outline remains clean.
- `_wip/_HOMEPAGE_PROMOTION_CHECKLIST_20260719.md`: added the frozen homepage baseline checksum, verification record, promotion checklist, and blocker register.

### Verification
- Homepage baseline SHA-256: `9a8f9bf990fecbf3f80c36ebfe5eef0d463f3f7afa8a956c7354baa4ed7bab55`.
- `git diff --check -- _wip/homepage_real_1_lead_photo.WIP.html _wip/_feedback/feedback.js` passed.
- Visible-copy em dash scan passed.
- Browser probe passed at `390`, `768`, `1024`, and `1440`: no horizontal overflow, no missing alt attributes, no sub-44px interactive targets, and no visible heading skip.
- Commerce probe passed: bars and elixirs remain purchasable; Crescents and Eclipse Bites remain disabled with `Pricing to follow`.

### Still blocked
- Real testimonials, social URLs for Instagram/Facebook, unresolved SKU launch states, unresolved pricing outside the confirmed homepage set, founder assets, OG/social images, and Shopify access.

---

## Range section order cleanup - 2026-07-19

Source request: move the range section away from the headline-first layout and make the products lead.

### Changed
- `_wip/homepage_real_1_lead_photo.WIP.html`: reordered the range band to product shelf, selected product, `Shop Now` / `Shop Range`, format tabs, then the `Featured collection preview` copy.
- `_wip/homepage_real_1_lead_photo.WIP.html`: kept `#catTabs`, `#stage`, `#rangeCopy`, `#pdpName`, `#pdpPrice`, `#pdpAdd`, and `#pdpView` intact for the existing JS contracts.
- `_wip/_section_variants/range-cleanup-options-20260719.html`: updated Option A and the iPhone read to reflect the corrected product-first hierarchy.

### Verification
- `python3 -m html.parser` passed for the homepage WIP and range cleanup variant file.
- `git diff --check` passed.
- Browser check passed on the active WIP render: no horizontal overflow, no broken loaded images, no visible em dashes, and no visible tap targets under 44px.
- Commerce state check passed: Bars show `$12.95` with `Shop Now`, Elixirs show `$23.95` with `Shop Now`, and Crescents / Eclipse Bites remain disabled with `Pricing to follow`.
