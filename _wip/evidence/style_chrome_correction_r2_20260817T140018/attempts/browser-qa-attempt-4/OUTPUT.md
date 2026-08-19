# Full-browser attempt 4 — image traversal timeout preserved

All 390, 768 and 900 cases plus Home/Shop at 1024 passed. While settling the
Our Story desktop case, repeated `scrollIntoView` calls used solely to force
lazy images to load fought the deterministic top reset and the bounded reset
failed. The final harness sets each image to eager and awaits load/decode
without scrolling it into view; broken images remain a hard failure.

Literal terminal end:

```text
PASS measured=homepage width=1024 ... desktop_equal=true failures=none
PASS measured=shop width=1024 ... desktop_equal=true failures=none
Error: top reset failed after bounded retries
```
