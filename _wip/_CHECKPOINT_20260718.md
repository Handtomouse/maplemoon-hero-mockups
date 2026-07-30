# CHECKPOINT — MapleMoon WIP Homepage — 2026-07-18

## Session goal
Phase 1 polish on `homepage_real_1_lead_photo.WIP.html` per SPIN brief:
wire brand fonts, a11y Group A, layout tightening, gap list.

## DONE THIS SESSION (all verified in real Chrome)

### Font wiring [COMPLETE]
- Removed `@font-face{font-family:'Mackinac';...local()...}` blocks (×2) — these shadowed the TypeKit kit
- Fixed `.wf --mm-serif` from `'Mackinac','P22 Mackinac Pro',Georgia,serif` → `'p22-mackinac-pro','P22 Mackinac Pro',Georgia,serif`
- TypeKit `dvz0xjs.css` 200 + all 4 font files 200 confirmed in network log
- Computed `fontFamily` in browser = `p22-mackinac-pro, "P22 Mackinac Pro", Georgia, serif` ✓
- Off-machine deploy blocker resolved

### a11y Group A [COMPLETE]
- Added `<a class="skip-link" href="#main-content">Skip to main content</a>` (links into brand_kit.css `.skip-link` styles — already present)
- Added `<main id="main-content">` after hero section + `</main>` before `<footer>`
- Cart `<span role="button" tabindex="0">` → `<button type="button">` (proper native semantics)
- `.wf-pcart` 32×32 → 44×44px + button resets (background, padding, cursor)
- `.wf-ft .soc a` 30×30 → 44×44px

### Asset verification [CLEAN]
All real assets confirmed 200/304 in network log. Zero 404s.
Assets confirmed: hero, all 6 bar packshots, brand_kit.css, carob_wordmark.svg, licensed photos, photo_finals.

### Screenshots
`_wip/checkpoints/2026-07-14_wip_home_390.png` + `_wip_home_1440.png` (both shot.js, 18 Jul)

## GAP LIST (needs Carli + Dylan)

### Content gaps (cannot fabricate)
- **Retail pricing** — PDP shows `$5.50 (90g)` [indicative]; sampler box shows `$ TBC`. Final retail sheet with C&D. Note: live site = wholesale, do NOT scrape.
- **Real reviews** — testimonial carousel has 3 placeholder slides. Live site verified zero reviews (no Judge.me/Okendo/Loox). Need C&D to nominate a source (Google, IG, markets) or provide quotes directly.
- **A2 founders photos** — `assets/our_story/carli.webp` + `dylan.webp` not provided. Meet C&D section is structurally ready (layout spec in prior `$JD`).
- **A4 "coming soon" SKU states** — which SKUs need this treatment? Need C&D to confirm launch-ready vs held-back.
- **Social handles** — Instagram, Facebook, Email footer links are `href="#"` placeholders. Need `@maplemoon` handles from C&D.

### Asset gaps (production needed)
- **OG image** — `assets/social/` folder does not exist. Need 1200×630 crop from brand photos for social sharing (`<meta property="og:image">`).
- **Stockist logo set** — marquee currently runs text names (Harris Farm, Goodness Me Boxes, QE Health Foods). Final confirmed lineup + logo files pending.

### Access gaps (external block)
- **Shopify collaborator access** — homepage markup is shaped for `sections/*.liquid` but live port requires access from C&D.

## NEXT-WAVE ORDER (when unblocked)
1. SEO JSON-LD — Organization + WebSite already in file; add BreadcrumbList once URL is confirmed
2. A3 subscribe popup — scroll-triggered, accessible, NO baked discount; inject before `</body>`
3. A2 Meet C&D — blocked on photos; copy draft ready (needs Nate review + photo delivery)
4. Contrast audit — `--ink-faint` (#a99f87 on #eee9d3) fails WCAG 4.5:1; discuss with Nate before changing
5. Dead href="#" links — currency selector + social icons (blocked on handles)
6. Mobile verify — 375/390/430 safe-area + tap target recheck after this session's CSS changes

## CONSTRAINTS (carry-forward)
Cacao % omitted on ASAL/CHIL/GCOC/HNUT/PMIN; PCAR 50/50 stays; salted-caramel fudge active SKU.
No outbound comms. Money only with C&D. No em dashes in copy.
