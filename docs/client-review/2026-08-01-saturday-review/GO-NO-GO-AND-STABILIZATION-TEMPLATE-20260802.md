# MapleMoon go/no-go, rollback and stabilization record

**Template status:** unfilled; no authority conveyed

## 1. Candidate identity

- Decision date and time:
- Environment:
- Exact candidate URL or path:
- Branch and HEAD:
- Theme or package identifier:
- Source hashes:
- Manifest hash:
- Catalogue input hashes:
- Configuration inventory hash:
- Last-known-good identifier and hash:

If any required identity field is missing or has drifted, verdict is HOLD.

## 2. Named authority

| Authority | Name | Evidence path or approval ID | Status |
|---|---|---|---|
| Coordinator |  |  | HOLD |
| Nate visual/integration approval |  |  | HOLD |
| Client factual/content approval |  |  | HOLD |
| Store owner |  |  | HOLD |
| Security/integration reviewer |  |  | HOLD |
| Privacy/data owner |  |  | HOLD |
| Catalogue owner |  |  | HOLD |
| Domain/SEO owner |  |  | HOLD |
| Incident and rollback owner |  |  | HOLD |

## 3. UAT evidence summary

- Matrix version and hash:
- Required cases:
- PASS:
- HOLD:
- FAIL:
- Not run:
- Open S0:
- Open S1:
- Open S2:
- Accepted S3:
- Carli/Dylan exact-artifact approval:
- Nate exact-artifact approval:

Any S0, unresolved S1 or missing required evidence is NO-GO.

## 4. Recovery custody

| Recovery class | Exact artifact/path | Hash | Custodian | Rehearsed | Result |
|---|---|---|---|---|---|
| Theme source and export |  |  |  | No | HOLD |
| Catalogue source and transformed import |  |  |  | No | HOLD |
| Store configuration |  |  |  | No | HOLD |
| Apps and integrations |  |  |  | No | HOLD |
| Redirects, DNS and domain records |  |  |  | No | HOLD |
| Analytics and consent configuration |  |  |  | No | HOLD |
| WooCommerce recovery |  |  |  | No | HOLD |
| Last-known-good production artifact |  |  |  | No | HOLD |

## 5. Explicit production approvals

Record each separately. Blank means not authorized.

- Theme publish approval:
- Payment activation approval:
- Catalogue import approval:
- App/integration activation approval:
- Analytics/consent activation approval:
- Domain/DNS change approval:
- Redirect import approval:
- Public launch approval:
- WooCommerce transition approval:

## 6. Abort and rollback rules

- S0 trigger:
- S1 rollback trigger:
- Availability threshold:
- Checkout/order threshold:
- Payment/notification threshold:
- Redirect/indexing threshold:
- Privacy/security threshold:
- Maximum recovery time:
- Rollback operator:
- Rollback approver:
- Incident communication route:

## 7. Ordered cutover log

| Step | Planned action | Explicit authority | Operator | Start | End | Evidence | Result |
|---|---|---|---|---|---|---|---|
| 1 | Freeze accepted artifacts and hashes |  |  |  |  |  | HOLD |
| 2 | Reconfirm backups and recovery |  |  |  |  |  | HOLD |
| 3 | Apply separately authorized production changes |  |  |  |  |  | HOLD |
| 4 | Run priority smoke checks |  |  |  |  |  | HOLD |
| 5 | Begin stabilization monitoring |  |  |  |  |  | HOLD |

## 8. Stabilization record

- Window start:
- Window end:
- Coverage hours:
- Monitoring owner:
- Alert route:
- Availability result:
- Checkout and order result:
- Payment and notification reconciliation:
- Redirect and indexing result:
- Approved analytics result:
- Error and incident summary:
- Access and temporary-account cleanup:
- WooCommerce recovery disposition:

## 9. Accepted residual risk

| Risk | Severity | Evidence | Owner | Acceptance | Target date |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

S0 and S1 cannot be accepted for launch. S2 acceptance requires Nate, the relevant technical owner and any affected client owner. S3 acceptance must still have an owner and target date.

## 10. Verdict

- [ ] **GO**: every required case passes, recovery is rehearsed, owners and exact artifacts are named, and each production action is separately authorized.
- [ ] **NO-GO**: a stop condition, S0/S1, missing recovery, missing authority or unresolved evidence remains.
- [ ] **HOLD**: evidence is incomplete and no production action may begin.

Final verdict:

Signed by Nate:

Signed by store owner:

Signed by named client approver:

Recorded by coordinator:

## Current use

This template is local preparation only. It must not be pre-filled with assumptions or used as evidence that MapleMoon is ready to deploy, publish or launch.
