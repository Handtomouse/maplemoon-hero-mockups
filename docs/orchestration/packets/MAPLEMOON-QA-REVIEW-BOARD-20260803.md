# MAPLEMOON-QA-REVIEW-BOARD-20260803

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-QA-REVIEW-BOARD-20260803",
  "worker_thread_id": "019fa858-05c9-7631-b26e-8f5cbbf1387a",
  "state": "ready",
  "objective": "build a local-only review board shell over the 18 immutable full-page screenshots so technical, visual and Nate-authored pins can be reviewed, commented on and exported",
  "approval": "Nate selected option A: dispatch both QA workers and build the local review board.",
  "branch": "codex-maplemoon-section-review",
  "head": "42d462ac4234ec2694f2eb256e6d80d13cd0bb0b",
  "readable_paths": [
    "_wip/reviews/canva-full-page-captures-20260803/canva-ready-v2",
    "_wip/reviews/maplemoon-six-page-qa-20260803/technical",
    "_wip/reviews/maplemoon-six-page-qa-20260803/visual"
  ],
  "writable_paths": ["_wip/reviews/maplemoon-six-page-qa-20260803/review-board"],
  "verify": [
    "show six page tabs and mobile, tablet and desktop views backed by the exact existing PNGs",
    "support normalized issue pins, Agree, Disagree, Comment and Defer decisions, plus click-to-add Nate notes",
    "persist locally without credentials or external services and export a portable decisions JSON file",
    "do not modify the 18 screenshot sources or any website/package file",
    "remain useful before worker findings arrive and accept their normalized JSON later"
  ],
  "stop": [
    "screenshot sources are missing or drift",
    "any package, source, manifest or website file would change",
    "the board requires deployment, credentials, external storage or client contact"
  ],
  "forbidden_actions": ["modify or promote the package", "deploy or share the board", "write outside the admitted review-board directory"],
  "next_reviewer": "Nate local review, then Main merge",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->

## Output contract

The board is a local decision surface only. Its decisions do not authorize package mutation, deployment or client sending.
