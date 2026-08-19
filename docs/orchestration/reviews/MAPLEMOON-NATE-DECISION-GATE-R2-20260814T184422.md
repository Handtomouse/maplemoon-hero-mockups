# MapleMoon Nate decision gate R2 — 2026-08-14 18:44 AEST

## Primary decision sheet

This sheet records choices only. It authorises no implementation, asset binding, deployment, production movement or client contact. The current protected candidate remains unchanged and production remains frozen on immutable token `7vjf2m50b`.

### D01 — Production catalogue

**Choose one:**

- `[ ] A — RECOMMENDED:` Production shows only the six currently approved bars: Pure Carob & Cacao Butter; Peppermint & Buckwheat; Roasted Hazelnut; Coconut & Goji; Cayenne Chilli; Almond & Celtic Salt. Keep the other 18 candidate cards private-review-only.
- `[ ] B:` Production uses the 24-product catalogue, but only after Nate supplies or signs a dated item-by-item register approving each additional identity, description, label fact, price, option, availability state and action. Checking B without that register records intent but does not admit implementation.

**Impact:** A is the smallest truthful release scope. B retains the broad range but creates 18 separate fact/offer approval rows; private-preview presence is never authority.

**Later packet file scope:** `/Users/handtomouse/maplemoon_build_20260813/homepage.html`, `/Users/handtomouse/maplemoon_build_20260813/shop.html`, and any approved product-fact mirror in `/Users/handtomouse/maplemoon_build_20260813/pure-carob-bar.html`. Media remains a separate gate.

**Nate records:** `D01 = A / B` and, for B, attaches the dated 24-item register.

### D02 — Production commerce mode

**Choose one:**

- `[ ] A — RECOMMENDED:` Truthful enquiry-only static experience. Remove or relabel all checkout/cart implications and use honest mailto enquiry actions; the browser-local cart remains private-preview evidence only.
- `[ ] B:` Real connected commerce, separately scoped with live product/inventory authority, checkout/payment, shipping, order delivery and privacy evidence. The current mock cart is not checkout and cannot be promoted as B.

**Impact:** A is a bounded content/capability correction. B is a separate commerce implementation project, not a wording switch.

**Exact current surfaces:** all seven `[data-mm-cart-toggle]` controls; Shop priced-card `.add` actions and open cart state (`aria-hidden=false`, inert removed); visible labels `Add to cart`, `Continue to checkout`, `Place demo order`, `review checkout`, `demo order`, `connected live store`; Shop `.sp-opening .sp-head p` text `Every flavour, right to your door, for every type of ritual`; Home `#pdpAdd` text `Shop Now`; Home `.wf-trust` text `Free Shipping / Orders over $99` and `Secure payments / Safe and easy checkout`.

**Later packet file scope:** all seven page files for shared cart triggers, `/Users/handtomouse/maplemoon_build_20260813/shop.html`, `/Users/handtomouse/maplemoon_build_20260813/homepage.html`, `/Users/handtomouse/maplemoon_build_20260813/pure-carob-bar.html`, plus shared `mock-cart.js` and `mock-cart.css` only under a separately checkpointed packet.

**Nate records:** `D02 = A / B`.

### D03 — Public stockist truth

**Choose one:**

- `[ ] A:` Publish `197 stockists`, explicitly confirming the candidate arithmetic `204 source records − 7 withheld UNKNOWN = 197 public-eligible`, and name the source owner and refresh cadence below.
- `[ ] B — RECOMMENDED:` Use nonnumeric `Find a stockist` wording until a source owner and refresh cadence are confirmed. Do not retain `200+` by inertia.

**Impact:** A keeps a numeric claim but makes its custody auditable. B removes the unsupported-number risk while preserving the working directory/filter experience.

**Exact current surfaces:** Home `.wf-trust` text `200+ locations across Australia`; Stockists meta description; Stockists `.sp-head p` and `.st-proof-row` `200+` claims; state-filter accessible labels; `#stockistCount` live state `Showing 8 of 197 stockists.` with 189 remaining.

**Later packet file scope:** `/Users/handtomouse/maplemoon_build_20260813/homepage.html` and `/Users/handtomouse/maplemoon_build_20260813/stockists.html`.

**For A, Nate supplies:** `Owner = ______`; `source = ______`; `refresh cadence = ______`; `as-of date = ______`.

**Nate records:** `D03 = A / B`.

### D04 — Newsletter/contact collection

**Choose one:**

- `[ ] A — RECOMMENDED:` Remove the collection forms until a real endpoint and consent/privacy path exist. Keep direct mailto contact links.
- `[ ] B:` Keep a visibly disabled/non-collecting surface that states this before a visitor enters an email. No post-submit-only disclosure.
- `[ ] C:` Approve real collection only with a named submission endpoint, consent wording, privacy destination, owner, retention rule and delivery proof.

**Impact:** A has the lowest privacy and expectation risk. B preserves layout without pretending to collect. C creates a separately testable data flow.

**Exact current surfaces:** Home `.wf-nl form` is visually active (`Your email`, `Join`), then clears without storage/request and reveals a delayed `Review preview` notice; Stockists `.st-news .st-form` is non-submitting with a disabled `Coming soon` button but still invites `Leave your email`.

**Later packet file scope:** `/Users/handtomouse/maplemoon_build_20260813/homepage.html` and `/Users/handtomouse/maplemoon_build_20260813/stockists.html`; C additionally requires a separately named endpoint/privacy implementation outside this static candidate.

**Nate records:** `D04 = A / B / C`.

### D05 — Customer-visible claims and case-level Carli decisions

**Choose one production policy:**

- `[ ] A:` Approve only individually listed current occurrences that carry named, dated evidence. Attach evidence beside every approved row in the appendix; an unchecked row stays held.
- `[ ] B — RECOMMENDED:` For production, keep the exact approved FAQ caffeine question/answer and the already approved bounded pod/not-bean and Australian-grown statements; scope neutralisation/removal of broader unsupported claims. Preserve Carli-requested copy in the protected preview and source record.
- `[ ] C:` Preserve the current candidate claims unchanged in private review only and keep production content release on HOLD.

**Impact:** B creates the smallest evidence-bounded production claim set without implying that one approved caffeine sentence validates finished products. A can preserve more copy but requires occurrence-level proof. C changes nothing but cannot release production.

**Exact approved caffeine boundary:** FAQ `#caffeine .faq-question` and `#caffeine-answer` only:

> Does carob contain caffeine?  
> Carob itself is naturally caffeine-free. Its mellow, naturally sweet flavour works beautifully in bars, baking and warm drinks. Maple Moon recipes vary, so please check the individual product label for the full ingredient list.

This evidence supports carob itself only. It does not approve finished-product caffeine, health, diet, sugar, origin, ingredient, taste, availability, formulation or manufacturing claims.

**CV-014 / CV-051 / CV-062 gate:** the pinned decision evidence names `smooth carob`, `slow-roasted carob`, `Maple Moon mills carob`, and `handmade in small batches`. All four exact strings have zero occurrences across the unchanged seven candidate pages plus shared cart. The pinned R2 review supplies no source-backed mapping from any one CV ID to a current route, exact string or selector. Therefore all three remain `WAIT FOR OCCURRENCE MAP`; Nate is not asked to approve an invented mapping, and no candidate file becomes eligible from these IDs alone.

**Later packet file scope after A or B:** exact selected occurrences only in `/Users/handtomouse/maplemoon_build_20260813/homepage.html`, `our-story.html`, `carob-story.html`, `shop.html`, `faq.html`, `stockists.html`, `pure-carob-bar.html`; metadata/JSON-LD mirrors follow only after visible wording is decided.

**Nate records:** `D05 = A / B / C`. For A, annotate the appendix rows and attach evidence. CV cases remain pending until mapped.

### D06 — Exact elixir v4 live use

Mechanical/render PASS does not certify label, ingredient, nutrition, compliance or fine-print fidelity. Fine packaging text is reconstructed.

| Named slot | Exact review input SHA-256 | Choose one | Conservative recommendation | Current candidate destination |
|---|---|---|---|---|
| Pure Carob Elixir | `70f93f414902ae1b10e7ae1416954348aa20bd1d6950e37d05979b4e4aa9eb93` | `[ ] APPROVE` / `[ ] REJECT` | **RECOMMENDED: REJECT for this release; KEEP current** | `assets/product_shots/elixir_plain.webp`; Shop binds `elixir_plain` |
| Spiced Carob Elixir | `414f727e84ca0dc24749b10b1092f4618e9f9fc9b954304442a7a0a8779749bb` | `[ ] APPROVE` / `[ ] REJECT` | **RECOMMENDED: REJECT for this release; KEEP current** | `assets/product_shots/elixir_spiced.webp`; Shop binds `elixir_spiced` |

**Impact:** REJECT leaves the certified preview bindings untouched. APPROVE accepts reconstructed-label live use for that exact input hash and named slot only; it does not approve conversion, crop, output bytes or an overwrite. A later packet must pin the exact destination/output hash and rendered proof before touching `/Users/handtomouse/maplemoon_build_20260813/shop.html` or either slot file.

**Nate records separately:** `D06-PURE = APPROVE / REJECT`; `D06-SPICED = APPROVE / REJECT`.

## Dependency and release gates — no Nate choice requested yet

### D07 — WAIT FOR EVIDENCE: exact live media

Do not convert missing source/approval into a binary approval request. Our Story founder use at `.os-story-hero__portrait img` (`01_founders_hero_v03.webp`) and both `.os-founder-note__portrait img` files (`founder_carli.webp`, `founder_dylan.webp`) still require governed source, exact derivative/hash, crop intent, grade, 1440/390 proof and explicit live-slot approval.

For products, the sole already approved current media is `powder_roasted.webp` SHA-256 `40efa1836bffcf69b44084291b1996f8dc7a70d6f4bcef22e658904fa8a26eaf` in the Carob Powder slot. Every other product slot remains dependency-first for new/replacement live media: six Bars, six Moons, six Eclipses, Goji Carob Bites, Coconut Carob Bites, Pure and Spiced Elixirs, and Carob Bananas. D06 can resolve only the two exact v4 input decisions; any other source, crop, conversion or output remains held.

The only photography-completion figure is **5 wired `photo_finals` hero files / 14 eligible V9 frames = 36%**. Review assets and product-card derivatives do not increase it.

### D08 — WAIT FOR EVIDENCE: Styles Kit implementation

Styles Kit v0.1.7 is a pinned planning record only. Its owner is actively refining v0.2.0, so the moving outputs were not read or imported here. Wait for the v0.2.0 source task to close, then require a fresh independent Claude result containing both literal `PASS` and `Safe to feed intended Codex Boss: YES`. Only then may BOSS scope the final smallest rule slice. No current Nate implementation choice is requested.

### D09 — WAIT FOR RELEASE GATE: production movement

Production stays frozen on immutable token `7vjf2m50b`. After D01–D06, the smallest correction packets, any admitted exact media, the final Styles rule slice, integrated QA and a new private preview, production movement requires a separate explicit Nate instruction. Content approval does not move an alias, approve client contact or authorize production.

## Recommended smallest implementation order after decisions

1. Truth-critical catalogue, commerce, stockist, newsletter and exact-claim corrections from D01–D05.
2. Only exact media admitted by D06 or later dependency-complete D07 packets.
3. The final bounded Styles rule slice only after D08 closes.
4. Integrated QA and a new protected private preview.
5. D09 as a separate Nate production instruction.

Header/cart integration, native 200 percent browser zoom, local preflight and authenticated private-preview byte equality are already complete for the unchanged candidate. Do not reopen them unless an admitted mutation changes their inputs. Production and client contact remain frozen.

---

## Evidence appendix

### A. Pinned authority and unchanged candidate

All eight decision-source hashes matched at acquisition. Their completion and promotion gates replayed PASS. The unchanged seven candidate page hashes also match the pinned v0.1.7 intake record:

| Candidate page | SHA-256 |
|---|---|
| `homepage.html` | `27921b2a466ccb670b2851a73043429763d3423bcaf651069e4e860dc01a78b1` |
| `our-story.html` | `2db31868a9791f373f156e7cdeb8261e494d1d47e9418a94c28156e213df7711` |
| `carob-story.html` | `4fd9ad0fabb9d60d0f391925f5a382ccfc8f705b60fca1c681f403a5cd9734bd` |
| `shop.html` | `f111ad5123e34dadd46ac497fca286066efc67c05dd7e68f0d3e70c97c735038` |
| `faq.html` | `c5ce7aaf0b9b3221f34eb2928fc2ff6732fc1a915ea80144a4ade2b94011fb6e` |
| `stockists.html` | `4821adfe88680d4f174b7a8700c8d8a65594df2901bf3a7109d51b09040cb887` |
| `pure-carob-bar.html` | `015cde27ecc60f3c444820a551c39f6e9c985fc5b2e59bdaea5f496c1c236b65` |

### B. D01 catalogue accounting

The candidate has 24 cards: Bars 6, Moons 6, Eclipses 6, Bites 2, Elixirs 2, Bananas 1, Powder 1. Eighteen cards exceed the current six-bar authority. Four are enquiry-only: Pure Carob Moon, Cayenne Moon, Goji Carob Bites and Coconut Carob Bites. Goji and Coconut Bites are distinct. Candidate identity, price or image presence is not production authority.

### C. D03 stockist measurement

The candidate source array has 204 records; seven are withheld `UNKNOWN`; 197 are public-eligible. The default UI renders eight and reports 189 remaining. This is a measured candidate count, not an automatic client-approved public claim. Numeric release needs the D03-A owner/source/cadence record.

### D. D05 exact current claim occurrences

| Route/file | Exact selector/state | Exact current customer-visible strings or bounded claim surface | Current authority |
|---|---|---|---|
| Home / `homepage.html` | `.wf-peyebrow`; `.wf-ptag`; `.wf-pcreds` | `Australian organic carob`; `Naturally Sweet, Nothing Added.`; `No Caffeine`; `Organic Ingredients`; `Vegan Friendly` | Origin/organic/diet/finished-product claims need named evidence; not covered by the exact FAQ answer. |
| Home | `.q-when-lead`; `#range` CAT-rendered cards | `without the sugar crash`; `guilt-free perfection`; repeated `No caffeine`; product descriptions, sizes and facts | Broader health/diet/sugar/item facts held. |
| Our Story / `our-story.html` | `.os-story-hero__lead`; `.os-shared-story__card p` | `healthy, guilt-free treat ... confidently share with their children`; `what we eat affects how we feel, physically and emotionally`; `an explosion of sensation without caffeine or guilt`; `the vegan ultimate honeymooning experience`; `nourishment` | Preserve Carli copy in private review; production needs occurrence-level evidence/decision. |
| Our Story | `.os-founder-note__lead`; `.os-founder-note__more p` | `gut and digestive issues`; food/nutrition effect on `behaviour, growth and development`; cacao `heavy stimulants`, sleep and `smaller, developing bodies`; `whole-body nourishment`; `optimise his health`; `achieving peak performance`; `guilt-free treats that people could genuinely feel good about eating` | Health, child-development, stimulant, sleep, diet and performance claims held. |
| Our Story | `#ingredient p`; `#carob p`; `.os-close p`; `script[type="application/ld+json"]` | `Naturally sweet, caffeine free`; `without the buzz or stimulation of caffeine`; `Caffeine-free. Gentle and grounding.`; `A moment of care for your nervous system`; organisation/category/diet/location assertions | Bounded Australian-grown ingredient wording approved; broader finished-product/health/structured-data claims follow visible-copy gates. |
| Carob Story / `carob-story.html` | `.hero .bodycopy`; `.credrow`; comparison table; `.faq details` | `naturally sweet pod, not a bean`; `Australian-grown carob`; `Caffeine free`; `Naturally caffeine free`; `Contains caffeine`; `Carob is naturally caffeine free.` | Pod/not-bean and bounded Australian-grown wording approved. Broader caffeine/sensory/range assertions remain held outside FAQ exact wording. |
| Shop / `shop.html` | `.sp-opening .sp-head p`; `.sp-sec .sub`; `.grid[data-cat]` CAT-rendered cards | `Every flavour, right to your door`; `naturally sweet and caffeine free`; item descriptions, diet badges, manufacture terms, prices, options and availability for 24 cards | Six identities approved; 18 additions and all ungoverned item facts/actions held. |
| FAQ / `faq.html` | `#caffeine .faq-question`; `#caffeine-answer` | Exact approved question/answer reproduced in D05 | `APPROVED` for exact wording only. |
| FAQ | `#cacao-butter-answer`; `#maple-in-it-answer`; `#storage-answer` | `virtually caffeine-free`; `perfectly temper our carob`; `smooth, creamy finish`; `don’t ADD any extra sugars or sweeteners`; `without emulsifiers, stabilisers or refined sugars`; `between 15°C and 25°C` | Formulation, manufacturing, sugar and storage claims held pending item evidence. |
| Stockists / `stockists.html` | `.st-trade-copy p` | `full carob range: bars, moons, bites and elixirs, all made from Australian organic carob` | Catalogue/origin/manufacturing breadth held; numeric claims are D03. |
| Pure Bar / `pure-carob-bar.html` | `.chips`; `.pd-d`; `.pd-size`; `.pd-facts`; `.pcard .pr` | `Vegan`; `GF`; `No Caffeine`; `only two wholefood ingredients`; `guilt-free perfection`; `90g`; `$12.95` | Name/six-bar identity approved; diet, formulation, size and price held without governed product source. |
| CV-014 / CV-051 / CV-062 | Route `UNMAPPED`; selector `UNMAPPED`; current exact-string state `0 occurrences` | `smooth carob`; `slow-roasted carob`; `Maple Moon mills carob`; `handmade in small batches` | `WAIT FOR OCCURRENCE MAP`; zero-string scan is not closure and creates no edit authority. |

### E. D06 and D07 media boundary

The v4 pair independently passes identical 586×977 shared-silhouette geometry, clean-edge rendering at white/grey/black and measured 390/900/1440, and an unwired scan with zero exact filenames, equivalent bytes or runtime references. It remains live-use HOLD solely because reconstructed packaging fidelity and exact Nate slot approval are absent.

The authority matrix preserves every other product-media HOLD. Existing preview bindings are not new-media approval. Goji Carob Bites has identity authority but its derivative remains held; the current powder pile alone is GO/KEEP. Founder, ritual and page media remain subject to exact source/derivative/hash/crop/grade/render/live-slot authority.

### F. Technical evidence already closed

- Integrated header/cart runtime: complete for the unchanged candidate.
- Native 200 percent browser zoom: R2 PASS across seven routes at effective widths 390 and 720, including navigation, focus, cart inertness, option subtotal and no-overflow checks.
- Local deployment preflight: complete.
- Authenticated private-preview byte equality: complete.
- These are regression inputs after an admitted mutation, not unresolved Nate decisions.
