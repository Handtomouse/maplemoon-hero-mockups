# Native-200 attempt 2

Outcome: **HARNESS HOLD — `Connection timed out`.**

All three isolated Chrome processes reached DevTools and all owned ports were
closed by cleanup. The accepted low-level CDP primitive retained its 15-second
socket timeout while three native-scale profiles initialised together. The R2
wrapper now records launch/control stages and extends only the socket transport
timeout to 60 seconds. Assertions, viewport targets and pass thresholds remain
unchanged.
