# Homepage QA audit — ingested, verified, classified
# Written: 2026-08-03 · macbook Claude Code (worker)
# STATUS: INTAKE AND CLASSIFICATION ONLY. Records no verdict. Passes no gate.
#         Nothing fixed, edited, rebuilt or promoted. CR-0..CR-4 remain Nate's alone.
# Frame:  see HOMEPAGE-DESKTOP-REVIEW-INTAKE-20260803.md

## Source

`~/Desktop/Archive.zip`, 10 files, written 2026-08-03 00:29–00:48. Machine-generated QA
packets covering all six pages, not homepage alone. Homepage material is split across:

- `home.txt` — findings **#1–26** in full detail
- `maplemoon-homepage-qa-packet.md` — findings **#24–37** plus cascade/process notes

The packet states findings #1–23 were lost to a context compaction and survive only as a
summary. **They are not lost** — `home.txt` carries all 23 in full. Nothing needs recovering
from chat scrollback.

**Provenance: good.** The audits cite `http://127.0.0.1:3011/…` and
`staging-v1/clean/homepage.html` — the frozen artifact, not the WIP. No file references
`#why`, `#who`, `#reviews` or "Learn more". The WIP-drift trap does not bite here.

**Reliability: mixed — verify before acting.** These are machine claims with machine
severities. Two independent errors found (§2), and several counts are wrong. Treat every P0
as a claim, not a fact.

---

## 1. What I verified against the frozen artifact

Measured directly on `staging-v1/clean/homepage.html` and its assets:

| claim | audit said | measured | verdict |
|---|---|---|---|
| oversized lifestyle photos (#4) | 8.1 / 10.7 / 4.1 MB | **7.8 / 10 / 3.9 MB** (~21.7MB) | **CONFIRMED** |
| `carob_branch_dusk.jpg` (#5) | 545KB | **536KB** | **CONFIRMED** |
| no mobile nav toggle (#2) | none in DOM | **0** hamburger/toggle/`aria-expanded` | **CONFIRMED** |
| no OG tags / canonical (#14, #22) | absent | **0** and **0** | **CONFIRMED** |
| `!important` count (#10) | 285 | **285** | **CONFIRMED exact** |
| inline `<style>` blocks (#12) | 18 | **18** | **CONFIRMED exact** |
| Moons image aspect (#33) | 800×800 vs 800×1200 | **800×800 vs 1200×1800** | **CONFIRMED** (ratio mismatch real; sizes misquoted) |
| images missing width/height (#7, #35) | "19 of 20" | **13 of 14** | **CONFIRMED in substance, count wrong** |
| two images with no alt (#6) | "no alt attribute at all" | **all 14 have `alt`; the two named carry `alt=""`** | **CORRECTED — see below** |
| `.wf-what1 .inner` occurrences (#13) | 7 | **9** | **count wrong** |
| scroll-reveal mechanism (#1) | causes white flash | present, but **disabled by default** | **CONTRADICTED — see §2** |

**On #6 — the finding is valid, the wording is not.** Both product images carry `alt=""`
(deliberately empty), not a missing attribute. Empty alt is correct for decorative images and
wrong for product images: a screen reader skips them in silence. Same fix, accurate framing.

---

## 2. Two audit errors — do not carry these forward

**(a) The nav described does not exist, in either file.**

Finding #2 describes the nav as `SHOP / OUR STORY / WHAT IS CAROB / STOCKISTS / FAQ` cramming
into the header, and #3 (P0) is entirely about `WHAT IS CAROB` wrapping to two lines.

Measured, the header nav is **three links**:

    nav.wf-pnav    Shop · Our Story
    nav.wf-pnav r  Stockists
    nav.fnav       Shop · Our Story · Stockists · Contact   (footer)

There is **no "What is Carob" nav item and no "FAQ" nav item** — and the WIP is byte-identical
here, so this is not drift between source and artifact. The five-item nav matches neither
file. It is fabricated detail.

> **#3 is OUT-OF-ARTIFACT. It describes an element that does not exist.** Discard it.
> **#2's core claim survives** (no toggle exists, verified) but its severity is inflated:
> three short links behave very differently from five wrapping ones. Re-judge at 390px on the
> render, don't inherit the P0.

**(b) #1 (P0, "white flash") is contradicted by the same document.**

The reveal script ends `var on=false;(on?enable:disable)();`. `disable()` runs at load, removes
`motion-on`, and stamps `is-visible` on every `[data-reveal]` target — so sections are fully
opaque from first paint and no fade occurs. The packet's own later sweep reaches the same
conclusion, ruling the blank-screenshot pattern *"a screenshot-timing artifact of the QA
tooling, not something a real user would see."*

> **#1 should not ride any fix batch.** It is the audit's own retracted finding, still
> carrying a P0 label from before the retraction.

---

## 3. One real defect the audit missed

**`faq.html` is unreachable from the homepage.** Zero links to it, in both the frozen artifact
and the WIP. `carob-story.html` is reachable exactly once, via the `#carob` CTA.

The review package is six pages. If Carli and Dylan navigate as ordinary viewers from the
homepage, **they cannot reach the FAQ page at all** — a page that was built, QA'd and frozen
for them to review. This is a genuine gap in the thing being sent, and no audit file raises it.

Classification: **DEFECT · BOUNDED · blocks a complete review** (not necessarily the send, if
the hub links all six pages directly — that is CR-1/CR-2 territory and Nate's call).

---

## 4. Dedupe against known open items

| known item | audit overlap | verdict |
|---|---|---|
| `ms49rup1d3dn` — carob 28px misalignment | not raised as a *visible* defect; the cascade is described technically in #13 and the packet's collision warning | **corroborated, not duplicated.** The audit independently found the same `padding:0` cascade. Packet with Codex stands; do not expand. |
| `ms48tuprlfwf` — hero credentials "thicken the text slightly" | **#18** — hero stat pill sits over the sun-glare, worst-case contrast | **DUPLICATE, same element** (`.wf-pcreds`). Two descriptions of one legibility problem. Merge them; fixing contrast may resolve Nate's note without a weight change. |
| `ms48ubrlulgr` — carob learn-more CTA strategy | **#37** — three competing primary-CTA languages on one page | **related, wider.** #37 supersedes it in scope. Both DEEPER. |
| our-story `#shop`, faq `.wrap` | not raised | still disproved; no new evidence offered |

---

## 5. Classification — all 37 homepage findings

Axes: **defect / preference** · **bounded / deeper** · relevance to *this send*.
"Not-for-send" means real but irrelevant to a client design review — code health that changes
nothing Carli and Dylan can see.

### Blocks or degrades the client review — deal with before sending

| # | finding | class |
|---|---|---|
| **#4** | ~21.7MB of images in one section | defect · **bounded** · slow/broken load on their connection |
| **#33** | Moons photo 1:1 stretched by `object-fit:fill` into a 2:3 frame | defect · **bounded** · visibly distorted product shot |
| **#18** | hero credential pill unreadable over sun-glare (= `ms48tuprlfwf`) | defect · **bounded** · first thing seen |
| **#9** | Elixirs product shot visually smaller than sibling tabs | defect · bounded · needs eyes on the render |
| **NEW** | `faq.html` unreachable from homepage | defect · bounded · a review page they cannot reach |
| **#2** | no mobile nav toggle (severity re-judge, not P0) | defect · bounded · confirm at 390 |
| **#32** | dead vertical gaps at two section joins, mobile | defect · bounded · confirm at 390 |
| **#8** | newsletter form has no action / handler | defect · bounded · a visible CTA that does nothing |

### Real, but not for this send — code health, invisible to the client

`#10` 285 `!important` · `#12` 18 style blocks · `#19` 100 hardcoded hexes · `#26` ad-hoc
z-index · `#27` brand tokens unused (2 of 66) · `#30` duplicate colour literals · `#31` spacing
off the 4px grid · `#11`/`#23` process notes, not findings.

*All verified accurate. None changes anything a reviewer sees. Park as backlog; do not let
them inflate the fix batch.*

### Metadata — belongs to CR-3, already has its own audit

`#14` OG tags absent · `#22` canonical absent. Both confirmed. See
`LINK-PREVIEW-METADATA-AUDIT-20260802.md`. Do not fix here.

### Preferences and creative calls — capture, do not let them block

| # | finding | class |
|---|---|---|
| 🚩 **#37** | three competing primary-CTA design languages | preference · **DEEPER** · genuine creative-direction call |
| 🚩 **#34** | tab says "MOONS", copy says "Crescent" | preference · **DEEPER** · **ask Carli and Dylan — it is their product name** |
| 🚩 #16 | "Enquire" vs "Shop Now" unexplained | preference · deeper · depends on what is actually buyable |
| 🚩 #17 | H1 alt text `"Carob"` is thin | preference · bounded · content change, needs sign-off |
| 🚩 #15 | Contact is a bare `mailto:` | preference · bounded |
| #24 / #29 | five different pill radii | preference · bounded · polish |
| #28 | serif font declared three ways | preference · bounded |
| #21 | stockist search navigates rather than previewing | preference · **deeper** · backlog |

### Minor, bounded, safe whenever the batch runs

`#5` 536KB hero image · `#6` `alt=""` on two product images *(reworded per §1)* ·
`#7`/`#35` 13 of 14 images lack width/height (CLS) · `#20` inconsistent lazy/eager ·
`#25` fixed 980px hero padding · `#36` cart badge lacks `aria-live` · `#13` dead legacy rule
at line 472 *(touches the carob cascade — must not be done outside the carob packet)*.

### Discard

`#1` — retracted by its own document (§2b). `#3` — out-of-artifact (§2a).

---

## 6. Honest scope note

**37 findings, 8 that matter for this send.** The audit is thorough and largely accurate, but
it was written as a *build* QA pass — "fix tonight", effort estimates, definitions of done —
against a package whose purpose is to ask two people whether the design and copy are right.
Most of it answers a question nobody is asking yet.

The remaining five pages (`shop`, `our-story`, `carob-story`, `stockists`, `faq`) have
equivalent packets, unread and unverified. On this page's hit rate — two fabricated or
retracted P0s out of four — **none of their P0s should be actioned unverified either.**

## 7. Lane compliance

Written inside `_wip/evidence/` only. The zip was extracted to the job tmp directory, outside
the repo. Nothing touched in `staging-v1/`, `docs/orchestration/`, `scripts/`, `.gitignore` or
`LOCK_MANIFEST.json`. No build, no fix, no gate recorded.
