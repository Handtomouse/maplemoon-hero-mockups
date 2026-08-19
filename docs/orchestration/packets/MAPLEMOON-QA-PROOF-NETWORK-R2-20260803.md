# MAPLEMOON-QA-PROOF-NETWORK-R2-20260803

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-QA-PROOF-NETWORK-R2-20260803",
  "worker_thread_id": "019fc349-4c3f-7f00-9202-e8de389db3d4",
  "state": "ready",
  "objective": "prove or correctly HOLD the actual request-level network ledger for all six exact frozen clean routes using an isolated read-only browser session",
  "approval": "Nate explicitly directed Main to send parallel subagents to complete every remaining QA proof; R2 supersedes the first HEAD-drift HOLD without changing proof scope.",
  "branch": "codex-maplemoon-section-review",
  "head": "c05914ceb7f48dfe773e680ebbe7f392464f2dfa",
  "head_drift_policy": "record later HEAD movement; HOLD only when its diff touches the served clean package, this packet, this packet's writable paths, or the exact tested manifests",
  "served_base_url": "http://127.0.0.1:3011/",
  "package_manifest_sha256": "d0d834b9b9173a497d0b03e39e4c282a7d5247f51484ebfd7ba3a64e8416bf7c",
  "clean_manifest_sha256": "d1c66b1d5937e9956d1806dbbbff4faf4f950def046aa642ae52f809c3d52d20",
  "readable_paths": ["docs/client-review/2026-08-01-saturday-review/staging-v1/clean", "docs/orchestration/SIDECHAT_RECEIPT_GATE.md"],
  "writable_paths": ["_wip/reviews/maplemoon-six-page-qa-20260803/proof-network-r2", "docs/orchestration/reviews/MAPLEMOON-QA-PROOF-NETWORK-R2-20260803.json"],
  "verify": [
    "verify branch, admission HEAD and both manifest hashes before browser work",
    "capture actual browser requests, responses, methods, resource types, destinations, status codes and failures for a clean load of every route",
    "separate loopback assets, expected static font resources, navigational hyperlinks that were not requested, and any unexpected third-party traffic",
    "do not submit forms, open external links, activate commerce or collect credentials or real user data",
    "write machine-readable request-ledger.json plus a concise summary",
    "recheck both manifest hashes and any later HEAD diff before writing a matching maplemoon-receipt/v2 and running the completion gate"
  ],
  "stop": ["listed package or clean-manifest hash drifts", "later HEAD diff touches the served package or admitted paths", "request events cannot be captured directly", "capture would require a proxy, certificate, credential or system/network setting change", "any website/package/source/manifest file would change"],
  "forbidden_actions": ["external navigation", "form submission", "package edit", "commit, push, deploy, send, upload or client contact"],
  "next_reviewer": "Main independent verifier",
  "requires_visual_evidence": false
}
<!-- CONTROL-PLANE:END -->
