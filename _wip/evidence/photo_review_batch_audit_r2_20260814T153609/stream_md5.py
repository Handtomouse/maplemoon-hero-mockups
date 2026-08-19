#!/usr/bin/env python3
import hashlib
import sys

digest = hashlib.md5()
size = 0
while True:
    chunk = sys.stdin.buffer.read(1024 * 1024)
    if not chunk:
        break
    size += len(chunk)
    digest.update(chunk)
print(f'PRODUCTION_HOME bytes={size} md5={digest.hexdigest()} nonblank={str(size > 0).lower()}')
raise SystemExit(0 if size > 0 else 1)
