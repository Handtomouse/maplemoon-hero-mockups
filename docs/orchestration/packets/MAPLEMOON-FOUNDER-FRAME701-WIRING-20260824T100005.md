# MapleMoon frame-701 founder wiring — 2026-08-24 10:00 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-FOUNDER-FRAME701-WIRING-20260824T100005",
  "worker_thread_id": "019ffe53-6243-73a2-9d75-e1a072cd07ce",
  "state": "admitted_founder_visual_acceptance_and_wiring",
  "objective": "Replace the superseded Our Story founder hero with Nate's selected frame-701 pair, replace the two neutral founder placeholders with the accepted frame-701 v2 bio portraits, and produce rendered desktop/mobile evidence without changing copy, layout outside founder media, Shopify, Git, deployment or production.",
  "authority": "Nate directed BOSS to execute the ranked plan after choosing review-in-real-CSS before founder acceptance. The 2026-08-24 real-CSS review accepted the frame-701 pair crop and both frame-701 v2 bios. pair_592 and pair_870 are excluded from live use because they are not the selected frame-701 header.",
  "base": {
    "head": "7c04f808e285acc116ae0f93c3d887ee1e96aea3",
    "our_story_sha256": "eb51f23e2124deb2cf11a8f5361db83b4bdb53e3cc432b4f7208fc4d3344a659",
    "frame701_source_sha256": "b80bcdaf58bf952217bbc5ea32d90ee1ae8340c29767f43e8735fca62723d4f1",
    "carli_v2_sha256": "48b7032778a8a492129290bed69054004decc3f93ffc2a8b9b71bd997b7e1f0b",
    "dylan_v2_sha256": "34f7022d44a084d72ef6e05e4f3acf7cd64e26a8a08e3d1b555136dad267f942"
  },
  "readable_paths": [
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-FOUNDER-FRAME701-WIRING-20260824T100005.md",
    "maplemoon-website/_wip/HANDOFF-FOUNDER-IMAGERY-20260803.md",
    "maplemoon-website/our-story.html",
    "maplemoon-website/scripts/check-maplemoon-portrait-crop.mjs",
    "maplemoon-website/out/founder_cutouts_20260823/frame_701_CORRECT.jpg",
    "maplemoon-website/out/masked_founders_20260823/graded_v2/GRADE_REPORT_V2.md",
    "maplemoon-website/out/masked_founders_20260823/graded_v2/bio_carli_701_masked_graded_2400.webp",
    "maplemoon-website/out/masked_founders_20260823/graded_v2/bio_dylan_701_masked_graded_2400.webp"
  ],
  "writable_paths": [
    "maplemoon-website/our-story.html",
    "maplemoon-website/assets/our_story/founders_frame701_pair_2400.webp",
    "maplemoon-website/assets/our_story/founder_carli_701_v2_2400.webp",
    "maplemoon-website/assets/our_story/founder_dylan_701_v2_2400.webp",
    "maplemoon-website/_wip/evidence/founder_frame701_wiring_20260824T100005",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-FOUNDER-FRAME701-WIRING-20260824T100005.json"
  ],
  "implementation_contract": [
    "derive the hero only from frame_701_CORRECT.jpg using the exact visually accepted centred 4000x2667 crop and a 2400x1600 sRGB WebP; no generative or identity change",
    "copy the two accepted v2 2400px bio WebPs byte-for-byte into the named governed asset paths",
    "replace both superseded hero references and the two neutral placeholder media blocks only",
    "bio slots remain exact 4:5, object-position 50% 35%, vertical-only fades at desktop and mobile",
    "preserve all customer copy, founder names, roles, details interactions and favourite products byte-for-byte"
  ],
  "verify": [
    "all three source hashes match at acquisition and close",
    "pair_592 and pair_870 references are zero and the superseded maplemoon_heros73 reference is zero",
    "the selected frame-701 hero occurs exactly twice and each frame-701 bio occurs exactly once",
    "real current CSS renders nonblank at 1440 and 390 with both founders visible, no broken images, no root overflow and no runtime errors",
    "founder bio slots are 4:5 with vertical-only masks and the approved object position",
    "seven-route local checks and exact minimum-release preflight pass or stop truthfully",
    "only the six exact writable paths change"
  ],
  "stop": [
    "the selected frame-701 crop clips either face at 1440 or 390",
    "a source hash, alpha identity, current page base hash or path scope differs",
    "a customer-copy, non-founder media, Shopify, Git, deploy or production change is required",
    "any required browser, overflow, image, runtime or preflight check fails"
  ],
  "forbidden_actions": [
    "mutate, delete, stage, move, rename or gitignore any preserved out artifact",
    "wire pair_592, pair_870 or the superseded maplemoon_heros73 asset",
    "commit, push, deploy, publish, change Shopify or contact the client"
  ],
  "next_reviewer": "MapleMoon BOSS for rendered evidence and receipt replay",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->

## BOSS decision

GO for the exact frame-701 founder wiring only. The v2 grade is accepted for the two
individual frame-701 bios. The correctly oriented frame-701 pair is accepted for the
header after real-CSS review at 1440 and 390. Frames 592 and 870 remain excluded from
live use because they are not the selected header photograph.
