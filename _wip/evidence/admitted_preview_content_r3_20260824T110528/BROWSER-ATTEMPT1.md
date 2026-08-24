# R3 browser attempt 1 — paginated-evidence assumption

The full 14-case run had 12/14 cases green and only these two failures:

```text
FAIL stockists@390: unknown neutral 0/0
FAIL stockists@1440: unknown neutral 0/0
```

The candidate initially renders only the first result page. None of the seven UNKNOWN records appeared in that first slice, so the evidence harness could not observe their neutral treatment. The mandatory preflight independently passed with all internal status leaks at zero. Correction: on Stockists only, exercise the existing `Load more` control until it is hidden, then make the same exact seven-of-seven neutral assertion. No candidate or assertion value changes.
