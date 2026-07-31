# SAT-016 — Control-Plane Validator Boundary

**Date:** 2026-07-31  
**Owner:** Codex  
**State:** accepted boundary  
**Chosen route:** document the post-ratification invocation boundary; do not rewrite the frozen validator

## Finding

`python3 scripts/validate-maplemoon-control-plane.py` currently returns:

`BLOCK: exactly eight V2 lock rows required`

Its self-test passes:

`PASS self-test: positive fixture and all named negative fixtures`

The validator is pinned to the pre-ratification V2 candidate and its exact eight-row lock set. The live manifest now contains accepted `CTRL-V2-P04` ratification records, so a current-state invocation is expected to fail closed.

## Ruling

- The validator remains historical candidate validation evidence.
- `--self-test` remains valid for testing its fail-closed logic.
- A normal invocation must not be used as a Saturday-review acceptance gate after P04.
- The validator is not modified or silently broadened to accept later records.
- Before the next control-plane mutation phase, Codex must prepare a successor validator bound to the ratified manifest schema and obtain separate admission.

This ruling changes no lock, WIP, theme, catalogue, external system or Git state.
