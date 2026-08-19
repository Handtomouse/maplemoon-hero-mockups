# MapleMoon Phase 0, shared foundation, 2026-08-07

Admitted by `docs/orchestration/packets/MAPLEMOON-CLAUDE-BOSS-ACCEPTANCE-20260807.md`.

Worker: `019fd776-fb3f-7fc1-aa88-187fabb5971a`. Verify this ID before starting. If it does
not match your thread, stop and report rather than proceeding.

## 1. Goal

Build the shared design-contract foundation and its fail-loud drift checker as **new files
only**. This phase edits no existing file, so the six admitted WIP sources stay byte-frozen
and become the reference baseline that Phase 1 is measured against.

Every value in the contract must be extracted from measured current state. Invent nothing.
If a value cannot be sourced from the inputs in section 2, record it in `unknowns` in the
receipt and leave it out. An unsourced value is a defect, not a default.

Why the split: the investigation board proposed creating this scaffold and editing all six
WIP sources in one packet. A baseline cannot be declared immutable and mutated in the same
phase. Chrome, landmark, control-type and metadata repairs are Phase 1, and they run with
this phase's checker already in place to prove no regression.

## 2. Exact input paths, read only

In the repository:

- `_wip/homepage_real_1_lead_photo.WIP.html`
- `_wip/shop.WIP.html`
- `_wip/our-story.WIP.html`
- `_wip/carob-story.WIP.html`
- `_wip/stockists.WIP.html`
- `_wip/faq.WIP.html`
- `AGENTS.md`
- `docs/orchestration/SIDECHAT_RECEIPT_GATE.md`
- `docs/orchestration/packets/MAPLEMOON-CLAUDE-BOSS-ACCEPTANCE-20260807.md`

In the verified evidence bundle, root
`/Users/handtomouse/.codex/visualizations/2026/08/06/019fd776-fb3f-7fc1-aa88-187fabb5971a/maplemoon-investigation-20260807`:

- `maplemoon_design_system_architecture.md`
- `maplemoon_rendered_style_matrix.md`
- `maplemoon_current_style_conflicts.md`
- `maplemoon_style_contract_probe.md`
- `maplemoon_asset_media_integrity.md`

Confirm the bundle with `shasum -a 256 -c SHA256SUMS` before relying on it. It returned
129 OK and 0 failures at admission.

## 3. Exact writable paths

All thirteen source paths are absent from the repository today, which is what makes this
phase additive. Confirm each is absent before writing. The fourteenth is the receipt.

1. `assets/design-system/mm-tokens.css`
2. `assets/design-system/mm-base.css`
3. `assets/design-system/mm-primitives.css`
4. `assets/design-system/mm-chrome.css`
5. `assets/design-system/mm-chrome.js`
6. `docs/design-system/MAPLEMOON-DESIGN-SYSTEM-V1.md`
7. `docs/design-system/contracts/tokens.v1.json`
8. `docs/design-system/contracts/routes.v1.json`
9. `docs/design-system/contracts/components.v1.json`
10. `docs/design-system/contracts/responsive.v1.json`
11. `docs/design-system/contracts/images.v1.json`
12. `docs/design-system/contracts/exceptions.v1.json`
13. `scripts/check-maplemoon-design-system.mjs`
14. `docs/orchestration/reviews/MAPLEMOON-PHASE-0-SHARED-FOUNDATION-20260807-RECEIPT.json`

Nothing else may be created or modified.

## 4. Forbidden paths

The receipt gate enforces this harder than any list, because a changed path outside
`writable_paths` is a `FAIL`. The list below documents intent so a reader knows what was
deliberately protected.

- All six `_wip/*.WIP.html` sources. They are the frozen baseline.
- `package.json`. Wiring `npm test` is QA-05 and belongs to Phase 1, because editing an
  existing file would break the additive-only property of this phase.
- `_wip/styles/*.css`. Per-route CSS extraction is Phase 2.
- The 13 dirty files under `assets/product_shots/w1-e-prepared-20260803/`.
- All founder image bytes, ritual candidates and OG candidates.
- `_wip/deploy/site/`, `_wip/deploy/site-full/`, `_wip/evidence/`, `docs/client-review/`.
- `docs/orchestration/LOCK_MANIFEST.json` and every existing packet and review.
- All Vercel and Shopify state.

Never run in this repository: `git stash`, `git checkout --`, `git restore`,
`git reset --hard`, `git clean -fd`, `git clean -x`, `git add -A`, `git commit -a`, or any
repository-wide formatter. Each silently destroys uncommitted and untracked work.

## 5. Required recovery checkpoint, before the first write

Generate the timestamp at run time. The gate raises an error if the destination already
exists, and `_wip/checkpoints/` is a populated directory, so a fixed name risks collision.

```sh
CKPT="_wip/checkpoints/MAPLEMOON-PHASE-0-SHARED-FOUNDATION-20260807_$(date +%Y%m%d_%H%M%S)_AEST"

python3 -B scripts/check-maplemoon-receipt.py checkpoint \
  --packet docs/orchestration/packets/MAPLEMOON-PHASE-0-SHARED-FOUNDATION-20260807.md \
  --destination "$CKPT"

python3 -B scripts/check-maplemoon-receipt.py verify \
  --packet docs/orchestration/packets/MAPLEMOON-PHASE-0-SHARED-FOUNDATION-20260807.md \
  --checkpoint "$CKPT" \
  --phase start
```

All fourteen writable paths are absent, so the manifest will legitimately record every one
with `"state": "absent"`. That is the correct recovery record for an additive phase: it
proves what did not exist, so the phase can be reversed by deletion. Record `$CKPT` in the
receipt.

Do not write any file until `verify --phase start` prints PASS.

## 6. Implementation steps

1. Verify your thread ID matches section 0. Verify HEAD is
   `d70dad4f5d08fdd11742e60b16bbc0f2b905fbad` and the branch is
   `codex-maplemoon-section-review`. Verify the six source hashes match the acceptance
   packet. Any drift stops the phase.
2. Create the recovery checkpoint per section 5 and pass the start gate.
3. Record `pre_sha256` for all fourteen writable paths. Absent files are recorded as absent,
   not as a hash of nothing.
4. **Extract tokens.** From `maplemoon_rendered_style_matrix.md` and the six sources, collect
   the recurring computed values for colour, type scale, spacing, radius, border, shadow and
   motion duration. Write `assets/design-system/mm-tokens.css` as custom properties on
   `:root` and mirror it in `docs/design-system/contracts/tokens.v1.json` with, for each
   token, its value, the routes it was observed on, and the source of the measurement. A
   token that appears on only one route is a candidate exception, not a token.
5. **Write `mm-base.css`.** Element-level normalisation only: box sizing, media defaults,
   focus-visible baseline, and a `prefers-reduced-motion` base rule. No route-specific value.
6. **Write `mm-primitives.css`.** The small shared component set the sources already share,
   such as button, link, section wrapper and container width. Values come from tokens.
7. **Write `mm-chrome.css` and `mm-chrome.js`.** The shared header, navigation and mobile
   menu that Phase 1 will wire in. Design rulings for this are in section 7. The JS must be
   dependency free, must degrade without JS, and must expose a documented mount contract so
   Phase 1 wires it identically on all six routes. It must not be referenced by any WIP
   source in this phase.
8. **Write the remaining contracts.** `routes.v1.json` records the launch route matrix and
   which routes are real today versus required or deferred. `components.v1.json` records the
   shared component inventory. `responsive.v1.json` records the four tested widths, 320, 390,
   834 and 1440, and the breakpoints observed in the sources. `images.v1.json` records the
   image contract for referenced media. `exceptions.v1.json` registers intentional art
   direction per section 7.
9. **Write `scripts/check-maplemoon-design-system.mjs`.** Dependency-free Node. It must
   accept a `--contracts-only` flag, and that mode validates the contract files alone:
   schema validity, no duplicate tokens, no unregistered raw values, every registered
   exception resolvable. Route conformance, meaning whether the six sources actually consume
   the contract, must sit behind a separate flag that is **off** in Phase 0, because zero
   routes reference the contract yet and a conformance run would fail by design and break
   this packet's own verify command. Phase 1 switches it on. Fail closed: a zero-content
   result is a failure, never a pass.
10. **Write `docs/design-system/MAPLEMOON-DESIGN-SYSTEM-V1.md`.** Explain the layers, the
    exception policy, and exactly what Phase 1 must wire.
11. Capture rendered evidence per section 9.
12. Write the receipt per section 10 and request the completion gate.

## 7. Boss design rulings, do not reinterpret

These are decided. Implement them rather than proposing alternatives.

- **Extraction, not redesign.** Centralising values is not permission to flatten
  route-specific design. Current pixels are preserved.
- **The mobile menu introduces no new visual language.** It inherits existing type, colour
  and spacing tokens from the current headers. It is a structural repair for a real defect,
  the absence of any menu trigger on all six routes, not a restyle.
- **Registered as intentional exceptions, never treated as drift:** the Editorial Night
  treatment, the oversized CAROB signature, the soft blue and eggshell atmosphere, the
  deliberate fades and dissolves, page-specific crop values including the Our Story portrait
  stack, hero composition, route-specific section rhythm, and narrow-width fixes.
- **Accessibility baseline is not subjective.** Visible focus, a reduced-motion path, and
  keyboard reachability are requirements, not style options.
- **No content, copy, price, claim or catalogue value enters any contract file.** Contracts
  describe structure and style. Business truth is CAT-01, CLM-01 and their siblings, and all
  remain HOLD.

## 8. Verification commands

```sh
# 1. Baseline unchanged. The six sources must be byte-identical to admission.
git -C . status --short -- _wip/homepage_real_1_lead_photo.WIP.html _wip/shop.WIP.html \
  _wip/our-story.WIP.html _wip/carob-story.WIP.html _wip/stockists.WIP.html _wip/faq.WIP.html
# expected: no output

shasum -a 256 _wip/homepage_real_1_lead_photo.WIP.html _wip/shop.WIP.html \
  _wip/our-story.WIP.html _wip/carob-story.WIP.html _wip/stockists.WIP.html _wip/faq.WIP.html
# expected: exactly the six hashes in the acceptance packet

# 2. Nothing outside scope changed.
git status --porcelain
# expected: the 13 pre-existing dirty W1-E files unchanged, plus only the new Phase 0 paths

# 3. Contract validity. Phase 0 scope only.
node scripts/check-maplemoon-design-system.mjs --contracts-only
# expected: exit 0, non-zero counts of tokens, routes and registered exceptions

# 4. Every contract is valid JSON.
for f in docs/design-system/contracts/*.v1.json; do python3 -m json.tool "$f" >/dev/null || echo "INVALID $f"; done
# expected: no output

# 5. Completion gate.
python3 -B scripts/check-maplemoon-receipt.py verify \
  --packet docs/orchestration/packets/MAPLEMOON-PHASE-0-SHARED-FOUNDATION-20260807.md \
  --receipt docs/orchestration/reviews/MAPLEMOON-PHASE-0-SHARED-FOUNDATION-20260807-RECEIPT.json \
  --checkpoint "$CKPT" \
  --phase complete
```

**Route conformance must stay switched off in Phase 0.** Zero routes reference the contract
yet, so a conformance check would fail by design and break its own verify command. Build the
conformance mode behind a flag, leave it off, and document that Phase 1 switches it on. This
is why check 3 is `--contracts-only`.

`npm test` is deliberately not in this list. It is a failing placeholder (QA-05) and fixing
it requires editing `package.json`, which is Phase 1.

## 9. Rendered visual evidence requirement

`requires_visual_evidence` is true, and for this phase it means **proof of zero visual
change**. This is the real guard on an additive phase, not a formality: it demonstrates that
new CSS, JS and JSON leaked nothing into rendered output.

- Capture all six routes at 390 and 1440 CSS pixels, before any write and again after the
  final write.
- The after captures must be visually identical to the before captures. Any difference is a
  leak and a `FAIL`, because nothing in this phase is referenced by any route yet.
- Record every screenshot path in `screenshots_or_urls`.
- Per `AGENTS.md`, serve the repo locally and use the in-app browser or a served URL. Do not
  spawn external Chrome unless Nate asks or real-browser QA requires it.
- The 1440 capture path has a known limitation: an in-app canvas limit previously produced
  visually invalid 1440 captures. If a capture is invalid, record it as invalid and hold it.
  Do not pass an unreadable image as evidence.

## 10. Required receipt

Write `maplemoon-receipt/v2` to
`docs/orchestration/reviews/MAPLEMOON-PHASE-0-SHARED-FOUNDATION-20260807-RECEIPT.json` with
all twenty required fields: `schema`, `receipt_id`, `packet_id`, `worker_thread_id`,
`worker`, `started_at`, `completed_at`, `files_read`, `files_changed`, `pre_sha256`,
`post_sha256`, `checks`, `screenshots_or_urls`, `failures`, `unknowns`, `residual_risk`,
`forbidden_path_changes`, `proposed_next_state`, `next_reviewer`.

Requirements:

- `worker_thread_id` must be exactly `019fd776-fb3f-7fc1-aa88-187fabb5971a`.
- `files_changed` must be a subset of the writable paths in section 3. Anything else is a
  scope breach. It must also **equal** the set of writable paths whose state actually changed
  against the checkpoint, so it includes the receipt itself, which goes from absent to
  present.
- **Hash evidence, and the receipt is a deliberate exception.** For the thirteen source
  paths, record both `pre_sha256` and `post_sha256`. All thirteen were absent at checkpoint
  time, so each `pre_sha256` entry must be `null`, matching the recorded `"state": "absent"`.
  For the fourteenth path, the receipt itself, record **no** `pre_sha256` entry and **no**
  `post_sha256` entry. A receipt cannot contain its own post-hash, and the gate holds with
  `receipt self-hash evidence mismatch` if a post-hash is present for it. Do not attempt to
  compute it.
- `checks` must carry the real command string, exit code and result for each check in
  section 8. Every check must exit 0; a non-zero exit is a `FAIL`. Do not summarise. Do not
  report a check that was not run.
- Record the before and after visual captures of section 9 as explicit entries in
  `screenshots_or_urls`. Note that the gate only enforces `requires_visual_evidence` at the
  promote phase, not at completion, so the rendered evidence is enforced by Boss review.
  A completion PASS with missing or unequal captures will still be returned as HOLD.
- `forbidden_path_changes` must be empty.
- `unknowns` must list every value that could not be sourced from section 2 inputs.
- `proposed_next_state` is `needs_review`, `next_reviewer` is `Claude Code Main · packet`.
- `ready_to_promote` is `false`.

## 11. Stop conditions

Stop and report rather than proceeding if any of these occur:

- Your thread ID does not match, or HEAD, branch or any of the six source hashes has drifted.
- Any writable path in section 3 already exists.
- The start gate does not return PASS.
- A required value cannot be sourced and would have to be invented.
- The work would require editing any existing file.
- Any after capture differs from its before capture.

Never deploy, publish, upload, send, commit, push, delete, reset, purchase, contact the
client, or promote. A receipt PASS does not authorize promotion.

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-PHASE-0-SHARED-FOUNDATION-20260807",
  "worker_thread_id": "019fd776-fb3f-7fc1-aa88-187fabb5971a",
  "state": "ready",
  "objective": "Additive-only shared design foundation. Create the design-system CSS and JS layer, six versioned JSON contracts, the design-system document and a fail-loud contract checker as new files, extracting values from measured current state. Edit no existing file, so the six admitted WIP sources stay byte-frozen as the Phase 1 reference baseline.",
  "readable_paths": [
    "_wip/homepage_real_1_lead_photo.WIP.html",
    "_wip/shop.WIP.html",
    "_wip/our-story.WIP.html",
    "_wip/carob-story.WIP.html",
    "_wip/stockists.WIP.html",
    "_wip/faq.WIP.html",
    "AGENTS.md",
    "docs/orchestration/SIDECHAT_RECEIPT_GATE.md",
    "docs/orchestration/packets/MAPLEMOON-CLAUDE-BOSS-ACCEPTANCE-20260807.md"
  ],
  "external_readable_paths": [
    "/Users/handtomouse/.codex/visualizations/2026/08/06/019fd776-fb3f-7fc1-aa88-187fabb5971a/maplemoon-investigation-20260807/maplemoon_design_system_architecture.md",
    "/Users/handtomouse/.codex/visualizations/2026/08/06/019fd776-fb3f-7fc1-aa88-187fabb5971a/maplemoon-investigation-20260807/maplemoon_rendered_style_matrix.md",
    "/Users/handtomouse/.codex/visualizations/2026/08/06/019fd776-fb3f-7fc1-aa88-187fabb5971a/maplemoon-investigation-20260807/maplemoon_current_style_conflicts.md",
    "/Users/handtomouse/.codex/visualizations/2026/08/06/019fd776-fb3f-7fc1-aa88-187fabb5971a/maplemoon-investigation-20260807/maplemoon_style_contract_probe.md",
    "/Users/handtomouse/.codex/visualizations/2026/08/06/019fd776-fb3f-7fc1-aa88-187fabb5971a/maplemoon-investigation-20260807/maplemoon_asset_media_integrity.md"
  ],
  "writable_paths": [
    "assets/design-system/mm-tokens.css",
    "assets/design-system/mm-base.css",
    "assets/design-system/mm-primitives.css",
    "assets/design-system/mm-chrome.css",
    "assets/design-system/mm-chrome.js",
    "docs/design-system/MAPLEMOON-DESIGN-SYSTEM-V1.md",
    "docs/design-system/contracts/tokens.v1.json",
    "docs/design-system/contracts/routes.v1.json",
    "docs/design-system/contracts/components.v1.json",
    "docs/design-system/contracts/responsive.v1.json",
    "docs/design-system/contracts/images.v1.json",
    "docs/design-system/contracts/exceptions.v1.json",
    "scripts/check-maplemoon-design-system.mjs",
    "docs/orchestration/reviews/MAPLEMOON-PHASE-0-SHARED-FOUNDATION-20260807-RECEIPT.json"
  ],
  "requires_visual_evidence": true,
  "visual_evidence_definition": "Proof of zero visual change. All six routes captured at 390 and 1440 CSS pixels before the first write and after the final write. The after captures must be visually identical to the before captures, because no route references the new files in this phase. Any difference is a leak and a FAIL. Invalid captures are recorded as invalid and held, never passed.",
  "verify": [
    "git status --short on the six WIP sources returns no output",
    "shasum -a 256 of the six WIP sources equals the admitted baseline in MAPLEMOON-CLAUDE-BOSS-ACCEPTANCE-20260807",
    "git status --porcelain shows only the 13 pre-existing dirty W1-E files plus the new Phase 0 paths",
    "node scripts/check-maplemoon-design-system.mjs --contracts-only exits 0 with non-zero token, route and exception counts",
    "every docs/design-system/contracts/*.v1.json parses under python3 -m json.tool",
    "python3 -B scripts/check-maplemoon-receipt.py verify --phase complete returns PASS"
  ],
  "stop": [
    "worker_thread_id does not match 019fd776-fb3f-7fc1-aa88-187fabb5971a",
    "HEAD, branch or any of the six source hashes has drifted from the admitted baseline",
    "any writable path already exists before the first write",
    "the start gate does not return PASS",
    "a required value cannot be sourced from the input paths and would have to be invented",
    "the work would require editing any existing file, including package.json",
    "any after capture differs from its before capture",
    "any deploy, publish, upload, send, commit, push, delete, reset, purchase, client contact or external promotion"
  ],
  "next_reviewer": "Claude Code Main · packet",
  "admitted_by": "docs/orchestration/packets/MAPLEMOON-CLAUDE-BOSS-ACCEPTANCE-20260807.md",
  "baseline_head": "d70dad4f5d08fdd11742e60b16bbc0f2b905fbad",
  "baseline_branch": "codex-maplemoon-section-review",
  "checkpoint_destination": "generated at run time under _wip/checkpoints/, see section 5 of this packet for the exact command",
  "receipt_hash_rule": "record pre_sha256 and post_sha256 for the thirteen source paths only, with pre null because all were absent at checkpoint time. Record no pre_sha256 and no post_sha256 entry for the receipt path itself, or the gate holds with receipt self-hash evidence mismatch.",
  "ready_to_promote": false
}
<!-- CONTROL-PLANE:END -->
