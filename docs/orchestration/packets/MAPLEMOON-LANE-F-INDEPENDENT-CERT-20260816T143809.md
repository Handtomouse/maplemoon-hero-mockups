# MapleMoon Lane F R2 — independent certification

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-LANE-F-INDEPENDENT-CERT-20260816T143809",
  "worker_thread_id": "/root/recertify_updated_preview",
  "state": "admitted_read_only_certification",
  "objective": "Independently certify the Lane F R2 Our Story and What Is Carob rebuild before either held lock can be released.",
  "authority": "Completed MAPLEMOON-LANE-F-REBUILD-R2-20260816T141330 receipt plus its exact local source brief and held lock bases. This packet authorises evidence and review output only.",
  "base": {
    "predecessor_receipt_sha256": "034769fc3451c0045d42b89e1ed5fa14d30603c8920185f2464856f0e5e49103",
    "our_story_sha256": "6beef3f9449804e800ad7883c311c957637d12a5e05c69beb7ed912e49b36e23",
    "carob_story_sha256": "82b8d3a94de71c453ff2970f185832c93056862d4dd5599f02b6fc222bd9b339",
    "human_receipt_sha256": "94548492290343f58d2e8b55530307bd6967b921ee180f5ec73448b26c2a16b6",
    "for_nate_sha256": "3ce2323be612d16226a21d82308816c09fb844851cb6c6e97fe9f82ee79c94ec",
    "lock_manifest_sha256": "5d09ba28d3dc8b8d016cccd4ad0e9a3898eedb5b4c0ab810ee091fe3a6e3d8d2",
    "faq_sha256": "4540ef31a150cb6de8062c2d4d74709f24d13ce45490f8e3c1c9c283c1fdbd56",
    "production_immutable_token": "7vjf2m50b"
  },
  "readable_paths": [
    "/Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-LANE-F-REBUILD-R2-20260816T141330.md",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/MAPLEMOON-LANE-F-REBUILD-R2-20260816T141330.json",
    "/Users/handtomouse/maplemoon_rebuild_20260815",
    "/Users/handtomouse/maplemoon_recentre_20260815/LANE_F_rebuild.md",
    "/Users/handtomouse/maplemoon_recentre_20260815/ALIGN.html",
    "/Users/handtomouse/maplemoon_lane_a_20260815/DISPOSITIONS.md",
    "/Users/handtomouse/maplemoon_lane_a_20260815/SHOT_LIST.md",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/LOCK_MANIFEST.json",
    "/Users/handtomouse/maplemoon-website/_wip/our-story.WIP.html",
    "/Users/handtomouse/maplemoon-website/_wip/carob-story.WIP.html",
    "/Users/handtomouse/maplemoon-website/_wip/faq.WIP.html",
    "/Users/handtomouse/maplemoon-website/_wip/AGENTS.md",
    "/Users/handtomouse/maplemoon-website/scripts/check-maplemoon-receipt.py"
  ],
  "writable_paths": [
    "maplemoon-website/_wip/evidence/lane_f_independent_cert_20260816T143809",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-LANE-F-INDEPENDENT-CERT-20260816T143809.json"
  ],
  "method": [
    "create a timestamped non-overwriting checkpoint for the exact two writable paths and pass phase=start with --root /Users/handtomouse before the first write",
    "read the predecessor packet, receipt, human ledger, FOR_NATE options, Lane F source brief and Lane A founder evidence in full",
    "replay predecessor completion and promotion gates, and verify all seven pinned hashes plus the two held Lane F locks before acquisition and at close",
    "independently reconstruct every structural and occurrence assertion rather than trusting the predecessor verifier: exact 01 then 02/no 03, all cuts, accepted pair hero and Range blurb, Range link, location, Frame 55 zero, rejected individual assets zero, deliberate placeholders, no published Nate-only option",
    "independently verify What Is Carob exact intro including used, correct cacao spelling, aligned comparison semantics, exact p16 labels, FROM CRUNCHY TO CREAMY, no in-page FAQ, and unchanged separate FAQ hash",
    "serve the current pages locally without editing them; render fresh full-page evidence at measured 390 and 1440, exercise focusable links/placeholder accessibility and inspect every screenshot",
    "require HTTP 200, exact clientWidth=scrollWidth, nonblank geometry, no broken images, console/page/request/bad-response failures, and HTML plus JSON-LD parse success",
    "inspect production read-only and prove immutable 7vjf2m50b remains Ready and unchanged",
    "write one maplemoon-receipt/v2 JSON, then run phase=complete and phase=promote gates"
  ],
  "verify": [
    "all seven pinned hashes, both held locks and predecessor gates match at acquisition and close",
    "fresh independent source assertions pass with positive controls and every APPLIED/NOT-APPLIED/BLOCKED boundary represented honestly",
    "4/4 fresh measured 390/1440 renders are nonblank, visually inspected and error-free",
    "only the two writable evidence/review paths change; pages, FAQ, locks, media, deploy and production remain unchanged",
    "completion and promotion gates pass"
  ],
  "stop": [
    "a pinned hash, held lock, predecessor gate, required occurrence/structure/render/accessibility check or production-freeze check differs or fails",
    "a result would require source correction, authority inference, image substitution, deploy or a path outside writable_paths"
  ],
  "forbidden_actions": [
    "edit any WIP page, FAQ, source, media, design-system, packet, lock manifest, deploy, Shopify or production file",
    "generate imagery, deploy, promote, alias, commit, push, stash, delete, gitignore, contact the client or release locks"
  ],
  "next_reviewer": "MapleMoon root Boss for receipt replay and a separately checkpointed two-lock release decision",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->

## Required disposition

Return PASS only if the independently reconstructed source and fresh rendered evidence agree. Otherwise close as HOLD or FAIL at the first exact divergence; do not repair source in this lane.
