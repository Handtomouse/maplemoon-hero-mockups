# MapleMoon Main coordinator acceptance — 2026-08-03

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-main-coordinator-acceptance/v1",
  "acceptance_id": "MAPLEMOON-MAIN-COORDINATOR-ACCEPTANCE-20260803",
  "state": "accepted",
  "accepted_at": "2026-08-03T18:13:43+10:00",
  "accepted_main_thread_id": "019fb5b5-de62-7862-a5fe-06bc59395c21",
  "authority": "Nate explicitly confirmed this exact task as the sole MapleMoon Main coordinator and authorized one bounded local Homepage ritual-integration admission. This acceptance supersedes the unaccepted proposed-Main identity in the prior handoff without reviving or messaging any superseded coordinator.",
  "project_root": "/Users/handtomouse/maplemoon-website",
  "branch": "codex-maplemoon-section-review",
  "head": "d70dad4f5d08fdd11742e60b16bbc0f2b905fbad",
  "head_commit_time": "2026-08-03T17:55:00+10:00",
  "head_subject": "docs(evidence): interactive delivery checklist page",
  "dirty_state": {
    "entry_count": 265,
    "porcelain_sha256": "5741e8012b8cab9227ed649921f2c58ff0e491b0c692d9de489d4d7ca98ca780",
    "homepage_source_clean": true,
    "preservation_rule": "Preserve all pre-existing dirty and untracked bytes. The integration packet may touch only its exact listed paths."
  },
  "handoff": {
    "path": "docs/orchestration/packets/MAPLEMOON-MAIN-BOSS-HANDOFF-20260803.md",
    "sha256": "3178b739d6c4ee383fca27ab2bc4b1fc6e8914fa56412440f363395466e6a23a",
    "checkpoint": "_wip/checkpoints/MAPLEMOON-MAIN-BOSS-HANDOFF-20260803_20260803_101659_AEST",
    "checkpoint_manifest_sha256": "690f9162e2e6c783556a3a26d5a2d0407370f57e58fb9f2877d687c5bea00cdc"
  },
  "control_plane": {
    "receipt_gate": "docs/orchestration/SIDECHAT_RECEIPT_GATE.md",
    "receipt_gate_sha256": "ed6280e66ccbb99184fd88cb8e6b43aa86178152c869e8eb3bf371fbbfc5ab3b",
    "lock_manifest": "docs/orchestration/LOCK_MANIFEST.json",
    "lock_manifest_sha256": "8817645e128f6723fd2384f62fdfb78ca01d6b5ba5196339bb764137c38e12b2",
    "live_held_reserved_blocked_locks": []
  },
  "current_non_frozen_homepage_source": {
    "path": "_wip/homepage_real_1_lead_photo.WIP.html",
    "sha256": "eeb7f73d0281932043d1af53aabcdb4c2689ab9aabdfd6244beb3684dd593e11",
    "git_state": "tracked and clean at accepted HEAD",
    "current_ritual_references": [
      "assets/licensed/scene_after_dinner.jpg",
      "assets/licensed/scene_afternoon.jpg",
      "assets/licensed/scene_tea_night.jpg"
    ]
  },
  "approved_ritual_custody": {
    "packet": "docs/orchestration/packets/WAVE-1D-RITUAL-HARMONIZED-CUSTODY-HANDOFF-20260803.md",
    "packet_sha256": "d50e39ba0ed6c256be26d7d7c5390fd143a98566dc8a910fd1c1bad4e3eb6b56",
    "receipt": "docs/orchestration/reviews/WAVE-1D-RITUAL-HARMONIZED-CUSTODY-HANDOFF-20260803.json",
    "receipt_sha256": "07a14d03152275873d8763ba916d478f823f4c92313ecc7917e5d614ecc39afd",
    "receipt_gate_result": "PASS packet=WAVE-1D-RITUAL-HARMONIZED-CUSTODY-HANDOFF-20260803 phase=complete changed=13",
    "package": "docs/client-review/2026-08-01-saturday-review/generated-candidates/ritual-harmonized-approved-20260803-v2",
    "manifest_sha256": "b13bc9a860028deac2fbf7d43bbe76177f8f6a6f10b7e0befe3c86f2fcbfcedc",
    "custody_state": "accepted for bounded local Homepage integration only",
    "integration_was_previously_closed": true,
    "integration_gate_resolution": "Nate's explicit addendum opens exactly one bounded Homepage-only local integration packet; it does not authorize staging, deployment or delivery."
  },
  "frozen_package": {
    "root": "docs/client-review/2026-08-01-saturday-review/staging-v1",
    "manifest_sha256": "d0d834b9b9173a497d0b03e39e4c282a7d5247f51484ebfd7ba3a64e8416bf7c",
    "clean_manifest_sha256": "d1c66b1d5937e9956d1806dbbbff4faf4f950def046aa642ae52f809c3d52d20",
    "annotated_manifest_sha256": "3be3c0f2df4658558c667b3e9cc6d55966d6a1d7ce9fa9874c46a0afc44244c7",
    "homepage_sha256": "0d102050395b79f4add5d9ddb7f75e962d7e41e11a78cd7f88c35ce4a947ef0c",
    "rule": "byte-identical; no edit, rebuild or manifest mutation"
  },
  "deployment_reconciliation": {
    "rule": "No production access or deployment is authorized by this acceptance.",
    "local_site_full_hashes_rechecked": {
      "homepage.html": "fe29203259541281af4f22c2c04e952fc69ed9c952e937ae281d8d3b2b6ccafa",
      "shop.html": "69efa152821c128249cf6156f8304034535f63ef0c2fa9002bf4ef8d45d24d0c",
      "our-story.html": "a43595ae2f38764858174d68d84b9983d7ed4dd5c68099ab78e2ed0ac6a58e94",
      "carob-story.html": "5811912ecd8d3bf48f8506766849ad5a9a98007e91abace7d501af1d49c81040",
      "stockists.html": "d5245e32845c56f5f134e112bfe7d07336007a8f00d32fafc2c503cc7bca3354",
      "faq.html": "aeddccbdb5b7cbf8a873892774e4a2acd51fa356b9c5814aa1788b71d37fc192"
    },
    "known_drift": "Local _wip/deploy/site-full/our-story.html no longer matches the prior public-response evidence e136c48e4d6939a707e27fca04dde720f13ac10aada5177471d45259425b7385. This unrelated deploy-copy drift is preserved and blocks any deployment inference; it does not overlap the admitted Homepage WIP or new ritual assets."
  },
  "product_worker_reconciliation": {
    "worker_thread_id": "019fc42c-03b0-7d91-8c25-d127fbbc73e9",
    "receipt": "/Users/handtomouse/.codex/worktrees/32a0/maplemoon-website/docs/orchestration/reviews/MM-PRODUCTS-INTAKE-PREP-20260803.json",
    "receipt_sha256": "e69565a51f4a118355d9251337fba8395207bbdf7b29509bd5130227ba9b3745",
    "completion_gate": "PASS packet=MM-PRODUCTS-INTAKE-PREP-20260803 phase=complete changed=20",
    "state": "local preparation complete; all 204 generated product candidates remain HOLD; no website derivative or integration ownership",
    "messaged": false
  },
  "authority_boundaries": [
    "No commit, push, deploy, publish, upload, send, client contact, production, Shopify, WooCommerce, analytics or credential action.",
    "No staging-v1 mutation or rebuild.",
    "No Shop, product, founder, other-page or deploy-copy change.",
    "No integration beyond the exact ritual image elements and three new local asset paths in the admitted packet."
  ],
  "next_packet": "SAT-HOME-RITUAL-HARMONIZED-INTEGRATION-20260803"
}
<!-- CONTROL-PLANE:END -->

## Acceptance statement

Task `019fb5b5-de62-7862-a5fe-06bc59395c21` accepts sole MapleMoon Main coordination. The previous Main and unaccepted proposed Main are reference-only. This acceptance admits local packet preparation and review only; deployment and client delivery remain closed.
