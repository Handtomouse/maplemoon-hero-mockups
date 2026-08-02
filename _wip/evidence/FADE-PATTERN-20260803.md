# Homepage fade pattern — 2026-08-03

**Status:** published W1-A reference for W2. Apply this treatment; do not create a second fade language.

## Measured mechanism

The homepage sections are transparent; their apparent seams are **not** borders. The page gradient
is continuous and a full-bleed photo ends abruptly against it.

The working hero dissolve has two distinct layers:

1. `.wf-phero .bg` uses a vertical `mask-image` to make the hero photograph transparent through
   the hand-off area (`--hb-hold` to `--hb-end`). The page wash is therefore visible below it.
2. `.wf-phero .fog` is a separate `500px` absolutely-positioned bridge: two radial gradients,
   `filter:blur(16px)`, no mask. It softens the photographic hand-off but does not perform it.

`#carob` previously used a full-bleed `.pic img` that reached its box edge. `#story` already
used an image mask, but its vertical stop ended before the lower boundary. The homepage source
now uses the same treatment on both axes: preserve a fully legible centre, then make the photo
transparent before every visible image edge; put a blurred, page-coloured wash behind/over the
hand-off where the transition needs extra atmosphere.

## Canonical pattern

Apply the values and layer order below verbatim, substituting only the page-specific section and
image selectors. The section's opaque colour values must be sampled from that page's existing
page wash; do not introduce a new background colour.

```css
/* 1. Let the existing page wash show through the hand-off. */
.SECTION {
  isolation:isolate;
  overflow:visible;
  z-index:6;
  background:transparent;
}

/* 2. Keep the photo legible in its centre; dissolve it before the visible edges. */
.SECTION .PHOTO {
  -webkit-mask-image:
    linear-gradient(90deg, transparent 0, #000 18%, #000 100%),
    linear-gradient(180deg, transparent 0, #000 22%, #000 74%, transparent 100%);
  mask-image:
    linear-gradient(90deg, transparent 0, #000 18%, #000 100%),
    linear-gradient(180deg, transparent 0, #000 22%, #000 74%, transparent 100%);
  -webkit-mask-composite:source-in;
  mask-composite:intersect;
}

/* 3. Bridge the boundary with the local page-wash colour, never a line or a card. */
.SECTION::before {
  content:"";
  position:absolute;
  inset:-120px 0 auto;
  z-index:1;
  height:340px;
  pointer-events:none;
  background:linear-gradient(
    180deg,
    rgba(PAGE_WASH,0) 0%,
    rgba(PAGE_WASH,.64) 24%,
    rgba(PAGE_WASH,.82) 44%,
    rgba(PAGE_WASH,.28) 76%,
    rgba(PAGE_WASH,0) 100%
  );
  filter:blur(18px);
  transform:scaleY(1.08);
}
```

For the lower edge, use the same page-wash gradient in an `::after` bridge, or extend the
vertical image mask so its final transparent stop lands before the section boundary. The result
must be symmetrical: no top-only fade.

## Required responsive values

At `max-width:900px`, retain the same geometry with `top:-72px`, `height:220px`, and
`blur(13px)`. The photo mask becomes vertical-only:

```css
linear-gradient(180deg, transparent 0, #000 20%, #000 82%, transparent 100%)
```

Do not use borders, opaque section fills, or an unmasked full-bleed photograph to solve the
seam. Verify the actual rendered image at 1440, 834, and 390 after waiting for `document.images`
and scrolling top-to-bottom.

## Homepage implementation location

`_wip/homepage_real_1_lead_photo.WIP.html`, style id
`homepage-seams-fades-20260803`; its page-wash colours are `214,231,239` and `207,225,235`.
The existing hero `.fog` remains unchanged and is the visual reference, not a reusable section
selector.
