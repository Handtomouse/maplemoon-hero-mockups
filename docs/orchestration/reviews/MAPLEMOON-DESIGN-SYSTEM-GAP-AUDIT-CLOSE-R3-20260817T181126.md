# MapleMoon design-system gap audit recovery close R3 — failed browser gate

Date: 2026-08-17 AEST  
Worker task: `019ff65f-fd33-7e51-8a83-360ba2f8d665`  
Packet: `MAPLEMOON-DESIGN-SYSTEM-GAP-AUDIT-CLOSE-R3-20260817T181126`  
Disposition: **FAIL — PLANNING AUDIT NOT ADMITTED BY R3**

## Outcome

The isolated R3 recovery path was created without changing the failed R2 evidence or any protected site, candidate, Styles Kit, Shopify, Git, deployment, production or client surface. Recovery checkpoint and `phase=start` passed. All protected pins passed. The R3 browser harness was mechanically proven byte-for-byte equal to the inherited harness after exactly two changes: `OUT` and `PORT`.

The one permitted browser run then failed 1 of 28 route/width rows. Home at 1024 aborted the request for `assets/licensed/carob_farm/australian-carob-0205-mobile.jpg` with `net::ERR_ABORTED`. The row is correctly classified `runtime-request-errors`; the command exited 1. It was not retried, suppressed, waived or reclassified.

Therefore this R3 close is failed. The preserved 40-finding audit is unchanged but is not newly admitted by this recovery close. No promotion was run.

## Recovery and pin evidence

- Checkpoint: `/Users/handtomouse/maplemoon-website/_wip/checkpoints/MAPLEMOON-DESIGN-SYSTEM-GAP-AUDIT-CLOSE-R3-20260817T181126_20260817_181348_AEST`
- Checkpoint result: `PASS checkpoint packet=MAPLEMOON-DESIGN-SYSTEM-GAP-AUDIT-CLOSE-R3-20260817T181126 files=3 path=/Users/handtomouse/maplemoon-website/_wip/checkpoints/MAPLEMOON-DESIGN-SYSTEM-GAP-AUDIT-CLOSE-R3-20260817T181126_20260817_181348_AEST`
- Start result: `PASS packet=MAPLEMOON-DESIGN-SYSTEM-GAP-AUDIT-CLOSE-R3-20260817T181126 phase=start scope=3`
- Packet SHA-256: `a5698ba48f8e15a63800bb29755412d610e21b2c66b4b7ce935ec3b961b5f659`
- Checkpoint manifest SHA-256: `099ac12f1717f13f3eda6918a563bcb6dee7985f575ef40171133a90a6e1eb70`
- Failed R2 predecessor evidence remained pinned at `VISUAL-QA.json` SHA-256 `003fc78930f5bbb638d9359be32c21d28985bb1e7e7392381d0c93cca2ae5b8a` and evidence-tree SHA-256 `7528133f77269d3168568796a84f863d9a9cf2f206d3b4b24a2ec13cbf0d56aa`.
- Close replay before browser acquisition: `READONLY_CLOSE_R3 PASS file_pins=37 directory_pins=4 directory_files=933 routes=7 counts=68/12/70`
- Normalized parity: `BROWSER_PARITY PASS changed_constants=OUT,PORT changed_lines=2 port=8799`
- Positive control: `POSITIVE_CONTROL PASS mutated_read_only_pin=true`

## Browser evidence

- Command: `node /Users/handtomouse/maplemoon-website/_wip/evidence/design_system_gap_audit_close_r3_20260817T181126/verify-current-site-browser-r3.mjs --url https://maplemoonbuild20260813-m49nihfds-handtomouses-projects.vercel.app --widths 1440,1024,768,390`
- Exit code: `1`
- Rows: `27 PASS / 1 FAIL`
- Screenshots: `56` nonblank files produced by the harness (`28` top + `28` full).
- Contact sheets: `4` nonblank files produced by the harness.
- Browser positive controls: `PASS` for missing route, overflow, broken image, blank proof and width-set rejection.
- Failure: `homepage / 1024 / http://127.0.0.1:8799/assets/licensed/carob_farm/australian-carob-0205-mobile.jpg / net::ERR_ABORTED / runtime-request-errors`.
- R3 `VISUAL-QA.json` SHA-256: `4126c9a1870bde860ace931bc4c126f13e2305eae10a707f78e7b81b4dc6dd64`.
- Literal browser output: `/Users/handtomouse/maplemoon-website/_wip/evidence/design_system_gap_audit_close_r3_20260817T181126/BROWSER-RUN-OUTPUT.txt`.

## Visual inspection

All four contact sheets and all 56 screenshot proofs were opened and inspected. Every proof is visibly nonblank and the intended route is recognisable. The inspection also records existing design-gap evidence without changing harness semantics, including Home starter-box clipping at 768, narrow FAQ chip clipping and centred-wordmark/cart crowding on several 390 headers.

Inspection record: `/Users/handtomouse/maplemoon-website/_wip/evidence/design_system_gap_audit_close_r3_20260817T181126/VISUAL-INSPECTION.md`

## Verifiers

- Browser verifier SHA-256: `670ce718e1387e60a6c51efb12fe38a11a0fcd1d06dd59f66b2491ad31fad5b9`
- Design-gap verifier SHA-256: `e5709f4df890b3e27cf2e8000e64257e4aaa1e55d5976d5c4ea2dfff674334dc`
- Read-only close verifier SHA-256: `12bb693582939b2888b86e4a129b47ef67291c687f02cf04e7054435f46d383d`
- Syntax result: `SYNTAX PASS node=1 python=2`.
- The design-gap verifier was not run after acquisition because the packet explicitly requires a failed browser run to close FAIL without advancing to the PASS-only verifier sequence.

## Authority and holds

- Counts remain exactly `68 rules / 12 decisions / 70 tokens`.
- No rule, decision, token, content, media, fog, font, responsive, runtime, base or production status changed.
- The default editorial-section-composition decision remains paused and unanswered. No option was inferred or recorded.
- The original audit report, matrix and source manifest remain byte-identical to their packet pins.
- R2 remains failed evidence only and is not current, approved or promoted.
- The R3 visual proof is failed-run evidence only; it is not candidate approval or implementation authority.

## Changed paths

Only the packet's three exact writable paths changed:

1. `/Users/handtomouse/maplemoon-website/_wip/evidence/design_system_gap_audit_close_r3_20260817T181126`
2. `/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/MAPLEMOON-DESIGN-SYSTEM-GAP-AUDIT-CLOSE-R3-20260817T181126.md`
3. `/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/MAPLEMOON-DESIGN-SYSTEM-GAP-AUDIT-CLOSE-R3-20260817T181126.json`

## Next action

Root BOSS should replay this failed R3 receipt and decide whether a fresh checkpointed successor may investigate the deterministic 1024 Home image-request abort without weakening browser telemetry.
