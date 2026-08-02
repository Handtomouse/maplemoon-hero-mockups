# W1-E prepared product assets — 2026-08-03

## Scope

This is an **unwired staging pack** for W1-E only. No page, build script, manifest or
`staging-v1/` file references this directory. It keeps the range-carousel source selection
separate until the owning WIP writer wires it in a later packet.

- Bars: intentionally omitted — keep current photos.
- Elixirs: intentionally omitted — keep current photos.
- Source: `/Users/handtomouse/UFC/spins/maplemoon_bites_moodboard_export_20260516/output_PNG`.
- All exports are opaque `800 × 800` WebP files. No source file was changed.
- The pre-re-export binaries and review files are recoverable at
  [`_recovery/re-export-20260803T20260803T053505+1000`](./_recovery/re-export-20260803T20260803T053505+1000/).

## Centered framing recipe

The prior `cwebp ... -resize 800 800` recipe scaled each full `2160 × 2160` white source
frame. It therefore retained the source's low, small subject placement. The replacement
recipe does the following for every source:

1. Detect the non-white foreground bounding box with ImageMagick's white-background
   `-fuzz 5%` trim.
2. Make a square crop centred on that box, with its longest foreground axis at **64%** of
   the final frame (18% padding at either end of that axis), then resize to `800 × 800`.
3. Add only white canvas required to keep an out-of-bounds square crop square: `82 px` below
   the banana source and `6 px` below the fudge source. This does not alter either source.
4. Encode with `cwebp -q 80 -m 6 -metadata none`. Two integer crop origins (`moon_hazelnut`
   by `-3 px`, `moon_peppermint` by `-2 px`) were corrected after resampling so their measured
   foreground-box centres also fall inside the same ±2 px gate.

Foreground is measured again after WebP encoding with the same 5% test. The final longest
foreground spans are 63.88%–64.12%, and every foreground-box centre is within ±2 px of the
`400, 400` canvas centre. The QA contact sheet deliberately renders each image at the current
product-card image size of `140 × 140 px`; it is not a large-format beauty preview.

## Source-to-export map

| Product key | Selected source | Source SHA-256 | Prepared export | Export SHA-256 | Bytes |
| --- | --- | --- | --- | --- | ---: |
| `bananas` | `bananas-main.png` | `d8d205df5575110c893c7a7a0e63f291b7b7e99357b2b1273fb9ce086879eca9` | `bananas.webp` | `c3d2d821a440552fc7345dd200de66bb531ea09bd2ff6783b55572abd132cf74` | 9,060 |
| `moon_almond` | `moons-almond-main.png` | `1331deb6f887470f9e1c4c26f6e18835c21fc5279cb162f015fa2d15f55d3893` | `moon_almond.webp` | `bb94abc15854b2cc2b0f969cef5e15b6e34bab352be3f3ce04159a27e9415003` | 9,370 |
| `moon_cayenne` | `moons-chilli.png` | `1624680bac16616e67b6f119620c8474654d08ba0b8772a3aad6be5bad36387d` | `moon_cayenne.webp` | `440f484bbad7d0d8cc0a28b06f7ca27d3b5d91b238d92b55a5c57ba89a3727c6` | 18,864 |
| `moon_goji_coconut` | `moons-goji-coconut.png` | `15d5d7c272cb70e0a4a6baa949cae857592e76c3643b5c63392f108bec7a3801` | `moon_goji_coconut.webp` | `d0f85d6a7f60135da0d410a8e0a11dcf1b56c6d41227f12a3126a2008ed61bad` | 13,792 |
| `moon_hazelnut` | `moons-hazelnut-main.png` | `6dc23576b4851d237161ff5e4f82eddfe21ea682885860e72b22c83aaff14d72` | `moon_hazelnut.webp` | `f96262d9c0ea7eeaa433b63341e5a307d059e105066d529ad9fd43732fb8ef77` | 9,546 |
| `moon_peppermint` | `moons-peppermint-buckwheat.png` | `9ee79007feaa8aec80b08ce53315b8d50cd9d471bb35b4023d6b326f96dd3710` | `moon_peppermint.webp` | `a585d5f7e8e71c2aad805e46167ac602b3dc289ce5e1c5a9ff9a637305c54794` | 9,696 |
| `moon_pure_carob` | `moons-pure-main.png` | `1fb60731f90b23434754e5687a08dbd72055d47a1a5fbf749d8d61c297880b1f` | `moon_pure_carob.webp` | `13f67b56e5449090e16e71d0df54a1e1a421ea753f347ff00f31baa53818e5a2` | 9,148 |
| `eclipse_almond` | `salted-almond-eclipsed-bite-front.png` | `0af6f313e07b9ccc14ef916b9b771291b61a61e928f94d59fe809c53d5203dca` | `eclipse_almond.webp` | `a7fd39184ab0c45975cf3878a03e05a3de7fd571b349de8d7d3bc0fcbf41142e` | 20,744 |
| `eclipse_fudge` | `salted-caramel-fudge-front.png` | `fef539e295d455d71161746e318cf82d125225af4ebb7c7e587596f8e4186ae3` | `eclipse_fudge.webp` | `fc75e1c67d9df1480facb598ddd216c956b35b0ecd4281841e79d63452c96e49` | 33,912 |
| `eclipse_hazelnut` | `hazelnut-eclipsed-bite-front.png` | `7d80de133122d5f5fa9becf9af3080df1f1aaf1af7662ddf8e92b08d3eea05cb` | `eclipse_hazelnut.webp` | `c2adeca8547ecec5408a1abee399a1c665217528305ba5d9b136590b52d70ede` | 23,594 |
| `eclipse_pecan` | `pecan-eclipsed-bite-front.png` | `d1f4656b1aeb2556cd60a7a57f1118d508c3ff8e1885f97aae99e333ac2533e6` | `eclipse_pecan.webp` | `c039673dbe35020272ce69cb5f110899d8e3ac0f72c17831cd5919ed93a10eea` | 15,002 |

The Eclipse selections use `-front.png` exactly as Nate directed. The Moon and banana
selections use their `-main*.png` source; single-shot Moon flavours use their only source file.

## Measured foreground bounds after encoding

All figures use the same `-fuzz 5%` foreground detection against the white output background.
`W × H` and area make shape differences explicit; the shared longest-axis measure is the
consistency target. `Δ centre` is the foreground-box centre relative to the `400, 400` canvas
centre.

| Product key | Foreground bbox (px) | Bbox W × H (% of frame) | Bbox area | Longest axis | Δ centre (px) |
| --- | ---: | ---: | ---: | ---: | ---: |
| `bananas` | 511 × 286 | 63.88% × 35.75% | 22.84% | 63.88% | −0.5, 0.0 |
| `moon_almond` | 443 × 512 | 55.38% × 64.00% | 35.44% | 64.00% | −0.5, −1.0 |
| `moon_cayenne` | 464 × 512 | 58.00% × 64.00% | 37.12% | 64.00% | −2.0, −1.0 |
| `moon_goji_coconut` | 467 × 512 | 58.38% × 64.00% | 37.36% | 64.00% | −1.5, −1.0 |
| `moon_hazelnut` | 425 × 512 | 53.13% × 64.00% | 34.00% | 64.00% | −0.5, −1.0 |
| `moon_peppermint` | 459 × 511 | 57.38% × 63.88% | 36.65% | 63.88% | 0.5, −1.5 |
| `moon_pure_carob` | 459 × 512 | 57.38% × 64.00% | 36.72% | 64.00% | −1.5, 0.0 |
| `eclipse_almond` | 511 × 369 | 63.88% × 46.13% | 29.46% | 63.88% | 0.5, −1.5 |
| `eclipse_fudge` | 511 × 283 | 63.88% × 35.38% | 22.60% | 63.88% | −0.5, −0.5 |
| `eclipse_hazelnut` | 513 × 351 | 64.13% × 43.88% | 28.14% | 64.13% | 0.5, −1.5 |
| `eclipse_pecan` | 511 × 365 | 63.88% × 45.63% | 29.14% | 63.88% | −1.5, −0.5 |

## Carousel repeat instruction

No duplicate binaries are stored. If a future carousel needs more slots than selected images,
repeat the same prepared URL in its data array. In particular, `bananas.webp`,
`moon_cayenne.webp`, `moon_goji_coconut.webp`, and `moon_peppermint.webp` each represent a
single selected view. This preserves R5 without padding or substitution.

## Explicit gaps — do not substitute

- `eclipse_goji`: no matching unpackaged Eclipse Bite source in the 79-file export.
- Coconut bite: no matching unpackaged source in the export.
- Slices: no source file or product family exists in the export.
- Eclipse Bite bundle: no matching unpackaged bundle source in the export.

These are blocked source gaps, not replacement candidates. Do not use bar, packaged-product,
or generated images as stand-ins.

## Verification performed

Each promoted output decoded as `800 × 800` opaque sRGB and passed the 63.5%–64.5%
longest-span plus ±2 px centre gate. `browser-qa-preview.html` is a local-only, unwired
11-up review surface. Visual review remains required before any separate packet wires these
assets into a page.
