# MapleMoon Hero Polish Pass — Session Handoff

## What we're doing
Interactive polish pass across V1-V19 hero variants. Open each variant, Nate reviews at 3 breakpoints, tells me what to fix, I edit the HTML, move to next.

## Setup (DONE)
- Server: localhost:3005 (Express, already running)
- Review page: `localhost:3005/review.html?v=1` — shows Desktop 1440 / Tablet 768 / Mobile 375 side by side
- Review page is open in Cursor Simple Browser
- Prev/Next buttons + arrow keys cycle variants
- Chrome running with `--remote-debugging-port=9222 --user-data-dir=/tmp/chrome-debug-profile`

## Current position
- **V1 — Brand Statement** is loaded and ready for Nate's feedback
- No edits made yet

## Variant order
V1 → V2 → V3 → V4 → V6 → V7 → V8 → V9 → V10 → V11 → V12 → V13 → V14 → V15 → V16 → V17 → V18 → V19

## Files
- Variants: `~/maplemoon-website/hero_v{1,2,3,4,6-19}.html`
- Brand kit: `~/maplemoon-website/brand_kit.css` (READ-ONLY — tokens, fonts, animations)
- Assets: `~/maplemoon-website/assets/product_shots/*.webp`
- Review page: `~/maplemoon-website/review.html`
- Known issues: `~/maplemoon-website/REVIEW_BRIEF.md` (specific V1-V4 changes)
- Design review: `~/maplemoon-website/review/hero_design_review_2026_03_17.md`

## Rules
- All images .webp (not .png for elixirs)
- Gold (#E1D78E) decorative only on light palette — never readable text
- Navy (#1E4366) on beige (#F0EDDF) = 8.2:1 contrast
- `inert` on mobile menu when closed, focus trap + Escape close
- `prefers-reduced-motion` guards on all animations
- All `<img>` need width/height + `loading="lazy"` (except hero)
- Vanilla JS only, no frameworks
- No em dashes in copy. No prices in heroes.
- Use CSS vars from brand_kit.css, no inline colour values
- Products: Bars (4 flavours), Moons (1: Hazelnut), Bites (2: Coconut, Gold), Elixirs (2: Pure, Spiced)

## Workflow per variant
1. Nate looks at review.html?v=N in Simple Browser (3 breakpoints)
2. Tells me what to change
3. I edit the hero HTML file
4. Nate refreshes Simple Browser to confirm
5. Next variant
