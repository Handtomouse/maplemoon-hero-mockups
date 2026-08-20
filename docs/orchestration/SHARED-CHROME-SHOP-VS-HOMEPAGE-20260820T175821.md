# Shared chrome: shop vs homepage — structural check, 20 Aug 2026 17:58 AEST

Gates the shared-chrome rollout to the remaining four pages. **Structural half only.**
The visual eyeball is Nate's and has not been done.

## What was compared

The `<header data-mm-chrome>` block in `_wip/shop.WIP.html` (wired 20 Aug 17:10, commit
`ee98dbd`) against the same block in `_wip/homepage_real_1_lead_photo.WIP.html`.
Page-specific `id` and the active-link markers (`class="on"`, `aria-current="page"`) were
normalised out before comparing, since those are correctly per-page.

## Result: structure matches, class namespace does NOT

| Check | Result |
|---|---|
| Tag sequence | **IDENTICAL** — 17 tags both sides, same order |
| Normalised string similarity | 0.820 |
| Header length | homepage 1,145 chars · shop 1,204 chars |

**The wiring landed structurally.** Same elements, same nesting, same order.

## ⚠ Two divergences that gate the rollout

**1. Split class namespace.** The homepage uses a `wf-p*` prefix where the shop uses `sp-*`:

| Homepage | Shop |
|---|---|
| `wf-ptop mm-site-header mm-site-header--home` | `sp-top mm-site-header` |
| `wf-pnav r` | `sp-nav r` |
| `wf-pcart mm-icon-control` | `sp-cart mm-icon-control` |

Both carry the shared `mm-*` classes, so the shared layer is consistent. The legacy prefix
underneath is not. **Before rolling to four more pages, decide which prefix is the target** —
otherwise the rollout propagates whichever page it was copied from and the split widens.

**2. Shop carries behaviour the homepage lacks.** `data-cart-toggle`, `data-cart-count`, and
richer aria-labels (`", Australian dollars"`, `", subtotal $0.00"`). The homepage header has
`data-mm-cart-toggle` but not the cart-count or the fuller labels. Either the homepage is
behind, or the shop's cart wiring is deliberately shop-only. **Unresolved — needs a ruling.**

Also: the homepage anchors its home link to `#top`; the shop anchors to `/`. Correct per page,
noted so a mechanical rollout does not flatten it.

## Disposition

Structural gate: **PASS**. Namespace gate: **HOLD**, pending the prefix ruling above.
Visual comparison: **NOT DONE** — Nate's call.
