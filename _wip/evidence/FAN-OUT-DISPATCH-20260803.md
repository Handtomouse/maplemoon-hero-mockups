# Fan-out dispatch — all remaining work, parallelised by file
# Written: 2026-08-03 · macbook Claude Code (worker)
# STATUS: DISPATCH. Nothing built from this lane. Claude verifies between waves.
# Sources: NATE-REVIEW-PASS-20260803.md · CODEX-PACKET-REQUEST-HOMEPAGE-FIXES-20260803.md
#          CODEX-PACKET-REQUEST-SEAMS-AND-FADES-20260803.md

## WHY THIS SHAPE

Parallelism here is capped by **one writer per file**, not by Codex's context. Six WIP sources,
one per page. Two instances on one file corrupt each other, on a shared tree with no isolation —
the setup that already cost this project a 41-hour silent commit outage.

So the work is cut **by file**, not by theme. Eight packets, three waves.

**Wave 1 runs 5 in parallel. Wave 2 runs 3, and must wait** — homepage establishes the fade
pattern the other three copy, or four instances invent four different dissolves.

---

## STANDING CONSTRAINTS — every packet, no exceptions

    DO NOT rebuild staging-v1/. DO NOT run the build script. Wave 3 owns the single rebuild.
    clean/MANIFEST.json must stay d1c66b1d5937e9956d1806dbbbff4faf4f950def046aa642ae52f809c3d52d20

A rebuild before Wave 3 voids the freeze and kills the keyboard traversal (`9ead886`) and 200%
zoom pre-screen (`fe3c580`), both hash-bound.

- **Edit only your own packet's file.** All WIP sources are under `LOCK_MANIFEST.json`.
- **Record no gate.** CR-0..CR-4 and `NATE-HOME-001` are Nate's alone.
- **Assert pages parsed** — `document.querySelectorAll('section').length` ≥ expected, never
  merely that navigation succeeded. A prior sweep reported a correct URL and title with zero
  sections and would have read as clean.
- **Any capture scrolls top→bottom and waits on `document.images` first.** Skipping this
  produced an entire false finding set (`IMG-001`–`IMG-004`) earlier today.
- **Do not act on `_wip/reviews/maplemoon-six-page-qa-20260803/visual/findings.json`.** Its
  `VIS-001` and `IMG-001`–`IMG-004` are disproved capture artifacts. See
  `LIVE-BROWSER-TRUTH-20260803.md`.

---

# WAVE 1 — five in parallel, start now

## W1-A · homepage · CRITICAL PATH
**File:** `_wip/homepage_real_1_lead_photo.WIP.html`
**Brief:** `CODEX-PACKET-REQUEST-HOMEPAGE-FIXES-20260803.md` **and**
`CODEX-PACKET-REQUEST-SEAMS-AND-FADES-20260803.md` (homepage portion only)

Bounded: `H1` blur the visible hard edge on the wordmark backing plate · `H2` move the
credential pill **above** the Shop the Range CTA · `H3` larger pill text, **pill dimensions
unchanged** · `C1` restore the desktop inset so `#carob` sits on the 158px grid (top-level
`.wf-what1 .inner{padding:0}`, WIP line 1889; ≤900px must render byte-identical) · `S1`
**measure** the `#story` eyebrow contrast, then fix if below 4.5:1, report before/after ·
`S2` make the `#story` fade symmetrical, bottom as well as top · `SA1` sampler bars in a single
line, keep existing photos · `RT2` soften the ritual cards, more curve.

**`C2` — DECIDED:** *keep* the two carob callout pods, and **reposition them to map onto the
actual carob pods visible in `carob_branch_dusk.jpg`.** They currently sit at arbitrary
coordinates (`right:520px;top:22%` and `right:150px;top:34%`). They must point at real pods.

**Seams — this packet defines the pattern for the whole site.** Diagnosis is measured and in
the brief: sections are all `rgba(0,0,0,0)`, the seams are **not** borders, and `.fog` already
works. The cause is full-bleed section imagery terminating hard against the page gradient.
**Step 1 is to report how `.fog` achieves the hero dissolve before writing any CSS.**
**Publish the resulting pattern — Wave 2 copies it.**

## W1-B · shop
**File:** the shop WIP source

- `SH3` — *"make the filters a less intensive"*: reduce the visual weight of the quick-nav
  pills, flavour chips and Featured sort.
- `SH2a` add a **size selector** to Eclipse Bites (currently `$5.99–$59.99` with no way to pick)
- `SH2b` explain **Enquire vs Add To Cart** — nothing tells a visitor why some are buyable
- `SH2c` simplify the **bulk tiers** on Moons (1 / 5 / 10 / 20 on the card)
- `SH2d` show a **cart subtotal** — the cart shows counts but never a total

**`SH2a` and `SH2d` are new UI and new state, not styling.** If they overrun, ship `SH2b`/`SH2c`
and defer them; say so rather than half-building.

**Do NOT "fix" the starter box duplication.** Nate ruled it intentional: homepage teases without
price, shop sells at `$77.70`→`$73.82`.

## W1-C · faq
**File:** the faq WIP source

`FQ1` — `.wrap.support-panel` ("Still have questions?") renders at **gap left 0, gap right 240**
at 1440, while every other `.wrap` on the page is a clean **120/120**. Centre it.

**Do not touch the three `.faq-section` blocks** (462/120) — that is the two-column answer grid,
correct by design.

## W1-D · the checker
**File:** `scripts/check-maplemoon-review.py` — a different path, so free parallelism

It is pinned to `SATURDAY_PACKET_ID = "SAT-HOME-CLEAN-CLOSURE-01"`, **the closure packet Nate
cancelled** when he ruled retain-everything. It therefore asserts a homepage that was never
built — expecting `Six-bar sampler` and `Explore six bar flavours`, rejecting the word `gift`.
**26 failures. Not broken code, the wrong contract.**

Repin it to the shipping package and make `npm run review:saturday:check` pass against the
current artifact. **This blocks Wave 3.**

## W1-E · asset prep · no WIP writes
**Writes only to a new `_wip/` asset-prep directory.**

**Product photos.** Source: `/Users/handtomouse/UFC/spins/maplemoon_bites_moodboard_export_20260516/output_PNG`
(79 files, verified). Rule: use `<product>-main*.png`; where a product has a single shot, use it.

| product | file |
|---|---|
| bananas | `bananas-main.png` |
| moons pure / almond / hazelnut | `moons-<flavour>-main.png` |
| moons chilli / goji-coconut / peppermint-buckwheat | single file each |
| **eclipse bites ×4** | **`-front.png` — Nate chose whole, front on, not cut-open** |

**Bars and elixirs keep their current photos — do not swap them.** `R6`: add the missing bites
and eclipse bites. `R5`: repeat shots where a carousel cannot be filled.

**"Slices" does not exist in that export.** Report it; do not substitute something else.

Prepare web-ready exports (correct dimensions, compressed) — **do not wire them into any page.**

**Icons.** Source **three candidate sets** for the five category marks (`bars`, `bananas`,
`crescents`→**moons**, `eclipseBites`, `elixirs`) and present them for Nate to choose. Context in
`ICON-CREATION-BRIEF-20260803.md`: the brand's own set is 250×250 solid `--mm-cream` `#e7e4ca`,
illustrative; the site currently uses generic 24×24 stroke icons. **Do not wire any in.**

---

# WAVE 2 — three in parallel, ONLY after W1-A publishes the fade pattern

Each applies **the pattern W1-A established** — do not invent a second treatment.

## W2-F · our-story
`OS3` bring up to homepage brand style, section and large image fades ·
`OS1` founder portrait treatment. **Codex already has six commits on this today**
(`62ddcd6`…`a01665f`, incl. Dylan v01 head clipped, bio slot 4:5). **Continue that work, do not
restart it.** Confirm whether the current state already resolves Nate's note.

## W2-G · carob-story
`CS1` fades to homepage standard · `CS2` fix and update imagery — note
`carob_pods_macro.jpg` is **9.8MB and referenced twice** · `CS3` **decided**: the subheading
reads *"The four things everyone asks at the market stall"* over **3** items — **change the
wording to three.**

## W2-H · stockists
`ST1` fades to homepage standard.

Also: `.st-skip-finder` is **visible at 834** (measured `top 349.9→393.9`, `visibleInViewport
true`) though correctly hidden at 1440. It does **not** overlap the hero paragraph — that claim
was not reproduced. Hide it at tablet.

---

# WAVE 3 — serial, one instance, after everything above

1. **Checkpoint first.** `staging-v1` markup is now committed (`243c577`, 28 files) but assets
   are not. Confirm a restore path before mutating anything.
2. Rebuild. New `clean/MANIFEST.json` hash.
3. **Re-run the hash-bound evidence** — keyboard traversal at literal 390 across six pages, and
   the 200% zoom pre-screen. Both die with the old hash.
   **Method:** CDP `Emulation.setDeviceMetricsOverride` plus `Page.bringToFront`. **Never
   activate Chrome by app name** — two instances share a bundle id here and it silently targets
   the wrong window. That caused every earlier traversal failure.
4. `npm run review:saturday:check` must pass (W1-D).
5. Re-freeze; record the new hashes everywhere the old one is cited.

---

## STILL BLOCKED — not dispatchable

- **`S4` origin copy.** Conflict resolved (Brunswick Heads = home, South Australia = farm) but
  **`CV-046`/`CV-063` unsubstantiated.** Regulated origin claim. Needs Carli, not a builder.
- **`S3`** more engaging `#story` CTA — new copy, needs approval.
- **`R2`/`R3`** carousel edge mist with only the centre bar sharp. Genuinely new treatment,
  distinct from the section dissolve. **Its own packet, after Wave 2.**

## Lane compliance

Written inside `_wip/evidence/` only. Nothing built, rebuilt, promoted or recorded as a gate.
