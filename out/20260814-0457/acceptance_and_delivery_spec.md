# Acceptance and delivery specification

This document is the review contract for the MapleMoon carob story pickup. A visually attractive frame does not override a failed identity, crop, rights or integrity gate.

## Status vocabulary

- PASS: every photographic, rights, metadata and integrity gate succeeds.
- PICKUP: only a clearly named photographic reshoot remains.
- HOLD: missing rights, metadata, specimen truth or checksum evidence.
- REJECT: altered anatomy, generated pixels, false process depiction or irrecoverable mismatch.

## Pair acceptance, carob and cacao

Capture gates:

- Same camera body, serial, profile, lens, focal length, aperture, ISO, shutter, camera height and tripod
- Camera-to-subject distance difference no more than 2 percent
- Camera yaw, pitch and roll difference no more than 1 degree
- Key-light azimuth/elevation difference no more than 3 degrees
- Key-to-fill exposure difference no more than 0.2 EV
- White-balance difference no more than 150K and 2 tint units

Master framing:

- 4:3 master
- Complete specimen and stem inside x=30 to 70 percent and y=13 to 87 percent
- Preferred silhouette box 28 to 32 percent W and 55 to 62 percent H

At every 390, 834 and 1440 live crop:

- Complete silhouette visible with at least 8 percent clear margin
- Long-axis occupancy delta no more than 5 percentage points
- Silhouette-area occupancy delta no more than 8 percentage points
- Centroid delta no more than 3 percent of width and height
- Background median DeltaE00 no more than 3
- Neutral background L* difference no more than 3
- Shadow-vector angle difference no more than 5 degrees
- Normalized shadow-length difference no more than 10 percent
- Penumbra-width difference no more than 15 percent
- Edge-acutance difference no more than 10 percent

Review crops at 2000px height:

- 390 contract: 1091 x 2000
- 834 contract: 2426 x 2000
- 1440 contract: 3580 x 2000

## Sequence acceptance, grove, pod and roast

Hard provenance gates:

- Same named photographer
- Same local calendar date and timezone
- Same camera body serial and colour profile
- Three distinct capture IDs
- One documented portable lighting family

Consistency gates:

- Gray-card exposure spread no more than 0.15 EV
- White-balance spread no more than 200K and 3 tint units
- Key-light direction spread no more than 10 degrees
- Key-to-fill spread no more than 0.3 EV
- Normalized shadow-softness spread no more than 15 percent
- Shared tone-curve node difference no more than 2/255 at 25, 50 and 75 percent input
- ColorChecker neutral-patch DeltaE00 no more than 3
- Highlight clipping above RGB 250 below 0.1 percent, excluding unavoidable sky
- Shadow clipping below RGB 5 below 0.5 percent
- Exact final ratio 1.430 plus or minus 0.001
- Identical final dimensions, minimum 2860 x 2000
- Primary action centroid x=45 to 55 percent and y=40 to 60 percent
- Essential action margin at least 6 percent, target 10 percent

The sequence may move from wide to medium to close. Matching subject size is not required. Light direction, softness, grade and narrative continuity are.

## Identity and factual gates

- Carob morphology matches the physical specimen and RAW: long, flat, curved, ridged and naturally irregular
- Cacao morphology matches the physical specimen and RAW, including seed and pulp placement
- No moon or crescent arrangement
- Grove is the named real location and has property permission
- Pod is naturally attached to the photographed tree
- Roast material or action is named and signed off by the process owner
- Cacao source and botanical identity are documented
- No caption claims more than the frame and receipt prove

Any changed pod, stem, seed, pulp, ridge, scar, attachment point or powder feature is an automatic REJECT.

## Retouch boundary

Allowed:

- Lens and chromatic-aberration correction
- Crop, rotation and normalized pixel orientation
- Exposure, white balance, global tone curve and shared restrained grade
- Sensor-dust cleanup outside botanical subjects
- Noise reduction and capture sharpening
- Minor dodge and burn that does not alter anatomy
- Canvas extension from a photographed blank plate made in the exact same locked setup

Conditional:

- Focus stack or exposure blend from logged locked frames only
- No seam may cross pod, stem, seed, pulp, branch or powder anatomy
- Background patching is outside the subject mask and logged

Prohibited:

- Generative fill, generative remove, content-aware reconstruction or synthetic relighting
- Liquify, warp or free perspective that changes proportions
- Cloning, healing, adding, removing or moving botanical or powder features
- Compositing subjects from separate captures
- Removing natural product blemishes
- Fabricating steam, smoke, heat, roast equipment or process

Automated anatomy check after registration:

- Subject-mask IoU at least 0.995 against the RAW-derived mask
- 95th-percentile boundary displacement no more than 2px at 2000px output height
- Maximum boundary displacement no more than 5px outside antialiasing
- Edge-map SSIM within the subject at least 0.98

## Rights

Required before acceptance:

- Signed photographer commission
- Copyright assignment or perpetual worldwide commercial licence
- Uses cover website, editorial, ecommerce, social, paid promotion, crops, retouching and derivative layouts
- Explicit photographer credit wording or written waiver
- Orchard/property release
- Production-site permission
- Model release for any identifiable person or hands
- Cacao supplier/source receipt
- Process-owner roast confirmation

The prior Enlighten quote does not contain sufficient rights language. The pickup must close that gap in writing.

## Delivery tree

Use lowercase snake case only:

```text
maplemoon_carob_story_pickup_yyyymmdd/
  rights/
  raw_original/
  raw_sidecars/
  selects/
  retouch_masters/
  final_masters/
  responsive_crops/
  proof/
    raw_proxies/
    crop_overlays/
    rejected_examples/
  metadata/
    manifest.json
    manifest.csv
    exiftool.json
    retouch_log.json
    checksums_sha256.txt
    rights_receipt.json
  contact_sheet.html
  readme.md
```

Example IDs:

```text
mmcs_s02_carob_compare_a_f0001_raw.arw
mmcs_s02_carob_compare_a_f0001_master_v01.tif
mmcs_s02_carob_compare_crop_390_v01.png
```

## Manifest fields

For every source and derivative:

- Job, slot, role, asset ID and capture ID
- Original camera filename
- Parent asset ID and parent SHA-256
- Relative path, MIME type, bytes and decoded dimensions
- Channels, bit depth, alpha and embedded ICC profile
- RAW and normalized orientation
- Capture timestamp and timezone
- Photographer, camera and lens serials
- Focal length, aperture, shutter, ISO, WB and profile
- Lighting setup ID
- Camera height, subject distance, yaw, pitch and roll
- Specimen, batch, backdrop and surface IDs
- Crop rectangle, target viewport and object position
- Retouch application/version and exact operations
- Layered-master path
- Copyright owner, grant, receipt, release and credit
- QA metrics, reviewer, review date and verdict

## Integrity

- SHA-256 for every RAW, sidecar, select, master, crop, receipt and release
- Untouched EXIF/IPTC/XMP dump from exiftool
- sRGB IEC61966-2.1 embedded in web outputs
- Pixel orientation physically normalized, not dependent on EXIF rotation
- A successful real-output checksum command:

```sh
shasum -a 256 -c metadata/checksums_sha256.txt
```

## Contact sheet

The delivered contact_sheet.html must be self-contained: embedded review proxies, inline CSS, no scripts, no external fonts or asset URLs.

Required order:

1. Shoot identity, date, photographer, rights state, manifest hash and overall verdict
2. Whole set in page order
3. Slot 7 labelled alias_of_slot_02, not a separate commissioned primary
4. Simulated page crops at 390, 834 and 1440
5. Carob and cacao pair at all three ratios with safe-area and measured-delta overlays
6. Grove, pod and roast as one triptych, first RAW-neutral then graded
7. Per-shot slate, RAW proxy, select, master, crops, metadata and rights
8. Red do_not_match board showing the rejected anatomy-changing trials and blue studies
9. Integrity table with filename, dimensions, SHA-256 and verdict

Automated contact-sheet gate:

- Every manifest item marked contact_sheet=true appears
- Zero broken decodes
- Zero external src or href
- Zero horizontal overflow at 390, 834 and 1440
- Browser version and instrument recorded
- Fresh headless Chrome profile, cache disabled, DPR 1, viewport height 1200

Nothing is wired until Nate accepts the complete contact sheet.
