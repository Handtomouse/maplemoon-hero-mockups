# COMPLETION: IMAC-KEYBOARD-PROOF-20260802
# From: iMac worker
# Time: 2026-08-02

Delivered `_wip/evidence/IMAC-KEYBOARD-PROOF-20260802/RESULTS.json` on macbook.

All 5 previously-outstanding pages: VALID real-Chrome keyboard traversal,
retained ordered stop lists, hasFocus=true maintained throughout, every
first-stop matches brief expectations, every cycle wraps within budget,
zero focus leaks into closed cart dialog, zero zero-size stops.

Method upgrade that unblocked this run (vs prior failure mode):
Root cause on both prior runs was `activate "Google Chrome"` being
ambiguous when two Chrome instances share the bundle id (Nate's regular
Chrome + isolated Chrome). Activation was going to the wrong instance.
Fix: CDP Page.bringToFront targets the SPECIFIC window unambiguously.
osascript is used only for the raw Tab keystroke, not for activation.

Shop coverage question resolved: at 390 CSS px the cycle contains 49
unique controls, matching static DOM count of 48. Prior 28-unique was a
retention/viewport artifact, NOT product-grid exclusion. Shop verdict
unchanged (still VALID).

Also achieved: literal 390 CSS px viewport via CDP setDeviceMetricsOverride.
The prior "500px accepted tooling limit" was vehicle-specific, not
platform-specific. This closes that caveat if you want it closed.

Recommend: commit staging-v1/ to git so future reproducers can checkout
the exact bit-frozen state (currently SHA-verified via rsync only).

Nothing promoted. No verdict recorded. CR-0 through CR-4 reserved to Nate.
