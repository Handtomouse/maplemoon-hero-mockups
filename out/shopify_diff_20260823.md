# MapleMoon Shopify copy diff — 2026-08-23

Read-only staging report for `maplemooncarob.myshopify.com`. Snapshot taken 2026-08-23 AEST. No Shopify data was changed.

Copy in every PROPOSED block is Carli's exact wording. Nothing has been applied to Shopify.

## Counts

- Total instructions: 11
- Copy-only instructions: 10
- Image-involving instructions: 1 (`Carob Powder`)
- Located Shopify resources: 6
- Ambiguous Shopify mappings: 1
- Absent Shopify resources: 4
- Classification check: 6 Located + 1 Ambiguous + 4 Absent = 11

## Located Shopify resources

### 1. Moons (description)

- Resource type: collection
- Shopify title: `Carob Moons`
- Handle: `carob-moons`
- ID: `333883801797`
- Featured image: none

#### CURRENT

```html
<p>Our signature moon-shaped carob treats — the original MapleMoon classic.</p>
```

#### PROPOSED

```text
Little bite sized treats in every flavour for any moment
```

Mapping note: Clean section-level match to the `Carob Moons` collection; the instruction label is abbreviated.

### 2. Pure Carob

- Resource type: product
- Shopify title: `Pure Carob & Cacao Butter Moons`
- Handle: `pure-carob-cacao-butter-moons`
- ID: `8708828922053`
- Featured image: none

#### CURRENT

```html
<p>Smooth carob moons made with pure cacao butter. Bite-sized, rich, and satisfying. Vegan, organic, caffeine-free, gluten-free, and additive-free. 4-pack (45g each).</p>
```

#### PROPOSED

```text
A crescent of pure carob and cacao butter
```

Mapping note: Two title candidates exist: this Moons product and `Pure Carob & Cacao Butter Bar` (`pure-carob-cacao-butter-bar`, ID `8708816240837`); staged against Moons because Carli's proposed copy says “A crescent”, but approval should confirm that candidate.

### 3. Elixirs (section)

- Resource type: collection
- Shopify title: `Carob Elixirs`
- Handle: `carob-elixirs`
- ID: `333883867333`
- Featured image: none

#### CURRENT

```html
<p>Sippable carob elixirs — a naturally caffeine-free alternative to hot chocolate and coffee.</p>
```

#### PROPOSED

```text
The nightcap with benefits
```

Mapping note: The phrase Carli asked to remove, “the nightcap that behaves”, is not present in this Shopify collection body; do not overwrite until the intended section field is confirmed.

### 4. Pure Carob Elixir

- Resource type: product
- Shopify title: `Plain Carob Elixir`
- Handle: `plain-carob-elixir`
- ID: `8708835180741`
- Featured image: none

#### CURRENT

```html
<p>A smooth, velvety carob elixir. Vegan, organic, caffeine-free, gluten-free, and refined sugar-free. 250ml.</p>
```

#### PROPOSED

```text
A warm carob drink with only two ingredients, naturally sweet and caffeine free.
```

Mapping note: The source label differs from the Shopify title, but this is the only plain/pure elixir candidate.

### 5. Spiced Carob

- Resource type: product
- Shopify title: `Spiced Carob Elixir`
- Handle: `spiced-carob-elixir`
- ID: `8708835672261`
- Featured image: none

#### CURRENT

```html
<p>An Ayurvedic-inspired spiced carob elixir with warming spices. Vegan, organic, caffeine-free, and gluten-free. 250ml.</p>
```

#### PROPOSED

```text
A warm carob drink with an Ayurvedic inspired spice blend
```

Mapping note: Clean product match; the instruction label is abbreviated.

### 6. Bananas

- Resource type: product
- Shopify title: `Carob Bananas`
- Handle: `carob-bananas`
- ID: `8708834623685`
- Featured image: none

#### CURRENT

```html
<p>Australian dried bananas coated in carob and cacao butter. A naturally sweet, guilt-free treat. Vegan, organic, caffeine-free, and gluten-free. 4-pack (80g).</p>
```

#### PROPOSED

```text
Spray Free Australian Grown Bananas coated in our pure carob for the perfect chewy treat.
```

Mapping note: Clean product match; the instruction label is abbreviated.

## Full catalogue reclassification of the five unmatched instructions

The fresh full-catalogue pull returned all 23 products, all 17 custom collections, zero smart collections, and all 8 online-store pages. Product fields included title, handle, ID, product_type, tags, status, featured image, body copy, and every variant title, ID, and SKU. Collection and page fields used their available equivalents. All four REST lists were complete single pages with no next-page link.

### 7. Eclipse Bites

- Classification: ABSENT
- Resource type: none
- Shopify title: none
- Handle: none
- ID: none
- Featured image: none

#### CURRENT

```text
No matching Shopify resource exists, so there is no CURRENT Shopify copy.
```

#### PROPOSED

```text
The perfect treats for those that desire a healthy clean creation made with whole ingredients.
```

Mapping note: High-confidence ABSENT result. The full product catalogue was checked across titles, handles, tags, product_type, body copy, all variant titles and SKUs, and active, draft, and archived status. The full custom-collection, smart-collection, and page catalogues were checked across titles, handles, and body copy. No `Eclipse` resource, `Eclipse Bite` product_type or tag, or Eclipse variant exists.

### 8. Pecan Bite

- Classification: ABSENT
- Resource type: none
- Shopify title: none
- Handle: none
- ID: none
- Featured image: none

#### CURRENT

```text
No matching Shopify resource exists, so there is no CURRENT Shopify copy.
```

#### PROPOSED

```text
A blend of pecans and dates for a fudgy inside, coated in our pure carob
```

Mapping note: High-confidence ABSENT result. The full product catalogue was checked across titles, handles, tags, product_type, body copy, all variant titles and SKUs, and active, draft, and archived status for `Pecan`, `Pecan Bite`, `Bite`, and related fragments. Collections and pages were checked across titles, handles, and body copy. No pecan or bite match exists, including at variant level.

### 9. Goji Ripe

- Classification: ABSENT
- Resource type: none
- Shopify title: none
- Handle: none
- ID: none
- Featured image: none

#### CURRENT

```text
No matching Shopify resource exists, so there is no CURRENT Shopify copy.
```

#### PROPOSED

```text
Two layers for a fruit indulgence. Goji berries, dates and almonds blended together and layered on coconut and cashews.
```

Mapping note: High-confidence ABSENT result. The same full-catalogue fields and all statuses were checked for `Goji`, `Ripe`, `Goji Ripe`, `Eclipse`, and `Bite`. Two broad goji-tag matches were excluded: `goji-coconut-bar` (ID `8708819681477`, product_type `Bar`) and `coconut-goji-moons` (ID `8708830003397`, product_type `Moon`). Their variants are only pack sizes, and neither is a Goji Ripe or Eclipse Bite resource.

### 10. Bundles

- Classification: AMBIGUOUS
- Candidate set: one published collection and its five draft products
- Featured image: none on every candidate

Candidate resources:

1. collection, `Bundles & Value Packs`, handle `bundles-value-packs`, ID `333883900101`, status `published`
2. product, `Mixed Bars 6-Pack`, handle `mixed-bars-6-pack`, ID `8708837638341`, product_type `Bundle`, status `draft`
3. product, `Mixed Moons 6-Pack`, handle `mixed-moons-6-pack`, ID `8708838064325`, product_type `Bundle`, status `draft`
4. product, `Moon Sampler`, handle `moon-sampler`, ID `8708836655301`, product_type `Bundle`, status `draft`
5. product, `The Full Range`, handle `the-full-range`, ID `8708837146821`, product_type `Bundle`, status `draft`
6. product, `The Starter Pack`, handle `the-starter-pack`, ID `8708836196549`, product_type `Bundle`, status `draft`

#### CURRENT

Candidate 1, `bundles-value-packs`:

```html
<p>Save more with curated bundles and value packs of your favourite MapleMoon products.</p>
```

Candidate 2, `mixed-bars-6-pack`:

```html
<p>Pick any 6 carob bars from our range. Mix and match your favorites. Vegan, organic, caffeine-free, gluten-free, and additive-free.</p>
```

Candidate 3, `mixed-moons-6-pack`:

```html
<p>Pick any 6 moon 4-packs from our range. Mix and match your favorites. Vegan, organic, caffeine-free, gluten-free, and additive-free.</p>
```

Candidate 4, `moon-sampler`:

```html
<p>One 4-pack of each of our 6 carob moon flavors. Discover your favorite moon. Vegan, organic, caffeine-free, gluten-free, and additive-free.</p>
```

Candidate 5, `the-full-range`:

```html
<p>One bar and one moon 4-pack of every flavor, plus a pack of carob bananas. The complete Maple Moon experience. Vegan, organic, caffeine-free, gluten-free, and additive-free.</p>
```

Candidate 6, `the-starter-pack`:

```html
<p>One of each of our 6 carob bar flavors. The perfect introduction to Maple Moon. Vegan, organic, caffeine-free, gluten-free, and additive-free.</p>
```

#### PROPOSED

```text
Can't decide? Try the range. All 5 bites to satisfy your cravings and curiosity.
```

Mapping note: High-confidence AMBIGUOUS result. `bundles-value-packs` is the only collection matched on title/handle and it contains exactly the five products matched on product_type/tag `Bundle`; all five are draft. None is an Eclipse Bite bundle and no variant supplies that missing match. The tie requires confirmation that Carli meant the collection-level copy, one of these five products, or a not-yet-created Eclipse Bite bundle.

### 11. Carob Powder

- Classification: ABSENT
- Resource type: none
- Shopify title: none
- Handle: none
- ID: none
- Featured image: none

#### CURRENT

```text
No matching Shopify product or featured image exists, so there is no CURRENT Shopify image to change.
```

#### PROPOSED

```text
image needs background removed so it matches the others
```

Mapping note: High-confidence ABSENT result. The full product catalogue was checked across titles, handles, tags, product_type, body copy, featured-image metadata, all variant titles and SKUs, and active, draft, and archived status for `Powder`, `Carob Powder`, and related fragments. Collections and pages were also checked across titles, handles, body copy, and available image fields. No Shopify powder resource or featured image exists.

## Image work separated from copy

- `Carob Powder` is the only image-involving instruction in Carli's eleven-item spec.
- It is unmatched in Shopify, so there is no Shopify product image to edit or replace in this lane.
- No other product in the supplied eleven-item spec asks for an image change.

## Read-only API record

- Fresh full-catalogue REST `GET` endpoints: `/admin/api/2026-07/products.json`, `/admin/api/2026-07/custom_collections.json`, `/admin/api/2026-07/smart_collections.json`, and `/admin/api/2026-07/pages.json`; `/admin/api/2026-07/collects.json` was read to enumerate the five products in `bundles-value-packs`.
- Fresh complete-list counts: 23 products (13 active, 10 draft, 0 archived), 17 custom collections, 0 smart collections, and 8 pages; explicit product status queries returned 23 unique IDs, and every list returned on one page with no `rel="next"` link.
- Read permissions exercised by the queried resource classes: `read_products`, `read_online_store_pages`, `read_themes`, `read_metaobject_definitions`.
- Metadata reads: shop identity and the installed app's access-scope list.
- Transport used: REST `GET` requests plus one GraphQL `query` request. There were no REST `POST`, `PUT`, `PATCH`, or `DELETE` writes and no GraphQL `mutation`.
- Confirmation: **no write API call was made; nothing was written, updated, published, unpublished, or altered in Shopify.**
