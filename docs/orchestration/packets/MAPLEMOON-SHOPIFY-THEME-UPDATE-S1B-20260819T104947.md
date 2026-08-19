# MapleMoon Shopify theme update S1B — 2026-08-19 10:49 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-SHOPIFY-THEME-UPDATE-S1B-20260819T104947",
  "worker_thread_id": "/root",
  "state": "executed_hold_official_update_route_not_drivable",
  "objective": "Apply the official Etheryx 1.6.0 update to unpublished theme 160076628165 only, capture before and after theme bytes, produce the exact 1.4.0 to 1.6.0 file and settings migration diff, verify settings preservation, rerun strict JSON and Shopify Theme Check, inspect the duplicate preview, and prove the live theme, its role and storefront password protection are unchanged.",
  "authority": "Nate's explicit 2026-08-19 authorisation of this one action, recorded in UFC/ops/state/HANDOFF_MAPLEMOON_SHOPIFY_S1B_20260819.md, combined with the S1 receipt. It authorises the official update of 160076628165 and nothing else. It does not authorise publication, password removal, payments, ownership transfer, domain or DNS work, catalogue import, app install, theme port, code push or client contact.",
  "base": {
    "store": "maplemooncarob.myshopify.com",
    "live_theme_id": "154500595909",
    "live_theme_name": "Ethereal",
    "live_theme_role": "live",
    "target_theme_id": "160076628165",
    "target_theme_name": "MapleMoon Private Review 20260817 S1",
    "target_theme_role": "unpublished",
    "theme_family": "Etheryx",
    "installed_preset_name": "Ethereal",
    "installed_version": "1.4.0",
    "target_version": "1.6.0",
    "theme_author": "OpenThinking",
    "recovery_files": 246,
    "recovery_bytes": 2866869,
    "s0_relative_tree_sha256": "6f94b20a498fa0db7d3d4f602a04a783809689e75f95dbf234f802e8ec9c5dee",
    "gate_directory_sha256": "e48a21dc289c2534aaf06711e1e4b653a7b4b54ce7a11406f8d78027a147ccc4",
    "s1_packet_sha256": "4b3e544892e3819c59fdc783e0c2163fe63bd62e5a6e20155a7dee309df3ee0e",
    "s1_report_sha256": "dbfef71470bc3f1cbd1b68b01dac0b101fab1f474748c0ce028b6703802fd382",
    "s1_receipt_sha256": "f93bdcb4edfdfde8ba24a0fe4b8cdb9d617404124ba3eaea6f627772e0bcfa56",
    "execution_program_sha256": "8b6dd8c696691a42e64ee25ecf05fd104ad52f7177f7a415569115e2369eac9a",
    "boss_ledger_sha256": "bc23e18da7b2e03d1d2eb4d9ab613b23fc226650870d848e9636fc1ddcca9c10",
    "private_review_goal_sha256": "81c07970405a484778bc35daffdc0de5a8b401f18bc00aea05afecfbe14d3a72",
    "s1b_handoff_sha256": "1153ec9e3474e7749d73c8094cdbdd68a028c286d67092a6fc45556f32cb5225"
  },
  "readable_paths": [
    "/Users/handtomouse/UFC/ops/state/HANDOFF_MAPLEMOON_SHOPIFY_S1B_20260819.md",
    "/Users/handtomouse/maplemoon-website/.planning/MAPLEMOON_PRIVATE_SHOPIFY_REVIEW_GOAL_20260817.md",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/MAPLEMOON_BOSS_EXECUTION_LEDGER_20260816.md",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-SHOPIFY-EXECUTION-PROGRAM-20260817T165719.md",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-SHOPIFY-THEME-SAFETY-S1-20260817T210246.md",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/MAPLEMOON-SHOPIFY-THEME-SAFETY-S1-20260817T210246.md",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/MAPLEMOON-SHOPIFY-THEME-SAFETY-S1-20260817T210246.json",
    "/Users/handtomouse/maplemoon-website/_wip/recovery/shopify_baseline_identity_r2_20260817T172708",
    "/Users/handtomouse/maplemoon-website/_wip/recovery/shopify_theme_safety_s1_20260817T210246"
  ],
  "writable_paths": [
    "maplemoon-website/_wip/evidence/shopify_theme_update_s1b_20260819T104947",
    "maplemoon-website/_wip/recovery/shopify_theme_update_s1b_20260819T104947",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-SHOPIFY-THEME-UPDATE-S1B-20260819T104947.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-SHOPIFY-THEME-UPDATE-S1B-20260819T104947.json"
  ],
  "authorized_external_side_effect": "Apply the official Shopify Theme Store update of Etheryx 1.4.0 to 1.6.0 to theme 160076628165 exactly once, through Shopify's own admin update route. Any pre-update backup theme Shopify itself creates as part of that route is an inherent side effect of the authorised route and must be recorded, never deleted. No other Shopify object may change.",
  "method": [
    "pin both theme IDs, both roles and the recovery anchors before anything else; abort on any mismatch",
    "pull 160076628165 to a fresh local directory and record file count, byte total, gate directory digest and relative tree SHA-256",
    "confirm the official update route exists for this theme family before attempting it; never substitute a vendor zip upload for the official route",
    "record the exact remote theme list immediately before and immediately after the update action so any additional theme Shopify creates is visible",
    "apply the official 1.6.0 update to 160076628165 only; never hand-repair a 1.4.0 defect first",
    "pull again and record the same measures",
    "produce the exact file diff (added, removed, modified) and the settings key diff across settings_schema.json and settings_data.json, asserting a nonzero before-side key count first because both files fail strict JSON",
    "classify every settings key as preserved, changed, newly defaulted or orphaned; a key surviving in settings_data.json with no matching schema id is orphaned, not preserved",
    "rerun strict JSON on config/settings_schema.json and Shopify Theme Check, and report new numbers against the recorded baseline rather than an exit code alone",
    "inspect the updated duplicate preview and name the instrument used",
    "re-pull 154500595909 and prove it is still role live and byte-identical to its recovery; prove the storefront still returns the password page",
    "write packet, human report, maplemoon-receipt/v2 receipt and a recovery tree, then stop"
  ],
  "verify": [
    "before-state pull is 246 files, 2,866,869 bytes, gate digest e48a21dc..., relative tree SHA-256 6f94b20a...",
    "live theme 154500595909 is role live and byte-identical to the sealed S0 recovery at close",
    "target theme 160076628165 is role unpublished at close",
    "storefront final_url ends /password with http 200",
    "no publication, password removal, payment, ownership, domain, DNS, product, collection, metaobject, app or client mutation occurs",
    "every gate that cannot be run is reported as not run, with its reason and its instrument; an exit code alone is never accepted as proof"
  ],
  "stop": [
    "any pinned anchor fails to match",
    "the official update route cannot be driven by an available instrument",
    "the update action would require entering a credential or storefront password",
    "the update would have to be approximated by uploading a vendor zip or by posting to an undocumented internal endpoint",
    "any object outside 160076628165 changes"
  ],
  "forbidden_actions": [
    "update or edit live theme 154500595909",
    "publish or promote any theme; remove storefront password protection",
    "activate payments, transfer ownership, change domain or DNS",
    "import or modify any product, collection or metaobject; install any app",
    "hand-repair config/settings_schema.json, assets/c-slider.js.liquid, snippets/inc-socials.liquid or sections/t-giftcard.liquid before the official update",
    "begin the MapleMoon theme port, push code or take any production action",
    "contact Carli, Dylan or anyone else; record any credential, token, cookie, storefront password or customer data in evidence"
  ],
  "next_reviewer": "MapleMoon root Boss, then Nate for the instrument decision this packet is held on",
  "requires_visual_evidence": false
}
<!-- CONTROL-PLANE:END -->

## Result

**HOLD at step 3.** Every read-only and proof step passed. The official update
itself did not run, because no available instrument can drive Shopify's admin
update route from this session. The detail is in the review report.

## Update route boundary

Shopify CLI 3.92.1 has no theme update command. The complete `shopify theme`
command list is: `check`, `console`, `delete`, `dev`, `duplicate`, `info`,
`init`, `language-server`, `list`, `metafields`, `open`, `package`, `profile`,
`publish`, `pull`, `push`, `rename`, `share`. The official update route is the
Shopify admin Online Store theme library only.

No vendor zip upload, and no request to an undocumented internal endpoint, is an
acceptable substitute. Either is a different action from the one Nate authorised.
