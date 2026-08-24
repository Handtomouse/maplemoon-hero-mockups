#!/usr/bin/env python3
"""Prepare an isolated exact R4 Vercel staging directory."""

from __future__ import annotations

import hashlib
import json
import shutil
from pathlib import Path


ROOT=Path('/Users/handtomouse/maplemoon-website')
R4=ROOT/'_wip/deploy/generated/maplemoon-admitted-preview-r4-20260824T111607'
STAGING=Path('/private/tmp/maplemoon-r5-20260824T112414')
PROJECT=Path('/Users/handtomouse/maplemoon_build_20260813/.vercel/project.json')
R4_RECEIPT=ROOT/'docs/orchestration/reviews/MAPLEMOON-ADMITTED-PREVIEW-RUNTIME-R4-20260824T111607.json'
R4_TREE='5a649086667c7ed017e45b2cb97fdf6d356d1b4ad636a2d51b09b2b7321efe49'
R4_RECEIPT_SHA='ac60ed2f0d7fa34eb4be00f264c912bd2eebf33f48d74fc9ba5d17968f415222'
PROJECT_SHA='67c7d22f79bf6ac5785d8c9b760ac5df4081448c247228a71f445c61200db902'

def sha(path):return hashlib.sha256(path.read_bytes()).hexdigest()
def tree(path,exclude_vercel=False):
 d=hashlib.sha256();n=0
 for child in sorted(path.rglob('*')):
  if not child.is_file():continue
  relative=child.relative_to(path)
  if exclude_vercel and relative.parts[0]=='.vercel':continue
  d.update(relative.as_posix().encode());d.update(b'\0');d.update(sha(child).encode());d.update(b'\n');n+=1
 return d.hexdigest(),n

if tree(R4)!=(R4_TREE,75):raise SystemExit(f'R4_TREE_FAIL {tree(R4)}')
if sha(R4_RECEIPT)!=R4_RECEIPT_SHA:raise SystemExit('R4_RECEIPT_FAIL')
if sha(PROJECT)!=PROJECT_SHA:raise SystemExit('PROJECT_BINDING_FAIL')
project=json.loads(PROJECT.read_text())
if project.get('projectId')!='prj_uyvhJMmqX5hq2mFxzLUKu3sxqyzn' or project.get('orgId')!='team_385xEDn7YomEO2eo5pHTp3px':
 raise SystemExit('PROJECT_IDENTITY_FAIL')
if STAGING.exists():raise SystemExit(f'NON_OVERWRITE_FAIL staging exists: {STAGING}')
shutil.copytree(R4,STAGING)
(STAGING/'.vercel').mkdir()
shutil.copy2(PROJECT,STAGING/'.vercel/project.json')
if tree(STAGING,exclude_vercel=True)!=(R4_TREE,75):raise SystemExit('STAGING_BYTES_FAIL')
print(f'STAGING PASS path={STAGING} candidate_sha256={R4_TREE} files=75 project={project["projectId"]} org={project["orgId"]} link_sha256={PROJECT_SHA}')
