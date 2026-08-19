# Packet FOUNDER-V04-CARLI-CROP-CORRECTION-20260803

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "FOUNDER-V04-CARLI-CROP-CORRECTION-20260803",
  "candidate_id": "FOUNDER-V04-CARLI-CROP-CORRECTION-CANDIDATE-001",
  "worker_thread_id": "019f9c36-83e1-7941-92e5-a3b134212288",
  "phase": "FOUNDER-V04-CARLI-CROP-CORRECTION",
  "state": "ready",
  "requires_visual_evidence": true,
  "objective": "Preserve failed Carli v01, export one corrected non-overwriting Carli v02 crop from the verified v04 composition, and create isolated desktop/mobile Our Story proofs using the passed full candidate and Dylan v01.",
  "approval": "The parent receipt held only because Carli v01 retained a strip of Dylan. Temporary crop-bound QA proved x=2750, y=400, width=2600, height=3250 removes Dylan without cutting Carli.",
  "ownership": "This task 019f9c36-83e1-7941-92e5-a3b134212288 is the sole mutating owner of these correction paths.",
  "readable_paths": [
    "_wip/evidence/founder_v04_main_imac_qa_export_20260803/founders_portrait_v04_review.png",
    "_wip/evidence/founder_v04_main_imac_qa_export_20260803/dylan_bio_v01.png",
    "_wip/evidence/founder_v04_main_imac_qa_export_20260803/carli_bio_v01.png",
    "_wip/reviews/founder_photo_v04_bios_20260802/founders_portrait_v04.psd",
    "_wip/our-story.WIP.html"
  ],
  "writable_paths": [
    "docs/orchestration/packets/FOUNDER-V04-CARLI-CROP-CORRECTION-20260803.md",
    "docs/orchestration/reviews/FOUNDER-V04-CARLI-CROP-CORRECTION-20260803.json",
    "_wip/evidence/founder_v04_main_imac_qa_export_20260803/carli_bio_v02.png",
    "_wip/evidence/founder_v04_main_imac_qa_export_20260803/source_selection.md",
    "_wip/evidence/founder_v04_main_imac_qa_export_20260803/our_story_v04_review.html",
    "_wip/evidence/founder_v04_main_imac_qa_export_20260803/qa/our_story_v04_desktop_1440.png",
    "_wip/evidence/founder_v04_main_imac_qa_export_20260803/qa/our_story_v04_mobile_390.png"
  ],
  "external_writable_paths": [
    "/Users/handtomouse/MapleMoon-Photoshop-Work/FOUNDER-V04-MAIN-IMAC-QA-EXPORT-20260803/outputs/carli_bio_v02.png"
  ],
  "base": {
    "saved_psd_sha256": "53a9fe71d00bad379cf50a78688bc95f9606aea37afa2e848fa7b02041954333",
    "full_candidate_sha256": "d20b9e63bcb4aab90c1c473f9bd3315555df83bb2d84989fc1d0a1b6dac7c553",
    "dylan_v01_sha256": "78e551e63178803ac48f8b1c0bdfd15d984ded3c0ed5ac88b3cd2a818811cfd9",
    "failed_carli_v01_sha256": "5147a763e1e1f04f9e880a1b73861f144c295f3437153b5e8ba5e83e88a469a2",
    "crop_bounds": "x=2750,y=400,width=2600,height=3250",
    "disk_guard_gib": 20
  },
  "method": [
    "Checkpoint all seven local writable paths before output creation.",
    "Export Carli v02 through Photoshop as a literal crop from the saved v04 document using the tested bounds.",
    "Visually verify no Dylan pixels remain and Carli hair, hand, elbow and knee remain intentional.",
    "Create an isolated local Our Story review surface with the passed pair image, Dylan v01 and Carli v02.",
    "Render 1440 desktop and 390 mobile proofs and check image loading, overflow and crop quality.",
    "Rehash protected inputs and stop for Nate visual approval without integration."
  ],
  "verify": [
    "phase-start checkpoint and gate pass",
    "Carli v01 remains byte-identical",
    "Carli v02 is 2600x3250 and contains no Dylan pixels",
    "full candidate and Dylan v01 remain byte-identical",
    "desktop and mobile proofs are nonblank with no overflow or broken images",
    "no source, PSD, WIP, frozen page, live reference or unrelated file changes"
  ],
  "stop": [
    "any base hash mismatch",
    "checkpoint or gate failure",
    "Carli v02 cuts required hair, hand, fingers, elbow or identity",
    "any change outside declared writable paths",
    "website integration or pixel reconstruction is required"
  ],
  "forbidden_actions": [
    "overwrite Carli v01, Dylan v01, full candidate, PSD, source, v03, H212, custody master, canonical WIP, frozen package or live references",
    "generate, reconstruct, retouch or alter people",
    "commit, push, deploy, publish, upload, send or integrate"
  ],
  "next_reviewer": "Nate for visual approval"
}
<!-- CONTROL-PLANE:END -->

## Output boundary

This correction creates review evidence only and stops before website integration.
