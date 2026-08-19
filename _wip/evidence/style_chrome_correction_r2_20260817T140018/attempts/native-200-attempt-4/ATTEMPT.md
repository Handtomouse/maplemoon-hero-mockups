# Native-200 attempt 4

Outcome: **HARNESS HOLD — the 200% target had settled to `about:blank`.**

The immediate measurements proved the native preference ratios exactly, but
Chrome startup/session restoration left the 100% and 200% selected targets at
`about:blank`. That made later width calibration address stale target/window
state. The wrapper now performs the accepted homepage navigation immediately
after each launch, while its connection is fresh, before recording controls.
No page assertion or acceptance threshold changed.
