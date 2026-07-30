# Product Lineup Carousel Section Review

Scope: homepage Image 2 only, `_wip/homepage_real_1_lead_photo.WIP.html`, primarily `#range` plus the category tabs that drive it.

## Current Read

The current section is a real-packshot coverflow that starts immediately after the hero. It is visually strong: the bars feel premium, the soft blue-to-paper dissolve is on brand, and the center product has enough scale to make the range feel tangible.

In the rendered WIP, though, the section reads as a continuation of the hero rather than a clear collection preview. The user clicks `Shop the Range` and lands in a zone where the hero trust row, the product fan, the selected-product heading, the category tabs, and the quick-shop controls all stack into one long module.

Carli's source copy for this homepage slot is:

- Featured Collection Preview: Handcrafted Carob Creations
- Carob Bars: Smooth, naturally sweet bites for calm cravings.
- Carob Crescents: Elegant, bite-sized comfort.
- Carob Elixirs: Versatile powdered goodness for drinks and baking.
- Eclipse Bites: Mini indulgences perfect for gifting or grazing.
- CTA: View Full Range

Current visible categories are `Moons`, `Bars`, `Bites`, `Elixirs`, and `Bananas`. That does not match the featured collection structure above, and some current category/product/pricing states are not safe to treat as final customer-facing content.

## Issues

1. The section has no own headline.
   The carousel starts with packshots only. Since the hero wordmark, CTA, and trust line are still visible above it, the collection preview has no clean handoff into Carli's `Handcrafted Carob Creations` copy.

2. The category controls sit too late.
   The tabs are below the selected-product name and description. That means the user first reads `Selected bar`, then later discovers the format switcher. For a range preview, the order should be: collection heading, format tabs, product fan, selected product detail.

3. Mobile is visually compressed.
   At 390px wide, the viewport contains hero copy, trust text, carousel arrows, five packshots, the selected product title, and the top of the tab row. The price and CTA are below the fold. It looks impressive, but it asks the first mobile screen to do too much.

4. Category names drift from Carli's supplied copy.
   `Moons` should be `Carob Crescents` if this is the featured collection preview. `Bites` should be `Eclipse Bites`. `Bananas` is not in Carli's featured collection list and should be moved out of this homepage preview unless Nate explicitly wants a fifth format.

5. Some item data looks invented or provisional.
   Current `Bites` include `Coconut Bites`, `Goji Bites`, and `Golden Bites`, while Carli's product list names Eclipse Bite products such as `Pecan Nut Eclipse Bite`, `Salted Almond Eclipse Bite`, `Hazelnut Eclipse Bite`, `Goji Ripe Eclipse Bite`, and `Salted Caramel Fudge`. The homepage preview should not surface non-source product names as if they are final.

6. Arrows feel detached from the product fan.
   On desktop, the arrows sit at the wrap edges, far from the products. On mobile, the arrows sit partly off-canvas and compete with the side products. For one-item categories, both arrows should be hidden or disabled.

## Option A: Minimal Framing Fix

Keep the current coverflow and quick-shop structure. Add a compact heading above the product fan and rename the tabs to match Carli's featured collection terms.

Changes:

- Add `Featured collection preview` eyebrow.
- Add `Handcrafted carob creations` heading.
- Move the category tabs above the carousel.
- Rename `Moons` to `Crescents` or `Carob Crescents`.
- Rename `Bites` to `Eclipse Bites`.
- Remove `Bananas` from this homepage preview until confirmed.
- Keep the existing selected-product detail below the carousel.

This is the fastest fix. It makes the section understandable without rebuilding the interaction.

## Option B: Category-Led Carousel

Keep the carousel, but make it a true collection preview rather than a product selector first.

Changes:

- Use Carli's four collection formats as the primary tabs: `Carob Bars`, `Carob Crescents`, `Carob Elixirs`, `Eclipse Bites`.
- Add a short category line under the active tab using Carli's exact category copy with colon punctuation in visible copy.
- Only show numeric prices and Add to Cart for confirmed product states.
- For pending or category-level formats, use `View Full Range` instead of product-specific commerce.
- Pull the arrows closer to the stage and hide them when a category has fewer than two visible products.

This preserves the premium coverflow moment, but gives the section a cleaner editorial hierarchy and safer content model.

## Option C: Four-Format Preview Grid

Replace the homepage carousel with a four-format preview grid using one real image per format, then keep the detailed carousel for the shop page.

Cards:

- Carob Bars: Smooth, naturally sweet bites for calm cravings.
- Carob Crescents: Elegant, bite-sized comfort.
- Carob Elixirs: Versatile powdered goodness for drinks and baking.
- Eclipse Bites: Mini indulgences perfect for gifting or grazing.

This is the safest content option because it maps directly to Carli's homepage copy. It is less cinematic than the current fan, so I would only choose it if Nate wants the homepage to be calmer and clearer over more interactive.

## Recommended Option

Use Option B.

It keeps the best part of the current work, the real packshot coverflow, while fixing the section's hierarchy and source-copy drift. It also avoids presenting provisional products, prices, or categories as final.

Option A is acceptable as a quick review pass. Option C is stronger for clarity, but it discards a distinctive visual moment that is already working.

## Exact Scoped Patch Suggestion

Do not apply this until Nate approves the direction. If approved, touch only `_wip/homepage_real_1_lead_photo.WIP.html`.

1. Markup, around lines 538-562:
   - Add a section header inside `#range`.
   - Move `#catTabs` from the separate `#shop` section into `#range`, before `#stage`.
   - Remove `Bananas` from the homepage tab set for now.
   - Rename visible category labels to source-aligned terms.

Suggested structure:

```html
<section class="wrap wf-line" id="range">
  <div class="wf-line-head">
    <span class="qkick">Featured collection preview</span>
    <h2 class="lux-hd">Handcrafted carob creations</h2>
    <p id="rangeCopy">Smooth, naturally sweet bites for calm cravings.</p>
  </div>

  <div class="wf-tabs wf-range-tabs" id="catTabs" aria-label="Shop by format">
    <button class="wf-tab on" type="button" data-cat="bars"><span>Carob Bars</span></button>
    <button class="wf-tab" type="button" data-cat="crescents"><span>Carob Crescents</span></button>
    <button class="wf-tab" type="button" data-cat="elixirs"><span>Carob Elixirs</span></button>
    <button class="wf-tab" type="button" data-cat="eclipseBites"><span>Eclipse Bites</span></button>
  </div>

  <button class="arw l" aria-label="Previous"><svg viewBox="0 0 24 24"><polyline points="15 6 9 12 15 18"/></svg></button>
  <div class="wf-cf" id="stage"></div>
  <button class="arw r" aria-label="Next"><svg viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18"/></svg></button>
</section>
```

Then leave `#shop` as the selected-product detail block only.

2. CSS, around lines 126-149:
   - Add a centered but compact `.wf-line-head`.
   - Give the header enough top margin to separate it from the hero dissolve.
   - Make `.wf-range-tabs` sit above the fan with less rule weight than the current full-width tab bar.
   - Move arrows inward on desktop and fully inside the viewport on mobile.

Suggested additions:

```css
.wf-line-head{text-align:center;max-width:720px;margin:28px auto 18px;position:relative;z-index:3;}
.wf-line-head .lux-hd{margin:0 0 10px;}
.wf-line-head p{margin:0 auto;color:var(--ink-soft);font-size:1rem;line-height:1.55;max-width:48ch;}
.wf-range-tabs{margin:10px auto 12px;border-color:rgba(58,42,26,.16);}
.wf-line .arw.l{left:24px;}
.wf-line .arw.r{right:24px;}
.wf-line .arw[hidden]{display:none;}
@media (max-width:900px){
  .wf-line-head{margin:18px auto 10px;padding:0 18px;}
  .wf-line .arw.l{left:8px;}
  .wf-line .arw.r{right:8px;}
}
```

3. JS category copy, around lines 758-806:
   - Add a small source-copy map for the active format.
   - Update `#rangeCopy` in `render(cat)`.
   - Use source-aligned category keys.

Suggested source map:

```js
var RANGE_COPY={
  bars:'Smooth, naturally sweet bites for calm cravings.',
  crescents:'Elegant, bite-sized comfort.',
  elixirs:'Versatile powdered goodness for drinks and baking.',
  eclipseBites:'Mini indulgences perfect for gifting or grazing.'
};
```

4. JS product data safety, around lines 758-795:
   - Keep confirmed bar and elixir products.
   - Rename `moons` to `crescents` only if Carli and Dylan confirm the current Moon packshots are the same product family as `Carob Crescents`.
   - Replace the current `bites` array with source-named Eclipse Bite products only where a matching real packshot exists.
   - Do not surface `Coconut Bites`, `Goji Bites`, `Golden Bites`, or `Bananas` in this homepage preview without confirmation.

Safe interim state:

```js
var CAT={
  bars:[/* existing confirmed bar data */],
  crescents:[],       // content-pending unless Moon packshots are confirmed as Carob Crescents
  elixirs:[/* existing confirmed elixir data */],
  eclipseBites:[]     // replace only with source-named Eclipse Bite products that have matching packshots
};
```

If a selected category has no confirmed items yet, render a simple pending state in the stage:

```html
<div class="wf-range-pending">
  <p>Product details to follow.</p>
  <a class="wf-pill" href="shop.WIP.html">View Full Range</a>
</div>
```

5. JS arrow behavior, around lines 876-914:
   - Hide or disable arrows when `data.length < 2`.
   - Re-run this state on every `render(cat)`.

Suggested helper:

```js
function updateArrows(){
  var disabled=data.length<2;
  if(l)l.hidden=disabled;
  if(r)r.hidden=disabled;
}
```

Call `updateArrows()` at the end of `render(cat)` after `data` is set.

6. Visible CTA:
   - Use Carli's CTA for this section: `View Full Range`.
   - Keep product-specific `View Product` only where a real product URL exists.
   - Do not add new claims, reviews, or pricing beyond Carli's supplied content.
