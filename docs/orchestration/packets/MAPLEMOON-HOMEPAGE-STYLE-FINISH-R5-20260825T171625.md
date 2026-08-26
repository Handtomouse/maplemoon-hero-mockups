# MapleMoon homepage style finish R5 — bounded containment and visual-proof correction — 2026-08-25 17:16 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-HOMEPAGE-STYLE-FINISH-R5-20260825T171625",
  "worker_thread_id": "019ffe53-6243-73a2-9d75-e1a072cd07ce",
  "state": "admitted_non_overwriting_successor_to_r4_diagnostic_hold",
  "objective": "Build a new immutable-baseline homepage style candidate that corrects the R4 starter containment and trust-field visual defects, then produce clean exact-width and independent visual evidence without changing the live homepage, its flow, content, media, controls or behaviour.",
  "authority": "Nate authorised the staged style integration and told BOSS to plan and execute. R4 truthfully stopped on a task-owned starter overflow and invalid mobile proof acquisition. R5 may make the two bounded CSS corrections and correct the evidence harness. It may classify the inherited clipped carousel as a narrowly tested intentional carousel exception and the inherited frozen newsletter runtime as a separately held integration issue; it may not change either source/runtime.",
  "predecessor": {
    "r4_packet_sha256": "50b85ea25461462e57503aafb7485796aa7919a9958f525912aba7ee3bd35f7b",
    "r4_receipt_sha256": "743a2d5eba769f80894872be0e2949962e8b193cdfa013307422472cd6232a42",
    "r4_builder_sha256": "ce2bb9d10c093f2aa143f1c403a160ff6b6c56a3e09d0233f94905f0125659cf",
    "r4_output_directory_sha256": "fa218fcc78f4a403b311582b8c7219dd2cac25950f7b96914ab1f8e1186cde3e",
    "r4_css_sha256": "a8b375da22e3183b8815246b58b6cf80d75d6ffb76b5c87e42f5c8dcf3cf0a82",
    "r4_manifest_sha256": "2202972d589b9d89166b1a6c40663940d58e5a195f38cac7bfdce46109ff7df8",
    "r4_diagnostic_sha256": "372f6daf3dfb30014e1a3b8633168395a34196437d74b6dd346cd56f99f6170f",
    "r4_evidence_directory_sha256": "c4e5271bc69c36e6934c924b686ac4627918d091dd4a00382e7cdd4b303e2cb1"
  },
  "sealed_base": {
    "source_snapshot_sha256": "792e6508d21a4b1840f5a35fd28af05962030a7e2e32e73cda4651c7e5a48dd9",
    "baseline_directory_sha256": "394b65d1f98b931cc6fa90f685a363654ad3baa691321be1c8bc524d07c825c1",
    "baseline_file_count": 77
  },
  "readable_paths": [
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-HOMEPAGE-STYLE-FINISH-R5-20260825T171625.md",
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-HOMEPAGE-STYLE-FINISH-R4-20260825T165002.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-HOMEPAGE-STYLE-FINISH-R4-20260825T165002.json",
    "maplemoon-website/scripts/build-maplemoon-homepage-style-finish-r4-20260825T165002.mjs",
    "maplemoon-website/_wip/deploy/generated/maplemoon-homepage-style-finish-r4-20260825T165002",
    "maplemoon-website/_wip/evidence/homepage_style_finish_r4_20260825T165002",
    "maplemoon-website/scripts/build-maplemoon-wip-preview.py",
    "maplemoon-website/scripts/check-maplemoon-responsive-overflow.mjs",
    "maplemoon-website/scripts/check-maplemoon-receipt.py",
    "maplemoon-website/_wip/homepage_real_1_lead_photo.WIP.html",
    "maplemoon-website/_wip/our-story.WIP.html",
    "maplemoon-website/_wip/shop.WIP.html",
    "maplemoon-website/_wip/stockists.WIP.html",
    "maplemoon_build_20260813/mock-cart.js"
  ],
  "writable_paths": [
    "maplemoon-website/scripts/build-maplemoon-homepage-style-finish-r5-20260825T171625.mjs",
    "maplemoon-website/_wip/deploy/generated/maplemoon-homepage-style-finish-r5-20260825T171625",
    "maplemoon-website/_wip/evidence/homepage_style_finish_r5_20260825T171625",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-HOMEPAGE-STYLE-FINISH-R5-20260825T171625.json"
  ],
  "implementation_contract": [
    "preserve every R1 through R4 path byte-identical and create only the four exact R5 paths",
    "read only the sealed R4 source snapshot and baseline; never read the moving live homepage as a build input",
    "carry the complete R4 isolated style layer into a new R5 stylesheet and inject exactly one R5 homepage link; reverse removal must reconstruct the sealed baseline homepage byte-for-byte and every non-Home/support file must remain equal",
    "add exactly 14px inline padding to #sampler.q-sampler .sbox-grid so rotated edge packshots stay within the starter container at 768, 390 and 320 without removing the fan",
    "bind .wrap#trust.wf-trust to the intended dark lower-page field and suppress its inherited pale full-width pseudo-envelope so the cream trust text is readable and the sampler-to-trust-to-footer transition is continuous",
    "preserve homepage flow, text, links, image/video sources, scripts, forms, structured data and exact buttons; q-segments remains absent",
    "do not modify the inherited carousel or mock-cart/newsletter runtime; verify and report them under the bounded dispositions below",
    "stop after completion receipt for BOSS review; do not run promotion, ingestion or deploy"
  ],
  "inherited_dispositions": [
    "carousel edge bleed is allowed only inside the clipped .wf-cf carousel stage when root overflow is zero, the centre item and both arrows are fully visible, arrows are at least 44px, first/last bleed is bounded and intentional, and keyboard/pointer traversal reaches all six products; any other semantic escape fails",
    "the sealed baseline mock-cart runtime re-enables the visibly Demo only newsletter submit; R5 must prove baseline/candidate behaviour is byte- and runtime-equal, form submission creates zero network/storage side effects, and the visible copy remains explicit; record a separate integration HOLD rather than failing or silently waiving the style candidate"
  ],
  "qa_contract": [
    "correct R4 harness-only rectangle use from nonexistent left/top fields to measured x/y, apply style-specific literal gates to the candidate while observing the baseline, count only footer.mm-site-footer, and correct proof metadata without weakening any candidate assertion",
    "capture focused sections from a scrolled viewport or locator screenshot; never crop fixed/off-canvas elements from a full-page screenshot; for the archival full-page record suppress only a closed dialog or stitch settled viewport tiles and record the exact method",
    "use CDP and assert innerWidth, clientWidth, visualViewport.width and root scrollWidth at exact 1440,1024,768,390,320",
    "require flow/text/media/control projection equality, one hero action, q-segments zero, hotspots/comparison/credit/starter gates, zero unexpected semantic overflow/broken images/runtime failures and required targets at least 44px",
    "capture complete nonblank before/after and interaction evidence; independently judge hero, hotspots, comparison, farm/credit, starter, trust/footer and all four story/sampler boundaries",
    "catch all twelve positive controls; record live-source rebase delta without modifying source"
  ],
  "verify": [
    "all sealed base, R4 predecessor, proof and frozen non-Home pins match at acquisition and close",
    "R5 build projections and reverse reconstruction pass; only count-one homepage link, R5 stylesheet and manifest differ from sealed baseline",
    "starter containment is zero escape at all five widths; trust text/background contrast and lower-page continuity receive explicit visual PASS",
    "carousel exception gates pass exactly; newsletter inherited-runtime equivalence and zero-side-effect gate pass while integration remains HOLD",
    "clean screenshot set, interactions, reduced motion, focus, menu, images, runtime, positive controls and independent visual review pass",
    "completion receipt gate passes; promotion is not run"
  ],
  "stop": [
    "a correction requires live source, content, media, button, flow, script, form, structured-data, carousel behaviour or mock-cart mutation",
    "a predecessor, sealed input, proof or frozen non-Home path changes",
    "starter containment, trust continuity, another required check or independent visual judgment fails or is missing",
    "a path outside writable_paths changes as a result of R5",
    "promotion, deploy, production, Shopify, Git or client action becomes necessary"
  ],
  "forbidden_actions": [
    "edit/delete any R1-R4 path, live WIP, existing preview builder, mock-cart, planning proof or existing preview/deployment",
    "change homepage flow, copy, imagery, buttons, comparison-control state, commerce or capability",
    "git add, commit, push, stash, checkout, reset, clean, delete, overwrite, gitignore, deploy, publish, promote, access Shopify or contact the client"
  ],
  "requires_visual_evidence": true,
  "next_reviewer": "MapleMoon BOSS independent visual review; separate explicit packet required for live-source rebase/ingestion and inherited newsletter integration"
}
<!-- CONTROL-PLANE:END -->

## BOSS correction decision

**GO — R5 staged candidate only.** R4 proved the intended styling was close but
not contained or visually complete. Correct the two bounded CSS defects, repair
the proof acquisition, verify the inherited exceptions honestly, and stop
before source ingestion or deployment.
