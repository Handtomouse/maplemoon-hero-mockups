#!/usr/bin/env python3
from __future__ import annotations

import hashlib
from pathlib import Path

ROOT = Path('/Users/handtomouse/maplemoon-website')
CHECKPOINT = ROOT / '_wip/checkpoints/MAPLEMOON-HOME-SHOP-CONTRACT-RECONCILIATION-20260824T102930_20260824_102930_AEST/files/maplemoon-website'
ROUTES = ROOT / 'docs/design-system/contracts/routes.v1.json'
EXCEPTIONS = ROOT / 'docs/design-system/contracts/exceptions.v1.json'
ROUTES_BEFORE = CHECKPOINT / 'docs/design-system/contracts/routes.v1.json'
EXCEPTIONS_BEFORE = CHECKPOINT / 'docs/design-system/contracts/exceptions.v1.json'
HOME = ROOT / '_wip/homepage_real_1_lead_photo.WIP.html'
SHOP = ROOT / '_wip/shop.WIP.html'

OLD_HOME = 'a2219fba244b7894be1fbe5ef40be94293f1a812751f211156981ec76b8c04a7'
NEW_HOME = 'a06d1e19165c84065e96c14eafd1f8e8d7e5a4228d877f0017ca191d1341c174'
OLD_SHOP = '035a66bb8915e35f636b856849b2ae1cea8666f5fb302aeaf04cf6e8c1db4fc5'
NEW_SHOP = 'f9d150dea283d43eb0a14e02dfeccf9ea1eb4eae87ec82a546ab6984f3fa5604'


def sha(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


failures: list[str] = []
if sha(HOME) != NEW_HOME:
    failures.append(f'Home WIP changed: {sha(HOME)}')
if sha(SHOP) != NEW_SHOP:
    failures.append(f'Shop WIP changed: {sha(SHOP)}')

routes = ROUTES.read_text(encoding='utf-8')
exceptions = EXCEPTIONS.read_text(encoding='utf-8')
if routes.count(NEW_HOME) != 1 or routes.count(NEW_SHOP) != 1:
    failures.append(f'route binding counts home={routes.count(NEW_HOME)} shop={routes.count(NEW_SHOP)}')
if routes.count(OLD_HOME) != 0 or routes.count(OLD_SHOP) != 0:
    failures.append('stale Home or Shop baseline remains in routes')
if exceptions.count(NEW_HOME) != 2:
    failures.append(f'Home exception binding count={exceptions.count(NEW_HOME)}')
if NEW_SHOP in exceptions or OLD_SHOP in exceptions:
    failures.append('Shop exception binding was added or retained')
if exceptions.count(OLD_HOME) != 0:
    failures.append('stale Home binding remains in exceptions')

routes_normalised = routes.replace(NEW_HOME, OLD_HOME).replace(NEW_SHOP, OLD_SHOP)
exceptions_normalised = exceptions.replace(NEW_HOME, OLD_HOME)
routes_equal = routes_normalised == ROUTES_BEFORE.read_text(encoding='utf-8')
exceptions_equal = exceptions_normalised == EXCEPTIONS_BEFORE.read_text(encoding='utf-8')
if not routes_equal:
    failures.append('routes contains a delta beyond two admitted hash fields')
if not exceptions_equal:
    failures.append('exceptions contains a delta beyond two admitted Home bindings')

print(
    f'CONTRACT_DELTA {"FAIL" if failures else "PASS"} '
    f'home={sha(HOME)} shop={sha(SHOP)} '
    f'routes_bindings=2 exceptions_bindings=2 '
    f'routes_normalised_equal={routes_equal} exceptions_normalised_equal={exceptions_equal}'
)
for failure in failures:
    print(f'FAIL {failure}')
raise SystemExit(1 if failures else 0)
