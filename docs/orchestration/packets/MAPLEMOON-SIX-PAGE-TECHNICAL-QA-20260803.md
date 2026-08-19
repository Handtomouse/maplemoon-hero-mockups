# MAPLEMOON-SIX-PAGE-TECHNICAL-QA-20260803

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-SIX-PAGE-TECHNICAL-QA-20260803",
  "worker_thread_id": "019fc329-a95c-7523-85fd-16a416d32b3f",
  "state": "ready",
  "objective": "perform a complete read-only technical QA audit of the exact hash-bound six-page clean MapleMoon package and return normalized findings plus evidence without modifying the package",
  "approval": "Nate selected option A: dispatch both QA workers and build the local review board.",
  "branch": "codex-maplemoon-section-review",
  "head": "42d462ac4234ec2694f2eb256e6d80d13cd0bb0b",
  "served_base_url": "http://127.0.0.1:3011/",
  "package_sha256": {
    "docs/client-review/2026-08-01-saturday-review/staging-v1/MANIFEST.json": "d0d834b9b9173a497d0b03e39e4c282a7d5247f51484ebfd7ba3a64e8416bf7c",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/MANIFEST.json": "d1c66b1d5937e9956d1806dbbbff4faf4f950def046aa642ae52f809c3d52d20",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/annotated/MANIFEST.json": "3be3c0f2df4658558c667b3e9cc6d55966d6a1d7ce9fa9874c46a0afc44244c7",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/homepage.html": "0d102050395b79f4add5d9ddb7f75e962d7e41e11a78cd7f88c35ce4a947ef0c",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/shop.html": "43cad154be945d34006013808f2eca5eeb9676ae3e28cedafbb75faccb914abb",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/our-story.html": "587a0042d27f74a4ee6d6a4c3488d226a5feab1f4531f26b697082432630fe75",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/carob-story.html": "d93dc036603ae7772e365573de1f89f066556d922d8b99c5e3fc7f2dada62762",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/stockists.html": "c54892a85c15165de448f68cab211979695bcabe066ecab987342c368dfca21b",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/faq.html": "f4acfb51c6e353828a432285f2a37f69ca39154b18d78ef41e337dc29fb35dcf"
  },
  "routes": ["homepage.html", "shop.html", "our-story.html", "carob-story.html", "stockists.html", "faq.html"],
  "viewports": [390, 834, 1440],
  "readable_paths": [
    "docs/orchestration/SIDECHAT_RECEIPT_GATE.md",
    "docs/orchestration/GOV-01_RATIFIED_LEDGER.md",
    "docs/orchestration/SATURDAY_FEEDBACK_REGISTER_20260801.md",
    "docs/orchestration/reviews/CARLI-CANVA-NOTE-REGISTER-20260731.md",
    "docs/orchestration/packets/SAT-HOME-01-HOMEPAGE-CLAIM-SAFE-FREEZE.md",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean",
    "scripts"
  ],
  "writable_paths": [
    "_wip/reviews/maplemoon-six-page-qa-20260803/technical",
    "docs/orchestration/reviews/MAPLEMOON-SIX-PAGE-TECHNICAL-QA-20260803.json"
  ],
  "verify": [
    "recheck every listed package hash before testing and stop on drift",
    "use real Chrome for literal 200 percent zoom and keyboard proof; do not substitute CSS scaling",
    "test keyboard order, visible focus, restoration, links, navigation, cart, accordions, buttons, reduced motion, overflow, console, failed assets, unexpected network and accessibility tree",
    "scan visible copy and claims only against the supplied approved evidence and separate unverified facts from technical defects",
    "write findings.json with stable IDs, page, viewport, normalized x/y coordinates, category, severity, observed, expected, evidence and recommended correction",
    "capture only material defect evidence and report checks that remain genuinely unproven",
    "write a valid maplemoon-receipt/v2 matching this worker_thread_id"
  ],
  "stop": [
    "served directory, branch, HEAD or any listed hash drifts",
    "checkpoint or ownership is missing",
    "testing would modify source, generated package, manifests, website assets or external state",
    "browser environment cannot prove a required check",
    "any commit, push, deploy, publish, upload, send, client contact, commerce or production action is required"
  ],
  "forbidden_actions": ["modify or rebuild the package", "invent client or product facts", "use any non-loopback external service", "approve or promote the candidate"],
  "next_reviewer": "Main coordinator independent receipt verification",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->

## Output contract

Return PASS only when every required technical gate is proven and no critical or major defect remains. Otherwise return HOLD with exact evidence and one next action.
