# MapleMoon VIS Section Lock Map — 30 July 2026

## Rules

No section is fully `locked` until its required source, rendered and human evidence exists. A `lock-candidate` must remain untouched by workers except for an admitted regression fix. Hashes bind page state, while section evidence binds the human decision.

## Shared system and review surfaces

| Component | Initial disposition | Reason / held evidence | Next gate |
|---|---|---|---|
| External font/Typekit dependency | blocked-external | every canonical WIP page requests Adobe Typekit; zero-network local-only rendering is not established | separately admitted sanitisation or independently verified zero-network route |
| Shared typography/colour/spacing | needs-Nate-decision | source tokens exist, but no rendered six-viewport evidence supports a human visual lock | zero-network render matrix and Nate review |
| Header/navigation | technical-fix-allowed | “What is Carob,” FAQ visibility and homepage destinations differ across pages | approve one navigation matrix, then packet exact page-local updates |
| Cart/commerce chrome | needs-Nate-decision | all six pages show an actionable-looking cart without commerce wiring | decide clean-review treatment; do not add Shopify to solve presentation |
| Footer navigation | technical-fix-allowed | FAQ is absent from five footers; FAQ omits the Contact route used elsewhere | approve one footer matrix, then packet exact page-local updates |
| Main landmarks | technical-fix-allowed | Our Story and Stockists lack a clear main landmark after the header | semantic source fix plus accessibility verification |
| Source-page metadata | blocked-external | five WIP pages declare production canonical/indexing; FAQ lacks an equivalent boundary | keep WIP local; sanitise only derived review surfaces |
| Clean review routes | technical-fix-allowed | clean navigation exposes `.WIP.html` filenames, including the long homepage alias | new derived Saturday staging aliases and routing packet |
| Annotated review route | technical-fix-allowed | `?review=1` works, but the review index does not enter annotated mode | staging-only index-link packet |
| Social preview metadata | needs-Nate-decision | staged pages retain production-shaped OG URLs/images that may mislead when shared | choose neutral review preview or strip review OG metadata |
| Share allowlist | technical-fix-allowed | `.vercel/` metadata must not enter any manually shared folder/archive | allowlist check before packaging |
| Unified feedback register | lock-candidate | coordinator-owned register now exists; intake operation still needs a live review test | dry-run one annotated and one clean feedback receipt |

## Homepage

**Path:** `_wip/homepage_real_1_lead_photo.WIP.html`  
**Owner:** Codex evidence; Nate decisions

| Section | Initial disposition | Reason / held evidence | Next gate |
|---|---|---|---|
| Hero `#top` | needs-Nate-decision | CAROB brief is partly applied; edge mask exists, ambient glow/required rendered QA remain; Canva benefit wording pending application | current-vs-proposed 1440/390/375 decision |
| Range `#range` | needs-Carli-source | product/pricing truth depends on approved catalogue and WooCommerce comparison | CAT input gate |
| Carob education `#carob` | needs-Carli-source | prohibited/contested processing wording occurs in current copy | exact replacement-copy approval |
| Why cacao `#why` | needs-Carli-source | factual comparison/health language requires approved source | factual review |
| Ritual `#ritual` | needs-Nate-decision | final “Join the ritual” placement and presentation remain subjective | visual decision packet |
| Brand story `#story` | needs-Carli-source | production/small-batch language requires reconciliation | exact replacement-copy approval |
| Founders `#who` | needs-Carli-source | portraits and final story details remain pending | approved content/assets |
| Stockists preview `#stockists` | blocked-external | representative/disabled controls and stockist counts cannot appear unfinished on clean surface | verified directory strategy |
| Reviews `#reviews` | blocked-external | named testimonials remain consent-held | consent/attribution or clean exclusion |
| Sampler `#sampler` | needs-Carli-source | product inclusion/pricing depends on catalogue authority | CAT input gate |
| Trust `#trust` | needs-Carli-source | shopping reassurance must match real policy/commerce capability | policy/commerce approval |
| Footer `#footer` | technical-fix-allowed | shared footer information architecture is inconsistent and omits FAQ here | approve footer matrix, then exact page-local fix |

## Carob Story

**Path:** `_wip/carob-story.WIP.html`  
**Owner:** Codex evidence; Nate decisions; Carli factual source

| Section | Initial disposition | Reason / held evidence | Next gate |
|---|---|---|---|
| Hero `#top` | needs-Carli-source | current public process language conflicts with latest Carli note | exact replacement-copy approval |
| Comparison `#carob-and-cacao` | needs-Carli-source | factual comparison requires authoritative wording | factual review |
| Pod to bar `#pod-to-bar` | needs-Carli-source | slow-roasted/milled/small-batch language is disputed | exact replacement-copy approval |
| Gallery `#gallery` | lock-candidate | source structure/assets exist; rendered crop/hierarchy not accepted | visual evidence |
| Range CTA | lock-candidate | source structure exists; destination and rendered hierarchy pending | integration/render pass |
| FAQ `#faq` | needs-Carli-source | multiple answers contain disputed process/texture wording | exact replacement-copy approval |
| Education chooser | needs-Nate-decision | A is source-default preview only; no direction is approved | zero-network visual decision |

## Shop

**Path:** `_wip/shop.WIP.html`  
**Owner:** Codex evidence; Nate decisions; catalogue source owner

| Section | Initial disposition | Reason / held evidence | Next gate |
|---|---|---|---|
| Shop introduction | blocked-external | layout exists, but visible product, price and weight claims are not catalogue-accepted | CAT input gate; later visual evidence |
| Catalogue controls | technical-fix-allowed | deterministic search/filter/sort and accessibility checks may be packeted | interaction QA |
| Bars `#bars` | blocked-external | claims, products and selling data require catalogue reconciliation | CAT input gate |
| Moons `#moons` | blocked-external | pricing/selling state requires catalogue reconciliation | CAT input gate |
| Bites `#bites` | blocked-external | products/prices/claims require catalogue reconciliation | CAT input gate |
| Elixirs `#elixirs` | blocked-external | product/selling state requires catalogue reconciliation | CAT input gate |
| Bananas `#bananas` | blocked-external | product/selling state and “smooth carob” wording require review | CAT + copy gate |
| Powder `#powder` | blocked-external | product facts and selling state require catalogue reconciliation | CAT input gate |

## Our Story

**Path:** `_wip/our-story.WIP.html`  
**Owner:** Codex evidence; Nate decisions; Carli factual source

| Section | Initial disposition | Reason / held evidence | Next gate |
|---|---|---|---|
| Founder hero | needs-Carli-source | founder imagery/content acceptance required | approved content/assets |
| Shared story `#story` | needs-Carli-source | biography/story authority remains with Carli | factual review |
| Founder profiles `#founders` | needs-Carli-source | bios, favourites and portraits explicitly pending | approved content/assets |
| Ingredient `#ingredient` | needs-Carli-source | claim wording requires authority | factual review |
| Origin `#carob` | needs-Carli-source | origin/process copy requires authority | factual review |
| Farm `#source` | needs-Carli-source | source explicitly says wording pending | approved wording |
| Pull quote | needs-Carli-source | quote/source/attribution must be confirmed | content approval |
| Craft `#craft` | needs-Carli-source | handmade/small-batch language conflicts with latest note | exact replacement-copy approval |
| Place `#place` | needs-Carli-source | source structure exists, but place/health/child-sharing copy acceptance remains pending | factual review; then visual evidence |
| Range `#range` | lock-candidate | source gallery exists; rendered asset/crop review pending | visual evidence |
| Shop CTA `#shop` | needs-Carli-source | source destination exists, but body/nervous-system benefit language requires approval | exact copy approval; then integration/render pass |

## Stockists

**Path:** `_wip/stockists.WIP.html`  
**Owner:** Codex evidence; Nate decisions; directory source owner

| Section | Initial disposition | Reason / held evidence | Next gate |
|---|---|---|---|
| Hero | blocked-external | source hierarchy exists, but it visibly carries disputed counts and online-ordering claims | directory/commerce source gate; then visual evidence |
| Finder | blocked-external | 204 parsed entries, 7 incomplete records and provisional labels remain | directory evidence gate |
| Map/coverage presentation | needs-Nate-decision | must remain clearly illustrative/non-geographic with no inferred pins | visual decision |
| Wholesale | needs-Carli-source | final contact/business routing requires approval | business-content approval |
| Newsletter | blocked-external | email capture cannot imply a working integration | integration or clean exclusion |
| Internal source notes | technical-fix-allowed | data-cleaning notes are rendered inside ordinary result cards | clean-surface exclusion plus source check |

## FAQ

**Path:** `_wip/faq.WIP.html`  
**Owner:** Codex evidence; Nate decisions; Carli/policy source

| Section | Initial disposition | Reason / held evidence | Next gate |
|---|---|---|---|
| Hero/search | lock-candidate | source hierarchy and search exist; rendered/keyboard evidence pending | interaction/render QA |
| Popular questions | technical-fix-allowed | deterministic rendering, focus and destination checks may be packeted | interaction QA |
| Category navigation | technical-fix-allowed | deterministic filtering, focus and state checks may be packeted | interaction QA |
| FAQ answers | needs-Carli-source | carob process answers conflict; shipping/returns/policy remain pending | content/policy approval |
| Support panel | lock-candidate | source contact route exists; rendered and audience review pending | integration/render pass |

## Cross-page unresolved queue

1. Clear a zero-network rendered-review route without changing the frozen V2 payload.
2. Reconcile Carli's latest copy corrections against the authoritative content source.
3. Decide Homepage hero/CAROB completion and Carob education direction.
4. Obtain and validate the WooCommerce export plus approved retail catalogue.
5. Separate annotated and clean review surfaces from one approved source state.
6. Remove or intentionally replace visible placeholders/disabled-looking controls on the clean surface.
7. Approve one cross-page header/footer/navigation matrix and clean homepage route.
8. Keep `.vercel/` metadata out of any shareable package and reconcile stale routing receipts.
9. Verify navigation, links, anchors, assets, noindex/canonical/social metadata and feedback routing.
10. Run the full viewport, keyboard, zoom, tap-target and reduced-motion matrix.
11. Freeze exact hashes and obtain Nate's final Saturday artifact/audience approval.
