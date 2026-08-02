# MapleMoon — icon creation brief
# Written: 2026-08-03 · macbook Claude Code (worker)
# STATUS: BRIEF AND REFERENCE. Nothing designed, edited, generated or commissioned.
#         Records no verdict, passes no gate. CR-0..CR-4 remain Nate's alone.

**Scope requested:** icons and supporting pieces for the **carob-story page** and the
**homepage category chooser**, drawn to MapleMoon's existing icon language.

---

## 1. THE HEADLINE — the brand already has an icon language, and the site does not use it

MapleMoon owns a properly drawn certification icon set. **It appears on none of the six review
pages, and is not even copied into the shipped package** (`staging-v1/clean/assets/` contains
only `mm_logo_icon_blk.svg`).

Meanwhile the pages draw the *same concepts* with generic inline line icons. `Caffeine free`
exists twice over: once as a crude 24×24 stroke path in the homepage carob facts row, and once
as a finished brand asset, `icon_caffeine_free.svg`, unused.

> **This is not primarily a "draw more icons" job. It is a job of extending one system and
> retiring the other.** Commissioning new work without settling that would produce a third
> style.

---

## 2. REFERENCE — the existing brand icon set (System A)

`assets/` and `assets/brand/` — 14 files, the authoritative reference:

| concept | plain | `_full` |
|---|---|---|
| Organic | `icon_organic.svg` | `icon_organic_full.svg` |
| Vegan | `icon_vegan.svg` | `icon_vegan_full.svg` |
| Gluten free | `icon_gluten_free.svg` | `icon_gluten_free_full.svg` |
| Caffeine free | `icon_caffeine_free.svg` | `icon_caffeine_free_full.svg` |
| Made in Australia | `icon_made_in_aus.svg` | `icon_made_in_aus_full.svg` |
| Additive free | `icon_additive_free.svg` | — |
| No artificial | `icon_no_artificial.svg` | — |

Plus `maplemoon_logo.svg`, `mm_logo_icon_blk.svg`, `mm_wordmark_blk.svg`, `carob_wordmark.svg`.

**Measured style specification — match this exactly:**

- **Canvas:** `viewBox="0 0 250 250"`
- **Colour:** single flat fill `#e7e4ca`, declared as a `<style>` class. **This is
  `--mm-cream`** in `brand_kit.css:14` — the brand's core cream, not an arbitrary value.
- **Technique:** **solid filled paths, no strokes.** Letterforms and rules are drawn as filled
  shapes, not stroked lines.
- **Composition:** a central pictogram enclosed by an **arc/ring device**, with the label set as
  outlined type curved along the ring. The `_full` variants carry the complete encircling
  wordmark; the plain variants carry the mark with a partial arc.
- **Weight:** illustrative and hand-drawn in feel — organic, slightly irregular curves. Not
  geometric, not grid-snapped, not a generic UI icon set.
- **Density:** rich. `icon_no_artificial.svg` is 17KB of path data. These are illustrations.

## 3. The system that must NOT be extended (System B)

Inline in the HTML: **43 SVGs, 100% `viewBox="0 0 24 24"`**, stroke-based, `fill:none`, with
stroke-width drifting across **1.2 / 1.3 / 1.4 / 1.5 / 1.6 / 1.9**.

These are generic line icons — cart, arrows, pin, lock, plus. Serviceable as pure UI furniture,
wrong as brand iconography. **New work must not be drawn in this style.**

---

## 4. WHAT TO CREATE

### 4.1 Homepage category chooser — 5 marks

Live selectors: `data-cat="bars" · "crescents" · "bananas" · "eclipseBites" · "elixirs"`.

Current state — all crude, all System B:

| category | what exists now |
|---|---|
| Bars | a bare `<rect>` |
| Crescents | `M17 3a9 9 0 1 0 4 12 7 7 0 0 1-4-12z` — a generic crescent, **reused 3× elsewhere on the page** |
| Bananas | a single simplified path |
| Elixirs | a generic bottle silhouette |
| Bites | a bare `<circle>` |

**Required:** five marks depicting the actual products — a moulded carob bar, a crescent/moon
bite, a dipped banana, an elixir bottle, an eclipse bite. Drawn in System A's language, but
simplified for small on-screen use (see §5).

> **✅ NAMING RESOLVED — 2026-08-03.** Nate, answering on Carli's behalf:
> **the category is "Moons"; they are presented by a crescent.**
>
> Provenance: recorded as **Nate's decision on Carli's behalf**, not as Carli's own ruling. It
> is a design/naming call, which is Nate's to make — it is not a CR gate. Worth confirming with
> Carli in the review send, since it renames a product line.
>
> **Consequences for the drawing:** the mark is a **crescent** — the moon form, consistent with
> the Maple Moon wordmark — and every label reads **Moons**. Not "Crescent", not "Crescents".
>
> **Naming standardisation this unblocks** (currently four names for one category):
>
> | location | now | becomes |
> |---|---|---|
> | homepage tab | `CRESCENTS` | **MOONS** |
> | homepage selector | `data-cat="crescents"` | `data-cat="moons"` *(code change — needs a packet)* |
> | homepage product copy | "Pure Carob Crescent", "A crescent-shaped carob bite…" | **Moon** |
> | shop section | `MOONS` ✓ | unchanged |
> | carob-story | `crescents` | **Moons** |
> | faq | `CAROB MOONS` | **Moons** |
>
> This closes homepage audit **#34** (tab/copy taxonomy disagreement) and the cross-page audit's
> category-naming row. **Copy changes are content edits and still need the normal approval —
> this settles *which* name, not permission to rewrite the pages.**

### 4.2 Carob-story page — currently has no iconography at all

The page carries **4 SVGs total, and three of them are the identical generic plus/cross
marker**; the fourth is the shared cart glyph. Its `credrow` credential markers are CSS shapes,
not drawn assets — which is why one of the three renders as an open ring rather than a closed
circle.

**Required:**
1. **Three credential marks for `.credrow`** — replacing the CSS circles with real assets.
2. **Section marks** for the page's own narrative beats — the comparison (carob vs cacao), the
   pod gallery, and the FAQ.
3. **A pod/ingredient mark** — carob-story is the page about the ingredient and currently has
   nothing depicting it.

### 4.3 Homepage carob facts row — 3 marks

Currently System B line icons for: **"A pod, not a bean" · "Naturally sweet" · "Caffeine free"**.

**"Caffeine free" must not be redrawn** — `icon_caffeine_free.svg` already exists and is
finished. Use it. That leaves two genuinely new marks, and it is the clearest single
demonstration of the problem in §1.

---

## 5. Style constraints for the new work

- **Draw at `0 0 250 250`**, single flat `--mm-cream` `#e7e4ca` fill, no strokes — identical to
  the existing set, so the two sit together without seams.
- **Also deliver a simplified small-size cut** of each mark. The 250×250 originals carry far
  too much path detail to read at the ~24–32px the category chooser renders at. Simplify the
  silhouette; **do not** substitute a line-icon version.
- **Supply each as its own `.svg`**, named to the established convention:
  `icon_<concept>.svg`, plus `icon_<concept>_full.svg` where a ring-and-label variant is wanted.
- **Keep the fill as a `<style>` class**, as the existing files do, so colour can be themed.
- **No new colours.** The set is monochrome cream by design; tinting is done in CSS.

## 6. Explicitly out of scope

- Do not restyle or replace the pure-UI glyphs — cart, arrows, search, pin, lock. Those are
  correct as line icons.
- Do not touch `staging-v1/`. It is a frozen, hash-verified artifact
  (`clean/MANIFEST.json` = `d1c66b1d…`) and is regenerated from WIP sources by
  `scripts/build-maplemoon-saturday-review.py`.
- Do not invent product, ingredient, origin or certification claims. **`icon_organic.svg`
  already exists but organic certification is not yet substantiated** — open register items
  CV-046 and CV-063. Drawing a mark is not the same as being entitled to display it.

## 7. Sequence

1. **Nate/Carli settle Moons vs Crescents** — blocks 4.1.
2. **Decide the retirement plan** for System B in brand contexts — otherwise new marks land
   beside the old line icons and the inconsistency gets worse, not better.
3. Commission 4.1 and 4.2 together; they share a visual problem and should be drawn as one set.
4. 4.3 last — it is two marks plus wiring up an asset that already exists.

## 8. Open question worth raising with whoever draws these

The existing set was built as **certification badges** — ring, curved label, standalone. The new
work is **navigational and editorial** — inline, small, alongside text. A faithful badge shrunk
to 24px will not read.

The honest brief is: *keep the drawing hand, drop the badge furniture.* Same organic line
quality, same cream, same fill technique — without the enclosing ring and curved type, which
exist to make a standalone certification stamp and serve no purpose inline.

## 8b. READY TO APPLY — bundle the caffeine-free icon into the carob packet

Wiring `icon_caffeine_free.svg` into the homepage carob facts row is **not a one-line change**,
and must not be attempted standalone:

| step | blocker |
|---|---|
| edit `_wip/homepage_real_1_lead_photo.WIP.html` | in `LOCK_MANIFEST.json` (3 entries, recorded hash) and named in 5 packets. **Codex is lock custodian.** |
| ship the asset | `clean/assets/` holds **2** SVGs vs **16** in source. `scripts/build-maplemoon-saturday-review.py` carries an explicit asset list and only path-rewrites the logo (lines 398–399). **Needs a script change — `scripts/` is off-limits and mid-flight.** |
| rebuild `staging-v1` | **voids the freeze.** Keyboard traversal (`9ead886`) and 200% zoom pre-screen (`fe3c580`) are bound to `clean/MANIFEST.json = d1c66b1d…`. |

**Therefore: bundle it into `SAT-HOME-CAROB-HORIZONTAL-BALANCE-01`.** That packet already edits
this exact WIP file and already forces a rebuild, so the icon rides along at zero additional
freeze cost — and it sits in the carob facts row, inside the very section that packet corrects.

Prepared change, for whoever holds the packet:

1. **WIP source** — in the `.q-facts` row, replace the inline 24×24 stroke SVG on the
   *Caffeine free* item with `<img src="assets/icon_caffeine_free.svg" alt="" width="24"
   height="24">`. Leave the other two items alone; their marks do not exist yet (§4.3).
2. **Build script** — add `assets/icon_caffeine_free.svg` to the copied-asset list so it lands
   in `clean/assets/`. **Without this the image 404s in the built package.**
3. **Verify** — `clean/assets/icon_caffeine_free.svg` returns 200, and the mark renders at
   24px. Note §5: the 250×250 original is illustration-dense and **may not read at 24px**. If it
   does not, that is evidence for the simplified small-size cut, not a reason to revert to the
   line icon.

**Do not apply any of this from an evidence lane.** It is recorded here so the packet holder
can act in one move.

## 9. Lane compliance

Written inside `_wip/evidence/` only. Read-only inspection of `assets/` and the frozen package.
Nothing generated, designed, commissioned or sent. Nothing touched in `staging-v1/`,
`docs/orchestration/`, `scripts/` or `LOCK_MANIFEST.json`. No gate recorded.
