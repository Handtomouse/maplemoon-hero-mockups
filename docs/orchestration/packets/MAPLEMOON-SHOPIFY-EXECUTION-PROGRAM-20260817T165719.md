# MapleMoon Shopify execution program — 2026-08-17 16:57 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-SHOPIFY-EXECUTION-PROGRAM-20260817T165719",
  "worker_thread_id": "/root",
  "state": "boss_program_issued",
  "objective": "Sequence the approved MapleMoon Shopify migration and launch decisions into fail-closed phases without treating the decision register as blanket mutation or publication authority.",
  "authority": "Nate approved SHOP-001 through SHOP-068 in the durable Boss ledger. Each external mutation still requires its own later packet, exact base identity, non-overwriting recovery checkpoint, phase=start PASS, bounded writable scope, verification receipt and Boss promotion decision.",
  "base": {
    "boss_ledger": "/Users/handtomouse/maplemoon-website/docs/orchestration/MAPLEMOON_BOSS_EXECUTION_LEDGER_20260816.md",
    "boss_ledger_sha256": "82735f8eaa9aea90923a2f84717260f5055500aa1d7f69f1adea0693b57abf43",
    "approved_shop_decisions": 68,
    "store_handle": "maplemooncarob",
    "current_store_boundary": "development/client-transfer store, password protected, unpublished work only",
    "production_authority": "SHOP-042: explicit Nate instruction only"
  },
  "readable_paths": [
    "/Users/handtomouse/maplemoon-website/docs/orchestration/MAPLEMOON_BOSS_EXECUTION_LEDGER_20260816.md",
    "/Users/handtomouse/maplemoon_shopify_groundwork_20260815/PLAN.md",
    "/Users/handtomouse/maplemoon_shopify_groundwork_20260815/THEME_MAP.md",
    "/Users/handtomouse/maplemoon_shopify_groundwork_20260815/DATA_GAP.md",
    "/Users/handtomouse/maplemoon_shopify_groundwork_20260815/NATE_CHECKLIST.md",
    "/Users/handtomouse/maplemoon_shopify_groundwork_20260815/BLOCKED.md",
    "/Users/handtomouse/maplemoon_cat01a_20260815/LEDGER.md",
    "/Users/handtomouse/maplemoon_cat01a_20260815/ledger.csv",
    "/Users/handtomouse/maplemoon_cat01a_20260815/CONFLICTS.md",
    "/Users/handtomouse/maplemoon_cat01a_20260815/NEEDED.md",
    "/Users/handtomouse/Library/Messages/Attachments/e0/00/3631B118-5A32-487A-8E55-C0533B3B96CB/Maple Moon Store CSV File Export.csv"
  ],
  "writable_paths": [],
  "method": [
    "S0 baseline and identity: read-only store/theme/catalogue/settings acquisition, exact recovery capture and Ethereal-versus-Etheryx reconciliation",
    "S1 theme safety: after S0 PASS, checkpoint and back up the exact installed theme, create a second unpublished duplicate, update only that duplicate to the approved version and prove the original is unchanged",
    "S2 catalogue staging: after exact backup and mapping approval, model the governed 24 products, 204 stockists and required metafields, then import/update/archive in independently reversible batches while password protection remains on",
    "S3 theme port: implement the admitted candidate and approved shared rules in the unpublished duplicate using native Shopify commerce boundaries; every additional design improvement remains visual-proof and Nate-approval gated",
    "S4 operations: after Maple Moon supplies the missing owner, address, mailbox, policy, weights and identifiers, configure AU-only shipping, GST-inclusive tax treatment, inventory, checkout, forms, notifications and test payments in bounded packets",
    "S5 certification and private approval: certify the full store across catalogue, search, cart, checkout entry, accessibility, devices, performance, email and rollback; obtain Nate approval before one complete private Carli/Dylan review",
    "S6 cutover: only under a separate explicit Nate launch instruction, transfer ownership, select Basic monthly, activate real payments, connect the domain without breaking mail, publish the certified theme and remove the password in one rollback-ready window",
    "S7 watch and handoff: run the 72-hour launch watch, two-week review, deliver the operating guide/training and later review HandToMouse collaborator access"
  ],
  "verify": [
    "each phase pins the prior phase receipt and every external object ID/hash it mutates",
    "each mutating phase has a timestamped non-overwriting recovery checkpoint before first write",
    "theme, catalogue, configuration, ownership, payment, domain and publication mutations are never combined merely for convenience",
    "no phase treats a passing build or QA result as production authority",
    "SHOP-001 through SHOP-068 remain unchanged unless Nate records an explicit superseding decision",
    "the current live/non-Shopify production alias is not moved by this program"
  ],
  "stop": [
    "an exact store, theme, product, variant, domain, payment or owner identity is unknown at the phase that would mutate it",
    "recovery is missing, incomplete, non-restorable or would overwrite an existing checkpoint",
    "a required client/accountant/legal input is guessed",
    "a required verification fails or a path/object outside the phase scope changes",
    "publication, password removal, ownership transfer, payment activation or domain cutover is attempted without the separately recorded authority required for that action"
  ],
  "forbidden_actions": [
    "treat this program as direct Shopify mutation authority",
    "record credentials, storefront passwords, session tokens, payout details or recovery codes in evidence",
    "publish a theme, remove storefront protection, activate payments, transfer ownership, change DNS, contact the client, commit, push or move production from this program packet"
  ],
  "next_reviewer": "MapleMoon root Boss after every phase receipt; Nate at every named approval boundary",
  "requires_visual_evidence": false
}
<!-- CONTROL-PLANE:END -->

## Admission rule

This program admits the sequence, not the mutations. The only immediately
executable successor is
`MAPLEMOON-SHOPIFY-BASELINE-IDENTITY-20260817T165719`, which is read-only
against Shopify and writes evidence/recovery/review files locally.

## Phase ledger

| Phase | Outcome | Current state | External mutation authority |
|---|---|---|---|
| S0 | Exact store/theme/catalogue/settings baseline and recovery identity | **PACKET ISSUED** | None; Shopify read-only |
| S1 | Original theme backup plus second unpublished 1.6.0 duplicate | **HELD ON S0 PASS** | Future exact packet required |
| S2 | Governed catalogue/metaobject staging and reversible imports | **HELD ON S1 + data gates** | Future batch packets required |
| S3 | Candidate-to-OS2 theme port on unpublished duplicate | **HELD ON S1/S2 + visual authority** | Future code/deploy packets required |
| S4 | Operational store configuration and test commerce | **HELD ON named client inputs** | Future setting-specific packets required |
| S5 | Integrated QA and private client review | **HELD ON S2-S4 certification** | Review approval only; no launch |
| S6 | Ownership, plan, payments, domain, publish and password removal | **FROZEN** | Separate explicit Nate instruction |
| S7 | Launch watch, operating handoff and access review | **HELD ON S6** | Bounded operational packets required |

## Critical interpretation

- The bought-theme fact does not prove whether the installed admin label
  `Ethereal` is the same product/version as the purchase record `Etheryx`.
  S0 must resolve that from exact evidence.
- Shopify remains password protected throughout S0-S5.
- The current theme is never updated in place.
- The Woo export is build authority only until a fresh pre-launch stock export
  is reconciled.
- Product imagery, Styles Kit overlays and design-gap findings remain governed
  by their own admission/approval records; this program does not silently
  promote them.

