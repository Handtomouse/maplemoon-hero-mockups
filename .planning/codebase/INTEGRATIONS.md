# External Integrations

**Analysis Date:** 2026-04-13

## APIs & External Services

**Form Handling:**
- Formspree - Contact form submissions
  - Endpoint: `https://formspree.io`
  - Auth: Form-based (no explicit token needed)
  - CSP: Allowed in vercel.json header

**Social/Third-party:**
- Pinterest - Image embeds in hero sections
  - CDN: `https://i.pinimg.com`
  - Auth: None
  - CSP: Image source allowed

## Data Storage

**Databases:**
- None - Static content only during prototype phase
- Shopify admin API available when theme is installed (not currently used in static deployment)

**File Storage:**
- Local filesystem only
- Assets served from `/assets/` directory via Vercel static hosting
- Product shots: `assets/product_shots/` (4 subdirectories: bananas, bars, eclipse_bites, moons)
- Hero imagery: `assets/hero_shots/` (50+ images)
- Brand assets: `assets/imagery/` (Gemini mockups and mood boards)

**Caching:**
- Browser caching configured in vercel.json:
  - `/assets/*`: 24hr cache + 7-day stale-while-revalidate
  - `/*.css`: 24hr cache + 7-day stale-while-revalidate

## Authentication & Identity

**Auth Provider:**
- Custom (form-based only)
- No user authentication layer
- Shopify admin auth required when theme is installed on Shopify store

## Monitoring & Observability

**Error Tracking:**
- None configured

**Logs:**
- Server logs only during local development (Express output to console)
- Vercel analytics available via dashboard

## CI/CD & Deployment

**Hosting:**
- Vercel (Static deployment)
- Project ID: `prj_Xi236fWvZIAF38dYsCwTtboXZRV2`
- Org ID: `team_385xEDn7YomEO2eo5pHTp3px`
- Project name: `maplemoon-website`

**CI Pipeline:**
- Git-based auto-deploy (push to branch triggers Vercel build)
- No custom build command
- Redirects to index.html for SPA-like navigation

**Deployment Config:**
- `vercel.json` controls routing and headers
- `.vercelignore` excludes non-essential files
- buildCommand: "" (empty - static only)
- outputDirectory: "." (entire project root)

## Environment Configuration

**Required env vars:**
- None for static deployment
- When moving to live Shopify store: Shopify API keys (in theme admin settings)

**Secrets location:**
- No secrets file tracked
- `.vercelignore` excludes: `*.py`, `*.md`, `server.js`, `package*.json`, internal tools/sections

## Webhooks & Callbacks

**Incoming:**
- Formspree webhook → email (contact form submissions)

**Outgoing:**
- None configured in static deployment
- Shopify theme can trigger cart:updated event for custom integrations

## Security & Headers

**Vercel CSP (Content-Security-Policy):**
```
default-src 'self'
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com
font-src 'self' https://fonts.gstatic.com
img-src 'self' data: https://i.pinimg.com
script-src 'self' 'unsafe-inline'
connect-src 'self' https://formspree.io
frame-src 'self'
```

**Additional headers:**
- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN
- Referrer-Policy: strict-origin-when-cross-origin
- Strict-Transport-Security: max-age=31536000; includeSubDomains
- Permissions-Policy: camera=(), microphone=(), geolocation=()

---

*Integration audit: 2026-04-13*
