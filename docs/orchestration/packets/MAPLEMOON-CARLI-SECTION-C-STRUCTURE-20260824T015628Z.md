# MapleMoon Carli Section C structural fixes — 2026-08-24 11:56 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-CARLI-SECTION-C-STRUCTURE-20260824T015628Z",
  "candidate_id": "MAPLEMOON-CARLI-SECTION-C-STRUCTURE-CANDIDATE-20260824-001",
  "cluster_id": "MAPLEMOON-OUR-STORY-SECTION-C-STRUCTURE",
  "worker_thread_id": "/root",
  "state": "blocked_shared_contract_lease_and_external_checklist_hold",
  "approval_class": "nate-directed-mutating-local-wip",
  "objective": "Close only Carli checklist items C01, C06, C07, C08, C09 and C15 mechanically in the Our Story WIP, preserving every other C-item, all prose and all founder imagery, then reconcile the exact Our Story design-system hash bindings and verify both required checker modes.",
  "authority": "Nate's explicit current-task brief authorises only the named Section C structural defects, contract hash reconciliation, checklist status notes and a local Git commit. The checklist source is readable but outside this session's writable filesystem, so that external-file update remains a truthful HOLD and is not substituted with another file.",
  "base": {
    "branch": "safety/founders-20260824",
    "head": "c54d115cc1d7d679641e5061d5ee76407c48bd9b",
    "our_story_sha256": "0158cca2a55d41e1156cde72c7ffd86e166fbf6efd82531999c78cff518ba2cf",
    "routes_sha256": "4c77b0a142a204d232d61ab10384a239e65beadcf7403f589ea4aa56e2cbe6a7",
    "exceptions_sha256": "3c4df985b0a6eaad03eb0c32aedcf1386576cf4e1297424957c3008f9b843b0d",
    "lock_manifest_sha256": "a7ec12d38bd272f334f0afe3cfb3f32694f574e3400dc6c0323c434d939c420f",
    "checklist_sha256": "3d6b375874237f3856ae1dc7c47e686385a9dd456f70adab6f563f9212b332bb"
  },
  "readable_paths": [
    "docs/orchestration/packets/MAPLEMOON-CARLI-SECTION-C-STRUCTURE-20260824T015628Z.md",
    "_wip/our-story.WIP.html",
    "docs/design-system/contracts/routes.v1.json",
    "docs/design-system/contracts/exceptions.v1.json",
    "scripts/check-maplemoon-design-system.mjs",
    "out/maplemoon_lane_20260823_receipt.json"
  ],
  "writable_paths": [
    "_wip/our-story.WIP.html",
    "docs/design-system/contracts/routes.v1.json",
    "docs/design-system/contracts/exceptions.v1.json",
    "docs/orchestration/LOCK_MANIFEST.json",
    "docs/orchestration/reviews/MAPLEMOON-CARLI-SECTION-C-STRUCTURE-20260824T015628Z.json"
  ],
  "sources": [
    "/Users/handtomouse/Desktop/MrCC_PAI_Stage1_Files/UFC/clients/maplemoon/CARLI_WEBSITE_NOTES_20260814_CHECKLIST.md Section C",
    "Nate's current structural-only brief",
    "existing Git provenance for already-landed C01/C07/C08, C09 and C15 structure"
  ],
  "implementation_contract": [
    "preserve the already-correct 01 The people behind the product and 02 How Maple Moon began labels and numbering; do not rewrite their prose",
    "preserve the already-removed section 03 block and do not remove any additional section",
    "change only the explicit founder-name font declarations from the editorial serif to the page-standard sans; founder biography prose already inherits the page-standard sans and remains byte-unchanged",
    "preserve the already-correct linked The Range label targeting /shop",
    "refresh only the Our Story baseline_sha256 in routes.v1.json and the two existing Our Story binding.source_sha256 values in exceptions.v1.json",
    "do not touch founder images, any out-of-scope C-item, other WIP pages, Shopify, deployment, production or client contact"
  ],
  "verify": [
    "assert exactly one 01 people label, one 02 beginning label, zero section-03 chapter blocks and one linked The Range label",
    "assert the founder card and placeholder names use var(--mm-sans), while all customer prose and founder-image references are unchanged",
    "node scripts/check-maplemoon-design-system.mjs --contracts-only returns PASS",
    "node scripts/check-maplemoon-design-system.mjs --route-conformance all returns PASS",
    "git diff --check and exact scoped diff review pass",
    "the receipt gate passes completion and the implementation leases are released with exact post hashes"
  ],
  "done": "The repo-scoped structural fix and hash reconciliation are committed with both required checker modes passing; the external checklist limitation is reported as HOLD rather than concealed.",
  "stop": [
    "any requested change requires a prose rewrite, founder-image mutation, another C-item, another WIP page, Shopify, deploy, production or client contact",
    "the existing 01/02/no-03/The Range structure differs from the brief before implementation",
    "a required checker fails after exact reconciliation",
    "the external checklist is treated as updated without verifiable write access"
  ],
  "forbidden_actions": [
    "touch homepage_real_1_lead_photo.WIP.html, shop.WIP.html, carob-story.WIP.html or any founder media",
    "rewrite or normalize customer prose",
    "mutate, delete, stage, move, rename or gitignore out/carli_dylan_blurbs_raw_20260824.md",
    "send, upload, publish, deploy, change Shopify or contact the client"
  ],
  "next_reviewer": "Nate for the external checklist tick-off and any later tone rewrite",
  "requires_visual_evidence": false
}
<!-- CONTROL-PLANE:END -->

## BOSS decision

GO for the exact repo-scoped mechanical delta. The page already contains the requested
numbering/labels, section-03 removal and linked Range label, so those bytes are preserved.
The checklist path remains read-only in this sandbox and must stay a reported HOLD.

## HOLD — 2026-08-24 12:02 AEST

No implementation lease was acquired and no Our Story byte was changed. After this packet's
checkpoint passed, `MAPLEMOON-CARLI-SECTION-D-20260824T015534Z` acquired the two shared contract
paths, changed them, and marked those leases `blocked`. This Section C lane may not reclaim or
write them. The external checklist is also read-only in this sandbox. Resume only after the
Section D contract locks are coordinator-released and the checklist path is writable; then
create a fresh superseding candidate and checkpoint against the new HEAD and hashes.

Final read-only gate replay at 12:03 AEST also returned:

```text
HOLD contracts-only holds=1
home: frozen baseline hash drifted
HOLD route-conformance holds=1
home: frozen baseline hash drifted
```

The new Home drift belongs to the concurrently held Section A lane. Our Story's Git diff is
empty. No commit was created because the required checks do not pass and the shared worktree
contains uncommitted changes owned by the Section A and Section D lanes.
