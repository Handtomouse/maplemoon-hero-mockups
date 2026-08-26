# MapleMoon homepage style finish R6 — diagnostic HOLD

Packet: `MAPLEMOON-HOMEPAGE-STYLE-FINISH-R6-20260825T175303`

## Disposition

**HOLD / FAILED REQUIRED CLOSE CHECK.** R6 is not certified, promoted, ingested or deployed.

Authoritative attempt-003 result:

```text
HOMEPAGE_STYLE_AUTOMATED_QA FAIL widths=5/5 proofs=120/120 contacts=60/60 review_sheets=11/11 additional=16/16 semantic=PASS starter_clearance=PASS carousel=PASS newsletter_equivalence=PASS integration=HOLD positive_controls=12/12 close_pins=FAIL live_rebase=HOLD
```

The R6 candidate itself passed every automated candidate-owned requirement. The required close gate failed because a separately authorised founder lane changed the frozen read-only file `_wip/our-story.WIP.html` during the browser run: acquisition SHA-256 `6832fc31b8f93734592800c3cda55f8c94146f7d9951172d5795bb4fb78ab037`; close SHA-256 `b58bdc44b5af463089d4a74c49558ea8de1c3965fa628363a60f0e4010466cb6`. BOSS confirmed that writer had direct Nate authority and subsequently stopped further WIP edits. R6 nevertheless must stop under its exact frozen-path rule.

## Candidate-green evidence

- R5→R6 semantic CSS diff PASS: exactly one `padding-inline: 14px` → `18px` change; reverse equality PASS.
- Flow, text, links, controls, media, scripts and structured-data projections match the sealed baseline at all five exact widths.
- Exact CDP widths 1440, 1024, 768, 390 and 320 all PASS; zero candidate runtime, broken-image, target-size, root-overflow or unexpected semantic-overflow failures.
- Starter fan clearances left/right are 2.313965/2.313965px at 1440; 4.345371/4.345398px at 1024; 3.728035/3.743652px at 768; 9.661724/9.661713px at 390; and 11.458092/11.458099px at 320. `.sbox` and `.sbox-grid` both retain `scrollWidth == clientWidth` at every width.
- Hotspots, comparison, farm credit, starter, trust contrast, mobile centring, menu, focus, reduced motion and exact button/control gates pass.
- 120/120 proofs, 60/60 contacts, 11/11 review sheets and 16/16 additional-state captures are nonblank.
- Bounded carousel traversal/containment PASS; inherited newsletter baseline/candidate equivalence and zero side effects PASS while integration remains separately held.
- Twelve of twelve positive controls were caught.
- Sealed snapshot, baseline, R5 candidate/evidence, R6 candidate, packet, builders, receipts, proof files and all other acquired frozen paths remained stable.

## Attempts and visual-review status

- Attempt-001 preserved the successful acquisition/tree/semantic gates, then the sandbox denied localhost binding with `EPERM`; no browser evidence was produced.
- Attempt-002 produced a full green proof set, but its new desktop right-clearance metric referenced the whole two-column `.sbox` rather than the actual fan grid. Its images remain valid, but its clearance values are non-authoritative.
- Attempt-003 corrected only that harness reference, regenerated the complete evidence suite and is authoritative for candidate measurements. It failed solely at the concurrent Our Story close pin.
- No independent R6 visual verdict file was delivered before closure. The 11 attempt-003 sheets are preserved for the separately checkpointed stable-pin certification successor; missing independent review is an additional unresolved certification requirement, not a candidate failure.

The moving live homepage remains outside the sealed build input and requires a later separately authorised rebase. Newsletter integration remains a separate inherited HOLD.

No source, candidate, builder, predecessor, Git, Shopify, Vercel, deploy, production or client state was mutated by QA. Promotion was not run.
