# MapleMoon asset-slot authority matrix packet — 2026-08-14 14:36 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-ASSET-SLOT-AUTHORITY-MATRIX-20260814T143614",
  "worker_thread_id": "019ffe53-6243-73a2-9d75-e1a072cd07ce",
  "state": "ready_read_only_audit",
  "objective": "Map every current Shop product-card image slot to its certified candidate bytes, source/identity authority, replacement candidate status, next decision and live eligibility without changing any website or image file.",
  "readable_paths": [
    "/Users/handtomouse/maplemoon_build_20260813/shop.html",
    "/Users/handtomouse/maplemoon_build_20260813/homepage.html",
    "/Users/handtomouse/maplemoon_build_20260813/assets/product_shots",
    "/Users/handtomouse/maplemoon_product_shots_20260814/product_master_18_sku_v7_manifest.md",
    "/Users/handtomouse/maplemoon_product_shots_20260814/goji_carob_bites/client_confirmed_identity_receipt.md",
    "/Users/handtomouse/UFC/ops/bus/maplemoon/CHECKPOINT_20260814_0915_photography_delivery.md",
    "assets/product_shots/w1-e-prepared-20260803/README.md",
    "assets/product_shots/w1-e-prepared-20260803",
    "docs/orchestration/packets/MAPLEMOON-SEVEN-WORKSTREAM-PROGRAM-20260814T143154.md"
  ],
  "writable_paths": [
    "docs/orchestration/reviews/MAPLEMOON-ASSET-SLOT-AUTHORITY-MATRIX-20260814T143614.md",
    "docs/orchestration/reviews/MAPLEMOON-ASSET-SLOT-AUTHORITY-MATRIX-20260814T143614.json"
  ],
  "verify": [
    "all 24 Shop product-card slots are accounted for exactly once",
    "current candidate asset paths exist and hashes are recorded",
    "the 11 W1-E prepared binaries are byte-identical to the corresponding certified-candidate files",
    "the 18-SKU v7 primary entries and three alternates are classified as review-only unless separate live authority exists",
    "Goji Carob Bites identity approval is distinguished from derivative live-use approval",
    "the approved and certified powder-pile integration is distinguished from the v7 primary pack cutout and v7 alternate review file",
    "rejected generated bundle imagery is excluded",
    "no image, HTML, CSS, JavaScript, build, deployment or production path changes"
  ],
  "stop": [
    "a current slot or asset hash cannot be resolved",
    "identity or live-use authority would need to be inferred",
    "review-only output would be described as approved or live",
    "a website or image mutation would be required",
    "any commit, deploy, production or client-contact action is requested"
  ],
  "next_reviewer": "MapleMoon BOSS, then Nate for named asset decisions",
  "requires_visual_evidence": false
}
<!-- CONTROL-PLANE:END -->

## Output rule

Produce one evidence-backed decision matrix and one receipt. `KEEP` means preserve the certified preview baseline, not production approval. `GO` means an existing slot is supported by the recorded authority; it does not authorize a new write. `HOLD` means no replacement or production promotion until the named authority is supplied.
