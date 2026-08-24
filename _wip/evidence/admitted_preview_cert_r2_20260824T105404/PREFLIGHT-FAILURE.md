# R2 mandatory preflight failure

The R2 generated candidate passed its build, private-path, 14-case browser and design-system gates. The exact anonymous local preflight then returned exit `1` with:

```text
FAIL  leak:bare-204-visitor-copy   5 hit(s)
FAIL  leak:internal-ops-language   7 hit(s)
FAIL  leak:word-testimonial        1 hit(s)
VERDICT: FAIL (3) - leak:bare-204-visitor-copy, leak:internal-ops-language, leak:word-testimonial | 2 review-only hit(s) | WAIVED: root:homepage
Client-facing leak present. Do NOT send this link to Carli and Dylan.
```

The five bare-204 and seven internal-operations hits are in `stockists.html`. The testimonial hit is the Homepage sentence `Consent and final testimonial selection pending before go-live.` The review-only hits are not used as the failure reason.

The first restricted-process preflight attempt could not reach the already-running localhost server. It was an environment attempt only and made no candidate assertion. The identical preflight was rerun with read-only localhost access; it reached and checked all pages and produced the failure above.

Per packet stop rules, no content correction, source/WIP mutation, deployment or promotion was attempted. The local server was stopped cleanly after the failed preflight.
