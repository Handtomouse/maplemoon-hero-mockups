# R4 browser QA — required-check failure

The complete 35-case run reached all seven routes at 390, 768, 900, 1024 and
1440 CSS pixels. Every route returned HTTP 200, every root width matched its
viewport, and all authored images completed with nonzero natural dimensions.
Fourteen full-page screenshots were written.

The packet cannot complete because required browser checks failed:

- All routes intermittently failed the inherited Adobe Typekit request to
  `p.typekit.net` with `net::ERR_NAME_NOT_RESOLVED`. This is external font
  delivery owned by the Styles task and was not waived or stubbed.
- Home and Pure Carob Bar emitted the inherited runtime console error
  `MapleMoon chrome: mount contract is incomplete; navigation left visible.`
  This is a style/chrome integration defect and is outside R4 content authority.
- The FAQ assertion counted two exact-text DOM matches, so its selector is not
  sufficient to prove one source question. The exact source/preflight check did
  pass, but the required browser assertion remains failed and was not weakened.

Per the packet stop rule, no style, runtime, font, FAQ, source, deploy or
production correction was attempted; the screenshots were not promoted as
passing visual evidence.
