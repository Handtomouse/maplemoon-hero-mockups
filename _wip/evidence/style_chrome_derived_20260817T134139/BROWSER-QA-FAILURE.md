# Browser QA stop receipt

Status: **FAIL / HOLD — packet stop condition reached**

The first measured-width gate was stopped after all seven 390 CSS-pixel route
cases reported required-check failures. No corrective styling or route-specific
patch was attempted after the failure. The static server was stopped and the
1024/1440, interaction, native-200 and preflight gates were not run.

Command:

```text
/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node _wip/evidence/style_chrome_derived_20260817T134139/browser-qa.mjs
```

Literal observed route output:

```text
FAIL route=homepage width=390 header=1 main=1 root_overflow=0 internal_overflow=9 broken=0 runtime=0 failures=internal-overflow,semantics-skip,mobile-controls
FAIL route=shop width=390 header=1 main=1 root_overflow=0 internal_overflow=0 broken=0 runtime=0 failures=semantics-skip,mobile-controls
FAIL route=our-story width=390 header=1 main=1 root_overflow=32 internal_overflow=1 broken=0 runtime=0 failures=root-overflow,internal-overflow,semantics-skip,mobile-geometry-wordmark,mobile-controls
FAIL route=carob-story width=390 header=1 main=1 root_overflow=0 internal_overflow=2 broken=0 runtime=0 failures=internal-overflow,semantics-skip,mobile-controls
FAIL route=faq width=390 header=1 main=1 root_overflow=0 internal_overflow=4 broken=0 runtime=0 failures=internal-overflow,mobile-controls
FAIL route=stockists width=390 header=1 main=1 root_overflow=0 internal_overflow=1 broken=0 runtime=0 failures=internal-overflow,semantics-skip,mobile-controls
FAIL route=pure-carob-bar width=390 header=1 main=1 root_overflow=0 internal_overflow=0 broken=0 runtime=0 failures=semantics-skip,mobile-controls
```

The browser process was then stopped at the packet's fail-fast boundary. Its
terminal ended with `browserContext.newPage: Protocol error
(Target.createTarget): Failed to open a new tab` and exit code 1. Seven current,
nonblank 390px screenshots remain under `proofs/measured/` for review; their
presence is evidence of the failed state, not passing visual proof.

Earlier build result, before browser QA:

```text
STYLE BUILD PASS output=/Users/handtomouse/maplemoon-website/_wip/deploy/generated/maplemoon-style-chrome-derived-20260817T134139 files=75 bytes=12829978 pages=7 reverse=7/7 projections=7/7 runtime_assets=2
```

No production, WIP, Pure input, sealed Styles Kit, Git, deploy, Vercel, Shopify
or client surface was changed.
