# MapleMoon content and catalogue truth audit R2 — 2026-08-14

## Current verdict

**Audit complete; HOLD the seven-page candidate for production content release.** The unchanged candidate remains usable as a protected private preview, but catalogue authority, item facts, broad claims, commerce mode, stockist provenance and media live-use authority still require explicit decisions.

This review **supersedes the first review** because R2 reconciles whole-file Styles Kit source drift through stable material projections. The first review and all first-audit evidence remain preserved byte-for-byte and are labelled `superseded-by-R2 due source drift`; they were not deleted or edited.

No candidate, Styles Kit, source, media, header, cart, deployment, production or client surface was changed.

The only photography completion figure in this review is **5 wired `photo_finals` heroes / 14 eligible V9 frames = 36%**. Product-card assets and review-only derivatives do not count toward it.

## R2 source reconciliation

| Surface | R2 result | Consequence |
|---|---|---|
| Material RULE-REGISTER projection: `kitVersion`; `CNT-001`–`CNT-005`; `CMP-010`; `MEDIA-001/002`; `DEC-010`–`DEC-012`; five named sources | SHA-256 `6a9492f98aa6194e096200d42ba0d3ff97ffe3af14c7ea263f75d6fb0e8d4690` at acquisition and close | Governing content/media authority is stable. |
| Exact DECISIONS text from `DEC-010` through end of `DEC-012` | SHA-256 `d9bfeb4dcb2d9d907972fea627d93da53b5a9330c67da5f97947fd4d3884b82a` at acquisition and close | Carli-copy, caffeine and six-bar media boundaries are stable. |
| Whole-file `DECISIONS-NEEDED.md`, `SOURCE-REGISTER.md`, `RULE-REGISTER.json` | Observed only; documentation-consistency edits changed full-file hashes | No HOLD because neither material projection moved. |
| `CNT-005` / `DEC-011` | `APPROVED` for the exact FAQ question and answer | The first review's exact-answer classification remains correct. Broader finished-product caffeine claims remain evidence-gated. |
| Catalogue, price, commerce, stockist, claim and media authority | No item-level superseding authority exists in the current material projection | All decision-bound entries below remain open. |

The current material authority still says Home and Shop show exactly six named bars (`CNT-001`), preserves Carli-requested copy pending case-level Nate decisions (`CNT-002`/`DEC-010`), prohibits unsupported health/diet claims (`CNT-003`), prohibits fake live commerce/stockist capability (`CNT-004`), limits caffeine approval to exact wording (`CNT-005`/`DEC-011`), prohibits internal review language (`CMP-010`), and keeps image identity/render proof gated (`MEDIA-001/002`, `DEC-012`).

## Status vocabulary

| Status | Meaning |
|---|---|
| `APPROVED` | Exact bounded wording or identity has current dated authority. |
| `PRESERVE-CARLI-PENDING-NATE` | Existing requested copy remains untouched until Nate decides the mapped live occurrence. |
| `PRIVATE-PREVIEW-ONLY` | Acceptable only inside the protected review context; not production authority. |
| `PRODUCTION-BLOCKER` | Unsupported truth or capability prevents unchanged production release. |
| `UNKNOWN` | The pinned authority supplies no sufficient item-level source, owner or date. |

## Seven-route truth matrix

Common dynamic state: all default routes render with the cart closed, `aria-hidden=true` and inert. All 14 explicit cart renders open without personal-data fields or mutation requests and disclose that no order, payment or personal information is submitted. That is `PRIVATE-PREVIEW-ONLY`. Labels including `Add to cart`, `Continue to checkout`, `Place demo order`, `review checkout`, `demo order` and `connected live store` remain `PRODUCTION-BLOCKER` under `CNT-004`/`CMP-010`. All seven 390px drawers open to six real navigation rows and are separate from content authority.

| Route | Visible claims/content | Metadata and alt text | Actions, forms and dynamic text | Current status / exact decision |
|---|---|---|---|---|
| Home | Hero claims `Australian organic carob`, `Naturally Sweet, Nothing Added`, `No Caffeine`, `Organic Ingredients`, `Vegan Friendly`; six named bars plus six category controls; `guilt-free perfection`, `without the sugar crash`; starter set and `200+ locations` | Description broadens to bars/moons/bites/elixirs, vegan/GF/caffeine-free and far-north-coast claims; alts accurately name bound products/farm/ritual scenes but do not create media authority | `Shop Now` opens email despite a shop label; `Free Shipping over $99`, `Secure payments`; visible email form looks live until post-submit notice says the email was not saved | Six names `APPROVED`; broader catalogue `PRIVATE-PREVIEW-ONLY`; claims/commerce/form `PRODUCTION-BLOCKER` or `PRESERVE-CARLI-PENDING-NATE`. Nate must decide catalogue scope, claim evidence and commerce/newsletter mode. |
| Our Story | Founder narrative contains health, gut/digestive, child development, stimulant/sleep, whole-body nourishment, peak-performance and nervous-system claims; bounded Australian-grown wording also appears | Four valid JSON-LD blocks repeat organisation/category/diet/location assertions; founder/farm/range alts describe the files but live-use remains separate | Internal links `Read our story`, `Shop the range`, `Try Maple Moon` are honest | Bounded Australian-grown carob `APPROVED`; health/diet/formulation/manufacturing claims `PRESERVE-CARLI-PENDING-NATE` and production-blocking until exact occurrence decisions/evidence. Structured data follows the same gates. |
| Carob Story | Pod/not-bean and Australian-grown ingredient education; carob/cacao comparison; multiple caffeine-free assertions; sensory/range language | No description meta; AI/study/origin alts describe rendered subjects but do not prove provenance/live use | `Shop the range` destination is honest | Pod/not-bean and bounded Australian-grown wording `APPROVED`; caffeine assertions outside the exact FAQ answer and broader sensory/catalogue claims remain `UNKNOWN` / `PRODUCTION-BLOCKER`. |
| Shop | Exactly 24 cards: six bars plus 18 products across Moons, Eclipses, Bites, Elixirs, Bananas and Powder; item descriptions, diet badges, manufacture terms, prices, options and availability | Description asserts the broad range, diet and Australian-organic facts; all 24 alts name their candidate cards | 20 `Add to cart`; four mailto `Enquire`; `Every flavour, right to your door`; browser-local cart/checkout/demo completion | Six identities `APPROVED`; 18 additions `PRIVATE-PREVIEW-ONLY`; item facts and commerce `PRODUCTION-BLOCKER` pending explicit catalogue source and operating mode. Goji/Coconut Bites remain distinct. |
| FAQ | Exact `Does carob contain caffeine?` answer; other answers assert virtually caffeine-free cacao butter, perfect tempering, no extra sugars, no emulsifiers/stabilisers/refined sugars and exact 15–25°C storage | Neutral description; no image claim surface | Accordions expose answers only when opened; email, wholesale, stockist and support links are honest destinations | Exact caffeine answer occurs once and is `APPROVED` under `CNT-005`/`DEC-011`. Other formulation/manufacturing/storage assertions are `UNKNOWN` / `PRODUCTION-BLOCKER` pending item evidence; preserve authored copy until authorised. |
| Stockists | Hero/meta/results say `200+`; filter announces `All states, 197 stockists`; source array contains 204, seven withheld `UNKNOWN`, 197 public-eligible; wholesale/full-range claims | Description repeats `200+`; one accurately descriptive range alt | Eight initial results, 189 remaining; real state/type filters; no map/distance/hours; hidden email form emitted no request and stored no email | Directory mechanics `PRIVATE-PREVIEW-ONLY`; numeric/source truth `PRODUCTION-BLOCKER` until verified source, owner and cadence. Nate must choose supported count or nonnumeric wording. |
| Pure Carob Bar | Approved product name plus `$12.95`, 90g, Vegan/GF/No Caffeine, two-ingredient and guilt-free claims; five related bar names | No robots meta; description repeats size/diet; product alts accurately name bound files without granting live-use authority | `Ask about this item` is honest mailto; safety/storage caveats and internal links are honest | Six-bar identity `APPROVED`; size/price/diet/formulation claims `UNKNOWN` / `PRODUCTION-BLOCKER` without governed label/price source. |

## Complete current 24-card catalogue matrix

Every action below is review state only. `Cart` is browser-local demonstration; `Enquire` is mailto. Candidate presence is not production approval.

| # | Product | Category | Candidate offer | Content authority | Image authority | Release status |
|---:|---|---|---|---|---|---|
| 1 | Pure Carob & Cacao Butter | Bars | `$12.95` · Cart | Name/six-item scope `APPROVED`; facts `UNKNOWN` | KEEP certified preview; final release confirmation pending | `PRIVATE-PREVIEW-ONLY`; commerce/facts block production |
| 2 | Peppermint & Buckwheat | Bars | `$12.95` · Cart | Name/six-item scope `APPROVED`; facts `UNKNOWN` | KEEP certified preview; final release confirmation pending | Same |
| 3 | Roasted Hazelnut | Bars | `$12.95` · Cart | Name/six-item scope `APPROVED`; facts `UNKNOWN` | KEEP certified preview; final release confirmation pending | Same |
| 4 | Coconut & Goji | Bars | `$12.95` · Cart | Name/six-item scope `APPROVED`; facts `UNKNOWN` | KEEP certified preview; final release confirmation pending | Same |
| 5 | Cayenne Chilli | Bars | `$12.95` · Cart | Name/six-item scope `APPROVED`; facts `UNKNOWN` | KEEP certified preview; final release confirmation pending | Same |
| 6 | Almond & Celtic Salt | Bars | `$12.95` · Cart | Name/six-item scope `APPROVED`; facts `UNKNOWN` | KEEP certified preview; final release confirmation pending | Same |
| 7 | Pure Carob Moon | Moons | Enquire · made to order | 24-card production authority absent | KEEP private preview; swap/production HOLD | `PRIVATE-PREVIEW-ONLY` |
| 8 | Peppermint Moon | Moons | From `$2.50` · Cart | 24-card/item authority absent | KEEP private preview; inferred finish HOLD | `PRIVATE-PREVIEW-ONLY` |
| 9 | Roasted Hazelnut Moon | Moons | From `$2.50` · Cart | Same | KEEP private preview; finish HOLD | `PRIVATE-PREVIEW-ONLY` |
| 10 | Coconut & Goji Moon | Moons | From `$2.50` · Cart | Same | KEEP private preview; inferred finish HOLD | `PRIVATE-PREVIEW-ONLY` |
| 11 | Cayenne Moon | Moons | Enquire · made to order | 24-card authority absent; candidate pending | KEEP private preview; finish HOLD | `PRIVATE-PREVIEW-ONLY` |
| 12 | Almond Moon | Moons | From `$2.50` · Cart | 24-card/item authority absent | KEEP private preview; binding HOLD | `PRIVATE-PREVIEW-ONLY` |
| 13 | Pecan Nut Eclipse Bite | Eclipses | `$5.99–$59.99` · Cart | 24-card/item authority absent | KEEP preview; replacement live-use HOLD | `PRIVATE-PREVIEW-ONLY` |
| 14 | Salted Almond Eclipse Bite | Eclipses | `$5.99–$59.99` · Cart | Same | KEEP preview; replacement live-use HOLD | `PRIVATE-PREVIEW-ONLY` |
| 15 | Hazelnut Eclipse Bite | Eclipses | `$5.99–$59.99` · Cart | Same | KEEP preview; repaired replacement HOLD | `PRIVATE-PREVIEW-ONLY` |
| 16 | Goji Ripe Eclipse Bite | Eclipses | `$5.99–$59.99` · Cart | Same | KEEP preview; reference/live-use HOLD | `PRIVATE-PREVIEW-ONLY` |
| 17 | Salted Caramel Fudge | Eclipses | `$5.99–$59.99` · Cart | Same | KEEP preview; exact reference/live-use HOLD | `PRIVATE-PREVIEW-ONLY` |
| 18 | Eclipse Bite Bundle | Eclipses | `$24.99` · Cart | Bundle facts/24-card authority absent | KEEP baseline only; release/swap HOLD | `PRIVATE-PREVIEW-ONLY` |
| 19 | Goji Carob Bites | Bites | Enquire · made to order | Distinct identity confirmed; offer facts pending | GO identity / KEEP source; derivative swap HOLD | `PRIVATE-PREVIEW-ONLY` |
| 20 | Coconut Carob Bites | Bites | Enquire · made to order | Distinct candidate identity; broader authority pending | KEEP preview; replacement live-use HOLD | `PRIVATE-PREVIEW-ONLY` |
| 21 | Pure Carob Elixir | Elixirs | `$23.95` · Cart | 24-card/item authority absent | KEEP current; replacement HOLD | `PRIVATE-PREVIEW-ONLY` |
| 22 | Spiced Carob Elixir | Elixirs | `$26.95` · Cart | Same | KEEP current; replacement HOLD | `PRIVATE-PREVIEW-ONLY` |
| 23 | Carob Bananas | Bananas | From `$2.99` · Cart | 24-card/item authority absent | KEEP preview; replacement live-use HOLD | `PRIVATE-PREVIEW-ONLY` |
| 24 | Carob Powder | Powder | `$14.95` · Cart | 24-card/item authority absent | GO/KEEP current certified powder pile | `PRIVATE-PREVIEW-ONLY`; media GO does not approve content |

Accounting: 24 total; Bars 6, Moons 6, Eclipses 6, Bites 2, Elixirs 2, Bananas 1, Powder 1. Eighteen are beyond the six-bar authority. Four are enquiry-only: Pure Carob Moon, Cayenne Moon, Goji Carob Bites and Coconut Carob Bites. Goji and Coconut Bites remain distinct in name, description and asset binding.

## Positive-controlled evidence

All eleven detector canaries fired on R2 re-run: health/diet, origin, manufacturing, availability/commerce, caffeine, internal vocabulary, testimonials, superlative/sensory, prices, placeholder links and personal-data fields.

- Exact FAQ question/answer: once in source and once in rendered DOM; both 390px and 1440px open-state renders match the exact approved text.
- Broader caffeine hits remain on Home, Our Story, Carob Story, Shop and Pure Carob Bar. They are not broadened into `CNT-005` approval.
- Testimonials: zero visible hits on all seven routes.
- Placeholder destinations: zero actual DOM placeholders. The one raw Shop regex hit is a JavaScript selector fragment, not a link destination.
- Data: open carts contain no personal-data fields; newsletter test input clears, is not stored and sends no mutation request. The delayed `Review preview` notice still makes the visible Home form production-blocking.
- Stockists: 204 source records, seven withheld as `UNKNOWN`, 197 public-eligible; eight initially rendered and 189 remaining.
- Candidate and cart: seven page hashes plus `mock-cart.js` and `mock-cart.css` match the R2 packet.

## Exact Nate-only decision register

| Decision | Exact unresolved question | Safe holding state |
|---|---|---|
| Six versus 24 | Does production remain the six named bars, or does Nate explicitly supersede `CNT-001` and approve each of the other 18 identities, facts, prices and actions? | Preserve 24 only in protected preview. Do not delete or endorse. |
| `CV-014`, `CV-051`, `CV-062` | Which source-mapped live occurrence, if any, may change under `DEC-010`? | Exact phrases have zero current candidate occurrences, but that does not close unmapped case IDs. Require occurrence map; do not edit. |
| Stockist truth | Which verified source, owner and refresh cadence governs the directory, and what count may be public? | Use no unsupported numeric production claim; 197 public-eligible is the measured candidate count, not automatic client approval. |
| Item facts | Which current product label/price/availability record governs every card and Pure PDP? | Require dated per-item authority; do not infer from media identity. |
| Commerce mode | Is production enquiry-only or a real connected shop? | Keep demo/cart in protected review only; align or remove before production after Nate decides. |
| Newsletter/contact mode | Should the site collect, visibly simulate without collection, or omit the form? | Keep review-only; no collection without destination, consent/privacy and delivery proof. |
| Broader claims | Which health/diet/caffeine/formulation/manufacturing occurrences have proof or individual preserve/change approval? | Preserve Carli-requested copy; review exact occurrences in smallest route packets. |
| Media live use | Which exact source/derivative/hash/crop is approved for each slot? | Preserve certified preview bindings; only current powder pile is GO/KEEP. No plural swap wave. |

## Ordered correction packets after authority

1. **Catalogue authority:** Nate chooses six or item-by-item 24; supply labels, prices and availability. Then scope only Home, Shop and Pure PDP content.
2. **Commerce and newsletter truth:** choose enquiry-only versus connected commerce and collection mode; align Home, Shop and cart language/capability.
3. **Stockist truth:** establish source, owner and cadence; reconcile all numeric surfaces without adding a fake map.
4. **Route claim packets:** Our Story first, then Shop/Pure PDP, FAQ non-caffeine answers, Home and Carob Story. Each maps exact text → source/Carli status → Nate decision → authorised bounded replacement.
5. **Metadata/structured-data mirror:** only after visible-copy decisions; mirror approved truth into descriptions, JSON-LD and alts.
6. **Image binding stays separate:** admit one exact asset/slot only after explicit live-use authority and rendered proof.

## Evidence and visual re-open

R2 machine evidence is in `_wip/evidence/content_catalogue_truth_audit_r2_20260814T164221`:

- `material-rule-projection.jsonl` and `decision-010-through-012.md` are the exact pinned projections.
- `acquisition-results.json` and `close-results.json` verify fixed hashes, projections, inherited hashes/PNGs, detector controls, counts and visibility.
- `visual-faq-home-pairs.png` re-opens FAQ caffeine, Home default and newsletter-review at 390/1440.
- `visual-shop-pairs.png` re-opens Shop default, cart and checkout at 390/1440.

The first audit's 63 PNGs are all present, nonblank and dimensioned. Its 14 route renders, 14 default-state renders and two content-state cases remain bound to unchanged candidate/cart hashes. The first `verification-results.json` is preserved with its whole-file drift failure; R2 resolves that drift through the two material projections rather than rewriting the old evidence.

## Release consequence

The protected preview may continue for review. Production promotion remains **HOLD** until Nate supplies the decisions above and separately authorises the smallest correction packets. This R2 audit authorises no implementation, content mutation, asset wiring, deployment, alias movement, commit, push, deletion, client message or external action.
