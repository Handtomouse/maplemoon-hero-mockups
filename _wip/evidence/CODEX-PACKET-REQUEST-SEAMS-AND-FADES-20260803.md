# Codex packet request — section seams and image fades, four pages
# Written: 2026-08-03 · macbook Claude Code (worker)
# STATUS: REQUEST. Nothing edited, built or rebuilt from this lane.
#         Source: NATE-REVIEW-PASS-20260803.md — RT1 + OS3 + CS1 + ST1

**This is the single highest-value item in Nate's entire review.** His words, on homepage:
*"its the biggest visual throw off of the whole site and needs to be fixed."* Then, independently,
he asked for the same treatment on our-story, carob-story and stockists.

**One design language. One packet. Four pages.** Split it and the pages drift apart again.

---

## THE DIAGNOSIS — measured, not assumed

Three wrong theories were eliminated first. Record them so nobody re-derives them:

| theory | measured result |
|---|---|
| 1px `border-top` seams between sections | **WRONG.** 31 `border-top:1px solid` in homepage source, but at 1440 **only 3 render, all inside the cart dialog**. Zero between page sections. |
| Sections have clashing background colours | **WRONG.** Every section computes to `rgba(0, 0, 0, 0)` — fully transparent. The page gradient shows through all of them. |
| The fog treatment is missing | **WRONG.** `.fog` renders at 1440: opacity `1`, `display:block`, **1440×410 at y=890**, with a background image. `.wf-mist` also renders. Both work. |

**What is actually happening:** the page has a continuous gradient background, and **full-bleed
section imagery terminates against it with a hard edge**. The hero video, `#carob`'s
`.pic` (`carob_branch_dusk.jpg`) and `#story`'s orchard image all end abruptly.

**The correct treatment already exists on the page, and works.** `.fog` is a 410px dissolve band
at the hero's base that melts the hero into the page gradient. **The hero is the reference.
Nothing else gets the same treatment.**

> **This reframes Nate's ask.** *"bring back the side fog we made in a previous version"* is not
> a missing feature — `.fog` is present and identical across all five `_wip/variants/` files
> (verified: one unique rule, sha `40884069c6fe`, and the current homepage's first `.fog` rule
> matches it). He is describing a treatment he remembers working and wants **applied more
> widely**. **There is no variant for him to choose between.**

---

## THE WORK

**Objective:** every full-bleed section image dissolves into the page gradient the way the hero
already does. No hard terminating edges anywhere, on any of the four pages.

### Step 1 — confirm the mechanism before building

Inspect how `.fog` achieves the hero dissolve (gradient overlay band, `mask-image`, or both),
and inspect what `#carob .pic` and `#story`'s image do at their edges instead. **Report the
difference before writing any CSS.** Do not assume the fix is a copy-paste of `.fog`.

### Step 2 — homepage first, as the reference

Apply the dissolve to every hard image edge. Known candidates: `#carob .pic`,
`#story`'s background image, and any section boundary that still reads as a band after those
two are done. Nate's phrasing covers the run `#top → #range → #carob → #ritual → onward`.

### Step 3 — bring the other three up to homepage standard

`our-story` · `carob-story` · `stockists` — **homepage is the reference, explicitly.** His
words: *"bring it up to the brand style of the homepage with section and large image fades into
the sections."*

Note the source-level seam counts differ per page — `our-story` 12, `stockists` 11,
`carob-story` 9, `faq` 3 `border-top:1px solid` declarations. **Verify which actually render**
before touching them; homepage proved most do not.

### Also in scope — same visual family

- **`S2`** — `#story` fade is applied to the **top only**. Make it symmetrical, bottom too.
- **`RT2`** — soften the three `When do you moon?` cards: more curve, softer integration.

### Explicitly OUT of scope

`R2`/`R3` — the **carousel edge mist**, where edge bars are blurred and mist-covered with only
the centre bar sharp. That is a **different, genuinely new** treatment, not the section
dissolve, and it needs its own packet. Do not conflate them.

---

## HARD RULES

    Edit ONLY the WIP sources for: homepage, our-story, carob-story, stockists
    DO NOT rebuild staging-v1/. DO NOT run the build script.

`clean/MANIFEST.json` must stay `d1c66b1d5937e9956d1806dbbbff4faf4f950def046aa642ae52f809c3d52d20`.
A rebuild now voids the freeze and kills the keyboard traversal (`9ead886`) and the 200% zoom
pre-screen (`fe3c580`), both bound to that hash. **One rebuild, at the very end, after every
packet is in.**

All four WIP sources are under `LOCK_MANIFEST.json`. Codex is lock custodian — admit properly.

**Do not conflict with the in-flight homepage packet**
(`CODEX-PACKET-REQUEST-HOMEPAGE-FIXES-20260803.md`), which is already editing
`_wip/homepage_real_1_lead_photo.WIP.html`. **Sequence them; do not run both against that file
at once.**

## Verify

At **1440**, **834** and **390**, per page:

1. Scroll the full page. **No hard terminating edge on any section image.**
2. The hero dissolve is unchanged — it was already correct and is the reference.
3. `#carob` stays on the 158px grid, `#story`'s fade is symmetrical.
4. Assert the page parsed: `document.querySelectorAll('section').length` ≥ expected
   (homepage **8**, our-story **8**, carob-story **5**, stockists **3**).
5. **Any capture must scroll top→bottom and wait on `document.images` first.** Skipping this
   produced an entire false finding set (`IMG-001`–`IMG-004`) earlier today.

## Report back

The Step 1 mechanism comparison, what changed per page, verify output at all three widths, and
confirmation that `clean/MANIFEST.json` is still `d1c66b1d…`.

## Do not touch

`staging-v1/`, `scripts/`, `.gitignore`, `shop.html`/`faq.html` WIP sources, and any gate.
**CR-0..CR-4 and `NATE-HOME-001` are Nate's alone.**
