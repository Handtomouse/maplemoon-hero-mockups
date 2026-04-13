# Codebase Structure

**Analysis Date:** 2026-04-13

## Directory Layout

```
maplemoon-website/
├── .planning/                          # GSD phase documentation
├── .vercel/                            # Vercel deployment metadata
├── assets/                             # All static assets (images, icons, CSS)
│   ├── brand_kit.css                   # Design tokens (colors, typography, spacing)
│   ├── product_shots/                  # Product photography
│   │   ├── bars/                       # Bar product images
│   │   ├── moons/                      # Moon product images
│   │   ├── bananas/                    # Banana product images
│   │   └── eclipse_bites/              # Eclipse Bites product images
│   ├── hero_shots/                     # Hero concept photography
│   │   ├── moodboard/                  # Reference imagery
│   │   ├── v9_gen/                     # Generated variants
│   │   └── v9_source/                  # Source files for v9 hero
│   ├── imagery/                        # Mockups and mood reference (Gemini)
│   ├── mood/                           # Brand mood photography
│   │   ├── brand_palette/
│   │   ├── flatlay_editorial/
│   │   └── hero_lifestyle/
│   ├── products/                       # Product mockup variants
│   ├── products_clean/                 # Cleaned product shots
│   ├── products_new/                   # New product line shots
│   ├── stock/                          # Stock image library
│   ├── gemini/                         # AI-generated mockup assets
│   ├── carob_wordmark.svg              # Logo/wordmark
│   ├── maplemoon_logo.svg              # Brand icon
│   └── *.svg, *.png                    # Trust badges, icons, brand assets
│
├── sections/                           # Shopify Liquid sections (18 files)
│   ├── section-hero-evolved.liquid     # Main hero for live store
│   ├── section-product-main.liquid     # Product page section
│   ├── section-testimonials.liquid     # Customer reviews
│   ├── section-education-split.liquid  # Brand story / education
│   ├── section-footer.liquid           # Footer content
│   ├── section-header.liquid           # Header/nav bar
│   ├── section-faq-accordion.liquid    # FAQ collapsibles
│   ├── section-blog.liquid             # Blog post list
│   ├── section-article.liquid          # Single article view
│   ├── section-product-grid.liquid     # Collection/shop grid
│   ├── section-list-collections.liquid # Collections list
│   ├── main-page.liquid                # Home page section
│   ├── section-cart.liquid             # Cart/checkout
│   ├── section-search.liquid           # Search results
│   ├── section-collection-main.liquid  # Collection detail
│   ├── section-404.liquid              # 404 error
│   ├── section-password.liquid         # Password-protected store
│   ├── footer-group.json               # Footer section group config
│   └── header-group.json               # Header section group config
│
├── layout/                             # Shopify theme layouts
│   ├── theme.liquid                    # Main HTML structure (all pages)
│   └── password.liquid                 # Password page layout
│
├── snippets/                           # Reusable Liquid components
│   └── trust-badges.liquid             # Certifications/badges display
│
├── locales/                            # Internationalization (en-AU)
│   └── *.json                          # Locale strings for live theme
│
├── content/                            # Content/copy files
│   ├── about_page.md                   # About page content
│   ├── faq.md                          # FAQ content
│   ├── hero_copy.md                    # Hero text variants
│   ├── meta_seo.md                     # SEO metadata
│   └── product_descriptions.md         # Product copy
│
├── config/                             # Theme configuration
│   └── *.json                          # Theme settings, API keys
│
├── templates/                          # Shopify template files (future)
│   └── (reserved for Shopify theme)
│
├── mockups/                            # Design mockup files
│   └── img/                            # Screenshots/comps
│
├── outputs/                            # Generated/exported files
│   └── round_*                         # Iteration versions
│
├── review/                             # Client review/feedback files
│   └── breakpoints/                    # Responsive design tests
│
├── tools/                              # Dev utilities
│   └── apply_moods.py                  # Image color/mood transformation
│
├── visual_audit/                       # Design consistency checks
│
├── paper_screenshots/                  # PDF/print reference
│
├── HTML Prototype Files (37 total):
│   ├── index.html                      # Gallery index (19 heroes + 5 products)
│   ├── hero_v1.html - hero_v19.html    # 18 hero concept variations
│   ├── hero_photo_*.html               # 5 photo-focused hero variants
│   ├── product_v2b.html                # Product variant 1
│   ├── product_v7a.html                # Product variant 2 (Light Educational)
│   ├── product_v9.html                 # Product variant 3 (Story Cards)
│   ├── product_v13.html                # Product variant 4
│   ├── product_v19.html                # Product variant 5
│   ├── client_review.html              # Client review/feedback tool
│   ├── mockup_maker.html               # Mockup generator utility
│   ├── presentation.html               # Pitch deck viewer
│   ├── triage.html                     # Internal triage tool
│   └── triage_paper.html               # Paper print triage
│
├── Configuration Files:
│   ├── package.json                    # Node dependencies (Express)
│   ├── package-lock.json               # Locked dependency versions
│   ├── vercel.json                     # Deployment config (redirects, headers, CSP)
│   ├── .vercelignore                   # Files to exclude from deploy
│   ├── .gitignore                      # Git ignore rules
│   ├── brand_kit.css → assets/brand_kit.css  # Symlink for convenience
│   └── HANDOFF.md, REVIEW_BRIEF.md    # Project documentation
│
└── server.js                           # Express dev server for Liquid preview
```

## Directory Purposes

**assets/:**
- Purpose: All media and design system tokens
- Contains: 2000+ image files (product shots, hero imagery, mood boards), brand_kit.css
- Key files: `brand_kit.css` (design tokens), `carob_wordmark.svg`, `maplemoon_logo.svg`, product PNG/WebP files
- Generated: Yes (product_shots, hero_shots generated from photo sessions; mood boards from brand work)
- Committed: Yes (all tracked in git except .gitignore'd backups)

**sections/:**
- Purpose: Shopify Liquid theme sections ready for store installation
- Contains: 18 self-contained sections with embedded CSS, JS, and schema
- Key files: `section-hero-evolved.liquid` (primary hero), `section-product-main.liquid` (product detail)
- Generated: No
- Committed: Yes

**layout/:**
- Purpose: Shopify theme global structure
- Contains: Main HTML boilerplate, theme wrapper
- Key files: `theme.liquid` (required - wraps all pages)
- Generated: No
- Committed: Yes

**content/:**
- Purpose: SEO copy, product descriptions, FAQ content
- Contains: Markdown files with reusable text
- Generated: No (manually written)
- Committed: Yes

**Root HTML Files (hero_v*.html, product_v*.html):**
- Purpose: Standalone prototype pages for client review and design exploration
- Generated: No (manually created)
- Committed: Yes

## Key File Locations

**Entry Points:**
- `index.html`: Gallery of all 19 hero concepts and 5 product pages; navigation hub
- `server.js`: Local development server (runs on port 3005)

**Design Tokens:**
- `assets/brand_kit.css`: Master CSS custom properties (colors, spacing, typography, shadows, animations)

**Hero Prototypes:**
- `hero_v1.html` through `hero_v19.html`: Full-screen hero concepts (18 variations)
- `hero_photo_*.html`: Photo-focused variants (5 files: atmospherics, byron_bay, gift_boxes, products, silhouettes)

**Product Prototypes:**
- `product_v2b.html` through `product_v19.html`: Product detail page variations (5 active prototypes)

**Shopify Theme Core:**
- `layout/theme.liquid`: Master HTML wrapper (required for all Shopify pages)
- `sections/section-hero-evolved.liquid`: Primary hero for live store
- `sections/section-product-main.liquid`: Product detail section (based on product_v7a.html)

**Shopify Configuration:**
- `config/settings_schema.json`: Theme customization UI (if exists)
- `locales/en.json`: English copy for theme admin

**Deployment:**
- `vercel.json`: Routing, headers, CSP rules
- `.vercelignore`: Files excluded from Vercel build

## Naming Conventions

**Files:**
- Hero files: `hero_v{N}.html` where N is 1–19 (version/iteration number)
- Photo heroes: `hero_photo_{subject}.html` (atmospherics, byron_bay, gift_boxes, products, silhouettes)
- Product files: `product_v{N}.html` or `product_v{N}{suffix}.html` (v2b, v7a, v9, v13, v19)
- Liquid sections: `section-{component}.liquid` (kebab-case, matches Shopify convention)
- Snippets: `{component}.liquid` (kebab-case, included via `{% render 'snippet-name' %}`)
- Locales: `{language}.json` (en-AU for Australian English, if used)

**Directories:**
- Asset categories: `assets/{plural_category}/` (product_shots, hero_shots, imagery, mood, products, products_clean, stock)
- Iterations: `outputs/round_{N}/` (round_2, round_3 — design evolution rounds)
- Testing: `review/breakpoints/` (responsive design testing)

**Classes (CSS):**
- BEM-inspired: `.component__element--modifier` (e.g., `.hero-evolved__greeting`, `.prod-main__hero`)
- Utility pattern: Inline styles preferred over classes; CSS variables used for tokens
- Page-specific: Single-letter prefixes in local `<style>` blocks (e.g., `.v9-overlay-origin` in product_v9.html)

**CSS Variables (brand_kit.css):**
- Colors: `--mm-{color-name}` (e.g., `--mm-navy`, `--mm-cream`, `--mm-blue-top`)
- Opacity variants: `--mm-{color}-{opacity}` (e.g., `--mm-cream-30`, `--mm-navy-50`)
- Spacing: `--space-{multiple}` (e.g., `--space-1` = 4px, `--space-4` = 16px)
- Typography: `--fs-{size}` (e.g., `--fs-base`, `--fs-3xl`), `--mm-sans`, `--mm-serif`
- Z-index: `--z-{layer}` (e.g., `--z-base`, `--z-fixed`, `--z-modal`)
- Animation: `--ease-{speed}` (e.g., `--ease-default`, `--ease-spring`)

## Where to Add New Code

**New Hero Concept:**
- File: `hero_v{next_number}.html` (e.g., `hero_v20.html`)
- Structure: Copy `hero_v19.html`, preserve `<link rel="stylesheet" href="brand_kit.css">`, maintain `prefers-reduced-motion` wrappers
- JavaScript: Use vanilla DOM APIs in IIFE blocks, no frameworks
- Styles: Leverage brand_kit.css variables, define page-specific custom properties in `:root`
- Test: Add link to `index.html` gallery section

**New Product Page Variant:**
- File: `product_v{next_version}.html`
- Structure: Two-column layout (gallery + info) recommended
- Tabs: Details, Ingredients, Reviews (CSS-driven via radio buttons, no JS framework)
- Forms: Use `<form>` for accessibility, JavaScript event listeners for interaction
- Styles: Reuse `--mm-*` tokens from brand_kit.css

**New Shopify Section:**
- File: `sections/section-{name}.liquid`
- Structure:
  ```liquid
  {%- comment -%}Description{% endcomment -%}
  <style>/* Inline CSS for this section only */</style>
  <!-- HTML markup -->
  <script>/* Vanilla JS, wrapped in IIFE */</script>
  {% schema %}{"name": "...", "settings": [...]}{% endschema %}
  ```
- Settings: Define in `schema` block for Shopify customization UI
- Styling: Include brand_kit.css via `{{ 'brand_kit.css' | asset_url | stylesheet_tag }}`
- Data: Use Liquid objects (product, collection, article) or section.settings fallbacks

**Utility Components:**
- Shared Liquid: `snippets/{name}.liquid` (e.g., `trust-badges.liquid`)
- Shared CSS: Add to `assets/brand_kit.css` if design-token related; otherwise inline in section
- Helper Functions: Store in `tools/` (Python scripts like `apply_moods.py`)

**Images/Assets:**
- Product shots: `assets/product_shots/{product_type}/` (e.g., `assets/product_shots/bars/`)
- Hero photos: `assets/hero_shots/` (organize by concept or round)
- Icons: `assets/` root level (name with `icon_` prefix, e.g., `icon_organic.svg`)
- Mood/reference: `assets/mood/{category}/`

**Documentation/Content:**
- Copy: `content/{page}.md` (one file per page or section)
- Metadata: `content/meta_seo.md` (SEO titles, descriptions, OG tags)
- FAQ: `content/faq.md` (structured for `section-faq-accordion.liquid`)

## Special Directories

**assets/products*, assets/stock:**
- Purpose: Archive/backup product photography and stock images
- Generated: Yes (from photo shoots and stock libraries)
- Committed: Selectively (unused assets may be .gitignore'd to reduce size)
- Note: Consider consolidation; multiple `products*` directories suggest iteration and cleanup opportunity

**outputs/round_*:**
- Purpose: Export/iteration snapshots from design process
- Generated: Yes (automated image generation from mood/tone scripts)
- Committed: Yes (but can be moved to archive after client approval)
- Note: Contains AI-generated variants referenced in HANDOFF.md

**review/, visual_audit/, paper_screenshots/:**
- Purpose: QA, testing, client review artifacts
- Generated: Yes (screenshots from local/staging testing)
- Committed: Some files (breakpoint tests, client review HTML)
- Note: Not deployed to Vercel (excluded in .vercelignore)

**mockups/, tools/, .superpowers/:**
- Purpose: Internal dev utilities and design automation
- Generated: Yes (from Python scripts, Figma exports)
- Committed: Partially (tools committed, outputs excluded)
- Note: `.superpowers/` is custom IDE/editor config, not deployed

**node_modules/:**
- Purpose: npm dependencies (Express only)
- Generated: Yes (via npm install)
- Committed: No (.gitignore'd)
- Size: Minimal (only Express dependency)

---

*Structure analysis: 2026-04-13*
