# Packet VIS-03C-04 - Responsive Rebuild

**Packet ID:** `VIS-03C-04-RESPONSIVE-REBUILD`
**Candidate ID:** `VIS-03C-04-RESPONSIVE-REBUILD-CANDIDATE-20260731-001`
**Parent candidate:** `VIS-03C-03-CURRENT-WIP-LINEAGE-CANDIDATE-20260731-001`
**Cluster:** `VIS-03C-04-DERIVED-RESPONSIVE-REBUILD`
**State:** `blocked`
**Approval class:** `mutating-local-derived-review`
**Owner:** Codex
**Final decision owner:** Nate

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "VIS-03C-04-RESPONSIVE-REBUILD",
  "candidate_id": "VIS-03C-04-RESPONSIVE-REBUILD-CANDIDATE-20260731-001",
  "parent_candidate_id": "VIS-03C-03-CURRENT-WIP-LINEAGE-CANDIDATE-20260731-001",
  "phase": "VIS-03",
  "state": "blocked",
  "approval_class": "mutating-local-derived-review",
  "cluster_id": "VIS-03C-04-DERIVED-RESPONSIVE-REBUILD",
  "objective": "Repin the responsive fixes already committed at d65047b, rebuild the local clean and annotated Saturday package, and replace the invalid document-scroll overflow evidence with per-element rect and scroll-reachability checks proven by an injected-overflow positive control.",
  "user_decisions": [
    "Approve VIS-03C-04 responsive repin, rebuild and QA only."
  ],
  "non_goals": [
    "editing canonical WIP",
    "changing page design, copy, claims, catalogue facts, pricing or assets",
    "admitting isolated Shop layout variants or new generated imagery",
    "resolving CAT-01 or parked non-website work",
    "committing, pushing, deploying, sharing, sending or changing external systems"
  ],
  "readable_paths": [
    "docs/plans/2026-07-31-maplemoon-saturday-delivery-gsd-plan.md",
    "docs/orchestration/packets/VIS-03C-03-CURRENT-WIP-SOURCE-LINEAGE.md",
    "docs/orchestration/reviews/VIS-03C-03-CURRENT-WIP-SOURCE-LINEAGE-20260731.md",
    "_wip/homepage_real_1_lead_photo.WIP.html",
    "_wip/carob-story.WIP.html",
    "_wip/shop.WIP.html",
    "_wip/our-story.WIP.html",
    "_wip/stockists.WIP.html",
    "_wip/faq.WIP.html",
    "docs/client-review/2026-08-01-saturday-review/shared",
    "docs/client-review/2026-08-01-saturday-review/staging-v1"
  ],
  "writable_paths": [
    "docs/orchestration/packets/VIS-03C-04-RESPONSIVE-REBUILD.md",
    "scripts/build-maplemoon-saturday-review.py",
    "scripts/check-maplemoon-review.py",
    "scripts/check-maplemoon-responsive-overflow.mjs",
    "package.json",
    "docs/client-review/2026-08-01-saturday-review/staging-v1",
    "docs/orchestration/reviews/VIS-03C-04-RESPONSIVE-REBUILD-20260731.md"
  ],
  "base": {
    "branch": "codex-maplemoon-section-review",
    "head": "d65047b6a7431af955ad0cd5b57c42f7a9367225",
    "builder_sha256": "360a17a1d5de59b45f33235553bb76892b5e0d11f77808fcbb8ee6d41613913c",
    "checker_sha256": "ece602a1e2a6ec8e98c528edac77ac43f157f9b260fe63919e7f3bd84f4f9f0e",
    "package_sha256": "117a65974401c34641a34e794dda4cd2e36ec69e3cd6ab1b05431b278c808bd0",
    "aggregate_manifest_sha256": "d762ef7c831e71b1dfb348f162087c4ef394bfa5de9aa1e36c677d833c3afbf8",
    "canonical_wip_sha256": {
      "_wip/homepage_real_1_lead_photo.WIP.html": "921ef01aa922668da2f0aacdfdf7438fd0e5664fb78ba98bc9c011e55e03b098",
      "_wip/carob-story.WIP.html": "e1695095f6b8e18eccea468dfd8a09013e85b5c64c5de427b3d8e5701e6f4320",
      "_wip/shop.WIP.html": "d976b0b8df1edc845eae10fa03a272f96dae7ff9fad6711f1dfb6eed80ff5a09",
      "_wip/our-story.WIP.html": "17b77bc83930a6ad4ef5834427bdeed5ff6672a8001328259aa84e7a98e06304",
      "_wip/stockists.WIP.html": "6e92382ccec4874aac79c32e644d0ed130d03400c7d23682623b0e4154a6fa36",
      "_wip/faq.WIP.html": "4a7f5eee7096150f23f07cac6316c83893aab34135e3c40ca0e24848b77704f1"
    }
  },
  "responsive_matrix": {
    "routes": ["homepage", "carob-story", "shop", "our-story", "stockists", "faq"],
    "surfaces": ["clean", "annotated"],
    "widths": [320, 375, 390, 430, 1024, 1440],
    "total_route_width_checks": 72,
    "detector": "per-element getBoundingClientRect plus horizontal-scroll reachability",
    "excluded": [
      "position fixed elements",
      "hidden, aria-hidden or inert subtrees",
      "closed dialogs",
      "display none or visibility hidden elements",
      "zero-area and non-rendered metadata elements"
    ],
    "positive_control": "Inject a non-fixed element 900px wider than the viewport, require the detector to report that exact element, remove it, then require the real page to pass.",
    "targeted_regressions": [
      "Shop Bars category is reachable at 320, 375, 390 and 430 pixels",
      "every Shop category can be brought into the scroll viewport within valid scrollLeft bounds",
      "Carob Story, Shop and Stockists header cart controls remain inside 320 pixels",
      "closed cart dialogs create no overflow false positives"
    ]
  },
  "result": {
    "share_ready": false,
    "deterministic_build": "pass",
    "static_and_interaction_checks": "pass",
    "positive_control": "pass at 320 and 1440 pixels",
    "responsive_cases_passed": 48,
    "responsive_cases_failed": 24,
    "responsive_findings": 44,
    "clean_annotated_parity": true,
    "targeted_d65047b_regressions": "pass",
    "blockers": [
      "Our Story has viewport overflow on both surfaces at every tested width",
      "Stockists' off-screen skip link is reported at every tested width and requires an explicit focus-only classification or a bounded repair",
      "real-browser visual, keyboard and 200 percent zoom review remains outstanding"
    ]
  },
  "action": "Update only the current packet identity in the build/check tooling, add the dependency-free rect probe, rebuild the derived package from the six pinned WIP sources, and run deterministic, static, interaction and rendered responsive verification.",
  "verify": [
    "all six WIP hashes match before writing and remain unchanged afterward",
    "only Carob Story, Shop and Stockists generated page bytes plus manifests change",
    "Homepage, Our Story and FAQ generated pages remain byte-identical",
    "two independent builds are byte-identical",
    "builder self-test, Saturday checker, cart checker, motion checker, rect-probe self-test, Python compilation and git diff --check pass",
    "the injected-overflow positive control is detected before any clean responsive result is trusted",
    "all 72 route-width checks pass with zero unexplained per-element overflow",
    "the targeted Shop navigation and 320px header regressions pass",
    "the candidate remains share_ready false and stops for Nate visual, keyboard and 200 percent review"
  ],
  "done": "One deterministic derived candidate includes the d65047b responsive fixes and has trustworthy rect-based responsive evidence, while canonical WIP and all external state remain untouched.",
  "stop": [
    "a source, base hash or held lock does not match",
    "a WIP edit is required",
    "a generated change extends beyond the three responsive source deltas and manifests",
    "the positive control is missed",
    "any deterministic, static, cart, motion or responsive check fails",
    "any commit, push, deploy, send, Shopify, WooCommerce, Vercel or production action is requested"
  ],
  "next_reviewer": "Nate"
}
<!-- CONTROL-PLANE:END -->

## Coordinator admission

Nate approved this bounded responsive repin, rebuild and QA only. This packet supersedes the VIS-03C-03 derived candidate without modifying its historical packet or receipt. The three d65047b WIP changes are read-only inputs already committed before this packet; VIS-03C-04 may only repin and consume them.

## Execution result

The current-WIP repin and deterministic derived rebuild passed, including the Shop mobile category reachability and the 320-pixel Carob Story, Shop and Stockists cart-control regressions introduced at `d65047b`. The strict rendered matrix then stopped this candidate: 48 of 72 route-width cases had no finding, while the clean and annotated Our Story pages overflowed at all six widths and the Stockists focus-only skip link was reported at all six widths. The two surfaces matched exactly: 22 findings per surface, 44 total.

The injected-overflow positive control was detected at both 320 and 1440 pixels. No console warning or error was observed. No canonical WIP file or external state changed. This candidate is not share-ready and remains blocked pending a separately approved bounded responsive-fix packet plus Nate's visual, keyboard and 200 percent review.
