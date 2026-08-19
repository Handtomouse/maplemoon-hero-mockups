# MapleMoon Claude Boss acceptance, 2026-08-07

Non-mutating authority record. This packet writes no source file and authorizes no
promotion. It exists so a later session resumes from durable project-local evidence rather
than panel state, task titles, or memory.

## 1. Boss binding

| Field | Value |
|---|---|
| Boss | `Claude Code Main · packet` |
| Boss binding basis | Claude exposes no immutable session ID, so this checksummed project-local packet is the durable authority |
| Authoritative worker | `019fd776-fb3f-7fc1-aa88-187fabb5971a` |
| Granted by | Nate, 2026-08-07 |
| Accepted at | 2026-08-07 16:23 AEST |

Only the worker thread ID above is authoritative. No worker may be inferred from a task
title, a side chat, or a panel.

## 2. Authority superseded

1. The worker-mode time box in `AGENTS.md` has expired. This packet supersedes it.
2. `docs/orchestration/packets/MAPLEMOON-MAIN-COORDINATOR-ACCEPTANCE-20260803.md` is
   superseded as current coordination authority and retained as evidence.
3. `docs/orchestration/packets/MAPLEMOON-MAIN-BOSS-HANDOFF-20260803.md` is retained as
   evidence, not as live instruction.

Per `docs/orchestration/SIDECHAT_RECEIPT_GATE.md`, historical packets without a
`worker_thread_id` are evidence, not admission-ready work. They are superseded here rather
than reused.

## 3. Admitted immutable baseline, verified live

Verified in the working tree on 2026-08-07, not copied from the investigation bundle.

| Field | Value |
|---|---|
| Repository | `/Users/handtomouse/maplemoon-website` |
| Branch | `codex-maplemoon-section-review` |
| HEAD | `d70dad4f5d08fdd11742e60b16bbc0f2b905fbad` |

The branch is recorded explicitly because it is not the `staging-direction-a-twyg` branch
named in the standing coordinator brief. HEAD matches the recorded baseline, so the baseline
is sound, but no later session or worker may assume the other branch.

| Route | Source | SHA-256 | Git state |
|---|---|---|---|
| Home | `_wip/homepage_real_1_lead_photo.WIP.html` | `eeb7f73d0281932043d1af53aabcdb4c2689ab9aabdfd6244beb3684dd593e11` | tracked, clean |
| Shop | `_wip/shop.WIP.html` | `65a8199ed228bddc72cabe8e93eadf1cf000804c4035a8197fb14db4811617d3` | tracked, clean |
| Our Story | `_wip/our-story.WIP.html` | `36fdc9d4f5b2992750e204db55d9cd6355f0f975a443d5885c4d0baffdedfec1` | tracked, clean |
| What Is Carob | `_wip/carob-story.WIP.html` | `e4cc851c3b014cb2a13d487989088764a3a4d86fc10539aba9c7efa5b690e56b` | tracked, clean |
| Stockists | `_wip/stockists.WIP.html` | `a3b886db50d53c1997e3ca595db2f4f56c6cff1accfee6ebf4e413fc284c3b03` | tracked, clean |
| FAQ | `_wip/faq.WIP.html` | `5dc68f31f5fb82a8149e2984541a30a4028932d2aa2f3cef11ae6940228c45fd` | tracked, clean |

These six hashes are the immutable starting checkpoint. They are not factual, design, client,
or launch approval.

## 4. Evidence bundle verification

Bundle root:
`/Users/handtomouse/.codex/visualizations/2026/08/06/019fd776-fb3f-7fc1-aa88-187fabb5971a/maplemoon-investigation-20260807`

`shasum -a 256 -c SHA256SUMS` returned 129 OK and 0 failures. Bundle evidence is
point-in-time. The live recheck in section 3 governs, and it agrees with the bundle on every
scoped value.

## 5. Codex live-safety determination

A rollout log touching `_wip/` inside the previous 15 minutes initially flagged the repo as
possibly live. It was disambiguated rather than trusted:

- The writing thread is `019fd4a6-aced-7a02-b985-c64bc8653de1`, whose live turns concern a
  262.001 by 370.000 mm PDF/X-4 press file on a separate client lane, not MapleMoon. The
  match was against stale history in an 818 MB log.
- No Codex process holds a working directory inside `/Users/handtomouse/maplemoon-website`.
- The authoritative worker `019fd776` holds a working directory in the evidence bundle
  directory and was idle at intake.

Conclusion: no MapleMoon shared-file collision exists, so an additive-only phase may proceed.

## 6. Preserved state, must not be touched

Dirty tracked files preserved, all in the W1-E staging pack that workstream IMG-07 says to
freeze:

- `assets/product_shots/w1-e-prepared-20260803/README.md`
- `assets/product_shots/w1-e-prepared-20260803/browser-qa-preview.html`
- `assets/product_shots/w1-e-prepared-20260803/bananas.webp`
- `assets/product_shots/w1-e-prepared-20260803/eclipse_almond.webp`
- `assets/product_shots/w1-e-prepared-20260803/eclipse_fudge.webp`
- `assets/product_shots/w1-e-prepared-20260803/eclipse_hazelnut.webp`
- `assets/product_shots/w1-e-prepared-20260803/eclipse_pecan.webp`
- `assets/product_shots/w1-e-prepared-20260803/moon_almond.webp`
- `assets/product_shots/w1-e-prepared-20260803/moon_cayenne.webp`
- `assets/product_shots/w1-e-prepared-20260803/moon_goji_coconut.webp`
- `assets/product_shots/w1-e-prepared-20260803/moon_hazelnut.webp`
- `assets/product_shots/w1-e-prepared-20260803/moon_peppermint.webp`
- `assets/product_shots/w1-e-prepared-20260803/moon_pure_carob.webp`

Untracked trees preserved: `_wip/deploy/site/`, `_wip/deploy/site-full/`, `_wip/evidence/`,
`docs/client-review/2026-07-29-carli-review/staging-v1/`,
`docs/client-review/2026-08-01-saturday-review/generated-candidates/ritual-harmonized-approved-20260803-v2/`,
and all untracked packets and reviews under `docs/orchestration/`.

Commands never to be run in this repository, because they silently destroy uncommitted and
untracked worker output: `git stash`, `git checkout --`, `git restore`, `git reset --hard`,
`git clean -fd`, `git clean -x`, `git add -A`, `git commit -a`, and any repository-wide
formatter.

## 7. Scope expansion, recorded once

The standing coordinator brief scopes this agent to the homepage, shop, our-story and
stockists WIP files, section reviews, the tracker and checkpoints, and it excludes
Carob Story and FAQ implementation and design-system work.

Nate's 2026-08-07 Boss grant expands that scope to the full recovery programme, including
`_wip/carob-story.WIP.html`, `_wip/faq.WIP.html`, and the shared design-system contract.
This is recorded here so it is not re-litigated in a later session.

## 8. Boss decision rights

Decidable by this Boss: layout, visual hierarchy, component architecture, styling,
interaction, QA priority, phase sequencing, and selection among source-backed copy options.

Not decidable by this Boss, and never inventable or silently approvable: catalogue
membership, SKUs, variants, prices, availability; packaging appearance and product
photography; ingredients, health, environmental, sourcing and performance claims; founder
identities, biographies, quotations and relationships; testimonials, consent, stockists,
awards, licences, certifications, policies and launch facts.

## 9. Nate-only decisions, carried as explicit HOLD

| ID | Hold | Why it is Nate-only |
|---|---|---|
| IMG-04 | Dylan founder bio v02 acceptance | technically viable, explicitly not accepted |
| IMG-02 | Home hero video selection | untracked, not in team custody |
| IMG-06 | Ritual scene set, current licensed versus harmonized v2 | human design decision, neither is a defect |
| META-01 | OG image family and social logo | asset selection and custody |
| CAT-01 | Catalogue, SKUs, prices, variants, availability | 23 shop offers against 15 candidate routes, no authoritative export |
| CLM-01 | Every process, health and sourcing claim | requires claim-by-claim client or source approval |
| BIO-01 | Founder bio copy and any displayed favourite | client factual acceptance |
| TEST-01 | Testimonial wording, attribution, consent | written website consent absent |
| STK-01 | Stockist data ownership, 7 incomplete rows, update cadence | client or data owner |
| FONT-01 | Typekit public web-embed entitlement | account owner |
| Policies | Shipping, refunds, privacy, terms, wholesale, newsletter consent | client, operations, legal |

Pending stays visibly pending. No held item may be filled with an invented value.

## 10. External-action gate

Without Nate's explicit approval this Boss and its workers may not deploy, publish, upload,
send, commit, push, delete, reset, purchase, contact the client, or promote externally.

A receipt PASS from `scripts/check-maplemoon-receipt.py` does not authorize promotion. Human
decisions, source evidence, catalogue gates and external actions remain separate gates.

## 11. Admitted next phase

`docs/orchestration/packets/MAPLEMOON-PHASE-0-SHARED-FOUNDATION-20260807.md`.

The investigation board proposed a first mutating packet that both created the design-system
scaffold and edited all six WIP sources. That is rejected as a single phase, because a
baseline cannot be declared immutable and mutated in the same phase. It is split:

- Phase 0 is additive only. It creates files that do not exist and edits nothing, so the six
  hashes in section 3 stay frozen and become the reference for later phases.
- Phase 1 performs the chrome, landmark, control-type, metadata and `npm test` repairs
  against that frozen baseline, with the Phase 0 drift checker already in place to prove no
  visual regression.
- Per-route CSS extraction remains Phase 2.

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-CLAUDE-BOSS-ACCEPTANCE-20260807",
  "worker_thread_id": "019fd776-fb3f-7fc1-aa88-187fabb5971a",
  "state": "accepted",
  "objective": "Record Claude Code Main as sole MapleMoon Boss, admit the six-source immutable baseline at HEAD d70dad4f5d08fdd11742e60b16bbc0f2b905fbad on branch codex-maplemoon-section-review, supersede expired authority, and define Nate-only and external-action gates. Non-mutating.",
  "readable_paths": [
    "AGENTS.md",
    "docs/orchestration/SIDECHAT_RECEIPT_GATE.md",
    "_wip/homepage_real_1_lead_photo.WIP.html",
    "_wip/shop.WIP.html",
    "_wip/our-story.WIP.html",
    "_wip/carob-story.WIP.html",
    "_wip/stockists.WIP.html",
    "_wip/faq.WIP.html"
  ],
  "writable_paths": [],
  "verify": [
    "git rev-parse HEAD equals d70dad4f5d08fdd11742e60b16bbc0f2b905fbad",
    "git rev-parse --abbrev-ref HEAD equals codex-maplemoon-section-review",
    "shasum -a 256 of the six WIP sources equals the table in section 3",
    "git status --short shows the six WIP sources clean",
    "shasum -a 256 -c SHA256SUMS in the evidence bundle returns 129 OK and 0 failures"
  ],
  "stop": [
    "any drift in HEAD, branch or the six scoped hashes",
    "any deploy, publish, upload, send, commit, push, delete, reset, purchase, client contact or external promotion",
    "any invented catalogue, price, claim, testimonial, consent, stockist, policy, founder or launch fact",
    "any change to the preserved dirty or untracked paths in section 6"
  ],
  "next_reviewer": "Nate",
  "supersedes": [
    "AGENTS.md worker-mode time box",
    "docs/orchestration/packets/MAPLEMOON-MAIN-COORDINATOR-ACCEPTANCE-20260803.md"
  ],
  "admitted_baseline": {
    "repository": "/Users/handtomouse/maplemoon-website",
    "branch": "codex-maplemoon-section-review",
    "head": "d70dad4f5d08fdd11742e60b16bbc0f2b905fbad",
    "sources": {
      "_wip/homepage_real_1_lead_photo.WIP.html": "eeb7f73d0281932043d1af53aabcdb4c2689ab9aabdfd6244beb3684dd593e11",
      "_wip/shop.WIP.html": "65a8199ed228bddc72cabe8e93eadf1cf000804c4035a8197fb14db4811617d3",
      "_wip/our-story.WIP.html": "36fdc9d4f5b2992750e204db55d9cd6355f0f975a443d5885c4d0baffdedfec1",
      "_wip/carob-story.WIP.html": "e4cc851c3b014cb2a13d487989088764a3a4d86fc10539aba9c7efa5b690e56b",
      "_wip/stockists.WIP.html": "a3b886db50d53c1997e3ca595db2f4f56c6cff1accfee6ebf4e413fc284c3b03",
      "_wip/faq.WIP.html": "5dc68f31f5fb82a8149e2984541a30a4028932d2aa2f3cef11ae6940228c45fd"
    }
  },
  "nate_only_decisions": [
    "IMG-04 Dylan founder bio v02 acceptance",
    "IMG-02 Home hero video selection",
    "IMG-06 ritual scene set selection",
    "META-01 OG family and social logo",
    "CAT-01 catalogue, SKUs, prices, variants, availability",
    "CLM-01 process, health and sourcing claims",
    "BIO-01 founder bio copy and displayed favourites",
    "TEST-01 testimonial wording, attribution and consent",
    "STK-01 stockist data ownership and cadence",
    "FONT-01 Typekit public web-embed entitlement",
    "shipping, refund, privacy, terms, wholesale and newsletter consent policies"
  ],
  "ready_to_promote": false
}
<!-- CONTROL-PLANE:END -->
