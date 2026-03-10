# Visual Audit — V1–V4
Generated: 2026-03-10

---

## V1 — Brand Statement (Product + Left Category Stack)

**Concept:** Full-bleed gradient, single bar product centred, desktop vertical category nav left, mobile scroll strip bottom.

### P1 — Must Fix (broken/unusable)

- **Float animation missing entrance transform sync**: The float keyframe (line 281–283) starts at `translateX(-50%) translateY(0)` and the product `.product-img` is positioned with `transform: translateX(-50%)` on desktop. However the `productEntrance` animation (`.fade-product`) also drives `transform: scale(0.95→1)` — these two animations conflict. The entrance animation fires first (0.3s delay, 0.6s duration) and sets `transform: scale(1)`. Then `float` takes over at 0.9s and resets the transform, causing a visible snap from `scale(1)` to `translateX(-50%) translateY(0)`. Fix: Remove `.fade-product` class from the desktop product image rendering (or set `animation-fill-mode` carefully) and trigger float only after entrance completes. Minimally: add `animation-delay: 0.9s` to the float rule (`will-change: transform` already present) so the float begins after entrance settles. CSS change: in `@media (min-width: 768px)` block, `.product-img { animation: float 3s ease-in-out infinite 0.9s; }`.

- **body font-family set to `--mm-serif` globally** (line 38: `font-family: var(--mm-serif);`): Brand rules specify serif for headlines only; sans is the body/UI font. Setting serif as the body default means any element without an explicit font override inherits the display face. In V1 this affects the mobile-menu `.menu-nav a` (which correctly overrides to `--mm-sans`) but is one missed rule away from breaking. V2, V3, V4 all correctly use `--mm-sans` on body. Fix: line 38 change `font-family: var(--mm-serif)` → `font-family: var(--mm-sans)`.

### P2 — Should Fix (noticeably wrong)

- **Desktop category links use `--mm-serif` at `1.5rem` with `line-height: 2.0`** (lines 259–262): At 1024px+ these step up to `2rem` (line 289). Seven categories at `2rem` with `line-height: 2.0` = ~224px of type stacked at viewport mid-left. On a 900px-tall screen this will overflow or crowd; there is no max-height or overflow guard on `.category-stack-desktop`. Suggest reducing `line-height` to `1.6` and capping the stack with `max-height: 70vh; overflow: hidden`.

- **`back-link` hidden on mobile** (line 95: `display: none`), only shown at `≥768px`. On mobile there is no way back to the gallery except the browser button. The hamburger menu does not include a back-to-gallery link. Not broken because hamburger exists, but it's a navigation gap for the mock gallery context. Suggest adding a back link to the mobile-menu overlay, or showing the back link with a higher z-index on mobile above the hamburger.

- **`strip-progress` bar positioned at `bottom: 0` with `z-index: 51`** (line 218–222): This sits above the category strip (`z-index: 50`). The strip itself has `padding: 18px 0 28px`. On devices with a home indicator (iPhone) the 28px bottom padding is likely insufficient — the progress bar will be clipped under the home indicator or obscured by the strip mask. Not critical to V1 concept evaluation but will affect real device rendering.

### P3 — Polish (nice to have)

- **Logo `<span>maple moon</span>` below the SVG** (line 163–167): Text is serif at 0.75rem/0.8rem, uppercase, cream. The SVG is already the wordmark. Doubling up with a text label below is redundant and clutters the top-right corner. Consider removing the text span or replacing with a fine tagline ("Byron Bay · Organic").

- **Category strip mask fades to transparent at 85%** (line 191): Right edge fade starts too early — on wider phones (414px+) the last category "Gifts" may be partially faded even at rest. Change `black 85%` → `black 92%`.

- **`body::before` radial gradient** (line 47–53): `rgba(139,180,212,0.4)` at 30% 20% adds a blue-on-blue highlight. It is subtle but shifts the gradient slightly cooler. Not off-brand but could be removed for a cleaner warm-gradient read.

### Keep as-is

- Gradient background using `--mm-blue-top` / `--mm-blue-bottom` exactly matches palette.
- `bar_pure_carob.png` from `products_clean/` with `object-fit: contain` implied (natural PNG sizing). Correct asset source.
- `drop-shadow` triple-layer on product image reads well on the blue gradient — product has presence without feeling flat.
- `carob_wordmark.svg` watermark at `opacity: 0.08` is appropriately subtle — does not compete with product.
- Mobile category strip with fade mask and scroll snap is well-executed.
- Entrance animation sequence (fade-1 through fade-5) timing is appropriate — nothing feels rushed or sluggish.
- `aria-hidden`, `role="dialog"`, `aria-modal`, focus trap, and escape-key handling are all correct.
- `prefers-reduced-motion` deferred to brand_kit.css — correct approach.
- `back-link` has `href="index.html"` — correct.

---

## V2 — Shop Now (Full Nav Bar + Product + Tagline + CTA)

**Concept:** Desktop horizontal nav header, single bar centred, tagline + CTA below product, bottom category bar.

### P1 — Must Fix (broken/unusable)

- **`.cta-btn:active` uses hardcoded `#d5d2b8`** (line 202): This is not a palette variable. `#d5d2b8` is a desaturated/darker cream that does not exist in brand_kit.css. The closest brand value is `--mm-cream: #E7E4CA`. The off-brand hex is ~12 lightness points darker and noticeably warmer-grey. Fix: line 202 change `background: #d5d2b8` → `background: var(--mm-cream)` (and adjust opacity via a filter or use `--mm-cream-80` if a pressed-state dimming is desired).

- **Desktop category bar has no background or backdrop** (lines 308–325): `.category-bar-desktop` is `position: fixed; bottom: 0` over the gradient body. On screens where the product image is positioned with `height: 55vh; max-height: 500px` and the hero is flex-centered, the bottom of the product can descend into the category bar zone. There is no bottom padding on `.hero` to compensate. The product image bottom edge may visually collide with or partially overlap the category text. Fix: Add `padding-bottom: 80px` to `.hero` in the `≥768px` breakpoint so the product clears the category bar.

### P2 — Should Fix (noticeably wrong)

- **Desktop nav logo is `margin-left: auto`** (line 285): This pushes the logo to the far right, with nav links flex-centered in the remaining space. The result is an asymmetric layout — nav links visually drift left because the logo occupies the right anchor point but there is no matching left anchor. A brand name or left-side element should balance the right logo, or the logo should be centered with nav flanking both sides. Suggest either: (a) centering the logo with equal-weight nav links on each side (`justify-content: space-between` on the header with logo centered via absolute positioning), or (b) placing a left-anchored "MapleMoon" wordmark text and logo right.

- **`product-img` on desktop has `height: 55vh; max-height: 500px; max-width: none`** (line 292): On 4K/wide screens with no `max-width` the PNG could render extremely wide if the original aspect ratio is wide. `bar_pure_carob.png` is 400×600 (portrait) so this is low-risk, but `max-width: none` is sloppy and breaks the pattern of the other versions. Add `max-width: 300px` for safety.

- **Mobile header (`header-mobile`) only shows logo icon at 40px** (line 152): No hamburger coordination — the hamburger is in a separate `<label>` positioned top-left, while the logo is top-right. This mirrors V1's pattern and is acceptable but the two fixed elements (hamburger left, logo right) create a crowded top bar with no clear visual separation. Minor but noticeable on mobile.

### P3 — Polish (nice to have)

- **`ctaPulse` animation fires once at `1.5s` delay** (line 195): A single pulse ring is barely perceptible — it would only be seen by users whose eyes happen to be on the CTA at exactly 2.1s after load. Either increase to 2 cycles (`2`) or consider making it a hover-only effect.

- **Desktop category bar dot separators are `5px` circles at `margin: 0 20px`** (line 321–325): Adequate but the `opacity: 0.4` on dots makes the strip look fragmented. Increasing dot opacity to `0.6` would improve rhythm.

- **Tagline font `--mm-sans` at weight 300** (line 178): Correct font choice, but 300 weight on the blue gradient at `0.85rem` mobile is slightly thin. Consider weight 400 for mobile readability.

### Keep as-is

- Body uses `--mm-sans` correctly (not serif like V1).
- `bar_pure_carob.png` from `products_clean/` — correct asset.
- Desktop full-width horizontal nav is appropriate for a Shop-focused concept.
- `back-link` present with `href="index.html"` — correct.
- `product-img:hover { transform: scale(1.03) }` is a nice interaction that reinforces product focus.
- CTA uses `var(--mm-cream)` border and text — on-brand.
- Category strip mobile pattern identical to V1 — consistent.
- `strip-progress` scroll indicator wired correctly via JS.
- Mobile menu overlay is cream on navy — correct brand reversal.

---

## V3 — What is Carob? (Split Layout: Product Left / Story Panel Right)

**Concept:** Desktop 55/45 split — product on left with lifestyle photo texture, story text + badges + CTA on right panel. Mobile: stacked product, headline, body copy, badges, CTA.

### P1 — Must Fix (broken/unusable)

- **`.cta-btn:active` uses hardcoded `#d5d2b8`** (line 247): Same issue as V2. Fix identically: `background: #d5d2b8` → `background: var(--mm-cream)`.

- **`story-panel` background uses `var(--mm-cream-08)`** (line 393: `background: var(--mm-cream-08)`): `--mm-cream-08` = `rgba(231,228,202,0.08)`. At 8% opacity on the blue gradient background, the panel has almost no visible fill — it renders as near-transparent. The right panel's content (headline, body text, badges, CTA) floats without a readable container — the "card" effect is lost entirely. The cream-on-blue gradient reads fine for text but the panel boundary is invisible, making the layout look like a loose text column rather than a content block. Fix: Change to `var(--mm-cream-15)` at minimum, or `rgba(231,228,202,0.12)` with a `1px solid var(--mm-cream-10)` border to define the panel shape without going opaque.

- **`lifestyle-bg` on desktop is `stock_kitchen_morning.jpg` at `opacity: 0.15`** (line 366): The brief flags this — does `stock_kitchen_morning.jpg` match a "carob story" mood? The available files in `assets/stock/` include: `stock_spices_warm.jpg`, `stock_ingredient_pods.jpg`, `stock_flatlay_dark.jpg`. A morning kitchen photo has generic domestic associations; carob pods or spices are significantly more on-brand for the "What is Carob?" concept. At 0.15 opacity the photo is barely visible regardless, but the concept brief calls for this left panel to anchor the carob story. Recommendation: Change to `stock_ingredient_pods.jpg` or `stock_spices_warm.jpg`. Line 366 change: `url('assets/stock/stock_kitchen_morning.jpg')` → `url('assets/stock/stock_ingredient_pods.jpg')`.

### P2 — Should Fix (noticeably wrong)

- **Mobile hero `padding: 70px 24px 90px`** (line 167): Top padding 70px accounts for the fixed mobile header. Bottom padding 90px accounts for the fixed category strip. However `gap: 16px` between elements combined with product (55% / max 240px), headline (1.6rem), body text (2 lines), 5 trust badges (24px each), and a CTA button (48px min-height) adds up to approximately 450–500px of content on a 390px-wide screen that is `100dvh` tall (~844px on iPhone 14). The stack likely fits but is tight — the product image will be approximately 220px tall and the whole block starts around 70px from top, meaning the CTA lands near the category strip. On a smaller device (667px viewport height, iPhone SE) this will overflow visibly. Suggest reducing product size on mobile to `max-width: 200px` and/or adding `overflow-y: auto` as a safety valve.

- **Desktop `split-left` product image has no float or depth animation** while V1 has the float. The split concept is the most editorial of the four; the product being completely static on the left reduces visual energy. This is a design suggestion not a bug, but the absence is notable given V1's float is on-brand. Consider adding a gentle 4px float to `.product-img-desktop` matching V1's keyframe.

- **Trust badge `filter: brightness(0) invert(0.93) sepia(0.1)`** (line 226): This filter forces all badge icons to a near-white/cream tone. The result depends entirely on the SVG icon colours. `icon_made_in_aus.svg` may have complex colours (flag elements) that look wrong when reduced to monochrome. The opacity at 0.6 (mobile) / 0.7 (desktop) also dims them significantly against the blue gradient. Suggest testing each badge at these filter values and either removing the filter (let SVGs render their own palette) or verifying all five icons are designed to be single-colour before applying.

### P3 — Polish (nice to have)

- **Desktop `story-panel` padding is `48px` (56px at 1024px+)**: On narrower 768–900px viewports the right column is `flex: 0 0 45%` = ~360–400px wide, and the panel with 48px padding on each side leaves only ~260–300px of text width. The headline "Not Chocolate. Its Own Thing." at 2.4rem may line-wrap awkwardly. Suggest reducing padding to `36px` for the 768–1023px range.

- **Mobile body text `max-width: 300px`** (line 193): On wider phones (414px) this cap means body text occupies ~73% of available width. Increasing to `340px` would use more of the screen without feeling wide.

- **Headline copy "Not Chocolate. Its Own Thing."** — missing apostrophe in "Its" (should be "It's"). This is a content issue but affects brand professionalism. Line 510 (mobile) and line 533 (desktop): `Its Own Thing.` → `It's Own Thing.`

### Keep as-is

- `products_clean/bar_pure_carob.png` used throughout — correct.
- Split layout concept (55/45) is structurally sound — flex sizing, z-indexing, and positioning all work correctly.
- Watermark positioned inside `.hero-split` at `position: absolute` — correctly contained without overflowing.
- Mobile and desktop layouts are independent blocks with clean show/hide — no bleed-through.
- `object-fit: contain` not needed on product PNG used at natural sizing — correct behaviour.
- `back-link` present with `href="index.html"` — correct.
- Trust badges have `tabindex="0"`, `role="img"`, `data-tooltip`, and `title` — solid accessibility.
- `aria-label="About Carob"` on story panel — correct landmark.
- Desktop nav header matches V2 exactly — consistent across versions.

---

## V4 — The Range (Multi-Product Carousel + 3-Column Desktop)

**Concept:** Mobile scrollable product cards, desktop 3-column range layout (Bars / Moons / Elixirs), category bar bottom.

### P1 — Must Fix (broken/unusable)

- **`moon_peppermint.jpg` loaded from `assets/products/`** (lines 537 mobile, 578 desktop): `assets/products/moon_peppermint.jpg` exists in the non-clean products directory — it is a JPG, not a transparent-bg PNG. When rendered in `.card-image` or `.col-image` (both have `object-fit: contain`), a JPG product photo will show its background colour (likely white or studio grey) as a rectangle inside the blue gradient hero. This breaks the concept visually — the other two products (bar and elixir) are clean PNGs with transparent backgrounds. The result is a white-boxed card alongside floating transparent images — inconsistent and broken in appearance. No clean PNG exists for moons in `assets/products_clean/`. Options in priority order:
  1. Use `eclipse_hazelnut_a.png` from `products_clean/` as a moon-family surrogate (eclipse is the moon product line).
  2. Use `eclipse_pecan.png` from `products_clean/`.
  3. Fall back to a cream dotted placeholder (`card-placeholder` / `col-placeholder` already exist in the HTML for this case).
  Fix on lines 537 and 578: `src="assets/products/moon_peppermint.jpg"` → `src="assets/products_clean/eclipse_hazelnut_a.png"` and update `alt` to "Maple Moon Eclipse Hazelnut".

- **`.cta-btn:active` uses hardcoded `#d5d2b8`** (line 256): Same issue as V2 and V3. Fix: `background: #d5d2b8` → `background: var(--mm-cream)`.

- **`.cat-dot` separators in category strip have no `aria-hidden="true"`** (lines 601–619): All other versions correctly mark dot separators with `aria-hidden="true"`. V4's category strip and desktop category bar use `.cat-dot` spans without the attribute, meaning screen readers will attempt to read them as content. Lines 601, 603, 605, 607, 609, 611 (strip) and 613, 615, 617, 619 (desktop bar): add `aria-hidden="true"` to each `.cat-dot` span.

### P2 — Should Fix (noticeably wrong)

- **Scroll dot hit targets use `padding: 16px` with `width: 12px; height: 12px`** (lines 227–236): The visual dot is `12px` but `background-clip: content-box` with `padding: 16px` means the actual rendered dot in the content box is only `12px` — the padding creates invisible tap area. This is the intended pattern for large touch targets, which is correct. However the active state uses `transform: scale(1.5)` on the 12px content box — this scales the visual dot to 18px but does not affect the padded tap area. On dense displays this works, but the 12px base dot renders too large visually at rest given the `padding: 16px` also makes each dot hit target `44px` wide. The row of three dots occupies `3 × 44px = 132px` minimum, which may crowd the mobile layout. Suggest reducing base dot to `6px` with `padding: 12px` to achieve the same 30px touch target with smaller visual dots.

- **Desktop `range-columns` has no bottom clearance for category bar**: `.range-columns` uses `align-items: flex-end` (product images baseline aligned) inside `.hero-desktop` which is `display: flex; align-items: center`. On viewports with limited height (768–900px), the column labels and subtitles below the image baseline + the `.cta-desktop { margin-top: 40px }` may descend into the bottom category bar zone. Add `padding-bottom: 80px` to `.hero-desktop` or `margin-bottom: 80px` to `.cta-desktop`.

- **Mobile `hero-mobile` has `padding: 80px 0 100px`** (line 159): Bottom 100px is intended to clear the category strip. But with `gap: 20px` between hero children and the card scroll + dots + CTA: approximately `180px card-image + gap + 44px dots + 20px + 48px CTA = ~312px` of content, starting at 80px from top. On a 667px-height device this totals ~392px used from top 80px, leaving ~275px below — sufficient. However on iPhone SE (568px viewport) the CTA may be clipped under the category strip. Test and reduce padding-top to `60px` if needed on small screens.

- **Card scroll `padding: 0 12.5vw`** (line 172) with `card width: 75vw`: The first and last cards will have `12.5vw` of visual lead-in/lead-out. On a 390px phone this is ~48.75px of padding, leaving `390 - 97.5 = 292.5px` visible. A 75vw card is `292.5px` wide. This means the first card exactly fills the visible area with no peek of the second card — the user has no affordance that more cards exist. Suggest increasing padding to `20vw` or reducing card width to `70vw` so ~10vw of the next card peeks into view.

### P3 — Polish (nice to have)

- **`elixir_plain.png` has a `width="400" height="600"` attribute** (lines 546, 586) matching the bar PNG ratio (portrait). The elixir is a bottle/cylindrical form. If the actual PNG is narrower/taller than 400×600 the `width`/`height` attributes may cause the browser to reserve incorrect space before load, causing layout shift. Verify actual elixir PNG dimensions and correct the `width`/`height` attributes to match.

- **Desktop column hover `translateY(-8px)`** (line 394): All three columns lift 8px simultaneously if hovered, but the intent is per-column hover. CSS handles this correctly with `.range-col:hover` — no bug. However hovering one column while another is already hovered causes both to lift independently. On a three-column layout this is distracting. Consider a subtle opacity dim on non-hovered siblings via `.range-columns:hover .range-col:not(:hover) { opacity: 0.7 }` to draw focus.

- **No `back-link` conflict with hamburger on mobile** (back-link is `display: none` on mobile, hamburger top-left): Consistent with all other versions — fine.

- **`card-subtitle` at `opacity: 0.5`** (line 218) on blue gradient: The pricing info ("from $12.95") is the most commercially important element on this concept and it renders at half opacity. Consider increasing to `0.7`.

### Keep as-is

- `products_clean/bar_pure_carob.png` and `products_clean/elixir_plain.png` correctly sourced with `object-fit: contain`.
- Desktop 3-column layout with `align-items: flex-end` correctly baselines products of different heights.
- `IntersectionObserver` staggered card entrance with `threshold: 0.3` is well-implemented; IO fallback (`!('IntersectionObserver' in window)`) present.
- Scroll dot JS correctly uses `Math.round(scrollLeft / cardWidth)` and clamps with `Math.min/Math.max` — no edge-case bugs.
- `scrollbar-width: none` + `-webkit-scrollbar: none` on `.card-scroll` — correct cross-browser hide.
- `back-link` present with `href="index.html"` — correct.
- `hero-desktop` and `hero-mobile` are cleanly separated show/hide blocks — no DOM duplication issues.
- Desktop category bar uses `.cat-dot` class (not `.dot`) — no class conflict with scroll-dots `.dot` active state.
- Mobile card `opacity: 0; transform: translateY(12px)` initial state with JS-triggered `.card-visible` is the right pattern (IO controls the trigger, not CSS animation alone).
