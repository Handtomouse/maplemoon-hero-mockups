# SAT-HOME-CLEAN-CLOSURE-01 candidate — preservation record

**Written:** 2026-08-02, Claude Code side chat, read-only against Codex's build.
**Why:** The candidate lived only in `/tmp/mm-home-clean-a.8aq6pb` and `/tmp/mm-home-clean-b.DqX8y7`.
At the time of writing the machine had swap 97.7% exhausted (34.0 GB of 34.8 GB) on 16 GB of RAM,
so an unplanned restart was plausible. `/tmp` does not survive a reboot, and the candidate was
**not promoted** — losing it would have forced a full rebuild and re-checkpoint.

**Nothing in `/tmp` was modified.** This is a copy-out only.

## What the candidate actually is

Codex's `SAT-HOME-CLEAN-CLOSURE-01` receipt is **HOLD** — 7 of 9 checks PASS. The two HOLDs are
the same item: the live sequential keyboard/focus proof, which failed because Chrome automation
became unavailable. Everything deterministic passed.

## The delta is only four files

Independently confirmed with `diff -rq` against promoted `staging-v1`, matching Codex's own claim:

| file | status |
|---|---|
| `MANIFEST.json` | differs (aggregate) |
| `clean/MANIFEST.json` | differs |
| `annotated/MANIFEST.json` | differs |
| `clean/homepage.html` | differs — `b914be8ceda74ef8…` |
| `annotated/homepage.html` | **unchanged** |
| all other 149 files | **unchanged** |

Candidate A and B verified byte-identical (`diff -qr`), so preserving A alone is sufficient.

Content of the change is claim-safety copy, not structure — e.g. `<title>` goes from
"Maple Moon: Australian Organic Carob" to "Maple Moon Carob", and the meta description drops the
"Australian organic carob … far north coast of NSW" claim. Same edit class as
`SAT-HOME-01-HOMEPAGE-CLAIM-SAFE-FREEZE`.

## Reconstructing the full candidate

The 150 unchanged files are byte-identical to promoted `staging-v1`. So:

```sh
# 1. copy promoted staging as the base
cp -R docs/client-review/2026-08-01-saturday-review/staging-v1/. /tmp/rebuilt-candidate/

# 2. overlay the four preserved delta files
cp -R _wip/evidence/CLAUDE-KEYBOARD-PROOF-20260802/candidate-preservation/delta/. /tmp/rebuilt-candidate/

# 3. verify every one of the 154 files against the recorded manifest
cd /tmp/rebuilt-candidate && shasum -a 256 -c <(
  awk '{print $1"  ./"$2}' \
  /Users/handtomouse/maplemoon-website/_wip/evidence/CLAUDE-KEYBOARD-PROOF-20260802/candidate-preservation/FULL-HASH-MANIFEST-candidate-A.txt
)
```

`FULL-HASH-MANIFEST-candidate-A.txt` holds sha256 for all 154 files, so a reconstruction can be
proven exact rather than assumed.

## Status and authority

This preserves evidence; it promotes nothing and authorises nothing. Main Boss remains the only
promotion authority. If Codex's own `/tmp` roots are still intact, prefer those — this is a
fallback, not a replacement.
