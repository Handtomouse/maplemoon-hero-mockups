#!/usr/bin/env python3
import hashlib
import importlib.util
from pathlib import Path

ROOT = Path('/Users/handtomouse/maplemoon-website')
OUTPUT = ROOT / '_wip/deploy/generated/maplemoon-admitted-preview-20260824T105053'
BUILDER = ROOT / 'scripts/build-maplemoon-wip-preview.py'

PINS = {
    BUILDER: '803c439e0e937309b7ada0c3f886983908c3cc6aed64f92e38c57fd656707808',
    ROOT / '_wip/homepage_real_1_lead_photo.WIP.html': 'a06d1e19165c84065e96c14eafd1f8e8d7e5a4228d877f0017ca191d1341c174',
    ROOT / '_wip/shop.WIP.html': 'f9d150dea283d43eb0a14e02dfeccf9ea1eb4eae87ec82a546ab6984f3fa5604',
    ROOT / 'our-story.html': '8dc01af541712a54986270f5bdf51f41ea48fa5be2699fa3610182910668458f',
    ROOT / '_wip/carob-story.WIP.html': '2fafd3867233a01ce6af1f4dd0a1837cc83fb69563d35d29c293e8d1d379d9e0',
    ROOT / '_wip/faq.WIP.html': '449e2c4b129d0c63fc55d77ba2abe7c71c34da9b7c6f6f63fbb21cc899efe7e8',
    ROOT / '_wip/stockists.WIP.html': 'b7cb9f1963e53b70b279b0198aabddb528fddad74ad9763c9494c93e70346905',
    ROOT / 'assets/our_story/founders_frame701_pair_2400.webp': 'ec53b0faa3cec0e12e578395968e0605eeac5a64b191030d5c8661ed33ea608d',
    ROOT / 'assets/our_story/founder_carli_701_v2_2400.webp': '48b7032778a8a492129290bed69054004decc3f93ffc2a8b9b71bd997b7e1f0b',
    ROOT / 'assets/our_story/founder_dylan_701_v2_2400.webp': '34f7022d44a084d72ef6e05e4f3acf7cd64e26a8a08e3d1b555136dad267f942',
}

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

for path, expected in PINS.items():
    actual = sha(path)
    if actual != expected:
        raise SystemExit(f'PIN_FAIL path={path} expected={expected} actual={actual}')

spec = importlib.util.spec_from_file_location('maplemoon_wip_builder', BUILDER)
builder = importlib.util.module_from_spec(spec)
spec.loader.exec_module(builder)
builder.PAGE_SOURCES['our-story.html'] = ROOT / 'our-story.html'
files, bytes_count = builder.build(OUTPUT)

print(
    f'BUILD PASS output={OUTPUT} files={files} bytes={bytes_count} '
    'pages=7 private_dirs=0 vercel_project_link=0 our_story_source=root_certified_frame701'
)
