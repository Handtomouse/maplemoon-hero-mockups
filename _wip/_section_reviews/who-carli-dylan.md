# Who: Carli & Dylan Section Review

Scope: `_wip/homepage_real_1_lead_photo.WIP.html`, section `#who`, immediately after `#story`.

Reviewed against the current source plus local headless Chrome renders at 1440px desktop, 768px tablet, 390px mobile, and 375px mobile. The supplied WIP URL on port 3005 was not running when checked, so the page was rendered from the local WIP file with the same relative assets.

## Current Read

The section is doing the right content job: it adds a quick human beat after the story tease, names Carli & Dylan, keeps Carli's supplied sentence intact, and gives the reader a route to the story page.

Visually, it reads as a pale card inserted between two full-width editorial bands. Desktop is serviceable: moon icon, text, and CTA sit in one row and there is no overflow. Tablet is the most compressed state: the text column drops to about 368px while the CTA holds 196px, so the sentence becomes a short, stacked paragraph beside a button. On phone, the flex wrap turns into a tall 318px card, with the moon icon isolated at the top, the copy below it, and the CTA left-aligned at fixed width.

The copy should stay as-is. The main problem is presentation: the strip feels like a placeholder card rather than a confident handoff from story to people.

## Issues

1. The section starts only 6px after the story band. Because the lighthouse image is still fading out above it, the card feels attached to the previous image rather than intentionally placed.

2. The card treatment is too faint. `background:var(--card)` and a low-contrast border sit very close to the page paper, so the component has the outline of a card but not much presence.

3. Desktop hierarchy is okay, but the CTA competes with the sentence. The current row gives the button a fixed visual weight while the story sentence is small and soft.

4. Tablet is cramped. At 768px the icon, text, and CTA all stay in one row. The copy becomes narrow even though there is enough page width for a more relaxed two-row layout.

5. Mobile stacking is accidental. The moon icon lands alone at the top of the card, then the text, then a 196px CTA. This makes the section taller than its content warrants and gives the button an unfinished alignment.

6. The code comment says `founders strip`, but the visible copy does not establish that Dylan is a founder. Since the brief says not to invent founder claims, the comment should be neutral if this area is touched.

7. Accessibility is light. The section has a `strong` label but no heading or `aria-label`. For a compact strip, an `aria-label` is enough and avoids adding visible copy.

## Option A: Polish The Existing Card

Keep the bordered card. Add a little top spacing after `#story`, strengthen the card background and text contrast, switch tablet and phone to a more intentional stacked layout, and make the mobile CTA full width.

Why it works: this is the smallest visual fix. It keeps the current component shape and only addresses the responsive problems.

Tradeoff: it still reads as a card between bands, so it does not fully solve the placeholder feeling.

## Option B: Editorial Handoff Strip

Remove the card chrome and treat this as a quiet editorial strip with top and bottom rules. Use a three-column grid on desktop, a two-column grid on tablet, and a single-column layout on phone. Keep the moon icon, exact copy, and CTA.

Why it works: it makes the section feel like a deliberate bridge from the story band into the stockist/review flow. It also reduces mobile height and removes the awkward standalone icon.

Tradeoff: it is a slightly stronger design change than Option A, because the component stops looking like a card.

## Option C: Photo-Ready People Block

Hold the current copy, but rebuild the section as a small people block once a real Carli & Dylan photo is available. Use the photo as the left signal, keep the supplied sentence on the right, and keep the CTA.

Why it works: the section is about people, so a real portrait or candid would be more direct than an icon.

Tradeoff: do not use stock people or imply extra founder details. Without a real approved image, this becomes a production dependency instead of a practical patch.

## Recommended Option

Choose **Option B**.

It fixes the visible layout problems, keeps Carli's sentence untouched, avoids inventing founder claims, and makes the section feel intentional without waiting on photography.

## Exact Scoped Patch Suggestion

Patch only the `#who` styles and the opening section/comment. Do not change the visible Carli & Dylan copy.

### 1. Replace the current WHO CSS block

Replace:

```css
/* WHERE band reuses .wf-edu; WHO strip */
.q-who{display:flex;align-items:center;justify-content:space-between;gap:24px;padding:26px 30px;margin:6px 0 var(--sp-md);border:1px solid var(--line);border-radius:10px;background:var(--card);flex-wrap:wrap;}
.q-who .moon{width:38px;height:38px;flex:0 0 auto;}
.q-who .moon svg{width:100%;height:100%;stroke:var(--ink);fill:none;stroke-width:1.3;}
.q-who .t{flex:1;min-width:240px;}
.q-who strong{font-family:var(--mm-serif);font-weight:500;font-size:1.1rem;display:block;}
.q-who span{font-size:.9rem;color:var(--ink-soft);}
```

With:

```css
/* WHO strip */
#who{padding:clamp(18px,3vw,30px) var(--pad-x) var(--sp-md);}
.q-who{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:22px clamp(22px,3vw,34px);padding:24px 0;margin:0;border-top:1px solid var(--line-soft);border-bottom:1px solid var(--line-soft);}
.q-who .moon{width:36px;height:36px;flex:0 0 auto;}
.q-who .moon svg{width:100%;height:100%;stroke:var(--ink);fill:none;stroke-width:1.2;}
.q-who .t{min-width:0;max-width:70ch;}
.q-who strong{font-family:var(--mm-serif);font-weight:500;font-size:clamp(1.08rem,1.4vw,1.22rem);line-height:1.2;display:block;margin-bottom:4px;}
.q-who .t>span{display:block;font-size:.92rem;line-height:1.55;color:#57534b;max-width:66ch;}
.q-who .wf-pill{justify-self:end;white-space:nowrap;}
@media (max-width:760px){
  #who{padding-top:clamp(22px,7vw,34px);}
  .q-who{grid-template-columns:auto minmax(0,1fr);gap:14px 18px;padding:24px 0;}
  .q-who .moon{margin-top:2px;}
  .q-who .wf-pill{grid-column:2;justify-self:start;}
}
@media (max-width:520px){
  #who{padding-top:22px;padding-bottom:calc(var(--sp-md) * .85);}
  .q-who{grid-template-columns:1fr;gap:14px;padding:24px 0;}
  .q-who .moon{width:34px;height:34px;}
  .q-who .wf-pill{grid-column:auto;width:100%;justify-content:center;}
}
```

### 2. Neutralize the code comment and add a non-visible section label

Change:

```html
<!-- WHO (founders strip; photo lands after the warm-skin pass) -->
<section class="wrap" id="who"><div class="q-who">
```

To:

```html
<!-- WHO (Carli and Dylan strip; photo lands after the warm-skin pass) -->
<section class="wrap" id="who" aria-label="Carli and Dylan"><div class="q-who">
```

### 3. Keep the visible copy unchanged

Do not change this block unless Carli supplies replacement copy:

```html
<div class="t"><strong>Carli <span class="amp">&amp;</span> Dylan</strong>
<span>They met in a health food store, a fitting beginning for two people who believe deeply that what we eat affects how we feel, physically and emotionally.</span></div>
<a class="wf-pill" href="our-story.WIP.html">Meet Carli <span class="amp">&amp;</span> Dylan</a>
```
