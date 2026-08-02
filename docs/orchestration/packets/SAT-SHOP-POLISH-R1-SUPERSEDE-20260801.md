# Packet SAT-SHOP-POLISH-R1-SUPERSEDE-20260801

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "SAT-SHOP-POLISH-R1-SUPERSEDE-20260801",
  "candidate_id": "SAT-SHOP-POLISH-R1-SUPERSEDE-CANDIDATE-20260801-001",
  "parent_candidate_id": "SAT-SHOP-FROZEN-RESTORE-CANDIDATE-20260801-001",
  "worker_thread_id": "019fa858-05c9-7631-b26e-8f5cbbf1387a",
  "phase": "SAT-SHOP-POLISH-R1-TEMPORARY",
  "state": "ready",
  "approval_class": "mutating-isolated-local-review",
  "cluster_id": "SAT-SHOP-TEMP-R1-STRUCTURE",
  "requires_visual_evidence": true,
  "objective": "Create and independently verify one isolated, non-promoted Round 1 Shop candidate covering structure, hierarchy, opening copy, category rhythm and the four-card lower-range band while leaving the frozen six-page package byte-identical.",
  "user_decisions": [
    "Nate explicitly authorized two bounded Shop polish rounds after the original deadline; the work is closure polish, not feature exploration.",
    "Use one Homepage-consistent global header plus one catalogue category rail, never two global site navigations.",
    "Render exactly four lower-range cards: two Elixirs, one Banana and Powder.",
    "Round 1 contains no image replacement and cannot promote itself.",
    "Unsupported products, packs, prices, availability, claims and commerce behavior must not be invented."
  ],
  "readable_paths": [
    "docs/orchestration/packets/SAT-SHOP-POLISH-20X2-HANDOFF-20260801.md",
    "docs/orchestration/packets/SAT-SHOP-FROZEN-RESTORE-01.md",
    "docs/orchestration/reviews/SAT-SHOP-FROZEN-RESTORE-01-20260801.json",
    "docs/orchestration/SIDECHAT_RECEIPT_GATE.md",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/shop.html",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/annotated/shop.html",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/MANIFEST.json",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/MANIFEST.json",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/annotated/MANIFEST.json",
    "_wip/checkpoints/SAT-SHOP-FROZEN-RESTORE-01_20260801_224048_AEST/files/docs/client-review/2026-08-01-saturday-review/staging-v1/clean/shop.html",
    "_wip/checkpoints/SAT-SHOP-FROZEN-RESTORE-01_20260801_224048_AEST/files/docs/client-review/2026-08-01-saturday-review/staging-v1/annotated/shop.html"
  ],
  "writable_paths": [
    "docs/orchestration/packets/SAT-SHOP-POLISH-R1-SUPERSEDE-20260801.md",
    "docs/orchestration/reviews/SAT-SHOP-POLISH-R1-SUPERSEDE-20260801.json",
    "_wip/reviews/sat_shop_polish_r1_20260801/candidate/clean/shop.html",
    "_wip/reviews/sat_shop_polish_r1_20260801/candidate/annotated/shop.html",
    "_wip/reviews/sat_shop_polish_r1_20260801/candidate/MANIFEST.json",
    "_wip/reviews/sat_shop_polish_r1_20260801/candidate/clean/MANIFEST.json",
    "_wip/reviews/sat_shop_polish_r1_20260801/candidate/annotated/MANIFEST.json",
    "_wip/reviews/sat_shop_polish_r1_20260801/qa/browser-evidence-r1-supersede.json"
  ],
  "base": {
    "branch": "codex-maplemoon-section-review",
    "head": "d65047b6a7431af955ad0cd5b57c42f7a9367225",
    "clean_shop_sha256": "43cad154be945d34006013808f2eca5eeb9676ae3e28cedafbb75faccb914abb",
    "annotated_shop_sha256": "333bc4f0b7452a6df6db799fa365be748df660797f1dff4d025d168e012dac10",
    "aggregate_manifest_sha256": "f2d24cbed1068f17d7989010a08354006f59e8dfe575346cd268f149d2b9b5e4",
    "clean_manifest_sha256": "87de0ddafdf21d8190e740f726dc51a10d4d8aefd5141c57fa7fd91df9ce3211",
    "annotated_manifest_sha256": "c4d9c678e89a7f1af5c7d3405056ff56dde246d81f624de77de3491abbaa7ec1",
    "canonical_shop_wip_sha256": "9f5a2093728df88d2d2ccf1a4138d282092192cb96b2e485f237cf23b3fa0875"
  },
  "action": "Build one temporary clean/annotated Shop candidate from the restored frozen authority, applying only the already-locked Round 1 structure and evidence-safe copy treatment. Bind it with candidate-local manifests and capture rendered QA without changing the frozen package.",
  "verify": [
    "phase-start checkpoint and all frozen base hashes pass before candidate creation",
    "one global header and one catalogue category rail are present",
    "opening hierarchy is clear and the lower range has exactly two Elixirs, one Banana and Powder",
    "no unsupported claims, prices, packs, availability or new commerce behavior are introduced",
    "clean and annotated candidate structure remain in parity",
    "responsive rendering passes at 1440, 1024, 430, 390, 375 and 320 CSS pixels",
    "keyboard focus, mock cart, Escape restoration and no-network behavior remain intact",
    "only Adobe Typekit is permitted as a remote font request; no other network dependency is introduced",
    "canonical WIP, shared cart, other five pages and all five frozen Shop artifacts remain byte-identical",
    "an independent read-only reviewer returns PASS before any promotion packet may be admitted"
  ],
  "done": "One isolated Round 1 candidate has complete deterministic and rendered evidence and is ready for independent review, with the frozen package unchanged and share_ready still false.",
  "stop": [
    "a frozen base hash, ownership or recovery checkpoint mismatches",
    "a path outside writable_paths would change",
    "the frozen package, canonical WIP, shared cart or another page would change",
    "unsupported content or a new feature would be required",
    "a required responsive, keyboard, cart, parity or network check fails materially",
    "any commit, push, deploy, publish, send, upload, Shopify, WooCommerce or production action is requested"
  ],
  "next_reviewer": "Independent read-only Shop reviewer, then Nate; promotion requires a separate exact-hash packet"
}
<!-- CONTROL-PLANE:END -->

This temporary candidate cannot overwrite or promote into the frozen package under this packet.
