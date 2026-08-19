# MAPLEMOON-QA-PROOF-REDUCED-MOTION-R2-20260803

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-QA-PROOF-REDUCED-MOTION-R2-20260803",
  "worker_thread_id": "019fc349-4ed4-77f0-9858-5015dbdf1ec7",
  "state": "ready",
  "objective": "prove or correctly HOLD runtime prefers-reduced-motion behavior on all six exact frozen clean routes in an isolated browser context without altering Nate's OS settings",
  "approval": "Nate explicitly directed Main to send parallel subagents to complete every remaining QA proof; R2 supersedes the first HEAD-drift HOLD without changing proof scope.",
  "branch": "codex-maplemoon-section-review",
  "head": "c05914ceb7f48dfe773e680ebbe7f392464f2dfa",
  "head_drift_policy": "record later HEAD movement; HOLD only when its diff touches the served clean package, this packet, this packet's writable paths, or the exact tested manifests",
  "served_base_url": "http://127.0.0.1:3011/",
  "package_manifest_sha256": "d0d834b9b9173a497d0b03e39e4c282a7d5247f51484ebfd7ba3a64e8416bf7c",
  "clean_manifest_sha256": "d1c66b1d5937e9956d1806dbbbff4faf4f950def046aa642ae52f809c3d52d20",
  "readable_paths": ["docs/client-review/2026-08-01-saturday-review/staging-v1/clean", "docs/orchestration/SIDECHAT_RECEIPT_GATE.md"],
  "writable_paths": ["_wip/reviews/maplemoon-six-page-qa-20260803/proof-reduced-motion-r2", "docs/orchestration/reviews/MAPLEMOON-QA-PROOF-REDUCED-MOTION-R2-20260803.json"],
  "verify": [
    "verify branch, admission HEAD and both manifest hashes before browser work",
    "use an isolated browser context with CDP or equivalent standards-based reduced-motion emulation; do not change macOS Accessibility settings",
    "prove matchMedia prefers-reduced-motion reduce is true on every route",
    "compare normal versus reduced behavior for animations, transitions, auto motion and focus usability on every route",
    "record exact runtime metrics and representative screenshots or deterministic evidence",
    "recheck both manifest hashes and any later HEAD diff before writing a matching maplemoon-receipt/v2 and running the completion gate"
  ],
  "stop": ["listed package or clean-manifest hash drifts", "later HEAD diff touches the served package or admitted paths", "reduced motion is only inferred from static CSS", "isolated runtime cannot be established", "any website/package/source/manifest file would change"],
  "forbidden_actions": ["change OS settings", "package edit", "commit, push, deploy, send, upload or client contact"],
  "next_reviewer": "Main independent verifier",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->
