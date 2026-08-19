# Native-200 attempt 6

Outcome: **STALE-CACHE FAIL — reused native profile loaded prior runtime.**

The corrected runtime passed the fresh-context 7-route focused gate and full
35/28 browser matrix, but the intentionally reused native-preference profile
served its cached pre-correction `/style-chrome-derived.js` at the same local
origin. The native wrapper now disables HTTP cache through
`Network.setCacheDisabled` before navigation. This is not an Emulation or Input
method and changes no page assertion or threshold; it ensures the audit tests
the current generated output.
