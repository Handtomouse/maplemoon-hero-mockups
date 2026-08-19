# SAT-FOUR-PAGE-SEAMS-FADES-WIP-20260803

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "SAT-FOUR-PAGE-SEAMS-FADES-WIP-20260803",
  "worker_thread_id": "019fa858-05c9-7631-b26e-8f5cbbf1387a",
  "state": "ready",
  "objective": "establish one evidence-led Homepage dissolve pattern and apply it sequentially to only the large image fields in the Homepage, Our Story, Carob Story and Stockists WIP sources, without rebuilding or mutating staging-v1",
  "approval": "Nate explicitly said go after Main proposed accepting the disjoint current base and admitting the four-page seams/fades WIP packet. The later HEAD-only dispatch commit is disjoint from all admitted WIPs and frozen staging paths and confirms Homepage-first sequencing.",
  "branch": "codex-maplemoon-section-review",
  "head": "07152ce54d48ae7492febacd469e1ed5efd1b85c",
  "ownership": "Main is the sole sequential writer for the four exact WIP sources. Current task evidence shows no other active MapleMoon page writer; LOCK_MANIFEST.json contains no current lease for these paths. The committed fan-out brief names no worker IDs and this packet executes its required Homepage-first dependency in one non-overlapping lane.",
  "base": {
    "authority_sha256": {
      "_wip/evidence/CODEX-PACKET-REQUEST-SEAMS-AND-FADES-20260803.md": "351b4591a75a8142f063cdd3b18b7cf38eaf9fd1511304672cacbf15b5c065ed",
      "_wip/evidence/NATE-REVIEW-PASS-20260803.md": "c441d84a05bbdc33f26d346b2e6ef4fe8629a2819098f44520194017717b4717",
      "docs/orchestration/LOCK_MANIFEST.json": "8817645e128f6723fd2384f62fdfb78ca01d6b5ba5196339bb764137c38e12b2"
    },
    "wip_sha256": {
      "_wip/homepage_real_1_lead_photo.WIP.html": "64893f642ea86fab925561893b7239a674477b0a72c1c0396d6ebc16b00caffd",
      "_wip/our-story.WIP.html": "a823f0f7291ee3b66acfefd0a718227c47717cf7811747db9216a1e17612fb1d",
      "_wip/carob-story.WIP.html": "e1695095f6b8e18eccea468dfd8a09013e85b5c64c5de427b3d8e5701e6f4320",
      "_wip/stockists.WIP.html": "6e92382ccec4874aac79c32e644d0ed130d03400c7d23682623b0e4154a6fa36"
    },
    "frozen_generated_sha256": {
      "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/MANIFEST.json": "d1c66b1d5937e9956d1806dbbbff4faf4f950def046aa642ae52f809c3d52d20"
    }
  },
  "diagnosis_before_css": {
    "homepage_hero": "The working hero dissolve uses two coordinated layers: a source image/video field extending beyond the hero with a long vertical mask, plus a separate blurred .fog gradient band that bridges the source into the page wash.",
    "hard_edges": "The identified section seams use only a terminating image field, an image-local mask, or a flat overlay. They lack the separate page-colour transition band that hides the source boundary.",
    "pattern": "Keep the image itself legible, apply a symmetric edge mask only where needed, and add a page-colour gradient bridge at the section boundary. Contained product/editorial cards remain cards rather than being converted to full-bleed fields."
  },
  "readable_paths": [
    "_wip/evidence/CODEX-PACKET-REQUEST-SEAMS-AND-FADES-20260803.md",
    "_wip/evidence/NATE-REVIEW-PASS-20260803.md",
    "_wip/evidence/FAN-OUT-DISPATCH-20260803.md",
    "docs/orchestration/SIDECHAT_RECEIPT_GATE.md",
    "docs/orchestration/LOCK_MANIFEST.json",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/MANIFEST.json",
    "_wip/homepage_real_1_lead_photo.WIP.html",
    "_wip/our-story.WIP.html",
    "_wip/carob-story.WIP.html",
    "_wip/stockists.WIP.html"
  ],
  "writable_paths": [
    "docs/orchestration/packets/SAT-FOUR-PAGE-SEAMS-FADES-WIP-20260803.md",
    "docs/orchestration/reviews/SAT-FOUR-PAGE-SEAMS-FADES-WIP-20260803.json",
    "_wip/homepage_real_1_lead_photo.WIP.html",
    "_wip/our-story.WIP.html",
    "_wip/carob-story.WIP.html",
    "_wip/stockists.WIP.html"
  ],
  "source_resolution": [
    "Homepage first: preserve the hero dissolve, completed story symmetry and softened ritual cards; remove the remaining hard top seam from the #carob image field using the diagnosed layered pattern",
    "Our Story second: dissolve the full-bleed ingredient, source and craft image fields into the established page washes without changing founder identity, copy or contained card imagery",
    "Carob Story third: soften the orchard hero and range CTA image-field boundaries while retaining their contained editorial hierarchy",
    "Stockists fourth: preserve the already-masked decorative header silhouette and feather the large wholesale image inside its existing card without changing finder, stockist or commerce content"
  ],
  "excluded": [
    "R2 or R3 carousel edge mist or centre-sharp product treatment",
    "copy, claims, pricing, catalogue, product imagery or founder identity changes",
    "Carob Story three-versus-four wording correction",
    "Stockists tablet skip-link correction",
    "Shop or FAQ WIP changes",
    "builder, scripts, generated pages, manifests or staging-v1 mutation",
    "any CR-0 through CR-4 or NATE-HOME-001 decision"
  ],
  "verify": [
    "phase-start gate passes against a timestamped non-overwriting checkpoint for all six writable paths",
    "Homepage is implemented and checked before the other three pages copy the pattern",
    "the four edited WIPs remain parseable and contain at least Homepage 8, Our Story 8, Carob Story 5 and Stockists 3 sections",
    "rendered top-to-bottom review passes at 1440px, 834px and 390px after image loading, with no horizontal overflow or broken image regression",
    "the Homepage hero, story symmetric fade, ritual cards and approved content remain present",
    "Shop and FAQ WIP hashes remain exact",
    "staging-v1 clean/MANIFEST.json remains d1c66b1d5937e9956d1806dbbbff4faf4f950def046aa642ae52f809c3d52d20",
    "independent read-only diff review confirms only the admitted page-local CSS and receipt changed after checkpoint"
  ],
  "stop": [
    "HEAD or any WIP/frozen manifest base hash changes after checkpoint and before mutation",
    "checkpoint or phase-start gate is missing or fails",
    "another active writer owns any admitted WIP",
    "a result needs copy, asset, builder, generated-package, Shop, FAQ or other excluded work",
    "rendered, structural, scope, overflow, image or manifest verification fails",
    "commit, push, deploy, publish, upload, share, send, commerce or production action is requested"
  ],
  "forbidden_actions": [
    "edit any path outside writable_paths",
    "run the staging-v1 builder or mutate staging-v1",
    "invent or alter product, process, origin, founder, stockist or commerce facts",
    "commit, push, deploy, publish, upload, share, send or contact anyone"
  ],
  "next_reviewer": "Main independent diff and rendered verification; final multi-page rebuild remains deferred until all page-review corrections join the batch",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->

## Output

This packet authorizes only the four listed WIP CSS treatments. It does not authorize staging regeneration, promotion, external sharing, or any deferred page correction.
