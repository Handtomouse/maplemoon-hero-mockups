# MapleMoon soft-launch analysis template

**Status:** blank local template; no data has been collected  
**Use:** only after the test plan, artifact, participants, notice, data handling and analysis owner are separately approved

## Run identity

- Test run ID:
- Frozen artifact and hashes:
- Approved cohort codes:
- Start/end window:
- Invitation/access approval:
- Notice/consent disposition:
- Data owner and analyst:
- Storage, retention and deletion date:
- Event-schema version:
- Known deviations:

## Integrity checks

- [ ] All records have `test_data=true`.
- [ ] No production events are included.
- [ ] No prohibited property or raw sensitive text is present.
- [ ] Event counts reconcile with the export manifest.
- [ ] Duplicate/retry handling is documented.
- [ ] Missing events and technical outages are quantified.
- [ ] Raw access and deletion are tested under the approved plan.

## Q1 — comprehension and navigation

- Task denominator:
- Completed / partly / not completed:
- Core navigation funnel by coarse device family:
- Common first wrong turn:
- Comprehension themes, de-identified and paraphrased:
- Evidence limitations:
- Recommended action:

## Q2 — product discovery and mock cart

- Product-interest funnel denominator:
- Product interest → mock Add to Cart:
- Mock Add to Cart → cart open:
- Cart open → checkout start:
- Checkout start → fake confirmation:
- Most common exit step:
- Any confusion between mock and real commerce:
- Evidence limitations:
- Recommended action:

## Q3 — factual/content and asset confidence

- Factual/content corrections by page and section:
- Missing/wrong asset reports by page and section:
- Repeated issue threshold selected before the run:
- Items requiring Carli/Dylan evidence rather than implementation:
- Claims held rather than inferred:
- Recommended action:

## Q4 — accessibility and device usability

- Phone / tablet / desktop task outcomes:
- Keyboard/focus reports:
- Literal 200% zoom reports:
- Reading/contrast/motion reports:
- Layout overflow or clipped-control failures:
- Evidence limitations:
- Recommended action:

## Q5 — breakage and abandonment

- Technical failures by category, page and section:
- Feedback-open → submit rate:
- Feedback abandonment by last completed step:
- Broken link/image/asset incidents:
- Critical stop conditions triggered:
- Recommended action:

## Severity triage

| Severity | Definition | Action |
|---|---|---|
| Critical | Misleading factual/commerce state, internal exposure, privacy/security failure or unusable core journey | Stop the test and quarantine the artifact |
| Major | Repeatable broken journey, inaccessible control or severe mobile/zoom defect | Hold expansion and admit one bounded correction packet |
| Minor | Local polish issue that does not mislead or block a task | Record for closure; do not change frozen scope mid-run |
| Preference | Subjective design choice without a defect | Aggregate separately and avoid majority-vote design by default |

## Cohort comparison

Report only coarse, approved cohorts. Do not identify a participant or infer demographics, health, lifestyle, income or purchase propensity. Small-sample differences are directional observations, not statistical proof.

| Measure | Internal QA | First-look family/friends | Client review | Limitation |
|---|---:|---:|---:|---|
| Core navigation completion |  |  |  |  |
| Mock cart completion |  |  |  |  |
| Feedback completion |  |  |  |  |
| Technical failure rate |  |  |  |  |
| Clarity confidence |  |  |  |  |

## Decisions and closure

- Safe changes supported by repeated evidence:
- Issues needing Nate:
- Issues needing Carli/Dylan or source assets:
- Issues requiring privacy/security review:
- Changes explicitly not supported by the evidence:
- Next bounded packet:
- Raw-data deletion verified by/date:
- Final aggregate path and hash:

## Reporting rule

Publish no external report and make no production, catalogue, Shopify, analytics or design decision solely from this template. Preserve denominators, failures, missing evidence and the limits of the small non-representative sample.
