# MapleMoon Nate decision addendum R3 — 2026-08-15 04:36 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-NATE-DECISION-ADDENDUM-R3-20260815T043624",
  "worker_thread_id": "/root/dedup_risk_audit",
  "state": "ready_read_only_decision_consolidation",
  "objective": "Consolidate the still-open Nate site decisions, two mechanically eligible photo derivatives, the one-call OpenAI generation gate, the frame-55 HOLD and the accepted provisional visual-guidance boundary into one compact decision addendum; do not implement or infer approval.",
  "authority": "The root MapleMoon Boss may consolidate verified recommendations and exact decision wording. Nate alone may approve the site defaults, exact derivative admission/export/wiring, unknown-price generation call, production movement or client contact. This packet is documentation only.",
  "base": {
    "nate_decision_r2_review_sha256": "87b7ab4fa3e189e9ddbb7346d4c0c83914ffbedf191640e5c25b7f9669d0a56b",
    "nate_decision_r2_receipt_sha256": "96e91efab97ce789fcd5cdbd174d621a04d2723d0bf496c2b4e7bb8ac8c13dfc",
    "v040_boss_handoff_sha256": "cf2cded755ede6064b54cc5966a7cda45e5e8e46d1314b612ba9037bffcd5932",
    "v040_receipt_sha256": "e727823094643a4800bb0ad6b36fe0282fd2b954a39029548b4d3bcfd6a82caa",
    "openai_manager_sha256": "6b73d41854e750d992a1df444e9cb92613d35a4a13c092094724b8c65b7009be",
    "openai_review_sha256": "dac0a0ef64d12538a68c0fc8458a39e8fc0ce8f799cd3ec030afeabd966619a9",
    "photo_admission_manifest_sha256": "9414d10791cc7f6fab3d989b328e1cc02319add981ca96c294381a7d695cfb4d",
    "photo_admission_review_sha256": "e467ac9bbe194bd2dead621b2af209db2bac4cbe40ab81e72e2bfc6bb4494f77",
    "frame01_derivative_sha256": "5ec6ed4a7c165f7cef429a92793207d4f7bc6315769f5338887fc722236ef74b",
    "frame43_derivative_sha256": "b98dd076eb8efa522e738c9b3f7a8870c246fb3f707c1109655a2b594d9e49b0",
    "candidate_root": "/Users/handtomouse/maplemoon_build_20260813",
    "certified_preview": "https://maplemoonbuild20260813-28up3uqbm-handtomouses-projects.vercel.app",
    "production_immutable_token": "7vjf2m50b",
    "photo_truth": "current 5/14=36%; 7/14=50% is scenario only after both exact derivative approvals, exports, copies and wiring"
  },
  "readable_paths": [
    "/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/MAPLEMOON-NATE-DECISION-GATE-R2-20260814T184422.md",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/MAPLEMOON-NATE-DECISION-GATE-R2-20260814T184422.json",
    "/Users/handtomouse/Documents/Codex/2026-08-13/maple-moon-shared-site-styles-kit/outputs/version-lanes/v0.4-provisional/BOSS-HANDOFF.md",
    "/Users/handtomouse/Documents/Codex/2026-08-13/maple-moon-shared-site-styles-kit/outputs/version-lanes/v0.4-provisional/VERIFICATION-RECEIPT.md",
    "/Users/handtomouse/maplemoon_product_shots_20260814/eclipse_bite_bundle/openai_bundle_preflight_v8_manager.md",
    "/Users/handtomouse/maplemoon_product_shots_20260814/eclipse_bite_bundle/openai_bundle_preflight_v8.html",
    "/Users/handtomouse/.codex/visualizations/2026/08/13/019ffd5b-edd2-7b23-8780-453f9b67a532/maplemoon_photo_admission_01_43_20260815_041620/manifest.json",
    "/Users/handtomouse/.codex/visualizations/2026/08/13/019ffd5b-edd2-7b23-8780-453f9b67a532/maplemoon_photo_admission_01_43_20260815_041620/maplemoon_photo_admission_review_20260815.html",
    "/Users/handtomouse/maplemoon-website/scripts/check-maplemoon-receipt.py"
  ],
  "writable_paths": [
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-NATE-DECISION-ADDENDUM-R3-20260815T043624.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-NATE-DECISION-ADDENDUM-R3-20260815T043624.json"
  ],
  "method": [
    "create a timestamped non-overwriting checkpoint for the exact two outputs and pass phase=start with --root /Users/handtomouse before writing",
    "read every named predecessor in full and verify all eight pinned hashes at acquisition and close",
    "carry D01-D06 from R2 without changing their recommendations or treating them as approvals",
    "add exact decision rows for frame 01 and frame 43, preserving mechanically eligible only, unproved flavour/prop identity, 1600x2400 sRGB WebP contract, 20-minute combined export estimate and separate website QA",
    "add the exact one-call OpenAI decision wording: one built-in generation using the five references in verified order and exact v8 prompt; price unavailable; no retry or follow-up generation",
    "preserve frame 55 as HOLD and excluded, v0.4 as provisional planning guidance only, candidate unchanged, production frozen and client contact forbidden",
    "state 5/14=36% exactly once as current truth and 7/14=50% only as a conditional future scenario",
    "provide one compact reply grammar so Nate can approve the recommended defaults, both exact derivatives and the one-call OpenAI gate together or list exceptions",
    "write a maplemoon-receipt/v2 JSON and run completion/promotion gates; promotion means decision-document admission only"
  ],
  "verify": [
    "all eight source hashes match at acquisition and close",
    "D01-D06 are unchanged from R2",
    "frame01 and frame43 full SHA-256 values appear exactly once each and are never called approved or wired",
    "the OpenAI wording includes exact v8 prompt/reference order, unknown price and no retries",
    "frame55 remains HOLD, v0.4 remains provisional planning guidance, current photo truth is 36%, production remains frozen",
    "only the two exact outputs change",
    "completion and promotion gates pass literally"
  ],
  "stop": [
    "any pinned hash changes",
    "a source contradiction cannot be reconciled without guessing",
    "a recommendation is presented as Nate approval",
    "the current photo ratio is stated as 50% or the conditional scenario is presented as current",
    "implementation, image export/copy/wiring, generation, deploy, production mutation, Git mutation or client contact is requested",
    "a path outside writable_paths changes"
  ],
  "forbidden_actions": [
    "edit the candidate, site, build, media, Styles Kit, product packet or photography evidence",
    "approve, export, copy, wire or promote frames 01 or 43",
    "run image generation or spend",
    "deploy, promote, alias, change protection, move production, commit, push, stash, delete, gitignore or contact the client"
  ],
  "next_reviewer": "MapleMoon root Boss for receipt replay, then Nate for the exact consolidated choices",
  "requires_visual_evidence": false
}
<!-- CONTROL-PLANE:END -->

## Boundary

This addendum simplifies Nate's decision surface. It grants no implementation, media admission, generation, deployment, production or client-contact authority.
