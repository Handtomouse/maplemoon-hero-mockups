# MapleMoon Shopify theme update S1B resume — 2026-08-19 11:20 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-SHOPIFY-THEME-UPDATE-S1B-20260819T112058",
  "supersedes_hold_in": "MAPLEMOON-SHOPIFY-THEME-UPDATE-S1B-20260819T104947",
  "worker_thread_id": "/root",
  "state": "executed",
  "objective": "Resume S1B at step 4 after Nate applied the official Etheryx 1.6.0 update in the Shopify admin. Verify what the admin route actually did, identify the theme it created, establish its source from bytes, prove the live theme and the sealed S1 duplicate did not move, capture after bytes, confirm 1.6.0 from the theme's own bytes, produce the exact 1.4.0 to 1.6.0 file and settings migration diff, separate vendor change from dropped customisation, verify settings preservation, and rerun both gates.",
  "authority": "Nate's 2026-08-19 authorisation of the single official update action, already recorded in the 10:49 packet. Nate performed the update himself in the admin. This packet covers read-only verification of the result and nothing else.",
  "base": {
    "store": "maplemooncarob.myshopify.com",
    "live_theme_id": "154500595909",
    "live_theme_name": "Ethereal",
    "live_theme_role": "live",
    "sealed_s1_theme_id": "160076628165",
    "sealed_s1_theme_name": "MapleMoon Private Review 20260817 S1",
    "sealed_s1_theme_role": "unpublished",
    "new_theme_id": "160142491845",
    "new_theme_name": "Updated copy of Ethereal",
    "new_theme_role": "unpublished",
    "new_theme_processing": false,
    "theme_family": "Etheryx",
    "installed_version_before": "1.4.0",
    "installed_version_after": "1.6.0",
    "theme_author": "OpenThinking",
    "before_files": 246,
    "before_bytes": 2866869,
    "before_gate_directory_sha256": "e48a21dc289c2534aaf06711e1e4b653a7b4b54ce7a11406f8d78027a147ccc4",
    "before_relative_tree_sha256": "6f94b20a498fa0db7d3d4f602a04a783809689e75f95dbf234f802e8ec9c5dee",
    "after_files": 270,
    "after_bytes": 3046532,
    "after_gate_directory_sha256": "a8aa2c2d8eb252d83bc700a8ec0567300a910f1571fe9f26208cde9ba23c3b1d",
    "after_relative_tree_sha256": "4f281bb3683fd58750db478490ac2b13a90b0b06ee583565386ebad097476179"
  },
  "readable_paths": [
    "/Users/handtomouse/UFC/ops/state/HANDOFF_MAPLEMOON_SHOPIFY_S1B_20260819.md",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-SHOPIFY-THEME-UPDATE-S1B-20260819T104947.md",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/MAPLEMOON-SHOPIFY-THEME-UPDATE-S1B-20260819T104947.md",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/MAPLEMOON-SHOPIFY-THEME-UPDATE-S1B-20260819T104947.json",
    "/Users/handtomouse/maplemoon-website/_wip/recovery/shopify_theme_safety_s1_20260817T210246",
    "/Users/handtomouse/maplemoon-website/_wip/recovery/shopify_theme_update_s1b_20260819T104947"
  ],
  "writable_paths": [
    "maplemoon-website/_wip/evidence/shopify_theme_update_s1b_20260819T112058",
    "maplemoon-website/_wip/recovery/shopify_theme_update_s1b_20260819T112058",
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-SHOPIFY-THEME-UPDATE-S1B-20260819T112058.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-SHOPIFY-THEME-UPDATE-S1B-20260819T112058.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-SHOPIFY-THEME-UPDATE-S1B-20260819T112058.json"
  ],
  "authorized_external_side_effect": "None. This lane is read-only against Shopify. The only Shopify calls are 'shopify theme list', 'shopify theme info' and 'shopify theme pull --nodelete', plus anonymous curl of the public storefront.",
  "method": [
    "poll 'shopify theme list --json' until the new theme reports processing false, and do not pull a theme still processing",
    "record the new theme's id, name, role and processing state from the CLI, not from the admin label",
    "establish the new theme's source by comparing its bytes against both candidate sources; report UNDETERMINED rather than inferring from the name",
    "re-pull 154500595909 and 160076628165 fresh and prove both are still byte-identical to their sealed recoveries with diff -qr, before touching the new theme",
    "prove the storefront is still password gated by anonymous curl",
    "pull the new theme and record file count, byte total, gate directory digest and relative tree SHA-256",
    "read the installed version from config/settings_schema.json in the pulled bytes",
    "classify every file as added, removed, modified or unchanged against the sealed 1.4.0 tree",
    "separate vendor change from dropped customisation, and test whether the 1.4.0 tree contained any code customisation at all before treating Shopify's warning banner as evidence of loss",
    "classify every settings key as preserved, changed, newly defaulted or orphaned across settings_schema.json and settings_data.json, asserting a nonzero before-side key count first",
    "rerun strict JSON and Shopify Theme Check and report numbers, per-check deltas and error file locations, never an exit code alone",
    "write packet, human report, maplemoon-receipt/v2 receipt and a recovery tree holding the after state only, then stop"
  ],
  "verify": [
    "new theme reports processing false on three consecutive polls before any pull",
    "154500595909 is role live, 246 files, 2,866,869 bytes, diff -qr exit 0 against both sealed copies",
    "160076628165 is role unpublished, 246 files, 2,866,869 bytes, diff -qr exit 0 against both sealed copies",
    "storefront final_url ends /password with http 200",
    "the after tree reports theme_version 1.6.0 in its own config/settings_schema.json",
    "every gate that cannot be run is reported as not run, with its reason and its instrument"
  ],
  "stop": [
    "the new theme is still processing on any poll",
    "154500595909 is not role live, or is not byte-identical to its sealed recovery",
    "160076628165 is not role unpublished, or is not byte-identical to its sealed recovery",
    "the storefront no longer returns the password page",
    "the new theme's own bytes do not report theme_version 1.6.0",
    "the before-side settings key count is zero, which would make any settings diff meaningless",
    "any Shopify object other than the creation of 160142491845 has changed"
  ],
  "forbidden_actions": [
    "publish, promote or preview-publish any theme; delete any theme including 160142491845",
    "edit live theme 154500595909 or sealed theme 160076628165",
    "remove storefront password protection, activate payments, transfer ownership, change domain or DNS",
    "import or modify any product, collection or metaobject; install any app",
    "begin the MapleMoon theme port, push code or take any production action",
    "commit to main, or push any branch"
  ],
  "next_reviewer": "MapleMoon root Boss, then Nate",
  "requires_visual_evidence": false
}
<!-- CONTROL-PLANE:END -->

## Result

**EXECUTED.** The update landed. Shopify's admin update route did not update in
place: it created a third theme, `160142491845` `Updated copy of Ethereal`, role
unpublished, carrying Etheryx 1.6.0. Both original themes are untouched and both
are still 1.4.0.

The source of the copy is **UNDETERMINED from bytes**, because the two candidate
sources are byte-identical to each other.

Shopify's warning banner, "Theme added: code edits could not be included", has
**nothing behind it on this store**. The 1.4.0 tree contains no code customisation
to lose. Full evidence in the review report.
