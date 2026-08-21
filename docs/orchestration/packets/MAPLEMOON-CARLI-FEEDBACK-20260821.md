# MapleMoon Carli feedback closeout

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-CARLI-FEEDBACK-20260821",
  "worker_thread_id": "/root",
  "state": "admitted",
  "objective": "Close the remaining unambiguous copy edits from Carli's 15 August Our Story and What is Carob feedback, refresh the exact design-system bindings, and prepare an unsent reply for Nate's review.",
  "authority": "Nate's 21 August MapleMoon stream-owner brief; reversible changes are autonomous and all sends, deploys, deletions, money and production remain forbidden.",
  "readable_paths": [
    "_wip/our-story.WIP.html",
    "_wip/carob-story.WIP.html",
    "docs/design-system/contracts/routes.v1.json",
    "docs/design-system/contracts/exceptions.v1.json",
    "docs/shopify/BACKLOG-ASSUMPTIONS-QUESTIONS-20260820.md",
    "docs/shopify/COLLECTIONS-PLAN-20260820.md"
  ],
  "writable_paths": [
    "_wip/our-story.WIP.html",
    "_wip/carob-story.WIP.html",
    "docs/design-system/contracts/routes.v1.json",
    "docs/design-system/contracts/exceptions.v1.json",
    "docs/orchestration/reviews/MAPLEMOON-CARLI-FEEDBACK-20260821.json"
  ],
  "verify": [
    "git diff --check",
    "all supplied unambiguous copy instructions are reflected in the authoritative WIP",
    "node scripts/check-maplemoon-design-system.mjs --contracts-only emits exceptions=7",
    "node scripts/check-maplemoon-design-system.mjs --route-conformance all emits a count-bearing PASS rather than HOLD"
  ],
  "stop": [
    "a production, deploy, send, deletion, pricing or Q11 rename change would be required",
    "a source edit would conflict with an uncommitted worker change",
    "the design-system checker aborts without emitting route-conformance status"
  ],
  "next_reviewer": "Nate before any client-facing send",
  "requires_visual_evidence": false
}
<!-- CONTROL-PLANE:END -->
