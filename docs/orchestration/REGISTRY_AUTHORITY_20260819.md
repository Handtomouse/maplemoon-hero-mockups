# Which registry is authoritative

**Ruled 19 Aug 2026. `docs/orchestration/LOCK_MANIFEST.json` is the control plane.**
`docs/design-system/contracts/routes.v1.json` is **not** authoritative and its HOLD state should
not be read as a real gate until it is deliberately re-baselined.

## Why this needed ruling

Two registries disagreed and both had a checker. Sessions were losing time deciding which red
mattered:

- `routes.v1.json` was RED on all six routes **before any edit was made**
  (expected `5a49926e`, live `6beef3f9`).
- `LOCK_MANIFEST.json` held different values and was green.

## The evidence, which is provenance rather than content

| | `docs/design-system/contracts/routes.v1.json` | `docs/orchestration/LOCK_MANIFEST.json` |
|---|---|---|
| mtime | 13 Aug 19:13 | 19 Aug 10:40 |
| commits touching it | **1** | **6** |
| last commit | `12848c1`, 19 Aug, *"baseline: protect unclaimed Codex output before triage"* | `eea629e`, 16 Aug, *"chore(maplemoon): close Lane E handoff gates"* |
| its checker | `scripts/check-maplemoon-design-system.mjs`, last touched by that same bulk sweep | `scripts/validate-maplemoon-control-plane.py`, last real change 31 Jul |

All six design-system contracts (`routes`, `components`, `tokens`, `exceptions`, `images`,
`responsive`) share that single commit, and its message describes them as **unclaimed Codex output
that had not been triaged**. They were never maintained through the lane work; they were swept
into git for safekeeping. `LOCK_MANIFEST` has six commits tracking real lane acquire and release
gates.

That also explains the symptom rather than just recording it. `routes.v1.json` was red before
anyone touched anything because its `baseline_sha256` values froze on 13 Aug while the site moved
on. A tripwire that fires before you enter the room is not measuring intrusion.

## Mechanism, for whoever picks this up

`check-maplemoon-design-system.mjs:350` pushes `frozen baseline hash drifted` into `holds`, and
line 393 exits **2** when `holds` is non-empty. So this is a real block, not a warning. It reports
as HOLD rather than FAIL, which is why it has been easy to wave past.

## Why this was NOT fixed by re-baselining today

Re-baselining is the obvious repair and it is currently unsafe. At the time of writing the working
tree carries exactly one modification, `_wip/shop.WIP.html`, which is the 19 Aug
`Bites & Eclipses` to `Eclipse Bites` change. That edit has **not been re-pinned or ratified**.
Freezing new baselines now would bake an unreviewed edit in as the reference, converting a
meaningless red into a confident wrong green, which is worse.

**Re-baseline only after the WIP shop change is ratified**, and do it as its own deliberate commit
that says what it is pinning and why.

## Also unresolved, do not read this note as an all-clear

`validate-maplemoon-control-plane.py` also exited 1 before any edit, and it has not changed since
31 Jul. This ruling settles which registry is **authoritative**, not which one is **healthy**.
Both checkers still need a look.
