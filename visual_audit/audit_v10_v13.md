# Visual Audit — V10–V13
Generated: 2026-03-10

Asset inventory confirmed:
- `assets/mood/hero_lifestyle/`: `pinterest_702913454385866270.jpg`, `pinterest_702913454385918050.png`
- `assets/mood/brand_palette/`: `pinterest_702913454385917454.jpg` (+ 3 others)
- `assets/stock/`: 10 files confirmed
- `assets/products_clean/`: 12 PNGs confirmed
- `assets/products/`: 20 JPGs confirmed

---

## V10 — Letterbox Cinema

### P1 — Must Fix (broken/unusable)

- **Wrong image path**: Hero background references `assets/mood/brand_palette/pinterest_702913454385917454.jpg` (line 288). This is a brand palette swatch image, not a lifestyle hero. The file IS found at that path and will render, but it is categorically the wrong image for a full-bleed cinematic hero — it is a colour reference photo, not an editorial lifestyle shot. Flag for designer review: intended image is likely from `assets/mood/hero_lifestyle/`. DO NOT auto-replace. Mark for decision.

- **Redundant dual overlay causing double-darkening**: `.cinema-bg::before` applies `linear-gradient(rgba(30,67,102,0.4), rgba(30,67,102,0.6))` at `z-index: 1`, AND `.cinema-overlay` applies `var(--mm-black-35)` (= `rgba(0,0,0,0.35)`) also at `z-index: 1`. Both stack. Total darkness in lower half = navy 0.6 + black 0.35 combined opacity, which will muddy and obscure any mid-to-dark image. Fix: remove one layer. Recommended: remove `.cinema-overlay` div entirely, keep only `::before` gradient (which is more intentional). Change: delete `<div class="cinema-overlay"></div>` (line 290) and its CSS rule (lines 133–137).

- **Back link hidden on mobile with no alternative**: `.back-link` has `display: none` on mobile (line 51) with no hamburger or nav alternative present at all. V10 has no mobile menu. A user on mobile is trapped with no navigation except the "Explore" CTA. Fix: either add `display: block` to `.back-link` on mobile, OR add the hamburger/menu system from V11/V12/V13. Minimum fix: remove `display: none` from `.back-link` base rule so it shows at all breakpoints.

- **`overflow: hidden` on `html, body` prevents scroll on mobile if content grows**: Line 35 sets `html, body { height: 100%; overflow: hidden; }`. Combined with `.cinema-viewport` being `position: fixed`, this is intentional for the letterbox effect. However, on very small screens (e.g. 320px width), if the `cinema-content` flex column exceeds the viewport height minus `calc(--bar-height * 2)` (120px total at mobile), content will clip silently with no scroll escape. At 320×568px (iPhone SE), the content area is only 448px tall. The flex column has wordmark + tagline + origin + button + gaps. The wordmark alone at `60% width` = 192px wide, which at its natural aspect ratio could be 48–80px tall, leaving just 368–400px for the rest. This is likely fine but tight. Flag as watch item.

### P2 — Should Fix (noticeably wrong)

- **`--mm-dark-bg: #1a1a1a` is not in the brand palette spec**: The spec lists `--mm-cream`, `--mm-navy`, `--mm-carob-dark`, `--mm-blue-top`, `--mm-blue-bottom`. `--mm-dark-bg` is defined in `brand_kit.css` as `#1a1a1a` — a near-black. The letterbox bars use `background: var(--mm-dark-bg)` (lines 79, 81). This is a very cold, neutral dark, inconsistent with the earthy carob brand feel. The bars would read warmer using `var(--mm-carob-dark)` (`#3a2a1a`). Change: `.letterbox-top` and `.letterbox-bottom` — `background: var(--mm-dark-bg)` → `background: var(--mm-carob-dark)`.

- **`--bar-height: 60px` on mobile is too thin for 5 trust icons**: Bottom bar at 60px contains 5 x 20px icons in a flex row with default gap. At 390px screen width with `gap: 8px` (4 gaps = 32px) plus icons (5 × 20px = 100px), total = 132px of content centred in a 390px bar — fine. But on 320px the bar is still 60px tall and the icons are 20px, so vertical centering leaves only 20px padding per side — acceptable but very tight. No text is shown at mobile. Adequate as-is; the P2 is that 60px feels cinematically thin compared to the concept's ambition of a film-grade letterbox. Suggest increasing to `--bar-height: 72px` on mobile for visual weight.

- **`kenBurns` animation defined inside a media query that is nested inside a `@media` block**: Lines 215–224 define `@keyframes kenBurnsDesktop` inside `@media (min-width: 768px)`. Nested `@keyframes` inside media queries is valid CSS but is not universally supported in older Safari. The mobile `@keyframes kenBurns` (line 124) is also inside `@media (prefers-reduced-motion: no-preference)`. Neither keyframe is defined at global scope as a fallback. This is low-risk but worth flattening: move both `@keyframes` to global scope and use the media query only on the `animation` property assignment.

- **`cinema-origin` uses `var(--mm-serif)` at `0.75rem`**: `.cinema-origin` (line 172–176) uses the serif typeface at 0.75rem for "HANDMADE". The brand serif (P22 Mackinac Pro) is defined as headlines only. A single decorative word at 0.75rem in serif is borderline — it reads as a label/caption which should be sans. Change: `font-family: var(--mm-serif)` → `font-family: var(--mm-sans)` on `.cinema-origin`.

- **`opacity: 0.5` on `.cinema-origin` "HANDMADE"**: At 0.5 opacity over a variable photo background, this text is likely to fall below WCAG AA contrast on any light areas of the image. Even as decorative text, at 0.75rem it is borderline legible. If keeping, add `text-shadow: 0 1px 4px rgba(0,0,0,0.5)`. If removing opacity constraint, set to 0.7 minimum.

### P3 — Polish

- **`cinema-wordmark` opacity `0.85`**: The wordmark at 85% opacity over a dark photo overlay is readable, but the slight transparency undercuts premium confidence. On a dark hero, full opacity (`opacity: 1`) reads bolder. Consider removing the opacity rule and relying on the drop-shadow for depth separation.

- **`preload` hint points to brand palette image, not the hero lifestyle image**: Line 22 preloads `assets/mood/brand_palette/pinterest_702913454385917454.jpg`. Once the correct hero image is selected, update this `<link rel="preload">` to match.

- **`letterbox-bottom .shipping-text` at `opacity: 0.4`**: The shipping message is extremely faint. At 0.4 opacity in 0.65rem tracking, on a dark bar, this will be illegible for many users. Minimum: 0.6 opacity. Or promote it to a cleaner trust statement at normal opacity.

- **Mouse parallax on wordmark has no reset on mouse leave**: When the mouse exits the viewport (e.g. moving to browser chrome), the wordmark stays at its last offset position. Add a `mouseleave` listener on `document` to reset `wordmark.style.transform = ''`.

### Keep as-is
- Staggered fade-in timing (0.3s → 1.2s) is well-paced and cinematic.
- Ken Burns with both zoom and pan on desktop is appropriate for the cinema concept.
- CTA button ghost style with cream border is on-brand. Hover fill to cream/navy swap is clean.
- Trust icons in bottom bar with SVG filter to cream colour is correct approach.
- `fetchpriority="high"` on hero image is correct.
- `min-height: 44px` on back-link and CTA meets touch target spec.

---

## V11 — The Grid

### P1 — Must Fix (broken/unusable)

- **`moon_peppermint.jpg` is a backgrounded JPEG in Tile 2, rendered as `object-fit: contain`**: Line 499 uses `assets/products/moon_peppermint.jpg` (a JPG with a photographic background) as a product image inside a blue gradient tile, using `.tile-moon .tile-product` which has `object-fit: contain`. The JPG background will be fully visible as a rectangular photo inside the blue tile — the background of the photo will clash with the tile gradient. All other product tiles use clean PNGs. A clean PNG equivalent (`assets/products_clean/eclipse_hazelnut_a.png` or `eclipse_pecan.png`) exists and should substitute. Note: there is no `moon_peppermint` PNG in `products_clean/` — designer must source or use the closest clean alternative (eclipse series). Change: `src="assets/products/moon_peppermint.jpg"` → `src="assets/products_clean/eclipse_hazelnut_a.png"` (or designer-approved moon clean PNG) in both the mobile tile (line 499) and the desktop tile-moon reference.

- **Desktop grid leaves tile 5 (Origin) and tiles 6–7 in a 4-col grid with only 4 columns specified for row 2**: Desktop sets `grid-template-columns: 2fr 1fr 1fr 1fr` and `grid-template-rows: 1fr 1fr`. Tile-origin is `grid-column: 2/3, grid-row: 2/3`. Tile-trust-desktop is `grid-column: 3/4, grid-row: 2/3`. Tile-powder-desktop is `grid-column: 4/5, grid-row: 2/3`. This accounts for columns 2–4 of row 2, but column 1 row 2 (the tall bar tile spanning both rows) is `grid-row: 1/3` — correct. So the grid is mathematically sound. Not a bug. Removing this flag.

- **Hamburger `aria-expanded="false"` is static HTML — never updated on open in the DOM until JS fires**: Line 445 hardcodes `aria-expanded="false"`. The JS does update it (line 563), but if JS fails, the attribute stays false permanently even when the menu opens visually via the CSS checkbox trick. This is a known pattern limitation, but for a public product site it should be noted. This is a P1 only if accessibility compliance is required; otherwise P2. Flagging here as P2 (see below).

### P2 — Should Fix (noticeably wrong)

- **Tile 3 overlay `rgba(180,140,80,0.25)` is off-palette**: Line 211 uses `rgba(180,140,80,0.25)` — an ochre/gold tint. This exact colour does not exist in `brand_kit.css`. The brand's warm dark tone is `--mm-carob-dark: #3a2a1a`. The `rgba(180,140,80,0.25)` feels like an accidental leftover from an earlier warm-filter attempt. It will add a golden cast to `stock_flatlay_dark.jpg` which is fine tonally but is not a defined palette colour. Change: `.tile-lifestyle .tile-overlay { background: rgba(180,140,80,0.25) }` → `background: rgba(58,42,26,0.35)` (carob-dark at 35% opacity, which reads as a warm darkening, not a colour shift).

- **Tile 2 gradient uses hardcoded `#6589a8`**: Line 183: `background: linear-gradient(180deg, #6589a8 0%, #7B9DBF 100%)`. The `#6589a8` is not in the brand palette. The closest named token is `--mm-story-blue: #5a7fa0` or `--mm-blue-deep: #4A7B9D`. Change: `#6589a8` → `var(--mm-story-blue)` (which is `#5a7fa0` — close enough to be intentional). Full fix: `background: linear-gradient(180deg, var(--mm-story-blue) 0%, var(--mm-blue-top) 100%)`.

- **Tile trust-desktop gradient uses hardcoded `#5a7fa0`**: Line 386: `background: linear-gradient(180deg, #5a7fa0 0%, #7B9DBF 100%)`. `#5a7fa0` matches `--mm-story-blue` exactly. Change to token: `#5a7fa0` → `var(--mm-story-blue)`.

- **Tile powder-desktop gradient uses hardcoded `#8ba1b8`**: Line 413: `background: linear-gradient(180deg, #8ba1b8 0%, var(--grad-bottom) 100%)`. `#8ba1b8` is not in the palette. Closest: `--mm-sky: #87ADCF`. Change: `#8ba1b8` → `var(--mm-sky)`.

- **`powder_roasted.jpg` in powder-desktop tile has a photographic background**: Line 544 uses `assets/products/powder_roasted.jpg` (a JPG with environmental background) with `object-fit: contain`. Like moon_peppermint.jpg in Tile 2, the photo background will show as a rectangle inside the blue tile. No clean PNG equivalent exists for powder_roasted in `products_clean/`. Flag for designer: either source a clean cut-out or change to an image that suits full-bleed (`object-fit: cover` with the JPG, removing the contain).

- **Desktop `header-desktop` has no background on grid layout**: At desktop, the `header-desktop` is `position: fixed; top: 0` with transparent background (no explicit bg set in V11 desktop styles, lines 280–296). The grid tiles extend behind it. Tile 1 (bar hero, blue gradient) fills full height including under the header. White nav links over a light blue gradient may become illegible depending on gradient strength. The `--mm-cream` coloured nav links at `opacity: 0.9` over `#7B9DBF` (blue-top) should have reasonable contrast, but it is not guaranteed. Add `background: linear-gradient(to bottom, rgba(30,67,102,0.3) 0%, transparent 100%)` to `.header-desktop` for safety.

- **`.carob-watermark-wrap` uses `position: absolute`** (from brand_kit.css line 88), but in V11 `.grid-hero` is `position: relative` and spans 100dvh. The watermark wraps to the grid, not the viewport. This means the watermark centring is correct, but there is no `z-index` set on `.carob-watermark-wrap` above the tile content — brand_kit.css sets `z-index: 1`, which may put it above tile content within the grid stacking context. Visual result: the watermark could render over tile product images. Low risk at `opacity: 0.04` but technically incorrect layering. Change: add `z-index: 0` override in V11 local styles for `.carob-watermark-wrap`.

### P3 — Polish

- **`tile-bar .tile-product` at `45% / max 200px` on mobile**: A single bar PNG at 200px max-width in the largest tile (spanning both columns) will appear small on a tablet or large phone. The tile is `1.4fr` of `100dvh` — roughly 560px tall on a standard 812px phone. A 200px max-width bar feels undersized in a 390px-wide tile. Consider `max-width: 240px` or removing the max-width constraint on mobile.

- **`tile-cta` contains only text + arrow with no visual weight**: The CTA tile (navy background, "Shop Now" text + chevron) is visually sparse. A ghost border or thin cream divider strip above the text would give it more premium feel without adding complexity.

- **Tile fade-in animation (`scale(0.97) → scale(1)`) is jarring at `0.05s` stagger**: The 0.05s stagger between tiles means all 6 tiles animate almost simultaneously. The cascade effect is barely perceptible. Increase to `0.1s` stagger minimum to make the grid "build" feel intentional.

- **`mobile-menu` links include "Bananas" and "Bites" which are not shown as tiles in the grid**: The grid shows Bars, Moons, Lifestyle/Story, Shop CTA, Byron Bay Origin. The nav includes Bananas, Bites, Elixirs, Packs, Gifts — product categories not represented in the hero grid. This is fine for a live site but creates a slight mismatch between hero messaging and nav priorities. Flag for copy review.

### Keep as-is
- Bento grid concept is strong — asymmetric desktop 4-col layout with spanning bar tile is the right call for product range breadth.
- `object-fit: contain` on clean PNGs in gradient tiles is correct.
- Hover overlay using `--mm-navy-50` on tiles is on-palette and readable.
- CTA tile in navy (`--mm-navy`) is correct palette use, strong contrast.
- Origin tile in cream (`--mm-cream`) on navy text is on-palette, excellent contrast.
- Trust icons in Tile 5 using `filter` to navy-tinted appearance is correct.
- `tile:active { transform: scale(0.98) }` touch feedback is good.
- Focus trap in mobile menu JS is correctly implemented.

---

## V12 — The Unwrap

### P1 — Must Fix (broken/unusable)

- **`rotateY(12deg)` on `.product-item.active.rotated` has no `perspective` on parent**: The state-1 animation rotates the bar to `rotateY(12deg) scale(0.9)` (line 187). For a 3D CSS transform to render with depth, `perspective` must be set on a parent element. The nearest parent is `.product-stage` (no perspective), then `.hero` (no perspective), then `body` (no perspective). The `perspective: 800px` appears on `.hero` at desktop breakpoint (line 355) — but that is `@media (min-width: 768px)` only, and this `.rotated` state only applies on **mobile** (desktop uses `.desktop-products` instead, and `.product-stage` is `display: none` at desktop). So on mobile: `rotateY(12deg)` will render as a flat transform with no depth — the 3D tilt will appear but without foreshortening, looking like a simple skew. Fix: add `perspective: 800px` to `.product-stage` (the direct parent). Change: `.product-stage { perspective: 800px; }` — add to existing rule at line 151.

- **`moon_peppermint.jpg` in mobile carousel slot 1 (state 2) renders inside a full-screen gradient container with `object-fit: contain`**: Line 529 uses `assets/products/moon_peppermint.jpg` — a JPG with photographic background — in a product carousel that is built for clean PNGs against the gradient body background. At state 2 (second tap), the photo's rectangular background box will be visible against the gradient, breaking the clean product-on-gradient aesthetic established by slot 0 (pure carob clean PNG) and slot 2 (elixir clean PNG). Change: `src="assets/products/moon_peppermint.jpg"` → `src="assets/products_clean/eclipse_hazelnut_a.png"` in both the mobile carousel (line 529) and the desktop product row (line 560). Update `alt` text and info panel text (`stateData[1].title`, `stateData[2]` if reordering) to match.

- **Desktop second product also uses `moon_peppermint.jpg`**: Line 560. Same issue as above — photographic background JPG rendered via `img` tag with no background crop, 45vh height, in a `display: flex` layout against the gradient. Change: as above, substitute clean PNG.

- **`infoCta.textContent = data.cta` strips the em dash in "Add to Cart — $12.95"**: Line 689: `infoCta.textContent = data.cta` sets text content. The `stateData` array at line 647 defines the CTA as `'Add to Cart \u2014 $12.95'` (unicode em dash). Using `.textContent` correctly handles this unicode, so the em dash will render. However, note that the brand rules in MEMORY.md state "NEVER use em dashes". The em dash appears in: line 555 `&mdash;` in desktop CTA, line 597 HTML `&mdash;` in info panel, and line 647 `\u2014` in JS data. Change all three: replace em dash with a comma or middle dot. E.g. `"Add to Cart · $12.95"` or `"Add to Cart, $12.95"`.

### P2 — Should Fix (noticeably wrong)

- **`info-panel` gradient `rgba(30,67,102,0.6)` is hardcoded navy partial**: Line 238: `background: linear-gradient(to top, rgba(30,67,102,0.6) 0%, transparent 100%)`. This is `--mm-navy` at 60% opacity. Should use the token. Change: `rgba(30,67,102,0.6)` → `var(--mm-navy-50)` (0.5 opacity, slightly lighter — or define `--mm-navy-60` in brand_kit.css). Acceptable as-is if `--mm-navy-60` is not yet tokenised, but prefer `rgba(30,67,102,0.6)` → `rgba(var(--mm-navy), 0.6)` — however CSS doesn't allow this pattern. Best fix: add `--mm-navy-60: rgba(30,67,102,0.6)` to brand_kit.css and reference it here.

- **`tap-prompt` arrow is a Unicode down-arrow (↓ via `&#8595;`) not an SVG**: Line 538 uses `&#8595;` — a raw Unicode arrow character. This renders differently across fonts/OSes and is not styled as an icon. It can look pixelated or misaligned on some devices. Replace with an inline SVG chevron matching the style used in V11's tile-cta arrow (line 515).

- **`desktop-product:nth-child(2)` and `nth-child(3)` use `translateZ` without perspective on parent**: Lines 378–379. `translateZ(-20px)` and `translateZ(-40px)` are applied on `.desktop-product` children. The perspective is set on `.desktop-products` (line 365, `perspective: 800px`) — this IS the correct parent. But `.hero` also has `perspective: 800px` at line 355 — two nested perspective contexts cancel or interfere with each other. Only one should have perspective set. Remove `perspective: 800px` from `.hero` (line 355), keep it on `.desktop-products` (line 365) only.

- **`.desktop-elixir-card` border uses a hardcoded `rgba(231,228,202,0.12)`**: Line 445. `rgba(231,228,202,0.12)` = cream at 12% — this is `--mm-cream-08` (8%) and `--mm-cream-15` (15%) are both tokenised. Change: `border: 1px solid rgba(231,228,202,0.12)` → `border: 1px solid var(--mm-cream-15)`.

- **`elixir-placeholder` gradient uses `rgba(231,228,202,0.12)` hardcoded**: Line 194. Same token issue. Change: `rgba(231,228,202,0.12)` → `var(--mm-cream-15)`, and `rgba(231,228,202,0.04)` → `var(--mm-cream-08)` (closest available token at 8%, not 4% — or keep literal if precision matters).

- **`product-stage` has fixed `height: 360px`**: On iPhone SE (320px width, 568px height) and minus the hamburger area and tap-prompt, this may leave very little breathing room. At 360px stage + 24px margin-top on tap-prompt + ~50px tap-prompt height = ~434px of vertical content in a `~500px` visible area (after header). Tight. The `@media (max-width: 374px)` override sets `height: 260px` which helps. Confirm on 320px device. Not a hard break but flag.

### P3 — Polish

- **`tap-prompt` persists visually at `opacity: 0` after first tap**: It is hidden with `opacity: 0; pointer-events: none` (lines 655–656) but remains in the DOM taking up its `margin-top: 24px` space below the product stage. After first tap, the info panel slides up from bottom, but the gap where the tap prompt was still pushes the product stage up. Add `position: absolute` to `.tap-prompt` or `height: 0; overflow: hidden` when hidden to reclaim that space.

- **`kenBurns` animation on desktop body is `scale(1) → scale(1.08)` with no pan**: A pure zoom with no translation (no translateX/Y) from dead centre to dead centre will feel static compared to V10's ken burns which pans. Add a subtle `translateX(-1%)` or `translateY(-0.5%)` to the 100% keyframe for more life.

- **CTA button `color: var(--grad-top)` on hover**: Lines 307 and 429. On hover, CTA text turns `var(--grad-top)` = `#7B9DBF`. Against a cream (`--mm-cream`) background this is fine contrast-wise but `--grad-top` is not a semantic token for text. Prefer `var(--mm-navy)` which is the established dark text on cream pairing. Change: `color: var(--grad-top)` → `color: var(--mm-navy)`.

- **`fade-1` class applied to the back-link via brand_kit.css global** but V12 overrides `@keyframes fadeIn` locally at line 124 with different values (`translateY(12px)` vs brand_kit's `translateY(8px)`). The local definition wins in cascade, so all `.fade-*` elements in V12 will use `12px` lift — slightly inconsistent with other heroes. Not harmful, just inconsistent.

### Keep as-is
- Tap-to-cycle mechanic on mobile is novel and appropriate for a product range hero.
- Staggered `hidden-left` / `hidden-right` / `active` position transitions are smooth.
- Info panel slide-up with staggered internal element transitions (0.1s, 0.2s, 0.3s, 0.4s) is polished.
- Trust badges in info panel are correctly sized and filtered.
- Focus trap in mobile menu is correctly implemented.
- Desktop three-product spread with depth layering (`translateZ`) is the right visual concept.
- `elixir_plain.png` (clean PNG) in slot 3 is correct asset choice.

---

## V13 — Full Bleed Photo

### P1 — Must Fix (broken/unusable)

- **Hero background image path may not resolve**: The `<link rel="preload">` at line 22 and the CSS `background-image` at line 64 both reference `assets/mood/hero_lifestyle/pinterest_702913454385918050.png`. Directory listing confirms this file EXISTS: `pinterest_702913454385918050.png` is present in `assets/mood/hero_lifestyle/`. Path is correct. However, note the audit brief mentioned a path `pinterest_702913454385917459.png` — that filename does NOT exist. The actual filename in use is `918050.png` not `917459.png`. The brief's mention of `917459` was incorrect. File at path used in code = confirmed present. No fix needed on path.

- **`hero-overlay` creates opposing gradient to `hero-bg::after`, producing a muddy mid-zone**: `.hero-bg::after` applies `linear-gradient(to top, rgba(30,67,102,0.7) 0%, rgba(30,67,102,0.2) 50%, transparent 100%)` — navy darkening from bottom (lines 67–73). `.hero-overlay` applies `linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.65))` — black darkening from 55% downward (lines 79–82). These two overlays overlap in the lower half of the image: `hero-bg::after` pushes navy up from the bottom; `hero-overlay` pushes black down from 55%. Between 55% and 100% of height, both layers stack: navy 0.7 + black 0.65 combined opacity = effectively near-opaque dark zone that fights the photo. The content (`hero-content`) sits in this zone. Text legibility is actually served (the double-dark makes cream text very readable), but the photo is essentially buried in the lower third. Decision for designer: if photo visibility at bottom is not the priority (content IS the priority), this is acceptable as-is. If the photo should be more visible, remove `hero-overlay` and rely solely on `hero-bg::after`. Flag but do not auto-fix. Designer call. Noting here as P1 because on some photos the effect may look unintentional.

- **`back-link` missing `min-height: 44px` touch target padding**: V13's `.back-link` (lines 85–91) has no `min-height` or `padding` defined, unlike V10 where it has `min-height: 44px; padding: 12px 0`. On mobile, the back link is a small text element at `0.8rem` font-size. Change: add `min-height: 44px; padding: 12px 0; display: inline-flex; align-items: center;` to `.back-link`.

### P2 — Should Fix (noticeably wrong)

- **`.hero-content` padding-bottom `100px` on mobile**: Line 162: `padding: 0 24px 100px`. This bottom padding pushes content up from the bottom edge. On iPhone SE (568px) with viewport, content block = title + tagline + CTA + trust-row. The 100px bottom padding plus the content height (roughly: h1 at 1.8rem ~43px + tagline at 0.9rem ~22px + margins ~34px + CTA 48px + trust-row 20px + margin 20px = ~187px total content) means content block starts at ~568 - 100 - 187 = ~281px from top. This places it slightly above the visual midpoint — fine. But the 100px bottom padding on mobile may be intended to clear a bottom browser chrome area. If so, `padding-bottom: max(100px, env(safe-area-inset-bottom) + 60px)` would be more robust. Current: acceptable. Should fix for production.

- **`hero-title` uses `font-family: var(--mm-serif)` and renders "MAPLE MOON" in uppercase**: This is the only hero (V10–V13) that uses the wordmark as a typeset `<h1>` instead of the `carob_wordmark.svg`. At desktop `3rem–3.4rem`, this works as an editorial title. However, the other heroes all use the SVG wordmark. V13 intentionally breaks the pattern — this is a design decision. Flag only: if brand consistency requires the SVG wordmark, substitute `<img src="assets/carob_wordmark.svg">` for the `<h1>`. Keep as-is per design intent, but mark for brand alignment review.

- **`hero-bg` applies `filter: saturate(1.1) contrast(1.05)` globally on desktop with `background-attachment: fixed`**: Line 65–66 applies filter. Line 74–76 adds `background-attachment: fixed` on desktop. `background-attachment: fixed` + CSS `filter` together create a new stacking context and painting layer per browser — this combination is known to cause `background-attachment: fixed` to stop working in Chrome (the background scrolls with the page instead of being fixed). Since this is a single-page hero with `overflow: hidden`, there is no scrolling, so the bug is dormant but may manifest if the page is extended. Remove `filter` from `.hero-bg` and instead apply `filter` to a pseudo-element or child element. Change: move `filter: saturate(1.1) contrast(1.05)` off `.hero-bg` and onto `.hero-bg::before` (add a new pseudo-element for the filter only).

- **Two hardcoded `rgba(30,67,102,...)` values in `hero-bg::after` and `hero-overlay` should use palette tokens**: Both reference `rgba(30,67,102,...)` — the navy colour. `--mm-navy` is `#1E4366` = `rgb(30,67,102)`. Change: `rgba(30,67,102,0.7)` → use named token pattern. Since CSS doesn't support `rgba(var(--mm-navy), 0.7)`, define `--mm-navy-70: rgba(30,67,102,0.7)` in `brand_kit.css` and apply it here, consistent with existing token pattern (`--mm-navy-10`, `--mm-navy-15`, `--mm-navy-50`).

- **`hero-overlay` uses `rgba(0,0,0,0.65)` pure black**: Line 81. Pure black is not in the palette. The brand's darkening token is `--mm-black-35` (0.35). A 0.65 pure black overlay is very heavy and warmer alternatives should be explored. If the intent is to darken for text readability, consider `--mm-navy-50` (0.5) stacked, which maintains brand hue. Current value creates a cold, colourless zone inconsistent with the warm artisan brand feel.

- **`trust-row img` filter `brightness(0) invert(0.92) sepia(0.1) saturate(0.3)` is inconsistent with V10/V11**: V10 uses a more saturated cream filter (`invert(91%) sepia(8%) saturate(580%) hue-rotate(18deg) brightness(100%) contrast(88%)`). V13 uses a desaturated near-white. The cream icons in V13 will appear slightly cooler/whiter than the brand cream. Standardise all trust-icon filters to the brand_kit.css pattern or define a single `--icon-filter-cream` CSS variable.

### P3 — Polish

- **`hero-bg` preload in `<head>` is for a `.png` file but the background is loaded via CSS `background-image` URL, not an `<img>` tag**: The `<link rel="preload" as="image">` at line 22–23 correctly preloads the CSS background image. This is valid. However, the `href` in the preload and the `url()` in the CSS must match exactly (they do: both `assets/mood/hero_lifestyle/pinterest_702913454385918050.png`). Keep as-is.

- **`kenBurns` on desktop (`scale(1) → scale(1.08)`) has no pan, same as V12**: Add subtle translate to the keyframe for more cinematic movement. Same note as V12.

- **`hero-content` text-align is `center` on mobile, `left` on desktop**: The left-aligned editorial desktop layout is strong. The mobile centered layout is also appropriate. Coherent responsive intent. Keep as-is.

- **No `carob_watermark` CAROB wordmark in V13**: V13 includes the watermark (`wm-subtle` at line 297) but as `position: absolute` within a `position: fixed` parent chain. The `.carob-watermark-wrap` in brand_kit.css is `position: absolute; bottom: 0` — but its parent (body) is the containing block for `position: absolute` only if no `position: fixed` ancestors intercept. Since `hero-bg` and `hero-content` are both `position: fixed`, the body is the containing block for the absolute watermark. This should render correctly at the bottom of the viewport. Confirm visually — may appear behind `hero-overlay` at `z-index: 1`, same level as watermark's `z-index: 1`. Result: likely rendered correctly but may occasionally be clipped by overlay. Low risk at `opacity: 0.04`.

- **`bar_bundle.jpg` is not used in V13** — confirmed. V13 uses no in-page product image. The full-bleed photo concept intentionally leads with lifestyle rather than product. `bar_bundle.jpg` is confirmed intentionally absent (per audit brief — do not suggest changes).

### Keep as-is
- Full-bleed photo hero concept is the strongest lifestyle-forward option of the four.
- Desktop `text-align: left` bottom-left editorial positioning is correct for the concept.
- CTA hover: cream background + navy text is on-palette and clean.
- Trust row icon sizing (20px) and placement beneath CTA is appropriate.
- Ken Burns animation correctly gated behind `prefers-reduced-motion: no-preference`.
- `back-link` is visible on both mobile and desktop (not hidden via `display: none` — correct for this concept unlike V10).
- Mobile menu implementation consistent with V11/V12.
- `fetchpriority` not set on background image (loaded via CSS, not `<img>`) — correct, preload handles this.
- `.hero-title` serif type at headline scale is the correct `--mm-serif` usage.

---

## Cross-cutting issues (all four heroes)

### P2
- **Em dash appears in V12 CTA copy**: "Add to Cart — $12.95" (lines 555, 597, 647). Per brand rules: never use em dashes. Fix in all three locations in V12 (HTML × 2 + JS string × 1).

### P3
- **`brand_kit.css` defines `.fade-1` through `.fade-4` globally, but V10, V12, V13 each redefine `@keyframes fadeIn` locally with different `translateY` values (V10: 8px, V12/V13: 12px)**. The local definitions shadow the global. All heroes should either use the brand_kit.css global `@keyframes fadeIn` (8px) or each file should explicitly override intentionally. Standardise to 8px globally, use different animation names if intentional deviation is needed.
- **No `lang` attribute on `<html>` in any hero beyond "en-AU"**: `lang="en-AU"` is set — correct.
- **OG image for all four heroes points to `bar_pure_carob.png`**: V11, V12, V13 are distinct hero concepts with different visual anchors. Using the same OG image across all is fine for prototypes but should be concept-specific for production.
