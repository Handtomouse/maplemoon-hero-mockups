# Codex brief — point Carli's existing preview URL at the full-source build

**Written:** 2026-08-03 by Claude Code (macbook). Handover reason: token budget exhausted.
**Context doc:** `_wip/deploy/README.md` — read "THE THIRD TRAP" first, it explains why this matters.

## Goal

Make the URL Carli already has, `https://maplemoon-preview-carli.vercel.app`, serve the
full-source build in `_wip/deploy/site-full/` instead of the claim-stripped review artifact it
serves now.

## Why this is urgent

Carli replied on 2026-08-03 08:38: *"in regards to what I reviewed last time it looks the same?
And the edits I sent you haven't been added?"* She was right. The deployed build came from
`staging-v1/clean/`, which `build-maplemoon-saturday-review.py` deliberately strips: **~630 fewer
words, homepage down 42%**, the whole "Why not cacao?" section removed, and the working
add-to-cart rewritten into a mailto. There is a **client call this evening**.

`site-full/` fixes that. It is built from `_wip/*.WIP.html` and already contains 12 of Carli's
Canva product descriptions.

## Current state

- `_wip/deploy/site/` — the OLD stripped artifact. Currently on `maplemoon-preview-carli.vercel.app`.
  Its `.vercel/project.json` holds the link to the **correct** project (`maplemoon-preview-carli`,
  projectId `prj_wzWKBfku3VmFoKcj1NHBideqGJKn`).
- `_wip/deploy/site-full/` — the GOOD build. Verified: all 6 pages 200, public (no SSO), `/_wip/`
  and `/docs/` both 404, 0 broken images, no horizontal overflow, shop 4.27MB -> 0.19MB, 8.7MB total.
- A stray Vercel project `site-full` was created by accident, aliased
  `https://site-full-omega.vercel.app`. It works, but the URL is off-brand and is NOT the link
  Carli holds.

## Inputs

    /Users/handtomouse/maplemoon-website/_wip/deploy/site-full/          # deploy this
    /Users/handtomouse/maplemoon-website/_wip/deploy/site/.vercel/       # correct project link
    /Users/handtomouse/maplemoon-website/_wip/deploy/README.md           # runbook + all three traps

## Steps

1. Repoint `site-full` at the existing project:

       cd /Users/handtomouse/maplemoon-website/_wip/deploy
       rm -rf site-full/.vercel
       cp -R site/.vercel site-full/.vercel
       grep projectName site-full/.vercel/project.json     # expect maplemoon-preview-carli

2. Deploy to production (production is public on this account; **preview deploys are SSO-walled**
   and cannot be verified — see runbook step 5):

       cd site-full && vercel deploy --prod --yes

3. Confirm it aliased to `maplemoon-preview-carli.vercel.app`, not a new URL.

## Verify

Run all of these against `https://maplemoon-preview-carli.vercel.app`. Every one must pass.

    A=https://maplemoon-preview-carli.vercel.app
    for p in / /shop /our-story /carob-story /stockists /faq; do
      curl -s -o /dev/null -w "$p %{http_code}\n" -L --max-redirs 3 "$A$p"; done   # all 200
    curl -s -o /dev/null -w '%{redirect_url}\n' "$A/homepage.html" | grep -q sso-api \
      && echo "FAIL: SSO-walled" || echo "PASS: public"
    curl -s -o /dev/null -w '_wip %{http_code}\n' "$A/_wip/"                        # 404
    curl -s -o /dev/null -w 'docs %{http_code}\n' "$A/docs/"                        # 404
    curl -s "$A/shop" | grep -c 'two wholefood ingredients'                         # 1 = Carli's copy live
    curl -s "$A/homepage" | grep -c 'Why not'                                       # 1 = full build, not stripped
    curl -s -o /dev/null -w 'img %{http_code}\n' "$A/assets/products_new/bar_pure_carob.webp"  # 200

**The decisive check is `grep -c 'Why not'` returning 1.** The stripped build returns 0. If it
returns 0, the wrong directory was deployed.

Do NOT grep the served HTML for `ADD TO CART` — the shop grid is rendered by inline JS, so raw
HTML returns 0 even when the cart is working. That is expected, not a defect. Confirm the cart in
a browser if needed.

## Output

Report: the final URL, the pass/fail of every verify line above, and whether the alias landed on
`maplemoon-preview-carli.vercel.app`.

## Do not touch

- `docs/client-review/2026-08-01-saturday-review/` — **frozen, hash-verified artifact.** Do not
  edit, do not rebuild, do not run `build-maplemoon-saturday-review.py`. `npm run
  review:saturday:check` must stay at 0 failures.
- `docs/orchestration/reviews/CARLI-CANVA-NOTE-REGISTER-20260731.md` — Codex-owned register;
  update it only if that is your lane, and only for items actually delivered.
- `assets/product_shots/w1-e-prepared-20260803/` — active RECROP writer.
- The repo-root `vercel.json` — it has `outputDirectory: "."` and deploying it publishes the
  entire repo, including `_wip/` and `docs/orchestration/`, to a public URL.
- Do not send anything to Carli or Dylan. Nate sends.

## Known outstanding (do not start without Nate)

- **41 of 68 Canva notes still undelivered**; 20 are `needs-fact-check` (origin/health claims)
  and genuinely blocked on supplier authority. 19 were `ready-copy-review`, of which 12 are now
  applied. Held on purpose: CV-037 (shipping policy implication), CV-033 (unverified product
  reference), CV-054 (product support check).
- **Carli's and Dylan's bios** — emailed 2026-07-29 as "Carli Blurb" / "Dylan Blurb", never added
  anywhere in the repo. The Our Story page still reads "Individual stories to come from Carli and
  Dylan". Placement and trimming is a design decision for Nate.
- `carob-story` comparison table stacks badly at 390px (content in a ~130px column, two-thirds
  empty, feature labels between the values they describe). Not an overflow. Design decision.
- 5 OG social images referenced but missing (`assets/social/og-*.jpg`) — link previews only.
