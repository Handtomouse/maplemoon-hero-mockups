#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import re
import subprocess
from pathlib import Path

from PIL import Image

REPO = Path('/Users/handtomouse/maplemoon-website')
CHECKPOINT = REPO / '_wip/checkpoints/MAPLEMOON-FOUNDER-FRAME701-WIRING-20260824T100005_20260824_100005_AEST/files/maplemoon-website/our-story.html'
PAGE = REPO / 'our-story.html'
SOURCE = REPO / 'out/founder_cutouts_20260823/frame_701_CORRECT.jpg'
CARLI_SOURCE = REPO / 'out/masked_founders_20260823/graded_v2/bio_carli_701_masked_graded_2400.webp'
DYLAN_SOURCE = REPO / 'out/masked_founders_20260823/graded_v2/bio_dylan_701_masked_graded_2400.webp'
HERO = REPO / 'assets/our_story/founders_frame701_pair_2400.webp'
CARLI = REPO / 'assets/our_story/founder_carli_701_v2_2400.webp'
DYLAN = REPO / 'assets/our_story/founder_dylan_701_v2_2400.webp'

EXPECTED = {
    SOURCE: 'b80bcdaf58bf952217bbc5ea32d90ee1ae8340c29767f43e8735fca62723d4f1',
    CARLI_SOURCE: '48b7032778a8a492129290bed69054004decc3f93ffc2a8b9b71bd997b7e1f0b',
    DYLAN_SOURCE: '34f7022d44a084d72ef6e05e4f3acf7cd64e26a8a08e3d1b555136dad267f942',
    HERO: 'ec53b0faa3cec0e12e578395968e0605eeac5a64b191030d5c8661ed33ea608d',
    CARLI: '48b7032778a8a492129290bed69054004decc3f93ffc2a8b9b71bd997b7e1f0b',
    DYLAN: '34f7022d44a084d72ef6e05e4f3acf7cd64e26a8a08e3d1b555136dad267f942',
}


def sha(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def normalise_allowed_founder_delta(text: str) -> str:
    text = re.sub(r'  <!-- Founders-first story opening\.[^\n]+-->', '  <!-- FOUNDER-OPENING -->', text, count=1)
    text = re.sub(
        r'        <figure class="os-story-hero__portrait"[^\n]+</figure>',
        '        <!-- FOUNDER-HERO -->',
        text,
        count=1,
    )
    text = re.sub(
        r'        <div class="os-founder-note__portrait os-founder-(?:placeholder|bio)"[^\n]+(?:</div>)',
        '        <!-- FOUNDER-BIO -->',
        text,
        count=2,
    )
    text = text.replace('/assets/photo_finals/maplemoon_heros73_brandmatched.webp', '/assets/our_story/FOUNDER-HERO.webp')
    text = text.replace('/assets/our_story/founders_frame701_pair_2400.webp', '/assets/our_story/FOUNDER-HERO.webp')
    text = re.sub(r'/\* Lane F R2:[^\n]+\*/', '/* Lane F R2: FOUNDER-MEDIA */', text, count=1)
    text = re.sub(
        r'\.os \.os-founder-(?:placeholder|bio)\{.*?\.os #beginning\{',
        '.os .os-founder-media{FOUNDER-MEDIA-RULES}\n.os #beginning{',
        text,
        count=1,
        flags=re.S,
    )
    text = re.sub(
        r'  \.os \.os-founder-(?:placeholder|bio)\{[^\n]+\}',
        '  .os .os-founder-media{FOUNDER-MOBILE-RULES}',
        text,
        count=1,
    )
    return text


failures: list[str] = []
for path, expected in EXPECTED.items():
    actual = sha(path) if path.is_file() else 'MISSING'
    if actual != expected:
        failures.append(f'hash {path}: expected={expected} actual={actual}')

if CARLI.read_bytes() != CARLI_SOURCE.read_bytes():
    failures.append('Carli governed asset is not byte-identical to accepted v2 source')
if DYLAN.read_bytes() != DYLAN_SOURCE.read_bytes():
    failures.append('Dylan governed asset is not byte-identical to accepted v2 source')

for path, size, mode in [
    (HERO, (2400, 1600), 'RGB'),
    (CARLI, (1993, 2400), 'RGBA'),
    (DYLAN, (2008, 2400), 'RGBA'),
]:
    with Image.open(path) as image:
        if image.size != size or image.mode != mode:
            failures.append(f'image contract {path}: got={image.size}/{image.mode} expected={size}/{mode}')

rebuilt = Path('/private/tmp/maplemoon-founder-frame701-rebuild.webp')
subprocess.run([
    '/opt/homebrew/bin/magick', str(SOURCE),
    '-crop', '4000x2667+0+1666', '+repage',
    '-resize', '2400x1600', '-strip', '-colorspace', 'sRGB',
    '-quality', '92', '-define', 'webp:method=6', str(rebuilt),
], check=True)
if sha(rebuilt) != sha(HERO):
    failures.append(f'hero rebuild not byte-identical: rebuilt={sha(rebuilt)} live={sha(HERO)}')

page = PAGE.read_text(encoding='utf-8')
counts = {
    'old_hero': page.count('maplemoon_heros73_brandmatched.webp'),
    'wrong_592': page.count('pair_592'),
    'wrong_870': page.count('pair_870'),
    'hero': page.count('founders_frame701_pair_2400.webp'),
    'carli': page.count('founder_carli_701_v2_2400.webp'),
    'dylan': page.count('founder_dylan_701_v2_2400.webp'),
    'placeholder': page.count('os-founder-placeholder'),
}
expected_counts = {'old_hero': 0, 'wrong_592': 0, 'wrong_870': 0, 'hero': 2, 'carli': 1, 'dylan': 1, 'placeholder': 0}
if counts != expected_counts:
    failures.append(f'page occurrence mismatch: got={counts} expected={expected_counts}')

bio_rule = re.search(r'\.os \.os-founder-bio img\{(.*?)\}', page, re.S)
if not bio_rule:
    failures.append('live founder-bio image rule missing')
else:
    rule = bio_rule.group(1)
    for token in ['object-fit:cover', 'object-position:50% 35%', 'linear-gradient(180deg']:
        if token not in rule:
            failures.append(f'bio rule missing {token}')
    if '90deg' in rule:
        failures.append('bio rule contains forbidden horizontal mask')
if 'aspect-ratio:4/5' not in page:
    failures.append('4:5 founder-bio slot rule missing')

before = normalise_allowed_founder_delta(CHECKPOINT.read_text(encoding='utf-8'))
after = normalise_allowed_founder_delta(page)
if before != after:
    failures.append('our-story.html contains a delta outside the allowed founder-media seams')

print(f'FOUNDER_SOURCE {"FAIL" if failures else "PASS"} hashes={len(EXPECTED) - sum(f.startswith("hash ") for f in failures)}/{len(EXPECTED)} counts={counts} rebuild_equal={sha(rebuilt) == sha(HERO)} scoped_page_delta={before == after}')
for failure in failures:
    print(f'FAIL {failure}')
raise SystemExit(1 if failures else 0)
