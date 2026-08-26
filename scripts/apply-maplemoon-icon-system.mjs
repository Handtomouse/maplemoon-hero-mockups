import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const routes = [
  "_wip/homepage_real_1_lead_photo.WIP.html",
  "_wip/shop.WIP.html",
  "_wip/carob-story.WIP.html",
  "_wip/our-story.WIP.html",
  "_wip/faq.WIP.html",
  "_wip/stockists.WIP.html",
  "_wip/contact.WIP.html"
];

const icon = (id, classes = "mm-icon") => `<svg class="${classes}" viewBox="0 0 24 24" aria-hidden="true"><use href="/assets/icons/mm-icons.svg#mm-icon-${id}"></use></svg>`;

function count(haystack, needle) {
  return haystack.split(needle).length - 1;
}

function replaceExpected(source, before, after, expected, label) {
  const found = count(source, before);
  if (found !== expected) throw new Error(`${label}: expected ${expected}, found ${found}`);
  return source.split(before).join(after);
}

const content = new Map();
for (const route of routes) content.set(route, await readFile(join(root, route), "utf8"));

for (const route of routes.slice(0, 6)) {
  let html = content.get(route);
  html = replaceExpected(
    html,
    '<link rel="stylesheet" href="/assets/design-system/mm-primitives.css" data-mm-system-layer="primitives">',
    '<link rel="stylesheet" href="/assets/design-system/mm-primitives.css" data-mm-system-layer="primitives">\n<link rel="stylesheet" href="/assets/icons/mm-icons.css" data-mm-system-layer="icons">',
    1,
    `${route} icon stylesheet`
  );
  html = replaceExpected(
    html,
    '<button class="mm-menu-toggle mm-icon-control" type="button" data-mm-menu-toggle aria-expanded="false" aria-label="Open menu" hidden>Menu</button>',
    `<button class="mm-menu-toggle mm-icon-control" type="button" data-mm-menu-toggle aria-expanded="false" aria-label="Open menu" hidden>${icon("menu", "mm-icon mm-icon--menu")}${icon("close", "mm-icon mm-icon--close")}</button>`,
    1,
    `${route} menu icon`
  );
  content.set(route, html);
}

{
  const route = "_wip/contact.WIP.html";
  let html = content.get(route);
  html = replaceExpected(
    html,
    '<link rel="stylesheet" href="/design_refinement_20260723.css">',
    '<link rel="stylesheet" href="/design_refinement_20260723.css">\n<link rel="stylesheet" href="/assets/icons/mm-icons.css">',
    1,
    `${route} icon stylesheet`
  );
  content.set(route, html);
}

const cartRules = [
  ["_wip/homepage_real_1_lead_photo.WIP.html", '<button class="wf-pcart mm-icon-control" type="button" aria-label="Cart, 0 items" data-mm-cart-toggle><svg viewBox="0 0 24 24"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg><b>0</b></button>', `<button class="wf-pcart mm-icon-control" type="button" aria-label="Cart, 0 items" data-mm-cart-toggle>${icon("cart")}<b>0</b></button>`],
  ["_wip/shop.WIP.html", '<button class="sp-cart mm-icon-control" data-cart-toggle data-mm-cart-toggle type="button" aria-label="Cart, 0 items, subtotal $0.00"><svg viewBox="0 0 24 24"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg><b data-cart-count>0</b></button>', `<button class="sp-cart mm-icon-control" data-cart-toggle data-mm-cart-toggle type="button" aria-label="Cart, 0 items, subtotal $0.00">${icon("cart")}<b data-cart-count>0</b></button>`],
  ["_wip/carob-story.WIP.html", '<button class="sp-cart mm-icon-control" data-mm-cart-toggle type="button" aria-label="Cart, 0 items"><svg viewBox="0 0 24 24"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg><b>0</b></button>', `<button class="sp-cart mm-icon-control" data-mm-cart-toggle type="button" aria-label="Cart, 0 items">${icon("cart")}<b>0</b></button>`],
  ["_wip/our-story.WIP.html", '<button class="os-cart mm-icon-control" data-mm-cart-toggle type="button" aria-label="Cart, 0 items"><svg viewBox="0 0 24 24"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg><b>0</b></button>', `<button class="os-cart mm-icon-control" data-mm-cart-toggle type="button" aria-label="Cart, 0 items">${icon("cart")}<b>0</b></button>`],
  ["_wip/faq.WIP.html", '<button class="sp-cart mm-icon-control" data-mm-cart-toggle type="button" aria-label="Cart, 0 items"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg><b>0</b></button>', `<button class="sp-cart mm-icon-control" data-mm-cart-toggle type="button" aria-label="Cart, 0 items">${icon("cart")}<b>0</b></button>`],
  ["_wip/stockists.WIP.html", '<button class="sp-cart mm-icon-control" data-mm-cart-toggle type="button" aria-label="Cart, 0 items"><svg viewBox="0 0 24 24"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg><b>0</b></button>', `<button class="sp-cart mm-icon-control" data-mm-cart-toggle type="button" aria-label="Cart, 0 items">${icon("cart")}<b>0</b></button>`],
  ["_wip/contact.WIP.html", '<button class="sp-cart" type="button" aria-label="Cart, 0 items"><svg viewBox="0 0 24 24"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg><b>0</b></button>', `<button class="sp-cart" type="button" aria-label="Cart, 0 items">${icon("cart")}<b>0</b></button>`]
];

for (const [route, before, after] of cartRules) {
  content.set(route, replaceExpected(content.get(route), before, after, 1, `${route} cart icon`));
}

{
  const route = "_wip/homepage_real_1_lead_photo.WIP.html";
  let html = content.get(route);
  const replacements = [
    ['<svg class="wf-cta-arrow" viewBox="0 0 24 24" aria-hidden="true"><line x1="4" y1="12" x2="20" y2="12"/><polyline points="14 6 20 12 14 18"/></svg>', icon("arrow-right", "mm-icon wf-cta-arrow"), 1, "hero CTA"],
    ['<svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>', icon("chevron-down"), 1, "scroll cue"],
    ['<svg viewBox="0 0 24 24"><polyline points="15 6 9 12 15 18"/></svg>', icon("chevron-left"), 1, "previous"],
    ['<svg viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18"/></svg>', icon("chevron-right"), 1, "next"],
    ['<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/></svg>', icon("bar"), 1, "bar category"],
    ['<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6c1 8 6 13 14 13 1.5 0 2.5-.4 3-1-9 0-13-6-13-13 0-.7-.4-1-1-1H5c-.6 0-1 .4-1 1z"/></svg>', icon("banana"), 1, "banana category"],
    ['<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 3a9 9 0 1 0 4 12 7 7 0 0 1-4-12z"/></svg>', icon("moon-format"), 1, "Moon category"],
    ['<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="6" r="1.4"/><circle cx="12" cy="6" r="1.4"/><circle cx="18" cy="6" r="1.4"/><circle cx="6" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="18" cy="12" r="1.4"/><circle cx="6" cy="18" r="1.4"/><circle cx="12" cy="18" r="1.4"/><circle cx="18" cy="18" r="1.4"/></svg>', icon("eclipse-bites"), 1, "bites category"],
    ['<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 3h4v3l2 3v11a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V9l2-3z"/></svg>', icon("elixir"), 1, "elixir category"],
    ['<svg viewBox="0 0 24 24"><path d="M17 3a9 9 0 1 0 4 12 7 7 0 0 1-4-12z"/></svg>High in fibre', `${icon("fibre")}High in fibre`, 1, "fibre fact"],
    ['<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><line x1="12" y1="3" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="21"/><line x1="3" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="21" y2="12"/><line x1="5.5" y1="5.5" x2="7" y2="7"/><line x1="17" y1="17" x2="18.5" y2="18.5"/></svg>Naturally sweet', `${icon("sweetness")}Naturally sweet`, 1, "sweetness fact"],
    ['<svg viewBox="0 0 24 24"><path d="M4 14c6-1 10-5 16-10-2 7-5 12-12 13-2 .3-4-1-4-3z"/></svg>Caffeine free', `${icon("caffeine-free")}Caffeine free`, 1, "caffeine fact"],
    ['<svg viewBox="0 0 24 24" width="14" height="14" style="stroke:currentColor;fill:none;stroke-width:1.6"><line x1="4" y1="12" x2="20" y2="12"/><polyline points="14 6 20 12 14 18"/></svg>', icon("arrow-right", "mm-icon mm-icon--sm"), 2, "text arrows"],
    ['<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><line x1="12" y1="3" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="21"/><line x1="3" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="21" y2="12"/></svg>', icon("sun"), 2, "sun callouts"],
    ['<svg viewBox="0 0 24 24"><path d="M4 14c6-1 10-5 16-10-2 7-5 12-12 13-2 .3-4-1-4-3z"/></svg>', icon("caffeine-free"), 1, "caffeine callout"],
    ['<svg viewBox="0 0 24 24"><path d="M12 21s-7-4.5-7-10a7 7 0 0 1 14 0c0 5.5-7 10-7 10z"/></svg>', icon("map-pin"), 1, "Byron callout"],
    ['<svg viewBox="0 0 24 24"><path d="M17 3a9 9 0 1 0 4 12 7 7 0 0 1-4-12z"/></svg>', icon("moon"), 1, "coast callout"],
    ['<span class="q-icon" aria-hidden="true">□</span>', `<span class="q-icon" aria-hidden="true">${icon("sweetness")}</span>`, 2, "comparison sweetness"],
    ['<span class="q-icon" aria-hidden="true">ϟ</span>', `<span class="q-icon" aria-hidden="true">${icon("bolt")}</span>`, 1, "comparison stimulation"],
    ['<span class="q-icon" aria-hidden="true">◷</span>', `<span class="q-icon" aria-hidden="true">${icon("clock")}</span>`, 2, "comparison time"],
    ['<span class="q-icon" aria-hidden="true">☾</span>', `<span class="q-icon" aria-hidden="true">${icon("caffeine-free")}</span>`, 1, "comparison caffeine free"],
    ['<span class="q-check" aria-hidden="true">✓</span>', `<span class="q-check" aria-hidden="true">${icon("check")}</span>`, 3, "comparison checks"],
    ['<span class="mm-moon" aria-hidden="true">☾</span>', `<span class="mm-moon" aria-hidden="true">${icon("moon")}</span>`, 1, "founder Moon"],
    ['<span aria-hidden="true">→</span>', icon("arrow-right", "mm-icon mm-icon--sm"), 1, "founder CTA arrow"],
    ['<span aria-hidden="true">&rarr;</span>', icon("arrow-right", "mm-icon mm-icon--sm"), 1, "stockist CTA arrow"],
    ['<svg viewBox="0 0 24 24"><rect x="2" y="7" width="13" height="10" rx="1"/><path d="M15 10h4l3 3v4h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="18" cy="18" r="1.6"/></svg>', icon("truck"), 1, "shipping trust"],
    ['<svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="1.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>', icon("lock"), 1, "payment trust"],
    ['<svg viewBox="0 0 24 24"><path d="M12 21s-7-4.5-7-10a7 7 0 0 1 14 0c0 5.5-7 10-7 10z"/><circle cx="12" cy="11" r="2.5"/></svg>', icon("map-pin"), 1, "stockist trust"],
    ['<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4.5"/><circle cx="12" cy="12" r="3.5"/></svg>', icon("instagram"), 1, "Instagram"],
    ['<svg viewBox="0 0 24 24"><path d="M14 9h2.5V6H14c-2 0-3.5 1.4-3.5 3.5V11H8v3h2.5v6h3v-6H16l.5-3h-3V9.5c0-.3.2-.5.5-.5z"/></svg>', icon("facebook"), 1, "Facebook"],
    ['<svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M4 7l8 6 8-6"/></svg>', icon("mail"), 1, "footer email"]
  ];
  for (const [before, after, expected, label] of replacements) html = replaceExpected(html, before, after, expected, `${route} ${label}`);
  content.set(route, html);
}

{
  const route = "_wip/carob-story.WIP.html";
  let html = content.get(route);
  const replacements = [
    ['<span class="bean-mark" aria-hidden="true"></span>', `<span class="bean-mark" aria-hidden="true">${icon("carob-pod", "mm-icon mm-icon--editorial")}</span>`, 1, "bean mark"],
    ['<span class="process-icon pod" aria-hidden="true"></span>', `<span class="process-icon pod" aria-hidden="true">${icon("carob-pod", "mm-icon mm-icon--editorial")}</span>`, 1, "pod process"],
    ['<span class="process-icon roast" aria-hidden="true"></span>', `<span class="process-icon roast" aria-hidden="true">${icon("roast", "mm-icon mm-icon--editorial")}</span>`, 1, "roast process"],
    ['<span class="process-icon blend" aria-hidden="true"></span>', `<span class="process-icon blend" aria-hidden="true">${icon("blend", "mm-icon mm-icon--editorial")}</span>`, 1, "blend process"],
    ['<span class="process-icon bar" aria-hidden="true"></span>', `<span class="process-icon bar" aria-hidden="true">${icon("result", "mm-icon mm-icon--editorial")}</span>`, 1, "result process"]
  ];
  for (const [before, after, expected, label] of replacements) html = replaceExpected(html, before, after, expected, `${route} ${label}`);
  content.set(route, html);
}

{
  const route = "_wip/faq.WIP.html";
  let html = content.get(route);
  const replacements = [
    ['<svg class="search-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>', icon("search", "mm-icon search-icon"), 1, "search"],
    ['<button id="faq-clear" class="search-clear" type="button" aria-label="Clear FAQ search" hidden>×</button>', `<button id="faq-clear" class="search-clear" type="button" aria-label="Clear FAQ search" hidden>${icon("close")}</button>`, 1, "clear"],
    ['<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 10v6m0-9v.1"/></svg>', icon("info"), 1, "info"],
    ['<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1"/><path d="m4 7 8 6 8-6"/></svg>', icon("mail"), 1, "mail"],
    ['<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V7l8-4 8 4v13"/><path d="M8 20v-5h8v5M8 9h.01M12 9h.01M16 9h.01"/></svg>', icon("storefront"), 1, "wholesale"],
    ['<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>', icon("map-pin"), 1, "stockist"],
    ['<svg viewBox="0 0 24 24"><path d="M18.5 15.5A8 8 0 0 1 8.5 5.5a8 8 0 1 0 10 10Z"/><path d="M18 4v4m-2-2h4"/></svg>', icon("moon-sparkle", "mm-icon mm-icon--lg"), 1, "support"],
    ['<span class="faq-toggle" aria-hidden="true">+</span>', `<span class="faq-toggle" aria-hidden="true">${icon("plus")}</span>`, 1, "FAQ toggle template"]
  ];
  for (const [before, after, expected, label] of replacements) html = replaceExpected(html, before, after, expected, `${route} ${label}`);
  content.set(route, html);
}

{
  const route = "_wip/stockists.WIP.html";
  let html = content.get(route);
  const replacements = [
    ['<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m16.5 16.5 4 4"></path></svg>', icon("search"), 1, "search"],
    ['<button class="st-area-next" type="button" disabled aria-disabled="true" aria-label="More areas coming soon">&gt;</button>', `<button class="st-area-next" type="button" disabled aria-disabled="true" aria-label="More areas coming soon">${icon("chevron-right")}</button>`, 1, "area next"],
    ['<span class="st-mini-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 7h11v10H4z"></path><path d="M15 11h3l2 3v3h-5z"></path><circle cx="7" cy="18" r="1.6"></circle><circle cx="18" cy="18" r="1.6"></circle></svg></span>', `<span class="st-mini-icon" aria-hidden="true">${icon("truck")}</span>`, 1, "delivery CTA"],
    ['<span class="st-mini-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3 21 12 12 21 3 12z"></path><path d="M12 8v4"></path><path d="M12 16h.01"></path></svg></span>', `<span class="st-mini-icon" aria-hidden="true">${icon("warning")}</span>`, 1, "wholesale CTA"],
    ['<b aria-hidden="true">&gt;</b>', icon("chevron-right"), 2, "CTA arrows"]
  ];
  for (const [before, after, expected, label] of replacements) html = replaceExpected(html, before, after, expected, `${route} ${label}`);
  content.set(route, html);
}

for (const [route, html] of content) await writeFile(join(root, route), html);

console.log("Applied MapleMoon icon system to:");
for (const route of routes) console.log(`- ${route}`);
