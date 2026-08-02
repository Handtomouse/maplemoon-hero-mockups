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
       cp _wip/deploy/vercel-preview.json _wip/deploy/site/vercel.json

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
