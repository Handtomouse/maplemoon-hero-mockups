#!/usr/bin/env python3
"""Read-only close verification for certified private preview R5."""

import hashlib,json,subprocess
from pathlib import Path

ROOT=Path('/Users/handtomouse/maplemoon-website');R4=ROOT/'_wip/deploy/generated/maplemoon-admitted-preview-r4-20260824T111607';STAGE=Path('/private/tmp/maplemoon-r5-20260824T112414')
E=ROOT/'_wip/evidence/certified_private_preview_r5_20260824T112414';PROJECT=Path('/Users/handtomouse/maplemoon_build_20260813/.vercel/project.json')
R4_TREE='5a649086667c7ed017e45b2cb97fdf6d356d1b4ad636a2d51b09b2b7321efe49';R4_RECEIPT='ac60ed2f0d7fa34eb4be00f264c912bd2eebf33f48d74fc9ba5d17968f415222';PROJECT_SHA='67c7d22f79bf6ac5785d8c9b760ac5df4081448c247228a71f445c61200db902'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def tree(p,skip=False):
 d=hashlib.sha256();n=0
 for c in sorted(p.rglob('*')):
  if not c.is_file():continue
  r=c.relative_to(p)
  if skip and r.parts[0]=='.vercel':continue
  d.update(r.as_posix().encode());d.update(b'\0');d.update(sha(c).encode());d.update(b'\n');n+=1
 return d.hexdigest(),n
fail=[]
if tree(R4)!=(R4_TREE,75):fail.append(f'R4 tree {tree(R4)}')
if sha(ROOT/'docs/orchestration/reviews/MAPLEMOON-ADMITTED-PREVIEW-RUNTIME-R4-20260824T111607.json')!=R4_RECEIPT:fail.append('R4 receipt')
if sha(PROJECT)!=PROJECT_SHA:fail.append('project binding')
if tree(STAGE,True)!=(R4_TREE,75):fail.append(f'staging {tree(STAGE,True)}')
remote=json.loads((E/'remote-byte-results.json').read_text())
if remote.get('outcome')!='PASS' or remote.get('deployment_id')!='dpl_9gAxXL2uxFu4tobNeSgRR69NqgQj' or len(remote.get('rows',[]))!=16 or not all(row.get('equal') for row in remote.get('rows',[])):fail.append('remote bytes')
deploy=(E/'DEPLOY-EVIDENCE.md').read_text()
for needle in ('dpl_9gAxXL2uxFu4tobNeSgRR69NqgQj','Target/status: `preview` / `Ready`','dpl_G2LER2awaqyFtGRCcTserXbNynct','7vjf2m50b','VERDICT: FAIL - VERCEL SSO WALL'):
 if needle not in deploy:fail.append('deploy evidence '+needle)
out=subprocess.check_output(['git','status','--short','--untracked-files=normal','--','out'],cwd=ROOT,text=True).splitlines()
if len(out)!=20 or any(not line.startswith('?? out/') for line in out):fail.append(f'out {len(out)}')
if fail:
 [print('FAIL '+x) for x in fail];raise SystemExit(1)
print('R5_CLOSE PASS r4_tree=75/75 r4_receipt=exact project=prj_uyvh staging=75/75 preview=dpl_9gAx/Ready/preview remote_bytes=16/16 anonymous=SSO_WALL production=dpl_G2LER/7vjf2m50b/Ready preserved_out=20/20')
