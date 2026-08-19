# MapleMoon Open Graph image candidate closeout packet

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "OG-IMAGE-CANDIDATES-20260803-V1-CLOSEOUT",
  "worker_thread_id": "019fc360-a934-7a52-b410-b72865ce6533",
  "state": "ready",
  "objective": "validate and close out the already start-gated OG image candidate evidence without changing candidate bytes, pages or manifests",
  "authority_path": "/Users/handtomouse/maplemoon-website/_wip/evidence/IMAGERY-PROGRAMME-20260802/OG-IMAGE-CANDIDATE-BRIEF-20260803.md",
  "authority_sha256": "ce44995da1ede99cebb383e0f8587050928b0ef9fee68dd0d72907a9565b1a4e",
  "readable_paths": [
    "_wip/evidence/IMAGERY-PROGRAMME-20260802/OG-IMAGE-CANDIDATES-20260803-V1-PACKET.md",
    "_wip/evidence/IMAGERY-PROGRAMME-20260802/og_image_candidates_20260803_v1",
    "_wip/evidence/IMAGERY-PROGRAMME-20260802/checkpoints/OG-IMAGE-CANDIDATES-20260803-V1_20260803_025837_AEST",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/MANIFEST.json",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/homepage.html",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/shop.html",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/our-story.html",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/carob-story.html",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/stockists.html",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/faq.html"
  ],
  "writable_paths": [
    "_wip/evidence/IMAGERY-PROGRAMME-20260802/OG-IMAGE-CANDIDATES-20260803-V1-CLOSEOUT-PACKET.md",
    "_wip/evidence/IMAGERY-PROGRAMME-20260802/OG-IMAGE-CANDIDATES-20260803-V1-RECEIPT.json"
  ],
  "verify": [
    "original generation packet start gate passed",
    "authority and frozen clean manifest hashes unchanged",
    "all six clean pages remain byte-identical and contain no og:image or twitter:image",
    "manifest JSON is valid and all listed output hashes and dimensions match",
    "seven accepted masters are 1200 by 630 and have full-resolution visual inspection evidence",
    "contact sheet and geometry comparison exist and are visually readable",
    "candidate evidence bytes remain unchanged during closeout",
    "LP-03 remains HOLD, ready_to_promote is false and ownership is released"
  ],
  "stop": [
    "candidate, page or authority drift",
    "invalid provenance or hash evidence",
    "failed visual or crop QA",
    "scope breach or external action"
  ],
  "next_reviewer": "Nate",
  "requires_visual_evidence": true,
  "ready_to_promote": false
}
<!-- CONTROL-PLANE:END -->

## Note

This closeout packet exists solely to keep the completion receipt outside the already-hashed candidate directory. It does not broaden the creative scope or alter any candidate.
