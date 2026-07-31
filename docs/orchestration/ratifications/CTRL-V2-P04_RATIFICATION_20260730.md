# CTRL-V2-P04 Ratification Receipt

**Packet ID:** `CTRL-V2-P04`  
**Purpose:** `CTRL-V2-RATIFY`  
**Candidate:** `CTRL-V2-CANDIDATE-20260730-001`  
**Decision owner:** Nate  
**Coordinator:** Codex  
**Decision received:** `2026-07-30T08:31:25Z`  
**Status:** `accepted` / `ratified`

## Nate's decision

> I ratify CTRL-V2-CANDIDATE-20260730-001 and authorize CTRL-V2-P04 to record ratification only. Retain the VIS Typekit render block and CAT input block. No commit, push, deploy, send, Shopify or production action.

The instruction is admitted as `NATE-LOCAL-AUTH-20260730-CTRL-V2-P04`.

## Baseline

- Branch: `codex-maplemoon-section-review`
- HEAD: `a6cd91a589ceff18283e4c6250ac256fe97812a4`
- GOV-01 ledger base SHA-256: `004cd5a0a6a4733f5c3b2517789b88655a443f9fdb27930f80eb954ad7273ffa`
- Receipt base state: absent
- July 29 historical draft: `docs/plans/2026-07-29-maplemoon-master-orchestration-plan-draft.md`
- July 29 historical draft SHA-256: `32b1072654844f88be2e2694ab3f24688f0a6fbdf79817ffca034adbdc0e330c`

## Frozen candidate binding

| Candidate artifact | SHA-256 of raw bytes |
|---|---|
| `docs/plans/2026-07-30-maplemoon-master-orchestration-plan-v2.md` | `3c453aa0e3bb60a894ad2a9d506da61930cadb482e961a7c227becb50d2a694e` |
| `docs/orchestration/MASTER_PACKET_REGISTER.md` | `300a0d5ac87bf27570df0e3de00a5f88da5a5efc043b57d37d7831d8d2029d7e` |
| `docs/orchestration/CONTROL_PLANE_INTERFACES.md` | `8c73f6bb37564a56b3d599ad74237f472393d911d6c57484cdb648229bf881e8` |
| `docs/orchestration/packets/CTRL-V2-P03.md` | `e579671bcff15bdec6b51cb110e2d73575938002f5444d679821f434b8f2ad02` |
| `docs/orchestration/packets/VIS-01A.md` | `1b507b1e76a9409cae903006ef33b3330f762b9f5026d981570923cf80b1013b` |
| `docs/orchestration/packets/CAT-01A-READ.md` | `4e2c218472066e605d3e85c90e20d06cdf0aab383cb44cc3a4363fa422b43f8a` |
| `scripts/validate-maplemoon-control-plane.py` | `55d19976be77be180fa9071accf2c7f3fcdcedcae956d1435f2e3d24b6dbf469` |

**Review-chain path:** `docs/orchestration/reviews/CTRL-V2-REVIEW_CHAIN.md`  
**Review-chain SHA-256:** `29b782011ab29e4e9ac0bc9abee324a936cee6372178a0e26fd305ea10e2a437`

## Disposition

1. The exact frozen candidate identified above is ratified and becomes the canonical local MapleMoon orchestration authority.
2. GOV-01 remains historical evidence. Its earlier permission for `CAT-01A` to write is superseded by V2: `CAT-01A-READ` is zero-write and inline only; only a separately admitted `CAT-01B-LEDGER` may persist output.
3. The July 29 draft remains unchanged, historical and non-authoritative.
4. The VIS rendered-review block is retained while the Carob chooser can request Adobe Typekit.
5. The CAT input block is retained until both required inputs exist and pass provenance, schema and PII checks.
6. Ratification does not authorize implementation or external action.

## Files read and changed

**Read:** frozen candidate artifacts, review chain, GOV-01 ledger, lock manifest and July 29 historical draft.  
**Changed by P04:** this receipt, the appended GOV-01 ratification amendment, and coordinator lock lifecycle fields in `docs/orchestration/LOCK_MANIFEST.json`.

No frozen candidate file, review-chain file, chooser, WIP, theme, content, asset, catalogue or external system is changed by P04.

## Verification and residual risk

- Pre-write candidate and review-chain hashes matched the P03 freeze pin.
- The branch and HEAD matched the recorded baseline.
- Both P04 paths had coordinator-owned held locks with matching base state before writing.
- Post-write hashes and lock release are recorded in `docs/orchestration/LOCK_MANIFEST.json`.
- The freeze pin is manual tamper detection, not filesystem immutability.
- The Carob chooser remains untracked review evidence and cannot be promoted by this receipt.

## Prohibited actions

No commit, push, deploy, send, client contact, Shopify, WooCommerce, Vercel, WIP/theme implementation, publication, cutover or production action is authorized.

## Next state

- `CTRL-V2-P04`: `accepted`
- `VIS-01A`: eligible for coordinator preparation only; rendered review remains blocked by Typekit
- `CAT-01A-READ`: blocked on the fresh WooCommerce export, approved retail catalogue and PII preflight

