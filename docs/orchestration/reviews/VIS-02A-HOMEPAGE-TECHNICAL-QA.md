# VIS-02A Homepage Technical Hardening — QA Receipt

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-receipt/v2",
  "receipt_id": "VIS-02A-HOMEPAGE-TECHNICAL-RECEIPT-20260731-001",
  "packet_id": "VIS-02A-HOMEPAGE-TECHNICAL",
  "worker": "Codex",
  "started_at": "2026-07-30T14:30:47Z",
  "completed_at": "2026-07-30T14:49:39Z",
  "files_read": [
    "_wip/AGENTS.md",
    "_wip/homepage_real_1_lead_photo.WIP.html",
    "_wip/carob-story.WIP.html",
    "_wip/shop.WIP.html",
    "_wip/our-story.WIP.html",
    "_wip/stockists.WIP.html",
    "_wip/faq.WIP.html",
    "docs/orchestration/packets/VIS-02A-HOMEPAGE-TECHNICAL-HARDENING.md",
    "docs/orchestration/reviews/VIS-01C-SATURDAY-REVIEW-SHELL-QA.md",
    "docs/orchestration/SATURDAY_REVIEW_ACCEPTANCE_20260801.md",
    "docs/orchestration/VIS_SECTION_LOCK_MAP_20260730.md",
    "docs/orchestration/LOCK_MANIFEST.json",
    "scripts/build-maplemoon-saturday-review.py",
    "scripts/check-maplemoon-review.py"
  ],
  "files_changed": [
    "_wip/homepage_real_1_lead_photo.WIP.html",
    "scripts/build-maplemoon-saturday-review.py",
    "scripts/check-maplemoon-homepage-motion.mjs",
    "scripts/check-maplemoon-review.py",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/**",
    "docs/orchestration/packets/VIS-02A-HOMEPAGE-TECHNICAL-HARDENING.md",
    "docs/orchestration/LIVE_PACKET_REGISTER_20260730.md",
    "docs/orchestration/LOCK_MANIFEST.json",
    "docs/orchestration/reviews/VIS-02A-HOMEPAGE-TECHNICAL-QA.md"
  ],
  "pre_sha256": {
    "_wip/homepage_real_1_lead_photo.WIP.html": "e98643f389763f3c50da9001395a783c08eb078719e0499b9d122c35a6c11f12",
    "scripts/build-maplemoon-saturday-review.py": "0c8010a4406a5594edd9abeca0670626e134e48bf701e3b72abfddaaa112a7cb",
    "scripts/check-maplemoon-homepage-motion.mjs": null,
    "scripts/check-maplemoon-review.py": "440db7f67c6b01d6c35e3680d0cb37e188b7d82bf8de28228192d171f4ddfaf4",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/MANIFEST.json": "f9ad814ea721395f405496f776a038247f7a42a3ffde30434e19f549a42bd048",
    "docs/orchestration/packets/VIS-02A-HOMEPAGE-TECHNICAL-HARDENING.md": null,
    "docs/orchestration/LIVE_PACKET_REGISTER_20260730.md": "488054a957a9a142c74766424754e26f87c3381aa201fda0e78288e32593b12b",
    "docs/orchestration/LOCK_MANIFEST.json": "738f60e1b90f95b4f7685a40873a3a8121db257c3fb9de03b0711c22d8648dc9"
  },
  "post_sha256": {
    "_wip/homepage_real_1_lead_photo.WIP.html": "891311f1ab1ea7f675183ed28db7be4bce87e6e690041cbd4d0b95f2651e2eaa",
    "scripts/build-maplemoon-saturday-review.py": "61b3e3cec0caf5dc79d3c0e318c984a1fadcdbbecb0a7b1ad4b00060e3cd9ab2",
    "scripts/check-maplemoon-homepage-motion.mjs": "6cd32656b4fe64891ef6d9c486e23d9041e4bd202a99a39f53c24fd48947becd",
    "scripts/check-maplemoon-review.py": "f57bf34770124381cfc8e6a81a544c7b0fa4c79a594e27ea57f6909637d2b262",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/MANIFEST.json": "4c0b02b8b861d40502188f6c4e77dbab966a07509d48d0f31087ca305034e9cb",
    "docs/orchestration/packets/VIS-02A-HOMEPAGE-TECHNICAL-HARDENING.md": "f3fd2d4699da2b9b34501db505a9b4ab3223dafca90a1dad5f2f439de221c7ee",
    "docs/orchestration/LIVE_PACKET_REGISTER_20260730.md": "8e42cb0b9dbf61a575d1ba0b99ba0dc3ed8bfaf5e91e4cf5018438996c383bdd"
  },
  "checks": [
    {
      "check": "independent GSD plan check",
      "result": "initial BLOCK for missing runtime reduced-motion proof; packet corrected and recheck PASS"
    },
    {
      "command": "node scripts/check-maplemoon-homepage-motion.mjs",
      "exit_code": 0,
      "result": "autoplay absent; initial reduced-motion paused; live no-preference to reduce transition paused"
    },
    {
      "command": "python3 -B scripts/build-maplemoon-saturday-review.py --self-test",
      "exit_code": 0,
      "result": "changed pin fails before output"
    },
    {
      "command": "python3 -B scripts/build-maplemoon-saturday-review.py",
      "exit_code": 0,
      "result": "current WIP Homepage plus five retained page sources generated under the admitted root"
    },
    {
      "command": "python3 -B scripts/check-maplemoon-review.py --profile saturday-all",
      "exit_code": 0,
      "result": "0 failures and 0 warnings"
    },
    {
      "command": "npm run review:saturday:check",
      "exit_code": 0,
      "result": "0 failures and 0 warnings"
    },
    {
      "command": "two temporary final builds plus diff -qr",
      "exit_code": 0,
      "result": "byte-identical trees; aggregate manifest sha256 4c0b02b8b861d40502188f6c4e77dbab966a07509d48d0f31087ca305034e9cb"
    },
    {
      "command": "git diff --check",
      "exit_code": 0,
      "result": "no whitespace errors"
    },
    {
      "check": "in-app Browser clean Homepage at 390x844",
      "result": "List 44px; Map 44px; no overflow; 0 broken images; autoplay absent; current runtime no-preference and video playing"
    },
    {
      "check": "in-app Browser annotated Homepage at 390x844",
      "result": "review=1 active; no overflow; 0 broken images; noindex,nofollow; no consent-held identity"
    },
    {
      "check": "in-app Browser clean Homepage at 1440x900",
      "result": "no overflow; 0 broken images; autoplay absent; noindex,nofollow; no consent-held identity; visual smoke clean"
    },
    {
      "check": "independent GSD integration check",
      "result": "PASS for Homepage source override, five retained page sources, parity, review route, scope and deterministic output"
    },
    {
      "check": "independent GSD UI/accessibility check",
      "result": "PASS for the two scoped goals; broader navigation, content and 200 percent or full-keyboard review remains outside VIS-02A"
    },
    {
      "check": "independent GSD security check",
      "result": "PASS after receipt creation and VIS-02A manifest provenance correction; leases declared safe to release"
    },
    {
      "check": "independent GSD final goal verification",
      "result": "PASS; both scoped goals achieved, five other WIP hashes unchanged, held decisions untouched, needs_review and share_ready false confirmed"
    }
  ],
  "screenshots_or_urls": [
    "http://localhost:3010/docs/client-review/2026-08-01-saturday-review/staging-v1/clean/homepage.html",
    "http://localhost:3010/docs/client-review/2026-08-01-saturday-review/staging-v1/annotated/homepage.html?review=1"
  ],
  "failures": [],
  "unknowns": [
    "The in-app Browser runtime reports no-preference and cannot emulate an operating-system media preference; the exact inline controller is therefore verified through the deterministic runtime harness for initial and live reduced-motion scenarios.",
    "Literal 200 percent zoom and complete keyboard traversal remain open VIS-level evidence and are not claimed closed by this two-fix packet."
  ],
  "residual_risk": [
    "Mobile navigation remains hidden without a replacement treatment.",
    "Cart and currency treatment, the shared footer matrix, Homepage section visibility and other subjective design decisions remain held for Nate.",
    "Claims, catalogue, stockists, testimonials, placeholders and the Carob chooser remain blocked or pending under their existing gates.",
    "Existing mailto links and an inert newsletter form remain in the derived review surface; VIS-02A did not introduce or activate them, and no external action was performed.",
    "The frozen CTRL-V2 validator still assumes exactly eight V2 lock rows and blocks against the later ratified operational manifest; it was not weakened inside this visual packet."
  ],
  "forbidden_path_changes": [],
  "proposed_next_state": "needs_review",
  "next_reviewer": "Codex"
}
<!-- CONTROL-PLANE:END -->

## Boundary

VIS-02A closes only the two measured Homepage technical findings. It does not make the six-page package share-ready and does not accept any visual, copy, catalogue, commerce or client-delivery decision.

No client message, send, upload, deploy, commit, push, Shopify, WooCommerce, Vercel or production action occurred.
