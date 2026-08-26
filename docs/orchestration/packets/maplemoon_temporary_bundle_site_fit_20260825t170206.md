# MapleMoon temporary bundle site fit

Status: **READY / PRIVATE PREVIEW ONLY / TEMPORARY / REPLACE BEFORE FINAL**

This packet authorises one non-overwriting private-preview derivative from the exact
24 August admitted preview tree. It does not authorise edits to source WIPs, root
pages, canonical assets, Shopify, Git, deployment, production or client state.

The product source is the accepted deterministic cut-out of the corrected AI
candidate. Product RGB, geometry, count and arrangement must not be regenerated,
recoloured or reconstructed. Site fitting may trim transparent canvas, resample for
web delivery and apply CSS layout/shadow treatment inside the generated preview.

## Pinned inputs

- Base preview: `_wip/deploy/generated/maplemoon-admitted-preview-r4-20260824T111607`
  - tree SHA-256: `5a649086667c7ed017e45b2cb97fdf6d356d1b4ad636a2d51b09b2b7321efe49`
  - 75 files, 14,863,579 bytes
- Accepted full cut-out:
  `_wip/evidence/maplemoon_temporary_bundle_derivative_20260825t153228/derived/temporary_bundle_cutout_full.png`
  - SHA-256: `cbdbf30d95a5bd8a281ba0e49726881d16702ff046b73f3bbd6482a17396bb28`
- Accepted web cut-out:
  `_wip/evidence/maplemoon_temporary_bundle_derivative_20260825t153228/derived/temporary_bundle_cutout_web_1200.webp`
  - SHA-256: `d7c6294ab86bbf4302475b3f7c4d660691f352556ccddc87738f53435328b5d1`

## Required result

1. Create a tight transparent web derivative with snake_case naming and no
   generative reconstruction.
2. Bind it only inside the new generated preview on both Home and Shop.
3. Add bundle-specific sizing without stretching product pixels.
4. Ensure the bundle is visible only under the `All` flavour state, not `Pure`.
5. Preserve a prominent temporary status through an annotated proof, manifest and
   a release guard that returns non-zero when run against this temporary preview.
6. Render and inspect Home and Shop at 390 and 1440 pixels, including the centred
   homepage bundle and Shop grid/list/filter states.

## Stop conditions

- Any source, WIP, root page or canonical asset changes.
- Any product addition, removal, movement, recolour, inpainting or generation.
- Any output outside the exact writable scope.
- Any missing checkpoint, source hash mismatch, broken image, clipping, overflow,
  incorrect flavour filtering or absent replacement guard.
- Any deployment, publish, Shopify, Git or client action.

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "maplemoon_temporary_bundle_site_fit_20260825t170206",
  "worker_thread_id": "019ffe53-6243-73a2-9d75-e1a072cd07ce",
  "state": "ready",
  "objective": "Build and QA a non-overwriting private-preview-only site fit of the accepted temporary five-product bundle with an automatic replacement guard.",
  "readable_paths": [
    "_wip/deploy/generated/maplemoon-admitted-preview-r4-20260824T111607",
    "_wip/evidence/maplemoon_temporary_bundle_derivative_20260825t153228",
    "scripts/check-maplemoon-receipt.py",
    "docs/orchestration/SIDECHAT_RECEIPT_GATE.md"
  ],
  "writable_paths": [
    "scripts/build_maplemoon_temporary_bundle_preview_20260825.py",
    "scripts/check_maplemoon_temporary_bundle_preview_20260825.py",
    "_wip/deploy/generated/maplemoon_temporary_bundle_preview_20260825t170206",
    "_wip/evidence/maplemoon_temporary_bundle_site_fit_20260825t170206",
    "docs/orchestration/reviews/maplemoon_temporary_bundle_site_fit_20260825t170206.json"
  ],
  "verify": [
    "receipt gate phase start and complete",
    "pinned base tree and accepted cut-out hashes",
    "deterministic build replay",
    "temporary replacement guard expected HOLD exit",
    "Home and Shop browser QA at 390 and 1440",
    "visual inspection of rendered proofs"
  ],
  "stop": [
    "source or canonical path mutation",
    "source hash mismatch",
    "product reconstruction or identity drift",
    "browser or visual gate failure",
    "deployment, Shopify, Git or client action"
  ],
  "next_reviewer": "Nate",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->
