# MapleMoon icon production closeout - 2026-08-25 19:24 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-ICON-PRODUCTION-CLOSEOUT-20260825T192403",
  "worker_thread_id": "01a03776-a661-74a2-bdaa-695e21ae06d0",
  "state": "admitted_local_production_successor_after_nate_a_plus_b_approval",
  "objective": "Create a non-overwriting, client- and external-designer-facing local production successor that closes the icon-system master, source, size, naming, contact-sheet and governance gaps identified by the harsh audit, while preserving the approved v2 site review and prior Carli kit as immutable rollback evidence.",
  "authority": "Nate explicitly approved A+B: the site icon-system direction and the external Carli icon-kit direction. This is the previously missing human design/selection gate. The work is local production and QA only; upload, sharing, email, messaging, route integration, deployment and any delivered claim remain forbidden.",
  "predecessor_pins": {
    "v2_manifest_sha256": "cb0f526309c000626da312c504b384e6e9b7de415b7074556488fc191509844b",
    "v2_review_sheet_sha256": "5cc555a90affa95602f05b673e7d5cfa2823738ae6a2e92feaa5b185f9e4560b",
    "v2_qa_sha256": "a0d1e114492d782e84dab21aa076370f9e530e3bb83bb56954ce6d8b4c8ace7d",
    "current_bilingual_packaging_reference_sha256": "e86934ac69eb8d55810ed6b1482b5a982bc5408062e3a406e56597d91c3420e3",
    "prior_external_kit_sums_sha256": "6f4f2e560cac4a86e5ce3bb73a37efd2fba072f0d6349c0e97025f85365c1e0d"
  },
  "readable_paths": [
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-ICON-PRODUCTION-CLOSEOUT-20260825T192403.md",
    "maplemoon-website/_wip/evidence/icon_session_20260825/v2_review",
    "maplemoon-website/_wip/evidence/icon_session_20260825/ICON-SESSION-BRIEF.md",
    "maplemoon-website/_wip/evidence/icon_session_20260825/ICON-SYSTEM-HANDOFF.md",
    "maplemoon-website/_wip/evidence/carli_external_icon_kit_20260825/AUTHORITY-MAP.md",
    "maplemoon-website/_wip/evidence/carli_external_icon_kit_20260825/01_SOURCE_LOCKED/MM_Packaging-Reference_Moons-Pure-Carob_Bilingual_10-AUG-2026_PRINT.pdf",
    "maplemoon-website/_wip/deliverables/MapleMoon_External_Designer_Icon_Kit_20260825",
    "maplemoon-website/assets/brand",
    "maplemoon-website/assets/product_shots",
    "maplemoon-website/assets/gemini/studio/maplemoon_elixir_plain_studio_20260305.png",
    "maplemoon-website/scripts/build-maplemoon-icon-v2-review.mjs",
    "maplemoon-website/scripts/check-maplemoon-icon-v2-review.mjs",
    "maplemoon-website/scripts/check-maplemoon-receipt.py"
  ],
  "writable_paths": [
    "maplemoon-website/scripts/build-maplemoon-icon-production-20260825.mjs",
    "maplemoon-website/scripts/check-maplemoon-icon-production-20260825.mjs",
    "maplemoon-website/_wip/deliverables/MapleMoon_Icon_Production_Kit_20260825",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-ICON-PRODUCTION-CLOSEOUT-20260825T192403.json"
  ],
  "implementation_contract": [
    "create a timestamped non-overwriting checkpoint for the four exact writable paths and require phase=start PASS before the first write",
    "preserve the complete v2_review directory and the prior external designer kit byte-for-byte as rollback evidence",
    "create one canonical Illustrator-editable SVG master and one SVG sprite for the complete site library; never fabricate or rename bytes as a native .ai file",
    "carry every approved v2 cut byte-for-byte into the production successor and add only governed missing coverage without changing the approved v2 geometry",
    "provide true 16, 20 and 24 px utility cuts, 16 and 20 px category cuts, 32 and 48 px product/process cuts, and a documented size matrix",
    "provide the current external packaging and brand assets as individually named SVG and 2000 px transparent PNG files; include the current 10-Aug-2026 Arabic/English Moons/Pure Carob packaging PDF once as locked reference only",
    "exclude _full duplicate badge variants, superseded May packaging sources, the 93-artboard working icon master, duplicate exports and any unapproved packaging source file",
    "provide manifest, asset index, source-authority map, exclusions, ICON-USAGE governance, do/don't guidance, accessibility labels and exact checksums",
    "provide HTML and real PDF contact sheets that show assets at master and real UI sizes and render the PDF for visual inspection",
    "create only local output and QA evidence; do not touch route files, assets/icons, current live design-system contracts, upload surfaces or communication channels"
  ],
  "verify": [
    "all predecessor pins and the current bilingual packaging reference pin match at acquisition and close",
    "the production successor contains no empty, missing, corrupt or exact-duplicate production asset files",
    "all SVGs parse, use valid viewBoxes, contain no embedded raster images, scripts, event handlers or external hrefs, and expose governed colour behavior",
    "approved v2 individual SVGs remain byte-identical in the production successor and every new concept/size has a unique governed ID",
    "external SVG and PNG pairs are one-to-one and the 13 current assets match the approved prior kit byte-for-byte",
    "manifest, CSV indexes, sprite IDs, individual files, source entries, accessible labels and documented size ranges agree exactly",
    "the contact-sheet PDF reopens, has the expected page count and text, renders to nonblank PNG pages, and receives visual inspection",
    "desktop and mobile contact-sheet screenshots are nonblank, readable and show no overflow or broken images",
    "negative controls prove the checker rejects duplicate bytes, wrong source hashes, missing sizes and unsafe SVG content",
    "completion receipt gate passes; no upload, message, route integration, deployment or promotion is run"
  ],
  "stop": [
    "an approved v2 predecessor byte changes",
    "the current 10-Aug-2026 packaging reference pin changes or cannot be verified",
    "a correct current asset source cannot be proven",
    "a required size/master/contact-sheet/checksum/visual gate fails",
    "a path outside writable_paths changes as a result of this phase",
    "upload, sharing, messaging, route integration, deployment or promotion becomes necessary"
  ],
  "forbidden_actions": [
    "edit or delete the v2 review candidate, prior external kit, live routes, assets/icons, design-system contracts, locked packaging sources or any unrelated dirty work",
    "run JSX against an open Illustrator session or fabricate a native .ai file",
    "git add, commit, push, stash, checkout, reset, clean or delete prior evidence",
    "upload to Drive, change sharing, email or message Carli, deploy, publish, promote or call the package delivered"
  ],
  "requires_visual_evidence": true,
  "next_reviewer": "MapleMoon BOSS integration review; later external delivery and site integration require separate explicit authority"
}
<!-- CONTROL-PLANE:END -->

## Human gate

GO for both approved directions (A+B). This packet authorises a local production successor and full QA only. It does not authorise site integration or external delivery.
