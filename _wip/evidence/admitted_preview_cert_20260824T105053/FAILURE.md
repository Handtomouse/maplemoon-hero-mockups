# Admitted preview certification — STOP / FAIL

The canonical builder completed mechanically (`75` files, `14,769,349` bytes,
seven pages, no private directory and no Vercel project link), but the required
private-path scan failed before browser QA:

```text
shop.html:402: imagePath:'/out/image_candidates_20260823/powder_roasted_no_bg.png'
```

`shop.html` uses `p.imagePath || /assets/product_shots/<img>.webp`, so this
development-only override would request a file that is intentionally excluded
from the deploy-safe candidate. The current object already retains
`img:'powder_roasted'`; removing only the derived override would therefore use
the previously admitted `assets/product_shots/powder_roasted.webp` fallback.

The governing packet permits only an Our Story source override and requires STOP
if `/out/` enters the candidate. No correction, browser QA, preflight,
design-system check or deployment was attempted in this packet. The source WIP,
approved powder asset and all `out/` artefacts remain untouched.
