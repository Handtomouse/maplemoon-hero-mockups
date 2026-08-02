# FAN-OUT GOAL — all remaining work, parallelised by file, run to completion
# Written: 2026-08-03 · macbook Claude Code (worker) · v2, supersedes v1
# STATUS: DISPATCH. Nothing built from this lane. Claude verifies between waves.
# Sources: NATE-REVIEW-PASS-20260803.md · CODEX-PACKET-REQUEST-HOMEPAGE-FIXES-20260803.md
#          CODEX-PACKET-REQUEST-SEAMS-AND-FADES-20260803.md · LIVE-BROWSER-TRUTH-20260803.md

# THE GOAL

**Carli opens a Vercel link in the morning and sees a working, fast, visibly-improved
six-page MapleMoon site.** Not a formal review package. A preview she can click through and
react to.

**This is a `/goal`, not a task list. Do not stop when your packet finishes.** Report, then take
the next item from your **IDLE QUEUE** at the bottom. Only stop when Nate says stop.

---

## HOW THIS SHIPS WITHOUT TOUCHING CR-0

**A preview link is not the CR-4 send.** `CR-0`…`CR-4` gate the *formal review package* — the
hash-bound artifact with keyboard and zoom evidence bound to it. Sending Carli a working
preview to look at is a **different act** and consumes no gate.

So: **ship the preview tonight, leave every gate untouched and uncorrupted.** Nothing is
recorded, nothing inherits a bad record, and the formal send happens properly later against
whatever ships.

> **Do NOT record `CR-0`, and do NOT describe the link to Carli as "the review package".**
> Call it a preview or a work-in-progress link. That one word is what keeps the gates clean.

---

## STANDING CONSTRAINTS — every packet, no exceptions

    DO NOT rebuild staging-v1/ until Wave 3. Wave 3 owns the single rebuild.
    clean/MANIFEST.json stays d1c66b1d5937e9956d1806dbbbff4faf4f950def046aa642ae52f809c3d52d20 until then.

- **One writer per file.** All WIP sources are `LOCK_MANIFEST` locked and Codex-owned. Two
  instances on one file silently wipe each other — the homepage is a known multi-session hotspot
  (`~/UFC/clients/maplemoon/CODEX_HANDS_OFF_GUARDRAILS.md`).
- **Never** `git stash`, `git checkout --`, `git reset --hard`, `git clean -fd`, `git add -A`,
  `git commit -a`. 80+ untracked files live in this tree.
- **Record no gate.** `CR-0`..`CR-4` and `NATE-HOME-001` are Nate's alone.
- **Assert pages parsed** — `document.querySelectorAll('section').length` ≥ expected. Never
  trust that navigation succeeded; a prior sweep read a correct URL and title with zero sections.
- **Any capture scrolls top→bottom and waits on `document.images` first.** Skipping this
  produced a whole false finding set (`IMG-001`–`IMG-004`).
- **Ignore `_wip/reviews/maplemoon-six-page-qa-20260803/visual/findings.json`.** Its `VIS-001`
  and `IMG-001`–`IMG-004` are disproved capture artifacts. See `LIVE-BROWSER-TRUTH-20260803.md`.

---

# WAVE 1 — six in parallel, start now

## W1-A · homepage · CRITICAL PATH
**File:** `_wip/homepage_real_1_lead_photo.WIP.html` — **you are the only writer**

**Order matters. Do the seams FIRST and publish the pattern**, because Wave 2 is blocked on it.

1. **Seams.** Diagnosis is measured, in `CODEX-PACKET-REQUEST-SEAMS-AND-FADES-20260803.md`:
   sections are all `rgba(0,0,0,0)`, seams are **not** borders, `.fog` already works. Cause is
   full-bleed section imagery terminating hard against the page gradient. **Report how `.fog`
   achieves the hero dissolve before writing CSS. Publish the resulting pattern immediately —
   Wave 2 copies it verbatim.**
2. **Bounded fixes.** `H1` blur the visible hard edge on the wordmark backing plate · `H2` move
   the credential pill **above** the CTA · `H3` larger pill text, **pill dimensions unchanged** ·
   `C1` restore the desktop inset so `#carob` sits on the 158px grid (top-level
   `.wf-what1 .inner{padding:0}`, WIP line 1889; **≤900px must render byte-identical**) ·
   `S1` **measure** the `#story` eyebrow contrast then fix if below 4.5:1, report before/after ·
   `S2` make the `#story` fade symmetrical · `SA1` sampler bars in one line, keep photos ·
   `RT2` soften the ritual cards.
   **`C2` DECIDED:** keep the two carob callout pods, **reposition them onto the actual carob
   pods in `carob_branch_dusk.jpg`.** They sit at arbitrary coords now (`right:520px;top:22%`,
   `right:150px;top:34%`).
3. **Carousel mist** (`R2`/`R3`) — **folded in here, not a separate instance, because it is the
   same file.** Mist over the edge bars, blurred; only the centre bar sharp. Reference: Adobe
   Stock isolated mist `asset_id 2047296791`. **There is no variant to choose** — all five
   `_wip/variants/` files carry an identical `.fog` rule (sha `40884069c6fe`) matching the
   current homepage.

## W1-B · shop
`SH3` make the filters less visually intense · `SH2a` **size selector** on Eclipse Bites
(`$5.99–$59.99` with no picker) · `SH2b` explain **Enquire vs Add To Cart** · `SH2c` simplify
the Moons **bulk tiers** · `SH2d` show a **cart subtotal**.
`SH2a`/`SH2d` are new UI and state — if they overrun, ship `SH2b`/`SH2c` and say so.
**Do NOT "fix" the starter-box duplication** — Nate ruled it intentional.
Also: one unresolved asset reference on this page. Find and fix it.

## W1-C · faq
`FQ1` — `.wrap.support-panel` renders at **gap L 0 / R 240** at 1440 while every other `.wrap`
is **120/120**. Centre it. **Do not touch the three `.faq-section` blocks** (462/120) — that is
the two-column answer grid, correct by design.

## W1-D · the checker · **BLOCKS WAVE 3**
`scripts/check-maplemoon-review.py`. Pinned to `SATURDAY_PACKET_ID =
"SAT-HOME-CLEAN-CLOSURE-01"` — **the closure packet Nate cancelled.** It asserts a homepage
never built: expects `Six-bar sampler` and `Explore six bar flavours`, rejects `gift`.
**26 failures. Wrong contract, not broken code.** Repin to the shipping package; make
`npm run review:saturday:check` pass.

## W1-E · asset prep · no WIP writes
Source: `/Users/handtomouse/UFC/spins/maplemoon_bites_moodboard_export_20260516/output_PNG` (79 files).
Rule: `<product>-main*.png`; single-shot products use their only file.
**Eclipse bites ×4 use `-front.png`** — Nate chose whole, front-on, not cut-open.
**Bars and elixirs keep current photos.** `R6` add missing bites/eclipse bites. `R5` repeat
where a carousel cannot be filled. **"Slices" does not exist in the export — report, do not
substitute.** Prepare web-ready exports; **wire nothing in.**
**Icons:** source **three candidate sets** for `bars`, `bananas`, `moons`, `eclipseBites`,
`elixirs` and present for Nate to choose. Context in `ICON-CREATION-BRIEF-20260803.md`. **Wire
nothing in.**

## W1-F · image compression · **NEW, AND IT DECIDES WHETHER THE LINK FEELS BROKEN**
**Files:** `assets/licensed/*` only. No WIP HTML, no collision.

Measured page weight Carli would download:

| page | weight |
|---|---|
| **homepage** | **25.0 MB** |
| **carob-story** | **11.5 MB** |
| shop | 4.2 MB |
| our-story | 1.5 MB · stockists 0.5 · faq 0.1 |

Worst offenders: `scene_afternoon.jpg` 10MB · `carob_pods_macro.jpg` 9.8MB (**referenced
twice**) · `scene_after_dinner.jpg` 7.8MB · `scene_tea_night.jpg` 3.9MB.

**Target: every page under 3MB.** Re-export at realistic rendered dimensions (these sit in
cards, not full-bleed — roughly 1600px long edge), WebP/JPEG q75–80, under 300KB each. **Verify
visual quality at actual rendered size before replacing.** Keep filenames identical so no
markup changes.

---

# WAVE 2 — three in parallel, ONLY after W1-A publishes the fade pattern
Apply **W1-A's published pattern**. Do not invent a second treatment.

- **W2-F · our-story** — `OS3` fades to homepage standard · `OS1` founder portrait. **Codex has
  six commits on this today** (`62ddcd6`…`a01665f`). **Continue, do not restart.**
- **W2-G · carob-story** — `CS1` fades · `CS2` fix/update imagery · `CS3` **decided**: change
  *"The four things everyone asks"* to **three** (only 3 items exist).
- **W2-H · stockists** — `ST1` fades. Also `.st-skip-finder` is **visible at 834** (measured
  `top 349.9→393.9`) though correctly hidden at 1440. It does **not** overlap the hero
  paragraph. Hide it at tablet.

---

# WAVE 3 — serial, one instance

1. **Checkpoint.** staging markup is committed (`243c577`, 28 files); assets are not.
2. **Rebuild.** New `clean/MANIFEST.json` hash.
3. `npm run review:saturday:check` must pass (W1-D).
4. **Deploy to Vercel — READ THIS BEFORE DEPLOYING.**
   > `vercel.json` has `"outputDirectory": "."`. **Deploying as-is publishes the entire repo —
   > `_wip/`, `docs/orchestration/`, every internal evidence file — to a URL Carli can browse.**
   > **Deploy `staging-v1/clean/` ONLY**, with its own config. Verify by fetching
   > `/_wip/` and `/docs/` on the deployed URL and confirming both 404.
   Keep `noindex,nofollow` — correct for a private preview. Confirm the link opens **without a
   Vercel account**.
5. **Re-run the hash-bound evidence** — keyboard traversal at literal 390 across six pages, and
   the 200% zoom pre-screen. Both die with the old hash. **Method:** CDP
   `Emulation.setDeviceMetricsOverride` plus `Page.bringToFront`. **Never activate Chrome by app
   name** — two instances share a bundle id here; that caused every earlier traversal failure.

---

# IDLE QUEUE — never sit idle, never stop

When your packet is done, blocked, or waiting on another wave, **take the top unclaimed item**,
announce which you took, and continue:

1. **Verify your own work at 1440 / 834 / 390** with a real browser and a scroll-and-settle pass.
2. **Re-measure page weight** after W1-F lands; report any page still over 3MB.
3. **Reproduce the unverified shop claims** — audit #4, #5, #6, #26, and faq #1's reported
   260px focus shift. **None have ever been reproduced.** Confirm or kill each.
4. **Check the OG/canonical gap** — zero OG tags and no canonical on all six pages. Prepare, do
   not wire.
5. **Audit remaining oversized assets** across the whole repo, not just `licensed/`.
6. **Cross-page consistency sweep** — our-story buttons are 8px radius vs 999px everywhere else;
   faq is missing the AUD $ indicator; footer class prefixes disagree across five pages.
7. **Apply the Moons rename** — decided: category is **Moons**, presented by a crescent.
   `CRESCENTS`→`MOONS`, `data-cat="crescents"`→`"moons"`, "Pure Carob Crescent"→**Moon**,
   faq `CAROB MOONS`→**Moons**. **Only in your own file.**
8. **Write up what you did** as a short evidence note under `_wip/evidence/`.

**If every item is claimed:** re-verify another instance's completed work adversarially and
report anything that does not hold. **Do not stop and wait.**

---

## STILL BLOCKED — needs Nate or Carli, not a builder

- **`S4` origin copy.** Conflict resolved (Brunswick Heads = home, South Australia = farm) but
  **`CV-046`/`CV-063` unsubstantiated.** Regulated origin claim.
- **`S3`** more engaging `#story` CTA — new copy, needs approval.

## Lane compliance
Written inside `_wip/evidence/` only. Nothing built, rebuilt, deployed or recorded as a gate.
