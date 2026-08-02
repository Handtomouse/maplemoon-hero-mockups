# Packet PHOTO-MITCH-DELIVERY-AUDIT-SESSION-PREP-20260802

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "PHOTO-MITCH-DELIVERY-AUDIT-SESSION-PREP-20260802",
  "candidate_id": "PHOTO-MITCH-DELIVERY-AUDIT-SESSION-PREP-20260802-001",
  "worker_thread_id": "019f9c36-83e1-7941-92e5-a3b134212288",
  "phase": "PHOTO-MITCH-DELIVERY-AUDIT-SESSION-PREP",
  "state": "ready",
  "requires_visual_evidence": true,
  "objective": "Audit the complete local Mitch delivery and its known derivatives, then create one versioned local-only inventory, contact-sheet and Photoshop-session-preparation pack without editing pixels, creating canonical PSDs or changing website references.",
  "readable_paths": [
    "/Users/handtomouse/Downloads/wetransfer_website-hero-raws_2026-06-03_1315.zip",
    "/Users/handtomouse/Downloads/wetransfer_website-hero-raws_2026-06-03_1315/",
    "_wip/source_recovery/",
    "_wip/reviews/photoshoot_repair_batch1_20260731/",
    "_wip/reviews/photoshoot_repair_batch1_20260801/",
    "/Users/handtomouse/UFC/spins/maplemoon_three_round_blue_warm_20260723/",
    "_wip/",
    "docs/client-review/2026-08-01-saturday-review/",
    "docs/orchestration/packets/",
    "docs/orchestration/reviews/",
    "docs/orchestration/SIDECHAT_RECEIPT_GATE.md",
    "scripts/check-maplemoon-receipt.py"
  ],
  "writable_paths": [
    "docs/orchestration/packets/PHOTO-MITCH-DELIVERY-AUDIT-SESSION-PREP-20260802.md",
    "docs/orchestration/reviews/PHOTO-MITCH-DELIVERY-AUDIT-SESSION-PREP-20260802.json",
    "_wip/reviews/photoshoot_delivery_audit_20260802/MITCH_DELIVERY_INVENTORY_20260802.json",
    "_wip/reviews/photoshoot_delivery_audit_20260802/MITCH_DELIVERY_INVENTORY_20260802.csv",
    "_wip/reviews/photoshoot_delivery_audit_20260802/MITCH_DUPLICATE_DERIVATIVE_MAP_20260802.json",
    "_wip/reviews/photoshoot_delivery_audit_20260802/MITCH_OVERLOOKED_SHOT_SHORTLIST_20260802.md",
    "_wip/reviews/photoshoot_delivery_audit_20260802/MITCH_WEBSITE_PLACEMENT_MAP_20260802.md",
    "_wip/reviews/photoshoot_delivery_audit_20260802/MITCH_CONTACT_SHEET_20260802.html",
    "_wip/reviews/photoshoot_delivery_audit_20260802/contact-sheets/MITCH_CONTACT_SHEET_01_HEROS_2_16.png",
    "_wip/reviews/photoshoot_delivery_audit_20260802/contact-sheets/MITCH_CONTACT_SHEET_02_HEROS_17_31.png",
    "_wip/reviews/photoshoot_delivery_audit_20260802/contact-sheets/MITCH_CONTACT_SHEET_03_HEROS_32_46.png",
    "_wip/reviews/photoshoot_delivery_audit_20260802/contact-sheets/MITCH_CONTACT_SHEET_04_HEROS_47_61.png",
    "_wip/reviews/photoshoot_delivery_audit_20260802/contact-sheets/MITCH_CONTACT_SHEET_05_HEROS_62_75_AND_HEROS.png",
    "_wip/reviews/photoshoot_delivery_audit_20260802/PHOTOSHOP_SESSION_PACK_INDEX_20260802.md",
    "_wip/reviews/photoshoot_delivery_audit_20260802/PHOTOSHOP_SESSION_QUEUE_20260802.json",
    "_wip/reviews/photoshoot_delivery_audit_20260802/PHOTOSHOP_SESSION_REPAIR_GUIDES_20260802.html",
    "_wip/reviews/photoshoot_delivery_audit_20260802/PHOTOSHOP_SESSION_REPAIR_GUIDES_20260802.json",
    "_wip/reviews/photoshoot_delivery_audit_20260802/MITCH_MORNING_PHOTO_HANDOFF_20260802.md"
  ],
  "base": {
    "zip_path": "/Users/handtomouse/Downloads/wetransfer_website-hero-raws_2026-06-03_1315.zip",
    "zip_sha256": "6dae04ef4d06f02ae9e222057df40875235978a74a0022b6424c67c9d0acd841",
    "zip_members": 75,
    "zip_member_rule": "Heros-2.jpg through Heros-75.jpg plus Heros.jpg; all members must pass archive integrity testing",
    "photo_73_v03_path": "_wip/reviews/photoshoot_repair_batch1_20260801/73_reuse_g_v03/73_reuse_g_v03.psd",
    "photo_73_v03_sha256": "abcc2f13400e313f6dacfafebefe3b1736e2e962aebeda12e4e76424a037ab3c",
    "disk_guard_gib": 20,
    "candidate_rule": "new preparation outputs only; all sources, PSDs, WIP, packages and website references remain unchanged"
  },
  "method": [
    "Hash and inspect metadata for every ZIP member and compare every extracted counterpart without extracting, restoring or modifying anything",
    "Map known derivatives, candidates, PSDs and exports to stable source IDs using exact hashes and evidence-backed lineage classifications",
    "Use perceptual and visual comparison to identify near-duplicates, alternative frames and stronger overlooked candidates while inventorying all 75 originals",
    "Map website placement and crop only where current local evidence supports it; otherwise record unknown or client decision",
    "Classify treatment and prepare one ordered future Photoshop session queue without creating canonical PSDs or editing pixels",
    "Keep all annotations in separate HTML or SVG guides and render source-faithful contact sheets covering all 75 originals exactly once"
  ],
  "verify": [
    "phase-start checkpoint and receipt gate pass before any audit output is written",
    "ZIP and photo 73 hashes remain exact before and after the phase",
    "inventory contains 75 unique stable source IDs with required metadata and no unreviewed gaps",
    "contact sheets cover all 75 ZIP originals exactly once and total less than 250 MB",
    "extracted comparison and derivative lineage explicitly identify missing, exact, altered, extra, authoritative, frozen, HOLD, superseded, rejected algorithmic and unknown states",
    "current photo 8, 24, 73, 74 and 63 decisions reconcile to durable evidence and rejected trials never become sources",
    "receipt uses maplemoon-receipt/v2, this worker_thread_id, all pre/post hashes, checkpoint, output sizes, disk check and exactly one next action"
  ],
  "stop": [
    "source ZIP or photo 73 PSD hash differs",
    "ZIP member count or integrity differs from the required 75 tested-good JPEGs",
    "available disk falls below 20 GiB before contact-sheet renders",
    "source identity or placement conflict changes the shortlist",
    "any path outside writable_paths would change",
    "any need arises to extract, restore, overwrite, edit pixels, create a PSD or master, wire a website asset, upload, deploy, commit, push, contact anyone or use Shopify, WooCommerce, Vercel or production"
  ],
  "next_reviewer": "Main Boss 019fa858-05c9-7631-b26e-8f5cbbf1387a"
}
<!-- CONTROL-PLANE:END -->

