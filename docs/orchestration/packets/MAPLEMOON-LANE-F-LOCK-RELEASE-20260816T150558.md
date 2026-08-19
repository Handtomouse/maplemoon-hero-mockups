# MapleMoon Lane F R2 — certified lock release

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-LANE-F-LOCK-RELEASE-20260816T150558",
  "worker_thread_id": "/root",
  "state": "admitted_control_plane_release",
  "objective": "Release exactly the two Lane F R2 page locks after independent certification, recording each certified post-edit SHA-256 without changing page bytes.",
  "authority": "MAPLEMOON-LANE-F-INDEPENDENT-CERT-20260816T143809 passed completion and promotion; its source close is 76/76 PASS and fresh browser matrix is 4/4 PASS.",
  "base": {
    "lock_manifest_sha256": "5d09ba28d3dc8b8d016cccd4ad0e9a3898eedb5b4c0ab810ee091fe3a6e3d8d2",
    "independent_cert_receipt_sha256": "d941aa10d104175dac23da71dc74998cb343efc21e2972683a9bd09f7f70fdae",
    "our_story_sha256": "6beef3f9449804e800ad7883c311c957637d12a5e05c69beb7ed912e49b36e23",
    "carob_story_sha256": "82b8d3a94de71c453ff2970f185832c93056862d4dd5599f02b6fc222bd9b339",
    "production_immutable_token": "7vjf2m50b"
  },
  "readable_paths": [
    "/Users/handtomouse/maplemoon-website/docs/orchestration/LOCK_MANIFEST.json",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-LANE-F-REBUILD-R2-20260816T141330.md",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/MAPLEMOON-LANE-F-REBUILD-R2-20260816T141330.json",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-LANE-F-INDEPENDENT-CERT-20260816T143809.md",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/MAPLEMOON-LANE-F-INDEPENDENT-CERT-20260816T143809.json",
    "/Users/handtomouse/maplemoon-website/_wip/our-story.WIP.html",
    "/Users/handtomouse/maplemoon-website/_wip/carob-story.WIP.html",
    "/Users/handtomouse/maplemoon-website/scripts/check-maplemoon-receipt.py"
  ],
  "writable_paths": [
    "maplemoon-website/docs/orchestration/LOCK_MANIFEST.json",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-LANE-F-LOCK-RELEASE-20260816T150558.json"
  ],
  "method": [
    "create a timestamped non-overwriting checkpoint for the exact two writable paths and pass phase=start with --root /Users/handtomouse",
    "replay the independent-cert completion and promotion gates and verify its receipt hash",
    "verify exactly two held rows for MAPLEMOON-LANE-F-REBUILD-R2-20260816T141330 and both certified current page hashes",
    "change only those two rows: status to released, released_by to MapleMoon root Boss /root, post_sha256 to the certified current hash, and append the certification receipt/hash to notes",
    "write one maplemoon-receipt/v2 JSON and run completion and promotion gates"
  ],
  "verify": [
    "exactly two Lane F rows transition held to released and no other row changes",
    "both page hashes remain unchanged before and after release",
    "each released row records the correct post_sha256, root releaser and certification reference",
    "production remains frozen by authority and no Vercel mutation runs",
    "completion and promotion gates pass"
  ],
  "stop": [
    "a cert gate, manifest hash, held-row count, owner, base hash or page hash differs",
    "any page byte, unrelated lock row, deploy, production or path outside writable_paths would change"
  ],
  "forbidden_actions": [
    "edit any WIP page, FAQ, source, media, design-system, deploy, production, Shopify or client surface",
    "deploy, promote, alias, commit, push, stash, delete, gitignore or contact the client"
  ],
  "next_reviewer": "MapleMoon root Boss; the rebuilt WIP pages are certified local state but still not a deploy or production candidate",
  "requires_visual_evidence": false
}
<!-- CONTROL-PLANE:END -->

## Boundary

This releases work ownership only. Founder, grove wording and studio-image decisions remain held; no deployment authority is created.
