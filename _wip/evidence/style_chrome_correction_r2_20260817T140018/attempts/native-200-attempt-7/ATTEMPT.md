# Native-200 attempt 7

Outcome: **CANDIDATE FAIL — Shop target still outside the viewport at 100ms.**

Cache was disabled and the current runtime loaded, but the page's smooth-scroll
policy meant `behavior: auto` could remain animated; the audit correctly found
the target had not been reached at the observation point. The generated R2
handler now temporarily forces root `scroll-behavior: auto`, performs the same
numeric scroll synchronously, restores the prior inline value, then focuses the
target. This strengthens reduced-motion and deterministic keyboard behaviour;
the destination and all pass thresholds remain unchanged.
