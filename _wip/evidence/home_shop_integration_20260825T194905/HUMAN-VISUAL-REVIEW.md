# Home + Shop integration human visual review

- Reviewed at: `2026-08-25T10:26:37Z`
- Authoritative crop set: `cdp-attempts/attempt-004/human-review-crops`
- 1440 contact: `cdp-attempts/attempt-004/human-review-contact-1440.png`, SHA-256 `f998f782552c1fdfe8166d3c8251d67906c8f807edaac680e0f4c6ed129ff27c`
- 390 contact: `cdp-attempts/attempt-004/human-review-contact-390.png`, SHA-256 `20f7e9374fea63dc4ef1c934fb6bc8b33e8c1d29cc70bb79d4cad3eee10c013f`
- Browser result: `cdp-attempts/attempt-004/browser-results.json`, SHA-256 `7baff467736eef7436843fa55e7a16c522d2d0a64b462c0c99958122d0f67676`

## Human verdict

`HOLD`. All 26 named crops were inspected, including both contacts and the
full-resolution Home comparison, Home bundle, and Shop bundle grid/list crops at
1440 and 390. Independent review then identified that
`human-review-crops/home_ritual_390.png` contains the fixed cart drawer over the
lower ritual card. The 390 contact sheet inherits that contamination, so attempt
004 is not an immutable clean visual proof set.

- The five Home category icons render coherently and remain legible at both widths.
- The comparison remains a three-row hairline treatment; all six meanings are
  visibly distinct and each carob row has one check.
- The temporary bundle is fully visible and not clipped in Home and Shop grid/list.
- Exactly one high-contrast `TEMPORARY STAGING / REPLACE BEFORE FINAL` label is
  visible on the bundle in each inspected route state.
- Automated geometry proves the ritual images retain the selected crops and all
  captions are below the 4:5 image frames, but the contaminated 390 ritual crop
  does not visually expose the final caption cleanly.
- Hero/header, range, five section-transition crops, and footer show no visible
  integration regression at either width.

The otherwise clean scoped views do not override either this visual-proof HOLD or
the automated target-size HOLD documented in `INTEGRATION-HOLD.md`.
