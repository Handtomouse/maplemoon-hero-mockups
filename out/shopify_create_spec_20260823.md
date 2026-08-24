# MapleMoon Shopify create spec, staged 2026-08-23

Approval-gated staging document for `maplemooncarob.myshopify.com`. Snapshot time: 2026-08-23T21:56:39+1000. No Shopify data was changed.

Fresh read-only confirmation: 23 products were returned across explicit status reads: 13 active, 10 draft, and 0 archived. All variant titles were included. No product title, handle, product type, tag, body, variant title, or SKU matched Eclipse Bites, Pecan Bite, Goji Ripe, or Carob Powder. The custom collections, smart collections, and online-store pages also had no matching resource. Every result was one page with no next-page link.

| Product | New or rename | Price status | Image status |
|---|---|---|---|
| Eclipse Bites | NEW SKU, not a probable rename | PRICE NOT SPECIFIED | REAL: `/Users/handtomouse/maplemoon-website/assets/product_shots/final_20260823/eclipse_bites_range.png` |
| Pecan Nut Eclipse Bite | NEW SKU, not a probable rename | SPECIFIED: $5.99 / $32.99 / $59.99 | NONE |
| Goji Ripe Eclipse Bite | NEW SKU, not a probable rename | SPECIFIED: $5.99 / $32.99 / $59.99 | REAL: `/Users/handtomouse/maplemoon-website/assets/product_shots/final_20260823/goji_ripe_eclipse_bites.png` |
| Carob Powder | NEW SKU, not a probable rename | SPECIFIED: $14.95 | REAL: `/Users/handtomouse/maplemoon-website/assets/product_shots/final_20260823/carob_powder_no_bg.png` |

The handles below are deterministic slugs of the site titles. `product_type` is singular to match the store's existing singular taxonomy (`Bar`, `Moon`, `Banana`, `Elixir`, `Bundle`). `vendor` follows all 23 current products. Tags translate only the visible site diet badges and the stated product names or ingredients. Sources: `/Users/handtomouse/maplemoon-website/shop.html:385`, `/Users/handtomouse/maplemoon-website/shop.html:404`, and the fresh Shopify product reads.

## Eclipse Bites

- New or rename: **NEW SKU, not a probable rename.** It resembles the existing bite-sized Moon line, but it is a distinct site range. The site gives Eclipse Bites its own category and copy at `/Users/handtomouse/maplemoon-website/shop.html:322`. Its individual products use 50g bites and `1 bite`, `6 bites`, `12 bites` options, while Shopify Moons use `4-Pack (45g each)`, `6x 4-Pack`, and `12x 4-Pack`. No active, draft, or archived Shopify field contains `Eclipse` or `Eclipse Bite`.
- `title`: `Eclipse Bites`
- `handle`: `eclipse-bites`
- `product_type`: `Eclipse Bite`
- `vendor`: `Maple Moon`
- `tags`: `caffeine-free, eclipse-bite, gluten-free, vegan`
- `body_html`: `<p>The perfect treats for those that desire a healthy clean creation made with whole ingredients.</p>`
- Copy provenance: Carli text copied verbatim from `/Users/handtomouse/maplemoon-website/out/shopify_diff_20260823.md:173`; the same site text appears at `/Users/handtomouse/maplemoon-website/shop.html:323`.
- `status`: `draft`
- `images`:
  - `/Users/handtomouse/maplemoon-website/assets/product_shots/final_20260823/eclipse_bites_range.png`
- `variants`:
  - `title`: `Default Title`
  - `option name`: none
  - `option values`: none
  - `price`: `""`
  - `weight`: `""`
  - `weight_unit`: `""`
- Price: **PRICE NOT SPECIFIED.** The site has no product entry titled `Eclipse Bites`; it has only the category copy at `/Users/handtomouse/maplemoon-website/shop.html:322`. Prices shown for individually named bites and the bundle are not carried into this field.

## Pecan Nut Eclipse Bite

- New or rename: **NEW SKU, not a probable rename.** The format resembles the Moon line, but the fresh Shopify catalogue has no `Pecan`, `Pecan Bite`, or Eclipse match in any active, draft, or archived product field or variant. The site's distinct 50g size and bite pack ladder do not match the store's 45g Moon or 90g Bar variants. There is no existing product that can be safely renamed.
- `title`: `Pecan Nut Eclipse Bite`
- `handle`: `pecan-nut-eclipse-bite`
- `product_type`: `Eclipse Bite`
- `vendor`: `Maple Moon`
- `tags`: `caffeine-free, carob, contains-nuts, eclipse-bite, gluten-free, pecan, vegan`
- `body_html`: `<p>A blend of pecans and dates for a fudgy inside, coated in our pure carob</p>`
- Copy provenance: Carli text copied verbatim from `/Users/handtomouse/maplemoon-website/out/shopify_diff_20260823.md:196`; the site title and identical text appear at `/Users/handtomouse/maplemoon-website/shop.html:386`.
- `status`: `draft`
- `images`: `NONE`
- `option name`: `Pack`
- `option values`: `1 bite`, `6 bites`, `12 bites`
- `variants`:

| Variant title | Option `Pack` | Price | Weight | Weight unit |
|---|---|---:|---:|---|
| `1 bite` | `1 bite` | `$5.99` | `50` | `g` |
| `6 bites` | `6 bites` | `$32.99` | `""` | `""` |
| `12 bites` | `12 bites` | `$59.99` | `""` | `""` |

- Price: **SPECIFIED.** The site displays `$5.99–$59.99` for this product at `/Users/handtomouse/maplemoon-website/shop.html:386`; the exact ladder is `$5.99`, `$32.99`, `$59.99` at `/Users/handtomouse/maplemoon-website/shop.html:357` and `/Users/handtomouse/maplemoon-website/shop.html:361`.
- Weight: the site states `50g` at `/Users/handtomouse/maplemoon-website/shop.html:386`. Only the single-bite variant receives that exact stated shipping weight. Aggregate 6-bite and 12-bite weights stay blank because the site does not state them.

## Goji Ripe Eclipse Bite

- New or rename: **NEW SKU, not a probable rename.** The two closest Shopify products are `Goji & Coconut Bar` (`goji-coconut-bar`, ID `8708819681477`, product type `Bar`) and `Coconut & Goji Moons` (`coconut-goji-moons`, ID `8708830003397`, product type `Moon`). Neither is safe to rename: their formats and variant titles are 90g Bar and 45g-each Moon packs, while the site defines this as a layered 50g Eclipse Bite with different ingredients and a different pack ladder. Evidence for the excluded candidates is also recorded at `/Users/handtomouse/maplemoon-website/out/shopify_diff_20260823.md:222`.
- `title`: `Goji Ripe Eclipse Bite`
- `handle`: `goji-ripe-eclipse-bite`
- `product_type`: `Eclipse Bite`
- `vendor`: `Maple Moon`
- `tags`: `caffeine-free, carob, contains-coconut, contains-nuts, eclipse-bite, gluten-free, goji, vegan`
- `body_html`: `<p>Two layers for a fruit indulgence. Goji berries, dates and almonds blended together and layered on coconut and cashews.</p>`
- Copy provenance: Carli text copied verbatim from `/Users/handtomouse/maplemoon-website/out/shopify_diff_20260823.md:219`; the site title and identical text appear at `/Users/handtomouse/maplemoon-website/shop.html:389`.
- `status`: `draft`
- `images`:
  - `/Users/handtomouse/maplemoon-website/assets/product_shots/final_20260823/goji_ripe_eclipse_bites.png`
- `option name`: `Pack`
- `option values`: `1 bite`, `6 bites`, `12 bites`
- `variants`:

| Variant title | Option `Pack` | Price | Weight | Weight unit |
|---|---|---:|---:|---|
| `1 bite` | `1 bite` | `$5.99` | `50` | `g` |
| `6 bites` | `6 bites` | `$32.99` | `""` | `""` |
| `12 bites` | `12 bites` | `$59.99` | `""` | `""` |

- Price: **SPECIFIED.** The site displays `$5.99–$59.99` for this product at `/Users/handtomouse/maplemoon-website/shop.html:389`; the exact ladder is `$5.99`, `$32.99`, `$59.99` at `/Users/handtomouse/maplemoon-website/shop.html:357` and `/Users/handtomouse/maplemoon-website/shop.html:361`.
- Weight: the site states `50g` at `/Users/handtomouse/maplemoon-website/shop.html:389`. Only the single-bite variant receives that exact stated shipping weight. Aggregate 6-bite and 12-bite weights stay blank because the site does not state them.

## Carob Powder

- New or rename: **NEW SKU, not a probable rename.** No active, draft, or archived Shopify product, variant, collection, or page contains `Powder` or `Carob Powder`, so there is no safe rename candidate.
- `title`: `Carob Powder`
- `handle`: `carob-powder`
- `product_type`: `Powder`
- `vendor`: `Maple Moon`
- `tags`: `caffeine-free, carob, gluten-free, organic, powder, vegan`
- `body_html`: `<p>Roasted organic carob powder. Caffeine free and naturally sweet, for baking, drinks and raw treats.</p>`
- Copy provenance: the site title and copy appear at `/Users/handtomouse/maplemoon-website/shop.html:339` and `/Users/handtomouse/maplemoon-website/shop.html:401`.
- Carli image instruction, verbatim: `image needs background removed so it matches the others`
- Image-instruction provenance: `/Users/handtomouse/maplemoon-website/out/shopify_diff_20260823.md:303`.
- `status`: `draft`
- `images`:
  - `/Users/handtomouse/maplemoon-website/assets/product_shots/final_20260823/carob_powder_no_bg.png`
- `variants`:
  - `title`: `Default Title`
  - `option name`: none
  - `option values`: none
  - `price`: `$14.95`
  - `weight`: `300`
  - `weight_unit`: `g`
- Price: **SPECIFIED: `$14.95`.** Source: `/Users/handtomouse/maplemoon-website/shop.html:401`.
- Weight: **SPECIFIED: `300g`.** Source: `/Users/handtomouse/maplemoon-website/shop.html:401`.

## Bundles resolution proposal

Fresh candidate state:

| Resource | Handle | ID | Current status |
|---|---|---:|---|
| Collection: Bundles & Value Packs | `bundles-value-packs` | `333883900101` | `published` |
| Mixed Bars 6-Pack | `mixed-bars-6-pack` | `8708837638341` | `draft` |
| Mixed Moons 6-Pack | `mixed-moons-6-pack` | `8708838064325` | `draft` |
| Moon Sampler | `moon-sampler` | `8708836655301` | `draft` |
| The Full Range | `the-full-range` | `8708837146821` | `draft` |
| The Starter Pack | `the-starter-pack` | `8708836196549` | `draft` |

**Recommendation: publish the five draft Bundle products, after their currently `$0.00` variant prices and availability are approved. Do not apply Carli's copy to `bundles-value-packs`.** The collection is already published and correctly describes general bundles. Carli's exact text, `Can't decide? Try the range. All 5 bites to satisfy your cravings and curiosity.`, describes a five-item Eclipse Bite bundle, while none of the collection's five products is an Eclipse Bite bundle. Applying it to the collection would misdescribe all five products. Publishing the correctly scoped draft products makes the existing collection usable without corrupting its meaning. This is a resolution proposal only; no publish action is authorised here.

Read-only endpoints used for the fresh confirmation:

- `GET /admin/api/2026-07/products.json?status=active`
- `GET /admin/api/2026-07/products.json?status=draft`
- `GET /admin/api/2026-07/products.json?status=archived`
- `GET /admin/api/2026-07/custom_collections.json`
- `GET /admin/api/2026-07/smart_collections.json`
- `GET /admin/api/2026-07/pages.json`
- `GET /admin/api/2026-07/collects.json?collection_id=333883900101`
- `GET /admin/api/2026-07/shop.json`
- `GET /admin/oauth/access_scopes.json`

ZERO Shopify write calls were made. No REST create, update, delete, publish, image-upload, GraphQL mutation, or theme write was called.
