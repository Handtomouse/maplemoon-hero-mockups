#!/usr/bin/env python3
"""Build the final deterministic temporary-bundle alpha derivatives.

This uses the cached local BiRefNet segmentation model only to estimate alpha.
The full-resolution output copies source RGB bytes unchanged and appends the
derived alpha channel. No pixels are generated, inpainted, recoloured or moved.
"""

from __future__ import annotations

import hashlib
import json
import os
from pathlib import Path

os.environ.setdefault("NUMBA_DISABLE_JIT", "1")
os.environ.setdefault("U2NET_HOME", "/Users/handtomouse/.u2net")

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from rembg import new_session, remove


TASK_ROOT = Path(__file__).resolve().parent
OUTPUT_ROOT = TASK_ROOT / "derived"
SOURCE = Path(
    "/Users/handtomouse/.codex/generated_images/"
    "019ffe53-6243-73a2-9d75-e1a072cd07ce/"
    "exec-82159e46-662a-4e9b-af90-0e2c68af52ac.png"
)
EXPECTED_SOURCE_SHA256 = "b7d669130ef5c1482b4d3655e1407885087c884089cfdbadd7b0b5d0c5abdba1"
MODEL = Path("/Users/handtomouse/.u2net/birefnet-general.onnx")
EXPECTED_MODEL_SHA256 = "58f621f00f5d756097615970a88a791584600dcf7c45b18a0a6267535a1ebd3c"
MODEL_NAME = "birefnet-general"

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


def make_alpha(source_image: Image.Image, session: object) -> np.ndarray:
    mask = remove(
        source_image,
        session=session,
        only_mask=True,
        post_process_mask=True,
    )
    return np.asarray(mask.convert("L"), dtype=np.uint8)


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


def inward_soft_alpha(binary_alpha: np.ndarray) -> np.ndarray:
    """Antialias one pixel inward without admitting background RGB pixels."""
    foreground = np.where(binary_alpha >= 128, 255, 0).astype(np.uint8)
    distance_inside = cv2.distanceTransform(foreground, cv2.DIST_L2, 5)
    softened = np.clip(distance_inside / 1.25, 0.0, 1.0)
    return np.rint(softened * 255.0).astype(np.uint8)


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
    if sha256_file(MODEL) != EXPECTED_MODEL_SHA256:
        raise SystemExit("cached segmentation model SHA-256 mismatch")

    source_image = Image.open(SOURCE).convert("RGB")
    source_rgb = np.asarray(source_image, dtype=np.uint8)
    if source_rgb.shape != (1024, 1536, 3):
        raise SystemExit(f"unexpected source shape: {source_rgb.shape}")

    session = new_session(MODEL_NAME)
    alpha_a = make_alpha(source_image, session)
    alpha_b = make_alpha(source_image, session)
    if not np.array_equal(alpha_a, alpha_b):
        raise SystemExit("determinism check failed: repeated alpha differs")
    alpha = inward_soft_alpha(alpha_a)

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
        "schema": "maplemoon-temporary-bundle-derivative-verification/v2",
        "approval_status": "TEMPORARY STAGING / REPLACE BEFORE FINAL / UNWIRED",
        "source": {
            "path": str(SOURCE),
            "sha256": EXPECTED_SOURCE_SHA256,
            "width": 1536,
            "height": 1024,
            "mode": "RGB",
        },
        "method": {
            "type": "cached local BiRefNet foreground segmentation used only to derive alpha",
            "model_path": str(MODEL),
            "model_sha256": EXPECTED_MODEL_SHA256,
            "full_resolution_rgb_byte_identical": True,
            "generative_reconstruction": False,
            "inpainting": False,
            "colour_grading": False,
            "geometry_change": False,
            "contact_shadows_retained": False,
            "deterministic_repeat_equal": True,
            "edge_antialias": "one-pixel inward-only distance-transform alpha; no outside/background pixels admitted",
        },
        "outputs": {
            "cutout_full": cutout_path.relative_to(TASK_ROOT).as_posix(),
            "alpha_mask": alpha_path.relative_to(TASK_ROOT).as_posix(),
            "cutout_web_1200": web_path.relative_to(TASK_ROOT).as_posix(),
            "proofs": proof_paths,
        },
        "alpha_counts": alpha_counts,
        "major_components": components,
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
    lines = [
        f"{EXPECTED_SOURCE_SHA256}  {SOURCE}",
        f"{EXPECTED_MODEL_SHA256}  {MODEL}",
    ]
    lines.extend(
        f"{sha256_file(path)}  {path.relative_to(TASK_ROOT).as_posix()}"
        for path in manifest_paths
    )
    manifest_path.write_text("\n".join(lines) + "\n", encoding="utf-8")

    print(
        "TEMPORARY_BUNDLE_DERIVATIVE_V2 PASS "
        f"source={EXPECTED_SOURCE_SHA256} "
        f"model={EXPECTED_MODEL_SHA256} "
        f"components={len(components)} "
        f"alpha={alpha_counts} "
        f"outputs={len(manifest_paths)}"
    )
    for path in [
        cutout_path,
        web_path,
        alpha_path,
        *[
            OUTPUT_ROOT / f"temporary_bundle_edge_proof_{name}.png"
            for name in PROOF_BACKGROUNDS
        ],
    ]:
        print(
            f"OUTPUT {path.relative_to(TASK_ROOT).as_posix()} "
            f"bytes={path.stat().st_size} sha256={sha256_file(path)}"
        )


if __name__ == "__main__":
    main()
