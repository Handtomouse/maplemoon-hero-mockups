# Hero Section Review

Target: `_wip/homepage_real_1_lead_photo.WIP.html`, section `id="top"`.

Preview: `_wip/_section_variants/hero-options-20260719.html`.

Screenshot reviewed: `Screenshot 2026-07-19 at 2.33.58 PM.png`, 1684 x 790.

## Current Read

The current hero is a mood-led Editorial Night opener. It uses the moonlit ocean photo, small centered `maple moon` mark, the eyebrow `Australian organic carob`, the protected giant CAROB wordmark, one range CTA, and a four-part credential row.

The first impression is premium and distinctive. CAROB is unmistakable, and the night ocean gives the page a memorable subject. The tradeoff is that the first viewport behaves more like a brand film still than a shop entry point. The physical product arrives just after the fold through the coverflow, so the hero asks the viewer to buy into the world before seeing the range.

## Issues

1. **Nav visibility is too quiet.** In the screenshot, the center brand and cart are visible, but the left and right nav links are nearly lost against the photo. This weakens orientation and makes the first viewport feel less usable.

2. **The brand signal is split.** `maple moon` appears as small nav text while CAROB carries the entire hero. That is acceptable if the page is intentionally category-led, but it risks making Maple Moon feel secondary.

3. **Product signal lands below the fold.** The page has a strong product carousel immediately after the hero, but the first screen itself does not show a bar, moon, bite, or elixir.

4. **CTA hierarchy is single-path.** `Shop the Range` is clear, but the hero has no secondary route for people who want proof first, such as `Find stockists` or `Read the carob story`.

5. **Mobile has wrapping risk.** The CAROB asset, CTA, and credential row are all centered. At 375 to 430px widths, the credential row can wrap into uneven lines, and the nav hides text links entirely, leaving cart plus the hero CTA as the only visible actions.

6. **The atmosphere is doing almost all the work.** That is aligned with Editorial Night, but the current approved WIP also has a two-click purchase requirement. The hero should stay atmospheric, but it would benefit from one controlled product cue in the first viewport.

## Option A: Atmospheric Lock

Keep the current centered composition and ocean photo. Do not add product imagery inside the hero. Tighten the practical parts only.

Changes:

- Increase nav contrast with a subtle top scrim and stronger text shadow.
- Keep `Australian organic carob`, CAROB, `Naturally Sweet, Nothing Added.`, and `Shop the Range`.
- Tighten the credential row spacing and hide separators on wrapped mobile lines.
- Keep the single CTA, but make the hit area and focus state explicit.
- Reduce the CAROB minimum width slightly on mobile so it does not crowd the viewport.

Best for: preserving the approved screenshot with minimal intervention.

Tradeoff: the hero remains category-led and atmospheric, not product-led.

## Option B: Product-Led Bridge

Recommended.

Keep the Editorial Night ocean, centered CAROB, and current copy. Add one restrained product cue in the lower hero, visually emerging from the mist before the coverflow. This bridges the mood-led hero into the shop section without replacing the approved signature.

Changes:

- Add a decorative product cluster or single bar packshot near the lower right on desktop.
- Keep it behind the CTA hierarchy and out of the CAROB wordmark zone.
- Add a CTA group: primary `Shop the Range`, secondary `Find stockists`.
- Strengthen nav visibility as in Option A.
- On mobile, either hide the product cluster or reduce it to one small lower product cue below the CTA, never behind the wordmark.

Best for: balancing approved mood with a clearer product/shop signal.

Tradeoff: needs careful mobile positioning so the product does not collide with the credential row or coverflow.

## Option C: Editorial Product Split

Move the hero from centered poster to asymmetric commerce layout: text and CAROB on the left, real product packshot column on the right, still over the moonlit ocean.

Changes:

- Align eyebrow, CAROB, tagline, and CTAs left inside the `wrap`.
- Put a larger product group on the right, with one hero bar and one moon or elixir.
- Keep the ocean as full-bleed atmosphere, but darken the left side for text.
- Push the credential row below the CTA group as a compact inline proof line.

Best for: a more direct shop-first homepage.

Tradeoff: this is the biggest departure from the approved centered CAROB composition, and it may weaken the iconic first impression.

## Recommended Option

Choose **Option B: Product-Led Bridge**.

It solves the practical issue without turning the hero into a new redesign. The giant CAROB wordmark remains the thesis, the night ocean stays, and the page gains a first-viewport product cue that makes the shop destination feel immediate.

## Exact Scoped Implementation Notes

Do not edit the main WIP hero until an option is approved.

Patch only:

- The `#top.wf-phero` markup.
- The `.wf-phero`, `.wf-ptop`, `.wf-pnav`, `.wf-pcenter`, `.wf-ppill`, and `.wf-pcreds` CSS blocks.
- The existing mobile hero media rules.

Do not touch:

- The coverflow product carousel.
- The PDP block.
- Page-wide typography tokens.
- SEO or JSON-LD.
- Any pricing, reviews, or unverified claims.

For Option B, add this markup after `<div class="fog"></div>`:

```html
<div class="wf-hero-product" aria-hidden="true">
  <img class="hero-bar" src="assets/product_shots/bar_pure_carob_hero.webp" alt="" decoding="async">
  <img class="hero-moon" src="assets/product_shots/moon_pure_carob.webp" alt="" decoding="async">
</div>
```

Then change the CTA area from one link to:

```html
<div class="wf-pactions">
  <a class="wf-ppill primary" href="#range">Shop the Range</a>
  <a class="wf-ppill secondary" href="stockists.WIP.html">Find stockists</a>
</div>
```

Suggested CSS shape:

```css
.wf-ptop::before{content:"";position:absolute;left:0;right:0;top:0;height:92px;background:linear-gradient(180deg,rgba(14,31,47,.46),rgba(14,31,47,0));pointer-events:none;}
.wf-pnav a{color:rgba(231,228,202,.96);text-shadow:0 1px 3px rgba(14,31,47,.88),0 0 18px rgba(14,31,47,.62);}
.wf-pactions{display:flex;gap:12px;align-items:center;justify-content:center;flex-wrap:wrap;margin-top:2px;}
.wf a.wf-ppill.primary{border-color:rgba(179,163,128,.86);}
.wf a.wf-ppill.secondary{background:rgba(14,31,47,.18);border-color:rgba(231,228,202,.54);box-shadow:none;}
.wf-hero-product{position:absolute;right:clamp(28px,8vw,128px);bottom:-58px;width:clamp(150px,17vw,250px);z-index:2;pointer-events:none;filter:drop-shadow(0 30px 34px rgba(14,31,47,.32));}
.wf-hero-product .hero-bar{width:100%;height:auto;}
.wf-hero-product .hero-moon{position:absolute;right:-8%;bottom:6%;width:34%;filter:drop-shadow(0 14px 18px rgba(14,31,47,.26));}
```

Mobile guard:

```css
@media (max-width:700px){
  .wf-pwm img{width:clamp(260px,82vw,440px);}
  .wf-pactions{gap:10px;}
  .wf a.wf-ppill{min-height:44px;padding:13px 24px;}
  .wf-hero-product{display:none;}
  .wf-pcreds{gap:9px 14px;margin-top:14px;}
  .wf-pcreds span{font-size:.64rem;}
  .wf-pcreds span+span{padding-left:0;}
  .wf-pcreds span+span::before{display:none;}
}
```

Verification before approval:

- Desktop screenshot at 1440 x 900.
- Mobile screenshots at 390 x 844 and 430 x 932.
- Confirm nav links remain visible on desktop.
- Confirm mobile has no text or product overlap.
- Confirm first viewport still hints at the product coverflow below.
- Run a no em dash scan on `_wip/homepage_real_1_lead_photo.WIP.html` after any final patch.
