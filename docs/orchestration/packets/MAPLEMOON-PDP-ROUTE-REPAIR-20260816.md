# MapleMoon missing Pure PDP route repair

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-PDP-ROUTE-REPAIR-20260816",
  "worker_thread_id": "/root",
  "state": "admitted",
  "objective": "Repair the certified preview's broken Homepage-to-Pure-product journey by adding the previously certified Pure page to the deploy-safe builder, then certify and preview-deploy the complete seven-route candidate.",
  "authority": "Nate's active seven-workstream completion goal and the verified current-preview defect: Homepage targets /products/pure-carob-bar while the immutable preview contains only six HTML files and returns 404 for that clean route.",
  "base": {
    "builder_sha256": "c2c2ccbc0f9e4b4be8c3f111744968566de88de6d605e0e463df4b0d708f48d0",
    "pure_page_sha256": "015cde27ecc60f3c444820a551c39f6e9c985fc5b2e59bdaea5f496c1c236b65",
    "predecessor_deployment_id": "dpl_GMAVpJvm6ytQkLpDBAJXSGr1yffd",
    "production_immutable_token": "7vjf2m50b"
  },
  "readable_paths": [
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-TRACK1-REPAIR-20260816.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-TRACK1-REPAIR-20260816.json",
    "maplemoon-website/scripts/build-maplemoon-wip-preview.py",
    "maplemoon-website/_wip/homepage_real_1_lead_photo.WIP.html",
    "maplemoon-website/_wip/shop.WIP.html",
    "maplemoon-website/_wip/our-story.WIP.html",
    "maplemoon-website/_wip/carob-story.WIP.html",
    "maplemoon-website/_wip/faq.WIP.html",
    "maplemoon-website/_wip/stockists.WIP.html",
    "maplemoon_build_20260813/pure-carob-bar.html",
    "maplemoon_build_20260813/mock-cart.js",
    "maplemoon_build_20260813/mock-cart.css"
  ],
  "writable_paths": [
    "maplemoon-website/scripts/build-maplemoon-wip-preview.py",
    "maplemoon-website/_wip/evidence/pdp_route_repair_20260816",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-PDP-ROUTE-REPAIR-20260816.json"
  ],
  "method": [
    "checkpoint all three exact outputs and pass phase=start before editing",
    "pin the certified Pure page hash and add it at products/pure-carob-bar.html",
    "normalise the Homepage catalogue target to /products/pure-carob-bar and fail closed if the route is absent",
    "build into a fresh private temporary directory",
    "run static journey checks and fresh 390/1440 browser QA across seven routes",
    "deploy exactly one preview with vercel deploy and no --prod, then prove the product route and deployed-byte equality",
    "reconfirm production remains 7vjf2m50b"
  ],
  "verify": [
    "predecessor completion and promotion gates replay PASS",
    "builder output reports pages=7 and contains products/pure-carob-bar.html",
    "Homepage selected Pure card resolves to HTTP 200 and a product-title positive control",
    "all seven routes render at measured 390 and 1440 with no overflow, broken image, console, page or request error",
    "Homepage drawer/cart and Pure drawer/cart remain functional",
    "authenticated preview fetches for seven routes and critical assets are byte-identical to the local candidate",
    "a bogus product route returns 404 and differs from the real Pure page",
    "production alias remains on 7vjf2m50b"
  ],
  "stop": [
    "the pinned builder, Pure page, cart assets or predecessor evidence differs",
    "the Pure page cannot be included without a website/source-page edit",
    "a required journey, render, asset or byte-equality check fails",
    "Our Story imagery direction, product-content authority or production movement would be required"
  ],
  "forbidden_actions": [
    "edit any WIP page, Pure source page, cart source asset or media",
    "resolve the separate Our Story, catalogue, commerce, claims or collection decisions",
    "deploy with --prod, promote, alias, change protection or move production",
    "commit, push, send, publish or contact the client"
  ],
  "next_reviewer": "Nate after seven-route preview certification, still subject to Our Story and production decisions",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->
