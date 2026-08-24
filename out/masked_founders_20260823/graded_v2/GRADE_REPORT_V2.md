# MapleMoon masked founder grade report V2

Status: review output only. Nothing was wired, deployed, published, sent or approved.

## Method

The v1 transform family was retained: one per-image 3x3 RGB matrix followed by a 256-entry monotone LUT for each output channel. The v1 fit remains the regularisation prior, so its established-reference palette and face target are retained rather than replaced.

Ten reference finals were read from `assets/photo_finals/*.webp`. `maplemoon_heros73_brandmatched.webp` was excluded. The other ten, including `mm23_xmp_blue_hero_2400.webp`, were the allowed reference set.

The matrix refit changes only its green-output column, along the minimum-variance direction that has zero mean response on fixed face skin and unit mean response on the image neutral gate. A joint scalar search then imposed the shadow and neutral constraints as hard feasibility conditions and selected the lowest face disturbance branch. The LUT refit lifts only the black anchor by the exact rule `LUT_v2 = max(LUT_v1, 3.0)` for every entry and channel.

No generative fill, smoothing, retouching, geometry edit, mask edit, reshaping or identity change was used. Source RGB was transformed globally; source alpha was copied exactly after content-bbox trimming.

## Gates

The neutral defect gate is unchanged: alpha 255, channel spread under 18, and arithmetic mean luminance from 40 through 220 inclusive. The skin thresholds are unchanged: alpha 255, YCbCr Cb 77..135 and Cr 133..180, R greater than 1.04 B, saturation at least 0.08, and value 35..252.

The v1 report did not record its ellipse coordinates. For reproducibility, V2 freezes reconstructed face ellipses fitted against the v1 printed counts and means: bio_carli_701_masked=((1650, 1050, 540, 760),); bio_dylan_701_masked=((1600, 1000, 600, 825),); pair_592_masked=((1430, 590, 635, 684), (2350, 650, 537, 684)); pair_870_masked=((750, 450, 500, 700), (3000, 550, 500, 700)). This is the only support reconstruction; no numeric threshold gate changed.

## Defect metrics

| Image | Shadow source % | Shadow v1 % | Shadow v2 % | Neutral B-G source | Neutral B-G v1 | Neutral B-G v2 |
|---|---:|---:|---:|---:|---:|---:|
| bio_carli_701_masked | 2.463742 | 2.463179 | 0.000000 | +2.190155 | +4.628875 | +4.466710 |
| bio_dylan_701_masked | 1.166631 | 1.575001 | 0.000000 | +3.528028 | +10.591125 | +6.044058 |
| pair_592_masked | 6.737391 | 7.522747 | 0.000000 | -1.891101 | +8.671389 | +5.664090 |
| pair_870_masked | 2.325821 | 2.775319 | 0.000000 | +0.091885 | +3.304674 | +3.225727 |

V2 neutral spread: 2.818331. Required at most 3.0, with every value from +2.0 through +7.0.

## Face skin agreement

| Image | Before RGB from v1 report | V1 RGB from v1 report | V2 measured RGB | V2 n |
|---|---|---|---|---:|
| bio_carli_701_masked | 129.198/90.820/64.804 | 142.875/102.177/82.000 | 142.5702/102.2582/82.1263 | 1042756 |
| bio_dylan_701_masked | 136.122/86.043/57.793 | 143.224/102.304/82.039 | 142.7447/101.6886/81.7050 | 1288151 |
| pair_592_masked | 134.105/87.357/48.804 | 143.019/102.286/81.912 | 143.0860/102.0894/81.7503 | 1525543 |
| pair_870_masked | 150.452/99.503/60.826 | 142.951/102.266/81.904 | 143.1512/102.4574/82.1825 | 1047519 |

| Maximum pairwise channel difference | Before | V1 | V2 | Limit |
|---|---|---|---|---|
| RGB | 21.2540/13.4600/16.0000 | 0.3493/0.1262/0.1349 | 0.5811/0.7689/0.4776 | under 1.0 each |

## Contrast cost

Rec.709 code-value luminance, solid pixels, P0.5 to P99.5. The span delta includes the constrained matrix refit as well as the three-code black-anchor floor.

| Image | V1 P0.5 | V1 P99.5 | V1 span | V2 P0.5 | V2 P99.5 | V2 span | Span delta |
|---|---:|---:|---:|---:|---:|---:|---:|
| bio_carli_701_masked | 1.0722 | 211.3496 | 210.2774 | 3.0000 | 211.6802 | 208.6802 | -1.5972 |
| bio_dylan_701_masked | 1.0722 | 190.0480 | 188.9758 | 3.0000 | 193.5414 | 190.5414 | +1.5656 |
| pair_592_masked | 0.0000 | 212.4624 | 212.4624 | 3.0000 | 221.1170 | 218.1170 | +5.6546 |
| pair_870_masked | 1.9174 | 224.9136 | 222.9962 | 3.2848 | 223.0540 | 219.7692 | -3.2270 |

The absolute output endpoint moved from 0 to 3, a maximum endpoint-range cost of 3/255 or 1.1765%. The robust span costs above are the measured costs; no broader black-point lift was applied.

## Per-image refits

### bio_carli_701_masked

Face-null direction: [-0.0034256955, -0.0301129196, 0.0478607124]
Scalar step: 0.000000
Refit 3x3 matrix, row-vector RGB multiplied on the right:

```text
[0.9980645468, 0.0004500611, 0.0074183634]
[-0.0011466057, 1.0004724378, 0.0054014862]
[-0.0005927626, 0.0004791085, 1.0040502779]
```

V2 LUT SHA-256: `557de9b2547b04a388e312dae6b3b461ddd9d48c15c9dcd1f12c758bc211f220`; entries per channel: 256; monotone: True.
Alpha source crop SHA-256: `86a35ad49661fe7bdd779032aad6fde90e73981a47893ec890edcbdc09a9ed45`; master: `86a35ad49661fe7bdd779032aad6fde90e73981a47893ec890edcbdc09a9ed45`; verdict IDENTICAL.

### bio_dylan_701_masked

Face-null direction: [-0.0000680942, -0.0569439710, 0.0816264156]
Scalar step: 4.000000
Refit 3x3 matrix, row-vector RGB multiplied on the right:

```text
[0.9891180042, 0.0058538633, 0.0126762560]
[-0.0065633851, 0.7763083394, 0.0082201668]
[-0.0042688074, 0.3295093717, 1.0058675065]
```

V2 LUT SHA-256: `58943b93a4a4a85f328c9385920d31d0ac5077aba27caced30b341dcb2768744`; entries per channel: 256; monotone: True.
Alpha source crop SHA-256: `287d957b335fc79836f905c2c42f82c43dc70e1e3306f308c4ab5b42b640a697`; master: `287d957b335fc79836f905c2c42f82c43dc70e1e3306f308c4ab5b42b640a697`; verdict IDENTICAL.

### pair_592_masked

Face-null direction: [-0.0211450741, -0.0090072329, 0.0643684552]
Scalar step: 5.000000
Refit 3x3 matrix, row-vector RGB multiplied on the right:

```text
[0.9905216221, -0.0968443341, 0.0204234804]
[-0.0062053657, 0.9611493605, 0.0138523154]
[-0.0034858475, 0.3257876872, 1.0083903520]
```

V2 LUT SHA-256: `b6a12d2064aa20f938c3e330ed1d04b0ec9fbe90bf02f8520e8788f9236947f6`; entries per channel: 256; monotone: True.
Alpha source crop SHA-256: `54f68e28740465a4cc96587fc61ee21f640211340322910ae15d82eee13b3803`; master: `54f68e28740465a4cc96587fc61ee21f640211340322910ae15d82eee13b3803`; verdict IDENTICAL.

### pair_870_masked

Face-null direction: [-0.0231481832, -0.0080987568, 0.0625593817]
Scalar step: -0.500000
Refit 3x3 matrix, row-vector RGB multiplied on the right:

```text
[0.9905845513, 0.0121416937, 0.0203453352]
[-0.0063075508, 1.0045320363, 0.0147911008]
[-0.0039170842, -0.0308560908, 1.0104753404]
```

V2 LUT SHA-256: `10f688b886ea329cae8906d999f73b3ea4436b9355119502ff51247786f176fe`; entries per channel: 256; monotone: True.
Alpha source crop SHA-256: `ed446cf2eb241b6664c3059c762db40d70c57be0953630abe0b9bb48ccaad0aa`; master: `ed446cf2eb241b6664c3059c762db40d70c57be0953630abe0b9bb48ccaad0aa`; verdict IDENTICAL.

## Output inventory

- `bio_carli_701_masked_graded_master.png`: 16129734 bytes; 3240x3902; mode RGBA; SHA-256 `6ffcf8d1cafa5f0f87773bbb15808accfde1a79484b6ce75b0d4ddfb853a49f9`
- `bio_carli_701_masked_graded_2400.webp`: 1087638 bytes; 1993x2400; mode RGBA; SHA-256 `48b7032778a8a492129290bed69054004decc3f93ffc2a8b9b71bd997b7e1f0b`
- `bio_carli_701_masked_graded_1600.webp`: 572658 bytes; 1329x1600; mode RGBA; SHA-256 `2078db147029a5a391e72b9be5ddf55120dd2423ec0f402af438bd243b58243d`
- `bio_dylan_701_masked_graded_master.png`: 10720147 bytes; 3240x3872; mode RGBA; SHA-256 `7caae7e28569cdc4491ff52f6f1c8ff8669f716e01d18efdab14cb051c67db46`
- `bio_dylan_701_masked_graded_2400.webp`: 398396 bytes; 2008x2400; mode RGBA; SHA-256 `34f7022d44a084d72ef6e05e4f3acf7cd64e26a8a08e3d1b555136dad267f942`
- `bio_dylan_701_masked_graded_1600.webp`: 223544 bytes; 1339x1600; mode RGBA; SHA-256 `cbe0871cfa37ecff16219d80a4bc73801155abf58868dfe51650ba98491d6185`
- `pair_592_masked_graded_master.png`: 17948895 bytes; 4988x3231; mode RGBA; SHA-256 `e4f49e2887c8874f381c79b3d0331c5d68456612ea9c04e17b7a50a2f35e1db3`
- `pair_592_masked_graded_2400.webp`: 587436 bytes; 2400x1555; mode RGBA; SHA-256 `ea63cd7f166afebca909077f8a32c71fb2a0a104c0bd463f662ddc0b2676de85`
- `pair_592_masked_graded_1600.webp`: 268904 bytes; 1600x1036; mode RGBA; SHA-256 `08b25d82b276ebf2f2bad213a154c6149f6b92d1946a654a7559b5d9caf3f226`
- `pair_870_masked_graded_master.png`: 18086780 bytes; 4029x2929; mode RGBA; SHA-256 `897b13246bfd9f67dcbb53a605f91deabd07a5b8100115a3db114b36ff7cca66`
- `pair_870_masked_graded_2400.webp`: 1121676 bytes; 2400x1745; mode RGBA; SHA-256 `8ab2e082bd9f078303630251d2352833b3f5ae68d91a9eb86a8fc0afcbd5681c`
- `pair_870_masked_graded_1600.webp`: 488742 bytes; 1600x1163; mode RGBA; SHA-256 `9023e1334f2dbdaf687f8f1526c4e1fd9b5ab3fe683371d1f28b54afc7c37bd5`
