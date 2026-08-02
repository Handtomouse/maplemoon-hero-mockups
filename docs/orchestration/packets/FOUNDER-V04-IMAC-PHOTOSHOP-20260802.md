# Packet FOUNDER-V04-IMAC-PHOTOSHOP-20260802

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "FOUNDER-V04-IMAC-PHOTOSHOP-20260802",
  "candidate_id": "FOUNDER-V04-IMAC-PHOTOSHOP-CANDIDATE-20260802-001",
  "worker_thread_id": "019f9c36-83e1-7941-92e5-a3b134212288",
  "phase": "FOUNDER-V04-IMAC-PHOTOSHOP",
  "state": "ready",
  "requires_visual_evidence": true,
  "objective": "Inspect the checksum-verified founder v04 stage at full frame and native 100 percent in Photoshop on the iMac, make only visually proven manual corrections, export a review PNG, and create honest Carli and Dylan crops from verified Heros-73 pixels without disturbing the MacBook.",
  "approval": "Nate explicitly requested that the Photoshop work run on the iMac. Staging packet FOUNDER-V04-IMAC-STAGE-20260802 passed with exact source hashes.",
  "execution_host": "HandToMouses-iMac.local",
  "execution_root": "/Users/handtomouse/MapleMoon-Photoshop-Work/FOUNDER-V04-IMAC-PHOTOSHOP-20260802",
  "ownership": "Photo task 019f9c36-83e1-7941-92e5-a3b134212288 is the sole mutating owner for this iMac Photoshop phase.",
  "readable_paths": [
    "/Users/handtomouse/MapleMoon-Photoshop-Work/FOUNDER-V04-IMAC-STAGE-20260802/inputs/founders_portrait_v04.psd",
    "/Users/handtomouse/MapleMoon-Photoshop-Work/FOUNDER-V04-IMAC-STAGE-20260802/inputs/Heros-73.jpg"
  ],
  "writable_paths": [
    "packet.md",
    "receipt.json",
    "scripts/check-maplemoon-receipt.py",
    "work/founders_portrait_v04.psd",
    "work/carli_bio_v01.psd",
    "work/dylan_bio_v01.psd",
    "outputs/founders_portrait_v04.png",
    "outputs/carli_bio_v01.png",
    "outputs/dylan_bio_v01.png",
    "qa/founders_full_frame_before.png",
    "qa/founders_edges_100pct_before.png",
    "qa/founders_full_frame_after.png",
    "qa/founders_edges_100pct_after.png",
    "qa/carli_bio_full_frame.png",
    "qa/dylan_bio_full_frame.png"
  ],
  "base": {
    "staged_v04_sha256": "53a9fe71d00bad379cf50a78688bc95f9606aea37afa2e848fa7b02041954333",
    "staged_source_sha256": "b31b11b0aec41cb9461a74e906a84979162d34b691a27fcef72a3b153e1e6d93",
    "stage_receipt": "/Users/handtomouse/MapleMoon-Photoshop-Work/FOUNDER-V04-IMAC-STAGE-20260802/receipt.json",
    "disk_guard_gib": 20
  },
  "method": [
    "Checkpoint every exact writable path and pass the remote phase-start gate before creating the working PSD copy.",
    "Copy the frozen v04 stage to work/founders_portrait_v04.psd without altering the stage.",
    "Open only the work copy in Photoshop 2026 on the iMac and record full-frame and native 100 percent before proofs.",
    "Apply manual Photoshop corrections only where the native proof exposes a real defect; no broad Defringe or generated pixels.",
    "Record full-frame and native 100 percent after proofs, preserve layers, and export the review PNG.",
    "Create Carli and Dylan crop PSDs from the verified Heros-73 stage only, preserving truthful pixels and proportions, then export PNG review candidates.",
    "Rehash both staged inputs after work; write a compact receipt and stop before any MacBook return copy or website integration."
  ],
  "verify": [
    "remote checkpoint and phase-start gate pass before work copy creation",
    "staged v04 and Heros-73 hashes remain unchanged",
    "before and after visual proofs are nonblank and show the actual image",
    "native 100 percent inspection covers Carli hair, hand and fingers, founder separation, shoulders and body/background edges",
    "no teal contamination, halo, clipped hair or fingers, hard cutout edge, lost grain or identity change is introduced",
    "Carli and Dylan crops contain only verified Heros-73 source pixels",
    "layered PSDs and nonblank PNG exports exist and pass file integrity checks",
    "receipt uses maplemoon-receipt/v2 and the exact worker_thread_id"
  ],
  "stop": [
    "staged source hash mismatch",
    "remote root or output path already exists",
    "checkpoint or phase-start gate fails",
    "interactive iMac Photoshop control or reliable screenshot capture is unavailable",
    "a correction requires generation, reconstruction, subject replacement or broad Defringe",
    "native QA exposes damaged identity, hair, hands, fingers, grain or source geometry",
    "iMac free disk falls below 20 GiB",
    "any path outside writable_paths would change"
  ],
  "forbidden_actions": [
    "modify staged inputs, MacBook v04, v03, H212, Heros-73, website files, live references or production",
    "use Generative Fill or reconstruct people, hair, hands, fingers or background",
    "copy results back to the MacBook before completion PASS",
    "commit, push, deploy, publish, upload, send or integrate"
  ],
  "next_reviewer": "Nate for visual approval after verified candidates return to the MacBook"
}
<!-- CONTROL-PLANE:END -->

## Output boundary

This packet authorizes only isolated iMac Photoshop candidates and QA evidence. It stops before return transfer and website integration.
