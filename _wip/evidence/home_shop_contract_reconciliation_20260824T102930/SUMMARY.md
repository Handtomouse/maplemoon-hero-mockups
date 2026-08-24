# Home/Shop design-system contract reconciliation

Disposition: **PASS**.

- Home WIP is still exactly `a06d1e19165c84065e96c14eafd1f8e8d7e5a4228d877f0017ca191d1341c174`.
- Shop WIP is still exactly `f9d150dea283d43eb0a14e02dfeccf9ea1eb4eae87ec82a546ab6984f3fa5604`.
- `routes.v1.json` changes exactly the Home and Shop `baseline_sha256` bindings.
- `exceptions.v1.json` changes exactly the two existing Home `binding.source_sha256` values. No Shop exception exists or was added.
- After replacing those four new hashes with their checkpoint values in memory, both contract files are byte-identical to the recovery checkpoint.
- `node scripts/check-maplemoon-design-system.mjs --contracts-only` now reports PASS.
- `node scripts/check-maplemoon-design-system.mjs --route-conformance all` now reports PASS / ALL_PASS.

This is authority reconciliation for already-admitted source bytes. It is not a design-rule promotion, route implementation, Styles Kit mutation, deployment, production, Shopify or client action.
