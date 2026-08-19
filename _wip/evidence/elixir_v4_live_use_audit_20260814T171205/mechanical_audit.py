#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont
from scipy import ndimage

HERE = Path(__file__).resolve().parent
SOURCE = Path("/Users/handtomouse/.codex/visualizations/2026/08/13/019ffd5b-edd2-7b23-8780-453f9b67a532/maplemoon-product-corrections-20260814/assets")
PURE = SOURCE / "elixir_pure_same_size_clean_edges_v4.png"
SPICED = SOURCE / "elixir_spiced_same_size_clean_edges_v4.png"
MASK = SOURCE / "elixir_clean_shared_alpha_v4.png"
WIRED_PURE = Path("/Users/handtomouse/maplemoon_build_20260813/assets/product_shots/elixir_plain.webp")
WIRED_SPICED = Path("/Users/handtomouse/maplemoon_build_20260813/assets/product_shots/elixir_spiced.webp")
EXPECTED = {
    PURE: "70f93f414902ae1b10e7ae1416954348aa20bd1d6950e37d05979b4e4aa9eb93",
    SPICED: "414f727e84ca0dc24749b10b1092f4618e9f9fc9b954304442a7a0a8779749bb",
    MASK: "39d6ca8c5539d2662703dbe7fa4795c10a30172b39574c487c806ad2d7fe5850",
    WIRED_PURE: "4398f43fcc7ff571f4eea4643e078f8416e6921f4e979f5bf31e53338e04916a",
    WIRED_SPICED: "9b92c0f0a0cc11b11aa9a5fa4cb7683b420db373e556c74adcb1ba576ffe1163",
}


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def bbox(alpha: np.ndarray) -> list[int]:
    ys, xs = np.where(alpha > 0)
    return [int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1]


def alpha_metrics(path: Path) -> tuple[dict, np.ndarray, Image.Image]:
    original = Image.open(path)
    rgba = original.convert("RGBA")
    data = np.asarray(rgba)
    alpha = data[:, :, 3]
    bounds = bbox(alpha)
    visible = alpha > 0
    labels, count = ndimage.label(visible, structure=np.ones((3, 3), dtype=np.uint8))
    component_sizes = np.bincount(labels.ravel())[1:]
    x0, y0, x1, y1 = bounds
    transparent = alpha[y0:y1, x0:x1] == 0
    holes_labeled, holes_total = ndimage.label(transparent, structure=np.ones((3, 3), dtype=np.uint8))
    exterior = set(np.unique(np.concatenate((holes_labeled[0], holes_labeled[-1], holes_labeled[:, 0], holes_labeled[:, -1]))).tolist())
    interior_holes = [index for index in range(1, holes_total + 1) if index not in exterior]
    metrics = {
        "path": str(path),
        "source_mode": original.mode,
        "canvas": list(original.size),
        "bbox_xyxy": bounds,
        "visible_width_height": [x1 - x0, y1 - y0],
        "centreline_x": (x0 + x1) / 2,
        "baseline_y_exclusive": y1,
        "alpha_min_max": [int(alpha.min()), int(alpha.max())],
        "alpha_unique_values": int(np.unique(alpha).size),
        "transparent_pixels": int((alpha == 0).sum()),
        "partial_alpha_pixels": int(((alpha > 0) & (alpha < 255)).sum()),
        "opaque_pixels": int((alpha == 255).sum()),
        "visible_components_8_connected": int(count),
        "largest_component_pixels": int(component_sizes.max()),
        "interior_transparent_holes": len(interior_holes),
        "touches_canvas_edge": bool(visible[0].any() or visible[-1].any() or visible[:, 0].any() or visible[:, -1].any()),
    }
    return metrics, alpha, rgba


def synthetic_controls() -> dict:
    base = np.zeros((20, 20), dtype=np.uint8)
    base[4:16, 5:15] = 255

    clipped = base.copy()
    clipped[0:2, 8:12] = 255
    clipping_detected = bool(clipped[0].any() or clipped[-1].any() or clipped[:, 0].any() or clipped[:, -1].any())

    stray = base.copy()
    stray[1, 1] = 255
    _, stray_components = ndimage.label(stray > 0, structure=np.ones((3, 3), dtype=np.uint8))

    holed = base.copy()
    holed[8:12, 8:12] = 0
    bounds = bbox(holed)
    x0, y0, x1, y1 = bounds
    bg = holed[y0:y1, x0:x1] == 0
    hole_labels, hole_total = ndimage.label(bg, structure=np.ones((3, 3), dtype=np.uint8))
    exterior = set(np.unique(np.concatenate((hole_labels[0], hole_labels[-1], hole_labels[:, 0], hole_labels[:, -1]))).tolist())
    holes_detected = sum(1 for index in range(1, hole_total + 1) if index not in exterior)

    mismatch = base.copy()
    mismatch[4, 5] = 254
    alpha_mismatch_detected = not np.array_equal(base, mismatch)

    halo_rgba = np.zeros((20, 20, 4), dtype=np.uint8)
    halo_rgba[5:15, 5:15] = [235, 235, 235, 255]
    halo_rgba[4, 5:15] = [0, 0, 0, 96]
    halo_rgba[15, 5:15] = [0, 0, 0, 96]
    halo_rgba[5:15, 4] = [0, 0, 0, 96]
    halo_rgba[5:15, 15] = [0, 0, 0, 96]
    rgba = halo_rgba.astype(np.float32)
    alpha = rgba[:, :, 3:4] / 255.0
    white = rgba[:, :, :3] * alpha + 255 * (1 - alpha)
    halo_edge = white[(halo_rgba[:, :, 3] > 0) & (halo_rgba[:, :, 3] < 255)]
    halo_detected = bool(halo_edge.mean() < 220)

    passed = clipping_detected and stray_components == 2 and holes_detected == 1 and alpha_mismatch_detected and halo_detected
    return {
        "pass": passed,
        "clipping_canary_detected": clipping_detected,
        "stray_component_canary_components": int(stray_components),
        "interior_hole_canary_detected": int(holes_detected),
        "alpha_mismatch_canary_detected": alpha_mismatch_detected,
        "dark_halo_canary_detected": halo_detected,
        "dark_halo_canary_white_composite_mean": round(float(halo_edge.mean()), 3),
    }


def render_contact_sheet(items: list[tuple[str, Image.Image]]) -> None:
    tile = 360
    label_h = 54
    backgrounds = [("white", (255, 255, 255)), ("neutral grey", (127, 127, 123)), ("black", (5, 5, 5))]
    canvas = Image.new("RGB", (tile * 3, (tile + label_h) * len(items)), (24, 24, 22))
    draw = ImageDraw.Draw(canvas)
    font = ImageFont.load_default(size=18)
    for row, (name, image) in enumerate(items):
        for col, (background_name, colour) in enumerate(backgrounds):
            stage = Image.new("RGBA", (tile, tile), colour + (255,))
            fit = image.copy()
            fit.thumbnail((tile - 24, tile - 24), Image.Resampling.LANCZOS)
            x = (tile - fit.width) // 2
            y = row * (tile + label_h) + (tile - fit.height) // 2
            canvas.paste(stage.convert("RGB"), (col * tile, row * (tile + label_h)))
            canvas.paste(fit, (col * tile + x, y), fit)
            draw.rectangle((col * tile, row * (tile + label_h) + tile, (col + 1) * tile, (row + 1) * (tile + label_h)), fill=(24, 24, 22))
            draw.text((col * tile + 12, row * (tile + label_h) + tile + 12), f"{name} / {background_name}", fill=(245, 241, 232), font=font)
    canvas.save(HERE / "edge_backdrop_contact_sheet.png")


def main() -> None:
    hashes = {str(path): {"expected": expected, "actual": sha256(path)} for path, expected in EXPECTED.items()}
    pure_metrics, pure_alpha, pure_rgba = alpha_metrics(PURE)
    spiced_metrics, spiced_alpha, spiced_rgba = alpha_metrics(SPICED)
    mask_image = Image.open(MASK)
    mask_data = np.asarray(mask_image.convert("L"))
    wired = []
    for name, path in (("pure", WIRED_PURE), ("spiced", WIRED_SPICED)):
        original = Image.open(path)
        rgba = original.convert("RGBA")
        a = np.asarray(rgba)[:, :, 3]
        wired.append({
            "sku": name,
            "path": str(path),
            "source_mode": original.mode,
            "canvas": list(original.size),
            "bbox_xyxy": bbox(a),
            "visible_width_height": [bbox(a)[2] - bbox(a)[0], bbox(a)[3] - bbox(a)[1]],
        })

    controls = synthetic_controls()
    required = {
        "all_hashes_match": all(value["expected"] == value["actual"] for value in hashes.values()),
        "v4_rgba": pure_metrics["source_mode"] == "RGBA" and spiced_metrics["source_mode"] == "RGBA",
        "same_canvas_1254": pure_metrics["canvas"] == [1254, 1254] and spiced_metrics["canvas"] == [1254, 1254],
        "exact_586x977_bounds": pure_metrics["visible_width_height"] == [586, 977] and spiced_metrics["visible_width_height"] == [586, 977],
        "same_bbox": pure_metrics["bbox_xyxy"] == spiced_metrics["bbox_xyxy"] == [334, 107, 920, 1084],
        "same_alpha": bool(np.array_equal(pure_alpha, spiced_alpha) and np.array_equal(pure_alpha, mask_data)),
        "one_component_each": pure_metrics["visible_components_8_connected"] == spiced_metrics["visible_components_8_connected"] == 1,
        "zero_interior_holes": pure_metrics["interior_transparent_holes"] == spiced_metrics["interior_transparent_holes"] == 0,
        "not_clipped": not pure_metrics["touches_canvas_edge"] and not spiced_metrics["touches_canvas_edge"],
        "positive_controls": controls["pass"],
    }
    render_contact_sheet([("v4 pure", pure_rgba), ("v4 spiced", spiced_rgba)])
    result = {
        "status": "PASS" if all(required.values()) else "FAIL",
        "hashes": hashes,
        "pure_v4": pure_metrics,
        "spiced_v4": spiced_metrics,
        "shared_mask": {"path": str(MASK), "source_mode": mask_image.mode, "canvas": list(mask_image.size), "min_max": [int(mask_data.min()), int(mask_data.max())], "unique_values": int(np.unique(mask_data).size)},
        "wired_candidate_comparison": wired,
        "positive_controls": controls,
        "required_checks": required,
        "visual_inspection_required": "Derived white/neutral-grey/black contact sheet must be independently inspected; numeric checks do not certify package text.",
    }
    (HERE / "mechanical_results.json").write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")
    print(f"ELIXIR_V4_MECHANICAL {result['status']} hashes={sum(v['expected']==v['actual'] for v in hashes.values())}/{len(hashes)} bbox=pure:{pure_metrics['bbox_xyxy']} spiced:{spiced_metrics['bbox_xyxy']} size=586x977 alpha_equal={required['same_alpha']} components=1/1 holes=0/0 controls={controls['pass']}")


if __name__ == "__main__":
    main()
