# CODEX REQUEST — 2026-08-02
# Written by: macbook Claude Code (worker session, branch `codex-maplemoon-section-review`)
# Status: DRAFT for Nate. Not sent. Records no verdict, passes no gate, changes nothing.

Two unrelated asks. Both are decisions reserved to the coordinator lane; neither was actioned
here. Everything below was verified in this session — commands are given so you can reproduce
rather than trust.

---

## ASK 1 — the deterministic QA gate is failing, and neither obvious fix clears it

### What I observed

`npm run review:saturday:check` against the frozen package:

```
Summary: 26 failure(s), 0 warning(s)
```

Decomposition of the 26, counted from the actual output:

| Count | Failure class |
|---|---|
| 22 | homepage.html copy/token expectations (title, hero eyebrow, product descriptions, carob/story/sampler wording) |
| 1 | `complete-document parity mismatch: homepage.html` |
| 1 | `aggregate MANIFEST.json contract mismatch` |
| 2 | `MANIFEST.json packet ID mismatch: expected SAT-HOME-CLEAN-CLOSURE-01` |

(23 of the 26 lines mention `homepage.html`; 22 of those are copy expectations and 1 is the
parity failure, which is a different kind of thing. 3 are MANIFEST-level.)

### Why it is failing

`scripts/check-maplemoon-review.py` carries **157 insertions / 1 deletion uncommitted**
(`git diff --numstat`) and pins at line 24:

```python
SATURDAY_PACKET_ID = "SAT-HOME-CLEAN-CLOSURE-01"
```

Those 157 lines encode the *expected post-rebuild* clean homepage. **That rebuild is not
happening** — Nate has ruled to retain all clean homepage copy and cut nothing
(`_wip/evidence/CLOSURE-DECISION-20260802.md`). So the checker is asserting a contract against
an artifact that will never satisfy it.

### The headline: NEITHER pin matches the artifact

Before anything else, this is the fact that decides option 1.

All three staging manifests carry the same packet ID, and **no version of the checker pins it**:

```
docs/client-review/.../staging-v1/MANIFEST.json           "packet_id": "SAT-SHARED-MOBILE-HEADER-01"
docs/client-review/.../staging-v1/clean/MANIFEST.json     "packet_id": "SAT-SHARED-MOBILE-HEADER-01"
docs/client-review/.../staging-v1/annotated/MANIFEST.json "packet_id": "SAT-SHARED-MOBILE-HEADER-01"
```

| | pins | matches artifact? |
|---|---|---|
| working tree | `SAT-HOME-CLEAN-CLOSURE-01` | no |
| HEAD | `VIS-03C-03-CURRENT-WIP-SOURCE-LINEAGE` | no |
| artifact | `SAT-SHARED-MOBILE-HEADER-01` | — |

So **a revert does not clear the packet-ID failures.** Only re-pinning to
`SAT-SHARED-MOBILE-HEADER-01` does.

For what it's worth, that packet looks like the right target:
`docs/orchestration/reviews/SAT-SHARED-MOBILE-HEADER-01-20260802.json` records
`"outcome": "PASS"`, `"confidence": "high"`, completed `2026-08-02T05:42:28Z`. But confirming
that it is the correct lineage anchor for this package is your call, not mine.

### Reverting to HEAD does not produce a green gate either

I reconstructed the committed state and ran it:

```
Summary: 6 failure(s), 0 warning(s)
  FAIL aggregate MANIFEST.json contract mismatch
  FAIL MANIFEST.json packet ID mismatch: expected VIS-03C-03-CURRENT-WIP-SOURCE-LINEAGE
  FAIL MANIFEST.json current-source lineage mismatch
  FAIL MANIFEST.json packet ID mismatch: expected VIS-03C-03-CURRENT-WIP-SOURCE-LINEAGE
  FAIL MANIFEST.json current-source lineage mismatch
  FAIL complete-document parity mismatch: homepage.html
```

Full accounting, so the arithmetic is explicit:

| | |
|---|---|
| current failures | **26** |
| cleared by a revert (the 22 closure copy expectations) | −22 |
| surviving a revert (aggregate contract, homepage parity, 2× packet-ID) | 4 |
| **introduced** by a revert (2× `current-source lineage mismatch`) | +2 |
| **net after a revert** | **6** |

A revert therefore takes the gate from 26 red to 6 red. It does not take it to green, and it
adds a failure class that does not exist today.

**So the decision is three-part, not the two-way choice I was briefed to put to you:**

1. **The pin.** Revert, or re-pin to `SAT-SHARED-MOBILE-HEADER-01`.
2. **The closure copy expectations.** The 22 assertions describing a rebuild that is not
   happening — drop, or park behind a profile flag.
3. **The two residual failures** (`aggregate MANIFEST.json contract mismatch`,
   `complete-document parity mismatch: homepage.html`) which **neither option resolves.**

### A third checker state exists, and I could not find it

`docs/orchestration/packets/SAT-HOME-CLEAN-CLOSURE-01.md` records its base as:

```
scripts/check-maplemoon-review.py       aa66c7f0398b4dbbae95fb2603442e29a82f4e2b79fe5d646a2f42dd06e7a16b
scripts/build-maplemoon-saturday-review.py  be084959cd6d771d8505a8dd3cba96533a42864b71a3ab749d4eb4b3e40cafbd
```

Neither hash matches anything I can locate:

| | check-maplemoon-review.py | build-maplemoon-saturday-review.py |
|---|---|---|
| packet base record | `aa66c7f0…` | `be084959…` |
| working tree now | `90fc9e7a…` | `0d4ee20d…` |
| HEAD blob (see note) | `ece602a1…` | `360a17a1…` |

HEAD was `cc8c08b` when I ran this. Both scripts were last committed at `a32e5dc`, and I
confirmed the `a32e5dc` blobs are byte-identical to the HEAD blobs above.
| iMac replica | `ece602a1…` (= HEAD) | `360a17a1…` (= HEAD) |

So the "pre-closure contract" the packet started from was **already uncommitted working-tree
state**, and I cannot see a copy of it anywhere. "Revert to the pre-closure contract" may not
be an available action in the literal sense — the only recoverable prior state is HEAD, which
is a different thing. If you know where `aa66c7f0…` lives, that changes option 1; if it does
not exist anywhere, please say so, because it means the packet's base record is unrecoverable.

### One thing I am NOT confident about — please treat as open

The framing "this is a checker problem, not an artifact problem" is **only partly supportable
and I want to be honest about the limit.**

Supportable: the artifact is unchanged and hash-verified against the packet's own base record.

```
clean/MANIFEST.json      d1c66b1d5937e9956d1806dbbbff4faf4f950def046aa642ae52f809c3d52d20  ✓
annotated/MANIFEST.json  3be3c0f2df4658558c667b3e9cc6d55966d6a1d7ce9fa9874c46a0afc44244c7  ✓
```

Not supportable: `complete-document parity mismatch: homepage.html` compares
`clean/homepage.html` against `annotated/homepage.html` after canonicalisation — **both files
are inside the artifact.** I cannot tell whether that failure is a canonicalisation-rule
problem or a genuine clean/annotated divergence, because the canonicalisation rules live
inside the 157 uncommitted lines. Matching hashes prove the artifact has not drifted; they do
not prove it is internally consistent. **This needs someone in the checker lane to look, and
it is the failure I would be least comfortable shipping past.**

### Reproduction

Working tree:

```sh
npm run review:saturday:check
```

HEAD reconstruction (I ran it out-of-tree to avoid writing into `scripts/`, which is not my
lane — please confirm in place rather than relying on my reconstruction):

```sh
mkdir -p /tmp/mmhead/scripts
git show 'HEAD:scripts/check-maplemoon-review.py'          > /tmp/mmhead/scripts/check-maplemoon-review.py
git show 'HEAD:scripts/build-maplemoon-saturday-review.py' > /tmp/mmhead/scripts/build-maplemoon-saturday-review.py
ln -sfn "$PWD/docs" /tmp/mmhead/docs
ln -sfn "$PWD/_wip" /tmp/mmhead/_wip
python3 /tmp/mmhead/scripts/check-maplemoon-review.py \
  --staging "$PWD/docs/client-review/2026-08-01-saturday-review/staging-v1" \
  --profile saturday-all
```

### What I did not do

Nothing was written to `scripts/`, `docs/orchestration/`, `staging-v1/`, `.gitignore` or
`LOCK_MANIFEST.json`. This session wrote only inside `_wip/evidence/`.

### The point

A failing deterministic QA gate should not ride along into a client send. The artifact is
intact; the gate is not, and it is not one edit away from being intact. Please rule on all
three parts.

### And: what happens to the packet itself

`SAT-HOME-CLEAN-CLOSURE-01` now has no remaining scope, because nothing is being cut.

- `docs/orchestration/reviews/SAT-HOME-CLEAN-CLOSURE-01-20260802.json` records
  `"outcome": "HOLD"`.
- `docs/orchestration/packets/SAT-HOME-CLEAN-CLOSURE-01.md` still records `"state": "ready"`.

I am **not** claiming those contradict each other. `SAT-SHARED-MOBILE-HEADER-01.md` also
records `"state": "ready"` while its receipt records `"outcome": "PASS"`, so `state` looks like
it means "admitted", not "outcome". I flag it only because from outside the control plane it is
not obvious which field a reader should trust, and this packet is the one that now has no
scope.

Please rule on whether the packet is withdrawn, re-scoped, or closed against the HOLD. Whatever
you decide, the checker changes above are downstream of it.

---

## ASK 2 — please raise a packet to make the ship artifact recoverable

### The problem

The artifact this entire project exists to send has **no committed copy.**

```sh
$ git ls-files docs/client-review/2026-08-01-saturday-review/staging-v1/ | wc -l
0

$ git check-ignore -v docs/client-review/2026-08-01-saturday-review/staging-v1/clean/MANIFEST.json
.gitignore:34:docs/client-review/*/staging-v1/	docs/client-review/.../clean/MANIFEST.json
```

`.gitignore:34` sits under a heading reading "section-review stabilisation (30 Jul):
regenerable review/render output". The premise there was that this output is regenerable.
For the frozen package that premise no longer holds: it is the deliverable, its integrity
evidence is a SHA match and nothing else, and a stash, a clean checkout or a disk event
loses it silently with no git-side recovery.

### One implementation note, so the packet is actionable

The fix is **not** a one-line `!` negation. Git will not re-include a file whose parent
directory is excluded, and line 34 excludes a directory. I confirmed this empirically in a
throwaway repo at `/tmp/gitest`: adding `!docs/client-review/*/staging-v1/**` beneath the
existing rule left the file untracked.

Two forms that did work in that test, offered only so the packet has something concrete to
evaluate — the choice is yours:

1. **Restructure the rule** so the directory itself is not excluded:
   ```
   docs/client-review/*/staging-v1/**
   !docs/client-review/*/staging-v1/**/
   !docs/client-review/*/staging-v1/**/*.html
   !docs/client-review/*/staging-v1/**/MANIFEST.json
   ```
2. **Leave `.gitignore` untouched and use `git add -f`** on the specific frozen paths. This
   also worked. It avoids changing shared configuration, at the cost of the protection not
   being automatic for future packages.

### Why this is coming to you rather than being done

Changing `.gitignore` is a deliberate shared-configuration decision, and force-adding a frozen
artifact touches `staging-v1/`, which `CLAUDE.md` marks as writable by **neither** agent
without an admitted packet. Nate's explicit choice was to request a packet rather than have a
worker do it unilaterally.

### The one existing replica

There is a single accidental second copy, on the iMac, and I verified it is currently intact:

```
/Volumes/handtomouse/maplemoon-website/docs/client-review/2026-08-01-saturday-review/staging-v1/
  clean/MANIFEST.json      d1c66b1d…  ✓ matches
  annotated/MANIFEST.json  3be3c0f2…  ✓ matches
  clean/  — 13 entries
```

It is an rsync side effect, not a backup: same-house, same-person, no versioning, and it
already drifted on the script files (it carries HEAD's `check-maplemoon-review.py`, not the
working tree's). It should not be counted as recovery.
