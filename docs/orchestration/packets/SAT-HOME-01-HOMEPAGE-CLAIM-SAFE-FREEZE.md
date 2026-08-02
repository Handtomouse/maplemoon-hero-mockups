# Packet SAT-HOME-01 - Homepage Claim-Safe Freeze

**Packet ID:** `SAT-HOME-01-HOMEPAGE-CLAIM-SAFE-FREEZE`  
**Candidate ID:** `SAT-HOME-01-CANDIDATE-20260801-001`  
**Phase:** `SAT-HOME`  
**State:** `needs_review`  
**Approval class:** `mutating-local-review`  
**Owner:** Codex  
**Final decision owner:** Nate

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "SAT-HOME-01-HOMEPAGE-CLAIM-SAFE-FREEZE",
  "candidate_id": "SAT-HOME-01-CANDIDATE-20260801-001",
  "parent_candidate_id": "VIS-03C-05-RESPONSIVE-FIX-CANDIDATE-20260731-001",
  "phase": "SAT-HOME",
  "state": "needs_review",
  "approval_class": "mutating-local-review",
  "cluster_id": "SAT-HOME-01-HOMEPAGE",
  "objective": "Freeze the approved Homepage benefit wording, exclude the unsupported cacao comparison from clean review while retaining clearly blocked annotated evidence, preserve the supported six-bar sampler, and rebuild only the resulting Homepage-derived files and manifests.",
  "user_decisions": [
    "Use exactly three Homepage badges: No Caffeine, Organic Ingredients, Vegan Friendly.",
    "Remove the Nothing Added badge.",
    "Keep the cacao comparison absent from clean review until substantiated.",
    "Retain clearly blocked comparison evidence in annotated review only.",
    "Retain the sampler when supported by existing real local evidence; do not invent product or commerce facts.",
    "Execute after the recovery and sampler gates pass."
  ],
  "non_goals": [
    "changing the other five WIP pages or their generated HTML",
    "changing sampler products, packaging, price, availability or selling options",
    "writing replacement roast, mill, smooth-carob or small-batch claims",
    "restoring any comparison claim to clean review",
    "committing, pushing, deploying, sending, publishing or changing Shopify, WooCommerce or production"
  ],
  "readable_paths": [
    "docs/plans/2026-07-31-maplemoon-saturday-delivery-gsd-plan.md",
    "docs/orchestration/SATURDAY_REVIEW_ACCEPTANCE_20260801.md",
    "docs/orchestration/SATURDAY_FEEDBACK_REGISTER_20260801.md",
    "docs/orchestration/reviews/CARLI-CLAIMS-REPLACEMENT-OPTIONS-20260731.md",
    "docs/orchestration/reviews/CARLI-CANVA-NOTE-REGISTER-20260731.md",
    "_wip/_CLAUDE_HANDOFF_20260723_POST_MEETING.md",
    "_wip/_COMMS_PROJECT_STATUS_20260721.md",
    "_wip/_section_reviews/starter-box-sampler.md",
    "_wip/homepage_real_1_lead_photo.WIP.html",
    "scripts/build-maplemoon-saturday-review.py",
    "scripts/check-maplemoon-review.py",
    "docs/client-review/2026-08-01-saturday-review/staging-v1"
  ],
  "writable_paths": [
    "_wip/homepage_real_1_lead_photo.WIP.html",
    "scripts/build-maplemoon-saturday-review.py",
    "scripts/check-maplemoon-review.py",
    "docs/orchestration/packets/SAT-HOME-01-HOMEPAGE-CLAIM-SAFE-FREEZE.md",
    "docs/orchestration/SATURDAY_FEEDBACK_REGISTER_20260801.md",
    "docs/orchestration/reviews/CARLI-CANVA-NOTE-REGISTER-20260731.md",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/MANIFEST.json",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/MANIFEST.json",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/homepage.html",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/annotated/MANIFEST.json",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/annotated/homepage.html",
    "docs/orchestration/reviews/SAT-HOME-01-HOMEPAGE-CLAIM-SAFE-FREEZE-20260801.md"
  ],
  "base": {
    "branch": "codex-maplemoon-section-review",
    "head": "d65047b6a7431af955ad0cd5b57c42f7a9367225",
    "pre_homepage_sha256": "921ef01aa922668da2f0aacdfdf7438fd0e5664fb78ba98bc9c011e55e03b098",
    "pre_builder_sha256": "eda9181683c1dc700566b2822dded3dbabc0959e76ca38e69bdd26f27847b457",
    "pre_checker_sha256": "3897fc57b9a15564932b36f94e95753b9549ee222396f8260aa492c02219c3d5",
    "pre_feedback_register_sha256": "4c8ea1293743910bf21d927333c43d83ce33cdb37e296e92db87eb2b16af1a82",
    "pre_canva_register_sha256": "64a353c7c6e6687df32557a2eaf22ad0a436714f32ebb8bcacd8d50b8d42074b",
    "pre_staging_tree_sha256": "06e28b4890cfc8a439340fa7471c5e33b455bdcab8836d1fd56e8fc555c1b0bf",
    "canonical_wip_sha256": {
      "_wip/homepage_real_1_lead_photo.WIP.html": "787ccb5cb3b1a94023ed4c7405c6248e64dad7bc4d412f50061996347a481a6d",
      "_wip/carob-story.WIP.html": "e1695095f6b8e18eccea468dfd8a09013e85b5c64c5de427b3d8e5701e6f4320",
      "_wip/shop.WIP.html": "d976b0b8df1edc845eae10fa03a272f96dae7ff9fad6711f1dfb6eed80ff5a09",
      "_wip/our-story.WIP.html": "a823f0f7291ee3b66acfefd0a718227c47717cf7811747db9216a1e17612fb1d",
      "_wip/stockists.WIP.html": "6e92382ccec4874aac79c32e644d0ed130d03400c7d23682623b0e4154a6fa36",
      "_wip/faq.WIP.html": "4a7f5eee7096150f23f07cac6316c83893aab34135e3c40ca0e24848b77704f1"
    }
  },
  "recovery": {
    "checkpoint_path": "_wip/checkpoints/SAT-HOME-01R_20260801_020229_AEST",
    "checkpoint_timestamp": "2026-08-01 02:02:44 AEST",
    "staging_file_count": 154,
    "staging_tree_sha256": "06e28b4890cfc8a439340fa7471c5e33b455bdcab8836d1fd56e8fc555c1b0bf",
    "verification": "Exact file hashes matched and diff -qr found no staging differences before project mutation."
  },
  "sampler_evidence": {
    "decision": "retain unchanged",
    "basis": "Local handoff and section-review records identify the six-bar sampler as an existing verified review state; the Homepage contains six real bar packshots and only links to flavours/single bars.",
    "product_name_boundary": "Roasted Hazelnut is retained as the official product/flavour identity. Carli's claims register directs removal of only the smooth-carob phrase from that description; it does not prohibit the product name or roasted hazelnut ingredient.",
    "forbidden_changes": "No price, SKU, availability, packaging, selling option or commerce wiring may be added or changed."
  },
  "action": "Apply only the approved three-badge source change and derived clean/annotated comparison treatment, build to a temporary root, run all admitted deterministic and rendered checks, then promote only the five owned Homepage/manifests files on PASS.",
  "verify": [
    "checkpoint remains available and matches the recorded pre-mutation hashes",
    "clean and annotated Homepage each contain exactly one approved three-badge strip",
    "clean Homepage contains no cacao comparison section or blocked-evidence notice",
    "annotated Homepage contains one comparison section and one explicit evidence-hold notice",
    "both Homepage surfaces retain the sampler and all six admitted bar assets",
    "clean surfaces contain no prohibited roast, mill, smooth-carob, handmade or small-batch claims",
    "the other five WIP and generated page HTML files remain byte-identical",
    "two temporary builds are byte-identical",
    "Saturday, cart, motion, responsive-overflow positive-control, link, asset, parity and git diff checks pass",
    "390 and 1440 rendered Homepage review finds no material regression"
  ],
  "done": "One claim-safe Homepage candidate is locally promoted while the other five pages remain byte-identical and no external action occurs.",
  "stop": [
    "a source or recovery hash mismatches",
    "the sampler would require an invented fact",
    "a non-owned WIP or generated page would change",
    "a checker or rendered review finds a material regression",
    "any commit, push, deploy, send, upload, Shopify, WooCommerce or production action is requested"
  ],
  "next_reviewer": "independent high reviewer"
}
<!-- CONTROL-PLANE:END -->

## Admission evidence

Recovery and sampler evidence passed before mutation. The sampler is retained unchanged. The builder remains fail-closed on all six current WIP hashes and may promote only the two Homepage outputs plus the three manifests.

## Result

Independent review returned `PASS`, and the exact five-file candidate was promoted locally. Post-promotion Saturday, cart, motion, responsive-overflow positive-control and diff checks passed. The package remains `share_ready:false` pending Nate's final literal keyboard-path and 200% zoom review. No commit, push, deploy, send, Shopify, WooCommerce or production action occurred.
