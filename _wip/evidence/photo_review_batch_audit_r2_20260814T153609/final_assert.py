#!/usr/bin/env python3
import hashlib
import json
import subprocess
from pathlib import Path

REPO = Path('/Users/handtomouse/maplemoon-website')
EVIDENCE = REPO / '_wip/evidence/photo_review_batch_audit_r2_20260814T153609'
SOURCE = Path('/Users/handtomouse/.codex/visualizations/2026/08/13/019ffd5b-edd2-7b23-8780-453f9b67a532/maplemoon-product-corrections-20260814')
HASHES = {
    SOURCE / 'maplemoon_product_corrections_review_20260814.html': 'ed859eaa0d62a97d19bc2c377bf78084a9b3799d50b7eb47a0ecd7201ba90167',
    SOURCE / 'assets/carob_powder_isolated.png': 'e935a9c6783f0fe0fed7659692d2cea0f4056afa4734a75e4dcba7b629966a27',
    SOURCE / 'assets/elixir_pure_isolated_equal-size.png': 'd3bda575c320bc42ca69b5ddd0ba806e392f9b7694d31f7ea0310c501fcbd18a',
    SOURCE / 'assets/elixir_spiced_isolated_equal-size.png': '210aab110c8682d6140a50b3ee1621aec0ffe43a9d86841433a8852512c86bba',
    SOURCE / 'assets/five_item_bundle_low_angle_isolated.png': 'ac87e7c1a5b6e96cc40d607e69a841f0b9987f642f3b32e4128dacad2c3814d6',
}


def sha256(path):
    digest = hashlib.sha256()
    with path.open('rb') as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b''):
            digest.update(chunk)
    return digest.hexdigest()


predecessor_command = [
    'python3', '-B', 'scripts/check-maplemoon-receipt.py', 'verify', '--root', '/Users/handtomouse',
    '--packet', 'docs/orchestration/packets/MAPLEMOON-PHOTO-REVIEW-BATCH-AUDIT-20260814T152749.md',
    '--receipt', 'docs/orchestration/reviews/MAPLEMOON-PHOTO-REVIEW-BATCH-AUDIT-20260814T152749.json',
    '--checkpoint', '_wip/checkpoints/MAPLEMOON-PHOTO-REVIEW-BATCH-AUDIT-20260814T152749_20260814_152749_AEST',
    '--phase', 'complete',
]
predecessor = subprocess.run(predecessor_command, cwd=REPO, capture_output=True, text=True, check=False)
expected_predecessor = 'FAIL packet=MAPLEMOON-PHOTO-REVIEW-BATCH-AUDIT-20260814T152749 reason=receipt contains a failed or malformed check'
predecessor_pass = predecessor.returncode == 3 and predecessor.stdout.strip() == expected_predecessor

browser = json.loads((EVIDENCE / 'review_surface_r2_results.json').read_text(encoding='utf-8'))
mechanical = json.loads((EVIDENCE / 'mechanical_revalidation.json').read_text(encoding='utf-8'))
unwired = json.loads((EVIDENCE / 'unwired_search_results.json').read_text(encoding='utf-8'))
freeze = json.loads((EVIDENCE / 'production_freeze.json').read_text(encoding='utf-8'))
preservation = json.loads((EVIDENCE / 'predecessor_preservation.json').read_text(encoding='utf-8'))
hash_pass = all(sha256(path) == expected for path, expected in HASHES.items())
screenshots = [EVIDENCE / f'review_surface_r2_{width}.png' for width in (390, 900, 1440)]
screenshots_pass = all(path.is_file() and path.stat().st_size > 0 for path in screenshots)
predecessor_receipt_hash_pass = sha256(REPO / 'docs/orchestration/reviews/MAPLEMOON-PHOTO-REVIEW-BATCH-AUDIT-20260814T152749.json') == '2a3cb2ef945b0c179032d2a9fd9884a71d480b6a400ed13f85382ee82be7faab'
all_pass = all([
    predecessor_pass,
    preservation['preserved_exactly'] is True,
    preservation['reclassified'] is False,
    predecessor_receipt_hash_pass,
    hash_pass,
    browser['allPass'] is True,
    mechanical['all_pass'] is True,
    unwired['all_pass'] is True,
    freeze['pass'] is True,
    freeze['immutable'] == '7vjf2m50b',
    freeze['homepage_md5'] == '6197879a5ca9d3ed0452773abc0bbeb4',
    screenshots_pass,
])
print(
    f"R2_FINAL {'PASS' if all_pass else 'FAIL'} predecessor_gate={predecessor.returncode}:preserved "
    f"hashes={'5/5' if hash_pass else 'FAIL'} browser={browser['allPass']} mechanical={mechanical['all_pass']} "
    f"unwired={unwired['all_pass']} production={freeze['immutable']}:{freeze['homepage_md5']} screenshots={'3/3' if screenshots_pass else 'FAIL'}"
)
raise SystemExit(0 if all_pass else 1)
