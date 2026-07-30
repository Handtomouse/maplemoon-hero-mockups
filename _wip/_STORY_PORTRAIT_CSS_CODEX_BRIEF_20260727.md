# Codex fix brief — our-story.WIP.html L592 malformed CSS

**File:** `_wip/our-story.WIP.html`
**Line:** 592 (rule: `.os .os-story-hero__portrait::before`)
**Status:** renders fine today (browser silently drops the invalid declaration), but the source is broken and needs cleanup before this file is trusted further.

## What's wrong

Current line 592:

```css
.os .os-story-hero__portrait::before{content:"";position:absolute;inset:-28px;z-index:0;background:url('/assets/our_story/founders_portrait_h212.webp') center/cover no-repeat;filter:blur(34px);opacity:.5 center 40%/cover no-repeat;filter:blur(24px);transform:scale(1.04);opacity:.78;}
```

Two problems, both artifacts of the founder-photo swap:
1. **Duplicate `filter` declarations** — `blur(34px)` then `blur(24px)`. Only the second wins; the first is dead weight.
2. **Invalid `opacity` value** — `opacity:.5 center 40%/cover no-repeat` jams background-shorthand fragments (`center 40%/cover no-repeat`) into an `opacity` property. This is silently dropped by the browser, so only the later `opacity:.78` actually applies. It's just dead/misleading code today, but a malformed declaration in a stylesheet is a landmine for the next person editing nearby rules.

## Fix

Do not drop `content:""`, `position:absolute`, `inset:-28px`, or `z-index:0` — those position the pseudo-element; removing them (as a naive one-line swap might) would make it stop rendering entirely. The only open question was the `background-position` value, resolved below.

## Background-position — Nate's call, made

The jammed fragment literally reads `center 40%`, and there's supporting evidence elsewhere in this same file that this vertical bias was intentional, not a typo:
- The real `<img>` inside this hero uses `object-position:46% 40%` (line 594).
- The mobile-only override two rules down sets `background-position:46% 32%` on this exact `::before` (line 600) and `object-position:46% 32%` on the img (line 602).

So the desktop `::before` may have been *meant* to carry `center 40%` positioning to match the image's framing, and it just got mangled into the `opacity` property during the swap instead of landing in `background`.

**Nate's call: Option B — `center 40%/cover no-repeat`.** Matches the framing bias shared with the `<img>` (`object-position:46% 40%`) and its mobile override (`46% 32%`).

Corrected fix to send to Codex:

```css
.os .os-story-hero__portrait::before{content:"";position:absolute;inset:-28px;z-index:0;background:url('/assets/our_story/founders_portrait_h212.webp') center 40%/cover no-repeat;filter:blur(24px);transform:scale(1.04);opacity:.78;}
```

## Handoff note

Codex session is currently live in this repo (two processes with cwd in `maplemoon-website`, last completed turn 18:26 today was an unrelated fix — founder `<img>` src path). Do not paste this into Codex until that session is confirmed free — check with Nate first.

## Addendum — Brunswick Heads copy (13 Jul decision, still unapplied)

Same file. `_wip/our-story.WIP.html` line 370 still reads:

```html
<h2>From Brunswick Heads, far north coast <em>NSW.</em></h2>
```

The 13 Jul decision was to stop naming Brunswick Heads specifically and broaden to Australian/NSW far-north-coast. Small text-only change, page-local, no client input needed:

```html
<h2>From the far north coast of <em>NSW, Australia.</em></h2>
```

(Wording above is a placeholder in the same voice — Codex/Nate should tighten to match the surrounding copy's tone if needed. The `aria-label="Brunswick Heads"` on the parent `<section>` at line 366 and the CSS selectors keyed off it can stay as-is — that's an internal hook name, not visible copy.)
