# Preview deploy runbook — the Carli work-in-progress link
# Written: 2026-08-03 · macbook Claude Code (worker)
# STATUS: RUNBOOK. Nothing deployed from this lane. Wave 3 executes this.

## What this is

A **preview** link so Carli can click through the six pages and react. **It is not the CR-4
formal send**, so it consumes no gate. `CR-0`..`CR-4` stay clean and untouched.

> **Never describe this link to Carli as "the review package".** Call it a preview or a
> work-in-progress link. That single word is what keeps the gates uncorrupted.

## THE TRAP — read before deploying anything

The repo-root `vercel.json` has `"outputDirectory": "."`.

**Deploying that publishes the entire repository** — `_wip/`, `docs/orchestration/`, every
evidence and packet file, the lock manifest, all internal notes — **to a public URL the client
can browse.**

**Do not edit the root `vercel.json`** (it serves the main site) and **do not add a config
inside `staging-v1/clean/`** (that is the frozen, hash-verified artifact; adding files to it
breaks the freeze).

## The safe procedure

1. **Copy, never deploy in place:**

       rm -rf _wip/deploy/site && mkdir -p _wip/deploy/site
       cp -R docs/client-review/2026-08-01-saturday-review/staging-v1/clean/. _wip/deploy/site/

   **Strip `_comment` when copying the config.** Vercel hard-fails with
   `Invalid vercel.json - should NOT have additional property _comment`. The comment
   stays in the template (which is never deployed); only the copy is stripped:

       python3 -c "import json;d=json.load(open('_wip/deploy/vercel-preview.json'));d.pop('_comment',None);json.dump(d,open('_wip/deploy/site/vercel.json','w'),indent=2)"

   **Then swap in the compressed licensed derivatives** — without this the preview is
   22MB. See the divergence section below for why:

       for f in carob_pods_macro.jpg scene_after_dinner.jpg scene_afternoon.jpg \
                scene_tea_night.jpg carob_farm/australian-carob-0205.jpg \
                carob_farm/australian-carob-0205-16x9.jpg \
                carob_farm/australian-carob-0205-mobile.jpg; do
         cp "assets/licensed/$f" "_wip/deploy/site/assets/licensed/$f"
       done
       du -sh _wip/deploy/site/assets/licensed   # expect ~1.2M, NOT 33M

2. **Prove no internal content came along** before deploying:

       find _wip/deploy/site -maxdepth 1 | sort
       # expect ONLY: the 6 html pages, index.html, MANIFEST.json,
       #              4 css, mock-cart.js, assets/, vercel.json
       ! test -e _wip/deploy/site/_wip && ! test -e _wip/deploy/site/docs && echo "CLEAN"

3. **Deploy that directory only.**

4. **Verify on the live URL, not locally:**

       curl -s -o /dev/null -w "%{http_code}\n" https://<url>/_wip/          # expect 404
       curl -s -o /dev/null -w "%{http_code}\n" https://<url>/docs/          # expect 404
       curl -s -o /dev/null -w "%{http_code}\n" https://<url>/               # expect 200/302
       curl -sI https://<url>/homepage.html | grep -i x-robots-tag           # expect noindex

5. **Open it in a private window with no Vercel session.** If it asks for a login, deployment
   protection is on and Carli cannot see it. Turn protection off for this deployment, or use a
   shareable bypass link.

6. **Check weight before sending.** If homepage is still over ~3MB, W1-F has not landed and the
   link will feel broken. **Measured before compression: homepage 25.0MB, carob-story 11.5MB.**

## The preview deliberately diverges from `clean/` on `assets/licensed/`

**Recorded 2026-08-03. Read this before comparing preview bytes to artifact bytes.**

`staging-v1/clean/` is a snapshot taken *before* W1-F. It carries the full-res camera
originals for the licensed stock — `carob_pods_macro.jpg` is 7360x4912 / 9.8MB there.
W1-F did land, but it landed in the working tree at `assets/licensed/`, at the **same
paths**, as 1600px web derivatives. Verified same images, not different crops.

Deploying `clean/` bytes unchanged gave **homepage 22MB, carob-story 11MB** — matching
the runbook's own "before compression" figures at step 6, which is what made it look
like W1-F had never run.

So the deploy copy takes the working-tree derivatives for these seven referenced files
only (not the whole dir — the working tree carries extra unreferenced licensed stock
that must not reach a public URL):

    assets/licensed/{carob_pods_macro,scene_after_dinner,scene_afternoon,scene_tea_night}.jpg
    assets/licensed/carob_farm/australian-carob-0205{,-16x9,-mobile}.jpg

`assets/licensed/` in the deploy copy: **33MB -> 1.2MB**. Every other asset dir is left
as `clean/` has it — `clean/` is already the optimised web copy everywhere else, and the
working tree there holds much larger masters (`hero_shots` 225MB, `hero_videos` 189MB).

This divergence is confined to `_wip/deploy/site/`, which is untracked scratch outside
the frozen artifact. **No file in `staging-v1/` was touched and no MANIFEST hash moved.**
The preview is not the review package, so image-byte divergence is in scope for it and
would not be for a CR-4 send.

### Measured per-page weight after the swap

| page | referenced assets | note |
|---|---|---|
| homepage | 3.53 MB | was 22MB; largest single file 0.71MB |
| shop | 4.27 MB | six product PNGs at ~0.6-0.83MB each |
| our-story | 1.52 MB | |
| carob-story | 1.34 MB | was 11MB |
| stockists | 0.50 MB | |
| faq | ~0 MB | |

No broken asset references on any page. Shop is the remaining heavy page: its PNGs are
superseded by the W1-E WebP shots under `assets/product_shots/w1-e-prepared-20260803/`.
**Left alone deliberately** — that path is under an active RECROP writer. Fold them in
when W1-E lands and shop drops to roughly 1.5MB.

## Why `noindex` stays

Correct and deliberate for a private preview. Three separate QA audits recommend removing it;
all three are wrong for this artifact. It only becomes a defect at public launch.

## Machine routing — what runs where

| work | machine | why |
|---|---|---|
| Viewport measurement, 200% zoom pre-screen, visual QA | **macbook** | Headless CDP `Emulation.setDeviceMetricsOverride` verified working here on 2026-08-03 at 1440, 834, 756 and 390. **The old note that "200% cannot run on the macbook" was about the browser *extension*, not CDP.** |
| **Real OS-level keyboard traversal** | **iMac** | Needs genuine Tab keypresses in a real window. Proven harness at `_wip/evidence/IMAC-KEYBOARD-PROOF-20260802/HARNESS.py` with retained stop lists. SMB mount `/Volumes/handtomouse` is up and carries a repo replica. |
| Bulk renders, compression, multi-file sweeps | either, but **prefer the iMac** | Keeps the macbook responsive while Nate is working on it. |

**Never activate Chrome by app name for keyboard work.** Two instances share a bundle id on
these machines; activation silently targets the wrong window while `hasFocus` still reads true.
That was the root cause of every earlier traversal failure. Use CDP `Page.bringToFront` on the
specific window.
