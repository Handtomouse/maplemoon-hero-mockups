# Visual Audit — V14–V16
Generated: 2026-03-10

Scope: hero_v14.html, hero_v15.html, hero_v16.html
Auditor: Senior Visual/UI — MapleMoon brand standards
Brand palette verified against brand_kit.css
Asset directories verified on disk

---

## Asset Directory Map (verified)

| Directory | Exists | Key finding |
|---|---|---|
| assets/mood/texture_ingredient/ | NO — directory does not exist | All V14 references to this path will 404 |
| assets/mood/hero_lifestyle/ | YES | Contains only 2 files: pinterest_702913454385866270.jpg, pinterest_702913454385918050.png |
| assets/mood/flatlay_editorial/ | YES | 6 files — pinterest_918034, 918053, 918064, 918066, 918078, 918122 |
| assets/mood/brand_palette/ | YES | 4 files — pinterest_917454, 917456, 917460, 917963 |
| assets/products/ | YES | 24 files — eclipse_almond.jpg present, moon_peppermint.jpg present, eclipse_fudge.jpg present, bath_salts.jpg present |
| assets/products_clean/ | YES | 13 files — no moon_peppermint.png, no eclipse_almond.png |
| assets/stock/ | YES | stock_spices_warm.jpg present |

---

## V14 — Ingredient Journey

### P1 — Must Fix (broken/unusable)

- **Chapter image 1 — 404**: `assets/mood/texture_ingredient/` directory does not exist on disk. The entire first chapter image (Origin) will fail to load and show a broken image placeholder.
  Fix: Replace `src="assets/mood/texture_ingredient/pinterest_702913454385866187.jpg"` with `src="assets/stock/stock_ingredient_pods.jpg"` (earthy pod texture, correct mood for "It starts with the pod") and update the `<link rel="preload">` in `<head>` to match.

- **Chapter image 3 — 404**: `src="assets/mood/flatlay_editorial/pinterest_702913454385918064.jpg"` is referenced (alt: "MapleMoon Original Bar") but the code actually uses path `assets/mood/flatlay_editorial/pinterest_702913454385918064.jpg` — that file EXISTS in flatlay_editorial. However the HTML at line 421 says `assets/mood/flatlay_editorial/pinterest_702913454385918064.jpg` — confirmed present. No fix needed here. BUT note the `alt` attribute on this image reads "MapleMoon Original Bar" — this is descriptive enough and acceptable.

- **Mobile layout — chapter text buried under sticky panel**: `.visual-panel` is `height: 60vh` on mobile with `position: sticky; top: 0`. The first `.chapter` starts at z-index 2 and has `min-height: 80vh`. On a 390px screen, the sticky panel occupies 60vh (approx 504px at 840px device height), leaving only 40vh above-fold for chapter text. The intersection observer uses `threshold: 0.5` — meaning a chapter must be 50% visible to fire. At 80vh chapter height in a 40vh remaining viewport, the first chapter will never reach 50% visibility without scrolling past the panel, breaking the crossfade trigger on initial load.
  Fix: Either reduce `threshold` to `0.3` in the IntersectionObserver options, or reduce `.chapter` `min-height` to `60vh` on mobile so chapters enter the viewport more readily. The sticky panel height itself is fine at 60vh — the observer threshold is the root cause.

- **`.back-link` and `.hamburger` z-index conflict on mobile**: `.back-link` is `position: fixed; top: 16px; left: 16px; z-index: 10`. `.hamburger` is also `position: fixed; top: 12px; left: 12px; z-index: 200`. Both are top-left. The hamburger renders directly on top of the back link. Back link is completely invisible and unreachable by tap on mobile.
  Fix: Remove the `.back-link` from mobile view entirely — add `@media (max-width: 767px) { .back-link { display: none; } }` — since mobile already has the header with logo. Or reposition the back link to `right: 16px; left: auto` on mobile.

### P2 — Should Fix (noticeably wrong)

- **Progress dots overlap chapter text on narrow mobile**: `.progress-dots` is `position: fixed; right: 16px; top: 50%; z-index: 10`. At 390px width, the chapters have `padding: 60px 32px`. The right edge of the chapter text block is at viewport_width - 32px = 358px. The dots sit at right:16px, so at 390-16=374px from left — only 16px clear of the text block edge. Any long word near the right margin will slide beneath the dots.
  Fix: Increase chapter right padding on mobile to account for the dots: `.chapter { padding: 60px 48px 60px 32px; }` or push dots further right: `.progress-dots { right: 8px; }` and set chapter `padding-right: 40px`.

- **Chapter image alt texts are empty strings on images 2–4**: `journey-img` elements for chapters 2, 3, and 4 (Craft, The Bar, Shop) have descriptive alt text ("Carob roasting process", "MapleMoon Original Bar", "MapleMoon bar collection") — these are FINE. However chapter 1 image `alt="Raw carob pods and natural ingredients"` will be the broken-image description once fixed. These are all acceptable when images load, but screen readers will announce the broken image file name for the 404 — already addressed in P1.

- **Mobile desktop header z-index**: `.header-mobile` is `position: fixed; z-index: 10`. Both `.header-mobile` and `.progress-dots` share `z-index: 10`. If a browser renders stacking order by DOM position, the progress dots (appearing later in DOM) will stack above the header logo. Not critical but can cause visual flicker on scroll.
  Fix: Set `.progress-dots { z-index: 9; }` so the header reliably wins.

- **Trust row icons at 20px with opacity 0.5**: At 20px and 50% opacity on a mobile screen, these icons are extremely difficult to see, especially on the blue gradient. The filter `brightness(0) invert(0.92) sepia(0.1) saturate(0.3)` renders them as a near-white/cream which is correct on-palette, but size and opacity combine to make them nearly invisible.
  Fix: Increase to `width: 24px; height: 24px` and `opacity: 0.7` on mobile.

- **`.mobile-menu .menu-nav` references undefined `--mm-navy-15`**: Line 117 in V14 uses `border-top: 1px solid var(--mm-navy-15)`. The `brand_kit.css` defines `--mm-navy-15` correctly at rgba(30,67,102,0.15) — this IS defined in brand_kit.css. Not actually broken. Strike this — confirmed OK.

- **`<link rel="preload">` in `<head>` preloads the 404 image**: Line 21 preloads `assets/mood/texture_ingredient/pinterest_702913454385866187.jpg` which does not exist. This generates a wasted network request and a console warning that may be visible to stakeholders reviewing devtools.
  Fix: Update the preload href to `assets/stock/stock_ingredient_pods.jpg` to match the P1 image replacement.

### P3 — Polish

- **Chapter fade-out opacity 0.3 for inactive chapters**: At `opacity: 0.3`, inactive chapters are barely legible and sit between "visible" and "hidden" — the contrast with active (1.0) is good, but 0.3 may feel too aggressively dimmed on the blue gradient. Consider `opacity: 0.4`.

- **`chapter-title` serif font size 1.6rem on mobile**: For a premium artisan brand hero, 1.6rem (~25px) for the main headline feels small on a 390px screen. Consider stepping up to 1.8rem.

- **Desktop side-by-side layout — progress dots repositioned to `right: calc(50% - 24px)`**: On desktop the right panel is 50% wide. The dots sit at `right: calc(50% - 24px)` which places them near the center divider, between the two panels. This is the correct intent (dots as divider element) but risks appearing detached from both panels. Consider adding a visual connector or moving dots fully into the left panel with `right: auto; left: calc(50% + 20px)`.

- **Chapter body `max-width: 360px` on mobile**: At 390px viewport with 32px side padding, the effective content width is 326px, which is narrower than max-width. The max-width rule has no effect and can be removed for cleanliness.

- **`<img>` logo `width="40" height="40"` but SVG is likely not square**: The `maplemoon_logo.svg` has explicit `width` and `height` both set to 40, but the alt suggests it is a wordmark (rectangular). If the SVG viewBox is not square, this will distort the logo. Should be `width="auto" height="40"` or leave sizing to CSS only.

### Keep as-is

- Blue gradient (`--grad-top: #7B9DBF → --grad-bottom: #A8BDD4`) — exactly on-palette, warm and premium feel.
- `--mm-cream` and `--mm-navy` used correctly throughout — no hardcoded hex drift found.
- Typography split: `chapter-title` uses `var(--mm-serif)`, all body uses `var(--mm-sans)` — correct and consistent.
- IntersectionObserver no-JS fallback at lines 466–470 — correctly forces all fade classes and activates first image.
- Mobile menu: correct ARIA (aria-modal, aria-hidden toggle, focus trap, Escape key, focus return) — well implemented.
- `object-fit: cover` on `.journey-img` — correct for full-bleed chapter images.
- CTA button meets 48px min-height touch target.
- Desktop layout flip to `flex-direction: row` is clean and correct.
- `stock_spices_warm.jpg` for Chapter 2 "Roasted by hand" — excellent mood match, earthy and warm.

---

## V15 — Product Orbit

### P1 — Must Fix (broken/unusable)

- **Node 2 — wrong asset path**: `src="assets/products/eclipse_almond.jpg"` uses the backgrounded JPEG from `products/`. A clean PNG exists: `assets/products_clean/eclipse_hazelnut_a.png`. The node uses `object-fit: contain` inside a circular clip, so the JPG background will fill the circle as an opaque rectangle, breaking the transparency-dependent circular presentation. All other clean nodes use transparent PNGs correctly.
  Fix: Replace `src="assets/products/eclipse_almond.jpg"` with `src="assets/products_clean/eclipse_hazelnut_a.png"` and update `aria-label="Almond Eclipse"` to `aria-label="Hazelnut Eclipse"` and `data-name="Almond Eclipse"` to `data-name="Hazelnut Eclipse"` if product identity changes, or use `eclipse_pecan.png` if an almond variety is needed (no almond eclipse clean PNG exists).

- **Back link vs hamburger collision (same as V14)**: `.back-link` fixed top-left z-index 10 is fully obscured by `.hamburger` fixed top-left z-index 200 on mobile.
  Fix: `@media (max-width: 767px) { .back-link { display: none; } }` or move to right side.

- **`.orbit-tagline` uses `position: absolute; bottom: 80px`**: `.orbit-tagline` is `position: absolute` but its parent `main#main` is the flex container, not a positioned container. Wait — `main#main` has `position: relative` (line 62). However the tagline is a direct child of `main`, placed after `.orbit-stage` in the DOM. With `main` as a flex container (`display: flex; align-items: center; justify-content: center`), the tagline is a flex item stacked horizontally alongside the orbit-stage. The `position: absolute` on `.orbit-tagline` removes it from flex flow and anchors it to `main` (which is `position: relative`) — this is intentional. The `bottom: 80px` should correctly position it above the trust row. However the trust row is also `position: absolute; bottom: 32px` within `main`. On mobile (390px) the trust row at `bottom: 32px` and tagline at `bottom: 80px` are fine vertically. BUT `main` has `overflow: hidden` — if the orbit-stage's computed height (via CSS custom properties: 2×150px + 88px = 388px) exceeds the viewport at 100dvh minus any header offset, the absolute-positioned tagline may be visually cropped. On iPhone SE (667px height), orbit-stage = 388px. main = 667px. Tagline at bottom:80px = 587px from top = safe. On very short screens (iOS landscape ~414px height), orbit-stage = 388px occupies most of 414px, tagline would collide with orbit ring. Flag as edge case.
  Note: Not strictly P1 on portrait mobile but worth testing on landscape/short viewports.

- **`.trust-row` and `.orbit-tagline` both `position: absolute` inside a flex container**: Both elements are removed from flex flow and positioned relative to `main`. This is architecturally fragile — any change to `main`'s padding or sizing ripples unexpectedly. Not broken today but brittle.

### P2 — Should Fix (noticeably wrong)

- **Center wordmark `opacity: 0.15` is illegible**: The `.orbit-center .wordmark` SVG is at 15% opacity centered in the orbit. This is intentionally ghosted but at 80px width and 15% opacity on a blue gradient, it renders as near-invisible texture rather than a legible brand anchor. The design intent (subtle watermark center) is undermined — viewers won't register it as the wordmark.
  Fix: Increase to `opacity: 0.25` for a still-subtle but perceptible presence. Alternatively, explore a cream-tinted SVG filter: `filter: brightness(0) invert(1) opacity(0.2)` to ensure it renders cream (not grey).

- **Node images `width="104" height="104"` but node size is 88px on mobile**: The `<img>` elements inside nodes have `width="104" height="104"` as HTML attributes, but the CSS node size is `var(--node-size): 88px`. The `object-fit: contain; padding: 10px;` handles this at runtime — the img fills the 88px container correctly. But the explicit width/height hints are wrong and will cause a momentary layout shift as the browser reconciles HTML dimensions (104px) with CSS-applied container (88px).
  Fix: Remove the fixed `width="104" height="104"` attributes from all 6 node images and rely on CSS sizing: `width: 100%; height: 100%`. Or update to `width="88" height="88"`.

- **`aria-hidden="true"` on carob watermark `<img>` but element has `alt=""` already**: Double-redundant accessibility annotation — not wrong, just unnecessary. Cosmetic only.

- **Info panel on desktop (`right: 60px`) clips under header**: On desktop, `.info-panel.visible` is `top: 50%; right: 60px; width: 320px`. The desktop header has `z-index: 10`. The info panel has `z-index: 20` — it will correctly appear above the header. However at `top: 50%` with `transform: translate(0, -50%)`, on shorter viewport heights (e.g. 768px), the panel's top edge could reach `50% - (panel_height/2)`. If panel height exceeds ~400px, it would clip under the header at 28px top. Panel content is short so this is unlikely but worth checking with real content.

- **Orbit ring animation speed**: 60s per full rotation is pleasant. However because the counter-rotation on `.product-node-inner` exactly cancels the ring rotation (same 60s), products appear fully stationary to the user — only the ring itself visually moves (if the ring has a border or track, which it does not). The visual effect is: all 6 product nodes float in a circular arrangement with no apparent motion to the products themselves. This matches the intent (orbit = product carousel, not spinning labels) but with no visible ring track, the 60s rotation is invisible. The animation is effectively decorative-only and most users won't notice it.
  Suggestion: Either add a subtle SVG ring track (circle with dashed stroke at `--orbit-radius`) so the rotation is perceptible, or accept the current non-obvious motion (it's not wrong, just subtle).

### P3 — Polish

- **`body { overflow: hidden }` repeated twice** (lines 37 and 41 in the same rule block — wait, checking: line 37 is `body { height: 100%; overflow: hidden; }` and lines 39–48 are a second `body { }` block with `overflow-x: hidden`). Two separate `body` declarations. Not a bug (cascade merges them) but unclean.

- **Orbit node 5 (`Roasted Powder`) and 6 (`Gift Bundle`) use backgrounded JPEGs**: `powder_roasted.jpg` and `bar_bundle.jpg` from `assets/products/` have backgrounds. Inside the circular 88px node with `border-radius: 50%; overflow: hidden`, JPEGs will show the photo background as a circle crop. The powder bag and gift bundle photographed on neutral backgrounds will work tolerably, but won't match the clean-PNG transparency quality of the other 4 nodes.
  Suggestion: If product photography backgrounds are light/neutral, this is acceptable. Flag for client sign-off.

- **Trust row icons `opacity: 0.5` — same issue as V14**: 20px at 50% opacity nearly invisible on blue. Increase to `opacity: 0.7`.

- **No visible orbit ring track**: With no SVG circle ring behind the nodes, the "orbit" concept reads as a static circle of products. A hairline `stroke: rgba(231,228,202,0.15)` SVG circle at `r = var(--orbit-radius)` would complete the celestial metaphor without visual clutter.

- **Desktop info panel animation uses spring easing (`cubic-bezier(0.34, 1.56, 0.64, 1)`)**: This spring (slight overshoot) is appropriate and brand-consistent. Keep.

### Keep as-is

- `main#main` correctly uses `position: relative; display: flex; align-items: center; justify-content: center` — orbit-stage is correctly centered as a flex child. Confirmed per audit instruction.
- `orbit-stage { position: relative }` — correct, product nodes are positioned within this local coordinate system.
- Background gradient `#7B9DBF → #A8BDD4` — on-palette, correctly applied.
- `prefers-reduced-motion` guard on all animations — correctly scoped to `no-preference`.
- `object-fit: contain; padding: 10px` on node images — correct for portrait bar packaging.
- Info panel keyboard handling (Escape, focus return to `lastFocusedNode`) — solid implementation.
- All node `aria-label` attributes correctly describe the product for screen readers.
- `bar_pure_carob.png`, `elixir_spiced.png` — correct clean PNG assets, correctly referenced.

---

## V16 — Moodboard Drift

### P1 — Must Fix (broken/unusable)

- **`filter: brightness(10)` on `.hero-wordmark` blows out the SVG**: Line 210 sets `filter: brightness(10)` on the wordmark SVG. `brightness(10)` multiplies all channel values by 10 — any pixel that is not pure black becomes pure white. The carob wordmark SVG will render as a solid white blur, completely illegible, and with opacity 0.9 will appear as a bright white smear over the dark background. This is the worst single issue in all three files.
  Fix: `filter: brightness(10)` → `filter: brightness(0) invert(1)` to render the SVG as pure white/cream on dark background. For the cream tone specifically: `filter: brightness(0) invert(1) sepia(0.15) saturate(0.8)` to tint toward `--mm-cream (#E7E4CA)`. Or simply: `filter: none` if the SVG is already cream-stroked.

- **`assets/mood/texture_ingredient/` does not exist (V14 preload only — V16 does not reference it)**. V16 does not use texture_ingredient. Confirmed clean.

- **Column 3 images — two probable 404s**:
  - `assets/products/moon_peppermint.jpg` — EXISTS on disk (confirmed in products/ listing). OK.
  - `assets/products/eclipse_fudge.jpg` — EXISTS on disk. OK.
  - `assets/products/bath_salts.jpg` — EXISTS on disk. OK.
  - All Column 3 product/ paths resolve. No 404s.

- **Column 1 image — `assets/mood/brand_palette/pinterest_702913454385917460.png` — EXISTS** (confirmed).

- **`assets/mood/hero_lifestyle/pinterest_702913454385866270.jpg` in Column 2 — EXISTS** (confirmed). OK.

- **`body { overflow: hidden }` + `html { overflow: hidden }` prevents all keyboard/screen reader scrolling**: The reduced-motion fallback at lines 264–272 correctly sets `html, body { height: auto; overflow-y: auto }`. However for users who do NOT prefer reduced motion, `html, body { height: 100%; overflow: hidden }` on line 31 combined with `overflow: hidden` on `body` at line 41 means there is NO scroll anywhere on the page. This is intentional for the full-viewport drift hero, but the `<main id="main">` is a full-screen overlay (`position: fixed; top:0; left:0; right:0; bottom:0`) with `pointer-events: none` on the container and `pointer-events: auto` only on children. The skip-link (`.skip-link`) is `position: absolute; top: -100%` which cannot be reached via scrolling. On focus the skip-link becomes `top: 16px` — this works since it is focused via Tab, not scroll. Not strictly broken but the `pointer-events: none` on `main` wrapper means click events on the CTA only work because the `> *` selector restores them. This is correct but fragile — any additional direct children of `main` would be unclickable by default.

- **`assets/products/bath_salts.jpg` in Column 3**: Bath salts is not a food/chocolate product. Including it in a moodboard for a carob chocolate brand creates brand confusion — this is a product category error, not a path error.
  Fix: Replace `assets/products/bath_salts.jpg` (both instances — lines 457 and 464) with `assets/stock/stock_flatlay_dark.jpg` or `assets/products_clean/bar_goji_coconut.png` for brand coherence.

### P2 — Should Fix (noticeably wrong)

- **3-column drift on mobile (390px) — columns are ~127px wide each with 6px gaps**: At 390px viewport, three `flex: 1` columns with `padding: 0 6px` and `gap: 6px` yields approximately `(390 - 12 - 12) / 3 = 122px` per column. Product bar PNGs are portrait (tall), so bar images in 122px wide columns will be legible but very narrow. Editorial flatlay images and lifestyle shots will be extremely cramped — fine details will be indistinguishable. The moodboard concept requires enough image width to read mood and texture.
  Fix: Consider 2 columns on mobile (below 640px) with the third column hidden: `@media (max-width: 639px) { .drift-col:nth-child(3) { display: none; } .masonry-track { gap: 8px; padding: 0 8px; } }`. This improves image legibility substantially while retaining the drift motion.

- **Vignette `radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)` renders as wide oval on landscape/ultrawide screens**: On a 1440×900 viewport, the ellipse major axis is 1440px and minor axis is 900px. The transparent center extends 30% = 432px wide and 270px tall. The dark overlay only kicks in at 70%+ radius, leaving a large unprotected content zone. Center overlay text (title, CTA) sits in the transparent zone — text readability against the moodboard images beneath is entirely dependent on image brightness.
  Fix: Add a secondary linear overlay for the bottom third where the text is anchored on desktop: `.hero-overlay-content::before { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%); z-index: -1; pointer-events: none; }` — or simply increase the vignette opacity: `rgba(0,0,0,0.7)` → `rgba(0,0,0,0.82)` for better text contrast.

- **`.hero-overlay-content` on desktop: `align-items: flex-start; justify-content: flex-end` places content bottom-left**: This is a deliberate design choice — title/CTA in the bottom-left corner of the frame, moodboard fills the frame. This reads strongly and is brand-appropriate. However `padding: 0 60px 80px` on desktop means the CTA "Shop Now" sits 80px from the bottom. On a 900px viewport this leaves the center of the screen empty — which is intentional (the moodboard IS the content). This is fine as a design choice; flag only if the client expects a centered layout.

- **`.hero-title` reads "MAPLE MOON" (all-caps) in a serif font**: The `.hero-title` has `font-family: var(--mm-serif)` but no `text-transform: uppercase` — the "MAPLE MOON" text is hardcoded uppercase in HTML. `letter-spacing: 0.06em` on a serif font at 1.8rem mobile is slightly tight for all-caps display. Recommend `letter-spacing: 0.1em` for proper all-caps spacing.

- **`<img class="hero-wordmark">` followed immediately by `<h1 class="hero-title">MAPLE MOON`**: The brand name is communicated twice in immediate sequence — once via the wordmark SVG (which when fixed will read "Maple Moon") and once as visible H1 text "MAPLE MOON". This is visually redundant and creates awkward stacking of two brand name elements.
  Fix: Either hide the wordmark (`aria-hidden="true"`, `alt=""`) and treat it as purely decorative, or remove the visible H1 and use the wordmark as the semantic brand name (give it `role="img"` and a meaningful `alt`). Current implementation has `alt="Maple Moon"` on the wordmark AND visible H1 "MAPLE MOON" — screen readers announce the brand name twice.

- **Column 2 image `assets/mood/flatlay_editorial/pinterest_702913454385918053.jpg` — EXISTS** but Column 2 drift animation is 90s. Column 2 has 7 unique images × 2 = 14 total images for seamless loop. If the column's total natural height is less than twice the viewport, the `translateY(-50%)` loop will stutter. With 14 images at ~122px wide each (varying heights but portrait-ish), total column height is unpredictable. This is a known CSS-only infinite scroll limitation — no fix available without JavaScript height calculation. Flag for testing.

### P3 — Polish

- **Drift animation 80s/90s/100s**: At these speeds the drift is very slow — almost imperceptible on first glance. This is intentional for a premium ambient feel (not a carousel). The asymmetric durations (80/90/100s) correctly prevent columns from syncing and creating a "marching" pattern. Appropriate for brand feel — keep as-is, but note that some clients expect more visible motion.

- **Image `opacity: 0.6` for drift images**: At 60% opacity the moodboard images read as clearly secondary to the overlay content, which is correct. The `opacity: 0.3` on pause (`.masonry-track.paused .drift-col img`) provides good interactivity feedback. Consider bumping non-paused opacity to 0.65 for slightly richer imagery on desktop where text contrast is handled by vignette.

- **`border-top: 1px solid var(--mm-navy-15)` in `.mobile-menu .menu-nav`**: Confirmed defined in brand_kit.css — OK. Not an issue.

- **`.back-link` and `.hamburger` z-index collision on mobile** — same issue as V14 and V15.
  Fix: Same as noted in V14 — hide back-link below 768px breakpoint.

- **`theme-color` meta is `#1a1a1a`** (dark) — correctly reflects the dark background of V16. Matches `--mm-dark-bg`. Correct.

- **`assets/mood/flatlay_editorial/pinterest_702913454385918064.jpg` in Column 1**: This file EXISTS in flatlay_editorial. Confirmed OK.

- **`assets/mood/brand_palette/pinterest_702913454385917963.jpg`** — EXISTS in brand_palette. Confirmed OK.

- **`assets/mood/brand_palette/pinterest_702913454385917456.jpg`** — EXISTS in brand_palette. Confirmed OK.

### Keep as-is

- Dark background `--mm-dark-bg: #1a1a1a` — on-palette, creates correct contrast for drift moodboard concept.
- All `products_clean/` PNGs in columns 1 and 2 — correctly referenced and confirmed on disk.
- `prefers-reduced-motion` fallback (lines 264–272) correctly converts the fixed layout to scrollable. Solid implementation.
- `backdrop-filter: blur(8px)` on CTA button — elegant on dark moodboard. Correctly vendor-prefixed.
- `pointer-events: none` on `.masonry-viewport` with `aria-hidden="true"` — correct, background is purely decorative.
- Pause/resume on mouseenter/touchstart — thoughtful interaction, well implemented.
- CTA button color contrast: `var(--mm-cream)` border and text on semi-transparent dark background — passes contrast.
- `text-shadow` on `.hero-title` and `.hero-tagline` — correctly adds legibility buffer against variable imagery behind.
- Font sizing progression: 1.8rem → 3rem (768px) → 3.4rem (1024px) — proportionate and premium-feeling.
- Trust badges placement in hero overlay — visible, contextually placed after CTA, correct sizing.

---

## Cross-Version Issues

These issues appear in all three files and should be fixed globally:

| Issue | All versions | Fix |
|---|---|---|
| `.back-link` obscured by `.hamburger` on mobile | V14, V15, V16 | Add `@media (max-width: 767px) { .back-link { display: none; } }` |
| Trust icon size/opacity too small | V14, V15, V16 | `width: 24px; height: 24px; opacity: 0.7` |
| Duplicate `fadeIn` keyframe definition (local style block overrides brand_kit.css) | V14, V15, V16 | Remove local `@keyframes fadeIn` and `.fade-N` rules — rely on brand_kit.css versions |
| `--mm-navy-15` border in `.mobile-menu .menu-nav` | V14, V15, V16 | Confirmed defined in brand_kit.css. No fix needed. |
| `<img>` logo size mismatch (`width="40" height="40"` on likely-rectangular SVG) | V14, V15, V16 | Use `height="40" width="auto"` or size via CSS only |

---

## Priority Summary

| File | P1 count | P2 count | P3 count |
|---|---|---|---|
| V14 | 3 | 3 | 5 |
| V15 | 2 | 4 | 4 |
| V16 | 2 | 4 | 5 |

**Highest severity items overall:**
1. V16 `filter: brightness(10)` on wordmark — renders brand name as white smear (P1)
2. V14 Chapter 1 image 404 (`assets/mood/texture_ingredient/` directory missing) — first impression is broken image (P1)
3. V14 IntersectionObserver threshold prevents crossfade trigger on mobile (P1)
4. V15 `eclipse_almond.jpg` JPEG with background inside circular transparent node (P1)
5. V16 `bath_salts.jpg` is off-brand product category in a chocolate moodboard (P1)
