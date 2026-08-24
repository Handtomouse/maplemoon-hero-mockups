# MapleMoon Home/Shop contract reconciliation — 2026-08-24 10:29 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-HOME-SHOP-CONTRACT-RECONCILIATION-20260824T102930",
  "worker_thread_id": "019ffe53-6243-73a2-9d75-e1a072cd07ce",
  "state": "admitted_exact_contract_binding_refresh",
  "objective": "Reconcile only the design-system route and Home exception hash bindings for the already-admitted intentional Home and Shop WIP changes recorded in out/maplemoon_lane_20260823_receipt.json, then prove both design-system checker modes pass without changing any route, asset, rule, token, exception meaning, implementation or deployment state.",
  "authority": "Nate directed BOSS to execute the ranked plan. Styles read-only reconciliation confirmed the exact current Home and Shop hashes, proved both deltas intentional from the admitted lane receipt, identified the only three binding surfaces, and recommended this checkpointed reconciliation after current site work stabilized. Founder wiring is now complete/promote PASS.",
  "base": {
    "head": "7c04f808e285acc116ae0f93c3d887ee1e96aea3",
    "home_sha256": "a06d1e19165c84065e96c14eafd1f8e8d7e5a4228d877f0017ca191d1341c174",
    "shop_sha256": "f9d150dea283d43eb0a14e02dfeccf9ea1eb4eae87ec82a546ab6984f3fa5604",
    "routes_sha256": "7b439934d4db195480b0e746ff0a192a7763e8fecf5bdb13367e078b840d7338",
    "exceptions_sha256": "8e267e5401ef73fca1b5c5804555556613e0fa851f408f6599c481ec25834530"
  },
  "readable_paths": [
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-HOME-SHOP-CONTRACT-RECONCILIATION-20260824T102930.md",
    "maplemoon-website/out/maplemoon_lane_20260823_receipt.json",
    "maplemoon-website/_wip/homepage_real_1_lead_photo.WIP.html",
    "maplemoon-website/_wip/shop.WIP.html",
    "maplemoon-website/docs/design-system/contracts/routes.v1.json",
    "maplemoon-website/docs/design-system/contracts/exceptions.v1.json",
    "maplemoon-website/scripts/check-maplemoon-design-system.mjs"
  ],
  "writable_paths": [
    "maplemoon-website/docs/design-system/contracts/routes.v1.json",
    "maplemoon-website/docs/design-system/contracts/exceptions.v1.json",
    "maplemoon-website/_wip/evidence/home_shop_contract_reconciliation_20260824T102930",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-HOME-SHOP-CONTRACT-RECONCILIATION-20260824T102930.json"
  ],
  "implementation_contract": [
    "change routes.v1.json Home baseline_sha256 from a2219f... to the exact current a06d1e... and Shop baseline_sha256 from 035a66... to the exact current f9d150...",
    "change exactly two Home binding.source_sha256 values in exceptions.v1.json from a2219f... to a06d1e...",
    "do not add a Shop exception, change any status, rule, token, selector, property, reason, source path, route state or structure record",
    "leave the six WIPs, root routes, assets, images contract, Styles Kit and all preserved out artifacts byte-unchanged"
  ],
  "verify": [
    "all four acquisition hashes match at close except the two intentionally edited contract files",
    "routes contains the exact current Home and Shop bindings once each and every other route object is byte-equivalent after normalising those two values",
    "exceptions contains exactly two updated Home source bindings, no Shop binding, and every other byte is equivalent after normalising those two values",
    "node scripts/check-maplemoon-design-system.mjs --contracts-only returns PASS",
    "node scripts/check-maplemoon-design-system.mjs --route-conformance all returns PASS",
    "only the four exact writable paths change"
  ],
  "stop": [
    "either WIP hash differs from the admitted post-state",
    "a checker reports any hold or failure after the exact binding refresh",
    "a route, asset, image contract, exception meaning, Styles Kit, Shopify, Git, deploy, production or client change is required"
  ],
  "forbidden_actions": [
    "mutate, delete, stage, move, rename or gitignore any preserved out artifact",
    "change any customer-facing page or implementation file",
    "commit, push, deploy, publish, change Shopify or contact the client"
  ],
  "next_reviewer": "MapleMoon BOSS for exact diff and receipt replay",
  "requires_visual_evidence": false
}
<!-- CONTROL-PLANE:END -->

## BOSS decision

GO for the four exact hash-binding replacements only. This records already-admitted
intentional source state; it does not approve new design rules, visual changes, deployment,
production, Shopify or client contact.
