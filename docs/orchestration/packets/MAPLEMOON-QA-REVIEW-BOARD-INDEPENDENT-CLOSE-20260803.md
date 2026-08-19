# MAPLEMOON-QA-REVIEW-BOARD-INDEPENDENT-CLOSE-20260803

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-QA-REVIEW-BOARD-INDEPENDENT-CLOSE-20260803",
  "worker_thread_id": "019fa858-05c9-7631-b26e-8f5cbbf1387a",
  "state": "ready",
  "objective": "record Main's independent Chrome verification of the preserved live-board candidate and reconcile the three specialist proof HOLDs into the board evidence",
  "approval": "Nate asked Main to send specialists, ingest their evidence, make the exact clean site live inside the review board and finish everything safely.",
  "branch": "codex-maplemoon-section-review",
  "head": "567d10644ed2ed9a1d08a9b8336892a4e5923ecc",
  "head_drift_policy": "record later HEAD movement; HOLD only when its diff touches the clean package, these writable paths, or tested manifests",
  "review_board_url": "http://127.0.0.1:3016/_wip/reviews/maplemoon-six-page-qa-20260803/review-board/",
  "package_manifest_sha256": "d0d834b9b9173a497d0b03e39e4c282a7d5247f51484ebfd7ba3a64e8416bf7c",
  "clean_manifest_sha256": "d1c66b1d5937e9956d1806dbbbff4faf4f950def046aa642ae52f809c3d52d20",
  "readable_paths": [
    "_wip/reviews/maplemoon-six-page-qa-20260803/review-board",
    "_wip/reviews/maplemoon-six-page-qa-20260803/proof-200-zoom-r2",
    "_wip/reviews/maplemoon-six-page-qa-20260803/proof-reduced-motion-r2",
    "_wip/reviews/maplemoon-six-page-qa-20260803/proof-network-r2",
    "docs/orchestration/reviews/MAPLEMOON-QA-REVIEW-BOARD-LIVE-EMBED-R2-20260803.json"
  ],
  "writable_paths": [
    "_wip/reviews/maplemoon-six-page-qa-20260803/technical/findings.json",
    "_wip/reviews/maplemoon-six-page-qa-20260803/review-board/qa-checks.json",
    "docs/orchestration/reviews/MAPLEMOON-QA-REVIEW-BOARD-INDEPENDENT-CLOSE-20260803.json"
  ],
  "acceptance": [
    "board verdict is PASS only for the local review workflow, not for the six-page site's three remaining browser-level proof gaps",
    "exact specialist HOLD reasons and evidence paths replace generic limitation descriptions without removing them from Nate's decision board",
    "independent Chrome verifies live iframe, live Tag note persistence and deletion, decision persistence and restoration, and visible keyboard focus",
    "all six same-origin clean routes and three viewport widths retain prior worker PASS evidence",
    "clean package and all manifests remain byte-identical"
  ],
  "verify": ["JSON parse both evidence files", "node --check review-board/app.js", "recheck completion receipts and manifest hashes", "run receipt completion gate"],
  "stop": ["tested manifest hash drifts", "later HEAD diff touches protected paths", "evidence cannot support the stated PASS/HOLD separation", "any package/source/manifest edit becomes necessary"],
  "forbidden_actions": ["package edit", "source edit", "manifest edit", "commit, push, deploy, share, send, upload or client contact"],
  "next_reviewer": "Nate",
  "requires_visual_evidence": false
}
<!-- CONTROL-PLANE:END -->
