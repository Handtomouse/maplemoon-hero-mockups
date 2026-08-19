# MapleMoon Lane F R2 — lock acquisition

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-LANE-F-LOCK-ACQUIRE-20260816T141556",
  "worker_thread_id": "/root",
  "state": "admitted_control_plane_lock_acquisition",
  "objective": "Acquire exactly two fresh held locks for the Lane F R2 successor on the independently released Our Story and Carob Story post-Lane-E bases.",
  "authority": "MAPLEMOON-LANE-F-REBUILD-R2-20260816T141330 and the completed Lane E independent certification and lock release. This packet changes only lock-ledger state.",
  "base": {
    "lock_manifest_sha256": "2bd9e43b3678837b1f86d30fb6404ff033d5a2d5e04c58c93e793bc877721776",
    "lane_f_successor_packet": "MAPLEMOON-LANE-F-REBUILD-R2-20260816T141330",
    "our_story_sha256": "f861ae24b6d4cd106402455e1361172be8b769cf0c0f967c17ee8de9a55fed19",
    "carob_story_sha256": "0ad6ea9bfaacf81d7ee4d7e5ddcf93c2bd77afe3635d575bf7a2c30c8f696e27"
  },
  "readable_paths": [
    "/Users/handtomouse/maplemoon-website/docs/orchestration/LOCK_MANIFEST.json",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-LANE-F-REBUILD-R2-20260816T141330.md",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/MAPLEMOON-LANE-E-LOCK-RELEASE-20260816T140508.json",
    "/Users/handtomouse/maplemoon-website/_wip/our-story.WIP.html",
    "/Users/handtomouse/maplemoon-website/_wip/carob-story.WIP.html",
    "/Users/handtomouse/maplemoon-website/scripts/check-maplemoon-receipt.py"
  ],
  "writable_paths": [
    "maplemoon-website/docs/orchestration/LOCK_MANIFEST.json",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-LANE-F-LOCK-ACQUIRE-20260816T141556.json"
  ],
  "method": [
    "create a timestamped non-overwriting checkpoint for the two writable paths and pass phase=start with --root /Users/handtomouse",
    "verify the manifest pre-hash, both page hashes and absence of any other held lock on either path",
    "append exactly two v2 lock rows owned by Codex /root/dedup_risk_audit and bound to MAPLEMOON-LANE-F-REBUILD-R2-20260816T141330",
    "set both rows held with exact base hashes, a bounded lease and a release condition requiring worker receipt plus independent rendered certification",
    "write one maplemoon-receipt/v2 JSON and run completion and promotion gates"
  ],
  "verify": [
    "exactly two new held rows exist for the successor and no other lock row changes",
    "both page bytes and hashes remain unchanged",
    "the successor packet and two lock rows share exact packet_id, owner and worker_thread_id",
    "completion and promotion gates pass"
  ],
  "stop": [
    "a manifest or page hash differs, an active held lock already exists, or any page byte/path outside writable_paths would change"
  ],
  "forbidden_actions": [
    "edit WIP/source/media/deploy/production/Shopify/client surfaces",
    "deploy, promote, alias, commit, push, stash, delete, gitignore or contact the client"
  ],
  "next_reviewer": "MapleMoon root Boss to confirm lock admission, then /root/dedup_risk_audit may run Lane F R2 phase=start",
  "requires_visual_evidence": false
}
<!-- CONTROL-PLANE:END -->

## Boundary

This acquires work ownership only; it does not execute the rebuild or authorise later promotion.
