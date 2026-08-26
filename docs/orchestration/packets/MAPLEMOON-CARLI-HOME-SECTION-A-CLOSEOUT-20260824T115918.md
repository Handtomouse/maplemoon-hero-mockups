# MapleMoon Carli Home Section A closeout — 2026-08-24 11:59 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-CARLI-HOME-SECTION-A-CLOSEOUT-20260824T115918",
  "candidate_id": "MAPLEMOON-CARLI-HOME-SECTION-A-CLOSEOUT-CANDIDATE-20260824-001",
  "cluster_id": "MAPLEMOON-CARLI-HOME-SECTION-A-CLOSEOUT",
  "worker_thread_id": "/root",
  "state": "admitted_local_home_closeout_with_external_checklist_hold",
  "approval_class": "nate-directed-mutating-local-wip",
  "objective": "Close only the still-open non-generated-image implementation work in Carli's Home Section A checklist: remove the Home Eclipse Bites format grouping and replace the three ritual lifestyle images with existing real Maple Moon studio product photography, with local rendered evidence and a schema-valid receipt.",
  "authority": "Nate supplied the exact checklist, target, rulings, prior receipt, verification commands and do-not-touch scope. A02, A03, A04 and A06 remain human-choice gates; generated candidates may not be auto-placed. The shared route and exception contracts are currently leased by the non-overlapping Section D lane, so Home hash reconciliation requires a later exact packet after that lease releases. The external checklist path is read-only in this workspace and cannot be represented by the repository-relative V2 lock contract, so its requested checkbox write remains an explicit HOLD.",
  "base": {
    "branch": "safety/founders-20260824",
    "head": "c54d115cc1d7d679641e5061d5ee76407c48bd9b",
    "home_sha256": "a06d1e19165c84065e96c14eafd1f8e8d7e5a4228d877f0017ca191d1341c174"
  },
  "readable_paths": [
    "AGENTS.md",
    "CLAUDE.md",
    "out/maplemoon_lane_20260823_receipt.json",
    "out/image_candidates_20260823",
    "_wip/homepage_real_1_lead_photo.WIP.html",
    "_wip/contact.WIP.html",
    "assets/our_story/studio_bar_almond.webp",
    "assets/our_story/studio_bar_rock.webp",
    "assets/our_story/studio_moon_rock.webp"
  ],
  "sources": [
    "/Users/handtomouse/Desktop/MrCC_PAI_Stage1_Files/UFC/clients/maplemoon/CARLI_WEBSITE_NOTES_20260814_CHECKLIST.md (external read-only source)",
    "out/maplemoon_lane_20260823_receipt.json"
  ],
  "writable_paths": [
    "_wip/homepage_real_1_lead_photo.WIP.html",
    "_wip/evidence/carli_home_section_a_closeout_20260824T115918",
    "out/maplemoon_carli_home_section_a_20260824_receipt.json"
  ],
  "implementation_contract": [
    "remove exactly the visible Home Eclipse Bites format tab and eclipseBites from the Home category rotation order; retain the in-file product data and do not touch Shop",
    "replace exactly the three licensed ritual lifestyle image references with studio_bar_almond.webp, studio_bar_rock.webp and studio_moon_rock.webp and accurate product alt text",
    "do not place or modify any generated candidate under out/image_candidates_20260823",
    "do not change any copy, layout, product order, other image, route, exception, Shop page, founder image, deployment or production state"
  ],
  "verify": [
    "the Home pre-hash matches the admitted base before mutation",
    "A01, A05, A07-A14 assertions pass; A02, A03, A04 and A06 remain unplaced and open for Nate",
    "the three ritual images resolve to nonblank real Maple Moon product photographs and the Home Eclipse Bites format control is absent and unreachable",
    "inline JavaScript compilation for the Home template passes",
    "rendered Home evidence at 1440 and 390 is nonblank with no broken ritual images, root overflow or runtime errors",
    "only the exact packet writable paths plus coordinator-owned packet and lock-manifest records change"
  ],
  "done": "A07 and A12 are implemented locally, all already-satisfied A-items are reverified, evidence and receipt are present, this packet's leases are released, and the shared-contract and external-checklist holds are reported truthfully.",
  "stop": [
    "the admitted Home base hash differs",
    "an image candidate selection, generated-image placement, Shop edit, founder-photo edit or preserved out artifact mutation would be required",
    "any local assertion, JavaScript or rendered check fails",
    "any deploy, production, Shopify or client-contact action would be required"
  ],
  "forbidden_actions": [
    "mutate, delete, stage, move, rename or gitignore any preserved out artifact other than the new receipt",
    "touch shop.WIP.html, our-story.WIP.html, carob-story.WIP.html, founder imagery, Shopify, deployment or production",
    "write the external checklist without an admissible repository-relative lease and filesystem authority",
    "touch the shared route or exception contracts while another packet holds them",
    "push, publish or contact the client"
  ],
  "next_reviewer": "Nate",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->

## BOSS decision

GO for the exact local Home A07/A12 edits and rendered evidence only. A02, A03, A04
and A06 remain open pending Nate's pick from `image_candidates_20260823`. Home contract
reconciliation waits for the Section D exact-path leases to release. The external Desktop
checklist update remains HOLD because it is outside both the repo-relative lock contract and
this workspace's writable roots.
