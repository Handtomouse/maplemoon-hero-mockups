# Wave 0 Ratify: UI Review of Three Unapproved Additions

**Audited:** 2026-07-18
**File under audit:** `_wip/homepage_real_1_lead_photo.WIP.html` (read-only, 1048 lines)
**Rendered at:** `http://localhost:3005/_wip/homepage_real_1_lead_photo.WIP.html`
**Baseline:** Client approval 13 Jul 2026 ("It looks so good. I'm so happy with it")
**Screenshots:** captured (11 files, `_wip/checkpoints/`, mtime 18 Jul)

---

## Why this review exists

The homepage was approved by the client on 13 Jul. Three elements were then appended on
15-16 Jul as trailing `<style>` / `<script>` blocks at the very bottom of the file
(lines 998 onward), AFTER all the approved CSS. These are B-choices the brief said must be
shown as screenshot variants and never auto-applied. This review is evidence-gathering so
Nate can decide keep / revert / modify per element. No fix, no redesign.

All three additions are self-labelled with their port date in the source, confirming they
post-date approval:
- Line 999: `/* B3 scroll-reveal (toggleable), ported from motion demo 15 Jul */`
- Line 1022: `/* === NEW BUTTON SYSTEM (curved-rect 14px, moon-halo), ported 16 Jul === */`
- Line 1035: `/* seal + marquee; drop the redundant in-hero static creds (marquee replaces it) */`

**Important structural note for the executor:** the tail of the file holds one self-contained
`<style>` block for Element 1 (lines 998-1005), then a SINGLE shared `<style>` block spanning
lines 1022-1046 that contains BOTH the Element 2 (button) CSS and the Element 3 (seal/marquee)
CSS, with the only closing `</style>` at line 1046. There is no `</style>` between the button
rules and the seal rules. The revert recipes below account for this so no orphaned tag results.

---

## Element 1: B3 Motion (scroll-reveal, defaults ON)

**Where it lives:**
- CSS block: lines **998-1005** (`<style>`)
- Toggle button markup: line **1006** (`<button id="motionToggle" type="button">Motion: <b id="motionState">on</b></button>`)
- IntersectionObserver script: lines **1007-1020** (`<script>`)

**Selectors / classes involved:**
- `body.motion-on [data-reveal]`: start state `opacity:0; transform:translateY(24px)` (line 1000)
- `body.motion-on [data-reveal].is-visible`: end state `opacity:1; transform:none` (line 1001)
- `#motionToggle`: fixed pill, `right:16px; bottom:16px; z-index:9999`, background `#2c4d63` (navy), text `#f1ede3`, green accent `#8fd0a0` on the state word (lines 1003-1004)
- `prefers-reduced-motion` guard present (line 1002), respected, falls back to `reduced`

**What gets the reveal:** the observer script (line 1010) selects
`section:not(#top), footer:not(.wf-ptop)` and stamps `data-reveal` on **every** one of them.
That is every content section below the hero plus the footer. Default state is ON
(`var on = !reduce; (on?enable:disable)()`, line 1017).

**What it looks like:** on first load, every section below the hero starts invisible and
slides up 24px into place as it crosses ~12% into the viewport (0.7s ease). A fixed navy
pill labelled `MOTION: ON` (ON in green) sits permanently bottom-right on every screen.
Clicking it flips all sections to always-visible and the label to `off`.

**Honest assessment:** The reveal animation itself is tasteful and on-brand, but the
always-on `MOTION: ON` toggle pill reads as a developer control left in the shipped view
rather than an intentional site feature, so it looks work-in-progress.

**Screenshots:**
- `_wip/checkpoints/wave0_motion_toggle_390.png` / `_1440.png`: tight crop of the navy pill
- `_wip/checkpoints/wave0_motion_reveal_transition_1440.png`: a section caught mid-reveal, where the entire PDP / coverflow area below the tabs is blank because those sections are still `opacity:0`, which is exactly the first-scroll behaviour

---

## Element 2: Button system (16 Jul)

**Where it lives:** lines **1022-1034** (the button portion of the shared style block; `--rr:14px` curved-rect radius, moon-halo hover)

**Selectors / classes involved:**
- `:root{--rr:14px}` (line 1023): the shared curved-rect radius token
- `.wf a.wf-ppill` (lines 1024-1027): the hero "Shop the Range" button. Restyled to a glassy translucent rect (`background:rgba(18,22,32,.30)`, `backdrop-filter:blur(3px)`, gold `#b3a380` border, `border-radius:var(--rr)`). The `::before` is the "moon-halo", a blurred gold gradient that fades in on hover (`opacity 0 to .62`).
- `.wf-pdp .wf-pill` (lines 1028-1032): the PDP "Add to Cart" (solid, `background:var(--ink)`) and "View Product" (outlined, ink slide-in `::before`), both `border-radius:var(--rr)`
- `.wf-pdp .wf-sz` (lines 1033-1034): the size selector pills also switched to the 14px radius; the active pill loses its fill and gains a gold `#b3a380` 2px bottom border

**Note:** this overrides the approved pill styling. The original approved buttons were full
`border-radius:50px` rounded pills (line 105 `.wf-ppill`, line 168 `.wf-pill`,
line 162 `.wf-sz`). This block converts those specific instances to 14px curved rectangles.
The `border-radius:50px` originals are still in the file; this later block simply wins by
cascade order.

**What it looks like:** hero CTA is a soft translucent gold-edged rectangle over the ocean
photo; on the PDP the "Add to Cart" is a solid dark near-rectangle with a "View Product"
outline beside it; size pills are matching soft rectangles with a gold underline on the
active one. Corners are gently curved, not fully rounded.

**Honest assessment:** This looks intentional and on-brand. The 14px curved-rect with gold
edge is a coherent, considered system that reads as a deliberate refinement rather than a
default, though it is a real visual departure from the fully-rounded pills the client signed
off on.

**Screenshots:**
- `_wip/checkpoints/wave0_buttons_hero_cta_390.png` / `_1440.png`: hero "Shop the Range"
- `_wip/checkpoints/wave0_buttons_pdp_390.png` / `_1440.png`: PDP "Add to Cart" + "View Product" + size pills

---

## Element 3: Seal + top marquee (hiding `.wf-pcreds`)

**Where it lives:**
- Markup, seal: line **532** (`<div class="mm-seal"><span class="mn">&#9790;</span>Maple<br>Moon</div>`), inside the hero `<section>`
- Markup, marquee: line **537** (`<div class="mm-marq"><div class="mm-tk">...Naturally sweet, No caffeine, Nothing added, Organic & vegan...</div></div>`), first element inside `<main>`, directly under the hero
- CSS, all three rules: lines **1035-1045** (the seal/marquee portion of the shared style block)

**Selectors / classes involved:**
- `.wf-pcreds{display:none}` (line 1036): hides the approved in-hero static credentials row (the "Naturally sweet, No caffeine, Nothing added, Organic & vegan" text that still lives in the markup at line 529). The comment on line 1035 states the marquee is intended to replace it.
- `.mm-seal` (lines 1038-1039): a 92x92px dark circular wax-seal badge, `position:absolute; top:96px; right:52px`, navy `#12161d` fill, gold `#b3a380` text + border, soft gold glow, rotated `-7deg`, containing a crescent-moon glyph over "Maple / Moon"
- `.mm-marq` (lines 1040-1044): a full-width dark strip (`background:#1a2431`) with an infinite horizontal scroll (`@keyframes mmsc`, 24s linear) of the same four credentials in gold-dotted caps
- `prefers-reduced-motion` guard present (line 1045), marquee animation stops, respected

**What it looks like:** top-right of the hero carries a small dark circular "Maple Moon"
moon-seal badge. The four product credentials that used to sit as static text under the
tagline are gone from the hero, and instead scroll continuously across a dark band
immediately below the hero.

**Honest assessment (desktop):** on desktop the seal and marquee read as intentional and
on-brand. The seal is a nice editorial touch and the dark scrolling credential band is a
clean, deliberate device.

**Honest assessment (mobile, real issue):** at 390px the `right:52px` seal collides with and
sits directly on top of the CAROB wordmark (lands over the "B"), which looks like a
work-in-progress placement bug rather than a finished layout. See `wave0_seal_marquee_390.png`.

**Screenshots:**
- `_wip/checkpoints/wave0_seal_marquee_1440.png`: desktop, showing nav + seal (top-right) + hidden creds + marquee band at the base
- `_wip/checkpoints/wave0_seal_marquee_390.png`: mobile, showing the seal overlapping the CAROB wordmark

---

## Screenshot manifest

| Filename (`_wip/checkpoints/`) | Dimensions captured | Shows |
|---|---|---|
| `2026-07-14_wave0base_home_390.png` | 390 wide, full page | Full mobile homepage reference (shot.js harness) |
| `2026-07-14_wave0base_home_1440.png` | 1440 wide, full page | Full desktop homepage reference (shot.js harness) |
| `wave0_motion_toggle_390.png` | tight crop of `#motionToggle` @390 | The `MOTION: ON` navy pill (Element 1) |
| `wave0_motion_toggle_1440.png` | tight crop of `#motionToggle` @1440 | The `MOTION: ON` navy pill (Element 1) |
| `wave0_motion_reveal_transition_1440.png` | 1440 viewport | Section mid-reveal: PDP area blank while `opacity:0`; toggle pill bottom-right (Element 1) |
| `wave0_buttons_hero_cta_390.png` | 390 wide, hero band | Hero "Shop the Range" curved-rect CTA (Element 2) |
| `wave0_buttons_hero_cta_1440.png` | 1440 wide, hero band | Hero "Shop the Range" curved-rect CTA (Element 2) |
| `wave0_buttons_pdp_390.png` | 390 viewport, PDP centred | "Add to Cart" + "View Product" + size pills (Element 2) |
| `wave0_buttons_pdp_1440.png` | 1440 viewport, PDP centred | "Add to Cart" + "View Product" + size pills (Element 2) |
| `wave0_seal_marquee_390.png` | 390 wide, top slice | Seal overlapping CAROB wordmark + marquee (Element 3) |
| `wave0_seal_marquee_1440.png` | 1440 wide, top slice | Seal top-right + hidden creds + marquee band (Element 3) |

All shots this session carry an 18 Jul 2026 mtime. The `2026-07-14_` prefix on the two base
files is the shot.js harness hardcoded date, not the capture date.

---

## Revert recipes (the "before" state, per element)

Reverting any one addition does not touch the approved 13 Jul design, because the original
approved rules are still present higher in the file and simply lose the cascade to these
later blocks.

Reminder on structure: lines **998-1005** are Element 1's own `<style>` block. Lines
**1022-1046** are a SINGLE shared `<style>` block holding Element 2 (button CSS, 1023-1034)
then Element 3 (seal/marquee CSS, 1035-1045), with the only `</style>` at line 1046. Recipes
below preserve that tag pairing.

### Revert Element 1 (Motion)
1. Delete the `<style>` block at lines **998-1005** (opener and closer both inside this range).
2. Delete the toggle button markup at line **1006**.
3. Delete the `<script>` block at lines **1007-1020**.
No `data-reveal` / `is-visible` / `motion-on` references exist anywhere else, so removal is
clean. The base-page `prefers-reduced-motion` guard (line 438) is separate and stays.

### Revert Element 2 (Button system) only
Do NOT delete the whole 1022-1046 block: line 1022 carries the `<style>` opener that Element
3's rules still need.
1. Strip the comment off line **1022** so it becomes just `<style>` (keep the opening tag).
2. Delete the button CSS at lines **1023-1034** (the `:root{--rr}` token through the `.wf-sz` rules).
The approved fully-rounded pills return automatically: `.wf-ppill` `border-radius:50px`
(line 105), `.wf-pill` `border-radius:calc(50px * var(--radius))` (line 168), `.wf-sz`
`border-radius:50px` (line 162) are all still in the file and take over once the override is
gone. Note: `--rr` is used by Element 3's `.mm-seal`? No, it is not; the seal/marquee rules
do not reference `--rr`, so removing the token with the button rules leaves no orphan.

### Revert Element 3 (Seal + marquee) only
1. Delete the seal/marquee CSS at lines **1035-1045**. The block's opening `<style>` (line 1022)
   and closing `</style>` (line 1046) still pair around the remaining button rules, so no
   orphaned tag. Removing line 1036 (`.wf-pcreds{display:none}`) in this range restores the
   approved in-hero credentials row at line 529.
2. Delete the seal markup at line **532**.
3. Delete the marquee markup at line **537**.
To keep the seal/marquee but restore ONLY the creds row, delete just line **1036**
(`.wf-pcreds{display:none}`).
To fix (not revert) the mobile collision, the change is a mobile override on `.mm-seal`
(smaller size / repositioned / hidden under `@media (max-width:900px)`), flagged for the
keep-with-modify path.

### Revert both Element 2 AND Element 3 (full undo of the 16 Jul additions)
1. Delete the entire shared `<style>` block at lines **1022-1046** (opener through closer).
2. Delete the seal markup at line **532** and the marquee markup at line **537**.
This is the only case where deleting the whole 1022-1046 range is correct, because both the
opener and closer leave together.

---

## One incidental finding (not one of the three audited elements)

The `wave0_motion_reveal_transition_1440.png` and both PDP shots also caught a **`Tag feedback`
/ `Tags 0` overlay bottom-left**. That is the dev annotation tool from
`_wip/_feedback/feedback.js` (dir mtime 16 Jul) leaking into the live WIP render. It is a
developer overlay, not part of the three additions, and should not reach any client-facing
build. Logged here so it is not mistaken for an intended UI element.

---

## Files audited
- `_wip/homepage_real_1_lead_photo.WIP.html` (read-only)
- `_wip/_CHECKPOINT_20260718.md` (context: 18 Jul session scope)
- `_wip/variants/` and `_wip/_feedback/` (context: 16 Jul addition provenance)
