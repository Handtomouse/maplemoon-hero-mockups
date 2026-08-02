# Packet FOUNDER-V04-PHOTO-WORKER-PHOTOSHOP-20260802

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "FOUNDER-V04-PHOTO-WORKER-PHOTOSHOP-20260802",
  "candidate_id": "FOUNDER-V04-PHOTO-WORKER-CANDIDATE-20260802-001",
  "worker_thread_id": "019f9c36-83e1-7941-92e5-a3b134212288",
  "phase": "FOUNDER-V04-PHOTO-WORKER-PHOTOSHOP",
  "state": "ready",
  "requires_visual_evidence": true,
  "objective": "Inspect the existing founder v04 PSD at native 100 percent, make only manually evidenced Photoshop corrections, export a review PNG, create honest individual Carli and Dylan crops from verified Heros-73 pixels, and render isolated Our Story context and native QA proofs without website integration.",
  "approval": "Nate clarified that photo task 019f9c36-83e1-7941-92e5-a3b134212288 is the sole Photoshop execution owner. Orchestration task 019fa858-05c9-7631-b26e-8f5cbbf1387a explicitly released the entire v04 cluster without saving the PSD or creating outputs. Claude and disposable Side chats may provide visual art direction only.",
  "supersedes_ownership": [
    "FOUNDER-V04-BIOS-20260802 / worker 019fc243-1080-78e2-97fd-40b98688751d",
    "FOUNDER-V04-MAIN-PHOTOSHOP-20260802 / worker 019fa858-05c9-7631-b26e-8f5cbbf1387a"
  ],
  "branch": "codex-maplemoon-section-review",
  "head": "5df674a3bd7bcd0fe738fbe8929320c89b29b89c",
  "ownership": "Photo task 019f9c36-83e1-7941-92e5-a3b134212288 is the sole mutating owner for every writable path in this packet.",
  "readable_paths": [
    "docs/orchestration/SIDECHAT_RECEIPT_GATE.md",
    "docs/orchestration/LOCK_MANIFEST.json",
    "scripts/check-maplemoon-receipt.py",
    "docs/orchestration/packets/FOUNDER-V04-BIOS-20260802.md",
    "docs/orchestration/packets/FOUNDER-V04-MAIN-PHOTOSHOP-20260802.md",
    "_wip/reviews/photoshoot_repair_batch1_20260801/73_reuse_g_v03/73_reuse_g_v03.psd",
    "_wip/source_recovery/photoshoot_raws_20260801/Heros-73.jpg",
    "_wip/our-story.WIP.html",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/clean/our-story.html",
    "docs/client-review/2026-08-01-saturday-review/staging-v1/annotated/our-story.html"
  ],
  "writable_paths": [
    "docs/orchestration/packets/FOUNDER-V04-PHOTO-WORKER-PHOTOSHOP-20260802.md",
    "docs/orchestration/reviews/FOUNDER-V04-PHOTO-WORKER-PHOTOSHOP-20260802.json",
    "_wip/reviews/founder_photo_v04_bios_20260802/founders_portrait_v04.psd",
    "_wip/reviews/founder_photo_v04_bios_20260802/founders_portrait_v04.png",
    "_wip/reviews/founder_photo_v04_bios_20260802/carli_bio_v01.psd",
    "_wip/reviews/founder_photo_v04_bios_20260802/carli_bio_v01.png",
    "_wip/reviews/founder_photo_v04_bios_20260802/dylan_bio_v01.psd",
    "_wip/reviews/founder_photo_v04_bios_20260802/dylan_bio_v01.png",
    "_wip/reviews/founder_photo_v04_bios_20260802/source-selection.md",
    "_wip/reviews/founder_photo_v04_bios_20260802/our_story_v04_review.html",
    "_wip/reviews/founder_photo_v04_bios_20260802/qa/founders_portrait_v04_edges_100pct.png",
    "_wip/reviews/founder_photo_v04_bios_20260802/qa/carli_bio_v01_edges_100pct.png",
    "_wip/reviews/founder_photo_v04_bios_20260802/qa/dylan_bio_v01_edges_100pct.png",
    "_wip/reviews/founder_photo_v04_bios_20260802/qa/our_story_v04_desktop_1440.png",
    "_wip/reviews/founder_photo_v04_bios_20260802/qa/our_story_v04_mobile_390.png"
  ],
  "base": {
    "head": "5df674a3bd7bcd0fe738fbe8929320c89b29b89c",
    "v03_protected_path": "_wip/reviews/photoshoot_repair_batch1_20260801/73_reuse_g_v03/73_reuse_g_v03.psd",
    "v03_protected_sha256": "abcc2f13400e313f6dacfafebefe3b1736e2e962aebeda12e4e76424a037ab3c",
    "v04_working_path": "_wip/reviews/founder_photo_v04_bios_20260802/founders_portrait_v04.psd",
    "v04_working_sha256": "53a9fe71d00bad379cf50a78688bc95f9606aea37afa2e848fa7b02041954333",
    "verified_source_path": "_wip/source_recovery/photoshoot_raws_20260801/Heros-73.jpg",
    "verified_source_sha256": "b31b11b0aec41cb9461a74e906a84979162d34b691a27fcef72a3b153e1e6d93",
    "disk_free_gib_at_admission": 47,
    "disk_guard_gib": 20,
    "candidate_rule": "All outputs remain isolated under the v04 review directory and are never wired into canonical WIP, the frozen package, live assets or production."
  },
  "method": [
    "Inspect the existing v04 PSD full-frame and at native 100 percent before any pixel change and record each proven defect.",
    "Use manual Photoshop tools only where native inspection proves a defect; do not generate, reconstruct or replace people, hair, hands, fingers or background.",
    "Preserve the protected v03 PSD and verified Heros-73 source bytes exactly.",
    "Export founders_portrait_v04.png only from the admitted v04 PSD after native QA.",
    "Create individual Carli and Dylan PSD and PNG crops only from verified Heros-73 source pixels, choosing an honest crop suited to each person without fabricating missing scene content.",
    "Create one isolated local Our Story review page and desktop/mobile proofs only after native portrait and crop gates pass.",
    "Record source selection, crop bounds, pre/post hashes, native visual findings and the exact checkpoint in a maplemoon-receipt/v2 receipt."
  ],
  "verify": [
    "phase-start checkpoint and receipt gate pass before Photoshop or pixel mutation",
    "HEAD and all three required base hashes match at phase start and remain stable",
    "the checkpoint records every present and absent writable path without overwriting an earlier checkpoint",
    "the v04 PSD remains layered and the protected v03 PSD and Heros-73 source remain byte-identical",
    "native 100 percent proofs show no teal contamination, halo, hard cutout edge, clipped hair or fingers, lost grain, altered identity or reconstructed pixels",
    "Carli and Dylan crops contain only verified Heros-73 source pixels and preserve truthful proportions and identity",
    "desktop 1440 and mobile 390 isolated Our Story proofs show intentional crops without overflow or broken assets",
    "no canonical WIP, frozen clean or annotated package, website reference, live asset or production path changes",
    "receipt uses maplemoon-receipt/v2 and the exact worker_thread_id"
  ],
  "stop": [
    "HEAD or any required base hash differs",
    "another owner controls an admitted path",
    "recovery or phase-start gate fails",
    "available disk falls below 20 GiB before a large output",
    "interactive Photoshop control is unavailable",
    "a correction would require generation, reconstruction, subject replacement, broad Defringe, identity alteration or invented scene pixels",
    "native QA exposes a halo, clipped hair or fingers, hard cutout edge, lost grain, changed identity or altered source geometry",
    "any path outside writable_paths would change",
    "website integration, reference change, upload, deploy, publish, send, commit, push or production action is required"
  ],
  "forbidden_actions": [
    "modify v03, v02, H212, Heros-73, the source ZIP, canonical WIP, frozen clean or annotated pages, website references, live assets or production",
    "use generative fill or reconstruct people, hair, hands, fingers or background",
    "commit, push, deploy, publish, upload, share, send, contact anyone or integrate the candidate"
  ],
  "next_reviewer": "Nate for visual approval before any website integration"
}
<!-- CONTROL-PLANE:END -->

## Output boundary

This packet authorizes only isolated photo-task-owned Photoshop review candidates and evidence. It does not authorize website integration, reference changes or any external action.
