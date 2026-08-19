#!/usr/bin/env node

import { execFile } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const ROOT = process.cwd();
const REVIEW = path.join(ROOT, '_media-review');
const MANIFEST = path.join(REVIEW, 'manifest.json');
const FINDER_START = path.join(REVIEW, 'FINDER START HERE');
const DUPLICATE_ROOT = path.join(REVIEW, '04-exact-duplicate-groups');
const SAFETY_ROOT = path.join(REVIEW, '05-by-safety');
const TAG_COMMAND = '/opt/homebrew/bin/tag';

const STATUS_SHORTCUTS = [
  ['1 KEEP - SITE USED', path.join(REVIEW, '01-site-referenced')],
  ['2 CHECK - REFERENCED ELSEWHERE', path.join(REVIEW, '02-other-referenced')],
  ['3 REVIEW - POSSIBLY UNUSED', path.join(REVIEW, '03-possibly-unused')],
  ['4 REVIEW - EXACT DUPLICATE GROUPS', DUPLICATE_ROOT],
  ['5 REVIEW - BY SAFETY', SAFETY_ROOT],
];

const SAFETY_BUCKETS = new Map([
  ['primary-asset', ['01 HOLD - PRIMARY ASSETS', 'MM Hold']],
  ['deploy-copy', ['02 HOLD - DEPLOY COPIES', 'MM Hold']],
  ['master', ['03 HOLD - MASTERS', 'MM Hold']],
  ['recovery-checkpoint', ['04 HOLD - RECOVERY CHECKPOINTS', 'MM Hold']],
  ['evidence', ['05 HOLD - EVIDENCE', 'MM Hold']],
  ['orchestration-proof', ['06 HOLD - ORCHESTRATION PROOF', 'MM Hold']],
  ['generated-or-review', ['07 REVIEW - GENERATED AND REVIEW OUTPUT', 'MM Cleanup Candidate']],
  ['general', ['08 REVIEW - GENERAL', 'MM Review']],
]);

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

function assertInsideReview(target) {
  const resolved = path.resolve(target);
  if (resolved !== REVIEW && !resolved.startsWith(`${REVIEW}${path.sep}`)) {
    throw new Error(`Refusing to operate outside _media-review: ${target}`);
  }
}

async function assertAbsent(target) {
  assertInsideReview(target);
  try {
    await fs.lstat(target);
  } catch (error) {
    if (error.code === 'ENOENT') return;
    throw error;
  }
  throw new Error(`${path.relative(ROOT, target)} already exists; refusing to overwrite an existing Finder review.`);
}

async function createRelativeSymlink(target, linkPath, type = undefined) {
  assertInsideReview(linkPath);
  await fs.mkdir(path.dirname(linkPath), { recursive: true });
  await fs.symlink(path.relative(path.dirname(linkPath), target), linkPath, type);
}

function compactLinkName(index, originalPath) {
  const basename = path.basename(originalPath);
  const extension = path.extname(basename);
  const stem = basename.slice(0, basename.length - extension.length);
  const compactStem = stem.length > 170 ? `${stem.slice(0, 167)}...` : stem;
  return `${String(index + 1).padStart(2, '0')} - ${compactStem}${extension}`;
}

async function addFinderTag(tagName, directories) {
  const safeDirectories = [];
  for (const directory of directories) {
    assertInsideReview(directory);
    const stat = await fs.lstat(directory);
    if (!stat.isDirectory() || stat.isSymbolicLink()) {
      throw new Error(`Finder tags may only be added to real review directories: ${directory}`);
    }
    safeDirectories.push(directory);
  }
  for (let index = 0; index < safeDirectories.length; index += 80) {
    await execFileAsync(TAG_COMMAND, ['--add', tagName, ...safeDirectories.slice(index, index + 80)]);
  }
}

async function main() {
  const manifest = JSON.parse(await fs.readFile(MANIFEST, 'utf8'));
  if (!manifest.summary || !Array.isArray(manifest.media) || !manifest.media.length) {
    throw new Error('The media manifest is blank or invalid; refusing to build an empty Finder review.');
  }
  if (manifest.media.length !== manifest.summary.totalFiles) {
    throw new Error('Manifest count mismatch; rebuild the media review before creating Finder folders.');
  }

  await Promise.all([FINDER_START, DUPLICATE_ROOT, SAFETY_ROOT].map(assertAbsent));
  await Promise.all([
    fs.mkdir(FINDER_START),
    fs.mkdir(DUPLICATE_ROOT),
    fs.mkdir(SAFETY_ROOT),
  ]);

  for (const [name, target] of STATUS_SHORTCUTS) {
    await createRelativeSymlink(target, path.join(FINDER_START, name), 'dir');
  }
  await createRelativeSymlink(path.join(REVIEW, 'manifest.csv'), path.join(FINDER_START, 'MEDIA MANIFEST.csv'));
  await createRelativeSymlink(path.join(REVIEW, 'exact-duplicate-groups.csv'), path.join(FINDER_START, 'DUPLICATE REPORT.csv'));

  const startText = `MAPLEMOON FINDER MEDIA REVIEW\n\nStart with:\n  3 REVIEW - POSSIBLY UNUSED\n  4 REVIEW - EXACT DUPLICATE GROUPS\n  5 REVIEW - BY SAFETY\n\nFinder tags:\n  MM Keep - Site Used\n  MM Check - Referenced\n  MM Review - Possibly Unused\n  MM Exact Duplicate\n  MM Hold\n  MM Cleanup Candidate\n  MM Review\n\nIMPORTANT\nThese file entries are symlinks. They preview the real project media without creating another copy. Deleting a symlink does not delete its original and does not free meaningful disk space. Use the shown source path to verify an original before deletion, or give Codex the selected paths for a controlled deletion pass.\n`;
  await fs.writeFile(path.join(FINDER_START, 'START HERE.txt'), startText);

  const duplicateGroups = new Map();
  for (const item of manifest.media) {
    if (!item.duplicateGroup) continue;
    if (!duplicateGroups.has(item.duplicateGroup)) duplicateGroups.set(item.duplicateGroup, []);
    duplicateGroups.get(item.duplicateGroup).push(item);
  }
  const duplicateDirectories = [];
  for (const [groupId, items] of [...duplicateGroups.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    const reclaimBytes = items[0].size * (items.length - 1);
    const groupDirectory = path.join(DUPLICATE_ROOT, `${groupId} - ${items.length} copies - ${formatBytes(reclaimBytes)} potential`);
    await fs.mkdir(groupDirectory);
    duplicateDirectories.push(groupDirectory);
    const paths = [];
    for (const [index, item] of items.entries()) {
      const original = path.join(ROOT, item.relativePath);
      const linkPath = path.join(groupDirectory, compactLinkName(index, item.relativePath));
      await createRelativeSymlink(original, linkPath);
      paths.push(`${String(index + 1).padStart(2, '0')}  ${item.relativePath}`);
    }
    await fs.writeFile(path.join(groupDirectory, 'ORIGINAL PATHS.txt'), `${paths.join('\n')}\n`);
  }

  const safetyDirectories = new Map();
  for (const [custody, [folderName]] of SAFETY_BUCKETS) {
    const directory = path.join(SAFETY_ROOT, folderName);
    await fs.mkdir(directory);
    safetyDirectories.set(custody, directory);
  }
  for (const item of manifest.media) {
    const safetyDirectory = safetyDirectories.get(item.custody);
    if (!safetyDirectory) throw new Error(`Unknown safety classification: ${item.custody}`);
    await createRelativeSymlink(path.join(ROOT, item.relativePath), path.join(safetyDirectory, item.relativePath));
  }

  await addFinderTag('MapleMoon Media Review', [REVIEW, FINDER_START]);
  await addFinderTag('MM Keep - Site Used', [path.join(REVIEW, '01-site-referenced')]);
  await addFinderTag('MM Check - Referenced', [path.join(REVIEW, '02-other-referenced')]);
  await addFinderTag('MM Review - Possibly Unused', [path.join(REVIEW, '03-possibly-unused')]);
  await addFinderTag('MM Exact Duplicate', [DUPLICATE_ROOT, ...duplicateDirectories]);
  for (const [, [folderName, tagName]] of SAFETY_BUCKETS) {
    await addFinderTag(tagName, [path.join(SAFETY_ROOT, folderName)]);
  }

  const summary = {
    mediaFiles: manifest.media.length,
    statusShortcuts: STATUS_SHORTCUTS.length,
    duplicateGroups: duplicateGroups.size,
    duplicateLinks: [...duplicateGroups.values()].reduce((sum, items) => sum + items.length, 0),
    safetyFolders: SAFETY_BUCKETS.size,
    safetyLinks: manifest.media.length,
    taggedRealFolders: 2 + 3 + 1 + duplicateDirectories.length + SAFETY_BUCKETS.size,
    originalFilesTagged: 0,
  };
  await fs.writeFile(path.join(FINDER_START, 'FINDER-REVIEW-SUMMARY.json'), `${JSON.stringify(summary, null, 2)}\n`);
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((error) => {
  console.error(error.stack || String(error));
  process.exitCode = 1;
});
