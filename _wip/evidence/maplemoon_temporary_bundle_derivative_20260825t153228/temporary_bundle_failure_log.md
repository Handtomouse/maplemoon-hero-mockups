# Temporary bundle derivative failure log

## Attempt 01, rejected

Method: deterministic manually bounded OpenCV GrabCut with source pixels preserved and alpha added.

Mechanical result: the script produced five major foreground components and passed its byte/dimension checks.

Visual failure: the dark and site-blue edge proofs exposed broad beige background remnants around the Fudge and Goji Bar, plus smaller floor/shadow remnants around the Eclipse Bites. This is not an acceptable transparent cut-out.

Disposition: **REJECTED / NOT FOR STAGING**. The attempt is preserved under `attempt_01_grabcut_failed/` for audit evidence and is excluded from the final derivative paths.

Correction: use the already cached, hash-pinned local BiRefNet foreground segmentation model only to estimate alpha. Preserve the original source RGB planes byte-for-byte; do not generate, inpaint, recolour or reconstruct product pixels. Require a deterministic repeated-alpha match and visually inspect all three backgrounds again.

## Attempt 02, held

Method: cached, hash-pinned BiRefNet foreground segmentation used only for alpha, with two repeated inferences required to match exactly. Full-resolution RGB remained byte-identical.

Mechanical result: five major components, source/model hashes pinned, deterministic repeat equal and clean light/dark/site-blue proofs.

Gate mismatch: `post_process_mask=True` returned a binary matte with zero partial-alpha pixels. The packet explicitly requires transparent, partial and opaque pixels, so this otherwise clean pass is not promoted as the final derivative.

Disposition: **HOLD / NOT THE FINAL DERIVATIVE**. Preserved under `attempt_02_birefnet_binary_hold/`.

Correction: apply a one-pixel inward-only distance-transform antialias to the identical binary matte. This introduces no outside/background pixels, does not alter source RGB, and prevents beige edge contamination.
