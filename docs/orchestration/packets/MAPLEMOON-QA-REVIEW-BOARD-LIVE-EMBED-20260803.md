# MAPLEMOON-QA-REVIEW-BOARD-LIVE-EMBED-20260803

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-QA-REVIEW-BOARD-LIVE-EMBED-20260803",
  "worker_thread_id": "019fc349-4c3f-7f00-9202-e8de389db3d4",
  "state": "ready",
  "objective": "add a same-origin live-site review mode to the existing six-page QA board while preserving its full-page PNG mode, local decisions and tagged-note workflow",
  "approval": "Nate asked whether the live site could be ported directly into the review board and asked Main to use subagents to complete the work.",
  "branch": "codex-maplemoon-section-review",
  "head": "c05914ceb7f48dfe773e680ebbe7f392464f2dfa",
  "served_review_board_url": "http://127.0.0.1:3016/_wip/reviews/maplemoon-six-page-qa-20260803/review-board/",
  "same_origin_clean_base": "/docs/client-review/2026-08-01-saturday-review/staging-v1/clean/",
  "package_manifest_sha256": "d0d834b9b9173a497d0b03e39e4c282a7d5247f51484ebfd7ba3a64e8416bf7c",
  "clean_manifest_sha256": "d1c66b1d5937e9956d1806dbbbff4faf4f950def046aa642ae52f809c3d52d20",
  "readable_paths": ["_wip/reviews/maplemoon-six-page-qa-20260803/review-board", "docs/client-review/2026-08-01-saturday-review/staging-v1/clean"],
  "writable_paths": [
    "_wip/reviews/maplemoon-six-page-qa-20260803/review-board/index.html",
    "_wip/reviews/maplemoon-six-page-qa-20260803/review-board/app.js",
    "_wip/reviews/maplemoon-six-page-qa-20260803/review-board/styles.css",
    "_wip/reviews/maplemoon-six-page-qa-20260803/review-board/qa-checks.json",
    "docs/orchestration/reviews/MAPLEMOON-QA-REVIEW-BOARD-LIVE-EMBED-20260803.json"
  ],
  "acceptance": [
    "Screenshot mode remains the default full-page PNG experience and existing stored decisions and notes remain compatible",
    "Live mode loads the exact same-origin clean route for each of the six pages at the selected 390, 834 or 1440 viewport width",
    "Browse mode permits ordinary scrolling, links, menus, cart and accordions inside the live page without external navigation",
    "Tag mode prevents accidental page activation and records a note at the corresponding full-document x/y position after the user has browsed to the target area",
    "switching page, viewport, Screenshot/Live and Browse/Tag has explicit accessible controls and visible state",
    "no clean package, manifest, source, client data or existing evidence file changes"
  ],
  "verify": [
    "node --check app.js and JSON parse qa-checks.json",
    "serve the board at 3016 and prove all six live routes load same-origin",
    "prove screenshot mode, live browse, live tag, viewport switching, page switching, note persistence, decision persistence and keyboard-visible control focus",
    "recheck both manifest hashes and exact writable-path diff",
    "write a matching maplemoon-receipt/v2 and run the completion gate"
  ],
  "stop": ["listed package or clean-manifest hash drifts", "same-origin clean routes cannot be loaded", "change would touch the clean package or another evidence cluster", "existing note/decision state cannot be preserved", "external navigation, credentials or production access becomes necessary"],
  "forbidden_actions": ["clean-package edit", "manifest edit", "source edit", "commit, push, deploy, send, upload, client contact or external navigation"],
  "next_reviewer": "Main independent verifier",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->
