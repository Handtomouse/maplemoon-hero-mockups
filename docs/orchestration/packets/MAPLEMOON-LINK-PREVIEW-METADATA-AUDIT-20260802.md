# MapleMoon favicon and link-preview metadata audit packet

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-LINK-PREVIEW-METADATA-AUDIT-20260802",
  "worker_thread_id": "019fa858-05c9-7631-b26e-8f5cbbf1387a",
  "state": "ready",
  "objective": "audit the frozen six-page clean package for favicon, title, description, robots, canonical, Open Graph, Twitter and share-preview readiness without changing the pages or selecting an unsupported image",
  "authority_path": "/Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-CLIENT-REVIEW-SOFT-LAUNCH-SHOPIFY-READINESS-ADDENDUM-20260802.md",
  "authority_sha256": "7c541b6ff97f2ffdc1b6fe888cdba4f1795caadb947cfb7642d8ee54bfe2b712",
  "readable_paths": [
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/*.html",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/assets/mm_logo_icon_blk.svg",
    "docs/client-review/2026-08-01-saturday-review/REVIEW-HUB-SPEC-20260802.md",
    "docs/client-review/2026-08-01-saturday-review/REVIEW-HUB-SEND-CHECKLIST-20260802.md",
    "approved and candidate local imagery inventories for evidence classification only"
  ],
  "writable_paths": [
    "docs/orchestration/packets/MAPLEMOON-LINK-PREVIEW-METADATA-AUDIT-20260802.md",
    "docs/orchestration/reviews/MAPLEMOON-LINK-PREVIEW-METADATA-AUDIT-20260802.json",
    "docs/client-review/2026-08-01-saturday-review/LINK-PREVIEW-METADATA-AUDIT-20260802.md",
    "docs/client-review/2026-08-01-saturday-review/LINK-PREVIEW-VALIDATION-MATRIX-20260802.json"
  ],
  "verify": [
    "all six clean pages inventoried",
    "favicon reference resolves and source dimensions/hash recorded",
    "title, description, robots, canonical, Open Graph, Twitter and theme-color state classified",
    "unsupported or provisional metadata copy is flagged rather than silently approved",
    "no OG image selected without provenance and Nate approval",
    "no page, asset, URL, deployment, share or external mutation"
  ],
  "stop": [
    "authority or source drift",
    "missing recovery",
    "unsupported factual approval",
    "page or asset mutation",
    "external preview test, deployment or sharing"
  ],
  "next_reviewer": "independent low-cost read-only verifier",
  "requires_visual_evidence": false
}
<!-- CONTROL-PLANE:END -->

## Output

Produce a static audit and a machine-readable validation matrix. Keep all changes and external testing HOLD.
