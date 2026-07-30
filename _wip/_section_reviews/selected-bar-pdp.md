# Selected Bar PDP Section Review

Scope: homepage Image 3 only, `_wip/homepage_real_1_lead_photo.WIP.html`, section around `#shop` and `#product`.

## Current Read

The block is a polished quick-shop and PDP hybrid. It shows the selected product name and description, a category tab row, a benefits row, pack size buttons, price, a pricing flag, and Add to Cart/View Product controls.

For the current Bars state, the visual direction is calm and premium. The spacing, serif title, and restrained gold accents fit Maple Moon. The problem is that the commerce state is not category-aware enough. The confirmed bar price sits directly above a long global caveat, so the section tells the user "$12.95" and then immediately asks them to think about pricing uncertainty.

Pricing source read:

- Bars are confirmed in Carli's content brief: `$12.95`, `$61.50` for 5 bars, `$116.95` for 10 bars.
- Elixirs are confirmed in Carli's content brief: `$23.95` and `$26.95`.
- Moons, plain bites, and bananas are still pending in the section handoff.
- Eclipse bite pricing appears in the source doc but is ambiguous for the WIP category, so the current Bites category should stay pricing-pending until Carli and Dylan confirm the exact retail treatment.

## Issues

1. The pricing flag weakens the selected bar price.
   The visible line at `_wip/homepage_real_1_lead_photo.WIP.html:568` says that moons, bites, and bananas are indicative while bars and elixirs are confirmed. It is honest, but it reads like a warning attached to the selected product. For Bars, the line should either confirm the selected category or be removed from the customer-facing price stack.

2. Pending categories still behave as purchasable products.
   The JS catalog currently displays numeric placeholder prices for moons, bites, and bananas at lines 767-789, and Add to Cart stays primary for every category at line 570. That is risky because the visible UI can imply those prices are real.

3. Bundle buttons include prices but do not update the main price.
   The Bars size buttons at line 792 show `5 bars, $61.50` and `10 bars, $116.95`, but the delegated click handler at lines 897-902 only toggles the active class. The main price remains `$12.95`, which creates a direct price conflict as soon as a bundle is selected.

4. Tab hierarchy is a little over-weighted.
   The tab row has full-width top and bottom rules at lines 126-133 and sits between the selected product header and the PDP controls. It feels like a primary navigation bar, while the active state is only a small underline. The repeated "Selected bar" eyebrow plus active "Bars" tab is clear, but slightly redundant.

5. The secondary CTA is too specific for the current data.
   `View Product` hard-links to `products/pure-carob-bar.html` at line 570. That is fine for the default Pure Carob selection, but wrong after selecting another bar or another category. Until real product URLs are wired, the safe fallback is `View Range`, or only show `View Product` for items with a real URL.

## Option A: Minimal Pricing-Status Polish

Keep the layout exactly as-is. Replace the global pricing flag with a selected-category status line.

Suggested visible states:

- Bars: `Bar price confirmed`
- Elixirs: `Elixir price confirmed`
- Moons, bites, bananas: `Pricing to follow`

This is the smallest visual fix. It reduces doubt in the current screenshot and keeps the section review-friendly. It does not fully solve the placeholder-price and Add to Cart risk unless paired with the CTA changes from Option B.

## Option B: Commerce-Safe Dynamic State

Make the price stack and CTAs reflect whether the selected category is confirmed.

Confirmed categories:

- Show the numeric price.
- Keep Add to Cart primary.
- Show a small sentence-case status badge: `Bar price confirmed` or `Elixir price confirmed`.
- For Bars bundle buttons, update the main price when `5 bars` or `10 bars` is selected.

Pending categories:

- Hide numeric placeholder prices.
- Show `Pricing to follow` in the price slot.
- Disable or replace Add to Cart with `Pricing to follow`.
- Use `View Range` as the secondary CTA unless a real product URL exists.

This is the strongest practical fix because it prevents invented pricing from behaving like real commerce while preserving the premium section design.

## Option C: Hierarchy Rebalance

Make a slightly larger layout pass:

- Reduce the tab row to a compact range switcher and soften the full-width rules.
- Move benefits closer to the description as compact proof points, not a second headline.
- Treat the price, selected pack, and CTAs as one commerce cluster.
- Keep the selected-category status as a small badge attached to the price cluster.

This would look more resolved, but it is more layout work. It is best if Nate wants this section to feel less like a wireframe and more like a finished product module.

## Recommended Option

Use Option B now. It directly addresses the review risk: confirmed prices look confirmed, pending categories stop showing placeholder prices as buyable, and bundle selection no longer conflicts with the main price.

Option A is acceptable only as a very fast pass. Option C can wait until the section needs a fuller visual polish pass.

## Exact Scoped Patch Suggestion

Do not apply this until Nate approves the direction. If approved, touch only `_wip/homepage_real_1_lead_photo.WIP.html`.

1. CSS, around lines 161-169:
   - Add `font:inherit` to `.wf-sz` if it becomes a button.
   - Restyle `.wf-pflag` as a quieter sentence-case badge instead of an all-caps warning line.
   - Add `.wf-pflag.pending`, `.wf-price.pending`, and `.wf-pill[disabled]` states.

2. Markup, around lines 567-570:

```html
<div class="wf-price" id="pdpPrice">$12.95<span class="g">(90g)</span></div>
<div class="wf-pflag" id="pdpFlag">Bar price confirmed</div>
<div class="btns">
  <button class="wf-pill solid" id="pdpAdd" type="button">Add to Cart</button>
  <a class="wf-pill" id="pdpView" href="products/pure-carob-bar.html">View Product</a>
</div>
```

3. JS comment and state, around lines 757-812:

```js
// Real categories and real packshots. Bars and elixirs use confirmed prices from Carli's content brief. Moons, plain bites, bananas, and mixed Bites category pricing stay pending until confirmed.
var PRICE_STATE={
  bars:{priced:true,label:'Bar price confirmed'},
  elixirs:{priced:true,label:'Elixir price confirmed'},
  moons:{priced:false,label:'Pricing to follow'},
  bites:{priced:false,label:'Pricing to follow'},
  bananas:{priced:false,label:'Pricing to follow'}
};
```

Add DOM handles:

```js
var pdpFlag=document.getElementById('pdpFlag');
var pdpAdd=document.getElementById('pdpAdd');
var pdpView=document.getElementById('pdpView');
```

Update `setPdp(item)`:

```js
function setPdp(item){
  var state=PRICE_STATE[currentCat]||{priced:false,label:'Pricing to follow'};
  if(pdpEyebrow)pdpEyebrow.textContent=CAT_LABEL[currentCat]||'Selected flavour';
  pdpName.innerHTML=amp(item.n);
  pdpDesc.textContent=item.d;
  if(state.priced){
    pdpPrice.classList.remove('pending');
    pdpPrice.innerHTML=item.price+'<span class="g">'+item.size+'</span>';
  }else{
    pdpPrice.classList.add('pending');
    pdpPrice.textContent='Pricing to follow';
  }
  if(pdpFlag){
    pdpFlag.textContent=state.label;
    pdpFlag.classList.toggle('pending',!state.priced);
  }
  if(pdpAdd){
    pdpAdd.disabled=!state.priced;
    pdpAdd.textContent=state.priced?'Add to Cart':'Pricing to follow';
  }
  if(pdpView){
    var hasUrl=!!item.url;
    pdpView.textContent=hasUrl?'View Product':'View Range';
    pdpView.href=hasUrl?item.url:'#shop';
  }
}
```

4. Product URL safety:
   - Add `url:'products/pure-carob-bar.html'` only to the Pure Carob item for now.
   - Do not invent URLs for other products.

5. Bundle price sync, around lines 791-822 and 897-902:
   - Change `SIZES.bars` from strings to objects with `label`, `price`, and `size`.
   - Render `.wf-sz` as buttons with `data-price` and `data-size`.
   - In the click handler, after toggling `.on`, update `#pdpPrice` only when the selected size has a confirmed `data-price`.

Suggested Bars size data:

```js
bars:[
  {label:'Single bar',price:'$12.95',size:'(90g)'},
  {label:'5 bars',price:'$61.50',size:'(5 bars)'},
  {label:'10 bars',price:'$116.95',size:'(10 bars)'}
]
```

Keep moons, bites, and bananas as label-only pending options until Carli and Dylan confirm final pricing.
