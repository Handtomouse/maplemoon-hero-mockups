# MapleMoon link-preview metadata audit independent-verification packet

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-LINK-PREVIEW-METADATA-AUDIT-INDEPENDENT-VERIFY-20260802",
  "worker_thread_id": "019fbf17-2a07-7263-b96e-9e026144ce15",
  "state": "ready",
  "objective": "independently verify the six-page static metadata inventory, favicon evidence, copy-safety flags and fail-closed link-preview recommendation",
  "authority_path": "/Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-CLIENT-REVIEW-SOFT-LAUNCH-SHOPIFY-READINESS-ADDENDUM-20260802.md",
  "authority_sha256": "7c541b6ff97f2ffdc1b6fe888cdba4f1795caadb947cfb7642d8ee54bfe2b712",
  "readable_paths": [
    "docs/orchestration/packets/MAPLEMOON-LINK-PREVIEW-METADATA-AUDIT-20260802.md",
    "docs/orchestration/reviews/MAPLEMOON-LINK-PREVIEW-METADATA-AUDIT-20260802.json",
    "docs/client-review/2026-08-01-saturday-review/LINK-PREVIEW-METADATA-AUDIT-20260802.md",
    "docs/client-review/2026-08-01-saturday-review/LINK-PREVIEW-VALIDATION-MATRIX-20260802.json",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/*.html",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/assets/mm_logo_icon_blk.svg"
  ],
  "writable_paths": [
    "docs/orchestration/packets/MAPLEMOON-LINK-PREVIEW-METADATA-AUDIT-INDEPENDENT-VERIFY-20260802.md",
    "docs/orchestration/reviews/MAPLEMOON-LINK-PREVIEW-METADATA-AUDIT-INDEPENDENT-VERIFY-20260802.json"
  ],
  "verify": [
    "six clean source hashes match",
    "title, description, favicon, theme colour, robots, canonical, Open Graph and Twitter states are accurate",
    "favicon asset and missing fallbacks are accurately classified",
    "copy-safety flags do not invent a replacement or factual approval",
    "no Open Graph image is silently selected",
    "all external preview, URL, deployment and sharing actions remain HOLD"
  ],
  "stop": [
    "authority or hash drift",
    "material metadata finding is wrong",
    "unsupported approval or asset selection",
    "scope breach or external access"
  ],
  "next_reviewer": "019fa858-05c9-7631-b26e-8f5cbbf1387a",
  "requires_visual_evidence": false
}
<!-- CONTROL-PLANE:END -->

## Output

Return PASS, HOLD or FAIL with exact evidence, omissions, confidence and one next action. Do not edit or test externally.
