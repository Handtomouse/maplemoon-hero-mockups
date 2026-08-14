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

## Centered, equal-weight framing recipe

The prior `cwebp ... -resize 800 800` recipe scaled each full `2160 × 2160` white source
frame. It therefore retained the source's low, small subject placement. The replacement
recipe does the following for every source:

1. Detect the non-white foreground bounding box with ImageMagick's white-background
   `-fuzz 5%` trim.
2. Make a square crop centred on that box with a **34% foreground-box area target**. This is
   the median range coverage, so a thin banana or fudge slice is enlarged enough to read with
   the same visual weight as a Moon, without making any product fill the frame maximally.
3. Resize the square crop to `800 × 800` and encode with
   `cwebp -q 80 -m 6 -metadata none`. No white extension was required for the final crops.

Foreground is measured again after WebP encoding with the same 5% test. The final
foreground-box areas are 33.67%–34.17%, and every foreground-box centre is within ±2 px of
the `400, 400` canvas centre. The QA contact sheet deliberately renders each image at the
current product-card image size of `140 × 140 px`; it is not a large-format beauty preview.

## Source-to-export map

| Product key | Selected source | Source SHA-256 | Prepared export | Export SHA-256 | Bytes |
| --- | --- | --- | --- | --- | ---: |
| `bananas` | `bananas-main.png` | `d8d205df5575110c893c7a7a0e63f291b7b7e99357b2b1273fb9ce086879eca9` | `bananas.webp` | `09626c817446a751d229f48038ddf2b07bc032ffb951899a8cab486004de36ff` | 11,782 |
| `moon_almond` | `moons-almond-main.png` | `1331deb6f887470f9e1c4c26f6e18835c21fc5279cb162f015fa2d15f55d3893` | `moon_almond.webp` | `de8f28186c50d7a407f2070293b418b872b4187d985b62c96f328844ba7c42f1` | 9,246 |
| `moon_cayenne` | `moons-chilli.png` | `1624680bac16616e67b6f119620c8474654d08ba0b8772a3aad6be5bad36387d` | `moon_cayenne.webp` | `f6f2e71b5c59abe56a79bb04afcc6c15a1597644628eda5a3c8e90d204297cc0` | 17,374 |
| `moon_goji_coconut` | `moons-goji-coconut.png` | `15d5d7c272cb70e0a4a6baa949cae857592e76c3643b5c63392f108bec7a3801` | `moon_goji_coconut.webp` | `fdd5be44f37e9766c966541ceaf68a044279409a2cc87f7d056c244226ac5b32` | 12,990 |
| `moon_hazelnut` | `moons-hazelnut-main.png` | `6dc23576b4851d237161ff5e4f82eddfe21ea682885860e72b22c83aaff14d72` | `moon_hazelnut.webp` | `bb73f940642a56bf4a593cef58b1ba593b8664517126722690dad08453b583cc` | 9,198 |
| `moon_peppermint` | `moons-peppermint-buckwheat.png` | `9ee79007feaa8aec80b08ce53315b8d50cd9d471bb35b4023d6b326f96dd3710` | `moon_peppermint.webp` | `463a192590e7762ed928609b01d67555ef4869c1c13c7de43d47a757bad51b45` | 9,492 |
| `moon_pure_carob` | `moons-pure-main.png` | `1fb60731f90b23434754e5687a08dbd72055d47a1a5fbf749d8d61c297880b1f` | `moon_pure_carob.webp` | `8e8a41d0442d76eea707a26c5d1da604d8ef95384551389547caa7fd21865295` | 9,134 |
| `eclipse_almond` | `salted-almond-eclipsed-bite-front.png` | `0af6f313e07b9ccc14ef916b9b771291b61a61e928f94d59fe809c53d5203dca` | `eclipse_almond.webp` | `ed43b412568a4d3ac2beeee08927f9f18453838a4a3fdecd63ba98b37b8ed703` | 22,676 |
| `eclipse_fudge` | `salted-caramel-fudge-front.png` | `fef539e295d455d71161746e318cf82d125225af4ebb7c7e587596f8e4186ae3` | `eclipse_fudge.webp` | `61b38e828f35e87d1c142835a03e73fcb599a09c9388cc709345ee6ff44a3e9a` | 47,794 |
| `eclipse_hazelnut` | `hazelnut-eclipsed-bite-front.png` | `7d80de133122d5f5fa9becf9af3080df1f1aaf1af7662ddf8e92b08d3eea05cb` | `eclipse_hazelnut.webp` | `83413a35ce8d53a808ed6f40079e6b272b39f287d93788bdca23435c2fe16df4` | 27,174 |
| `eclipse_pecan` | `pecan-eclipsed-bite-front.png` | `d1f4656b1aeb2556cd60a7a57f1118d508c3ff8e1885f97aae99e333ac2533e6` | `eclipse_pecan.webp` | `e3f1216e701eb5b8b194eb4f5259bee43a4bc8c854ff830c3cd4a3909cb5943b` | 17,290 |

The Eclipse selections use `-front.png` exactly as Nate directed. The Moon and banana
selections use their `-main*.png` source; single-shot Moon flavours use their only source file.

## Measured foreground bounds after encoding

All figures use the same `-fuzz 5%` foreground detection against the white output background.
`W × H` makes the different product shapes explicit; the shared foreground-box area is the
consistency target. `Δ centre` is the foreground-box centre relative to the `400, 400` canvas
centre.

| Product key | Foreground bbox (px) | Bbox W × H (% of frame) | Bbox area | Longest axis | Δ centre (px) |
| --- | ---: | ---: | ---: | ---: | ---: |
| `bananas` | 622 × 347 | 77.75% × 43.38% | 33.72% | 77.75% | −1.0, −0.5 |
| `moon_almond` | 434 × 502 | 54.25% × 62.75% | 34.04% | 62.75% | 0.0, −1.0 |
| `moon_cayenne` | 449 × 487 | 56.13% × 60.88% | 34.17% | 60.88% | 1.5, −0.5 |
| `moon_goji_coconut` | 446 × 486 | 55.75% × 60.75% | 33.87% | 60.75% | −1.0, −1.0 |
| `moon_hazelnut` | 425 × 507 | 53.13% × 63.38% | 33.67% | 63.38% | −1.5, −0.5 |
| `moon_peppermint` | 444 × 491 | 55.50% × 61.38% | 34.06% | 61.38% | 0.0, −1.5 |
| `moon_pure_carob` | 440 × 491 | 55.00% × 61.38% | 33.76% | 61.38% | −2.0, −0.5 |
| `eclipse_almond` | 546 × 395 | 68.25% × 49.38% | 33.70% | 68.25% | 0.0, −1.5 |
| `eclipse_fudge` | 628 × 347 | 78.50% × 43.38% | 34.05% | 78.50% | 0.0, −0.5 |
| `eclipse_hazelnut` | 563 × 385 | 70.38% × 48.13% | 33.87% | 70.38% | 0.5, −0.5 |
| `eclipse_pecan` | 553 × 394 | 69.13% × 49.25% | 34.04% | 69.13% | 0.5, 0.0 |

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

Each promoted output decoded as `800 × 800` opaque sRGB and passed the 33.0%–35.0%
foreground-box-area plus ±2 px centre gate. `browser-qa-preview.html` is a local-only,
unwired 11-up review surface. Visual review remains required before any separate packet wires
these assets into a page.
