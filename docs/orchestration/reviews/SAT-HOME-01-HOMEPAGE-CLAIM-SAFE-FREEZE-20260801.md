# SAT-HOME-01 Homepage Claim-Safe Freeze Review

**Packet:** `SAT-HOME-01-HOMEPAGE-CLAIM-SAFE-FREEZE`  
**Candidate:** `SAT-HOME-01-CANDIDATE-20260801-001`  
**Review state:** `needs_review`  
**Promotion state:** locally promoted after independent `PASS`  
**Share ready:** `false`

## Outcome

The bounded Homepage candidate is deterministic, passed independent review and has been locally promoted. It applies the exact three approved benefit badges, removes the unsupported comparison from clean review, retains that comparison only as visibly blocked annotated evidence, removes the remaining `Mellow roast` process phrase from clean review, and preserves the evidence-backed six-bar sampler without changing its products or commerce meaning.

Nate's literal keyboard-path and 200% browser review remains the final human gate. The package is not approved for sharing or any external action.

## Recovery

- Checkpoint: `_wip/checkpoints/SAT-HOME-01R_20260801_020229_AEST`
- Recorded: `2026-08-01 02:02:44 AEST`
- Generated staging backup: 154 files, exact `diff -qr` match before mutation
- Pre-mutation staging tree SHA-256: `06e28b4890cfc8a439340fa7471c5e33b455bdcab8836d1fd56e8fc555c1b0bf`
- Source and control-file copies are stored beside the staging backup with individual pre-mutation hashes in the packet.

## Sampler evidence gate

**PASS - retain unchanged.** Existing local project records identify the six-bar sampler as a verified review state, and the Homepage uses six real bar packshots with links only to flavours and single bars. No pack price, SKU, availability, packaging, selling option or live commerce behaviour was added or changed.

`Roasted Hazelnut` is retained as the official product/flavour name. Carli's claim correction applies to the accompanying `smooth carob` phrase, not the product identity or hazelnut ingredient.

## Files changed in the packet scope

Source and control-plane files:

- `_wip/homepage_real_1_lead_photo.WIP.html`
- `scripts/build-maplemoon-saturday-review.py`
- `scripts/check-maplemoon-review.py`
- `docs/orchestration/packets/SAT-HOME-01-HOMEPAGE-CLAIM-SAFE-FREEZE.md`
- this review receipt

Local promotion was limited to:

- `docs/client-review/2026-08-01-saturday-review/staging-v1/MANIFEST.json`
- `docs/client-review/2026-08-01-saturday-review/staging-v1/clean/MANIFEST.json`
- `docs/client-review/2026-08-01-saturday-review/staging-v1/clean/homepage.html`
- `docs/client-review/2026-08-01-saturday-review/staging-v1/annotated/MANIFEST.json`
- `docs/client-review/2026-08-01-saturday-review/staging-v1/annotated/homepage.html`

The other five canonical WIP files and their clean/annotated generated page HTML remain byte-identical.

## Current hashes

- Homepage WIP SHA-256: `787ccb5cb3b1a94023ed4c7405c6248e64dad7bc4d412f50061996347a481a6d`
- Builder SHA-256: `faed4e94ebd3366950dcc8fd7184369c4c8bbe2648a2cc5bfe60ef900ac623d9`
- Checker SHA-256: `27aeae02b4f09afe0c78a4d8c68b05c2eaf8fd8e84a17b042ea7dd34dc015c19`
- Candidate A/B tree SHA-256: `b0c48952111d1669b3738a2c6f9749d6260a5c3dd619fb17a5db91492892774e`
- Promoted aggregate manifest SHA-256: `25fe57e0ca43e563cc3b1e4c9060ee1b1751083f779b44cb5c77ed91dd6812b2`
- Promoted clean manifest SHA-256: `cb4bf5d44567c716cf8f2414e66ffc3482d49ca50fbe98444ab6a10983bad8b1`
- Promoted clean Homepage SHA-256: `34b7aed30db3776dba1c6d282eaed6cfa9922388fd988c9aacb9383bc40b5b1c`
- Promoted annotated manifest SHA-256: `c23b060afef19cc99c522a63d6f32acd8942189cab7c8b880d582f244873452c`
- Promoted annotated Homepage SHA-256: `5e6002baa248dc057980a208db5eed832f20e0d96c94d35f35e0b538e977d629`

## Deterministic verification

- Two clean temporary builds are byte-identical.
- Saturday aggregate/clean/annotated checker: `0 failures, 0 warnings` for each build.
- Builder self-test: PASS.
- Homepage motion checker: PASS, including reduced-motion initial state and live preference change.
- Responsive overflow positive-control self-test: PASS.
- `git diff --check`: PASS.
- Clean Homepage claim scan: zero hits for `mellow roast`, roast-process, mill, `smooth carob`, handmade and small-batch terms.
- Clean and annotated pages contain exactly one badge strip with exactly `No Caffeine`, `Organic Ingredients`, `Vegan Friendly`.
- Clean contains no comparison or evidence-hold notice; annotated contains one comparison and one explicit evidence-hold notice.
- Both variants retain one sampler with all six admitted packshot assets.

## Rendered verification

Settled rendered checks used the in-app Browser against the temporary candidate, not the current promoted staging package.

| Surface | Viewport | Document overflow | Element overflow failures | Broken images | Comparison treatment | Browser warnings/errors |
|---|---:|---:|---:|---:|---|---:|
| Clean Homepage | 390 | 0 | 0 | 0 | absent | 0 |
| Clean Homepage | 1440 | 0 | 0 | 0 | absent | 0 |
| Annotated Homepage | 390 | 0 | 0 | 0 | present with evidence hold | 0 |
| Annotated Homepage | 1440 | 0 | 0 | 0 | present with evidence hold | 0 |

Rendered screenshots:

- `_wip/checkpoints/SAT-HOME-01R_20260801_020229_AEST/rendered/clean-homepage-390-top.jpg` - `ab3fdba027ee45c5bac25105d8f32548b817566cdd082759bb1fe6fecaa51dfc`
- `_wip/checkpoints/SAT-HOME-01R_20260801_020229_AEST/rendered/clean-homepage-1440-top.jpg` - `66d66b6d92c897f5930e2ef079a4ab9ed9d1c533c538801297ea93275055e531`
- `_wip/checkpoints/SAT-HOME-01R_20260801_020229_AEST/rendered/clean-homepage-390-sampler-v5.jpg` - `a6ffb5e93bf412276395e5ff024282ac1d0f2746ee021832917b86c2780c0bb5`
- `_wip/checkpoints/SAT-HOME-01R_20260801_020229_AEST/rendered/annotated-homepage-390-comparison-hold-v4.jpg` - `ece4c48335c633b4a3e39354af926ac16f27c21fd8248aebd585585a27550441`

## Residual gate

The in-app Browser produced reliable visual, log, image and overflow evidence, but did not provide a reliable literal Tab traversal signal. Nate's final human keyboard-path, focus and literal 200% zoom review remains required. This does not authorize a client send or any external action.

## Independent review

`PASS` - the durable screenshot hashes matched, only the five admitted generated files differed, the checker reported zero failures/warnings, prohibited clean claims were absent and the candidate was safe to promote locally.

## Post-promotion checks

- Saturday aggregate/clean/annotated checker: PASS, `0 failures, 0 warnings`.
- Ordinary add-to-cart, pending-product treatment, fake checkout, local form, accessibility and no-network checker: PASS.
- Homepage reduced-motion checker: PASS.
- Responsive overflow and scroll-reachability positive-control self-test: PASS.
- Promoted staging tree exactly matches the independently reviewed candidate.
- `git diff --check`: PASS.
- No commit, push, deploy, send, upload, Shopify, WooCommerce or production action occurred.

## Exactly one next action

Nate performs the clean Homepage keyboard-path, focus and literal 200% zoom review.
