import { spawnSync } from 'node:child_process';
import path from 'node:path';

const [beforeRoot, afterRoot] = process.argv.slice(2);
if (!beforeRoot || !afterRoot) {
  throw new Error('usage: node analyze-theme-check.mjs <before-root> <after-root>');
}

function run(root) {
  const result = spawnSync(
    'shopify',
    ['theme', 'check', '--path', root, '--output', 'json', '--no-color'],
    { encoding: 'utf8', env: { ...process.env, CI: '1', FORCE_COLOR: '0' }, maxBuffer: 10 * 1024 * 1024 },
  );
  if (result.error) throw result.error;
  const files = JSON.parse(result.stdout);
  const diagnostics = files.flatMap((file) =>
    file.offenses.map((offense) => ({
      file: path.relative(root, file.path),
      ...offense,
    })),
  );
  return { exit: result.status, diagnostics };
}

function summarize(runResult) {
  return {
    exit: runResult.exit,
    errors: runResult.diagnostics.filter((item) => item.severity === 'error').length,
    warnings: runResult.diagnostics.filter((item) => item.severity === 'warning').length,
    total: runResult.diagnostics.length,
  };
}

function key(item) {
  return JSON.stringify([item.file, item.severity, item.check, item.message]);
}

function multiset(items) {
  const result = new Map();
  for (const item of items) {
    const itemKey = key(item);
    const bucket = result.get(itemKey) ?? [];
    bucket.push(item);
    result.set(itemKey, bucket);
  }
  return result;
}

function counts(items, property) {
  return Object.fromEntries(
    [...items.reduce((map, item) => map.set(item[property], (map.get(item[property]) ?? 0) + 1), new Map())]
      .sort(([a], [b]) => a.localeCompare(b)),
  );
}

const before = run(beforeRoot);
const after = run(afterRoot);
const beforeWarnings = before.diagnostics.filter((item) => item.severity === 'warning');
const afterWarnings = after.diagnostics.filter((item) => item.severity === 'warning');
const beforeSet = multiset(beforeWarnings);
const afterSet = multiset(afterWarnings);
const introduced = [];
const resolved = [];
let shared = 0;

for (const itemKey of new Set([...beforeSet.keys(), ...afterSet.keys()])) {
  const oldItems = beforeSet.get(itemKey) ?? [];
  const newItems = afterSet.get(itemKey) ?? [];
  shared += Math.min(oldItems.length, newItems.length);
  introduced.push(...newItems.slice(oldItems.length));
  resolved.push(...oldItems.slice(newItems.length));
}

const result = {
  identity: ['relative file', 'severity', 'rule ID', 'message'],
  note: 'Line and column are intentionally excluded so unchanged diagnostics moved by vendor edits remain pre-existing/re-reported.',
  before: summarize(before),
  after: summarize(after),
  warning_delta: {
    shared_pre_existing_re_reported: shared,
    vendor_160_introduced: introduced.length,
    removed_from_140: resolved.length,
    net: introduced.length - resolved.length,
  },
  introduced_by_rule: counts(introduced, 'check'),
  introduced_by_file: counts(introduced, 'file'),
  removed_by_rule: counts(resolved, 'check'),
  removed_by_file: counts(resolved, 'file'),
  introduced: introduced.sort((a, b) => a.file.localeCompare(b.file) || a.start_row - b.start_row),
  removed: resolved.sort((a, b) => a.file.localeCompare(b.file) || a.start_row - b.start_row),
};

console.log(JSON.stringify(result, null, 2));
