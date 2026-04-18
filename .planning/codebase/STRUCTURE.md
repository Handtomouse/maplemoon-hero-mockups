# Codebase Structure

**Analysis Date:** 2026-04-18

## Directory Layout

```
maplemoon-website/
├── .planning/                            # GSD docs (codebase/, phases/, research/, accepts/)
│   └── codebase/                         # This folder: STACK / INTEGRATIONS / ARCHITECTURE / STRUCTURE / CONVENTIONS / TESTING / CONCERNS
├── .vercel/                              # Vercel project linkage (project.json)
├── .superpowers/                         # Editor-local tooling (gitignored, .vercelignored)
│
├── homepage.html                         # SHIPPED: Primary landing (V7+V11 fusion, 1742 lines)
├── our-story.html                        # SHIPPED: Brand story (315 lines)
├── faq.html                              # SHIPPED: FAQ accordion (287 lines)
├── collections/
│   └── bars.html                         # SHIPPED: Bars collection grid (236 lines)
├── products/
│   ├── pure-carob-bar.html               # SHIPPED: PDP, light mode (402 lines)
│   ├── peppermint-moon.html              # SHIPPED: PDP (397 lines)
│   └── spiced-elixir.html                # SHIPPED: PDP, body.dark-page (422 lines)
│
├── brand_kit.css → assets/brand_kit.css  # Symlink (repo-root convenience)
├── shared.css                            # SHIPPED: Header/footer/cards/reveals (736 lines)
├── shared.js                             # SHIPPED: Menu, observers, parallax, PDP thumbs (143 lines)
│
├── assets/                               # All media + tokens
│   ├── brand_kit.css                     # CANONICAL design tokens (340 lines)
│   ├── brand/                            # SHIPPED: logo, wordmark, 11 SVG cert icons
│   ├── hero/                             # SHIPPED: 11 hero PNGs (bars, moons, elixirs, silhouettes)
│   ├── product_shots/                    # SHIPPED subset: PDP + collection-grid renders (PNG + WebP)
│   ├── lifestyle/                        # SHIPPED: botanical + gift-box PNGs
│   ├── textures/                         # SHIPPED: blue fog, marble, wood
│   ├── photography/                      # SHIPPED: refined/, refined_v2/, test_v2/
│   │
│   ├── hero_shots/                       # DEV ONLY: prototype hero photography (excluded)
│   ├── imagery/                          # DEV ONLY: Gemini mockups, mood refs (excluded)
│   ├── mood/                             # DEV ONLY: palette + flatlay refs (excluded)
│   ├── products/                         # DEV ONLY: mockup iterations (excluded)
│   ├── products_clean/                   # DEV ONLY: cleaned product shots (excluded)
│   ├── products_new/                     # DEV ONLY: new-line shots (excluded)
│   ├── stock/                            # DEV ONLY: stock library (excluded)
│   ├── gemini/                           # DEV ONLY: AI-generated mockups (excluded)
│   └── *.svg, *.png                      # Root-level assets (some shipped, some legacy)
│
├── sections/                             # DORMANT: Shopify Liquid theme (18 sections)
│   ├── section-hero-evolved.liquid       # Hero for live Shopify store
│   ├── section-product-main.liquid       # PDP section
│   ├── section-testimonials.liquid
│   ├── section-education-split.liquid
│   ├── section-header.liquid / -footer.liquid
│   ├── section-faq-accordion.liquid
│   ├── section-blog.liquid / -article.liquid
│   ├── section-product-grid.liquid
│   ├── section-collection-main.liquid / -list-collections.liquid
│   ├── section-cart.liquid / -search.liquid
│   ├── section-404.liquid / -password.liquid
│   ├── main-page.liquid
│   ├── header-group.json / footer-group.json
│
├── layout/                               # DORMANT: Shopify theme layouts
│   ├── theme.liquid                      # Master wrapper (85 lines)
│   └── password.liquid
│
├── snippets/                             # DORMANT: Reusable Liquid components
│   └── trust-badges.liquid
│
├── templates/                            # DORMANT: Shopify template JSON + Liquid
│   ├── index.json / product.json / collection.json / cart.json / page.json / search.json
│   ├── 404.json / article.json / blog.json / list-collections.json / password.json
│   └── gift_card.liquid
│
├── locales/                              # DORMANT: i18n for Shopify
│   └── en.default.json
│
├── config/                               # DORMANT: Shopify theme settings
│   ├── settings_data.json
│   └── settings_schema.json
│
├── content/                              # Source copy (Markdown, not shipped)
│   ├── about_page.md / faq.md / hero_copy.md
│   ├── meta_seo.md / product_descriptions.md
│
├── server.js                             # DEV ONLY: Express 5 Liquid preview (port 3005)
├── package.json                          # Dev: express ^5.2.1
├── package-lock.json
├── vercel.json                           # Prod: redirects, headers, CSP, cache
├── .vercelignore                         # Prod: deploy exclusions
├── .gitignore
│
├── Prototype HTML (NOT deployed):
│   ├── index.html                        # Gallery of hero + product variants
│   ├── hero_v1.html..hero_v19.html       # 19 hero iterations
│   ├── hero_v9_product.html / _atmospheric.html
│   ├── hero_photo_atmospherics.html / _byron_bay.html / _gift_boxes.html /
│   │   _products.html / _silhouettes.html
│   ├── product_v2b.html / v7a.html / v9.html / v13.html / v19.html
│   ├── client_review.html                # Formspree feedback tool
│   ├── review.html / triage.html / triage_paper.html
│   ├── presentation.html                 # Pitch deck viewer
│   └── mockup_maker.html
│
├── tools/                                # DEV ONLY: Python utilities
│   ├── composite_hero.py
│   └── __pycache__/
├── apply_moods.py / place_stock.py       # DEV ONLY: root-level asset scripts
│
├── Documentation (not deployed):
│   ├── HANDOFF.md                        # Project handoff
│   ├── REVIEW_BRIEF.md                   # Client review brief
│   ├── ASSET_AUDIT.md                    # Asset inventory (2026-04-13)
│   ├── CREATIVE_DIRECTION_BRIEF.md       # Direction notes (2026-04-16)
│   ├── MEETING_AGENDA.md                 # Apr 17 meeting agenda
│   ├── MEETING_PREP_APR17.md
│   ├── PHOTOGRAPHY_PIPELINE_REPORT.md
│   └── homepage_backup.pdf
│
├── mockups/                              # Design mockup files (not deployed)
├── outputs/                              # Generated/iteration exports (not deployed)
├── review/                               # QA artifacts incl. breakpoints/ (not deployed)
├── visual_audit/                         # Design consistency checks (not deployed)
├── paper_screenshots/                    # Paper.design exports (not deployed)
├── exports/                              # Generic exports folder
└── node_modules/                         # npm (gitignored)
```

## Directory Purposes

**Shipped surface area (deployed to Vercel):**
- `homepage.html`, `our-story.html`, `faq.html` at root
- `collections/` — Collection pages (currently only `bars.html`)
- `products/` — PDPs (currently 3: pure-carob-bar, peppermint-moon, spiced-elixir)
- `brand_kit.css` (symlink), `shared.css`, `shared.js` at root
- `assets/brand_kit.css` (the real file the symlink points to)
- `assets/brand/`, `assets/hero/`, `assets/product_shots/`, `assets/lifestyle/`, `assets/textures/`, `assets/photography/`
- `vercel.json`, `.vercelignore`, `.gitignore`, `.vercel/`

**Dormant (in repo, excluded from deploy):**
- Shopify theme: `sections/`, `layout/`, `snippets/`, `templates/`, `locales/`, `config/`
- Prototype HTML: all `hero_v*.html`, `product_v*.html`, `triage*.html`, `client_review.html`, `review.html`, `mockup_maker.html`, `presentation.html`
- Python tooling: `*.py` root scripts, `tools/`
- Content source: `content/` (Markdown copy)
- QA artifacts: `mockups/`, `outputs/`, `review/`, `visual_audit/`, `paper_screenshots/`, `exports/`
- Dev server: `server.js`, `package.json`, `package-lock.json`
- Docs: `*.md` files, `homepage_backup.pdf`

**`assets/brand/`:**
- Purpose: Canonical brand identity + cert iconography for shipped pages.
- Contains: `maplemoon_logo.svg`, `carob_wordmark.svg`, `icon_additive_free.svg`, `icon_caffeine_free[_full].svg`, `icon_gluten_free[_full].svg`, `icon_made_in_aus[_full].svg`, `icon_no_artificial.svg`, `icon_organic[_full].svg`, `icon_vegan[_full].svg`, plus `brand_kit.css` (duplicate copy).
- Used by: All shipped pages (logo in header, icons in trust bar / PDP feature row).

**`assets/hero/`:**
- Purpose: Hero composition PNGs used by homepage + PDPs.
- Contains: `bar_pcar_hero[_b].png`, `bar_chilli_hero.png`, `bar_peppermint_hero.png`, `eclipse_coconut_hero.png`, `moon_pcar_hero_[a|b|c].png`, `moons_reuse.png`, `silhouette_001.png`, `silhouette_002.png`.

**`assets/product_shots/`:**
- Purpose: Product card imagery for collection grid + PDP thumbs.
- Contains: Shipped subset — e.g., `bar_pure_carob.webp`, `moon_peppermint.webp`, `bar_goji_coconut.webp`, `elixir_spiced.webp`. Also contains a large tail of legacy PNG renders and subfolders from photo iterations.
- Caveat: This directory mixes shipped and unshipped assets. Live HTML references only the specific filenames above; the rest travel along in the deploy (no path-level exclusion in `.vercelignore`).

**`assets/lifestyle/`:**
- Purpose: Lifestyle / ambient imagery for our-story and homepage.
- Contains: `botanical_closeup_00[1-2].png`, `gift_boxes_00[1-2].png`.

**`assets/textures/`:**
- Purpose: Background texture layers for dark-mode and warm sections.
- Contains: `blue_fog_00[1-2].png`, `marble_warm.jpg`, `wood_texture.jpg`.

**`sections/` (dormant Shopify):**
- Purpose: Staged Liquid sections for a future Shopify theme upload.
- Pattern: Each file is `section-<name>.liquid`, self-contained with inline `<style>`, `<script>`, and `{% schema %}`.
- Key files: `section-hero-evolved.liquid` (46KB), `section-product-main.liquid` (44KB).

**`layout/` (dormant):**
- Purpose: Shopify theme wrapper.
- Key file: `theme.liquid` (85 lines) — Standard Shopify theme layout with `content_for_header`, `content_for_layout`, and `sections 'header-group'` / `'footer-group'`.

**`content/`:**
- Purpose: Source-of-truth copy for pages. Manually curated Markdown used as reference when editing HTML.
- Key files: `hero_copy.md`, `product_descriptions.md`, `faq.md`, `about_page.md`, `meta_seo.md`.
- Excluded from deploy.

**`.planning/`:**
- Purpose: GSD workflow metadata.
- Subfolders: `codebase/` (7 analysis docs), `phases/phase-1-design-elevation/` (PLAN.md, RESEARCH.md, VERIFICATION.md), `research/`, `accepts/`.

**`.vercel/`:**
- Purpose: Vercel CLI project linkage.
- Contains: `project.json` with org + project IDs.

**`node_modules/`:**
- Purpose: Express 5 + ~30 transitive dev dependencies.
- Gitignored, `.vercelignore`'d.

## Key File Locations

**Entry Points (live site):**
- `homepage.html` — Canonical landing page. Nav logo + footer link here.
- `collections/bars.html` — Collection page, target of `/shop` redirect.
- `our-story.html` — Brand story.
- `faq.html` — FAQ; target of `/stockists` and `/contact` redirects.
- `products/pure-carob-bar.html`, `products/peppermint-moon.html`, `products/spiced-elixir.html` — Product detail pages.

**Design System:**
- `assets/brand_kit.css` — Canonical tokens (colors, spacing, typography, shadows, z-index, easing, breakpoints). Symlinked at root as `brand_kit.css` for dev convenience.
- `shared.css` — Cross-page component styles (header, nav, footer, cards, reveals). Always the second `<link rel="stylesheet">` on every shipped page.
- `shared.js` — Cross-page JS behaviours. Always loaded via `<script src="/shared.js">`.

**Deployment Config:**
- `vercel.json` — Redirects, CSP, cache headers, `buildCommand: ""`, `outputDirectory: "."`.
- `.vercelignore` — Excludes Liquid theme, Python scripts, prototype HTML, docs, `*.md`, `node_modules/`, `server.js`, review tools.
- `.vercel/project.json` — Vercel project linkage.

**Dev Server:**
- `server.js` — Express 5 on port 3005 with Liquid-strip preview route.
- `package.json` — `npm start` = `node server.js`.

**Dormant Shopify Theme:**
- `layout/theme.liquid` — Master wrapper.
- `sections/section-hero-evolved.liquid` — Primary hero.
- `sections/section-product-main.liquid` — PDP.
- `sections/section-header.liquid` + `section-footer.liquid` — Chrome.

## Naming Conventions

**Shipped HTML:**
- Pages: lowercase kebab-case (`our-story.html`, `pure-carob-bar.html`, `peppermint-moon.html`, `spiced-elixir.html`).
- Directories: lowercase plural (`collections/`, `products/`).
- All pages: `<html lang="en-AU">`, `<meta charset="UTF-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.

**Prototype HTML:**
- Hero variants: `hero_v{N}.html` (1-19) with suffixes for forks (`hero_v9_atmospheric.html`, `hero_v9_product.html`).
- Photo heroes: `hero_photo_{subject}.html` (atmospherics, byron_bay, gift_boxes, products, silhouettes).
- Product variants: `product_v{N}[suffix].html` (v2b, v7a, v9, v13, v19).

**Liquid (dormant):**
- Sections: `section-{component}.liquid` (kebab-case, matches Shopify convention).
- Snippets: `{component}.liquid`.
- Groups: `{role}-group.json` (e.g., `header-group.json`).

**Assets:**
- Product images: `{format}_{product}_{variant}.{ext}` (e.g., `bar_pure_carob.webp`, `moon_peppermint.webp`, `elixir_spiced.webp`).
- Hero imagery: `{product}_hero[_variant].png` or `hero_{subject}_{treatment}.jpg`.
- Icons: `icon_{purpose}[_full].svg` (matte + full-colour variants).
- Textures: `{material}[_{variant}].{ext}`.

**CSS:**
- Design tokens: `--mm-{scope}` (colors), `--space-{N}`, `--radius-{size}`, `--shadow-{size}`, `--ease-{style}`, `--bp-{breakpoint}`, `--fs-{size}`, `--lh-{purpose}`, `--z-{layer}`.
- Page-local palette extensions: `--warm-bg`, `--carob-warm`, `--carob-mid`, `--text-primary`, etc. — declared in each page's inline `<style>` + in `shared.css`.
- Component classes: kebab-case with BEM-ish modifiers where composition warrants it (`.site-header`, `.site-header.scrolled`, `.site-header.header-dark`, `.mobile-menu`, `.flavour-btn.active`).

**JavaScript:**
- `data-*` attributes in kebab-case (`data-nav-dark`, `data-parallax`, `data-pdp-main`, `data-pdp-thumb`, `data-flavour`, `data-cat`, `data-range`, `data-tab`).
- Functions / vars in camelCase (`setFlavour`, `setCategory`, `setRange`, `navActive`, `pdpMain`).
- All scripts wrapped in IIFE with `'use strict';`.

## Where to Add New Code

**New shipped page (e.g., a new collection or story page):**
1. Create file:
   - Top-level marketing page → `/{name}.html` at repo root.
   - Collection page → `/collections/{slug}.html`.
   - Product page → `/products/{slug}.html`.
2. Start from `homepage.html` or (for a darker palette) `products/spiced-elixir.html`.
3. Head must include (in order):
   ```html
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>... | MapleMoon</title>
   <meta name="description" content="...">
   <meta name="theme-color" content="#7B9DBF">
   <meta property="og:title" .../>
   <meta property="og:description" .../>
   <meta property="og:type" content="website">
   <meta property="og:image" content="/assets/...">
   <meta property="og:site_name" content="Maple Moon">
   <link rel="icon" href="/assets/brand/maplemoon_logo.svg" type="image/svg+xml">
   <link rel="apple-touch-icon" href="/assets/brand/maplemoon_logo.svg">
   <link rel="stylesheet" href="/brand_kit.css">
   <link rel="stylesheet" href="/shared.css">
   ```
4. Reuse the shared header + footer + mobile menu markup from an existing shipped page (copy verbatim).
5. Page-specific CSS goes in an inline `<style>` block after the two `<link>` tags.
6. Load `<script src="/shared.js"></script>` before `</body>`.
7. Add page-specific behaviour in a following `<script>` block wrapped in an IIFE.
8. If the page should redirect from a short path (`/shop`, `/stockists`, etc.), add to `vercel.json` `redirects`.

**New component pattern (header, footer, card):**
- Put shared CSS in `shared.css` (alphabetically/functionally grouped near related components).
- Keep page-specific overrides inline in the page.

**New design token:**
- Add to `assets/brand_kit.css` under the correct group (`--mm-*` for colors, `--space-*` for spacing, etc.).
- Never duplicate a hex in an inline style; always promote to a token if it appears more than once.

**New JS behaviour:**
- Cross-page → append to `shared.js` in a new guarded block (`if ('IntersectionObserver' in window)`, `if (elements.length)`).
- Page-specific → inline `<script>` in the page, wrapped in IIFE.
- Opt-in via `data-*` attributes so pages without the attribute are inert.

**New Shopify section (dormant track):**
- File: `sections/section-{name}.liquid`.
- Layout:
  ```liquid
  {%- comment -%}Description{%- endcomment -%}
  <style>/* Inline CSS, scoped via class prefix */</style>
  <!-- HTML with {{ section.settings.* }} + product/collection objects -->
  <script>(function(){ /* vanilla JS IIFE */ })();</script>
  {% schema %}{ "name": "...", "settings": [...] }{% endschema %}
  ```
- Load tokens via `{{ 'brand_kit.css' | asset_url | stylesheet_tag }}`.

**New shipped image:**
- Product PDP + card art → `assets/product_shots/{product}_{variant}.webp` (prefer WebP; include a PNG fallback only if needed).
- Hero composition → `assets/hero/{product}_hero[_variant].png`.
- Lifestyle/ambient → `assets/lifestyle/{subject}_{nnn}.png`.
- Texture/background → `assets/textures/{material}.{ext}`.
- Cert/trust icon → `assets/brand/icon_{purpose}[_full].svg`.
- Always declare `width`, `height`, `loading`, `decoding` on the `<img>` tag.

**New copy/content:**
- Source Markdown → `content/{page}.md` (canonical copy Carli/Nate can edit without touching HTML).
- Then propagate into the HTML page manually.

## Special Directories

**`brand_kit.css` symlink (root):**
- `brand_kit.css → assets/brand_kit.css`.
- Purpose: Let repo-root HTML link `brand_kit.css` without the `assets/` prefix during local dev.
- Live site: Pages link `/brand_kit.css` (which Vercel resolves through the symlink).
- Gotcha: If on Windows/CI that doesn't preserve symlinks, keep the real file at `assets/brand_kit.css` and fall back to linking `/assets/brand_kit.css`.

**`.planning/`:**
- Purpose: GSD workflow (phases, codebase docs, research, accepts). Not deployed.

**`.superpowers/`:**
- Purpose: Editor-local superpowers tooling. Gitignored.

**`node_modules/`:**
- Purpose: npm deps (Express 5 + transitives).
- Gitignored + `.vercelignore`'d. ~30 packages, all dev-only.

**`outputs/`, `mockups/`, `paper_screenshots/`, `review/`, `visual_audit/`, `exports/`:**
- Purpose: Design-process artifacts (iterations, client review, responsive tests, Paper exports).
- All excluded from deploy via `.vercelignore`.
- Kept in repo for design history and future reference.

**`assets/hero_shots/`, `assets/imagery/`, `assets/mood/`, `assets/stock/`, `assets/gemini/`, `assets/products*/`:**
- Purpose: Design-reference imagery and iteration archives.
- All excluded from deploy via `.vercelignore` (patterns: `assets/hero_shots/v9_gen/`, `assets/hero_shots/v9_source/`, `assets/hero_shots/moodboard/*.png`, `assets/hero_shots/*.png.bak`, `assets/moodboard/`, `assets/imagery/`).
- Note: `.vercelignore` patterns are partial — some files in these directories may still ship if paths don't match the ignore globs. Audit before adding high-volume binary assets.

---

*Structure analysis: 2026-04-18*
