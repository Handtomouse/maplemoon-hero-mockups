# Track 1 repair summary

## Outcome

Technical candidate: **PASS**. Production readiness: **HOLD pending Nate's Our Story direction and exact deployment-ID approval**.

## Repaired

- Homepage cart: restored from the independently certified shared cart runtime.
- Homepage mobile menu: six full-width 44px rows, correct centre hit targets, opaque painted drawer and no content bleed-through at measured 390.
- Stockists skip link: one `Skip to content` link resolves to one `#main-content` target.
- Builder: deterministically includes the certified cart assets and normalises clean route paths for the shared runtime without weakening duplicate detection.

## Local certification

- Build: `BUILD PASS output=/private/tmp/maplemoon-track1-repair-20260816 files=71 bytes=12782353 pages=6 private_dirs=0 vercel_project_link=0`.
- Browser/render: 12/12 PASS across six routes at measured 390 and 1440; every page returned 200 with exact width, no overflow, broken images, console errors, page errors, request failures or bad responses.
- Manual visual inspection: both contact sheets plus Homepage open-menu/cart states inspected; the final mobile drawer is opaque and correctly layered.

## Preview proof

- URL: `https://maplemoonbuild20260813-rx9cjirjk-handtomouses-projects.vercel.app`
- Deployment: `dpl_GMAVpJvm6ytQkLpDBAJXSGr1yffd`
- Target/status: `preview` / `Ready`
- Authenticated byte proof: 12/12 PASS, comprising six HTML routes and six critical assets, all HTTP 200 and byte-identical to the certified local build.
- Exactly one `vercel deploy --yes` ran. No `--prod`, promote, alias or protection action ran.

## Holds

- Our Story visibly contains two intentional pending-founder panels. See `OUR_STORY_DECISION.md`.
- T7 questions are not already sent. The draft remains unsent. See `COMMS_RECONCILIATION.md`.
- Production remains the immutable `7vjf2m50b` deployment until Nate explicitly names the approved direction and deployment ID.
