# Live-browser verification — what is actually broken, and what never was
# Written: 2026-08-03 · macbook Claude Code (worker)
# STATUS: OBSERVATION ONLY. Records no verdict. Passes no gate. Nothing fixed.
#         CR-0..CR-4 remain Nate's alone. NATE-HOME-001 remains `pending`.
#
# SUPERSEDES the static conclusions in:
#   HOMEPAGE-QA-AUDIT-CLASSIFIED-20260803.md
#   FIVE-PAGE-QA-AUDIT-VERIFIED-20260803.md
#   VISUAL-VERIFICATION-20260803.md   ← including its "confirmations"

## Method

Headless Chrome 150 via CDP, isolated profile, `Emulation.setDeviceMetricsOverride` at 1440
and 834, against the running `staging-v1/clean` server on 3011 (`clean/MANIFEST.json` =
`d1c66b1d…`, verified). Hard load guard: `readyState==='complete'` **and** the expected section
count, with retry. Every page scrolled top→bottom→top, then polled until every `<img>` reported
`complete && naturalWidth > 0`.

**This is the first inspection in this whole exercise that actually executed the pages.**

---

## 1. THE ROOT CAUSE OF EVERY FALSE FINDING

`mock-cart.js` and `mock-cart.css` are loaded by all six pages and do **two** things at runtime:

1. **`normalizeReviewNavigation()`** injects `<nav class="mm-review-mobile-nav">` after the
   header. `mock-cart.css:25` sets it `display:none`; `@media(max-width:900px)` at line 606
   turns it into a styled 5-column pill bar.
2. **`hideInClean(...)`** stamps `mm-hide-clean` onto review-only furniture, which
   `mock-cart.css:12` hides with `display:none !important`. This removes, among others, the
   three placeholder sub-nav links on our-story and the internal "provisional" copy on
   stockists.

> **Any inspection that does not execute both files sees a dramatically worse page than the
> one being shipped.** That describes the QA audit zip, my own static analysis, **and Codex's
> captures.** Three independent passes, one shared blind spot, mutually reinforcing.

---

## 2. DISPROVED — artifacts, not defects

Measured live. None of these are wrong with the package.

| claim | source | live measurement |
|---|---|---|
| **`VIS-001`** unstyled concatenated nav below the header, all 18 captures | Codex, and I "confirmed" it | **`display:none`** at 1440; **`display:grid`, 834×62, fully styled** at 834. Skip-link at `top:-60px`. **Correctly hidden.** |
| **`IMG-001`** shop renders most of the catalogue as blank panes | Codex | **28 images, 0 broken** after a scroll pass. The blank panes are unloaded `loading="lazy"` images. |
| **`IMG-002`** our-story empty media slots | Codex | **10 images, 0 broken** |
| **`IMG-003`** carob-story gallery blank at 390/834 | Codex | **6 images, 0 broken** |
| **`IMG-004`** stockists wholesale media blank | Codex | **1 image, 0 broken** |
| **our-story #2** "3 of 8 sub-nav links dead" | audit; I confirmed it statically **twice** | `Founders`, `The source`, `The craft` are **`mm-hide-clean`, `display:none`, `onScreen:false`** at 1440 **and** 834. A viewer never sees them. |
| **stockists #2/#5** internal sign-off copy customer-visible | audit; I confirmed it | **Not present in `body.innerText`.** `cleanStockists()` hides `.st-finder-cue small` and `.st-type-label span`. |
| **homepage #3** "WHAT IS CAROB" wraps in the nav | audit | Nav is hidden at desktop and correctly styled at mobile. |

**The lazy-image point matters most.** My own render brief said: *"Scroll the full page
top→bottom in steps… Without a scroll pass those cards capture blank."* The captures were taken
without an adequate scroll pass, Codex's visual QA then audited its own artifacts, and I
confirmed them by eye from the same PNGs. **`IMG-001` through `IMG-004` are one capture bug.**

---

## 3. CONFIRMED — genuinely real

### 3.1 `#carob` sits 28px left of the grid — `NATE-HOME-001` / `ms49rup1d3dn`

Measured live at 1440, minimum left edge of visible text-bearing descendants per section:

| section | textLeft | deviation | align | `.inner` padding-left |
|---|---|---|---|---|
| `#top` | 158 | 0 | start | 28px |
| **`#carob`** | **130** | **−28** | start | **0px** ← operative |
| `#ritual` | 158 | 0 | start | — |
| `#stockists` | 158 | 0 | center | — |
| `#sampler` | 158 | 0 | center | — |

`#range` (+202) and `#story` (+666) are offset-column layouts, not defects.

**`#carob` is the only left-aligned section that misses the shared 158px grid**, and
`getComputedStyle(.inner).paddingLeft` returns `0px`, confirming the top-level
`.wf-what1 .inner{padding:0}` is what wins above 900px.

This also **independently reproduces the desktop sweep's −28px**, which I had flagged as
unsupported because `sweep.json` recorded `1440/homepage` as `LOAD_FAILED` and held no 1280
data. The number was right; only its evidence trail was missing. That flag is now closed.

**Nate's own wording still overstates it.** "Pressed against the left edge" implies flush at
x=0; it is a 28px grid miss. The correction is *restore the established inset*, not *add
padding*. Decision remains `pending` — **his to record, not mine.**

### 3.2 carob-story promises four FAQ items and shows three

`document.querySelectorAll('details').length === 3`, and the subheading *"The four things
everyone asks at the market stall."* is present in rendered text. Client-visible copy error,
one-word fix.

### 3.3 `.st-skip-finder` is visible at 834 — but does not overlap

At 834 its rect is `top 349.9 → 393.9`, `visibleInViewport: true`, despite carrying the correct
`translateY(-70.4px)`. At 1440 the same element sits at `top:-346`, off-screen.

So: **visible at tablet when it should be hidden — real, minor.** The audit's "every
breakpoint" and cross-page #43's "overlaps the hero paragraph" are both **not reproduced** —
measured, the skip button ends at x=202 and the paragraph starts at x=210. Adjacent, not
overlapping.

### 3.4 Image weights — real, because file sizes are file sizes

homepage ~21.7MB across three lifestyle photos · carob-story `carob_pods_macro.jpg` 9.8MB,
referenced twice · shop 4.07MB of PNG thumbnails. Unaffected by any rendering question.

---

## 4. What this means for the send

**Codex's `HOLD` verdict rests substantially on capture artifacts.** Its one proven visual
defect and all four imagery findings are disproved live. The package is in **far better shape**
than three consecutive reports claimed.

Genuinely outstanding, in order of what a reviewer would notice:

1. `#carob` 28px grid miss at desktop — **Nate's pin, packet already with Codex**
2. carob-story "four things" over three items — one word
3. ~36MB of oversized imagery across the package — slow load, not visibly broken
4. `.st-skip-finder` visible at tablet — minor

**Not blockers, and not to be "fixed":** the `noindex` tag is correct for a private review
package; OG/canonical belong to CR-3; the code-health items change nothing a reviewer sees.

**Still genuinely unverified** — these need interaction, not inspection, and no pass has yet
done it: shop's cart at 390, faq's reported 260px focus shift, the skip links under real
keyboard activation, and the contrast measurements.

## 5. For Codex — flagged, not touched

`_wip/reviews/maplemoon-six-page-qa-20260803/visual/findings.json` and the review board built
over these captures contain the artifacts above. That is Codex's lane and I have not edited it.
**The captures should be retaken with a scroll-and-settle pass** — per
`CODEX-BRIEF-FULLPAGE-RENDERS-20260803.md` §3b, which specified exactly this and was not
followed — before the board is used to drive any fix batch.

## 6. My own record

Four findings withdrawn this session, all from the same error: reading source instead of
running the page. The corrections are marked in place in the superseded files rather than
deleted, so the reasoning stays auditable. **Nothing in this project should be called a defect
again until it has been reproduced in an executing browser.**

## 7. Lane compliance

Written inside `_wip/evidence/` only. Chrome ran headless in an isolated profile under the job
tmp directory and has been left running on port 9222; the 3011 server was reused, never
restarted. Nothing touched in `staging-v1/`, `docs/orchestration/`, `_wip/reviews/`, `scripts/`
or `LOCK_MANIFEST.json`. No gate recorded.
