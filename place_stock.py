#!/usr/bin/env python3
"""
MapleMoon Stock Image Placer
Finds recent Adobe Stock downloads in ~/Downloads/ and places them
into assets/stock/ with the correct filename, backing up originals.

Usage:
    cd ~/maplemoon-website && python3 place_stock.py
"""

import shutil
import time
from pathlib import Path

SITE_DIR   = Path(__file__).parent
STOCK_DIR  = SITE_DIR / 'assets/stock'
BAK_DIR    = STOCK_DIR / 'bak'
DOWNLOADS  = Path.home() / 'Downloads'

NAMES = {
    '1': 'stock_carob_hands.jpg',
    '2': 'stock_ingredient_pods.jpg',
    '3': 'stock_spices_warm.jpg',
    '4': 'stock_ingredient_nuts.jpg',
    '5': 'stock_carob_tree.jpg',
    '6': 'stock_hands_chocolate.jpg',
}

LABELS = {
    '1': 'carob hands (harvest/handling)',
    '2': 'ingredient pods (carob pods)',
    '3': 'spices warm (carob roasting)',
    '4': 'ingredient nuts (carob seeds/beans)',
    '5': 'carob tree (Mediterranean branch)',
    '6': 'hands chocolate → replace with carob',
}


def find_recent_downloads(hours: int = 24) -> list[Path]:
    """Return Adobe_Stock_*.jpg/png files downloaded in the last N hours."""
    cutoff = time.time() - hours * 3600
    found = []
    for ext in ('*.jpg', '*.jpeg', '*.png'):
        for f in DOWNLOADS.glob(ext):
            if f.stat().st_mtime >= cutoff and ('Adobe_Stock' in f.name or 'adobe_stock' in f.name.lower()):
                found.append(f)
    return sorted(found, key=lambda f: f.stat().st_mtime, reverse=True)


def main():
    BAK_DIR.mkdir(parents=True, exist_ok=True)

    recent = find_recent_downloads()
    if not recent:
        print('No Adobe_Stock_* files found in ~/Downloads/ from the last 24 hours.')
        print('Download images from Adobe Stock, then re-run this script.')
        return

    print(f'Found {len(recent)} recent Adobe Stock download(s):\n')

    for src in recent:
        size_kb = src.stat().st_size // 1024
        print(f'  {src.name}  ({size_kb} KB)')
        print()
        print('  What is this image?')
        for k, label in LABELS.items():
            dest_name = NAMES[k]
            existing = '  [currently exists]' if (STOCK_DIR / dest_name).exists() else ''
            print(f'    {k}) {label}  →  {dest_name}{existing}')
        print('    s) skip')
        print()

        choice = input('  Your choice: ').strip().lower()

        if choice == 's' or choice not in NAMES:
            print('  Skipped.\n')
            continue

        dest_name = NAMES[choice]
        dest = STOCK_DIR / dest_name

        # Backup existing
        if dest.exists():
            bak = BAK_DIR / dest_name
            shutil.copy2(dest, bak)
            print(f'  Backed up existing → assets/stock/bak/{dest_name}')

        # Copy new image
        shutil.copy2(src, dest)
        print(f'  Placed → assets/stock/{dest_name}')
        print()

    print('Done. Run the dev server and check:')
    print('  http://localhost:3004/hero_v3.html')
    print('  http://localhost:3004/hero_v14.html')


if __name__ == '__main__':
    main()
