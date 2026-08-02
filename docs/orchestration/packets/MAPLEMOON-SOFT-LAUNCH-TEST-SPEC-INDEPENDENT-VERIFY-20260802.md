# MapleMoon soft-launch test specification independent-verification packet

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-SOFT-LAUNCH-TEST-SPEC-INDEPENDENT-VERIFY-20260802",
  "worker_thread_id": "019fbe94-9375-7e73-b9d7-cef33df63b6a",
  "state": "ready",
  "objective": "independently verify the completed local-only soft-launch test plan, event schema, analysis template and receipt for necessity, privacy, consistency and fail-closed activation boundaries",
  "authority_path": "/Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-CLIENT-REVIEW-SOFT-LAUNCH-SHOPIFY-READINESS-ADDENDUM-20260802.md",
  "authority_sha256": "7c541b6ff97f2ffdc1b6fe888cdba4f1795caadb947cfb7642d8ee54bfe2b712",
  "readable_paths": [
    "docs/orchestration/packets/MAPLEMOON-SOFT-LAUNCH-TEST-SPEC-20260802.md",
    "docs/orchestration/reviews/MAPLEMOON-SOFT-LAUNCH-TEST-SPEC-20260802.json",
    "docs/client-review/2026-08-01-saturday-review/SOFT-LAUNCH-TEST-PLAN-20260802.md",
    "docs/client-review/2026-08-01-saturday-review/SOFT-LAUNCH-EVENT-SCHEMA-20260802.json",
    "docs/client-review/2026-08-01-saturday-review/SOFT-LAUNCH-ANALYSIS-TEMPLATE-20260802.md",
    "docs/orchestration/packets/MAPLEMOON-OVERNIGHT-BOSS-HANDOFF-20260802.md",
    "docs/orchestration/packets/MAPLEMOON-CLIENT-REVIEW-SOFT-LAUNCH-SHOPIFY-READINESS-ADDENDUM-20260802.md",
    "docs/orchestration/packets/MAPLEMOON-SLEEP-COMMS-MONITOR-AUTHORITY-20260802.md",
    "docs/orchestration/reviews/MAPLEMOON-CLIENT-REVIEW-SHOPIFY-READINESS-RESEARCH-20260802.md"
  ],
  "writable_paths": [
    "docs/orchestration/packets/MAPLEMOON-SOFT-LAUNCH-TEST-SPEC-INDEPENDENT-VERIFY-20260802.md",
    "docs/orchestration/reviews/MAPLEMOON-SOFT-LAUNCH-TEST-SPEC-INDEPENDENT-VERIFY-20260802.json"
  ],
  "verify": [
    "authority hashes and receipt/source hashes",
    "every event answers at least one named research question",
    "properties are minimal, coarse and test-data separated",
    "prohibited personal, payment, precise-location, fingerprinting, replay and sensitive-text data remain excluded",
    "notice, consent, data owner, storage, access, retention and deletion remain activation gates",
    "no real endpoint, tool, cookie, identifier, participant invitation, website change or external action",
    "small-sample and evidence limitations are explicit",
    "absolute site-sharing HOLD remains intact"
  ],
  "stop": [
    "authority or hash drift",
    "missing recovery",
    "scope breach",
    "unsupported privacy or legal conclusion",
    "tracking, storage, collection, website mutation or external action"
  ],
  "next_reviewer": "019fa858-05c9-7631-b26e-8f5cbbf1387a",
  "requires_visual_evidence": false
}
<!-- CONTROL-PLANE:END -->

## Output

The independent verifier returns PASS, HOLD or FAIL with exact evidence, defects, confidence and one next action. The coordinator records the result without changing the reviewed planning files. A PASS verifies the local specification only and authorizes no implementation, test, invitation, data collection or sharing.
