# MapleMoon caffeine FAQ verification-only successor — 2026-08-14 14:51 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-FAQ-CAFFEINE-VERIFY-20260814T145103",
  "worker_thread_id": "/root/recertify_updated_preview",
  "state": "ready_verification_only",
  "objective": "Independently verify the already-isolated exact caffeine FAQ correction through source-delta, measured browser, route and production-freeze checks, without changing any website or deployment file.",
  "authority": "This packet supersedes only the unavailable-verifier check in MAPLEMOON-FAQ-CAFFEINE-EXACT-20260814T144235. It does not broaden the edit. The predecessor's HOLD receipt proves the exact one-object replacement and records FAQ SHA-256 c5ce7aaf0b9b3221f34eb2928fc2ff6732fc1a915ea80144a4ade2b94011fb6e.",
  "base": {
    "homepage_sha256": "27921b2a466ccb670b2851a73043429763d3423bcaf651069e4e860dc01a78b1",
    "our_story_sha256": "2db31868a9791f373f156e7cdeb8261e494d1d47e9418a94c28156e213df7711",
    "carob_story_sha256": "4fd9ad0fabb9d60d0f391925f5a382ccfc8f705b60fca1c681f403a5cd9734bd",
    "shop_sha256": "f111ad5123e34dadd46ac497fca286066efc67c05dd7e68f0d3e70c97c735038",
    "faq_sha256": "c5ce7aaf0b9b3221f34eb2928fc2ff6732fc1a915ea80144a4ade2b94011fb6e",
    "stockists_sha256": "4821adfe88680d4f174b7a8700c8d8a65594df2901bf3a7109d51b09040cb887",
    "pure_sha256": "015cde27ecc60f3c444820a551c39f6e9c985fc5b2e59bdaea5f496c1c236b65",
    "pre_edit_faq_sha256": "99dcafedaf8e812ffd2a55fdb028e27529dd47506ca8be68cc2dab0634afd493",
    "certified_preview": "https://maplemoonbuild20260813-41r5obchf-handtomouses-projects.vercel.app",
    "production_immutable": "7vjf2m50b",
    "production_homepage_md5": "6197879a5ca9d3ed0452773abc0bbeb4"
  },
  "readable_paths": [
    "maplemoon_build_20260813/homepage.html",
    "maplemoon_build_20260813/our-story.html",
    "maplemoon_build_20260813/carob-story.html",
    "maplemoon_build_20260813/shop.html",
    "maplemoon_build_20260813/faq.html",
    "maplemoon_build_20260813/stockists.html",
    "maplemoon_build_20260813/pure-carob-bar.html",
    "maplemoon_build_20260813/assets",
    "maplemoon_build_20260813/mock-cart.js",
    "maplemoon_build_20260813/mock-cart.css",
    "maplemoon-website/_wip/checkpoints/MAPLEMOON-FAQ-CAFFEINE-EXACT-20260814T144235_20260814_144235_AEST/files/maplemoon_build_20260813/faq.html",
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-FAQ-CAFFEINE-EXACT-20260814T144235.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-FAQ-CAFFEINE-EXACT-20260814T144235.json",
    "maplemoon-website/scripts/check-maplemoon-receipt.py"
  ],
  "writable_paths": [
    "maplemoon-website/_wip/evidence/faq_caffeine_verify_20260814T145103",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-FAQ-CAFFEINE-VERIFY-20260814T145103.json"
  ],
  "exact_expected_copy": {
    "question": "Does carob contain caffeine?",
    "answer": "Carob itself is naturally caffeine-free. Its mellow, naturally sweet flavour works beautifully in bars, baking and warm drinks. Maple Moon recipes vary, so please check the individual product label for the full ingredient list."
  },
  "method": [
    "run the phase-start gate with --root /Users/handtomouse before the first evidence or receipt write",
    "verify all seven acquisition hashes and the predecessor checkpoint/receipt hashes",
    "prove the pre-edit FAQ becomes the current FAQ by exactly one question-and-answer replacement with every other byte unchanged",
    "serve the certified candidate locally without changing it",
    "at measured 390 and 1440 CSS px open the actual dynamic caffeine FAQ and capture screenshot plus machine-readable geometry/text/runtime evidence",
    "at measured 390 also open the site navigation drawer and recheck width, six 44px rows and hit targets",
    "fetch all seven routes plus required shared assets and two bogus-path negative controls",
    "run direct fail-closed scans for the old caffeine strings, duplicate new strings, broken local references on FAQ, runtime errors and horizontal overflow",
    "read-only verify the production alias still resolves to immutable 7vjf2m50b and the frozen production homepage MD5 remains 6197879a5ca9d3ed0452773abc0bbeb4",
    "write the receipt and run completion then promotion gates"
  ],
  "verify": [
    "all seven acquisition hashes match",
    "the current FAQ differs from the pre-edit checkpoint by only the exact approved question and answer",
    "the old question and answer are absent and the new question and answer occur once",
    "the rendered open FAQ exposes the exact text at 390 and 1440 with no clipping, overflow, broken media, console error or page error",
    "the measured 390 navigation drawer remains full width with six 44px rows whose centres hit their own row",
    "all seven routes and required FAQ assets return 200; both bogus paths return 404 and differ from the real FAQ",
    "the evidence directory contains nonblank screenshots and machine-readable results",
    "no website or deployment file changes",
    "production immutable target and frozen homepage MD5 remain unchanged",
    "completion and promotion receipt gates pass"
  ],
  "stop": [
    "an acquisition hash or exact-delta assertion fails",
    "the rendered text differs from the approved string",
    "a route, asset, runtime, overflow, drawer, bogus-path or freeze check fails",
    "a website, asset, deployment or production file would need to change",
    "any path outside writable_paths changes",
    "commit, push, deploy, promote, production mutation or client contact is requested"
  ],
  "forbidden_actions": [
    "edit faq.html or any other candidate/build/repository source",
    "change the separate cacao-butter answer",
    "commit, push, deploy, publish, promote, alter Vercel protection, move production or contact the client"
  ],
  "next_reviewer": "MapleMoon BOSS",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->

## Correction rationale

The predecessor named a verifier that is no longer present. This successor does not lower the gate or invent a substitute named tool; it spells out the required source, runtime, route, negative-control and freeze checks directly. The website edit is read-only in this phase.
