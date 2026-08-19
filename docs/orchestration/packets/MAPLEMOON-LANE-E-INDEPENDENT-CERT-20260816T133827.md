# MapleMoon Lane E — independent certification

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-LANE-E-INDEPENDENT-CERT-20260816T133827",
  "worker_thread_id": "/root/recertify_updated_preview",
  "state": "admitted_read_only_certification",
  "objective": "Independently replay and certify the completed Lane E six-page WIP edit set before the MapleMoon Boss releases its six held locks.",
  "authority": "Nate's 15 August decisions, MAPLEMOON-SIX-LANE-ADMISSION-20260815T213337, and the completed Lane E apply receipt. This packet authorises evidence and review output only; it does not authorise source correction, lock release, Lane F, deployment, production, Shopify or client action.",
  "base": {
    "predecessor_packet": "MAPLEMOON-LANE-E-APPLY-20260815T213337",
    "predecessor_receipt_sha256": "7a4d0e3c97c1cee599774b02300f9e4a96ece019adeb8fe7d84992b15c6f69d7",
    "homepage_sha256": "d097392fc1c6f44c3e3c09024bb7c2e2ea275e215a468dfe76306c6dcf534748",
    "shop_sha256": "b444b0da4f5778f7434c6343854e3cdf48d1a88b038c7863a2ef1d46b5e0cbac",
    "our_story_sha256": "f861ae24b6d4cd106402455e1361172be8b769cf0c0f967c17ee8de9a55fed19",
    "carob_story_sha256": "0ad6ea9bfaacf81d7ee4d7e5ddcf93c2bd77afe3635d575bf7a2c30c8f696e27",
    "faq_sha256": "4540ef31a150cb6de8062c2d4d74709f24d13ce45490f8e3c1c9c283c1fdbd56",
    "stockists_sha256": "1cc8b4e55c7dc59f6e268222c310ac47d477540caf7540970981726a801b9075",
    "production_immutable_token": "7vjf2m50b"
  },
  "readable_paths": [
    "/Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-LANE-E-APPLY-20260815T213337.md",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/MAPLEMOON-LANE-E-APPLY-20260815T213337.json",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/LOCK_MANIFEST.json",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/CARLI-CANVA-OCCURRENCE-RECONCILIATION-20260731.md",
    "/Users/handtomouse/maplemoon-website/_wip/homepage_real_1_lead_photo.WIP.html",
    "/Users/handtomouse/maplemoon-website/_wip/shop.WIP.html",
    "/Users/handtomouse/maplemoon-website/_wip/our-story.WIP.html",
    "/Users/handtomouse/maplemoon-website/_wip/carob-story.WIP.html",
    "/Users/handtomouse/maplemoon-website/_wip/faq.WIP.html",
    "/Users/handtomouse/maplemoon-website/_wip/stockists.WIP.html",
    "/Users/handtomouse/maplemoon_apply_20260815",
    "/Users/handtomouse/maplemoon-website/_wip/AGENTS.md",
    "/Users/handtomouse/maplemoon-website/scripts/check-maplemoon-receipt.py"
  ],
  "writable_paths": [
    "maplemoon-website/_wip/evidence/lane_e_independent_cert_20260816T133827",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-LANE-E-INDEPENDENT-CERT-20260816T133827.json"
  ],
  "method": [
    "create a timestamped non-overwriting checkpoint for the exact two writable paths and pass phase=start with --root /Users/handtomouse before the first write",
    "read the predecessor packet and receipt in full and replay its phase=complete and phase=promote gates against the predecessor checkpoint named in its evidence",
    "verify the predecessor receipt hash, six pinned post-edit page hashes, six held Lane E lock rows and production immutable token before acquisition and again at close",
    "independently reconstruct positive-control and whole-tree occurrence tests for the decided Lane E changes; do not rely only on the predecessor's occurrence script or prose",
    "prove six approved bars remain on Home and Shop, the demo cart remains present and functional, the 24-product Shopify catalogue was not added, standing stockist wording is 200+, both newsletter forms are visibly non-collecting, and no blocked testimonial/fact/elixir decision was silently promoted",
    "serve the current WIP pages locally without editing them and freshly render all six at measured 390 and 1440; exercise the two newsletter forms and Shop cart; record screenshots and machine results",
    "run exact-page parse/JSON-LD checks, overflow/image/console/page/request checks and git diff --check without modifying source",
    "inspect production read-only and prove immutable 7vjf2m50b remains Ready and unchanged",
    "write one maplemoon-receipt/v2 JSON, then run phase=complete and phase=promote gates"
  ],
  "verify": [
    "all six pinned page hashes and predecessor receipt hash match at acquisition and close",
    "predecessor completion and promotion gates replay PASS",
    "fresh occurrence and state checks pass with explicit positive controls and preserve every named HOLD",
    "12/12 fresh rendered cases are nonblank and visually inspected with exact widths, no horizontal overflow, broken images, console, page or request failures",
    "newsletter and Shop cart runtime checks pass without persistence or network submission",
    "only the two writable evidence/review paths change and source, locks, deployment and production remain unchanged",
    "completion and promotion gates pass"
  ],
  "stop": [
    "a pinned hash, held lock, predecessor gate, required occurrence/runtime/render check or production-freeze check differs or fails",
    "an exact result would require source correction, authority inference, deploy, login, external message or a path outside writable_paths"
  ],
  "forbidden_actions": [
    "edit any WIP page, source, media, design-system, packet, lock manifest, recovery, Shopify, deploy or production file",
    "deploy, promote, alias, commit, push, stash, delete, gitignore, contact the client or release locks"
  ],
  "next_reviewer": "MapleMoon root Boss for receipt replay and a separately checkpointed lock-release decision",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->

## Required disposition

Return `PASS` only if the independently reconstructed checks and fresh browser evidence agree with the predecessor. Otherwise close honestly as `HOLD` or `FAIL` with the first exact divergence; do not repair it in this lane.
