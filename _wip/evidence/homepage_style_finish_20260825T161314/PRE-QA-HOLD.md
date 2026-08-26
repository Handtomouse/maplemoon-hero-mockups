# Homepage style finish R1 — PRE-QA HOLD

The deterministic non-overwriting builder and its first derived root were
created successfully from the pinned source, but BOSS review found three
literal mismatches against the packet's required QA contract before browser
certification:

1. `@media (max-width:600px)` reduced governed hotspot text to `12px`; the
   contract requires at least `14px` at every measured width.
2. The farm photography credit used `.68rem`; the contract requires at least
   `14px` and line-height at least `1.4`.
3. At `768px`, `.q-compare-pro` remained two-column; the contract requires the
   comparison to stack at `768px`, `390px` and `320px`.
4. The inherited `#sampler{...!important}` rule beat the new class selector,
   leaving a pale sampler surface with cream text; R2 must bind the real ID and
   neutralise its inherited pseudo-layer.

No browser PASS is claimed. The initial derived root is preserved unchanged as
`FAILED_PRE_QA / NOT_ADMITTED`. It must not be promoted, ingested or deployed.
The frozen homepage, existing preview builder, preview, production and Git were
not changed by this attempt.
