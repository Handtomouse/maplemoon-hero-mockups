# MapleMoon Lane E — certified lock release

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-LANE-E-LOCK-RELEASE-20260816T140508",
  "worker_thread_id": "/root",
  "state": "admitted_control_plane_release",
  "objective": "Release exactly the six Lane E WIP locks after independent certification, recording each certified post-edit SHA-256 without changing any WIP page.",
  "authority": "MAPLEMOON-LANE-E-INDEPENDENT-CERT-20260816T133827 independently passed completion and promotion. Each existing Lane E release condition is therefore satisfied for lock release only.",
  "base": {
    "lock_manifest_sha256": "00f6c0fdabc54b9cfcd98624ee5c34460571b607cbeb78bd0bdc33dd61305094",
    "independent_cert_receipt_sha256": "0597af27459f57bdb19fa25b5aed83f22aa0357e844814128eee5012eef0416e",
    "homepage_sha256": "d097392fc1c6f44c3e3c09024bb7c2e2ea275e215a468dfe76306c6dcf534748",
    "shop_sha256": "b444b0da4f5778f7434c6343854e3cdf48d1a88b038c7863a2ef1d46b5e0cbac",
    "our_story_sha256": "f861ae24b6d4cd106402455e1361172be8b769cf0c0f967c17ee8de9a55fed19",
    "carob_story_sha256": "0ad6ea9bfaacf81d7ee4d7e5ddcf93c2bd77afe3635d575bf7a2c30c8f696e27",
    "faq_sha256": "4540ef31a150cb6de8062c2d4d74709f24d13ce45490f8e3c1c9c283c1fdbd56",
    "stockists_sha256": "1cc8b4e55c7dc59f6e268222c310ac47d477540caf7540970981726a801b9075",
    "production_immutable_token": "7vjf2m50b"
  },
  "readable_paths": [
    "/Users/handtomouse/maplemoon-website/docs/orchestration/LOCK_MANIFEST.json",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-LANE-E-APPLY-20260815T213337.md",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/MAPLEMOON-LANE-E-APPLY-20260815T213337.json",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-LANE-E-INDEPENDENT-CERT-20260816T133827.md",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/MAPLEMOON-LANE-E-INDEPENDENT-CERT-20260816T133827.json",
    "/Users/handtomouse/maplemoon-website/_wip/homepage_real_1_lead_photo.WIP.html",
    "/Users/handtomouse/maplemoon-website/_wip/shop.WIP.html",
    "/Users/handtomouse/maplemoon-website/_wip/our-story.WIP.html",
    "/Users/handtomouse/maplemoon-website/_wip/carob-story.WIP.html",
    "/Users/handtomouse/maplemoon-website/_wip/faq.WIP.html",
    "/Users/handtomouse/maplemoon-website/_wip/stockists.WIP.html",
    "/Users/handtomouse/maplemoon-website/scripts/check-maplemoon-receipt.py"
  ],
  "writable_paths": [
    "maplemoon-website/docs/orchestration/LOCK_MANIFEST.json",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-LANE-E-LOCK-RELEASE-20260816T140508.json"
  ],
  "method": [
    "create a timestamped non-overwriting checkpoint for the exact two writable paths and pass phase=start with --root /Users/handtomouse before the first write",
    "replay the independent-cert completion and promotion gates and verify its receipt hash",
    "verify exactly six rows for MAPLEMOON-LANE-E-APPLY-20260815T213337 remain held by /root/dedup_risk_audit and each base hash matches its original acquisition value",
    "verify all six current WIP hashes equal the independently certified post-edit hashes",
    "change only those six rows: status to released, released_by to MapleMoon root Boss /root, post_sha256 to the certified current hash, and append the certification receipt/hash to notes",
    "write one maplemoon-receipt/v2 JSON and run completion and promotion gates"
  ],
  "verify": [
    "the lock-manifest pre-hash and independent-cert receipt hash match",
    "exactly six Lane E rows transition held to released and no other row changes",
    "all six page hashes remain unchanged before and after release",
    "each released row records the correct post_sha256, root releaser and certification reference",
    "production remains frozen by authority and no deploy or production command runs",
    "completion and promotion gates pass"
  ],
  "stop": [
    "a cert gate, manifest hash, held-row count, owner, base hash or current page hash differs",
    "any page byte, unrelated lock row, deploy, production or path outside writable_paths would change"
  ],
  "forbidden_actions": [
    "edit any WIP page, source, media, design-system, deploy, production, Shopify or client surface",
    "deploy, promote, alias, commit, push, stash, delete, gitignore or contact the client"
  ],
  "next_reviewer": "MapleMoon root Boss; Lane F still requires a separate successor packet and fresh locks",
  "requires_visual_evidence": false
}
<!-- CONTROL-PLANE:END -->

## Boundary

This is a lock-ledger transition only. It does not promote the WIP candidate, resolve named content holds, or admit Lane F mutation.
