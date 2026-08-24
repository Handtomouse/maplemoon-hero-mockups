#!/usr/bin/env python3
"""Authenticated Vercel byte-equality verification for the immutable R5 preview."""

from __future__ import annotations

import hashlib
import json
import subprocess
from pathlib import Path


ROOT=Path('/Users/handtomouse/maplemoon-website')
LOCAL=ROOT/'_wip/deploy/generated/maplemoon-admitted-preview-r4-20260824T111607'
EVIDENCE=ROOT/'_wip/evidence/certified_private_preview_r5_20260824T112414'
STAGING=Path('/private/tmp/maplemoon-r5-20260824T112414')
URL='https://maplemoonbuild20260813-j9pef6x3q-handtomouses-projects.vercel.app'
DEPLOYMENT_ID='dpl_9gAxXL2uxFu4tobNeSgRR69NqgQj'
FILES=[
 'homepage.html','shop.html','our-story.html','carob-story.html','faq.html','stockists.html','products/pure-carob-bar.html',
 'mock-cart.js','mock-cart.css','assets/design-system/mm-chrome.js','assets/design-system/mm-chrome.css',
 'assets/design-system/mm-tokens.css','assets/product_shots/powder_roasted.webp',
 'assets/our_story/founders_frame701_pair_2400.webp','assets/our_story/founder_carli_701_v2_2400.webp','assets/our_story/founder_dylan_701_v2_2400.webp'
]

def sha(data):return hashlib.sha256(data).hexdigest()
rows=[];fail=[]
for relative in FILES:
 local=(LOCAL/relative).read_bytes()
 run=subprocess.run([
  'vercel','curl','/'+relative,'--deployment',URL,'--','--silent','--show-error','--fail','--location'
 ],cwd=STAGING,capture_output=True)
 remote=run.stdout
 row={'path':relative,'exit':run.returncode,'local_bytes':len(local),'remote_bytes':len(remote),'local_sha256':sha(local),'remote_sha256':sha(remote),'equal':run.returncode==0 and remote==local}
 rows.append(row)
 if not row['equal']:
  fail.append({'path':relative,'exit':run.returncode,'stderr':run.stderr.decode(errors='replace')[:500],'local_bytes':len(local),'remote_bytes':len(remote),'local_sha256':sha(local),'remote_sha256':sha(remote)})
result={'outcome':'FAIL' if fail else 'PASS','url':URL,'deployment_id':DEPLOYMENT_ID,'files':len(FILES),'rows':rows,'failures':fail}
(EVIDENCE/'remote-byte-results.json').write_text(json.dumps(result,indent=2)+'\n')
print(f'REMOTE_BYTES {result["outcome"]} deployment={DEPLOYMENT_ID} files={len(FILES)}/{len(FILES)} status200={sum(row["exit"]==0 for row in rows)}/{len(FILES)} nonblank={sum(row["remote_bytes"]>0 for row in rows)}/{len(FILES)} byte_equal={sum(row["equal"] for row in rows)}/{len(FILES)}')
if fail:
 [print('FAIL '+json.dumps(item,sort_keys=True)) for item in fail];raise SystemExit(1)
