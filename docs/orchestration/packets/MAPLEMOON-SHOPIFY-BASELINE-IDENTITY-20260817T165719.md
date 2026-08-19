# MapleMoon Shopify baseline and identity packet — 2026-08-17 16:57 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-SHOPIFY-BASELINE-IDENTITY-20260817T165719",
  "worker_thread_id": "/root",
  "state": "ready_read_only_acquisition",
  "objective": "Create an exact, locally recoverable read-only baseline for the MapleMoon Shopify development store and reconcile the installed Ethereal theme identity against the purchased-theme record called Etheryx before any duplicate, update, import or configuration mutation.",
  "authority": "Nate approved the Shopify decision register and chose to convert it into gated packets. This packet authorizes read-only Shopify inspection and local evidence/recovery writes only. It does not authorize any Shopify mutation.",
  "base": {
    "execution_program": "/Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-SHOPIFY-EXECUTION-PROGRAM-20260817T165719.md",
    "execution_program_sha256": "8b6dd8c696691a42e64ee25ecf05fd104ad52f7177f7a415569115e2369eac9a",
    "boss_ledger": "/Users/handtomouse/maplemoon-website/docs/orchestration/MAPLEMOON_BOSS_EXECUTION_LEDGER_20260816.md",
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
    "/Users/handtomouse/maplemoon-website/docs/orchestration/MAPLEMOON_BOSS_EXECUTION_LEDGER_20260816.md",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-SHOPIFY-EXECUTION-PROGRAM-20260817T165719.md",
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
    "maplemoon-website/_wip/evidence/shopify_baseline_identity_20260817T165719",
    "maplemoon-website/_wip/recovery/shopify_baseline_identity_20260817T165719",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-SHOPIFY-BASELINE-IDENTITY-20260817T165719.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-SHOPIFY-BASELINE-IDENTITY-20260817T165719.json"
  ],
  "method": [
    "before first output write, prove all four writable destinations are absent, create one timestamped non-overwriting checkpoint for the exact scope and pass phase=start with --root /Users/handtomouse",
    "read every named local input in full and verify every pinned SHA-256 at acquisition and close",
    "inspect the already-authenticated maplemooncarob admin read-only; if authentication is absent, HOLD rather than inspect credentials, cookies, password stores, tokens or recovery material",
    "record exact shop ID/handle/type/owner boundary, password-protection state, primary domain, markets, currency, timezone, locations, theme list with role/ID/name/version/vendor, product/variant counts and published/draft/archive states, payment readiness, shipping profiles, tax registration state, policies, notifications, apps/channels and relevant plan/transfer constraints",
    "reconcile Ethereal versus Etheryx using exact first-party admin metadata and any already-available local purchase evidence; never infer identity from similar spelling or appearance",
    "when an already-authenticated Shopify CLI can perform a read-only theme pull without login, install, prompt, permission expansion or remote write, pull the exact installed theme into the recovery path and record file count/tree hash; otherwise record the theme-byte backup as HOLD and do not advance S1",
    "capture sanitized machine-readable snapshots and a human baseline report; redact or omit passwords, session identifiers, access tokens, payout/bank data, recovery codes, customer personal data and any secret values",
    "repeat the read-only store/theme boundary at close and prove no theme, product, setting, domain, user, payment, plan, password-protection or publication state changed",
    "write a maplemoon-receipt/v2 JSON with literal check outputs and run phase=complete; do not run promotion as mutation authority"
  ],
  "verify": [
    "all twelve pinned local authority hashes match at acquisition and close",
    "the decision register contains exactly SHOP-001 through SHOP-068 with no duplicate or missing IDs",
    "store handle and exact store identity are recorded without secrets",
    "every current theme has exact ID, role, name, version and available-update state, or an explicit UNKNOWN with evidence",
    "Ethereal-versus-Etheryx ends as RESOLVED with exact evidence or HOLD; similarity is never treated as proof",
    "a local exact-byte theme recovery exists with file count and SHA-256 tree digest, otherwise the receipt is HOLD and S1 is not admitted",
    "current product/variant counts and status distribution are independently re-counted; the 23-current versus governed-24 mismatch remains explicit",
    "store protection, domains, markets, payments, shipping, tax, owner/users, location, policies, notifications, channels/apps and timezone are captured before and after",
    "before/after external-state comparison is byte/value equivalent for every observed object",
    "no secret or customer personal data appears in any output",
    "only the four exact writable paths change",
    "phase=complete is literal PASS only if every required check passes; missing evidence is HOLD and scope breach/failed required check is FAIL"
  ],
  "stop": [
    "the packet, ledger, catalogue, groundwork or Woo-export pin changes",
    "an exact Shopify identity cannot be observed safely without credential/session-store inspection or a new login/permission grant",
    "the read-only theme backup requires installing software, granting new access, triggering a remote change or writing outside the recovery path",
    "Ethereal-versus-Etheryx remains unresolved or the exact installed theme bytes cannot be recovered",
    "any Shopify object or setting changes during acquisition",
    "a credential, customer record, payout detail or secret enters an output",
    "a path outside writable_paths changes or a required check fails"
  ],
  "forbidden_actions": [
    "duplicate, update, rename, edit, publish, delete or download-purchase a theme through a mutating admin flow",
    "create, update, archive, delete, import, export-by-email or publish products, collections, customers, orders, discounts, stockists or files",
    "change settings, users, owner, plan, payments, shipping, tax, inventory, location, markets, domains, DNS, policies, notifications, apps, password protection or checkout",
    "inspect or record passwords, cookies, browser storage, tokens, API keys, recovery codes, payout/bank details or customer personal data",
    "install an app, CLI, dependency or theme; spend money; contact the client; commit, push, deploy, promote, move production or remove protection"
  ],
  "next_reviewer": "MapleMoon root Boss for independent receipt replay and S1 admission decision",
  "requires_visual_evidence": false
}
<!-- CONTROL-PLANE:END -->

## Exact checkpoint gate

The worker must substitute one fresh AEST timestamp and run these before the
first evidence, recovery, report or receipt write:

```sh
python3 -B /Users/handtomouse/maplemoon-website/scripts/check-maplemoon-receipt.py checkpoint --root /Users/handtomouse --packet /Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-SHOPIFY-BASELINE-IDENTITY-20260817T165719.md --destination /Users/handtomouse/maplemoon-website/_wip/checkpoints/MAPLEMOON-SHOPIFY-BASELINE-IDENTITY-20260817T165719_YYYYMMDD_HHMMSS_AEST
python3 -B /Users/handtomouse/maplemoon-website/scripts/check-maplemoon-receipt.py verify --root /Users/handtomouse --packet /Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-SHOPIFY-BASELINE-IDENTITY-20260817T165719.md --checkpoint /Users/handtomouse/maplemoon-website/_wip/checkpoints/MAPLEMOON-SHOPIFY-BASELINE-IDENTITY-20260817T165719_YYYYMMDD_HHMMSS_AEST --phase start
```

## Completion boundary

This packet ends with a trustworthy recovery baseline and identity verdict. A
PASS does not itself permit theme duplication. The Boss must issue S1 against
the exact observed store/theme IDs and S0 receipt hashes.
