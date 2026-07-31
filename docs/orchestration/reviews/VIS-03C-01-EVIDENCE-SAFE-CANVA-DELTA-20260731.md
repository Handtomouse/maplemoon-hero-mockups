# VIS-03C-01 Evidence-Safe Canva Delta Receipt

**Date:** 2026-07-31
**Branch / HEAD:** `codex-maplemoon-section-review` / `a6cd91a589ceff18283e4c6250ac256fe97812a4`
**Status:** accepted by the coordinator after independent mechanical and six-width visual verification

## Implemented delta

- CV-034: changed only the mapped Homepage ritual label from `Night` to `Night-time` in clean and annotated.
- CV-043/CV-044/CV-045: removed only the Our Story sentence beginning `We make carob because we love what it is` in clean and annotated.
- CV-066: removed the pending-policy FAQ category/entry and added one neutral `Shipping & returns` link to `https://maplemoon.com.au/shipping-returns/` in clean and annotated. The visual-QA correction adds a consistent decorative inline icon while preserving the accessible label and exact URL.
- CV-067: removed the illustrative map panel and visible `Not a live map` signal from clean Stockists. The visual-QA correction makes the remaining results panel span the full finder grid and replaces `204 parsed · 7 need confirmation` with `204 directory entries` in clean only. Annotated Stockists remains byte-identical.
- Added builder assertions for the three existing Homepage ritual image paths and continued exclusion of a Carob Story nutrition comparison.
- Added a fail-closed builder promotion path. It compares a complete candidate tree with current staging and refuses to write if any path outside the approved eleven-file set differs.

## Byte-changing files

- `scripts/build-maplemoon-saturday-review.py`
- `docs/client-review/2026-08-01-saturday-review/staging-v1/clean/{homepage,our-story,faq,stockists}.html`
- `docs/client-review/2026-08-01-saturday-review/staging-v1/annotated/{homepage,our-story,faq}.html`
- `docs/client-review/2026-08-01-saturday-review/staging-v1/{MANIFEST.json,clean/MANIFEST.json,annotated/MANIFEST.json}`
- This receipt

Annotated `stockists.html` was admitted to builder ownership but remained byte-identical.

## Base and final SHA-256

| File | Base | Final |
|---|---|---|
| Builder | `093ff6416624f670c5df1d7d784d1ab02b673a16c9ec36c5bcfe4c85af29a20e` | `82e510dc1760e9145c076db65b05b5adc893ce4938eb086a996a42a09707e74a` |
| Aggregate manifest | `9328a02e4eb01176dd58add5902ad028736fe083829ff4c1c30983dbfdcec661` | `58dbde15a6160e87dde09fe14f8c552da2eb09c0c52e1a3771e78e7a5aeb95df` |
| Clean manifest | `8716e69484714ff6cefd74089da5f32e499c29adfc199541aceb9be823c683d5` | `893892a03b32a06db9da935f3480130741c770ba9bd7d925a2f605c67cf01cd4` |
| Annotated manifest | `9de3d61631a73a628f2d2865f7c5a03bc1d35cd1c7b11b9258961c3d5211ad8c` | `212449a6ebc4caaf718d628a94737bed0afeabcedc81473aa09f4e194ff9004a` |
| Clean Homepage | `521da09a8326f3faab309bd3ec5d27309064bb53bd67d559de1216fe5e8cc8b4` | `cd5e9220f91c3871326c1efc893a8eb40ad9ea1bd02242e956080ffbcec4bbfd` |
| Annotated Homepage | `3a93897f43c52a59934196e60127e8601d2b76622c54ef21582fd6c7d4676dcb` | `a62d8b2e4cb3d15a308e6aaf73638cb0c3adab6c609c24216c088ff8e36c58e7` |
| Clean Our Story | `74468f7e326dfe8cce9638bd41fcd22b97c9e2dbd746f81404091a1120341324` | `84b0d8814a9a82817bd4540afd4f609720fb5d4ad17215257beafa14de4d0114` |
| Annotated Our Story | `f427867fe0e7658d26bdd26db999f19f9e68c21f38c6c70f4958c860e51f9239` | `b517f9f7c7a814317b4da5f7ef8f01f64a38dd2bdf2b32ff466eaaf6362738ba` |
| Clean FAQ | `3a5c3cef75b8bc9e789ce53e44c6e6215e1c312947d87e25fa42aad4f4eaf425` | `21baedfd10ea3b4c49364dd7ed71a395003a7c79d3a27125a981a0d4112e3be9` |
| Annotated FAQ | `7d7eb1d377f9cebe30ec2a2bfc25b7f93a6c58c3f9cf47c006f83221915e52ed` | `5d6e31430cda90110ce97fa1dfd4531ae4b06df19134bd9fd210733cf61dc35b` |
| Clean Stockists | `eeddf000fbf95cf8b19fe1752d76b8f5ea93813a36fdfa991c54e1092edf512e` | `fff14e9f4c7778b364a38ead36dc64be0d7d479fb2877165ba94fbea942ac37b` |
| Annotated Stockists | `72db5c835b661beb78395f43ea51cbd84fcdf4d482c1b51ac088ec68f498be3e` | `72db5c835b661beb78395f43ea51cbd84fcdf4d482c1b51ac088ec68f498be3e` |

## Verification evidence

- Preflight source pins matched the reconciliation record exactly. Builder and aggregate manifest matched the supplied preflight hashes.
- Captured a temporary full SHA-256 inventory of all `154` staging files at `/tmp/vis-03c-01.UPyugR/staging-before-relative.sha256`.
- Before editing, the original builder reproduced all `154` staging files byte-for-byte in a temporary full build.
- Ran two final full builds. Complete `154`-file inventories were byte-identical.
- Promoted through the fail-closed builder delta path. Final staging is byte-identical to build two.
- All `143` forbidden/non-delta staging paths remained byte-identical to the baseline, including every asset, CSS/JS/support file, generated Shop and Carob Story file.
- Key unchanged generated hashes:
  - Clean / annotated Shop: `ac497846799cd9c0e9d358c25230e3f3da5f587e58bb45b400848e6e7cbb205b` / `a98316fdaf93972c4224d8acdac30751eea8f096d7c2e896210915fcae7e8e90`
  - Clean / annotated Carob Story: `cf2616d5d8dfd88a83700233974675eb8eaca2261841b8ca1ef5dd69464f7364` / `9348185fa1c780a898a3a9852c5ce766854e7ac8353a7e4a8c93991314e5d77a`
- Source assertions passed:
  - Exactly one mapped `Night-time` label per mode; old mapped label absent.
  - Each existing ritual image path occurs exactly once per mode.
  - Removed Our Story sentence absent and preceding sentence retained exactly once per mode.
  - Exactly one neutral shipping/returns link per mode; pending policy entry/category absent.
  - Clean Stockists map panel and `Not a live map` absent; results container retained.
  - Annotated Stockists map panel and signal retained exactly once.
  - Carob Story nutrition-comparison markers absent in both modes.
- `python3 -B scripts/build-maplemoon-saturday-review.py --self-test`: PASS.
- `python3 -B scripts/check-maplemoon-review.py --profile saturday-all --staging docs/client-review/2026-08-01-saturday-review/staging-v1`: PASS, `0` failures and `0` warnings.
- `node scripts/check-maplemoon-cart.mjs`: PASS.
- `node scripts/check-maplemoon-homepage-motion.mjs`: PASS; autoplay absent and reduced-motion safeguards true.
- `git diff --check`: PASS.

## Coordinator visual-QA correction evidence

- Correction baseline builder / aggregate manifest: `696a698c3dbb8ae547a126d04e1ca4d8779d93f42c75b459c8b55b097d47c617` / `7c8b0ee75a4c393d48747ec7e83e577d8551ea1fa038fa413272fb8fef475ebc`.
- Captured a fresh `154`-file baseline at `/tmp/vis-03c-01-fix.vFFRI0/staging-before-relative.sha256`; the pre-correction builder reproduced it exactly.
- Two complete correction builds were byte-identical. The fail-closed promotion changed exactly six staging files: the aggregate manifest, both mode manifests, both FAQ files, and clean Stockists.
- The other `148` staging files remained byte-identical to the coordinator-blocked baseline. This preserves all prior forbidden-path invariants and also confirms annotated Stockists remained `72db5c835b661beb78395f43ea51cbd84fcdf4d482c1b51ac088ec68f498be3e`.
- Clean Stockists assertions passed for the one-column finder rule, results-panel `grid-column:1 / -1`, one neutral `204 directory entries` occurrence, and absence of the internal reconciliation wording.
- Annotated Stockists retained exactly one `204 parsed · 7 need confirmation` occurrence and contains no clean-only layout hook.
- Clean and annotated FAQ each contain exactly one icon-led shipping/returns action with `aria-hidden="true"`, `focusable="false"`, the neutral `Shipping & returns` label, and the exact approved URL.
- Builder self-test, Saturday all-profile checker, cart checker, Homepage motion checker, and `git diff --check` were rerun after correction and passed. The Saturday checker again reported `0` failures and `0` warnings.

## Failures and blockers

Two fail-closed temporary builds caught an over-broad Stockists assertion and a stale FAQ precondition while the builder guards were being refined. Neither touched default staging. A shell assertion wrapper also stopped on quoting before running. All were corrected before the two final builds and full verification.

The coordinator correction run had no build or verification failure. No implementation blocker remains. No commit, stage, push, deploy, send, Canva mutation, Shopify action, network submission, register update, lock-manifest update, canonical WIP edit, checker edit, package edit, catalogue/product/order-data edit, shared-cart edit or production action was performed.

## Residual risk and coordinator gate

This is mechanical and source-level evidence, not visual approval or acceptance. The corrected FAQ icon row, full-width clean Stockists results layout, and reviewer-safe directory wording require coordinator desktop/mobile re-review. The external shipping/returns destination was not fetched or treated as policy authority.

**Acceptance:** the coordinator re-reviewed the corrected clean and annotated surfaces, verified this receipt and hashes, and recorded CV-027, CV-034, CV-038, CV-043, CV-044, CV-045, CV-066 and CV-067 as delivered. No external or production action was authorized.
