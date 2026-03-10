# Visual Audit — V6–V9
Generated: 2026-03-10

Auditor notes: All 4 hero files read in full alongside brand_kit.css and the live assets directory listing. Audit covers all 10 dimensions as specified. The `assets/products/` directory confirmed present with JPG variants; `assets/products_clean/` contains the clean PNGs.

---

## V6 — Before & After (Split Divider)

### P1 — Must Fix (broken/unusable)

- **Back link hidden on mobile — no back-nav exists**: `.back-link` has `display: none` at mobile, revealed only at `min-width: 768px`. The hamburger also occupies top-left. On mobile there is no back route — the hamburger is the only top-left element and it leads to the mobile menu, not `index.html`. Fix: add a small "← Gallery" text link inside the `.header-mobile` bar (flex row, `justify-content: space-between`), or show the back link alongside the hamburger by reserving `left: 56px` at mobile. Minimum: `@media (max-width: 767px) { .back-link { display: block; left: 56px; padding: 12px 8px; } }`

- **CTA button collides with category strip on mobile**: `.cta-container` is `position: fixed; bottom: 80px` and `.category-strip` starts at `bottom: 0; padding: 18px 0 28px` — total strip height is approx 60px. At `bottom: 80px` the CTA's lower edge sits at `80px - ~44px = 36px`, which overlaps the strip's top. The CTA needs `bottom: 100px` minimum, or the strip needs `padding-top: 0` trimming. Exact fix: `.cta-container { bottom: 112px; }` on mobile.

- **`split-right-product` has no `object-fit` declaration — portrait PNG risks distortion**: `.split-right-product` uses `width: 55%; max-width: 220px; height: auto` on mobile which is fine, but on desktop it switches to `height: 45vh; max-height: 440px; max-width: none` with no `object-fit: contain`. The `<img>` is a 400×600 portrait PNG rendered by height alone — this is fine as long as width is auto. However the tag itself has no `object-fit` set. Because it is not inside a fixed-width container this probably renders correctly, but to be safe and explicit: add `object-fit: contain; object-position: center;` to `.split-right-product`.

### P2 — Should Fix (noticeably wrong)

- **Warm overlay on left panel at `rgba(139,100,60,0.55)` is too dark — text contrast marginal**: The inline style in `.split-left-overlay` uses `linear-gradient(180deg, rgba(139,100,60,0.55) 0%, rgba(100,70,30,0.65) 100%)`. The bottom alpha of `0.65` over the `stock_hero_lifestyle.jpg` darkens the panel heavily. The h1 "From Pod to Pour" (cream on dark warm) has `text-shadow: 0 2px 12px var(--mm-black-35)` which helps, but the top portion of the panel reads muddy brown rather than warm. Reduce top alpha: `rgba(139,100,60,0.40)` at 0% and `rgba(100,70,30,0.55)` at 100%. This keeps the warm earthy read without crushing the photo.

- **Divider handle `::before`/`::after` tick marks positioned by `left: 12px` / `right: 12px` — they point to the edge of the circle, not the centre**: The handle is `width: 40px`. Ticks at `left: 12px` and `right: 12px` place them 12px from each edge — but the handle has `display: flex; align-items: center; justify-content: center` which doesn't affect absolute children. The ticks land at px positions, not centred on either side of the midpoint. The visual result is two lines that both float toward centre and feel like a double-line, not left-right arrows. Change to: `.split-divider-handle::before { left: 8px; }` and `.split-divider-handle::after { right: 8px; }` — or switch to a proper chevron SVG icon inside the handle for clarity.

- **Handle is small (40px) and semi-transparent for a primary interactive element**: `background: rgba(30,67,102,0.3)` on a blue gradient background means the handle blends in. At 50% split position the handle sits on the transition edge and can be hard to spot. Increase to `rgba(30,67,102,0.7)` or add a `box-shadow: 0 0 0 3px rgba(231,228,202,0.4)` halo. The handle is the entire mechanism for this concept — it must be impossible to miss.

- **Desktop category bar has no background — floats unreadably over the split image**: `.category-bar-desktop` on desktop has no backdrop. On the right (blue gradient) it reads fine. On the left (dark warm photo overlay) the cream text is legible but only just, and if the divider is dragged so the bar spans both panels, the text crosses the photo edge with zero separation. Add `background: linear-gradient(to top, rgba(30,67,102,0.35) 0%, transparent 100%)` scrim behind the bar, or add it to `.split-left` and `.split-right` bottoms. Exact addition: `.category-bar-desktop { background: linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 100%); padding-bottom: 32px; }`.

- **`overflow: hidden` on `html, body` combined with `position: fixed` CTA**: `html, body { overflow: hidden; }` is correct for the full-bleed split, but it means any browser UI (mobile Safari bottom bar, Android nav) may obscure the fixed CTA. `100dvh` is used correctly on `.split-hero`, but `.cta-container` at `bottom: 80px` does not account for safe-area insets. Add `bottom: calc(80px + env(safe-area-inset-bottom))` to `.cta-container` on mobile.

- **Trust badges absent entirely**: No trust icons present in V6. The concept is "craft story" — the Before & After panel would benefit from at least the organic/vegan/made-in-aus badges on the right (After) panel to reinforce the product's credentials alongside the bar image.

### P3 — Polish

- **`split-left-text` on desktop uses `font-size: 2rem` but `split-right-text` is also `2rem` at `position: absolute; bottom: 48px; right: 48px`**: Both labels are the same size, giving equal visual weight to "From Pod to Pour" and "Slow-roasted and hand-tempered in Byron Bay." The left is the h1, the right is a `<p>`. Either differentiate sizes (left: 2rem headline, right: 1.2rem body) or italicise the right to distinguish register.

- **No watermark variant on left panel**: The `carob-watermark-wrap` is inside `<main class="split-hero">` and is `position: absolute` — it will float over the split without being constrained to one side. On desktop the watermark spans both panels, which dilutes the Before/After contrast. Move the watermark into `.split-right` only, to anchor the "After" (product) side.

- **Animation: both `split-left` and `split-right` share `fade-3`**: Staggered animation of left and right panels (e.g., left `fade-3`, right `fade-4`) would reinforce the reveal concept.

### Keep as-is

- Drag script is solid — clamps to 20–80%, keyboard support (arrow keys, Home/End), touch support all correct.
- ARIA `role="slider"` with `aria-valuemin/max/now` on the divider is correct implementation.
- `100dvh` usage throughout is correct for mobile browser UI.
- `stock_hero_lifestyle.jpg` is a strong lifestyle match for the "pod/origin" panel.
- CTA hover state (cream fill, `var(--grad-top)` text) is clean and on-brand.

---

## V7 — Flavour Picker

### P1 — Must Fix (broken/unusable)

- **"Coffee" flavour maps to `bar_almond.png` — wrong product image**: Line 426: `<img src="assets/products_clean/bar_almond.png" ... data-flavour="coffee">`. There is no `bar_coffee.png` in `assets/products_clean/`. The almond bar is standing in for the coffee flavour, which is a visible factual error. Either: (a) use `bar_pure_carob.png` as placeholder with an `aria-label` noting "coming soon", or (b) remove the Coffee pill until the correct asset exists. Do not ship almond imagery labelled as coffee.

- **"Spiced Pepperberry" flavour also maps to `bar_pure_carob.png`**: Line 424: `<img src="assets/products_clean/bar_pure_carob.png" ... data-flavour="spiced">`. The spiced and original bars show identical imagery. Available assets include `bar_cayenne.png` — this is likely the intended spiced variant. Change to: `src="assets/products_clean/bar_cayenne.png"`.

- **`product-stack` height collapses on mobile — layout shift on flavour change**: On mobile `.product-stack` is `width: 55%; max-width: 220px` with no explicit height. All images inside are `position: absolute` except the `.active` one which is `position: relative`. This means the stack height equals the active image height, and if images have different intrinsic heights they will cause layout shift on switch. Since all bars are 400×600 portrait PNGs this may not trigger, but the Eclipses and other formats would break. Add `aspect-ratio: 2/3` to `.product-stack` as a defensive measure: `.product-stack { aspect-ratio: 2/3; }`.

### P2 — Should Fix (noticeably wrong)

- **"Coconut" gradient `#7BBFA3 → #A8D4C4` reads as teal/spa, not carob**: Flagged in brief. `#7BBFA3` is a desaturated teal-green. Against the cream-coloured pill and cream text it reads as spa, wellness, or mint — not carob warmth. The product (Coconut & Goji) is earthy and warm. Suggested replacement gradient that reads "tropical but warm": `gradTop: '#8BAA8F', gradBottom: '#B8CCBB'` — a muted sage-green that reads earthy rather than clinical. Alternatively stay in the warm amber direction: `gradTop: '#A89060', gradBottom: '#C4AB88'`.

- **"Mint" gradient `#7BBF9D → #A8D4B8` is even more off-brand**: This is the coolest, greenest gradient in the set. Peppermint is cool by nature but the carob brand is earthy and warm. Options: (a) lean into cool-blue rather than green — `gradTop: '#7B9DBF', gradBottom: '#A8C4D4'` (uses existing brand blue but shifted cooler); (b) accept green but desaturate heavily: `gradTop: '#8BA090', gradBottom: '#AABBAD'`. The current value reads as fresh produce / green juice, not artisan carob.

- **"Coffee" gradient `#6B7B9D → #8B9DBF` is a cool desaturated blue — wrong register**: Coffee should read warm, dark, and rich. The current gradient is just the brand blue shifted slightly cooler and darker, which communicates nothing coffee-adjacent. Change to: `gradTop: '#4A3828', gradBottom: '#6B5242'` — a deep espresso brown that immediately reads coffee. This assumes the Coffee product stays in.

- **"Spiced" gradient `#8B7B5F → #B8A88D` is correct and on-brand — but `bar_pure_carob.png` is shown**: The gradient is the best of the custom flavour gradients (warm caramel tan). The mismatch between the warm gradient and the pure carob bar image (which doesn't read spiced at all) is jarring. Fix the image (per P1 above) to make this work.

- **CTA text in `.cta-btn` is `var(--grad-top)` on hover**: `color: var(--grad-top)` on hover will shift as flavour changes — for Coconut hover colour will be teal `#7BBFA3`, for Mint it'll be green. This is functional but looks like a bug on non-blue flavours. Either fix the hover colour to always use `var(--mm-navy)`, or accept the dynamic behaviour and note it's intentional.

- **Back link hidden on mobile — same issue as V6**: `.back-link { display: none; }` at mobile. Same fix applies: expose it at `left: 56px` alongside hamburger, or add to mobile header.

- **Duplicate `<link rel="preload">` for `bar_pure_carob.png`**: Lines 21 and 23 both preload `assets/products_clean/bar_pure_carob.png`. Remove the duplicate (line 23 or 21).

### P3 — Polish

- **Pill opacity `0.5` on inactive state is quite faint**: On the blue gradient background, an inactive pill with cream border and cream text at `opacity: 0.5` reads as nearly invisible, especially the border. Bump to `opacity: 0.7` inactive for better affordance — users need to be able to read all flavour options clearly.

- **No trust badges in this concept**: The flavour-centric layout would benefit from the organic/vegan/caffeine-free row below the pills, establishing credentials before the CTA.

- **`font-weight: 300` tagline at `0.9rem` is too light on mobile**: At small sizes, weight 300 on a non-native font (fallback to Inter or Helvetica Neue) will render thin and hard to read. Bump to `font-weight: 400` minimum on mobile, or increase size to `1rem`.

- **Watermark `wm-full` at `opacity: 0.08` on the flavour-shifting gradient**: When gradient shifts to dark (Coffee: `#4A3828` after fix), the cream watermark at 0.08 opacity disappears entirely. Not broken, but worth noting — watermark is effectively invisible on dark flavours.

### Keep as-is

- Crossfade via `opacity: 0` → `opacity: 1` on `.active` is smooth and correct.
- Keyboard navigation on pills (arrow keys, wrapping) is properly implemented.
- `aria-live="polite"` on both the product stack and tagline is correct.
- `role="tablist"` / `role="tab"` / `aria-selected` pattern is correct.
- The "original" gradient (`#7B9DBF → #A8BDD4`) maps correctly to the brand blue — strong default.
- Spiced gradient (`#8B7B5F → #B8A88D`) is the best non-default flavour gradient — warm, earthy, distinctly carob.

---

## V8 — Time of Day

### P1 — Must Fix (broken/unusable)

- **Morning gradient `#D4A574 → #E8C9A0` — cream text `#E7E4CA` is near-invisible**: The morning `gradBottom` (`#E8C9A0`) is essentially the same value as `--mm-cream` (`#E7E4CA`). Light cream text on a light warm cream-tan background fails contrast. WCAG AA requires 4.5:1 for small text, 3:1 for large. Approximate contrast ratio of `#E7E4CA` on `#E8C9A0` is under 1.1:1 — effectively invisible. The tagline, CTA border, and category bar text all become unreadable in morning mode. The script partially corrects this for the icon and greeting text only (`greetingText.style.color = config.iconColor` with navy `#1E4366`), but it does NOT change: (a) the h1 tagline colour, (b) the CTA button colour, (c) the category bar text. Fix: add to the morning config block in JS: `document.querySelector('.tagline').style.color = '#1E4366'; document.querySelector('.cta-btn').style.color = '#1E4366'; document.querySelector('.cta-btn').style.borderColor = '#1E4366';` — or better, define a CSS class `.body.morning .tagline, body.morning .cta-btn { color: var(--mm-navy); border-color: var(--mm-navy); }` applied alongside the body class.

- **`back-link` on morning mode is cream on cream — invisible**: `.back-link { color: var(--mm-cream); }` in morning mode means cream text on cream/tan background. The same morning contrast failure applies here. The script does not touch the back link. Add: `body.morning .back-link { color: var(--mm-navy); }` to the stylesheet.

- **`time-greeting` positions conflict — two declarations fight**: `.time-greeting` is declared first at global scope with `left: auto; right: auto; top: 24px; left: 56px; font-size: 0.75rem;` (lines 191–195), then overridden at desktop `@media (min-width: 768px)` with `top: 90px; left: 48px`. The mobile rule has `left: auto` followed immediately by `left: 56px` — the first `left: auto` is immediately overwritten, making it dead code, but more importantly the mobile greeting at `left: 56px` sits adjacent to the hamburger (at `left: 12px`, `width: 44px`), which places the greeting at 56px — correct for spacing, but `right: auto` from the first declaration is redundant. On mobile the greeting overlaps with the logo on the right side of `.header-mobile` if the greeting text is long (e.g., "Good morning"). Test at 320px width — "Good morning" at 0.75rem beside hamburger may truncate. Add `max-width: calc(100vw - 120px); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;` to the mobile time-greeting rule.

### P2 — Should Fix (noticeably wrong)

- **Night star overlay is distracting and high-opacity**: `body.night::before` uses 16 `radial-gradient` points with opacity `0.8`, `0.9`, `0.7` etc., then the whole `::before` pulses `starPulse` from `opacity: 0.4` to `opacity: 0.9`. At maximum (`0.9`) the stars overlay aggressively on what is already a rich navy gradient. The product bar image sits in the middle — the stars animate over the product. Reduce all individual star alphas by ~40%: cap at `rgba(255,255,255,0.5)` maximum per dot. Reduce `starPulse` range to `opacity: 0.3` → `opacity: 0.6`. This keeps the night feel without the disco-ceiling effect.

- **Evening gradient `#5B7A99 → #3D5A78` — gradient goes darker at the bottom, reversing the natural sky**: All other gradients go lighter at the bottom (light top → lighter bottom, or dark top → slightly less dark bottom). The evening goes `#5B7A99` (medium) → `#3D5A78` (noticeably darker), which reads like a ground-up night transition rather than dusk. Swap to `gradTop: '#3D5A78', gradBottom: '#5B7A99'` so it lightens toward the horizon, which is visually natural for evening.

- **Morning glow circle `.hero::before` at `rgba(212,165,116,0.20)` is barely visible**: The glow is 500×500px centred at 40% top, 50% left with 20% opacity warm orange. On the already-warm morning gradient, this barely registers as an effect — it's drowned out. Either increase to `0.35` opacity or remove it — at 20% it adds render cost with no visual payoff.

- **Product `transform: scale(1.03)` hover on desktop is defined but has no `will-change`**: `.product-img:hover { transform: scale(1.03); }` with `transition: transform 0.4s ease` works correctly, but without `will-change: transform` the browser may not promote to compositor layer. Add `will-change: transform` to `.product-img` (not just on hover — it should be present beforehand). Already defined as `.gpu-animated` class in brand_kit.css but not applied to this element. Add class `gpu-animated` to the `<img>` tag or add `will-change: transform` directly to `.product-img`.

- **Back link hidden on mobile — same V6/V7 issue**: Same fix. `display: none` at mobile, no alternative back-nav on mobile.

- **No trust badges in this concept**: Same as V6/V7 — the layout has room below the tagline and above the CTA for the icon cluster. The "naturally sweet, nothing added" brand promise is supported directly by the organic/vegan/caffeine-free badges.

### P3 — Polish

- **Tagline at `opacity: 0.7` in base CSS**: Every time period overrides the tagline text but not its opacity. Morning mode's already-invisible cream text is then further dimmed to 70%. The `opacity` on `.tagline` should be `0.85` minimum, or removed in favour of lower-contrast colour choices instead.

- **No swipe/scroll affordance for time period selection**: The UX is entirely passive — the user has no way to manually change time of day. Consider adding a simple row of period chips (Morning / Afternoon / Evening / Night) below the tagline for demo purposes, visible only in this prototype context.

- **Clock icon in `.time-greeting` uses a plain `<circle>` and `<polyline>` — no fill/stroke on the circle**: `.time-greeting svg { fill: none; stroke: var(--mm-cream); }` — the circle of the clock face has no fill, making it an outlined circle with clock hands. In morning mode the stroke is changed to navy by JS. This is fine functionally, but the 14×14px icon at `stroke-width: 1.5` is very thin at small sizes. `stroke-width: 2` would be clearer.

### Keep as-is

- Time detection logic (`getTimePeriod`) with clean boundary hours (5–10 morning, 11–16 afternoon, 17–20 evening, night otherwise) is sensible.
- The concept of a living hero that changes with real time is strong for this brand.
- Navy morning icon colour override (`iconColor: '#1E4366'` applied via JS) shows correct thinking — the execution just needs to extend to all cream elements in morning mode (P1 above).
- `body.morning` / `body.night` CSS class pattern for state is clean and maintainable.
- `100dvh` + `overflow: hidden` on `html, body` is correct.
- Stars hidden on mobile (`@media (max-width: 767px) { body.night::before { display: none; } }`) is the right call — star overlays on small screens are noise.

---

## V9 — Story Cards

### P1 — Must Fix (broken/unusable)

- **Card 4 (Shop) references `assets/products/moon_peppermint.jpg` and `assets/products/eclipse_bundle.jpg` — files exist in `assets/products/` but are JPGs, not clean PNGs**: The shop thumbnails on line 499–500 use `assets/products/moon_peppermint.jpg` and `assets/products/eclipse_bundle.jpg`. These files exist in the `assets/products/` directory (confirmed: `moon_peppermint.jpg`, `eclipse_bundle.jpg`). However they are lifestyle/cropped JPGs, not the clean product-on-white PNGs. Against the cream `card-shop` background, JPG product shots with their own backgrounds will look inconsistent vs the clean bar PNG in the same grid. Replace with available clean PNGs: `bar_pure_carob.png` (already used), `eclipse_hazelnut_a.png`, and `eclipse_pecan.png` from `assets/products_clean/`. Update: line 499 → `src="assets/products_clean/eclipse_hazelnut_a.png"`, line 500 → `src="assets/products_clean/eclipse_pecan.png"`.

- **Desktop header nav text is cream on cream on Card 4**: `.header-desktop nav a { color: var(--mm-cream); }` but Card 4 has `background: var(--mm-cream)`. When the user hovers Card 4 on desktop (expanding it to 40vw), the header nav links over that panel become invisible. The header has no background on desktop in V9 (line 327–331 shows `.header-desktop { display: flex; ... padding: 28px 40px; }` with no `background` rule — unlike V6/V7/V8 which have `background: var(--mm-navy-15)`). Fix: add `background: rgba(30,67,102,0.1); backdrop-filter: blur(12px);` to `.header-desktop` in V9's stylesheet, matching the other versions.

- **Card 2 (`card-craft`) uses `var(--mm-story-blue)` as gradient start — this is defined in `brand_kit.css` as `#5a7fa0`**: Correct value is present in brand_kit.css, so this is not a broken variable. However the gradient is `linear-gradient(180deg, var(--mm-story-blue) 0%, #7B9DBF 100%)` — a darker blue going to the standard brand blue. This means Card 2 goes from dark to lighter, while Card 3 (the bar card) goes from `var(--grad-top)` to `var(--grad-bottom)` (lighter blue gradient). The two blue cards are visually near-identical at their borders where Card 2 bottom meets Card 3 top — on desktop the panel edge blends confusingly. Differentiate: make Card 2 gradient bottom land at `#A8BDD4` (lighter) or use a different hue direction.

### P2 — Should Fix (noticeably wrong)

- **Card 1 overlay `rgba(180,140,80,0.3)` — brownish-yellow tint is off-palette**: Flagged in brief. `rgba(180,140,80,0.3)` is a golden-brown, not in the brand palette. Over `stock_hero_lifestyle.jpg` it produces a muddy, almost sepia/Instagram-filter effect. The carob brand's dark warm colour is `--mm-carob-dark: #3a2a1a`. A more on-brand overlay would use this: `rgba(58,42,26,0.4)` — a dark earthy brown that reads as genuine carob darkness without the cheap gold tint. Alternatively use the navy as a cooler, more premium-feeling overlay: `rgba(30,67,102,0.35)` which is the established pattern from V6.

- **Card 4 (Shop) feels jarring vs the blue/dark preceding cards**: `background: var(--mm-cream)` with navy text is a deliberate contrast for the CTA card, but it lands as a sudden brightness jolt after three dark cards. On desktop this is even more pronounced — Card 4 sits at the right edge as a pale panel while the rest of the strip is dark. This is a concept-level choice, but mitigate by: (a) adding a thin `border-left: 1px solid rgba(30,67,102,0.2)` to separate the card visually, or (b) using an off-cream base that's slightly warmer/darker: `background: #D4CEB8` (the `--mm-story-cream` from brand_kit.css). This reduces the brightness shock while keeping the light-card contrast concept.

- **Progress dots on Card 4 switch to navy via `.on-cream` class — correct in principle, but dot colour changes abruptly**: The script adds `on-cream` at `activeIndex === 3`, which changes all dots to navy. When scrolling back from Card 4 to Card 3, the dots switch back to cream instantly (on the scroll event). A `transition: background 0.3s` on `.progress-dots .dot` would smooth this. Currently: `.progress-dots .dot { ... transition: opacity 0.3s, transform 0.3s; }` — add `background 0.3s` to the transition list.

- **`swipe-hint` positioned `bottom: 72px` — lands inside the progress dots area**: `.swipe-hint { bottom: 72px; }` and `.progress-dots { bottom: 32px; }`. The dots are `8px` tall, so they span `32px` to `40px` from bottom. The swipe hint is at `72px` from bottom. With gap this is clear. However the swipe hint animates horizontally (pulseHint: `translateX(0)` → `translateX(6px)`) which is correct for "swipe right". But the hint disappears permanently after `scrollLeft > 20` and uses `opacity: 0` — not `display: none`. This means it still occupies `bottom: 72px` space invisibly (though `pointer-events: none` is set). Fine for layout, but if content grows, a `display: none` after `opacity: 0` transition would be cleaner.

- **Back link has no `fade-` animation class in V9**: Both V6 and V7 give the back link `class="back-link fade-1"`. V9 has `<a href="index.html" class="back-link">` with no animation class. Inconsistent with other versions. Add `fade-1` class — though note that V9 has no local `fadeIn` keyframe defined, relying solely on `brand_kit.css` which defines `.fade-1` through `.fade-4` but with slightly different timing than the local overrides in V6/V7/V8. Confirm `brand_kit.css` `.fade-1` is sufficient (it is: `animation: fadeIn 0.6s ease both; animation-delay: 0.1s`).

- **Card 2 trust badge `filter` is a long hardcoded chain** — `filter: brightness(0) saturate(100%) invert(91%) sepia(8%) saturate(580%) hue-rotate(18deg) brightness(100%) contrast(88%)`. This attempts to convert icon SVGs to cream colour. If the SVG icons already use `currentColor` or are already cream-coloured, this chain may double-process them. Verify icons visually. If icons appear wrong shade, replace the chain with `filter: brightness(0) invert(1) sepia(0.1) saturate(0.8)` for a cleaner cream approximation. At 42px (32px desktop) these icons need to be clearly legible — the current filter must be verified at both sizes.

### P3 — Polish

- **Desktop hover-expand transitions (`width: 0.5s cubic-bezier(0.4, 0, 0.2, 1)`) are smooth, but content inside narrow panels (20vw) clips badly**: When a card shrinks to 20vw, long text in `.card-title` (e.g., "It starts with the pod" at `1.3rem`) wraps aggressively or overflows. No `overflow: hidden` is on `.card-content`. Add `overflow: hidden` and consider reducing `font-size` proportionally at small widths, or limit title to one line with `white-space: nowrap; text-overflow: ellipsis; overflow: hidden` inside cards that will be squeezed.

- **Card 3 watermark `wm-subtle` at `opacity: 0.04` is effectively invisible on the blue gradient**: The watermark in `.card-bar` is `wm-subtle` (0.04 opacity). On a mid-blue background, `opacity: 0.04` of a cream wordmark is near-invisible. Use `wm-full` (0.08 opacity) inside the bar card — it can take more contrast than the full-viewport versions.

- **Swipe hint typography is `0.7rem` — below recommended minimum**: `font-size: 0.7rem` is 11.2px. At this size on mobile, even at high DPI the "Swipe" label is extremely small. Increase to `0.75rem` minimum, or use an icon-only hint (arrow SVG) and drop the text label.

- **No category navigation bar in V9**: V6/V7/V8 all have a category strip (mobile) and category bar (desktop). V9 omits both — the swipe concept replaces category navigation. On desktop this means the bottom bar is absent, which makes V9 look incomplete vs the others. Consider adding the category bar behind Card 4 only (the Shop card) — it fits the commercial endpoint of the story.

### Keep as-is

- Scroll-snap implementation (`scroll-snap-type: x mandatory`, `scroll-snap-align: start`) is correct for mobile swipe.
- Progress dot update on scroll (`Math.round(scrollLeft / cardWidth)`) is the correct pattern and handles momentum correctly.
- The four-chapter narrative arc (Pod → Craft → Bar → Shop) is conceptually strong and well-structured.
- Desktop hover-expand (25vw base → 40vw hovered, others contract to 20vw) is the right interaction for this format.
- Focus trap in the mobile menu is the most complete implementation across all four versions (Escape key + Tab cycling fully implemented).
- `aria-label` on each `<section>` card is correct.
- `100dvh` on both `.story-wrapper` and `.story-card` is correct.

---

## Cross-Version Issues (apply to all V6–V9)

### P1
- **Back link hidden on mobile in all versions**: All four files use `display: none` for `.back-link` at mobile with no alternative back navigation. Only the desktop breakpoint reveals it. This is a prototype gallery — users need to navigate back on mobile. Universal fix: show back link on mobile, left-positioned at `56px` to clear the hamburger.

### P2
- **`--mm-navy-15` used in `.mobile-menu .menu-nav` border-top but this variable is never defined in the local `:root` blocks**: The brand_kit.css defines `--mm-navy-15: rgba(30,67,102,0.15)` correctly in `:root`. This is fine as long as brand_kit.css loads before the inline styles, which it does via `<link rel="stylesheet" href="brand_kit.css">`. Not a bug, but worth noting the dependency.

- **All versions: mobile `.category-strip` has no background scrim**: Over dark backgrounds (carob photo in V6, blue gradient in V7/V8) the strip is legible. But there is nothing preventing the strip from sitting over a light element if the layout shifts. A subtle scrim `background: linear-gradient(to top, rgba(0,0,0,0.2) 0%, transparent 100%)` applied to the `html, body` bottom would be safer.

### P3
- **Duplicate `fadeIn` keyframe definitions**: `brand_kit.css` defines `fadeIn` with `translateY(8px)`. All four hero files redefine `fadeIn` locally with `translateY(12px)`. The local definition wins (cascade). The discrepancy (8 vs 12px) is minor but creates inconsistency if brand_kit.css animations are ever called without a local override. Standardise to one value in brand_kit.css and remove local overrides.
