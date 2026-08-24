# R3 required browser failure

After correcting two evidence-only pagination assumptions, the full browser run proved a candidate runtime defect at both Stockists widths:

```text
FAIL stockists@390: unknown neutral 0/0
FAIL stockists@1440: unknown neutral 0/0
```

All other 12 route/width cases passed. Static inspection identifies the exact inherited generated-runtime seam in `mock-cart.js`:

```js
document.querySelectorAll(".st-result.is-pending").forEach((element) => {
  element.hidden = true;
});
```

This runs after Stockists rendering and hides all seven UNKNOWN records. It directly conflicts with Nate's durable decision to publish all 204 records and show `Location details unavailable` for incomplete entries. It is not a content-data failure: R3 preserves 204/204 objects, seven UNKNOWN records and the exact governed field projection. Exact preflight and both design-system gates passed.

Per packet stop, R3 was not promoted or deployed. A successor must copy the exact R3 tree, remove exactly this generated-runtime hiding seam, leave every other runtime byte unchanged, and rerun the full certification.
