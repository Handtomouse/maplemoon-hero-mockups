# MapleMoon Shopify collections plan — 20 Aug 2026

Store: `maplemooncarob.myshopify.com` (password protected). **Nothing here has been applied.**
This is a build sheet for whoever holds Admin access.

## ⚠ Status of the merge: UNRATIFIED WORKING ASSUMPTION, not a ruling

19 Aug 2026: the `Bites & Eclipses` heading becomes **`Eclipse Bites`**. **This is not ratified.**
`docs/orchestration/REGISTRY_AUTHORITY_20260819.md` states the edit "has **not** been re-pinned or
ratified", and the governed 24-card accounting still keeps `Bites 2` and `Eclipses 6` **separate**.
Treat everything below as a build sheet pending ratification (question Q11), not an instruction.

The intended end state: the separate "Bites" grouping goes away and those products sit under one
merged `Eclipse Bites` heading. The only source for it is the 19 Aug `_wip/shop.WIP.html` edit
(that file is owned by another lane and was not opened or modified by this lane).

## Live WooCommerce categories today

| Live category | Live URL |
|---|---|
| Carob Crescents | `/product-category/carob-crescents/` |
| Carob Bars | `/product-category/carob-bars/` |
| Carob Bananas | `/product-category/carob-bananas/` |
| Eclipse Bites | `/product-category/eclipse-bites/` |
| Maple Moon Products | `/product-category/maple-moon-products/` |
| Carob Elixirs | `/product-category/carob-elixirs/` |

There is **no separate "Bites" category on live** — live already uses a single `eclipse-bites`
category. The 19 Aug change therefore costs nothing on the data side; it is a *heading/label*
change in the new build, not a category split that needs unpicking.

## Target Shopify collections

All **manual** collections unless noted, so the merge cannot be re-broken by a stale smart rule.

| Handle | Title | Type | Members |
|---|---|---|---|
| `eclipse-bites` | Eclipse Bites | Manual | 5 individual bites + the 5x50g bundle |
| `carob-bars` | Carob Bars | Manual | 90g bar range + 6x90g bundle |
| `carob-crescents` | Carob Crescents | Manual | 12g crescent moon range |
| `carob-bananas` | Carob Bananas | Manual | Carob Coated Bananas 20g |
| `carob-elixirs` | Carob Elixirs | Manual | Spiced Carob Elixir, Carob Elixir 150g |
| `all` | (Shopify built-in) | Auto | catch-all; absorbs `maple-moon-products` |

`maple-moon-products` is **not** recreated. It was a catch-all on Woo and Shopify's built-in
`/collections/all` covers it. The redirect map sends it to `/collections/all`.

## Do NOT create

- No `bites` collection — pending Q11. The 19 Aug change removes it, but that change is unratified.
- No apparel/merch collection until someone rules on whether the tees, hoodie, cap and bucket
  hat are in scope for the new store at all (open question Q5).

## Addendum — what the 19 Aug change actually merges

Added after reading the 14 Aug catalogue-truth audits. The merge is **not** about live Woo
categories; it is about the **24-card private candidate catalogue** in the new build, which splits:

`Bars 6 · Moons 6 · Eclipses 6 · Bites 2 · Elixirs 2 · Bananas 1 · Powder 1 = 24`

The `Bites 2` group is **Goji Carob Bites** and **Coconut Carob Bites** — both marked
`PRIVATE-PREVIEW-ONLY`, both "Enquire · made to order", both under an identity hold pending exact
source naming (`MAPLEMOON_BOSS_EXECUTION_LEDGER_20260816.md`). The 19 Aug (unratified) change folds that
2-card `Bites` group into the `Eclipse Bites` heading so the shop shows one heading, not two.

**Consequence for Shopify:** the merge is a *heading* change, and the two cards it absorbs are
enquiry-only holds that must **not** be created as priced Shopify products. So the Shopify
`eclipse-bites` collection contains only the six launch SKUs in the import CSV. Do not create a
`bites` collection, and do not add the two held cards to `eclipse-bites` until Q2 is answered.
