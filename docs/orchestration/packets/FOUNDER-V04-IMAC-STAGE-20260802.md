# Packet FOUNDER-V04-IMAC-STAGE-20260802

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "FOUNDER-V04-IMAC-STAGE-20260802",
  "candidate_id": "FOUNDER-V04-IMAC-STAGE-20260802-001",
  "worker_thread_id": "019f9c36-83e1-7941-92e5-a3b134212288",
  "phase": "FOUNDER-V04-IMAC-STAGE",
  "state": "ready",
  "requires_visual_evidence": false,
  "objective": "Stage checksum-verified, non-overwriting copies of the founder v04 working PSD and verified Heros-73 source on the iMac so the admitted Photoshop phase can run there without disturbing the MacBook.",
  "approval": "Nate explicitly requested that the founder Photoshop work run on the iMac so the MacBook remains undisturbed.",
  "execution_host": "HandToMouses-iMac.local",
  "execution_root": "/Users/handtomouse/MapleMoon-Photoshop-Work/FOUNDER-V04-IMAC-STAGE-20260802",
  "ownership": "Photo task 019f9c36-83e1-7941-92e5-a3b134212288 is the sole mutating owner for this bounded iMac staging phase.",
  "readable_paths": [
    "source MacBook: /Users/handtomouse/maplemoon-website/_wip/reviews/founder_photo_v04_bios_20260802/founders_portrait_v04.psd",
    "source MacBook: /Users/handtomouse/maplemoon-website/_wip/source_recovery/photoshoot_raws_20260801/Heros-73.jpg"
  ],
  "writable_paths": [
    "packet.md",
    "receipt.json",
    "scripts/check-maplemoon-receipt.py",
    "inputs/founders_portrait_v04.psd",
    "inputs/Heros-73.jpg"
  ],
  "base": {
    "macbook_v04_sha256": "53a9fe71d00bad379cf50a78688bc95f9606aea37afa2e848fa7b02041954333",
    "macbook_source_sha256": "b31b11b0aec41cb9461a74e906a84979162d34b691a27fcef72a3b153e1e6d93",
    "imac_disk_free_gib_at_admission": 1500,
    "disk_guard_gib": 20
  },
  "method": [
    "Create the remote packet and checker, then checkpoint every exact writable path before either image copy exists.",
    "Run the remote phase-start gate and continue only on PASS.",
    "Copy the v04 PSD and Heros-73 source to the exact input paths without overwriting any existing file.",
    "Verify both iMac hashes equal the MacBook hashes, write the receipt, run completion verification and freeze the staged inputs as read-only evidence for the next phase."
  ],
  "verify": [
    "remote checkpoint and phase-start gate pass before input transfer",
    "remote v04 hash equals 53a9fe71d00bad379cf50a78688bc95f9606aea37afa2e848fa7b02041954333",
    "remote Heros-73 hash equals b31b11b0aec41cb9461a74e906a84979162d34b691a27fcef72a3b153e1e6d93",
    "MacBook source hashes remain unchanged",
    "receipt uses maplemoon-receipt/v2 and the exact worker_thread_id"
  ],
  "stop": [
    "any source hash mismatch",
    "remote root or input path already exists",
    "remote checkpoint or receipt gate fails",
    "iMac free disk falls below 20 GiB",
    "any path outside writable_paths would change"
  ],
  "forbidden_actions": [
    "modify MacBook v04, v03, Heros-73, H212, website files, live references or production",
    "open or edit Photoshop pixels during this staging phase",
    "overwrite an existing remote file",
    "commit, push, deploy, publish, upload, send or integrate"
  ],
  "next_reviewer": "Photo task for independent hash verification before the iMac Photoshop packet"
}
<!-- CONTROL-PLANE:END -->

## Output boundary

This packet authorizes only checksum-verified staging copies on the iMac. It does not authorize Photoshop edits or website integration.
