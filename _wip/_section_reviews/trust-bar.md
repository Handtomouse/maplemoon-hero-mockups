# Trust Bar Section Review

Scope: `_wip/homepage_real_1_lead_photo.WIP.html`, section `#trust` near the footer.

Shipping threshold note: the current visible line correctly says `On orders over $99`. Keep the threshold at `$99`.

## Current Read

The section is a compact four-item strip between the starter box section and the footer:

- `Free Shipping` / `On orders over $99`
- `Secure Payments` / `Safe & easy checkout`
- `Find Us In` / `Selected stockists`
- `Journal` / `Stories & inspiration`

Source references:

- CSS: `_wip/homepage_real_1_lead_photo.WIP.html:233-238`
- Mobile rule: `_wip/homepage_real_1_lead_photo.WIP.html:261`
- Markup: `_wip/homepage_real_1_lead_photo.WIP.html:809-813`

Measured from the local WIP render:

- 1440px: four columns, about 100px tall, no horizontal overflow.
- 768px: two columns, about 149px tall, no horizontal overflow.
- 390px and 375px: two columns, about 149px tall, no horizontal overflow.
- 320px: two columns still fit the page, but the longer lines wrap and the strip grows to about 212px tall.

The section works as a quiet footer-adjacent strip, but it does not fully work as a trust bar. Only the first two items are actual reassurance messages. `Find Us In` and `Journal` read as navigation or content prompts, and they are currently `div`s rather than links.

## Issues

1. The trust message is diluted.
   `Free Shipping` and `Secure Payments` are trust items. `Find Us In` and `Journal` are not. The mixed set makes the section feel like a miscellaneous footer utility row rather than a confidence bar.

2. Some entries look clickable but are not.
   Stockists and Journal are navigation-style concepts. As static `div`s, they create a weak interaction expectation. This is especially noticeable because the real footer immediately below has working links.

3. `Find Us In` is awkward copy.
   The intended destination is stockists. `Stockists` is clearer and shorter, and it matches the existing footer/nav vocabulary.

4. The mobile layout is fragile below 360px.
   At 320px, `Secure Payments`, `On orders over $99`, and `Stories & inspiration` wrap inside narrow two-column cells. There is no page overflow, but the row heights become uneven and the icons sit awkwardly beside multi-line text.

5. Desktop is a little sparse.
   Four 264px columns with very small content and no separators make the strip feel under-authored. This is not a breakage bug, but it makes the section easy to skip.

6. Do not solve this by inventing policy details.
   Do not add returns, guarantees, delivery speeds, or certification claims unless the final policy copy is supplied. The only confirmed shipping detail in scope is the `$99` threshold.

## Option A: Minimal Polish

Keep all four items, but make the copy and layout safer:

- Change `Free Shipping` / `On orders over $99` to `Free shipping` / `Orders over $99`.
- Change `Find Us In` to `Stockists`.
- Make the stockists item a real link to `stockists.WIP.html`.
- Leave Journal only if there is a confirmed journal URL. Otherwise keep it static but accept that it is not really trust content.
- Add `min-width:0`, tighter line-height, focus styles for linked items, and a one-column phone rule below about 380px.

This is the fastest pass. It improves copy and mobile stability, but the section still mixes trust and navigation.

## Option B: Honest Three-Item Trust Strip

Keep only the items that can be supported without inventing policy details:

- `Free shipping` / `Orders over $99`
- `Secure payments` / `Safe & easy checkout`
- `Stockists` / `Selected stockists`

Make `Stockists` a real link. Remove `Journal` from this strip unless a journal destination is confirmed elsewhere.

This makes the section clearer, shorter, and more honest. It also solves the narrow two-column mobile wrapping by using three columns on tablet/desktop and one column on phone.

## Option C: Split Trust From Footer Utility

Turn the current section into two adjacent concepts:

- A small trust pair: shipping and secure payments.
- A footer utility pair: stockists and journal or contact.

This keeps four touchpoints, but it needs more layout work and only makes sense if the Journal destination is real. Without that route, it still leaves one item feeling provisional.

## Recommended Option

Use Option B.

It keeps the confirmed `$99` shipping threshold, avoids invented policy claims, removes the weakest item, and gives the section a clearer job. It is a small patch with low blast radius.

Option A is acceptable if the team wants the smallest possible change. Option C is only worth doing if the footer content model is being reviewed at the same time.

## Exact Scoped Patch Suggestion

Do not apply this until the direction is approved. If approved, touch only `_wip/homepage_real_1_lead_photo.WIP.html`.

### 1. Replace the trust CSS block

Replace the current `/* trust */` block around lines 233-238 with:

```css
/* trust */
.wf-trust{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;padding:var(--sp-sm) 0;border-top:1px solid var(--line);}
.wf-ti{display:flex;gap:12px;align-items:center;min-width:0;}
a.wf-ti{transition:color .2s ease,opacity .2s ease;}
a.wf-ti:hover strong{color:var(--ink);}
a.wf-ti:focus-visible{outline:2px solid rgba(44,42,38,.55);outline-offset:6px;border-radius:4px;}
.wf-ti svg{width:22px;height:22px;stroke:var(--ink);fill:none;stroke-width:1.3;flex:0 0 auto;}
.wf-ti>div{min-width:0;}
.wf-ti strong{display:block;font-size:.64rem;letter-spacing:.08em;text-transform:uppercase;line-height:1.2;}
.wf-ti span{display:block;font-size:.74rem;color:var(--ink-soft);line-height:1.35;margin-top:3px;}
```

### 2. Adjust the existing mobile rule

In the current `@media (max-width:900px)` block, replace:

```css
.wf-strip,.wf-trust{grid-template-columns:1fr 1fr;}
```

With:

```css
.wf-strip{grid-template-columns:1fr 1fr;}
.wf-trust{grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;}
```

Then add this second phone rule near the same media block:

```css
@media (max-width:520px){
  .wf-trust{grid-template-columns:1fr;gap:14px;}
  .wf-ti{align-items:flex-start;}
  .wf-ti svg{margin-top:1px;}
}
```

### 3. Replace the trust markup

Replace the current `#trust` markup around lines 809-813 with:

```html
<section class="wrap wf-trust" id="trust" aria-label="Shopping reassurance">
  <div class="wf-ti"><svg viewBox="0 0 24 24"><rect x="2" y="7" width="13" height="10" rx="1"/><path d="M15 10h4l3 3v4h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="18" cy="18" r="1.6"/></svg><div><strong>Free shipping</strong><span>Orders over $99</span></div></div>
  <div class="wf-ti"><svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="1.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg><div><strong>Secure payments</strong><span>Safe <span class="amp">&amp;</span> easy checkout</span></div></div>
  <a class="wf-ti" href="stockists.WIP.html"><svg viewBox="0 0 24 24"><path d="M12 21s-7-4.5-7-10a7 7 0 0 1 14 0c0 5.5-7 10-7 10z"/><circle cx="12" cy="11" r="2.5"/></svg><div><strong>Stockists</strong><span>Selected stockists</span></div></a>
</section>
```

### 4. Leave these out unless confirmed

Do not add:

- Returns or refund promises.
- Delivery timing.
- Satisfaction guarantees.
- Organic/certification badges.
- A Journal link without a real destination.
