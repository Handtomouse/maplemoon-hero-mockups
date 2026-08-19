# MapleMoon header and powder update

<!-- CONTROL-PLANE:BEGIN -->
{
  "schema": "maplemoon-packet/v2",
  "packet_id": "MAPLEMOON-HEADER-POWDER-UPDATE-20260814T140152",
  "worker_thread_id": "/root/header_powder_update",
  "state": "ready",
  "objective": "Implement only the authorised Stockists mobile photographic-header treatment, the larger edge-blended Carob Story hero image, and the verified loose powder pile in the undeployed MapleMoon candidate, with full rendered evidence and no production action.",
  "approval": "The MapleMoon Boss delegated this exact reversible implementation package after Nate authorised continued updates. Production, client messaging, FAQ, Our Story, founder imagery and blocked product swaps remain forbidden.",
  "ownership": "This worker owns only the exact writable paths below. It is not alone in the project and must preserve all unrelated or concurrent work.",
  "readable_paths": [
    "maplemoon-website/AGENTS.md",
    "maplemoon-website/docs/orchestration/SIDECHAT_RECEIPT_GATE.md",
    "UFC/ops/bus/maplemoon/TREE_OWNERSHIP_20260814.md",
    "UFC/ops/bus/maplemoon/CHECKPOINT_20260814_0830_photography.md",
    "maplemoon_cutouts_20260814/png/carob_powder_PILE.png",
    "maplemoon_build_20260813/shop.html",
    "maplemoon_build_20260813/homepage.html",
    "maplemoon_build_20260813/our-story.html",
    "maplemoon_build_20260813/faq.html",
    "maplemoon_build_20260813/pure-carob-bar.html"
  ],
  "writable_paths": [
    "maplemoon-website/docs/orchestration/packets/MAPLEMOON-HEADER-POWDER-UPDATE-20260814T140152.md",
    "maplemoon-website/docs/orchestration/reviews/MAPLEMOON-HEADER-POWDER-UPDATE-20260814T140152.json",
    "maplemoon-website/_wip/evidence/header_powder_update_20260814T140152",
    "maplemoon_build_20260813/stockists.html",
    "maplemoon_build_20260813/carob-story.html",
    "maplemoon_build_20260813/assets/product_shots/powder_roasted.webp"
  ],
  "source_resolution": [
    "Stockists already binds the approved silhouette_closeup.webp through .sp-head::after but disables it at max-width 560px; preserve the photo at a deliberate controlled opacity and crop at measured 390 without obscuring the title or finder.",
    "Carob Story already binds carob_branch_hero.webp, but later CSS restores border, radius, shadow and a contained card; enlarge the image field and use a CSS alpha mask/fade into the sampled page field with no card chrome.",
    "Shop already binds powder_roasted.webp by filename; replace only that asset with an alpha-preserving WebP derived from the verified carob_powder_PILE.png, so shop.html requires no mutation."
  ],
  "verify": [
    "phase-start gate passes against a timestamped non-overwriting checkpoint before any admitted build-file write",
    "affected routes render with real CSS at measured 390, 900 and 1440 CSS px, with saved screenshots",
    "Stockists photo remains visible at 390 while its title and finder remain readable and unobstructed",
    "Carob Story hero has no border, radius, shadow or hard image edge and does not overlap its text",
    "powder asset is nonblank, has clean transparent edges, and reads as a loose pile when composited on the actual Shop card background",
    "all affected image requests return HTTP 200 with nonzero natural dimensions",
    "no affected route has horizontal overflow or browser error overlay",
    "all seven MapleMoon routes pass the existing preflight and relevant syntax/control checks",
    "completion receipt contains exact pre/post hashes, command results, screenshots and checkpoint path; completion gate passes"
  ],
  "stop": [
    "phase-start receipt gate fails or an admitted source changes before mutation",
    "the requested outcome requires FAQ, Our Story, founder imagery, unsupported product replacements, copy changes or another path",
    "real-CSS rendering reveals text overlap, hard edges, blank imagery, broken assets or horizontal overflow that cannot be corrected within the admitted paths",
    "any deploy, production, promotion, alias, send, upload, commit or client-contact action is requested"
  ],
  "forbidden_actions": [
    "edit any path outside writable_paths",
    "edit FAQ, Our Story, founder imagery or blocked product imagery",
    "deploy, use --prod, promote, move an alias, send, upload, commit or contact a client",
    "alter claims, product copy, prices, catalogue bindings or stockist data"
  ],
  "requires_visual_evidence": true,
  "next_reviewer": "MapleMoon Boss for independent certification; production remains Nate-only"
}
<!-- CONTROL-PLANE:END -->

## Output

Return only the exact changed paths, real verification output, evidence and checkpoint locations, and readiness for independent certification. No deployment or promotion is authorised.
