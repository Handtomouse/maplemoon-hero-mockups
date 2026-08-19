# MAPLEMOON-SIX-PAGE-VISUAL-QA-20260803

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-SIX-PAGE-VISUAL-QA-20260803",
  "worker_thread_id": "019fc329-b874-72b3-82d9-95bfe0c3af45",
  "state": "ready",
  "objective": "perform a ruthless read-only visual and UI audit of every clean MapleMoon page at mobile, tablet and desktop and return normalized issue pins without modifying the package",
  "approval": "Nate selected option A: dispatch both QA workers and build the local review board.",
  "branch": "codex-maplemoon-section-review",
  "head": "42d462ac4234ec2694f2eb256e6d80d13cd0bb0b",
  "served_base_url": "http://127.0.0.1:3011/",
  "package_sha256": {
    "docs/client-review/2026-08-01-saturday-review/staging-v1/MANIFEST.json": "d0d834b9b9173a497d0b03e39e4c282a7d5247f51484ebfd7ba3a64e8416bf7c",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/MANIFEST.json": "d1c66b1d5937e9956d1806dbbbff4faf4f950def046aa642ae52f809c3d52d20",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/annotated/MANIFEST.json": "3be3c0f2df4658558c667b3e9cc6d55966d6a1d7ce9fa9874c46a0afc44244c7"
  },
  "routes": ["homepage", "shop", "our-story", "carob-story", "stockists", "faq"],
  "viewports": ["mobile-390", "tablet-834", "desktop-1440"],
  "readable_paths": [
    "docs/orchestration/SIDECHAT_RECEIPT_GATE.md",
    "docs/orchestration/GOV-01_RATIFIED_LEDGER.md",
    "docs/orchestration/SATURDAY_FEEDBACK_REGISTER_20260801.md",
    "docs/orchestration/reviews/CARLI-CANVA-NOTE-REGISTER-20260731.md",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean",
    "_wip/reviews/canva-full-page-captures-20260803/canva-ready-v2"
  ],
  "writable_paths": [
    "_wip/reviews/maplemoon-six-page-qa-20260803/visual",
    "docs/orchestration/reviews/MAPLEMOON-SIX-PAGE-VISUAL-QA-20260803.json"
  ],
  "verify": [
    "recheck the three listed manifest hashes and all 18 supplied screenshot dimensions before review",
    "inspect every page and viewport for spacing, alignment, hierarchy, typography, wrapping, crops, image quality, contrast, consistency, unfinished presentation and ordinary-viewer polish",
    "separate proven visual defects, subjective preference, unsupported factual copy and source-dependent imagery",
    "write findings.json with stable IDs, page, viewport, normalized x/y coordinates, category, severity, observed, evidence and recommended correction",
    "record section-level coverage PASS entries instead of pinning every correct element",
    "capture new crops only when the existing full-page image cannot prove a material finding",
    "write a valid maplemoon-receipt/v2 matching this worker_thread_id"
  ],
  "stop": [
    "any listed manifest hash drifts",
    "checkpoint or ownership is missing",
    "review would require modifying, rebuilding or replacing any package file",
    "a finding depends on an invented identity, product fact, price, availability, packaging or claim",
    "any commit, push, deploy, publish, upload, send, client contact, commerce or production action is required"
  ],
  "forbidden_actions": ["modify screenshots or package", "invent facts", "approve or promote the candidate", "contact another worker or client"],
  "next_reviewer": "Main coordinator independent receipt verification",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->

## Output contract

Return PASS only when all 18 surfaces were inspected and no critical or major visual defect remains. Otherwise return HOLD with exact evidence and one next action.
