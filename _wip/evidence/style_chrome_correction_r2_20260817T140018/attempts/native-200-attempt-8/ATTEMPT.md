# Native-200 attempt 8

Outcome: **CANDIDATE FAIL — focused Stockists skip was above viewport at 720.**

All seven 390px cases and the first five 720px cases passed. After prior
keyboard/scroll activity, Stockists focused its document-absolute skip at
`y=-69.2px`; the target still activated correctly, but focus visibility failed.
The generated R2 focus override now uses `position: fixed` at the same 8px
offset. This preserves its visual treatment while guaranteeing focus remains
viewport-visible independent of document scroll.
