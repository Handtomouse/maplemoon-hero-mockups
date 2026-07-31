# Packet VIS-02A — Homepage Technical Hardening

**Packet ID:** `VIS-02A-HOMEPAGE-TECHNICAL`  
**Candidate authority:** `CTRL-V2-CANDIDATE-20260730-001`  
**Cluster:** `VIS-02A-HOMEPAGE`  
**State:** `accepted`  
**Approval class:** `mutating-local`  
**Owner:** Codex  
**Final decision owner:** Nate

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "VIS-02A-HOMEPAGE-TECHNICAL",
  "candidate_id": "CTRL-V2-CANDIDATE-20260730-001",
  "phase": "VIS-02",
  "state": "accepted",
  "approval_class": "mutating-local",
  "cluster_id": "VIS-02A-HOMEPAGE",
  "objective": "Close the two non-subjective Homepage accessibility findings from VIS-01C, regenerate the local Saturday review package, and return fresh evidence without deciding any held design or content question.",
  "non_goals": [
    "mobile navigation, header, cart, currency or footer design",
    "section inclusion, exclusion, order or layout changes",
    "canonical WIP copy, claim, price, catalogue, stockist, founder, testimonial or asset changes",
    "Carob chooser selection or application",
    "Shopify, WooCommerce, Vercel, deployment, client send, commit, push or production action"
  ],
  "readable_paths": [
    "_wip/AGENTS.md",
    "_wip/homepage_real_1_lead_photo.WIP.html",
    "docs/orchestration/reviews/VIS-01C-SATURDAY-REVIEW-SHELL-QA.md",
    "docs/orchestration/SATURDAY_REVIEW_ACCEPTANCE_20260801.md",
    "docs/orchestration/VIS_SECTION_LOCK_MAP_20260730.md",
    "docs/orchestration/LOCK_MANIFEST.json",
    "scripts/build-maplemoon-saturday-review.py",
    "scripts/check-maplemoon-homepage-motion.mjs",
    "scripts/check-maplemoon-review.py",
    "scripts/check-maplemoon-review.py",
    "package.json"
  ],
  "writable_paths": [
    "_wip/homepage_real_1_lead_photo.WIP.html",
    "scripts/build-maplemoon-saturday-review.py",
    "scripts/check-maplemoon-homepage-motion.mjs",
    "scripts/check-maplemoon-review.py",
    "docs/client-review/2026-08-01-saturday-review/staging-v1",
    "docs/orchestration/reviews/VIS-02A-HOMEPAGE-TECHNICAL-QA.md",
    "docs/orchestration/packets/VIS-02A-HOMEPAGE-TECHNICAL-HARDENING.md",
    "docs/orchestration/LIVE_PACKET_REGISTER_20260730.md",
    "docs/orchestration/LOCK_MANIFEST.json"
  ],
  "base": {
    "branch": "codex-maplemoon-section-review",
    "head": "a6cd91a589ceff18283e4c6250ac256fe97812a4",
    "files": [
      {
        "path": "_wip/homepage_real_1_lead_photo.WIP.html",
        "sha256": "e98643f389763f3c50da9001395a783c08eb078719e0499b9d122c35a6c11f12"
      },
      {
        "path": "scripts/build-maplemoon-saturday-review.py",
        "sha256": "0c8010a4406a5594edd9abeca0670626e134e48bf701e3b72abfddaaa112a7cb"
      },
      {
        "path": "docs/orchestration/LIVE_PACKET_REGISTER_20260730.md",
        "sha256": "539823800c63a30149ce2f646f291bf24834cf199e7634d7c5b6626791f55763"
      },
      {
        "path": "docs/orchestration/LOCK_MANIFEST.json",
        "sha256": "738f60e1b90f95b4f7685a40873a3a8121db257c3fb9de03b0711c22d8648dc9"
      }
    ]
  },
  "implementation_pins": {
    "homepage_source": "_wip/homepage_real_1_lead_photo.WIP.html",
    "homepage_sha256": "921ef01aa922668da2f0aacdfdf7438fd0e5664fb78ba98bc9c011e55e03b098",
    "pin_amendment": "Nate approved rounded public wording of 200+ stockists on 2026-07-31; no other VIS-02A decision was reopened",
    "other_page_source_policy": "retain the five VIS-01C July 29 staging sources and their existing pins"
  },
  "dependencies": [
    "VIS-01C-SATURDAY-SHELL-RECEIPT-20260730-001",
    "independent GSD plan-checker PASS after runtime reduced-motion checks were made explicit",
    "Nate current-task authority to plan and execute the next local phase"
  ],
  "sources": [
    "VIS-01C measured residual findings",
    "WCAG-aligned project acceptance requirement for reduced motion and 44px controls",
    "current Homepage WIP only"
  ],
  "skills": [
    "sharpen",
    "summon",
    "gsd-plan-checker",
    "gsd-executor",
    "gsd-ui-checker",
    "gsd-integration-checker",
    "gsd-security-auditor",
    "gsd-verifier",
    "verification-before-completion"
  ],
  "action": "Remove unconditional Homepage hero-video autoplay, play only when reduced motion is not requested, pause on a live reduced-motion preference, and guarantee a 44px minimum target for the disabled Homepage List and Map review controls. Make the builder use this pinned current WIP file for the Homepage only while retaining the existing five July 29 page sources, preserve the existing derived-package identity neutralisation and noindex boundary for the new source shape, bind the generated manifests and checker to VIS-02A provenance, rebuild the local package, and record evidence.",
  "verify": [
    "all acquisition-time base hashes match before writing",
    "the Homepage video has no autoplay attribute",
    "the exact inline controller passes a runtime harness proving an initial reduce preference stays paused",
    "the exact inline controller passes a runtime harness proving a live no-preference to reduce change pauses playback",
    "the List and Map buttons compute to at least 44px at 390px",
    "no copy, link label, route, section order, image source or held design treatment changes",
    "the generated Homepage is derived from the VIS-02A Homepage pin while the other five generated pages retain the VIS-01C source pins",
    "the generated Homepage contains no consent-held testimonial identity and forces noindex,nofollow without changing the canonical WIP testimonial block",
    "the clean, annotated and aggregate manifests identify VIS-02A and the checker requires that exact packet ID",
    "builder self-test, Saturday checker, package check and git diff --check pass",
    "two generated builds remain byte-identical",
    "clean and annotated Homepage render at 1440px and 390px with no overflow, broken images or lost review state",
    "canonical WIP files for the other five pages retain their preflight SHA-256 values",
    "forbidden actions and paths show zero change"
  ],
  "done": "Fresh clean and annotated Homepage evidence passed the scoped technical checks and Nate accepted the packet on 31 July. Share-ready remains false because held design, content and catalogue gates remain open.",
  "stop": [
    "base hash or lock mismatch",
    "a fix requires a visual, copy, claim, catalogue or commerce decision",
    "a generated change reaches outside the admitted package root",
    "any other canonical WIP page changes",
    "external action, client contact, commit, push, deployment, Shopify, WooCommerce or production request"
  ],
  "next_reviewer": "complete"
}
<!-- CONTROL-PLANE:END -->

## Why this packet goes first

This is the smallest Homepage-first tranche that can be decided from measured evidence. It lowers visible and accessibility risk without choosing the final shared navigation or removing unfinished sections behind Nate's back.

## Nate-only decisions held outside this packet

Post-acceptance amendment: Nate directly approved the rounded public wording `200+ stockists` on 31 July 2026. The implementation pin above was refreshed only to admit those two Homepage text substitutions on top of the already accepted VIS-02A source. Exact directory acceptance, the seven incomplete records and all external actions remain held.

1. Mobile navigation treatment.
2. Cart and currency treatment on the clean pre-Shopify review.
3. Shared footer link matrix.
4. Which unconfirmed Homepage sections stay visible on the clean family-and-friends surface.
5. Later visual choices including the Carob chooser and ritual treatment.

## Safe parallel receipt lanes

Separate tasks may work read-only and return receipts for:

- Carli claims and supplied-copy reconciliation;
- WooCommerce catalogue provenance and field mapping once the two inputs exist;
- page-local visual audits for Carob Story, Shop, Our Story, Stockists and FAQ;
- packaging scan comparison against source artwork.

Those tasks must not edit `_wip`, shared scripts, this packet, the live register or the lock manifest. They must not send, deploy, commit, push or touch Shopify/production.

## Execution order

1. Independent plan check.
2. Acquire exact VIS-02A leases after the plan passes.
3. One writer applies only the two Homepage technical fixes and makes the builder select the pinned current WIP Homepage while preserving the five existing page sources.
4. Rebuild twice and run deterministic/static checks.
5. Run `node scripts/check-maplemoon-homepage-motion.mjs` against the exact inline controller, recording initial reduced-motion and live preference-change results.
6. In the in-app Browser, confirm the real generated page has no autoplay attribute and plays under the current no-preference runtime without overflow or broken images.
7. Confirm the Homepage List and Map controls measure at least 44px at 390px.
8. Run integration, security, UI and goal verification. Full keyboard traversal and literal 200% zoom remain open VIS-level checks and are not claimed closed by this packet.
9. Record the receipt, release the leases and return `needs_review`.

## Acceptance

Nate accepted VIS-02A during the 31 July decision review. This acceptance closes only the scoped Homepage technical fixes and does not accept the broader Saturday package.
