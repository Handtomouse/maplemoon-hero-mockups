# Ritual Moment Section Review

Scope: `_wip/homepage_real_1_lead_photo.WIP.html`, section `#ritual`, headline `When do you moon?`

Reviewed against the current source plus local renders at 1440px desktop and 390px mobile. The supplied screenshot path was in a protected temporary directory and was not readable from this sandbox.

## Current Read

This section is doing the right content job: Carli's ritual paragraph now sits between the headline and the three usage moments. The paragraph itself should stay exactly as written.

Visually, the section reads as a calm mid-page editorial block, but the hierarchy is looser than it needs to be. On desktop, the headline and lead sit in a wide left column with a large empty right side, then the three cards start lower down. On mobile, the same content becomes a long single-column run: intro, then three large image cards. The local 390px render measured roughly 1522px tall before the next section begins.

The three tile ideas are clear enough: after dinner, afternoon reset, and tea at night. The weakness is that the current images are generic lifestyle stock, not clearly Maple Moon. Tile 1 especially reads as chocolate chunks right after the `Why not cacao?` section, which muddies the carob argument.

## Issues

1. **The lead paragraph is correct but under-designed.** It is currently an inline-styled paragraph under the headline. The copy is strong enough to become part of a two-column section intro on desktop instead of hanging under the headline with unused space to the right.

2. **The cards are too image-heavy for a mid-page ritual beat.** The current `4/3` image ratio gives each card a large photo block. This is attractive on desktop, but on mobile it makes the section slow to move through.

3. **The numbered labels imply a sequence.** `Ritual 01`, `Ritual 02`, and `Ritual 03` suggest steps. These are not steps, they are occasions. Moment labels such as `Evening`, `Afternoon`, and `Night` would encode the content more honestly.

4. **The image set lacks Maple Moon product signal.** The first image looks like cacao chocolate. The second and third support the pause or tea idea, but neither shows Maple Moon. As WIP stock they are usable, but the final section needs either Maple Moon product in frame or a simpler product-led composition.

5. **The tile captions are fine, but the layout makes them feel secondary.** The captions are doing the ritual work while the photos carry most of the visual weight. Reducing image height slightly lets the copy and product ritual idea come forward.

6. **The WIP overlay controls can cover the third card on mobile.** This is not a production issue by itself, but it makes the current preview harder to judge. A shorter image ratio helps reduce the chance that the controls sit over the important part of the third photo.

## Option A: Tighten The Existing Cards

Keep Carli's paragraph exactly as-is. Wrap the kicker, headline, and lead in a `.q-when-head` intro grid on desktop. Reduce the tile image ratio from `4/3` to `16/10`, tighten the card gap, and change the small labels from numbered rituals to occasions.

Why it works: this is the smallest practical patch. It keeps the current approved section shape, makes the paragraph feel intentionally placed, shortens the mobile run, and removes the false sequencing.

Tradeoff: it still depends on stock lifestyle photos. Tile 1 should still be replaced before final approval if stronger Maple Moon photography is available.

## Option B: Product-Led Ritual Strip

Replace the three photo cards with one wide Maple Moon product image, for example `assets/photo_finals/maplemoon_heros55_brandmatched.webp`, followed by three compact text moments.

Why it works: it removes the generic stock issue and makes the section unmistakably Maple Moon. It would also cut the mobile height substantially.

Tradeoff: the section becomes less lifestyle-led. It says "this is the product" more than "this is how it fits into your day."

## Option C: Keep The Cards, Replace The Photography

Keep the existing three-card layout but swap the images for a small ritual shoot:

- After dinner: one Maple Moon square or moon on a plate, lights low.
- Afternoon reset: a hand, cup, and a visible Maple Moon wrapper.
- With tea, at night: tea and Maple Moon in frame, not a generic mug alone.

Why it works: this preserves the strongest idea in the current section, which is occasion-based browsing.

Tradeoff: this depends on real photography. Without those assets, it is more of a content-production brief than a patch.

## Recommended Option

Choose **Option A** now, then treat Option C as the final image direction.

Option A fixes the visible layout problems without touching Carli's paragraph or changing the page structure broadly. It also buys time for better ritual photography. I would not swap all three tiles to product packshots today, because that would solve the stock problem by losing the ritual idea.

## Exact Scoped Patch Suggestion

Patch only the `#ritual` section and its `.q-when` CSS. Do not edit other homepage sections. Keep Carli's paragraph text unchanged.

### 1. Replace the current ritual CSS block

Replace the block from `/* WHEN moment tiles */` through the three current `.q-when .tiles .q-tile:nth-child(...) img` rules with:

```css
/* WHEN moment tiles */
.q-when{padding:calc(var(--sp-lg) * .9) 0 var(--sp-lg);border-top:1px solid var(--line-soft);}
.q-when-head{display:grid;grid-template-columns:minmax(0,1fr) minmax(320px,54ch);gap:44px;align-items:end;margin-bottom:26px;}
.q-when-head .lux-hd{margin-bottom:0;}
.q-when-lead{color:var(--ink-soft);font-size:1.02rem;max-width:54ch;line-height:1.58;margin:0;}
.q-when .tiles{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:0;}
.q-tile{border-radius:8px;overflow:hidden;background:#fbfaf7;border:1px solid var(--line-soft);display:flex;flex-direction:column;}
.q-tile .ph{aspect-ratio:16/10;overflow:hidden;}
.q-tile img{width:100%;height:100%;object-fit:cover;transition:transform .5s ease;}
.q-tile:hover img{transform:scale(1.04);}
.q-tile .tx{padding:17px 20px 20px;background:#fbfaf7;min-height:138px;}
.q-tile strong{display:block;font-family:var(--mm-serif);font-weight:500;font-size:1.14rem;margin-bottom:6px;}
.q-tile span{font-size:.87rem;color:var(--ink-soft);line-height:1.55;display:block;}
.q-tile .mo{display:block;font-size:.58rem;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-faint);margin-bottom:8px;font-family:var(--mm-sans,'Neue Haas Grotesk Display Pro',Helvetica,sans-serif);}
/* per-tile crops until the licensed scene photography lands */
.q-when .tiles .q-tile:nth-child(1) img{object-position:center 58%;}
.q-when .tiles .q-tile:nth-child(2) img{object-position:center 44%;}
.q-when .tiles .q-tile:nth-child(3) img{object-position:center 62%;}
```

Then replace the ritual-specific part of the current `@media (max-width:900px)` rule with:

```css
@media (max-width:900px){
  .q-when-head{grid-template-columns:1fr;gap:14px;margin-bottom:24px;}
  .q-when-head .lux-hd{margin-bottom:0;}
  .q-when-lead{font-size:1rem;line-height:1.55;}
  .q-when .tiles{grid-template-columns:1fr;gap:20px;}
  .q-tile .ph{aspect-ratio:16/9;}
  .q-tile .tx{min-height:0;padding:17px 20px 20px;}
}
```

If keeping the existing shared mobile block, do not duplicate `.q-when .tiles{grid-template-columns:1fr;}` twice. Move the extra ritual rules into the existing `@media (max-width:900px)` section.

### 2. Wrap the ritual intro markup

Change only the top of `section#ritual` from:

```html
<section class="wrap q-when" id="ritual">
  <span class="qkick">A sweeter kind of ritual</span>
  <h2 class="lux-hd">When do you <em>moon?</em></h2>
  <p style="color:var(--ink-soft);font-size:1.05rem;max-width:54ch;margin:0 0 32px;">Maple Moon isn't just a treat, it's a moment of presence. A slow-evening indulgence, a shared bite with little ones, a pause in your day. Our handcrafted carob creations turn simple moments into mindful ones.</p>
  <div class="tiles">
```

To:

```html
<section class="wrap q-when" id="ritual">
  <div class="q-when-head">
    <div>
      <span class="qkick">A sweeter kind of ritual</span>
      <h2 class="lux-hd">When do you <em>moon?</em></h2>
    </div>
    <p class="q-when-lead">Maple Moon isn't just a treat, it's a moment of presence. A slow-evening indulgence, a shared bite with little ones, a pause in your day. Our handcrafted carob creations turn simple moments into mindful ones.</p>
  </div>
  <div class="tiles">
```

### 3. Replace only the small tile labels

Leave the tile headings and body copy unless Nate wants a copy pass. Change:

```html
<span class="mo">Ritual 01</span>
<span class="mo">Ritual 02</span>
<span class="mo">Ritual 03</span>
```

To:

```html
<span class="mo">Evening</span>
<span class="mo">Afternoon</span>
<span class="mo">Night</span>
```

### 4. Image guidance

Do not block the layout patch on photography, but do not call the image set final. The first tile is the priority replacement because it reads as chocolate. If a product signal is needed before a proper ritual shoot, use one Maple Moon image in tile 1 only and keep tiles 2 and 3 lifestyle-led:

```html
<img src="assets/photo_finals/maplemoon_heros55_brandmatched.webp" alt="The Maple Moon carob range arranged with carob pods" loading="lazy">
```

If that swap is made, set the first crop to:

```css
.q-when .tiles .q-tile:nth-child(1) img{object-position:center 68%;}
```

Keep this as a temporary bridge. The final section wants ritual photography with Maple Moon product present in each scene.
