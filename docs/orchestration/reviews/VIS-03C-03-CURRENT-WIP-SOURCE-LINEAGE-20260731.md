# VIS-03C-03 Current WIP Source Lineage Receipt

**Date:** 2026-07-31
**Branch / HEAD:** `codex-maplemoon-section-review` / `a6cd91a589ceff18283e4c6250ac256fe97812a4`
**Packet:** `VIS-03C-03-CURRENT-WIP-SOURCE-LINEAGE`
**Candidate:** `VIS-03C-03-CURRENT-WIP-LINEAGE-CANDIDATE-20260731-001`
**Status:** `needs_review`

## Outcome

The six-page clean and annotated Saturday review package now derives its page content from the six current canonical WIP pages. The July 29 staging folder remains read-only and is used only for the separately pinned support files copied by the established review builder.

No canonical WIP page changed. The current-WIP switch itself produced no generated page-byte changes. Browser QA then found and corrected two evidence-safe defects in the derived Stockists page:

- The unfocused `Skip filters to results` control overlapped the mobile introduction. It is now off-canvas at rest and returns to its normal position on focus.
- Clean review intentionally excludes the illustrative map, but the inherited script still tried to render into the missing map elements. The derived script now returns safely when those optional elements are absent.

No design direction, public fact, claim, catalogue value, price, asset or Canva-note delivery state changed.

## Pinned current sources

| Page | Canonical input | SHA-256 |
|---|---|---|
| Homepage | `_wip/homepage_real_1_lead_photo.WIP.html` | `921ef01aa922668da2f0aacdfdf7438fd0e5664fb78ba98bc9c011e55e03b098` |
| Carob Story | `_wip/carob-story.WIP.html` | `cdc426a6a19d8012f9198584842766ed0ee7400d7f93a4642d9bb3db972216c7` |
| Shop | `_wip/shop.WIP.html` | `b11f0eec60ee0a6c0927c0657171cf12044c1aa7f2a781d84a87eb843a6735d0` |
| Our Story | `_wip/our-story.WIP.html` | `17b77bc83930a6ad4ef5834427bdeed5ff6672a8001328259aa84e7a98e06304` |
| Stockists | `_wip/stockists.WIP.html` | `257662784dfb31792c1604ff7821cb16abdc78281a681311f518498ab8a6e8ce` |
| FAQ | `_wip/faq.WIP.html` | `4a7f5eee7096150f23f07cac6316c83893aab34135e3c40ca0e24848b77704f1` |

All six hashes matched before execution and remained identical afterward.

## Byte-changing paths

| Path | Base SHA-256 | Final SHA-256 |
|---|---|---|
| `scripts/build-maplemoon-saturday-review.py` | `69f609c8517e44c191b5f760bd52f0d6d3f6e03e7d64f1cc412efbb70d6f474f` | `360a17a1d5de59b45f33235553bb76892b5e0d11f77808fcbb8ee6d41613913c` |
| `scripts/check-maplemoon-review.py` | `92693b7c3a8223a77f6c964bcb4822e209070eb04e6e468bdd90a4bf6f47b90c` | `ece602a1e2a6ec8e98c528edac77ac43f157f9b260fe63919e7f3bd84f4f9f0e` |
| `staging-v1/MANIFEST.json` | `406be749b7eecc262204be04dfaf92d7b5a44181d1450b327b3470f9854ada91` | `d762ef7c831e71b1dfb348f162087c4ef394bfa5de9aa1e36c677d833c3afbf8` |
| `staging-v1/clean/MANIFEST.json` | `44e17785b2dac93fc28142908048b5923d11fbfffe780cf713936241f7f97dda` | `a79bafd7135eb824d96e08271df9565d456235cbac412b7985be36fce59343d9` |
| `staging-v1/annotated/MANIFEST.json` | `1cefacf28b289fca84990fd37845d342b4afa6e33457adde3569b75153e62709` | `423ef477ef8992e3842a4fb463065850a97b1dfd47550d535aa7e500aa59a7b6` |
| `staging-v1/clean/stockists.html` | `fff14e9f4c7778b364a38ead36dc64be0d7d479fb2877165ba94fbea942ac37b` | `81cf5a7f79cc3c31a82af8ec46d302ea28225f465904a0332ab874714fca68dc` |
| `staging-v1/annotated/stockists.html` | `72db5c835b661beb78395f43ea51cbd84fcdf4d482c1b51ac088ec68f498be3e` | `55ef8c1692f99238d587b05fbb1c7e7ae6322ad10bc28e35169d104637501052` |
| This receipt | absent | recorded after verification |

The other ten clean and annotated page files remained byte-identical to the pre-packet package. All three manifests identify `VIS-03C-03-CURRENT-WIP-SOURCE-LINEAGE`, bind six current source IDs and hashes, and retain `share_ready: false`.

## Verification

- Packet JSON and four held locks validated before execution.
- Builder, checker, aggregate manifest and all six source hashes matched their acquisition pins.
- `python3 -m py_compile` passed for the builder and Saturday checker.
- Builder changed-input self-test passed.
- Two separate complete post-fix builds were byte-identical.
- Promoted staging was byte-identical to the verified build.
- Saturday clean and annotated checker passed with `0` failures and `0` warnings.
- Complete-document clean and annotated parity passed.
- Mock cart, pending-product, fake-checkout, newsletter, accessibility and no-network checks passed.
- Homepage motion and live reduced-motion checks passed.
- `git diff --check` passed.
- Fresh, cache-busted in-app Browser QA covered clean and annotated modes for all six pages at `320`, `375`, `390`, `430`, `1024` and `1440` pixels: `72` route-width checks, `0` failures.
- Browser QA found no document overflow, broken images, placeholder/WIP signals, missing H1, missing noindex, mode mismatch or console warning/error.
- Clean and annotated Stockists were visually inspected again at `390` pixels after the fixes; the introduction and finder are separated cleanly.

## Boundaries and next gate

No commit, push, deploy, send, upload, client contact, Canva action, Shopify, WooCommerce, Vercel or production action occurred. Canonical WIP, source assets and catalogue evidence remained read-only.

The candidate is mechanically and responsively verified but is not accepted or share-ready. Nate must complete the final real-browser visual, keyboard and 200 percent zoom review. Adobe Typekit remains the admitted networked render dependency. CAT inputs and held content/design decisions remain separate blockers.

**Next gate:** Nate reviews the clean and annotated local routes, then explicitly accepts or returns exact corrections.
