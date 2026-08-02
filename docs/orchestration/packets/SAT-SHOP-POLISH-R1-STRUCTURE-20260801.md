# Packet SAT-SHOP-POLISH-R1-STRUCTURE-20260801

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "SAT-SHOP-POLISH-R1-STRUCTURE-20260801",
  "candidate_id": "SAT-SHOP-POLISH-R1-CANDIDATE-20260801-001",
  "parent_candidate_id": "SAT-SHOP-F-RECONCILE-CANDIDATE-20260801-001",
  "worker_thread_id": "019fa858-05c9-7631-b26e-8f5cbbf1387a",
  "phase": "SAT-SHOP-POLISH-R1",
  "state": "ready",
  "approval_class": "mutating-local-review",
  "cluster_id": "SAT-SHOP-DERIVED-STRUCTURE",
  "requires_visual_evidence": true,
  "objective": "Polish the derived clean and annotated Shop structure, opening hierarchy, catalogue rail, category copy and four-card lower-range band without changing canonical WIP, another page, assets or mock-cart behavior.",
  "user_decisions": [
    "Nate authorized two bounded Shop polish rounds while away.",
    "Use one Homepage-consistent global header plus one catalogue category rail, never two global site navigations.",
    "Render one four-card desktop lower-range band containing two Elixirs, unpackaged Bananas and Powder.",
    "Do not invent products, packs, prices, availability, process claims or commerce behavior."
  ],
  "readable_paths": [
    "docs/orchestration/packets/SAT-SHOP-POLISH-20X2-HANDOFF-20260801.md",
    "docs/orchestration/reviews/CARLI-CLAIMS-REPLACEMENT-OPTIONS-20260731.md",
    "docs/orchestration/reviews/CARLI-CANVA-NOTE-REGISTER-20260731.md",
    "docs/orchestration/SIDECHAT_RECEIPT_GATE.md",
    "docs/orchestration/LOCK_MANIFEST.json",
    "_wip/shop.WIP.html",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/mock-cart.js",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/annotated/mock-cart.js"
  ],
  "writable_paths": [
    "docs/orchestration/packets/SAT-SHOP-POLISH-R1-STRUCTURE-20260801.md",
    "docs/orchestration/reviews/SAT-SHOP-POLISH-R1-STRUCTURE-20260801.json",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/shop.html",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/annotated/shop.html",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/MANIFEST.json",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/MANIFEST.json",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/annotated/MANIFEST.json",
    "_wip/reviews/sat_shop_polish_r1_20260801/qa/browser-evidence.json"
  ],
  "base": {
    "branch": "codex-maplemoon-section-review",
    "head": "d65047b6a7431af955ad0cd5b57c42f7a9367225",
    "canonical_shop_wip_sha256": "9f5a2093728df88d2d2ccf1a4138d282092192cb96b2e485f237cf23b3fa0875",
    "clean_shop_sha256": "43cad154be945d34006013808f2eca5eeb9676ae3e28cedafbb75faccb914abb",
    "annotated_shop_sha256": "333bc4f0b7452a6df6db799fa365be748df660797f1dff4d025d168e012dac10",
    "aggregate_manifest_sha256": "f2d24cbed1068f17d7989010a08354006f59e8dfe575346cd268f149d2b9b5e4",
    "clean_manifest_sha256": "87de0ddafdf21d8190e740f726dc51a10d4d8aefd5141c57fa7fd91df9ce3211",
    "annotated_manifest_sha256": "c4d9c678e89a7f1af5c7d3405056ff56dde246d81f624de77de3491abbaa7ec1"
  },
  "action": "Update only the two derived Shop pages in lockstep: preserve one global header, make the F structure canonical, replace the unsupported starter box with a neutral six-bar range guide, remove unsupported opening and category claims, standardize category labels and typography, and render the two Elixirs plus Bananas and Powder as one four-card desktop band.",
  "verify": [
    "phase-start ownership, hashes and timestamped non-overwriting recovery checkpoint pass before Shop mutation",
    "canonical Shop WIP and all ten clean/annotated non-Shop page files retain their exact base hashes",
    "clean and annotated Shop structure and visible copy stay in parity",
    "one global header and one catalogue rail are present",
    "lower range contains exactly four cards at desktop and collapses responsively",
    "no unsupported starter pack, price, availability, gift, roast, mill, smooth-carob, small-batch or nothing-added claim remains",
    "mock cart, focus, Escape restoration and no-network checks remain intact",
    "Saturday package checker, cart checker, responsive overflow positive control and git diff check pass",
    "rendered review passes at 390, 768 and 1280 CSS pixels"
  ],
  "done": "One evidence-safe local Round 1 candidate is independently verified and ready to serve as the visual baseline for image-only Round 2.",
  "stop": [
    "a base hash, ownership or recovery gate mismatches",
    "another writer owns the Shop cluster",
    "canonical WIP, another page, shared cart behavior or an asset would change",
    "unsupported factual or commerce content would be introduced",
    "a required checker or rendered responsive check fails materially",
    "any commit, push, deploy, publish, send, upload, Shopify, WooCommerce or production action is requested"
  ],
  "next_reviewer": "Independent read-only verification, then Nate only if a genuine visual or evidence decision survives"
}
<!-- CONTROL-PLANE:END -->

The derived local review candidate remains `share_ready: false`. No external action or automatic promotion is authorized.
