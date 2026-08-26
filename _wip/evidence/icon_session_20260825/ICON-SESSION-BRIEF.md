# Maple Moon icon session brief

**Prepared:** 25 August 2026  
**Purpose:** turn the site's mixed icons and small graphics into one deliberate Maple Moon system without flattening three different jobs into one style.

## Outcome for the session

Approve the construction rules and representative drawings for three related lanes:

1. **Brand and claim badges** - packaging-derived badges such as caffeine free, gluten free, organic, vegan, additive free and made in Australia.
2. **Interface utility icons** - cart, menu, search, clear, arrows, disclosures, mail, location, delivery, payment, social and warnings.
3. **Editorial and process graphics** - pod, roast, blend, bar/result, product-format marks and story/support motifs.

The lanes should share Maple Moon's rounded, slightly organic drawing character, but they should not share identical geometry. Packaging badges need room for type and brand theatre; utility icons need instant recognition at 16-24 px; editorial marks can carry more personality.

## Evidence already established

- The packaging library contains a dedicated 93-artboard `MM_MASTER_Icons_WORKING_v10.ai` plus a separate recycling master. This is the visual anchor for existing claim artwork.
- The May 2026 consolidated bar and Moon Illustrator files show the badges at real front/back packaging scale.
- The current website already contains brand-badge SVGs, but also mixes inline SVGs, Unicode characters and CSS-drawn shapes.
- The existing design-system audit records this as P1 `GAP-018`: appearance direction is partly approved, but source, grid, stroke, optical sizing and accessibility governance are missing.
- A prior sourcing note considered licensed hand-drawn sets, but none was production-ready. Because the current brief explicitly requires a fully stylised on-brand result, a custom Maple Moon set is now the recommended direction; a licensed outline family remains only a budget fallback.

## Current admitted-WIP inventory

| Route | Inline SVG instances | Unicode/glyph instances | Main drift |
|---|---:|---:|---|
| Home | 26 | 16 | product categories, callouts, trust strip, social, arrows and raw glyph feature cards |
| Shop | 1 | 4 | cart plus filter/sort/action glyphs |
| Carob Story | 1 | 6 | cart, CSS-drawn bean/process shapes, arrows and disclosure marks |
| Our Story | 1 | 4 | cart and navigation/disclosure glyphs |
| FAQ | 7 | 6 | search, info, email, wholesale, location, support mark, plus/close and arrows |
| Stockists | 4 | 4 | cart, search, delivery, warning, marker and action glyphs |
| Contact | 1 | 0 | cart |

This is not a count of unique drawings; it is the active surface area. The repeated cart is duplicated route by route and has different class/stroke treatment. The repo also holds duplicate brand-badge files at `assets/` and `assets/brand/`.

## Recommended visual system

### A. Brand and claim badges

- Keep the current packaging master as the authority rather than redrawing claims from memory.
- Master on a 250 x 250 Illustrator/SVG canvas.
- Preserve the circular/arc composition and bespoke serif relationship where the full badge is legible.
- Supply a separate symbol-only small cut for uses below 40 px; never shrink a text-ring badge until the words become decorative noise.
- Colour modes: ink on light, cream on colour and one-colour print. Do not use arbitrary gradients or multicolour fills.

### B. Interface utility icons

- Custom 24 x 24 grid with an 18 x 18 optical core.
- 1.5 px nominal stroke at 24 px, round caps and round joins; make 16/20 px simplified cuts where details collapse.
- Slightly softened geometry and controlled asymmetry, but recognisable silhouettes first.
- Use `currentColor`; avoid decorative circles/tiles unless the surrounding component contract requires a control boundary.
- No embedded words, claim typography or packaging rings in utility icons.

### C. Editorial and process graphics

- Custom 32/48/64 px drawings with the same cap/join character as utility icons and more expressive organic curves.
- Replace CSS blobs for pod, roast, blend and result with governed SVGs.
- Product-format marks (bar, banana, Moon, bite and elixir) should be a coherent family rather than five generic pictograms.
- Preserve clear negative space and a minimum feature weight that survives mobile rendering.

## First production set

### P0 - shared utility core

Menu, close, cart, search, clear, chevron down, chevron left, chevron right, arrow right, external/up-right, plus, minus, info, mail, map pin, locate, truck/delivery, lock/payment and warning.

### P1 - brand-facing categories and story

Bar, banana, Moon, Eclipse bite, elixir, pod, roast, blend and finished/result.

### P1 - existing claim badges

Govern and export the approved subset from the packaging master: caffeine free, gluten free, organic ingredients, vegan friendly, additive free, made in Australia and any legally approved sugar/ingredient-count treatments. Claims are not rewritten during the drawing session.

### P2 - supporting marks

Instagram, Facebook, sun, crescent/night, location/stockist support, FAQ support and any founder/story motifs that survive a page-level content review.

## Proposed 60-minute review

1. **10 min - role split:** confirm the three lanes and reject any attempt to use packaging badges as generic UI.
2. **15 min - construction sheet:** approve grid, stroke, caps/joins, corner softness, asymmetry and small-size cuts.
3. **20 min - representative drawings:** review cart/search/plus, bar/Moon/elixir and pod/roast/blend. Approval here governs the rest of the family.
4. **10 min - colour and accessibility:** approve colour modes, decorative versus labelled usage and interactive naming.
5. **5 min - coverage lock:** confirm the production list and identify any icons that should be removed rather than redrawn.

## Delivery contract after approval

- One governed Illustrator master.
- Individual optimized SVGs plus a shared SVG sprite/symbol source.
- 24 px utility masters with 16/20 px simplified cuts where required.
- 250 px brand-badge masters plus small symbol-only cuts.
- A contact sheet showing every icon at master size and real UI size.
- `ICON-USAGE.md` covering naming, colour, size, accessibility and do/don't examples.
- Site implementation replaces duplicated inline paths, Unicode glyphs and CSS drawings only after the visual set is approved.

## Decision to take into the session

**Recommended:** custom thin-organic Maple Moon utility/editorial set, anchored to the existing bespoke packaging badges. This directly answers the request for fully considered, on-brand artwork. A restrained licensed outline set is acceptable only if budget or timing rules out custom drawing.
