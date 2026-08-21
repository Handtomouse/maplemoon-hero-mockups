# MapleMoon Shopify admin & backend — backlog, assumptions, questions
**20 Aug 2026.** Read-only against the store. No product, collection, price, theme, publication
or setting was changed. Nothing under `_wip/` was opened or written.

## 1. Verified store state

- Store: **`maplemooncarob.myshopify.com`**, **password protected** (verified anonymously:
  storefront and both theme preview URLs all land on `/password`, HTTP 200).
- Shopify CLI **is** authenticated locally (`shopify theme list` succeeds). Three themes:

| ID | Role | Name |
|---|---|---|
| `154500595909` | **live** | Ethereal (= Etheryx 1.4.0 by OpenThinking, `Ethereal` is the preset name) |
| `160076628165` | unpublished | MapleMoon Private Review 20260817 S1 (1.4.0) |
| `160142491845` | unpublished | Updated copy of Ethereal (**1.6.0**, created 19 Aug) |

- The live theme contains **zero MapleMoon customisation** — a grep for `maplemoon|maple moon|carob`
  across all 246 files hits only two theme-editor settings files. The Shopify store is a bare
  vendor theme. Source: `docs/orchestration/reviews/MAPLEMOON-SHOPIFY-THEME-UPDATE-S1B-20260819T112058.md`.
- **The live storefront `maplemoon.com.au` is still WooCommerce/WordPress** (Apache, `wp-sitemap.xml`,
  `/product/` and `/product-category/` routes). Shopify is the migration target, not yet the system
  of record.

**The blocker on product/collection audit:** the CLI session is theme-scoped. There is no Admin API
credential anywhere on this machine (`grep` for `shpat_`, `SHOPIFY_ADMIN`, `SHOPIFY_ACCESS_TOKEN`,
`.env` → nothing). `shopify app execute` can run Admin GraphQL but requires an app *installed on the
store*, which is a Gate 0 authority decision, not something this lane may take. **So I cannot read
what products/collections currently exist inside Shopify.** See Q1.

## 2. Verified catalogue truth

**Authoritative source found:** `/Users/handtomouse/Downloads/Maple Moon Store CSV File Export.csv`,
SHA-256 `eeea19fd89b3…` — the exact hash pinned as authoritative in the 16 Aug BOSS ledger.
119 rows. An independent live-site scrape agrees with it on every price.

⚠ **The five "individual SKUs" are `variable` products with three pack-size variations each, not
single-price products.** Sale prices are active and open-ended (no start/end dates):

| Product (export `Name`) | 1 unit | 6-pack | 12-pack |
|---|---|---|---|
| Pecan Nut Eclipse Bite (50g) | $5.99 | **$32.99** (was 35.99) | **$59.99** (was 71.99) |
| Salted Almond Eclipse Bite (50g) | $5.99 | $32.99 (was 35.99) | $59.99 (was 71.99) |
| Hazelnut Eclipse Bite (50g) | $5.99 | $32.99 (was 35.99) | $59.99 (was 71.99) |
| Goji Ripe Eclipse Bite (50g) | $5.99 | $32.99 (was 35.99) | $59.99 (was 71.99) |
| Salted Caramel Fudge (50g) | $5.99 | $32.99 (was 35.99) | $59.99 (was 71.99) |
| **Eclipse Bite Bundle (5 x 50g Treats)** (simple) | **$24.99** | — | — |

⚠ **Price provenance is disputed — see Q0.** These values come from the export's `Regular`/`Sale
price` fields. The 13 Jul call brief says live prices are **WHOLESALE**; the 17 Aug BOSS ledger says
the export is authoritative for prices. Same numbers either way, but the label is unresolved.

The 16 Aug BOSS ledger independently confirms this exact six-product set: *"Bites priority is Pecan
Nut, Salted Almond, Hazelnut and Goji Ripe Eclipse Bites, Salted Caramel Fudge and the five-item
Eclipse Bite bundle."*

**Hard gaps in the source data — 0 of 119 rows have any of these:**

| Field | Rows populated | Consequence |
|---|---|---|
| `SKU` | **0 / 119** | Nothing to preserve; `SHOP-046` forbids inventing (Q9) |
| `GTIN, UPC, EAN, or ISBN` | **0 / 119** | No barcodes exist at all (Q3) |
| `Weight (kg)` | **0 / 119** | `SHOP-060` **holds shipping certification for every SKU** |
| `Shipping class` | **0 / 119** | No shipping tiering to migrate |
| `Tax status` | 119 / 119 = `taxable` | A3 `Taxable=TRUE` matches live |

Live shipping/tax facts (from `/shipping-returns/`): flat **$16.95** Australia Post, **free over $99**
(the $150 figure is stale), no minimum spend, dispatch **Monday and Tuesday only** from Brunswick
Heads. Wholesale is an **enquiry form only** — no published tier anywhere.

**Do NOT import from `content/*.md`.** Those files describe a different, unsourced 7-bar catalogue
at 80g with a 250g powder; no authority chain names them, and the 29 Jul plan already logs
"80g/90g bars, 250g/300g powder" as an open conflict. The export says 90g and 300g.

## 3. COCONUT CAROB BITES — state (premise corrected)

**The brief's premise is inverted.** Coconut Carob Bites does **not** exist on the live site with
no counterpart in the new build. It is the opposite: it exists **only in the new build's private
candidate catalogue**, and has **no counterpart on the live WooCommerce site**.

Evidence, live side (scraped read-only):
- The live product sitemap lists 28 products; **no coconut bite** among them.
- Four candidate URLs (`coconut-carob-eclipse-bite-50g`, `coconut-eclipse-bite-50g`,
  `coconut-carob-bite-50g`, `coconut-carob-bites`) all return **404**.
- `/product-category/eclipse-bites/` lists exactly six items — the five singles plus the bundle.
- The only live coconut products are the **Coconut Flakes & Goji Berries Carob Bar (90g)** and the
  **Coconut Flakes & Goji Berries Carob Crescent Moon (12g)**. Neither is a Bite.

Evidence, new-build side — it is **card 20 of the 24-card private candidate catalogue**:
- `MAPLEMOON-CONTENT-CATALOGUE-TRUTH-AUDIT-20260814T161450.md` and its R2:
  `| 20 | Coconut Carob Bites | Bites | Enquire · made to order | Distinct candidate identity;
  broader authority pending | KEEP preview; replacement live-use HOLD | PRIVATE-PREVIEW-ONLY |`
- Same audit: *"Four are enquiry-only: Pure Carob Moon, Cayenne Moon, Goji Carob Bites and Coconut
  Carob Bites. Goji and Coconut Bites differ by name, description and asset binding."*
- `MAPLEMOON_BOSS_EXECUTION_LEDGER_20260816.md`: *"Goji Carob Bites and Coconut Carob Bites remain
  identity-held until their exact source naming is reconciled."*
- Bound asset: `bite_coconut.webp` (`MAPLEMOON-ASSET-SLOT-AUTHORITY-MATRIX-20260814T143614.md`),
  marked **KEEP preview / HOLD replacement, explicit live-use approval required**.

**State in Shopify: absent, and correctly so.** It is enquiry-only / made-to-order and flagged
`PRIVATE-PREVIEW-ONLY` with identity held — so it must **not** be created as a priced Shopify
product. It is deliberately excluded from the import CSV. It is not a discontinued live product,
and nothing was deleted, archived or unpublished.

The same holds for **Goji Carob Bites**, which is a *different* item from the Goji Ripe Eclipse
Bite in the import CSV and is under the same identity hold. See Q2.

The same 16 Aug BOSS ledger independently confirms the six-SKU import set:
*"Bites priority is Pecan Nut, Salted Almond, Hazelnut and Goji Ripe Eclipse Bites, Salted Caramel
Fudge and the five-item Eclipse Bite bundle."* That matches the CSV row-for-row.

## 4. The actual backlog

Gates are from `docs/client-review/2026-08-01-saturday-review/SHOPIFY-OS2-MIGRATION-GATES-20260802.md`.

**Workable now, and done in this lane:**
- Gate 2 (catalogue provenance) — live catalogue reconciled, import CSV built. ✅
- Gate 6 (SEO/redirects) — full URL inventory and a 60-row redirect map built. ✅
- Collections structure encoding the 19 Aug ruling. ✅

**Blocked on Admin API access (Q1), not on a client answer:**
- Verify/create the 6 products and 5 collections in Shopify.
- Shipping profile ($16.95 flat / free over $99), tax settings, Markets/AU config.
- Confirm no stale "Bites" collection exists.

**Blocked on client/Nate decisions:** barcodes (Q3), wholesale tier (Q4), merch scope (Q5).

**Not this lane:** Gate 0 (authority), Gates 3–5, 7–8 (theme build, integrations, UAT, cutover).
The theme lane is separately active and owns `_wip/recovery/`.

## 5. Assumptions taken (defaults, all reversible)

Source of truth for every value below is the **WooCommerce export**
`/Users/handtomouse/Downloads/Maple Moon Store CSV File Export.csv`, SHA-256 `eeea19fd89b3…`,
the exact hash pinned as authoritative in `MAPLEMOON_BOSS_EXECUTION_LEDGER_20260816.md`.
119 rows. Live-site scraping was used only to corroborate; it agrees with the export.

- **A1.** `Variant SKU` left **blank**. `SHOP-046` is ratified: *"Shopify must not invent
  replacements."* 0 of 119 source rows carry a SKU. A scheme `MM-EB-<FLAVOUR>-<PACK>` is
  **proposed only** and deliberately NOT applied — see Q9.
- **A2.** Every row imports as **`draft` / `Published FALSE`**. Deliberate: an import cannot
  expose a storefront product.
- **A3.** `Variant Taxable = TRUE`. Matches the export — all 119 rows are `Tax status: taxable`.
  This now mirrors current live config rather than resting on a GST reading. Confirm only (Q6).
- **A4.** Handles carried from the live Woo slugs so the redirect map is mechanical.
- **A5.** **Salted Caramel Fudge is 50g** — RESOLVED BY SOURCE. The export `Name` field says
  "(50g)" on all five of its rows; the `-70g` URL slug is stale. Handle renamed. Q7 closed.
- **A6.** Bundle 250g (5 x 50g), ignoring packaging.
- **A7.** **Sale prices are live and open-ended** — all ten discounted variations have empty
  `Date sale price starts`/`ends`. So `Variant Price` = the Woo **Sale price** and
  `Compare At Price` = the Woo **Regular price** (6-pack $32.99 was $35.99; 12-pack $59.99 was
  $71.99). Putting the regular price in `Variant Price` would silently raise live pricing.
- **A8.** Inventory qty 0, policy `deny` — nothing can oversell on an accidental publish.
- **A9.** `maple-moon-products` category not recreated; redirected to `/collections/all`.
- **A10.** Blog posts → `/blogs/news/<slug>`; `rituals-recipes` → its own blog. One emoji-prefixed
  slug was cleaned to `choc-chip-high-protein-carob-cookies`.
- **A11.** `Variant Barcode` left **empty**. A GTIN cannot be invented, and `SHOP-046` forbids it.
  0 of 119 source rows carry a GTIN — see Q3.
- **A12.** No `Image Src`. An import lands imageless drafts; product shots exist at
  `assets/product_shots/w1-e-prepared-20260803/` but live-use authority is held
  (`MAPLEMOON-NATE-DECISION-GATE-R2-20260814T184422.md`). A deliberate second pass.
- **A13.** `Variant Grams` = **net product weight** derived from the title (50g x pack count), NOT
  a verified shipping weight. 0 of 119 export rows have a weight. `SHOP-060` therefore still
  **holds shipping certification for every SKU** until real weights and package dimensions exist.
- **A14.** No bundle `Compare At Price`. An earlier draft computed $29.95 from 5 x $5.99; that was
  a fabricated "was" price with no source, and a misleading-pricing exposure. Removed. The Woo
  bundle row carries no sale price.

## 6. Questions needing an answer

| # | Question | Who | Why it matters |
|---|---|---|---|
| **Q0** | **Are the Woo/live prices RETAIL or WHOLESALE?** `_fold_brief_20260713_call.md:18` (13 Jul): *"Do NOT scrape pricing from the current MapleMoon site: it is WHOLESALE pricing."* But the BOSS ledger (17 Aug) makes the Woo export *"authoritative for … prices."* Both authorities are live and they conflict. | **Client + Nate** | **Highest priority.** The values are the same either way ($5.99 etc.), so nothing in the CSV changes — but the *label* does. Tension worth stating to whoever rules: these prices sit on a public anonymous checkout with free-shipping-over-$99, which is retail behaviour. |
| Q1 | Admin API access — install a custom app on `maplemooncarob.myshopify.com` with read/write product+collection scope, or supply a token? | **Nate** (Gate 0) | Biggest single unblock; releases all store-side verification. |
| Q2 | **Coconut Carob Bites** and **Goji Carob Bites** are identity-held pending "exact source naming". Real names, and are they going to market or staying enquiry-only / made-to-order? | **Client** | Both `PRIVATE-PREVIEW-ONLY`, deliberately excluded from the import. Nothing deleted pending answer. |
| Q3 | Barcodes — does MapleMoon hold a **GS1 company prefix**? Note `GOV-01_RATIFIED_LEDGER.md` already logs a Saudi 35g-vs-45g one-barcode conflict, and that sheet barcodes starting `874` are **invalid EAN-13 checksums** while production `074` barcodes were kept. | **Client / Dylan** | 0 GTINs in source. Blocks retail & stockist rollout. |
| Q4 | Wholesale — actual tier (% off retail, MOQ)? And Shopify **B2B** (needs **Plus**) vs discount-code / customer-tag on the current plan? | **Client + Nate** | Live is enquiry-only. Plan choice is a Gate 0 dependency. Interacts with Q0. |
| Q5 | ~~Apparel/merch (4 apparel SKUs, cap, bucket hat) and Bath Salts — in scope for the new store?~~ **ANSWERED: IN SCOPE. Nate, 21 Aug 2026.** This is a deliberate **REVERSAL** of Nate's 20 Aug "Non-food is outside this launch" ruling; he was shown that prior ruling and chose to reverse it. | **Client** | Answered. Recorded by Claude Code on Nate's explicit instruction, 21 Aug; Nate is the decider, this row is a transcription. **NOT YET APPLIED:** the 7 affected parents (6 apparel + Lavender & Bougainvillaea Bath Salts 500g, WOO-P3104/P5803/P5804/P5807 et al) still carry `OUT-OF-SCOPE (launch)` in `docs/orchestration/CATALOGUE-RECONCILIATION-20260820.md` from commit 35d5ce8. That file is under LOCK_MANIFEST `protected_paths` (`docs/orchestration/**`) so the disposition change needs a packet, not an in-place edit. The dated 20 Aug ruling rows must be **superseded with today's date and attribution**, never rewritten in place. **NEW COLLISION:** apparel carries size variants and needs SKUs for stock ops, but Q9 (SKU scheme) was held on the same day pending Carli. Nate's call, unresolved. |
| Q6 | GST — confirm carob confectionery is taxable. **Low risk**: A3 now matches the live Woo setting (all rows `taxable`), so this is a confirm, not a ruling. | **Bookkeeper** | Wrong = wrong tax on every order. |
| ~~Q7~~ | ~~Fudge 50g or 70g?~~ **CLOSED** — the authoritative export says 50g on all five rows. | — | Resolved by source. |
| Q8 | Do all 22 live pages and 7 blog posts migrate, or does the 6-page build replace them? | **Nate** | 29 of the 60 redirects hang on this. |
| Q9 | Adopt a SKU scheme? `MM-EB-<FLAVOUR>-<PACK>` is proposed but **not applied** (A1/`SHOP-046`). | **Client** | Shopify SKUs are optional but wanted for stock/wholesale ops. |
| Q10 | Catalogue scope "**ruling B — publish all 24 at launch**" (per the catalogue audit). This cannot mean 24 *priced checkout* products: 4 of the 24 are enquiry-only holds (Q2), and `SHOP-060` holds every SKU's checkout proof pending verified weight (0 of 119 rows have one). What does B mean concretely? | **Nate + Client** | Determines whether this CSV is the launch set or one slice of it. |
| Q11 | ~~Is the 19 Aug `Bites & Eclipses` → `Eclipse Bites` change **ratified**?~~ **RATIFIED by Nate, 21 Aug 2026.** `Eclipse Bites` is the ratified name and the separate `Bites` category is formally dropped. The `Bites 2 / Eclipses 6` split in the governed 24-card accounting is superseded. | **Nate** | Answered. Recorded by Claude Code on Nate's explicit instruction, 21 Aug; Nate is the decider, this row is a transcription. Consequences: (a) the collections plan below stops being a working assumption; (b) content-loss audit item #2 (Shop 24→22, the separate Goji/Coconut Carob Bites category) closes as **authorised**, not unexplained — those two were deploy-only, absent from every WIP commit, carry no Woo parent, and Nate's 20 Aug fifth-Bite ruling had already moved N13/N14 to OUT-OF-SCOPE (launch). They are not to be restored. |
| Q12 | Bundle identity: the governed bundle lists "**Goji Ripe**", the May archive names "**Goji Coconut Bar**". Unresolved. | **Client** | Affects bundle description accuracy. |

## 7. Files produced by this lane

- `docs/shopify/PRODUCTS-ECLIPSE-BITES-IMPORT-20260820.csv` — **16 rows**: 5 variable products x 3 pack-size
  variants (1 / 6 / 12) + the simple bundle. Built directly from the authoritative Woo export. All draft,
  blank SKUs, blank barcodes.
- `docs/shopify/COLLECTIONS-PLAN-20260820.md` — target collections, encodes the 19 Aug merge.
- `docs/shopify/REDIRECT-MAP-WOO-TO-SHOPIFY-20260820.csv` — 60 annotated rows. Four dropped as invalid
  self-redirects or native Shopify routes (`/`, `/cart`, `/cart-2`, `/checkout`).
- `docs/shopify/REDIRECTS-SHOPIFY-IMPORT-20260820.csv` — the same 60 rows in Shopify's exact
  two-column `Redirect from,Redirect to` import schema.
- `docs/shopify/BACKLOG-ASSUMPTIONS-QUESTIONS-20260820.md` — this file.
