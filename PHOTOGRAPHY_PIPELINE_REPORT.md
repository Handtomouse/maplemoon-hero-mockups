# MapleMoon Photography Pipeline Report

**Date**: 2026-04-13
**Status**: BLOCKED — Fal.ai balance exhausted
**Blocker**: Top up balance at fal.ai/dashboard/billing, then re-run commands below

## Selection Summary

13 maybes selected from 31 candidates. Prioritised fixable issues (colour correction, centering, object removal) that fill page requirements (hero, editorial, product grid) with category range.

## Selected Maybes (13)

### Group A: Colour Correction to Silhouette Palette (5 images)

Carli rated these "amazing" but wrong colouring — should match the approved FB1 Silhouette Pods palette (cornflower/periwinkle blue, dark silhouettes).

| # | ID | Label | Category | Fix Required |
|---|-----|-------|----------|-------------|
| 1 | hero_c2_byron_a | Byron Bay atmos A | Card 2 — Chilli + Byron Bay | Colour grade from golden-hour realism to silhouette blue palette |
| 2 | hero_c2_byron_c | Byron Bay atmos C | Card 2 — Chilli + Byron Bay | Same as above |
| 3 | hero_c4_ingred_a | Ingredients flat lay A | Card 4 — Peppermint + Ingredients | Colour grade warm beige to silhouette blue palette |
| 4 | hero_c4_ingred_b | Ingredients flat lay B | Card 4 — Peppermint + Ingredients | Same as above |
| 5 | hero_c4_ingred_c | Ingredients flat lay C | Card 4 — Peppermint + Ingredients | Same as above |

### Group B: Centering + Silhouette Lighting (4 images)

Carli said "great but in centre of screen and with the silhouette lighting from Silhouette photograph A."

| # | ID | Label | Category | Fix Required |
|---|-----|-------|----------|-------------|
| 6 | r1_product_campaign_001 | Product campaign A | Brand Blue — Campaign Shots | Centre subject + apply silhouette backlight |
| 7 | r1_product_campaign_002 | Product campaign B | Brand Blue — Campaign Shots | Same as above |
| 8 | r1_still_life_001 | Editorial still life A | Brand Blue — Campaign Shots | Centre composition + apply silhouette backlight |
| 9 | r1_still_life_002 | Editorial still life B | Brand Blue — Campaign Shots | Same as above |

### Group C: Object Removal (2 images)

Carli said "cool but remove the little fruit or pod that's on the bottom."

| # | ID | Label | Category | Fix Required |
|---|-----|-------|----------|-------------|
| 10 | r2_fb1_wide_a | Wide shot A | FB1 — Silhouette Pods | Regenerate silhouette branch without bottom pod/fruit |
| 11 | r2_fb1_wide_b | Wide shot B | FB1 — Silhouette Pods | Same as above |

### Group D: Reframe to Match Reference (2 images)

Carli said "too zoomed in / isolate and match Moons PCAR i2i A in composition and framing and lighting." Reference: Moons PCAR i2i A — centered product on white, full package visible with negative space.

| # | ID | Label | Category | Fix Required |
|---|-----|-------|----------|-------------|
| 12 | r1_i2i_banana | Banana mulberry i2i | Image-to-Image — Real Product Composites | Zoom out, centre, match reference framing |
| 13 | r1_i2i_pmin | PMIN bar i2i | Image-to-Image — Real Product Composites | Isolate, centre, match reference framing |

## Skipped Maybes (18) — with reasons

| ID | Label | Reason Skipped |
|----|-------|---------------|
| r1_editorial_a_002 | Editorial photograph B | "bar needs to be real bar" — needs actual product photography |
| r1_packaging_001 | Packaging campaign A | "put the real wordmark and icon" — needs real branding assets, AI can't fix gibberish text |
| r1_packaging_002 | Packaging campaign B | Same as above |
| r1_warm_amber_a | Warm amber A | "great for bg" — usable as-is, no processing needed |
| r1_warm_amber_b | Warm amber B | Same as above — flag as ready-to-use backgrounds |
| r1_dark_spot_a | Dark spotlight A | "great for bg" — usable as-is, no processing needed |
| r1_dark_spot_b | Dark spotlight B | Same as above — flag as ready-to-use backgrounds |
| r2_fb4_powder | Powder cascade | "cool but its deformed" — fundamental shape/anatomy issue |
| r2_fb4_unwrap | Bar mid-unwrap | "deformed and the wrong wrapper" — product design issue, not fixable |
| r2_fb4_knife | Pod on knife edge | "knife makes no sense" — conceptual/compositional issue beyond colour fix |
| r2_fb5_pcar | PCAR — Pure Carob | "wrong bar design" — AI-generated bar doesn't match real product |
| r2_fb5_asal | ASAL — Almond Sea Salt | "wrong bar design and wrong colour" — same as above |
| r2_fb5_chil | CHIL — Cayenne Chilli | Same as above |
| r2_fb5_gcoc | GCOC — Goji Coconut | Same as above |
| r2_fb5_hnut | HNUT — Hazelnut | Same as above |
| r2_fb5_pmin | PMIN — Peppermint | Same as above |
| hero_c3_reuse | PCAR bar reuse | Empty note — unclear what fix is needed |
| hero_c4_pmin_a | Peppermint bar i2i A | "too zoomed in" — duplicate fix of r1_i2i_pmin, lower priority |

## Ready-to-Run Generation Commands

All commands point to output dir: `~/maplemoon-website/assets/photography/refined/`

Tool path: `~/Desktop/MrCC_PAI_Stage1_Files/UFC/tools/product_shoot.py`

### Batch 1: Byron Bay Lighthouse (2 images, $0.16)

```bash
python3 ~/Desktop/MrCC_PAI_Stage1_Files/UFC/tools/product_shoot.py \
  "Byron Bay lighthouse headland at golden hour, dramatic silhouette style, deep periwinkle blue gradient sky fading to soft lavender at horizon, dark silhouetted coastline and vegetation in foreground, walking path leading to lighthouse on cliff edge, sweeping bay and ocean below, minimalist mood, backlit photography, no text, high-end editorial landscape, luxury brand aesthetic" \
  --client maplemoon --count 2 --resolution 1K --aspect 16:9 \
  --output-dir ~/maplemoon-website/assets/photography/refined
```

Maps to: `mm_refined_hero_c2_byron_a.png`, `mm_refined_hero_c2_byron_c.png`

### Batch 2: Ingredients Flat Lay (3 images, $0.24)

```bash
python3 ~/Desktop/MrCC_PAI_Stage1_Files/UFC/tools/product_shoot.py \
  "Artisan ingredients flat lay photograph, whole carob pods, raw almonds, coconut flakes, sea salt crystals, scattered naturally on matte surface, shot from above, deep cornflower blue to soft periwinkle gradient background and surface colour matching botanical silhouette photography palette, dramatic backlit lighting casting long shadows, minimalist luxury food photography, warm natural tones on ingredients only, no text, no packaging" \
  --client maplemoon --count 3 --resolution 1K --aspect 16:9 \
  --output-dir ~/maplemoon-website/assets/photography/refined
```

Maps to: `mm_refined_hero_c4_ingred_a.png`, `mm_refined_hero_c4_ingred_b.png`, `mm_refined_hero_c4_ingred_c.png`

### Batch 3: Product Campaign — Hand + Carob Pods (2 images, $0.16)

```bash
python3 ~/Desktop/MrCC_PAI_Stage1_Files/UFC/tools/product_shoot.py \
  "Human hand delicately holding three dried carob pods, centered in frame, silhouette lighting against smooth periwinkle blue gradient sky background, backlit dramatic rim light on skin and pods, minimalist composition, luxury editorial food photography, no text, clean negative space, high contrast between dark pods and luminous blue background" \
  --client maplemoon --count 2 --resolution 1K --aspect 16:9 \
  --output-dir ~/maplemoon-website/assets/photography/refined
```

Maps to: `mm_refined_r1_product_campaign_001.png`, `mm_refined_r1_product_campaign_002.png`

### Batch 4: Still Life — Carob Pods + Botanical (2 images, $0.16)

```bash
python3 ~/Desktop/MrCC_PAI_Stage1_Files/UFC/tools/product_shoot.py \
  "Minimalist editorial still life, two whole dried carob pods beside a single eucalyptus branch, centered in frame on matte surface, silhouette lighting style, deep periwinkle blue gradient background and surface, dramatic shadows, luxury food photography, shot from 45 degree angle, clean composition, no text, high-end brand aesthetic" \
  --client maplemoon --count 2 --resolution 1K --aspect 16:9 \
  --output-dir ~/maplemoon-website/assets/photography/refined
```

Maps to: `mm_refined_r1_still_life_001.png`, `mm_refined_r1_still_life_002.png`

### Batch 5: Silhouette Botanical — Clean Branch (2 images, $0.16)

```bash
python3 ~/Desktop/MrCC_PAI_Stage1_Files/UFC/tools/product_shoot.py \
  "Minimalist botanical silhouette photograph, single carob tree branch extending from right side of frame with hanging pods and small compound leaves, pure black silhouette against clear periwinkle blue gradient sky, clean bottom edge with no objects below the branch, artistic nature photography, no fruit on ground, no text, wide format landscape orientation, luxury editorial style" \
  --client maplemoon --count 2 --resolution 1K --aspect 16:9 \
  --output-dir ~/maplemoon-website/assets/photography/refined
```

Maps to: `mm_refined_r2_fb1_wide_a.png`, `mm_refined_r2_fb1_wide_b.png`

### Batch 6: Product i2i — Banana + Peppermint (2 images, $0.08)

```bash
# Banana mulberry
python3 ~/Desktop/MrCC_PAI_Stage1_Files/UFC/tools/product_shoot.py \
  --image ~/Desktop/MM_Card1_Photography_Review/Z_image_track_real_product/maplemoon_imagetoimage_mmmulwebmockupsbann80g02feb20262xpng_gen_20260331_162528.png \
  --client maplemoon --aspect 1:1 \
  --output-dir ~/maplemoon-website/assets/photography/refined

# Peppermint
python3 ~/Desktop/MrCC_PAI_Stage1_Files/UFC/tools/product_shoot.py \
  --image ~/Desktop/MM_Card1_Photography_Review/Z_image_track_real_product/maplemoon_imagetoimage_mmbarwebmockupspmin90g02feb2026png_gen_20260331_162807.png \
  --client maplemoon --aspect 1:1 \
  --output-dir ~/maplemoon-website/assets/photography/refined
```

Maps to: `mm_refined_r1_i2i_banana.png`, `mm_refined_r1_i2i_pmin.png`

## Post-Generation Rename Script

After generation, rename outputs to match the expected naming:

```bash
cd ~/maplemoon-website/assets/photography/refined

# Rename will depend on generated filenames — product_shoot.py uses timestamp-based names.
# Review generated files and rename to mm_refined_[original_id].png pattern.
```

## Cost Summary

| Batch | Count | Model | Cost |
|-------|-------|-------|------|
| 1 — Byron Bay | 2 | Nano Banana 2 | $0.16 |
| 2 — Ingredients | 3 | Nano Banana 2 | $0.24 |
| 3 — Campaign | 2 | Nano Banana 2 | $0.16 |
| 4 — Still Life | 2 | Nano Banana 2 | $0.16 |
| 5 — Botanical | 2 | Nano Banana 2 | $0.16 |
| 6 — Product i2i | 2 | Product Photo | $0.08 |
| **Total** | **13** | | **$0.96** |

## Remaining Gaps — Need Real Photography from Carli

These cannot be fixed by the AI pipeline and require actual product photography:

1. **All 6 bar flavours in correct wrapper design** — r2_fb5 series all marked "wrong bar design". Need real unwrapped bar photos or accurate packaging mockups as i2i input.
2. **Editorial with real bars** — r1_editorial_a_002 "bar needs to be real bar" — lifestyle shots need actual product, not AI-generated bars.
3. **Packaging with real branding** — r1_packaging_001/002 need correct wordmark and icon on boxes, not AI-generated gibberish text.
4. **Bar unwrap/cross-section editorial** — r2_fb4 series has deformation issues that require real product as starting point.

## Usable As-Is (No Processing Needed)

These "maybe" backgrounds can go straight to assets without processing:

- **r1_warm_amber_a** — Warm amber texture background
- **r1_warm_amber_b** — Warm amber texture background (variant)
- **r1_dark_spot_a** — Dark spotlight texture background
- **r1_dark_spot_b** — Dark spotlight texture background (variant)

These provide useful section backgrounds for the website build.

## Status: BLOCKED | Fal.ai balance exhausted — all 13 prompts ready to run, ~$0.96 total cost. Top up at fal.ai/dashboard/billing and re-run batch commands above.
