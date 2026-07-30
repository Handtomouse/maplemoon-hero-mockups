# Codex brief — Shop #743 gaps (bites reconcile + bundle + carob powder)

Lane: **shop**. File: `_wip/shop.WIP.html` ONLY. Page-local; no shared CSS/nav/footer beyond
shop's own in-page section nav; dirty checkout preserved; **NO commit; NO deploy; never --prod**.
Prices provisional pending C&D confirm (WIP, not launch). Source: Carli 19-Jul content doc +
live WooCommerce (verified 23-24 Jul). NO em dashes in any copy (use "and" or a hyphen).

## 0. Assets — convert 4 real packshots to webp into product_shots (existing/approved imagery only)
The bites/bundle/powder shots exist as real photos in `assets/products/*.jpg`, but the shop renders
`assets/product_shots/<img>.webp`. Convert (e.g. `cwebp -q 82 <src> -o <dst>`):
- `assets/products/eclipse_goji.jpg`   -> `assets/product_shots/eclipse_goji.webp`
- `assets/products/eclipse_fudge.jpg`  -> `assets/product_shots/eclipse_fudge.webp`
- `assets/products/eclipse_bundle.jpg` -> `assets/product_shots/eclipse_bundle.webp`
- `assets/products/powder_roasted.jpg` -> `assets/product_shots/powder_roasted.webp`
(`eclipse_pecan.webp`, `eclipse_almond.webp`, `eclipse_hazelnut.webp` already exist in product_shots.)

## 1. Bites — reconcile array to Carli's 5 CONFIRMED flavours (shop.WIP.html ~L317-323)
Replace the current 6-item `bites:[...]` (Coconut/Goji/Golden placeholders + Almond/Hazelnut/Pecan
Eclipse) with EXACTLY these 5 flavours + the bundle, all 50g, priced range $5.99–$59.99 (en dash,
NOT em dash; if preferred use "from $5.99"):
```
bites:[
  {n:'Pecan Nut Eclipse Bite',img:'eclipse_pecan',d:'Carob-dipped Medjool dates and pecans.',price:'$5.99–$59.99',size:'50g'},
  {n:'Salted Almond Eclipse Bite',img:'eclipse_almond',d:'Medjool dates, almonds and a pinch of Celtic salt in carob.',price:'$5.99–$59.99',size:'50g'},
  {n:'Hazelnut Eclipse Bite',img:'eclipse_hazelnut',d:'Roasted hazelnut and Medjool dates in smooth carob.',price:'$5.99–$59.99',size:'50g'},
  {n:'Goji Ripe Eclipse Bite',img:'eclipse_goji',d:'Medjool dates, almonds, cashews, coconut and goji berries in carob.',price:'$5.99–$59.99',size:'50g'},
  {n:'Salted Caramel Fudge',img:'eclipse_fudge',d:'Medjool dates, almonds, coconut and Celtic salt, carob-dipped.',price:'$5.99–$59.99',size:'50g'},
  {n:'Eclipse Bite Bundle',img:'eclipse_bundle',d:'All five Eclipse Bites together.',price:'$24.99',size:'5 x 50g'}
]
```
Descriptions are from Carli's ingredient lists — keep or tighten, do NOT invent claims. The bundle
($24.99) is the only live-store price of this set; the 5 individual tier ladders are NOT live, so show
the confirmed RANGE only — do not fabricate 5/10/20 tier prices.

## 2. Price the bites (~L334)
`var PRICED={bars:true,elixirs:true,moons:true,bites:true,bananas:true};`  (was `bites:false`)

## 3. NEW: Carob Powder 300g $14.95 — page-local section (shop's own nav only, NOT the site header nav)
- Range nav (~L254), add after Bananas: `<a href="#powder">Powder</a>`
- New section after `#bananas` (~L285), mirror the existing pattern:
  `<section class="wrap sp-sec" id="powder"><h2 class="serif">Carob Powder</h2><p class="sp-sub">...</p><div class="grid" data-cat="powder"></div></section>`
- Add to `CAT`: `powder:[{n:'Carob Powder',img:'powder_roasted',d:'Roasted organic carob powder. Caffeine free and naturally sweet, for baking, drinks and raw treats.',price:'$14.95',size:'300g'}]`
- Add `powder:true` to `PRICED`.
(The powder shot is a styled pouch — slightly different look from the isolated bite shots. Acceptable;
flag if an isolated version is wanted later.)

## 4. Update the shop splash flag (~L238)
Bites are now priced (moons still have 2 pending: Pure, Cayenne). Change:
`Bars, elixirs & bananas priced · some moons & bites pricing to follow`
->  `Bars, bites, elixirs, powder & bananas priced · some moons pricing to follow`

## Verify (by content, not status codes)
- Parse shop.WIP.html — no HTML errors; `git diff --check` — no whitespace errors.
- Serve + eyeball at 390 and 1440: bites show 5 flavours + bundle WITH prices; new Powder section
  renders with the pouch; range nav has Powder; no grey/broken tiles (4 new webp present).
- Do NOT commit / deploy / --prod. Update `_LIVE_TRACKER_20260723.md` only on a material change.
