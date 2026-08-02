# VIS-03C-04 Responsive Rebuild Receipt

**Packet:** `VIS-03C-04-RESPONSIVE-REBUILD`  
**Candidate:** `VIS-03C-04-RESPONSIVE-REBUILD-CANDIDATE-20260731-001`  
**State:** `blocked`  
**Executed by:** Codex  
**Completed:** `2026-07-31T10:28:01Z`  
**Final decision owner:** Nate

## Outcome

The current-WIP source repin, clean and annotated rebuild, deterministic comparison, static checks, cart checks, motion check and the three `d65047b` responsive regressions passed. The strict rendered matrix then stopped the candidate. It is not share-ready.

- 72 route-width cases executed: 48 passed without a finding; 24 failed.
- 44 total findings: 22 clean and 22 annotated, with exact surface parity.
- Our Story overflowed at all six widths on both surfaces.
- Stockists' off-screen focus-only skip link was reported at all six widths on both surfaces.
- The deliberate injected-overflow positive control was detected at 320 and 1440 pixels.
- No browser warning or error was observed.

## Base evidence

- Branch: `codex-maplemoon-section-review`
- HEAD: `d65047b6a7431af955ad0cd5b57c42f7a9367225`
- Ahead of origin: 4 commits
- Tracked worktree before admission: clean
- `d65047b` changed only `_wip/carob-story.WIP.html`, `_wip/shop.WIP.html` and `_wip/stockists.WIP.html`.
- The parallel handoff's `a32e5dc` HEAD was stale and was not used.

Canonical WIP remained read-only and hash-identical:

| Source | SHA-256 |
| --- | --- |
| `_wip/homepage_real_1_lead_photo.WIP.html` | `921ef01aa922668da2f0aacdfdf7438fd0e5664fb78ba98bc9c011e55e03b098` |
| `_wip/carob-story.WIP.html` | `e1695095f6b8e18eccea468dfd8a09013e85b5c64c5de427b3d8e5701e6f4320` |
| `_wip/shop.WIP.html` | `d976b0b8df1edc845eae10fa03a272f96dae7ff9fad6711f1dfb6eed80ff5a09` |
| `_wip/our-story.WIP.html` | `17b77bc83930a6ad4ef5834427bdeed5ff6672a8001328259aa84e7a98e06304` |
| `_wip/stockists.WIP.html` | `6e92382ccec4874aac79c32e644d0ed130d03400c7d23682623b0e4154a6fa36` |
| `_wip/faq.WIP.html` | `4a7f5eee7096150f23f07cac6316c83893aab34135e3c40ca0e24848b77704f1` |

## Repin and deterministic build

The historical VIS-03C-03 pins for Carob Story (`cdc426a6...`), Shop (`b11f0eec...`) and Stockists (`25766278...`) were replaced by the current hashes above. The builder initially stopped safely on its redundant historical VIS-01C pin group; that check was narrowed to defer to the superseding packet's complete six-source fail-closed pins. The self-test passed again before promotion.

Two independent temporary builds and the promoted `staging-v1` tree produced the same aggregate manifest SHA-256:

`144363ddd432e0dd6219dc2bfcf3300e8107eae6ed67faa51cfe6fb40c8adcc1`

## Verification

Passed:

- `python3 -B scripts/build-maplemoon-saturday-review.py --self-test`
- two independent derived builds plus byte comparison
- `npm run review:saturday:check`: 0 failures, 0 warnings
- `npm run review:saturday:cart`
- `node scripts/check-maplemoon-homepage-motion.mjs`
- `npm run review:saturday:responsive:probe`
- Python syntax compilation for builder and checker
- `git diff --check`
- deliberate browser positive control at 320 and 1440 pixels
- Shop Bars and all other category links stayed within a valid horizontal-scroll reachability range at 320, 375, 390 and 430 pixels
- Carob Story, Shop and Stockists cart controls stayed inside the 320-pixel viewport on clean and annotated surfaces
- no cart-shell or closed-dialog overflow false positive

The historical `scripts/validate-maplemoon-control-plane.py` bootstrap validator was also run. It stopped on its pre-existing `exactly eight V2 lock rows required` rule: that validator is hard-coded to the original CTRL-V2 bootstrap target set and does not accept the later operational lock rows already present in this manifest. VIS-03C-04 did not change that validator or count its stale bootstrap-only result as package acceptance evidence.

Rendered matrix, findings per surface:

| Route | 320 | 375 | 390 | 430 | 1024 | 1440 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Homepage | 0 | 0 | 0 | 0 | 0 | 0 |
| Carob Story | 0 | 0 | 0 | 0 | 0 | 0 |
| Shop | 0 | 0 | 0 | 0 | 0 | 0 |
| Our Story | 8 | 2 | 1 | 1 | 2 | 2 |
| Stockists | 1 | 1 | 1 | 1 | 1 | 1 |
| FAQ | 0 | 0 | 0 | 0 | 0 | 0 |

Our Story findings:

- 320: logo, right navigation/cart and nested icon/counter geometry exceed the viewport.
- 375: cart counter edge and the bottom-right floating image exceed the viewport.
- 390 and 430: the bottom-right floating image exceeds the viewport.
- 1024 and 1440: the story hero portrait figure and image extend past the viewport.

Stockists finding:

- `a.st-skip-finder` is positioned near `left: -9999px` until focus. The strict detector correctly reports it because it is rendered and is not hidden, `aria-hidden`, inert, fixed or inside a closed dialog. A future packet must either prove and explicitly classify this focus-only pattern or repair it.

## Payload hashes

| Path | Post SHA-256 |
| --- | --- |
| `docs/orchestration/packets/VIS-03C-04-RESPONSIVE-REBUILD.md` | `dfffebed4ff4c32791f4977b6d8bd55490aca339cb5c6d45a36cfa1dc77d9ded` |
| `scripts/build-maplemoon-saturday-review.py` | `5f6f169410fb61c2d36154bac08d76c42153df49417e039893b808717227ee13` |
| `scripts/check-maplemoon-review.py` | `46dd4294591f1a161df4cc28b4ca70d2dc8a3ad552db5dda7ef9bf1c8978a570` |
| `scripts/check-maplemoon-responsive-overflow.mjs` | `1bbe038a41ee3ad6f231b2d6fa2ece95bd151461333f932760e7ef0d0e1646d3` |
| `package.json` | `be2e3cb030ac2f7d6043bb26325cf0671aca24e4156a65cee29f6181c6069163` |
| `staging-v1/MANIFEST.json` | `144363ddd432e0dd6219dc2bfcf3300e8107eae6ed67faa51cfe6fb40c8adcc1` |
| `staging-v1/clean/MANIFEST.json` | `449b8ae0691281ca3253ba4d8d0d27995f9be6cdb66c66bcd811c9e515b85d17` |
| `staging-v1/annotated/MANIFEST.json` | `8c863b99f4106c5255b9bddbc3686057f6c6ca7e16890c953ebb8076bcd580dc` |

## Scope proof and next gate

No canonical WIP, catalogue, theme, Shopify, WooCommerce, Vercel, production or client state changed. No commit, push, deploy, upload or send occurred. Christmas, barcode and Arabic-label work remained outside the website critical path.

The next gate is one explicit approval for a new bounded responsive-fix packet covering only the Our Story overflow and the Stockists skip-link classification/repair, followed by the same deterministic and 72-case checks. Nate's visual, keyboard and 200 percent zoom review still remains required after that packet passes.
