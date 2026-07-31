# Packet VIS-03C-02 - FAQ Evidence-Safe Closure

**Packet ID:** `VIS-03C-02-FAQ-EVIDENCE-SAFE-CLOSURE`
**Candidate authority:** `CTRL-V2-CANDIDATE-20260730-001`
**Cluster:** `VIS-03C-02-FAQ-DERIVED-REVIEW`
**State:** `accepted`
**Approval class:** `mutating-local-derived-review`
**Owner:** `gsd-executor`
**Final decision owner:** Nate

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "VIS-03C-02-FAQ-EVIDENCE-SAFE-CLOSURE",
  "candidate_id": "CTRL-V2-CANDIDATE-20260730-001",
  "phase": "VIS-03",
  "state": "accepted",
  "approval_class": "mutating-local-derived-review",
  "cluster_id": "VIS-03C-02-FAQ-DERIVED-REVIEW",
  "objective": "Close six evidence-safe Canva directions without inventing public copy: verify five existing Homepage and FAQ states, remove only the exact current third FAQ question in clean and annotated review, and bind the generated package to this packet.",
  "cv_scope": [
    "CV-028",
    "CV-031",
    "CV-035",
    "CV-036",
    "CV-055",
    "CV-057"
  ],
  "non_goals": [
    "adding or replacing the held caffeine FAQ answer",
    "Shop or Carob Story changes",
    "canonical WIP changes",
    "factual, ingredient, health, process, storage, origin, supplier, policy or catalogue claims",
    "testimonial publication or identity restoration",
    "client contact, Canva mutation, commit, push, deploy, Shopify, WooCommerce, Vercel or production action"
  ],
  "readable_paths": [
    "docs/orchestration/reviews/CARLI-CANVA-NOTE-REGISTER-20260731.md",
    "docs/orchestration/reviews/CARLI-CANVA-OCCURRENCE-RECONCILIATION-20260731.md",
    "docs/orchestration/reviews/VIS-03C-01-EVIDENCE-SAFE-CANVA-DELTA-20260731.md",
    "docs/plans/2026-07-31-maplemoon-saturday-delivery-gsd-plan.md",
    "_wip/homepage_real_1_lead_photo.WIP.html",
    "_wip/shop.WIP.html",
    "_wip/our-story.WIP.html",
    "_wip/carob-story.WIP.html",
    "_wip/stockists.WIP.html",
    "_wip/faq.WIP.html",
    "docs/client-review/2026-08-01-saturday-review/staging-v1"
  ],
  "writable_paths": [
    "scripts/build-maplemoon-saturday-review.py",
    "scripts/check-maplemoon-review.py",
    "docs/client-review/2026-08-01-saturday-review/staging-v1",
    "docs/orchestration/reviews/VIS-03C-02-FAQ-EVIDENCE-SAFE-CLOSURE-20260731.md"
  ],
  "base": {
    "branch": "codex-maplemoon-section-review",
    "head": "a6cd91a589ceff18283e4c6250ac256fe97812a4",
    "builder_sha256": "82e510dc1760e9145c076db65b05b5adc893ce4938eb086a996a42a09707e74a",
    "aggregate_manifest_sha256": "58dbde15a6160e87dde09fe14f8c552da2eb09c0c52e1a3771e78e7a5aeb95df",
    "canonical_wip_sha256": {
      "_wip/homepage_real_1_lead_photo.WIP.html": "921ef01aa922668da2f0aacdfdf7438fd0e5664fb78ba98bc9c011e55e03b098",
      "_wip/shop.WIP.html": "b11f0eec60ee0a6c0927c0657171cf12044c1aa7f2a781d84a87eb843a6735d0",
      "_wip/our-story.WIP.html": "17b77bc83930a6ad4ef5834427bdeed5ff6672a8001328259aa84e7a98e06304",
      "_wip/carob-story.WIP.html": "cdc426a6a19d8012f9198584842766ed0ee7400d7f93a4642d9bb3db972216c7",
      "_wip/stockists.WIP.html": "257662784dfb31792c1604ff7821cb16abdc78281a681311f518498ab8a6e8ce",
      "_wip/faq.WIP.html": "4a7f5eee7096150f23f07cac6316c83893aab34135e3c40ca0e24848b77704f1"
    }
  },
  "action": "Update the builder and checker provenance to this packet. Add deterministic guards proving CV-028, CV-031, CV-035, CV-036 and CV-055 are already correct. Remove only the exact FAQ object with id is-carob-caffeine-free from clean and annotated generated outputs for CV-057. Do not add the held CV-056 replacement. Rebuild through the fail-closed promotion path and write the exact receipt.",
  "verify": [
    "all acquisition-time hashes match before writing",
    "CV-028 ritual heading and CV-031 evening blurb remain byte-stable in both review modes",
    "CV-035 and CV-036 testimonials remain absent from clean and consent-held without real names in annotated",
    "CV-055 first FAQ remains unchanged",
    "the exact is-carob-caffeine-free FAQ object is absent from clean and annotated",
    "no replacement caffeine question or answer is added",
    "the clean and annotated manifests and aggregate manifest identify VIS-03C-02-FAQ-EVIDENCE-SAFE-CLOSURE",
    "only the builder, checker, receipt, three manifests and two FAQ outputs change",
    "all canonical WIP, Shop, Carob Story and other generated files remain byte-identical",
    "two full builds are byte-identical",
    "builder self-test, Saturday checker, cart checker, motion checker and git diff --check pass",
    "FAQ passes 320, 375, 390, 430, 1024 and 1440 pixel responsive review with no overflow or unfinished signal"
  ],
  "done": "The six CV items have complete receipt evidence and independent verification, with no unsupported replacement copy or forbidden-path drift.",
  "stop": [
    "a base hash or held lock does not match",
    "the exact third FAQ object cannot be removed without another FAQ change",
    "a Homepage byte change is required",
    "Shop, Carob Story, canonical WIP, catalogue, claims, assets or external state would change",
    "any commit, push, deploy, send, Canva, Shopify, WooCommerce, Vercel or production action is requested"
  ],
  "next_reviewer": "complete"
}
<!-- CONTROL-PLANE:END -->

## Coordinator admission

The assumptions audit recommended this six-ID boundary. The five proof-only items required no generated Homepage change. CV-057 removed only the exact current third FAQ object, and CV-056 remained blocked with no substitute claim introduced. The independent verifier returned PASS after the coordinator reconstructed the interrupted executor receipt and completed responsive QA.
