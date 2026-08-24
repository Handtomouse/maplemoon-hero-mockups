# R3 attempt 1 — harness-only stop

`build-content-r3.py` returned `EXTRACT_FAIL label=review-grid` immediately after copying the exact pinned R2 tree. No page transformation had run. The destination tree remained byte-identical to R2 (`403ba4462cca930101d6afe42777d38528e34e0732a1daef35dd6c92db44a667`, 75 files).

Cause: the verifier regex assumed a fixed nested `</div>` count around the review cards. Correction: delimit the immutable review grid by its exact opening marker and the following exact review-note marker, then compare that entire substring byte-for-byte before and after. Resume is permitted only when the existing R3 tree is still the exact R2 tree.
