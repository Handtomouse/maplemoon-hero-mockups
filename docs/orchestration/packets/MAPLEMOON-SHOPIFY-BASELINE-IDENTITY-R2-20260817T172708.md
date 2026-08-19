# MapleMoon Shopify baseline and identity R2 — 2026-08-17 17:27 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-SHOPIFY-BASELINE-IDENTITY-R2-20260817T172708",
  "worker_thread_id": "/root",
  "state": "ready_user_authorized_authentication_then_read_only_acquisition",
  "objective": "After Nate's explicit 2026-08-17 authorization to begin the visible Shopify CLI login, acquire an exact read-only baseline for maplemooncarob, reconcile Ethereal versus Etheryx, and recover the exact installed theme bytes locally without mutating any Shopify object.",
  "authority": "Nate replied 'go' to the prior S0 release condition. This authorizes user-visible Shopify CLI authentication and subsequent read-only theme/store inspection only. It does not authorize theme duplication, update, edit, publication, product mutation, settings mutation, checkout activation, protection removal, domain work or client contact.",
  "base": {
    "predecessor_packet": "/Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-SHOPIFY-BASELINE-IDENTITY-20260817T165719.md",
    "predecessor_packet_sha256": "253f861e0f0b8c843d73d33297b01c01f236f386013e6279551d5ce1dd7b2041",
    "predecessor_report_sha256": "e72f10e5fd83f291ac3d044508f44606dd4ed07df8a1059dba8b474cc4d446c8",
    "predecessor_receipt_sha256": "ee7f5d164cc1600b78bf3ba35f0dd98f8365bd46b85c258c78ca341201f35041",
    "execution_program_sha256": "8b6dd8c696691a42e64ee25ecf05fd104ad52f7177f7a415569115e2369eac9a",
    "boss_ledger_sha256": "82735f8eaa9aea90923a2f84717260f5055500aa1d7f69f1adea0693b57abf43",
    "shopify_groundwork_plan_sha256": "101ac8d7f23da414adfcad67e6a6c2665bfa534b61397fa1a525775432fb598f",
    "shopify_groundwork_theme_map_sha256": "f3dcf5afc5eeec6657832349cd46b2d36294d1a62af38b82ad542a18604d9bbd",
    "shopify_groundwork_data_gap_sha256": "28193b210d5c8fc56d58c9127a850561ca26f8b1399c8bb14b6abafa1bacfcf8",
    "shopify_groundwork_checklist_sha256": "99cbf5122c862b3ba3e61142fe8d0fcd999bbf61ea7833acfe79502b3b3566c1",
    "shopify_groundwork_blocked_sha256": "c76c38ea039e5f55acd1e106a6aa91a84054a00c256ce59471c3bde38c3d9fd3",
    "catalogue_ledger_sha256": "96cc025cb63ef9542e8f114e9e98d055ebc69f1abd106a8d892bf3def69e5e4d",
    "catalogue_csv_sha256": "5472e9f3b12ead23bcb4bb2bd98ca7ad51d82a11fb7f47c6a85e1cd71bc88597",
    "catalogue_conflicts_sha256": "674df039e46db087796845439c227cc55ce035b07313418762c9ebb036fb24a7",
    "catalogue_needed_sha256": "afd7b82085874fbd5c636fa8af193fb72934b036350a02c4e87baccc156bef48",
    "woo_export_sha256": "eeea19fd89b30052bd4c4cf28519f56f1195e4595c92485fb186a66719e6b114",
    "known_admin_theme": "Ethereal",
    "known_admin_theme_id": "154500595909",
    "known_available_version": "1.6.0",
    "purchase_record_name": "Etheryx",
    "store_handle": "maplemooncarob"
  },
  "readable_paths": [
    "/Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-SHOPIFY-BASELINE-IDENTITY-20260817T165719.md",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/MAPLEMOON-SHOPIFY-BASELINE-IDENTITY-20260817T165719.md",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/MAPLEMOON-SHOPIFY-BASELINE-IDENTITY-20260817T165719.json",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-SHOPIFY-EXECUTION-PROGRAM-20260817T165719.md",
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
    "/Users/handtomouse/Library/Messages/Attachments/e0/00/3631B118-5A32-487A-8E55-C0533B3B96CB/Maple Moon Store CSV File Export.csv",
    "/Users/handtomouse/maplemoon-website/scripts/check-maplemoon-receipt.py"
  ],
  "writable_paths": [
    "maplemoon-website/_wip/evidence/shopify_baseline_identity_r2_20260817T172708",
    "maplemoon-website/_wip/recovery/shopify_baseline_identity_r2_20260817T172708",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-SHOPIFY-BASELINE-IDENTITY-R2-20260817T172708.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-SHOPIFY-BASELINE-IDENTITY-R2-20260817T172708.json"
  ],
  "authorized_external_session_side_effect": "Shopify CLI may create or refresh its own authentication session after a visible user-approved login. Never inspect, export or record that session, its tokens, cookies, password data or recovery material.",
  "method": [
    "before first task-output write, prove all four writable destinations are absent, create a timestamped non-overwriting checkpoint and pass phase=start with --root /Users/handtomouse",
    "replay every predecessor and authority pin at acquisition and close",
    "start the Shopify CLI theme-list login flow visibly; allow Nate to complete the first-party browser authentication; do not inspect credentials, browser storage, cookies, tokens or recovery material",
    "after authentication, run only read-only Shopify CLI theme list/info/pull commands against maplemooncarob.myshopify.com",
    "pull theme ID 154500595909 only after the current theme list independently confirms that exact theme and role; write bytes solely inside the R2 recovery path",
    "capture sanitized theme metadata, exact file count and deterministic tree SHA-256; redact transient authentication material and all secrets",
    "record only store metadata that can be acquired safely read-only; mark unsupported facts UNKNOWN rather than switching to a mutating or credential-inspection route",
    "repeat the read-only theme boundary at close and prove no observed Shopify object changed",
    "write a maplemoon-receipt/v2 receipt and run phase=complete; never run promotion or S1 mutation under this packet"
  ],
  "verify": [
    "all predecessor and twelve authority pins match at acquisition and close",
    "SHOP-001 through SHOP-068 remain complete and unique",
    "current theme list records exact ID, role and name, plus version/vendor/update state when the CLI exposes it; unsupported fields are explicit UNKNOWN",
    "Ethereal-versus-Etheryx is RESOLVED only by first-party metadata or otherwise remains HOLD",
    "theme ID 154500595909 has an exact local recovery with nonzero file count and SHA-256 tree digest",
    "theme list before and after is equivalent for every returned theme object",
    "no remote theme, product, collection, setting, domain, user, payment, plan, protection or publication state changes",
    "no secret, verification code, activation URL, token, cookie, password, payout detail or customer personal data appears in outputs",
    "only the four exact writable task-output paths change, apart from the explicitly authorized opaque Shopify CLI session side effect",
    "phase=complete is PASS only when every required check passes; missing identity/bytes is HOLD and any mutation/scope breach/failed check is FAIL"
  ],
  "stop": [
    "any pin changes",
    "authentication asks for a permission beyond ordinary Shopify account/store access or cannot be completed visibly by Nate",
    "the CLI-selected store is not maplemooncarob.myshopify.com",
    "theme ID 154500595909 is absent or its identity conflicts with the pinned admin record",
    "theme pull would write outside the recovery path or invoke a remote mutation",
    "Ethereal-versus-Etheryx cannot be reconciled and an identity-dependent action would be required",
    "any Shopify object changes, a secret enters output, an output path escapes scope or a required check fails"
  ],
  "forbidden_actions": [
    "theme duplicate, update, rename, edit, publish, delete, purchase download, app install or remote write",
    "product, collection, inventory, customer, order, discount, stockist, setting, user, owner, plan, payment, shipping, tax, location, market, domain, policy, notification, app, password-protection or checkout mutation",
    "credential/session-store inspection or recording; spend; client contact; Git commit/push; Vercel deploy; production movement"
  ],
  "next_reviewer": "MapleMoon root Boss for independent receipt replay and S1 admission decision",
  "requires_visual_evidence": false
}
<!-- CONTROL-PLANE:END -->

## Exact checkpoint gate

```sh
python3 -B /Users/handtomouse/maplemoon-website/scripts/check-maplemoon-receipt.py checkpoint --root /Users/handtomouse --packet /Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-SHOPIFY-BASELINE-IDENTITY-R2-20260817T172708.md --destination /Users/handtomouse/maplemoon-website/_wip/checkpoints/MAPLEMOON-SHOPIFY-BASELINE-IDENTITY-R2-20260817T172708_YYYYMMDD_HHMMSS_AEST
python3 -B /Users/handtomouse/maplemoon-website/scripts/check-maplemoon-receipt.py verify --root /Users/handtomouse --packet /Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-SHOPIFY-BASELINE-IDENTITY-R2-20260817T172708.md --checkpoint /Users/handtomouse/maplemoon-website/_wip/checkpoints/MAPLEMOON-SHOPIFY-BASELINE-IDENTITY-R2-20260817T172708_YYYYMMDD_HHMMSS_AEST --phase start
```

## Completion boundary

This packet can establish the exact read-only baseline only. Even a PASS does
not authorize theme duplication, updating, editing or publication. S1 requires
a separate packet pinned to the R2 receipt and observed theme IDs.
