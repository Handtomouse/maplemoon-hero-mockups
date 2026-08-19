# MapleMoon Shopify theme update S1B recovery

- Store: `maplemooncarob.myshopify.com`.
- Live source, never touched: `154500595909` / `Ethereal` / `live`.
- Update target: `160076628165` / `MapleMoon Private Review 20260817 S1` / `unpublished`.
- Theme family `Etheryx`, installed preset `Ethereal`, installed version `1.4.0`, author `OpenThinking`.

## Trees captured

| Directory | Files | Bytes | Gate directory SHA-256 | Relative tree SHA-256 |
|---|---|---|---|---|
| `before-160076628165/` | 246 | 2,866,869 | `e48a21dc289c2534aaf06711e1e4b653a7b4b54ce7a11406f8d78027a147ccc4` | `6f94b20a498fa0db7d3d4f602a04a783809689e75f95dbf234f802e8ec9c5dee` |
| `live-154500595909/` | 246 | 2,866,869 | `e48a21dc289c2534aaf06711e1e4b653a7b4b54ce7a11406f8d78027a147ccc4` | `6f94b20a498fa0db7d3d4f602a04a783809689e75f95dbf234f802e8ec9c5dee` |

Both are byte-identical to the sealed S0 recovery under `diff -qr` (exit 0).

There is no `after-160076628165/` directory. The official 1.6.0 update did not
run, so there is no after state to capture. An empty directory was deliberately
removed rather than left to imply an acquisition that never happened.

## Digest algorithms, both reproduced from the sealed S0 tree

- **Gate directory digest**: `path_snapshot` in
  `maplemoon-website/scripts/check-maplemoon-receipt.py` — sorted `rglob`, then
  relative POSIX path, NUL, lowercase file SHA-256, newline.
- **Relative tree SHA-256**: SHA-256 over `"<file-sha256>  ./<relative-path>\n"`
  lines for every file, sorted by relative path. This was recovered by
  reproducing the sealed S0 value `6f94b20a...` exactly, not assumed.

## Acquisition

Shopify CLI 3.92.1 `shopify theme pull --nodelete` only. No push, update, edit,
repair, publish, rename or delete ran against either theme.
