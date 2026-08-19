# Lane E independent certification

Disposition: **PASS**

## Control-plane gates

- Phase start: `PASS packet=MAPLEMOON-LANE-E-INDEPENDENT-CERT-20260816T133827 phase=start scope=2`
- Predecessor completion replay: `PASS packet=MAPLEMOON-LANE-E-APPLY-20260815T213337 phase=complete changed=8`
- Predecessor promotion replay: `PASS packet=MAPLEMOON-LANE-E-APPLY-20260815T213337 phase=promote changed=8`

## Independent results

- Acquisition: `PASS phase=acquisition hashes=7 locks=6 occurrence_checks=60 checks=27 failures=0`
- Close: `PASS phase=close hashes=7 locks=6 occurrence_checks=60 checks=27 failures=0`
- Exact-page parsing: Home 7/7 inline and 2/2 JSON-LD; Shop 1/1 and 3/3; Our Story 0/0 and 4/4; Carob Story 0/0 and 4/4; FAQ 1/1 and 0/0; Stockists 1/1 and 3/3. Zero parse errors.
- Browser: 12/12 at measured 390 and 1440, each HTTP 200, exact client/scroll width, nonblank, no horizontal overflow, broken images, console errors, page errors, request failures or bad responses.
- Visual: all 12 full-page PNGs and both contact sheets were visually inspected; every page is full-width, nonblank and inspectable. Intentional pending-image placeholders remain visible where source decisions are still held.
- Newsletter runtime: Home and Stockists controls remained disabled and submit-default was prevented; visible non-collecting notice; no submission network request, cookies or new storage.
- Cart runtime: Shop changed exactly from `$0.00 / 0 ITEMS` to `$12.95 / 1 ITEM`; label became `Cart, 1 item, subtotal $12.95`; no storage, network or runtime side effects. Home cart trigger remained visible.
- Source state: exact six bars and ruled colour order on Home and Shop; Home 15 and Shop 22 products; no 24-product catalogue; 200+ wording preserved; all named testimonial, fact and elixir HOLDs preserved.
- `git diff --check` on the six WIP pages exited 0 with no output.

## Production freeze

- Immutable deployment: `maplemoonbuild20260813-7vjf2m50b-handtomouses-projects.vercel.app`
- Deployment ID: `dpl_G2LER2awaqyFtGRCcTserXbNynct`; target `production`; status `Ready`.
- Production homepage before and after: 208556 bytes, MD5 `6197879a5ca9d3ed0452773abc0bbeb4`, SHA-256 `b936b5bb4856cdd6134e5b15bce5dfc3b353c1d442fd1a418180b35b8fa10356`; byte comparison exited 0.

## Preserved acquisition attempts

- `source-acquisition-attempt1.json` records three verifier-only assumption mismatches: case-folded control total, a JavaScript-escaped bundle string and a source marker count. The independent assertions were corrected to the actual positive controls without changing the required candidate state; the full acquisition rerun passed.
- The first sandboxed real-Chrome launch ended before page acquisition with `SIGABRT/EPERM`; the same harness was rerun in the permitted browser context. This was not classified as a candidate failure.
- `runtime-results-attempt1.json` records the Shop cart false negative. The observed state was already correct, but the verifier compared uppercase `innerText` with a case-sensitive regex. Only the predicate flags changed to case-insensitive; the full browser/runtime matrix was rerun and passed with the same exact monetary and quantity assertions.

## Preserved holds and residual risk

- The exact authorised pseudonym mapping for Natasha, Janice and Acacia is absent; no testimonial approval is inferred.
- Exact replacement authority for the remaining cacao-butter process and FAQ facts is absent; both occurrences remain held.
- The source map has 68 rows although packet/ALIGN prose refers to 76; no phantom rows were created.
- The homepage comparison fact-held rows remain unchanged.
- Approved elixir v4 imagery remains intentionally unwired pending matched no-upscale exports.
- Local acquisition routed root CSS requests to the existing WIP CSS files; no source or style file was edited.
