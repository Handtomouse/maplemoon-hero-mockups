#!/usr/bin/env node
import fs from "node:fs";
import crypto from "node:crypto";

const kit = "/Users/handtomouse/Documents/Codex/2026-08-13/maple-moon-shared-site-styles-kit/outputs";
const candidate = "/Users/handtomouse/maplemoon_build_20260813";
const repo = "/Users/handtomouse/maplemoon-website";
const expected = new Map([
  [`${repo}/docs/orchestration/packets/MAPLEMOON-STYLES-KIT-V031-BOSS-REINTAKE-20260814T204321.md`, "b5cbaed229113e899fe11ec6728a09a6356f648969d38c4a76ba6c1ae5f72495"],
  [`${kit}/CLAUDE-CHECK-TO-CODEX-BOSS-HANDOFF-20260814.md`, "33356c5d9fc6b5aec0d77d6d264e1b8d083701c3f1465c0faf501791790ba61e"],
  [`${kit}/STATUS.md`, "78825a5757bad150d8450eba536bc60387453b920827fe8020d8cc408c0075ba"],
  [`${kit}/CLAUDE-CODEX-INTAKE.md`, "b4014561792569d8b07d8ca394fc7a750bd650234df9447256896e5675604d44"],
  [`${kit}/RULE-REGISTER.json`, "94fdba5891d5534c5221265b278e30370a4f666f67653f13b69cc7545dc653e3"],
  [`${kit}/DESIGN-TOKENS.json`, "42e405100bafca42749532db99a3d8afd20b0bda0bf3fe9095fb09ef22388271"],
  [`${kit}/TOKEN-USAGE.json`, "47f6117783c9f972796303e8a5d1650da07485c5445e9828ca4cd80276ea556d"],
  [`${kit}/SPECIMEN-TRACEABILITY.json`, "0774e59f97b553a27687f204cadb5dbb808686c96e4eece595130d1f81bc804d"],
  [`${kit}/PROOF-MANIFEST.json`, "0ee063b961436fa21d680fd0808b86c95e0b64f15057afcedc94e2a301851b91"],
  [`${kit}/MEDIA-PLACEMENT-LEDGER.json`, "6fd58f8b225c995f7e56b56f8b0265d72c8a75d35af15577f52035e200739a9c"],
  [`${kit}/VERIFICATION-RECEIPT.md`, "268fc97d2562274401fd2fb41e00d38f6d2faf7343fb435a53e633a4ed3f66ab"],
  [`${kit}/COMPLETION-AUDIT.md`, "426d3f449b8b4e766d0f09b47714b86b62be1f4e71a7b542e069ce7fa80a197c"],
  [`${kit}/style-kit-playground.html`, "e8a2c1912799ba440e3b8c4f107d87fdee0315593e0c6f1384ff949c5a5168ca"],
  [`${kit}/playground.css`, "094206e8143ccc2ba5216d057cd2f1d019a7df599926fc20cc6748197d385d67"],
  [`${kit}/playground.js`, "16e6f563755225ba013b04147b0cb4201ac455f2d24b5e0a75f46b14d1e7bd41"],
  [`${kit}/verify-style-kit.mjs`, "92cc79bac71bb4b11caf5bce29e039847a244c1e3db158d64aee4525c348cf1a"],
  [`${kit}/verify-style-kit-core.mjs`, "dbe21f271ce35f935541b093d0fc09fab3f45b9a2dd96bbf3c232ed00e2abffb"],
  [`${kit}/verify-style-kit-positive-controls.mjs`, "cc0087d4633d4eeddf48055461b2f563e16d4ba5a1bdb91651812f0060fa807c"],
  [`${kit}/verify-style-kit-browser.mjs`, "ee78d1f6b2c6b5698d6f67c00e7bba49543de7409798bcc59cb3705b545163e0"],
  [`${repo}/docs/orchestration/reviews/MAPLEMOON-STYLES-KIT-V030-BOSS-INTAKE-20260814T191258.md`, "f179584e144035b2f4a278f17b2a01964ba0548e24fbfe226de95f7f5f7a1d2e"],
  [`${repo}/docs/orchestration/reviews/MAPLEMOON-STYLES-KIT-V030-BOSS-INTAKE-20260814T191258.json`, "eabc612bdf5f530d6e2b5d9208af42e9a70f2052d258cc3fbf6baa8d1e4cd701"],
  [`${candidate}/homepage.html`, "27921b2a466ccb670b2851a73043429763d3423bcaf651069e4e860dc01a78b1"],
  [`${candidate}/our-story.html`, "2db31868a9791f373f156e7cdeb8261e494d1d47e9418a94c28156e213df7711"],
  [`${candidate}/carob-story.html`, "4fd9ad0fabb9d60d0f391925f5a382ccfc8f705b60fca1c681f403a5cd9734bd"],
  [`${candidate}/shop.html`, "f111ad5123e34dadd46ac497fca286066efc67c05dd7e68f0d3e70c97c735038"],
  [`${candidate}/faq.html`, "c5ce7aaf0b9b3221f34eb2928fc2ff6732fc1a915ea80144a4ade2b94011fb6e"],
  [`${candidate}/stockists.html`, "4821adfe88680d4f174b7a8700c8d8a65594df2901bf3a7109d51b09040cb887"],
  [`${candidate}/pure-carob-bar.html`, "015cde27ecc60f3c444820a551c39f6e9c985fc5b2e59bdaea5f496c1c236b65"],
]);

let failed = 0;
for (const [file, wanted] of expected) {
  const actual = fs.existsSync(file)
    ? crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex")
    : "MISSING";
  if (actual === wanted) console.log(`PASS ${actual} ${file}`);
  else { failed += 1; console.log(`FAIL expected=${wanted} actual=${actual} ${file}`); }
}
if (failed) {
  console.log(`RESULT FAIL hash_replay=${failed}/${expected.size}`);
  process.exit(1);
}
console.log(`RESULT PASS hash_replay=${expected.size}/${expected.size}`);
