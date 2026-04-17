# MapleMoon Meeting Prep -- Apr 17-20 Sydney

**Prepared**: Apr 16, 2026
**Meeting with**: Carli + Dylan
**Purpose**: Client review of website progress + photography pipeline

---

## What to Show Carli/Dylan

### 1. Homepage Walkthrough

**URL**: https://maplemoon-website.vercel.app/homepage.html

This is the V7+V11 fused homepage -- the final direction combining the best elements from both design rounds. Walk through:

- **Hero section**: "Naturally Sweet Since Day One" tagline with product hero
- **Product showcase**: Bars, Moons, and Elixirs -- three product categories
- **Our Story**: Carob origin story, Byron Bay, artisan values
- **The Range**: Full product grid (12 items) with clean product shots
- **Certification badges**: Organic, Vegan, Caffeine-Free, Gluten-Free
- **Navigation**: Bars / Moons / Elixirs top nav

The page uses the warm carob palette throughout (#F5F0E8 backgrounds, #5C3D2E carob tones, #FAF7F0 cream) with cornflower blue #7B9DBF as the accent color.

### 2. Photography Pipeline Progress

**Status**: All 13 selected images have been generated through the AI pipeline.

The refined images live in `assets/photography/refined/` and cover:

| Group | Images | Status |
|-------|--------|--------|
| A: Byron Bay lighthouse (colour-corrected to silhouette palette) | 2 | Generated |
| B: Ingredients flat lay (cornflower blue palette) | 3 | Generated |
| C: Product campaign -- hand + carob pods (centered, silhouette lit) | 2 | Generated |
| D: Still life -- carob pods + botanical (centered, silhouette lit) | 2 | Generated |
| E: Silhouette botanical -- clean branch (pod removed) | 2 | Generated |
| F: Product i2i -- banana + peppermint (reframed) | 2 | Generated |
| **Total** | **13** | **All generated** |

Additionally, 7 newer variant images exist in `refined_v2/` (second-pass Byron Bay and ingredients shots).

**Ready-to-use backgrounds** (no processing needed):
- Warm amber textures (2 images)
- Dark spotlight textures (2 images)

### 3. Brand Alignment Evidence

- Theme color meta tag: `#7B9DBF` (cornflower) -- correct
- Accent color CSS variable: `--accent-blue: #7B9DBF` -- correct
- Warm carob palette throughout: `#F5F0E8`, `#5C3D2E`, `#FAF7F0`
- Photography pipeline outputs all use the cornflower/periwinkle silhouette palette per Carli's feedback

---

## Talking Points

### V7+V11 Fusion Rationale
- V7 brought the warm, inviting carob-toned sections -- perfect for the bars and story content
- V11 brought the darker, moodier treatment -- ideal for the elixirs range
- The fusion gives each product category its own visual territory while maintaining a cohesive brand feel
- This avoids the "one-tone" problem where everything feels the same

### Photography Pipeline
- 31 candidates were triaged down to 13 "maybes" based on Carli's feedback
- Each "maybe" had a specific fix identified (colour correction, centering, object removal, reframing)
- All 13 have now been regenerated with corrections applied
- Show Carli the refined images and get approval to integrate into the homepage
- Some images may need a second pass based on her feedback in person

### Next Steps After Approval
1. Integrate approved photography into homepage sections
2. Carli to provide real product photography for items the AI pipeline can't handle (see Known Gaps below)
3. Build out remaining pages (product detail, about, contact)
4. Domain setup and launch planning

---

## Known Gaps (be honest)

### Photography -- Still Needs Real Product Photos from Carli
These cannot be fixed by AI and require actual product photography:

1. **All 6 bar flavours in correct wrapper design** -- AI-generated bars don't match real packaging
2. **Editorial shots with real bars** -- lifestyle photography needs actual product, not AI renders
3. **Packaging shots with real branding** -- correct wordmark and icon on boxes (AI generates gibberish text)
4. **Bar cross-section/unwrap editorial** -- deformation issues require real product as starting point

**Action for Carli**: Can she provide high-res photos of each bar in its real wrapper, plus a few unwrapped cross-section shots? These become the input for the next round of the pipeline.

### Homepage Colour Note
The body text colour uses `var(--mm-navy)` which resolves to `#1E4366` (navy) via `brand_kit.css`. This is the darker navy shade used for text readability -- the accent/brand colour correctly uses cornflower `#7B9DBF`. If Carli wants text colour adjusted, this is a quick CSS change.

### Pages Not Yet Built
- Individual product pages
- About / Our Story (expanded)
- Contact / Stockists
- Cart / Checkout (Shopify integration TBD)

### Photography Refinement
- The 13 generated images need Carli's in-person review -- some may need a second pass
- The `refined_v2/` variants (7 images) provide alternatives if v1 outputs aren't quite right

---

## Meeting Time

**No specific date/time confirmed via email.** Last email from Carli was Apr 5 (forwarded design review). The meeting window is Apr 17-20 but no time has been locked in.

**URGENT ACTION FOR NATE**: Confirm meeting date and time with Carli before end of day Apr 16.

---

## Quick Reference

| Item | Location |
|------|----------|
| Live homepage | https://maplemoon-website.vercel.app/homepage.html |
| Project repo | ~/maplemoon-website/ (branch: paper-shopify-heroes) |
| Photography report | ~/maplemoon-website/PHOTOGRAPHY_PIPELINE_REPORT.md |
| Refined images (13) | ~/maplemoon-website/assets/photography/refined/ |
| Refined v2 variants (7) | ~/maplemoon-website/assets/photography/refined_v2/ |
| Product clean shots (15) | ~/maplemoon-website/assets/products_clean/ |
| Winners from pipeline (5) | ~/maplemoon-website/outputs/round_2/winners/ |
