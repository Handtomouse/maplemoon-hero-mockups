# MapleMoon Asset Audit

**Date:** 2026-04-13
**Auditor:** Claude (automated)
**Total files scanned:** 377 images in project + 60+ in external locations

---

## 1. Complete Inventory

### A. Project Assets (`~/maplemoon-website/assets/`)

| Directory | Count | Contents |
|-----------|-------|----------|
| `products/` | 23 JPG | Shopify-style product shots (bars, eclipses, elixirs, powder, bananas, bath salts) + `mockups/` (11 front/back PNGs) |
| `products_clean/` | 15 PNG | Background-removed product shots |
| `products_new/` | 13 PNG | Latest clean product shots |
| `product_shots/` | 48 files | Organised mockups: `bars/` (6), `moons/` (7), `eclipse_bites/` (5), `bananas/` (2), plus individual PNG/WebP pairs |
| `gemini/artisan/` | 16 PNG | AI-generated artisan-style product shots |
| `gemini/studio/` | 15 PNG | AI-generated studio-style product shots |
| `imagery/Gemini/` | 33 PNG | Duplicate of gemini/ artisan+studio (same files) |
| `hero_shots/` | 40+ files | Hero images, backgrounds, atmospheric shots, v9 cards |
| `hero_shots/moodboard/` | 46 files | Photography pipeline output (PNG+WebP pairs) |
| `hero_shots/v9_gen/` | 18 PNG | V9 hero generation batch |
| `hero_shots/v9_source/` | 4 files | Source photos (founder, about page, real photos) |
| `mood/` | 12 files | Pinterest moodboard refs (brand palette, flatlay, lifestyle) |
| `stock/` | 18 JPG | Licensed stock photos (carob pods, textures, ingredients, editorial) |
| `imagery/` | 4 files | Banner images (bars, elixirs) + collection shots |
| Root SVGs | 14 SVG | Logo, wordmark, USP icons (organic, vegan, gluten-free, etc.) |

### B. Photography Review (`~/Desktop/MM_Card1_Photography_Review/`)

| Directory | Count | Contents |
|-----------|-------|----------|
| `Z_image_track_real_product/` | 13 PNG | Image-to-image product compositions on backgrounds |
| `brand_blue_latest/` | 12 PNG | Blue-tone campaign/editorial/silhouette shots |
| `card_1_warm_amber/` | 2 PNG | Warm amber campaign backgrounds |
| `card_2_navy_fog/` | 2 PNG | Navy fog atmospheric backgrounds |
| `card_3_dark_spotlight/` | 2 PNG | Dark spotlight backgrounds |
| `card_4_navy_showroom/` | 2 PNG | Navy showroom backgrounds |

### C. V9 Hero Staging (`~/Desktop/V9_Hero_Staging/`)

| Directory | Count | Contents |
|-----------|-------|----------|
| `card1_moons/` | 3 PNG | Moon product hero compositions |
| `card1_atmos/` | 3 PNG | Macro carob photography |
| `card2_chilli/` | 3 PNG | Chilli bar hero compositions |
| `card2_atmos/` | 3 PNG | Byron Bay lighthouse atmospherics |
| `card3_carob/` | 3 PNG | Pure carob bar hero compositions |
| `card4_peppermint/` | 1 PNG | Peppermint bar hero reuse |
| `card4_atmos/`, `card4_craft/`, `card4_minimal/` | ~9 PNG | Additional card 4 variants |

### D. UFC Deliverables (`~/Desktop/MrCC_PAI_Stage1_Files/UFC/clients/maplemoon/deliverables/`)

| Directory | Count | Contents |
|-----------|-------|----------|
| `product_photography/outputs/` | 4 PNG | Bria/Kontext background removal tests |
| `product_photography/outputs/v9_hero/` | 24 PNG | V9 hero shoot outputs (carob pods, truffles, lighthouse, bars, bonbons) |
| `style_references/campaign_references/` | 37 JPEG | Campaign style reference images from Pinterest/external |
| Docs | 4 files | Feedback JSON, hero triage, photoshoot plan, Shopify shot list |

### E. Content Files (`~/maplemoon-website/content/`)

| File | Purpose |
|------|---------|
| `product_descriptions.md` | Short/medium/long copy for all products |
| `hero_copy.md` | Hero section headlines and subtext |
| `about_page.md` | About/story page copy |
| `faq.md` | FAQ content |
| `meta_seo.md` | Page titles and meta descriptions |

---

## 2. Approved Photography (17 items from feedback JSON)

All 17 approved ("yes") images verified as existing:

| # | Label | Consolidated Path | Source |
|---|-------|-------------------|--------|
| 1 | Silhouette photograph A | `hero/silhouette_001.png` | MM_Card1/brand_blue_latest |
| 2 | Silhouette photograph B | `hero/silhouette_002.png` | MM_Card1/brand_blue_latest |
| 3 | PCAR bar i2i B | `hero/bar_pcar_hero.png` | MM_Card1/Z_image_track |
| 4 | Moons PCAR i2i A | `hero/moon_pcar_hero_a.png` | MM_Card1/Z_image_track |
| 5 | Eclipse bite coconut A | `hero/eclipse_coconut_hero.png` | MM_Card1/Z_image_track |
| 6 | Moons PCAR i2i C | `hero/moon_pcar_hero_b.png` | MM_Card1/Z_image_track |
| 7 | Close crop A | `lifestyle/botanical_closeup_001.png` | outputs/round_2/fb1 |
| 8 | Close crop B | `lifestyle/botanical_closeup_002.png` | outputs/round_2/fb1 |
| 9 | Gift box variant A | `lifestyle/gift_boxes_001.png` | outputs/round_2/fb3 |
| 10 | Gift box variant B | `lifestyle/gift_boxes_002.png` | outputs/round_2/fb3 |
| 11 | Fog variant A | `textures/blue_fog_001.png` | outputs/round_2/fb7 |
| 12 | Fog variant B | `textures/blue_fog_002.png` | outputs/round_2/fb7 |
| 13 | Moons i2i B | `hero/moon_pcar_hero_c.png` | V9_Hero_Staging/card1 |
| 14 | Moons reuse | `hero/moons_reuse.png` | V9_Hero_Staging/card1 |
| 15 | Chilli bar i2i A | `hero/bar_chilli_hero.png` | V9_Hero_Staging/card2 |
| 16 | PCAR bar i2i A | `hero/bar_pcar_hero_b.png` | V9_Hero_Staging/card3 |
| 17 | Peppermint reuse | `hero/bar_peppermint_hero.png` | V9_Hero_Staging/card4 |

---

## 3. Page-by-Page Requirements Matrix

### Homepage

| Element | Required | Have | Source | Gap |
|---------|----------|------|--------|-----|
| Hero background (blue fog/atmospheric) | 1-2 | YES | `textures/blue_fog_001.png`, `hero_shots/blue_fog.png` | -- |
| Hero product shots (bar, moon, eclipse) | 3 | YES | Approved hero images | -- |
| Hero silhouette overlay | 1 | YES | `hero/silhouette_001.png` | -- |
| Category cards (Bars/Moons/Elixirs) | 3 | YES | `products/` JPGs or `gemini/studio/` PNGs | -- |
| Product grid shots (6-8 products) | 8 | YES | `product_shots/bars/`, `product_shots/moons/`, `product_shots/eclipse_bites/` | -- |
| Lifestyle/editorial below fold | 2-3 | PARTIAL | `lifestyle/gift_boxes_*.png`, stock editorial | Need 1-2 more lifestyle shots |
| USP icons (organic, vegan, etc.) | 6 | YES | Root SVGs (`icon_*.svg`) | -- |
| Byron Bay location photo | 1 | YES | `hero_shots/hero_byron_lighthouse.jpg` | -- |
| Testimonial headshots | 3-5 | NO | -- | **GAP: Need real customer/testimonial photos** |

### Product Detail Pages (PDP)

| Element | Required | Have | Source | Gap |
|---------|----------|------|--------|-----|
| Primary product shot (per SKU) | 20+ | YES | `product_shots/` mockups (all flavours) | -- |
| Clean/transparent product shot | 20+ | PARTIAL | `products_clean/` (15), `products_new/` (13) | Missing: eclipse_almond, eclipse_goji, eclipse_fudge, eclipse_coconut, moon flavours clean |
| Product angle shots (3-6 per SKU) | 60+ | NO | Only front views exist | **GAP: Need side/back/detail/unwrapped angles** |
| Ingredient/process detail | 3-5 | PARTIAL | Stock carob pods/harvest photos | Need real kitchen/process photos from Carli |
| Nutrition/packaging close-up | 1 per SKU | PARTIAL | `products/mockups/` has front+back for some bars | Missing for moons, eclipses, elixirs |

### About / Story Page

| Element | Required | Have | Source | Gap |
|---------|----------|------|--------|-----|
| Founder photo (Carli + Dylan) | 1-2 | PARTIAL | `hero_shots/v9_source/founder_photo.jpg` (1 photo) | Need more founder/team shots |
| Carob farm/grove photos | 2-3 | PARTIAL | Stock carob tree/harvest | **GAP: Need real farm photos from Carli** |
| Byron Bay location | 1-2 | YES | Lighthouse photos, `hero_shots/v9_source/img_*.jpg` | -- |
| Kitchen/production process | 2-3 | NO | -- | **GAP: Need real production photos** |
| Carob pod close-ups | 1-2 | YES | Stock macro photos, botanical silhouettes | -- |
| Timeline/journey imagery | 2-3 | NO | -- | **GAP: Needs real brand journey photos or AI editorial** |

### Collection / Shop Page

| Element | Required | Have | Source | Gap |
|---------|----------|------|--------|-----|
| Consistent product grid shots | All SKUs | YES | `product_shots/` has all categories covered | -- |
| Category banners (Bars/Moons/etc.) | 3-4 | PARTIAL | `imagery/BANNER-BARS.jpg`, `BANNER-ELIX.jpg` | Missing: Moons banner, Eclipse banner |
| Filter/sort icons | 4-6 | YES | USP icons can serve double duty | -- |

---

## 4. Gap Analysis

### HAVE (ready to use)

- All bar product mockups (6 flavours, front views)
- All moon product mockups (6 flavours)
- Eclipse bite product shots (5 flavours)
- Elixir product shots (plain + spiced)
- Logo, wordmark, all USP icons (SVG)
- Hero backgrounds (blue fog, silhouettes, atmospherics)
- 17 client-approved campaign/hero images
- Stock photography (carob pods, ingredients, textures)
- Gemini AI product shots (artisan + studio styles, 31 images)
- Brand palette and style references
- All page copy (product descriptions, hero copy, about, FAQ, SEO meta)

### NEED (gaps to fill)

| Gap | Priority | Can Generate (AI) | Needs Real Photo |
|-----|----------|-------------------|-----------------|
| Multi-angle product shots (side, back, unwrapped) | HIGH | Possible but risky | Better from Carli |
| Clean/transparent shots for eclipse_almond, eclipse_goji, eclipse_fudge, eclipse_coconut, all moons | HIGH | Yes (background removal pipeline) | Source mockups exist |
| Category banners (Moons, Eclipses) | MEDIUM | Yes | -- |
| Testimonial/customer headshots | MEDIUM | No | Real customers or skip section |
| Kitchen/production process photos | MEDIUM | Risky (authenticity) | **Ask Carli** |
| Real farm/carob grove photos | MEDIUM | Risky (authenticity) | **Ask Carli** |
| More founder/team photos | LOW | No | **Ask Carli** |
| Product unwrapped/broken bar detail shots | LOW | Yes | Better real |
| Brand journey/timeline imagery | LOW | Yes (editorial style) | Optional |

### CAN GENERATE (photography pipeline)

These gaps can be filled using the existing AI photography pipeline:
1. Missing clean/transparent product shots (run background removal on existing mockups)
2. Category banners (composite from existing product shots)
3. Additional lifestyle/editorial shots (image-to-image from approved product shots)
4. Atmospheric backgrounds/textures for page sections
5. Gift set/bundle compositions

### NEEDS REAL PHOTOS FROM CARLI

These cannot be convincingly AI-generated:
1. Kitchen/production process (tempering, hand-wrapping, small batch)
2. Carob farm visits (real trees, real harvest)
3. Founder portraits beyond the single existing photo
4. Customer testimonial headshots (if using this section)

---

## 5. Consolidated Asset Structure

```
~/maplemoon-website/assets/
├── brand/              # NEW — logos, icons, brand kit
│   ├── maplemoon_logo.svg
│   ├── carob_wordmark.svg
│   ├── brand_kit.css
│   └── icon_*.svg (12 icons)
├── hero/               # NEW — approved hero-ready images (17 approved)
│   ├── silhouette_001.png
│   ├── silhouette_002.png
│   ├── bar_pcar_hero.png
│   ├── bar_pcar_hero_b.png
│   ├── bar_chilli_hero.png
│   ├── bar_peppermint_hero.png
│   ├── moon_pcar_hero_a.png
│   ├── moon_pcar_hero_b.png
│   ├── moon_pcar_hero_c.png
│   ├── moons_reuse.png
│   └── eclipse_coconut_hero.png
├── lifestyle/          # NEW — editorial and campaign shots
│   ├── botanical_closeup_001.png
│   ├── botanical_closeup_002.png
│   ├── gift_boxes_001.png
│   └── gift_boxes_002.png
├── textures/           # NEW — backgrounds and atmospheric
│   ├── blue_fog_001.png
│   ├── blue_fog_002.png
│   ├── marble_warm.jpg
│   └── wood_texture.jpg
├── products/           # Existing — Shopify product shots (JPG)
├── products_clean/     # Existing — background-removed (PNG)
├── products_new/       # Existing — latest clean shots (PNG)
├── product_shots/      # Existing — organised mockups by category
├── gemini/             # Existing — AI artisan + studio shots
├── hero_shots/         # Existing — hero images + moodboard pipeline output
├── imagery/            # Existing — banners + collection
├── mood/               # Existing — Pinterest moodboard refs
└── stock/              # Existing — licensed stock photography
```

---

## 6. Recommendations

1. **Immediate (before frontend build):**
   - Run background removal on remaining eclipse/moon mockups to fill `products_clean/` gaps
   - Generate Moons and Eclipse category banners from existing product shots
   - The 17 approved images + existing product shots cover Homepage and Collection page needs

2. **Before launch (ask Carli):**
   - Request 3-5 production/kitchen process photos for About page
   - Request 2-3 carob farm/grove photos
   - Request additional founder/team photos
   - Discuss whether testimonial section needs real customer photos

3. **Photography pipeline can handle:**
   - Additional hero/campaign compositions using approved image-to-image approach
   - Editorial lifestyle shots for below-fold sections
   - Additional atmospheric backgrounds matching brand blue palette

4. **De-duplicate:** `imagery/Gemini/` is identical to `gemini/artisan/` + `gemini/studio/` — can remove one copy to reduce confusion.

---

## Status: DONE | All 5 locations scanned (377+ files), 17 approved photos verified and copied, page requirements mapped across 4 page types, 9 gaps identified (4 need real photos from Carli, 5 can be AI-generated)
