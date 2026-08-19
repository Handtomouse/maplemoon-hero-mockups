# MAPLEMOON-QA-PROOF-200-ZOOM-R2-20260803

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-QA-PROOF-200-ZOOM-R2-20260803",
  "worker_thread_id": "019fc349-4347-7ba2-ab86-77971b20aabf",
  "state": "ready",
  "objective": "prove or correctly HOLD literal native Chrome 200 percent zoom visual and keyboard behavior on all six exact frozen clean routes, then restore Chrome zoom to 100 percent",
  "approval": "Nate explicitly directed Main to send parallel subagents to complete every remaining QA proof; R2 supersedes the first HEAD-drift HOLD without changing proof scope.",
  "branch": "codex-maplemoon-section-review",
  "head": "c05914ceb7f48dfe773e680ebbe7f392464f2dfa",
  "head_drift_policy": "record later HEAD movement; HOLD only when its diff touches the served clean package, this packet, this packet's writable paths, or the exact tested manifests",
  "served_base_url": "http://127.0.0.1:3011/",
  "package_manifest_sha256": "d0d834b9b9173a497d0b03e39e4c282a7d5247f51484ebfd7ba3a64e8416bf7c",
  "clean_manifest_sha256": "d1c66b1d5937e9956d1806dbbbff4faf4f950def046aa642ae52f809c3d52d20",
  "readable_paths": ["docs/client-review/2026-08-01-saturday-review/staging-v1/clean", "docs/orchestration/SIDECHAT_RECEIPT_GATE.md"],
  "writable_paths": ["_wip/reviews/maplemoon-six-page-qa-20260803/proof-200-zoom-r2", "docs/orchestration/reviews/MAPLEMOON-QA-PROOF-200-ZOOM-R2-20260803.json"],
  "verify": [
    "verify branch, admission HEAD and both manifest hashes before browser work",
    "use actual Chrome browser zoom UI or another independently observable native zoom control; CSS scaling and viewport resizing do not count",
    "set 200 percent, prove the displayed zoom value, inspect homepage, shop, our-story, carob-story, stockists and faq, and exercise a short native keyboard path with visible focus",
    "record viewport metrics and screenshot evidence for each route",
    "restore native Chrome zoom to 100 percent and prove restoration",
    "recheck both manifest hashes and any later HEAD diff before writing a matching maplemoon-receipt/v2 and running the completion gate"
  ],
  "stop": ["listed package or clean-manifest hash drifts", "later HEAD diff touches the served package or admitted paths", "native zoom cannot be independently observed", "Chrome control would require credentials or external action", "any website/package/source/manifest file would change"],
  "forbidden_actions": ["CSS zoom substitute", "package edit", "commit, push, deploy, send, upload or client contact"],
  "next_reviewer": "Main independent verifier",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->
