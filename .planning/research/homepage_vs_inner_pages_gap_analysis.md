# Homepage vs Inner Pages: Gap Analysis

## 1. Homepage Visual Technique Catalogue

### Interactive Elements
- **Flavour picker**: Category tabs (Bars/Moons/Bites/Elixirs) + flavour pill buttons that swap product image, tagline, and CTA text in real time
- **Range filter tabs**: Second set of category tabs in the product range section, show/hide product cards per category
- **Smooth scroll anchors**: All internal links scroll smoothly to targets

### Layout Patterns
- **Full-viewport hero** (100vh/100dvh) with centred product display
- **Bento grid**: 5 tiles in a 2-col mobile / 3-col desktop grid; first tile spans full width (mobile) or tall-left (desktop). Mixed content types per tile (photography, icons, text overlays, gradient backgrounds)
- **Split section** (origin): Image left / copy right on desktop, stacked on mobile
- **Product range grid**: 2-col mobile / 3-col / 4-col desktop
- **Trust bar**: Horizontal icon row with labels

### Motion & Animation
- **fade-up**: IntersectionObserver-driven translateY(16px) + opacity entrance on 15% threshold, one-shot (unobserves after trigger)
- **Hover transforms**: Bento tiles scale(1.02) on desktop hover; product cards translateY(-2px) + box-shadow
- **Active press**: Bento tiles scale(0.98) on :active (mobile touch feedback)
- **Product image crossfade**: opacity 0.4s ease when flavour changes
- **Header blur transition**: backdrop-filter blur(12px) + saturate(120%) on scroll past 40px

### Photography Usage
- **Hero product shots**: Silhouetted product images (transparent background), stacked and toggled
- **Bento tile backgrounds**: Full-bleed cover images (hero_bar_carob_pods_studio.png, silhouette_closeup.webp, byron_bay_silhouette.webp)
- **Origin section**: Rounded-corner editorial photo (stock_carob_pods_hand.jpg)
- **Product range cards**: Silhouetted product shots on cream backgrounds

### Typography Variation
- **Display headline**: Serif, 2.2rem mobile / 3.2rem desktop (hero)
- **Uppercase badges**: Sans 0.6-0.65rem, letter-spacing 0.18em ("Byron Bay, Australia", "Our Story", "The Range")
- **Category tabs**: Serif 0.78rem with underline active state
- **Pill buttons**: Sans 0.78rem in bordered pills
- **Taglines**: Sans 0.85rem, weight 300, secondary colour
- **Watermark**: carob_wordmark.svg at 4% opacity behind hero, 85% width

### Colour Transitions
- **Elixir dark mode**: Entire hero palette inverts when "Elixirs" category selected -- background goes from warm cream gradient to dark (#2A2218 to #151210), text goes cream, pills invert, header goes dark with matching blur tint
- **Bento colour coding**: Each tile has its own gradient identity (blue for Moons, dark for Elixirs, cream for Origin, blue for Trust)
- **Alternating section backgrounds**: warm-bg (#F5F0E8) / cream-warm (#FAF7F0) rhythm

### Section Density & Rhythm
- 6 distinct content sections before footer: Hero (full-screen) > Bento Grid (tight, visual-heavy) > Origin (breathing room, editorial) > Product Range (browsable grid) > Trust Bar (credentials) > Footer (newsletter + nav)
- High-density sections (bento) alternate with breathing-room sections (origin)
- Total unique visual "moments": ~12+ (hero product, hero pills, hero categories, 5 bento tiles, origin photo, origin copy, range grid, trust bar)


## 2. Inner Page Gaps (What's Missing)

### All 3 PDPs (pure-carob-bar, peppermint-moon, spiced-elixir)

| Technique | Homepage | PDPs |
|-----------|----------|------|
| Background imagery | Multi-gradient hero, radial textures, bento tile photos | Flat solid colour (cream or dark). No atmospheric backgrounds |
| Interactive elements | Flavour picker, category tabs, range filter | Only basic tab switch (Details/Ingredients). 2 tabs, no visual payoff |
| Product display | Animated crossfade between 11 products, centred with drop-shadow filter | Single static image in a plain rounded box |
| Typography drama | Watermark, badges, taglines, display sizes up to 3.2rem | Standard hierarchy only. No watermark, no badge variety, no display contrast |
| Photography count | 5+ atmospheric/editorial images | 1 product shot only. Gallery is a single image, no angles, no lifestyle |
| Hover/motion | Bento scale, card lift, product crossfade, header blur | Just fade-up on load. No scroll-triggered effects, no hover on gallery |
| Colour transitions | Elixir mode full-palette swap | None (spiced-elixir has static dark, which is good, but no transition) |
| Section variety | 6 visually distinct sections | 4 sections, all structurally similar (hero/tabs/related/trust). Monotonous |
| Visual density | High -- something new every scroll-stop | Low -- lots of empty cream/dark space with no visual anchors |
| Social proof / storytelling | Origin story section, "Est. 2024", "From Pod to Bar" | Nothing. No brand story touchpoint on PDPs |

**Specific PDP issues:**
- Gallery is just a centred image in a box -- no background texture, no secondary angles, no zoom
- Tab section has only 2 tabs with minimal content -- feels skeletal
- Related products section uses same product-card component but with no visual intro (just a heading and grid)
- No ingredient spotlight, no "why this product" narrative, no sensory language with visual support
- Spiced Elixir PDP has dark treatment but is otherwise identical in structure to the warm PDPs

### Our Story (our-story.html)

| Technique | Homepage | Our Story |
|-----------|----------|-----------|
| Hero treatment | Full-screen gradient + interactive product picker + watermark | Background image with gradient overlay. Decent but static, no interactivity |
| Photography variety | 5+ unique images | Uses stock_carob_pods_hand.jpg TWICE (Origin and Process sections use same image) |
| Section variety | 6 distinct visual sections | 3 story sections + trust bar. All use same split layout (text + image) |
| Visual rhythm | Dense > sparse > dense alternation | Flat rhythm -- every section is the same split pattern at the same density |
| Interactive/dynamic | Flavour picker, range tabs, scroll animations, palette swap | Only fade-up. No parallax, no scroll-triggered reveals, no interactive moments |
| Watermark / large type | Carob wordmark at 4% opacity | None |
| Colour variation | Warm > cream > warm, plus elixir dark mode | Just alternating warm-bg / warm-bg-alt. Subtle to the point of invisible |

**Specific issues:**
- Reuses same stock photo for two different sections -- looks like a mistake
- Mission section is centred text-only with no visual anchor at all
- No parallax or scroll-driven depth despite having a full-bleed hero image
- No quotes, no pull-text, no large display type to break up the body copy
- The page tells the story through text blocks -- the homepage tells it through images and interaction

### Collection Page (collections/bars.html)

| Technique | Homepage | Collection |
|-----------|----------|------------|
| Hero | Full-screen, gradient, product picker, watermark | Text-only hero (badge + title + subtitle). No image, no product, no atmosphere |
| Photography | Bento hero image, silhouettes, editorial | Zero photography above the fold. Only product shots in the grid |
| Grid treatment | Bento grid (mixed sizes, overlays, metadata, coloured backgrounds) | Plain uniform grid of product cards. No variation, no featured card |
| Category navigation | Interactive tabs that show/hide with animation | None -- single category view, no filtering |
| Visual density | High | Very low -- just a heading and a grid |

**Specific issues:**
- No hero image at all -- the most visually barren page
- "Explore More" section at bottom is the same grid component with no visual differentiation
- No featured/hero product card (e.g., Pure Carob could be large/double-width)
- No category description or story element between hero and grid

### FAQ Page (faq.html)

| Technique | Homepage | FAQ |
|-----------|----------|-----|
| Hero | Full-screen with all the bells | Text-only (badge + title + subtitle). Identical structure to Collection hero |
| Visual interest | Photography, bento grid, interactive elements | Zero images. Entire page is text on cream |
| Interactive | Flavour picker, tabs, smooth scroll | Accordion (details/summary) -- functional but plain |
| Typography | Display sizes, watermark, badges, varied weights | Standard hierarchy only |
| Colour | Gradient hero, palette transitions, dark mode | Flat warm-bg throughout |

**Specific issues:**
- Arguably fine for an FAQ -- it's a utility page -- but feels disconnected from the brand
- No illustration, icon, or image to break up the Q&A wall
- CTA section at bottom is minimal text with no visual treatment
- Could use a small "Still curious?" section with a lifestyle image or product feature


## 3. Unused Asset Catalogue

### assets/photography/refined/ (13 images)
Purpose-built editorial and campaign shots. Currently unused on any page.

- `mm_refined_hero_c2_byron_a/c.png` -- Byron Bay atmospheric shots (perfect for Our Story or Collection hero backgrounds)
- `mm_refined_hero_c4_ingred_a/b/c.png` -- Ingredient close-ups (perfect for PDP ingredient sections or About process section)
- `mm_refined_r1_i2i_banana.png` / `mm_refined_r1_i2i_pmin.png` -- Product lifestyle variants
- `mm_refined_r1_product_campaign_001/002.png` -- Campaign-style product shots (hero or Collection featured card)
- `mm_refined_r1_still_life_001/002.png` -- Still life compositions (PDP gallery, About section)
- `mm_refined_r2_fb1_wide_a/b.png` -- Wide-format shots (full-bleed section backgrounds)

### assets/photography/refined_v2/ (13 images)
Newer generation. All unused.

- `maplemoon_artisan_ingredients_flat_lay_*.png` (x3) -- Flat lay ingredient shots (PDP "Ingredients" tab visual, About process)
- `maplemoon_byron_bay_lighthouse_headland_*.png` (x2) -- Lighthouse/headland shots (Our Story hero, About hero)
- `maplemoon_human_hand_delicately_holding_*.png` (x2) -- Human hands holding product (PDP lifestyle, About)
- `maplemoon_minimalist_botanical_silhouette_*.png` (x2) -- Botanical silhouettes (texture backgrounds, PDP atmosphere)
- `maplemoon_minimalist_editorial_still_life_*.png` (x2) -- Editorial still life (PDP gallery, Collection featured)
- `maplemoon_isolate_product_centered_composition_*.png` -- Clean centred product (PDP alternative angle)
- `maplemoon_zoom_out_to_show_*.png` -- Context/environment shot

### assets/hero_shots/ (40+ files)
Many atmospheric and editorial shots already in use on homepage, but several unused:

- `hero_byron_lighthouse.jpg` -- Lighthouse (Our Story hero)
- `hero_carob_bar_hand.png` -- Hand holding bar (PDP hero background)
- `hero_carob_bar_smoke_portrait/wide.jpg` -- Atmospheric smoke shots (PDP or elixir background)
- `hero_carob_pods_hand.png` -- Hand with pods (Our Story, currently using stock version)
- `hero_carob_pods_macro.jpg` / `hero_carob_pods_macro_dark.jpg` -- Macro pod shots (background textures)
- `hero_elixir_hand.jpg` -- Hand holding elixir (Spiced Elixir PDP)
- `hero_moons_lifestyle.png` -- Moons lifestyle (Peppermint Moon PDP or Collection)
- `v9_atm_card1-4*.jpg` -- Atmospheric card backgrounds (bento-style sections on inner pages)
- `v9_card*` / `v9_prod_card*` -- Pre-made card compositions (who/where/what/why storytelling)

### assets/textures/ (4 files)
- `blue_fog_001/002.png` -- Blue atmospheric fog (overlay for heroes or section transitions)
- `marble_warm.jpg` -- Warm marble texture (PDP gallery background or section divider)
- `wood_texture.jpg` -- Wood surface (ingredient section or FAQ background accent)

### assets/lifestyle/ (4 files)
- `botanical_closeup_001/002.png` -- Botanical close-ups (Our Story, FAQ visual break, PDP ingredient section)
- `gift_boxes_001/002.png` -- Gift box compositions (Collection page, holiday CTA section)


## 4. Priority Recommendations (Impact vs Effort)

### Tier 1: High Impact, Low Effort (do first)

**1. PDP hero background image** [All 3 PDPs]
- Replace flat `.pdp-gallery { background: cream }` with an atmospheric background image
- Pure Carob: use `hero_carob_bar_hand.png` or `mm_refined_r1_still_life_001.png` at low opacity behind product
- Peppermint Moon: use `hero_moons_lifestyle.png`
- Spiced Elixir: use `hero_elixir_hand.jpg` or `hero_carob_bar_smoke_portrait.jpg`
- Effort: Add background-image + overlay gradient to `.pdp-gallery`. ~15 min per PDP.

**2. Collection hero image** [collections/bars.html]
- The collection page opens to pure text -- zero visual impact
- Add full-bleed hero image: `hero_bar_carob_pods_studio.png` (already used on homepage bento) or `mm_refined_r1_product_campaign_001.png`
- Structure: same pattern as Our Story hero (bg image + gradient overlay + text)
- Effort: ~30 min. Reuse `.story-hero` pattern.

**3. Fix Our Story duplicate image**
- Process section reuses `stock_carob_pods_hand.jpg` from Origin section
- Replace with `maplemoon_artisan_ingredients_flat_lay_generate_001.png` or `maplemoon_human_hand_delicately_holding_generate_001.png`
- Effort: Change one `src` attribute. 2 minutes.

**4. Add watermark/large type elements** [All inner pages]
- Homepage has `carob_wordmark.svg` at 4% opacity behind hero
- Add same watermark to PDP gallery backgrounds and/or Collection hero
- Alternatively, add oversized serif display text as decorative element
- Effort: ~10 min per page.

### Tier 2: Medium Impact, Medium Effort

**5. PDP multi-image gallery** [All 3 PDPs]
- Currently single product shot. Add 2-3 images: product angle, lifestyle/in-hand, ingredient close-up
- Pure Carob: product front + `mm_refined_r1_still_life_001.png` + `mm_refined_hero_c4_ingred_a.png`
- Add thumbnail strip or swipe gallery below main image
- Effort: ~1 hour per PDP (layout + JS for gallery)

**6. "Story moment" section on PDPs** [All 3 PDPs]
- Between tabs and related products, add a split section (like homepage origin)
- Content: Why this product exists / ingredient sourcing / the craft behind it
- Use existing split-section pattern from Our Story page
- Image: ingredient flat lays from refined_v2/
- Effort: ~45 min per PDP (HTML + content writing)

**7. Featured product card on Collection page**
- First card in grid should be double-width with a lifestyle image background
- Use `mm_refined_r1_product_campaign_001.png` as background for Pure Carob featured card
- Effort: ~30 min (grid CSS + markup change)

**8. Scroll-triggered section transitions** [All inner pages]
- Inner pages have `fade-up` class applied but `shared.js` needs IntersectionObserver code
- Verify shared.js includes the observer (homepage has it inline). If missing, the fade-ups are broken on all inner pages.
- Effort: ~15 min to verify and fix.

### Tier 3: Medium Impact, Higher Effort

**9. Parallax depth on Our Story hero**
- Hero image is static. Add subtle parallax scroll (background-attachment: fixed or JS-driven translateY on scroll)
- Effort: ~30 min

**10. Ingredient highlight animation on PDPs**
- When "Ingredients" tab is clicked, animate each ingredient appearing with a staggered fade
- Or: create a visual ingredient grid with icons/illustrations instead of plain text
- Effort: ~1 hour

**11. FAQ visual breaks**
- Add a lifestyle image (botanical_closeup or gift_boxes) between FAQ groups or as a decorative element
- Add category headers with icons to group FAQ items (Product, Shipping, Wholesale)
- Effort: ~45 min

**12. "Texture layer" on PDP and Collection backgrounds**
- Apply `marble_warm.jpg` or `wood_texture.jpg` at very low opacity (2-5%) as `background-image` on sections
- Homepage achieves this with radial-gradient pseudo-elements
- Effort: ~15 min per page


## 5. Per-Page Action Summary

### PDPs (pure-carob-bar, peppermint-moon, spiced-elixir)
1. Add atmospheric background image behind gallery (Tier 1)
2. Add carob wordmark watermark at low opacity (Tier 1)
3. Add multi-image gallery with lifestyle/ingredient shots (Tier 2)
4. Add story/craft section between tabs and related products (Tier 2)
5. Add ingredient highlight animation (Tier 3)

### Our Story
1. Replace duplicate stock photo in Process section (Tier 1)
2. Add watermark or large display type to hero or mission section (Tier 1)
3. Add visual variety -- mission section needs an image or illustration (Tier 2)
4. Add parallax scroll on hero image (Tier 3)

### Collection (bars.html)
1. Add full-bleed hero image behind title (Tier 1)
2. Add featured/hero product card at double width (Tier 2)
3. Add category filter tabs for future multi-collection use (Tier 3)

### FAQ
1. Add lifestyle image between FAQ groups (Tier 3)
2. Add category grouping with icons (Tier 3)
3. Lowest priority -- utility page, acceptable as-is
