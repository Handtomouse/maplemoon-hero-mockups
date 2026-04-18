# Architecture

**Analysis Date:** 2026-04-18

## Pattern Overview

**Overall:** Hand-authored multi-page static site (MPA) with a shared CSS/JS kit. V7+V11 fusion design system. Shopify Liquid theme staged alongside but not yet connected.

**Key Characteristics:**
- Zero-framework production. No bundler, no transpiler, no hydration. Every shipped page is a standalone HTML file that links two stylesheets and one script.
- Two-layer CSS: tokens (`assets/brand_kit.css`) + shared components (`shared.css`), with per-page inline `<style>` blocks for page-specific composition.
- Single shared vanilla-JS controller (`shared.js`, IIFE) handles cross-page behaviours (menu, scroll, reveals, parallax, nav dark-mode, PDP thumbs).
- Page-local `<script>` blocks handle page-unique interactions (homepage flavour picker, collection filters, PDP tabs).
- Warm carob palette on product/bar surfaces, dark `elixir-mode` palette on elixir surfaces, toggled by `body.dark-page` or runtime `header-dark` class.
- No client-side state store. All state is DOM-derived (active class, data-attributes, form inputs).
- Shopify Liquid in `sections/` + `layout/` + `templates/` is a separate, dormant track: staged for a future Shopify migration, served via `server.js` in dev only.

## Layers

**Shipped Static HTML (Presentation):**
- Purpose: Deliver the live marketing site.
- Location: Repo root + `collections/` + `products/`.
- Files:
  - `homepage.html` (1742 lines) — Primary landing page, V7+V11 fused.
  - `our-story.html` (315 lines) — Brand story / about page.
  - `faq.html` (287 lines) — FAQ accordion.
  - `collections/bars.html` (236 lines) — Bars collection grid.
  - `products/pure-carob-bar.html` (402 lines) — PDP with tabbed details.
  - `products/peppermint-moon.html` (397 lines) — PDP.
  - `products/spiced-elixir.html` (422 lines) — Dark-mode PDP (`body.dark-page`).
- Depends on: `brand_kit.css`, `shared.css`, `shared.js`, `assets/brand/*`, `assets/hero/*`, `assets/product_shots/*`, `assets/lifestyle/*`, `assets/textures/*`.
- Served by: Vercel static hosting.

**Design Token Layer:**
- Purpose: Single source of truth for colors, spacing, typography, shadows, z-index, easing, breakpoints.
- Location: `assets/brand_kit.css` (340 lines), symlinked at repo root as `brand_kit.css`.
- Contains: `--mm-*` (colors + alpha variants), `--space-1..16`, `--radius-*`, `--shadow-*`, `--ease-*`, `--lh-*`, `--bp-*`, `--fs-*`, `--mm-serif`, `--mm-sans`.
- Depends on: Nothing.
- Used by: Every shipped HTML page, every Liquid section, `shared.css`.

**Shared Component Layer:**
- Purpose: Cross-page UI that must look identical everywhere (header, nav, footer, trust bar, product cards, reveal animations).
- Location: `shared.css` (736 lines).
- Contains: `.site-header`, `.header-nav`, `.hamburger`, `.mobile-menu`, `.product-card`, `.fade-up`/`.reveal`, scroll/blur states, dark-header variants, reduced-motion fallbacks, `@supports` fallback for browsers without `backdrop-filter`.
- Depends on: `brand_kit.css` tokens.
- Used by: Every shipped HTML page (always the 2nd stylesheet link).

**Shared JS Controller:**
- Purpose: Wire cross-page behaviours with no framework overhead.
- Location: `shared.js` (143 lines, IIFE).
- Responsibilities:
  1. Mobile menu toggle (checkbox + label + `inert` attribute, focus-return on close).
  2. Header scroll state (`.scrolled` after 40px).
  3. IntersectionObserver reveals (`.fade-up`, `.reveal`, threshold 0.15, rootMargin `0px 0px -40px 0px`).
  4. Nav dark-mode observer (`[data-nav-dark="true"]` sections trigger `.header-dark`; ratio >= 0.5, rootMargin `-10% 0px -10% 0px` to prevent thrash).
  5. Parallax (`[data-parallax]`, `translate3d`, rAF, skipped under `prefers-reduced-motion: reduce`).
  6. PDP gallery thumb swap (`[data-pdp-thumb]` click → crossfade into `[data-pdp-main]`).
  7. Smooth-scroll for `a[href^="#"]`.
- Depends on: Browser IntersectionObserver + matchMedia APIs.
- Used by: Every shipped page via `<script src="/shared.js">` (some pages `defer`).

**Per-Page Inline Scripts:**
- Purpose: Page-unique behaviour that doesn't belong in the shared controller.
- Examples:
  - `homepage.html` lines 1547-1736 — Hero category tabs (bars/moons/bites/elixirs), flavour pill picker with tagline/CTA swap, range grid filter, elixir dark-mode toggle, arrow-key tab nav.
  - `products/pure-carob-bar.html` lines 383-398 — PDP tab switcher.
- Pattern: All wrapped in IIFE, use `data-*` attributes for state keys, vanilla DOM APIs.

**Static Assets (Shipped):**
- `assets/brand/` — 11 SVG cert/trust icons, wordmark, logo.
- `assets/hero/` — 11 PNG hero compositions.
- `assets/product_shots/` — PNG + WebP product renders (referenced by collection + PDPs).
- `assets/lifestyle/` — Botanical + gift-box PNGs.
- `assets/textures/` — Blue fog, marble, wood backgrounds.
- `assets/photography/` — `refined/`, `refined_v2/`, `test_v2/` selects.

**Dormant: Shopify Liquid Theme:**
- Purpose: Drop-in Shopify theme for when Carli moves MapleMoon to Shopify.
- Location: `layout/theme.liquid`, `sections/*.liquid` (18 sections), `snippets/trust-badges.liquid`, `templates/*.json` + `gift_card.liquid`, `locales/en.default.json`, `config/settings_*.json`.
- Not deployed: `.vercelignore` excludes all of these.
- Entry point: `layout/theme.liquid` (85 lines) wraps `{{ content_for_layout }}` with `header-group` + `footer-group`.

**Dormant: Prototype HTML:**
- 19 hero variants (`hero_v1.html`..`hero_v19.html`), 5 photo-hero variants, 5 product-page variants (`product_v2b.html`, `product_v7a.html`, `product_v9.html`, `product_v13.html`, `product_v19.html`), plus `index.html` gallery, `mockup_maker.html`, `presentation.html`, `triage*.html`, `client_review.html`, `review.html`.
- All excluded from Vercel deploy. Kept in repo for Paper/design reference.

**Dev Server:**
- Purpose: Preview raw Liquid sections as HTML in a browser by regex-stripping Liquid syntax.
- Location: `server.js` (28 lines, Express 5.2.1).
- Route: `GET /sections/:file.liquid` → strips `{% ... %}` and `{{ ... }}`, wraps in minimal `<html>` shell, links `/brand_kit.css`.
- Static middleware: `express.static(__dirname)` serves everything else.
- Port: 3005.

## Data Flow

**Live Request (production):**

1. Browser requests `maplemoon-website.vercel.app/homepage.html` (or a `/shop`/`/stockists`/etc. redirect resolves to a canonical HTML path per `vercel.json`).
2. Vercel edge serves the HTML file with security headers + CSP applied.
3. Browser parses HTML, fetches `/brand_kit.css` + `/shared.css` (cached 24h + SWR 7d).
4. Browser renders with tokens + shared styles + inline page styles.
5. Browser loads `/shared.js`, runs IIFE once DOM is ready.
6. IntersectionObserver and scroll listeners attach; `.fade-up` elements become `.visible` as they enter viewport.
7. Page-specific inline `<script>` wires homepage flavour picker / PDP tabs / collection filters.
8. Navigation: header `<a>` tags hard-link to other HTML files (MPA, no SPA routing).

**Homepage Flavour Picker Flow:**

1. User clicks a `.hero-cat-btn` (bars/moons/bites/elixirs).
2. Inline JS calls `setCategory(cat)`.
3. Non-matching `.flavour-btn` pills get `display:none`; matching pills stay visible.
4. Elixir category triggers `heroSection.classList.add('elixir-mode')` + `header.classList.add('header-dark')` (manual; separate from the IntersectionObserver-driven `data-nav-dark` path).
5. `setFlavour(categoryDefaults[cat])` updates tagline text, CTA label, and swaps which `.product-display img` has `.active`.

**PDP Thumb Swap (shared.js):**

1. User clicks `[data-pdp-thumb]`.
2. `shared.js` reads `data-src` (or nested `<img>` src), fades `[data-pdp-main]` opacity to 0 (400ms).
3. `setTimeout` swaps `pdpMain.src`, fades opacity back to 1.
4. `.is-active` class moves to the clicked thumb.

**Nav Dark-Mode (shared.js):**

1. Sections on the page marked `data-nav-dark="true"` are observed.
2. When >=50% of a dark section is in view, an internal counter increments; when it leaves, counter decrements.
3. `#site-header` toggles `.header-dark` whenever `counter > 0`.
4. `rootMargin: '-10% 0px -10% 0px'` prevents boundary thrash.
5. Alternative: `body.dark-page` (used on `products/spiced-elixir.html`) forces dark header from first paint without observer.

**Dev Request (Liquid preview):**

1. `npm start` → `node server.js` on port 3005.
2. Browser hits `http://localhost:3005/sections/section-hero-evolved.liquid`.
3. Express route reads file, applies ~8 regex strips to remove Liquid tags.
4. Response: minimal HTML shell + stripped body + `<link rel="stylesheet" href="/brand_kit.css">`.
5. Static middleware handles every other path (HTML prototypes, assets, CSS).

## Key Abstractions

**Design Tokens (`--mm-*` family):**
- Purpose: Consistent palette + motion + spacing across every page and every Liquid section.
- Canonical file: `assets/brand_kit.css` (`:root` block, lines 9-80+).
- Pattern: Consume via `var(--mm-navy)`, `var(--space-4)`, `var(--ease-spring)`, etc. Opacity variants pre-baked (`--mm-cream-30`, `--mm-navy-50`) to avoid repeated `rgba()` math.
- Local extensions: `homepage.html` (lines 38-53) and `shared.css` (lines 8-26) both declare a warm palette over the base tokens (`--warm-bg`, `--carob-warm`, `--text-primary`, etc.) — a page-specific second token layer.

**Dark-Mode Switch:**
- Purpose: Flip header + backgrounds between warm (bars/moons/bites) and dark carob-green (elixirs) without duplicating markup.
- Triggers:
  - `body.dark-page` — Set in HTML, forces dark palette from first paint. Used on `products/spiced-elixir.html`.
  - `.site-header.header-dark` — Runtime class applied either by homepage flavour picker (manual) or by `shared.js` nav-dark observer (automatic).
- Implementation: `shared.css` lines 68-91 and homepage inline styles define `.header-dark` + `body.dark-page` variants of every header element.

**Data-Attribute Contracts:**
- `data-nav-dark="true"` — Section opts into IntersectionObserver that flips header.
- `data-parallax="<speed>"` — Element receives `translate3d` parallax (skipped under reduced motion).
- `data-pdp-main` / `data-pdp-thumb` / `data-src` — PDP gallery protocol.
- `data-cat` / `data-flavour` / `data-range` — Homepage picker + collection filter keys.
- `data-tab` — PDP tab switcher (inline script).
- Pattern: All behaviour is opt-in via data-attributes. Pages without them are ignored by `shared.js`.

**Newsletter Form Stubs:**
- Every shipped page has `<form class="newsletter-form" onsubmit="return false;">` with an email input + submit. No backend wired. Visual placeholder only.

## Entry Points

**Live Site:**
- `/` → Vercel default → `index.html` (prototype gallery). Note: `index.html` is NOT in `.vercelignore`, so it ships, but all practical entry points are the page-specific HTML files.
- `/homepage.html` — Canonical landing page. Nav logo links here.
- `/collections/bars.html` — Collection grid; also the target of `/shop` redirect.
- `/our-story.html` — Brand story.
- `/faq.html` — FAQ; also target of `/stockists` and `/contact` redirects.
- `/products/pure-carob-bar.html`, `/products/peppermint-moon.html`, `/products/spiced-elixir.html` — PDPs.

**Redirects (from `vercel.json`):**
- `/shop` → `/collections/bars.html`
- `/stockists` → `/faq.html`
- `/recipes` → `/homepage.html`
- `/contact` → `/faq.html`
- `/ingredients` → `/homepage.html`

**Local Dev:**
- `server.js` → `http://localhost:3005/` (redirects to `/index.html`).
- `http://localhost:3005/sections/<name>.liquid` — Liquid preview route.

**Future Shopify Theme:**
- `layout/theme.liquid` — Would become the master wrapper once uploaded to a Shopify store.

## Error Handling

**Strategy:** Graceful degradation. No error UI, no logging.

**Patterns:**
- Image sources fall back PNG ← WebP (where both exist in `assets/product_shots/`); HTML typically references `.webp` directly, relying on browsers shipping in 2026 to support WebP universally.
- Custom fonts fall back: `'Neue Haas Grotesk Display Pro', 'Inter', 'Helvetica Neue', sans-serif` on every page (Typekit kit not actually embedded).
- `shared.js` guards every selector with `if (toggle && menu && hamburger)` / `if ('IntersectionObserver' in window)` so missing DOM doesn't throw.
- Reduced-motion: `window.matchMedia('(prefers-reduced-motion: reduce)')` disables parallax and smooth-scroll entirely.
- `@supports not (backdrop-filter)` fallback in `shared.css` lines 51-60 swaps to opaque header background for old Firefox.

## Cross-Cutting Concerns

**Accessibility:**
- `lang="en-AU"` on every shipped page.
- Skip-link on each page (`a.skip-link` → `#main`).
- Mobile menu uses `<input type="checkbox"> + <label>` pattern with ARIA (`aria-hidden`, `aria-expanded`), `inert` attribute, and focus-return to hamburger on close.
- Semantic HTML (`<header>`, `<main>`, `<footer>`, `<nav>`, `<article>`, `<section>`).
- Hamburger is a 44×44px hit target.
- Focus styles: `outline: 2px solid` visible (`theme.liquid` line 62 + shared.css).
- Arrow-key tab navigation on homepage hero category tabs.

**Responsive Design:**
- Mobile-first inline CSS + `brand_kit.css` breakpoints: `--bp-mobile: 480px`, `--bp-tablet: 768px`, `--bp-desktop: 1024px`.
- `meta viewport` with `width=device-width, initial-scale=1.0` on every page.
- `safe-area-inset-*` used on mobile menu (via shared.css).
- All images declare `width`/`height` for CLS prevention.
- `loading="lazy"` on below-the-fold imagery; `loading="eager" decoding="async"` on hero + logo.

**Performance:**
- Zero JS dependencies in production.
- Two CSS files + one JS file per page, all ~20KB uncompressed combined.
- Assets cached 24h at edge + 7d stale-while-revalidate.
- IntersectionObserver used instead of scroll listeners where possible.
- Parallax uses `requestAnimationFrame` + single-flag ticking.

**Motion & Accessibility:**
- All animations wrapped under `@media (prefers-reduced-motion: no-preference)` in CSS.
- `shared.js` parallax is skipped entirely if user prefers reduced motion.
- `html { scroll-behavior: smooth }` paired with `@media (prefers-reduced-motion: reduce) { scroll-behavior: auto }`.

**SEO / Social:**
- OG tags on every shipped page (`og:title`, `og:description`, `og:type`, `og:image`, `og:site_name`).
- `meta description` per page.
- `theme-color: #7B9DBF` for mobile browser chrome.
- Favicon + apple-touch-icon both use `assets/brand/maplemoon_logo.svg`.

**Security:**
- CSP (see INTEGRATIONS.md) restricts scripts to self + inline, images to self + data + Pinterest.
- HSTS 1 year + includeSubDomains.
- `X-Frame-Options: SAMEORIGIN` (also enforced by CSP `frame-src 'self'`).
- Permissions-Policy denies camera/mic/geolocation.

**Internationalization:**
- `lang="en-AU"` everywhere. Copy is Australian English.
- `locales/en.default.json` exists for future Shopify theme; not used by live site.

---

*Architecture analysis: 2026-04-18*
