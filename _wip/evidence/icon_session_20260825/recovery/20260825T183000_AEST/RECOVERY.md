# Recovery checkpoint — icon v2 review phase

Created before the first v2 review write.

## Exact writable paths

- `_wip/evidence/icon_session_20260825/v2_review/` — new review-only directory; no pre-existing content.
- `scripts/build-maplemoon-icon-v2-review.mjs` — new builder; no pre-existing content.
- `scripts/check-maplemoon-icon-v2-review.mjs` — new verifier; no pre-existing content.

## Protected state

- The seven WIP route files are not writable in this phase.
- `assets/icons/` v1 remains unchanged as rejected/HOLD evidence.
- Approved packaging assets under `_wip/deliverables/MapleMoon_External_Designer_Icon_Kit_20260825/` and `assets/brand/` are read-only authorities.
- No deploy, upload, client message or baseline rehash is authorised.
