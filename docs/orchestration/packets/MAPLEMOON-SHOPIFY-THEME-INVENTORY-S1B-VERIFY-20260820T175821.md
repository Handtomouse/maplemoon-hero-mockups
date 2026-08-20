> ⛔ **SUPERSEDED 20 Aug 18:15 — do not launch.**
>
> SUPERSEDED by UFC/ops/handoffs/20260820_maplemoon_codex_packets/TASK1_S1B_VERIFY.md, which is better (it already has the 3 errors / 215 warnings vs 3 errors / 195 warnings split, and flags that theme-check-before.txt does not exist) and was launched as lane mm-s1b-verify-20260820-180118 at 18:01. DO NOT RUN THIS FILE.

# MapleMoon Shopify theme inventory verify — S1B-VERIFY — 2026-08-20 17:58 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-SHOPIFY-THEME-INVENTORY-S1B-VERIFY-20260820T175821",
  "replaces_stale_premise_in": "MAPLEMOON-SHOPIFY-THEME-UPDATE-S1B-20260819T112058",
  "worker_thread_id": "/root",
  "state": "ready",
  "objective": "Re-establish the store's theme inventory from live bytes. On 19 Aug the store held three themes; it now reports FOUR. Identify the fourth theme, establish its source from bytes, prove the live theme and the sealed S1 duplicate still have not moved, and re-run both gates to explain the theme-check warning count moving from 195 to 215. Read-only. This packet does NOT re-run the Etheryx update: 1.6.0 already exists as theme 160142491845, applied 19 Aug.",
  "authority": "Read-only verification only. No new Shopify authority is granted or implied by this packet. The 19 Aug update authorisation is spent and must not be re-used.",
  "base": {
    "store": "maplemooncarob.myshopify.com",
    "expected_theme_count": "UNKNOWN - establish from CLI, do not assume",
    "known_theme_ids_as_of_19aug": {
      "154500595909": "Ethereal, role live, Etheryx 1.4.0, 246 files, 2,866,869 bytes",
      "160076628165": "MapleMoon Private Review 20260817 S1, role unpublished, 1.4.0, 246 files, 2,866,869 bytes",
      "160142491845": "Updated copy of Ethereal, role unpublished, Etheryx 1.6.0, 270 files, 3,046,532 bytes, created 19 Aug"
    },
    "fourth_theme": "UNKNOWN - this packet exists to identify it",
    "sealed_1_4_0_gate_directory_sha256": "e48a21dc289c2534aaf06711e1e4b653a7b4b54ce7a11406f8d78027a147ccc4",
    "sealed_1_4_0_relative_tree_sha256": "6f94b20a498fa0db7d3d4f602a04a783809689e75f95dbf234f802e8ec9c5dee",
    "sealed_1_6_0_gate_directory_sha256": "a8aa2c2d8eb252d83bc700a8ec0567300a910f1571fe9f26208cde9ba23c3b1d",
    "sealed_1_6_0_relative_tree_sha256": "4f281bb3683fd58750db478490ac2b13a90b0b06ee583565386ebad097476179",
    "theme_check_warnings_recorded": {"before": 195, "after": 215, "delta": 20, "errors_split": "NOT RECORDED - must be split this run"}
  },
  "readable_paths": [
    "/Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-SHOPIFY-THEME-UPDATE-S1B-20260819T112058.md",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/MAPLEMOON-SHOPIFY-THEME-UPDATE-S1B-20260819T112058.md",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/reviews/MAPLEMOON-SHOPIFY-THEME-UPDATE-S1B-20260819T112058.json",
    "/Users/handtomouse/maplemoon-website/_wip/recovery/shopify_theme_safety_s1_20260817T210246",
    "/Users/handtomouse/maplemoon-website/_wip/recovery/shopify_theme_update_s1b_20260819T104947",
    "/Users/handtomouse/maplemoon-website/_wip/recovery/shopify_theme_update_s1b_20260819T112058",
    "/Users/handtomouse/maplemoon-website/docs/shopify/BACKLOG-ASSUMPTIONS-QUESTIONS-20260820.md"
  ],
  "writable_paths": [
    "maplemoon-website/_wip/evidence/shopify_theme_inventory_verify_20260820T175821",
    "maplemoon-website/_wip/recovery/shopify_theme_inventory_verify_20260820T175821",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-SHOPIFY-THEME-INVENTORY-S1B-VERIFY-20260820T175821.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-SHOPIFY-THEME-INVENTORY-S1B-VERIFY-20260820T175821.json"
  ],
  "authorized_external_side_effect": "None. Read-only against Shopify. The only Shopify calls permitted are 'shopify theme list', 'shopify theme info' and 'shopify theme pull --nodelete', plus anonymous curl of the public storefront.",
  "method": [
    "run 'shopify theme list --json' and record EVERY theme's id, name, role, processing state and updated_at from the CLI, not from the admin label; the count is a finding, not an assumption",
    "for any theme reporting processing true, poll until false and do not pull it while processing",
    "re-pull 154500595909 and 160076628165 fresh and prove both are still byte-identical to their sealed recoveries with 'diff -qr', BEFORE touching any other theme",
    "re-pull 160142491845 and prove it is still byte-identical to its sealed 19 Aug recovery",
    "pull each previously-unknown theme and record file count, byte total, gate directory digest and relative tree SHA-256",
    "establish each unknown theme's source by comparing its bytes against every known candidate tree; report UNDETERMINED rather than inferring from the theme name",
    "read theme_version from each theme's own config/settings_schema.json in the pulled bytes, never from the admin",
    "for each unknown theme, determine its creation vector if the bytes support it: a Shopify update copy, a manual duplicate, an app install, or a fresh vendor install; report UNDETERMINED if the bytes do not decide it",
    "prove the storefront is still password gated by anonymous curl, and prove every theme preview URL also lands on /password",
    "re-run strict JSON validation and Shopify Theme Check against the 1.6.0 tree; report the FULL number split into errors and warnings separately, per-check deltas, and file locations - never an exit code alone",
    "attribute the 195 to 215 warning delta to specific checks and specific files; if the delta is wholly explained by the 24 files added between 1.4.0 and 1.6.0, say so explicitly",
    "write human report, maplemoon-receipt/v2 receipt and a recovery tree holding the current after state only, then stop"
  ],
  "verify": [
    "the theme count reported is taken from 'shopify theme list --json' output quoted verbatim in the report",
    "154500595909 is role live, 246 files, 2,866,869 bytes, diff -qr exit 0 against its sealed recovery",
    "160076628165 is role unpublished, 246 files, 2,866,869 bytes, diff -qr exit 0 against its sealed recovery",
    "160142491845 is role unpublished, 270 files, 3,046,532 bytes, diff -qr exit 0 against its sealed recovery, and reports theme_version 1.6.0 from its own bytes",
    "every theme not in the three known ids has its id, name, role, byte count, tree digest and version reported",
    "theme-check output is reported as errors AND warnings separately, with the 20-warning delta attributed to named checks",
    "storefront final_url ends /password with http 200",
    "every gate that cannot be run is reported as not run, with its reason and its instrument"
  ],
  "stop": [
    "154500595909 is not role live, or is not byte-identical to its sealed recovery",
    "160076628165 or 160142491845 is not byte-identical to its sealed recovery",
    "any theme other than the three known ids holds role live",
    "the storefront no longer returns the password page",
    "theme-check reports an ERROR against the 1.6.0 tree that is NOT also present in the 1.4.0 baseline; a pre-existing error is a reported finding, not a stop, because halting on it would abort the warning-delta analysis this packet exists to produce",
    "a theme is found that was created by an app install, which would mean an app is on the store and Gate 0 has been crossed without a record"
  ],
  "forbidden_actions": [
    "re-run, re-apply or re-trigger the Etheryx theme update in any form; 1.6.0 already exists as 160142491845",
    "publish, promote or preview-publish any theme; delete any theme, including any newly discovered one",
    "edit any theme's files, on any theme, for any reason",
    "remove storefront password protection, activate payments, transfer ownership, change domain or DNS",
    "import or modify any product, collection or metaobject; install any app",
    "begin the MapleMoon theme port, push code or take any production action",
    "commit to main, or push any branch"
  ],
  "next_reviewer": "MapleMoon root Boss, then Nate",
  "requires_visual_evidence": false
}
<!-- CONTROL-PLANE:END -->

## Why this packet replaces the planned Task 1

The originally-planned Task 1 was "apply the Etheryx theme update". **That premise is stale.**
Nate applied the official 1.6.0 update himself in the Shopify admin on 19 Aug. It created
theme `160142491845`, role unpublished, carrying Etheryx 1.6.0. Re-running it would create a
fifth theme and destroy the inventory question this packet exists to answer.

Two things changed since the 19 Aug packet closed and neither is explained:

1. **The store now reports FOUR themes, not three.** Nobody recorded creating a fourth.
2. **Theme Check went from 195 to 215 warnings**, and the 19 Aug run did not split errors
   from warnings, so "215" currently has no disposition attached to it.

This lane answers both from bytes and stops. It changes nothing.

## Handoff

    Goal:        Establish the true theme inventory from live bytes, identify the unrecorded
                 fourth theme, prove the three known themes have not moved, and attribute the
                 +20 theme-check warning delta to named checks and files.
    Inputs:      /Users/handtomouse/maplemoon-website (branch docs/registry-authority-20260819)
                 readable_paths above, all absolute
    Steps:       the numbered `method` array in the control plane, in order
    Verify:      every item in the `verify` array; the load-bearing one is
                 `diff -qr` exit 0 for 154500595909 against its sealed recovery
    Output:      a report of 10 lines or fewer: theme count, the fourth theme's id/name/role/
                 version/source, the three diff -qr results, the errors/warnings split, and
                 the warning-delta attribution
    Do not touch: everything in `forbidden_actions`; especially do not re-run the theme update
    Checkpoint:  at ~250 turns or ~40% context, write state and continue in a fresh session

**Launch needs `--network`** (Shopify CLI and storefront curl):

    ~/bin/codex_lane.sh maplemoon-theme-inventory-verify \
      /Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-SHOPIFY-THEME-INVENTORY-S1B-VERIFY-20260820T175821.md \
      -C /Users/handtomouse/maplemoon-website --network
