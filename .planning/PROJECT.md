# PROJECT.md

## Project Name
MapleMoon Website — Horizon 2 Design Overhaul

## Description
Transform a 7-page meeting demo site (static HTML on Vercel) into a premium DTC website that competes with Aesop, Koko Black, and Haigh's. The current site was built for an in-person client meeting (Apr 17-20) and received "very boring" feedback. Horizon 2 is the design elevation, photography integration, additional pages, and eventual Shopify theme installation.

## Current State
- **Pages built:** Homepage (V7+V11 fusion, 52KB), 3 PDPs (Pure Carob Bar, Peppermint Moon, Spiced Elixir), About/Our Story, Bars Collection, FAQ
- **Live at:** maplemoon-website.vercel.app
- **Branch:** paper-shopify-heroes (125+ commits)
- **Architecture:** Static HTML, no framework, brand_kit.css design tokens, shared.css/shared.js for components, vanilla JS
- **Assets:** 460 media files (683MB), 17 approved photographs, 13 AI-refined images awaiting review, 27 generated images unused
- **Shopify readiness:** 18 Liquid 2.0 sections written (8 core, 10 scaffolded), 11 JSON templates, AJAX cart wired
- **Content:** Full product descriptions, about copy, FAQ (10 Q&As), SEO meta — all in content/ directory
- **Accessibility:** WCAG AAA passed (skip links, ARIA, motion guards)

## Client Feedback
"Very boring." The site is functional and content-complete but lacks the visual punch, editorial quality, and scroll storytelling that premium DTC brands deliver. Needs significant design elevation.

## Client Context
- **Contacts:** Carli (primary decision-maker), Dylan (co-founder)
- **Trust level:** High ("We trust you, you've got this" / "You're killing it")
- **Payment history:** Excellent ($22K lifetime, 6.4-day average lag, zero follow-ups needed)
- **Revenue:** ~$20K/month gross, targeting $30K
- **Meeting:** In-person Sydney Apr 17-20 (date/time TBD)
- **Outstanding invoice:** INV-0365 $671.58 (paused, do not chase)
- **Shopify build quote:** $13,206 core (30/40/30 milestone terms recommended)
- **Brand:** Artisan carob from Byron Bay. Not trying to be chocolate. Organic, vegan, caffeine-free, Australian-grown.

## Success Criteria

### What "Not Boring" Looks Like
1. **Premium feel** — Generous whitespace, refined typography (P22 Mackinac Pro serif + Neue Haas Grotesk sans), warm carob palette with intentional dark sections for elixirs
2. **Editorial photography** — Wire the 27 unused AI images into pages, plan a real 2-day photoshoot (122 shots mapped), use lifestyle/editorial compositions not just packshots
3. **Motion and micro-interactions** — Subtle parallax on hero images, fade-up scroll reveals, smooth section transitions, hover states that feel tactile
4. **Scroll storytelling** — Homepage emotional arc (Curiosity > Education > Trust > Desire > Action), About page with alternating split sections, process timeline
5. **Brand confidence** — Copy that speaks like a maker, not a marketer. Short sentences. Statements, not explanations. "Not trying to be chocolate. It's carob."
6. **Competitive parity** — Can sit next to Aesop, Koko Black, Haigh's, and Pana Chocolate without looking like a student project

### Measurable Targets
- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- 12+ pages live and navigable
- 20 products with photography
- Email capture active (Klaviyo)
- Checkout flow end-to-end (post-Shopify install)
- First 10 orders processed successfully
- Domain transferred with zero downtime

## Technical Constraints
- **Static HTML on Vercel** — No framework, no build step. Each page is self-contained HTML with inline page-specific CSS/JS
- **Shared files:** brand_kit.css (tokens), shared.css (V7+V11 components), shared.js (menu, scroll, fade-up)
- **Shopify theme ready for Phase 6** — Liquid sections exist in parallel, designed for installation when Carli provides store access
- **No Shopify store access yet** — Carli must provide account, deposit, and SKU/pricing docs
- **Font licensing:** P22 Mackinac Pro via Google Fonts, Neue Haas Grotesk via Linotype or Inter fallback
- **Fal.ai balance exhausted ($0)** — Use existing 27 generated images, top up for new AI photography later
- **Image paths:** Root-relative (/assets/...) since pages live in subdirectories

## Key Files
- `brand_kit.css` — Design token source of truth (colours, typography, spacing, shadows, breakpoints)
- `shared.css` — V7+V11 fusion shared components (header, footer, nav, cards, trust bar, animations)
- `shared.js` — Mobile menu, header scroll, fade-up observer, smooth scroll
- `homepage.html` — Primary entry point, V7+V11 fusion
- `content/` — Product descriptions, about copy, FAQ, SEO meta (all Markdown)
- `sections/` — 18 Shopify Liquid 2.0 sections for future theme install
- `docs/superpowers/specs/2026-04-16-maplemoon-ultra-build-design.md` — 14-section design spec with 8 teams
- `docs/superpowers/plans/2026-04-16-maplemoon-ultra-build.md` — Implementation plan with tasks

## Design System Reference
- **Warm palette (Bars/Moons/Story):** #F5F0E8 bg, #5C3D2E carob headings, #7B9DBF cornflower accent
- **Dark palette (Elixirs only):** #1E2A1E bg, #E7E4CA text, same cornflower accent
- **Typography:** P22 Mackinac Pro 400/500 (display/headings), Neue Haas Grotesk/Inter 300/400/500 (body/labels/CTAs)
- **Rules:** Never bold Mackinac. Gold #E1D78E decorative only. Navy #1E4366 text-on-cream only. Accent is cornflower #7B9DBF.
- **Buttons:** 44px min touch target, 6px radius, uppercase tracked, hover opacity 0.85

## Risks
| Risk | Mitigation |
|------|-----------|
| Meeting could be tomorrow (Apr 17) | Horizon 1 pages already built and deployed |
| Real product photos not available | Use existing AI-generated + approved shots, flag gaps for Carli |
| Shopify store access not yet provided | Build static HTML first, Shopify install is Phase 6 |
| Font licensing (Neue Haas Grotesk) | Inter fallback already specified in CSS |
| Photography needs real product for packaging text | Document as "needs from Carli" list for meeting |
| Fal.ai balance exhausted ($0) | Use existing 27 generated images |
