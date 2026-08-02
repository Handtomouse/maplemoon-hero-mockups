# Wave 1D Phase 2 v5 correction review

Status: `pending_human_review`

Scope: one approved correction batch derived from the three selected v4B compositions. The only botanical appearance reference was `assets/licensed/carob_pods_macro.jpg`. These are generic generated carob pods and generic accessories. They are not exact MapleMoon products, recipes, packaging or client photography.

## Review contact sheet

![Wave 1D ritual shadow v5 contact sheet](ritual_shadow_v5_contact_sheet.png)

## Source integrity

| Source | Role | Dimensions | SHA-256 |
|---|---|---:|---|
| `assets/licensed/carob_pods_macro.jpg` | only botanical appearance reference | 7360×4912 | `0426510e9b7446415af8884ad7969d99d26de7a3cbcbedb0c7ca121379f31922` |
| `ritual_after_dinner_shadow_v4b.png` | after-dinner composition authority | 1672×941 | `99089c8931b5ba2fed88c4b01bd1f561136debe9262af56e594bfcf2d430a95e` |
| `ritual_afternoon_shadow_v4b.png` | afternoon composition authority | 1672×941 | `10d265cdebbd65bc7f1d74d9c8dae33a24adb0d5798811114a4233cb9f1d4ce1` |
| `ritual_tea_night_shadow_v4b.png` | tea-at-night composition authority | 1672×941 | `ba1b5f4f0029876490952ba46d391470f1c68bec18ce268f9a1f87c60dc16df7` |

## Full-resolution visual QA

| Candidate | Intended ritual tile | Dimensions | SHA-256 | v5 versus v4B | Known limitations | Status |
|---|---|---:|---|---|---|---|
| `ritual_after_dinner_shadow_v5.png` | After dinner | 1672×941 | `02111e2c50cda5824e56b0070baafbfd24201493565acec6aba4e9fd53f0b4dd` | Broad glossy longitudinal highlights are reduced to narrower muted highlights. Skin has finer wrinkles, dry ridges and more irregular edges while the dish, crop, blue field and shadow remain stable. | Foreground pod remains cleaner and more elongated than examples in the botanical reference; rear pods are partly obscured. Dish is generated and unbranded. | `pending_human_review` |
| `ritual_afternoon_shadow_v5.png` | Afternoon | 1672×941 | `84e2f068fb9467c20a2a5ce039c401fc4acce428e02b334f78f00aad376af734` | The shiny inflated v4B surface is replaced by a darker, drier, irregularly wrinkled pod with less specular glare. Long shadow, negative space and dish position remain stable. | Tip and stem remain model-generated approximations. Dish is generated and unbranded. | `pending_human_review` |
| `ritual_tea_night_shadow_v5.png` | Tea at night | 1672×941 | `965f2fd8ba35dca16ce025456a783f6179afd6b78e3f1155b10f489695f45daf` | Repeated smooth arcs and bright highlights are reduced. The two pods now differ in curvature, thickness, taper, wrinkles and end details while the cup, crop and pale-blue lighting remain stable. | Pods retain a deliberately parallel arrangement from v4B. Cup and atmospheric steam are generated, unbranded and not evidence of a MapleMoon recipe or serving ritual. | `pending_human_review` |
| `ritual_shadow_v5_contact_sheet.png` | Human review overview | 1248×2172 | `7893d26225daa58858aedf56459c6fcaa4121e1ce948cd38f77bab826ab8ae4b` | Deterministic vertical montage of the three saved v5 files. | Scaled overview only; inspect individual PNGs for pixel-level decisions. | `pending_human_review` |

All three candidates were freshly inspected at original resolution. Hard exclusions passed visually: no packaging, wrappers, logos, labels, readable text, claims, people, hands, branches, foliage, flowers, linen, wood boards, farmhouse styling, patterns, marble, glossy plastic, ornate objects, recognisable designer forms, watermark or border.

The exact built-in image-generation prompts and machine-readable records are in `ritual_shadow_v5_manifest.json`.
