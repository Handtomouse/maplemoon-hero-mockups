# MapleMoon Shopify theme safety S1 — 2026-08-17 21:02 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-SHOPIFY-THEME-SAFETY-S1-20260817T210246",
  "worker_thread_id": "/root",
  "state": "ready_authorized_single_unpublished_duplicate",
  "objective": "Create exactly one unpublished duplicate of the current live Ethereal preset / Etheryx 1.4.0 theme, prove the live source and password-protected storefront remain unchanged, and recover both remote themes locally before any update, repair, port or publication work.",
  "authority": "Nate's direct 2026-08-17 instruction to continue in the Shopify-only Boss lane, combined with SHOP-002 and the completed S0 receipt, authorizes exactly one unpublished duplicate of live theme 154500595909. It does not authorize an update, edit, repair, push, publish, delete, rename after creation, product or store-global mutation, password removal, domain work, payment work or client contact.",
  "base": {
    "store": "maplemooncarob.myshopify.com",
    "source_theme_id": "154500595909",
    "source_admin_name": "Ethereal",
    "source_role": "live",
    "theme_family": "Etheryx",
    "theme_version": "1.4.0",
    "theme_author": "OpenThinking",
    "duplicate_name": "MapleMoon Private Review 20260817 S1",
    "source_theme_tree_sha256": "6f94b20a498fa0db7d3d4f602a04a783809689e75f95dbf234f802e8ec9c5dee",
    "s0_packet_sha256": "0a97e99137ff6ed019cdeb2652e6d328bdd2f80d9c30716a7d9024e69662018d",
    "s0_report_sha256": "b2761c71bba81835fe7e536b5e03e15a101ea99d444952d1d1cee34e267edb82",
    "s0_receipt_sha256": "780a629bb3af989501320fbde06240a618bbb085a677370f69100c5e1c8d207a",
    "execution_program_sha256": "8b6dd8c696691a42e64ee25ecf05fd104ad52f7177f7a415569115e2369eac9a",
    "boss_ledger_sha256": "bc23e18da7b2e03d1d2eb4d9ab613b23fc226650870d848e9636fc1ddcca9c10",
    "private_review_goal_sha256": "81c07970405a484778bc35daffdc0de5a8b401f18bc00aea05afecfbe14d3a72"
  },
  "readable_paths": [
    "/Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-SHOPIFY-BASELINE-IDENTITY-R2-20260817T172708.md",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/MAPLEMOON-SHOPIFY-BASELINE-IDENTITY-R2-20260817T172708.md",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/MAPLEMOON-SHOPIFY-BASELINE-IDENTITY-R2-20260817T172708.json",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-SHOPIFY-EXECUTION-PROGRAM-20260817T165719.md",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/MAPLEMOON_BOSS_EXECUTION_LEDGER_20260816.md",
    "/Users/handtomouse/maplemoon-website/.planning/MAPLEMOON_PRIVATE_SHOPIFY_REVIEW_GOAL_20260817.md",
    "/Users/handtomouse/maplemoon-website/_wip/recovery/shopify_baseline_identity_r2_20260817T172708"
  ],
  "writable_paths": [
    "maplemoon-website/_wip/evidence/shopify_theme_safety_s1_20260817T210246",
    "maplemoon-website/_wip/recovery/shopify_theme_safety_s1_20260817T210246",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-SHOPIFY-THEME-SAFETY-S1-20260817T210246.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-SHOPIFY-THEME-SAFETY-S1-20260817T210246.json"
  ],
  "authorized_external_side_effect": "Create exactly one remote theme with name MapleMoon Private Review 20260817 S1 by duplicating theme 154500595909. The new theme must have role unpublished. No other Shopify object may change.",
  "method": [
    "before first task-output write, prove all four writable destinations absent, create a timestamped non-overwriting checkpoint and pass phase=start with --root /Users/handtomouse",
    "replay every pinned local hash and the S0 receipt before remote access",
    "run a read-only theme list and theme info; proceed only if the store has exactly the single expected live theme and no existing theme with the target duplicate name",
    "run exactly one Shopify CLI theme duplicate command with explicit store, source theme ID, target name, JSON, force and no-color flags",
    "capture the returned duplicate ID and require role unpublished; never infer or invent an ID",
    "run read-only theme list and theme info after duplication and require the original theme to remain live and byte/value equivalent while exactly one new unpublished theme exists",
    "pull the original and duplicate into separate subdirectories of the exact recovery path with --nodelete; compute counts, byte totals and deterministic relative-path tree SHA-256 values",
    "require the fresh original pull and duplicate pull to be byte-identical to the S0 theme tree; any remote transformation is HOLD and no correction is attempted",
    "rerun the inherited strict JSON and Shopify Theme Check observations against the duplicate; record them as inherited baseline defects, not repaired work",
    "prove the anonymous storefront still redirects to its password page",
    "write a human report and maplemoon-receipt/v2 receipt, then run phase=complete only; never run promotion"
  ],
  "verify": [
    "all six pinned local hashes and the S0 theme tree match at acquisition and close",
    "pre-state has exactly theme 154500595909 named Ethereal with role live and no target-name duplicate",
    "duplicate command runs exactly once and returns one concrete theme ID with the exact requested name and role unpublished",
    "post-state contains exactly the unchanged live source and the one new unpublished duplicate",
    "fresh source and duplicate pulls are nonblank, contain 246 files and have tree SHA-256 6f94b20a498fa0db7d3d4f602a04a783809689e75f95dbf234f802e8ec9c5dee",
    "password protection remains active",
    "no update, edit, repair, push, publish, delete, product, collection, inventory, navigation, file, metafield, app, market, payment, shipping, tax, domain, policy, customer, order, user or protection mutation occurs",
    "no secret, token, cookie, password, verification URL, customer data or payout detail enters evidence",
    "only the four exact local writable paths change, apart from the one authorized remote duplicate",
    "phase=complete is PASS only when every required check passes; missing evidence is HOLD and any extra remote mutation or failed required check is FAIL"
  ],
  "stop": [
    "any pinned input changes",
    "the current store or source theme differs from the exact pre-state",
    "a target-name duplicate already exists",
    "authentication requests a permission expansion or exposes authentication material",
    "the duplicate command returns no ID, the wrong name, a non-unpublished role or any error",
    "post-state contains an unexpected theme or the source role/name/ID changes",
    "source and duplicate pulls differ from the S0 tree",
    "password protection is absent",
    "any extra Shopify object changes, a secret enters output, scope escapes or a required check fails"
  ],
  "forbidden_actions": [
    "theme update, repair, code edit, push, publish, delete, post-creation rename, share or app install",
    "product, collection, inventory, navigation, file, metaobject, metafield, customer, order, discount, setting, user, owner, plan, payment, shipping, tax, location, market, domain, policy, notification, password-protection or checkout mutation",
    "credential/session-store inspection; spend; Git commit/push; Vercel deploy; production movement; client contact"
  ],
  "next_reviewer": "MapleMoon root Boss for S1 receipt review and a separate S1B update/repair decision",
  "requires_visual_evidence": false
}
<!-- CONTROL-PLANE:END -->

## Exact checkpoint gate

```sh
python3 -B /Users/handtomouse/maplemoon-website/scripts/check-maplemoon-receipt.py checkpoint --root /Users/handtomouse --packet /Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-SHOPIFY-THEME-SAFETY-S1-20260817T210246.md --destination /Users/handtomouse/maplemoon-website/_wip/checkpoints/MAPLEMOON-SHOPIFY-THEME-SAFETY-S1-20260817T210246_YYYYMMDD_HHMMSS_AEST
python3 -B /Users/handtomouse/maplemoon-website/scripts/check-maplemoon-receipt.py verify --root /Users/handtomouse --packet /Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-SHOPIFY-THEME-SAFETY-S1-20260817T210246.md --checkpoint <exact-created-checkpoint> --phase start
```

## Mutation command boundary

The only remote write permitted by this packet is:

```sh
shopify theme duplicate --store maplemooncarob.myshopify.com --theme 154500595909 --name 'MapleMoon Private Review 20260817 S1' --json --force --no-color
```

Even a complete PASS does not authorize an update, repair, code push, theme
publication or any store-global mutation.
