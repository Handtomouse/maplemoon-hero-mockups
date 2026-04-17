# PLAN.md — Phase 1: Design Elevation Sprint

**Milestone:** v1.0 — Horizon 2 Design Overhaul
**Phase goal (from ROADMAP.md §Phase 1):** Make the existing 7 pages not boring. Pull forward premium DTC design patterns from the ultra build spec into the current static HTML pages.
**Planning date:** 2026-04-17
**Planner session:** SPIN spawn from Day Manager, Nate reviews before execute.

---

## 0. Brand Blue Guard — Read This Before Every Task

The MapleMoon brand accent is **`#7B9DBF` soft cornflower blue**.

Every task in this plan that touches colour swatches, image generation, asset review, or references "blue" MUST explicitly state:

> soft cornflower blue #7B9DBF, NOT deep navy (#1E4366), NOT teal (#2D6B7F), NOT dark blue (#4A7B9D)

`#1E4366` exists in `brand_kit.css` as `--mm-navy` but is **text-on-cream only**, not an accent. `#2D6B7F` (`--mm-teal`) and `#4A7B9D` (`--mm-blue-deep`) are sibling tones for gradient work, not brand identity. Per PROJECT.md §Design System Reference: "Navy #1E4366 text-on-cream only. Accent is cornflower #7B9DBF."

If any task produces an image prompt, include the negative-prompt string verbatim:

> `negative: deep navy, teal, dark blue, royal blue — brand is soft cornflower #7B9DBF only`

This guard applies to tasks **1.1** (if editorial break imagery is prompted), **1.6** (if process timeline icons are generated), **1.7** (if collection hero art is generated), **1.8** (dark palette audit — the accent inside dark sections is still cornflower), and **1.9** (component library swatches).

---

## 1. Execution Overview

### 1.1 Context
- Live site: https://maplemoon-website.vercel.app
- Branch: `paper-shopify-heroes` @ `18b7c76` (last seen in handoff)
- 7 pages in scope (see RESEARCH.md §I1). 27 refined images in scope for *placement notes only* (wiring is Phase 2).
- Client meeting window: Apr 17–20 Sydney, time NOT locked. Plan assumes best-case 2–3 sessions before the meeting; all tasks deliver visible value independently so partial completion is still shippable.

### 1.2 Work Directory
All file paths below are relative to `~/maplemoon-website/`.

### 1.3 DAG
```
  1.2 Typography ──────┐
                       ├──► 1.1 Homepage ──┐
  1.3 Motion ──────────┤                   │
                       ├──► 1.5 PDP ───────┤
  1.4 Nav ─────────────┤                   ├──► 1.9 Component Library
                       ├──► 1.6 About ─────┤
  1.8 Dark Palette ────┤                   │
                       └──► 1.7 Collection ┘
```

**Wave A (foundations — must complete first, any order, can parallelise):** 1.2, 1.3, 1.4, 1.8
**Wave B (page-level elevation — parallelisable after Wave A):** 1.1, 1.5, 1.6, 1.7
**Wave C (documentation — last):** 1.9

### 1.4 Why the DAG is this shape
- **1.2 precedes 1.1/1.5/1.6/1.7** — pages inherit heading/body type rules; re-setting type after page work doubles rework.
- **1.3 precedes 1.1/1.5/1.6** — pages apply `.fade-up` classes that assume the hardened observer from 1.3.
- **1.4 precedes 1.1** — hero-section nav-dark-mode requires the IntersectionObserver trigger wired by 1.4.
- **1.8 precedes 1.1 and 1.5** — homepage elixir section + Spiced Elixir PDP both consume the consolidated dark palette.
- **1.9 depends on all above** — documentation catalogues what 1.1–1.8 produced. Done last to avoid re-writing.

---

## 2. Atomic Task Breakdown

Each task is scoped to ≤3 hours. If a task looks larger during execution, split at the natural seam and append a `.x` subtask to this plan rather than pushing through.

---

### Task 1.2 — Typography & Spacing Pass
**Wave:** A | **Est:** 2.0h | **Depends on:** none

#### Inputs (read before touching code)
- `brand_kit.css` lines 78–89 (existing type scale variables `--fs-xs`…`--fs-display`)
- `shared.css` (no type-scale usage currently — pages hand-roll sizes)
- `homepage.html` inline styles for `.hero-headline`, `.hero-sub`, `.hero-badge`, `.hero-tagline`, `.hero-cat-btn` (lines ~253–340)
- `our-story.html`, `faq.html`, `collections/bars.html`, `products/*.html` — inline `<style>` blocks, grep for `font-size:` and `font-family:`
- RESEARCH.md §B1, §C2, §D5

#### Outputs
- `brand_kit.css` — add utility classes `.type-eyebrow`, `.type-display`, `.type-headline`, `.type-subhead`, `.type-body`, `.type-caption` that map to the existing `--fs-*` variables plus fluid `clamp()` wrappers.
- Convert all 7 pages to use the utility classes (or the `--fs-*` variables directly) — remove hand-rolled `font-size: 2.2rem` etc.
- `shared.css` — enforce line-height tokens: add `--lh-display: 1.05`, `--lh-heading: 1.15`, `--lh-body: 1.6`, `--lh-loose: 1.8` to `:root`. Apply to utility classes.

#### Acceptance criteria
- Every heading in every page reads from `--fs-*` tokens (grep for `font-size:` in `.html` should return only declarations that use `var(--fs-*)` or `clamp(`).
- Hero headline on homepage scales fluidly from ≥2.8rem at 375px to ≥5rem at 1440px (visually verify with DevTools responsive mode).
- Body text on all pages is ≥1rem at all breakpoints (no more 0.85rem body copy).
- Eyebrow labels use `--fs-xs` (0.65rem) with `letter-spacing: 0.15–0.18em` and `text-transform: uppercase`.
- No visual regression: all current copy remains readable; no headline clipping; no overflow.

#### Risks
- Enlarging hero headline may cause product image to push below the fold on 375×667 iPhone SE. Mitigation: verify on 375px with product still visible; if not, adjust hero padding, NOT headline size.
- Utility classes may collide with existing class names. Mitigation: prefix with `.type-` (no existing collisions found).

---

### Task 1.3 — Motion Layer Hardening
**Wave:** A | **Est:** 2.5h | **Depends on:** none

#### Inputs
- `shared.js` (current IntersectionObserver for `.fade-up`, lines 46–60)
- `shared.css` `.fade-up` definition (lines 392–406)
- `brand_kit.css` ease tokens `--ease-default`, `--ease-slow`, `--ease-spring` (lines 71–73)
- RESEARCH.md §C1, §C5, §D3
- Check each page currently uses `.fade-up` — grep `class=".*fade-up` across all 7 HTML files; confirm the observer fires.

#### Outputs
- `shared.css` — add `.reveal`, `.reveal-stagger > *:nth-child(n)` delay ladder (0s, 0.08s, 0.16s, 0.24s, 0.32s), `.reveal--slow` (0.8s instead of 0.6s), `.reveal--fade-only` (no translate). Keep existing `.fade-up` for backward compat but mark deprecated in a `/* */` comment.
- `shared.js` — extend observer to also watch `.reveal`; add `requestAnimationFrame`-driven parallax handler for `[data-parallax]` elements with `prefers-reduced-motion` guard; wire `IntersectionObserver` for nav-dark-mode trigger (see task 1.4 consumer).
- `brand_kit.css` — add `--ease-reveal: cubic-bezier(0.16, 1, 0.3, 1)` token.
- `shared.css` — all `.reveal` rules wrapped in `@media (prefers-reduced-motion: no-preference)` with a matching `reduce` branch that sets `opacity: 1; transform: none; transition: none`.

#### Acceptance criteria
- Loading any of the 7 pages with `prefers-reduced-motion: reduce` set (macOS System Settings → Display → Reduce motion) shows NO animation; all content is visible immediately; no opacity-0 elements stuck invisible.
- Loading with motion ON shows staggered fade-up on scroll — each `.reveal` arrives one-shot at 15% intersection threshold.
- Scroll performance at 60fps on 2019 MacBook Air (baseline hardware) — no jank on parallax.
- Observer unobserves after first intersection (element does not re-fire on scroll back up).
- No `scroll` event handler without `{ passive: true }` (grep `addEventListener.*scroll` in `shared.js`).

#### Risks
- **Blindly animating breaks accessibility** — every new motion primitive MUST have a `prefers-reduced-motion: reduce` branch that disables it. Verify in both DevTools emulation AND actual macOS setting.
- Parallax `background-attachment: fixed` is broken on iOS Safari and causes layout shift. Mitigation: use JS-driven `translate3d` on an absolutely-positioned bg element, never `background-attachment: fixed`.
- Staggered `transition-delay` on lists with >20 items creates >2s cumulative delay. Mitigation: cap stagger at 5 children; children 6+ get delay of `0.32s`.

---

### Task 1.4 — Navigation Elevation
**Wave:** A | **Est:** 1.5h | **Depends on:** none (but integrates with 1.3's observer helper)

#### Inputs
- `shared.css` `.site-header`, `.site-header.scrolled`, `.site-header.header-dark` (lines 27–56)
- `shared.js` header scroll handler (lines 38–44)
- `homepage.html` elixir section (search for "elixir" — dark section currently exists but doesn't trigger nav dark mode via IO)
- RESEARCH.md §A1, §D3

#### Outputs
- `shared.css` — tighten glassmorphism: increase blur to `blur(16px) saturate(140%)`; add `-webkit-backdrop-filter` fallback (already present, verify); add `box-shadow: 0 1px 0 rgba(0,0,0,0.04)` for subtle edge. Add `.site-header--minimal` variant for inner pages (less visual weight than homepage hero nav).
- `shared.js` — add IntersectionObserver that watches elements with `data-nav-dark="true"` (typically the elixir section). When >50% in viewport, add `.header-dark` to `#site-header`. When <50%, remove. Use `threshold: [0, 0.5, 1]`.
- Add `data-nav-dark="true"` attribute to the elixir section wrapper on `homepage.html` (single HTML edit, no structural change).
- Spiced Elixir PDP (`products/spiced-elixir.html`): add `<body class="dark-page">` or equivalent so the header starts in dark mode. Add `shared.css` rule `body.dark-page .site-header { /* dark default */ }`.

#### Acceptance criteria
- On homepage scroll into elixir section, nav transitions to dark in 500ms (matches `.header-dark` transition rule).
- Scrolling back out of elixir section returns nav to warm mode.
- On Spiced Elixir PDP, nav is dark on load with no flicker.
- On all pages, nav gets `scrolled` class past 40px (existing behaviour) and `backdrop-filter` is active.
- IO handler is debounced/throttled via `threshold` array (NOT a manual scroll event).

#### Risks
- Firefox `backdrop-filter` support lands 2023+. Baseline check: fallback to solid `background: rgba(245, 240, 232, 0.95)` via `@supports not (backdrop-filter: blur(12px))`.
- IO threshold fires on every scroll tick near boundary — use `rootMargin: '-10% 0px -10% 0px'` to deadzone the transitions.

---

### Task 1.8 — Dark Palette Consolidation
**Wave:** A | **Est:** 1.5h | **Depends on:** none

#### Inputs
- `brand_kit.css` `--mm-dark-bg`, `--mm-cream`, `--mm-cream-*` variants (lines 10–44)
- `shared.css` `--elixir-dark: #1E2A1E` (line 17) — note: differs from `brand_kit.css` `--mm-dark-bg: #1a1a1a`
- `homepage.html` — grep for elixir dark section, currently uses bespoke inline values
- `products/spiced-elixir.html` — dark PDP treatment
- PROJECT.md §Design System Reference: "Dark palette (Elixirs only): #1E2A1E bg, #E7E4CA text, same cornflower accent"
- RESEARCH.md §A2, §D4

#### Outputs
- `brand_kit.css` / `shared.css` reconciliation: promote `--elixir-dark: #1E2A1E` to a first-class token in `brand_kit.css` as `--mm-elixir-bg`. Add `--mm-elixir-surface: #2A2218` (for cards on dark), `--mm-elixir-border: rgba(231,228,202,0.15)`.
- Retire or comment-out `--mm-dark-bg: #1a1a1a` if unused (grep confirms no consumers). If used, leave but add a `/* legacy — do not use on elixir sections */` comment.
- Add `.section--dark` utility class to `shared.css` that applies bg, text colour, and sets `--text-primary` override for child elements. Accent within dark remains `#7B9DBF` (brand blue guard — §0 of this plan).
- Apply `.section--dark` to homepage elixir section + Spiced Elixir PDP hero.
- Verify contrast ratios: `#E7E4CA` text on `#1E2A1E` bg via a contrast tool (target WCAG AAA = 7:1 for body; AA = 4.5:1 minimum).

#### Acceptance criteria
- Exactly ONE canonical dark-bg value used across homepage elixir section and Spiced Elixir PDP — verify by grep for `#1E2A1E`, `#1a1a1a`, `#1E1612` and confirm only `#1E2A1E` remains in elixir contexts.
- `#7B9DBF` cornflower accent still visible on dark bg (contrast ≥ 3:1 for non-text decorative use).
- Dark sections use `--mm-cream-15`/`--mm-cream-25` for borders consistently.
- No bright white (`#FFFFFF`) on dark — always `--mm-cream` (#E7E4CA).

#### Risks
- Changing `--elixir-dark` value globally may shift homepage hero elixir-mode background unexpectedly. Mitigation: diff render the homepage before/after; visually confirm the elixir toggle on the flavour picker still looks correct.
- Contrast ratio may fail on small cream text over elixir-surface — use a contrast checker (e.g., `https://webaim.org/resources/contrastchecker/`) for every colour pairing before shipping.

---

### Task 1.1 — Homepage Redesign (Editorial Scroll Storytelling)
**Wave:** B | **Est:** 3.0h | **Depends on:** 1.2, 1.3, 1.4, 1.8

#### Inputs
- `homepage.html` (complete read — it is a 52KB single file with inline CSS)
- RESEARCH.md §B2, §B5, §C3, §C5, §D1, §D2
- Existing section order per `homepage_vs_inner_pages_gap_analysis.md §1`: Hero → Bento Grid → Origin → Product Range → Trust Bar → Footer
- Asset paths to reference (placement notes only, do NOT embed in Phase 1): `assets/hero_shots/byron_bay_silhouette.webp`, `assets/photography/refined/mm_refined_hero_c2_byron_a.png` — per RESEARCH.md §F1.

#### Outputs
- Restructure `homepage.html` section rhythm to follow RESEARCH.md §C3 homepage rhythm (approximate):
  1. Hero (gradient + flavour picker) — existing, wrap in `.section--warm`
  2. NEW: Editorial intro ("What is carob?") — `.section--dark` with `.editorial-break` + large display serif pull-quote — use `data-nav-dark="true"`
  3. Bento Grid — existing, wrap in `.section--warm`
  4. Origin story split — existing, verify placement slot for refined photography (Phase 2)
  5. Product Range grid — existing, wrap in `.section--cream`
  6. NEW: Full-bleed editorial break — Byron Bay atmosphere, placement slot for `mm_refined_hero_c2_byron_a.png` (do NOT wire the image; add `<!-- TODO Phase 2: wire mm_refined_hero_c2_byron_a.png here -->` comment)
  7. Elixir showcase — existing, wrap in `.section--dark`, add `data-nav-dark="true"`
  8. Trust Bar — existing
  9. Newsletter CTA — existing, wrap in `.section--accent` (cornflower `#7B9DBF` background — brand blue guard)
  10. Footer — existing
- Apply `.reveal` / `.reveal-stagger` classes on each major content block within each section (headline, sub, media, CTAs).
- Increase product-display max-width from 220px to 320px per RESEARCH.md §B4 / §C4. Verify it fits the hero container at 375px.
- Add `<!-- TODO Phase 2 placement slot: ... -->` comments for each of the 27 refined images where homepage sections could consume them (do NOT embed `<img>` tags).

#### Acceptance criteria
- Scrolling the homepage top-to-bottom on desktop shows at least 3 distinct background "moods" (warm → dark → full-bleed → cream → dark → cornflower).
- Every section has a `.reveal` entrance (verify with DevTools animation inspector).
- No layout regressions on 375px, 768px, 1440px (visual diff all three breakpoints).
- No new `<img>` tags added — all imagery slots are HTML comments ready for Phase 2.
- Nav toggles to dark mode when scrolling into elixir section and editorial intro section.
- Hero product image reads as dominant on desktop (visually fills 40%+ of hero area).
- **Brand blue guard:** the newsletter CTA `.section--accent` is exactly `#7B9DBF` (soft cornflower blue, NOT deep navy, NOT teal, NOT dark blue).

#### Risks
- Homepage is 52KB inline — easy to break existing flavour picker JS. Mitigation: save a git checkpoint commit at each structural milestone; test the flavour picker after every section restructure.
- New dark sections may clash with existing elixir-mode palette-swap logic. Mitigation: the palette-swap logic only toggles when the "Elixirs" category is selected in the hero picker; new dark sections are below the hero and independent.

---

### Task 1.5 — PDP Elevation (Gallery Scaffold + Buy Box + Editorial)
**Wave:** B | **Est:** 3.0h | **Depends on:** 1.2, 1.3, 1.8

#### Inputs
- `products/pure-carob-bar.html`, `products/peppermint-moon.html`, `products/spiced-elixir.html` (all three)
- RESEARCH.md §A3, §A4, §C4, §E1
- Placement-note assets (Phase 2 wires these): `hero_carob_bar_hand.png`, `mm_refined_r1_still_life_001.png`, `mm_refined_hero_c4_ingred_a.png`, `hero_moons_lifestyle.png`, `hero_elixir_hand.jpg`, `hero_carob_bar_smoke_portrait.jpg`

#### Outputs
- Create shared PDP scaffold in `shared.css`:
  - `.pdp-layout` — 1-column mobile, 2-column desktop grid at ≥768px
  - `.pdp-image-col` — sticky on desktop (`position: sticky; top: 0; height: 100vh`), atmospheric background ready to receive image (placement comment)
  - `.pdp-gallery` — main image + thumbnail strip scaffold (3 thumbnails, click to swap main)
  - `.pdp-info-col` — buy box styling, `padding: 120px 48px 80px` on desktop
  - `.pdp-story-section` — split section between gallery and related products
- Add thumbnail-swap JS to `shared.js` (or page-scoped if preferred) — click thumbnail → main image `src` updates with 0.4s opacity crossfade.
- Apply scaffold to all 3 PDP HTML files:
  - Gallery structure: 1 main image slot + 3 thumbnail slots (all `<!-- TODO Phase 2 -->` placement comments, keep existing single product shot in main slot so page still renders)
  - Add atmospheric bg `<div class="pdp-gallery-bg"></div>` with placement comment for Phase 2 hero image
  - Add `.pdp-story-section` between tabs and related products — 2 paragraphs of editorial content (re-use existing copy from content/ if present, else leave `<!-- TODO Phase 4 copy -->`)
- Expand tabs from 2 (Details / Ingredients) to 3: add "Story" tab pointing to the new story section anchor (or inline-loaded tab content).
- Spiced Elixir PDP: apply `.section--dark` to hero column, verify cornflower accent CTA contrast.

#### Acceptance criteria
- All 3 PDPs use the same `.pdp-layout` scaffold — structural parity.
- At ≥768px, product image column is sticky on scroll (verify: scroll the info column, image stays pinned).
- Thumbnail click swaps main image with 0.4s crossfade; no jank, no image-reflow.
- PDP story section is present on all 3 PDPs (content placeholder acceptable; structure must exist).
- Atmospheric bg div is present behind gallery on all 3 PDPs (empty for now; receives image in Phase 2).
- Spiced Elixir dark treatment is consistent with homepage elixir section (per task 1.8 tokens).
- **Brand blue guard:** PDP CTA buttons use cornflower `#7B9DBF`, NOT navy.

#### Risks
- Sticky image column interacts badly with mobile browsers — only apply at `≥768px`. Mobile stays single-column stacked.
- Thumbnail strip at 3 images may look sparse with only 1 real asset available in Phase 1. Mitigation: grey out thumbnails 2 and 3 with a subtle "Coming soon" treatment, OR hide the thumbnail strip behind a feature flag (`data-gallery-ready="false"`) that Phase 2 flips.

---

### Task 1.6 — About Page Elevation (Our Story)
**Wave:** B | **Est:** 2.5h | **Depends on:** 1.2, 1.3

#### Inputs
- `our-story.html` (complete read)
- RESEARCH.md §A5, §A6, §C5, §E2
- Current bug: `our-story.html` uses `stock_carob_pods_hand.jpg` TWICE (Origin + Process) per RESEARCH.md §E2. This MUST be fixed as part of this task.
- Placement-note assets (Phase 2 wires): `maplemoon_byron_bay_lighthouse_headland_*.png`, `maplemoon_artisan_ingredients_flat_lay_*.png`, `maplemoon_human_hand_delicately_holding_*.png`

#### Outputs
- Restructure `our-story.html`:
  - Hero: full-width atmospheric bg (Byron Bay hinterland) with gradient overlay `linear-gradient(180deg, rgba(58,42,28,0) 0%, rgba(58,42,28,0.4) 70%, rgba(58,42,28,0.6) 100%)` + `.reveal` on headline/sub
  - Alternating split sections — image LEFT / copy RIGHT, then image RIGHT / copy LEFT, then centred full-bleed editorial break, repeat
  - NEW: Process timeline — horizontal step flow "Pod → Roast → Mill → Temper → Pack" (5 steps with numbered circles + labels + brief description)
  - Retain Mission + Trust bar sections
- Fix duplicate-image bug: change the second `stock_carob_pods_hand.jpg` reference to a placement comment `<!-- TODO Phase 2: wire maplemoon_artisan_ingredients_flat_lay_001.png -->` and leave the img tag pointing to a different currently-existing asset (any from `assets/hero_shots/` NOT already used on this page).
- Add carob wordmark watermark to Mission section using existing `.carob-watermark-wrap.wm-subtle` from `brand_kit.css`.
- Process timeline CSS: in `our-story.html` inline `<style>` block, define `.process-timeline`, `.process-step`, `.process-step__number`, `.process-step__label`, `.process-step__desc`. Horizontal on desktop, vertical stacked on mobile.
- `.reveal` + `.reveal-stagger` on process-timeline steps so they arrive one-by-one.

#### Acceptance criteria
- No duplicate image usage on `our-story.html` (grep for each `src=` value — all unique).
- Hero has atmospheric background with gradient overlay; headline is readable over it (WCAG AA body contrast minimum).
- Process timeline renders horizontal at ≥768px, vertical at <768px.
- Alternating split sections exist (image-left, image-right, image-left — at least 3 alternations).
- Mission section has `.carob-watermark-wrap.wm-subtle` watermark at ≤6% opacity.
- Stagger animation on process steps visible in DevTools (0.08s delay ladder).

#### Risks
- Parallax on hero image can break layout on iOS Safari. Mitigation: use `transform: translate3d` via `[data-parallax]` from task 1.3, NEVER `background-attachment: fixed`.
- Process timeline at very narrow viewports (<375px) may truncate step descriptions. Mitigation: hide descriptions at <375px, show only number + label.

---

### Task 1.7 — Collection Page Elevation (bars.html)
**Wave:** B | **Est:** 2.0h | **Depends on:** 1.2, 1.3

#### Inputs
- `collections/bars.html` (complete read)
- RESEARCH.md §A3, §E3, §G1 "Collection hero image" recommendation
- Placement-note asset (Phase 2 wires): `hero_bar_carob_pods_studio.png` (already used on homepage bento — acceptable to re-use as collection hero) OR `mm_refined_r1_product_campaign_001.png`

#### Outputs
- Add collection hero banner:
  - Full-bleed at ≥768px (100% viewport width), 60vh height
  - Atmospheric bg placement comment for Phase 2 (`<!-- TODO Phase 2: wire mm_refined_r1_product_campaign_001.png -->`)
  - Overlay: eyebrow "THE RANGE — BARS", display serif title "Pure Carob, Pressed and Set", short intro paragraph
  - Gradient overlay `linear-gradient(180deg, rgba(58,42,28,0.2) 0%, rgba(58,42,28,0.5) 100%)`
- Featured product card: first grid item becomes double-width on desktop (span 2 columns), reverts to single-column on mobile. Slightly larger type, same product-card structure otherwise.
- Refined product card hover states: scale(1.03) on image, subtle shadow lift, 600ms ease-reveal transition per RESEARCH.md §A3.
- Collection category intro paragraph (2–3 sentences) between hero and grid — uses existing Bars description from `content/` if available.
- Wrap grid in `.section--cream`; wrap "Explore More" bottom section in `.section--warm` so they visually differentiate.

#### Acceptance criteria
- Collection page opens with a visible hero at ≥375px (no more text-only top).
- Featured product card spans 2 columns at ≥768px.
- Grid product cards have hover scale + shadow (visually verify on desktop).
- Bottom "Explore More" section has visible background differentiation from the main grid section.
- **Brand blue guard:** any accent colour on the hero (eyebrow text, CTA) uses cornflower `#7B9DBF`, NOT navy.

#### Risks
- Featured card double-width may leave an odd trailing half-row if product count is odd. Mitigation: audit product count before execute; if odd, feature TWO cards (first two both span — still reads as "featured").
- Using `hero_bar_carob_pods_studio.png` for both homepage bento AND collection hero may feel repetitive. Acceptable for Phase 1 (placeholder); Phase 2 can render a distinct collection-hero asset.

---

### Task 1.9 — Component Library Documentation
**Wave:** C | **Est:** 2.0h | **Depends on:** 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8

#### Inputs
- `brand_kit.css` (post 1.2/1.3/1.8 edits)
- `shared.css` (post 1.2/1.3/1.4/1.5 edits)
- Final HTML state across all 7 pages

#### Outputs
- Append a `/* ══ COMPONENT INVENTORY ══ */` comment block to the top of `brand_kit.css` listing every utility class / token added in Phase 1 with a one-line purpose each. Group by:
  - **Type utilities** (from 1.2): `.type-eyebrow`, `.type-display`, etc.
  - **Motion utilities** (from 1.3): `.reveal`, `.reveal-stagger`, `.reveal--slow`, `.reveal--fade-only`, `[data-parallax]`, `[data-nav-dark]`
  - **Section utilities** (from 1.1/1.8): `.section--warm`, `.section--dark`, `.section--cream`, `.section--accent`
  - **Dark palette tokens** (from 1.8): `--mm-elixir-bg`, `--mm-elixir-surface`, `--mm-elixir-border`
  - **Ease tokens** (from 1.3): `--ease-reveal`, plus pre-existing `--ease-default`, `--ease-slow`, `--ease-spring`
- Button variants inventory — grep current `<button>` / `.btn` usage across 7 pages, document the 3 canonical variants (primary cornflower, secondary ghost-on-warm, dark-context ghost-on-dark) in `brand_kit.css` as `.btn`, `.btn--primary`, `.btn--secondary`, `.btn--ghost-dark`. Convert at least 1 button per page to the documented class to prove the inventory is real.
- Card pattern inventory — `.product-card` (existing), `.product-card.dark-card` (existing), new Phase-1 additions: `.story-card`, `.feature-card` (if added during 1.1/1.6; skip inventory entry if the class wasn't actually needed). Don't invent classes that weren't used.
- Trust badge inventory — `.trust-item` (existing). Phase 1 doesn't add new variants; document existing only.
- **Brand blue guard section at the top of the inventory:** a comment reminding future editors that `--accent-blue` is `#7B9DBF` soft cornflower, NOT navy (`--mm-navy` is text-on-cream only).

#### Acceptance criteria
- `brand_kit.css` top of file contains a clearly-labelled inventory comment block.
- Every class named in the inventory actually exists in `shared.css` or `brand_kit.css` (grep verifies).
- At least one real-page usage of each documented class exists (grep across 7 HTML files).
- Brand blue guard comment is present verbatim in the inventory.

#### Risks
- Doc drift — if 1.1–1.8 add classes that don't end up used, don't document them. Keep inventory lean, grep-verified.

---

## 3. Order of Operations — Checklist Form

Phase 1 is sequenced so each wave can be completed in a single session if uninterrupted.

### Session 1 (Wave A — foundations)
- [ ] 1.2 Typography & Spacing Pass
- [ ] 1.3 Motion Layer Hardening
- [ ] 1.4 Navigation Elevation
- [ ] 1.8 Dark Palette Consolidation

### Session 2 (Wave B — page elevation, ideally parallel)
- [ ] 1.1 Homepage Redesign
- [ ] 1.5 PDP Elevation (all 3 PDPs)
- [ ] 1.6 About Page Elevation
- [ ] 1.7 Collection Page Elevation

### Session 3 (Wave C — documentation + UAT)
- [ ] 1.9 Component Library Documentation
- [ ] Run VERIFICATION.md end-to-end
- [ ] Visual diff vs Aesop/Koko Black/Haigh's screenshots
- [ ] Final commit + push to `paper-shopify-heroes`

---

## 4. Shared Rules for All Tasks

1. **No framework, no build step.** Every change is static HTML + CSS + vanilla JS. No npm install, no Tailwind, no React.
2. **Git checkpoints.** Commit after each task completes. Use Conventional Commits style (`feat(phase-1):`, `fix(phase-1):`, `refactor(phase-1):`).
3. **Brand blue guard.** Every time blue is touched, verify `#7B9DBF`. Any AI image prompt includes the negative-prompt string from §0 of this plan.
4. **Reduced-motion guards on every new animation.** No exceptions.
5. **Mobile-first.** Every new component renders at 375px before desktop polish.
6. **Photography is Phase 2.** Phase 1 adds placement slots (HTML comments) but does NOT wire the 27 refined images.
7. **Copy is Phase 4.** Phase 1 preserves all existing text. Any placeholder copy must be wrapped in `<!-- TODO Phase 4 copy -->`.
8. **No layout regressions.** Every acceptance criterion includes a breakpoint matrix check (375 / 768 / 1440).

---

## 5. Definition of Done (Phase 1)

All 9 tasks above acceptance-criteria-passed. See `VERIFICATION.md` for the end-of-phase verification procedure (competitive comparison, breakpoint matrix, reduced-motion test).

---

## 6. Out-of-Scope Reminders (Nate-facing)

- **Shopify theme work** — Phase 6. Ignore `sections/`, `templates/`, `snippets/` during Phase 1.
- **Photography** — Phase 2. Do not embed refined images; only placement comments.
- **Copy rewrites** — Phase 4.
- **New pages (Contact, Wholesale, Cart, Blog, Shop All, Moons, Eclipse Bites)** — Phase 3.
- **Fal.ai image generation** — balance is $0. Any task that needs new AI renders is a Phase 2 dependency.
