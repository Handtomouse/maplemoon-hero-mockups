# Full-browser attempt 5 — post-decode scroll anchor preserved

The first case stopped because an eager image decoded after the initial top
reset and Chromium's scroll anchoring changed `scrollY` again. The final test
setup disables scroll anchoring, then performs a bounded exact reset after all
image load/decode promises. Geometry and overflow thresholds remain exact.

```text
Error: top reset failed without image traversal
```
