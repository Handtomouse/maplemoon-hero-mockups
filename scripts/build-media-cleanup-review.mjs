#!/usr/bin/env node

import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const OUTPUT = path.join(ROOT, '_media-review');
const MEDIA_EXTENSIONS = new Set([
  '.avif', '.avi', '.bmp', '.gif', '.heic', '.ico', '.jpeg', '.jpg', '.m4v',
  '.mkv', '.mov', '.mp4', '.png', '.svg', '.tif', '.tiff', '.webm', '.webp',
]);
const VIDEO_EXTENSIONS = new Set(['.avi', '.m4v', '.mkv', '.mov', '.mp4', '.webm']);
const TEXT_EXTENSIONS = new Set([
  '', '.cjs', '.css', '.csv', '.htm', '.html', '.js', '.json', '.jsx', '.liquid',
  '.lock', '.manifest', '.md', '.mjs', '.scss', '.sha256', '.ts', '.tsx', '.txt',
  '.xml', '.yaml', '.yml',
]);
const SKIP_DIRECTORIES = new Set(['.git', 'node_modules', '_media-review']);
const MAX_TEXT_BYTES = 8 * 1024 * 1024;
const MAX_RECORDED_REFERENCES = 40;

const toPosix = (value) => value.split(path.sep).join('/');
const relativeToRoot = (value) => toPosix(path.relative(ROOT, value));
const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');
const csvCell = (value) => {
  const stringValue = Array.isArray(value) ? value.join(' | ') : String(value ?? '');
  return /[",\n\r]/.test(stringValue) ? `"${stringValue.replaceAll('"', '""')}"` : stringValue;
};
const formatBytes = (bytes) => {
  const units = ['B', 'KB', 'MB', 'GB'];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value >= 10 || unit === 0 ? value.toFixed(0) : value.toFixed(1)} ${units[unit]}`;
};
const encodedPath = (value) => value.split('/').map(encodeURIComponent).join('/');
const regexEscape = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

async function walk(directory, visitor) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  entries.sort((a, b) => a.name.localeCompare(b.name));
  for (const entry of entries) {
    if (entry.name === '.DS_Store') continue;
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRECTORIES.has(entry.name)) continue;
      await walk(absolutePath, visitor);
      continue;
    }
    if (entry.isFile() || entry.isSymbolicLink()) await visitor(absolutePath);
  }
}

function isActiveSiteSource(relativePath) {
  if (relativePath.startsWith('_wip/deploy/site/')) return true;
  if (relativePath.startsWith('_wip/deploy/site-full/')) return true;
  if (relativePath.startsWith('sections/')) return true;
  if (/^_wip\/[^/]+\.WIP\.html$/i.test(relativePath)) return true;
  return !relativePath.includes('/') && /\.(?:css|html?|js|json|liquid|mjs)$/i.test(relativePath);
}

function custodyLabel(relativePath) {
  if (relativePath.startsWith('_wip/recovery/')) return 'recovery-checkpoint';
  if (relativePath.startsWith('_wip/masters/')) return 'master';
  if (relativePath.startsWith('_wip/evidence/')) return 'evidence';
  if (relativePath.startsWith('docs/orchestration/')) return 'orchestration-proof';
  if (relativePath.startsWith('assets/')) return 'primary-asset';
  if (relativePath.startsWith('_wip/deploy/')) return 'deploy-copy';
  if (
    relativePath.startsWith('outputs/') ||
    relativePath.startsWith('review/') ||
    relativePath.startsWith('_wip/reviews/') ||
    relativePath.startsWith('_wip/checkpoints/') ||
    relativePath.startsWith('docs/client-review/')
  ) return 'generated-or-review';
  return 'general';
}

async function sha256(filePath) {
  const hash = crypto.createHash('sha256');
  const handle = await fs.open(filePath, 'r');
  try {
    const buffer = Buffer.allocUnsafe(1024 * 1024);
    let position = 0;
    while (true) {
      const { bytesRead } = await handle.read(buffer, 0, buffer.length, position);
      if (!bytesRead) break;
      hash.update(buffer.subarray(0, bytesRead));
      position += bytesRead;
    }
  } finally {
    await handle.close();
  }
  return hash.digest('hex');
}

function buildBasenameRegexes(basenames) {
  const patterns = [...basenames]
    .sort((a, b) => b.length - a.length)
    .map(regexEscape);
  const chunks = [];
  let chunk = [];
  let length = 0;
  for (const pattern of patterns) {
    if (chunk.length && length + pattern.length > 18000) {
      chunks.push(new RegExp(chunk.join('|'), 'gi'));
      chunk = [];
      length = 0;
    }
    chunk.push(pattern);
    length += pattern.length + 1;
  }
  if (chunk.length) chunks.push(new RegExp(chunk.join('|'), 'gi'));
  return chunks;
}

function renderCard(media) {
  const linkedPath = `${media.category}/${media.relativePath}`;
  const preview = media.isVideo
    ? `<video controls muted preload="none" src="${encodedPath(linkedPath)}"></video>`
    : `<img loading="lazy" decoding="async" src="${encodedPath(linkedPath)}" alt="">`;
  const references = media.referenceSources.length
    ? `<details><summary>${media.referenceCount} reference${media.referenceCount === 1 ? '' : 's'}</summary><ul>${media.referenceSources.slice(0, 8).map((source) => `<li>${escapeHtml(source)}</li>`).join('')}</ul></details>`
    : '<p class="no-ref">No literal filename reference found.</p>';
  const duplicate = media.duplicateGroup
    ? `<span class="pill duplicate">duplicate ×${media.duplicateCount}</span>`
    : '';
  return `<article class="card" data-category="${escapeHtml(media.category)}" data-path="${escapeHtml(media.relativePath.toLowerCase())}" data-size="${media.size}" data-duplicate="${media.duplicateGroup ? 'yes' : 'no'}">
    <div class="preview">${preview}</div>
    <div class="body">
      <label class="mark"><input type="checkbox" data-mark="${escapeHtml(media.relativePath)}"> mark for review</label>
      <h2 title="${escapeHtml(media.relativePath)}">${escapeHtml(path.basename(media.relativePath))}</h2>
      <p class="path">${escapeHtml(media.relativePath)}</p>
      <div class="pills"><span class="pill">${escapeHtml(formatBytes(media.size))}</span><span class="pill">${escapeHtml(media.custody)}</span>${duplicate}</div>
      ${references}
    </div>
  </article>`;
}

function renderHtml(media, summary) {
  const cards = media.map(renderCard).join('\n');
  const summaryJson = JSON.stringify(summary).replaceAll('<', '\\u003c');
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>MapleMoon media cleanup review</title>
  <style>
    :root{color-scheme:dark;--bg:#111315;--panel:#1b1e21;--ink:#f2eee3;--muted:#aab1b5;--line:#343a3e;--gold:#e2b866;--red:#ec816d;--green:#85c59a}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:14px/1.45 system-ui,-apple-system,sans-serif}header{position:sticky;z-index:5;top:0;padding:18px 22px;background:rgba(17,19,21,.96);border-bottom:1px solid var(--line);backdrop-filter:blur(12px)}h1{font-size:24px;margin:0 0 5px}header p{max-width:1000px;margin:0;color:var(--muted)}.warning{color:var(--gold);font-weight:650}.stats,.controls{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}.stat,.controls>*{border:1px solid var(--line);border-radius:8px;background:var(--panel);padding:8px 10px}.stat b{display:block;font-size:17px}.stat span{color:var(--muted);font-size:12px}.controls input[type=search]{min-width:310px;color:var(--ink)}button,select,input{font:inherit}button,select{color:var(--ink)}button{cursor:pointer}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px;padding:18px}.card{min-width:0;overflow:hidden;border:1px solid var(--line);border-radius:12px;background:var(--panel)}.preview{height:210px;display:grid;place-items:center;background:#090a0b}.preview img,.preview video{display:block;width:100%;height:100%;object-fit:contain}.body{padding:12px}.body h2{margin:8px 0 4px;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.path{height:38px;margin:0;color:var(--muted);font:11px/1.3 ui-monospace,SFMono-Regular,monospace;overflow:hidden;overflow-wrap:anywhere}.mark{display:flex;gap:7px;align-items:center;color:var(--gold);font-weight:650}.pills{display:flex;flex-wrap:wrap;gap:5px;margin:9px 0}.pill{padding:3px 6px;border-radius:999px;background:#292e32;color:#c9d0d3;font-size:11px}.duplicate{color:#ffd2c8;background:#4b2925}.no-ref{color:var(--red);font-size:12px}details{color:var(--muted);font-size:12px}details ul{padding-left:18px;overflow-wrap:anywhere}.hidden{display:none!important}#selection{position:fixed;z-index:10;right:18px;bottom:18px;width:min(460px,calc(100vw - 36px));padding:12px;border:1px solid var(--gold);border-radius:12px;background:#202326;box-shadow:0 12px 40px #0008}#selection p{margin:0 0 8px}#selection button{margin-right:6px}.empty{display:none;padding:40px;text-align:center;color:var(--muted)}@media(max-width:700px){header{position:static}.controls input[type=search]{min-width:100%;width:100%}.grid{grid-template-columns:1fr}}
  </style>
</head>
<body>
  <header>
    <h1>MapleMoon media cleanup review</h1>
    <p><span class="warning">Nothing here is a copy and nothing has been deleted.</span> The folders contain symlinks to the originals. Deleting a symlink will not free meaningful space. Mark candidates here, export the list, then verify references before deleting originals.</p>
    <div class="stats">
      <div class="stat"><b>${summary.totalFiles.toLocaleString()}</b><span>media files · ${escapeHtml(formatBytes(summary.totalBytes))}</span></div>
      <div class="stat"><b>${summary.siteReferenced.toLocaleString()}</b><span>site-referenced</span></div>
      <div class="stat"><b>${summary.otherReferenced.toLocaleString()}</b><span>other referenced</span></div>
      <div class="stat"><b>${summary.possiblyUnused.toLocaleString()}</b><span>possibly unused · ${escapeHtml(formatBytes(summary.possiblyUnusedBytes))}</span></div>
      <div class="stat"><b>${summary.duplicateGroups.toLocaleString()}</b><span>duplicate groups · up to ${escapeHtml(formatBytes(summary.duplicateReclaimBytes))}</span></div>
    </div>
    <div class="controls">
      <input id="search" type="search" placeholder="Filter by filename or path">
      <select id="category"><option value="all">All categories</option><option value="01-site-referenced">Site-referenced</option><option value="02-other-referenced">Other referenced</option><option value="03-possibly-unused">Possibly unused</option></select>
      <label><input id="duplicates" type="checkbox"> exact duplicates only</label>
      <label><input id="marked" type="checkbox"> marked only</label>
      <select id="sort"><option value="path">Sort: path</option><option value="size">Sort: largest first</option></select>
    </div>
  </header>
  <main id="grid" class="grid">${cards}</main>
  <p id="empty" class="empty">No media matches those filters.</p>
  <aside id="selection" hidden><p><b><span id="selection-count">0</span> marked</b>. This exports paths only; it does not delete anything.</p><button id="export">Export DELETE-CANDIDATES.txt</button><button id="clear">Clear marks</button></aside>
  <script>
    const summary=${summaryJson};
    const grid=document.getElementById('grid');const cards=[...grid.children];const search=document.getElementById('search');const category=document.getElementById('category');const duplicates=document.getElementById('duplicates');const marked=document.getElementById('marked');const sort=document.getElementById('sort');const selection=document.getElementById('selection');const selectionCount=document.getElementById('selection-count');
    let marks=new Set(JSON.parse(localStorage.getItem('maplemoon-media-delete-candidates')||'[]'));
    document.querySelectorAll('[data-mark]').forEach(input=>{input.checked=marks.has(input.dataset.mark);input.addEventListener('change',()=>{input.checked?marks.add(input.dataset.mark):marks.delete(input.dataset.mark);save();apply();});});
    function save(){localStorage.setItem('maplemoon-media-delete-candidates',JSON.stringify([...marks].sort()));selection.hidden=!marks.size;selectionCount.textContent=marks.size;}
    function apply(){const q=search.value.trim().toLowerCase();const c=category.value;let shown=0;cards.forEach(card=>{const input=card.querySelector('[data-mark]');const visible=(!q||card.dataset.path.includes(q))&&(c==='all'||card.dataset.category===c)&&(!duplicates.checked||card.dataset.duplicate==='yes')&&(!marked.checked||input.checked);card.classList.toggle('hidden',!visible);if(visible)shown++;});document.getElementById('empty').style.display=shown?'none':'block';const ordered=[...cards].sort((a,b)=>sort.value==='size'?Number(b.dataset.size)-Number(a.dataset.size):a.dataset.path.localeCompare(b.dataset.path));ordered.forEach(card=>grid.appendChild(card));}
    [search,category,duplicates,marked,sort].forEach(control=>control.addEventListener('input',apply));
    document.getElementById('clear').addEventListener('click',()=>{marks.clear();document.querySelectorAll('[data-mark]').forEach(input=>input.checked=false);save();apply();});
    document.getElementById('export').addEventListener('click',()=>{const header=['# MapleMoon deletion candidates','# Generated from _media-review/index.html','# REVIEW BEFORE DELETING ORIGINALS; paths are repository-relative.',''];const blob=new Blob([[...header,...marks].join('\\n')+'\\n'],{type:'text/plain'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='DELETE-CANDIDATES.txt';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);});
    save();apply();
  </script>
</body>
</html>`;
}

async function main() {
  const media = [];
  const textCandidates = [];
  await walk(ROOT, async (absolutePath) => {
    const extension = path.extname(absolutePath).toLowerCase();
    const stat = await fs.stat(absolutePath);
    if (MEDIA_EXTENSIONS.has(extension)) {
      media.push({
        absolutePath,
        relativePath: relativeToRoot(absolutePath),
        extension,
        isVideo: VIDEO_EXTENSIONS.has(extension),
        size: stat.size,
        mtime: stat.mtime.toISOString(),
        referenceSources: [],
        referenceCount: 0,
      });
    } else if (TEXT_EXTENSIONS.has(extension) && stat.size <= MAX_TEXT_BYTES) {
      textCandidates.push({ absolutePath, relativePath: relativeToRoot(absolutePath) });
    }
  });

  if (!media.length) throw new Error('No media files found; refusing to write an empty review.');

  const byBasename = new Map();
  for (const item of media) {
    const key = path.basename(item.relativePath).toLowerCase();
    if (!byBasename.has(key)) byBasename.set(key, []);
    byBasename.get(key).push(item);
  }
  const basenameRegexes = buildBasenameRegexes(byBasename.keys());

  for (const source of textCandidates) {
    let buffer;
    try {
      buffer = await fs.readFile(source.absolutePath);
    } catch {
      continue;
    }
    if (buffer.includes(0)) continue;
    const text = buffer.toString('utf8');
    const matchedBasenames = new Set();
    for (const regex of basenameRegexes) {
      regex.lastIndex = 0;
      for (const match of text.matchAll(regex)) matchedBasenames.add(match[0].toLowerCase());
    }
    for (const basename of matchedBasenames) {
      for (const item of byBasename.get(basename) ?? []) {
        item.referenceCount += 1;
        if (item.referenceSources.length < MAX_RECORDED_REFERENCES) item.referenceSources.push(source.relativePath);
      }
    }
  }

  const bySize = new Map();
  for (const item of media) {
    if (!bySize.has(item.size)) bySize.set(item.size, []);
    bySize.get(item.size).push(item);
  }
  const duplicateHashGroups = new Map();
  for (const sameSize of bySize.values()) {
    if (sameSize.length < 2) continue;
    for (const item of sameSize) {
      item.sha256 = await sha256(item.absolutePath);
      if (!duplicateHashGroups.has(item.sha256)) duplicateHashGroups.set(item.sha256, []);
      duplicateHashGroups.get(item.sha256).push(item);
    }
  }
  let duplicateSequence = 0;
  const duplicateGroups = [...duplicateHashGroups.entries()]
    .filter(([, items]) => items.length > 1)
    .sort((a, b) => (b[1][0].size * (b[1].length - 1)) - (a[1][0].size * (a[1].length - 1)))
    .map(([hash, items]) => {
      duplicateSequence += 1;
      const id = `D${String(duplicateSequence).padStart(4, '0')}`;
      for (const item of items) {
        item.duplicateGroup = id;
        item.duplicateCount = items.length;
        item.sha256 = hash;
      }
      return { id, hash, size: items[0].size, reclaimBytes: items[0].size * (items.length - 1), items };
    });

  for (const item of media) {
    const hasSiteReference = item.referenceSources.some(isActiveSiteSource);
    item.category = hasSiteReference
      ? '01-site-referenced'
      : item.referenceCount
        ? '02-other-referenced'
        : '03-possibly-unused';
    item.custody = custodyLabel(item.relativePath);
  }
  media.sort((a, b) => a.category.localeCompare(b.category) || a.relativePath.localeCompare(b.relativePath));

  await fs.mkdir(OUTPUT, { recursive: false }).catch(async (error) => {
    if (error.code !== 'EEXIST') throw error;
    throw new Error(`${relativeToRoot(OUTPUT)} already exists. Remove it explicitly before rebuilding so an old review is never silently overwritten.`);
  });

  for (const item of media) {
    const linkPath = path.join(OUTPUT, item.category, item.relativePath);
    await fs.mkdir(path.dirname(linkPath), { recursive: true });
    await fs.symlink(path.relative(path.dirname(linkPath), item.absolutePath), linkPath);
  }

  const summary = {
    generatedAt: new Date().toISOString(),
    root: ROOT,
    totalFiles: media.length,
    totalBytes: media.reduce((sum, item) => sum + item.size, 0),
    siteReferenced: media.filter((item) => item.category === '01-site-referenced').length,
    siteReferencedBytes: media.filter((item) => item.category === '01-site-referenced').reduce((sum, item) => sum + item.size, 0),
    otherReferenced: media.filter((item) => item.category === '02-other-referenced').length,
    otherReferencedBytes: media.filter((item) => item.category === '02-other-referenced').reduce((sum, item) => sum + item.size, 0),
    possiblyUnused: media.filter((item) => item.category === '03-possibly-unused').length,
    possiblyUnusedBytes: media.filter((item) => item.category === '03-possibly-unused').reduce((sum, item) => sum + item.size, 0),
    duplicateGroups: duplicateGroups.length,
    duplicateFiles: duplicateGroups.reduce((sum, group) => sum + group.items.length, 0),
    duplicateReclaimBytes: duplicateGroups.reduce((sum, group) => sum + group.reclaimBytes, 0),
    zeroByteFiles: media.filter((item) => item.size === 0).map((item) => item.relativePath),
    scannedTextFiles: textCandidates.length,
  };

  const manifestRows = [
    ['category', 'path', 'bytes', 'size', 'type', 'custody', 'reference_count', 'reference_sources', 'duplicate_group', 'duplicate_count', 'sha256', 'modified'],
    ...media.map((item) => [
      item.category, item.relativePath, item.size, formatBytes(item.size), item.isVideo ? 'video' : 'image', item.custody,
      item.referenceCount, item.referenceSources, item.duplicateGroup ?? '', item.duplicateCount ?? '', item.sha256 ?? '', item.mtime,
    ]),
  ];
  const duplicateRows = [
    ['group', 'bytes_each', 'size_each', 'copies', 'potential_reclaim_bytes', 'potential_reclaim', 'sha256', 'paths'],
    ...duplicateGroups.map((group) => [group.id, group.size, formatBytes(group.size), group.items.length, group.reclaimBytes, formatBytes(group.reclaimBytes), group.hash, group.items.map((item) => item.relativePath)]),
  ];
  const jsonManifest = { summary, media: media.map(({ absolutePath, ...item }) => item) };
  const readme = `# MapleMoon media cleanup review\n\nGenerated: ${summary.generatedAt}\n\nThis folder uses symlinks, not copies, so it consumes very little additional disk space. Deleting a symlink does not delete the original and does not free meaningful space. Use \`index.html\` to mark candidates, export \`DELETE-CANDIDATES.txt\`, then review and remove originals in a controlled pass.\n\nFor a tagged Finder view, run \`node scripts/build-media-finder-review.mjs\` after generating this review, then open \`_media-review/FINDER START HERE\`. Finder tags are applied only to real review folders, never to original media files.\n\n## Categories\n\n- \`01-site-referenced/\`: filename appears in active site/deploy source. Treat as keep unless references are changed.\n- \`02-other-referenced/\`: filename appears elsewhere in the project, such as reviews, evidence, or notes.\n- \`03-possibly-unused/\`: no literal filename reference found. Dynamic references are possible, so this is a review queue, not proof that deletion is safe.\n\n## Totals\n\n- Media: ${summary.totalFiles} files, ${formatBytes(summary.totalBytes)}\n- Possibly unused: ${summary.possiblyUnused} files, ${formatBytes(summary.possiblyUnusedBytes)}\n- Exact duplicates: ${summary.duplicateGroups} groups, up to ${formatBytes(summary.duplicateReclaimBytes)} redundant bytes if every group is safely consolidated to one copy\n- Zero-byte media: ${summary.zeroByteFiles.length}\n\nExact detail is in \`manifest.csv\`, \`manifest.json\`, and \`exact-duplicate-groups.csv\`.\n`;

  await Promise.all([
    fs.writeFile(path.join(OUTPUT, 'README.md'), readme),
    fs.writeFile(path.join(OUTPUT, 'index.html'), renderHtml(media, summary)),
    fs.writeFile(path.join(OUTPUT, 'manifest.csv'), manifestRows.map((row) => row.map(csvCell).join(',')).join('\n') + '\n'),
    fs.writeFile(path.join(OUTPUT, 'manifest.json'), JSON.stringify(jsonManifest, null, 2) + '\n'),
    fs.writeFile(path.join(OUTPUT, 'exact-duplicate-groups.csv'), duplicateRows.map((row) => row.map(csvCell).join(',')).join('\n') + '\n'),
  ]);

  console.log(JSON.stringify(summary, null, 2));
}

main().catch((error) => {
  console.error(error.stack || String(error));
  process.exitCode = 1;
});
