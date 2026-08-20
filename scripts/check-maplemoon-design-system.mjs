#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');
const args = process.argv.slice(2);
const allowedFlags = new Set(['--contracts-only', '--route-conformance']);
const allowedRouteTargets = new Set(['home', 'all']);

function finish(code, heading, lines = []) {
  const output = [heading, ...lines].join('\n');
  process.stdout.write(`${output}\n`);
  process.exit(code);
}

const mode = args[0];
const routeTarget = args[1] || null;
const validConfiguration =
  (mode === '--contracts-only' && args.length === 1) ||
  (mode === '--route-conformance' && args.length === 2 && allowedRouteTargets.has(routeTarget));

if (!validConfiguration || !allowedFlags.has(mode)) {
  finish(
    3,
    'ERROR configuration: choose an explicit mode and route target',
    [
      'usage: node scripts/check-maplemoon-design-system.mjs --contracts-only',
      '   or: node scripts/check-maplemoon-design-system.mjs --route-conformance home|all'
    ]
  );
}

const failures = [];
const holds = [];

const contractPaths = {
  tokens: 'docs/design-system/contracts/tokens.v1.json',
  routes: 'docs/design-system/contracts/routes.v1.json',
  components: 'docs/design-system/contracts/components.v1.json',
  responsive: 'docs/design-system/contracts/responsive.v1.json',
  images: 'docs/design-system/contracts/images.v1.json',
  exceptions: 'docs/design-system/contracts/exceptions.v1.json'
};

const designPaths = [
  'assets/design-system/mm-tokens.css',
  'assets/design-system/mm-base.css',
  'assets/design-system/mm-primitives.css',
  'assets/design-system/mm-chrome.css',
  'assets/design-system/mm-chrome.js'
];

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function readNonEmpty(relativePath) {
  const target = absolute(relativePath);
  if (!fs.existsSync(target)) {
    holds.push(`${relativePath}: missing`);
    return null;
  }
  const text = fs.readFileSync(target, 'utf8');
  if (!text.trim()) {
    failures.push(`${relativePath}: zero-content file`);
    return null;
  }
  return text;
}

function readJson(name, relativePath) {
  const text = readNonEmpty(relativePath);
  if (text === null) return null;
  try {
    return JSON.parse(text);
  } catch (error) {
    finish(3, `ERROR configuration: ${relativePath} is invalid JSON`, [error.message]);
  }
}

function requireSchema(name, data) {
  const expected = `maplemoon-design-system/${name}/v1`;
  if (!data || data.schema !== expected || data.version !== 1) {
    failures.push(`${contractPaths[name]}: expected schema ${expected} and version 1`);
  }
}

function requireNonEmptyArray(label, value) {
  if (!Array.isArray(value) || value.length === 0) failures.push(`${label}: expected a non-empty array`);
}

function uniqueBy(label, records, field) {
  if (!Array.isArray(records)) return;
  const seen = new Set();
  for (const record of records) {
    const value = record?.[field];
    if (typeof value !== 'string' || !value.trim()) {
      failures.push(`${label}: record has no ${field}`);
      continue;
    }
    if (seen.has(value)) failures.push(`${label}: duplicate ${field} ${value}`);
    seen.add(value);
  }
}

function normalizeValue(value) {
  return String(value)
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\s*([(),])\s*/g, '$1')
    .toLowerCase();
}

function normalizeCondition(value) {
  return String(value)
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\(\s*/g, '(')
    .replace(/\s*\)/g, ')')
    .replace(/\s*:\s*/g, ':')
    .toLowerCase();
}

function sha256(relativePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(absolute(relativePath))).digest('hex');
}

const contracts = {};
for (const [name, relativePath] of Object.entries(contractPaths)) {
  contracts[name] = readJson(name, relativePath);
  requireSchema(name, contracts[name]);
}
for (const relativePath of designPaths) readNonEmpty(relativePath);

const tokens = contracts.tokens?.tokens;
const routes = contracts.routes?.authoritative_sources;
const components = contracts.components?.components;
const widths = contracts.responsive?.tested_widths;
const images = contracts.images?.contracts;
const exceptions = contracts.exceptions?.exceptions;

requireNonEmptyArray('tokens', tokens);
requireNonEmptyArray('routes', routes);
requireNonEmptyArray('components', components);
requireNonEmptyArray('responsive.tested_widths', widths);
requireNonEmptyArray('images', images);
requireNonEmptyArray('exceptions', exceptions);
uniqueBy('tokens', tokens, 'name');
uniqueBy('routes', routes, 'id');
uniqueBy('components', components, 'id');
uniqueBy('images', images, 'id');
uniqueBy('exceptions', exceptions, 'id');

if (Array.isArray(widths) && JSON.stringify(widths) !== JSON.stringify([320, 390, 834, 1440])) {
  failures.push(`responsive.tested_widths: expected exactly 320,390,834,1440; got ${JSON.stringify(widths)}`);
}

const expectedRouteIds = ['home', 'shop', 'our-story', 'carob-story', 'stockists', 'faq'];
if (Array.isArray(routes)) {
  const routeIds = routes.map((route) => route.id);
  if (JSON.stringify(routeIds) !== JSON.stringify(expectedRouteIds)) {
    failures.push(`routes: expected exact authoritative order ${expectedRouteIds.join(',')}`);
  }
}

const tokenNames = new Set(Array.isArray(tokens) ? tokens.map((token) => token.name) : []);
for (const token of tokens || []) {
  if (!/^--mm-[a-z0-9-]+$/.test(token.name)) failures.push(`tokens: invalid custom property ${token.name}`);
  if (typeof token.value !== 'string' || !token.value.trim()) failures.push(`${token.name}: missing value`);
  if (typeof token.category !== 'string' || !token.category) failures.push(`${token.name}: missing category`);
  if (typeof token.role !== 'string' || !token.role) failures.push(`${token.name}: missing semantic role`);
  if (!Array.isArray(token.observed_on) || new Set(token.observed_on).size < 2) {
    failures.push(`${token.name}: must be observed on at least two routes`);
  }
  if (!Array.isArray(token.sources) || token.sources.length < 2) failures.push(`${token.name}: insufficient source evidence`);
}

const tokenCss = readNonEmpty('assets/design-system/mm-tokens.css') || '';
const cssTokenValues = new Map();
const cssTokenCounts = new Map();
for (const match of tokenCss.matchAll(/(--mm-[a-z0-9-]+)\s*:\s*([^;]+);/gi)) {
  const name = match[1];
  cssTokenCounts.set(name, (cssTokenCounts.get(name) || 0) + 1);
  cssTokenValues.set(name, match[2].trim());
}

for (const token of tokens || []) {
  if (!cssTokenValues.has(token.name)) {
    failures.push(`${token.name}: missing from mm-tokens.css`);
  } else if (normalizeValue(cssTokenValues.get(token.name)) !== normalizeValue(token.value)) {
    failures.push(`${token.name}: JSON/CSS value mismatch`);
  }
  if (cssTokenCounts.get(token.name) !== 1) failures.push(`${token.name}: expected exactly one CSS declaration`);
}
for (const name of cssTokenValues.keys()) {
  if (!tokenNames.has(name)) failures.push(`${name}: CSS declaration is not registered in tokens.v1.json`);
}

const cssPaths = designPaths.filter((relativePath) => relativePath.endsWith('.css'));
const cssByPath = new Map(cssPaths.map((relativePath) => [relativePath, readNonEmpty(relativePath) || '']));
for (const [relativePath, css] of cssByPath) {
  for (const match of css.matchAll(/var\(\s*(--mm-[a-z0-9-]+)/gi)) {
    if (!tokenNames.has(match[1])) failures.push(`${relativePath}: undefined token ${match[1]}`);
  }
}

function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, '');
}

function governedRawValueFailures(relativePath, css) {
  const stripped = stripComments(css);
  const reducedIndex = stripped.indexOf('@media (prefers-reduced-motion: reduce)');
  let declaration;
  const declarations = /([a-z-]+)\s*:\s*([^;{}]+);/gi;
  while ((declaration = declarations.exec(stripped))) {
    const property = declaration[1].toLowerCase();
    const value = declaration[2].trim();
    const hasVariable = /var\(/i.test(value);
    const location = `${relativePath}:${property}`;

    if (/^(color|background|background-color|border-color|border-block|border-block-start|border-block-end|border-inline|outline|fill|stroke)$/.test(property)) {
      if (/(#[0-9a-f]{3,8}|rgba?\(|hsla?\()/i.test(value) && !hasVariable) failures.push(`${location}: unregistered raw colour ${value}`);
    }
    if (/^(font|font-family|font-size|font-weight)$/.test(property) && !hasVariable && !/^(inherit|normal|initial|unset)$/.test(value)) {
      failures.push(`${location}: unregistered raw type value ${value}`);
    }
    if (property === 'border-radius' && !hasVariable && !/^(0|inherit|initial|unset)$/.test(value)) {
      failures.push(`${location}: unregistered raw radius ${value}`);
    }
    if (/^(box-shadow|text-shadow)$/.test(property) && !hasVariable && !/^(none|inherit|initial|unset)$/.test(value)) {
      failures.push(`${location}: unregistered raw shadow ${value}`);
    }
    if (/^(transition|transition-duration|animation|animation-duration)$/.test(property) && /(?:^|\s)[0-9]*\.?[0-9]+m?s\b/i.test(value) && !hasVariable) {
      failures.push(`${location}: unregistered raw duration ${value}`);
    }
    if (property === 'z-index' && !hasVariable && /^-?\d+$/.test(value)) {
      failures.push(`${location}: unregistered raw z-index ${value}`);
    }
    if (/^(min-width|min-height|min-inline-size|min-block-size)$/.test(property) && /44px/.test(value) && !hasVariable) {
      failures.push(`${location}: raw shared control geometry ${value}`);
    }
  }

  for (const match of stripped.matchAll(/!important/g)) {
    const allowedReducedMotion = relativePath.endsWith('mm-base.css') && reducedIndex >= 0 && match.index > reducedIndex;
    if (!allowedReducedMotion) failures.push(`${relativePath}: !important outside reduced-motion safety rule`);
  }
}

for (const [relativePath, css] of cssByPath) {
  if (!relativePath.endsWith('mm-tokens.css')) governedRawValueFailures(relativePath, css);
}

const allowedConditions = new Set([
  ...(contracts.responsive?.shared_breakpoints || []).map((entry) => normalizeCondition(entry.condition)),
  ...(contracts.responsive?.allowed_capabilities || []).map(normalizeCondition)
]);
for (const [relativePath, css] of cssByPath) {
  for (const match of css.matchAll(/@media\s*([^\{]+)/gi)) {
    const condition = normalizeCondition(match[1]);
    if (!allowedConditions.has(condition)) failures.push(`${relativePath}: unregistered shared media condition ${match[1].trim()}`);
  }
}

const chromeJs = readNonEmpty('assets/design-system/mm-chrome.js') || '';
for (const match of chromeJs.matchAll(/matchMedia\((['"])(.*?)\1\)/g)) {
  if (!allowedConditions.has(normalizeCondition(match[2]))) failures.push(`mm-chrome.js: unregistered matchMedia condition ${match[2]}`);
}
for (const requiredHook of ['data-mm-chrome','data-mm-menu-toggle','data-mm-primary-nav','data-mm-utility-nav','data-mm-home-link','data-mm-cart-toggle','data-mm-enhanced','aria-expanded','Escape','inert']) {
  if (!chromeJs.includes(requiredHook)) failures.push(`mm-chrome.js: missing required behavior hook ${requiredHook}`);
}
if (chromeJs.includes('innerHTML')) failures.push('mm-chrome.js: runtime navigation injection is forbidden');

const routeById = new Map((routes || []).map((route) => [route.id, route]));
const componentById = new Map((components || []).map((component) => [component.id, component]));
const imageById = new Map((images || []).map((image) => [image.id, image]));

for (const route of routes || []) {
  if (!route.source || !route.baseline_sha256) failures.push(`${route.id}: source and baseline_sha256 are required`);
  for (const componentId of route.target_components || []) {
    if (!componentById.has(componentId)) failures.push(`${route.id}: unknown component ${componentId}`);
  }
  for (const imageId of route.image_contract_ids || []) {
    if (!imageById.has(imageId)) failures.push(`${route.id}: unknown image contract ${imageId}`);
  }
}

for (const component of components || []) {
  if (!Array.isArray(component.selectors) || component.selectors.length === 0) failures.push(`${component.id}: no selectors`);
  if (!Array.isArray(component.states) || component.states.length === 0) failures.push(`${component.id}: no states`);
  if (!Array.isArray(component.proven_consumers) || component.proven_consumers.length === 0) failures.push(`${component.id}: no proven consumers`);
  if (component.phase0_implementation && component.phase0_implementation !== 'contract_only') {
    const implementation = readNonEmpty(component.phase0_implementation) || '';
    for (const selector of component.selectors) {
      const selectorNeedle = selector.split(/[\s,:\[]/, 1)[0];
      if (selectorNeedle && !implementation.includes(selectorNeedle)) failures.push(`${component.id}: selector ${selector} is absent from ${component.phase0_implementation}`);
    }
  }
}

for (const image of images || []) {
  if (!routeById.has(image.route)) failures.push(`${image.id}: unknown route ${image.route}`);
  if (!Array.isArray(image.selectors) || image.selectors.length === 0) failures.push(`${image.id}: no selectors`);
  if (!Array.isArray(image.assets) || image.assets.length === 0) failures.push(`${image.id}: no assets`);
  if (!['content','decorative','pending'].includes(image.alt_mode)) failures.push(`${image.id}: invalid alt_mode`);
  if (!image.presentation || typeof image.presentation !== 'object') failures.push(`${image.id}: no presentation contract`);
}

for (const exception of exceptions || []) {
  const route = routeById.get(exception.route);
  if (!route) {
    failures.push(`${exception.id}: unknown route ${exception.route}`);
    continue;
  }
  const expectedStatus = route.state === 'pilot_wired' ? 'pilot_registered' : 'baseline_registered';
  const expectedBinding = route.state === 'pilot_wired' ? 'pilot' : 'baseline';
  if (exception.status !== expectedStatus) failures.push(`${exception.id}: expected status ${expectedStatus}`);
  if (!exception.binding || exception.binding.kind !== expectedBinding) failures.push(`${exception.id}: expected ${expectedBinding} binding`);
  if (exception.binding?.source !== route.source || exception.binding?.source_sha256 !== route.baseline_sha256) {
    failures.push(`${exception.id}: baseline binding does not resolve to the route record`);
  }
  if (!Array.isArray(exception.properties) || exception.properties.length === 0) failures.push(`${exception.id}: no property binding`);
  if (!exception.selector) failures.push(`${exception.id}: no selector or style-block selector`);
  for (const imageId of exception.binding?.image_contract_ids || []) {
    if (!imageById.has(imageId)) failures.push(`${exception.id}: unknown image contract ${imageId}`);
  }
  if (exception.binding?.image_contract_id && !imageById.has(exception.binding.image_contract_id)) {
    failures.push(`${exception.id}: unknown image contract ${exception.binding.image_contract_id}`);
  }
  if (exception.binding?.component_id && !componentById.has(exception.binding.component_id)) {
    failures.push(`${exception.id}: unknown component ${exception.binding.component_id}`);
  }
  if (exception.style_block_id) {
    const sourceText = readNonEmpty(route.source) || '';
    if (!sourceText.includes(`id="${exception.style_block_id}"`)) failures.push(`${exception.id}: style block ${exception.style_block_id} is not resolvable`);
  }
}

for (const route of routes || []) {
  if (!fs.existsSync(absolute(route.source))) {
    holds.push(`${route.id}: frozen source is missing`);
    continue;
  }
  const currentHash = sha256(route.source);
  if (currentHash !== route.baseline_sha256) holds.push(`${route.id}: frozen baseline hash drifted`);
}

if (mode === '--route-conformance') {
  const targetRoutes = routeTarget === 'all' ? (routes || []) : (routes || []).filter((route) => route.id === routeTarget);
  const sharedCssImports = [
    '/assets/design-system/mm-tokens.css',
    '/assets/design-system/mm-base.css',
    '/assets/design-system/mm-chrome.css',
    '/assets/design-system/mm-primitives.css'
  ];
  for (const route of targetRoutes) {
    const html = readNonEmpty(route.source) || '';
    let lastImportIndex = -1;
    for (const requiredImport of sharedCssImports) {
      const importIndex = html.indexOf(requiredImport);
      if (importIndex < 0) failures.push(`${route.id}: missing shared import ${requiredImport}`);
      if (importIndex >= 0 && importIndex <= lastImportIndex) failures.push(`${route.id}: shared imports are out of cascade order at ${requiredImport}`);
      lastImportIndex = Math.max(lastImportIndex, importIndex);
    }
    if (!html.includes('/assets/design-system/mm-chrome.js') || !/<script\s+defer\s+src="\/assets\/design-system\/mm-chrome\.js"><\/script>/.test(html)) {
      failures.push(`${route.id}: missing deferred shared chrome script`);
    }
    if (!html.includes('data-mm-chrome')) failures.push(`${route.id}: missing shared chrome mount`);
    if ((html.match(/data-mm-chrome(?:\s|>)/g) || []).length !== 1) failures.push(`${route.id}: expected exactly one shared chrome mount`);
    if ((html.match(/aria-current="page"/g) || []).length !== 1) failures.push(`${route.id}: expected exactly one aria-current=page`);
    if (route.state !== 'pilot_wired') failures.push(`${route.id}: route state is ${route.state}; expected pilot_wired`);

    if (route.id === 'home') {
      const pageImport = '/_wip/styles/homepage.css';
      const pageImportIndex = html.indexOf(pageImport);
      if (pageImportIndex < 0) failures.push('home: missing scoped Homepage stylesheet');
      if (pageImportIndex >= 0 && pageImportIndex <= lastImportIndex) failures.push('home: Homepage stylesheet is out of cascade order');
      if (!html.includes('data-mm-home-pilot')) failures.push('home: missing Homepage pilot scope');
      // The pilot must preserve the Homepage's admitted navigation copy; global IA
      // expansion belongs to a separately approved content migration.
      // Updated 20 Aug 2026: these were '/shop.WIP.html' etc. The site now serves clean
      // routes via vercel.json rewrites (4c480b7) and every internal link was migrated
      // (623a840), so the .WIP.html forms no longer appear in any page. The intent of the
      // check is unchanged: the pilot must still link to these three routes.
      for (const requiredRouteHref of ['/shop','/our-story','/stockists']) {
        if (!html.includes(`href="${requiredRouteHref}"`)) failures.push(`home: preserved chrome is missing ${requiredRouteHref}`);
      }
    }
  }
}

if (holds.length) finish(2, `HOLD ${mode.slice(2)} holds=${holds.length}`, holds.sort());
if (failures.length) finish(1, `FAIL ${mode.slice(2)} failures=${failures.length}`, failures.sort());

const counts = `tokens=${tokens.length} routes=${routes.length} components=${components.length} widths=${widths.length} images=${images.length} exceptions=${exceptions.length}`;
const routeState = mode === '--contracts-only' ? 'routeConformance=SKIPPED (flag not set)' : `routeConformance=${routeTarget.toUpperCase()}_PASS`;
finish(0, `PASS ${mode.slice(2)} ${counts} ${routeState}`);
