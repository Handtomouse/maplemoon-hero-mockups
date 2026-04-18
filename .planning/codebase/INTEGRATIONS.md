# External Integrations

**Analysis Date:** 2026-04-18

## APIs & External Services

**Form Handling:**
- Formspree — Referenced only in `client_review.html` (line 402) which is a review-only tool and is NOT deployed to Vercel (`.vercelignore` keeps review tooling out of prod).
  - Endpoint: `https://formspree.io/f/xgopagoy`
  - Auth: Public form ID, no server-side token.
  - CSP: `connect-src` whitelist in `vercel.json` keeps Formspree reachable from any page if re-enabled.
  - Live-site newsletter forms (on `homepage.html`, `our-story.html`, `faq.html`, `collections/bars.html`, `products/*.html`) are all `onsubmit="return false;"` inputs with NO backend wiring yet. They're visual stubs awaiting Carli's preferred ESP.

**Pinterest CDN:**
- `i.pinimg.com` — Referenced only in legacy prototype heroes (`hero_v9.html`, `hero_v9_atmospheric.html`, `hero_v9_product.html`). These are excluded from Vercel deploy via `.vercelignore`. Live pages do not hit Pinterest.
  - CSP: `img-src 'self' data: https://i.pinimg.com` still allows it if heroes ever ship.

**Analytics / Tag Managers:**
- None detected. No `gtag`, GA4, Plausible, Fathom, Umami, or GTM snippets on any shipped page.

**Error Tracking:**
- None. No Sentry/Rollbar/Datadog RUM configured.

## Data Storage

**Databases:**
- None. Live site is 100% static.
- Shopify theme assets in `sections/`, `templates/`, `config/` are staged for a future Shopify store install but are not connected to any backend at present.

**File Storage:**
- Local filesystem served as static by Vercel.
- Shipped media lives under:
  - `assets/brand/` — Logo, wordmark, 11 SVG trust/cert icons
  - `assets/hero/` — 11 PNG hero shots (bars, moons, elixirs, silhouettes)
  - `assets/photography/` — `refined/`, `refined_v2/`, `test_v2/` photo sets
  - `assets/lifestyle/` — Botanical + gift-box lifestyle PNGs
  - `assets/textures/` — Blue fog overlays, marble, wood
  - `assets/product_shots/` — Shipped product PNG/WebP used by PDPs and collection grid
- Prototype imagery (`assets/hero_shots/`, `assets/imagery/`, `assets/mood/`, `assets/products*`, `assets/stock/`, `assets/gemini/`) is excluded from deploy via `.vercelignore`.

**Caching (Vercel edge):**
Defined in `vercel.json`:
- `/assets/(.*)` — `public, max-age=86400, stale-while-revalidate=604800`
- `/(.*\.css)` — `public, max-age=86400, stale-while-revalidate=604800`
- Default HTML: Vercel's standard static cache (no explicit override).

## Authentication & Identity

**Auth Provider:**
- None. Public, read-only marketing site. No login, no accounts, no gated content.

## Monitoring & Observability

**Error Tracking:** Not configured.

**Logs:**
- Dev: Express `console.log` from `server.js`.
- Prod: Vercel dashboard access logs + whatever Vercel Analytics the project has enabled at the platform layer (no client SDK embedded).

## CI/CD & Deployment

**Hosting:**
- Vercel static deployment
- Project ID: `prj_Xi236fWvZIAF38dYsCwTtboXZRV2`
- Org ID: `team_385xEDn7YomEO2eo5pHTp3px`
- Project name: `maplemoon-website`
- Live URL: `maplemoon-website.vercel.app` (v1.0 shipped 2026-04-16)
- Config: `.vercel/project.json`

**CI Pipeline:**
- Git push to the tracked branch triggers a Vercel build.
- No custom `buildCommand` (empty string). Vercel treats the repo root as the output directory.
- No GitHub Actions, no Playwright/Jest/Cypress smoke tests gating deploy.

**Deployment Config:**
- `vercel.json`:
  - `buildCommand`: "" (static only)
  - `outputDirectory`: "." (serve repo root)
  - Redirects:
    - `/shop` → `/collections/bars.html` (302)
    - `/stockists` → `/faq.html` (302)
    - `/recipes` → `/homepage.html` (302)
    - `/contact` → `/faq.html` (302)
    - `/ingredients` → `/homepage.html` (302)
- `.vercelignore` excludes Liquid theme, Python tools, prototype heroes, `*.md` docs, `node_modules/`, `server.js`, `package*.json`.

## Environment Configuration

**Required env vars:** None. Repo has no `.env*` files.

**Secrets location:** None in repo. Vercel project-level secrets (if any) are managed in the Vercel dashboard, not checked in.

## Webhooks & Callbacks

**Incoming:**
- Formspree → email hook (review tool only, not live site).

**Outgoing:**
- None. Shipped HTML contains zero `fetch()` / `XMLHttpRequest` calls to external hosts.

## Security Headers (via `vercel.json`)

**Content-Security-Policy:**
```
default-src 'self';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' data: https://i.pinimg.com;
script-src 'self' 'unsafe-inline';
connect-src 'self' https://formspree.io;
frame-src 'self'
```

**Additional headers (applied to `/(.*)`):**
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

## Future Integration Hooks (staged, not wired)

- Shopify Admin API — When `layout/theme.liquid` + `sections/*.liquid` are uploaded to a Shopify store, product objects, cart AJAX (`/cart/add.js`), and checkout will activate.
- Adobe Fonts (Typekit) — `layout/theme.liquid` line 20 has a commented-out `<link rel="stylesheet" href="https://use.typekit.net/XXXXXXX.css">` placeholder for Carli's kit.
- Newsletter ESP — Every shipped page's `<form class="newsletter-form">` is a visual stub; destination (Klaviyo/Mailchimp/Shopify Email) is TBD.

---

*Integration audit: 2026-04-18*
