# Full-browser attempt 1 — harness failure preserved

The R2 output had already passed the dedicated 7/7 focused 390px gate. This
first full-matrix attempt then scrolled every lazy image into view before
testing sequential focus. Chromium retained the last deep-page sequential
focus origin even after `blur()` and `scrollTo(0,0)`, so `Tab` resumed from a
deep control instead of beginning at the skip link. The run was stopped rather
than weakening the skip requirement.

Observed literal output before stop:

```text
FAIL measured=homepage width=390 root=0 generated_overflow=0 uncontained=0 contained=9 broken=0 skip=false desktop_equal=na failures=semantics-skip,runtime-request
FAIL measured=shop width=390 root=0 generated_overflow=0 uncontained=0 contained=4 broken=0 skip=false desktop_equal=na failures=semantics-skip
FAIL measured=our-story width=390 root=0 generated_overflow=0 uncontained=0 contained=0 broken=0 skip=false desktop_equal=na failures=semantics-skip,runtime-request
FAIL measured=carob-story width=390 root=0 generated_overflow=0 uncontained=0 contained=2 broken=0 skip=false desktop_equal=na failures=semantics-skip,runtime-request
PASS measured=faq width=390 root=0 generated_overflow=0 uncontained=0 contained=7 broken=0 skip=true desktop_equal=na failures=none
```

The independent follow-up probe recorded that image settling left Chromium's
focus origin on deep links/buttons for six routes. The harness correction tests
first sequential focus before image traversal, then separately settles all
images for image/overflow/render checks. No threshold or implementation rule
was relaxed.
