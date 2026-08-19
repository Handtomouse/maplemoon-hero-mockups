# MapleMoon style-only mobile chrome correction R2 — 2026-08-17 14:00 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-STYLE-CHROME-CORRECTION-R2-20260817T140018",
  "worker_thread_id": "019ff65f-fd33-7e51-8a83-360ba2f8d665",
  "state": "admitted_bounded_correction_after_r1_required_browser_fail",
  "objective": "Diagnose and correct only the task-owned style-chrome implementation or evidence-harness failures recorded by MAPLEMOON-STYLE-CHROME-DERIVED-20260817T134139, produce a new non-overwriting seven-route derived output, and rerun the complete original verification programme without changing claims, route content, route design, WIPs, sealed Styles Kit outputs, Git, deployment or production.",
  "authority": "Nate explicitly agreed to execute the recommended bounded correction after the R1 FAIL receipt. BOSS authority is limited to the already approved style-only mobile chrome/accessibility slice: 70px mobile header through 900 CSS px, 44px Menu and all exposed chrome targets, centred intact Maple Moon wordmark, truthful Contact/right-side balance, no mobile cart, working first-focus skip route, the evidenced Our Story main/skip shell repair, NAV-001 through NAV-003, CMP-009 and RESP-004 as requirements, and NAV-004/RESP-005 as technical proof gates. This packet grants no claim, customer-copy, route-design, media, fog, font, token, section, Shop-polish, overlay, footer, commerce, Shopify, deploy, production, Git or client-contact authority.",
  "predecessor": {
    "packet_id": "MAPLEMOON-STYLE-CHROME-DERIVED-20260817T134139",
    "packet_sha256": "d9c0297df589071f76abf35a18f19cd0a682517332101060688ee3e4a9c04fe6",
    "failed_receipt_sha256": "5594ab1a0f0f49c5f1215a85f4cb7809f04e0af4c5921a0169a9602176b86526",
    "failure_evidence_sha256": "f4cc934887efc9aa176a6e3e46d748cf6907d558526d747171c0e8d6ca8e890a",
    "failed_builder_sha256": "726c65c2fa9c0e1de1c0831abd5705300548c76b28bbb2799074fbb17e0bc3d5",
    "failed_output_directory_sha256": "f53f8204edfe56832447041d8d62893e3d8af008bdf968f82ae89f7832f75f3d",
    "failed_runtime_css_sha256": "cf60a69f1d432f2541ea767a799698871b3596009b050531371f58f4f2981e2f",
    "failed_runtime_js_sha256": "dc89044889a54da7079d4eca2072651b32a87e44b44f508df6dd5d1126ae6a1e",
    "failed_derived_manifest_sha256": "92ee1370bb25b88f8bdc12cdf43ea7d742f9c6c1fa4cd80b2ab8e26b409b1f17",
    "failed_patch_manifest_sha256": "ab8e2c2983a8bda1135c3ab0a1faa749ba8d585efa8d977be148735cfcad5486",
    "failed_projection_proof_sha256": "3dd89bb49ba4239cd53895f94f1aa1e9fb5a88bd9e6239cf4a4726cfcfeb7968"
  },
  "base": {
    "homepage_wip_sha256": "423184b66a18a2e1eb44bf547b6392ef1bc26be982309846c949c4e971251c04",
    "shop_wip_sha256": "b444b0da4f5778f7434c6343854e3cdf48d1a88b038c7863a2ef1d46b5e0cbac",
    "our_story_wip_sha256": "6beef3f9449804e800ad7883c311c957637d12a5e05c69beb7ed912e49b36e23",
    "carob_story_wip_sha256": "c6b545bc4983960e4ce41bc0bc3a4bdf6ae8432dd5fdbc8e6c26980592d3f2d0",
    "faq_wip_sha256": "3b1156324e7c9156b995bafdc036a28da83be5e7890ba12cf8d14868f49cdcc4",
    "stockists_wip_sha256": "dbff73357e3425005db5fc7f0e0e589ed8a70b9dbcb62f31cab667cf37409f37",
    "pure_input_sha256": "015cde27ecc60f3c444820a551c39f6e9c985fc5b2e59bdaea5f496c1c236b65",
    "private_preview_builder_sha256": "803c439e0e937309b7ada0c3f886983908c3cc6aed64f92e38c57fd656707808",
    "component_contracts_sha256": "13baca79c623a51d0d0ce2cc68b56c28e508bb8bd1c8125c05ca041836c69066",
    "responsive_accessibility_sha256": "b483972491eb530722ea2c0ac1362a85dfe825d9c4627db0f28b50322c80a4e2",
    "rule_register_sha256": "94fdba5891d5534c5221265b278e30370a4f666f67653f13b69cc7545dc653e3",
    "v040_boss_handoff_sha256": "cf2cded755ede6064b54cc5966a7cda45e5e8e46d1314b612ba9037bffcd5932",
    "native_200_review_sha256": "01173ba097490c2b3fa2902c1252e1ef2db61d3e1cef92845e5dde14e3b8c8fc",
    "native_200_receipt_sha256": "2ce32f493fce151f91a8f7750f1141a99bea70167254cd081e9c080874ab87d5",
    "production_immutable_token": "7vjf2m50b",
    "production_homepage_md5": "6197879a5ca9d3ed0452773abc0bbeb4"
  },
  "readable_paths": [
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-STYLE-CHROME-CORRECTION-R2-20260817T140018.md",
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-STYLE-CHROME-DERIVED-20260817T134139.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-STYLE-CHROME-DERIVED-20260817T134139.json",
    "maplemoon-website/_wip/evidence/style_chrome_derived_20260817T134139",
    "maplemoon-website/_wip/deploy/generated/maplemoon-style-chrome-derived-20260817T134139",
    "maplemoon-website/scripts/build-maplemoon-style-chrome-derived.py",
    "maplemoon-website/docs/orchestration/SIDECHAT_RECEIPT_GATE.md",
    "maplemoon-website/scripts/check-maplemoon-receipt.py",
    "maplemoon-website/scripts/build-maplemoon-wip-preview.py",
    "maplemoon-website/_wip/homepage_real_1_lead_photo.WIP.html",
    "maplemoon-website/_wip/shop.WIP.html",
    "maplemoon-website/_wip/our-story.WIP.html",
    "maplemoon-website/_wip/carob-story.WIP.html",
    "maplemoon-website/_wip/faq.WIP.html",
    "maplemoon-website/_wip/stockists.WIP.html",
    "maplemoon_build_20260813/pure-carob-bar.html",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-NATIVE-200-ZOOM-AUDIT-R2-20260814T180224.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-NATIVE-200-ZOOM-AUDIT-R2-20260814T180224.json",
    "maplemoon-website/_wip/evidence/native_200_zoom_audit_r2_20260814T180224",
    "Documents/Codex/2026-08-13/maple-moon-shared-site-styles-kit/outputs/COMPONENT-CONTRACTS.md",
    "Documents/Codex/2026-08-13/maple-moon-shared-site-styles-kit/outputs/RESPONSIVE-ACCESSIBILITY.md",
    "Documents/Codex/2026-08-13/maple-moon-shared-site-styles-kit/outputs/RULE-REGISTER.json",
    "Documents/Codex/2026-08-13/maple-moon-shared-site-styles-kit/outputs/version-lanes/v0.4-provisional/BOSS-HANDOFF.md",
    "UFC/ops/bus/maplemoon/tools_20260813/preflight_deploy.py"
  ],
  "writable_paths": [
    "maplemoon-website/scripts/build-maplemoon-style-chrome-derived-r2.py",
    "maplemoon-website/_wip/deploy/generated/maplemoon-style-chrome-derived-r2-20260817T140018",
    "maplemoon-website/_wip/evidence/style_chrome_correction_r2_20260817T140018",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-STYLE-CHROME-CORRECTION-R2-20260817T140018.json"
  ],
  "implementation_contract": [
    "preserve every failed R1 path byte-for-byte; create the R2 builder, derived output, evidence and receipt only at the four new non-overwriting writable paths",
    "derive from a fresh unique output of the pinned private-preview builder, never from the failed R1 output and never by editing a WIP, Pure input or the existing preview builder",
    "before correcting code, run a bounded 390px differential diagnostic against the fresh baseline, failed R1 output and current R2 attempt; record full sequential focus order, skip target existence and activation, every chrome target rectangle, and every overflow element with a stable selector, rectangles, computed overflow/box-sizing/min-width and containing clip chain",
    "distinguish implementation failures from harness failures using exact baseline-versus-derived evidence; do not hide a real defect by loosening a threshold, deleting a gate, adding a broad selector exclusion or treating a task-owned regression as baseline state",
    "permitted implementation corrections are limited to generated R2 mobile-header markup, generated R2 CSS/JS, exact reversible injection patches and the already authorised Our Story skip/main shell; no customer copy, route content, page-specific visual treatment or non-generated route CSS may change",
    "at measured widths up to and including 900 CSS px expose exactly one 70px shared mobile header with no horizontal clipping: a minimum-44px Menu, centred unbroken Maple Moon wordmark, minimum-44px truthful Contact action/right-side balance, no cart, and minimum-44px navigation rows",
    "all injected chrome descendants must use explicit safe box sizing and shrink constraints where mechanically necessary; this is authority to fix the recorded Our Story 32px task-owned root overflow, not authority to restyle Our Story",
    "the first sequential keyboard focus on every route must be a visible skip link with an existing target; activating it must reach the intended main/content target without focus being obscured by the fixed chrome",
    "root scrollWidth must equal clientWidth at every required width; generated chrome must have zero internal overflow; any final harness classification of a non-generated contained element must be based on recorded baseline equality, visibility, clip/scroll purpose and a positive control, while the final user-visible/internal-overflow verdict remains zero failures",
    "at widths above 900 CSS px the generated mobile shell is absent from layout and baseline desktop header/main/footer geometry remains exact",
    "all R1 protected projection guarantees remain mandatory: customer text, title/meta/social values, scripts, forms, media bindings, non-header links and footer bytes equal the fresh baseline; reverse-patch reconstruction is byte-exact for all seven HTML files",
    "NAV-001, NAV-002, NAV-003, CMP-009 and RESP-004 remain requirements only; NAV-004 and RESP-005 remain proof gates only; no rule or planning guidance is promoted by this packet"
  ],
  "method": [
    "before the first R2 writable output, create a timestamped non-overwriting checkpoint for all four writable paths and pass phase=start with --root /Users/handtomouse",
    "verify the predecessor packet, failed receipt, failure evidence, failed builder/output manifests/runtime assets, all eleven base pins and both native-200 pins exactly; stop on any drift",
    "replay the predecessor completion gate and require its literal FAIL to match the recorded failed receipt; do not promote or repair R1 in place",
    "build a fresh unique baseline under /private/tmp with the pinned existing private-preview builder and record its full manifest/digest",
    "create one new deterministic R2 builder by bounded correction of the pinned R1 design; make it refuse overwrite, use staging, exact count-one patches, reverse reconstruction and protected projections",
    "preserve the first failed diagnostic attempt and every subsequent harness/implementation correction with rationale; a harness correction must retain or strengthen positive controls for skip focus, sub-44 targets, generated overflow, root overflow and genuine user-visible internal overflow",
    "once the focused 390px diagnostic passes all seven routes, rerun the full 35-case measured-width matrix at 390, 768, 900, 1024 and 1440 from fresh browser contexts",
    "run mobile Menu interaction on all seven routes at 390 and 900 in regular and prefers-reduced-motion modes, proving label/state/aria-controls, focus visibility, panel labelling, background containment, focus trap, Escape, opener focus return, 44px rows, reduced motion and no runtime/request failures",
    "run the complete fourteen-case native 200 percent matrix at effective 390 and 720 using the previously proven native preference method; do not substitute browser emulation and HOLD if a safely isolated native session cannot be established",
    "capture nonblank route and interaction screenshots, inspect every required image set, and preserve exact quantitative browser JSON plus any superseded attempts",
    "run python3 -B /Users/handtomouse/UFC/ops/bus/maplemoon/tools_20260813/preflight_deploy.py against the R2 derived root and record literal output; this grants no deployment authority",
    "prove all failed R1 artifacts, six WIPs, Pure input, existing preview builder, four sealed Styles Kit pins and frozen production identity remain unchanged at close",
    "write the maplemoon-receipt/v2 JSON and run completion then promotion gates; promotion means evidence-complete for BOSS review only and never deployment"
  ],
  "verify": [
    "only the four exact R2 writable paths changed and every failed R1 path stayed byte-identical",
    "fresh baseline manifest/digest, predecessor failure pins, eleven base pins, two native-200 pins and production freeze match at acquisition and close",
    "R2 build passes seven of seven reverse reconstructions and seven of seven protected projections",
    "the focused diagnostic explains and closes each R1 failure class without an unproved exclusion: skip focus, mobile target sizing, Our Story 32px root overflow and the reported internal-overflow elements",
    "all 35 measured cases pass; all 28 regular/reduced mobile interaction cases pass; all 14 native-200 cases pass",
    "all seven mobile routes have one exposed header, one main, first-focus working skip, exact 70px chrome, centred intact wordmark, Contact, no mobile cart and no user-visible or generated internal/root overflow",
    "1024 and 1440 generated chrome is absent and baseline header/main/footer geometry is exact",
    "rendered evidence is nonblank and inspected; broken images, obscured focus, console/page/request/bad-response failures are zero",
    "exact local preflight passes at its existing fail tiers",
    "completion and promotion receipt gates pass"
  ],
  "stop": [
    "a predecessor failure pin, base/source close hash, native-200 pin, sealed Styles Kit pin or production freeze differs",
    "a customer-copy, claim, metadata, JSON-LD, form, media, non-header link, footer or protected route projection differs",
    "a correction requires route-specific design/content CSS, a WIP/Pure/existing-builder/R1 edit, or any scope outside generated R2 chrome and the admitted Our Story shell",
    "a real focus, target-size, overflow, menu, semantic, reduced-motion, native-200, runtime, request, image, preflight or rendered-evidence failure remains after bounded correction",
    "the harness can pass only by weakening a threshold, broadly suppressing elements, removing a positive control or relabelling a task-owned regression as baseline",
    "a path outside writable_paths changes"
  ],
  "forbidden_actions": [
    "overwrite, delete, rename or mutate any failed R1 artifact or evidence",
    "edit a WIP, Pure input, existing private-preview builder, sealed Styles Kit output, media/source master, customer copy, claim authority or route-specific design",
    "adopt unresolved FND tokens, preferred-font delivery, page-header/media/fog/section/Shop/overlay guidance, footer redesign, catalogue/commerce/stockist/newsletter transformations or blanket v0.4 guidance",
    "deploy, promote a Vercel target, move production, alter protection, access Shopify, commit, push, stash, delete, gitignore or contact the client"
  ],
  "next_reviewer": "MapleMoon BOSS for receipt replay, then separately packeted independent certification; no deployment",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->

## BOSS correction decision

**GO — bounded R2 correction only.** The R1 failure was real and correctly
stopped. R2 may diagnose whether each recorded failure is implementation-owned
or harness-owned, but it may correct only the generated mobile chrome, its
evidence harness and the already authorised Our Story skip/main shell. A route
design problem remains outside this packet and must stop rather than expand.

The failed R1 output remains a permanent failed evidence artifact. R2 must be
new, non-overwriting and independently reconstructable from a fresh pinned
baseline.
