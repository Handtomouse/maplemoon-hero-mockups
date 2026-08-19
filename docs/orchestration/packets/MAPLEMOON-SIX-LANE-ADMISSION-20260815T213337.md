# MapleMoon six-lane admission — 2026-08-15 21:33 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-SIX-LANE-ADMISSION-20260815T213337",
  "worker_thread_id": "/root",
  "state": "boss_coordination_admission",
  "objective": "Sequence and admit CAT-01A plus Lanes A, B, C, E and F against Nate's 15 August rulings; create exact mutation packets and one live Lane-E lock set without building, deploying, accessing Shopify, generating imagery or contacting the client.",
  "authority": "Nate's 15 August six-lane request and ALIGN decision table supersede conflicting R3 recommendations. The root MapleMoon Boss owns sequencing, exact locks, packet admission, receipt review and any later preview gate. This packet authorises coordination records only.",
  "base": {
    "rollback_tag": "pre-canva-68-20260815",
    "rollback_commit": "91f03623163b549ab45ef6adfb50631a8017a150",
    "lock_manifest_sha256": "8817645e128f6723fd2384f62fdfb78ca01d6b5ba5196339bb764137c38e12b2",
    "align_sha256": "4f1151dbaa6fdd7314074c4f44a99e7fce3c8b1500ef0700b9e2509f76aaacf7",
    "occurrence_map_sha256": "88abbf6bf94c59ba31353e8ef3dc8e8dd3532d5bf32ee09c75a2b812eda671ff",
    "production_immutable_token": "7vjf2m50b",
    "production_rule": "No deployment or production movement is a completion criterion for any admitted lane."
  },
  "readable_paths": [
    "/Users/handtomouse/maplemoon_recentre_20260815/CAT-01A_content_half.md",
    "/Users/handtomouse/maplemoon_recentre_20260815/LANE_A_product_imagery.md",
    "/Users/handtomouse/maplemoon_recentre_20260815/LANE_B_photoshop_prep.md",
    "/Users/handtomouse/maplemoon_recentre_20260815/LANE_C_shopify_groundwork.md",
    "/Users/handtomouse/maplemoon_recentre_20260815/LANE_E_apply.md",
    "/Users/handtomouse/maplemoon_recentre_20260815/LANE_F_rebuild.md",
    "/Users/handtomouse/maplemoon_recentre_20260815/ALIGN.html",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/CARLI-CANVA-OCCURRENCE-RECONCILIATION-20260731.md",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/LOCK_MANIFEST.json",
    "/Users/handtomouse/maplemoon-website/scripts/check-maplemoon-receipt.py"
  ],
  "writable_paths": [
    "maplemoon-website/docs/orchestration/LOCK_MANIFEST.json",
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-LANE-E-APPLY-20260815T213337.md",
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-LANE-F-REBUILD-20260815T213337.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-SIX-LANE-ADMISSION-20260815T213337.json"
  ],
  "method": [
    "checkpoint the four exact coordination outputs and pass phase=start before changing the lock manifest or creating either mutation packet",
    "verify all six lane briefs, ALIGN, the 31 July occurrence map, rollback tag and six WIP base hashes",
    "record the corrected decisions exactly: D01=A six bars; D02 not applicable and withdrawn; D03=200+ standing ruling; D04=B visibly non-collecting form; D05=B with existing occurrence map rebased; D06 Pure and Spiced approved but matched re-export required without upscaling; R3-OAI one call approved but not fired",
    "record Frames 01 and 43 as derivative-eligible only behind a mandatory colour-grade test; Frame 55 remains HOLD",
    "admit CAT-01A and Lanes A, B and C as parallel read-only/scratch-output work with no site lock",
    "create Lane E's mutation packet and append held exact-path locks for its six WIP pages",
    "create Lane F's mutation packet in admitted-HOLD state with no overlapping live lock; it may acquire locks only after Lane E releases them and Lane A returns the founder-photo answer",
    "write a maplemoon-receipt/v2 admission receipt and pass completion/promotion gates; promotion means packet admission only"
  ],
  "verify": [
    "no pre-existing held or reserved lock conflicts",
    "the rollback tag resolves exactly to 91f03623163b549ab45ef6adfb50631a8017a150",
    "Lane E alone holds the six exact WIP page locks and each row carries its acquisition SHA-256",
    "Lane F contains no executable start authority and names both predecessor gates",
    "the read-only lanes receive no site lock and no site writable path",
    "D02 and R3 bundle shorthand cannot strip cart UI; D03 cannot change to 197 or nonnumeric",
    "no generation, deploy, production, Shopify, Git or client action occurs",
    "only the four exact coordination outputs change and the receipt gates pass literally"
  ],
  "stop": [
    "a lane brief or authority hash changes before admission closes",
    "the rollback tag, any WIP base hash or existing live-lock state differs from the recorded acquisition",
    "a worker is asked to infer authority for CV-014 or CV-062",
    "Frames 01 or 43 are described as colour-approved, exported or wired",
    "Lane F is made executable before both Lane E and Lane A gates close",
    "a path outside writable_paths changes"
  ],
  "forbidden_actions": [
    "build or edit the site in this BOSS phase",
    "run image generation or spend the approved OpenAI call",
    "export, copy or wire Frames 01, 43 or 55",
    "log in to Shopify or change any Shopify state",
    "deploy, promote, alias, move production, commit, push, stash, delete, gitignore or contact the client"
  ],
  "next_reviewer": "MapleMoon root Boss for literal receipt replay, then admitted workers at their phase-start gates",
  "requires_visual_evidence": false
}
<!-- CONTROL-PLANE:END -->

## Corrected decision boundary

- **D01:** six approved bars remain the demo release catalogue. The 24-product catalogue belongs to Shopify.
- **D02:** not applicable to this Vercel demo. The earlier `D02=A` record is withdrawn; cart UI stays.
- **D03:** the standing ruling is `200+`. `197`, `150+` and nonnumeric alternatives are not open.
- **D04:** keep the newsletter form and make its non-collecting demo state visible.
- **D05:** the protected review surface carries Carli's exact bounded wording. The 31 July 76-row occurrence map exists and must be rebased, not rebuilt. This does not invent authority for CV-014 or CV-062.
- **D06:** both exact v4 elixir assets are approved. Their 1500×1500 versus 800×800 mismatch requires a matched re-export; no upscaling and no current wiring.
- **R3-OAI:** one unknown-price call with no retries is approved in principle. It remains unfired until a separate checkpointed generation packet has an exact target after Lane A.
- **Frames 01/43:** derivative eligibility is approved only behind a fresh colour-grade comparison. Eligibility cannot flow into export or wiring without that PASS. Frame 55 remains HOLD.
- **Client facts:** use Carli's Canva page-14 supplier wording verbatim; distinguish Byron Bay kitchen from Brunswick Heads founders; pseudonymise named reviews and keep the review block.

## Sequence

| Wave | Lane | Admission | Worker binding | Gate to next wave |
|---|---|---|---|---|
| 1 | CAT-01A content half | GO, read-only/site-safe | `/root/header_powder_update` | ledger receipt; commerce cells remain `BLOCKED-WOO-EXPORT` |
| 1 | Lane A imagery preflight | GO, read-only/site-safe | Codex task `019ffabc-e7e4-71c3-b769-3563efcc8cac` | binary founder-smile result plus 11/11 dispositions |
| 1 | Lane B Photoshop prep | GO, scratch-output only | Codex task `019ffd5b-edd2-7b23-8780-453f9b67a532` | 10 affected dimension checks, one visual PSD check, five controls |
| 1 | Lane C Shopify groundwork | GO, read-only/no login | `/root/recertify_updated_preview` | cited capability map and Nate-only admin checklist |
| 2 | Lane E apply | ADMITTED, held locks, wait for Wave-1 acquisition stability | `/root/dedup_risk_audit` | receipt PASS, renders PASS, all old-string whole-tree counts zero, locks released |
| 3 | Lane F rebuild | ADMITTED but HOLD | `/root/dedup_risk_audit` sequentially | Lane E released plus Lane A founder result; then fresh hashes, checkpoint and locks |

Lane B may continue independently while Lane E runs. Lane F never overlaps Lane E in the main worktree. No lane may treat deployment or production movement as completion.
