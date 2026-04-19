#!/usr/bin/env python3
"""
Replace products_clean/bar_*.png with background-removed v3 mockups.

Current bar_*.png in products_clean/ were sourced from AI-generated images
(Mar 9 ChatGPT batch), not the real v3 packaging. The v3 mockups in
~/Downloads/maplemoon_*_mockup_front_v3_20260306.png are the canonical
branded design and should be the source of truth.
"""
from __future__ import annotations
import io
from pathlib import Path
from rembg import remove
from PIL import Image

V3_MAP = {
    # v3 slug -> site-facing filename
    "pcar": "bar_pure_carob.png",
    "pmin": "bar_peppermint.png",
    "hnut": "bar_hazelnut.png",
    "gcoc": "bar_goji_coconut.png",
    "chil": "bar_cayenne.png",
    "asal": "bar_almond.png",
}

DOWNLOADS = Path.home() / "Downloads"
OUT_DIR = Path.home() / "maplemoon-website/assets/products_clean"


def process(v3_slug: str, out_name: str) -> None:
    src = DOWNLOADS / f"maplemoon_{v3_slug}_mockup_front_v3_20260306.png"
    if not src.exists():
        print(f"  SKIP {out_name}: source missing {src.name}")
        return

    with open(src, "rb") as f:
        raw = f.read()
    result = remove(raw)
    img = Image.open(io.BytesIO(result)).convert("RGBA")

    # Warm grade to match existing pipeline (run_bg_removal.py lines 20-25)
    r, g, b, a = img.split()
    r = r.point(lambda p: min(255, int(p * 1.04)))
    b = b.point(lambda p: int(p * 0.97))
    img = Image.merge("RGBA", (r, g, b, a))

    out = OUT_DIR / out_name
    img.save(out, "PNG", optimize=True)
    print(f"  wrote {out.name}: {img.size[0]}×{img.size[1]}")


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for slug, name in V3_MAP.items():
        process(slug, name)


if __name__ == "__main__":
    main()
