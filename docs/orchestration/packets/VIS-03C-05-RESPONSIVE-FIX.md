# Packet VIS-03C-05 - Responsive Fix

**Packet ID:** `VIS-03C-05-RESPONSIVE-FIX`  
**Candidate ID:** `VIS-03C-05-RESPONSIVE-FIX-CANDIDATE-20260731-001`  
**Parent candidate:** `VIS-03C-04-RESPONSIVE-REBUILD-CANDIDATE-20260731-001`  
**Cluster:** `VIS-03C-05-RESPONSIVE-FIX`  
**State:** `needs_review`  
**Approval class:** `mutating-local-derived-review`  
**Owner:** Codex  
**Final decision owner:** Nate

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "VIS-03C-05-RESPONSIVE-FIX",
  "candidate_id": "VIS-03C-05-RESPONSIVE-FIX-CANDIDATE-20260731-001",
  "parent_candidate_id": "VIS-03C-04-RESPONSIVE-REBUILD-CANDIDATE-20260731-001",
  "phase": "VIS-03",
  "state": "needs_review",
  "approval_class": "mutating-local-derived-review",
  "cluster_id": "VIS-03C-05-RESPONSIVE-FIX",
  "objective": "Repair only the measured Our Story responsive overflow and the derived Stockists skip-link regression, then rebuild and repeat the complete VIS-03C-04 verification matrix.",
  "user_decisions": [
    "Approve VIS-03C-05: repair Our Story responsive overflow and resolve the Stockists skip-link issue only.",
    "No other page, design, copy, imagery, commerce, commit, push, deploy, send or production action."
  ],
  "non_goals": [
    "editing any page except _wip/our-story.WIP.html",
    "changing Our Story copy, imagery, section order or visual direction",
    "changing Stockists WIP, content, directory data or interactions beyond preserving its existing safe skip-link CSS in derived output",
    "changing Homepage, Carob Story, Shop or FAQ",
    "changing catalogue, pricing, claims, commerce or external systems",
    "committing, pushing, deploying, sharing, sending or changing production"
  ],
  "readable_paths": [
    "docs/orchestration/packets/VIS-03C-04-RESPONSIVE-REBUILD.md",
    "docs/orchestration/reviews/VIS-03C-04-RESPONSIVE-REBUILD-20260731.md",
    "_wip/homepage_real_1_lead_photo.WIP.html",
    "_wip/carob-story.WIP.html",
    "_wip/shop.WIP.html",
    "_wip/our-story.WIP.html",
    "_wip/stockists.WIP.html",
    "_wip/faq.WIP.html",
    "scripts/check-maplemoon-responsive-overflow.mjs",
    "package.json",
    "docs/client-review/2026-08-01-saturday-review/staging-v1"
  ],
  "writable_paths": [
    "docs/orchestration/packets/VIS-03C-05-RESPONSIVE-FIX.md",
    "_wip/our-story.WIP.html",
    "scripts/build-maplemoon-saturday-review.py",
    "scripts/check-maplemoon-review.py",
    "docs/client-review/2026-08-01-saturday-review/staging-v1",
    "docs/orchestration/reviews/VIS-03C-05-RESPONSIVE-FIX-20260731.md"
  ],
  "base": {
    "branch": "codex-maplemoon-section-review",
    "head": "d65047b6a7431af955ad0cd5b57c42f7a9367225",
    "pre_our_story_sha256": "17b77bc83930a6ad4ef5834427bdeed5ff6672a8001328259aa84e7a98e06304",
    "pre_stockists_sha256": "6e92382ccec4874aac79c32e644d0ed130d03400c7d23682623b0e4154a6fa36",
    "pre_builder_sha256": "5f6f169410fb61c2d36154bac08d76c42153df49417e039893b808717227ee13",
    "pre_checker_sha256": "46dd4294591f1a161df4cc28b4ca70d2dc8a3ad552db5dda7ef9bf1c8978a570",
    "pre_aggregate_manifest_sha256": "144363ddd432e0dd6219dc2bfcf3300e8107eae6ed67faa51cfe6fb40c8adcc1",
    "canonical_wip_sha256": {
      "_wip/homepage_real_1_lead_photo.WIP.html": "921ef01aa922668da2f0aacdfdf7438fd0e5664fb78ba98bc9c011e55e03b098",
      "_wip/carob-story.WIP.html": "e1695095f6b8e18eccea468dfd8a09013e85b5c64c5de427b3d8e5701e6f4320",
      "_wip/shop.WIP.html": "d976b0b8df1edc845eae10fa03a272f96dae7ff9fad6711f1dfb6eed80ff5a09",
      "_wip/our-story.WIP.html": "a823f0f7291ee3b66acfefd0a718227c47717cf7811747db9216a1e17612fb1d",
      "_wip/stockists.WIP.html": "6e92382ccec4874aac79c32e644d0ed130d03400c7d23682623b0e4154a6fa36",
      "_wip/faq.WIP.html": "4a7f5eee7096150f23f07cac6316c83893aab34135e3c40ca0e24848b77704f1"
    }
  },
  "repairs": {
    "our_story": [
      "collapse the symmetric mobile header grid below 400 pixels so the brand and cart remain inside the viewport",
      "give the founder grid and portrait explicit min-width zero and width containment",
      "neutralize stale portrait inset values that remained active because of the inline relative-position declaration",
      "make the existing intended floating-image suppression win over the generic .os img display rule"
    ],
    "stockists": [
      "remove the builder rewrite that changes the source's transform-based skip link to left:-9999px",
      "assert that derived output keeps left:18px plus translateY(-160%) at rest and translateY(0) on focus",
      "preserve the existing optional-map guard"
    ]
  },
  "responsive_matrix": {
    "routes": ["homepage", "carob-story", "shop", "our-story", "stockists", "faq"],
    "surfaces": ["clean", "annotated"],
    "widths": [320, 375, 390, 430, 1024, 1440],
    "total_route_width_checks": 72,
    "required_result": "zero unexplained horizontal overflow",
    "positive_control": "detect a deliberate element 900 pixels wider than the viewport at 320 and 1440 pixels"
  },
  "action": "Apply only the admitted CSS containment and builder regression corrections, repin all six current WIP inputs, rebuild the derived package, and execute the full deterministic, static, interaction and rendered responsive checks.",
  "verify": [
    "Our Story copy, image src values and section order are unchanged",
    "Stockists WIP hash remains unchanged",
    "Homepage, Carob Story, Shop and FAQ WIP hashes remain unchanged",
    "two independent builds and the promoted tree are byte-identical",
    "Saturday checker, cart checker, motion checker, responsive probe self-test and git diff --check pass",
    "all 72 route-width cases pass with zero unexplained horizontal overflow",
    "Stockists skip link is horizontally in-bounds at rest and visible in-bounds on keyboard focus",
    "candidate remains share_ready false pending Nate's human visual, keyboard and 200 percent review"
  ],
  "done": "One deterministic local derived candidate resolves the two VIS-03C-04 blockers without changing any other page, design, copy, imagery, commerce or external state.",
  "stop": [
    "any non-admitted WIP or generated page would need a source edit",
    "Our Story content or imagery would need to change",
    "Stockists WIP would need to change",
    "the positive control is missed",
    "any deterministic, static, cart, motion or responsive check fails",
    "any commit, push, deploy, send, Shopify, WooCommerce, Vercel or production action is requested"
  ],
  "result": {
    "completed_at": "2026-07-31T10:59:56Z",
    "share_ready": false,
    "source_scope": "Only _wip/our-story.WIP.html changed. Stockists WIP and the other four WIP pages retained their admitted hashes.",
    "our_story_post_sha256": "a823f0f7291ee3b66acfefd0a718227c47717cf7811747db9216a1e17612fb1d",
    "builder_post_sha256": "eda9181683c1dc700566b2822dded3dbabc0959e76ca38e69bdd26f27847b457",
    "checker_post_sha256": "3897fc57b9a15564932b36f94e95753b9549ee222396f8260aa492c02219c3d5",
    "aggregate_manifest_sha256": "b521c9f7e451193314e50a8987ee00df92533efe7db8e633acd985705bf3e2e3",
    "clean_manifest_sha256": "d6382996f4fc922506df7d24d1928c1dfb258a63ee27ccae5cf44022c0b52526",
    "annotated_manifest_sha256": "94747c89204e4fdafa032396452afd774d282f2d1b9288eacf024122f81a9d17",
    "responsive_matrix": "72 of 72 route-width cases passed after the measured portrait inset correction",
    "positive_control": "passed at 320 and 1440 pixels",
    "stockists_keyboard_focus": "passed on clean and annotated at 320 and 1440 pixels",
    "browser_logs": "zero warnings or errors",
    "remaining_gate": "Nate real-browser visual and 200 percent zoom review"
  },
  "next_reviewer": "Nate"
}
<!-- CONTROL-PLANE:END -->

## Coordinator admission

Nate explicitly approved only the two VIS-03C-04 responsive blockers. Preflight showed that Stockists WIP is already safe and unchanged; only the derived builder had reintroduced the off-screen horizontal position. The packet therefore edits one WIP page and one derived transformation, then stops at local verification.

## Result

The local derived candidate passes its deterministic checks and the complete 72-case rendered overflow matrix. It remains `share_ready: false` and stops for Nate's human visual and 200 percent zoom review. No commit, push, deploy, send or production action occurred.
