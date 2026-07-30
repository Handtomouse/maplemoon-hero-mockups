# GOV-01 Reconciliation Receipt — 2026-07-30

**Status:** Local governance reconciliation recorded; no external or Git action taken.
**Scope:** Exactly this receipt and the appended amendment to `GOV-01_RATIFIED_LEDGER.md`.
**Coordinator:** Nate / Codex governance lane
**Timezone:** Australia/Sydney

## Local acceptance and ratification status

On 2026-07-30, Nate accepted the local governance reconciliation execution route. This is local acceptance of this bounded reconciliation only; it is not production approval, external approval, client approval, Shopify/WooCommerce approval, or authorization to contact, publish, deploy, commit, push, reset, revert, or mutate external systems. The older master plan remains a draft/historical candidate pending a formal successor plan.

## 1. Read-only baseline

The worktree was clean before the 2026-07-30 reconciliation. After reconciliation, exactly two expected governance paths are dirty: `docs/orchestration/GOV-01_RATIFIED_LEDGER.md` (modified) and `docs/orchestration/GOV-01_RECONCILIATION_RECEIPT_20260730.md` (untracked). No other path is dirty. Because the receipt is untracked, ordinary `git diff` does not include it; it was checked separately with the untracked-file listing, direct inspection, and a no-index whitespace check.

| Check | Result |
|---|---|
| Branch | `codex-maplemoon-section-review` |
| HEAD at baseline | `a9ffe00783a71051178b866762952086bc581153` (`a9ffe00`) |
| Worktree before reconciliation | Clean |
| Worktree after reconciliation | Exactly two expected governance paths dirty; no other path dirty |
| `git diff --check` | Passed for worktree and index |
| Commit incident relation | Handoff reports six commits after `b15c070`; independent `rev-list` count is seven, including `720e014` |
| `LOCK_MANIFEST.json` | Valid JSON; one released historical row; no held or reserved lock |
| Active packet state | `active-governance-only`; no mutating packet admitted |
| WooCommerce export | Absent locally |
| Secret/credential scan | No secret or credential pattern found in the reviewed evidence set |
| External action | None; no contact, upload, deployment, send, access, or mutation |

The lock state is deliberately recorded as **one released historical row; no held lock**. The stale “empty manifest” wording is corrected in this receipt and the ledger amendment only; `LOCK_MANIFEST.json` was read-only and is unchanged.

## Files read and changed

Files read for this local reconciliation:

- `AGENTS.md`
- `_wip/_HANDOFF_CODEX_20260730_COMMIT_NOTICE.md`
- `docs/orchestration/GOV-01_RATIFIED_LEDGER.md`
- `docs/orchestration/GOV-01_RECONCILIATION_RECEIPT_20260730.md`
- `docs/orchestration/LOCK_MANIFEST.json`

Files changed, and only these files changed:

- `docs/orchestration/GOV-01_RATIFIED_LEDGER.md`
- `docs/orchestration/GOV-01_RECONCILIATION_RECEIPT_20260730.md`

`docs/orchestration/LOCK_MANIFEST.json` was checked separately and was not changed.

## Commands and checks performed

- `git rev-parse --verify HEAD` — `a9ffe00783a71051178b866762952086bc581153` (`a9ffe00`).
- `git status --porcelain=v1 --untracked-files=all` — exactly the two expected governance paths listed above after reconciliation.
- `git diff --name-only` — listed the modified ledger; it does not include the untracked receipt.
- `git ls-files --others --exclude-standard` — separately listed the untracked receipt.
- `shasum -a 256 docs/orchestration/LOCK_MANIFEST.json` — pre-edit hash recorded; post-reconciliation hash must match.
- `jq -e . docs/orchestration/LOCK_MANIFEST.json` — valid JSON.
- `git diff --check` on both admitted governance paths, with the untracked receipt checked separately using no-index mode — passed with no whitespace errors.
- Forbidden-path review — no path outside the two admitted governance paths was changed.
- No commit, push, reset, revert, cleanup, external access, client contact, deployment, or production action was performed.

## 2. Source hierarchy and authority

1. Client-approved retail catalogue: authority for intended retail products, prices, and sell options.
2. WooCommerce live state/export: operational authority and comparator until controlled cutover.
3. Carli-approved content and claims: authority for approved copy and claims.
4. Codex governance records and admitted receipts: authority for evidence, locks, packet admission, verification, and replanning.
5. `_wip` and older plans/handoffs/pricing specifications: layout, research, or historical evidence only.

If retail approval is absent, the value is `unknown` / `approval-required`. WIP layout and product-card text do not establish catalogue truth.

## 3. Content, layout, and launch boundaries

- `_wip` remains layout-only review evidence. Founder assets and approved founder inputs are required before theme/page implementation.
- Stockists remain provisional until verified against a client dataset.
- Testimonials remain placeholders until written wording, attribution, and permission are recorded.
- Marketing email may be prepared as a draft but is omitted from the first launch.
- Analytics waits for consent, privacy, event, and retention controls.

## 4. Owners

| Owner | Responsibility |
|---|---|
| Nate | Coordinator, external authority, and launch approval |
| Carli | Client/business facts and content/claims |
| Codex | Evidence, locks, packet admission, verification, and replanning |
| Sol | Advisory synthesis and replanning |
| Claude | Bounded admitted worker; no default WIP, ledger, lock, or external access |

## 5. Shopify gate

**OPEN/UNVERIFIED.** This is a gate status, not permission to access or mutate Shopify. Before any future external access, require an isolated environment, no live mutation, named least privilege, 2FA, expiry/revocation, no credentials in the repository, and Nate approval.

## 6. CAT-01 prerequisite and future export receipt

`CAT-01` is **BLOCKED** until both a fresh WooCommerce export and the approved retail catalogue are received. The future export receipt must include:

- receipt ID, received timestamp, source system, exact source file/path, file hash, exporter/authority, and row count;
- schema/field mapping for product, SKU, handle, variant, name, size/weight, price/currency, sell option, availability, and stock;
- comparator scope, conflicts, reconciliation disposition, approval reference, and evidence paths;
- explicit PII scan result and exclusion statement: no customer, order, contact, payment, or other raw PII fields are copied into the catalogue ledger.

The next admissible step is read-only `CAT-01A` provenance extraction into a newly named output path with a coordinator-granted held lock. It may not edit WIP, theme, feedback, pricing specifications, or external systems.

## 7. Communication state

`MESSAGE_DRAFT.md` and `CONFIDENCE_AUDIT_20260729.md` are retained as evidence of the historical sent/read-back state. `SEND_GATE_REPORT_20260729.md` is historically inconsistent with that state because it records no message or upload. The contradiction is recorded, not silently resolved. No one is to be contacted for this reconciliation.

## 8. Legacy and historical register

Legacy `.planning`, root `PLAN.md`, older WIP handoffs/pricing specifications, and the current draft are evidence/historical candidates, not execution authority. The active local authority is the ratified ledger as amended here and any later explicitly admitted packet.

## 9. 30 July commit incident

The handoff `_wip/_HANDOFF_CODEX_20260730_COMMIT_NOTICE.md` records six commits after `b15c070`, current HEAD `a9ffe00`, a clean worktree, push held, no complete pre-commit hash manifest, and no reset/revert/push. The independent baseline check found full HEAD `a9ffe00783a71051178b866762952086bc581153` and seven descendants after `b15c070`; the difference is retained as a historical evidence discrepancy. This reconciliation performs no reset, revert, commit, or push.

## 10. Forbidden actions and blockers

Forbidden without separate approval and an admitted packet: Shopify/WooCommerce/Vercel/DNS/MX/email/analytics/payment/webhook/customer-data actions; client contact; deployment; WIP/theme/assets/pricing/content edits; `.planning`, `docs/plans`, or legacy edits; lock-manifest edits; commit, push, reset, revert, or cleanup.

Blockers are the absent fresh WooCommerce export and approved retail catalogue, unverified Shopify access controls, missing founder assets/inputs, provisional stockist data, testimonial permission, analytics controls, and the historical count/communication discrepancies recorded above.

## 11. Next gate

Wait for the fresh WooCommerce export and approved retail catalogue. Validate provenance, schema, PII exclusion, and reconciliation fields; then decide whether to admit `CAT-01A`. No external action or mutating packet is authorised before that gate.

## Residual risks

The fresh WooCommerce export and approved retail catalogue are absent; Shopify access controls remain unverified; founder assets/inputs, verified stockist data, testimonial permission, and analytics controls remain incomplete. The historical communication/count discrepancies and the six-versus-seven descendant commit-count discrepancy remain preserved rather than resolved. The older master plan has no formal successor yet.

## Unresolved questions

- When will the fresh WooCommerce export and approved retail catalogue be supplied and formally accepted as CAT-01 inputs?
- Who will issue and ratify the formal successor plan to the older draft/historical master plan?
- What evidence will reconcile the handoff's six-commit report with the independent seven-descendant count after `b15c070`?

## Verification evidence

- Only the two paths named in the scope were written.
- `LOCK_MANIFEST.json` was not edited and remains valid JSON with one released row and no held/reserved lock.
- HEAD and branch remained unchanged during the write.
- No commit, push, reset, revert, cleanup, client contact, external access, deployment, or other external action occurred.
