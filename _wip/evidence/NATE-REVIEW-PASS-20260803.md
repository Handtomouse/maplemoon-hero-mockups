# Nate's review pass — recorded live, section by section
# Written: 2026-08-03 · macbook Claude Code (worker)
# STATUS: RECORDING NATE'S OBSERVATIONS. Records no gate. Nothing fixed.
#         This is NOT CR-0. CR-0..CR-4 remain Nate's alone to record.
# Method: Nate reviewing the LIVE pages on 127.0.0.1:3011 at desktop width.
#         Not the PNG captures — those carry the disproved lazy-image artifacts.

Legend — **B** bounded (rides the fix batch) · **D** deeper (own lane, moves the date) ·
**P** preference (captured, does not block the send)

---

## HOMEPAGE

### `#top` — hero

| # | observation (his words) | class |
|---|---|---|
| H1 | *"theres a semi opaque black box behind the letters that needs its edges blurred or fixing because its visible"* — the CAROB wordmark's backing plate has visible hard edges | **B** |
| H2 | *"the shop the range button should be the bottom thing and No Caffeine pill should be above it instead of below"* — **swap the vertical order**: pill above, CTA below | **B** |
| H3 | *"the text in the pill needs to be a little bit bigger but the pill shouldnt get any bigger"* — increase type size **within the existing pill footprint** | **B** |

> **H3 supersedes `ms48tuprlfwf`** (*"thicken the text here slightly"*) and audit **#18** (pill
> contrast over sun glare). One instruction, precisely stated: bigger text, same pill.
> The sun-glare contrast issue may resolve as a side effect — check, don't assume.

### `#range` — product stage and category chooser

| # | observation | class |
|---|---|---|
| R1 | *"just find better category icons online somewhere and sub them in"* | **B** |
| R2 | *"bring back the side fog we made in a previous version"* — plus added mist covering the edge bars. Reference: Adobe Stock isolated mist, `asset_id 2047296791` | **D** |
| R3 | Edge bars **blurred and partially covered by mist**; **only the centre bar unblurred**. Focus follows the carousel | **D** |
| R4 | Product images must use the **unpackaged** shots from `…/output_PNG` (see below) | **B** |
| R5 | **Except elixirs.** Elixirs — and any product without enough shots to fill a carousel — **repeat** rather than pad | **B** |
| R6 | **Add the missing other bites and eclipse bites** | **B** |

**R4 asset source — verified to exist, 79 PNGs:**

    /Users/handtomouse/UFC/spins/maplemoon_bites_moodboard_export_20260516/output_PNG

Naming pattern confirmed: `<product>-<angle>.png` — e.g. `bananas-front`, `bananas-group-01`,
`goji-coconut-bar-main-inside`, `hazelnut-eclipsed-bite-close-texture`, `moons-almond-back`.
Multiple angles per product, which is what makes R3's carousel treatment feasible.

**R2 prior art — exists:** fog/mist treatments are present in `_wip/variants/`
(`hero_A_current.html`, `hero_B_brandline.html`, `hero_C_minimal.html`,
`homepage_final_buttons.html`, `homepage_motion_demo.html`). Current homepage retains
`.wf-mist{position:absolute;inset:0;z-index:-1;…}`. **Identify which variant he means before
building** — do not guess between five.

> **Tension to flag once, then follow his call.** R1 (source icons online) conflicts with
> `ICON-CREATION-BRIEF-20260803.md`, which specifies commissioning marks to match the brand's
> 250×250 cream set. Sourced icons will sit in the generic line-icon system, not the brand one.
> **Read as pragmatic sequencing, not a reversal:** source better icons now to unblock the
> review; commission the brand set afterwards. Recorded as his direction.

### `#carob` — "What is Carob, actually?"

Selected **both** available answers:

| # | observation | class |
|---|---|---|
| C1 | **Alignment only** — confirms `NATE-HOME-001` / `ms49rup1d3dn`, nothing else structural. Measured live: `textLeft 130` vs page median `158`, `.inner` `paddingLeft: 0px` | **B** |
| C2 | *"The callout pods bother me"* — the two grey translucent label boxes over the photograph read as unfinished | **B** |

> C2 was independently observed in the render inspection and is now confirmed by Nate.
> Note `ms48ubrlulgr` (carob learn-more CTA strategy) was **not** raised — do not bundle it.

### `#ritual` — "When do you moon?"

| # | observation | class |
|---|---|---|
| **RT1** | ***"the sections have clear sharp block lines separating them in some and then some of its janky in others as it goes from hero to carousel to this section and then the next, it must all be smooth and seamless — do whatever is needed to fix that. its the biggest visual throw off of the whole site and needs to be fixed"*** | **D** |
| RT2 | *"make the image cards more on brand so slightly curved and softer integration"* | **B** |

> **RT1 IS THE HEADLINE FINDING OF THE ENTIRE REVIEW.** It is **not** a `#ritual` issue — it is
> a **whole-page section-transition problem**, and he rates it the single biggest visual
> problem on the site. Nothing in the QA audit zip, Codex's visual pass, or my own analysis
> identified it. It is the clearest evidence that the machine passes were auditing the wrong
> layer entirely.
>
> Scope: the seams between `#top` → `#range` → `#carob` → `#ritual` → onward. Hard block edges
> where the treatment should be a continuous gradient/dissolve. **Own lane, own packet.**

### `#story` — "Born from Nighttime Cravings & Kind Intentions"

| # | observation | class |
|---|---|---|
| S1 | *"Our story isnt visible"* — the section eyebrow does not read. **Needs measuring** — likely a contrast failure, matching our-story audit #15 (`.os-kick` at 2.41:1) | **B** |
| S2 | *"the bottom part of the section needs to be faded in like the top"* — the fade treatment is asymmetric, top only | **B** |
| S3 | *"the cta needs to be more engaging"* — "Read The Full Story" is flat | **P→B** |
| S4 | *"add somewhere on there about the australian grown carob from south australian farm"* | **B, gated** |

> **⚠️ S4 — factual conflict to resolve before writing a word of it.**
> The package contains **zero** mentions of South Australia. It currently states:
> - our-story: *"From Brunswick Heads, **far north coast NSW**"*
> - homepage: *"Australian-grown carob pods"* directly adjacent to *"The far north coast"*
> - carob-story: *"Maple Moon uses Australian-grown carob."*
>
> Recorded on the reading that **Brunswick Heads is the brand's home and South Australia is
> where the carob is grown** — which is coherent. **If the existing copy instead implies the
> carob itself comes from the far north coast, S4 contradicts it** and both cannot ship.
>
> This is a **regulated origin claim** and lands squarely on open register items **CV-046**
> (supplier/geography/process claims require authority) and **CV-063**. Per
> `CLOSURE-DECISION-20260802.md` these claims are *retained pending certification*, explicitly
> **not verified**. Adding a more specific farm location raises the exposure, not lowers it.
> **Confirm with Carli before it is written.**

### `#stockists` — "Find Maple Moon near you"

**Looks right.** No change.

### `#sampler` — "Try every flavour."

| # | observation | class |
|---|---|---|
| SA1 | *"have all the bars in a line"* — single row, not the current 2×3 grid | **B** |
| SA2 | *"keep these photos"* — sampler imagery stays as-is | — |

### `#trust` and footer

**Looks right.** No change.

---

## ⚠️ AMENDMENT — supersedes R4 / R5 above

Nate, at `#sampler`: *"pls change the range carousel feedback to not change the bar photos or
elixir photos, just the bananas, the bites and slices etc, moons"*

**Revised instruction for the range carousel:**

| product | treatment |
|---|---|
| **Bars** | **KEEP existing photos** — do not swap |
| **Elixirs** | **KEEP existing photos** — do not swap |
| **Bananas** | swap to unpackaged `output_PNG` shots |
| **Bites / Eclipse bites** | swap to unpackaged `output_PNG` shots, **and add the missing ones** (R6 stands) |
| **Slices** | swap to unpackaged `output_PNG` shots |
| **Moons** | swap to unpackaged `output_PNG` shots |

R5 (repeat shots where a product cannot fill a carousel) still applies to the swapped products
only. **R4 as originally written is withdrawn — do not swap bars or elixirs.**

---

## SHOP

### Carried over from homepage — not re-asked

`RT1` seams (whole site) · `RT2` softer cards (applies to shop's product cards) · `R1` category
icons (**shop has the chooser too — 7 `data-cat=` instances**) · `R4/R5/R6` product photos
(**most of this lands on shop**, since every product appears here).

### New to shop

| # | observation | class |
|---|---|---|
| SH1 | **Starter box is built twice** — homepage `q-sampler` (no price) and shop `sp-sampler` ($77.70 struck to $73.82), different copy, zero shared classes. **Nate ruled: intentional, leave it.** Homepage teases, shop sells | **no change** |
| SH2 | Pricing and buying model — **"Small fix", specifics not yet given** | **B, unspecified** |
| SH3 | *"just make the filters a less intensive"* — reduce the prominence/weight of the catalogue controls (quick-nav pills, flavour chips, Featured sort) | **B** |

> **SH2 needs specifying before it can be built.** The pricing area holds three distinct
> issues: bulk tiers on Moons (1/5/10/20), a `$5.99–$59.99` range on Eclipse Bites with **no
> size selector**, and `Enquire For Retail` vs `Add To Cart` split across categories with no
> explanation. "Small fix" could mean any of them. **Ask before building.**

> **SH1 is a useful ruling to record.** It confirms the duplicated-per-page architecture is
> *intentional* here, not drift. Do not let a future consistency sweep "fix" it.

### SH2 specified — and it is NOT a small fix

Nate selected **all four**:

| # | change | nature |
|---|---|---|
| SH2a | **Add a size selector** to Eclipse Bites — `$5.99–$59.99` currently has no way to pick a size | **functional** |
| SH2b | **Explain Enquire vs Add To Cart** — nothing tells a visitor why some categories are buyable and others are not | copy + logic |
| SH2c | **Simplify the bulk tiers** on Moons (1 / 5 / 10 / 20 on the card) | presentational |
| SH2d | **Show a cart subtotal** — the cart shows item counts but never a total before checkout | **functional** |

> **Reclassified `B` → `D`.** Three of these four change commerce behaviour, not styling.
> `SH2a` and `SH2d` are new UI and new state. This is a **commerce-presentation packet in its
> own right**, not something to bundle into a styling batch. It also overlaps shop audit #4,
> #5, #6 and #26, which remain **unverified** — reproduce them before building.

---

## OUR-STORY

| # | observation | class |
|---|---|---|
| OS1 | *"Portrait treatment is off"* — the founder imagery: crop, tone or scale | **B, already in flight** |
| OS2 | **ORIGIN RESOLVED:** *"Brunswick Heads is home, SA grows the carob."* Both true, no conflict | **unblocks S4** |
| OS3 | *"the whole page needs a codex chat to run over it and bring it up to the brand style of the homepage with section and large image fades into the sections and then its passable"* | **D** |

> **OS1 is already being worked.** Codex committed founder-portrait work today:
> `62ddcd6` (Carli v02 crop verified at 1440/390), `567d106` (pair portrait in-page),
> `d84450b` (**Dylan v01 head clipped at desktop**), `d5fecd3` (Dylan v02 with headroom),
> `0758ed5` (bio slot is 4:5, aspect-ratio not height clamp), `a01665f` (guard extended).
> **Do not open a second lane on this.** Point Nate's note at the existing work and confirm
> whether the current state resolves it.

> **OS2 closes the `S4` conflict.** The two locations are complementary, not contradictory:
> **Brunswick Heads NSW = the brand's home; South Australia = where the carob is farmed.**
> The copy can carry both. **It is still `CV-046` / `CV-063` gated** — coherent is not the same
> as substantiated, and origin claims are regulated. Confirm with Carli before it ships, but
> the copy no longer contradicts itself.

> **OS3 is the same problem as `RT1`.** Section seams and large image fades are one design
> language, not two. **Homepage `RT1` and our-story `OS3` should be a single coordinated
> packet**, or the two pages will drift apart again. Homepage is the reference standard —
> his words: bring our-story *up to* it.

---

## CAROB-STORY

| # | observation | class |
|---|---|---|
| CS1 | Same treatment as our-story — brand-style pass with section and large image fades, to reach homepage standard | **D** (join `RT1`/`OS3`) |
| CS2 | *"the imagery needs fixing and updating"* | **B** |
| CS3 | **"The four things everyone asks at the market stall"** over **3** items → **change the wording to three.** Decided | **B, decided** |

`CS2` note: `carob_pods_macro.jpg` is **9.8MB and referenced twice on this page**. Whatever
replaces it, the weight problem is separate and confirmed.

## STOCKISTS

| # | observation | class |
|---|---|---|
| ST1 | Same treatment as our-story — brand-style pass with fades | **D** (join `RT1`/`OS3`) |

## FAQ

| # | observation | class |
|---|---|---|
| FQ1 | *"the bottom section is off centre and needs attention"* | **B, MEASURED AND CONFIRMED** |

**Measured live at 1440, gap left vs gap right per block:**

| block | gap L | gap R | skew |
|---|---|---|---|
| `.wrap.bar` | 120 | 120 | 0 |
| `.wrap.faq-hero` | 120 | 120 | 0 |
| `.wrap.popular` | 120 | 120 | 0 |
| `.wrap.faq-workspace` | 120 | 120 | 0 |
| `.faq-section` ×3 (Carob/Products/Support) | 462 | 120 | 342 — **two-column answer grid, by design** |
| **`.wrap.support-panel`** ("Still have questions?") | **0** | **240** | **−240 ← DEFECT** |

> **`support-panel` is flush to the left viewport edge** while every other `.wrap` on the page
> sits at a clean 120/120. This is a real, large misalignment.
>
> **The earlier desktop sweep missed it.** `DESKTOP-SWEEP-20260802/FINDINGS.md` disproved a
> "faq `.wrap`" flag — but it examined the three `.faq-section` blocks, which genuinely are on
> their own two-column grid. It never measured `.wrap.support-panel`, a fourth block.
> **Nate's eye caught a real defect that three machine passes did not.**

---

# PASS COMPLETE — all six pages

**24 observations across 6 pages.** This closes the review pass that was the project's only
bottleneck. It is **not** CR-0 — that remains Nate's to record separately.

## The one thing that dominates

**`RT1` + `OS3` + `CS1` + `ST1` are a single problem:** section seams and large image fades.
Nate's words, on homepage: *"its the biggest visual throw off of the whole site."* On our-story:
*"bring it up to the brand style of the homepage."*

**Four pages, one design language, one packet.** Homepage is the reference standard. Split this
across four packets and the pages drift apart again.

## Bounded — buildable, rides the fix batch

`H1` wordmark plate edges · `H2` pill above CTA · `H3` larger pill text, same footprint ·
`C1` carob 158px inset · `C2` callout pods *(remove or restyle — undecided)* ·
`S1` story eyebrow contrast *(measure first)* · `S2` story bottom fade · `S3` story CTA *(copy)* ·
`SA1` sampler bars in a line · `RT2` softer ritual cards · `SH3` lighter filters ·
`CS2` carob-story imagery · `CS3` "four things" → three · `FQ1` faq `support-panel` centring ·
plus `R1` icons, `R4/R5/R6` product photos.

## Deeper — own packets

| packet | scope |
|---|---|
| **Seams and fades** | `RT1` + `OS3` + `CS1` + `ST1` — four pages, one language |
| **Commerce presentation** | `SH2a–d` — size selector, Enquire vs Add To Cart, bulk tiers, cart subtotal |
| **Range carousel** | `R2`/`R3` fog and blur — **blocked: Nate must pick which of five variants** |

## Already in flight — do not duplicate

`OS1` founder portrait — Codex, six commits today (`62ddcd6` … `a01665f`).

## Still gated

`S4` origin copy — **conflict resolved** (Brunswick Heads = home, SA = farm) but
**`CV-046`/`CV-063` unsubstantiated**. Confirm with Carli before it ships.

---

## Lane compliance

Written inside `_wip/evidence/` only. Nothing fixed, edited, built or recorded as a gate.
`NATE-HOME-001` remains `pending`. CR-0 not recorded.
