# MapleMoon Shopify catalogue reconciliation R3

**Status:** DOCUMENTATION COMPLETE · EXTERNAL REFRESH HOLD · ZERO SHOPIFY WRITES

This is the corrected migration specification for the governed Maple Moon catalogue. It uses the pinned Woo export for catalogue commerce facts, the current durable Boss ledger for the 24-product boundary, the fully enumerated 20 August Shopify identity list, and the 23 August complete read that reconfirmed the 23-product totals and relevant identities. The 24 August browser and CLI sessions are expired, so the Shopify snapshot is deliberately not described as current enough for mutation.

## Corrections to earlier derived documents

1. The governed launch catalogue is exactly 24: Bars 6, Moons 6, Eclipses 6, Bites 2, Elixirs 2, Bananas 1, Powder 1.
2. Goji Carob Bites and Coconut Carob Bites remain distinct, identity-held governed products. The stale N13/N14 surplus interpretation is not carried forward.
3. Eclipse Bites is a collection/family, not a standalone product. Its six products are Pecan, Salted Almond, Hazelnut, Goji Ripe, Salted Caramel Fudge and Eclipse Bite Bundle.
4. The five variable Eclipse products use Woo effective prices $5.99 / $32.99 / $59.99; the 6- and 12-pack compare-at values are $35.99 / $71.99.
5. Woo contains no SKU, GTIN, stock quantity or structured shipping weight anywhere in the export. Every such value stays blank/HOLD.

## Governed 24-product proposal

| ID | Family | Customer product | Woo parent | Shopify ID | Proposal | Exact commerce state |
|---|---|---|---:|---:|---|---|
| B01 | Bars | Pure Carob & Cacao Butter | 6012 | 8708816240837 | UPDATE | 1 BAR: $12.95; 2 BARS: $25.25 (compare $25.9); 5 BARS: $61.51 (compare $64.75); 10 BARS: $116.55 (compare $129.5) |
| B02 | Bars | Peppermint & Buckwheat | 5451 | 8708824105157 | UPDATE | 1 BAR: $12.95; 2 BARS: $25.25 (compare $25.9); 5 BARS: $61.51 (compare $64.75); 10 BARS: $116.55 (compare $129.5) |
| B03 | Bars | Roasted Hazelnut | 5436 | 8708825317573 | UPDATE | 1 BAR: $12.95; 2 BARS: $25.25 (compare $25.9); 5 BARS: $61.51 (compare $64.75); 10 BARS: $116.55 (compare $129.5) |
| B04 | Bars | Coconut & Goji | 2416 | 8708819681477 | UPDATE | 1 BAR: $12.95; 2 BARS: $25.25 (compare $25.9); 5 BARS: $61.51 (compare $64.75); 10 BARS: $116.55 (compare $129.5) |
| B05 | Bars | Cayenne Chilli | 5145 | 8708821156037 | UPDATE | 1 BAR: $12.95; 2 BARS: $25.25 (compare $25.9); 5 BARS: $61.51 (compare $64.75); 10 BARS: $116.55 (compare $129.5) |
| B06 | Bars | Almond & Celtic Salt | 5133 | 8708822499525 | UPDATE | 1 BAR: $12.95; 2 BARS: $25.25 (compare $25.9); 5 BARS: $61.51 (compare $64.75); 10 BARS: $116.55 (compare $129.5) |
| N01 | Moons | Pure Carob Moon | — | — | CREATE | HOLD — no Woo commerce source |
| N02 | Moons | Peppermint Moon | 5556 | 8708832821445 | UPDATE | 1 MOON: $2.5; 5 MOONS: $12.19 (compare $12.5); 10 MOONS: $23.75 (compare $24.99); 20 MOONS: $44.99 (compare $49.99) |
| N03 | Moons | Roasted Hazelnut Moon | 5550 | 8708832198853 | UPDATE | 1 MOON: $2.5; 5 MOONS: $12.19 (compare $12.5); 10 MOONS: $23.75 (compare $24.99); 20 MOONS: $44.99 (compare $49.99) |
| N04 | Moons | Coconut & Goji Moon | 2395 | 8708830003397 | UPDATE | 1 MOON: $2.5; 5 MOONS: $12.19 (compare $12.5); 10 MOONS: $23.75 (compare $24.99); 20 MOONS: $44.99 (compare $49.99) |
| N05 | Moons | Cayenne Moon | — | — | CREATE | HOLD — no Woo commerce source |
| N06 | Moons | Almond Moon | 5540 | 8708830888133 | UPDATE | 1 MOON: $2.5; 5 MOONS: $12.19 (compare $12.5); 10 MOONS: $23.75 (compare $24.99); 20 MOONS: $44.99 (compare $49.99) |
| N07 | Eclipses | Pecan Nut Eclipse Bite | 2850 | — | CREATE | 1 BITE: $5.99; 6 BITES: $32.99 (compare $35.99); 12 BITES: $59.99 (compare $71.99) |
| N08 | Eclipses | Salted Almond Eclipse Bite | 2877 | — | CREATE | 1 BITE: $5.99; 6 BITES: $32.99 (compare $35.99); 12 BITES: $59.99 (compare $71.99) |
| N09 | Eclipses | Hazelnut Eclipse Bite | 2857 | — | CREATE | 1 BITE: $5.99; 6 BITES: $32.99 (compare $35.99); 12 BITES: $59.99 (compare $71.99) |
| N10 | Eclipses | Goji Ripe Eclipse Bite | 2883 | — | CREATE | 1 BITE: $5.99; 6 BITES: $32.99 (compare $35.99); 12 BITES: $59.99 (compare $71.99) |
| N11 | Eclipses | Salted Caramel Fudge | 2889 | — | CREATE | 1 FUDGE: $5.99; 6 FUDGE: $32.99 (compare $35.99); 12 FUDGE: $59.99 (compare $71.99) |
| N12 | Eclipses | Eclipse Bite Bundle | 6035 | — | CREATE | Default Title: $24.99 |
| N13 | Bites | Goji Carob Bites | — | — | CREATE | HOLD — no Woo commerce source |
| N14 | Bites | Coconut Carob Bites | — | — | CREATE | HOLD — no Woo commerce source |
| N15 | Elixirs | Pure Carob Elixir | 3345 | 8708835180741 | UPDATE | Default Title: $23.95 |
| N16 | Elixirs | Spiced Carob Elixir | 2440 | 8708835672261 | UPDATE | Default Title: $26.95 |
| N17 | Bananas | Carob Bananas | 2432 | 8708834623685 | UPDATE | 1 BANANA: $2.99; 5 BANANAS: $14.25 (compare $14.99); 10 BANANAS: $26.99 (compare $29.99); 20 BANANAS: $50.99 (compare $59.99) |
| N18 | Powder | Carob Powder | 5927 | — | CREATE | Default Title: $14.95 |

Tally: **UPDATE 13 · CREATE 11 = 24**. Exactly 20 governed products map to Woo; the four without Woo commerce authority are Pure Carob Moon, Cayenne Moon, Goji Carob Bites and Coconut Carob Bites.

## Recorded Shopify identity baseline

| Shopify ID | Current title | Status | Governed match | Proposal |
|---:|---|---|---|---|
| 8708816240837 | Pure Carob & Cacao Butter Bar | ACTIVE | B01 | UPDATE |
| 8708824105157 | Peppermint Buckwheat Crisp Bar | ACTIVE | B02 | UPDATE |
| 8708825317573 | Roasted Dark Hazelnut Bar | ACTIVE | B03 | UPDATE |
| 8708819681477 | Goji & Coconut Bar | ACTIVE | B04 | UPDATE |
| 8708821156037 | Cayenne Chilli & Celtic Salt Bar | ACTIVE | B05 | UPDATE |
| 8708822499525 | Salted Almond Bar | ACTIVE | B06 | UPDATE |
| 8708828922053 | Pure Carob & Cacao Butter Moons | ACTIVE | — | ARCHIVE_PROPOSAL |
| 8708832821445 | Peppermint Buckwheat Crisp Moons | ACTIVE | N02 | UPDATE |
| 8708832198853 | Roasted Hazelnut Moons | ACTIVE | N03 | UPDATE |
| 8708830003397 | Coconut & Goji Moons | ACTIVE | N04 | UPDATE |
| 8708831609029 | Cayenne Chilli Celtic Salt Moons | ACTIVE | — | ARCHIVE_PROPOSAL |
| 8708830888133 | Almond Celtic Salt Moons | ACTIVE | N06 | UPDATE |
| 8708835180741 | Plain Carob Elixir | DRAFT | N15 | UPDATE |
| 8708835672261 | Spiced Carob Elixir | DRAFT | N16 | UPDATE |
| 8708834623685 | Carob Bananas | ACTIVE | N17 | UPDATE |
| 8708840227013 | Digital Gift Card | DRAFT | — | ARCHIVE_PROPOSAL |
| 8708839669957 | Gift Box — Premium | DRAFT | — | ARCHIVE_PROPOSAL |
| 8708839309509 | Gift Box — Classic | DRAFT | — | ARCHIVE_PROPOSAL |
| 8708838064325 | Mixed Moons 6-Pack | DRAFT | — | ARCHIVE_PROPOSAL |
| 8708837638341 | Mixed Bars 6-Pack | DRAFT | — | ARCHIVE_PROPOSAL |
| 8708837146821 | The Full Range | DRAFT | — | ARCHIVE_PROPOSAL |
| 8708836655301 | Moon Sampler | DRAFT | — | ARCHIVE_PROPOSAL |
| 8708836196549 | The Starter Pack | DRAFT | — | ARCHIVE_PROPOSAL |

Provenance: the full ID/title/status list was enumerated read-only on 20 August; the 23 August complete catalogue read revalidated the 23-product totals and relevant mapped/absent identities. It is not represented as a 24 August live mutation basis. Tally: **13 ACTIVE · 10 DRAFT = 23**. Proposed reconciliation is **UPDATE 13 · ARCHIVE_PROPOSAL 10**. An archive proposal is not archive authority.

## External and data holds

- Fresh Shopify read is required immediately before any mutation because browser and CLI authentication expired on 2026-08-24.
- All Woo SKUs, GTINs, stock quantities and structured shipping weights are blank; no values may be invented.
- Pure Carob Moon, Cayenne Moon, Goji Carob Bites and Coconut Carob Bites have no Woo commerce source.
- Archive proposals require a fresh backup and a separate explicitly authorised Shopify write packet.
- Publish, checkout, theme, payment, shipping, tax, domain and production remain separately gated.

## Image boundary

Carob Powder is the sole already admitted KEEP image in this catalogue record. Every other product must use the approved image-free layout unless an exact source/output/hash/slot is separately admitted. Review-only, wrong-product, fake and unapproved imagery is excluded.

## Decision and next gate

R3 is ready for Boss admission as the catalogue specification only. Before any Shopify mutation: authenticate read-only, export/backup the live catalogue, prove the 23-product identity/status snapshot has not drifted, then issue a separate exact reversible write packet. Theme publish, payments, shipping, tax, domains, production and client contact remain outside this packet.

Machine mirror: `_wip/evidence/shopify_catalogue_reconciliation_r3_20260824T104207/CATALOGUE-R3.json`.
