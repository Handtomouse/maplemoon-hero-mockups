# Technology Stack

**Analysis Date:** 2026-04-18

## Languages

**Primary:**
- HTML5 — Hand-authored static pages (shipped: `homepage.html`, `our-story.html`, `faq.html`, `collections/bars.html`, `products/*.html`)
- CSS3 — Design tokens + shared component styles + per-page inline `<style>` blocks
- JavaScript (ES5 vanilla, IIFE-wrapped) — Client-side interactivity in `shared.js` and inline `<script>` blocks

**Secondary:**
- Shopify Liquid — Theme templates staged in `sections/`, `layout/`, `snippets/`, `templates/`, `locales/`, `config/` for future migration to a Shopify store. Not part of the live Vercel deployment.
- Python 3 — Dev-only asset tooling (`apply_moods.py`, `place_stock.py`, `tools/composite_hero.py`). Excluded from deploy via `.vercelignore`.

## Runtime

**Production (Vercel):**
- Static file hosting — No Node.js runtime on the edge. Files are served as-is from project root.

**Development (local):**
- Node.js (any 18+) — Runs `server.js` (Express) on port 3005 to preview raw Liquid sections as stripped HTML.

**Package Manager:**
- npm
- Lockfile: `package-lock.json` present (committed).

## Frameworks

**Core (production):**
- None. Live site is hand-written HTML/CSS/JS. No bundler, no transpiler, no component framework.

**Core (dev only):**
- Express 5.2.1 — Only runs in `server.js` for local Liquid preview. Never deployed (`.vercelignore` excludes `server.js` and `package*.json`).

**Testing:**
- Not detected. No Jest/Vitest/Playwright config in the repo.

**Build/Dev:**
- No build step. `vercel.json` declares `"buildCommand": ""` and `"outputDirectory": "."`. Files ship as-authored.

## Key Dependencies

**Production:**
- None. The deployed site has zero JavaScript dependencies.

**Development:**
- `express` ^5.2.1 (`package.json`) — Pulls in ~30 transitive packages (see `node_modules/`: accepts, body-parser, cookie, debug, etc.). None touch production.

**Infrastructure:**
- Vercel CLI (via `.vercel/` metadata) — Project linked as `prj_Xi236fWvZIAF38dYsCwTtboXZRV2` under team `team_385xEDn7YomEO2eo5pHTp3px`.

## Configuration

**Environment:**
- No `.env` file present. No env vars required at build or runtime.
- Vercel project config lives in `vercel.json` (redirects, cache headers, CSP).
- Deployment exclusions live in `.vercelignore` (keeps Liquid theme, Python tools, docs, prototype heroes out of prod).

**Build:**
- `vercel.json`:
  - `buildCommand`: "" (no build)
  - `outputDirectory`: "." (serve project root)
- `package.json` scripts:
  - `start`: `node server.js` (dev only)
  - `test`: stub that exits with error

## Platform Requirements

**Development:**
- Node.js 18+ (Express 5 requires >= 18)
- `npm install` from project root
- `npm start` serves on `http://localhost:3005`
- Optional Python 3 for `tools/composite_hero.py` and root-level `*.py` asset scripts

**Production:**
- Vercel static deployment (auto-deploy on push)
- Live domain: `maplemoon-website.vercel.app` (v1.0 shipped 2026-04-16, V7+V11 fusion build)
- No serverless functions, no edge middleware
- CSP, caching, and redirects enforced by `vercel.json`

## Design System Assets

**Fonts (referenced, not embedded):**
- P22 Mackinac Pro (serif) — Adobe Fonts kit URL placeholder in `layout/theme.liquid`; not actually loaded on shipped HTML pages (fallback stack only)
- Neue Haas Grotesk Display Pro (sans) — Same story; falls back to Inter → Helvetica Neue → system sans
- `client_review.html` (review-only, not shipped) imports DM Serif Display + Inter from Google Fonts

**Brand Kit:**
- `assets/brand_kit.css` (340 lines) — Canonical design tokens. Symlinked at repo root as `brand_kit.css` for local dev convenience.
- `shared.css` (736 lines) — Header/footer/nav/card component styles used by every shipped page.
- `shared.js` (143 lines) — Mobile menu, header scroll, IntersectionObserver reveals, nav-dark-mode observer, parallax, PDP thumb swap, smooth-scroll anchors.

---

*Stack analysis: 2026-04-18*
