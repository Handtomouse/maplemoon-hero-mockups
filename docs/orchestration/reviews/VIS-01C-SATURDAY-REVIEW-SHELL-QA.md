# VIS-01C Saturday Review Shell — QA Receipt

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-receipt/v2",
  "receipt_id": "VIS-01C-SATURDAY-SHELL-RECEIPT-20260730-001",
  "packet_id": "VIS-01C-SATURDAY-SHELL",
  "worker": "Codex",
  "started_at": "2026-07-30T12:50:02Z",
  "completed_at": "2026-07-30T13:59:11Z",
  "files_read": [
    "docs/orchestration/packets/VIS-01C-SATURDAY-REVIEW-SHELL.md",
    "docs/orchestration/approvals/NATE-VIS-01C-TYPEKIT-20260730.json",
    "docs/orchestration/reviews/VIS-01C-PREFLIGHT-RECONCILIATION.md",
    "docs/orchestration/VIS_SECTION_LOCK_MAP_20260730.md",
    "_wip/homepage_real_1_lead_photo.WIP.html",
    "_wip/carob-story.WIP.html",
    "_wip/shop.WIP.html",
    "_wip/our-story.WIP.html",
    "_wip/stockists.WIP.html",
    "_wip/faq.WIP.html",
    "docs/client-review/2026-07-29-carli-review/staging-v1/**"
  ],
  "files_changed": [
    "docs/orchestration/packets/VIS-01C-SATURDAY-REVIEW-SHELL.md",
    "docs/orchestration/LIVE_PACKET_REGISTER_20260730.md",
    "scripts/build-maplemoon-saturday-review.py",
    "scripts/check-maplemoon-review.py",
    "package.json",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/**",
    "docs/orchestration/reviews/VIS-01C-SATURDAY-REVIEW-SHELL-QA.md"
  ],
  "pre_sha256": {
    "docs/orchestration/packets/VIS-01C-SATURDAY-REVIEW-SHELL.md": null,
    "docs/orchestration/LIVE_PACKET_REGISTER_20260730.md": "0ea3d01c00094989cfbfb9cdceb1e1f6b201ef98164db148ae0c2b1310f7a65c",
    "scripts/build-maplemoon-saturday-review.py": null,
    "scripts/check-maplemoon-review.py": "27a225b7132efefe0700b69f03f1683c0a690b5421e9fb457a058574c1c69a1e",
    "package.json": "2cfe0adb8e6584069bb2c4a0c3c20250f84d75433e8951c50ed9493e63b57e1d",
    "docs/client-review/2026-08-01-saturday-review/staging-v1": null,
    "docs/orchestration/reviews/VIS-01C-SATURDAY-REVIEW-SHELL-QA.md": null
  },
  "post_sha256": {
    "docs/orchestration/packets/VIS-01C-SATURDAY-REVIEW-SHELL.md": "13b13b53d21fb65ad81e5b397c5aa23bbb538612ff6141e37867e028d1f751f0",
    "docs/orchestration/LIVE_PACKET_REGISTER_20260730.md": "488054a957a9a142c74766424754e26f87c3381aa201fda0e78288e32593b12b",
    "scripts/build-maplemoon-saturday-review.py": "0c8010a4406a5594edd9abeca0670626e134e48bf701e3b72abfddaaa112a7cb",
    "scripts/check-maplemoon-review.py": "440db7f67c6b01d6c35e3680d0cb37e188b7d82bf8de28228192d171f4ddfaf4",
    "package.json": "985e2ac60335552c00b8e3a61eb398b244d12280d037e2a76587107789bd9257",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/MANIFEST.json": "f9ad814ea721395f405496f776a038247f7a42a3ffde30434e19f549a42bd048"
  },
  "checks": [
    {
      "command": "python3 -B scripts/build-maplemoon-saturday-review.py",
      "exit_code": 0,
      "result": "all pinned sources verified before deterministic output"
    },
    {
      "command": "python3 -B scripts/build-maplemoon-saturday-review.py --self-test",
      "exit_code": 0,
      "result": "changed pin failed before output"
    },
    {
      "command": "two temporary builds plus diff -qr",
      "exit_code": 0,
      "result": "byte-identical trees"
    },
    {
      "command": "python3 -B scripts/check-maplemoon-review.py",
      "exit_code": 0,
      "result": "historical July 29 profile preserved; 0 failures and 0 warnings"
    },
    {
      "command": "python3 -B scripts/check-maplemoon-review.py --profile saturday-all",
      "exit_code": 0,
      "result": "aggregate and child manifests, exact aliases, metadata stripping, forbidden content, local references and clean/annotated parity passed"
    },
    {
      "command": "npm run review:saturday:check",
      "exit_code": 0,
      "result": "0 failures and 0 warnings"
    },
    {
      "command": "python3 -B scripts/check-maplemoon-review.py --profile saturday-network --network-log /private/tmp/maplemoon-vis01c-network-log-final.json",
      "exit_code": 0,
      "result": "5 observed external requests, all exact approved Typekit resources; log sha256 26323cf68a3750b7151acdeae9359bcbe1ff0a9619a9376f81f2b5ef3a64dc22"
    },
    {
      "command": "git diff --check",
      "exit_code": 0,
      "result": "no whitespace errors"
    },
    {
      "command": "independent GSD integration recheck",
      "exit_code": 0,
      "result": "PASS: asset closure, dynamic review route persistence and exact output confinement"
    },
    {
      "command": "independent GSD security recheck",
      "exit_code": 0,
      "result": "PASS: no sensitive raster metadata, WIP/source/SEO internals, secret signatures or derivation mismatches"
    }
  ],
  "screenshots_or_urls": [
    "http://localhost:3010/docs/client-review/2026-08-01-saturday-review/staging-v1/clean/homepage.html",
    "http://localhost:3010/docs/client-review/2026-08-01-saturday-review/staging-v1/annotated/index.html",
    "http://localhost:3010/docs/client-review/2026-08-01-saturday-review/staging-v1/annotated/homepage.html?review=1"
  ],
  "failures": [],
  "unknowns": [
    "A literal browser 200 percent zoom run was not available; a 720px width proxy was clean but is not equivalent evidence.",
    "Automated sequential keyboard tab traversal was not fully reliable in the in-app Browser; focus-visible styling was observed, but full keyboard sign-off remains open.",
    "The review package is mechanically derived evidence only and has not been accepted by Nate or shared with any reviewer."
  ],
  "residual_risk": [
    "Our Story and Stockists lack a main landmark.",
    "At 390px, Homepage, Carob Story, Shop, Stockists and FAQ retain one or more controls below 44px; FAQ includes a 26px search input and 17px text link.",
    "Homepage retains an autoplay video and reduced-motion CSS does not independently prove that autoplay pauses.",
    "Mobile header navigation is hidden on some pages without a replacement menu.",
    "Client-approved claims, catalogue facts, placeholder assets, page polish and the pending Carob human choice remain separate blockers; share_ready stays false."
  ],
  "forbidden_path_changes": [],
  "proposed_next_state": "needs_review",
  "next_reviewer": "Codex"
}
<!-- CONTROL-PLANE:END -->

## Rendered verification

- Six widths were exercised in the in-app Browser: `1440`, `1024`, `430`, `390`, `375` and `320`.
- The matrix covered six clean pages, six annotated pages and the annotated index at every width: 78 route checks, zero overflow, broken-image, H1, annotation, review-route or forbidden-surface failures.
- A post-rebuild smoke pass covered all clean and annotated pages at `1440` and `390`: 24 checks, zero failures.
- Query-selectable Homepage images and the product-range interaction were exercised. `View Range` and `Shop Now` both retained `review=1`.
- The annotated index order is Homepage → Carob Story → Shop → Our Story → Stockists → FAQ. Its smallest link target measured 64px.

## Boundary

This receipt verifies the mechanical local shell. It does not accept the visual design, claims, catalogue, content, accessibility, mobile navigation or client-delivery surface. No canonical WIP, July 29 staging source, Shopify, WooCommerce, Vercel, production, client communication, commit, push or deploy action was changed or taken.

The receipt cannot include its own raw post-hash without self-reference. Its raw hash is recorded by the coordinator in the lock manifest after this file is closed.
