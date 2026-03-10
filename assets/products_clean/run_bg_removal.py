#!/usr/bin/env python3
"""Agent 2 — MapleMoon background removal + warm grade"""
import os, io
from PIL import Image, ImageEnhance, ImageFilter
from rembg import remove

SRC = os.path.expanduser("~/maplemoon-website/assets/products_new")
OUT = os.path.expanduser("~/maplemoon-website/assets/products_clean")
os.makedirs(OUT, exist_ok=True)

files = [f for f in os.listdir(SRC) if f.endswith('.png')]

for fname in sorted(files):
    src_path = os.path.join(SRC, fname)
    out_path = os.path.join(OUT, fname)

    print(f"Processing {fname}...", end=" ", flush=True)

    with open(src_path, 'rb') as f:
        raw = f.read()

    result = remove(raw)
    img = Image.open(io.BytesIO(result)).convert('RGBA')

    # Warm grade: boost red channel slightly, pull blue slightly
    r, g, b, a = img.split()
    r = r.point(lambda p: min(255, int(p * 1.04)))
    b = b.point(lambda p: int(p * 0.97))
    img = Image.merge('RGBA', (r, g, b, a))

    # Special treatment for eclipse_pecan: boost contrast + saturation
    if fname == 'eclipse_pecan.png':
        rgb = img.convert('RGB')
        rgb = ImageEnhance.Contrast(rgb).enhance(1.08)
        rgb = ImageEnhance.Color(rgb).enhance(1.12)
        r2, g2, b2 = rgb.split()
        img = Image.merge('RGBA', (r2, g2, b2, a))

    # Special treatment for bath_salts: boost saturation (flowers more vivid)
    if fname == 'bath_salts_lavender.png':
        rgb = img.convert('RGB')
        rgb = ImageEnhance.Color(rgb).enhance(1.15)
        r2, g2, b2 = rgb.split()
        img = Image.merge('RGBA', (r2, g2, b2, a))

    img.save(out_path, 'PNG')

    # Quality check: measure alpha coverage
    import numpy as np
    alpha_arr = np.array(a)
    total_px = alpha_arr.size
    opaque_px = (alpha_arr > 10).sum()
    coverage = opaque_px / total_px * 100

    file_kb = os.path.getsize(out_path) // 1024
    print(f"✅  {img.size}  coverage={coverage:.1f}%  {file_kb}KB")

print("\nDone. Files in:", OUT)
