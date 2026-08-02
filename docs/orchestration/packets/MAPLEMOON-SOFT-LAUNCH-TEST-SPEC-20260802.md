# MapleMoon soft-launch test specification packet

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-SOFT-LAUNCH-TEST-SPEC-20260802",
  "worker_thread_id": "019fa858-05c9-7631-b26e-8f5cbbf1387a",
  "state": "ready",
  "objective": "prepare a privacy-conscious local-only family-and-friends test plan, event schema and analysis template without activating analytics, collecting data, inviting reviewers or changing the website",
  "authority_path": "/Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-CLIENT-REVIEW-SOFT-LAUNCH-SHOPIFY-READINESS-ADDENDUM-20260802.md",
  "authority_sha256": "7c541b6ff97f2ffdc1b6fe888cdba4f1795caadb947cfb7642d8ee54bfe2b712",
  "readable_paths": [
    "docs/orchestration/packets/MAPLEMOON-OVERNIGHT-BOSS-HANDOFF-20260802.md",
    "docs/orchestration/packets/MAPLEMOON-CLIENT-REVIEW-SOFT-LAUNCH-SHOPIFY-READINESS-ADDENDUM-20260802.md",
    "docs/orchestration/packets/MAPLEMOON-OVERNIGHT-CONTEXT-SESSION-CAPACITY-POLICY-20260802.md",
    "docs/orchestration/packets/MAPLEMOON-SLEEP-COMMS-MONITOR-AUTHORITY-20260802.md",
    "docs/orchestration/reviews/MAPLEMOON-CLIENT-REVIEW-SHOPIFY-READINESS-RESEARCH-20260802.md",
    "docs/orchestration/reviews/MAPLEMOON-CLIENT-REVIEW-SHOPIFY-READINESS-RESEARCH-20260802.json",
    "docs/client-review/2026-08-01-saturday-review/REVIEW-HUB-FEEDBACK-SCHEMA-20260802.json"
  ],
  "writable_paths": [
    "docs/orchestration/packets/MAPLEMOON-SOFT-LAUNCH-TEST-SPEC-20260802.md",
    "docs/orchestration/reviews/MAPLEMOON-SOFT-LAUNCH-TEST-SPEC-20260802.json",
    "docs/client-review/2026-08-01-saturday-review/SOFT-LAUNCH-TEST-PLAN-20260802.md",
    "docs/client-review/2026-08-01-saturday-review/SOFT-LAUNCH-EVENT-SCHEMA-20260802.json",
    "docs/client-review/2026-08-01-saturday-review/SOFT-LAUNCH-ANALYSIS-TEMPLATE-20260802.md"
  ],
  "verify": [
    "authority hashes",
    "timestamped non-overwriting checkpoint for all five writable paths",
    "exact five-path scope",
    "valid event-schema and receipt JSON",
    "every event maps to a named research question",
    "no personal, payment, precise-location, full-IP, session-replay or sensitive-text collection",
    "no real endpoint, analytics tool, cookie, credential, invitation or external action",
    "test-data separation, retention and deletion gates remain explicit",
    "completion receipt gate"
  ],
  "stop": [
    "authority drift",
    "missing recovery",
    "ownership overlap",
    "website or generated-package mutation",
    "real tracking, storage, form submission or data collection",
    "unapproved audience, access, notice, consent, retention or data-owner assumption",
    "deployment, sharing, client contact, Shopify, WooCommerce, Vercel or production action"
  ],
  "next_reviewer": "independent read-only verifier",
  "requires_visual_evidence": false
}
<!-- CONTROL-PLANE:END -->

## Boundaries

This packet creates planning records only. It does not authorize a test cohort, invitation, URL, analytics tool, cookie, identifier, form endpoint, real feedback collection, website change or external action.

## Done

- Research questions, cohorts, tasks and success measures are defined without naming or contacting participants.
- Every proposed event has a narrow purpose and privacy disposition.
- The analysis template separates test evidence from production data and requires limitations to be reported.
- All activation decisions remain held for Nate and the future privacy/security owner.
