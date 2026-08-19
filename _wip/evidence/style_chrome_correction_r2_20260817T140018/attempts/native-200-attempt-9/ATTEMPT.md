# Native-200 attempt 9

Outcome: **CANDIDATE FAIL — Shop focused skip was above viewport at 720.**

All 390px routes passed. At 720, homepage passed, then Shop reported its
focused skip above the viewport even though the generated focus rule specifies
viewport-fixed positioning. The next harness run adds computed position,
min-height, top, media-query and scroll-Y fields to the existing failure record
so the cause can be distinguished without weakening the visibility assertion.
