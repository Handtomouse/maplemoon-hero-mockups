# Codex brief — full-page PNG renders of the frozen six-page package
# Written: 2026-08-03 · macbook Claude Code (worker)
# STATUS: BRIEF ONLY. Records no verdict, passes no gate, mutates nothing.
#         Purpose: Nate annotates the PNGs in Canva. CR-0 remains his alone.

**Goal:** Render every page of the frozen review package as one full-height PNG per
viewport width, so Nate can drop them into Canva and tag notes directly on the image.

---

## Inputs

    Artifact:  /Users/handtomouse/maplemoon-website/docs/client-review/2026-08-01-saturday-review/staging-v1/clean/
    Server:    http://127.0.0.1:3011/   (ALREADY RUNNING, PID 43050, cwd = the above)
    Pages:     homepage.html  shop.html  our-story.html  carob-story.html  stockists.html  faq.html
    Output to: _wip/evidence/FULLPAGE-RENDERS-20260803/<width>/<page>.png

Integrity to confirm before rendering anything — a render of a drifted artifact is void:

    clean/MANIFEST.json      = d1c66b1d5937e9956d1806dbbbff4faf4f950def046aa642ae52f809c3d52d20
    annotated/MANIFEST.json  = 3be3c0f2df4658558c667b3e9cc6d55966d6a1d7ce9fa9874c46a0afc44244c7

## Widths — 3 per page, 18 renders total

| label | CSS px | why this exact number |
|---|---|---|
| desktop | **1440** | the width the alignment sweep used; comparable to existing evidence |
| tablet | **1024** | **must be >900.** 900px is the layout breakpoint and the confirmed `#carob` misalignment exists ONLY above it. A tablet render at 768 would hide the one known defect. |
| mobile | **390** | matches the existing keyboard-traversal evidence exactly |

## Steps

1. **Do not start a second server.** 3011 is already serving `clean/`. Confirm with
   `curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3011/homepage.html` → `200`.
   If you must restart it, serve from `staging-v1/clean` and nowhere else.

2. Use CDP (`Emulation.setDeviceMetricsOverride`) for width control. Do **not** resize a
   window by app name — two Chrome instances share a bundle id on this machine and activation
   silently targets the wrong window. That was the root cause of every earlier failure here.

3. Per page, per width, in this order:
   a. Navigate, then **wait for the hard load guard in step 4 to pass** before anything else.
   b. **Scroll the full page top→bottom in steps, then back to top.** Non-negotiable: there are
      lazy-loaded images and ~21.7MB of hero-scale JPEGs in the "when do you moon" section
      (`scene_afternoon.jpg` 10MB, `scene_after_dinner.jpg` 7.8MB, `scene_tea_night.jpg` 3.9MB).
      Without a scroll pass those cards capture blank.
   c. Wait until every image has actually decoded:
      `Array.from(document.images).every(i => i.complete && i.naturalWidth > 0)`
   d. **Give the hero video a beat.** The homepage hero background is a real autoplaying muted
      `<video>` (`assets/hero_videos/gen/finalists/graded_blue/finalist_wetsand2.mp4`), not a
      photo. Captured too early it renders black and reads as a broken hero. Wait for
      `readyState >= 3` on it, or ~1s after load.
   e. Capture full-height (`Page.captureScreenshot` with `captureBeyondViewport: true`).

4. **HARD LOAD GUARD — do not skip.** Assert the page actually *parsed*, not merely that it
   navigated. Correct URL and title are not sufficient: a prior sweep in this project recorded
   homepage with a correct URL and title and **zero sections**, and without a guard it would
   have been reported as clean. Require, with a retry loop:

       document.querySelectorAll('section').length > 0

   Expected section counts for the frozen pages — if a page returns a different number,
   **fail loudly and re-run that page; do not save the PNG**:

   | page | sections |
   |---|---|
   | homepage | **8** |
   | shop | 7 |
   | our-story | 8 |
   | carob-story | 5 |
   | stockists | 3 |
   | faq | 7 |

   Note: homepage returning **11** means you have rendered `_wip/homepage_real_1_lead_photo.WIP.html`
   by mistake. The WIP carries three extra sections (`#why`, `#who`, `#reviews`) that are **not
   in the review package**. Renders of the WIP are worse than useless — Nate would annotate
   content Carli and Dylan will never receive.

5. **No motion workaround is needed.** The scroll-reveal system is disabled by default: the
   inline script ends `var on=false;(on?enable:disable)();`, and `disable()` removes
   `motion-on` and adds `is-visible` to every `[data-reveal]` target at load. Sections are
   fully opaque from first paint. **Do not inject class changes to "force" reveal** — mutating
   the DOM before capture would make the PNG unfaithful to what a viewer sees.

## Verify

Proves it worked, per page per width:

    file <path>.png          → PNG image data, width matches the target CSS px
    PNG height > 3000px      → a short render means the page collapsed or failed to load

Then eyeball **`1440/homepage.png`** specifically and confirm all three:
- the hero shows sky/cloud footage, **not black** (video painted)
- the three "when do you moon" cards show photographs, **not blank boxes** (lazy images loaded)
- the `#carob` section ("What is Carob, actually?") is visibly present

## Output

Report back:
1. The 18 file paths, with pixel dimensions of each.
2. Any page that failed the section-count guard, and how many retries it took.
3. Whether the 3011 server was reused or restarted.

**Flag, do not fix:** if any render exceeds ~25MB or ~8000px on the long edge, say so rather
than downscaling silently — Canva has import limits and Nate needs to know before he builds
his annotation board on an image that will not upload.

## Do not touch

- `staging-v1/` — the frozen artifact. Read and serve only. Never write, never rebuild.
- `docs/orchestration/`, `LOCK_MANIFEST.json`, `scripts/`, `.gitignore`
- `_wip/homepage_real_1_lead_photo.WIP.html` and every other `*.WIP.html` source
- **Record no gate.** CR-0 through CR-4 are Nate's alone; an agent writing one corrupts every
  gate downstream of it. This job produces images, nothing more.

Write only inside `_wip/evidence/FULLPAGE-RENDERS-20260803/`.
