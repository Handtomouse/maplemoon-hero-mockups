# Packet VIS-01A — Six-Page Visual Contract Inventory

**Candidate:** `CTRL-V2-CANDIDATE-20260730-001`
**State:** `planned`
**Approval class:** `local-review-only`
**Decision owner:** Nate
**Execution gate:** V2 ratification

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "document_id": "PACKET-VIS-01A",
  "packet_id": "VIS-01A",
  "candidate_id": "CTRL-V2-CANDIDATE-20260730-001",
  "phase": "VIS-01",
  "state": "planned",
  "approval_class": "local-review-only",
  "writable_paths": [],
  "receipt_transport": "inline-manual",
  "asset_class": "untracked-local-design-decision-html",
  "no_upload": true,
  "no_send": true,
  "no_promotion": true,
  "zero_external_requests_required": true,
  "viewports": [
    1440,
    1024,
    430,
    390,
    375,
    320
  ],
  "interactions": [
    "keyboard",
    "200-percent-zoom",
    "tap-targets",
    "reduced-motion"
  ],
  "page_paths": [
    "_wip/homepage_real_1_lead_photo.WIP.html",
    "_wip/shop.WIP.html",
    "_wip/our-story.WIP.html",
    "_wip/carob-story.WIP.html",
    "_wip/stockists.WIP.html",
    "_wip/faq.WIP.html"
  ],
  "page_contract_fields": [
    "page-and-section-scope",
    "visual-lane-and-focal-priority",
    "evidence-source",
    "held-decisions",
    "implementation-exclusions",
    "desktop-and-mobile-status",
    "accessibility-status",
    "owner",
    "next-gate"
  ],
  "retention": {
    "screenshots": "blocked-without-separate-packet",
    "recordings": "blocked-without-separate-packet",
    "browser_cache": "dispose-at-session-end",
    "feedback_logs": "blocked-without-separate-packet",
    "expiry": "end-of-local-review-session"
  },
  "page_order": [
    "Homepage",
    "Shop",
    "Our Story",
    "Carob Story",
    "Stockists",
    "FAQ"
  ],
  "evidence": {
    "id": "VIS-01-EVIDENCE-001",
    "path": "_wip/_CAROB_EDUCATION_VISUAL_DECISION_20260730.html",
    "sha256_raw": "976567ee99c1a367bd2317877bbb5672cf483d4d3478a18ea1b6826ff3cb68a7",
    "state": "needs_review",
    "disposition": "needs-decision",
    "decision_owner": "Nate",
    "render_state": "blocked",
    "render_blocker": "external Adobe Typekit stylesheet request"
  },
  "next_reviewer": "Nate"
}
<!-- CONTROL-PLANE:END -->

## Objective

Read the current six-page WIP and accepted governance decisions, then return an inline inventory of the shared visual system, section/page contracts, unresolved design choices and responsive/accessibility evidence.

## Carob chooser boundary

The chooser defines A editorial, B functional and C interactive directions. It does not record a selection. Source inspection is allowed. Rendered review is blocked because line 8 requests Adobe Typekit. A separate mutating packet must remove the external request, or an independent check must prove a zero-network review route, before rendered use can claim `local-review-only`.

- Asset class: untracked local design-decision HTML.
- Audience: Nate and the local MapleMoon review team.
- Tool after zero-network clearance: locally served Codex in-app Browser.
- `no_upload: true`
- `no_send: true`
- `no_promotion: true`
- Screenshots, recordings and feedback logs are blocked without a separate packet; browser cache is disposed at session end; expiry is the end of the local review session.

## Per-page receipt contract

The inline receipt must contain one record for each exact path:

| Page | Path |
|---|---|
| Homepage | `_wip/homepage_real_1_lead_photo.WIP.html` |
| Shop | `_wip/shop.WIP.html` |
| Our Story | `_wip/our-story.WIP.html` |
| Carob Story | `_wip/carob-story.WIP.html` |
| Stockists | `_wip/stockists.WIP.html` |
| FAQ | `_wip/faq.WIP.html` |

Each record requires page/section scope, visual lane and focal priority, evidence source, held decisions, implementation exclusions, desktop/mobile status, accessibility status, owner and next gate.

Presentation checks use 1440, 1024, 430, 390, 375 and 320px plus keyboard, 200% zoom, tap-target and reduced-motion review. Source/static checks and rendered visual acceptance are separate fields. Missing evidence is `pending`, never `passed`.

## Action / Verify / Done / Stop

**Action:** Read the six pages and inspect the Carob chooser source; inventory only. Do not render the chooser until its zero-network gate passes.

**Verify:** Desktop/mobile presentation evidence is clearly separated from source/static checks. Confirm the chooser raw hash and zero external requests before rendered use.

**Done:** Inline/manual receipt has all required fields for all six exact paths; absent evidence is pending; no file changes.

**Stop:** Any external request, selection by inference, WIP/theme edit, persisted receipt, upload/send, consent-held testimonial exposure or Shopify access.
