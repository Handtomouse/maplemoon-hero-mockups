# MapleMoon homepage style finish R5 — diagnostic HOLD

Packet: `MAPLEMOON-HOMEPAGE-STYLE-FINISH-R5-20260825T171625`

## Disposition

**HOLD / FAILED REQUIRED CHECK.** R5 is not certified, promoted, ingested or deployed.

Authoritative automated result:

```text
HOMEPAGE_STYLE_AUTOMATED_QA FAIL widths=4/5 proofs=120/120 contacts=60/60 review_sheets=11/11 additional=16/16 carousel=PASS newsletter_equivalence=PASS integration=HOLD positive_controls=12/12 close_pins=PASS live_rebase=HOLD
```

The sole candidate-owned failure is exact 1440 starter containment. `.sbox` starts at x=160px; its first rotated packshot starts at x=158.07708740234375px, escaping the semantic container by 1.92291259765625px (reported as 1.923px). Exact 1024, 768, 390 and 320 measurements pass.

## Independent visual review

The independent reviewer inspected all 11 attempt-003 sheets across 1440, 1024, 768, 390 and 320. Hero/header, hotspots, comparison, farm credit, all four story boundaries, sampler-to-trust continuity, trust contrast, footer, mobile containment and MapleMoon brand quality pass visually. Starter containment is the only FAIL/REVISE result, so no overall visual PASS is claimed.

The 320 `Shop Now` rim in the `#top` locator is capture-only: the 140×48px control belongs to `#range`, is fully present in the range/full-page proof and only overlaps the locator boundary. The 320 newsletter placeholder truncation is inherited and equal in baseline/candidate; the explicit disclaimer and `DEMO ONLY` label remain visible.

## Exact R6 correction supported by evidence

R6 should change only the starter grid inset from 14px to 18px:

```css
html body .wf #sampler.q-sampler .sbox-grid {
  padding-inline: 18px !important;
}
```

A read-only injected-value probe measured left/right clearance at 18px as: 2.314/2.314px at 1440; 4.345/4.345px at 1024; 3.728/3.744px at 768; 9.662/9.662px at 390; and 11.458/11.458px at 320. The same probe found 17px insufficient at 1440. It also retained `scrollWidth == clientWidth` for `.sbox` and its grid and root overflow zero at all five widths. This probe did not mutate R5.

## Passed evidence and preserved holds

- Flow, text, media and control projections match the sealed baseline; `q-segments` remains absent; exact buttons and all task-owned component gates pass apart from the one containment result.
- 120/120 proof captures, 60/60 contact sheets, 11/11 review sheets and 16/16 additional interaction proofs are present and nonblank.
- The bounded inherited carousel exception passes, including pointer/keyboard traversal of all six products and the real `.wf{overflow:hidden}` clipping ancestor.
- Newsletter baseline/candidate runtime equivalence and zero network/storage side effects pass, but newsletter integration remains a separate inherited HOLD.
- Twelve of twelve positive controls were caught.
- Sealed snapshot, baseline, candidate, packet, builder, predecessor and frozen non-Home close pins pass. The moving live homepage differs from the sealed snapshot, so later ingestion still requires a separately authorised rebase.

Authoritative evidence: `qa-attempts/attempt-003`. Independent verdict: `INDEPENDENT-VISUAL-REVIEW.md`. Earlier attempts remain preserved as non-authoritative diagnostics.

No source, candidate, builder, receipt, Git, Shopify, Vercel, deploy, production or client state was mutated by QA. Promotion was not run.
