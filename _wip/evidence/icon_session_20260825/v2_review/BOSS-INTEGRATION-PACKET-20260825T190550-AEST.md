# MapleMoon icon direction v2 — Boss integration packet

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-ICON-V2-BOSS-INTEGRATION-20260825T190550-AEST",
  "worker_thread_id": "019ffe53-6243-73a2-9d75-e1a072cd07ce",
  "state": "go_for_single_writer_private_preview_integration",
  "objective": "Integrate Nate-approved MapleMoon icon direction v2 into tonight's current private-preview consolidation without colliding with active homepage ownership, linking review-only paths into routes, changing packaging authority, or touching production.",
  "authority": "Nate reviewed the v2 sheet and directly instructed: 'amazing send them up to boss for intergration for tonight pls!!!' at 2026-08-25 19:05 AEST. The adjacent approval addendum releases all four displayed design gates for private-preview integration only.",
  "readable_paths": [
    "maplemoon-website/_wip/evidence/icon_session_20260825/v2_review/APPROVAL-20260825T190550-AEST.md",
    "maplemoon-website/_wip/evidence/icon_session_20260825/v2_review/QA-RESULTS.md",
    "maplemoon-website/_wip/evidence/icon_session_20260825/v2_review/manifest.json",
    "maplemoon-website/_wip/evidence/icon_session_20260825/v2_review/review-sheet.html",
    "maplemoon-website/_wip/evidence/icon_session_20260825/v2_review/REVIEW-GATE.md",
    "maplemoon-website/_wip/evidence/icon_session_20260825/v2_review/individual",
    "maplemoon-website/scripts/build-maplemoon-icon-v2-review.mjs",
    "maplemoon-website/scripts/check-maplemoon-icon-v2-review.mjs",
    "maplemoon-website/_wip/evidence/carli_external_icon_kit_20260825/AUTHORITY-MAP.md",
    "maplemoon-website/assets/brand/icon_caffeine_free.svg"
  ],
  "writable_paths": [],
  "implementation_contract": [
    "Boss remains sole coordinator and declares one exact writer per integration file before any write",
    "Boss creates a separate timestamped non-overwriting integration packet and checkpoint once current homepage ownership is released; this intake packet itself grants no uncheckpointed route write",
    "copy accepted geometry into the canonical site icon assets; do not reference _wip/evidence/icon_session_20260825/v2_review from a route",
    "integrate the five homepage category icons and the full six-row cacao/carob comparison family first because Nate explicitly added those two live contexts",
    "integrate utility, product and process symbols only where an existing real site use exists; do not invent sections or replace packaging artwork",
    "preserve v1 as rejected/HOLD evidence and do not mix v1/v2 files",
    "include the result only in the already authorised new private preview; production and client delivery remain forbidden"
  ],
  "verify": [
    "node scripts/check-maplemoon-icon-v2-review.mjs remains PASS before and after integration",
    "the five category icons render at the real selector size and remain distinct at exact 390 and 1440 widths",
    "the cacao/carob comparison contains six distinct semantic icons and three checks with no generic-symbol reuse",
    "all production SVG geometry uses currentColor, exact viewBoxes and no text/image/external dependencies",
    "required homepage invariants, root overflow, broken-image, runtime-console and interaction checks stay green",
    "private preview receipt names exact admitted icons, changed files, before/after hashes, screenshots, immutable preview URL/ID and rollback point"
  ],
  "stop": [
    "homepage or another target file still has a different declared writer",
    "integration requires a change outside a separately checkpointed writable scope",
    "a current packaging/brand source hash differs from manifest evidence",
    "the icon review checker or a required homepage/private-preview check fails",
    "production deploy, client send, Drive upload, Shopify mutation or packaging mutation becomes necessary"
  ],
  "forbidden_actions": [
    "production deployment or alias promotion",
    "client email/message/Drive send",
    "packaging artwork mutation",
    "direct route references to the v2 review directory",
    "overwriting another lane's file ownership",
    "mixing rejected v1 icons into the accepted v2 family"
  ],
  "requires_visual_evidence": true,
  "next_reviewer": "MapleMoon BOSS integration owner and independent private-preview visual QA"
}
<!-- CONTROL-PLANE:END -->

## Manager packet

Priority/deadline: **P1 · tonight's meeting/private preview**  
Outcome/scope: Integrate the Nate-approved v2 icon direction into the current private preview; production and client delivery excluded.  
State: Direction approved; 44 unique SVG review cuts and seven current source hashes verified; live routes still unchanged.  
Evidence: `QA-RESULTS.md`, `manifest.json`, `rendered/`, `APPROVAL-20260825T190550-AEST.md`.  
Gate: Wait for current single-writer ownership release, then create a separate exact integration packet/checkpoint.  
Next: Admit category + comparison artwork into Boss's consolidation queue, then allocate other real-use symbols without inventing new placements.

## Immutable evidence pins

- Manifest SHA-256: `cb0f526309c000626da312c504b384e6e9b7de415b7074556488fc191509844b`.
- Review sheet SHA-256: `5cc555a90affa95602f05b673e7d5cfa2823738ae6a2e92feaa5b185f9e4560b`.
- QA results SHA-256 before this packet: `a0d1e114492d782e84dab21aa076370f9e530e3bb83bb56954ce6d8b4c8ace7d`.
- Verified review output: 44 unique SVGs, seven source hashes, five homepage categories, six comparison rows, three checks, zero route leakage.
