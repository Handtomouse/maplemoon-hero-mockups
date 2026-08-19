# MapleMoon Pure PDP route repair — 2026-08-16

## Result

PASS. The deploy-safe builder now emits seven pages, including the previously
certified Pure Carob page at `products/pure-carob-bar.html`. Homepage's selected
Pure product points to `/products/pure-carob-bar`, and its `Shop Now` action uses
that product-specific URL. None of the six WIP pages or the certified Pure source
page was edited.

Certified private preview:

- URL: https://maplemoonbuild20260813-m49nihfds-handtomouses-projects.vercel.app
- deployment: `dpl_BAMceRFCmxKYpq7bz3GHQZ2qZuKc`
- target/status: `preview` / `Ready`

Production stayed frozen on immutable `7vjf2m50b`, deployment
`dpl_G2LER2awaqyFtGRCcTserXbNynct`, target `production`, status `Ready`.
The production homepage remained 208556 bytes, MD5
`6197879a5ca9d3ed0452773abc0bbeb4`, SHA-256
`b936b5bb4856cdd6134e5b15bce5dfc3b353c1d442fd1a418180b35b8fa10356`.

## Verification

- Phase-start checkpoint/gate: PASS, three exact writable paths.
- Predecessor Track 1 completion and promotion replay: PASS, changed=5.
- Build: `BUILD PASS ... files=73 bytes=12815503 pages=7 private_dirs=0 vercel_project_link=0`.
- Static: `STATIC PASS pages=7/7 references=159 failures=0`.
- Browser: 14/14 PASS at measured 390 and 1440; zero overflow, broken images,
  console errors, page errors, request failures or bad responses.
- Journey: Homepage `Shop Now` navigated to `/products/pure-carob-bar`, HTTP 200,
  exact title `Pure Carob & Cacao Butter`.
- Homepage and Pure mobile drawers: each exactly six 44px full-width rows, every
  row centre hit its own target. Homepage and Pure carts opened one usable dialog.
- Deployed bytes: seven HTML pages and six critical shared assets returned 200
  and were byte/SHA-256 identical to the certified local candidate.
- Negative control: `/products/definitely-missing-control` returned 404/79 bytes
  and differed from the real Pure page.
- Visual inspection: both contact sheets, the Homepage-to-Pure journey, Pure open
  drawer and Pure open cart were nonblank, unclipped and consistent with the
  automated measurements.

## Preserved attempts

The first full browser run found a real Pure drawer failure: seven rows because
the source link `/homepage.html#carob` became `/homepage#carob`, while the pinned
cart normalizer then appended a second `What is Carob` route. The lower duplicate
failed paint-order hit testing. The builder now maps that exact source link to
`/carob-story`; the unchanged runtime recognizes it, leaves one route, and the
complete 14-case rerun passes. The failed result and screenshots are retained as
`visual-results-attempt1.json` and `screenshots-attempt1/`.

A subsequent verifier launch hit `ERR_CONNECTION_RESET` only because the first
local-server harness had changed into a build directory that the fail-closed
builder atomically replaced. `serve_clean.py` was corrected to bind an explicit
directory without changing process cwd. No candidate assertion ran in that
aborted launch; the complete unchanged final matrix then passed.

## Remaining decision boundary

This closes only the missing product-route defect. It does not approve founder
imagery, product catalogue/content, commerce data, collection endpoints, claims,
Shopify setup or production movement. Those remain under the existing Nate gates.
