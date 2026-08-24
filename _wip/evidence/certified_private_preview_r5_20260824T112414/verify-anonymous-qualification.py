#!/usr/bin/env python3
from pathlib import Path

evidence=Path(__file__).with_name('DEPLOY-EVIDENCE.md').read_text()
required=('VERDICT: FAIL - VERCEL SSO WALL.','Protection was not changed','not anonymously client-shareable')
missing=[value for value in required if value not in evidence]
if missing:
 print('FAIL anonymous qualification missing='+repr(missing));raise SystemExit(1)
print('ANONYMOUS_QUALIFICATION PASS raw_preflight_exit=1 result=VERCEL_SSO_WALL protection=unchanged audience=authenticated_private_review_only')
