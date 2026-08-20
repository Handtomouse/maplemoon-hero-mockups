# MapleMoon authoritative website source pin — 2026-08-20

## Decision

**The authoritative source for the Shopify port is the single hash-pinned seven-page deployed `_wip` website set listed below at Git commit `9bbd9d6899cfcebbd5a32b96bf9d6c3a7c7818ac`.**

This names one source set, not seven alternatives and not a choice among WIPs. A file ceases to belong to this pin if its SHA-256 changes; changing the pin requires a new dated authority record.

## Exact pin

- Repository: `/Users/handtomouse/maplemoon-website`
- Branch observed: `docs/registry-authority-20260819`
- Commit: `9bbd9d6899cfcebbd5a32b96bf9d6c3a7c7818ac`
- Pin date: `2026-08-20` (Australia/Sydney)
- Deployed review surface: `https://maplemoon-website-k1qlkb4hk-handtomouses-projects.vercel.app`

| Canonical route | Exact source path | SHA-256 | `routes.v1.json` result |
|---|---|---|---|
| `/` | `_wip/homepage_real_1_lead_photo.WIP.html` | `284c55d8bcfbb8fc39b500540c7e6494eb0edfcc5506c7f8dbe4dd622265fb81` | Exact baseline match |
| `/shop` | `_wip/shop.WIP.html` | `035a66bb8915e35f636b856849b2ae1cea8666f5fb302aeaf04cf6e8c1db4fc5` | Exact baseline match |
| `/our-story` | `_wip/our-story.WIP.html` | `5323d72a21b0ba30c59662564a86c6f07441d156ed76c5849e36ea6550a73566` | Exact baseline match |
| `/carob-story` | `_wip/carob-story.WIP.html` | `97524120b51de42fa4b9a0bda47a2cd2e9f5caf2b29b04b1da30da6d48a56a68` | Exact baseline match |
| `/stockists` | `_wip/stockists.WIP.html` | `41a291fdec4a2f0ebe348544bf24d65f20d0017863941c1f252ddc3337d6d471` | Exact baseline match |
| `/faq` | `_wip/faq.WIP.html` | `d043e578349220fec89f16a1d75e0182a1e3fe745cdcaa5639c4be0cdff0c525` | Exact baseline match |
| `/contact` | `_wip/contact.WIP.html` | `38ef32975261f6fc9b08c8a5df299c8f3bfe893a59ef9540949ef7dee262c7cb` | No baseline record; `routes.v1.json` explicitly records Contact as an observed `mailto:` destination with no approved page route |

All seven paths are deployed by exact rewrite in `vercel.json`. Six of seven are baseline-hashed by `docs/design-system/contracts/routes.v1.json`; all six match. Contact is the seventh deployed route but is deliberately outside that contract's six-route authority. The task packet's abbreviated Shop value `f1f7ca11a62f…` is not the value at the supplied commit: both the file and `routes.v1.json` at `9bbd9d6` resolve to the full `035a66…` hash above.

## The three deciding facts

1. This set is the only candidate that is both deployed and content-verified, and every byte in the source set is now pinned above.
2. The in-repo checker measures this set: `contracts-only` passes and route conformance reports exact, actionable findings against the same files. The external Styles Kit explicitly names no implementation or deployment base.
3. The Styles Kit is held and materially divergent, whereas the in-repo design-system files are a derived measurement/migration layer, not the page source. Neither can displace the deployed source set without a separately approved promotion.

## Candidate comparison and overlap

### Candidate 2 — Shared Site Styles Kit

Observed package: `/Users/handtomouse/Documents/Codex/2026-08-13/maple-moon-shared-site-styles-kit/outputs`, version `0.3.1-provisional`, status `reviewable, not globally approved`, implementation state `not implemented`.

The kit is not a superset of the in-repo system and is not a promoted implementation source:

- Kit inventory: 68 rules, 12 decisions, 70 tokens and 44 proofs.
- Exact rule/decision ID overlap against `assets/design-system/mm-{tokens,base,chrome,primitives}.css`, `routes.v1.json` and `exceptions.v1.json`: **0 of 80**.
- Token comparison against the in-repo 75-token contract: **2** exact name-and-value matches (`--mm-font-weight-regular`, `--mm-font-weight-medium`); **4** shared names with conflicting values; **64** kit token names absent from the in-repo contract; **69** in-repo token names absent from the kit. Seven equal values occur under different names, but several are coincidental unit values rather than semantic equivalence.
- The kit therefore does contain absent material—25 approved rules, 25 provisional rules, 18 held/evidence-dependent rules, 12 approved decision records and 64 otherwise-absent token names—but that material is a parallel proposal/governance package. It cannot be imported wholesale because its palette, spacing, radius and motion system conflicts with source-resolved deployed values.

Evidence fingerprints used for this comparison:

- `RULE-REGISTER.json`: `94fdba5891d5534c5221265b278e30370a4f666f67653f13b69cc7545dc653e3`
- `DESIGN-TOKENS.json`: `42e405100bafca42749532db99a3d8afd20b0bda0bf3fe9095fb09ef22388271`
- `STATUS.md`: `78825a5757bad150d8450eba536bc60387453b920827fe8020d8cc408c0075ba`

**Disposition: merge-then-retire.** Reconcile only individually evidenced, non-conflicting approved rules/decisions through a separate governed change against the pinned pages and current contracts; never copy the kit token system wholesale. After accepted items are represented in the repo contracts or explicitly rejected, archive the kit as historical provenance and mark it retired so it cannot reappear as a source candidate.

### Candidate 3 — in-repo design system

`docs/design-system/contracts/` and `assets/design-system/mm-{tokens,base,chrome,primitives}.css` remain the measurable conformance and implementation-reference layer. They are source-resolved from the deployed pages, preserve registered exceptions and support deterministic checks, but they do not contain the complete seven-page content, structure or route art direction.

**Disposition: keep as reference.** Use it to extract variables/components, annotate exceptions and measure the port; do not call it the page source and do not let shared primitives erase route-local design.

## Settled authority boundary

- The seven files and hashes in the pin table are the only website translation source.
- `routes.v1.json` and `exceptions.v1.json` are validation records. They settle their registered route and exception facts but do not replace the HTML set.
- The Styles Kit is not an alternate source, even where it has an `APPROVED` label. Its approved records require reconciliation before they can alter the pin or contracts.
- Contact may be represented in the bounded Figma file because it is one of the seven deployed pages. This does not silently approve a Shopify Contact route; the route-authority hold in `routes.v1.json` remains intact.

## Verification snapshot

`node scripts/check-maplemoon-design-system.mjs --contracts-only` returned:

```text
PASS contracts-only tokens=75 routes=6 components=15 widths=4 images=14 exceptions=7 routeConformance=SKIPPED (flag not set)
exit=0
```

`node scripts/check-maplemoon-design-system.mjs --route-conformance all` returned `FAIL route-conformance failures=36`, all on the four foundation-unwired routes Carob Story, FAQ, Our Story and Stockists. The findings are classified in the companion Figma scope; they do not change this source pin.

### Literal final verification output

The required command block was run unchanged from `/Users/handtomouse/maplemoon-website`. Its real combined output was:

```text
perl: warning: Setting locale failed.
perl: warning: Please check that your locale settings:
	LC_ALL = "C.UTF-8",
	LC_CTYPE = "C.UTF-8",
	LANG = "en_AU.UTF-8"
    are supported and installed on your system.
perl: warning: Falling back to a fallback locale ("en_AU.UTF-8").
97524120b51de42fa4b9a0bda47a2cd2e9f5caf2b29b04b1da30da6d48a56a68  _wip/carob-story.WIP.html
perl: warning: Setting locale failed.
perl: warning: Please check that your locale settings:
	LC_ALL = "C.UTF-8",
	LC_CTYPE = "C.UTF-8",
	LANG = "en_AU.UTF-8"
    are supported and installed on your system.
perl: warning: Falling back to a fallback locale ("en_AU.UTF-8").
38ef32975261f6fc9b08c8a5df299c8f3bfe893a59ef9540949ef7dee262c7cb  _wip/contact.WIP.html
perl: warning: Setting locale failed.
perl: warning: Please check that your locale settings:
	LC_ALL = "C.UTF-8",
	LC_CTYPE = "C.UTF-8",
	LANG = "en_AU.UTF-8"
    are supported and installed on your system.
perl: warning: Falling back to a fallback locale ("en_AU.UTF-8").
d043e578349220fec89f16a1d75e0182a1e3fe745cdcaa5639c4be0cdff0c525  _wip/faq.WIP.html
perl: warning: Setting locale failed.
perl: warning: Please check that your locale settings:
	LC_ALL = "C.UTF-8",
	LC_CTYPE = "C.UTF-8",
	LANG = "en_AU.UTF-8"
    are supported and installed on your system.
perl: warning: Falling back to a fallback locale ("en_AU.UTF-8").
284c55d8bcfbb8fc39b500540c7e6494eb0edfcc5506c7f8dbe4dd622265fb81  _wip/homepage_real_1_lead_photo.WIP.html
perl: warning: Setting locale failed.
perl: warning: Please check that your locale settings:
	LC_ALL = "C.UTF-8",
	LC_CTYPE = "C.UTF-8",
	LANG = "en_AU.UTF-8"
    are supported and installed on your system.
perl: warning: Falling back to a fallback locale ("en_AU.UTF-8").
5323d72a21b0ba30c59662564a86c6f07441d156ed76c5849e36ea6550a73566  _wip/our-story.WIP.html
perl: warning: Setting locale failed.
perl: warning: Please check that your locale settings:
	LC_ALL = "C.UTF-8",
	LC_CTYPE = "C.UTF-8",
	LANG = "en_AU.UTF-8"
    are supported and installed on your system.
perl: warning: Falling back to a fallback locale ("en_AU.UTF-8").
035a66bb8915e35f636b856849b2ae1cea8666f5fb302aeaf04cf6e8c1db4fc5  _wip/shop.WIP.html
perl: warning: Setting locale failed.
perl: warning: Please check that your locale settings:
	LC_ALL = "C.UTF-8",
	LC_CTYPE = "C.UTF-8",
	LANG = "en_AU.UTF-8"
    are supported and installed on your system.
perl: warning: Falling back to a fallback locale ("en_AU.UTF-8").
41a291fdec4a2f0ebe348544bf24d65f20d0017863941c1f252ddc3337d6d471  _wip/stockists.WIP.html
PASS contracts-only tokens=75 routes=6 components=15 widths=4 images=14 exceptions=7 routeConformance=SKIPPED (flag not set)
exit=0
FAIL route-conformance failures=36
carob-story: expected exactly one aria-current=page
carob-story: expected exactly one shared chrome mount
carob-story: missing deferred shared chrome script
carob-story: missing shared chrome mount
carob-story: missing shared import /assets/design-system/mm-base.css
carob-story: missing shared import /assets/design-system/mm-chrome.css
carob-story: missing shared import /assets/design-system/mm-primitives.css
carob-story: missing shared import /assets/design-system/mm-tokens.css
carob-story: route state is foundation_unwired; expected pilot_wired
faq: expected exactly one aria-current=page
faq: expected exactly one shared chrome mount
faq: missing deferred shared chrome script
faq: missing shared chrome mount
faq: missing shared import /assets/design-system/mm-base.css
faq: missing shared import /assets/design-system/mm-chrome.css
faq: missing shared import /assets/design-system/mm-primitives.css
faq: missing shared import /assets/design-system/mm-tokens.css
faq: route state is foundation_unwired; expected pilot_wired
our-story: expected exactly one aria-current=page
our-story: expected exactly one shared chrome mount
our-story: missing deferred shared chrome script
our-story: missing shared chrome mount
our-story: missing shared import /assets/design-system/mm-base.css
our-story: missing shared import /assets/design-system/mm-chrome.css
our-story: missing shared import /assets/design-system/mm-primitives.css
our-story: missing shared import /assets/design-system/mm-tokens.css
our-story: route state is foundation_unwired; expected pilot_wired
stockists: expected exactly one aria-current=page
stockists: expected exactly one shared chrome mount
stockists: missing deferred shared chrome script
stockists: missing shared chrome mount
stockists: missing shared import /assets/design-system/mm-base.css
stockists: missing shared import /assets/design-system/mm-chrome.css
stockists: missing shared import /assets/design-system/mm-primitives.css
stockists: missing shared import /assets/design-system/mm-tokens.css
stockists: route state is foundation_unwired; expected pilot_wired
exit=1
9bbd9d6899cfcebbd5a32b96bf9d6c3a7c7818ac
?? _wip/evidence/s1b_verify_20260820/
?? docs/orchestration/AUTHORITATIVE-SOURCE-PIN-20260820.md
?? docs/orchestration/FIGMA-CONTRACT-SCOPE-20260820.md
?? docs/orchestration/SHARED-CHROME-SHOP-VS-HOMEPAGE-20260820T175821.md
?? docs/orchestration/packets/MAPLEMOON-CATALOGUE-RECONCILIATION-WOO-24-20260820T175821.md
?? docs/orchestration/packets/MAPLEMOON-REGISTRY-REBASELINE-DRYRUN-20260820T175821.md
?? docs/orchestration/packets/MAPLEMOON-SHOPIFY-THEME-INVENTORY-S1B-VERIFY-20260820T175821.md
outputs
```

The `git status --porcelain` assertion is therefore **not empty**. Five listed paths pre-existed this task; the two newly listed paths are this task's exact outputs. No unrelated path was changed, deleted, staged, stashed, committed or cleaned.
