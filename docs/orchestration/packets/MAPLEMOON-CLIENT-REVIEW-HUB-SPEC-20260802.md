# MapleMoon client-review hub specification packet

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-CLIENT-REVIEW-HUB-SPEC-20260802",
  "worker_thread_id": "019fa858-05c9-7631-b26e-8f5cbbf1387a",
  "state": "ready",
  "objective": "prepare a local-only specification for one clear six-page Carli and Dylan review hub, its mock feedback schema, and its pre-send metadata and access checklist without implementing, serving or sharing the hub",
  "authority_path": "/Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-CLIENT-REVIEW-SOFT-LAUNCH-SHOPIFY-READINESS-ADDENDUM-20260802.md",
  "authority_sha256": "7c541b6ff97f2ffdc1b6fe888cdba4f1795caadb947cfb7642d8ee54bfe2b712",
  "readable_paths": [
    "docs/orchestration/packets/MAPLEMOON-OVERNIGHT-BOSS-HANDOFF-20260802.md",
    "docs/orchestration/packets/MAPLEMOON-CLIENT-REVIEW-SOFT-LAUNCH-SHOPIFY-READINESS-ADDENDUM-20260802.md",
    "docs/orchestration/packets/MAPLEMOON-SLEEP-COMMS-MONITOR-AUTHORITY-20260802.md",
    "docs/orchestration/reviews/MAPLEMOON-CLIENT-REVIEW-SHOPIFY-READINESS-RESEARCH-20260802.md",
    "docs/orchestration/reviews/MAPLEMOON-CLIENT-REVIEW-SHOPIFY-READINESS-RESEARCH-20260802.json",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean"
  ],
  "writable_paths": [
    "docs/orchestration/packets/MAPLEMOON-CLIENT-REVIEW-HUB-SPEC-20260802.md",
    "docs/orchestration/reviews/MAPLEMOON-CLIENT-REVIEW-HUB-SPEC-20260802.json",
    "docs/client-review/2026-08-01-saturday-review/REVIEW-HUB-SPEC-20260802.md",
    "docs/client-review/2026-08-01-saturday-review/REVIEW-HUB-FEEDBACK-SCHEMA-20260802.json",
    "docs/client-review/2026-08-01-saturday-review/REVIEW-HUB-SEND-CHECKLIST-20260802.md"
  ],
  "verify": [
    "frozen overnight, addendum and sleep-comms authority hashes",
    "timestamped non-overwriting checkpoint for all five writable paths",
    "exact five-path scope",
    "valid JSON",
    "all six clean routes represented once",
    "clean and annotated review surfaces remain explicitly separated",
    "feedback flow is mock-only and collects no data",
    "external sharing and site exposure remain HOLD",
    "completion receipt gate"
  ],
  "stop": [
    "authority drift",
    "missing recovery",
    "ownership overlap",
    "website or generated-package mutation",
    "unsupported client, product or commerce claim",
    "real form endpoint, analytics, cookies or data collection",
    "public URL, deployment, sharing, client contact or production action"
  ],
  "next_reviewer": "independent read-only verifier",
  "requires_visual_evidence": false
}
<!-- CONTROL-PLANE:END -->

## Boundaries

This packet produces planning records only. It does not authorize an HTML hub, a feedback service, a public or private URL, a message to any reviewer, analytics, deployment, Shopify, WooCommerce, Vercel, production access, or any change to the six-page review package.

## Done

- The review-hub information architecture and ordinary-viewer flow are unambiguous.
- The feedback schema distinguishes factual corrections, design preferences, missing assets, broken interactions and accessibility issues without collecting data.
- The send checklist holds every external decision for Nate after waking.
- All outputs validate and the receipt records exact hashes and unchanged website boundaries.
