# MapleMoon corrected-FAQ preview deployment — 2026-08-14 14:59 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-FAQ-CORRECTED-PREVIEW-20260814T145952",
  "worker_thread_id": "/root/recertify_updated_preview",
  "state": "ready_preview_only",
  "objective": "Deploy the independently certified corrected-FAQ candidate to one new Vercel Preview deployment, prove deployed-byte equality, and prove the production alias remains frozen.",
  "authority": "Nate explicitly authorised preview deployment after certification and explicitly withheld production. MAPLEMOON-FAQ-CAFFEINE-VERIFY-20260814T145103 passed completion and promotion verification gates. This packet authorises only `vercel deploy --yes` in the candidate directory; it does not authorise --prod, promote, alias movement, protection changes, client contact, or source edits.",
  "base": {
    "candidate_root": "/Users/handtomouse/maplemoon_build_20260813",
    "homepage_sha256": "27921b2a466ccb670b2851a73043429763d3423bcaf651069e4e860dc01a78b1",
    "our_story_sha256": "2db31868a9791f373f156e7cdeb8261e494d1d47e9418a94c28156e213df7711",
    "carob_story_sha256": "4fd9ad0fabb9d60d0f391925f5a382ccfc8f705b60fca1c681f403a5cd9734bd",
    "shop_sha256": "f111ad5123e34dadd46ac497fca286066efc67c05dd7e68f0d3e70c97c735038",
    "faq_sha256": "c5ce7aaf0b9b3221f34eb2928fc2ff6732fc1a915ea80144a4ade2b94011fb6e",
    "stockists_sha256": "4821adfe88680d4f174b7a8700c8d8a65594df2901bf3a7109d51b09040cb887",
    "pure_sha256": "015cde27ecc60f3c444820a551c39f6e9c985fc5b2e59bdaea5f496c1c236b65",
    "faq_verification_receipt": "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-FAQ-CAFFEINE-VERIFY-20260814T145103.json",
    "production_immutable": "7vjf2m50b",
    "production_deployment": "dpl_G2LER2awaqyFtGRCcTserXbNynct",
    "production_homepage_md5": "6197879a5ca9d3ed0452773abc0bbeb4",
    "production_homepage_sha256": "b936b5bb4856cdd6134e5b15bce5dfc3b353c1d442fd1a418180b35b8fa10356"
  },
  "readable_paths": [
    "maplemoon_build_20260813/homepage.html",
    "maplemoon_build_20260813/our-story.html",
    "maplemoon_build_20260813/carob-story.html",
    "maplemoon_build_20260813/shop.html",
    "maplemoon_build_20260813/faq.html",
    "maplemoon_build_20260813/stockists.html",
    "maplemoon_build_20260813/pure-carob-bar.html",
    "maplemoon_build_20260813/assets/design-system/mm-chrome.js",
    "maplemoon_build_20260813/assets/design-system/mm-chrome.css",
    "maplemoon_build_20260813/assets/design-system/mm-tokens.css",
    "maplemoon_build_20260813/assets/design-system/mm-primitives.css",
    "maplemoon_build_20260813/mock-cart.js",
    "maplemoon_build_20260813/mock-cart.css",
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-FAQ-CAFFEINE-VERIFY-20260814T145103.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-FAQ-CAFFEINE-VERIFY-20260814T145103.json",
    "maplemoon-website/scripts/check-maplemoon-receipt.py"
  ],
  "writable_paths": [
    "maplemoon-website/_wip/evidence/faq_corrected_preview_20260814T145952",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-FAQ-CORRECTED-PREVIEW-20260814T145952.json"
  ],
  "allowed_external_mutation": [
    "create exactly one new Vercel Preview deployment by running `vercel deploy --yes` from /Users/handtomouse/maplemoon_build_20260813"
  ],
  "method": [
    "create the non-overwriting recovery checkpoint and run the phase-start gate with --root /Users/handtomouse before the first evidence or receipt write",
    "re-run completion and promotion gates for MAPLEMOON-FAQ-CAFFEINE-VERIFY-20260814T145103",
    "verify the exact seven candidate SHA-256 values before deployment",
    "read-only prove the production alias resolves to immutable 7vjf2m50b and the frozen production homepage MD5 remains 6197879a5ca9d3ed0452773abc0bbeb4",
    "from /Users/handtomouse/maplemoon_build_20260813 run exactly `vercel deploy --yes` once",
    "inspect the returned deployment and require target preview, status Ready, and a new immutable deployment ID/URL",
    "using authenticated Vercel fetches, fetch all seven HTML routes plus mm-chrome.js, mm-chrome.css, mm-tokens.css, mm-primitives.css, mock-cart.js and mock-cart.css",
    "prove every fetched deployed byte stream is identical to the corresponding certified local candidate file by SHA-256 and cmp",
    "confirm the deployed FAQ contains the exact approved caffeine question and answer once and the prior strings zero times",
    "read-only prove the production alias, immutable target and homepage MD5/SHA-256 are unchanged after deployment",
    "write the receipt and run completion then promotion gates"
  ],
  "verify": [
    "pre-deploy FAQ verification receipt remains PASS at completion and promotion gates",
    "all seven pre-deploy candidate hashes match the packet",
    "production pre-deploy immutable target and homepage hashes match the packet",
    "the only deploy command is exactly `vercel deploy --yes`, exits 0, and creates one target=preview status=Ready deployment",
    "all seven deployed routes and six critical shared assets return 200 through authenticated Vercel fetch",
    "all thirteen deployed responses are byte-identical to the certified local files",
    "the corrected caffeine copy is present exactly once and the old copy is absent",
    "production post-deploy immutable target and homepage hashes remain unchanged",
    "no candidate or repository source file changes",
    "receipt completion and promotion gates pass"
  ],
  "stop": [
    "an FAQ verification gate, candidate hash or production freeze check fails",
    "the command would include --prod or any flag other than --yes",
    "the deployment is not target preview and status Ready",
    "a deployed route, asset, exact-byte, FAQ-copy or post-deploy freeze check fails",
    "a candidate, repository source, production alias, deployment protection setting or client communication would change",
    "any path outside writable_paths changes"
  ],
  "forbidden_actions": [
    "edit any candidate/build/repository source",
    "run vercel deploy --prod, vercel promote, vercel alias, or any production mutation",
    "change Vercel Authentication or deployment protection",
    "commit, push, delete, stash, gitignore, send email, message, upload to the client, or move the production alias"
  ],
  "next_reviewer": "MapleMoon BOSS",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->

## Release boundary

The resulting URL is an authenticated internal preview for Nate. It is not a production promotion and must not be made anonymously accessible by changing protection settings.
