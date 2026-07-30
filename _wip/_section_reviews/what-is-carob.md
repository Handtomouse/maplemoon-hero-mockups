# What Is Carob Section Review

Scope: `_wip/homepage_real_1_lead_photo.WIP.html`, section `#carob`, headline `What is Carob, actually?`

Reviewed against the current WIP markup and CSS plus local section captures at 1440px and 390px. The supplied temporary screenshot path was blocked by OS permissions, so I rendered the same section locally from the WIP file.

- CSS: lines around `337-371`
- Markup: lines around `574-593`
- Current default image: `assets/hero_shots/carob_branch_dusk.jpg`
- Built-in alternate checked: `?s3=pod66`, weaker for this slot because the crop becomes mostly empty blue fog

## Current Read

This section is acting as the homepage education beat: define carob, show the pod on the tree, give three simple facts, then link to the longer carob story. The overall idea is right for MapleMoon. It is atmospheric, specific to the product, and it avoids turning the page into a generic wellness pitch.

The strongest current element is the carob branch image. It immediately answers "what is it?" in a way packshots cannot. The weakest element is the annotation layer. It looks premium at first glance, but the labels do not really explain the image. They mostly repeat the text column, and one label risks overclaiming.

The current editorial copy can stand if it is lightly clarified. The previous handoff says no Carli doc copy exists for this section, so this does not need a faithful doc-copy swap.

## Issues

1. **The left copy is a little too pale against the sky wash.** The headline holds, but the eyebrow and body are soft enough that the section reads more like mood than education. This is most visible on desktop, where the body sits over the faded photo field.

2. **The annotations look technical without being truly explanatory.** The dots and leader lines do not land on distinct visual details. `The pod`, `Zero caffeine`, `Slow-roasted`, and `Nothing added` are not a sequence the eye can verify in the image.

3. **`Nothing added` is the risky phrase.** In this section it is paired with "that is the whole recipe", but MapleMoon products include cacao butter and the wider range includes flavour inclusions. The line can read broader than intended.

4. **`Zero caffeine` is repeated and sounds harsher than the brand voice.** The page already uses caffeine-free language. `Caffeine free` is warmer, clearer, and less clinical.

5. **`No roasting tricks` feels defensive.** It works as a quick contrast against cacao, but it pulls the voice toward rebuttal. The surrounding page is slower and more premium.

6. **Mobile loses the annotated-pod idea entirely.** The `.co` callouts are hidden below `900px`, leaving only the text, fact list, CTA, and a large bottom photo. That is acceptable, but it means the desktop annotation layer should not carry unique information.

## Option A: Keep The Annotated Branch, Make It Clearer

Recommended.

Keep the current image and layout, but make the section read less like a decorative diagram and more like a clean definition.

Changes:

- Keep `carob_branch_dusk.jpg`.
- Keep the text column, fact list, and full story CTA.
- Change `Zero caffeine` to `Caffeine free`.
- Remove the `Nothing added` callout.
- Replace the defensive paragraph with a warmer definition that uses only current claims: pod, naturally sweet, caffeine free, slow-roasted, cacao butter.
- Slightly raise body-copy contrast.
- Tighten annotation cards so they support the image instead of competing with the headline.

Pros: smallest change, preserves the approved visual direction, fixes the main copy risks.

Cons: mobile still hides the callouts, so the educational work on mobile is done by the copy and fact list.

## Option B: Quiet Definition Block

Use the same right-side branch image but remove the desktop callouts entirely. Make the left column a stronger editorial definition with three fact rows underneath.

Changes:

- Delete all four `.co` callouts from `#carob`.
- Increase the text column max width slightly.
- Add a subtle warm paper wash behind the text column only if contrast still feels soft.
- Keep the current fact list as the teaching device.

Pros: calmer, more premium, fewer moving parts, less risk of unsupported claims.

Cons: loses the signature annotated image idea and becomes visually closer to other editorial split sections.

## Option C: True Pod Diagram

Make the section a real ingredient diagram instead of an atmospheric branch band.

Changes:

- Keep a larger pod crop on the right.
- Use three labels only: `The pod`, `Naturally sweet`, `Slow-roasted`.
- Anchor dots directly on visible pod shapes.
- Add a compact mobile version of the labels under the image instead of hiding the whole diagram.

Pros: strongest answer to "what is carob?", more distinct, better educational value.

Cons: broader layout work, needs careful mobile tuning, and the available `pod66` alternate does not currently crop well enough to be the obvious replacement.

## Recommended Option

Choose **Option A**.

The section does not need a redesign. It needs copy clarity and a less overbuilt annotation layer. Option A keeps the approved branch image, keeps the premium Editorial Night tone, and removes the one claim that could become a product-range problem.

## Exact Scoped Patch Suggestion

Patch only the `#carob` markup and the `.wf-what1`, `.q-facts`, and `.co` styles. Do not touch the rest of the homepage. Do not deploy or push.

### 1. Tighten the `#carob` CSS

Apply these small additions after the current `.wf-what1 .col`, `.q-facts`, and `.co` rules:

```css
.wf-what1 .col{max-width:450px;}
.wf-what1 .bodyc{color:#484239!important;font-size:1.02rem!important;max-width:42ch!important;line-height:1.66!important;}
.wf-what1 .qkick{color:#8b806a;}
.wf-what1 .co .lab{width:176px;background:rgba(20,27,40,.46);}
.wf-what1 .co .d{font-size:.76rem;line-height:1.42;}
@media (max-width:900px){
  .wf-what1 .bodyc{max-width:36ch!important;}
}
```

### 2. Replace the paragraph copy

Replace:

```html
<p class="bodyc" style="color:#57534b;font-size:1.05rem;max-width:40ch;line-height:1.7;margin:0 0 24px;">A sweet pod that grows in the warm Australian sun. Not a bean, no roasting tricks, no bitterness to hide. We slow-roast and mill it with cacao butter, and that is the whole recipe.</p>
```

With:

```html
<p class="bodyc" style="color:#57534b;font-size:1.05rem;max-width:40ch;line-height:1.7;margin:0 0 24px;">Carob is a naturally sweet pod that grows in the warm Australian sun. It is not a bean, and it is naturally caffeine free. We slow-roast and mill it with cacao butter for a mellow, velvety finish.</p>
```

### 3. Change the fact text from `Zero caffeine` to `Caffeine free`

Replace this fact item text:

```html
Zero caffeine
```

With:

```html
Caffeine free
```

### 4. Update the second desktop callout

Replace:

```html
<span class="t">Zero caffeine</span><span class="n">02</span></div><span class="d">Gentle by nature, any hour.</span>
```

With:

```html
<span class="t">Caffeine free</span><span class="n">02</span></div><span class="d">Naturally caffeine free.</span>
```

### 5. Update the slow-roasted callout copy

Replace:

```html
<span class="d">Then milled with cacao butter.</span>
```

With:

```html
<span class="d">Milled with cacao butter for smoothness.</span>
```

### 6. Remove the `Nothing added` callout

Delete only this final callout:

```html
<div class="co flip" style="right:120px;top:58%"><span class="dot"></span><span class="line"></span><div class="lab"><div class="top"><svg viewBox="0 0 24 24"><path d="M12 21s-7-4.5-7-10a7 7 0 0 1 14 0c0 5.5-7 10-7 10z"/></svg><span class="t">Nothing added</span><span class="n">04</span></div><span class="d">That is the whole recipe.</span></div></div>
```

### 7. Copy guardrails

Do not add claims about sleep, calm, stress, antioxidants, digestion, energy, mood, or health outcomes. Keep the claim set to what the current page already uses: carob pod, naturally sweet, caffeine free, slow-roasted, cacao butter.
