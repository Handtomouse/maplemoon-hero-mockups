#!/usr/bin/env python3
"""Read-only immutable close verification for the R4 local candidate."""

from __future__ import annotations

import hashlib
import subprocess
from pathlib import Path


ROOT=Path('/Users/handtomouse/maplemoon-website')
R3=ROOT/'_wip/deploy/generated/maplemoon-admitted-preview-r3-20260824T110528'
R4=ROOT/'_wip/deploy/generated/maplemoon-admitted-preview-r4-20260824T111607'
PINS={
 ROOT/'docs/orchestration/MAPLEMOON_BOSS_EXECUTION_LEDGER_20260816.md':'bc23e18da7b2e03d1d2eb4d9ab613b23fc226650870d848e9636fc1ddcca9c10',
 ROOT/'docs/orchestration/reviews/MAPLEMOON-ADMITTED-PREVIEW-CONTENT-R3-20260824T110528.json':'012fc4d87ad680b317c098fb571d4b7b4fe23fda6d3696b02cef2705509e712a',
 ROOT/'_wip/evidence/admitted_preview_content_r3_20260824T110528/BROWSER-FAILURE.md':'5a5ebc057f907507e3108bcb90c37f8c999a7cb0c1c59675ce2505c1e792082b',
 R3/'mock-cart.js':'754ea8b1235a6329bfcbc32aae0f9e5e09c334bf26726bbff8c2c8653f54afe5',
}
R3_TREE='6bd47bbecf170f8d3b3c23b221a5c1a8596f30b24cb32da8ee9b72879088acb5'
R4_TREE='5a649086667c7ed017e45b2cb97fdf6d356d1b4ad636a2d51b09b2b7321efe49'
POWDER='40efa1836bffcf69b44084291b1996f8dc7a70d6f4bcef22e658904fa8a26eaf'
SEAM='''      document.querySelectorAll(".st-result.is-pending").forEach((element) => {
        element.hidden = true;
      });
'''

def sha(path):return hashlib.sha256(path.read_bytes()).hexdigest()
def tree(path):
 d=hashlib.sha256();n=0
 for child in sorted(path.rglob('*')):
  if child.is_symlink():raise SystemExit(f'FAIL symlink={child}')
  if not child.is_file():continue
  d.update(child.relative_to(path).as_posix().encode());d.update(b'\0');d.update(sha(child).encode());d.update(b'\n');n+=1
 return d.hexdigest(),n

fail=[]
for path,expected in PINS.items():
 actual=sha(path) if path.is_file() else None
 if actual!=expected:fail.append(f'pin {path} expected={expected} actual={actual}')
if tree(R3)!=(R3_TREE,75):fail.append(f'R3 tree {tree(R3)}')
if tree(R4)!=(R4_TREE,75):fail.append(f'R4 tree {tree(R4)}')
r3mock=(R3/'mock-cart.js').read_text();r4mock=(R4/'mock-cart.js').read_text()
if r3mock.count(SEAM)!=1 or r4mock.count(SEAM)!=0:fail.append('seam count')
if r4mock.replace('    const tidyResults = () => {\n','    const tidyResults = () => {\n'+SEAM,1)!=r3mock:fail.append('normalized mock diff')
for source in R3.rglob('*'):
 if not source.is_file() or source.name=='mock-cart.js':continue
 target=R4/source.relative_to(R3)
 if not target.is_file() or sha(source)!=sha(target):fail.append(f'unexpected delta {source.relative_to(R3)}')
if sha(R4/'assets/product_shots/powder_roasted.webp')!=POWDER:fail.append('powder hash')
home=(R4/'homepage.html').read_text();stock=(R4/'stockists.html').read_text()
if home.count('Maple Moon customer 0')!=3:fail.append('anonymous quotes')
if stock.count('sourceLine:')!=204 or stock.count('state:"UNKNOWN"')!=7:fail.append('stockist data counts')
if stock.count('Location details unavailable')!=1:fail.append('neutral render seam')
for path in R4.rglob('*'):
 if not path.is_file() or path.suffix.lower() not in {'.html','.css','.js','.json'}:continue
 text=path.read_text(errors='replace')
 if any(v in text for v in ('/out/','/_wip/','.WIP.html')):fail.append(f'private path {path.relative_to(R4)}')
out_status=subprocess.check_output(['git','status','--short','--untracked-files=normal','--','out'],cwd=ROOT,text=True).splitlines()
if len(out_status)!=20 or any(not line.startswith('?? out/') for line in out_status):fail.append(f'out entries {len(out_status)}')
if fail:
 [print('FAIL '+item) for item in fail];raise SystemExit(1)
print('R4_CLOSE PASS r3_pins=4/4 r3_tree=75/75 r4_tree=75/75 seam=1/0 normalized=true other_files=74/74 stockists=204 unknown=7 quotes=3 powder=40efa1836bff private_paths=0 preserved_out=20/20')
