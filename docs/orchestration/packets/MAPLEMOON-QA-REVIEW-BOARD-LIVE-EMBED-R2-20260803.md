# MAPLEMOON-QA-REVIEW-BOARD-LIVE-EMBED-R2-20260803

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-QA-REVIEW-BOARD-LIVE-EMBED-R2-20260803",
  "worker_thread_id": "019fc349-4347-7ba2-ab86-77971b20aabf",
  "state": "ready",
  "objective": "adopt the preserved incomplete live-board candidate, independently verify it, repair only safe in-scope defects, and return an exact PASS or HOLD receipt",
  "approval": "Nate asked for a live site inside the review board and directed Main to use subagents; R2 supersedes the first worker only because its browser session was terminated after repeated no-progress stop gates.",
  "branch": "codex-maplemoon-section-review",
  "head": "4affbd2231ce69c4841019e459b3607d85f6754e",
  "head_drift_policy": "record later HEAD movement; HOLD only when its diff touches the clean package, this packet, this packet's writable paths, or the tested manifests",
  "served_review_board_url": "http://127.0.0.1:3016/_wip/reviews/maplemoon-six-page-qa-20260803/review-board/",
  "same_origin_clean_base": "/docs/client-review/2026-08-01-saturday-review/staging-v1/clean/",
  "package_manifest_sha256": "d0d834b9b9173a497d0b03e39e4c282a7d5247f51484ebfd7ba3a64e8416bf7c",
  "clean_manifest_sha256": "d1c66b1d5937e9956d1806dbbbff4faf4f950def046aa642ae52f809c3d52d20",
  "readable_paths": ["_wip/reviews/maplemoon-six-page-qa-20260803/review-board", "docs/client-review/2026-08-01-saturday-review/staging-v1/clean", "_wip/checkpoints/MAPLEMOON-QA-REVIEW-BOARD-LIVE-EMBED-20260803_20260803_024259_AEST"],
  "writable_paths": [
    "_wip/reviews/maplemoon-six-page-qa-20260803/review-board/index.html",
    "_wip/reviews/maplemoon-six-page-qa-20260803/review-board/app.js",
    "_wip/reviews/maplemoon-six-page-qa-20260803/review-board/styles.css",
    "_wip/reviews/maplemoon-six-page-qa-20260803/review-board/qa-checks.json",
    "docs/orchestration/reviews/MAPLEMOON-QA-REVIEW-BOARD-LIVE-EMBED-R2-20260803.json"
  ],
  "acceptance": [
    "Screenshot mode remains the default full-page PNG experience and existing stored decisions and notes remain compatible",
    "Live mode loads the exact same-origin clean route for every page at the selected 390, 834 or 1440 width",
    "Browse mode permits ordinary page interaction without external navigation",
    "Tag mode prevents accidental page activation and records full-document x/y note coordinates after browsing to the target area",
    "page, viewport, Screenshot/Live and Browse/Tag controls are keyboard reachable with visible state",
    "clean package, manifests, source and unrelated evidence remain unchanged"
  ],
  "verify": [
    "review the existing candidate diff before editing",
    "node --check app.js and parse qa-checks.json",
    "prove all six live routes return 200 from the same 3016 origin",
    "browser-check screenshot mode, live browse, live tag, viewport switching, page switching, note persistence, decision persistence and visible keyboard focus using supported controls",
    "if browser interaction cannot be completed promptly, preserve deterministic results and return HOLD rather than looping",
    "recheck manifest hashes and exact writable-path diff, write maplemoon-receipt/v2 and run the completion gate"
  ],
  "stop": ["listed package or clean-manifest hash drifts", "later HEAD diff touches protected paths", "same-origin routes do not load", "change would touch the clean package or another evidence cluster", "existing decisions or notes cannot be preserved", "external navigation, credentials or production access becomes necessary"],
  "forbidden_actions": ["clean-package edit", "manifest edit", "source edit", "commit, push, deploy, send, upload, client contact or external navigation"],
  "next_reviewer": "Main independent verifier",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->
