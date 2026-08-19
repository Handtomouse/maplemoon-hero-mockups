# MapleMoon founder-frame review R2 verification

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-FOUNDER-FRAME-REVIEW-R2-20260816",
  "worker_thread_id": "/root",
  "state": "admitted",
  "objective": "Independently close and verify the already-written 75-JPEG founder-frame classification after the first packet's phase-start check was accidentally run after the output write.",
  "authority": "Recovery successor to MAPLEMOON-FOUNDER-FRAME-REVIEW-20260816, whose late start gate truthfully returned HOLD without invalidating the read-only visual classification.",
  "base": {
    "founder_frames_sha256": "989bc18c58d2eba7264e1c46341e24a1bde522fec2088bc2374d506ae0622794"
  },
  "readable_paths": [
    "maplemoon_rebuild_20260815/FOUNDER_FRAMES.md",
    "maplemoon-website/_wip/evidence/track1_repair_20260816/founder-review",
    "Projects/maplemoon/downloads/wetransfer_website-hero-raws_2026-06-03_1315"
  ],
  "writable_paths": [
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-FOUNDER-FRAME-REVIEW-R2-20260816.json"
  ],
  "method": [
    "checkpoint the exact receipt before first write",
    "pin the existing classification output and all 75 input JPEGs",
    "replay file-count, contact-sheet, classification and no-input-mutation checks",
    "record the first packet's late start-gate HOLD without hiding or weakening it"
  ],
  "verify": [
    "exactly 75 readable JPEGs exist",
    "five nonblank labelled contact sheets cover frames 1 through 75",
    "the pinned output contains the three required lists and identifies Heros-73.jpg as the sole qualifying both-founder frame",
    "all input hashes remain stable across close"
  ],
  "stop": [
    "the pinned founder review output changes",
    "an input JPEG changes or becomes unreadable",
    "the evidence does not support the one-frame conclusion"
  ],
  "forbidden_actions": [
    "edit the founder review output or any image",
    "select, approve or integrate an image",
    "deploy, publish, send or contact the client"
  ],
  "next_reviewer": "Nate for Heros-73.jpg review and selection",
  "requires_visual_evidence": true
}
<!-- CONTROL-PLANE:END -->
