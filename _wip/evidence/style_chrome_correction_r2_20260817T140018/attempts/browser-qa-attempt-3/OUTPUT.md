# Full-browser attempt 3 — top-reset timeout preserved

All seven 390px measured cases passed. Before the first 768px case, the
baseline image traversal left a deep element as Chromium's focus/scroll anchor;
the enforced `scrollY === 0` check timed out after three seconds. The harness
stopped with:

```text
page.waitForFunction: Timeout 3000ms exceeded
at settle (.../browser-qa-r2.mjs:27:835)
```

The correction explicitly focuses the document body with `preventScroll`
before forcing the top reset. It does not alter the derived output, thresholds
or browser verdicts.
