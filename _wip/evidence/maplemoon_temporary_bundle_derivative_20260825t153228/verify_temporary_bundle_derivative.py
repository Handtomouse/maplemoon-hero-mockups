#!/usr/bin/env python3
"""Independent mechanical verification for the accepted temporary derivative."""

from __future__ import annotations

import hashlib
import re
from pathlib import Path

import cv2
import numpy as np
from PIL import Image


TASK_ROOT = Path(__file__).resolve().parent
DERIVED = TASK_ROOT / "derived"
SOURCE = Path(
    "/Users/handtomouse/.codex/generated_images/"
    "019ffe53-6243-73a2-9d75-e1a072cd07ce/"
    "exec-82159e46-662a-4e9b-af90-0e2c68af52ac.png"
)
MODEL = Path("/Users/handtomouse/.u2net/birefnet-general.onnx")
EXPECTED_SOURCE_SHA256 = "b7d669130ef5c1482b4d3655e1407885087c884089cfdbadd7b0b5d0c5abdba1"
EXPECTED_MODEL_SHA256 = "58f621f00f5d756097615970a88a791584600dcf7c45b18a0a6267535a1ebd3c"
EXPECTED_BACKGROUNDS = {
    "cream": (231, 228, 202),
    "dark": (30, 42, 30),
    "site_blue": (30, 67, 102),
}
SNAKE_CASE = re.compile(r"^[a-z0-9]+(?:_[a-z0-9]+)*(?:\.[a-z0-9]+)?$")


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def require(condition: bool, message: str) -> None:
    if not condition:
        raise SystemExit(f"VERIFY FAIL: {message}")


def main() -> None:
    require(sha256_file(SOURCE) == EXPECTED_SOURCE_SHA256, "source hash mismatch")
    require(sha256_file(MODEL) == EXPECTED_MODEL_SHA256, "model hash mismatch")

    source = np.asarray(Image.open(SOURCE).convert("RGB"), dtype=np.uint8)
    cutout_image = Image.open(DERIVED / "temporary_bundle_cutout_full.png")
    require(cutout_image.mode == "RGBA", f"cutout mode is {cutout_image.mode}, not RGBA")
    require(cutout_image.size == (1536, 1024), f"cutout size is {cutout_image.size}")
    cutout = np.asarray(cutout_image, dtype=np.uint8)
    require(np.array_equal(cutout[:, :, :3], source), "cutout RGB differs from source")

    alpha = cutout[:, :, 3]
    transparent = int(np.count_nonzero(alpha == 0))
    partial = int(np.count_nonzero((alpha > 0) & (alpha < 255)))
    opaque = int(np.count_nonzero(alpha == 255))
    require(transparent > 0, "alpha has no transparent pixels")
    require(partial > 0, "alpha has no partial pixels")
    require(opaque > 0, "alpha has no opaque pixels")
    require(
        not (
            np.any(alpha[0, :] > 0)
            or np.any(alpha[-1, :] > 0)
            or np.any(alpha[:, 0] > 0)
            or np.any(alpha[:, -1] > 0)
        ),
        "foreground touches canvas edge",
    )

    component_count, _, stats, _ = cv2.connectedComponentsWithStats(
        np.where(alpha >= 128, 255, 0).astype(np.uint8),
        connectivity=8,
    )
    major_areas = sorted(
        int(stats[label, cv2.CC_STAT_AREA])
        for label in range(1, component_count)
        if int(stats[label, cv2.CC_STAT_AREA]) >= 1000
    )
    require(len(major_areas) == 5, f"major component count is {len(major_areas)}")

    alpha_mask = np.asarray(
        Image.open(DERIVED / "temporary_bundle_alpha_mask.png").convert("L"),
        dtype=np.uint8,
    )
    require(np.array_equal(alpha_mask, alpha), "standalone alpha mask differs from PNG alpha")

    web = Image.open(DERIVED / "temporary_bundle_cutout_web_1200.webp")
    require(web.size == (1200, 800), f"web derivative size is {web.size}")
    require("A" in web.getbands(), f"web derivative has no alpha band: {web.getbands()}")

    for name, expected in EXPECTED_BACKGROUNDS.items():
        proof_path = DERIVED / f"temporary_bundle_edge_proof_{name}.png"
        proof = Image.open(proof_path).convert("RGB")
        require(proof.size == (1536, 1024), f"{name} proof size is {proof.size}")
        require(proof.getpixel((1535, 1023)) == expected, f"{name} proof background mismatch")
        require(len(proof.getcolors(maxcolors=4_000_000) or []) > 256, f"{name} proof appears blank")

    for path in TASK_ROOT.rglob("*"):
        if path.is_file():
            require(path.stat().st_size > 0, f"zero-byte file: {path}")
            require(SNAKE_CASE.fullmatch(path.name) is not None, f"non-snake-case filename: {path.name}")

    outputs = [
        DERIVED / "temporary_bundle_cutout_full.png",
        DERIVED / "temporary_bundle_cutout_web_1200.webp",
        DERIVED / "temporary_bundle_alpha_mask.png",
        DERIVED / "temporary_bundle_edge_proof_cream.png",
        DERIVED / "temporary_bundle_edge_proof_dark.png",
        DERIVED / "temporary_bundle_edge_proof_site_blue.png",
    ]
    print(
        "TEMPORARY_BUNDLE_VERIFY PASS "
        f"source={EXPECTED_SOURCE_SHA256} model={EXPECTED_MODEL_SHA256} "
        f"rgb_equal=true components=5 major_areas={major_areas} "
        f"alpha=transparent:{transparent},partial:{partial},opaque:{opaque} "
        "web=1200x800 proofs=cream,dark,site_blue filenames=snake_case"
    )
    for path in outputs:
        print(
            f"VERIFIED {path.relative_to(TASK_ROOT).as_posix()} "
            f"bytes={path.stat().st_size} sha256={sha256_file(path)}"
        )


if __name__ == "__main__":
    main()
