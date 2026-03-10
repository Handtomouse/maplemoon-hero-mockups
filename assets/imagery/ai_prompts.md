# MapleMoon — AI Image Generation Prompts
# For use with Midjourney, Adobe Firefly, or Flux

## Brand constants to include in every prompt:
## Colours: warm cream (#E7E4CA), deep navy (#1E4366)
## Style: editorial, magazine, warm directional light, soft depth of field
## Never: pure white background, cold grey, harsh studio flash, clinical
## Always: warm wood grain OR marble with warm tones OR linen OR slate

---

## HERO-01 — Hero Banner (16:9)
**Priority: #1 — design team is waiting on this**

```
Editorial product photography, wide scene on a warm oak wood surface, MapleMoon carob chocolate bars and moon packs artfully arranged with natural depth, carob pods and raw almonds scattered as props, late afternoon golden window light raking across from right, deep shadows on left third of frame where text will overlay, cream linen napkin in background, warm cream and deep navy tones, magazine-quality still life, shallow depth of field, 16:9 ratio, --ar 16:9 --style raw --v 6
```

**Notes for retouching:**
- Left 30% of frame must be clear of product — text overlay zone
- Hero bars: original carob + almond + hazelnut foreground
- Moon packs + elixirs middle ground
- Depth: slight blur on background elements

---

## HERO-01m — Hero Banner Mobile (9:16)
**Priority: crop of HERO-01 OR separate vertical shoot**

```
Editorial product photography, tall portrait composition, MapleMoon carob chocolate bar held in hand or resting on warm marble surface, late afternoon golden light from left, warm cream background, navy shadows, carob pod visible as prop, magazine quality, clean negative space at top for text, 9:16 ratio, --ar 9:16 --style raw --v 6
```

**Alt approach:** Crop HERO-01 from centre-right third and reframe for 9:16 in Photoshop.

---

## COLL-01 — Hands Breaking a Bar (4:5 tall)

```
Close-up lifestyle photograph, female hands with minimal jewellery breaking a MapleMoon carob chocolate bar in half, warm oak wood surface, late afternoon directional window light from left, warm cream and brown tones, shallow depth of field, wrapper partially visible with navy branding, no face visible, editorial food photography style, warm grain, --ar 4:5 --style raw --v 6
```

**Notes:**
- Hands should be relaxed, natural — not staged grip
- Broken cross-section of bar should show texture / snap
- Wrapper colour: deep navy with cream lettering (MM branding)

---

## COLL-02 — Bar Texture Close-up (3:2 wide)
**Note: may be achievable by macro-photographing the existing bar assets directly**

```
Extreme close-up macro food photography, cross-section of a dark carob chocolate bar with rough broken edge, warm backlight creating translucent amber glow through the bar edge, warm oak grain surface below, cream linen in background, dark tones, editorial, --ar 3:2 --style raw --v 6
```

**Alt approach:** If you have a physical bar on hand — shoot this yourself with iPhone ProRAW + backlight from a window. Will outperform AI gen for this type of macro.

---

## COLL-03 — Elixir Jar / Pour (4:5 tall)

```
Editorial still life photography, dark glass jar of MapleMoon carob elixir powder with lid removed resting on warm marble surface, small pour of deep brown powder caught mid-fall into a clear glass tumbler, warm spices (cinnamon stick, cardamom pods) arranged beside, late afternoon golden light from right, warm cream and deep brown tones, soft dark background, 4:5 tall format, food photography editorial, --ar 4:5 --style raw --v 6
```

**Notes:**
- Use elixir_spiced for this — more visual with spice props
- Glass tumbler should catch light from behind
- Small pool of dark powder on the marble surface

---

## BRAND-01 — Kitchen Counter Morning (4:5 portrait)

```
Lifestyle editorial photography, MapleMoon carob chocolate bar and elixir jar resting on a warm terracotta tile kitchen counter, morning golden light from a nearby window, out-of-focus kitchen background suggesting a home not a studio, coffee cup partially visible to right edge, warm linen cloth beneath products, honest and intimate not staged, warm cream and earthy tones, 4:5 portrait format, --ar 4:5 --style raw --v 6
```

**Notes:**
- This should feel lived-in — a real kitchen counter, not a studio surface
- Slight motion blur on background acceptable / encouraged
- Products: one bar (original) + elixir_plain jar
- Does NOT need to show full labels clearly — context shot

---

## ADDITIONAL PROMPTS — Collection Banners (for later)

### BANNER-ALL (Full family shot, 16:9)
```
Wide editorial still life, every MapleMoon product family artfully arranged on a warm oak wood surface — carob bars, moon packs, elixir jars, banana packs, eclipse bars, bundle boxes — warm afternoon light from upper right, natural props (carob pods, hazelnuts, almonds, coconut flakes, dried chillies), deep warm shadows, magazine quality, 16:9, --ar 16:9 --style raw --v 6
```

### BANNER-BANA (Banana pack, 16:9)
```
Editorial product photography, MapleMoon carob banana pack resting on warm slate surface beside a peeled ripe banana, warm light from right, playful but premium, warm cream tones, --ar 16:9 --style raw --v 6
```

### BANNER-BUND (Bundle box, 16:9)
```
Editorial still life, MapleMoon gift bundle box slightly open on warm oak surface, contents spilling — bars, moon packs — warm tissue paper, navy and cream packaging visible, late afternoon window light, --ar 16:9 --style raw --v 6
```

### BANNER-DIET (Ingredient flat-lay, 16:9)
```
Overhead flat-lay, raw natural ingredients on cream linen — raw carob pods split open, whole almonds, hazelnuts, coconut flakes, cinnamon sticks — no processed products visible, clean editorial overhead light, warm cream tones, --ar 16:9 --style raw --v 6
```

---

## DELIVERY NOTES

- Resolution: minimum 2400px on shortest edge for print-quality
- Format: JPG 92% for web delivery, keep PSDs/RAWs
- File naming: exactly as shot IDs above (HERO-01.jpg, COLL-01.jpg, etc.)
- Save all outputs to: ~/maplemoon-website/assets/imagery/

## STATUS TRACKER

| Shot ID     | Type      | Status            | Notes |
|-------------|-----------|-------------------|-------|
| HERO-01     | Lifestyle | 🔴 NEEDS GEN      | Priority #1 — blocking design team |
| HERO-01m    | Crop      | 🔴 NEEDS GEN      | Crop HERO-01 or separate shoot |
| COLL-01     | Lifestyle | 🔴 NEEDS GEN      | Hands breaking bar |
| COLL-02     | Detail    | 🔴 NEEDS GEN      | Macro — consider real bar shoot |
| COLL-03     | Lifestyle | 🔴 NEEDS GEN      | Elixir pour |
| COLL-04     | Group     | ✅ COMPOSITE DONE  | 3 bars fanned, 16:9 |
| COLL-05     | Flat-lay  | ✅ COMPOSITE DONE  | Flat-lay with products |
| BRAND-01    | Lifestyle | 🔴 NEEDS GEN      | Kitchen counter, morning light |
| BANNER-BARS | Group     | ✅ COMPOSITE DONE  | All 6 bars fanned |
| BANNER-MOONS| Group     | ✅ COMPOSITE DONE  | 4 moons in arc |
| BANNER-ELIX | Group     | ✅ COMPOSITE DONE  | Both elixirs |
