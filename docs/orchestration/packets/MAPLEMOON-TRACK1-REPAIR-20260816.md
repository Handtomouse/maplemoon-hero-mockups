# MapleMoon Track 1 repair and replacement preview

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-TRACK1-REPAIR-20260816",
  "worker_thread_id": "/root",
  "state": "admitted",
  "objective": "Repair the certified Track 1 HOLD findings in the current WIP candidate, build and certify a replacement preview, and stop before Our Story direction, production movement or client contact.",
  "authority": "Nate's Execute instruction for the exact ranked MapleMoon next-10 list, following the completed Track 1 T1-T5 HOLD report.",
  "base": {
    "git_commit": "b704ce0edb4c7cc99efbe47542433730a083c1e5",
    "homepage_sha256": "8baea94b586bda2a079c5cf8d4de9fa24e278ed066314c720ad8b84d33c43261",
    "stockists_sha256": "1cc8b4e55c7dc59f6e268222c310ac47d477540caf7540970981726a801b9075",
    "builder_sha256": "0ebf7c213c37d07cc4999c9d9cc38d93dd290c605e1641e4ec5f3a6de5f755b0",
    "certified_cart_js_sha256": "36fb46b05a46ecf1c770991c6b9cf2eb8c08fda361c7176d37df081668f123aa",
    "certified_cart_css_sha256": "c17deb1f972017d9790f2191360a457e54d7287730847f9f470c9de371603308",
    "production_immutable_token": "7vjf2m50b"
  },
  "readable_paths": [
    "maplemoon-website/_wip/evidence/track1_carli_build_20260816/REPORT.md",
    "maplemoon-website/_wip/homepage_real_1_lead_photo.WIP.html",
    "maplemoon-website/_wip/stockists.WIP.html",
    "maplemoon-website/scripts/build-maplemoon-wip-preview.py",
    "maplemoon-website/assets/design-system/mm-chrome.js",
    "maplemoon-website/assets/design-system/mm-chrome.css",
    "maplemoon_build_20260813/homepage.html",
    "maplemoon_build_20260813/mock-cart.js",
    "maplemoon_build_20260813/mock-cart.css"
  ],
  "writable_paths": [
    "maplemoon-website/_wip/homepage_real_1_lead_photo.WIP.html",
    "maplemoon-website/_wip/stockists.WIP.html",
    "maplemoon-website/scripts/build-maplemoon-wip-preview.py",
    "maplemoon-website/_wip/evidence/track1_repair_20260816",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-TRACK1-REPAIR-20260816.json"
  ],
  "method": [
    "checkpoint every exact writable path before the first implementation write",
    "restore the certified shared cart assets and the previously measured Homepage drawer overrides without changing content",
    "restore the Stockists skip link and main landmark without changing the directory data",
    "build a self-contained replacement candidate under private temporary storage",
    "run source checks, six-route fetch proof, 390 and 1440 interaction QA, visual evidence and production-freeze checks",
    "deploy preview only and stop before production promotion or client contact"
  ],
  "verify": [
    "certified cart source hashes match before and after the build",
    "Homepage cart opens and drawer row centres resolve to their own anchors at measured 390",
    "Stockists contains one skip link to one main-content target",
    "all six routes return 200 with positive controls and the required Track 1 assertions",
    "all changed routes render at measured 390 and 1440 with no overflow, broken images, console, page or request failures",
    "preview deployment is Ready and production remains pinned to 7vjf2m50b",
    "completion and promotion evidence gates pass for the local candidate only"
  ],
  "stop": [
    "the current source hashes, certified cart hashes or production token differ",
    "a required source, interaction, render or fetch check fails",
    "Our Story would need a material visual-direction choice",
    "production movement, client contact, credentials or money would be required"
  ],
  "forbidden_actions": [
    "edit Our Story imagery or choose a founder photograph",
    "promote, alias or move production",
    "send or contact the client",
    "commit, push, stash, reset, delete or gitignore unrelated work"
  ],
  "next_reviewer": "Nate for Our Story direction and exact deployment-ID promotion approval",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->
