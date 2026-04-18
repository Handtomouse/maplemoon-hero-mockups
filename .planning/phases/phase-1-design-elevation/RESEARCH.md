# RESEARCH.md — Phase 1: Design Elevation Sprint

**Source documents consolidated here:**
- `.planning/research/premium_dtc_design_patterns.md` (537 lines, 2026-04-16)
- `.planning/research/homepage_vs_inner_pages_gap_analysis.md` (269 lines)

This file is a navigation index into those documents. Phase 1 tasks reference sections by the header anchors below; do **not** paraphrase — open the source file and read the cited section directly.

---

## §A Brand-by-Brand Pattern Library

From `premium_dtc_design_patterns.md §1` — patterns by competitor, ordered by relevance to MapleMoon.

### §A1 Aesop Motion Principles
Slow, deliberate transitions (400–600ms). Ease-in-out, never bouncing. Symmetry as luxury signal — product images share baselines; interface elements share heights across breakpoints. Custom nav reveals products without intermediate pages.
**Use for:** Task 1.3 (motion timing), Task 1.4 (nav elevation).

### §A2 Koko Black Dark/Light Contrast
Deep dark backgrounds with gold/metallic accents. Narrative before commerce ("Artisan Chocolate. Handcrafted in Melbourne" appears before any shop CTAs). Sensory micro-copy as design pattern.
**Use for:** Task 1.1 (section rhythm), Task 1.8 (dark elixir sections).

### §A3 Compartes Product-as-Hero
Packaging dominates 60–70% of viewport. Dual image product cards — hover reveals alternate angle. Colour-coded badges ("Best Seller", "New", "Vegan") layered on images.
**Use for:** Task 1.5 (PDP gallery), Task 1.7 (collection grid).

### §A4 Pana Organic Editorial Dual Imagery
Each product shows both the pack and a styled context shot. Carousel cards with both angles. Origin story woven through every page. Trust badges styled as visual elements, not footnotes.
**Use for:** Task 1.5 (PDP gallery), Task 1.6 (About page).

### §A5 Mast Market Photography-Only System
Photography IS the design system. No visible animations. Print-magazine permanence over dynamism.
**Use for:** Task 1.6 (About page hero), Task 1.7 (collection).

### §A6 Haigh's Heritage Restraint
Heritage positioned as trust architecture. Ethical certifications integrated into visual hierarchy, not footer. Typography hierarchy through spacing, not decoration.
**Use for:** Task 1.2 (typography), Task 1.6 (About/Story).

---

## §B Synthesised Gap Patterns

From `premium_dtc_design_patterns.md §2`.

- **§B1 Dramatic Scale Contrast** — premium headlines run 4–8rem, MapleMoon currently ~2.2rem. Ratio should be 5x+ body text.
- **§B2 Section Personality Shifts** — premium sites change entire colour schemes between sections. MapleMoon currently shares warm-bg across most sections.
- **§B3 Scroll-Triggered Reveals** — elements arrive via staggered fade-up + translateY(20–40px). MapleMoon has page-load fades but nothing on scroll (on inner pages — homepage does have observer).
- **§B4 Product as Protagonist** — 60–70% of viewport for product. MapleMoon maxes at 220px in a 55% container.
- **§B5 Editorial Content Mixing** — premium sites break grids with pull-quotes, process photos, ingredient close-ups.
- **§B6 Sensory Language as Design** — Pana/Koko use evocative micro-copy as visual texture. Out of scope for Phase 1 (copy work is Phase 4) but type treatment should leave room for it.
- **§B7 Hover/Interaction Delight** — product cards reveal second image, buttons shift weight.

---

## §C Five Sprint Techniques (Code-Ready)

From `premium_dtc_design_patterns.md §3`.

- **§C1 Scroll-Reveal Animation System** — CSS + IntersectionObserver already partially implemented in `shared.js`. Phase 1 hardens it across all pages and adds stagger delays.
- **§C2 Dramatic Typography Scale** — `clamp()` fluid scaling. Hero headline: `clamp(2.8rem, 6vw, 5.5rem)`. Section title: `clamp(2rem, 4vw, 3.5rem)`. Eyebrow labels in tracked-out small caps.
- **§C3 Section Colour/Mood Shifts** — `.section--warm`, `.section--dark`, `.section--cream`, `.section--accent`. Homepage rhythm: hero → dark editorial → warm products → full-bleed image → cream trust → dark elixir → accent CTA.
- **§C4 Product Image Dominance + Hover States** — product-card with `aspect-ratio: 3/4`, hover scale, dual-image swap. PDP sticky image column on desktop.
- **§C5 Parallax + Full-Bleed Editorial Breaks** — `.editorial-break` with oversize background (`inset: -10%`), `requestAnimationFrame`-driven translateY, `prefers-reduced-motion` guard.

---

## §D Homepage Visual Technique Catalogue

From `homepage_vs_inner_pages_gap_analysis.md §1` — what the homepage already does that inner pages do not.

- **§D1 Interactive Elements** — flavour picker (category tabs + flavour pills), range filter, smooth scroll anchors.
- **§D2 Layout Patterns** — full-viewport hero (100dvh), bento grid (5 tiles, mixed content per tile), split origin section, product range grid, trust bar.
- **§D3 Motion Primitives** — fade-up (IntersectionObserver at 15% threshold, one-shot), hover transforms (bento `scale(1.02)`, product-card `translateY(-2px)`), active-press (bento `scale(0.98)` on :active), product image crossfade (opacity 0.4s), header blur transition past 40px scroll.
- **§D4 Colour Transitions** — elixir dark mode full-palette swap. Bento tile per-tile gradients. Alternating section backgrounds.
- **§D5 Typography Rhythm** — display serif 2.2–3.2rem, uppercase badges 0.6–0.65rem with 0.18em letter-spacing, category tabs serif 0.78rem, taglines sans 0.85rem weight 300, watermark at 4% opacity.

---

## §E Inner Page Gaps

From `homepage_vs_inner_pages_gap_analysis.md §2`.

### §E1 PDPs (pure-carob-bar, peppermint-moon, spiced-elixir)
- Flat solid background — no atmospheric imagery.
- Single static product image, no gallery, no angles, no lifestyle.
- Two tabs only (Details / Ingredients) — skeletal.
- No watermark, no badge variety, no display contrast.
- No social proof, no story touchpoint, no sensory language with visual support.
- Spiced Elixir PDP has dark treatment but is structurally identical to warm PDPs.

### §E2 Our Story
- Uses `stock_carob_pods_hand.jpg` twice (Origin + Process sections) — looks like a mistake.
- Three story sections + trust bar, all using the same split layout at the same density.
- No watermark, no parallax, no pull-quotes, no large display type.
- Hero is full-bleed image but static — no parallax despite having the room for it.

### §E3 Collection (bars.html)
- Text-only hero (no image at all) — the most visually barren page in the site.
- Plain uniform grid, no featured/hero card, no category description.
- "Explore More" at bottom is the same grid with no visual differentiation.

### §E4 FAQ
- Text-only hero, accordion of Q&As, flat warm-bg throughout.
- Utility page — acceptable as-is. Lowest priority. Phase 1 only adds one decorative image break if time permits.

---

## §F Unused Asset Catalogue

From `homepage_vs_inner_pages_gap_analysis.md §3`. 27 AI-refined images unused. **Phase 2 wires them.** Phase 1 tasks note placement opportunities but do not embed the assets.

Key asset groups (see source doc for full file-level map):
- **§F1 `assets/photography/refined/`** (13 images) — Byron Bay atmospherics, ingredient close-ups, product campaign shots, still lifes, wide-format shots.
- **§F2 `assets/photography/refined_v2/`** (13 images) — flat-lay ingredient shots, Byron lighthouse, human-hand-holding-product, botanical silhouettes, minimalist editorial still lifes.
- **§F3 `assets/hero_shots/`** (40+ files, many unused) — lighthouse, carob-bar-hand, smoke portraits, elixir-hand, moons-lifestyle.
- **§F4 `assets/textures/`** (4 files) — `blue_fog_001/002.png`, `marble_warm.jpg`, `wood_texture.jpg`.
- **§F5 `assets/lifestyle/`** (4 files) — botanical close-ups, gift-box compositions.

---

## §G Priority Tiers (Impact vs Effort)

From `homepage_vs_inner_pages_gap_analysis.md §4`. Phase 1 executes Tier 1 + Tier 2 items that do not require new photography (photography is Phase 2). Tier 3 items are tracked as stretch goals.

### §G1 Tier 1 (High Impact, Low Effort — all in Phase 1)
- PDP atmospheric background image behind gallery.
- Collection page hero image.
- Fix Our Story duplicate-image bug.
- Add watermark to inner pages.

### §G2 Tier 2 (Medium Impact, Medium Effort — Phase 1 where asset-light)
- PDP multi-image gallery (Phase 1 builds the structure; Phase 2 fills with refined photography).
- PDP "story moment" split section.
- Featured product card on Collection page.
- Scroll-triggered section transitions audit (verify `shared.js` observer runs on all inner pages).

### §G3 Tier 3 (Stretch)
- Parallax depth on Our Story hero.
- Ingredient highlight animation on PDPs.
- FAQ visual breaks.

---

## §H MapleMoon Design System Snapshot (Current)

Read directly from the codebase, used here to scope changes:

- **`brand_kit.css`** — tokens only. Colours, type families, spacing, shadows, breakpoints, z-index, ease functions, fluid type variables `--fs-xs`…`--fs-display`.
- **`shared.css`** — V7+V11 fusion components. Header, mobile menu, product-card, trust-bar, footer, newsletter, `.fade-up` observer hook.
- **`shared.js`** — mobile menu toggle, header-scrolled class on `scrollY > 40`, IntersectionObserver for `.fade-up` (threshold 0.15, rootMargin `0px 0px -40px 0px`, one-shot), smooth scroll for anchor links.
- **Palette:** `--warm-bg: #F5F0E8`, `--cream-warm: #FAF7F0`, `--carob-warm: #5C3D2E`, `--accent-blue: #7B9DBF` (soft cornflower — this is the brand blue), `--elixir-dark: #1E2A1E`, `--text-primary: #3A2A1C`.
- **Type scale already defined in `brand_kit.css`:** `--fs-xs: 0.65rem` through `--fs-display: 5rem`. Phase 1 task 1.2 makes pages actually *use* this scale consistently instead of hand-rolled `font-size: 2.2rem` etc.
- **Watermark system already defined in `brand_kit.css`:** `.carob-watermark-wrap` with `.wm-full` / `.wm-bleed` / `.wm-subtle` variants, responsive. Homepage uses a bespoke `.hero-watermark`. Phase 1 task 1.9 reconciles these.
- **Motion primitives already defined:** `@keyframes fadeIn`, `.fade-1…4`, `.fade-product`, `.fade-up` (with `prefers-reduced-motion` guards). `--ease-default`, `--ease-slow`, `--ease-spring` tokens.

### §H1 Brand Blue — Non-Negotiable
The brand accent is **`#7B9DBF` soft cornflower**, defined as both `--mm-blue-top` in `brand_kit.css` and `--accent-blue` in `shared.css`. It is **NOT** `--mm-navy: #1E4366` (that is a text colour, used on cream only) and **NOT** `--mm-teal: #2D6B7F` or `--mm-blue-deep: #4A7B9D` (those are sibling tones that exist in `brand_kit.css` but are not the primary brand accent).

**Per PROJECT.md §Design System Reference:** "Navy #1E4366 text-on-cream only. Accent is cornflower #7B9DBF."

Every image-generation task, colour-swatch task, or asset review in Phase 1 MUST state:
> soft cornflower blue #7B9DBF, NOT deep navy, NOT teal, NOT dark blue

---

## §I What Phase 1 Does and Does Not Touch

### §I1 In Scope
- All CSS (`brand_kit.css`, `shared.css`, page-scoped `<style>` blocks).
- All HTML structural changes that support elevated layout (section wrappers, gallery scaffolding, hero restructure).
- `shared.js` additions for gallery, IntersectionObserver nav state, parallax.
- The 7 pages currently live: `homepage.html`, `our-story.html`, `faq.html`, `collections/bars.html`, `products/pure-carob-bar.html`, `products/peppermint-moon.html`, `products/spiced-elixir.html`.

### §I2 Out of Scope
- **Photography wiring** — Phase 2 wires the 27 refined images. Phase 1 only notes placement slots and prepares the CSS to receive them.
- **Copy rewrites** — Phase 4 is copywriting. Phase 1 keeps existing copy; any visual restructure that demotes/hides copy must preserve all current text.
- **New pages** — Phase 3 builds Contact, Wholesale, Cart, Blog, Shop All, Moons collection, Eclipse Bites collection. Phase 1 only elevates the 7 already built.
- **Shopify Liquid sections** — Phase 6. Phase 1 ignores `sections/`, `templates/`, `snippets/`.
- **AI image generation** — Fal.ai balance is $0. Any task needing new AI renders should be tracked as a Phase 2 dependency, not generated in Phase 1.

---

## §J Sources

See `premium_dtc_design_patterns.md §Sources` (bottom of that file) for the 13 external references (Aesop case study, Awwwards, Koko Black, Haigh's, Pana, Compartes, Mast, CSS scroll-driven animations articles, etc).
