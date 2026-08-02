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

## Two further candidates the sweep surfaced

Neither is confirmed as a defect. Both are alignment outliers against their own page grid
and need Nate's eyes.

| page | section | textLeft | page median | deviation |
|---|---|---|---|---|
| our-story | `#shop` "The range" | 28px | 158px | **−130px** |
| faq | `.wrap` ×3 ("Good questions", "Popular questions", "Browse") | 120px | 181px | −61px |

**`our-story #shop` deviates nearly five times as far as the carob section does.** If the
carob misalignment is worth a P0, this one warrants a look before the send. It may equally be
an intentional full-bleed treatment — that is a judgement call, not a measurement.

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
