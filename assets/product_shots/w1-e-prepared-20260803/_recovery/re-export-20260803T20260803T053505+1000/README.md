# W1-E prepared product assets — 2026-08-03

## Scope

This is an **unwired staging pack** for W1-E only. No page, build script, manifest or
`staging-v1/` file references this directory. It keeps the range-carousel source selection
separate until the owning WIP writer wires it in a later packet.

- Bars: intentionally omitted — keep current photos.
- Elixirs: intentionally omitted — keep current photos.
- Source: `/Users/handtomouse/UFC/spins/maplemoon_bites_moodboard_export_20260516/output_PNG`.
- Recipe: `cwebp -q 80 -m 6 -metadata none -resize 800 800`.
- All exports are opaque `800 x 800` WebP files. No source file was changed.

## Source-to-export map

| Product key | Selected source | Source SHA-256 | Prepared export | Export SHA-256 | Bytes |
| --- | --- | --- | --- | --- | ---: |
| `bananas` | `bananas-main.png` | `d8d205df5575110c893c7a7a0e63f291b7b7e99357b2b1273fb9ce086879eca9` | `bananas.webp` | `0957046b6cfcc0e3f96bccd24432d23e5c7df297b12c665342d6ae7331dbf76c` | 4,294 |
| `moon_almond` | `moons-almond-main.png` | `1331deb6f887470f9e1c4c26f6e18835c21fc5279cb162f015fa2d15f55d3893` | `moon_almond.webp` | `a5537b6ffbede1bbffbe801abdfe542a0d616c632bb09f83c76fc50683bf9d18` | 3,620 |
| `moon_cayenne` | `moons-chilli.png` | `1624680bac16616e67b6f119620c8474654d08ba0b8772a3aad6be5bad36387d` | `moon_cayenne.webp` | `2c96b91a52112fd813b5ae3b9861fa25a7de8bdca8c0d992d8fce8a7ba61e341` | 3,666 |
| `moon_goji_coconut` | `moons-goji-coconut.png` | `15d5d7c272cb70e0a4a6baa949cae857592e76c3643b5c63392f108bec7a3801` | `moon_goji_coconut.webp` | `c7adee01ff46241937c786b9ff0755e328132b03b6dc88597fcc0e9e7a0492c2` | 4,032 |
| `moon_hazelnut` | `moons-hazelnut-main.png` | `6dc23576b4851d237161ff5e4f82eddfe21ea682885860e72b22c83aaff14d72` | `moon_hazelnut.webp` | `551c381dabe548994d1fb6239a34c01a13be1281ded6e3075d7452794a3710e6` | 3,554 |
| `moon_peppermint` | `moons-peppermint-buckwheat.png` | `9ee79007feaa8aec80b08ce53315b8d50cd9d471bb35b4023d6b326f96dd3710` | `moon_peppermint.webp` | `5ffe6517de0c06278725833989c150e50a8537494013c1479678bb79e673f5cc` | 3,232 |
| `moon_pure_carob` | `moons-pure-main.png` | `1fb60731f90b23434754e5687a08dbd72055d47a1a5fbf749d8d61c297880b1f` | `moon_pure_carob.webp` | `1f436851f77d2eeebdbf105cfffd6eeb7c5dac756fff53e463a86237688afe86` | 3,170 |
| `eclipse_almond` | `salted-almond-eclipsed-bite-front.png` | `0af6f313e07b9ccc14ef916b9b771291b61a61e928f94d59fe809c53d5203dca` | `eclipse_almond.webp` | `47d909f7b0db651f183a89be1f09f62f3afc7b6718640b952d8d6d95b3a62c3e` | 6,342 |
| `eclipse_fudge` | `salted-caramel-fudge-front.png` | `fef539e295d455d71161746e318cf82d125225af4ebb7c7e587596f8e4186ae3` | `eclipse_fudge.webp` | `97f17a7bad99f4fb2c2ff5694988dbc40346cb3ce35afa893f4778c727fd7d04` | 11,002 |
| `eclipse_hazelnut` | `hazelnut-eclipsed-bite-front.png` | `7d80de133122d5f5fa9becf9af3080df1f1aaf1af7662ddf8e92b08d3eea05cb` | `eclipse_hazelnut.webp` | `746af66d9da176c80ddab4dac9d4bf56392bc7332bb658003a0de1e0e2c89587` | 5,958 |
| `eclipse_pecan` | `pecan-eclipsed-bite-front.png` | `d1f4656b1aeb2556cd60a7a57f1118d508c3ff8e1885f97aae99e333ac2533e6` | `eclipse_pecan.webp` | `47bf0daec3ab9ee9cde78ae81fc2af6a4edc1352c1e71b341911bca79e595eb3` | 3,752 |

The Eclipse selections use `-front.png` exactly as Nate directed. The Moon and banana
selections use their `-main*.png` source; single-shot Moon flavours use their only source file.

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

Every output decoded as `800 x 800`; the contact-sheet render showed all eleven products at
their final export pixels. The exported files have non-zero pixel variance and no alpha channel.

