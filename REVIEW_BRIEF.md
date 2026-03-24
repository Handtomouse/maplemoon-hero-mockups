# MapleMoon Hero Review — Parallel Implementation Brief
**Date:** 2026-03-15
**Server:** `cd ~/maplemoon-website && node -e "const express=require('express');const app=express();app.use(express.static(__dirname));app.listen(3005,()=>console.log('→ http://localhost:3005'));" &`
**Brand kit:** `~/maplemoon-website/brand_kit.css` — use CSS vars only, no inline values
**Rules:** No em dashes. No prices in heroes. Keep all a11y (focus trap, aria, reduced-motion guards).

---

## v1 — Brand Statement (`hero_v1.html`)
Changes needed:
1. **Gradient** — darken from sky blue to deep navy premium tone. `--mm-blue-top/bottom` → richer, darker. Add subtle noise or texture feel.
2. **Product bigger** — mobile: `72%` → `88%`. Desktop: `26vw` → `34vw`.
3. **Product centred** — desktop product at `left: 55%` → `left: 50%`.
4. **Nav prominence reduced** — `category-stack-desktop` opacity from 0.45 → 0.3, font-size from `1.5rem/2rem` → `1.1rem/1.4rem`. Eye should go to product first.
5. **Add visible headline + tagline** — below the product stage, add: `<h1 class="hero-headline">Naturally Sweet Since Day One</h1>` and `<p class="hero-sub">Artisan carob and cacao butter. Handmade in Byron Bay.</p>`. Style: headline = serif 1.8rem mobile / 2.4rem desktop, cream, centered. Sub = sans 0.9rem, cream 70%, centered.
6. **Add CTA** — `<a href="/shop" class="cta-btn">Shop Now</a>` — ghost pill, below tagline.
7. **Float animation** — speed up from `3s` → `2s`.
8. **Mobile** — product `72%` → `88%`, headline/sub visible and centered above bottom strip.

---

## v2 — Shop Now (`hero_v2.html`)
Changes needed (partially done — background gradient animation + product size + active Bars state already applied):
1. **Watermark** — change from `wm-full` → `wm-subtle` (less dominant, headline is the copy).
2. **Tagline size** — desktop tagline `font-size: 1.1rem` → `0.95rem`. It's slightly overpowering.
3. **Mobile strip** — mark `<a href="/shop/bars"` as `class="active text-refined"` on both mobile strip and desktop bar.
4. **Bottom strip mobile** — increase font-size from `0.75rem` → `0.9rem`. Increase padding `18px 0 28px` → `20px 0 32px`.

---

## v3 — What is Carob? (`hero_v3.html`)
**Major layout rebuild.** This is the most complex change.

Current layout: split 55/45 — left = story panel (frosted glass "modal"), right = lifestyle photo bg. Bar floating over photo.

New layout Nate wants:
- **LEFT panel** (55%): "What is Carob?" as large serif h1, short 1-line descriptor ("The naturally sweet pod. No caffeine, nothing added."), Learn More CTA link
- **RIGHT panel** (45%): bar product image (bigger, centred), trust badge icons below bar, Shop button, "Bars" active selector pill at bottom of panel
- **Colour**: warmer — shift away from cold blue. Try `--mm-navy` as the base with a warm undertone, or use a warm dark cream/sand gradient.
- **Photo bg**: keep the lifestyle photo on the LEFT panel bg (at low opacity, ~10%), but DO NOT have the bar overlapping it. Bar goes RIGHT panel only.
- **"Not Chocolate. Its Own Thing."** — demote to a subheading below the main h1 ("What is Carob?"). Style it smaller, lighter weight.
- **Copy to use**:
  - h1: "What is Carob?"
  - Sub: "Not chocolate. Its own thing."
  - Descriptor: "The naturally sweet pod. No caffeine, no added sugar."
  - Left CTA: "Learn More" → /our-story
  - Right CTA button: "Shop Bars" → /shop/bars
  - Active selector: "Bars" pill (amber/cream highlight)
- **Modal feel**: remove the obviously boxed/frosted glass panel. Make it feel like two natural columns, not a card on a background.
- **Trust badges**: keep on right panel below the product image (organic, vegan, caffeine-free icons)

---

## v4 — The Range (`hero_v4.html`)
Changes needed:
1. **Remove prices** — strip all `$12.95`, `$2.50`, `from $X` from product cards completely.
2. **Headline bigger** — find the main headline element and increase font-size by ~20%.
3. **Fix hierarchy** — the headline should be the first thing the eye hits, not the product grid. Ensure headline has adequate top spacing and visual weight.
4. **Add gradient colour animation** — on the body background, animate a slow hue/position shift. Similar pattern to what was added to v2 (gradDrift keyframe).
5. **Product cards bigger** — increase card image sizes by ~15-20%.
6. **Mobile**: product cards bigger + text slightly larger. Add active "Bars" state to the first product card or category indicator.

---

## After implementing:
- Reload each in Chrome: `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --profile-directory="Default" "http://localhost:3005/hero_vN.html" &`
- Do NOT modify v6 (already done in main session), v7–v16 (not yet reviewed)
- Do NOT change any a11y attributes, focus traps, or reduced-motion guards
- Save all changes directly to the HTML files
