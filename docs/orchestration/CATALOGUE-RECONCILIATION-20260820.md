# Catalogue reconciliation — Woo export × governed 24-product ledger

**Date:** 20 August 2026
**Status:** READ-ONLY APPROVAL DOCUMENT · Woo/ledger/live identities reconciled
**Authority:** `/Users/handtomouse/Library/Messages/Attachments/e0/00/3631B118-5A32-487A-8E55-C0533B3B96CB/Maple Moon Store CSV File Export.csv`
**SHA-256:** `eeea19fd89b30052bd4c4cf28519f56f1195e4595c92485fb186a66719e6b114` (matches the approved hash)
**No Shopify mutation, import, product, collection, publication or metaobject action occurred.**

## Rulings applied

| Ruling | Authority | What changed | What remains blocked |
|---|---|---|---|
| Six moons is correct; Woo is behind | Nate, 20 Aug 2026 | N01 Pure Carob Moon and N05 Cayenne Moon remain governed and are explicitly `CREATE` with no Woo mapping. Their similarly named live Shopify records are not treated as approved mappings. | For each: price per rung, pack ladder, weight and approved title. Pure Carob and Cayenne exist in Woo only as 90g bars; no bar price, weight or ladder may be borrowed for a moon. |
| Non-food is outside this launch | Nate, 20 Aug 2026 | Six apparel parents and Lavender & Bougainvillaea Bath Salts (500g) move from source-side `ARCHIVE` to `OUT-OF-SCOPE (launch)`. They are neither deleted nor future import candidates for this launch. | Nothing; the scope decision is closed. |
| Salted Caramel Fudge (50g) is the fifth Eclipse Bite | Nate, 20 Aug 2026 | Woo parent 2889 joins the Eclipse Bites range. The family is five flavours, plus its bundle; N13 and N14 are surplus ledger candidates and move from pending `CREATE` to `OUT-OF-SCOPE (launch)`. | N10's customer title still requires confirmation; N13/N14 require no product completion because they are surplus. |

## Outcome

The Woo export parses to **119 rows: 28 parent products (20 variable, 8 simple), 91 explicit variation rows, and 99 sellable variant records when each simple product is counted as its default variant**. All task-supplied measured facts re-confirm: four Woo Crescent Moon parents; six 90g bar flavours plus the 6x bundle; four parents literally named Eclipse Bite plus the Eclipse Bite Bundle; one separately named Salted Caramel Fudge parent; one Bananas; one Carob Powder; two Elixirs; and seven non-food parents (six apparel plus bath salts).

The governed ledger remains **24 rows** after the rulings: **CREATE 9 · UPDATE 13 · ARCHIVE 0 · OUT-OF-SCOPE (launch) 2**. The launch-action subset is 22 because N13/N14 remain recorded as surplus rather than pending products. Against the live 23, the disposition becomes **UPDATE 13 · ARCHIVE 10**. In the Woo-only set, **ARCHIVE 1 · OUT-OF-SCOPE (launch) 7** replaces the former eight archives. These are proposed approval dispositions only.

| Count surface | Before rulings | After rulings | Consequence |
|---|---:|---:|---|
| Governed ledger rows | 24 | 24 | No ledger row is deleted. |
| Governed dispositions | CREATE 9 · UPDATE 15 · ARCHIVE 0 · OUT-OF-SCOPE 0 | CREATE 9 · UPDATE 13 · ARCHIVE 0 · OUT-OF-SCOPE 2 | N01/N05 move UPDATE→CREATE; N13/N14 move CREATE→OUT-OF-SCOPE, so CREATE nets to nine. |
| Live-23 dispositions | UPDATE 15 · ARCHIVE 8 | UPDATE 13 · ARCHIVE 10 | The two similarly named live moon records are no longer approved mappings for N01/N05. |
| Woo-only parent dispositions | ARCHIVE 8 · OUT-OF-SCOPE 0 | ARCHIVE 1 · OUT-OF-SCOPE 7 | Only the 6x bar bundle remains an archive proposal; non-food is launch-excluded. |
| Crescent Moon flavours | 4 Woo / 6 ledger | 6 governed: 4 UPDATE + 2 blocked CREATE | N01/N05 stay real without borrowed commerce data. |
| 90g Bar flavours | 6 + 1 bundle | 6 + 1 bundle | No change; the bundle remains outside the governed ledger and proposed ARCHIVE. |
| Eclipse Bite flavours | 5 mapped but 7 ledger candidates, conflict open | 5 confirmed + 1 bundle; 2 surplus candidates | Parent 2889 is the fifth flavour; five-vs-seven is resolved. |
| Elixirs / Bananas / Carob Powder | 2 / 1 / 1 | 2 / 1 / 1 | No change. |
| Non-food parents | 7 ARCHIVE | 7 OUT-OF-SCOPE (launch) | Excluded from the governed set and any launch import scope; not deleted. |

The live Shopify side was read in the already authenticated Chrome profile at `/store/maplemooncarob/products`, without changing any record. The visible table reports exactly **23 products: 13 active, 10 draft; 22 at zero stock; one untracked gift card**. Every product ID, title, status, inventory summary and disposition is listed below. No mutating control was used.

## What the four CAT files already settle

| Input | Settled facts carried forward |
|---|---|
| LEDGER.md | R2 is the active authority; 24/24 governed rows; 121 confirmed content cells, 35 unknown, 12 image approval-required, 216 commerce cells blocked pending Woo. R-1 separates supplied wording from claim verification; R-2 says Home/Shop orders are intentionally different; R-3 says later Carli email wins over Canva. |
| ledger.csv | Machine ledger for the same 24 stable IDs (`B01`–`B06`, `N01`–`N18`), with every cell stored as status/value/source. Its nine commerce columns were all still `BLOCKED-WOO-EXPORT`; this reconciliation fills only fields backed by the approved export. |
| NEEDED.md | Six bar titles absent; colour-to-flavour mapping absent; N05/N13/N14 identity/copy gaps; N18 description absent; N10/N16/N17 title confirmations flagged; 18 products lack approved imagery. Nothing here authorises filling those gaps. |
| CONFLICTS.md | Its former “all 5 bites” versus seven bite-family candidates mismatch is resolved by Nate's 20 Aug ruling: Salted Caramel Fudge (50g) is the fifth Bite, and N13/N14 are surplus. Other preserved authority findings are unchanged. |

## Mapping rules

- Stable governed product keys are `MM24-<ledger ID>`; mapped variants append immutable Woo parent and record IDs. Woo-only archive keys use `WOO-P<parent>-V<record>`.
- A Woo `simple` row is one sellable default variant; a Woo `variable` parent contributes only its explicit `variation` rows. Parent rows are not double-counted as variants.
- `price` is the Woo `Sale price` when populated, otherwise `Regular price`. `compare_at_price` is the Woo `Regular price` only when both sale and regular values exist. Raw strings are preserved verbatim (`2.5`, not reformatted to `2.50`).
- The `$35.99/$71.99` regular values and `$32.99/$59.99` sale values belong to the same Eclipse Bite variants. No false price split is raised.
- `GST-inclusive; taxable` carries SHOP-006/SHOP-007 and the export’s `Tax status=taxable` on all 119 rows.
- `inventory_policy=deny` maps Woo `Backorders allowed?=0`. `Stock` is blank on all 119 rows, so quantity remains blank; it is **not** converted to zero. `In stock?=1` maps to `in_stock` availability.
- Every Woo `SKU` and GTIN is blank. SKU remains a gap and no scheme is proposed.
- The export’s structured `Weight (kg)` is blank on all 119 rows. The `weight`/`unit` columns record only net/unit weights explicitly stated in the task-verified ladders or Woo product names; they are **not shipping weights**.
- The CSV has no export-date column. `export_date` is blank. File timestamp `2026-08-16T18:53:38+10:00` is recorded only as file metadata and is not promoted to an export date.
- Customer copy uses the CAT ledger and later Carli wording. Woo titles remain in a separate provenance column. The Hazelnut ruling is applied exactly: bar qualifier **Hazelnut**; crescent qualifier **Roasted Hazelnut**.
- `CREATE` for N01/N05 is a direct Nate ruling and overrides tempting identity inference from both the 90g bar names in Woo and the similarly named live Shopify records. Their commerce cells remain blank.
- `OUT-OF-SCOPE (launch)` is a scope disposition, never an instruction to archive or delete a source record.

## Governed product dispositions — 24/24

| Stable product key | Ledger | Customer title state | Woo parent | Woo variants | Shopify ID | Live title | Live status | Live variants | Disposition | One deciding fact |
|---|---|---|---|---|---|---|---|---|---|---|
| MM24-B01 | B01 | GAP — exact title absent; required qualifier: Pure | 6012 | 4 | 8708816240837 | Pure Carob & Cacao Butter Bar | Active | 3 | UPDATE | Live Shopify `8708816240837` exists; 0 in stock for 3 variants. Woo sellable variants: 4; live variants: 3. |
| MM24-B02 | B02 | GAP — exact title absent; required qualifier: Peppermint | 5451 | 4 | 8708824105157 | Peppermint Buckwheat Crisp Bar | Active | 3 | UPDATE | Live Shopify `8708824105157` exists; 0 in stock for 3 variants. Woo sellable variants: 4; live variants: 3. |
| MM24-B03 | B03 | GAP — exact title absent; required qualifier: Hazelnut (not Roasted Hazelnut) | 5436 | 4 | 8708825317573 | Roasted Dark Hazelnut Bar | Active | 3 | UPDATE | Live Shopify `8708825317573` exists; 0 in stock for 3 variants. Woo sellable variants: 4; live variants: 3. |
| MM24-B04 | B04 | GAP — exact title absent; required identity: Coconut and Goji | 2416 | 4 | 8708819681477 | Goji & Coconut Bar | Active | 3 | UPDATE | Live Shopify `8708819681477` exists; 0 in stock for 3 variants. Woo sellable variants: 4; live variants: 3. |
| MM24-B05 | B05 | GAP — exact title absent; required qualifier: Cayenne | 5145 | 4 | 8708821156037 | Cayenne Chilli & Celtic Salt Bar | Active | 3 | UPDATE | Live Shopify `8708821156037` exists; 0 in stock for 3 variants. Woo sellable variants: 4; live variants: 3. |
| MM24-B06 | B06 | GAP — exact title absent; required qualifier: Almond | 5133 | 4 | 8708822499525 | Salted Almond Bar | Active | 3 | UPDATE | Live Shopify `8708822499525` exists; 0 in stock for 3 variants. Woo sellable variants: 4; live variants: 3. |
| MM24-N01 | N01 | BLOCKED-ON-CLIENT — Pure Carob Moon; approved title missing | — | 0 | — | — | — | 0 | CREATE | Nate's 20 Aug ruling: real governed moon, no Woo mapping. Missing price per rung, pack ladder, weight and approved title. Do not borrow from the Woo 90g Pure Carob bar. |
| MM24-N02 | N02 | Peppermint Moon | 5556 | 4 | 8708832821445 | Peppermint Buckwheat Crisp Moons | Active | 3 | UPDATE | Live Shopify `8708832821445` exists; 0 in stock for 3 variants. Woo sellable variants: 4; live variants: 3. |
| MM24-N03 | N03 | Roasted Hazelnut Moon | 5550 | 4 | 8708832198853 | Roasted Hazelnut Moons | Active | 3 | UPDATE | Live Shopify `8708832198853` exists; 0 in stock for 3 variants. Woo sellable variants: 4; live variants: 3. |
| MM24-N04 | N04 | Goji and Coconut Moon | 2395 | 4 | 8708830003397 | Coconut & Goji Moons | Active | 3 | UPDATE | Live Shopify `8708830003397` exists; 0 in stock for 3 variants. Woo sellable variants: 4; live variants: 3. |
| MM24-N05 | N05 | BLOCKED-ON-CLIENT — Cayenne Moon; approved title missing | — | 0 | — | — | — | 0 | CREATE | Nate's 20 Aug ruling: real governed moon, no Woo mapping. Missing price per rung, pack ladder, weight and approved title. Do not borrow from the Woo 90g Cayenne bar. |
| MM24-N06 | N06 | Almond Moon | 5540 | 4 | 8708830888133 | Almond Celtic Salt Moons | Active | 3 | UPDATE | Live Shopify `8708830888133` exists; 0 in stock for 3 variants. Woo sellable variants: 4; live variants: 3. |
| MM24-N07 | N07 | Pecan Eclipse Bite | 2850 | 3 | — | — | — | 0 | CREATE | No live Shopify product. Woo mapping exists. |
| MM24-N08 | N08 | Almond Sea Salt Eclipse Bites | 2877 | 3 | — | — | — | 0 | CREATE | No live Shopify product. Woo mapping exists. |
| MM24-N09 | N09 | Hazelnut Eclipse Bites | 2857 | 3 | — | — | — | 0 | CREATE | No live Shopify product. Woo mapping exists. |
| MM24-N10 | N10 | Goji Ripe | 2883 | 3 | — | — | — | 0 | CREATE | No live Shopify product. Woo mapping exists. |
| MM24-N11 | N11 | Fudge | 2889 | 3 | — | — | — | 0 | CREATE | Nate's 20 Aug ruling groups Woo `Salted Caramel Fudge (50g)` as the fifth Eclipse Bite. No live Shopify product. |
| MM24-N12 | N12 | Eclipse Bites Bundles | 6035 | 1 | — | — | — | 0 | CREATE | No live Shopify product. Bundle now resolves to the five ruled Bite flavours. |
| MM24-N13 | N13 | SURPLUS — unnamed Goji Bites candidate | — | 0 | — | — | — | 0 | OUT-OF-SCOPE (launch) | Nate's fifth-Bite ruling leaves this unnamed candidate surplus; it is not a pending product. |
| MM24-N14 | N14 | SURPLUS — unnamed Coconut Bites candidate | — | 0 | — | — | — | 0 | OUT-OF-SCOPE (launch) | Nate's fifth-Bite ruling leaves this unnamed candidate surplus; it is not a pending product. |
| MM24-N15 | N15 | Pure Carob Elixir | 3345 | 1 | 8708835180741 | Plain Carob Elixir | Draft | 2 | UPDATE | Live Shopify `8708835180741` exists; 0 in stock for 2 variants. Woo sellable variants: 1; live variants: 2. |
| MM24-N16 | N16 | Spiced Carob | 2440 | 1 | 8708835672261 | Spiced Carob Elixir | Draft | 2 | UPDATE | Live Shopify `8708835672261` exists; 0 in stock for 2 variants. Woo sellable variants: 1; live variants: 2. |
| MM24-N17 | N17 | Bananas | 2432 | 4 | 8708834623685 | Carob Bananas | Active | 3 | UPDATE | Live Shopify `8708834623685` exists; 0 in stock for 3 variants. Woo sellable variants: 4; live variants: 3. |
| MM24-N18 | N18 | Carob Powder | 5927 | 1 | — | — | — | 0 | CREATE | No live Shopify product. Woo mapping exists. |

Product-level governed ledger tally: **CREATE 9 · UPDATE 13 · ARCHIVE 0 · OUT-OF-SCOPE (launch) 2 = 24**. The launch-action subset is 22; N13/N14 are retained only as ruled surplus records.

## Live Shopify product dispositions — 23/23

| Shopify product ID | Live title | Status | Inventory | Live variants | Governed match | Disposition | One deciding fact |
|---|---|---|---|---|---|---|---|
| 8708816240837 | Pure Carob & Cacao Butter Bar | Active | 0 in stock for 3 variants | 3 | MM24-B01 | UPDATE | Matches governed B01; preserve stable Shopify ID and reconcile fields/variants. |
| 8708824105157 | Peppermint Buckwheat Crisp Bar | Active | 0 in stock for 3 variants | 3 | MM24-B02 | UPDATE | Matches governed B02; preserve stable Shopify ID and reconcile fields/variants. |
| 8708825317573 | Roasted Dark Hazelnut Bar | Active | 0 in stock for 3 variants | 3 | MM24-B03 | UPDATE | Matches governed B03; preserve stable Shopify ID and reconcile fields/variants. |
| 8708819681477 | Goji & Coconut Bar | Active | 0 in stock for 3 variants | 3 | MM24-B04 | UPDATE | Matches governed B04; preserve stable Shopify ID and reconcile fields/variants. |
| 8708821156037 | Cayenne Chilli & Celtic Salt Bar | Active | 0 in stock for 3 variants | 3 | MM24-B05 | UPDATE | Matches governed B05; preserve stable Shopify ID and reconcile fields/variants. |
| 8708822499525 | Salted Almond Bar | Active | 0 in stock for 3 variants | 3 | MM24-B06 | UPDATE | Matches governed B06; preserve stable Shopify ID and reconcile fields/variants. |
| 8708828922053 | Pure Carob & Cacao Butter Moons | Active | 0 in stock for 3 variants | 3 | — | ARCHIVE | Nate requires N01 as a separate blocked CREATE with no approved Woo/live mapping; this similarly named live record is therefore an archive proposal, not a source for title, price, weight or ladder. |
| 8708832821445 | Peppermint Buckwheat Crisp Moons | Active | 0 in stock for 3 variants | 3 | MM24-N02 | UPDATE | Matches governed N02; preserve stable Shopify ID and reconcile fields/variants. |
| 8708832198853 | Roasted Hazelnut Moons | Active | 0 in stock for 3 variants | 3 | MM24-N03 | UPDATE | Matches governed N03; preserve stable Shopify ID and reconcile fields/variants. |
| 8708830003397 | Coconut & Goji Moons | Active | 0 in stock for 3 variants | 3 | MM24-N04 | UPDATE | Matches governed N04; preserve stable Shopify ID and reconcile fields/variants. |
| 8708831609029 | Cayenne Chilli Celtic Salt Moons | Active | 0 in stock for 3 variants | 3 | — | ARCHIVE | Nate requires N05 as a separate blocked CREATE with no approved Woo/live mapping; this similarly named live record is therefore an archive proposal, not a source for title, price, weight or ladder. |
| 8708830888133 | Almond Celtic Salt Moons | Active | 0 in stock for 3 variants | 3 | MM24-N06 | UPDATE | Matches governed N06; preserve stable Shopify ID and reconcile fields/variants. |
| 8708835180741 | Plain Carob Elixir | Draft | 0 in stock for 2 variants | 2 | MM24-N15 | UPDATE | Matches governed N15; preserve stable Shopify ID and reconcile fields/variants. |
| 8708835672261 | Spiced Carob Elixir | Draft | 0 in stock for 2 variants | 2 | MM24-N16 | UPDATE | Matches governed N16; preserve stable Shopify ID and reconcile fields/variants. |
| 8708834623685 | Carob Bananas | Active | 0 in stock for 3 variants | 3 | MM24-N17 | UPDATE | Matches governed N17; preserve stable Shopify ID and reconcile fields/variants. |
| 8708840227013 | Digital Gift Card | Draft | Inventory not tracked | not read | — | ARCHIVE | Gift Set; absent from governed 24-product launch set. |
| 8708839669957 | Gift Box — Premium | Draft | 0 in stock | not read | — | ARCHIVE | Gift Set; absent from governed 24-product launch set. |
| 8708839309509 | Gift Box — Classic | Draft | 0 in stock | not read | — | ARCHIVE | Gift Set; absent from governed 24-product launch set. |
| 8708838064325 | Mixed Moons 6-Pack | Draft | 0 in stock | not read | — | ARCHIVE | Bundle; absent from governed 24-product launch set. |
| 8708837638341 | Mixed Bars 6-Pack | Draft | 0 in stock | not read | — | ARCHIVE | Bundle; absent from governed 24-product launch set. |
| 8708837146821 | The Full Range | Draft | 0 in stock | not read | — | ARCHIVE | Bundle; absent from governed 24-product launch set. |
| 8708836655301 | Moon Sampler | Draft | 0 in stock | not read | — | ARCHIVE | Bundle; absent from governed 24-product launch set. |
| 8708836196549 | The Starter Pack | Draft | 0 in stock | not read | — | ARCHIVE | Bundle; absent from governed 24-product launch set. |

Live tally: **UPDATE 13 · ARCHIVE 10 = 23**. The governed ledger separately supplies **CREATE 9 · OUT-OF-SCOPE (launch) 2**.

## Woo-only product dispositions — 8/8

| Stable product key | Woo parent | Woo title | Variants | Disposition | One deciding fact |
|---|---|---|---|---|---|
| WOO-P5172 | 5172 | Organic Vegan Bundle of Carob Bars (6x90g) | 1 | ARCHIVE | Absent from governed 24-product ledger. |
| WOO-P3104 | 3104 | Lavender & Bougainvillaea Bath Salts (500g) | 1 | OUT-OF-SCOPE (launch) | Nate's 20 Aug non-food ruling; excluded from governed launch and future launch import scope, not archived or deleted. |
| WOO-P5803 | 5803 | Womens Maple Organic Tee – Natural | 4 | OUT-OF-SCOPE (launch) | Nate's 20 Aug non-food ruling; excluded from governed launch and future launch import scope, not archived or deleted. |
| WOO-P5804 | 5804 | Womens Relax Crew Jumper | 8 | OUT-OF-SCOPE (launch) | Nate's 20 Aug non-food ruling; excluded from governed launch and future launch import scope, not archived or deleted. |
| WOO-P5807 | 5807 | Mens Classic Organic Tee | 8 | OUT-OF-SCOPE (launch) | Nate's 20 Aug non-food ruling; excluded from governed launch and future launch import scope, not archived or deleted. |
| WOO-P5811 | 5811 | Mens Relax Hoodie | 12 | OUT-OF-SCOPE (launch) | Nate's 20 Aug non-food ruling; excluded from governed launch and future launch import scope, not archived or deleted. |
| WOO-P5815 | 5815 | Access Cap – Ecru | 1 | OUT-OF-SCOPE (launch) | Nate's 20 Aug non-food ruling; excluded from governed launch and future launch import scope, not archived or deleted. |
| WOO-P5816 | 5816 | Bucket Hat – Ecru | 1 | OUT-OF-SCOPE (launch) | Nate's 20 Aug non-food ruling; excluded from governed launch and future launch import scope, not archived or deleted. |

Woo/ledger source-side identity tally: **mapped 20 · governed-without-Woo 4 · Woo-only archive 1 · Woo-only OUT-OF-SCOPE (launch) 7 = 32 distinct source identities**. This records all **28 Woo parents** against the **24-row governed ledger** without treating the seven non-food parents as launch products. Governed tally is **CREATE 9 · UPDATE 13 · OUT-OF-SCOPE (launch) 2**; live-23 tally is **UPDATE 13 · ARCHIVE 10**.

## Variant reconciliation

This is one row per actual sellable Woo variant, plus four `product_gap` rows for governed products with no Woo record and ten `live_product` rows for live Shopify archive proposals. Full provenance/status columns are in the companion CSV. Non-food Woo rows are explicitly `OUT-OF-SCOPE (launch)`.

| Stable identity | Ledger | Product title | Variant | Weight | Price | Compare-at | GST | Policy / qty / availability | Woo parent | Woo record | Shopify ID | Export date | Disposition |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| MM24-N16-P2440-V2440 | N16 | Spiced Carob | (simple product; no Woo option) | 150 g | 26.95 | — | GST-inclusive; taxable | deny / blank / in_stock | 2440 | 2440 | 8708835672261 | GAP | UPDATE |
| MM24-B04-P2416-V3005 | B04 | GAP — exact title absent; required identity: Coconut and Goji | 1 BAR | 90 g | 12.95 | — | GST-inclusive; taxable | deny / blank / in_stock | 2416 | 3005 | 8708819681477 | GAP | UPDATE |
| MM24-B04-P2416-V3006 | B04 | GAP — exact title absent; required identity: Coconut and Goji | 2 BARS | 90 g | 25.25 | 25.9 | GST-inclusive; taxable | deny / blank / in_stock | 2416 | 3006 | 8708819681477 | GAP | UPDATE |
| MM24-B04-P2416-V3007 | B04 | GAP — exact title absent; required identity: Coconut and Goji | 5 BARS | 90 g | 61.51 | 64.75 | GST-inclusive; taxable | deny / blank / in_stock | 2416 | 3007 | 8708819681477 | GAP | UPDATE |
| MM24-N04-P2395-V3026 | N04 | Goji and Coconut Moon | 1 MOON | 12 g | 2.5 | — | GST-inclusive; taxable | deny / blank / in_stock | 2395 | 3026 | 8708830003397 | GAP | UPDATE |
| MM24-N04-P2395-V3027 | N04 | Goji and Coconut Moon | 5 MOONS | 12 g | 12.19 | 12.5 | GST-inclusive; taxable | deny / blank / in_stock | 2395 | 3027 | 8708830003397 | GAP | UPDATE |
| MM24-N04-P2395-V3028 | N04 | Goji and Coconut Moon | 10 MOONS | 12 g | 23.75 | 24.99 | GST-inclusive; taxable | deny / blank / in_stock | 2395 | 3028 | 8708830003397 | GAP | UPDATE |
| MM24-N17-P2432-V3029 | N17 | Bananas | 10 BANANAS | 20 g | 26.99 | 29.99 | GST-inclusive; taxable | deny / blank / in_stock | 2432 | 3029 | 8708834623685 | GAP | UPDATE |
| MM24-N17-P2432-V3030 | N17 | Bananas | 5 BANANAS | 20 g | 14.25 | 14.99 | GST-inclusive; taxable | deny / blank / in_stock | 2432 | 3030 | 8708834623685 | GAP | UPDATE |
| MM24-N17-P2432-V3031 | N17 | Bananas | 1 BANANA | 20 g | 2.99 | — | GST-inclusive; taxable | deny / blank / in_stock | 2432 | 3031 | 8708834623685 | GAP | UPDATE |
| MM24-N07-P2850-V3075 | N07 | Pecan Eclipse Bite | 1 BITE | 50 g | 5.99 | — | GST-inclusive; taxable | deny / blank / in_stock | 2850 | 3075 | — | GAP | CREATE |
| MM24-N07-P2850-V3076 | N07 | Pecan Eclipse Bite | 6 BITES | 50 g | 32.99 | 35.99 | GST-inclusive; taxable | deny / blank / in_stock | 2850 | 3076 | — | GAP | CREATE |
| MM24-N07-P2850-V3077 | N07 | Pecan Eclipse Bite | 12 BITES | 50 g | 59.99 | 71.99 | GST-inclusive; taxable | deny / blank / in_stock | 2850 | 3077 | — | GAP | CREATE |
| MM24-N09-P2857-V3078 | N09 | Hazelnut Eclipse Bites | 12 BITES | 50 g | 59.99 | 71.99 | GST-inclusive; taxable | deny / blank / in_stock | 2857 | 3078 | — | GAP | CREATE |
| MM24-N09-P2857-V3079 | N09 | Hazelnut Eclipse Bites | 6 BITES | 50 g | 32.99 | 35.99 | GST-inclusive; taxable | deny / blank / in_stock | 2857 | 3079 | — | GAP | CREATE |
| MM24-N09-P2857-V3080 | N09 | Hazelnut Eclipse Bites | 1 BITE | 50 g | 5.99 | — | GST-inclusive; taxable | deny / blank / in_stock | 2857 | 3080 | — | GAP | CREATE |
| MM24-N08-P2877-V3081 | N08 | Almond Sea Salt Eclipse Bites | 12 BITES | 50 g | 59.99 | 71.99 | GST-inclusive; taxable | deny / blank / in_stock | 2877 | 3081 | — | GAP | CREATE |
| MM24-N08-P2877-V3082 | N08 | Almond Sea Salt Eclipse Bites | 6 BITES | 50 g | 32.99 | 35.99 | GST-inclusive; taxable | deny / blank / in_stock | 2877 | 3082 | — | GAP | CREATE |
| MM24-N08-P2877-V3083 | N08 | Almond Sea Salt Eclipse Bites | 1 BITE | 50 g | 5.99 | — | GST-inclusive; taxable | deny / blank / in_stock | 2877 | 3083 | — | GAP | CREATE |
| MM24-N10-P2883-V3084 | N10 | Goji Ripe | 12 BITES | 50 g | 59.99 | 71.99 | GST-inclusive; taxable | deny / blank / in_stock | 2883 | 3084 | — | GAP | CREATE |
| MM24-N10-P2883-V3085 | N10 | Goji Ripe | 6 BITES | 50 g | 32.99 | 35.99 | GST-inclusive; taxable | deny / blank / in_stock | 2883 | 3085 | — | GAP | CREATE |
| MM24-N10-P2883-V3086 | N10 | Goji Ripe | 1 BITE | 50 g | 5.99 | — | GST-inclusive; taxable | deny / blank / in_stock | 2883 | 3086 | — | GAP | CREATE |
| MM24-N11-P2889-V3087 | N11 | Fudge | 12 FUDGE | 50 g | 59.99 | 71.99 | GST-inclusive; taxable | deny / blank / in_stock | 2889 | 3087 | — | GAP | CREATE |
| MM24-N11-P2889-V3088 | N11 | Fudge | 6 FUDGE | 50 g | 32.99 | 35.99 | GST-inclusive; taxable | deny / blank / in_stock | 2889 | 3088 | — | GAP | CREATE |
| MM24-N11-P2889-V3089 | N11 | Fudge | 1 FUDGE | 50 g | 5.99 | — | GST-inclusive; taxable | deny / blank / in_stock | 2889 | 3089 | — | GAP | CREATE |
| WOO-P3104-V3104 | — | Lavender & Bougainvillaea Bath Salts (500g) | (simple product; no Woo option) | 500 g | 29.95 | 34.95 | GST-inclusive; taxable | deny / blank / in_stock | 3104 | 3104 | — | GAP | OUT-OF-SCOPE (launch) |
| MM24-N15-P3345-V3345 | N15 | Pure Carob Elixir | (simple product; no Woo option) | 150 g | 23.95 | — | GST-inclusive; taxable | deny / blank / in_stock | 3345 | 3345 | 8708835180741 | GAP | UPDATE |
| MM24-B06-P5133-V5134 | B06 | GAP — exact title absent; required qualifier: Almond | 1 BAR | 90 g | 12.95 | — | GST-inclusive; taxable | deny / blank / in_stock | 5133 | 5134 | 8708822499525 | GAP | UPDATE |
| MM24-B06-P5133-V5135 | B06 | GAP — exact title absent; required qualifier: Almond | 2 BARS | 90 g | 25.25 | 25.9 | GST-inclusive; taxable | deny / blank / in_stock | 5133 | 5135 | 8708822499525 | GAP | UPDATE |
| MM24-B06-P5133-V5136 | B06 | GAP — exact title absent; required qualifier: Almond | 5 BARS | 90 g | 61.51 | 64.75 | GST-inclusive; taxable | deny / blank / in_stock | 5133 | 5136 | 8708822499525 | GAP | UPDATE |
| MM24-B05-P5145-V5146 | B05 | GAP — exact title absent; required qualifier: Cayenne | 1 BAR | 90 g | 12.95 | — | GST-inclusive; taxable | deny / blank / in_stock | 5145 | 5146 | 8708821156037 | GAP | UPDATE |
| MM24-B05-P5145-V5147 | B05 | GAP — exact title absent; required qualifier: Cayenne | 2 BARS | 90 g | 25.25 | 25.9 | GST-inclusive; taxable | deny / blank / in_stock | 5145 | 5147 | 8708821156037 | GAP | UPDATE |
| MM24-B05-P5145-V5148 | B05 | GAP — exact title absent; required qualifier: Cayenne | 5 BARS | 90 g | 61.51 | 64.75 | GST-inclusive; taxable | deny / blank / in_stock | 5145 | 5148 | 8708821156037 | GAP | UPDATE |
| WOO-P5172-V5172 | — | Organic Vegan Bundle of Carob Bars (6x90g) | (simple product; no Woo option) | 90 g | 73.82 | 77.7 | GST-inclusive; taxable | deny / blank / in_stock | 5172 | 5172 | — | GAP | ARCHIVE |
| MM24-B03-P5436-V5437 | B03 | GAP — exact title absent; required qualifier: Hazelnut (not Roasted Hazelnut) | 1 BAR | 90 g | 12.95 | — | GST-inclusive; taxable | deny / blank / in_stock | 5436 | 5437 | 8708825317573 | GAP | UPDATE |
| MM24-B03-P5436-V5438 | B03 | GAP — exact title absent; required qualifier: Hazelnut (not Roasted Hazelnut) | 2 BARS | 90 g | 25.25 | 25.9 | GST-inclusive; taxable | deny / blank / in_stock | 5436 | 5438 | 8708825317573 | GAP | UPDATE |
| MM24-B03-P5436-V5439 | B03 | GAP — exact title absent; required qualifier: Hazelnut (not Roasted Hazelnut) | 5 BARS | 90 g | 61.51 | 64.75 | GST-inclusive; taxable | deny / blank / in_stock | 5436 | 5439 | 8708825317573 | GAP | UPDATE |
| MM24-B02-P5451-V5452 | B02 | GAP — exact title absent; required qualifier: Peppermint | 1 BAR | 90 g | 12.95 | — | GST-inclusive; taxable | deny / blank / in_stock | 5451 | 5452 | 8708824105157 | GAP | UPDATE |
| MM24-B02-P5451-V5453 | B02 | GAP — exact title absent; required qualifier: Peppermint | 2 BARS | 90 g | 25.25 | 25.9 | GST-inclusive; taxable | deny / blank / in_stock | 5451 | 5453 | 8708824105157 | GAP | UPDATE |
| MM24-B02-P5451-V5454 | B02 | GAP — exact title absent; required qualifier: Peppermint | 5 BARS | 90 g | 61.51 | 64.75 | GST-inclusive; taxable | deny / blank / in_stock | 5451 | 5454 | 8708824105157 | GAP | UPDATE |
| MM24-N06-P5540-V5541 | N06 | Almond Moon | 1 MOON | 12 g | 2.5 | — | GST-inclusive; taxable | deny / blank / in_stock | 5540 | 5541 | 8708830888133 | GAP | UPDATE |
| MM24-N06-P5540-V5542 | N06 | Almond Moon | 5 MOONS | 12 g | 12.19 | 12.5 | GST-inclusive; taxable | deny / blank / in_stock | 5540 | 5542 | 8708830888133 | GAP | UPDATE |
| MM24-N06-P5540-V5543 | N06 | Almond Moon | 10 MOONS | 12 g | 23.75 | 24.99 | GST-inclusive; taxable | deny / blank / in_stock | 5540 | 5543 | 8708830888133 | GAP | UPDATE |
| MM24-N03-P5550-V5551 | N03 | Roasted Hazelnut Moon | 1 MOON | 12 g | 2.5 | — | GST-inclusive; taxable | deny / blank / in_stock | 5550 | 5551 | 8708832198853 | GAP | UPDATE |
| MM24-N03-P5550-V5553 | N03 | Roasted Hazelnut Moon | 5 MOONS | 12 g | 12.19 | 12.5 | GST-inclusive; taxable | deny / blank / in_stock | 5550 | 5553 | 8708832198853 | GAP | UPDATE |
| MM24-N03-P5550-V5554 | N03 | Roasted Hazelnut Moon | 10 MOONS | 12 g | 23.75 | 24.99 | GST-inclusive; taxable | deny / blank / in_stock | 5550 | 5554 | 8708832198853 | GAP | UPDATE |
| MM24-N02-P5556-V5557 | N02 | Peppermint Moon | 1 MOON | 12 g | 2.5 | — | GST-inclusive; taxable | deny / blank / in_stock | 5556 | 5557 | 8708832821445 | GAP | UPDATE |
| MM24-N02-P5556-V5559 | N02 | Peppermint Moon | 5 MOONS | 12 g | 12.19 | 12.5 | GST-inclusive; taxable | deny / blank / in_stock | 5556 | 5559 | 8708832821445 | GAP | UPDATE |
| MM24-N02-P5556-V5560 | N02 | Peppermint Moon | 10 MOONS | 12 g | 23.75 | 24.99 | GST-inclusive; taxable | deny / blank / in_stock | 5556 | 5560 | 8708832821445 | GAP | UPDATE |
| WOO-P5804-V5806 | — | Womens Relax Crew Jumper | Powder, S | GAP | 120 | — | GST-inclusive; taxable | deny / blank / in_stock | 5804 | 5806 | — | GAP | OUT-OF-SCOPE (launch) |
| WOO-P5815-V5815 | — | Access Cap – Ecru | (simple product; no Woo option) | GAP | 45 | — | GST-inclusive; taxable | deny / blank / in_stock | 5815 | 5815 | — | GAP | OUT-OF-SCOPE (launch) |
| WOO-P5816-V5816 | — | Bucket Hat – Ecru | (simple product; no Woo option) | GAP | 45 | — | GST-inclusive; taxable | deny / blank / in_stock | 5816 | 5816 | — | GAP | OUT-OF-SCOPE (launch) |
| WOO-P5804-V5863 | — | Womens Relax Crew Jumper | Butter, S | GAP | 120 | — | GST-inclusive; taxable | deny / blank / in_stock | 5804 | 5863 | — | GAP | OUT-OF-SCOPE (launch) |
| WOO-P5804-V5864 | — | Womens Relax Crew Jumper | Butter, M | GAP | 120 | — | GST-inclusive; taxable | deny / blank / in_stock | 5804 | 5864 | — | GAP | OUT-OF-SCOPE (launch) |
| WOO-P5804-V5865 | — | Womens Relax Crew Jumper | Butter, L | GAP | 120 | — | GST-inclusive; taxable | deny / blank / in_stock | 5804 | 5865 | — | GAP | OUT-OF-SCOPE (launch) |
| WOO-P5804-V5866 | — | Womens Relax Crew Jumper | Butter, XL | GAP | 120 | — | GST-inclusive; taxable | deny / blank / in_stock | 5804 | 5866 | — | GAP | OUT-OF-SCOPE (launch) |
| WOO-P5804-V5867 | — | Womens Relax Crew Jumper | Powder, M | GAP | 120 | — | GST-inclusive; taxable | deny / blank / in_stock | 5804 | 5867 | — | GAP | OUT-OF-SCOPE (launch) |
| WOO-P5804-V5868 | — | Womens Relax Crew Jumper | Powder, L | GAP | 120 | — | GST-inclusive; taxable | deny / blank / in_stock | 5804 | 5868 | — | GAP | OUT-OF-SCOPE (launch) |
| WOO-P5804-V5869 | — | Womens Relax Crew Jumper | Powder, XL | GAP | 120 | — | GST-inclusive; taxable | deny / blank / in_stock | 5804 | 5869 | — | GAP | OUT-OF-SCOPE (launch) |
| WOO-P5803-V5870 | — | Womens Maple Organic Tee – Natural | S | GAP | 75 | — | GST-inclusive; taxable | deny / blank / in_stock | 5803 | 5870 | — | GAP | OUT-OF-SCOPE (launch) |
| WOO-P5803-V5871 | — | Womens Maple Organic Tee – Natural | M | GAP | 75 | — | GST-inclusive; taxable | deny / blank / in_stock | 5803 | 5871 | — | GAP | OUT-OF-SCOPE (launch) |
| WOO-P5803-V5872 | — | Womens Maple Organic Tee – Natural | L | GAP | 75 | — | GST-inclusive; taxable | deny / blank / in_stock | 5803 | 5872 | — | GAP | OUT-OF-SCOPE (launch) |
| WOO-P5803-V5873 | — | Womens Maple Organic Tee – Natural | XL | GAP | 75 | — | GST-inclusive; taxable | deny / blank / in_stock | 5803 | 5873 | — | GAP | OUT-OF-SCOPE (launch) |
| WOO-P5811-V5875 | — | Mens Relax Hoodie | Butter, S | GAP | 120 | — | GST-inclusive; taxable | deny / blank / in_stock | 5811 | 5875 | — | GAP | OUT-OF-SCOPE (launch) |
| WOO-P5811-V5876 | — | Mens Relax Hoodie | Butter, M | GAP | 120 | — | GST-inclusive; taxable | deny / blank / in_stock | 5811 | 5876 | — | GAP | OUT-OF-SCOPE (launch) |
| WOO-P5811-V5877 | — | Mens Relax Hoodie | Butter, L | GAP | 120 | — | GST-inclusive; taxable | deny / blank / in_stock | 5811 | 5877 | — | GAP | OUT-OF-SCOPE (launch) |
| WOO-P5811-V5878 | — | Mens Relax Hoodie | Butter, XL | GAP | 120 | — | GST-inclusive; taxable | deny / blank / in_stock | 5811 | 5878 | — | GAP | OUT-OF-SCOPE (launch) |
| WOO-P5811-V5879 | — | Mens Relax Hoodie | Carolina Blue, S | GAP | 120 | — | GST-inclusive; taxable | deny / blank / in_stock | 5811 | 5879 | — | GAP | OUT-OF-SCOPE (launch) |
| WOO-P5811-V5880 | — | Mens Relax Hoodie | Carolina Blue, M | GAP | 120 | — | GST-inclusive; taxable | deny / blank / in_stock | 5811 | 5880 | — | GAP | OUT-OF-SCOPE (launch) |
| WOO-P5811-V5881 | — | Mens Relax Hoodie | Carolina Blue, L | GAP | 120 | — | GST-inclusive; taxable | deny / blank / in_stock | 5811 | 5881 | — | GAP | OUT-OF-SCOPE (launch) |
| WOO-P5811-V5882 | — | Mens Relax Hoodie | Carolina Blue, XL | GAP | 120 | — | GST-inclusive; taxable | deny / blank / in_stock | 5811 | 5882 | — | GAP | OUT-OF-SCOPE (launch) |
| WOO-P5811-V5883 | — | Mens Relax Hoodie | Cobalt Blue, S | GAP | 120 | — | GST-inclusive; taxable | deny / blank / in_stock | 5811 | 5883 | — | GAP | OUT-OF-SCOPE (launch) |
| WOO-P5811-V5884 | — | Mens Relax Hoodie | Cobalt Blue, M | GAP | 120 | — | GST-inclusive; taxable | deny / blank / in_stock | 5811 | 5884 | — | GAP | OUT-OF-SCOPE (launch) |
| WOO-P5811-V5885 | — | Mens Relax Hoodie | Cobalt Blue, L | GAP | 120 | — | GST-inclusive; taxable | deny / blank / in_stock | 5811 | 5885 | — | GAP | OUT-OF-SCOPE (launch) |
| WOO-P5811-V5886 | — | Mens Relax Hoodie | Cobalt Blue, XL | GAP | 120 | — | GST-inclusive; taxable | deny / blank / in_stock | 5811 | 5886 | — | GAP | OUT-OF-SCOPE (launch) |
| WOO-P5807-V5887 | — | Mens Classic Organic Tee | Butter, S | GAP | 75 | — | GST-inclusive; taxable | deny / blank / in_stock | 5807 | 5887 | — | GAP | OUT-OF-SCOPE (launch) |
| WOO-P5807-V5888 | — | Mens Classic Organic Tee | Butter, M | GAP | 75 | — | GST-inclusive; taxable | deny / blank / in_stock | 5807 | 5888 | — | GAP | OUT-OF-SCOPE (launch) |
| WOO-P5807-V5889 | — | Mens Classic Organic Tee | Butter, L | GAP | 75 | — | GST-inclusive; taxable | deny / blank / in_stock | 5807 | 5889 | — | GAP | OUT-OF-SCOPE (launch) |
| WOO-P5807-V5890 | — | Mens Classic Organic Tee | Butter, XL | GAP | 75 | — | GST-inclusive; taxable | deny / blank / in_stock | 5807 | 5890 | — | GAP | OUT-OF-SCOPE (launch) |
| WOO-P5807-V5891 | — | Mens Classic Organic Tee | Cobalt Blue, S | GAP | 75 | — | GST-inclusive; taxable | deny / blank / in_stock | 5807 | 5891 | — | GAP | OUT-OF-SCOPE (launch) |
| WOO-P5807-V5892 | — | Mens Classic Organic Tee | Cobalt Blue, M | GAP | 75 | — | GST-inclusive; taxable | deny / blank / in_stock | 5807 | 5892 | — | GAP | OUT-OF-SCOPE (launch) |
| WOO-P5807-V5893 | — | Mens Classic Organic Tee | Cobalt Blue, L | GAP | 75 | — | GST-inclusive; taxable | deny / blank / in_stock | 5807 | 5893 | — | GAP | OUT-OF-SCOPE (launch) |
| WOO-P5807-V5894 | — | Mens Classic Organic Tee | Cobalt Blue, XL | GAP | 75 | — | GST-inclusive; taxable | deny / blank / in_stock | 5807 | 5894 | — | GAP | OUT-OF-SCOPE (launch) |
| MM24-N18-P5927-V5927 | N18 | Carob Powder | (simple product; no Woo option) | 300 g | 14.95 | — | GST-inclusive; taxable | deny / blank / in_stock | 5927 | 5927 | — | GAP | CREATE |
| MM24-B01-P6012-V6013 | B01 | GAP — exact title absent; required qualifier: Pure | 1 BAR | 90 g | 12.95 | — | GST-inclusive; taxable | deny / blank / in_stock | 6012 | 6013 | 8708816240837 | GAP | UPDATE |
| MM24-B01-P6012-V6014 | B01 | GAP — exact title absent; required qualifier: Pure | 2 BARS | 90 g | 25.25 | 25.9 | GST-inclusive; taxable | deny / blank / in_stock | 6012 | 6014 | 8708816240837 | GAP | UPDATE |
| MM24-B01-P6012-V6015 | B01 | GAP — exact title absent; required qualifier: Pure | 5 BARS | 90 g | 61.51 | 64.75 | GST-inclusive; taxable | deny / blank / in_stock | 6012 | 6015 | 8708816240837 | GAP | UPDATE |
| MM24-N12-P6035-V6035 | N12 | Eclipse Bites Bundles | (simple product; no Woo option) | 50 g | 24.99 | — | GST-inclusive; taxable | deny / blank / in_stock | 6035 | 6035 | — | GAP | CREATE |
| MM24-B02-P5451-V6216 | B02 | GAP — exact title absent; required qualifier: Peppermint | 10 BARS | 90 g | 116.55 | 129.5 | GST-inclusive; taxable | deny / blank / in_stock | 5451 | 6216 | 8708824105157 | GAP | UPDATE |
| MM24-B03-P5436-V6217 | B03 | GAP — exact title absent; required qualifier: Hazelnut (not Roasted Hazelnut) | 10 BARS | 90 g | 116.55 | 129.5 | GST-inclusive; taxable | deny / blank / in_stock | 5436 | 6217 | 8708825317573 | GAP | UPDATE |
| MM24-B01-P6012-V6218 | B01 | GAP — exact title absent; required qualifier: Pure | 10 BARS | 90 g | 116.55 | 129.5 | GST-inclusive; taxable | deny / blank / in_stock | 6012 | 6218 | 8708816240837 | GAP | UPDATE |
| MM24-B05-P5145-V6219 | B05 | GAP — exact title absent; required qualifier: Cayenne | 10 BARS | 90 g | 116.55 | 129.5 | GST-inclusive; taxable | deny / blank / in_stock | 5145 | 6219 | 8708821156037 | GAP | UPDATE |
| MM24-B06-P5133-V6220 | B06 | GAP — exact title absent; required qualifier: Almond | 10 BARS | 90 g | 116.55 | 129.5 | GST-inclusive; taxable | deny / blank / in_stock | 5133 | 6220 | 8708822499525 | GAP | UPDATE |
| MM24-B04-P2416-V6222 | B04 | GAP — exact title absent; required identity: Coconut and Goji | 10 BARS | 90 g | 116.55 | 129.5 | GST-inclusive; taxable | deny / blank / in_stock | 2416 | 6222 | 8708819681477 | GAP | UPDATE |
| MM24-N17-P2432-V6223 | N17 | Bananas | 20 BANANAS | 20 g | 50.99 | 59.99 | GST-inclusive; taxable | deny / blank / in_stock | 2432 | 6223 | 8708834623685 | GAP | UPDATE |
| MM24-N04-P2395-V6224 | N04 | Goji and Coconut Moon | 20 MOONS | 12 g | 44.99 | 49.99 | GST-inclusive; taxable | deny / blank / in_stock | 2395 | 6224 | 8708830003397 | GAP | UPDATE |
| MM24-N06-P5540-V6225 | N06 | Almond Moon | 20 MOONS | 12 g | 44.99 | 49.99 | GST-inclusive; taxable | deny / blank / in_stock | 5540 | 6225 | 8708830888133 | GAP | UPDATE |
| MM24-N03-P5550-V6226 | N03 | Roasted Hazelnut Moon | 20 MOONS | 12 g | 44.99 | 49.99 | GST-inclusive; taxable | deny / blank / in_stock | 5550 | 6226 | 8708832198853 | GAP | UPDATE |
| MM24-N02-P5556-V6227 | N02 | Peppermint Moon | 20 MOONS | 12 g | 44.99 | 49.99 | GST-inclusive; taxable | deny / blank / in_stock | 5556 | 6227 | 8708832821445 | GAP | UPDATE |
| MM24-N01-PRODUCT-GAP | N01 | BLOCKED-ON-CLIENT — Pure Carob Moon | BLOCKED — price per rung, pack ladder, weight and approved title missing | GAP | GAP | — | GAP — no Woo source; do not borrow the 90g bar's tax/commerce mapping | GAP / blank / GAP — no Woo product or stock record | — | — | — | GAP | CREATE |
| MM24-N05-PRODUCT-GAP | N05 | BLOCKED-ON-CLIENT — Cayenne Moon | BLOCKED — price per rung, pack ladder, weight and approved title missing | GAP | GAP | — | GAP — no Woo source; do not borrow the 90g bar's tax/commerce mapping | GAP / blank / GAP — no Woo product or stock record | — | — | — | GAP | CREATE |
| MM24-N13-PRODUCT-GAP | N13 | SURPLUS — unnamed Goji Bites candidate | Not a pending product | GAP | GAP | — | not mapped — surplus candidate | GAP / blank / not mapped — surplus candidate | — | — | — | GAP | OUT-OF-SCOPE (launch) |
| MM24-N14-PRODUCT-GAP | N14 | SURPLUS — unnamed Coconut Bites candidate | Not a pending product | GAP | GAP | — | not mapped — surplus candidate | GAP / blank / not mapped — surplus candidate | — | — | — | GAP | OUT-OF-SCOPE (launch) |
| SHOPIFY-P8708828922053 | — | Pure Carob & Cacao Butter Moons | (live product; detail retained only for archive disposition) | GAP | GAP | — | not mapped — archive candidate | GAP / blank / not mapped — archive candidate | — | — | 8708828922053 | GAP | ARCHIVE |
| SHOPIFY-P8708831609029 | — | Cayenne Chilli Celtic Salt Moons | (live product; detail retained only for archive disposition) | GAP | GAP | — | not mapped — archive candidate | GAP / blank / not mapped — archive candidate | — | — | 8708831609029 | GAP | ARCHIVE |
| SHOPIFY-P8708840227013 | — | Digital Gift Card | (live product; variant detail not required for archive disposition) | GAP | GAP | — | not mapped — archive candidate | GAP / blank / not mapped — archive candidate | — | — | 8708840227013 | GAP | ARCHIVE |
| SHOPIFY-P8708839669957 | — | Gift Box — Premium | (live product; variant detail not required for archive disposition) | GAP | GAP | — | not mapped — archive candidate | GAP / blank / not mapped — archive candidate | — | — | 8708839669957 | GAP | ARCHIVE |
| SHOPIFY-P8708839309509 | — | Gift Box — Classic | (live product; variant detail not required for archive disposition) | GAP | GAP | — | not mapped — archive candidate | GAP / blank / not mapped — archive candidate | — | — | 8708839309509 | GAP | ARCHIVE |
| SHOPIFY-P8708838064325 | — | Mixed Moons 6-Pack | (live product; variant detail not required for archive disposition) | GAP | GAP | — | not mapped — archive candidate | GAP / blank / not mapped — archive candidate | — | — | 8708838064325 | GAP | ARCHIVE |
| SHOPIFY-P8708837638341 | — | Mixed Bars 6-Pack | (live product; variant detail not required for archive disposition) | GAP | GAP | — | not mapped — archive candidate | GAP / blank / not mapped — archive candidate | — | — | 8708837638341 | GAP | ARCHIVE |
| SHOPIFY-P8708837146821 | — | The Full Range | (live product; variant detail not required for archive disposition) | GAP | GAP | — | not mapped — archive candidate | GAP / blank / not mapped — archive candidate | — | — | 8708837146821 | GAP | ARCHIVE |
| SHOPIFY-P8708836655301 | — | Moon Sampler | (live product; variant detail not required for archive disposition) | GAP | GAP | — | not mapped — archive candidate | GAP / blank / not mapped — archive candidate | — | — | 8708836655301 | GAP | ARCHIVE |
| SHOPIFY-P8708836196549 | — | The Starter Pack | (live product; variant detail not required for archive disposition) | GAP | GAP | — | not mapped — archive candidate | GAP / blank / not mapped — archive candidate | — | — | 8708836196549 | GAP | ARCHIVE |

## BLOCKED-ON-CLIENT — consolidated

- `N01` — price per rung; pack ladder; weight; approved title.
- `N05` — price per rung; pack ladder; weight; approved title.
- `B01` — approved customer title.
- `B02` — approved customer title.
- `B03` — approved customer title.
- `B04` — approved customer title.
- `B05` — approved customer title.
- `B06` — approved customer title.
- `N10` — customer-title confirmation.
- `N16` — customer-title confirmation.
- `N17` — customer-title confirmation.
- `B01`–`B06`, `N04`, `N05`, `N07`–`N14`, `N17`, `N18` — approved imagery for 18 products.
- `N18` — approved description.
- All governed products — approved SKU scheme; Woo supplies no SKU.
- All Woo-mapped products — quantity snapshot; Woo `Stock` is blank.
- All Woo-mapped products — structured shipping weight; Woo `Weight (kg)` is blank.

## Customer-copy divergences requiring approval attention

1. **Missing Woo identities:** N01/N05 are ruled real `CREATE` products with no Woo mapping; N13/N14 are ruled surplus and out of launch scope. The former “all 5 bites” versus seven candidates conflict is **RESOLVED — Nate, 20 Aug 2026**: four literally named Woo Bites plus `Salted Caramel Fudge (50g)` equals five; the bundle groups those five.
2. **Title authority:** the six bars have no approved exact customer title. N10 `Goji Ripe`, N16 `Spiced Carob`, and N17 `Bananas` were taken from later email headings but remain confirmation flags. N03 follows the direct current qualifier ruling (`Roasted Hazelnut Moon`) even though CAT R2 retained older `Hazelnut Moon`.
3. **Live Shopify hierarchy drift:** every matched live range needs reconciliation: bars, four mapped moons and bananas have fewer live variants than the Woo authority; elixirs have more. The eight live gift/bundle products plus the two moon records disallowed as mappings by Nate's ruling are explicit ARCHIVE proposals.

## Stockist metaobject definition — scope only

Proposed type: `stockist_location`. One metaobject per governed directory row; **204 records total**. Source accounting was read from the existing governed 204-row directory: 125 Independent store, 77 National chain, 2 Online / delivery. No object is created here.

| Field key | Shopify field type | Required | Population from the 204 source rows | Rule |
|---|---|---|---|---|
| name | single_line_text_field | yes | 204/204 | Exact supplied business/listing name. |
| location_type | single_line_text_field | yes | 204/204 | Exact source `type`; validate to Independent store, National chain, Online / delivery. |
| source_group | single_line_text_field | yes | 204/204 | Exact source `group`; preserve even though it parallels type. |
| state | single_line_text_field | no | 197/204 substantive; 7 source values are `UNKNOWN` | Store the seven as blank, never customer-facing `UNKNOWN`. |
| area | single_line_text_field | no | 201/204 substantive; 3 source values are `Details pending` | Store those three as blank; do not invent suburb/area. |
| address | multi_line_text_field | no | 201/204 | Three records have no supplied address. |
| postcode | single_line_text_field | no | 197/204 | Text, not integer, to preserve leading zero (for example `0870`); seven remain blank. |
| source_last_verified_at | date_time | no | 0/204 — GAP | Define for future provenance, but do not populate without an authority timestamp. |

The seven incomplete records are: Alkhemy - Aegle Aceso Pty Ltd; Fruit Lovers Maroochydore; Go Natural Foods; Health Nuts Kings Cross; Kombu Wholefoods; Vegan Grocery Store; West End Organics. All seven lack postcode/state; the first three also lack address and substantive area. Customer presentation for missing location data is exactly `Location details unavailable`. No coordinates, hours, phone, email, website, verification badge or map-pin field is scoped because none is present in the governed 204-row source.

## Verification

Required commands and assertions are recorded below. A blank/zero-content check is never treated as a pass.

```text
$ shasum -a 256 "/Users/handtomouse/Library/Messages/Attachments/e0/00/3631B118-5A32-487A-8E55-C0533B3B96CB/Maple Moon Store CSV File Export.csv"
eeea19fd89b30052bd4c4cf28519f56f1195e4595c92485fb186a66719e6b114  /Users/handtomouse/Library/Messages/Attachments/e0/00/3631B118-5A32-487A-8E55-C0533B3B96CB/Maple Moon Store CSV File Export.csv

$ python3 -c "import csv;rows=list(csv.DictReader(open('/Users/handtomouse/Library/Messages/Attachments/e0/00/3631B118-5A32-487A-8E55-C0533B3B96CB/Maple Moon Store CSV File Export.csv')));print(len(rows))"
119

$ git -C /Users/handtomouse/maplemoon-website diff --stat
 .../CATALOGUE-RECONCILIATION-20260820.md           | 339 +++++++++++++++++++++
 .../catalogue-reconciliation-20260820.csv          | 114 +++++++

$ git -C /Users/handtomouse/maplemoon-website status --porcelain
 A docs/orchestration/CATALOGUE-RECONCILIATION-20260820.md
 A docs/orchestration/catalogue-reconciliation-20260820.csv
?? _wip/evidence/s1b_verify_20260820/
?? docs/orchestration/AUTHORITATIVE-SOURCE-PIN-20260820.md
?? docs/orchestration/FIGMA-CONTRACT-SCOPE-20260820.md
?? docs/orchestration/SHARED-CHROME-SHOP-VS-HOMEPAGE-20260820T175821.md
?? docs/orchestration/packets/MAPLEMOON-CATALOGUE-RECONCILIATION-WOO-24-20260820T175821.md
?? docs/orchestration/packets/MAPLEMOON-REGISTRY-REBASELINE-DRYRUN-20260820T175821.md
?? docs/orchestration/packets/MAPLEMOON-SHOPIFY-THEME-INVENTORY-S1B-VERIFY-20260820T175821.md
?? docs/orchestration/reviews/MAPLEMOON-S1B-VERIFY-20260820.md

PASS governed product count == 24
PASS export parent product count == 28
PASS export sellable variant count == 99 (91 variation rows + 8 simple/default variants)
PASS every nonblank price/compare-at value in the reconciliation CSV occurs verbatim in a Sale price or Regular price cell in the authority CSV
PASS zero SKUs invented (all 113 reconciliation rows have blank SKU)
PASS no price, weight or pack ladder was assigned to N01 or N05
PASS five-vs-seven Bite conflict marked RESOLVED by Nate's 20 Aug ruling
PASS all 35 sellable rows under the seven non-food Woo parents are OUT-OF-SCOPE (launch), none ARCHIVE
PASS every one of the 23 live Shopify products has exactly one per-product disposition (13 UPDATE, 10 ARCHIVE)
```

## Approval boundary

Approval of this document would approve the mapping logic and the stated `CREATE`/`UPDATE`/`ARCHIVE`/`OUT-OF-SCOPE (launch)` proposals against Woo and the governed ledger. It would **not** approve an import, Shopify mutation, publication, image admission, SKU creation, stockist metaobject creation, or any live-Shopify change; the 23 live identities are recorded here for human approval only.
