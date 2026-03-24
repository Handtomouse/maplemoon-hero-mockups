# MapleMoon — Hero Concept Review

**Prepared by HandToMouse Studio**
**17 March 2026**

---

## Overview

We developed 18 hero concept variants exploring different approaches to MapleMoon's homepage experience. Each variant was evaluated across visual design, user experience, mobile responsiveness, interaction quality, brand alignment, and conversion readiness.

This document presents our findings, shortlist, and recommended direction.

**Live Gallery:** http://localhost:3005/

---

## Variant Summary

### V1 — Brand Statement
A dark, premium hero with a seven-category product switcher on the left side. Visitors can browse the full range without leaving the page. Polished interaction design with strong accessibility features. **Ready to present.**

### V2 — Shop Now
Clean and minimal single-product hero on a soft blue gradient. Pleasant but generic. Works as a safe fallback but lacks the storytelling depth MapleMoon deserves. **Ready to present with minor polish.**

### V3 — What is Carob?
The strongest editorial concept. Leads with the question most new customers are asking and pairs education with conversion. Split layout with trust badges and two clear CTAs. **Ready after a mobile spacing fix.**

### V4 — The Range
Three-product grid showcasing Bars, Moons, and Elixirs. Smart category communication but the mobile card carousel needs better swipe cues to reveal all three products. **Ready after mobile interaction improvements.**

### V6 — Before & After
Cinematic split-screen with a draggable divider showing the journey from pod to bar. Visually striking with custom photography. Now includes a Shop Now button. Best as a secondary campaign page rather than the primary hero. **Requires further development for homepage use.**

### V7 — Flavour Picker
Interactive product explorer with category tabs that change the background, product image, tagline, and CTA dynamically. The CTA updates to name the exact product selected. The most conversion-ready variant. **Ready to present.**

### V8 — Time of Day
Atmospheric dark hero with smoke effects and a personalised time-of-day greeting. Premium feel, but limited to a single product with no range communication. **Ready to present.**

### V9 — Story Cards
Four-panel brand narrative (Who, Where, What, Why) with an expanding accordion on desktop. Strong storytelling structure. Requires replacement photography before presentation. **Needs asset updates.**

### V10 — Letterbox Cinema
Cinematic splash page with benefit icons. Visually strong but functions as a landing gate rather than a homepage, adding friction before the shop. **Not recommended as homepage hero.**

### V11 — The Grid
Asymmetric mood board layout. Visually interesting grid composition with the hero product shot. Now includes a Shop Now CTA and updated copy. **Suitable as a secondary layout option.**

### V12 — The Unwrap
Three products with hover-reveal info cards on desktop, tap-to-cycle on mobile. Each product has its own CTA. Clever multi-product approach. **Ready after minor desktop polish.**

### V13 — Full Bleed Photo
Single full-bleed editorial photograph with minimal text overlay and Ken Burns animation. The most visually mature variant. Best suited as a campaign landing page rather than a seven-category homepage. **Strong for single-product campaigns.**

### V14 — Ingredient Journey
Scroll-driven four-chapter editorial from pod to range. Beautiful storytelling format. Requires replacement photography before presentation. **Recommended for the Our Story page, not the homepage.**

### V15 — Product Orbit
Eight products in an animated rotating orbit. Visually striking but the moving targets create usability challenges on mobile. **Needs interaction redesign.**

### V16 — Moodboard Collage
Three-column drifting masonry of brand imagery. Atmospheric but heavy on page load and requires licensed replacement imagery. **Not recommended in current form.**

### Round 3 -- Light Palette Variants

The following three variants explore a warmer, lighter colour palette (beige #F0EDDF base) applied to existing strong concepts. They are included in the gallery for completeness but were not part of the formal review scoring.

### V17 -- Light Editorial
V3 reimagined in a warm beige palette. Softer, more approachable editorial tone with the same "What is Carob?" positioning.

### V18 -- Light Flavour Picker
V7 in a light palette. Same interactive product explorer with warmer colour story and cream backgrounds.

### V19 -- Light Grid
V4 on a soft cream background. Three-column product grid with lighter energy.

---

## Our Top 3

### 1. V7 — Flavour Picker
The only variant where browsing and buying happen in the same viewport. Category tabs drive real product changes, and the CTA names the exact product the visitor selected.

### 2. V1 — Brand Statement
The most complete single-screen hero with seven categories accessible from a vertical sidebar. Strong interaction quality and accessibility.

### 3. V3 — What is Carob?
The smartest positioning for a product most consumers have never tried. Leads with education and pairs it with a clear path to purchase.

---

## Recommended Direction: V7 — Flavour Picker

V7 is our recommended hero because it directly connects browsing to buying. When a visitor taps "Moons", the entire hero transforms: the background shifts to warm brown, the product image becomes a Hazelnut Moon, the tagline reads "Carob crescents. One is never enough.", and the CTA says "SHOP HAZELNUT MOON." That level of specificity turns a hero from a brand statement into a sales tool.

It also scales cleanly. Adding a new product category means adding a tab, some images, and copy. The URL structure maps directly to a Shopify collection hierarchy. The vanilla JavaScript implementation means no framework dependencies for the Shopify theme.

We recommend enhancing V7 with select elements from other strong concepts:
- **V3's trust badges** (Organic, Vegan, Caffeine Free, Gluten Free, Made in Australia) placed below the flavour selector
- **V3's "What is Carob?" framing** as the default headline before any category is selected
- **V8's time-of-day greeting** as a warm personalisation touch above the headline

---

## Breakpoint Previews

Full-resolution screenshots of the Top 3 at mobile, tablet, and desktop breakpoints:

| Variant | Mobile (375x812) | Tablet (768x1024) | Desktop (1440x900) |
|---------|-----------------|-------------------|-------------------|
| V7 | hero_v7_mobile.png | hero_v7_tablet.png | hero_v7_desktop.png |
| V1 | hero_v1_mobile.png | hero_v1_tablet.png | hero_v1_desktop.png |
| V3 | hero_v3_mobile.png | hero_v3_tablet.png | hero_v3_desktop.png |

Screenshots are in `review/breakpoints/`.

---

## Recommended Next Steps

1. **Review and approve** the hero direction (V7 with enhancements)
2. **Provide final product photography** for any missing assets (Pecan Moon product shot needed)
3. **Shopify theme build** — integrate V7 as a Liquid section with dynamic product data
4. **Mobile QA pass** on target devices before launch

---

*Prepared by HandToMouse Studio for MapleMoon*
