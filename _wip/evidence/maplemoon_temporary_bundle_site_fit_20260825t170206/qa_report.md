# Temporary bundle site-fit QA

Status: **TEMPORARY STAGING / REPLACE BEFORE FINAL / PRIVATE PREVIEW / UNDEPLOYED**

## Outcome

The deterministic site-fit build and task-specific browser checks pass. The result
is fit for private staging review only. It is not launch-admitted product imagery.

- Output tree: `b11cb60ef1629a8d4cc64dec8caa8359031361f22fb7c54d36ded55c74450bf0`
- Output files: 77
- Output bytes: 14,794,095
- Web asset: 1080 x 668 transparent WebP, 90,474 bytes
- Web asset SHA-256: `8bca090850c29da285ae266d8bf666199ae7cacbeee475160df13bc82c66932f`
- Browser QA: 4/4 cases pass, zero task-owned console, page, internal request,
  response, clipping or overflow failures
- Temporary bundle declares lazy loading on Home and Shop at both widths
- Pure flavour filter hides the bundle; All restores it
- Release guard returns expected exit 2 with five temporary markers

## Exact rendered geometry

| Surface | Width / DPR | Visible asset canvas | Host well or stage | Result |
|---|---:|---:|---:|---|
| Shop grid | 390 / 2 | 288 x 178 CSS px | 332 x 332 CSS px | Pass |
| Shop grid | 1440 / 1 | 314 x 194 CSS px | 359 x 359 CSS px | Pass |
| Home centred | 390 / 2 | 204 x 126 CSS px | 334 x 326 CSS px stage | Pass |
| Home centred | 1440 / 1 | 295 x 182 CSS px | 1384 x 475 CSS px stage | Pass |

Shop list view was also rendered at 390 and 1440 with non-zero image geometry,
no clipping and no page-width overflow.

## Known product-truth failures preserved

1. Salted Almond and Hazelnut remain too similar at a glance.
2. The three domes remain too uniform and mould-made.
3. Salted Caramel Fudge remains too regular and synthetic in geometry.
4. Goji surface material remains unverified against a bound real raw.
5. This is generated source material and cannot become final catalogue photography.

These are replacement requirements, not site-fit defects. No generative operation,
paid call, object movement, recolour, inpainting or product reconstruction occurred.

## Verification output

```text
PASS checkpoint packet=maplemoon_temporary_bundle_site_fit_20260825t170206 files=5 path=_wip/checkpoints/maplemoon_temporary_bundle_site_fit_20260825t170206
PASS packet=maplemoon_temporary_bundle_site_fit_20260825t170206 phase=start scope=5
BUILD PASS output=.../maplemoon_temporary_bundle_preview_20260825t170206 tree_sha256=b11cb60ef1629a8d4cc64dec8caa8359031361f22fb7c54d36ded55c74450bf0 files=77 bytes=14794095 asset=1080x668 asset_bytes=90474 asset_sha256=8bca090850c29da285ae266d8bf666199ae7cacbeee475160df13bc82c66932f status=temporary_replace_before_final
VERIFY PASS output=.../maplemoon_temporary_bundle_preview_20260825t170206 tree_sha256=b11cb60ef1629a8d4cc64dec8caa8359031361f22fb7c54d36ded55c74450bf0 files=77 bytes=14794095 asset_sha256=8bca090850c29da285ae266d8bf666199ae7cacbeee475160df13bc82c66932f asset_bytes=90474 status=temporary_replace_before_final
BROWSER PASS cases=4 failures=0
CASE shop@390 dpr=2 status=200 console=0 task_runtime=0
CASE homepage@390 dpr=2 status=200 console=0 task_runtime=0
CASE shop@1440 dpr=1 status=200 console=0 task_runtime=0
CASE homepage@1440 dpr=1 status=200 console=0 task_runtime=0
HOLD TEMPORARY_BUNDLE_REPLACE_BEFORE_FINAL matches=5
```

The build was run twice and returned the same output tree and asset hashes.

## Scope and concurrent state

No WIP, root page, canonical asset, Shopify, Git, deployment, production or client
state was changed by this task. During the phase, an unrelated concurrent change was
observed on `_wip/homepage_real_1_lead_photo.WIP.html`: its observed SHA-256 moved
from `b1d02e0060430a892d1b76af30ee1503fcdfc98b693a617dea744d98b51214d8`
to `538202828f60e3acf5f2e1474c129052fc21e7338b702412cd3a025f0718a33c`.
This task did not read that changing WIP as a build input. The preview derives only
from the pinned 75-file base tree, so its bytes remain deterministic.

## One next action

Nate reviews the annotated Home and Shop proofs. If retained for staging, keep this
exact generated directory private and preserve the release guard until real verified
five-product photography replaces the temporary asset.
