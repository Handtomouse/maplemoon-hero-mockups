# Why Not Cacao Section Review

Scope: `_wip/homepage_real_1_lead_photo.WIP.html`, section `#why`, headline `Why not cacao?`

Reviewed against the supplied Image 5 screenshot plus the current section CSS and markup:

- CSS: lines around `258-275`, `325-328`, `399-405`
- Markup: lines around `596-631`

## Current Read

The section is trying to be a direct cacao/chocolate versus carob comparison, but in the screenshot it reads as two large stacked feature cards. The first card fills most of the viewport, then a dark decorative footer appears before the Carob card starts. That means the reader sees the "old default" much more prominently than the Maple Moon answer.

The copy structure is mostly understandable: three paired ideas around sweetness, caffeine, and evening ritual. The problem is that the visual structure does not preserve those pairings once the cards stack. On medium widths, the comparison becomes sequential rather than comparative.

The strongest current asset is the carob powder/pod photo. The weakest visual asset is the chocolate footer: it is very dark, abstract, repeats "The old default", and does not add useful information.

## Issues

1. **The section asks "Why not cacao?" but the card says "Chocolate".** That is consumer-friendly, but it creates a slight mismatch because Maple Moon still uses cacao butter. Use "Cacao chocolate" or change the headline to "Why not chocolate?" if the page wants to avoid ingredient confusion.

2. **The breakpoint is too aggressive.** `.q-why .cards` collapses at `max-width:900px`, so tablet and narrow desktop widths lose the side-by-side comparison. In the screenshot, each card becomes a large solo panel and the Carob argument starts too low.

3. **The image/footer hierarchy is backwards.** The chocolate footer is a 150px band on desktop and 116px on mobile. Because it is dark and high contrast, it becomes a major visual beat despite being decorative. It makes the Chocolate card feel more premium than intended.

4. **The Carob card is visually heavier than the Chocolate card.** The dark treatment can feel premium, but when stacked below a bright first card it also feels like a new section rather than the recommended choice.

5. **Copy has two clarity risks.**
   - "Sweet from the pod itself, nothing added" can be read as no added ingredients, but the page elsewhere says carob is milled with cacao butter. If the intended claim is about sugar, say that.
   - "Caffeine and stimulants" is broader than necessary. Keep to the established caffeine point rather than adding vague stimulant language.

6. **Mobile risk is section length.** On 390px wide mobile, the cards will stack, list items will wrap, and both media bands add height. The user's decision point will require a lot of scrolling before reaching the following ritual section.

## Option A: Keep The Two Cards, Tighten The Presentation

Best if the current visual concept is already approved and only needs a practical polish pass.

Changes:

- Keep two cards.
- Change the breakpoint from `900px` to around `720px` so medium widths preserve side-by-side comparison.
- Remove the chocolate footer label and icon, or reduce it to a 72px muted texture band.
- Make the carob photo strip shallower, around 104px desktop and 88px mobile.
- Change left title from `Chocolate` to `Cacao chocolate`.
- Tighten copy without adding new claims:
  - `Naturally bitter, so it needs added sugar`
  - `Contains caffeine, late in the day`
  - `Made for a rush, not a wind-down`
  - `Sweet from the pod itself, no added sugar`
  - `Naturally caffeine free, any hour you like`
  - `Made for the slow part of the evening`

Pros: smallest implementation, low design risk.

Cons: mobile still loses the direct line-by-line comparison.

## Option B: Convert To One Comparison Panel

Recommended.

Use one shared panel with two columns and three paired rows. This keeps the comparison intact on desktop and mobile, makes Carob visibly the answer, and removes the weak decorative footer.

Structure:

- Header row: `Cacao chocolate` on the left, `Maple Moon carob` on the right.
- Three row labels: `Sweetness`, `Caffeine`, `Moment`.
- Each row contains the old-default statement and the Maple Moon statement side by side.
- Optional proof strip at the bottom uses only the carob photo, not the chocolate footer.

Pros: clearest hierarchy, shortest mobile read, least dependent on image crop quality.

Cons: less editorial and less image-led than the current cards.

## Option C: Make It A Carob-Led Editorial Split

Best if the brand wants the section to feel warmer and less adversarial.

Changes:

- Replace the duel-card layout with a left carob photo and right text block.
- Use three compact "Instead of / choose" lines:
  - `Instead of bitter, choose naturally sweet.`
  - `Instead of caffeine, choose naturally caffeine free.`
  - `Instead of a rush, choose an evening ritual.`
- Keep the headline `Why not cacao?`, but add a short paragraph explaining the switch in plain language.

Pros: warmer brand voice and better use of photography.

Cons: weaker as a factual comparison, and it risks sounding more like marketing copy than an answer.

## Recommended Option

Choose **Option B**.

The current section's main problem is not styling polish; it is the structure. The content is paired, but the layout separates the pairs. A single comparison panel solves the clarity issue, reduces mobile height, and avoids the empty-feeling chocolate footer.

## Exact Scoped Patch Suggestion

Do not edit outside the `#why` section and its `.q-why` CSS.

### 1. Replace the current `#why` card markup

Replace the existing `<div class="cards">...</div>` inside `section#why` with:

```html
<div class="q-compare" aria-label="Cacao chocolate and Maple Moon carob comparison">
  <div class="q-compare-head">
    <div>
      <span class="tag">The old default</span>
      <h3>Cacao chocolate</h3>
    </div>
    <div class="carob">
      <span class="tag">The Maple Moon switch</span>
      <h3>Maple Moon carob</h3>
    </div>
  </div>

  <div class="q-compare-row">
    <span class="q-compare-label">Sweetness</span>
    <p>Naturally bitter, so it needs added sugar</p>
    <p class="carob">Sweet from the pod itself, no added sugar</p>
  </div>

  <div class="q-compare-row">
    <span class="q-compare-label">Caffeine</span>
    <p>Contains caffeine, late in the day</p>
    <p class="carob">Naturally caffeine free, any hour you like</p>
  </div>

  <div class="q-compare-row">
    <span class="q-compare-label">Moment</span>
    <p>Made for a rush, not a wind-down</p>
    <p class="carob">Made for the slow part of the evening</p>
  </div>

  <div class="q-compare-photo" aria-hidden="true">
    <img src="assets/licensed/carob_pods_macro.jpg" alt="" loading="lazy">
  </div>
</div>
```

### 2. Replace only the `.q-why` card CSS

Replace the current block from `.q-why .cards` through `.q-card.dark .q-card-art svg`, plus `.q-card-photo` and `.q-card-foot`, with:

```css
.q-why{position:relative;z-index:4;margin-top:-72px;padding:0 0 var(--sp-lg);}
.q-compare{margin-top:2px;border:1px solid var(--line);border-radius:10px;overflow:hidden;background:rgba(251,250,247,.72);box-shadow:0 16px 34px rgba(44,42,38,.08);}
.q-compare-head{display:grid;grid-template-columns:1fr 1fr;border-bottom:1px solid var(--line-soft);}
.q-compare-head>div{padding:25px 28px 22px;background:linear-gradient(180deg,#fbfaf7 0%,#f1eee5 100%);}
.q-compare-head>div.carob{background:linear-gradient(180deg,#34322c 0%,#262521 100%);color:var(--cream);}
.q-compare .tag{font-size:.62rem;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-faint);display:block;margin-bottom:12px;}
.q-compare .carob .tag{color:rgba(241,237,227,.62);}
.q-compare h3{font-family:var(--mm-serif);font-weight:500;font-size:1.25rem;margin:0;}
.q-compare-row{display:grid;grid-template-columns:128px 1fr 1fr;align-items:stretch;border-top:1px solid var(--line-soft);}
.q-compare-row:first-of-type{border-top:0;}
.q-compare-label{display:flex;align-items:center;padding:18px 22px;font-size:.62rem;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-faint);background:rgba(241,237,227,.36);}
.q-compare-row p{margin:0;padding:18px 24px;font-size:.94rem;line-height:1.5;color:var(--ink-soft);}
.q-compare-row p.carob{color:rgba(241,237,227,.86);background:#2b2a25;border-left:1px solid rgba(241,237,227,.14);}
.q-compare-photo{height:118px;overflow:hidden;border-top:1px solid rgba(58,42,26,.12);}
.q-compare-photo img{width:100%;height:100%;object-fit:cover;object-position:center 55%;}
```

### 3. Replace the current mobile rule for `.q-why`

Replace:

```css
@media (max-width:900px){
  .q-why .cards{grid-template-columns:1fr;}
  .q-why{margin-top:-42px;}
  .q-card-art{height:130px;}
  .q-card-foot,.q-card-photo{height:116px;}
}
```

With:

```css
@media (max-width:720px){
  .q-why{margin-top:-42px;}
  .q-compare-head{grid-template-columns:1fr;}
  .q-compare-row{grid-template-columns:1fr;}
  .q-compare-label{padding:14px 20px 0;background:transparent;}
  .q-compare-row p{padding:10px 20px 14px;}
  .q-compare-row p.carob{border-left:0;border-top:1px solid rgba(241,237,227,.12);}
  .q-compare-photo{height:92px;}
}
```

### 4. Copy guardrails

Keep the patch to clarity edits only. Do not add claims about sleep, calm, stress, antioxidants, mood, digestion, or health outcomes. The only claims used above are already present in the current section: naturally sweet, added sugar, caffeine, caffeine free, and evening ritual.

