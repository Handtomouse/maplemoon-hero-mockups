# Starter Box Sampler Section Review

Scope: homepage Image 8 only, `_wip/homepage_real_1_lead_photo.WIP.html`, section `#sampler` with headline `Try every flavour.`

## Current Read

The section is a strong premium range close: six real bar packshots, a warm box/tray frame, a clear flavour list, and the confirmed bundle price shown as `$77.70` struck through to `$73.82` for 6 bars, 90g each.

Rendered locally from the WIP HTML at 1440, 768, 390, and 375px. Assets loaded, and there was no horizontal overflow. Desktop is the best state: the tray and copy sit side by side and the price/CTAs are visible in the same view. The risk is below 900px, where the layout stacks early and the product tray gets either too dominant on tablet or too compressed on phone.

Relevant source:

- CSS: `_wip/homepage_real_1_lead_photo.WIP.html:302-330`
- Markup: `_wip/homepage_real_1_lead_photo.WIP.html:697-725`
- Motion reveal and fixed toggle: `_wip/homepage_real_1_lead_photo.WIP.html:1004-1023`

## Issues

1. Tablet is the weak breakpoint.
   At 768px, the `@media (max-width:900px)` rule stacks the layout into one column. The box becomes about 712px wide and 743px tall before the offer copy even begins. That makes the section feel like a product poster, not a purchasable bundle.

2. Phone scale is usable but not commerce-forward.
   At 375px and 390px, the 3 by 2 grid fits without overflow, but the section is about 1100px tall. The user sees headline, box, and list before price and CTAs. The offer is visually beautiful, but the purchase decision arrives late.

3. Product images are being forced into a slightly wrong ratio.
   The packshots are natural 800 by 1200, but `.sbox-grid img` forces `aspect-ratio:9/14`. This subtly narrows the bars. It is not catastrophic, but it is avoidable and matters because this section is product-led.

4. The box framing reads more like a display tray than a starter box.
   The warm frame is attractive, but the six individual wells create a card-inside-card feeling. The line `The box does the wrapping.` asks the visual to feel like packaging. Right now it feels more like a tidy product grid placed inside a beige frame.

5. Price hierarchy can be clearer without changing pricing.
   `$73.82` is correctly larger than `$77.70`, but the old price, current price, and pack-size note all sit on one line. On mobile the pack-size note is fragile, and in the top-of-section mobile view the fixed `Motion: on` control can visually collide with the price area.

6. The fixed motion toggle affects the section review.
   The toggle is outside `#sampler`, but it appears over this section while scrolling on mobile. If it is only a WIP control, remove or hide it for client review. If it is intended to ship, it needs a proper non-overlapping placement.

## Option A: Minimal Price And Mobile Polish

Keep the current visual structure. Make only the safest presentation fixes:

- Keep the 3 by 2 tray.
- Keep the confirmed price values exactly as `$77.70` and `$73.82`.
- Split the price into old price, current price, and pack-size spans so mobile can wrap cleanly.
- Set the packshot ratio back to the natural 2 by 3 ratio.
- Tighten list spacing on phone.
- Make the CTAs full width on phone.

This is the fastest patch. It improves the bottom of the section and removes the product distortion, but it does not solve the oversized tablet tray.

## Option B: Responsive Offer Rebalance

Keep the same content and visual direction, but rebalance the responsive layout:

- Move the one-column breakpoint from 900px down to about 720px.
- Keep a compact two-column layout on tablet, with the box capped around 500 to 520px.
- Use natural product proportions and cap image width so bars do not balloon.
- Keep the list, price, and CTAs near the tray on tablet.
- On phone, keep the 3 by 2 tray but tighten the box padding, list spacing, and CTA stack.
- Present the price as a small commerce cluster: old price, current price, then `6 bars, 90g each` beneath on narrow screens.

This preserves the current design and fixes the real layout risk. It is the best practical option.

## Option C: Stronger Box Concept

Make the section read more like a starter box and less like a grid:

- Reduce or remove the individual well backgrounds.
- Treat the frame as one open tray with a subtle inner border and one label.
- Slightly overlap or stagger the six bars so the set feels packed, not tiled.
- Keep the flavour list, price, and CTAs in a tighter offer panel beside it.

This could look more distinctive, but it is more design work and has more crop risk. It is worth exploring only if Nate thinks the current tray feels too generic.

## Recommended Option

Use Option B now.

It keeps the approved content and price intact, fixes the worst breakpoint, preserves the polished desktop state, and improves mobile commerce clarity without redesigning the whole section.

Option A is acceptable if there is only time for a tiny pass. Option C is a later visual exploration.

## Exact Scoped Patch Suggestion

Do not apply this until Nate approves the direction. If approved, touch only `_wip/homepage_real_1_lead_photo.WIP.html` unless separately removing the global WIP motion toggle.

1. Replace the sampler CSS around lines 302-330 with a responsive version that caps the box and lowers the stack breakpoint:

```css
/* SAMPLER band: starter box offer */
.q-sampler{text-align:center;padding:clamp(72px,8vw,112px) 0 clamp(56px,6vw,88px);border-top:1px solid var(--line-soft);}
.q-sampler>p{color:var(--ink-soft);max-width:44ch;margin:0 auto;}
.q-sampler .sbox{display:grid;grid-template-columns:minmax(360px,1.05fr) minmax(320px,.95fr);gap:clamp(32px,4vw,52px);align-items:center;margin:38px auto 0;max-width:1040px;text-align:left;}
.sbox-frame{width:100%;max-width:520px;justify-self:end;background:linear-gradient(180deg,#ece3cc 0%,#e2d7b6 100%);border:1px solid #cdbf9d;border-radius:10px;padding:20px 22px 24px;box-shadow:inset 0 2px 16px rgba(58,42,26,.12),0 20px 42px rgba(44,42,38,.10);}
.sbox-lid{display:block;text-align:center;font-size:.6rem;letter-spacing:.28em;text-transform:uppercase;color:#8a7a58;border-bottom:1px solid rgba(58,42,26,.16);padding-bottom:13px;margin-bottom:18px;}
.sbox-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;}
.sbox-grid .well{background:rgba(244,240,224,.45);border:1px solid rgba(58,42,26,.10);border-radius:6px;padding:10px 9px 4px;display:grid;place-items:end center;}
.sbox-grid img{width:min(100%,132px);height:auto;aspect-ratio:2/3;object-fit:contain;filter:drop-shadow(0 8px 10px rgba(44,42,38,.18));}
.sbox-info .lid-k{margin-bottom:14px;}
.sbox-list{list-style:none;margin:0 0 18px;padding:0;}
.sbox-list li{display:flex;align-items:center;gap:11px;font-size:.92rem;color:var(--ink-soft);padding:8px 0;border-top:1px solid var(--line-soft);}
.sbox-list li:first-child{border-top:0;}
.sbox-list li::before{content:"";width:5px;height:5px;border-radius:50%;background:#c9ba96;flex:0 0 auto;}
.sbox-price{font-family:Georgia,'Times New Roman',serif;font-weight:500;font-size:1.75rem;line-height:1.15;letter-spacing:.01em;margin:0 0 8px;display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;}
.sbox-price .sbox-was{font-size:1.05rem;color:var(--ink-faint);font-weight:400;}
.sbox-price .g{font-size:.8rem;color:var(--ink-faint);font-weight:400;margin-left:0;font-family:var(--mm-sans,'Neue Haas Grotesk Display Pro',Helvetica,sans-serif);}
.sbox-gift{font-size:.9rem;color:var(--ink-soft);margin:0 0 22px;}
.sbox-info .btns{display:flex;gap:14px;flex-wrap:wrap;}

@media (max-width:720px){
  .q-sampler .sbox{grid-template-columns:1fr;gap:26px;max-width:334px;margin-top:32px;}
  .sbox-frame{justify-self:center;padding:16px 18px 18px;}
  .sbox-lid{font-size:.54rem;letter-spacing:.22em;margin-bottom:14px;padding-bottom:11px;}
  .sbox-grid{gap:9px;}
  .sbox-grid .well{padding:8px 7px 4px;}
  .sbox-grid img{width:min(100%,70px);}
  .sbox-list{margin-bottom:16px;}
  .sbox-list li{font-size:.86rem;gap:9px;padding:6px 0;}
  .sbox-price{font-size:1.9rem;gap:4px 10px;}
  .sbox-price .g{flex-basis:100%;font-size:.78rem;}
  .sbox-info .btns{gap:10px;}
  .sbox-info .wf-pill{width:100%;justify-content:center;}
}
```

2. Replace the price markup around line 723 so the same confirmed values can wrap cleanly:

```html
<div class="sbox-price" aria-label="Starter box price $73.82, was $77.70. Six bars, 90 grams each.">
  <span class="sbox-was"><s>$77.70</s></span>
  <span class="sbox-now">$73.82</span>
  <span class="g">6 bars, 90g each</span>
</div>
```

3. Keep the existing visible copy unless Nate wants a copy pass.
   If changing only presentation, leave:

```html
<p>Six bars, one box. The whole range in a single starter set, ready for the slow part of the evening.</p>
<p class="sbox-gift">Made to be given. The box does the wrapping.</p>
```

4. Treat `#motionToggle` as a separate WIP-control decision.
   For client review, hide or remove it outside this sampler patch. Do not solve that by adding extra sampler padding, because the collision can happen in other sections too.
