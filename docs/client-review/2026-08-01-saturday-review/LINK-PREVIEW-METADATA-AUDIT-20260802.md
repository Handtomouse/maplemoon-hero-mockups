# MapleMoon link-preview and metadata audit

**Status:** local static audit PASS; forwardable-link readiness HOLD  
**Audited artifact:** six clean pages under `staging-v1/clean/`  
**No pages or assets changed.**

## Verdict

The frozen clean package has a consistent title, SVG favicon reference, theme colour and `noindex,nofollow` on all six pages. It is not ready for a forwardable link preview because:

- Our Story and Carob Story have no meta description;
- none of the six pages has canonical, Open Graph or Twitter-card metadata;
- no approved Open Graph image is identified;
- there is no raster favicon/app-icon set, apple-touch icon or web manifest in the clean asset surface;
- exact public URL, access/expiry model and robots/canonical disposition remain unapproved;
- some existing descriptions contain product, process or stockist language that must be revalidated before reuse in a social preview.

The current `noindex,nofollow` treatment is appropriate for the held local/review state. It must not be removed merely to make previews work.

## Six-page inventory

| Page | Title | Description | Favicon | Theme colour | Robots | Canonical | Open Graph | Twitter |
|---|---|---|---|---|---|---|---|---|
| Homepage | Present | Present, factual review required | Present | Present | `noindex,nofollow` | Missing | Missing | Missing |
| Shop | Present | Present, product-claim review required | Present | Present | `noindex,nofollow` | Missing | Missing | Missing |
| Our Story | Present | Missing | Present | Present | `noindex,nofollow` | Missing | Missing | Missing |
| Carob Story | Present | Missing | Present | Present | `noindex,nofollow` | Missing | Missing | Missing |
| Stockists | Present | Present, stockist-number and provisional-language review required | Present | Present | `noindex,nofollow` | Missing | Missing | Missing |
| FAQ | Present | Present | Present | Present | `noindex,nofollow` | Missing | Missing | Missing |

## Favicon evidence

- All six pages reference `assets/mm_logo_icon_blk.svg`.
- The referenced file exists in the clean package.
- SHA-256: `aaffe3fbc7f38fb73f04e09d8b248e9c12184f79308dd17139ede6f26540a988`.
- SVG viewBox: `0 0 252.4 415.8`.
- No clean-package apple-touch icon, PNG/ICO fallback or web manifest was found by the targeted inventory.

The tall SVG may still render as a browser tab icon, but crop/legibility at 16, 32, 48 and 180 pixels is unproven. A future asset packet must render those sizes before acceptance.

## Copy safety findings

Do not automatically reuse the current page descriptions as `og:description`:

- Homepage includes process language that requires claims review before external preview use.
- Shop includes range and dietary claims that must map to approved product evidence.
- Stockists includes a count and provisional wording that should not become a public social-preview promise without current evidence.
- Our Story and Carob Story need concise, approved descriptions written from evidence-backed page content.

No replacement copy is proposed by this audit.

## Open Graph image gate

The repository contains many hero, logo and generated/candidate assets. File presence does not prove source provenance, client approval, crop suitability or permission for a social preview. Therefore no image is selected.

A future image decision packet must prove:

1. source and approval status;
2. truthful product/people representation;
3. no unsupported text or claim embedded in the image;
4. safe 1.91:1 crop, with a 1200 by 630 master recommended for testing;
5. useful appearance with image-only, title and description surfaces;
6. contrast and legibility where text is intentionally included;
7. file type, byte size and absolute HTTPS URL behavior on the exact host.

## Future implementation contract

Only after Nate approves the exact artifact, final URL, audience, access route and copy/image direction:

- add one approved description to each missing page;
- add absolute `og:title`, `og:description`, `og:type`, `og:url` and `og:image` values;
- add matching Twitter card fields only where the intended channels need them;
- add canonical URLs only after the final routing model is known;
- preserve `noindex,nofollow` for private review unless Nate and the SEO owner explicitly approve a different disposition;
- add verified favicon fallbacks and apple-touch icon sizes if supported by the final host;
- test the exact HTTPS artifact in each intended message surface without exposing internal or authenticated URLs.

## External validation HOLD

No link-preview fetch, public URL, deployment, upload, message, screenshot or share was performed. Link-preview validation requires fresh approval for the exact artifact, destination and channel after Nate wakes.

## One next action

When Nate is awake, show one decision card for the approved Open Graph image direction and factual preview copy source. Do not edit the frozen package before that decision.
