# Architecture

**Analysis Date:** 2026-04-13

## Pattern Overview

**Overall:** Static HTML prototyping with Shopify Liquid theme sections

**Key Characteristics:**
- No runtime framework (vanilla HTML/CSS/JS)
- CSS-in-HTML inline styles with brand_kit.css as design token source
- Vanilla JavaScript for interactivity (DOM manipulation, event listeners)
- Shopify Liquid sections prepared for future theme installation
- Design-first: prototype variants explored before theme coding
- Stateless - all state managed via CSS/form inputs, no JS state management

## Layers

**Presentation Layer (Static HTML):**
- Purpose: Display hero concepts, product pages, and design variants
- Location: Root-level HTML files (`/hero_v*.html`, `/product_v*.html`, `/index.html`)
- Contains: Complete self-contained pages with inline styles and scripts
- Depends on: CSS variables from `brand_kit.css`, browser DOM APIs
- Used by: Browser clients, Vercel static hosting

**Design Token System (brand_kit.css):**
- Purpose: Single source of truth for colors, typography, spacing, shadows, z-index, animations, breakpoints
- Location: `assets/brand_kit.css` (symlinked from root as `brand_kit.css`)
- Contains: CSS custom properties (--mm-*, --space-*, --radius-*, --shadow-*, --ease-*, --bp-*, --fs-*)
- Depends on: None
- Used by: All HTML files, Liquid sections via `{{ 'brand_kit.css' | asset_url }}`

**Shopify Liquid Theme (sections/):**
- Purpose: Reusable, configurable sections for live Shopify store
- Location: `sections/` (18 .liquid files), `layout/`, `snippets/`, `locales/`, `templates/`
- Contains: Liquid template syntax with embedded CSS/JS, schema for section settings
- Depends on: Shopify product object, brand_kit.css, Adobe Fonts
- Used by: Shopify theme installation on live store

**Static Assets:**
- Purpose: Images, icons, brand materials
- Location: `assets/` (9 subdirectories)
- Contains: Product shots (bars, moons, bananas, eclipse_bites), hero photography, mood boards, SVG icons
- Depends on: None
- Used by: HTML files, Liquid sections via asset_url

**Content/Data Files:**
- Purpose: SEO metadata, product descriptions, FAQs, copy
- Location: `content/` (Markdown files), `config/` (theme settings)
- Contains: Reusable text blocks, meta information
- Depends on: None
- Used by: HTML templates during development, Shopify admin during theme installation

**Development Server:**
- Purpose: Preview Liquid sections as HTML by stripping Liquid syntax
- Location: `server.js`
- Contains: Express routes for `/`, static file serving, Liquid-to-HTML conversion
- Depends on: Node.js, Express 5.2.1
- Used by: Local development workflow

## Data Flow

**Static HTML Preview (Development):**

1. Browser requests `/hero_v1.html`
2. Vercel/Express serves HTML file with inline styles and scripts
3. Browser parses HTML, loads `brand_kit.css` via link tag
4. CSS variables are applied to all elements
5. JavaScript in `<script>` tags runs (menu toggle, scroll effects, animations)
6. Browser renders fully styled, interactive page

**Liquid Section Preview (Development):**

1. Browser requests `/sections/section-hero-evolved.liquid`
2. Express route catches request, reads .liquid file
3. Regex patterns strip Liquid syntax (if/for/assign/etc.)
4. Regex replaces `{{ variable }}` with empty strings
5. Returns cleaned HTML wrapped in minimal theme structure
6. Browser displays section without Liquid-specific data

**Liquid Section on Live Store (Future):**

1. Shopify renders theme.liquid layout
2. `{{ content_for_layout }}` injects product/collection/article content
3. Sections reference `{{ section.settings.*}}` for user-configured values
4. Liquid variables (product.price, product.images, etc.) populate from database
5. CSS and JS run in browser as normal
6. Form 'product' submits to /cart/add.js for AJAX cart updates

## Key Abstractions

**Brand Kit Variables:**
- Purpose: Maintain design consistency across all variants and future theme
- Examples: `--mm-navy`, `--mm-cream`, `--space-4`, `--radius-md`, `--shadow-lg`, `--ease-spring`
- Pattern: CSS custom properties defined in `:root` scope in `brand_kit.css`, consumed via `var(--mm-*)` in inline styles

**Hero Concepts:**
- Purpose: Test different visual narratives (18 variations)
- Examples: `hero_v1.html` (brand statement), `hero_v9.html` (product story cards), `hero_photo_*.html` (photo-focused)
- Pattern: Each file is standalone with self-contained CSS and JS, can evolve independently

**Product Page Variants:**
- Purpose: Explore different product layouts and information hierarchy (5 variants)
- Examples: `product_v7a.html` (split layout: gallery + info), `product_v9.html` (story cards)
- Pattern: Share CSS structure via brand_kit.css but vary content layout and interaction patterns

**Section-Level Components (Liquid):**
- Purpose: Modular, configurable content blocks for Shopify store
- Examples: `section-hero-evolved.liquid`, `section-product-main.liquid`, `section-testimonials.liquid`
- Pattern: Each section has inline `<style>` block, `<script>` for interactivity, and `{% schema %}` for settings UI

## Entry Points

**For Static HTML Prototypes:**
- Location: `index.html`
- Triggers: Browser navigation to `/` or root URL
- Responsibilities: Gallery of hero concepts and product pages; links to individual hero_v*.html pages

**For Hero Concepts:**
- Location: `hero_v1.html` through `hero_v19.html` (plus photo variants)
- Triggers: Direct URL navigation or click from index.html
- Responsibilities: Full-screen hero visual with headline, product imagery, CTAs, mobile menu

**For Product Pages:**
- Location: `product_v2b.html`, `product_v7a.html`, `product_v9.html`, `product_v13.html`, `product_v19.html`
- Triggers: Click "Shop" CTA or direct URL
- Responsibilities: Product info, image gallery, variant selector, add-to-cart, tabs (details/ingredients/reviews)

**For Shopify Theme (Future):**
- Location: `layout/theme.liquid`
- Triggers: Shopify theme installation and store access
- Responsibilities: Global HTML structure, header/footer group rendering, main content injection

## Error Handling

**Strategy:** Graceful degradation for missing/stale images; no error UI

**Patterns:**
- Image `src` fallbacks: WebP with PNG fallback (e.g., `bar_pure_carob.webp` with implied `.png`)
- CSS fallback fonts: Custom fonts with system font stacks (`'Neue Haas Grotesk Display Pro', 'Inter', 'Helvetica Neue', sans-serif`)
- JavaScript errors don't break page: Menu toggle, scroll effects wrapped in IIFE, no global error handlers

## Cross-Cutting Concerns

**Accessibility:**
- Semantic HTML5 (article, section, nav, main, etc.)
- Skip-to-content link in theme.liquid
- ARIA labels and roles in interactive components
- Mobile menu keyboard accessible (checkbox + label pattern)
- Focus styles defined (outline: 2px solid)

**Responsive Design:**
- Mobile-first CSS architecture
- Breakpoints defined in brand_kit.css: `--bp-mobile: 480px`, `--bp-tablet: 768px`, `--bp-desktop: 1024px`
- SVG icons scale with viewport
- `safe-area-inset-*` for notch/home-indicator spacing on mobile
- Touch-friendly hit targets (min 44px × 44px for buttons)

**Performance:**
- Static file serving (no database queries)
- Image optimization via WebP + fallback PNG
- CSS variables eliminate style duplication
- Lazy loading possible (not yet implemented)
- Link prefetch for commonly accessed pages

**Motion & Accessibility:**
- All animations wrapped in `@media (prefers-reduced-motion: no-preference)`
- Reduced motion media query disables all transitions/animations
- Scroll behavior respects user preference (smooth if enabled, auto if reduced)

**Internationalization:**
- `lang="en-AU"` on all pages (Australian English)
- Locale file structure in place (`locales/`) for future Shopify theme
- No dynamic language switching in prototypes

---

*Architecture analysis: 2026-04-13*
