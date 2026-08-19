# MapleMoon exact caffeine FAQ correction — 2026-08-14 14:42 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-FAQ-CAFFEINE-EXACT-20260814T144235",
  "worker_thread_id": "019ffd66-b02c-7470-82ef-24a9b199e907",
  "state": "ready",
  "objective": "Replace only the candidate FAQ's obsolete caffeine question and answer with Nate's exact approved DEC-011/CNT-005 wording, prove the rendered answer at measured mobile and desktop widths, and stop without deployment or any other content change.",
  "authority": "Nate explicitly selected DEC-011 option A in Codex task 019ff65f-fd33-7e51-8a83-360ba2f8d665. The exact wording is carried in CONTENT-SAFETY-AND-VOICE.md and DECISIONS-NEEDED.md. This direct named decision is the only content authority in this packet.",
  "base": {
    "faq_sha256": "99dcafedaf8e812ffd2a55fdb028e27529dd47506ca8be68cc2dab0634afd493",
    "certified_preview": "https://maplemoonbuild20260813-41r5obchf-handtomouses-projects.vercel.app",
    "production_frozen_md5": "6197879a5ca9d3ed0452773abc0bbeb4"
  },
  "readable_paths": [
    "Documents/Codex/2026-08-13/maple-moon-shared-site-styles-kit/outputs/CONTENT-SAFETY-AND-VOICE.md",
    "Documents/Codex/2026-08-13/maple-moon-shared-site-styles-kit/outputs/DECISIONS-NEEDED.md",
    "maplemoon-website/docs/orchestration/SIDECHAT_RECEIPT_GATE.md",
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-SEVEN-WORKSTREAM-PROGRAM-20260814T143154.md",
    "maplemoon_build_20260813/faq.html",
    "maplemoon_build_20260813/assets/design-system",
    "maplemoon_build_20260813/mock-cart.js",
    "maplemoon_build_20260813/mock-cart.css",
    "maplemoon_build_20260813/tools_20260813/preflight_deploy.py"
  ],
  "writable_paths": [
    "maplemoon_build_20260813/faq.html",
    "maplemoon-website/_wip/evidence/faq_caffeine_exact_20260814T144235",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-FAQ-CAFFEINE-EXACT-20260814T144235.json"
  ],
  "exact_replacement": {
    "question": "Does carob contain caffeine?",
    "answer": "Carob itself is naturally caffeine-free. Its mellow, naturally sweet flavour works beautifully in bars, baking and warm drinks. Maple Moon recipes vary, so please check the individual product label for the full ingredient list."
  },
  "method": [
    "verify the phase-start gate at repository root /Users/handtomouse before the first admitted write",
    "change only the one JavaScript FAQ object with id caffeine; preserve order, keywords, category and every other byte except the minimal question/answer replacement",
    "render the actual dynamic FAQ and open the caffeine item at measured 390 and 1440 CSS px",
    "save screenshots and machine-readable computed evidence in the admitted evidence directory",
    "run exact-text, HTML/JavaScript parse, runtime, overflow, route, local preflight and checkpoint-delta checks",
    "write one maplemoon-receipt/v2 receipt and run the completion gate"
  ],
  "verify": [
    "acquisition FAQ SHA-256 equals 99dcafedaf8e812ffd2a55fdb028e27529dd47506ca8be68cc2dab0634afd493",
    "the old question Is there any caffeine? and old answer No carob is naturally sweet and we use stimulant free ingredients are absent",
    "the exact approved question and answer occur once and render as the opened caffeine item",
    "390 and 1440 viewport evidence has no horizontal overflow, broken image or runtime error",
    "all seven routes still return 200 locally and preflight returns its established pass profile",
    "only faq.html, the admitted evidence directory and the receipt differ from the checkpoint",
    "production alias and frozen homepage remain unchanged"
  ],
  "stop": [
    "the acquisition FAQ hash differs",
    "the exact approved wording cannot be inserted without another content or structural edit",
    "another worker is changing faq.html",
    "rendering, runtime, overflow, route or preflight verification fails",
    "any path outside writable_paths would change",
    "commit, push, deploy, preview promotion, production, client contact or email is requested"
  ],
  "forbidden_actions": [
    "edit the cacao-butter FAQ or any other question, answer, metadata, route, style, script or asset",
    "generalise carob's caffeine statement to every finished product",
    "change the Shop catalogue, product claims, prices or image bindings",
    "commit, push, deploy, publish, promote, alter Vercel protection, move production or contact the client"
  ],
  "next_reviewer": "MapleMoon BOSS independent completion gate",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->

## Exact user-approved copy

**Does carob contain caffeine?**

Carob itself is naturally caffeine-free. Its mellow, naturally sweet flavour works beautifully in bars, baking and warm drinks. Maple Moon recipes vary, so please check the individual product label for the full ingredient list.

This packet does not authorize any other FAQ correction. In particular, the cacao-butter answer remains a separately visible content-risk item and must not be silently rewritten in this phase.
