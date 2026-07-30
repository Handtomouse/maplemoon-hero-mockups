---
phase: wave-0-ratify
plan: 00
type: execute
wave: 0
depends_on: []
files_modified: [_wip/homepage_real_1_lead_photo.WIP.html]
autonomous: false
requirements: [B1, B3, RATIFY-MOTION, RATIFY-BUTTONS, RATIFY-SEAL]
gates: [wave-3]

must_haves:
  truths:
    - "A documented decision (keep / revert / modify) exists for each of the three unratified 16 Jul elements"
    - "The WIP homepage reflects the chosen decision for each element"
    - "If any element is reverted or modified, a 390 + 1440 screenshot proves the new state"
    - "A7 two-click purchase path (coverflow to PDP to Add-to-Cart) still works after any change"
    - "The CAROB wordmark still renders in the hero after any change"
    - "The approved base file homepage_real_1_lead_photo.html is untouched"
  artifacts:
    - path: "_wip/homepage_real_1_lead_photo.WIP.html"
      provides: "Ratified (or reverted/modified) homepage per Nate's three decisions"
    - path: ".planning/phases/wave-0-ratify/DECISIONS.md"
      provides: "Logged decision + rationale for each of the three elements"
  key_links:
    - from: "Nate's decision (checkpoint)"
      to: "executor build task"
      via: "one build branch selected per element, others discarded"
---

<objective>
Wave 0 is a RATIFICATION wave. It is a decision gate, not a feature build.

Three elements shipped in the homepage WIP on 15-16 Jul that the DESIGN_BRIEF classified as
"B-choices: SCREENSHOT VARIANTS for the morning checklist, NEVER auto-pick." They are now live
and auto-applied in `_wip/homepage_real_1_lead_photo.WIP.html`, which contradicts the brief.
Future waves (especially Wave 3: popup port + B-variant screenshots) would build on top of them.

Before building further, Nate must decide for EACH element: keep as-is (ratify), revert, or modify.

The three elements:
1. B3 Motion (scroll-reveal + floating "Motion: on/off" toggle, defaults ON)
2. The 16 Jul button system (curved-rect 14px, moon-halo)
3. The seal + top marquee (which hide the in-hero static credentials `.wf-pcreds`)

Purpose: stop building on an unapproved foundation. Resolve the brief contradiction with a human.
Output: a logged decision per element (`DECISIONS.md`) and a WIP homepage that matches those
decisions, screenshot-verified at 390 + 1440 if anything changed.

This wave adds NO new features. It only keeps, removes, or adjusts what already shipped.
</objective>

<hard_constraints>
Carry these through EVERY task. They are non-negotiable.

1. NEVER edit the approved base file `homepage_real_1_lead_photo.html` (or any original). ALL edits land
   ONLY in `_wip/homepage_real_1_lead_photo.WIP.html`.
2. The bg-isolation guard BLOCKS the Edit/Write tools inside the repo. Author every change in
   `$CLAUDE_JOB_DIR` (or with a python-via-Bash script) and `cp` the result into `_wip/`. Bash file
   ops are allowed; Edit/Write on the repo file are not.
3. Keep the `_wip/` symlinks intact (`assets`, `brand_kit.css`, `shared.css/js`, `products`) or
   screenshots break.
4. NO outbound comms to MapleMoon (`info@maplemoon.com.au` or any personal address) for the entire run.
5. Verify the SHIPPED artifact via SCREENSHOT at 390 + 1440. The TypeKit `p.css` `NAME_NOT_RESOLVED`
   in headless is a sandbox artifact, NOT a real error. Do not chase it. Fonts render 200 in real Chrome.
6. No em dashes in any copy. Never the word "vibe" in any context.
7. A7 two-click purchase path (coverflow to PDP to Add-to-Cart) must survive every revert.
8. The CAROB wordmark (hero SVG, line 526: `assets/carob_wordmark.svg`) is protected in every hero variant.
9. No design drift. Do not "improve" adjacent code while reverting. Touch only the lines the chosen
   option names.
</hard_constraints>

<execution_context>
- Local dev server: `node server.js` on `:3005` (run from the repo root).
- Screenshot tooling already in repo: `_wip/shot.js`; audit tooling: `_wip/audit.js`.
- Screenshot naming: `_wip/checkpoints/YYYY-MM-DD_vN_home_<width>.png`.
</execution_context>

<context>
@_wip/RESEARCH.md
@_wip/DESIGN_BRIEF.md
@_wip/_CHECKPOINT_20260718.md
@_wip/homepage_real_1_lead_photo.WIP.html
</context>

<structural_facts>
Read before touching anything. These are VERIFIED against the current WIP file (1049 lines).

KEY INSIGHT: all three 16 Jul changes are ADDITIVE OVERRIDES layered AFTER the originals. The original
rules are all still present and intact. Reverting means DELETING the override rules; the originals then
restore themselves through the CSS cascade. No original code needs to be re-created.

Element 1 - B3 Motion (all contiguous, lines 998-1020):
- CSS `<style>` block: lines 998-1005. Selectors keyed on `body.motion-on [data-reveal]`. Includes a
  `prefers-reduced-motion` guard (line 1002) and the `#motionToggle` button style (1003-1004).
- Toggle button markup: line 1006 -> `<button id="motionToggle" type="button">Motion: <b id="motionState">on</b></button>`
- JS IIFE: lines 1007-1020. It injects the `data-reveal` attribute AT RUNTIME onto
  `section:not(#top), footer:not(.wf-ptop)` (line 1010). There is NO `.reveal` or `data-reveal` in the
  static HTML. Deleting the JS removes both the attributes and the behavior.
- Default state: line 1017 `var on=!reduce;` then `(on?enable:disable)();`. So motion defaults ON unless
  the browser reports `prefers-reduced-motion: reduce`.
- IMPORTANT: there is NO `motion-off` class anywhere in the file. `motion-on` is a matched pair with the
  CSS selector and `enable()`'s `classList.add('motion-on')`. Do not invent a `motion-off` class.

Element 2 - 16 Jul button system (inside the shared style block lines 1022-1046):
- Rules: lines 1023-1034. Introduces `--rr:14px` (line 1023, used ONLY by the button system) and
  overrides `.wf a.wf-ppill` (1024-1027), `.wf-pdp .wf-pill` (1028-1032), `.wf-pdp .wf-sz` (1033-1034).
- The ORIGINAL button styles are still intact and win only by cascade position:
    - `.wf a.wf-ppill` original: lines 105-106 (uppercase, `border-radius:50px`, cream fill).
    - `.wf-pill` original: lines 168-169 (`border-radius:calc(50px * var(--radius))`).
    - `.wf-sz` original: lines 162-163 (`border-radius:50px`).

Element 3 - Seal + top marquee (markup + CSS in two places):
- `.wf-pcreds{display:none}` at line 1036. This is ELEMENT 3's rule (it hides the in-hero creds so the
  marquee replaces them), even though it sits inside the "button system" style block. Do NOT treat it as
  a button rule. The ORIGINAL `.wf-pcreds{display:flex;...}` is at line 107 and is intact.
- Seal markup: line 532 -> `<div class="mm-seal"><span class="mn">&#9790;</span>Maple<br>Moon</div>`
  (inside `.wf-phero`, before `</section>` at 534).
- Marquee markup: line 537 -> `<div class="mm-marq">...</div>` (just inside `<main id="main-content">`).
- Seal CSS: lines 1037-1039. Marquee CSS: lines 1040-1045 (incl. `@keyframes mmsc` + reduced-motion guard).

REVERT-BY-SELECTOR RULE: lines 1022-1046 are ONE `<style>` block with Element 2 and Element 3 CSS
interleaved. NEVER revert by deleting a line range across this block. Delete the specific rules named
above by their selector. Grep to confirm exact current line numbers before any deletion, since editing
one element shifts the others' line numbers.

UNAFFECTED by all three elements (confirm they survive every option):
- A7 coverflow -> PDP -> Add-to-Cart JS: lines 754-932. Not touched by any option.
- CAROB wordmark hero SVG: line 526. Not touched by any option.
</structural_facts>

<decision_matrix>
Present this to Nate. He picks one option per element.

| Element | What shipped | Brief intent | Options | Build cost | Recommendation |
|---------|--------------|--------------|---------|-----------|----------------|
| 1. B3 Motion | `body.motion-on` scroll-reveal via IntersectionObserver on all sections/footer; floating "Motion: on/off" toggle; defaults ON. Homepage only (zero occurrences on the 5 inner pages). `prefers-reduced-motion` guard present. | B3: "restrained scroll-reveal vs static editorial - SCREENSHOT VARIANTS, never auto-pick." Motion is auto-applied, not gated behind a review screenshot. | A: Ratify motion-on as live default. B: Default motion-OFF (toggle stays for demo). C: Remove motion system entirely (static editorial). D: Extend motion to all 5 inner pages site-wide. | A: zero (log only). B: ~5 min (2 one-line edits). C: ~10 min (delete 3 contiguous chunks). D: ~30-45 min (port the block into 5 more files + re-screenshot each) - LARGER, likely its own wave. | B (default OFF, keep toggle). Honors "never auto-pick" while preserving the demo for the 20 Jul walkthrough. A is defensible only if Nate confirms the client already approved motion-on. Avoid D in Wave 0 (scope). |
| 2. Button system | Curved-rect 14px, `--rr:14px`, moon-halo hover, backdrop-blur. Overrides hero pill + PDP pill + size pills. | B-choices are screenshot variants, not auto-applied. | A: Ratify the button system. B: Revert to pre-16-Jul button styles. C: Comparison screenshot, decide later. | A: zero (log only). B: ~10 min (delete override rules 1023-1034). C: ~10 min (screenshot both states). | A or C. The new buttons match the "Editorial Night" direction well and were live in the 13 Jul approved click-through's successor. If Nate is unsure, C produces the comparison for the checklist. |
| 3. Seal + top marquee | New `.mm-seal` (top-right hero) + top scrolling `.mm-marq`. Hides in-hero static creds via `.wf-pcreds{display:none}`. | Hero brand-surfacing changes are B-choices requiring review (B1 territory). | A: Ratify seal + marquee, keep creds hidden. B: Restore creds, remove seal + marquee. C: Keep seal + marquee AND restore creds (both). | A: zero (log only). B: ~15 min (remove line 1036 + seal markup 532 + marquee markup 537 + seal/marquee CSS 1037-1045). C: ~5 min (remove only line 1036) - but risks visual redundancy (creds + marquee say the same thing). | A (ratify). The marquee cleanly replaces the static creds; showing both (C) is redundant. Revert to B only if Nate wants the original static-cred hero back for the B1 variant set. |
</decision_matrix>

<tasks>

<task type="checkpoint:decision" gate="blocking">
  <name>Task 1: Ratify or revise the three unratified 16 Jul elements (Nate decides)</name>
  <decision>For EACH of the three elements below, choose: keep as-is (ratify), revert, or modify.</decision>
  <context>
These three elements were applied to the WIP homepage on 15-16 Jul without going through the
"screenshot variant, never auto-pick" review the DESIGN_BRIEF requires for B-choices. They are now
live and future waves would build on them. Wave 0 exists to resolve this. See the decision_matrix
above for options, build cost, and recommendation per element. See the loaded screenshots (Task 0)
of the current live state.
  </context>
  <options>
    <option id="element-1-motion">
      <name>Element 1 - B3 Motion (scroll-reveal + toggle, defaults ON)</name>
      <choices>A = ratify motion-on | B = default motion-OFF (keep toggle) | C = remove entirely | D = extend to all 5 inner pages (LARGE, own wave)</choices>
      <recommendation>B (default OFF, keep toggle) unless client already approved motion-on.</recommendation>
    </option>
    <option id="element-2-buttons">
      <name>Element 2 - 16 Jul button system (curved-rect 14px, moon-halo)</name>
      <choices>A = ratify | B = revert to pre-16-Jul buttons | C = comparison screenshot, decide later</choices>
      <recommendation>A or C.</recommendation>
    </option>
    <option id="element-3-seal">
      <name>Element 3 - Seal + top marquee (hides in-hero static creds)</name>
      <choices>A = ratify (creds stay hidden) | B = restore creds, remove seal + marquee | C = keep seal + marquee AND restore creds</choices>
      <recommendation>A (ratify). Avoid C (redundant with marquee).</recommendation>
    </option>
  </options>
  <resume-signal>State one choice per element, e.g. "Element 1: B, Element 2: A, Element 3: A". The executor then runs only the matching build tasks below.</resume-signal>
</task>

<task type="auto">
  <name>Task 0: Capture the current live state (baseline screenshots + A7 check) BEFORE any decision</name>
  <files>_wip/checkpoints/2026-07-18_v1_home_390.png, _wip/checkpoints/2026-07-18_v1_home_1440.png</files>
  <action>
Run this FIRST so Nate can see the current live state while deciding (Task 1), and so there is a
before-baseline for any revert.
1. Start the dev server if not running: `node server.js` (from repo root, background).
2. Screenshot the CURRENT WIP homepage at 390 and 1440 using `_wip/shot.js`. Name them
   `_wip/checkpoints/2026-07-18_v1_home_390.png` and `_..._1440.png`.
3. For the motion element specifically: motion-on starts sections at opacity:0 until the
   IntersectionObserver fires. Scroll the page (or wait for reveals) before/while shooting so
   sections are not captured blank mid-reveal. Also confirm the floating "Motion: on" toggle is
   visible bottom-right and the seal is visible top-right (both EXPECTED, not bugs).
4. Confirm A7 baseline: load the page, click a coverflow bar, confirm the PDP updates, confirm
   "Add to Cart" is present. Note it works.
5. Open both screenshots for visual review (do not just reference paths).
  </action>
  <verify>
    <automated>test -f _wip/checkpoints/2026-07-18_v1_home_390.png && test -f _wip/checkpoints/2026-07-18_v1_home_1440.png</automated>
  </verify>
  <done>Both baseline screenshots exist and are opened for review; A7 confirmed working on the current WIP; toggle + seal confirmed visible.</done>
</task>

<!-- ============ ELEMENT 1 - MOTION: run ONLY the task matching Nate's choice ============ -->

<task type="auto">
  <name>Task 1A: Motion Option A - Ratify motion-on (log only, no code change)</name>
  <files>.planning/phases/wave-0-ratify/DECISIONS.md</files>
  <action>
Only if Nate chose Element 1 = A. No file edit to the WIP. Log the decision in DECISIONS.md:
"Element 1 (B3 Motion): RATIFIED motion-on as the live default per Nate on {date}. Rationale:
{Nate's stated reason, e.g. client approved motion-on}. Toggle + IntersectionObserver + reduced-motion
guard all kept as shipped (lines 998-1020). Homepage-only; site-wide extension (Option D) deferred."
  </action>
  <verify>
    <automated>grep -q "Element 1 (B3 Motion): RATIFIED" .planning/phases/wave-0-ratify/DECISIONS.md</automated>
  </verify>
  <done>Decision logged. No WIP change. No screenshot needed (state unchanged).</done>
</task>

<task type="auto">
  <name>Task 1B: Motion Option B - Default motion OFF, keep toggle</name>
  <files>_wip/homepage_real_1_lead_photo.WIP.html, _wip/checkpoints/2026-07-18_v2_home_390.png, _wip/checkpoints/2026-07-18_v2_home_1440.png, .planning/phases/wave-0-ratify/DECISIONS.md</files>
  <action>
Only if Nate chose Element 1 = B. Author in $CLAUDE_JOB_DIR, cp into _wip/ (Edit/Write blocked in repo).
Make exactly TWO edits. Do NOT rename any class. There is no `motion-off` class; do not create one.
  1. JS init default (currently line 1017): change `var on=!reduce;` to `var on=false;`
     This makes `disable()` run on init (sections get `.is-visible` immediately and stay visible),
     while the toggle still flips it on for a demo.
  2. Static toggle label (currently line 1006): change `<b id="motionState">on</b>` to
     `<b id="motionState">off</b>` so the button does not flash "on" before JS runs.
  Leave the CSS block (998-1005), the reduced-motion guard (1002), and the JS structure otherwise
  untouched. Grep to confirm current line numbers before editing.
  After cp: screenshot at 390 + 1440 (v2). Confirm all sections are visible on load (no blank reveals),
  the toggle reads "Motion: off", clicking it enables motion. Confirm A7 still works. Log in DECISIONS.md.
  </action>
  <verify>
    <automated>grep -q "var on=false;" _wip/homepage_real_1_lead_photo.WIP.html && grep -q 'id="motionState">off' _wip/homepage_real_1_lead_photo.WIP.html && ! grep -q "var on=!reduce;" _wip/homepage_real_1_lead_photo.WIP.html</automated>
  </verify>
  <done>Motion defaults off; toggle label reads "off"; toggle still works; all sections visible on load; v2 screenshots taken + opened; A7 confirmed; decision logged.</done>
</task>

<task type="auto">
  <name>Task 1C: Motion Option C - Remove the motion system entirely (static editorial)</name>
  <files>_wip/homepage_real_1_lead_photo.WIP.html, _wip/checkpoints/2026-07-18_v2_home_390.png, _wip/checkpoints/2026-07-18_v2_home_1440.png, .planning/phases/wave-0-ratify/DECISIONS.md</files>
  <action>
Only if Nate chose Element 1 = C. Author in $CLAUDE_JOB_DIR, cp into _wip/.
Delete THREE contiguous chunks (all part of the motion system, all adjacent). No markup surgery is
needed elsewhere: nothing in the static HTML carries `.reveal` or `data-reveal` - the JS injects
`data-reveal` at runtime, so deleting the JS removes the attributes and the behavior together.
  1. The motion `<style>` block: lines 998-1005 (from `<style>` `/* B3 scroll-reveal ...` through the
     `#motionToggle b{...}` rule and its closing `</style>`).
  2. The toggle button markup: line 1006 (`<button id="motionToggle" ...>Motion: ...</button>`).
  3. The motion JS IIFE: lines 1007-1020 (the `<script>(function(){...IntersectionObserver...})();</script>`).
  Grep to confirm exact current line numbers before deleting; delete by matching the block boundaries,
  not by hardcoded line count.
  After cp: confirm zero occurrences of `motionToggle`, `IntersectionObserver`, `data-reveal`, `motion-on`
  remain in the file. Screenshot at 390 + 1440 (v2). Confirm all content is visible (static), the floating
  toggle is gone, A7 still works. Log in DECISIONS.md.
  </action>
  <verify>
    <automated>! grep -Eq "motionToggle|IntersectionObserver|motion-on|data-reveal" _wip/homepage_real_1_lead_photo.WIP.html</automated>
  </verify>
  <done>Motion CSS + toggle + JS removed; no residual motion tokens; all content statically visible; floating toggle gone; v2 screenshots taken + opened; A7 confirmed; decision logged.</done>
</task>

<task type="checkpoint:decision" gate="blocking">
  <name>Task 1D: Motion Option D - Extend motion site-wide (SCOPE GATE)</name>
  <decision>Option D ports the motion block into all 5 inner pages. This is a ~30-45 min build with a re-screenshot of each page. It is larger than a ratification task and belongs in its own wave, not Wave 0.</decision>
  <context>Only reached if Nate chose Element 1 = D. Recommend deferring D to a dedicated follow-up wave so Wave 0 stays a decision gate. If Nate insists on D now, the executor ports lines 998-1020 into shop / our-story / carob-story / faq / stockists WIP files (adapting the `targets` selector per page), then screenshots all 5 at 390 + 1440.</context>
  <resume-signal>Confirm: "defer D to its own wave" (recommended) OR "do D now in Wave 0".</resume-signal>
</task>

<!-- ============ ELEMENT 2 - BUTTONS: run ONLY the task matching Nate's choice ============ -->

<task type="auto">
  <name>Task 2A: Buttons Option A - Ratify the 16 Jul button system (log only)</name>
  <files>.planning/phases/wave-0-ratify/DECISIONS.md</files>
  <action>
Only if Nate chose Element 2 = A. No WIP edit. Log in DECISIONS.md:
"Element 2 (button system): RATIFIED the 16 Jul curved-rect 14px moon-halo buttons per Nate on {date}.
Rationale: {Nate's reason}. Override rules kept (lines 1023-1034, `--rr:14px`)."
  </action>
  <verify>
    <automated>grep -q "Element 2 (button system): RATIFIED" .planning/phases/wave-0-ratify/DECISIONS.md</automated>
  </verify>
  <done>Decision logged. No WIP change. No screenshot needed.</done>
</task>

<task type="auto">
  <name>Task 2B: Buttons Option B - Revert to pre-16-Jul button styles</name>
  <files>_wip/homepage_real_1_lead_photo.WIP.html, _wip/checkpoints/2026-07-18_v2_home_390.png, _wip/checkpoints/2026-07-18_v2_home_1440.png, .planning/phases/wave-0-ratify/DECISIONS.md</files>
  <action>
Only if Nate chose Element 2 = B. Author in $CLAUDE_JOB_DIR, cp into _wip/.
REVERT BY SELECTOR, not by line range (this block also holds Element 3 CSS - do NOT touch seal/marquee).
The originals at lines 105-106, 162-163, 168-169 are intact and will restore themselves once the
overrides are gone. Delete ONLY these button override rules from the block at 1022-1046:
  - `:root{--rr:14px}` (currently line 1023) - used only by the button system, safe to remove.
  - `.wf a.wf-ppill{...}` override (1024)
  - `.wf a.wf-ppill::before{...}` (1025)
  - `.wf a.wf-ppill:hover{...}` (1026)
  - `.wf a.wf-ppill:hover::before{...}` (1027)
  - `.wf-pdp .wf-pill{...}` (1028)
  - `.wf-pdp .wf-pill::before{...}` (1029)
  - `.wf-pdp .wf-pill:hover{...}` (1030)
  - `.wf-pdp .wf-pill.solid{...}` (1031)
  - `.wf-pdp .wf-pill.solid::before{...}` (1032)
  - `.wf-pdp .wf-sz{...}` (1033)
  - `.wf-pdp .wf-sz.on{...}` (1034)
  KEEP the block's `<style>` open tag context and Element 3's rules (`.wf-pcreds{display:none}` at 1036,
  `.mm-seal`, `.mm-marq`, `@keyframes mmsc`) unless Element 3's own task also removes them.
  Grep to confirm current line numbers first. Confirm no `--rr` reference remains that would break
  (the seal/marquee do not use `--rr`; safe).
  After cp: screenshot at 390 + 1440 (v2). Confirm buttons render in the original pill style
  (uppercase, rounded 50px, cream hero pill). Confirm A7 Add-to-Cart button still present + clickable.
  Log in DECISIONS.md.
  </action>
  <verify>
    <automated>! grep -q "NEW BUTTON SYSTEM" _wip/homepage_real_1_lead_photo.WIP.html && ! grep -q -- "--rr:14px" _wip/homepage_real_1_lead_photo.WIP.html</automated>
  </verify>
  <done>Button override rules + `--rr` removed; original pill styling restored via cascade; seal/marquee untouched unless Element 3 also reverts; v2 screenshots taken + opened; A7 confirmed; decision logged.</done>
</task>

<task type="auto">
  <name>Task 2C: Buttons Option C - Comparison screenshot, decide later</name>
  <files>_wip/checkpoints/2026-07-18_buttons_new_1440.png, _wip/checkpoints/2026-07-18_buttons_old_1440.png, .planning/phases/wave-0-ratify/DECISIONS.md</files>
  <action>
Only if Nate chose Element 2 = C. Do NOT permanently change the WIP.
  1. Screenshot the CURRENT (new 16 Jul) buttons at 1440 -> `_wip/checkpoints/2026-07-18_buttons_new_1440.png`.
  2. Produce a temporary copy of the WIP in $CLAUDE_JOB_DIR with the Task 2B button overrides removed
     (do NOT cp this into _wip/). Serve/screenshot it at 1440 -> `_wip/checkpoints/2026-07-18_buttons_old_1440.png`.
  3. Open both side by side for Nate. Log in DECISIONS.md: "Element 2 (button system): DEFERRED. Comparison
     screenshots captured (buttons_new vs buttons_old). Awaiting Nate's pick before Wave 3."
  4. Leave the live WIP on the NEW buttons (unchanged) until Nate picks.
  </action>
  <verify>
    <automated>test -f _wip/checkpoints/2026-07-18_buttons_new_1440.png && test -f _wip/checkpoints/2026-07-18_buttons_old_1440.png && grep -q "Element 2 (button system): DEFERRED" .planning/phases/wave-0-ratify/DECISIONS.md</automated>
  </verify>
  <done>Both comparison screenshots exist + opened; WIP left on new buttons; deferral logged. NOTE: this leaves Element 2 unresolved - flag to the orchestrator that Wave 3 is partially gated until Nate picks.</done>
</task>

<!-- ============ ELEMENT 3 - SEAL + MARQUEE: run ONLY the task matching Nate's choice ============ -->

<task type="auto">
  <name>Task 3A: Seal Option A - Ratify seal + marquee, keep creds hidden (log only)</name>
  <files>.planning/phases/wave-0-ratify/DECISIONS.md</files>
  <action>
Only if Nate chose Element 3 = A. No WIP edit. Log in DECISIONS.md:
"Element 3 (seal + marquee): RATIFIED per Nate on {date}. Seal (line 532) + top marquee (line 537) kept;
in-hero static creds stay hidden (`.wf-pcreds{display:none}` line 1036). Rationale: {Nate's reason -
marquee replaces the static creds cleanly}."
  </action>
  <verify>
    <automated>grep -q "Element 3 (seal + marquee): RATIFIED" .planning/phases/wave-0-ratify/DECISIONS.md</automated>
  </verify>
  <done>Decision logged. No WIP change. No screenshot needed.</done>
</task>

<task type="auto">
  <name>Task 3B: Seal Option B - Restore creds, remove seal + marquee</name>
  <files>_wip/homepage_real_1_lead_photo.WIP.html, _wip/checkpoints/2026-07-18_v2_home_390.png, _wip/checkpoints/2026-07-18_v2_home_1440.png, .planning/phases/wave-0-ratify/DECISIONS.md</files>
  <action>
Only if Nate chose Element 3 = B. Author in $CLAUDE_JOB_DIR, cp into _wip/.
This needs BOTH CSS deletion AND markup surgery. Remove exactly these, by selector/anchor (grep to
confirm current line numbers first; do NOT touch the button-system rules in the same block):
  1. `.wf-pcreds{display:none}` (currently line 1036). Removing it restores the original
     `.wf-pcreds{display:flex;...}` at line 107, so the in-hero static creds show again.
  2. Seal markup (currently line 532): `<div class="mm-seal"><span class="mn">&#9790;</span>Maple<br>Moon</div>`
     (inside `.wf-phero`, before `</section>`).
  3. Marquee markup (currently line 537): the entire `<div class="mm-marq">...</div>` (just inside
     `<main id="main-content">`).
  4. Seal CSS: `.mm-seal{...}` and `.mm-seal .mn{...}` (currently 1037-1039).
  5. Marquee CSS: `.mm-marq{...}`, `.mm-marq .mm-tk{...}`, `.mm-marq s{...}`, `.mm-marq b{...}`,
     `@keyframes mmsc{...}`, and the marquee reduced-motion guard (currently 1040-1045).
  After cp: screenshot at 390 + 1440 (v2). Confirm the in-hero creds row ("Naturally sweet / No caffeine
  / Nothing added / Organic & vegan") is visible again, the top-right seal is gone, the top marquee is
  gone. Confirm the CAROB wordmark still renders (line 526). Confirm A7 works. Log in DECISIONS.md.
  </action>
  <verify>
    <automated>! grep -q "mm-seal" _wip/homepage_real_1_lead_photo.WIP.html && ! grep -q "mm-marq" _wip/homepage_real_1_lead_photo.WIP.html && ! grep -q "wf-pcreds{display:none}" _wip/homepage_real_1_lead_photo.WIP.html</automated>
  </verify>
  <done>Seal + marquee markup and CSS removed; `.wf-pcreds{display:none}` removed so static creds show; CAROB wordmark intact; v2 screenshots taken + opened; A7 confirmed; decision logged.</done>
</task>

<task type="auto">
  <name>Task 3C: Seal Option C - Keep seal + marquee AND restore creds (both)</name>
  <files>_wip/homepage_real_1_lead_photo.WIP.html, _wip/checkpoints/2026-07-18_v2_home_390.png, _wip/checkpoints/2026-07-18_v2_home_1440.png, .planning/phases/wave-0-ratify/DECISIONS.md</files>
  <action>
Only if Nate chose Element 3 = C. Author in $CLAUDE_JOB_DIR, cp into _wip/.
Single edit: remove ONLY `.wf-pcreds{display:none}` (currently line 1036). Keep the seal (532),
marquee (537), and all seal/marquee CSS (1037-1045). Removing line 1036 lets the original
`.wf-pcreds{display:flex}` (line 107) show the static creds again, so BOTH the creds and the marquee
render. Grep to confirm the line first.
  After cp: screenshot at 390 + 1440 (v2). Visually confirm the creds row AND the marquee AND the seal
  all show. FLAG to Nate: this is visually redundant (creds + marquee state the same claims). Log in
  DECISIONS.md with that redundancy note.
  </action>
  <verify>
    <automated>! grep -q "wf-pcreds{display:none}" _wip/homepage_real_1_lead_photo.WIP.html && grep -q "mm-seal" _wip/homepage_real_1_lead_photo.WIP.html && grep -q "mm-marq" _wip/homepage_real_1_lead_photo.WIP.html</automated>
  </verify>
  <done>Only `.wf-pcreds{display:none}` removed; creds + seal + marquee all render; redundancy flagged; v2 screenshots taken + opened; A7 confirmed; decision logged.</done>
</task>

<!-- ============ CLOSEOUT ============ -->

<task type="auto">
  <name>Task 4: Wave 0 closeout - consolidate decisions, final verify, no-drift check</name>
  <files>.planning/phases/wave-0-ratify/DECISIONS.md</files>
  <action>
After the three element decisions are actioned:
  1. Confirm DECISIONS.md has one clear entry per element (1, 2, 3) with the chosen option, date, and rationale.
  2. If ANY element was reverted/modified (options that changed the WIP), confirm a v2 screenshot pair
     (390 + 1440) exists and was opened for review. If ALL three were ratify-only (A/A/A), note that no
     screenshot was needed because the WIP is unchanged from the v1 baseline.
  3. Final no-drift check: diff the WIP against its pre-Wave-0 state (or review the git-less change set)
     and confirm ONLY the lines named by the chosen options changed. No adjacent "improvements".
  4. Confirm the approved base `homepage_real_1_lead_photo.html` is byte-for-byte untouched
     (`ls -l` / checksum against a known-good; it must NOT appear in any edit).
  5. Confirm A7 (coverflow -> PDP -> Add-to-Cart) and the CAROB wordmark survive in the final WIP.
  6. Record in DECISIONS.md which Wave 3 inputs are now settled (motion decision + button decision) and
     whether any element was DEFERRED (e.g. Buttons Option C), which leaves Wave 3 partially gated.
  </action>
  <verify>
    <automated>grep -q "Element 1" .planning/phases/wave-0-ratify/DECISIONS.md && grep -q "Element 2" .planning/phases/wave-0-ratify/DECISIONS.md && grep -q "Element 3" .planning/phases/wave-0-ratify/DECISIONS.md</automated>
  </verify>
  <done>DECISIONS.md complete (all three elements); screenshots present for any change; no drift; base file untouched; A7 + wordmark intact; Wave 3 gating status recorded.</done>
</task>

</tasks>

<verification>
Per element, after the chosen option is actioned:
- RATIFY (A options, and Element 3 A): no code change. Verify DECISIONS.md logs the decision. No screenshot.
- REVERT / MODIFY (1B, 1C, 2B, 3B, 3C): after cp into _wip/, verify via the automated grep in each task,
  THEN screenshot at 390 + 1440 and OPEN both. The screenshot proves the shipped artifact (not headless
  alone). Ignore the TypeKit `p.css NAME_NOT_RESOLVED` headless artifact.
- COMPARISON (2C): two comparison screenshots exist + opened; WIP unchanged.

Motion-specific screenshot note: with motion-on, sections start at opacity:0 until IntersectionObserver
fires. When shooting a motion-on state, scroll/wait so reveals fire, or the shot will catch blank
sections. The motion EFFECT itself is not screenshottable; verify it by confirming the toggle renders,
its default matches the choice, and the `prefers-reduced-motion` guard is intact.

Cross-cutting (every changed state):
- A7: click a coverflow bar -> PDP updates -> "Add to Cart" present. Must pass.
- CAROB wordmark (hero SVG line 526) renders.
- Base file `homepage_real_1_lead_photo.html` untouched.
- No em dashes introduced in any copy. No new features.
</verification>

<success_criteria>
Wave 0 is DONE when:
1. Nate has made a keep/revert/modify decision for all THREE elements.
2. Each decision is logged in `.planning/phases/wave-0-ratify/DECISIONS.md` with option + date + rationale.
3. The WIP homepage matches the chosen decisions (ratified elements unchanged; reverted/modified elements edited).
4. Any reverted/modified element has a 390 + 1440 screenshot taken and opened for review.
5. No design drift: only the lines named by the chosen options changed.
6. No new features added.
7. A7 two-click purchase path and the CAROB wordmark survive in the final WIP.
8. The approved base file `homepage_real_1_lead_photo.html` is untouched.
9. The Wave 3 gating status is recorded (which inputs are now settled; any deferrals noted).
</success_criteria>

<dependencies>
Wave 0 GATES Wave 3, and only Wave 3. Reconcile the two prior statements explicitly:
- The RESEARCH says Wave 0 "gates nothing technically." That is true for the already-unblocked waves:
  Wave 1 (a11y), Wave 2 (SEO assets), and Wave 8 (Shopify markup shaping) do NOT depend on these
  decisions and can proceed in parallel.
- The RESEARCH's own wave plan and the brief also say Wave 3 (A3 subscribe popup port + B1/B2/B3
  screenshot variants) DEPENDS on Wave 0. This is the real gate: Wave 3 cannot finalize the B3 motion
  screenshot variant without knowing whether motion stays/defaults-off/removed, and cannot style the
  popup's buttons consistently without knowing the ratified button treatment.

So: Wave 0 blocks Wave 3 specifically. It does not block Waves 1, 2, or 8.

Deferral caveat: if Nate picks Buttons Option C (comparison, decide later), Element 2 stays unresolved
and Wave 3's button-dependent work remains partially gated until he picks. Task 4 records this.

Motion Option D (extend site-wide) is out of Wave 0 scope and should be deferred to its own wave
(Task 1D gates this decision).
</dependencies>

<output>
After completion, ensure `.planning/phases/wave-0-ratify/DECISIONS.md` holds the three logged decisions.
No SUMMARY.md is required for this decision-gate wave unless the orchestrator requests one.
</output>
