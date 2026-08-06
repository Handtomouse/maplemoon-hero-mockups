# Packet MM-PRODUCTS-INTAKE-PREP-20260803

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MM-PRODUCTS-INTAKE-PREP-20260803",
  "candidate_id": "MM-PRODUCTS-INTAKE-PREP-20260803-001",
  "worker_thread_id": "019fc42c-03b0-7d91-8c25-d127fbbc73e9",
  "phase": "MM-PRODUCTS-INTAKE-PREP",
  "state": "ready",
  "requires_visual_evidence": true,
  "objective": "Create a local-only, source-preserving intake inventory, duplicate/composition review, complete contact sheets, HOLD-only candidate mapping and native QA record for Nate-supplied ChatGPT/generated PNG candidates. No candidate is client photography, an approved product identity, or a website-ready derivative unless current approved catalogue evidence and visual identity both exist.",
  "readable_paths": [
    "/Users/handtomouse/Downloads/MM-Products",
    "docs/orchestration/SIDECHAT_RECEIPT_GATE.md",
    "scripts/check-maplemoon-receipt.py",
    "docs/orchestration/CAT-01-INPUT-READINESS-20260731.md",
    "docs/orchestration/GOV-01_RATIFIED_LEDGER.md",
    "docs/orchestration/LOCK_MANIFEST.json",
    "docs/client-review/2026-08-01-saturday-review/generated-candidates/IMAGERY-MATRIX.md"
  ],
  "writable_paths": [
    "docs/orchestration/packets/MM-PRODUCTS-INTAKE-PREP-20260803.md",
    "docs/orchestration/reviews/MM-PRODUCTS-INTAKE-PREP-20260803.json",
    "_wip/reviews/mm-products-intake-20260803/source_inventory_v01.json",
    "_wip/reviews/mm-products-intake-20260803/source_inventory_v01.csv",
    "_wip/reviews/mm-products-intake-20260803/source_aggregate_manifest_v01.sha256",
    "_wip/reviews/mm-products-intake-20260803/exact_duplicate_map_v01.json",
    "_wip/reviews/mm-products-intake-20260803/composition_family_flags_v01.json",
    "_wip/reviews/mm-products-intake-20260803/visual_index_v01.md",
    "_wip/reviews/mm-products-intake-20260803/candidate_mapping_manifest_v01.json",
    "_wip/reviews/mm-products-intake-20260803/qa/qa_proof_v01.json",
    "_wip/reviews/mm-products-intake-20260803/contact_sheets/contact_sheet_v01_001.png",
    "_wip/reviews/mm-products-intake-20260803/contact_sheets/contact_sheet_v01_002.png",
    "_wip/reviews/mm-products-intake-20260803/contact_sheets/contact_sheet_v01_003.png",
    "_wip/reviews/mm-products-intake-20260803/contact_sheets/contact_sheet_v01_004.png",
    "_wip/reviews/mm-products-intake-20260803/contact_sheets/contact_sheet_v01_005.png",
    "_wip/reviews/mm-products-intake-20260803/contact_sheets/contact_sheet_v01_006.png",
    "_wip/reviews/mm-products-intake-20260803/contact_sheets/contact_sheet_v01_007.png",
    "_wip/reviews/mm-products-intake-20260803/contact_sheets/contact_sheet_v01_008.png",
    "_wip/reviews/mm-products-intake-20260803/contact_sheets/contact_sheet_v01_009.png",
    "_wip/reviews/mm-products-intake-20260803/contact_sheets/contact_sheet_v01_010.png",
    "_wip/reviews/mm-products-intake-20260803/contact_sheets/contact_sheet_v01_011.png"
  ],
  "recovery_checkpoint": "_wip/reviews/mm-products-intake-20260803/checkpoints/MM-PRODUCTS-INTAKE-PREP-20260803_20260803_063525_AEST",
  "source_baseline": {
    "source_root": "/Users/handtomouse/Downloads/MM-Products",
    "observed_png_count": 204,
    "aggregate_manifest_sha256": "d7bad42190869453e214f5e71d9ef2def3d3c8e72405353abd29201ef6a2de18",
    "total_bytes": 310693481,
    "provenance": "Nate-supplied ChatGPT/generated candidate imagery; never client photography"
  },
  "derivative_admission": {
    "ready_derivative_paths": [],
    "status": "none admitted",
    "reason": "CAT-01 records no fresh WooCommerce export or approved retail catalogue. Therefore no current approved catalogue evidence exists to satisfy the product-identity gate, regardless of apparent labels or filenames."
  },
  "method": [
    "Read each source PNG without changing its bytes, name, path or metadata; record SHA-256, dimensions, colour mode/profile, alpha, byte size and modification time.",
    "Group byte-identical files only by SHA-256. Flag possible composition families as review-only and never delete, rename or deduplicate sources.",
    "Render eleven source-faithful twenty-cell-or-fewer contact sheets covering all 204 PNGs exactly once; label every tile with a stable inventory ID only.",
    "Record every candidate as Nate-supplied ChatGPT/generated imagery. Match no candidate to a product unless visual identity and current approved catalogue evidence both agree; otherwise record HOLD.",
    "Perform native source/candidate QA for distortion, text/label corruption, identity uncertainty, edges, crop, colour and background. The QA output records findings and does not repair pixels or labels.",
    "Produce a mapping manifest that is local-only, unwired and unpromoted. No ready derivative is created in this packet."
  ],
  "verify": [
    "The phase-start checkpoint and receipt gate pass before any inventory, contact-sheet, mapping or QA output is written.",
    "The source still contains 204 PNGs and its aggregate manifest SHA-256 remains d7bad42190869453e214f5e71d9ef2def3d3c8e72405353abd29201ef6a2de18 after the phase.",
    "The JSON and CSV inventory reconcile to 204 PNG records with the required metadata and source hashes.",
    "Eleven contact sheets cover all 204 stable inventory IDs exactly once; rendered sheets have non-zero bytes and are inspected for legibility.",
    "The duplicate map uses exact SHA-256 only, and the composition-family file labels every non-exact similarity as review-only.",
    "The mapping manifest marks every candidate HOLD when catalogue authority or visual identity is uncertain, conflicting, garbled or absent, and it contains no integration/reference changes.",
    "The completion receipt names this worker_thread_id, reports checkpoint-comparable pre/post hashes, source preservation evidence, output checks and independent read-only verification."
  ],
  "stop": [
    "The source count, aggregate manifest hash, source path or source metadata changes unexpectedly.",
    "A candidate name, timestamp, label or generated appearance is treated as product, packaging, price, availability or claim authority.",
    "A current approved catalogue/register authority becomes ambiguous, absent or conflicts with visual identity.",
    "Any write outside the listed files or recovery checkpoint would be needed.",
    "Any need arises to generate/reconstruct pixels or labels, modify/rename/move/delete a source, write assets or WIP HTML, change a package/site/staging/commerce system, commit, push, deploy, upload, send or contact anyone."
  ],
  "next_reviewer": "Main coordinator 019fa858-05c9-7631-b26e-8f5cbbf1387a"
}
<!-- CONTROL-PLANE:END -->
