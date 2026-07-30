# Stockists Marquee Section Review

Scope: `_wip/homepage_real_1_lead_photo.WIP.html`, section `#stockists`, immediately after `#who`.

Reviewed against the current source, `_wip/stockists.WIP.html`, `_wip/_HANDOFF_CODEX_20260719.md`, and local render measurements at 390px, 768px, and 1440px. The supplied port 3005 URL was not reachable in this session, so I used a temporary static server on port 3006 for measurement and stopped it afterwards.

## Current Read

The section is a compact social-proof strip: a small uppercase kicker, a continuously moving serif list of confirmed representative stockists, and a tiny footer note: `70+ stockists across Australia &middot; full list at maplemoon.com.au/pages/stockists`.

The stockist names appear to match the confirmed representative set from the handoff and stockists page. It correctly avoids invented logos. The current render measured as a short 159px to 183px section, with the marquee names at 22.4px on all viewports, the footer note at 9.6px on all viewports, a 10,103px duplicated track, and a 34s animation.

It works as a tasteful divider, but it underplays the strongest proof point. "70+ stockists across Australia" is the message, yet it is currently the smallest and least actionable text in the section.

## Issues

1. **The hierarchy is inverted.** The moving store names are visually dominant, while the actual credibility claim, `70+ stockists across Australia`, is tiny footer copy.

2. **The footer note is too small to carry a CTA.** At 9.6px with heavy uppercase letter spacing, the raw URL is hard to read on mobile and feels more like legal fine print than a useful path to the full list.

3. **The section lacks a real visible heading.** `Find maple moon in` is a soft fragment, not a proof statement. It also repeats the lower-case brand treatment when the section needs a clearer trust message.

4. **The marquee is too fast for the amount of content.** A 10,103px track moving half its width in 34s is quick enough that names are read in passing rather than absorbed.

5. **Touch users cannot pause the motion.** The pause behavior is hover-only. The global reduced-motion rule removes animation, but the default mobile experience still scrolls continuously.

6. **Screen readers may encounter duplicated names.** The track repeats the same 18 names twice for the animation loop, so assistive tech can read redundant content unless the moving track is treated as decorative and replaced with a concise accessible summary.

7. **It feels slightly unfinished between two stronger editorial sections.** The founder strip before it and testimonial section after it both have clear editorial roles. This strip needs a little more framing to feel intentional rather than inserted.

## Option A: Minimal Marquee Polish

Keep the current structure and all current stockist names. Slow the animation, scale type and gaps down on mobile, make the footer note larger, and replace the raw URL with a link to the stockists WIP page.

Why it works: smallest patch, lowest risk, no content changes beyond the CTA copy.

Tradeoff: the section still reads mostly as a motion divider, not a trust proof section.

## Option B: Proof Strip With Marquee Support

Add a real section heading, make `70+ stockists across Australia` the main message, add one plain supporting line from the stockists page, keep the existing confirmed marquee names as the visual texture, and turn the footer into a clean `View full stockist list` link.

Why it works: it promotes the verified proof point, keeps the distinctive movement, and creates a useful path to the full stockists page without inventing logos or names.

Tradeoff: adds a little height, roughly one more compact text line above the marquee.

## Option C: Static Confirmed-Name Grid

Replace the marquee with a calm wrapped grid or pill row using confirmed names already present, for example WholeLife Pharmacy, Seasons IGA, GoVita Ballina, Maloneys Coogee, Health Emporium, Ripe Organics, Village Greens, Turramurra Wholefoods, Surfcoast Wholefoods, Fill Good Bulk Store, Patterson's Organics, and Goodness Me.

Why it works: most accessible and easiest to scan. It also avoids motion concerns entirely.

Tradeoff: less atmospheric and less distinctive. It may feel more like a directory preview than a premium homepage proof moment.

## Recommended Option

Choose **Option B**.

The homepage needs the 70+ proof to land clearly, but the marquee is still useful as a soft, editorial texture. Option B keeps the confirmed representative list, does not invent logos, avoids adding unverified stockists, and fixes the main copy and layout weaknesses with a contained patch.

## Exact Scoped Patch Suggestion

Patch only the `#stockists` section markup and the existing `.wf-marq` / `.marq` CSS block. Do not alter the current stockist name sequence. Do not add logos. Do not add names outside the current homepage or confirmed stockists source.

### 1. Replace the current stockists CSS block

Replace the current block from `.wf-marq{...}` through `@keyframes marqSlide{...}` with:

```css
.wf-marq{padding:calc(var(--sp-sm) * 1.15) 0 calc(var(--sp-sm) * 1.25);border-top:1px solid var(--line-soft);border-bottom:1px solid var(--line-soft);text-align:center;}
.wf-marq .marq-head{max-width:760px;margin:0 auto;}
.wf-marq .qkick{margin-bottom:10px;}
.wf-marq h2{font-family:var(--mm-serif);font-weight:500;font-size:clamp(1.45rem,2.4vw,2rem);line-height:1.12;margin:0;color:var(--ink);}
.wf-marq .marq-sub{max-width:54ch;margin:9px auto 0;color:var(--ink-soft);font-size:.94rem;line-height:1.5;}
.wf-marq .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0;}
.marq{overflow:hidden;margin:20px 0 16px;-webkit-mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);}
.marq-track{display:inline-flex;align-items:center;gap:clamp(24px,3vw,44px);white-space:nowrap;animation:marqSlide 56s linear infinite;padding-left:clamp(24px,3vw,44px);}
.marq-track span{font-family:var(--mm-serif);font-weight:500;font-size:clamp(1.08rem,1.9vw,1.4rem);color:var(--ink-soft);letter-spacing:.02em;}
.marq-track i{width:6px;height:6px;border-radius:50%;background:var(--ink-faint);opacity:.5;flex:0 0 auto;}
.marq:hover .marq-track{animation-play-state:paused;}
.marq-note{display:flex;align-items:center;justify-content:center;gap:10px 16px;flex-wrap:wrap;margin:0;font-size:.68rem;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-faint);}
.marq-note a{color:var(--ink-soft);border-bottom:1px solid rgba(102,95,83,.35);padding-bottom:2px;}
.marq-note a:hover{color:var(--ink);}
@keyframes marqSlide{from{transform:translateX(0);}to{transform:translateX(-50%);}}

@media (max-width:720px){
  .wf-marq{padding:30px 0 34px;}
  .wf-marq .marq-sub{font-size:.9rem;max-width:32ch;}
  .marq{margin:18px 0 15px;-webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);}
  .marq-track{gap:26px;padding-left:26px;animation-duration:64s;}
  .marq-track span{font-size:1.08rem;}
  .marq-track i{width:4px;height:4px;}
  .marq-note{max-width:300px;margin:0 auto;font-size:.64rem;line-height:1.5;letter-spacing:.1em;}
}

@media (prefers-reduced-motion:reduce){
  .wf-marq .marq{overflow:visible;-webkit-mask-image:none;mask-image:none;padding:0 28px;}
  .wf-marq .marq-track{animation:none;transform:none;display:flex;flex-wrap:wrap;justify-content:center;white-space:normal;gap:10px 14px;padding-left:0;}
  .wf-marq .marq-track i{display:none;}
  .wf-marq .marq-track span{font-family:var(--mm-sans,'Neue Haas Grotesk Display Pro',Helvetica,sans-serif);font-size:.72rem;line-height:1;letter-spacing:.07em;text-transform:uppercase;border:1px solid var(--line-soft);border-radius:999px;padding:8px 10px;background:rgba(251,250,247,.44);}
}
```

### 2. Replace only the stockists section wrapper and footer

Keep the two existing name runs inside `.marq-track` exactly as they are today.

Change:

```html
<section class="wf-marq" id="stockists" aria-label="Stockists">
  <div class="wrap" style="text-align:center"><span class="qkick" style="margin-bottom:8px">Find maple moon in</span></div>
  <div class="marq"><div class="marq-track">
    <!-- existing two identical confirmed name runs stay unchanged -->
  </div></div>
  <div class="wrap" style="text-align:center"><span style="font-size:.6rem;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-faint)">70+ stockists across Australia &middot; full list at maplemoon.com.au/pages/stockists</span></div>
</section>
```

To:

```html
<section class="wf-marq" id="stockists" aria-labelledby="stockists-title">
  <div class="wrap marq-head">
    <span class="qkick">Stockists</span>
    <h2 id="stockists-title">70+ stockists across Australia</h2>
    <p class="marq-sub">Find Maple Moon at health food stores, pharmacies and grocers across Australia.</p>
    <p class="sr-only">Representative confirmed stockists include WholeLife Pharmacy, Seasons IGA, GoVita Ballina, GoVita Blacktown, Maloneys Coogee, Maloneys Rozelle, Maloneys Surry Hills, Health Emporium, Ripe Organics, Village Greens, Turramurra Wholefoods, Surfcoast Wholefoods, Fill Good Bulk Store, In2Health, Patterson's Organics, Harpers Food Market, Goodness Me, and Five Vegans.</p>
  </div>
  <div class="marq" aria-hidden="true"><div class="marq-track">
    <!-- existing two identical confirmed name runs stay unchanged -->
  </div></div>
  <div class="wrap"><p class="marq-note"><span>Representative stockist selection</span><a href="stockists.WIP.html">View full stockist list</a></p></div>
</section>
```

For the final Shopify port, swap `stockists.WIP.html` to the production stockists route. In the WIP file, keep the `.WIP.html` link to match the rest of the local navigation.
