# MapleMoon content and catalogue truth audit — 2026-08-14

## Verdict

**Audit complete; HOLD the seven-page candidate for production content release.** The current candidate can remain a protected private preview, but it is not truthful enough for production: catalogue authority conflicts, unsupported product/health claims, review-cart vocabulary, apparent live commerce/newsletter affordances, and stockist-number provenance are unresolved.

No candidate, source, media, cart, header, deployment or production file was edited. This review records decisions and correction scopes only.

The current photography completion figure is **5 wired `photo_finals` heroes / 14 eligible V9 frames = 36%**. Product-card assets and review-only catalogue derivatives are not included in that figure.

## Status vocabulary

| Status | Meaning in this review |
|---|---|
| `APPROVED` | Exact wording or bounded identity is supported by a dated governing source. |
| `PRESERVE-CARLI-PENDING-NATE` | Existing requested copy remains untouched under `DEC-010`; Nate must decide the exact live occurrence before any change. |
| `PRIVATE-PREVIEW-ONLY` | Honest enough inside the protected review context, but not production authority. |
| `PRODUCTION-BLOCKER` | The surface implies unsupported truth or capability and cannot ship unchanged. |
| `UNKNOWN` | No sufficient source, owner, date or item-level proof was found in the pinned authority set. |

## Authority reconciliation — no silent winner

1. `CNT-001`, `ARC-005` and `DEC-007` in the Styles Kit approve exactly six named bars on Home/Shop and a six-bar Shop composition. Source: `SRC-LEDGER`, 2026-08-12, with Nate's layout choice dated 2026-08-14.
2. The later BOSS programme preserves the current **24-card private catalogue** for audit and explicitly requires Goji Carob Bites and Coconut Carob Bites to remain distinct. It does not explicitly supersede `CNT-001` for production.
3. Therefore neither six nor 24 wins automatically. The exact Nate decision is: **does production remain the six named bars, or does Nate supersede `CNT-001` and approve each of the other 18 product identities, product-label facts, prices, availability states and actions?** Affected files: `homepage.html`, `shop.html`, `pure-carob-bar.html`; media approval remains separate.
4. `DEC-010` approves preservation policy, not case-level edits. `CV-014`, `CV-051` and `CV-062` remain Nate-only. The four named contradiction phrases—`smooth carob`, `slow-roasted carob`, `Maple Moon mills carob`, `handmade in small batches`—have **zero exact occurrences** across the seven candidate pages plus `mock-cart.js`. That absence does not close the three case IDs because the pinned kit does not map each ID to a current live occurrence. Exact Nate decision: leave the current candidate unchanged unless a source-backed occurrence mapping is produced; never mark a case resolved from a zero-string scan alone.
5. `CNT-005` approves exactly one FAQ answer about carob itself. It does not approve blanket finished-product caffeine claims. The exact FAQ question and answer occur once in source and once in the rendered FAQ, but broader finished-product claims appear on Home, Our Story, Carob Story, Shop and Pure Carob Bar. Those broader claims remain evidence-gated.

## Seven-route truth matrix

Common to all routes: the six-row mobile drawer is customer-visible only when opened and contains ordinary navigation (`APPROVED`, `DEC-008/NAV-004` runtime was separately proven). The cart is closed, `aria-hidden=true` and inert by default. When opened, it says `Review checkout only. No order, payment or personal information will be submitted.` It contains no personal-data fields and emitted no mutation request in 14 route/width cases. That disclosure makes the cart **PRIVATE-PREVIEW-ONLY**. `Your cart`, `Add to cart`, `Continue to checkout`, `Place demo order`, `demo order`, `review checkout` and `connected live store` remain **PRODUCTION-BLOCKER** under `CNT-004` and `CMP-010` because they simulate commerce and expose internal review language.

| Route | Surface / exact text or stable identifier | Category and governing source | Visibility | Status and required authority |
|---|---|---|---|---|
| Home | Hero: `Australian organic carob`; `Naturally Sweet, Nothing Added.`; pills `No Caffeine / Organic Ingredients / Vegan Friendly` | Origin/diet/product claims; `CNT-003`, `CNT-005`; 2026-08-12/14 | Visible | `PRODUCTION-BLOCKER` until exact ingredient/product-label evidence supports every claim. Carob-only caffeine wording does not prove finished recipes. |
| Home | `#range`: six named bars plus category controls `Bars / Bananas / Moons / Elixirs / Eclipses / Bites`; `Shop Now` button sends to email while `View Range` opens Shop | Catalogue/action; `CNT-001`, `ARC-005`, `CNT-004` | Visible | Six names are `APPROVED`; the extra categories are `PRIVATE-PREVIEW-ONLY` pending the six-versus-24 decision. `Shop Now` label/destination mismatch is a `PRODUCTION-BLOCKER`. |
| Home | `Crafted from only two wholefood ingredients ... guilt-free perfection`; `naturally caffeine free`; `without the sugar crash` | Health/diet/product; `CNT-002`, `CNT-003`, `CNT-005` | Visible | `PRESERVE-CARLI-PENDING-NATE` where Carli-authored; otherwise `UNKNOWN`. No audit rewrite is authorised. Exact product evidence/Nate occurrence decision required. |
| Home | Stockist block and trust strip: `200+ locations`, `Free Shipping / Orders over $99`, `Secure payments / Safe and easy checkout`; starter box `$73.82`, six bars | Availability/commerce; `CNT-004` | Visible | `PRODUCTION-BLOCKER`. Public directory exposes 197 eligible entries, and shipping, payments, availability and starter price lack a pinned operating source. |
| Home | Newsletter `Stay in the loop` email form | Form/data; `CNT-004`, `CMP-008`, `CMP-010` | Visible; disclosure appears only after submission | Test input was cleared, not stored and sent no request; resulting notice says `Review preview: your email was not saved.` Thus `PRIVATE-PREVIEW-ONLY`, but `PRODUCTION-BLOCKER` because the pre-submit surface looks live and the internal disclosure is delayed. |
| Home | `meta[name=description]`: bars/moons/bites/elixirs; vegan, gluten free, caffeine free; far north coast. Image alts name products, farm and ritual scenes. | Metadata/alt follows `CNT-001`–`CNT-005`, `MEDIA-002` | Metadata/nonvisual; alts assistive-visible | `PRODUCTION-BLOCKER` for unsupported catalogue/diet/manufacturing breadth. Descriptive alts are accurate to the bound files, but media live-use authority remains separate. |
| Our Story | Founder narrative: `healthy, guilt-free treat ... children`; food affects feeling/behaviour/growth/development; gut/digestive effects; stimulants and sleep; whole-body nourishment; peak performance; nervous-system/presence/peace claims | Health/diet/founder copy; `CNT-002`, `CNT-003`, `DEC-010` | Visible | `PRESERVE-CARLI-PENDING-NATE`; production remains blocked until Nate decides exact occurrences and evidence owners. No broad compliance strip or anonymous rewrite. |
| Our Story | `Naturally sweet, caffeine free`; `grown right here in Australia`; no lectins/stabilisers/over-processing; product range and sourcing/production statements | Origin/health/manufacturing/product; `CNT-003`, `CNT-005` | Visible | Australian-grown carob is `APPROVED` in bounded ingredient wording. Finished-product caffeine, formulation and production statements are `UNKNOWN` / `PRODUCTION-BLOCKER` without label/operations evidence. |
| Our Story | Four valid JSON-LD blocks and page metadata repeat organisation/category/diet/location assertions; image alts identify founders, farm, range and studio scenes | Structured data/metadata/media; same content gates plus `MEDIA-002` | Machine-visible / assistive-visible | Same status as visible copy; structured data is not exempt. `PRODUCTION-BLOCKER` for unsupported breadth. Exact image acceptance is outside this content audit. |
| Our Story | `Read our story`, `Shop the range`, `Try Maple Moon` | Navigation/CTA | Visible | Destinations are honest internal links: `APPROVED` as actions. Product content at the destination remains gated. |
| Carob Story | `Maple Moon uses Australian-grown carob`; tree-grown pod/not a bean; carob/cacao comparison | Origin/ingredient education; safe bounded wording in Content Safety, `CNT-005`, `ARC-003` | Visible | Australian-grown and pod/not-bean wording are `APPROVED`. Comparison remains acceptable only at ingredient level. |
| Carob Story | `Naturally caffeine free`; comparison says carob naturally caffeine free / cacao contains caffeine | Caffeine; `CNT-005`, `DEC-011` | Visible | `UNKNOWN` outside the exact FAQ answer; production correction should either use the exact approved boundary or obtain a new evidence-backed approval. |
| Carob Story | `From crunchy to creamy ... something for every craving`; `Explore the range`; `Shop the range` | Sensory/catalogue/action | Visible | CTA destination is honest. Sensory language is `UNKNOWN`; production catalogue scope depends on six-versus-24 decision. |
| Carob Story | No description meta; AI/study/origin image alts accurately describe rendered subjects | Metadata/alt/media | Metadata absent; alts assistive-visible | Missing description is not a false claim. Media provenance/live-use remains governed separately; this audit gives no asset approval. |
| Shop | `.pcard[data-cat][data-order]`: 24 cards in seven categories; six bars + 18 other products | Catalogue; `CNT-001`, `ARC-005` versus later BOSS private-catalogue preservation | Visible | Six identities are `APPROVED`; all 18 additions are `PRIVATE-PREVIEW-ONLY` and a production blocker until Nate explicitly resolves the authority conflict and item facts. |
| Shop | `Showing 24 products`; `Every flavour, right to your door`; 20 `Add to cart`; four email `Enquire`; prices/options/availability/made-to-order states | Commerce/availability; `CNT-004`, `CMP-010` | Visible | Enquiry links accurately open pre-addressed email and are `PRIVATE-PREVIEW-ONLY` pending product authority. Cart, price, stock, shipping and order affordances are `PRODUCTION-BLOCKER` without operating/catalogue sources. |
| Shop | Every card carries product descriptions and most carry `Vegan / GF / No Caffeine`; manufacture terms include hand-moulded/roasted/crafted | Diet/manufacturing/product; `CNT-003`, `CNT-005` | Visible | `UNKNOWN` / `PRODUCTION-BLOCKER` unless a governed product-label record supports the exact card. Exact FAQ approval cannot be broadened. |
| Shop | Goji Carob Bites and Coconut Carob Bites | Product identity | Visible | Distinct names, descriptions and bound assets: `APPROVED` as distinct private-preview identities under later BOSS evidence. This does not approve production or an image derivative. |
| Shop | `meta[name=description]` claims bars/moons/bites/elixirs/bananas, vegan/GF/caffeine-free and Australian organic carob; all 24 product alts name their cards | Metadata/alt | Machine/assistive-visible | Same gates as cards: `PRODUCTION-BLOCKER` for unsupported breadth; alt identity accuracy is not production-media authority. |
| FAQ | `#caffeine`: exact question `Does carob contain caffeine?` and exact `CNT-005` answer | Caffeine; `CNT-005`, `DEC-011`, 2026-08-14 | Collapsed initially; customer-visible when opened | `APPROVED`; occurs exactly once in source and rendered FAQ. Screenshot proof exists at 390/1440. |
| FAQ | `#cacao-butter`: trace/virtually caffeine-free cacao butter; Maple Moon uses organic cacao butter to perfectly temper carob; smooth/creamy/chocolate-like | Caffeine/manufacturing/product | Collapsed, interaction-visible | `UNKNOWN` / `PRODUCTION-BLOCKER`; not covered by exact FAQ approval and no product/production source was found. |
| FAQ | `#maple-in-it`: no extra sugars/sweeteners in bars; `#storage`: no emulsifiers/stabilisers/refined sugars and exact 15–25°C storage | Formulation/storage | Collapsed, interaction-visible | `UNKNOWN` / `PRODUCTION-BLOCKER` pending label and handling evidence. Preserve exact authored copy until authorised correction. |
| FAQ | Australian-grown carob; contact, wholesale, stockist and support links | Origin/support/action | Interaction-visible | Bounded Australian-grown wording and honest email/internal links are `APPROVED`. `Shop the available range online` inherits production-commerce/catalogue blockers. |
| Stockists | Hero/meta/results headings: `200+ stockists`; filter accessible name says `All states, 197 stockists`; source array has 204 records, seven `UNKNOWN` withheld, 197 public-eligible | Stockist truth; `CNT-004`, `ARC-006` | Visible/meta | Numeric surfaces conflict. `PRODUCTION-BLOCKER` until a verified list source, owner and refresh cadence exist. Nate must choose a supported public number or nonnumeric wording. |
| Stockists | Initial eight results and `Load 8 more ... 189 remaining`; state/type filters; no map, distance, hours or verification labels | Directory behaviour; `CNT-004`, `CMP-006` | Visible/interactive | Functionality accurately reflects the 197 eligible array and is `PRIVATE-PREVIEW-ONLY`; record truth remains `UNKNOWN`. No fake map/geolocation was found. |
| Stockists | Retailer copy: full range of bars/moons/bites/elixirs; Australian organic carob; wholesale pricing/minimums on enquiry | Catalogue/origin/availability | Visible | Australian-grown carob may use bounded approved wording. Full-range/product/wholesale claims are `UNKNOWN` and production-blocking without current catalogue/operations authority. |
| Stockists | Hidden newsletter email form | Form/data | Hidden in clean rendering | Test emitted no request and stored no email. Not currently customer-visible; preserve hidden. Any future exposure requires a real destination/privacy path or upfront non-collecting label. |
| Pure Carob Bar | Product identity, `$12.95`, `90g`, `Vegan / GF / No Caffeine`, `two wholefood ingredients`, `guilt-free perfection` | Product/price/diet; `CNT-001`, `CNT-003`, `CNT-005` | Visible/meta | Identity is one of six `APPROVED` names. Size, price, diet and formulation copy are `UNKNOWN` / `PRODUCTION-BLOCKER` without the governed label. |
| Pure Carob Bar | `Ask about this item` email link; related five bars; ingredient/allergen caveat; storage caveat | Action/catalogue/safety | Visible | Enquiry and safety caveats are honest; six related identities are `APPROVED`. Displayed prices and any online-order implication remain gated. |
| Pure Carob Bar | No robots meta; description repeats 90g and diet claims; product/related-bar alts identify bound assets | Metadata/alt/media | Machine/assistive-visible | `PRODUCTION-BLOCKER` for unsupported size/diet metadata. Missing robots meta is a release-control observation, not content approval. Media authority is separate. |

## Complete 24-card catalogue matrix

All candidate actions below are preview state only. `Cart` means a browser-local demo control; `Enquire` means a mailto link. No row receives production approval from being present.

| # | Product | Category | Candidate offer/action | Content authority | Current image authority | Release classification |
|---:|---|---|---|---|---|---|
| 1 | Pure Carob & Cacao Butter | Bars | `$12.95` · Cart | Name/six-item scope `APPROVED`; offer/claims `UNKNOWN` | KEEP certified preview; confirm at final release | `PRIVATE-PREVIEW-ONLY`; production blocked on facts/commerce |
| 2 | Peppermint & Buckwheat | Bars | `$12.95` · Cart | Name/six-item scope `APPROVED`; offer/claims `UNKNOWN` | KEEP certified preview; confirm at final release | Same |
| 3 | Roasted Hazelnut | Bars | `$12.95` · Cart | Name/six-item scope `APPROVED`; offer/claims `UNKNOWN` | KEEP certified preview; confirm at final release | Same |
| 4 | Coconut & Goji | Bars | `$12.95` · Cart | Name/six-item scope `APPROVED`; offer/claims `UNKNOWN` | KEEP certified preview; confirm at final release | Same |
| 5 | Cayenne Chilli | Bars | `$12.95` · Cart | Name/six-item scope `APPROVED`; offer/claims `UNKNOWN` | KEEP certified preview; confirm at final release | Same |
| 6 | Almond & Celtic Salt | Bars | `$12.95` · Cart | Name/six-item scope `APPROVED`; offer/claims `UNKNOWN` | KEEP certified preview; confirm at final release | Same |
| 7 | Pure Carob Moon | Moons | Enquire · made to order | Beyond-six decision required | KEEP private preview; swap/production HOLD | `PRIVATE-PREVIEW-ONLY` |
| 8 | Peppermint Moon | Moons | From `$2.50` · Cart | Beyond-six decision and item facts required | KEEP private preview; inferred finish HOLD | `PRIVATE-PREVIEW-ONLY` |
| 9 | Roasted Hazelnut Moon | Moons | From `$2.50` · Cart | Same | KEEP private preview; finish HOLD | `PRIVATE-PREVIEW-ONLY` |
| 10 | Coconut & Goji Moon | Moons | From `$2.50` · Cart | Same | KEEP private preview; inferred finish HOLD | `PRIVATE-PREVIEW-ONLY` |
| 11 | Cayenne Moon | Moons | Enquire · made to order | Beyond-six decision; candidate also pending | KEEP private preview; finish HOLD | `PRIVATE-PREVIEW-ONLY` |
| 12 | Almond Moon | Moons | From `$2.50` · Cart | Beyond-six decision and item facts required | KEEP private preview; binding HOLD | `PRIVATE-PREVIEW-ONLY` |
| 13 | Pecan Nut Eclipse Bite | Eclipses | `$5.99–$59.99` · Cart | Beyond-six decision and item facts required | KEEP preview; replacement live-use HOLD | `PRIVATE-PREVIEW-ONLY` |
| 14 | Salted Almond Eclipse Bite | Eclipses | `$5.99–$59.99` · Cart | Same | KEEP preview; replacement live-use HOLD | `PRIVATE-PREVIEW-ONLY` |
| 15 | Hazelnut Eclipse Bite | Eclipses | `$5.99–$59.99` · Cart | Same | KEEP preview; repaired replacement HOLD | `PRIVATE-PREVIEW-ONLY` |
| 16 | Goji Ripe Eclipse Bite | Eclipses | `$5.99–$59.99` · Cart | Same | KEEP preview; v7 reference/live-use HOLD | `PRIVATE-PREVIEW-ONLY` |
| 17 | Salted Caramel Fudge | Eclipses | `$5.99–$59.99` · Cart | Same | KEEP preview; exact reference/live-use HOLD | `PRIVATE-PREVIEW-ONLY` |
| 18 | Eclipse Bite Bundle | Eclipses | `$24.99` · Cart | Beyond-six decision and bundle facts required | KEEP baseline only; release/swap HOLD | `PRIVATE-PREVIEW-ONLY` |
| 19 | Goji Carob Bites | Bites | Enquire · made to order | Distinct identity confirmed; all offer facts pending | GO identity / KEEP source; derivative swap HOLD | `PRIVATE-PREVIEW-ONLY` |
| 20 | Coconut Carob Bites | Bites | Enquire · made to order | Distinct candidate identity; broader authority pending | KEEP preview; replacement live-use HOLD | `PRIVATE-PREVIEW-ONLY` |
| 21 | Pure Carob Elixir | Elixirs | `$23.95` · Cart | Beyond-six decision and item facts required | KEEP current; replacement HOLD | `PRIVATE-PREVIEW-ONLY` |
| 22 | Spiced Carob Elixir | Elixirs | `$26.95` · Cart | Same | KEEP current; replacement HOLD | `PRIVATE-PREVIEW-ONLY` |
| 23 | Carob Bananas | Bananas | From `$2.99` · Cart | Beyond-six decision and item facts required | KEEP preview; replacement live-use HOLD | `PRIVATE-PREVIEW-ONLY` |
| 24 | Carob Powder | Powder | `$14.95` · Cart | Beyond-six decision and item facts required | GO/KEEP current certified powder pile | `PRIVATE-PREVIEW-ONLY`; media GO does not approve content |

Count controls: 24 total; Bars 6, Moons 6, Eclipses 6, Bites 2, Elixirs 2, Bananas 1, Powder 1. There are 18 cards beyond the six-bar rule. Four are enquiry-only: Pure Carob Moon, Cayenne Moon, Goji Carob Bites and Coconut Carob Bites. Goji and Coconut Bites differ by name, description and asset binding.

## Positive-controlled risk scan

Each detector was first run against an injected canary phrase. All 11 canaries fired, so a zero candidate result is meaningful rather than a broken regex.

| Risk class | Canary | Candidate/result |
|---|---:|---|
| Health/diet | PASS | Visible hits: Home 2, Our Story 22, Shop 21, Stockists 2, Pure PDP 2. Material unsupported claims are listed above. |
| Origin | PASS | Visible hits on five routes. Bounded Australian-grown carob wording is approved; broader location/organic claims need sources. |
| Manufacturing | PASS | Visible hits on five routes, including hand-moulded/roasted/crafted/production language. Item-level proof absent. |
| Availability/commerce | PASS | Visible hits on all seven routes. Cart, shipping, price, stockist and online-range implications are production-blocking. |
| Caffeine | PASS | Exact FAQ answer appears once; broader visible hits: Home 3, Our Story 6, Carob Story 4, Shop 24, Pure PDP 1. Required no-broader-claim condition is not met. |
| Internal vocabulary | PASS | Zero in default route text; explicit cart states contain review/demo language and are private-preview-only. |
| Testimonials | PASS | Zero visible testimonial/review claims across all seven routes. |
| Superlative/sensory | PASS | Hits on Home, Our Story, Carob Story, Shop and Pure PDP; preserve authored copy but source/decide before production. |
| Prices | PASS | 32 visible price hits on Shop and 6 on Pure PDP; no governed price catalogue was found. |
| Placeholder links | PASS | DOM reports zero empty/`#`/JavaScript placeholder destinations. One raw-source regex hit is a JavaScript selector fragment `a[href="#'+section.id+'"]`, a positive-controlled false positive, not an anchor destination. |
| Personal-data fields | PASS | Email controls exist on Home and hidden Stockists newsletter. Test input was cleared, not stored and sent no mutation request. Open carts contain zero personal-data inputs. |

Additional runtime controls: 14 route/width cases returned HTTP 200; measured client widths and scroll widths were exactly 390/390 or 1440/1440; all images were complete with nonzero natural dimensions; no console, page, failed-request or local HTTP error occurred. External requests were limited to Adobe Typekit GETs. No POST/PUT/PATCH/DELETE request occurred.

## Nate-only decision register

| ID | Exact decision needed | Recommendation without choosing |
|---|---|---|
| `NATE-CONTENT-01` | Six named bars or current 24-card catalogue for production? If 24, which exact item facts/prices/actions are approved? | Keep 24 only in protected preview. For production, either retain six bars or supply a dated, item-level catalogue source that explicitly supersedes `CNT-001`. |
| `CV-014`, `CV-051`, `CV-062` | Which mapped live occurrence, if any, may be removed or changed under `DEC-010`? | Do not edit. Require an occurrence map with exact page/text/source; zero phrase matches is not closure. |
| `NATE-CONTENT-02` | Which source, owner and refresh cadence governs stockists, and what public count may be claimed? | Confirm the 197 eligible records or use nonnumeric `Find a stockist` wording; do not claim `200+` from the current public count alone. |
| `NATE-CONTENT-03` | Which label/price/availability source governs each product? | Approve per item and date; do not infer from card copy, a media manifest or visual identity. |
| `NATE-CONTENT-04` | Should production collect newsletter signups, show a non-collecting demo, or remove the form? | Choose one capability before implementation. If non-collecting, disclose before entry; if collecting, require destination, consent/privacy and delivery proof. |
| `NATE-CONTENT-05` | Is production a real connected shop or an enquiry-only site? | Remove/relabel demo commerce for an enquiry-only release, or supply real checkout/inventory/shipping authority and implementation separately. |
| `NATE-CONTENT-06` | Which broader caffeine, health/diet, formulation and manufacturing claims are supported or individually preserved? | Present exact occurrences in the smallest page packets. Preserve Carli-requested copy until Nate signs each correction; never apply a blanket rewrite. |

## Smallest ordered correction packets after authority

1. **Catalogue authority packet** — decision only first. Inputs: Nate's six-versus-24 choice and an item-level catalogue/label/price source. Potential files after approval: `homepage.html`, `shop.html`, `pure-carob-bar.html`. No media change.
2. **Commerce truth packet** — choose enquiry-only or connected shop, then align Home trust strip/Shop controls/cart language and the Home newsletter before any production release. Potential files: `homepage.html`, `shop.html`, `mock-cart.js`; newsletter privacy/destination evidence required.
3. **Stockist truth packet** — establish list source, owner and cadence; reconcile 197 public-eligible records with all `200+` surfaces. Potential files: `stockists.html`, `homepage.html`; no fabricated map/geolocation.
4. **Claim decision packets** — one route at a time, beginning Our Story, then Shop/Pure PDP, FAQ non-caffeine answers, Home and Carob Story. Each packet must map exact occurrence → Carli/source status → Nate decision → bounded replacement if authorised.
5. **Metadata/structured-data mirror packet** — only after visible copy decisions; mirror approved truth into descriptions, JSON-LD and alt text. Do not let metadata preserve a rejected claim.
6. **Image-binding packet remains separate** — the current matrix holds all new swaps except the already-certified powder pile; product identity does not grant image live-use authority.

## Render and evidence interpretation

- Authoritative default proofs are `*_390_default.png` and `*_1440_default.png`: real CSS, fixed 1000px viewport, cart closed/inert, mobile drawer closed.
- Authoritative dynamic proofs are the explicit `*_drawer.png`, `*_cart.png`, Shop `cart-item/checkout/complete`, FAQ caffeine-open and newsletter-review screenshots.
- The earlier `*_full.png` files are retained as raw acquisition evidence but excluded from visibility classification: Chromium's `fullPage` capture expanded the viewport and painted the fixed off-canvas cart layer mid-page even though DOM evidence recorded it closed and inert. No content conclusion relies on those raw full-page composites.
- Contact sheets: `contact-default-390.png`, `contact-default-1440.png`, `contact-dynamic-390.png`, `contact-content-states.png`.
- Machine evidence: `browser-results.json`, `default-state-results.json`, `content-state-results.json`, `analysis-results.json` plus their generating scripts in the exact evidence directory.

## Final release consequence

The protected preview may continue for review with the explicit cart disclosure and non-saving form behaviour. Production promotion remains **HOLD** until Nate supplies the decisions above and separately authorises the resulting correction packets. This audit itself authorises no implementation, deploy, alias movement, client message or product-image swap.
