#!/usr/bin/env python3
"""Fill 4 missing transparent PNGs in products_clean/.
Sources in product_shots/ already have clean alpha (4096^2 RGBA, <2% mid pixels)
so we skip rembg and just apply the warm grade + downsize."""
import os, io
from PIL import Image
import numpy as np

ASSETS = os.path.expanduser("~/maplemoon-website/assets")
OUT = os.path.join(ASSETS, "products_clean")

TARGETS = {
    "moon_hazelnut.png":   "product_shots/moon_hazelnut.png",
    "moon_pure_carob.png": "product_shots/moon_pure_carob.png",
    "moon_peppermint.png": "product_shots/moon_peppermint.png",
    "bite_goji.png":       "product_shots/bite_goji.png",
}

MAX_LONG = 1200  # retina for 600px display

log_lines = ["# Transparency Fill Log — 2026-04-19", "", "| Target | Source | Output px | Halo notes |", "|---|---|---|---|"]

for out_name, src_rel in TARGETS.items():
    src = os.path.join(ASSETS, src_rel)
    out = os.path.join(OUT, out_name)
    img = Image.open(src).convert("RGBA")
    src_size = img.size

    # Downsize while preserving aspect
    w, h = img.size
    scale = MAX_LONG / max(w, h)
    if scale < 1:
        img = img.resize((int(w * scale), int(h * scale)), Image.LANCZOS)

    # Warm grade matching run_bg_removal.py lines 26-29
    r, g, b, a = img.split()
    r = r.point(lambda p: min(255, int(p * 1.04)))
    b = b.point(lambda p: int(p * 0.97))
    img = Image.merge("RGBA", (r, g, b, a))

    img.save(out, "PNG", optimize=True)

    # Halo check: count edge pixels with mid alpha (between 5 and 250)
    a_arr = np.array(a)
    mid_pct = ((a_arr > 5) & (a_arr < 250)).sum() / a_arr.size * 100
    coverage = (a_arr > 10).sum() / a_arr.size * 100
    halo = "clean" if mid_pct < 1.5 else f"mid={mid_pct:.1f}% — spot-check"

    kb = os.path.getsize(out) // 1024
    print(f"{out_name}: src={src_size} out={img.size} cov={coverage:.1f}% mid={mid_pct:.2f}% {kb}KB")
    log_lines.append(f"| `{out_name}` | `{src_rel}` | {img.size[0]}×{img.size[1]} | {halo} |")

with open(os.path.join(OUT, "_TRANSPARENCY_LOG.md"), "w") as f:
    f.write("\n".join(log_lines) + "\n")

print("\nDone.")
