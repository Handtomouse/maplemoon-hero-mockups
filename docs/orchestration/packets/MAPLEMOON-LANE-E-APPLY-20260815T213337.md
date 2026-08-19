# MapleMoon Lane E — apply decided demo edits

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-LANE-E-APPLY-20260815T213337",
  "worker_thread_id": "/root/dedup_risk_audit",
  "state": "admitted_held_wait_wave1_acquisition",
  "objective": "Apply the enumerated defect-level, buildable Canva, Home and Shop edits to the six current WIP review pages, covering every visible and machine-readable occurrence, while preserving demo cart UI and all non-authorised content, media, deployment and production state.",
  "authority": "Nate's 15 August rulings in ALIGN and the BOSS six-lane admission supersede conflicting R3 recommendations and older clean-only delivery ticks. This packet is bounded local WIP mutation only.",
  "base": {
    "candidate_id": "MAPLEMOON-LANE-E-WIP-CANDIDATE-20260815-001",
    "rollback_tag": "pre-canva-68-20260815",
    "rollback_commit": "91f03623163b549ab45ef6adfb50631a8017a150",
    "homepage_sha256": "8cb75735c8689979b7c9b85cad05c5e7d6ab6efab812863b5a84db68c88a0304",
    "shop_sha256": "77117b625de3d31377545ddf58341ff287997efacf90d55db57af1dfac8d8805",
    "our_story_sha256": "5a49926e2619fd09667d2869808fb8571af88a4add10b2346b81b732859074c1",
    "carob_story_sha256": "5f83713033166688bd7d77bed8130d97b680d750be2e8796cdb9ed73dce54c1a",
    "faq_sha256": "139731f9944c5527e4d2d20c6650f4f0739321b3b7fdb93485b244d04fdff45f",
    "stockists_sha256": "8bd2d02e0728c5697408f34ebbf254789c86bfaa955eead6b18afbc9ccfba002",
    "production_immutable_token": "7vjf2m50b"
  },
  "readable_paths": [
    "/Users/handtomouse/maplemoon_recentre_20260815/LANE_E_apply.md",
    "/Users/handtomouse/maplemoon_recentre_20260815/ALIGN.html",
    "/Users/handtomouse/maplemoon_recentre_20260815/CV_STATUS.md",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/CARLI-CANVA-OCCURRENCE-RECONCILIATION-20260731.md",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/LOCK_MANIFEST.json",
    "/Users/handtomouse/maplemoon-website/_wip/AGENTS.md",
    "/Users/handtomouse/maplemoon-website/scripts/check-maplemoon-receipt.py"
  ],
  "writable_paths": [
    "maplemoon-website/_wip/homepage_real_1_lead_photo.WIP.html",
    "maplemoon-website/_wip/shop.WIP.html",
    "maplemoon-website/_wip/our-story.WIP.html",
    "maplemoon-website/_wip/carob-story.WIP.html",
    "maplemoon-website/_wip/faq.WIP.html",
    "maplemoon-website/_wip/stockists.WIP.html",
    "maplemoon_apply_20260815",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-LANE-E-APPLY-20260815T213337.json"
  ],
  "method": [
    "wait for root Boss to confirm Wave-1 read-only acquisition stability, then create a timestamped non-overwriting checkpoint for all eight writable paths and pass phase=start with --root /Users/handtomouse before the first write",
    "verify the six held lock rows, six base SHA-256 values and rollback tag immediately before mutation; preserve the pre-existing tracked Homepage modification as part of the pinned base",
    "rebase the existing 76-row 31 July occurrence map onto the current six WIP pages and write the rebase evidence under maplemoon_apply_20260815; do not rebuild the map or convert absence of an anchor into authority",
    "run a positive-control whole-tree search before every old-string search; search all of maplemoon-website/_wip, not one page, and record every visible, metadata, OpenGraph, Twitter and JSON-LD hit",
    "apply only the Lane-E enumerated defects, fourteen buildable CV items, CV-013 Homepage half, Carli Home/Shop edit-level instructions and exact 15 August rulings",
    "preserve D01's six-bar demo; do not add the 24-product Shopify catalogue",
    "preserve every cart trigger and cart interaction because D02 is not applicable to this artefact",
    "replace every contradictory 150+ stockist statement with the standing 200+ ruling; never substitute 197 or nonnumeric wording",
    "keep each newsletter form's visual slot, prevent collection/submission, and add a concise visible and accessible demo-only non-collecting notice without implying a live endpoint",
    "use Carli's Canva page-14 sourcing wording verbatim with the Australian Carob Co. and South Australia; distinguish Byron Bay kitchen from Brunswick Heads founders",
    "keep the testimonial block and use pseudonyms, but HOLD that exact edit if no explicit pseudonym mapping exists; do not invent names and do not remove the block",
    "apply CV-051's removal of slow from roasted for depth, but do not infer claim authority for CV-014 or CV-062; record those as unresolved unless an exact named authority supplies their wording",
    "record both v4 elixirs as Nate-approved but leave binding unchanged until a matched re-export exists; do not upscale either asset",
    "after each edit, prove the old string has zero whole-tree hits and the new string has the expected count; then render every changed page at 390 and 1440, inspect it, and record screenshots under the external output directory",
    "write a human RECEIPT.md plus maplemoon-receipt/v2 JSON, run completion and promotion gates, and leave production/deploy state untouched"
  ],
  "verify": [
    "all six base hashes, six held locks and the rollback tag match before writing",
    "every enumerated item records positive control, whole-tree old count, whole-tree new count, files changed and exact verification command",
    "the three duplicate surfaces are explicitly tested: Homepage comparison, Carob Story FAQ and Homepage catalogue",
    "slow-roasted and other removed claims are checked in body, meta description, OpenGraph, Twitter and JSON-LD",
    "D02 cart UI remains present and prior certified header/cart files are outside scope",
    "390 and 1440 renders are nonblank with no overflow, console, page, request or image failures",
    "CV status transitions are recalculated only for changed items; CV-014 and CV-062 are not silently promoted",
    "only eight writable paths change, production remains pinned to 7vjf2m50b, and completion/promotion gates pass"
  ],
  "stop": [
    "Wave-1 acquisition stability has not been confirmed by root Boss",
    "a base hash, held lock, rollback tag or source authority differs",
    "an exact replacement or pseudonym would have to be invented",
    "a requested change would remove cart UI, add the 24-product demo catalogue, wire mismatched elixirs or alter a blocked fact without authority",
    "a required whole-tree occurrence check or rendered check fails",
    "a path outside writable_paths would change"
  ],
  "forbidden_actions": [
    "edit design-system, shared runtime, media, clean, deploy, recovery, packet, lock-manifest, Shopify or production files",
    "generate imagery or spend the approved OpenAI call",
    "deploy, promote, alias, commit, push, stash, delete, gitignore or contact the client"
  ],
  "next_reviewer": "MapleMoon root Boss for receipt replay and lock release; independent certification is a later packet",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->

## Bounded interpretation

Lane E is an edit-level pass, not the Our Story or What Is Carob structural rebuild. It may touch those two files only for the exact enumerated defect/CV occurrences required before Lane F. If an exact pseudonym mapping is absent, the review-name item remains a named HOLD while the rest of Lane E proceeds.
