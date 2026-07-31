# Packet VIS-01C — Saturday Review Shell

**Packet ID:** `VIS-01C-SATURDAY-SHELL`  
**Candidate authority:** `CTRL-V2-CANDIDATE-20260730-001`  
**Cluster:** `VIS-01C-SATURDAY-SHELL`  
**State:** `needs_review`  
**Approval class:** `mutating-local`  
**Owner:** Codex  
**Final decision owner:** Nate

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "VIS-01C-SATURDAY-SHELL",
  "candidate_id": "CTRL-V2-CANDIDATE-20260730-001",
  "phase": "VIS-01",
  "state": "needs_review",
  "approval_class": "mutating-local",
  "cluster_id": "VIS-01C-SATURDAY-SHELL",
  "objective": "Build a reproducible, local, pre-dispatch mechanical shell with clean aliases and a separate annotated entry without changing canonical WIP or the July 29 staging source.",
  "non_goals": [
    "WIP, theme, catalogue, claim, founder-copy, navigation-copy or asset-source changes",
    "Shopify, WooCommerce, Vercel, deployment, send, commit, push or production action",
    "subjective content exclusion or final clean-surface treatment",
    "final visual acceptance or client/family/friends delivery"
  ],
  "readable_paths": [
    "_wip/homepage_real_1_lead_photo.WIP.html",
    "_wip/carob-story.WIP.html",
    "_wip/shop.WIP.html",
    "_wip/our-story.WIP.html",
    "_wip/stockists.WIP.html",
    "_wip/faq.WIP.html",
    "docs/client-review/2026-07-29-carli-review/staging-v1/**",
    "docs/orchestration/SATURDAY_REVIEW_ACCEPTANCE_20260801.md",
    "docs/orchestration/SATURDAY_FEEDBACK_REGISTER_20260801.md",
    "docs/orchestration/VIS_SECTION_LOCK_MAP_20260730.md",
    "docs/orchestration/LOCK_MANIFEST.json",
    "docs/orchestration/approvals/NATE-VIS-01C-TYPEKIT-20260730.json",
    "docs/orchestration/reviews/VIS-01C-PREFLIGHT-RECONCILIATION.md",
    "docs/plans/2026-07-30-maplemoon-master-orchestration-plan-v2.md",
    "docs/orchestration/MASTER_PACKET_REGISTER.md",
    "docs/orchestration/CONTROL_PLANE_INTERFACES.md",
    "docs/orchestration/packets/CTRL-V2-P03.md",
    "docs/orchestration/packets/VIS-01A.md",
    "docs/orchestration/packets/CAT-01A-READ.md",
    "scripts/validate-maplemoon-control-plane.py",
    "docs/orchestration/reviews/CTRL-V2-REVIEW_CHAIN.md"
  ],
  "writable_paths": [
    "docs/orchestration/packets/VIS-01C-SATURDAY-REVIEW-SHELL.md",
    "docs/orchestration/LIVE_PACKET_REGISTER_20260730.md",
    "scripts/build-maplemoon-saturday-review.py",
    "scripts/check-maplemoon-review.py",
    "package.json",
    "docs/client-review/2026-08-01-saturday-review/staging-v1",
    "docs/orchestration/reviews/VIS-01C-SATURDAY-REVIEW-SHELL-QA.md"
  ],
  "base": {
    "branch": "codex-maplemoon-section-review",
    "head": "a6cd91a589ceff18283e4c6250ac256fe97812a4",
    "files": [
      {
        "path": "docs/orchestration/LIVE_PACKET_REGISTER_20260730.md",
        "sha256": "0ea3d01c00094989cfbfb9cdceb1e1f6b201ef98164db148ae0c2b1310f7a65c"
      },
      {
        "path": "scripts/check-maplemoon-review.py",
        "sha256": "27a225b7132efefe0700b69f03f1683c0a690b5421e9fb457a058574c1c69a1e"
      },
      {
        "path": "package.json",
        "sha256": "2cfe0adb8e6584069bb2c4a0c3c20250f84d75433e8951c50ed9493e63b57e1d"
      }
    ]
  },
  "dependencies": [
    "CTRL-V2-P05",
    "NATE-VIS-01C-TYPEKIT-20260730",
    "VIS-01C-PREFLIGHT-RECONCILIATION"
  ],
  "dependency_dispositions": {
    "CTRL-V2-P05": "accepted",
    "NATE-VIS-01C-TYPEKIT-20260730": "approved for this packet only",
    "VIS-01C-PREFLIGHT-RECONCILIATION": "accepted as blocking planning evidence"
  },
  "sources": [
    "docs/orchestration/approvals/NATE-VIS-01C-TYPEKIT-20260730.json",
    "docs/orchestration/reviews/VIS-01C-PREFLIGHT-RECONCILIATION.md",
    "six canonical WIP files listed in readable_paths",
    "six July 29 staged templates listed in source_pins"
  ],
  "source_pins": {
    "dependency_evidence_sha256": {
      "docs/orchestration/approvals/NATE-VIS-01C-TYPEKIT-20260730.json": "7a608ed32f18169b00febb76e4ce9c64cbcf158cf65afff4c1e6285b23028341",
      "docs/orchestration/reviews/VIS-01C-PREFLIGHT-RECONCILIATION.md": "49fe3083f22ae4e8a125de3542be21f28f7e21c14b20f2960ee6b58e5f721109"
    },
    "canonical_wip_sha256": {
      "_wip/homepage_real_1_lead_photo.WIP.html": "e98643f389763f3c50da9001395a783c08eb078719e0499b9d122c35a6c11f12",
      "_wip/carob-story.WIP.html": "cdc426a6a19d8012f9198584842766ed0ee7400d7f93a4642d9bb3db972216c7",
      "_wip/shop.WIP.html": "b11f0eec60ee0a6c0927c0657171cf12044c1aa7f2a781d84a87eb843a6735d0",
      "_wip/our-story.WIP.html": "17b77bc83930a6ad4ef5834427bdeed5ff6672a8001328259aa84e7a98e06304",
      "_wip/stockists.WIP.html": "257662784dfb31792c1604ff7821cb16abdc78281a681311f518498ab8a6e8ce",
      "_wip/faq.WIP.html": "4a7f5eee7096150f23f07cac6316c83893aab34135e3c40ca0e24848b77704f1"
    },
    "july_29_staging_template_sha256": {
      "docs/client-review/2026-07-29-carli-review/staging-v1/homepage.html": "7c71914561916d197d108466f85686ed808342d10d00311ade0289a371f05fbb",
      "docs/client-review/2026-07-29-carli-review/staging-v1/carob-story.WIP.html": "0b26ba08f6fb4819ea9b5a64309b54cc02b34b2b25e819df2f4a7299fa5809fb",
      "docs/client-review/2026-07-29-carli-review/staging-v1/shop.WIP.html": "0742a612bc46bf6accf539095a3e61664e875783eeb5317291fcac0435905e00",
      "docs/client-review/2026-07-29-carli-review/staging-v1/our-story.WIP.html": "d899fb69b77eec6a989a0230225dfcb17232b5802daf36a36f89be506b93dbca",
      "docs/client-review/2026-07-29-carli-review/staging-v1/stockists.WIP.html": "e8f5fc777d8827de5e53fc32acf4078ec0144cd8c8a37d49655c20312914ac9b",
      "docs/client-review/2026-07-29-carli-review/staging-v1/faq.WIP.html": "01b629ddbd43aeddf913e1ea26e58f40037553b000a7f706cfea0d0c05f93e98"
    },
    "copied_support_sha256": {
      "a11y_inner.css": "7ea80be7443dd178360aca4e8b511627aeca156e3ff46cc903a7529c75d999b0",
      "assets/carob_wordmark.svg": "2a16b6671c795ea5126d0f9de5db1238d85c574c13c64e0a32718c154da69560",
      "assets/hero_shots/carob_branch_dusk.jpg": "5f6fd5235bdde463a84d7133317b354208f97f84a1ca98983746be4c625efee9",
      "assets/hero_shots/carob_pods_cluster.jpg": "c2b24330e2a9363be5635619bdaa1890096ba749ccfbf271677bdf38e59046a7",
      "assets/hero_shots/blue_fog_001.webp": "794d3096aadccde851f7045ac2a36989bffce7f57e5a3273f980b6f29bf8a669",
      "assets/hero_shots/byron_bay_silhouette.webp": "edffc47e32ec593282e50731156972de9e10a58e13a47086bfb5a95863940e64",
      "assets/hero_shots/moonlit_ocean_night.webp": "76d8195360474ebc2e944bbae06abbcfb62bb4dd5d79354e12ee3088267c5e15",
      "assets/hero_shots/silhouette_closeup.webp": "ae753811391090aad4b9587792c47dfc020c99a88af443a145b3c544ff6320b7",
      "assets/hero_videos/gen/finalists/graded_blue/finalist_wetsand2.mp4": "35f7c3b6dc5f114b8c841a4a6d0980976f4eac2b8aea569960fd585cf8334f78",
      "assets/licensed/carob_farm/australian-carob-0205-16x9.jpg": "77e99dd87f55a056f870c632a4d8a012b77db1114ee0791cef918cd5ee57896b",
      "assets/licensed/carob_farm/australian-carob-0205-mobile.jpg": "03b764279d3e053779a0ca0bce5bbef2e54824c93f9a12e1fa710dbae6b1a7ac",
      "assets/licensed/carob_farm/australian-carob-0205.jpg": "6dfdc7f643a8fcf9539eb8129065e2671363087a3484b459eb44a2a8af27ee36",
      "assets/licensed/carob_pods_macro.jpg": "0426510e9b7446415af8884ad7969d99d26de7a3cbcbedb0c7ca121379f31922",
      "assets/licensed/scene_after_dinner.jpg": "99380ed5986b0859706c37a3a94102e42b0e094d0aa55a419b72f1ec7a2a8b50",
      "assets/licensed/scene_afternoon.jpg": "bfa86e30b1f82d9836c977df8b5caa160468dc1e4bc7d51b61749278ae695c84",
      "assets/licensed/scene_tea_night.jpg": "3133f5623bfaa110ba662f9fcbe5330bf88c956f4cfc9e62680c53cf7f9c18d8",
      "assets/mm_logo_icon_blk.svg": "aaffe3fbc7f38fb73f04e09d8b248e9c12184f79308dd17139ede6f26540a988",
      "assets/our_story/founders_hands.webp": "3a8d246f7ca990b53c66120d9458ca53487b00e3a93fe5e48c917d34bc4add68",
      "assets/our_story/founders_portrait_h212.webp": "67a56d7c1b7e27973f86f7fe705ec48a963f8c22402bc46f60eb24e155a44e88",
      "assets/our_story/studio_bar_almond.webp": "3b92a69d56dcc9c3bc9e57bbb6be76ae7e300aef2f62e44ea3ce673fdaa02180",
      "assets/our_story/studio_bar_rock.webp": "9b2055d5294814b6c2773a7d54bf578d4d42b0779272eb6f8b89b74b2fa76874",
      "assets/our_story/studio_moon_rock.webp": "a01dd3ae5db5c780915ed4bf1da4a814d1988190a1b7cb73e873174da7399dbe",
      "assets/our_story/studio_moons_brick.webp": "1352e37d8f02d2e0aa299f3ee58d772c5c2bbd5a5297a1c1cef360ea2ec11296",
      "assets/our_story/studio_moons_trail.webp": "7136565d7a868c275ffe49e8042ad394c31921c7a98cded478fdee78ebea1121",
      "assets/photo_finals/maplemoon_heros21_brandmatched.webp": "3db9dccd65cf6003a2185d5a851c503a93d86fb4ae6ff338f0a1fbbf4c07579e",
      "assets/photo_finals/maplemoon_heros1_brandmatched.webp": "5a0f1480ff57abf290636f9140e8e4905e1f271f84df72e9e5c645fd4fc78a63",
      "assets/photo_finals/maplemoon_heros43_brandmatched.webp": "1b09a6bad57f079ec91d9d502fe2d01d2032ef0d8976b58f68b31cb1dbb67868",
      "assets/photo_finals/maplemoon_heros41_brandmatched.webp": "4f4d74f47385396bbbf79aba559d9dc8718c7c04ed957c737a0c7b3a8e65fb75",
      "assets/photo_finals/maplemoon_heros55_brandmatched.webp": "11e46744169c52ecfc339ef8876e745b1544313fcfd7e00e9ffbfdc03d0679af",
      "assets/photo_finals/maplemoon_heros55_brandmatched_atmospheric.webp": "f9f80ce6f9ec6627d58aa93c53f6b5cd9f4cdaf250800858e1414bb9803f5ef0",
      "assets/photo_finals/maplemoon_heros66_brandmatched.webp": "83c47a329de7c985804ee576be85e564e5766fa37dbb702eee96e7f4ce68ffda",
      "assets/photo_finals/mm23_xmp_blue_hero_2400.webp": "64fb77d86a2c3180ff49c77cec33277d797ec3b5d22d7ae87744856d2c0ac4f9",
      "assets/product_shots/bananas.webp": "16a62b637207cefc284a9829831ff1d0f29f433fb163b54759f649d4de5065f5",
      "assets/product_shots/bar_almond.webp": "87b890393a549ba8e477f19892ac82d7a8934f101b4347441f3db2878c06c208",
      "assets/product_shots/bar_cayenne.webp": "957340b94fd87095b96eaed416ebef7c086333bd0685ab67fdabde6488542e81",
      "assets/product_shots/bar_goji_coconut.webp": "f695b7171b72ec1f9d7f7010a54a9694c372d1807b04868412107a399e5f409e",
      "assets/product_shots/bar_hazelnut.webp": "bc71c90d342d1f6fcad6d70bd239c8d425b4acb02e3afc82158699ec59e8b852",
      "assets/product_shots/bar_peppermint.webp": "4d5709e5775c71d91541e945ff8e9827d17174d1e1642d3c80225ac2db753787",
      "assets/product_shots/bar_pure_carob.webp": "ba6e31d13684f7459dd2df44c90ca804c46886aa1a2a2092e36fe627352c8db8",
      "assets/product_shots/bar_pure_carob_hero.webp": "3292a84d7665b4ac756b1a43388ad3710a48805c9629cfbe26a096471a54e981",
      "assets/product_shots/bite_coconut.webp": "2d3a7ce70e331e8806461dcbe169bb0e75a8c7790bbfeec8b40c8a5bf4cec9ed",
      "assets/product_shots/bite_goji.webp": "feea1c5f9be3e86d1bbcaa8660b40b6e1281a86e771109b747af4148d5bec624",
      "assets/product_shots/bite_gold.webp": "154ea193740c52ce181efc4e4c1a9f9aab241bd8f369f77b903437ac1253146b",
      "assets/product_shots/eclipse_almond.webp": "95576337548c23b93ffe8a33fa45478503cf20fb727aaab039a40e42e7923c0c",
      "assets/product_shots/eclipse_bundle.webp": "3b0515fd4deb8916da9d613f0d8fd94ba6a7c25756f188e6187a932056b6ff46",
      "assets/product_shots/eclipse_fudge.webp": "3f803c5b9354b2c263b8e16ab3989b88323675bd113d907656f46bbf45fec85d",
      "assets/product_shots/eclipse_goji.webp": "506ec155c935bb7e99ca5fbe22d0f30d8ca80f4789e0a8dc98375948720cb1ff",
      "assets/product_shots/eclipse_hazelnut.webp": "87d0f5ae6040adf34832f73c7afacbba73ae4ad4485a950981fe68e4d01e9e7b",
      "assets/product_shots/eclipse_pecan.webp": "5fb97ffcf7715e4c9b218e42a1c7ecaba08a1ac1998f98104ad29a8bfed6aae4",
      "assets/product_shots/elixir_plain.webp": "4398f43fcc7ff571f4eea4643e078f8416e6921f4e979f5bf31e53338e04916a",
      "assets/product_shots/elixir_spiced.webp": "9b92c0f0a0cc11b11aa9a5fa4cb7683b420db373e556c74adcb1ba576ffe1163",
      "assets/product_shots/moon_almond.webp": "4fb0a7e9c27154cbcec1ad7ddf74b114d3b91eb454f46fdfbfcac25c709c024d",
      "assets/product_shots/moon_cayenne.webp": "ab133eab0e7c67f3403d7dfbe36e23a318ca0505903eb76c1561fdde4eaeb7e3",
      "assets/product_shots/moon_goji_coconut.webp": "cd46826a772aac33608189ebef7660ca1e6c9a89051fe76b3978a04c6af5ae32",
      "assets/product_shots/moon_hazelnut.webp": "2c1b72ba8667b2dc031ed2157b3d58e032b037eeba85b882f3613751ba2ceff9",
      "assets/product_shots/moon_peppermint.webp": "457e42a2d92cf30b163541fad60ec50b8bc66e720b275fb0b90da791ae6cc48a",
      "assets/product_shots/moon_pure_carob.webp": "f7c6d0e2369a1b50b5001d90f698ec6fb4a124ed2a0a571191de2414b78f7179",
      "assets/product_shots/powder_roasted.webp": "d1afebddd399e24dcb14efae93b4fde33b588ce7de6dae07d88a43886b489cf9",
      "assets/products_new/bar_almond.png": "f276faafd7267244ce9a3c9e33d1fb0a79995d9144e64996a096e1603feea412",
      "assets/products_new/bar_cayenne.png": "98198122d6a4131dc02f3b8f8b902807d24c9815144a42e12ed76a996f07fb8f",
      "assets/products_new/bar_goji_coconut.png": "c052cf0d1a657f6c88ec8266ca2d99a4ddb78bfa3f14fa722dbb1a1bd94bda17",
      "assets/products_new/bar_hazelnut.png": "918fa46feaba6306d5a6e64e1aadc9a9e4d0270c81d12ad00a9dd3f8dbdff664",
      "assets/products_new/bar_peppermint.png": "a28f054e3717bca52dd835814630b1db045f17d6461dd289d3753ea49cd4073b",
      "assets/products_new/bar_pure_carob.png": "b6e64b00acd3e502e19c7b7ee1aa16e9669d1d9e9c19bbbe1dac0917c4967cff",
      "brand_kit.css": "53043df665ab3bc696b3d925f5ed108912cdc50330def58f92d2e7c2adbbbbe3",
      "design_refinement_20260723.css": "90de7de62efb16b0fe10da4dfea5b1ab2889a01cc2ac4a895127466a68803df2",
      "review-mode.css": "a16e32a854676023ea6bb69f4de8e4af6298d635a39be4a014b793d645b31bd2",
      "review-mode.js": "5a5d7b5801dd9eb7c7ba017afea5892d451c2d2dee9f3400d7853bd581cc67af"
    },
    "frozen_authority_sha256": {
      "docs/plans/2026-07-30-maplemoon-master-orchestration-plan-v2.md": "3c453aa0e3bb60a894ad2a9d506da61930cadb482e961a7c227becb50d2a694e",
      "docs/orchestration/MASTER_PACKET_REGISTER.md": "300a0d5ac87bf27570df0e3de00a5f88da5a5efc043b57d37d7831d8d2029d7e",
      "docs/orchestration/CONTROL_PLANE_INTERFACES.md": "8c73f6bb37564a56b3d599ad74237f472393d911d6c57484cdb648229bf881e8",
      "docs/orchestration/packets/CTRL-V2-P03.md": "e579671bcff15bdec6b51cb110e2d73575938002f5444d679821f434b8f2ad02",
      "docs/orchestration/packets/VIS-01A.md": "1b507b1e76a9409cae903006ef33b3330f762b9f5026d981570923cf80b1013b",
      "docs/orchestration/packets/CAT-01A-READ.md": "4e2c218472066e605d3e85c90e20d06cdf0aab383cb44cc3a4363fa422b43f8a",
      "scripts/validate-maplemoon-control-plane.py": "55d19976be77be180fa9071accf2c7f3fcdcedcae956d1435f2e3d24b6dbf469",
      "docs/orchestration/reviews/CTRL-V2-REVIEW_CHAIN.md": "29b782011ab29e4e9ac0bc9abee324a936cee6372178a0e26fd305ea10e2a437"
    }
  },
  "skills": [
    "gsd-plan-checker",
    "gsd-ui-checker",
    "gsd-integration-checker",
    "gsd-security-auditor",
    "gsd-verifier"
  ],
  "action": "Create one deterministic builder and expanded checker, generate separate clean and annotated pre-dispatch mechanical artifacts, and record a QA receipt.",
  "verify": [
    "source and staging-template hashes fail closed on mismatch",
    "two consecutive builds are byte-identical",
    "six aliases in each root contain no WIP route, canonical, production social metadata or consent-held testimonial identity",
    "annotated index enters review=1 and local navigation preserves it",
    "no .vercel, symlink, secret, local absolute path or unallowlisted file enters either artifact",
    "a captured runtime request log fails nonzero for any external request outside the exact approved Typekit stylesheet and font-resource hosts",
    "canonicalized complete documents are byte-equal after removing only the annotated review stylesheet and script tags",
    "six WIP and eight frozen authority hashes remain exact"
  ],
  "done": "Both local pre-dispatch mechanical artifacts and their manifests pass static, integration and security checks, with rendered blockers recorded; neither artifact is claimed share-ready.",
  "stop": [
    "source/base hash mismatch",
    "write outside the exact cluster",
    "subjective navigation/footer/copy/catalogue/founder decision",
    "testimonial identity or internal project metadata reaches either artifact",
    "external action, commit, push, deployment, Shopify, WooCommerce or production request"
  ],
  "next_reviewer": "Codex"
}
<!-- CONTROL-PLANE:END -->

## Approved mechanical treatments

- Adobe Typekit remains in both local review artifacts by Nate's explicit approval.
- Consent-held testimonial identities remain neutralised in both artifacts.
- The annotated artifact may expose the existing review layer; it must enter through `review=1`.
- This packet does not remove or resolve other pending material. That work requires later decision packets.
- Social metadata is removed rather than replaced with unapproved public wording.
- Clean and annotated outputs are separate allowlisted roots generated from the same pinned inputs.

## Held decisions

Do not silently decide shared navigation/footer wording, cart/currency treatment, newsletter implementation, enquiry-only product wording, catalogue/pricing/stockist claims, founder content/crop, final hero direction, content exclusion, asset-quality tradeoffs, access, audience or delivery. Until those later packets pass, both outputs are pre-dispatch evidence only.

## Exact output layout

| Pinned July 29 template | Clean alias | Annotated alias |
|---|---|---|
| `homepage.html` | `homepage.html` | `homepage.html` |
| `carob-story.WIP.html` | `carob-story.html` | `carob-story.html` |
| `shop.WIP.html` | `shop.html` | `shop.html` |
| `our-story.WIP.html` | `our-story.html` | `our-story.html` |
| `stockists.WIP.html` | `stockists.html` | `stockists.html` |
| `faq.WIP.html` | `faq.html` | `faq.html` |

`docs/client-review/2026-08-01-saturday-review/staging-v1/clean/`

- `homepage.html`
- `carob-story.html`
- `shop.html`
- `our-story.html`
- `stockists.html`
- `faq.html`
- `MANIFEST.json`
- allowlisted referenced assets and shared CSS

`docs/client-review/2026-08-01-saturday-review/staging-v1/annotated/`

- `index.html`
- the same six aliases
- `review-mode.css`
- `review-mode.js`
- `MANIFEST.json`
- allowlisted referenced assets and shared CSS

Neither root may link to the other or contain `.WIP.html`, `.vercel`, source notes, local absolute paths or extra review support pages.

The base hashes in this packet and the lock manifest are acquisition-time compare-and-swap values. The packet/register bootstrap writes are expected to change their current hashes while the leases remain held; this is not a stale-base condition.

## Executable tasks and checks

1. `python3 -m py_compile scripts/build-maplemoon-saturday-review.py scripts/check-maplemoon-review.py`
2. `python3 scripts/build-maplemoon-saturday-review.py --output docs/client-review/2026-08-01-saturday-review/staging-v1`
3. `python3 scripts/build-maplemoon-saturday-review.py --self-test`
4. Build twice into temporary directories and compare every relative path and SHA-256.
5. `python3 scripts/check-maplemoon-review.py --staging docs/client-review/2026-08-01-saturday-review/staging-v1/clean --profile saturday-clean`
6. `python3 scripts/check-maplemoon-review.py --staging docs/client-review/2026-08-01-saturday-review/staging-v1/annotated --profile saturday-annotated`
7. `npm run review:saturday:check`
8. Serve locally and inspect `/clean/homepage.html` plus `/annotated/index.html`.
9. Capture every browser request from both roots to a temporary JSON log. Run `python3 scripts/check-maplemoon-review.py --profile saturday-network --network-log <temporary-log>`; it must exit nonzero for any external request except `https://use.typekit.net/dvz0xjs.css` and font resources from `use.typekit.net` or `p.typekit.net`. Record the request list and raw log SHA-256 in the QA receipt.
10. Record six widths (`1440`, `1024`, `430`, `390`, `375`, `320`), keyboard path, focus, 200% zoom, reduced motion, tap targets, overflow and route preservation in the QA receipt.
11. Canonicalize and compare the complete clean and annotated documents, including metadata, structured data, images/alt text, controls, forms, scripts and links. The only removable differences are the exact `<link rel="stylesheet" href="review-mode.css">` and `<script src="review-mode.js"></script>` nodes; all remaining bytes must match.

Expected exit code is `0` for tasks 1–7. The self-test must prove a changed pinned input exits nonzero without writing output.

## QA receipt requirements

The QA receipt must follow `maplemoon-receipt/v2` and record: packet ID, worker, UTC start/completion, files read/changed, pre/post hashes, exact commands and exit codes, local routes, viewport/interaction results, failures, unknowns, residual risks, forbidden-path zero-change evidence, proposed state `needs_review`, and next reviewer `Codex`.

## Execution order

1. Independent plan check.
2. Implement builder only within the exact cluster.
3. Implement checker/package commands.
4. Build twice and compare manifests.
5. Run static, integration and security verification.
6. Run six-width clean/annotated browser QA.
7. Record the QA receipt and return `needs_review`; Nate remains final acceptance owner.
