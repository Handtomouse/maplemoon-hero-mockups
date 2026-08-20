> ⛔ **SUPERSEDED 20 Aug 18:15 — do not launch.**
>
> SUPERSEDED by .../TASK3_UNIFIED_SOURCE_AND_FIGMA.md. This file's only unique content, the routes.v1.json authority conflict and the do-not-re-baseline constraint, has been grafted into that packet as an addendum. That packet also carries Part B, the Figma contract scope, which this file lacks. DO NOT RUN THIS FILE.

# MapleMoon registry re-baseline — DRY RUN, prepare and stop — 2026-08-20 17:58 AEST

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-REGISTRY-REBASELINE-DRYRUN-20260820T175821",
  "worker_thread_id": "/root",
  "state": "ready",
  "objective": "Compute exactly what a registry re-baseline WOULD pin, write it to a staging file, and stop without pinning anything. Also repair the second unresolved checker. The 19 Aug ruling forbids re-baselining until the _wip/shop.WIP.html Eclipse Bites change is ratified, and that ratification is Q11, owner Nate, still open.",
  "authority": "Local repo only. Prepare-and-stop. This packet explicitly does NOT carry authority to pin, freeze or commit any baseline.",
  "base": {
    "authoritative_registry": "docs/orchestration/LOCK_MANIFEST.json",
    "non_authoritative_registry": "docs/design-system/contracts/routes.v1.json",
    "ruling_source": "docs/orchestration/REGISTRY_AUTHORITY_20260819.md, ruled 19 Aug 2026",
    "why_routes_is_not_authoritative": "all six design-system contracts share ONE commit whose message describes them as unclaimed Codex output that had not been triaged; LOCK_MANIFEST has six commits tracking real lane acquire and release gates",
    "routes_red_before_any_edit": {"expected": "5a49926e", "live": "6beef3f9", "routes_affected": 6},
    "blocking_checker": "scripts/check-maplemoon-design-system.mjs",
    "blocking_mechanism": "line 350 pushes 'frozen baseline hash drifted' into holds; line 393 exits 2 when holds is non-empty - a real block reported as HOLD, which is why it has been waved past",
    "second_unresolved_checker": "scripts/validate-maplemoon-control-plane.py",
    "second_checker_state": "exited 1 before any edit was made; unchanged since 31 Jul; the 19 Aug ruling settled which registry is AUTHORITATIVE, not which is HEALTHY",
    "unratified_change": "_wip/shop.WIP.html - the 19 Aug 'Bites & Eclipses' to 'Eclipse Bites' change",
    "unratified_change_location": "NO LONGER A WORKING-TREE MODIFICATION - committed 20 Aug 17:10 as ee98dbd 'feat(design-system): wire shop to shared chrome as the rollout proof'; the working tree is now CLEAN",
    "premise_correction": "the 19 Aug ruling says 'the working tree carries exactly one modification, _wip/shop.WIP.html'. That is stale as of 20 Aug 17:10. Being committed is NOT being ratified: the prohibition still stands, only its location moved from the working tree into git history.",
    "ratification_status": "NOT RATIFIED - this is Q11, owner Nate, open as of 20 Aug",
    "branch": "docs/registry-authority-20260819"
  },
  "readable_paths": [
    "/Users/handtomouse/maplemoon-website/docs/orchestration/REGISTRY_AUTHORITY_20260819.md",
    "/Users/handtomouse/maplemoon-website/docs/orchestration/LOCK_MANIFEST.json",
    "/Users/handtomouse/maplemoon-website/docs/design-system/contracts/",
    "/Users/handtomouse/maplemoon-website/scripts/check-maplemoon-design-system.mjs",
    "/Users/handtomouse/maplemoon-website/scripts/validate-maplemoon-control-plane.py",
    "/Users/handtomouse/maplemoon-website/docs/shopify/BACKLOG-ASSUMPTIONS-QUESTIONS-20260820.md"
  ],
  "writable_paths": [
    "maplemoon-website/_wip/evidence/registry_rebaseline_dryrun_20260820T175821",
    "maplemoon-website/docs/orchestration/staging/REBASELINE-WOULD-PIN-20260820T175821.json",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-REGISTRY-REBASELINE-DRYRUN-20260820T175821.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-REGISTRY-REBASELINE-DRYRUN-20260820T175821.json"
  ],
  "authorized_external_side_effect": "None. Local repo reads and staging-file writes only. No network required.",
  "method": [
    "read the 19 Aug ruling first and quote its re-baseline prohibition verbatim into the report, so the constraint is on the record before any computation",
    "run both checkers as they stand and record their exact exit codes and full output; never report an exit code alone",
    "for check-maplemoon-design-system.mjs, enumerate every route whose frozen baseline hash has drifted, with expected hash, live hash, and the file each hash is computed over",
    "compute what a re-baseline WOULD pin for each of the six design-system contracts, as a complete before/after hash table",
    "write that table to docs/orchestration/staging/REBASELINE-WOULD-PIN-20260820T175821.json as a STAGING file that no checker reads and no tool consumes",
    "state for each contract whether its drift is explained by the unratified _wip/shop.WIP.html change, by legitimate site movement since 13 Aug, or is UNEXPLAINED",
    "separately diagnose validate-maplemoon-control-plane.py: why it exits 1, whether the cause predates 31 Jul, and whether the fix is a code repair or a data repair",
    "propose the repair for the second checker as a diff in the report; do NOT apply it",
    "state explicitly in the report that nothing was pinned and why: Q11 is unresolved and pinning now would convert a meaningless red into a confident wrong green",
    "write a maplemoon-receipt/v2 receipt and stop"
  ],
  "verify": [
    "the 19 Aug prohibition is quoted verbatim in the report",
    "both checkers' exit codes AND full output are recorded",
    "all six design-system contracts appear in the would-pin table with before and after hashes",
    "the staging file exists at the stated path and is valid JSON",
    "'git status --porcelain' shows NO modification to LOCK_MANIFEST.json, to any file under docs/design-system/contracts/, or to either checker script",
    "the report contains an explicit statement that nothing was pinned, naming Q11",
    "every drift is classified as explained-by-WIP, explained-by-movement, or UNEXPLAINED, with none left unclassified",
    "every gate that cannot be run is reported as not run, with its reason and its instrument"
  ],
  "stop": [
    "Q11 appears to have been resolved, which changes the authority for this packet and requires a fresh ruling from Nate before proceeding",
    "the working tree is dirty at all; as of 20 Aug 17:10 it is clean and the Eclipse Bites change lives in commit ee98dbd, so any modification means something moved after this packet was written",
    "commit ee98dbd is absent from the branch, which would mean the drift has a different cause and the analysis premise is wrong",
    "LOCK_MANIFEST.json is found already modified in the working tree",
    "any checker cannot be run at all, in which case report it as not run with its reason rather than inferring its result"
  ],
  "forbidden_actions": [
    "pin, freeze, re-baseline or update any baseline_sha256 value in any contract or manifest",
    "modify docs/orchestration/LOCK_MANIFEST.json in any way",
    "modify any file under docs/design-system/contracts/",
    "modify either checker script; propose the repair as a diff in the report instead",
    "ratify, approve or act as if ratified the _wip/shop.WIP.html Eclipse Bites change",
    "modify _wip/shop.WIP.html, or touch anything under _wip/recovery/ which the theme lane owns",
    "commit to main, or push any branch"
  ],
  "next_reviewer": "MapleMoon root Boss, then Nate",
  "requires_visual_evidence": false
}
<!-- CONTROL-PLANE:END -->

## Why this is a dry run and not the repair

Re-baselining is the obvious fix and the 19 Aug ruling says it is **currently unsafe.** Quoting it:

> Freezing new baselines now would bake an unreviewed edit in as the reference, converting a
> meaningless red into a confident wrong green, which is worse.

The unreviewed edit is `_wip/shop.WIP.html`, the 19 Aug `Bites & Eclipses` → `Eclipse Bites`
change. **One correction to the 19 Aug ruling's premise:** it describes that edit as an
uncommitted working-tree modification. As of 20 Aug 17:10 it is committed, as `ee98dbd`
*"feat(design-system): wire shop to shared chrome as the rollout proof"*, and the tree is clean.
**Being committed is not being ratified.** The prohibition is unchanged; only the edit's location
moved. Ratifying it is **Q11, owner Nate, still open.** So this lane computes the whole answer,
parks it in a staging file nothing reads, and stops. When Nate ratifies, the pin becomes one
deliberate commit that says what it is pinning and why — and that commit is not this lane's to make.

The lane also picks up the loose end the ruling flagged: `validate-maplemoon-control-plane.py`
exited 1 before any edit and has not changed since 31 Jul. The 19 Aug ruling settled which
registry is **authoritative**, not which one is **healthy**.

## ⚠ Half of the originally-planned Task 3 is missing

The prior session's Task 3 was recorded as "pin authoritative source **+ Figma contract**".
The "pin authoritative source" half is specified above. **The "Figma contract" half has no basis
anywhere**: a grep for `figma` across `docs/`, `MASTER_PACKET_REGISTER.md` and
`LANE_MAPLEMOON_20260819.md` returns zero hits. The only Figma artifact on the machine is an
Apr 30 UFC sprint folder, `UFC/clients/maplemoon/deliverables/figma_sprint_apr30/`, which
predates all of this work.

Rather than invent a contract, that half is left out and referred to Nate. **This packet is
complete and runnable as written** without it.

## Handoff

    Goal:        Compute what a registry re-baseline would pin, write it to a staging file,
                 diagnose the second checker, and stop without pinning anything.
    Inputs:      the readable_paths array above, all absolute
    Steps:       the numbered `method` array in the control plane, in order
    Verify:      every item in the `verify` array; the load-bearing one is that
                 `git status --porcelain` shows no modification to LOCK_MANIFEST.json,
                 to docs/design-system/contracts/, or to either checker
    Output:      a report of 10 lines or fewer: both checker exit codes, count of drifted
                 routes, the three drift classifications with counts, the staging file path,
                 the second checker's root cause, and one line confirming nothing was pinned
    Do not touch: everything in `forbidden_actions`; above all, do not pin anything
    Checkpoint:  at ~250 turns or ~40% context, write state and continue in a fresh session

**No `--network` needed** — this lane is local repo only:

    ~/bin/codex_lane.sh maplemoon-registry-rebaseline-dryrun \
      /Users/handtomouse/maplemoon-website/docs/orchestration/packets/MAPLEMOON-REGISTRY-REBASELINE-DRYRUN-20260820T175821.md \
      -C /Users/handtomouse/maplemoon-website
