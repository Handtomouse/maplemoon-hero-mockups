# MapleMoon Lane F R2 — Our Story and What Is Carob rebuild

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-LANE-F-REBUILD-R2-20260816T141330",
  "worker_thread_id": "/root/dedup_risk_audit",
  "state": "admitted_pending_fresh_lock_acquisition",
  "objective": "Rebuild the current Our Story and rework What Is Carob from Carli's exact bounded structural feedback, preserving Lane E's certified edits and all content/media holds, with no deployment or client action.",
  "authority": "Nate's 15 August decisions; local source brief LANE_F_rebuild.md; independently certified and released Lane E post-state; and Lane A's source-bound founder answer. This packet does not grant founder-photo selection, media promotion, FAQ-page edits, deployment, production, Shopify or client contact.",
  "base": {
    "predecessor_lock_release_receipt_sha256": "ad94eab414aa4cc85ef1acc17f590c44b3d2819bc82ca04a0d3053cb4cbaf73b",
    "our_story_sha256": "f861ae24b6d4cd106402455e1361172be8b769cf0c0f967c17ee8de9a55fed19",
    "carob_story_sha256": "0ad6ea9bfaacf81d7ee4d7e5ddcf93c2bd77afe3635d575bf7a2c30c8f696e27",
    "lane_a_dispositions_sha256": "80633a411d98c83df51a918552a6c8bfdf58a241c3535496a38ec378f0fbf64b",
    "lane_a_shot_list_sha256": "33fc2559d24e247cb40c8060bd846001c98209feff0f86f85aec427a730bdd62",
    "lane_a_verification_sha256": "981fda9dd2ebf5b0de45bbf2b195829fcc1838d51785c042e2ec76360366d73b",
    "rollback_tag": "pre-canva-68-20260815",
    "rollback_commit": "91f03623163b549ab45ef6adfb50631a8017a150",
    "production_immutable_token": "7vjf2m50b"
  },
  "readable_paths": [
    "/Users/handtomouse/maplemoon_recentre_20260815/LANE_F_rebuild.md",
    "/Users/handtomouse/maplemoon_recentre_20260815/ALIGN.html",
    "/Users/handtomouse/maplemoon_recentre_20260815/CV_STATUS.md",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/CARLI-CANVA-OCCURRENCE-RECONCILIATION-20260731.md",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-LANE-E-APPLY-20260815T213337.md",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/MAPLEMOON-LANE-E-INDEPENDENT-CERT-20260816T133827.json",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/MAPLEMOON-LANE-E-LOCK-RELEASE-20260816T140508.json",
    "/Users/handtomouse/maplemoon_lane_a_20260815/DISPOSITIONS.md",
    "/Users/handtomouse/maplemoon_lane_a_20260815/SHOT_LIST.md",
    "/Users/handtomouse/maplemoon_lane_a_20260815/evidence/verification_output.txt",
    "/Users/handtomouse/maplemoon_lane_a_20260815/evidence/acquisition_hashes.md",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/LOCK_MANIFEST.json",
    "/Users/handtomouse/maplemoon-website/_wip/HANDOFF-FOUNDER-IMAGERY-20260803.md",
    "/Users/handtomouse/maplemoon-website/_wip/our-story.WIP.html",
    "/Users/handtomouse/maplemoon-website/_wip/carob-story.WIP.html",
    "/Users/handtomouse/maplemoon-website/_wip/AGENTS.md",
    "/Users/handtomouse/maplemoon-website/scripts/check-maplemoon-receipt.py"
  ],
  "writable_paths": [
    "maplemoon-website/_wip/our-story.WIP.html",
    "maplemoon-website/_wip/carob-story.WIP.html",
    "maplemoon_rebuild_20260815",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-LANE-F-REBUILD-R2-20260816T141330.json"
  ],
  "method": [
    "do not write until root Boss has appended exactly two fresh held lock rows for this packet and confirms the lock-manifest hash",
    "create a timestamped non-overwriting checkpoint for all four writable paths and pass phase=start with --root /Users/handtomouse before the first write",
    "read every named source in full; treat LANE_F_rebuild.md as the exact bounded local representation of the two page-feedback emails and record any source seam rather than inventing missing email text",
    "verify the Lane E release receipt, both current page hashes, three Lane A pins, two fresh lock rows and rollback tag before mutation and again at close",
    "rebuild Our Story to 01 The people behind the product, 02 How Maple Moon began, with no 03; apply every exact cut and location rule in LANE_F_rebuild.md; preserve the explicitly accepted hero image and exact accepted Range blurb; make The Range link to Shop",
    "remove both Frame 55 asset bindings from the page because Frame 55 is HOLD; do not substitute another studio image and put placement proposals only in FOR_NATE.md",
    "do not wire any new founder photograph: keep the accepted pair hero, replace the two rejected individual founder-image surfaces with deliberate accessible placeholders, and record Lane A's exact first-choice shortlist for Nate without treating it as approval",
    "rework What Is Carob using Carli's exact intro including the word used, use cacao spelling, align comparison rows, apply the exact p16 step labels, preserve FROM CRUNCHY TO CREAMY and remove the duplicated Carob Story FAQ block without editing the separate FAQ page",
    "do not publish any unchosen From the grove prose; write two or three bounded wording options and one studio-image placement proposal only to maplemoon_rebuild_20260815/FOR_NATE.md",
    "write maplemoon_rebuild_20260815/RECEIPT.md with every instruction APPLIED, NOT-APPLIED or BLOCKED and a reason, plus positive-control whole-tree occurrence evidence and fresh 390/1440 browser evidence",
    "write one maplemoon-receipt/v2 JSON, run completion and promotion gates, and leave both locks held for independent certification"
  ],
  "verify": [
    "Lane E release, both base hashes, Lane A pins, fresh locks and rollback tag match before the first write",
    "Our Story has exactly 01 people then 02 beginning and no 03; every enumerated old string has zero whole-tree hits after a positive control",
    "both Frame 55 filenames and both rejected individual founder asset bindings have zero hits in the rebuilt Our Story page; the accepted pair hero remains; placeholders are visible, accessible and explicitly pending Nate selection",
    "What Is Carob heading drops actually, exact supplied intro appears once including used, cacao is used, comparison is aligned, exact step labels are present, FROM CRUNCHY TO CREAMY remains and the Carob Story FAQ block is absent while the separate FAQ page hash remains unchanged",
    "no unchosen grove option or studio-placement proposal appears in either page",
    "both pages render nonblank at measured 390 and 1440 with no horizontal overflow, broken images, console, page, request or bad-response failures",
    "only the four writable paths change; shared runtime, FAQ, media, deploy, Shopify and production remain unchanged",
    "completion and promotion gates pass"
  ],
  "stop": [
    "a fresh lock, base hash, Lane A pin, Lane E release receipt, rollback tag or exact source authority differs",
    "the accepted hero image or Range blurb would change",
    "a new founder/studio image, unchosen prose option or unsupported fact would need to be published",
    "the separate FAQ page, media, shared runtime, deploy, production, Shopify or a path outside writable_paths would change",
    "a required occurrence, parse, rendered or close-hash check fails"
  ],
  "forbidden_actions": [
    "edit the FAQ page, any image/media/source master, shared runtime, design-system, packet, lock manifest, deploy, Shopify or production",
    "generate imagery, spend the approved OpenAI call, use Frame 55, upscale or substitute a founder image",
    "deploy, promote, alias, commit, push, stash, delete, gitignore or contact the client"
  ],
  "next_reviewer": "MapleMoon root Boss for receipt replay, then a separately packeted independent two-page certification before lock release",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->

## Required state

This R2 successor is executable only after root Boss records two fresh held locks for its exact page hashes. Until then its state is intentionally `admitted_pending_fresh_lock_acquisition`.
