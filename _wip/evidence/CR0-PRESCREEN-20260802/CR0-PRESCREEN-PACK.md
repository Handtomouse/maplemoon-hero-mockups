# CR-0 PRE-SCREEN PACK
# Written: 2026-08-02 · macbook Claude Code (worker)
# STATUS: PRE-SCREEN ONLY. Records no verdict. Passes no gate.
#         CR-0 is Nate's alone — an agent may find defects, never record the PASS.

## Purpose

Make Nate's CR-0 pass **short and informed**: state what is already evidenced so he
doesn't redo it, and hand him a shortlist of anything worth his own eyes.

## Artifact under review

`docs/client-review/2026-08-01-saturday-review/staging-v1/clean/` — the frozen six-page
clean package, served loopback-only from `127.0.0.1:3011`.

Integrity confirmed before screening:
- `clean/MANIFEST.json`     = `d1c66b1d5937e9956d1806dbbbff4faf4f950def046aa642ae52f809c3d52d20`
- `annotated/MANIFEST.json` = `3be3c0f2df4658558c667b3e9cc6d55966d6a1d7ce9fa9874c46a0afc44244c7`

## CR-0 has three surfaces. Here is the state of each.

| Surface | State | Who |
|---|---|---|
| Keyboard / focus traversal | **EVIDENCED** — 5 of 6 pages, real OS-level Tab at literal 390 CSS px | done |
| Literal 200% browser zoom | **PRE-SCREENED CLEAN** — all 6 pages, see below | done |
| Ordinary-viewer read (does it look right, does the copy land) | **NOT STARTED** | **Nate only** |

---

## 1. Literal 200% zoom — method and why it is trustworthy

200% browser zoom means CSS pixels render twice as large, so the **layout viewport in CSS
px halves** and `devicePixelRatio` doubles. Reproduced via CDP
`Emulation.setDeviceMetricsOverride` at 720×450 CSS px with `deviceScaleFactor: 2`,
equivalent to a 1440×900 desktop window at 200%.

**Equivalence was proven, not assumed.** A feasibility spike confirmed the page genuinely
*reflows* rather than merely rendering larger:

- layout viewport halved 1440 → 720 CSS px
- `devicePixelRatio` = 2
- **media queries re-evaluated**: `(max-width:1024px)` false → true, `(max-width:768px)`
  false → true — this is the decisive check; a page that only rendered bigger would not
  re-evaluate its breakpoints
- CSS `font-size` unchanged at 16px, which is correct: at 200% zoom CSS px stay 16 in CSS
  terms and are magnified physically

Run headless, so it required no window focus and could not disturb anything.

## 2. Result: no genuine defects at 200% zoom on any of the six pages

**No horizontal document scrolling on any page** — the primary 200% failure mode is absent.

| page | controls | document h-scroll |
|---|---|---|
| homepage | 40 | none |
| shop | 60 | none |
| our-story | 29 | none |
| carob-story | 25 | none |
| stockists | 49 | none |
| faq | 37 | none |

### Candidates raised by the detector, and why each was dismissed

Every one was individually verified rather than reported as raw output.

1. **`BUTTON.mm-cart-overlay` reported as fixed chrome covering 100% of viewport — all 6 pages.**
   DISMISSED. This is the cart overlay backdrop while the cart is *closed*. The independent
   keyboard evidence shows the closed dialog is `inert`, `aria-hidden="true"`, with **zero**
   focusable elements leaking into it on every page. Detector false positive.

2. **`shop` — `H2.sr-only` "Shop all products" clipped (scrollWidth 160 vs clientWidth 1).**
   DISMISSED. `.sr-only` is the screen-reader-only utility class; clipping to a 1×1 box is
   exactly its intended behaviour. Working as designed.

3. **`stockists` — `BUTTON.st-filter` "NT" extends 46px past the viewport.**
   DISMISSED. Its ancestor `DIV.st-chip-row` is `overflow-x: auto` and genuinely scrollable
   (`scrollWidth 708` vs `clientWidth 598`), so the control is reachable by scrolling that
   row. Deliberate chip-scroller pattern.

4. **`faq` — `BUTTON.popular-chip` "Can I get help with an order?" extends 27px past the viewport.**
   DISMISSED, same reason. Ancestor `DIV.popular-row` is `overflow-x: auto` and scrollable
   (`scrollWidth 748` vs `clientWidth 692`).

   *Note on 3 and 4:* the page sets `overflow-x: hidden` higher up, which defeats
   `scrollWidth`-based overflow detection entirely. `getBoundingClientRect` was used instead,
   which is why these surfaced at all. Worth remembering for any future overflow work.

### One low-priority observation, not a defect

- **`faq`** — the link "Email the Maple Moon team" is 183 × **18** px. Height is under the
  24 px WCAG 2.2 target-size minimum. WCAG explicitly **exempts inline links in text**, so
  this is conformant. Flagged only because it is the smallest interactive target in the
  package and is easy to enlarge if you want it more comfortable on touch.

## 3. Keyboard / focus — already evidenced, do not redo

From `_wip/evidence/IMAC-KEYBOARD-PROOF-20260802/` (commit `9ead886`), real OS-level Tab
traversal at literal 390 CSS px with full retained ordered stop lists:

| page | presses | stops | unique | wrapped | leaks | zero-size |
|---|---|---|---|---|---|---|
| our-story | 25 | 25 | 18 | 25 | 0 | 0 |
| carob-story | 21 | 21 | 14 | 21 | 0 | 0 |
| stockists | 39 | 39 | 32 | 39 | 0 | 0 |
| faq | 38 | 38 | 30 | 38 | 0 | 0 |
| shop | 56 | 56 | 49 | 56 | 0 | 0 |

`document_hasFocus` true at start and end on all five; a skip link is the first stop on
every page; the closed cart dialog is inert and `aria-hidden="true"` throughout.

## 4. THE ONE REMAINING GAP

**`homepage` has keyboard evidence only at 500 CSS px, not 390.** The other five pages match
each other; homepage does not match them.

This was deliberately **not** patched here. Completing it requires the same OS-level keystroke
method (osascript key events + CDP `Page.bringToFront`) used for the other five, which needs a
machine where Chrome can be brought frontmost — the iMac. Substituting a weaker input method
and merging the result would contaminate a record whose whole value is that every row was
produced the same way.

## 5. What Nate actually has to do

Everything mechanical is done. What remains is the part no agent may do:

1. Open the six frozen pages and read them **as an ordinary viewer**. Does it look right?
   Does the copy land? Is anything embarrassing, wrong, or missing?
2. Record **PASS**, or name the **first material correction**.

If it helps: at literal 200% zoom nothing is clipped, nothing overflows, no control is
unreachable, and keyboard traversal is clean on five of six pages. The remaining risk in
CR-0 is editorial and visual judgement, not mechanics.

## Authority

Evidence only. Nothing promoted. No verdict recorded. No file outside `_wip/evidence/` was
written. CR-0 through CR-4 remain reserved to Nate; every downstream gate inherits CR-0, so
it must be his record.
