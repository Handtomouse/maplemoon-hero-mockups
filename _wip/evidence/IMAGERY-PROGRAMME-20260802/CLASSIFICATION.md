# MapleMoon imagery programme — classification

Authority: `_wip/GOAL-IMAGERY-PROGRAMME-20260802.md` (`e1e17f919bd616a80908fdd5bc353de7eb9f409108c71fa33fc1c5718c249ef0`). The frozen six-page package remains untouched. This classification is a planning record, not approval or integration authority.

## A — safe to generate

Exactly three image slots remain genuinely safe for generic generation: the three Homepage `#ritual` tiles. The current licensed images are wrong for the intended visual language, but no new generation is needed before Nate decides among the 15 preserved candidates already available.

| Page / section | Current source and SHA-256 | Current state | Preserved proposed evidence | Provenance / limitations | Recommended next state |
|---|---|---|---|---|---|
| Homepage `#ritual` — After dinner | `assets/licensed/scene_after_dinner.jpg` — `99380ed5986b0859706c37a3a94102e42b0e094d0aa55a419b72f1ec7a2a8b50` | Wrong: generic chocolate blocks, dark slate/wood treatment, not carob-led | A1, C1, R1.1, R2.1, R3.1 | All alternatives are generic generated still lifes, not MapleMoon product, recipe or client photography. R1.1 is foreground-dense; R2.1 is more overhead/editorial; R3.1 is a new visual moment and has no approved replacement copy. | Nate selects one existing direction or HOLD. Generate only if the selected direction is D or all existing directions are rejected. |
| Homepage `#ritual` — Afternoon reset | `assets/licensed/scene_afternoon.jpg` — `bfa86e30b1f82d9836c977df8b5caa160468dc1e4bc7d51b61749278ae695c84` | Wrong: patterned teacup, book and blanket; no verified carob subject | A2, C2, R1.2, R2.2, R3.2 | C2 remains larger than its ideal tiny-object target. R1.2 is deliberately bold and sparse. R2.2 has a small ridge highlight. R3.2 is crop-sensitive and has no approved replacement copy. | Nate selects one existing direction or HOLD. |
| Homepage `#ritual` — With tea, at night | `assets/licensed/scene_tea_night.jpg` — `3133f5623bfaa110ba662f9fcbe5330bf88c956f4cfc9e62680c53cf7f9c18d8` | Wrong: generic white mug, wood board and orange bokeh; not MapleMoon palette/material language | A3, C3, R1.3, R2.3, R3.3 | A3 has slightly more sheen than desired. R1.3 and R2.3 use generic, unbranded cup/spoon props. R3.3 has only a subtle night cue and no approved replacement copy. | Nate selects one existing direction or HOLD. |

If a new image is later authorized, the route is Codex built-in image generation (`image_gen.imagegen`) with `assets/licensed/carob_pods_macro.jpg` as botanical appearance reference and verified local Mitch/website-blue references for art direction. That is a separate bounded packet. No image was generated in this phase.

## B — crop or recomposition only

These are not generative gaps. Their subjects already exist; a later packet may test crops or hierarchy without inventing content.

| Page / section | Current source / evidence | Classification | Exact next evidence needed |
|---|---|---|---|
| Homepage `#carob` mobile | `assets/hero_shots/carob_branch_dusk.jpg` — `5f6fd5235bdde463a84d7133317b354208f97f84a1ca98983746be4c625efee9` | Suitable, needs mobile crop/recomposition | One non-destructive crop proof at the frozen mobile section dimensions; no source edit and no branch generation. |
| Our Story gallery | `Heros-26-trail.jpg` `7136565d…`; `bar-on-rock.jpg` `9b2055d5…`; `bar-on-almonds.jpg` `3b92a69d…`; `carob-moons-brick.jpg` `1352e37d…`; `Heros-55.jpg` `11e46744…` | Suitable, needs crop/hierarchy review | One page-treatment proof showing intended crop and ordering using the existing local photos only. |
| Carob Story gallery | farm `6dfdc7f6…`; macro `0426510e…`; blue hero `64fb77d8…` | Suitable, needs crop/hierarchy review | One page-treatment proof using the existing photography only; no generated botanical substitute. |

## C — code correction, not raster imagery

| Page / section | Evidence | Classification | Exact next evidence needed |
|---|---|---|---|
| FAQ source-page image reference | `review-20260724/faq.WIP.html` — `b07a861e…` | Nonportable generated-file placeholder | A separate code-only packet must identify the intended approved local asset, replace the nonportable reference in an unfrozen working copy, and re-run page/link QA. This programme must not fabricate or generate a raster to mask the source defect. |

## D — blocked by client asset, identity, factual or strategy evidence

| Page / section | Current evidence | Blocker | Exact evidence needed |
|---|---|---|---|
| Our Story founder/makers hero | H212 portrait — `67a56d7c1b7e27973f86f7fe705ec48a963f8c22402bc46f60eb24e155a44e88`; founder hands — `3a8d246f7ca990b53c66120d9458ca53487b00e3a93fe5e48c917d34bc4add68` | Client asset / identity / permission required | Nate/client must identify the approved person/people, approve the exact source file(s), crop/derivative permission and intended section. Do not generate or infer a founder identity. |
| Product and packaging imagery on any page | Existing client/product sources only | Exact packaging, labels, product forms and claims cannot be fabricated | Approved, current client-supplied source file for each SKU/pack shot plus permission and intended placement. All Shop/product imagery remains deferred and outside this task. |
| Stockists map/directory imagery | Existing silhouette `ae753811…`; directory strategy unresolved | Nate/directory strategy gate | Nate selects directory/map strategy and supplies or approves the exact factual store data/map source. Do not imply stockist coverage or locations. |
| Social / OG previews | Audit `LINK-PREVIEW-METADATA-AUDIT-20260802.md` — `f97f57e…`; matrix `LINK-PREVIEW-VALIDATION-MATRIX-20260802.json` — `a04b870…` | No approved OG image, copy, canonical URL or implementation access | Approved image source, exact metadata copy, exact canonical URLs and a separate code/access packet. No re-derivation or generation in this programme. |
| Homepage ritual Family D | Preserved schematic: asymmetric editorial range; no rendered D candidates | Nate direction gate | Nate must choose D before one bounded three-image generation packet. D means off-frame crops, vertical tension and foreground/background layering; it is not silently represented by A/C/R candidates. |

All other current six-page imagery is outside the remaining-gap list: it is either approved/current enough for the frozen review, deferred to Shop/product authority, or already represented above. The 51 live-repo candidate files remain custody-verified, byte-identical and unwired. Whether those untracked candidates should be committed or gitignored remains Nate's separate decision.
