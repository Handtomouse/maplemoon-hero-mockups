#!/usr/bin/env python3
"""Render exact-pixel temporary bundle edge proofs on four governed colours."""

from __future__ import annotations

import hashlib
import json
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


REPO = Path(__file__).resolve().parents[3]
EVIDENCE = Path(__file__).resolve().parent
ASSET = REPO / "_wip/deploy/generated/maplemoon_bundle_correction_20260825t181849/assets/product_shots/temporary_eclipse_bite_bundle_web.webp"
EXPECTED_SHA256 = "8bca090850c29da285ae266d8bf666199ae7cacbeee475160df13bc82c66932f"
BACKGROUNDS = {
    "light": "#e7edf3",
    "dark": "#101923",
    "cream": "#e7e4ca",
    "site_blue": "#1e4366",
}


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def main() -> int:
    if not ASSET.is_file() or sha256_file(ASSET) != EXPECTED_SHA256:
        print("EDGE PROOF FAIL: exact admitted asset missing or changed", file=sys.stderr)
        return 1
    with Image.open(ASSET) as opened:
        source = opened.convert("RGBA")
    if source.size != (1080, 668) or source.getchannel("A").getbbox() != (46, 46, 1034, 622):
        print("EDGE PROOF FAIL: source geometry or alpha changed", file=sys.stderr)
        return 1
    records = []
    for label, colour in BACKGROUNDS.items():
        canvas = Image.new("RGBA", (1400, 900), colour)
        canvas.alpha_composite(source, (160, 104))
        draw = ImageDraw.Draw(canvas)
        try:
            face = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 20)
        except OSError:
            face = ImageFont.load_default()
        text_colour = "#fbfaf7" if label in {"dark", "site_blue"} else "#101923"
        draw.text((32, 858), f"exact source pixels | {label} | {colour}", fill=text_colour, font=face)
        output = EVIDENCE / f"bundle_edge_proof_{label}.png"
        canvas.convert("RGB").save(output, format="PNG", compress_level=9)
        records.append({"label": label, "background": colour, "path": output.name, "sha256": sha256_file(output)})
    manifest = {
        "schema": "maplemoon-bundle-edge-proofs/v1",
        "source_path": str(ASSET.relative_to(REPO)),
        "source_sha256": EXPECTED_SHA256,
        "source_dimensions": [1080, 668],
        "source_alpha_bbox": [46, 46, 1034, 622],
        "pixel_treatment": "source composited at native dimensions without scaling, reconstruction, or colour change",
        "proofs": records,
    }
    (EVIDENCE / "bundle_edge_proofs_manifest.json").write_text(
        json.dumps(manifest, indent=2, sort_keys=True) + "\n", encoding="utf-8"
    )
    print(f"EDGE PROOF PASS proofs={len(records)} source_sha256={EXPECTED_SHA256}")
    for record in records:
        print(f"PROOF {record['path']} sha256={record['sha256']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
