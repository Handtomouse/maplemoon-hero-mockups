# Story Tease Section Review

Target: `_wip/homepage_real_1_lead_photo.WIP.html`, section `id="story"`, headline `Born from Nighttime Cravings & Kind Intentions`.

Screenshot reviewed: Image 7, 1672 x 1602. This looks like a retina/tablet-width capture, so the `max-width:900px` rules are active.

## Current Read

The section is trying to act as a soft founder-story bridge: editorial headline on the right, Carli's exact tease copy below it, a text-link CTA, and a lighthouse dusk photo fading up from the bottom. In the source, desktop also has three annotation callouts on the photo, but Image 7 hides them through the mobile/tablet media rule.

The tone is close to MapleMoon: calm, atmospheric, coastal, and story-led. The main problem is not the story copy. It is that the responsive layout switches the image to a bottom band but leaves the text column right-aligned, so the left half turns into unused pale space and the CTA lands on top of the lighthouse crop.

## Issues

1. Headline scale is too dominant at this breakpoint. The three-line serif stack reads like another hero, not a mid-page story tease. It is elegant, but oversized relative to the paragraph and next founder strip.

2. The text column is still `margin-left:auto` when the `max-width:900px` layout is active. Because the photo has already moved to the bottom, the right-floating column no longer has a clear partner on the left.

3. The story paragraph has one punctuation problem: `a simple need, a truly delicious treat` is a comma splice. A colon fixes it without rewriting Carli's copy.

4. The CTA placement is visually fragile. In Image 7, the underline and arrow sit just above the lighthouse lantern, so the link feels caught in the photo fade instead of clearly belonging to the text block.

5. The lighthouse crop is scenic and pretty, but the current fade makes the top of the image feel accidental. The tower emerges directly under the CTA, while the leading staircase pulls attention away from the founder story copy.

6. The annotations are a mismatch for this section. On desktop they say `Sun-ripened`, `Small batches`, and `The far north coast`, which are process/origin points rather than founder-story points. On Image 7 they disappear entirely, so they are not carrying the section.

7. The next section transition is cramped. The `Carli & Dylan` strip appears immediately after the misted photo, so the page repeats the story CTA before the story moment has had enough breathing room.

## Option A: Text-First Story Bridge

Keep the exact story tease copy, fix only punctuation, center the text block at tablet/mobile widths, reduce the story headline slightly, hide the story-specific annotations, and push the photo lower so the CTA clears the lighthouse.

Why it works: this is the smallest practical fix and directly addresses Image 7. It keeps the lighthouse atmosphere but stops the section from pretending to be a technical annotation band.

Tradeoff: desktop loses the three callout labels in this section. That is acceptable because the labels are not story-specific.

## Option B: Keep the Annotated Split Longer

Treat Image 7 width as a small desktop, not tablet. Override the `max-width:900px` story rules between roughly `721px` and `900px`, keeping the image on the left, text on the right, and annotations visible.

Why it works: it preserves the full-bleed editorial split and mirrors the earlier `What is Carob` section.

Tradeoff: it keeps the weaker annotation copy and risks a cramped composition on iPad-like widths. I would only choose this if the page needs strong formal symmetry between the carob and story bands.

## Option C: Founder Handoff

Make the section explicitly hand off to the founder strip. Hide the annotations, keep the lighthouse as a shallow atmospheric base, then pull the `Carli & Dylan` strip closer as the next beat with more top margin and a less card-like feel.

Why it works: it clarifies the page logic: story tease first, founders next.

Tradeoff: it is a broader layout change because it affects the following `#who` section, not just the story band.

## Recommended Option

Option A. It solves the visible Image 7 problems with a small, reversible patch. It also respects the rule not to rewrite Carli's story tease copy, apart from punctuation safety.

## Exact Scoped Patch Suggestion

Patch only the story section styles and the one punctuation mark in the story paragraph. Do not change other homepage sections.

```diff
diff --git a/_wip/homepage_real_1_lead_photo.WIP.html b/_wip/homepage_real_1_lead_photo.WIP.html
--- a/_wip/homepage_real_1_lead_photo.WIP.html
+++ b/_wip/homepage_real_1_lead_photo.WIP.html
@@
 .wf-where1{position:relative;height:620px;display:flex;align-items:center;overflow:hidden;}
 .wf-where1 .pic{position:absolute;top:0;left:0;height:100%;width:min(1300px,80%);pointer-events:none;}
 .wf-where1 .pic img{position:absolute;top:0;left:0;height:100%;width:100%;object-fit:cover;object-position:left 38%;
   -webkit-mask-image:linear-gradient(270deg,transparent 0,transparent 8%,#000 42%),linear-gradient(180deg,transparent 0,#000 150px,#000 calc(100% - 150px),transparent 100%);
   mask-image:linear-gradient(270deg,transparent 0,transparent 8%,#000 42%),linear-gradient(180deg,transparent 0,#000 150px,#000 calc(100% - 150px),transparent 100%);
   -webkit-mask-composite:source-in;mask-composite:intersect;}
 .wf-where1 .inner{position:relative;z-index:2;width:100%;}
-.wf-where1 .col{max-width:430px;margin-left:auto;}
+.wf-where1 .col{max-width:500px;margin-left:auto;}
+.wf-where1 .co{display:none;}
 @media (max-width:900px){
-  .wf-where1{height:auto;padding:50px 0 280px;}
-  .wf-where1 .pic{width:100%;height:320px;top:auto;bottom:0;-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 60px);mask-image:linear-gradient(180deg,transparent 0,#000 60px);}
-  .wf-where1 .co{display:none;}
+  .wf-where1{height:auto;padding:56px 0 360px;}
+  .wf-where1 .col{max-width:min(520px,100%);margin:0 auto;}
+  .wf-where1 .lux-hd{font-size:clamp(1.9rem,5.4vw,2.2rem);line-height:1.12;}
+  .wf-where1 p{font-size:1rem!important;line-height:1.62!important;max-width:44ch!important;margin-bottom:28px!important;}
+  .wf-where1 .wf-more{margin-top:2px;}
+  .wf-where1 .pic{width:100%;height:330px;top:auto;bottom:0;-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 72px,#000 calc(100% - 70px),transparent 100%);mask-image:linear-gradient(180deg,transparent 0,#000 72px,#000 calc(100% - 70px),transparent 100%);}
+  .wf-where1 .pic img{object-position:center 44%;}
 }
@@
-        <p style="color:#57534b;font-size:1.05rem;max-width:40ch;line-height:1.7;margin:0 0 24px;">Our co-founder, Carli, created Maple Moon to answer a simple need, a truly delicious treat without caffeine or buzz. What started as one flavour evolved into a full range of handcrafted carob creations loved by health-conscious treat lovers of all ages.</p>
+        <p style="color:#57534b;font-size:1.05rem;max-width:40ch;line-height:1.7;margin:0 0 24px;">Our co-founder, Carli, created Maple Moon to answer a simple need: a truly delicious treat without caffeine or buzz. What started as one flavour evolved into a full range of handcrafted carob creations loved by health-conscious treat lovers of all ages.</p>
```

Optional small follow-up if the next-section transition still feels tight after Option A:

```css
#who{margin-top:clamp(18px,3vw,34px);}
```

