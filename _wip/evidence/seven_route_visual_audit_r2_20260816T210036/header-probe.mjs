import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const runtime = '/Users/handtomouse/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const { chromium } = require(`${runtime}/playwright`);
const outputRoot = '/Users/handtomouse/maplemoon-website/_wip/evidence/seven_route_visual_audit_r2_20260816T210036';
const origin = 'http://127.0.0.1:8792';
const routes = [
  ['homepage', '/homepage'],
  ['shop', '/shop'],
  ['our-story', '/our-story'],
  ['carob-story', '/carob-story'],
  ['faq', '/faq'],
  ['stockists', '/stockists'],
  ['pure-carob-bar', '/products/pure-carob-bar'],
];

const browser = await chromium.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const results = [];
for (const [route, url] of routes) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  const page = await context.newPage();
  const response = await page.goto(`${origin}${url}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForLoadState('load', { timeout: 10000 }).catch(() => {});
  await page.waitForTimeout(500);
  const geometry = await page.evaluate(() => {
    const visible = element => {
      if (!element) return false;
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) > 0 && rect.width > 0 && rect.height > 0;
    };
    const describe = element => {
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      const range = document.createRange();
      range.selectNodeContents(element);
      const contentRect = range.getBoundingClientRect();
      const visual = {
        left: Math.min(rect.left, contentRect.width ? contentRect.left : rect.left),
        right: Math.max(rect.right, contentRect.width ? contentRect.right : rect.right),
        top: Math.min(rect.top, contentRect.height ? contentRect.top : rect.top),
        bottom: Math.max(rect.bottom, contentRect.height ? contentRect.bottom : rect.bottom),
      };
      visual.width = visual.right - visual.left;
      visual.height = visual.bottom - visual.top;
      const rounded = value => Math.round(value * 10) / 10;
      return { tag: element.tagName, className: String(element.className || ''), text: (element.textContent || element.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim(), ariaLabel: element.getAttribute('aria-label'), left: rounded(rect.left), right: rounded(rect.right), top: rounded(rect.top), bottom: rounded(rect.bottom), width: rounded(rect.width), height: rounded(rect.height), scrollWidth: element.scrollWidth, visual: Object.fromEntries(Object.entries(visual).map(([key, value]) => [key, rounded(value)])) };
    };
    const overlap = (a, b) => {
      if (!a || !b) return null;
      const horizontal = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
      const vertical = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
      return { horizontal: Math.round(horizontal * 10) / 10, vertical: Math.round(vertical * 10) / 10, area: Math.round(horizontal * vertical * 10) / 10 };
    };
    const header = document.querySelector('.mm-site-header, header');
    const candidates = header ? [...header.querySelectorAll('button,a,nav')] : [];
    const menu = candidates.find(element => visible(element) && (element.hasAttribute('data-mm-menu-toggle') || /menu/i.test(element.getAttribute('aria-label') || '') || /^menu$/i.test((element.textContent || '').trim())));
    const cart = candidates.find(element => visible(element) && /cart|bag/i.test(`${element.className} ${element.getAttribute('aria-label') || ''}`));
    const logo = candidates.find(element => visible(element) && /logo|plogo/i.test(String(element.className || '')));
    const visibleNavLinks = header ? [...header.querySelectorAll('nav a')].filter(visible).map(describe) : [];
    const menuRect = describe(menu);
    const cartRect = describe(cart);
    const logoRect = describe(logo);
    return {
      header: describe(header),
      menu: menuRect,
      cart: cartRect,
      logo: logoRect,
      visibleNavLinks,
      logoCartOverlap: overlap(logoRect?.visual, cartRect?.visual),
      logoMenuOverlap: overlap(logoRect?.visual, menuRect?.visual),
      root: { clientWidth: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth },
    };
  });
  results.push({ route, status: response?.status() || 0, ...geometry });
  console.log(`HEADER route=${route} status=${response?.status() || 0} menu=${geometry.menu ? 'yes' : 'no'} visible_nav_links=${geometry.visibleNavLinks.length} logo_cart_overlap=${geometry.logoCartOverlap?.area || 0} header_height=${geometry.header?.height || 0}`);
  await context.close();
}
await browser.close();
const summary = {
  routes: results.length,
  withMenu: results.filter(row => row.menu).map(row => row.route),
  withoutMenu: results.filter(row => !row.menu).map(row => row.route),
  withoutMenuAndLinks: results.filter(row => !row.menu && row.visibleNavLinks.length === 0).map(row => row.route),
  overlaps: results.filter(row => (row.logoCartOverlap?.area || 0) > 0).map(row => ({ route: row.route, overlap: row.logoCartOverlap })),
};
const positiveControl = results.length === 7 && summary.withMenu.length === 2 && summary.withoutMenuAndLinks.length === 5;
fs.writeFileSync(path.join(outputRoot, 'header-results.json'), `${JSON.stringify({ summary, results, positiveControl: positiveControl ? 'PASS' : 'FAIL' }, null, 2)}\n`);
console.log(`HEADER_SUMMARY routes=${summary.routes}/7 menu=${summary.withMenu.length} no_menu_or_links=${summary.withoutMenuAndLinks.length} overlaps=${summary.overlaps.length} positive_control=${positiveControl ? 'PASS' : 'FAIL'}`);
process.exitCode = positiveControl ? 0 : 1;
