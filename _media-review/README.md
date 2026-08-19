# MapleMoon media cleanup review

Generated: 2026-08-14T00:37:23.563Z

This folder uses symlinks, not copies, so it consumes very little additional disk space. Deleting a symlink does not delete the original and does not free meaningful space. Use `index.html` to mark candidates, export `DELETE-CANDIDATES.txt`, then review and remove originals in a controlled pass.

For a tagged Finder view, open `FINDER START HERE`. Finder tags are applied only to real review folders, never to original media files.

## Categories

- `01-site-referenced/`: filename appears in active site/deploy source. Treat as keep unless references are changed.
- `02-other-referenced/`: filename appears elsewhere in the project, such as reviews, evidence, or notes.
- `03-possibly-unused/`: no literal filename reference found. Dynamic references are possible, so this is a review queue, not proof that deletion is safe.

## Totals

- Media: 1917 files, 2.9 GB
- Possibly unused: 596 files, 831 MB
- Exact duplicates: 248 groups, up to 796 MB redundant bytes if every group is safely consolidated to one copy
- Zero-byte media: 0

Exact detail is in `manifest.csv`, `manifest.json`, and `exact-duplicate-groups.csv`.
