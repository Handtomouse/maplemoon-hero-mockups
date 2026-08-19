# Lane F R2 independent certification

Verdict: **PASS**

The independently reconstructed source checks and fresh browser evidence agree with the admitted Lane F R2 state. No candidate, FAQ, source, media, lock, deploy, production, or client-contact action was taken.

## Source and control-plane result

- Phase-start gate: `PASS packet=MAPLEMOON-LANE-F-INDEPENDENT-CERT-20260816T143809 phase=start scope=2`
- Predecessor replay: `PASS packet=MAPLEMOON-LANE-F-REBUILD-R2-20260816T141330 phase=complete changed=4`; `PASS packet=MAPLEMOON-LANE-F-REBUILD-R2-20260816T141330 phase=promote changed=4`
- Acquisition rerun: `POSITIVE_CONTROL needle='Maple Moon' count=64 corpus=3`; `SUMMARY phase=acquisition pass=76 fail=0 total=76`
- Close: `POSITIVE_CONTROL needle='Maple Moon' count=64 corpus=3`; `SUMMARY phase=close pass=76 fail=0 total=76`
- All seven packet-pinned hashes matched at acquisition and close. Both exact Lane F locks remained held by packet `MAPLEMOON-LANE-F-REBUILD-R2-20260816T141330` with no release or post hash.
- `git diff --check -- _wip/our-story.WIP.html _wip/carob-story.WIP.html` exited 0 with no output.

The source verifier independently proved the exact 01/02 chapter order and all named cuts; accepted pair hero, Range copy/link and location; zero Frame 55 or rejected individual-founder bindings; exactly two accessible 4:5 Nate-selection placeholders; no published Nate-only option; exact Carob intro with `used`; `cacao` and comparison/process semantics; `FROM CRUNCHY TO CREAMY`; no in-page Carob FAQ; unchanged separate FAQ; healthy local assets; and valid JSON-LD boundaries.

## Fresh browser result

Final decode-stabilised run:

```text
PASS page=our-story width=390 http=200 client=390 scroll=390 body_height=5246 screenshot=390x5245/1083840B text=3100 images=2 broken=0 focus=16/0 jsonld=4/0 console=0 page_errors=0 request_failures=0 bad_responses=0
PASS page=our-story width=1440 http=200 client=1440 scroll=1440 body_height=4154 screenshot=1440x4153/2034814B text=3145 images=2 broken=0 focus=20/0 jsonld=4/0 console=0 page_errors=0 request_failures=0 bad_responses=0
PASS page=carob-story width=390 http=200 client=390 scroll=390 body_height=2549 screenshot=390x2549/822434B text=1242 images=3 broken=0 focus=9/0 jsonld=4/0 console=0 page_errors=0 request_failures=0 bad_responses=0
PASS page=carob-story width=1440 http=200 client=1440 scroll=1440 body_height=1720 screenshot=1440x1720/1460719B text=1318 images=3 broken=0 focus=13/0 jsonld=4/0 console=0 page_errors=0 request_failures=0 bad_responses=0
SUMMARY pass=4 fail=0 total=4
```

All four final full-page screenshots were visually inspected: nonblank, full-width, unclipped and fully painted. Our Story shows the accepted pair hero, exact 01/02 structure, two visible 4:5 founder holds and Range CTA. Carob Story shows the exact intro, paired comparison, exact process, Crunchy-to-Creamy section, no FAQ and fully loaded imagery.

## Production freeze

Read-only acquisition and close checks both resolved the alias to immutable deployment `maplemoonbuild20260813-7vjf2m50b-handtomouses-projects.vercel.app`, deployment ID `dpl_G2LER2awaqyFtGRCcTserXbNynct`, target `production`, status `Ready`. The authenticated homepage returned `HTTP=200 BYTES=208556` both times. Before/after SHA-256 was `b936b5bb4856cdd6134e5b15bce5dfc3b353c1d442fd1a418180b35b8fa10356`, MD5 was `6197879a5ca9d3ed0452773abc0bbeb4`, and byte comparison exited 0. The production alias was unchanged.

## Preserved verifier/acquisition attempts

Earlier artifacts are preserved rather than rewritten:

- `source-acquisition.json`: the first verifier incorrectly expected FAQ JSON-LD, while the pinned unchanged FAQ intentionally contains zero JSON-LD. The exact zero boundary was then asserted without changing candidate state.
- `browser-results.json`: the first harness treated CSS-uppercased placeholder text as case-sensitive and required mobile comparison row headers to share the value-cell top. Both were predicate errors; accessibility and paired-value alignment stayed strict.
- `browser-results-rerun.json`: all assertions passed, but screenshots retained the last focus outline.
- `browser-results-final.json`: the focus artifact was removed, but one lazy image intermittently had not painted at capture time despite valid natural dimensions.
- `browser-results-clean.json`: image decoding, animation settlement and repaint were awaited; all four cases passed and were visually inspected.

These are verifier/acquisition corrections, not candidate failures. The local Typekit request was fulfilled as an empty successful stylesheet in the isolated harness; layout therefore uses local/system fallback typography. Founder selects and the alternate grove/studio option remain deliberately unpublished pending Nate's choice.
