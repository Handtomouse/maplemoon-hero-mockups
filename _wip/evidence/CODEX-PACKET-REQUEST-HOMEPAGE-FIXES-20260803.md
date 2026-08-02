# Codex packet request — homepage fixes from Nate's live review
# Written: 2026-08-03 · macbook Claude Code (worker)
# STATUS: REQUEST. Nothing edited, built, rebuilt or promoted from this lane.
#         Source of truth for the instructions: NATE-REVIEW-PASS-20260803.md

**Ask:** admit a packet and build the buildable subset of Nate's homepage review **into the WIP
source only**, while the remaining five pages are still being reviewed.

## THE ONE HARD RULE

    Edit ONLY: _wip/homepage_real_1_lead_photo.WIP.html
    DO NOT rebuild staging-v1/. DO NOT run the build script. DO NOT touch clean/ or annotated/.

`clean/MANIFEST.json` must stay at `d1c66b1d5937e9956d1806dbbbff4faf4f950def046aa642ae52f809c3d52d20`
for the duration. **A rebuild now voids the freeze and kills the keyboard traversal (`9ead886`)
and 200% zoom pre-screen (`fe3c580`), which are bound to that hash.** Five more pages are still
being reviewed and will add to this batch. **One rebuild, at the end, after every page is in.**

`_wip/homepage_real_1_lead_photo.WIP.html` is in `LOCK_MANIFEST.json` (3 entries, recorded hash)
and named across 5 packets. Codex is lock custodian — admit the packet properly.

---

## BUILD NOW — unambiguous, no decision outstanding

| id | change | notes |
|---|---|---|
| **H1** | Fix the visible hard edge on the semi-opaque dark plate behind the `CAROB` wordmark — blur/feather the edges so it is not perceptible | it currently reads as a rectangle over the sky video |
| **H2** | **Swap vertical order** in the hero: the credential pill (`NO CAFFEINE · ORGANIC INGREDIENTS · VEGAN FRIENDLY`) moves **above** the `Shop the Range` button. CTA becomes the last element | |
| **H3** | Increase the pill's **text size** slightly. **The pill's own dimensions must not grow.** | Supersedes `ms48tuprlfwf`. May also resolve audit #18 (contrast over sun glare) — verify, don't assume |
| **C1** | Restore the desktop horizontal inset on `.wf-what1 .inner` so `#carob` sits on the shared **158px** grid | The operative rule is the **top-level** `.wf-what1 .inner{…padding:0…}` at WIP line 1889 / generated line 1778. Measured live: `textLeft 130` vs median `158`, `.inner paddingLeft: 0px`. **≤900px and ≤600px must render byte-identical** — those widths are correct today and covered by existing evidence |
| **S2** | `#story`: apply the same fade treatment to the **bottom** of the section as the top. Currently asymmetric | |
| **SA1** | `#sampler`: lay the six bars out in a **single line** rather than the current 2×3 grid. **Keep the existing photos** | |
| **RT2** | Soften the ritual image cards — more curve, softer integration, more on-brand | Applies to the three `When do you moon?` cards |

**S1 — measure first, then fix.** Nate: *"Our story isnt visible."* Measure the computed
contrast of the `#story` eyebrow against its background before changing anything. If it is
below 4.5:1, raise it to pass AA. Report the before/after ratio. Do not restyle blind.

---

## DO NOT BUILD YET — blocked, and on what

| id | item | blocked on |
|---|---|---|
| **RT1** | **Section seam treatment across the whole page** — sharp block lines between `#top` → `#range` → `#carob` → `#ritual` → onward, where it should be a continuous dissolve | **Nate rates this the biggest visual problem on the site.** It is a whole-page design problem, not a bounded fix. Needs its own packet and a direction decision. **Do not attempt it inside this packet.** |
| **R2 / R3** | Restore the side fog; mist over the edge bars; centre bar unblurred, others blurred | **Which prior variant?** Five candidates carry fog/mist: `_wip/variants/hero_A_current.html`, `hero_B_brandline.html`, `hero_C_minimal.html`, `homepage_final_buttons.html`, `homepage_motion_demo.html`. Nate must identify which. Reference given: Adobe Stock isolated mist `asset_id 2047296791` |
| **R1** | Better category-chooser icons, sourced | Someone must actually source them. Not a build task until assets exist |
| **R4/R5/R6** | Swap **bananas, bites, slices, moons** to unpackaged shots from `/Users/handtomouse/UFC/spins/maplemoon_bites_moodboard_export_20260516/output_PNG` (79 files, verified); add missing bites/eclipse bites; repeat shots where a carousel cannot be filled. **Bars and elixirs keep current photos** | Buildable, but **large** — 79 candidate files and a per-product selection Nate has not made. Better as its own packet than bundled here |
| **C2** | The two grey translucent callout pods over the `#carob` photograph | *"The callout pods bother me"* is an observation, not an instruction. **Needs a decision: remove, or restyle?** Recommendation: **remove for the review** — they add little and read as unfinished furniture |
| **S3** | A more engaging `#story` CTA | New copy. Content change, needs approval |
| **S4** | Add Australian-grown carob / South Australian farm origin copy | **Blocked, and possibly contradictory.** The package has **zero** South Australia mentions and currently says *"From Brunswick Heads, far north coast NSW"*. Regulated origin claim on open items **CV-046 / CV-063**. **Must be confirmed with Carli before a word is written** |

---

## Verify

Per change, at **1440** and **390**, on the WIP source served locally — **not** on `staging-v1`:

1. `#carob` text left edge sits on the same grid as `#top` and `#ritual` (expect **158px** at 1440)
2. `#carob` at **900** and **600** is unchanged from current — regression check
3. Hero order reads: wordmark → tagline → **pill** → **CTA**
4. Pill bounding box dimensions unchanged from current; only the type is larger
5. No hard edge visible on the wordmark plate
6. `#story` eyebrow contrast ratio reported, before and after

**Assert the page actually parsed** — `document.querySelectorAll('section').length` must be
**≥8** — not merely that it navigated. A sweep in this project reported a correct URL and title
with zero sections and would have looked clean.

**Any screenshot must scroll top→bottom and wait on `document.images` before capturing.**
Skipping that is what produced the entire false `IMG-001`–`IMG-004` finding set.

## Report back

What was changed, the verify output, the `#story` contrast before/after, and confirmation that
`clean/MANIFEST.json` is still `d1c66b1d…`.

## Do not touch

`staging-v1/`, `scripts/`, `.gitignore`, `LOCK_MANIFEST.json` beyond the packet admission, and
any `*.WIP.html` other than the homepage. **Record no gate** — CR-0..CR-4 and `NATE-HOME-001`
are Nate's alone.
