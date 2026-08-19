# MapleMoon certified preview-only deployment — 2026-08-14 16:58 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-CERTIFIED-PREVIEW-DEPLOY-20260814T165853",
  "worker_thread_id": "/root/recertify_updated_preview",
  "state": "ready_one_preview_deploy",
  "objective": "Deploy the exact independently certified candidate once to a new Vercel preview, prove deployed-byte equality and production freeze, and return its immutable preview URL without moving aliases or changing protection.",
  "authority": "MAPLEMOON-INTEGRATED-HEADER-CART-CERT-R2-20260814T163003 completion and promotion gates pass. The user explicitly authorised a preview deploy after certification and prohibited production. This packet authorises exactly one `vercel deploy --yes` from the certified candidate root; it does not authorise --prod, promote, alias, rollback, protection changes or client contact.",
  "base": {
    "candidate_root": "/Users/handtomouse/maplemoon_build_20260813",
    "cert_receipt": "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-INTEGRATED-HEADER-CART-CERT-R2-20260814T163003.json",
    "cert_receipt_sha256": "9eb39d99d6d3504db2d3e798bbd6b1c1941b40127f2c152bd028edb844077695",
    "production_immutable": "7vjf2m50b",
    "production_deployment_id": "dpl_G2LER2awaqyFtGRCcTserXbNynct",
    "production_homepage_md5": "6197879a5ca9d3ed0452773abc0bbeb4",
    "expected_preview_protection": "Vercel Authentication may return guard:sso-wall anonymously; do not disable or bypass protection"
  },
  "certified_sha256": {
    "homepage.html": "27921b2a466ccb670b2851a73043429763d3423bcaf651069e4e860dc01a78b1",
    "our-story.html": "2db31868a9791f373f156e7cdeb8261e494d1d47e9418a94c28156e213df7711",
    "carob-story.html": "4fd9ad0fabb9d60d0f391925f5a382ccfc8f705b60fca1c681f403a5cd9734bd",
    "shop.html": "f111ad5123e34dadd46ac497fca286066efc67c05dd7e68f0d3e70c97c735038",
    "faq.html": "c5ce7aaf0b9b3221f34eb2928fc2ff6732fc1a915ea80144a4ade2b94011fb6e",
    "stockists.html": "4821adfe88680d4f174b7a8700c8d8a65594df2901bf3a7109d51b09040cb887",
    "pure-carob-bar.html": "015cde27ecc60f3c444820a551c39f6e9c985fc5b2e59bdaea5f496c1c236b65",
    "mock-cart.js": "36fb46b05a46ecf1c770991c6b9cf2eb8c08fda361c7176d37df081668f123aa",
    "mock-cart.css": "c17deb1f972017d9790f2191360a457e54d7287730847f9f470c9de371603308",
    "assets/design-system/mm-chrome.js": "063fe11d5f5ed5d90c724868f1ffb8f3536aed73cc2f7fb9bc6e4791eb192d18",
    "assets/design-system/mm-chrome.css": "2d7414a8994ae11414cb269f4ca335293b409eb9da956ca3b625e716c26080ba"
  },
  "readable_paths": [
    "maplemoon_build_20260813/homepage.html",
    "maplemoon_build_20260813/our-story.html",
    "maplemoon_build_20260813/carob-story.html",
    "maplemoon_build_20260813/shop.html",
    "maplemoon_build_20260813/faq.html",
    "maplemoon_build_20260813/stockists.html",
    "maplemoon_build_20260813/pure-carob-bar.html",
    "maplemoon_build_20260813/mock-cart.js",
    "maplemoon_build_20260813/mock-cart.css",
    "maplemoon_build_20260813/assets",
    "maplemoon_build_20260813/vercel.json",
    "maplemoon_build_20260813/.vercel/project.json",
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-INTEGRATED-HEADER-CART-CERT-R2-20260814T163003.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-INTEGRATED-HEADER-CART-CERT-R2-20260814T163003.json",
    "maplemoon-website/_wip/evidence/integrated_header_cart_cert_r2_20260814T163003",
    "maplemoon-website/scripts/check-maplemoon-receipt.py",
    "UFC/ops/bus/maplemoon/tools_20260813/preflight_deploy.py"
  ],
  "writable_paths": [
    "maplemoon-website/_wip/evidence/certified_preview_deploy_20260814T165853",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-CERTIFIED-PREVIEW-DEPLOY-20260814T165853.json"
  ],
  "method": [
    "create the non-overwriting checkpoint for the exact two writable outputs and pass phase-start with --root /Users/handtomouse before any evidence write or deployment",
    "rerun the independent certification completion and promotion gates and verify its exact receipt hash plus all eleven certified candidate hashes",
    "read-only inspect the current production immutable/deployment/status/homepage MD5 before deployment and stop if the freeze does not match",
    "from /Users/handtomouse/maplemoon_build_20260813 run exactly one deployment command: `vercel deploy --yes`; capture literal stdout/stderr, exit code, URL and deployment identity",
    "do not run `vercel deploy` a second time even if a later check fails; preserve the first preview and report the failure",
    "inspect the returned deployment and require target preview, status Ready and an immutable deployment ID; reject any production target or alias mutation",
    "run the exact anonymous UFC preflight against the preview URL without --local; if it returns `guard:sso-wall`, record the URL as authenticated/private-review-only and continue authenticated byte verification without altering protection; any other blind-probe or content failure is a stop",
    "using authenticated `vercel curl`, fetch all seven route HTML files plus mock-cart.js/css, mm-chrome.js/css and the critical token/primitive assets; require HTTP 200, nonblank bodies and byte-for-byte cmp/SHA-256 equality to the certified local files",
    "authenticated positive controls must prove at least two nonexistent routes return a genuine distinct 404 rather than the deployed page bytes",
    "prove the deployed FAQ contains the exact approved question/answer once, the cart JS has the certified post-fix hash, and the deployed header JS/CSS have their certified hashes",
    "rerun the production immutable/deployment/status/homepage-byte/MD5 proof after deployment and require exact equality with the pre-deploy freeze",
    "rerun all eleven local certified hashes and the certification receipt hash after deployment",
    "write the receipt with the preview URL, deployment ID, protection qualification, anonymous preflight literal result, authenticated equality results and production freeze; then run completion and promotion gates"
  ],
  "verify": [
    "exactly one `vercel deploy --yes` ran with exit 0 and no other Vercel write command ran",
    "the deployment is target preview, Ready, immutable and not promoted or aliased",
    "all seven HTML routes and critical shared assets are authenticated 200/nonblank and byte-identical to certified local files",
    "bogus authenticated routes return distinct genuine 404 responses",
    "anonymous preflight result is literal and any SSO wall is qualified rather than bypassed",
    "production remains immutable 7vjf2m50b / dpl_G2LER2awaqyFtGRCcTserXbNynct / Ready with homepage MD5 6197879a5ca9d3ed0452773abc0bbeb4",
    "candidate and certification receipt hashes remain unchanged",
    "only the exact deployment evidence directory and receipt changed locally",
    "completion and promotion receipt gates pass"
  ],
  "stop": [
    "a certification gate/receipt hash, certified candidate hash or pre-deploy production freeze fails",
    "the one deploy command exits nonzero or returns a production target",
    "a second deploy, --prod, promote, alias, rollback, protection change or production mutation would be required",
    "a deployed authenticated route/asset is non-200, blank or byte-different, or bogus controls are blind",
    "anonymous preflight fails for a reason other than the expected authenticated SSO wall",
    "the production target or homepage bytes move",
    "a path outside writable_paths changes",
    "commit, push, delete, stash, gitignore or client contact is requested"
  ],
  "forbidden_actions": [
    "run `vercel deploy` more than once or add `--prod`",
    "run promote, alias, rollback, remove, protection/config mutation or any production write",
    "edit any candidate/site/build/source/media file",
    "commit, push, delete, stash, gitignore or contact the client"
  ],
  "next_reviewer": "MapleMoon BOSS; production remains Nate-only",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->

## Release boundary

This packet creates an authenticated review preview only. A valid URL and PASS receipt do not authorise production or client delivery.
