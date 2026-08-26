#!/usr/bin/env python3
"""Build a deterministic source-pixel-only temporary bundle cut-out.

The full-resolution RGBA output preserves every source RGB byte. Only an alpha
channel is added. No inpainting, colour grading, geometry synthesis or object
reconstruction occurs.
"""

from __future__ import annotations

import hashlib
import json
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont


TASK_ROOT = Path(__file__).resolve().parent
OUTPUT_ROOT = TASK_ROOT / "derived"
SOURCE = Path(
    "/Users/handtomouse/.codex/generated_images/"
    "019ffe53-6243-73a2-9d75-e1a072cd07ce/"
    "exec-82159e46-662a-4e9b-af90-0e2c68af52ac.png"
)
EXPECTED_SOURCE_SHA256 = "b7d669130ef5c1482b4d3655e1407885087c884089cfdbadd7b0b5d0c5abdba1"
RNG_SEED = 20260825

PROOF_BACKGROUNDS = {
    "cream": (231, 228, 202),
    "dark": (30, 42, 30),
    "site_blue": (30, 67, 102),
}


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def polygon(points: list[tuple[int, int]]) -> np.ndarray:
    return np.asarray(points, dtype=np.int32)


OBJECTS = [
    {
        "name": "pecan_eclipse_bite",
        "outer": polygon(
            [
                (120, 518), (126, 420), (145, 350), (180, 312),
                (205, 276), (235, 250), (325, 250), (386, 278),
                (423, 326), (452, 405), (466, 488), (450, 533),
                (385, 558), (290, 566), (195, 553),
            ]
        ),
        "cores": [
            polygon([(165, 500), (170, 400), (205, 340), (270, 315), (360, 325), (420, 390), (430, 500), (380, 535), (225, 540)]),
            polygon([(215, 300), (240, 264), (318, 265), (390, 314), (375, 356), (285, 370), (225, 338)]),
        ],
    },
    {
        "name": "crumb_topped_eclipse_bite_upper_unbound",
        "outer": polygon(
            [
                (496, 616), (497, 512), (515, 441), (556, 392),
                (620, 361), (708, 356), (771, 382), (811, 430),
                (835, 500), (839, 574), (817, 622), (753, 650),
                (645, 655), (554, 641),
            ]
        ),
        "cores": [
            polygon([(530, 603), (532, 495), (560, 428), (630, 390), (719, 386), (782, 430), (808, 512), (805, 590), (748, 625), (622, 630)]),
            polygon([(565, 418), (620, 375), (718, 370), (780, 410), (760, 470), (600, 480)]),
        ],
    },
    {
        "name": "crumb_topped_eclipse_bite_lower_unbound",
        "outer": polygon(
            [
                (190, 820), (190, 706), (207, 635), (247, 590),
                (312, 558), (399, 548), (483, 573), (541, 626),
                (574, 696), (584, 784), (563, 837), (500, 868),
                (387, 878), (277, 866), (217, 846),
            ]
        ),
        "cores": [
            polygon([(220, 813), (222, 700), (253, 632), (320, 590), (410, 580), (495, 614), (540, 682), (548, 800), (493, 840), (320, 850)]),
            polygon([(255, 625), (315, 568), (420, 560), (505, 610), (492, 676), (290, 690)]),
        ],
    },
    {
        "name": "salted_caramel_fudge",
        "outer": polygon(
            [
                (856, 494), (854, 316), (875, 252), (922, 218),
                (1030, 190), (1164, 194), (1258, 231), (1320, 286),
                (1346, 365), (1342, 459), (1316, 510), (1234, 550),
                (1115, 574), (1000, 570), (914, 542),
            ]
        ),
        "cores": [
            polygon([(885, 490), (884, 328), (916, 276), (1006, 230), (1155, 222), (1264, 260), (1313, 319), (1318, 448), (1270, 500), (1148, 540), (1008, 535)]),
            polygon([(900, 300), (988, 225), (1148, 208), (1260, 248), (1318, 312), (1280, 395), (1110, 430), (945, 395)]),
        ],
    },
    {
        "name": "goji_coconut_bar",
        "outer": polygon(
            [
                (854, 820), (854, 660), (875, 608), (925, 578),
                (1022, 552), (1185, 536), (1288, 553), (1352, 594),
                (1373, 660), (1376, 790), (1355, 842), (1292, 876),
                (1178, 902), (1044, 908), (932, 886), (878, 853),
            ]
        ),
        "cores": [
            polygon([(883, 808), (882, 670), (912, 620), (1005, 585), (1180, 566), (1298, 585), (1340, 632), (1345, 790), (1300, 835), (1174, 870), (1015, 875), (918, 845)]),
            polygon([(900, 642), (980, 582), (1178, 553), (1302, 576), (1347, 624), (1310, 710), (1110, 750), (930, 720)]),
        ],
    },
]


def make_object_mask(image_bgr: np.ndarray, spec: dict[str, object]) -> np.ndarray:
    height, width = image_bgr.shape[:2]
    grab_mask = np.full((height, width), cv2.GC_BGD, dtype=np.uint8)
    cv2.fillPoly(grab_mask, [spec["outer"]], cv2.GC_PR_FGD)
    for core in spec["cores"]:
        cv2.fillPoly(grab_mask, [core], cv2.GC_FGD)

    background_model = np.zeros((1, 65), np.float64)
    foreground_model = np.zeros((1, 65), np.float64)
    cv2.grabCut(
        image_bgr,
        grab_mask,
        None,
        background_model,
        foreground_model,
        8,
        cv2.GC_INIT_WITH_MASK,
    )
    candidate = np.where(
        (grab_mask == cv2.GC_FGD) | (grab_mask == cv2.GC_PR_FGD),
        255,
        0,
    ).astype(np.uint8)

    contours, _ = cv2.findContours(candidate, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cleaned = np.zeros_like(candidate)
    for contour in contours:
        if cv2.contourArea(contour) >= 40:
            cv2.drawContours(cleaned, [contour], -1, 255, thickness=cv2.FILLED)

    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    cleaned = cv2.morphologyEx(cleaned, cv2.MORPH_CLOSE, kernel)
    return cleaned


def make_binary_mask(image_bgr: np.ndarray) -> tuple[np.ndarray, dict[str, int]]:
    cv2.setNumThreads(1)
    cv2.setRNGSeed(RNG_SEED)
    object_masks: list[np.ndarray] = []
    for spec in OBJECTS:
        object_masks.append(make_object_mask(image_bgr, spec))

    # The products are visibly separated in the source. GrabCut can otherwise
    # classify a few background pixels between close bounding regions as
    # foreground in both masks. Remove only those shared/dilation-bridge pixels
    # to retain the real source gaps rather than joining two products.
    bridge_kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    for first, second in ((1, 2), (3, 4)):
        bridge = cv2.bitwise_and(
            cv2.dilate(object_masks[first], bridge_kernel),
            cv2.dilate(object_masks[second], bridge_kernel),
        )
        object_masks[first][bridge > 0] = 0
        object_masks[second][bridge > 0] = 0

    combined = np.zeros(image_bgr.shape[:2], dtype=np.uint8)
    per_object_pixels: dict[str, int] = {}
    for spec, object_mask in zip(OBJECTS, object_masks, strict=True):
        per_object_pixels[str(spec["name"])] = int(np.count_nonzero(object_mask))
        combined = cv2.bitwise_or(combined, object_mask)
    return combined, per_object_pixels


def inward_soft_alpha(binary_mask: np.ndarray) -> np.ndarray:
    distance_inside = cv2.distanceTransform(binary_mask, cv2.DIST_L2, 5)
    alpha = np.clip(distance_inside / 1.35, 0.0, 1.0)
    return np.rint(alpha * 255.0).astype(np.uint8)


def major_components(alpha: np.ndarray) -> list[dict[str, int]]:
    count, _, stats, _ = cv2.connectedComponentsWithStats(
        np.where(alpha >= 128, 255, 0).astype(np.uint8),
        connectivity=8,
    )
    components: list[dict[str, int]] = []
    for label in range(1, count):
        x, y, width, height, area = [int(value) for value in stats[label]]
        if area >= 1000:
            components.append(
                {"x": x, "y": y, "width": width, "height": height, "area": area}
            )
    return sorted(components, key=lambda item: (item["x"], item["y"]))


def premultiplied_resize(rgba: np.ndarray, width: int) -> np.ndarray:
    source_height, source_width = rgba.shape[:2]
    height = round(source_height * width / source_width)
    alpha = rgba[:, :, 3].astype(np.float32) / 255.0
    premultiplied = rgba[:, :, :3].astype(np.float32) * alpha[:, :, None]
    resized_alpha = cv2.resize(alpha, (width, height), interpolation=cv2.INTER_LANCZOS4)
    resized_premultiplied = cv2.resize(
        premultiplied, (width, height), interpolation=cv2.INTER_LANCZOS4
    )
    resized_alpha = np.clip(resized_alpha, 0.0, 1.0)
    resized_rgb = np.zeros_like(resized_premultiplied)
    nonzero = resized_alpha > 1e-6
    resized_rgb[nonzero] = (
        resized_premultiplied[nonzero] / resized_alpha[nonzero, None]
    )
    return np.dstack(
        [
            np.clip(np.rint(resized_rgb), 0, 255).astype(np.uint8),
            np.clip(np.rint(resized_alpha * 255.0), 0, 255).astype(np.uint8),
        ]
    )


def add_status_banner(image: Image.Image, dark_background: bool) -> None:
    draw = ImageDraw.Draw(image, "RGBA")
    label = "TEMPORARY STAGING  /  REPLACE BEFORE FINAL  /  EDGE PROOF ONLY"
    font = ImageFont.load_default(size=20)
    bbox = draw.textbbox((0, 0), label, font=font)
    text_width = bbox[2] - bbox[0]
    box = (28, 26, 28 + text_width + 34, 74)
    if dark_background:
        draw.rounded_rectangle(box, radius=10, fill=(231, 228, 202, 238))
        text_fill = (30, 42, 30, 255)
    else:
        draw.rounded_rectangle(box, radius=10, fill=(118, 40, 33, 238))
        text_fill = (255, 250, 244, 255)
    draw.text((45, 40), label, font=font, fill=text_fill)


def main() -> None:
    if OUTPUT_ROOT.exists():
        raise SystemExit(f"refusing to overwrite existing output directory: {OUTPUT_ROOT}")
    if sha256_file(SOURCE) != EXPECTED_SOURCE_SHA256:
        raise SystemExit("source SHA-256 mismatch")

    source_rgb = np.asarray(Image.open(SOURCE).convert("RGB"))
    source_bgr = cv2.cvtColor(source_rgb, cv2.COLOR_RGB2BGR)
    if source_rgb.shape != (1024, 1536, 3):
        raise SystemExit(f"unexpected source shape: {source_rgb.shape}")

    binary_mask_a, per_object_pixels = make_binary_mask(source_bgr)
    binary_mask_b, per_object_pixels_repeat = make_binary_mask(source_bgr)
    if not np.array_equal(binary_mask_a, binary_mask_b):
        raise SystemExit("determinism check failed: repeated mask differs")
    if per_object_pixels != per_object_pixels_repeat:
        raise SystemExit("determinism check failed: repeated object metrics differ")

    alpha = inward_soft_alpha(binary_mask_a)
    rgba = np.dstack([source_rgb, alpha])
    if not np.array_equal(rgba[:, :, :3], source_rgb):
        raise SystemExit("full-resolution RGB preservation check failed")

    components = major_components(alpha)
    if len(components) != 5:
        raise SystemExit(f"expected five major foreground components, found {len(components)}")
    if any(
        np.any(alpha[edge] > 0)
        for edge in (
            (0, slice(None)),
            (-1, slice(None)),
            (slice(None), 0),
            (slice(None), -1),
        )
    ):
        raise SystemExit("foreground alpha touches a canvas edge")

    OUTPUT_ROOT.mkdir(parents=True)
    cutout_path = OUTPUT_ROOT / "temporary_bundle_cutout_full.png"
    alpha_path = OUTPUT_ROOT / "temporary_bundle_alpha_mask.png"
    web_path = OUTPUT_ROOT / "temporary_bundle_cutout_web_1200.webp"
    Image.fromarray(rgba, "RGBA").save(cutout_path, optimize=False, compress_level=9)
    Image.fromarray(alpha, "L").save(alpha_path, optimize=False, compress_level=9)

    web_rgba = premultiplied_resize(rgba, 1200)
    Image.fromarray(web_rgba, "RGBA").save(
        web_path,
        format="WEBP",
        lossless=True,
        exact=True,
        method=6,
    )

    proof_paths: dict[str, str] = {}
    foreground = Image.fromarray(rgba, "RGBA")
    for name, colour in PROOF_BACKGROUNDS.items():
        proof = Image.new("RGBA", (1536, 1024), colour + (255,))
        proof.alpha_composite(foreground)
        add_status_banner(proof, dark_background=name in {"dark", "site_blue"})
        proof_path = OUTPUT_ROOT / f"temporary_bundle_edge_proof_{name}.png"
        proof.convert("RGB").save(proof_path, optimize=False, compress_level=9)
        proof_paths[name] = proof_path.relative_to(TASK_ROOT).as_posix()

    alpha_counts = {
        "transparent": int(np.count_nonzero(alpha == 0)),
        "partial": int(np.count_nonzero((alpha > 0) & (alpha < 255))),
        "opaque": int(np.count_nonzero(alpha == 255)),
        "total": int(alpha.size),
    }
    verification = {
        "schema": "maplemoon-temporary-bundle-derivative-verification/v1",
        "approval_status": "TEMPORARY STAGING / REPLACE BEFORE FINAL / UNWIRED",
        "source": {
            "path": str(SOURCE),
            "sha256": EXPECTED_SOURCE_SHA256,
            "width": 1536,
            "height": 1024,
            "mode": "RGB",
        },
        "method": {
            "type": "deterministic OpenCV GrabCut with manually bounded probable-foreground regions and definite source-pixel cores",
            "rng_seed": RNG_SEED,
            "iterations": 8,
            "full_resolution_rgb_byte_identical": True,
            "generative_reconstruction": False,
            "inpainting": False,
            "colour_grading": False,
            "contact_shadows_retained": False,
            "deterministic_repeat_equal": True,
        },
        "outputs": {
            "cutout_full": cutout_path.relative_to(TASK_ROOT).as_posix(),
            "alpha_mask": alpha_path.relative_to(TASK_ROOT).as_posix(),
            "cutout_web_1200": web_path.relative_to(TASK_ROOT).as_posix(),
            "proofs": proof_paths,
        },
        "alpha_counts": alpha_counts,
        "major_components": components,
        "per_object_binary_pixels": per_object_pixels,
        "canonical_proof_backgrounds": {
            name: "#{:02X}{:02X}{:02X}".format(*colour)
            for name, colour in PROOF_BACKGROUNDS.items()
        },
    }
    verification_path = TASK_ROOT / "temporary_bundle_verification.json"
    verification_path.write_text(
        json.dumps(verification, indent=2, sort_keys=True) + "\n",
        encoding="utf-8",
    )

    manifest_paths = sorted(
        path
        for path in TASK_ROOT.rglob("*")
        if path.is_file() and path.name != "temporary_bundle_source_output_hashes.sha256"
    )
    manifest_path = TASK_ROOT / "temporary_bundle_source_output_hashes.sha256"
    lines = [f"{EXPECTED_SOURCE_SHA256}  {SOURCE}"]
    lines.extend(
        f"{sha256_file(path)}  {path.relative_to(TASK_ROOT).as_posix()}"
        for path in manifest_paths
    )
    manifest_path.write_text("\n".join(lines) + "\n", encoding="utf-8")

    print(
        "TEMPORARY_BUNDLE_DERIVATIVE PASS "
        f"source={EXPECTED_SOURCE_SHA256} "
        f"components={len(components)} "
        f"alpha={alpha_counts} "
        f"outputs={len(manifest_paths)}"
    )
    for path in [cutout_path, web_path, alpha_path, *[OUTPUT_ROOT / f"temporary_bundle_edge_proof_{name}.png" for name in PROOF_BACKGROUNDS]]:
        print(
            f"OUTPUT {path.relative_to(TASK_ROOT).as_posix()} "
            f"bytes={path.stat().st_size} sha256={sha256_file(path)}"
        )


if __name__ == "__main__":
    main()
