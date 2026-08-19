#!/usr/bin/env python3
import hashlib
import json
import subprocess
from pathlib import Path

REPO = Path('/Users/handtomouse/maplemoon-website')
OUT = REPO / '_wip/evidence/integrated_header_cart_cert_r2_20260814T163003'
ROOT = Path('/Users/handtomouse')
HASHES = {
    ROOT / 'maplemoon_build_20260813/homepage.html': '27921b2a466ccb670b2851a73043429763d3423bcaf651069e4e860dc01a78b1',
    ROOT / 'maplemoon_build_20260813/our-story.html': '2db31868a9791f373f156e7cdeb8261e494d1d47e9418a94c28156e213df7711',
    ROOT / 'maplemoon_build_20260813/carob-story.html': '4fd9ad0fabb9d60d0f391925f5a382ccfc8f705b60fca1c681f403a5cd9734bd',
    ROOT / 'maplemoon_build_20260813/shop.html': 'f111ad5123e34dadd46ac497fca286066efc67c05dd7e68f0d3e70c97c735038',
    ROOT / 'maplemoon_build_20260813/faq.html': 'c5ce7aaf0b9b3221f34eb2928fc2ff6732fc1a915ea80144a4ade2b94011fb6e',
    ROOT / 'maplemoon_build_20260813/stockists.html': '4821adfe88680d4f174b7a8700c8d8a65594df2901bf3a7109d51b09040cb887',
    ROOT / 'maplemoon_build_20260813/pure-carob-bar.html': '015cde27ecc60f3c444820a551c39f6e9c985fc5b2e59bdaea5f496c1c236b65',
    ROOT / 'maplemoon_build_20260813/mock-cart.js': '36fb46b05a46ecf1c770991c6b9cf2eb8c08fda361c7176d37df081668f123aa',
    ROOT / 'maplemoon_build_20260813/mock-cart.css': 'c17deb1f972017d9790f2191360a457e54d7287730847f9f470c9de371603308',
    ROOT / 'maplemoon_build_20260813/assets/design-system/mm-chrome.js': '063fe11d5f5ed5d90c724868f1ffb8f3536aed73cc2f7fb9bc6e4791eb192d18',
    ROOT / 'maplemoon_build_20260813/assets/design-system/mm-chrome.css': '2d7414a8994ae11414cb269f4ca335293b409eb9da956ca3b625e716c26080ba',
}


def sha256(path):
    digest = hashlib.sha256()
    with path.open('rb') as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b''):
            digest.update(chunk)
    return digest.hexdigest()


def gate(packet, receipt, checkpoint, phase):
    command = [
        'python3', '-B', 'scripts/check-maplemoon-receipt.py', 'verify', '--root', '/Users/handtomouse',
        '--packet', packet, '--receipt', receipt, '--checkpoint', checkpoint, '--phase', phase,
    ]
    completed = subprocess.run(command, cwd=REPO, text=True, capture_output=True, check=False)
    return {'command': ' '.join(command), 'exit_code': completed.returncode, 'stdout': completed.stdout.strip(), 'stderr': completed.stderr.strip()}


gates = [
    gate('docs/orchestration/packets/MAPLEMOON-MOBILE-HEADER-RUNTIME-20260814T150338.md', 'docs/orchestration/reviews/MAPLEMOON-MOBILE-HEADER-RUNTIME-20260814T150338.json', '_wip/checkpoints/MAPLEMOON-MOBILE-HEADER-RUNTIME-20260814T150338_20260814_150338_AEST', phase)
    for phase in ('complete', 'promote')
] + [
    gate('docs/orchestration/packets/MAPLEMOON-CART-PREFLIGHT-VERIFY-20260814T155246.md', 'docs/orchestration/reviews/MAPLEMOON-CART-PREFLIGHT-VERIFY-20260814T155246.json', '_wip/checkpoints/MAPLEMOON-CART-PREFLIGHT-VERIFY-20260814T155246_20260814_155246_AEST', phase)
    for phase in ('complete', 'promote')
] + [
    gate('docs/orchestration/packets/MAPLEMOON-CART-INERT-FOCUS-FIX-20260814T161020.md', 'docs/orchestration/reviews/MAPLEMOON-CART-INERT-FOCUS-FIX-20260814T161020.json', '_wip/checkpoints/MAPLEMOON-CART-INERT-FOCUS-FIX-20260814T161020_20260814_161020_AEST', phase)
    for phase in ('complete', 'promote')
]
first_cert = gate(
    'docs/orchestration/packets/MAPLEMOON-INTEGRATED-HEADER-CART-CERT-20260814T155822.md',
    'docs/orchestration/reviews/MAPLEMOON-INTEGRATED-HEADER-CART-CERT-20260814T155822.json',
    '_wip/checkpoints/MAPLEMOON-INTEGRATED-HEADER-CART-CERT-20260814T155822_20260814_155822_AEST',
    'complete',
)
expected_first = 'FAIL packet=MAPLEMOON-INTEGRATED-HEADER-CART-CERT-20260814T155822 reason=receipt contains a failed or malformed check'
hash_results = {str(path.relative_to(ROOT)): {'expected': expected, 'actual': sha256(path), 'pass': sha256(path) == expected} for path, expected in HASHES.items()}
inert_receipt = REPO / 'docs/orchestration/reviews/MAPLEMOON-CART-INERT-FOCUS-FIX-20260814T161020.json'
first_receipt = REPO / 'docs/orchestration/reviews/MAPLEMOON-INTEGRATED-HEADER-CART-CERT-20260814T155822.json'
receipt_hashes = {
    'cart_inert_receipt': {'expected': '946cd78c94acbba76265a0bf88e6126a7e6c39b3873751dc85c590c8ad395fdd', 'actual': sha256(inert_receipt)},
    'first_cert_receipt': {'expected': '78c2e183699be5483125dbc0fc8a3bd4d5274a173cc11614188b0f7893f7ee10', 'actual': sha256(first_receipt)},
}
for record in receipt_hashes.values():
    record['pass'] = record['actual'] == record['expected']
all_pass = all(item['exit_code'] == 0 and item['stdout'].startswith('PASS ') for item in gates) and first_cert['exit_code'] == 3 and first_cert['stdout'] == expected_first and all(item['pass'] for item in hash_results.values()) and all(item['pass'] for item in receipt_hashes.values())
result = {
    'schema': 'maplemoon-integrated-cert-r2-admission/v1',
    'gates': gates,
    'superseded_first_cert': {**first_cert, 'authentic_preserved_failure': first_cert['exit_code'] == 3 and first_cert['stdout'] == expected_first},
    'acquisition_hashes': hash_results,
    'receipt_hashes': receipt_hashes,
    'all_pass': all_pass,
}
(OUT / 'admission_results.json').write_text(json.dumps(result, indent=2) + '\n', encoding='utf-8')
print(f"R2_ADMISSION {'PASS' if all_pass else 'FAIL'} predecessor_gates={sum(item['exit_code'] == 0 for item in gates)}/6 first_cert_preserved={result['superseded_first_cert']['authentic_preserved_failure']} hashes={sum(item['pass'] for item in hash_results.values())}/11 inert_receipt={receipt_hashes['cart_inert_receipt']['pass']}")
raise SystemExit(0 if all_pass else 1)
