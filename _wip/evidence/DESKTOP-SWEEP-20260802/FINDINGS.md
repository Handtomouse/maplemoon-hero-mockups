# Desktop-width horizontal-inset sweep — findings
# Written: 2026-08-02 · macbook Claude Code (worker)
# STATUS: PRE-SCREEN ONLY. Records no verdict. Passes no gate. CR-0 is Nate's alone.

## Why this ran

All prior CR-0 evidence was captured at ≤720px layout width (keyboard at 390, zoom
pre-screen at 720), both below the 900px breakpoint. The carob defect lives above 900px.
So the evidence pack had **no coverage of desktop widths at all**, and the cascade that
caused it could plausibly repeat elsewhere.

Method: headless CDP, `Emulation.setDeviceMetricsOverride`, measuring the minimum left edge
of visible text-bearing descendants per `<section>`, then comparing each section against the
page's own median. Deviation is the signal; an absolute threshold is meaningless because
each page has its own grid.

## Correction to the intake's description of the defect

The intake states the carob section's content "remain[s] pressed against the left viewport
edge". **Measured, that is not what happens.**

| width | `#carob` textLeft | page median | deviation |
|---|---|---|---|
| 1440 | 130px | 158px | **−28px** |
| 1280 | 50px | 78px | **−28px** |

`getComputedStyle(inner).paddingLeft` returns **`0px`** at both widths, confirming the
top-level `padding:0` is the operative rule. But the section is not flush to the viewport
edge — it sits **28px left of the alignment grid every other section shares**, consistently
at both desktop widths.

That is still a genuine, visible defect: broken vertical alignment is one of the things the
eye catches fastest down a page. It is just smaller and more precise than "pressed against
the edge", and the packet should describe it accurately, because "restore the 28px grid
alignment" is a different fix from "add padding".

The original feedback record's `rect: {x:0, w:1158}` is the **section** bounding box, which
legitimately spans the full viewport. It is not evidence that the text sits at x=0.

## Two further candidates — RAISED, THEN DISPROVED

The first pass flagged two more sections as outliers. **Both were false positives of my own
detector** and are recorded here so the mistake is not repeated.

The detector took the minimum left edge of each section's text and compared it to the page
median. That silently assumes every section is left-aligned. It is not: a **centred** block
legitimately starts further left than a left-aligned grid, and gets flagged for doing exactly
what it was designed to do.

Re-measured with `text-align` and left/right gap symmetry:

| page | section | align | gap left | gap right | verdict |
|---|---|---|---|---|---|
| our-story | `#shop` | `center` | 28px | 28px | **symmetric — centred by design, NOT a defect** |
| faq | `.wrap` ×3 | mixed | 120px | 120px / 319px | **on their own grid, NOT a defect** |

`our-story #shop` uses a wider centred container than its siblings (28px margins versus
`#range`'s 158px), but it is perfectly symmetric. That is a design choice, not a misalignment.

**Lesson for any future sweep: compare like with like.** Deviation from a page median is only
meaningful within one alignment mode. Segment by `text-align` and check gap symmetry before
flagging anything.

## The carob defect is the only genuine misalignment found

Re-measured at 1440 with alignment mode included:

| homepage section | align | gap left |
|---|---|---|
| `#top` | start | 158px |
| `#ritual` | start | 158px |
| **`#carob`** | **start** | **130px** |

`#carob` is left-aligned exactly like its siblings, and is the **only** left-aligned section on
the page that misses their shared 158px grid. Isolated, consistent, and real.

## Clean at desktop

`shop`, `carob-story` and `stockists` show no negative outliers at 1440. Their sections sit
on a consistent grid (158 / 141 / 158 median respectively). Right-shifted sections on
homepage (`#range` +202, `#story` +666) and our-story (`#place` +672, `#ingredient` +397) are
offset-column layouts, not defects.

## A near-miss worth recording

Homepage **failed the hard load guard at 1440** on the first pass: URL and title were correct
but `document.querySelectorAll('section').length` was 0, because it was the first navigation
after the metrics override and 1.4s was not enough for the DOM to parse. The sweep recorded
`LOAD_FAILED` and refused to measure it.

Had the guard not been there, homepage — the one page with a known defect — would have been
reported with zero sections and therefore **zero findings, indistinguishable from clean**.
A prior run in this project silently audited Chrome's error page for exactly this reason.
Re-run with a retry loop produced 11 sections and the measurements above.

**Any future sweep must assert the page actually parsed, not merely that it navigated.**

## Scope of what this does and does not establish

Establishes: horizontal alignment of section text at 1440 and 1280, measured.

Does NOT establish: anything about vertical rhythm, imagery, typography, colour, copy, or
whether the layout is *good*. This is one narrow geometric check. It is not a desktop review,
and it does not reduce what CR-0 asks of Nate.
