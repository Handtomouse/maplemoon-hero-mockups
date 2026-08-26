# Temporary five-product bundle derivative handoff

## Approval status

**TEMPORARY STAGING / REPLACE BEFORE FINAL / UNWIRED**

This is not final, launch-admitted or client-deliverable product photography. It must be replaced by the real five-product bundle before final approval.

## Exact corrected candidate

The source is not guessed. Both the boss ledger and the 2026-08-24 homepage imagery handoff identify:

- Source: `/Users/handtomouse/.codex/generated_images/019ffe53-6243-73a2-9d75-e1a072cd07ce/exec-82159e46-662a-4e9b-af90-0e2c68af52ac.png`
- Geometry: 1536 x 1024 RGB PNG
- SHA-256: `b7d669130ef5c1482b4d3655e1407885087c884089cfdbadd7b0b5d0c5abdba1`

The earlier `exec-d2bd1b23...` candidate remains rejected/superseded and was not used.

## Accepted deterministic derivatives

- `derived/temporary_bundle_cutout_full.png`, 1536 x 1024 RGBA, SHA-256 `cbdbf30d95a5bd8a281ba0e49726881d16702ff046b73f3bbd6482a17396bb28`
- `derived/temporary_bundle_cutout_web_1200.webp`, 1200 x 800 transparent lossless WebP, SHA-256 `d7c6294ab86bbf4302475b3f7c4d660691f352556ccddc87738f53435328b5d1`
- `derived/temporary_bundle_alpha_mask.png`, 1536 x 1024 grayscale PNG, SHA-256 `5ef57b8c89b863e268e1de26ff11cbc340d3ee00ad57bd17d80c0fcec9b2bdbc`
- `derived/temporary_bundle_edge_proof_cream.png`, canonical `#E7E4CA`, SHA-256 `763f1ba17dc62fce0262df73bfb44a6f1690df62a3ff7ba79e054847b4ebe552`
- `derived/temporary_bundle_edge_proof_dark.png`, canonical `#1E2A1E`, SHA-256 `b0fe8feb2ba58fc2039a353c0a851d2abeeb9eadd1b310f661c077b675288b6b`
- `derived/temporary_bundle_edge_proof_site_blue.png`, canonical `#1E4366`, SHA-256 `460e4b51db5baf6050ea574725a5a496d5abb23d9539f233b9d0cee9d4980e9f`

## Method and truth boundary

The accepted alpha was estimated by the cached local `birefnet-general.onnx` foreground-segmentation model, SHA-256 `58f621f00f5d756097615970a88a791584600dcf7c45b18a0a6267535a1ebd3c`. The model was used for segmentation only, not generation.

Two runs produced byte-identical binary alpha. A one-pixel inward-only antialias was applied so no background pixels were admitted. The full-resolution RGBA output copies every source RGB byte unchanged. No generation, inpainting, colour grading, geometry change, object addition or object removal occurred. Original contact shadows were excluded rather than reconstructed.

## Known product-truth defects preserved

- The two crumb-topped Almond/Hazelnut bodies remain difficult to distinguish.
- The three domes still read too moulded and uniform.
- Fudge scale/geometry remains too synthetic and regular.
- Goji surface remains unverified against a real raw.

The temporary approval does not resolve these defects.

## Failures

- Attempt 01 passed mechanical checks but retained broad beige floor/shadow remnants on dark and blue backgrounds. It is rejected and preserved under `attempt_01_grabcut_failed/`.
- Attempt 02 produced clean edges but a binary matte with no partial-alpha pixels, contrary to the packet contract. It is held and preserved under `attempt_02_birefnet_binary_hold/`.

## One next action

If BOSS wants staging placement, open a separate, explicitly authorised and checkpointed wiring packet that names the exact temporary derivative and exact target path. This task performs no wiring.
