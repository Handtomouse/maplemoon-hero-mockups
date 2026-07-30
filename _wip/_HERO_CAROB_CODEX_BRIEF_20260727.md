# Codex brief — Big CAROB hero wordmark (winner: "mc-balanced")

Lane: **homepage**. File: `_wip/homepage_real_1_lead_photo.WIP.html` ONLY. Page-local hero change;
dirty checkout preserved; **NO commit; NO deploy; never --prod**. Do not touch nav/footer/shop/other
pages. No em dashes in any copy.

## Context
Prior session explored 8 hero-wordmark density/mist variants in a disposable toggle preview
(`_wip/_hero_takes_preview.html`, still on disk, still servable via
`cd ~/maplemoon-website && nohup python3 -m http.server 3005 --bind 127.0.0.1 > /tmp/mm_httpd.log 2>&1 & disown`,
then `http://127.0.0.1:3005/_wip/_hero_takes_preview.html?carob=mc-balanced&shot=1`).

**Correction to an earlier (26 Jul) handoff:** that doc described 4 treatments named
`bleed|bleedmist|nightwindow|moono`. Those param values are STALE — the preview file was iterated
past that point before handoff and now only recognizes 8 different values (`mistedcontained`
[default], `mc-quiet`, `mc-balanced`, `mc-full`, `mist-1`, `mist-1-5`, `mist-2`, `mist-3`). The old
names no longer match any CSS rule in the file, which is why re-running the old params renders as
plain small default text. Verified today (27 Jul) via headless screenshot diff at 1440 and 390px —
screenshots in `/private/tmp/claude-501/.../scratchpad/carob_shots/v2_*.png` if still present, else
re-capture from the live params above.

## Decision (made this session, non-gated per today's coordinator brief)
**Winner: `mc-balanced`.** Big oversized cream serif CAROB (clamp 72-260px), horizontal edge-dissolve
mask (mist effect at word edges only, NOT a full blur — stays legible), plus a soft warm ambient
glow wash behind the whole word (quiet nod to "Maple Moon" moonlight, more tasteful than a literal
glowing-O gimmick). Rejected: `mist-3` (gorgeous but the word nearly dissolves to illegibility —
too far for a brand keyword in the hero); `mc-quiet` (safe fallback if Nate wants smaller — keep as
plan B, not primary).

### Reference CSS (verbatim from the preview, source of truth for exact values)
```css
.carob-text{font-family:var(--mm-serif),"Times New Roman",Georgia,serif!important;font-weight:400;
  line-height:.88;letter-spacing:normal;text-align:center;margin:0 auto;white-space:nowrap;
  color:#f4efd4;--k:1;}
.carob-text .cl{display:inline-block;}
.carob-text .cl:nth-child(1){margin-right:calc(-0.01em * var(--k));}
.carob-text .cl:nth-child(2){margin-right:calc(-0.045em * var(--k));}
.carob-text .cl:nth-child(3){margin-right:calc(-0.07em * var(--k));}
.carob-text .cl:nth-child(4){margin-right:calc(-0.07em * var(--k));}

.wf-pwm .carob-text{font-size:clamp(72px,20vw,260px);--k:1;text-shadow:0 3px 26px rgba(8,18,30,.46);
  position:relative;z-index:1;
  -webkit-mask-image:linear-gradient(90deg,transparent 0%,#000 6%,#000 94%,transparent 100%);
  mask-image:linear-gradient(90deg,transparent 0%,#000 6%,#000 94%,transparent 100%);}
.wf-pwm{position:relative;}
.wf-pwm::before{content:"";position:absolute;left:50%;top:50%;width:58%;height:160%;
  transform:translate(-50%,-50%);
  background:radial-gradient(closest-side, rgba(247,240,205,.30), rgba(247,240,205,.12) 50%, rgba(247,240,205,0) 78%);
  filter:blur(26px);z-index:0;pointer-events:none;}
```

## Where it lands (homepage_real_1_lead_photo.WIP.html)
- Current real markup, ~L694-698:
  ```html
  <div class="wf-hero-copy">
    <p class="wf-peyebrow">Australian organic carob</p>
    <h1 class="wf-pwm"><img src="assets/carob_wordmark.svg" alt="Carob" width="1886" height="447" decoding="async"></h1>
    <p class="wf-ptag">Naturally Sweet, Nothing Added.</p>
  ```
- Current wordmark sizing lives at ~L1448: `.wf-pwm img{width:clamp(360px,calc(var(--wordmark-w) * 1vw),880px);}` (plus responsive overrides ~L105-132, L329, L1498).
- **Preferred approach (per standing rule: prefer masking the real SVG over swapping to live text):** keep `<img src="assets/carob_wordmark.svg">`, apply the mask-image (edge dissolve) + the `::before` radial-gradient glow + a bigger clamp directly to the `<img>` / its wrapper, rather than injecting the letter-span text markup. `mask-image` and `filter:drop-shadow` both work on `<img>` in current Chrome/Safari — no need to rasterize.
- If mask-image on the raster SVG produces visible edge artifacts (some SVGs at large display size can look soft/blurry at the exact place the mask fades), it is acceptable to fall back to the live-text swap (`.wf-pwm img{display:none}` + inject the `.carob-text` spans exactly as the preview does) — flag which path was taken.
- Keep real eyebrow, tagline, both CTAs, dark creds pill, real bg image, real Adobe fonts kit `dvz0xjs` — none of that changes.

## Known bug to fix as part of this brief, not a separate ticket
At 390px mobile, the preview currently overflows horizontally (CAROB word and the CTA row/creds pill
run past the right edge — see `v2_mistedcontained_390.png`). This may be a preview-harness-only
artifact from the two floating debug toolbars (`#hero-toolbar`, `#hero-density-toolbar`) rather than
inherent to the treatment — but verify on the REAL homepage file (no debug toolbars present there)
that mobile stays clean. If real-file mobile also overflows once the bigger clamp is applied, tighten
the clamp min/vw or add `overflow-x:hidden` on the hero section as a safety net — do not ship with a
horizontal scrollbar at 375-414px.

## Verify (by content, not status codes)
- Headless screenshot the REAL file (not the preview) at 1440 and 390/375: `assets/carob_wordmark.svg`
  visually reads bigger/atmospheric than the current `clamp(360px,...,880px)` bake, edges dissolve
  softly at left/right, soft warm glow visible behind the word, full word legible (not mist-3 level),
  no horizontal overflow at any width, both CTAs + creds pill + nav fully on-screen.
- Do NOT commit / deploy / --prod. Kill the :3005 preview server if you started one
  (`kill $(lsof -t -i :3005)`).

## Not in scope here
- Shop #743 brief (bites/bundle/carob-powder pricing) is a SEPARATE, already-written, already
  anchor-verified brief: `_wip/_SHOP_743_CODEX_BRIEF_20260724.md` (unapplied, still valid as of
  27 Jul — anchors re-checked today, no drift). Apply independently; different file (`shop.WIP.html`),
  no overlap with this hero change.
