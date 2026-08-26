import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const out = join(root, "assets/icons");
const individual = join(out, "individual");

const icons = [
  {
    id: "menu",
    title: "Menu",
    lane: "Utility",
    body: '<path d="M4 7.4c4.6-.35 11.4-.35 16 0"/><path d="M4 12c4.6-.35 11.4-.35 16 0"/><path d="M4 16.6c4.6.35 11.4.35 16 0"/>'
  },
  {
    id: "close",
    title: "Close",
    lane: "Utility",
    body: '<path d="M6.3 6.1c3.8 4.1 7.7 7.9 11.5 11.8"/><path d="M17.8 6.2c-3.7 3.8-7.6 7.8-11.6 11.5"/>'
  },
  {
    id: "cart",
    title: "Cart",
    lane: "Utility",
    body: '<path d="M6.4 8.4h11.2l-.9 10.7H7.3L6.4 8.4Z"/><path d="M9 8.4c.1-2.5 1.2-3.9 3-3.9s2.9 1.4 3 3.9"/>'
  },
  {
    id: "search",
    title: "Search",
    lane: "Utility",
    body: '<circle cx="10.6" cy="10.5" r="6.3"/><path d="m15.4 15.3 4.6 4.8"/>'
  },
  {
    id: "chevron-down",
    title: "Chevron down",
    lane: "Utility",
    body: '<path d="M5.8 9.1c2.1 2 4.2 4 6.2 5.8 2-1.8 4.1-3.8 6.2-5.8"/>'
  },
  {
    id: "chevron-left",
    title: "Chevron left",
    lane: "Utility",
    body: '<path d="M14.8 5.8c-2 2.1-4 4.2-5.8 6.2 1.8 2 3.8 4.1 5.8 6.2"/>'
  },
  {
    id: "chevron-right",
    title: "Chevron right",
    lane: "Utility",
    body: '<path d="M9.2 5.8c2 2.1 4 4.2 5.8 6.2-1.8 2-3.8 4.1-5.8 6.2"/>'
  },
  {
    id: "arrow-right",
    title: "Arrow right",
    lane: "Utility",
    body: '<path d="M4.2 12.2c4.8-.3 10.2-.3 15.6 0"/><path d="m14.1 6.4 5.7 5.8-5.7 5.5"/>'
  },
  {
    id: "external",
    title: "Open link",
    lane: "Utility",
    body: '<path d="M9 6H5.6A1.6 1.6 0 0 0 4 7.6v10.8A1.6 1.6 0 0 0 5.6 20h10.8a1.6 1.6 0 0 0 1.6-1.6V15"/><path d="M13 4h7v7M20 4l-9.2 9.2"/>'
  },
  {
    id: "plus",
    title: "Expand",
    lane: "Utility",
    body: '<path d="M12 4.5c-.2 4.7-.2 10.3 0 15M4.5 12c4.7-.2 10.3-.2 15 0"/>'
  },
  {
    id: "minus",
    title: "Collapse",
    lane: "Utility",
    body: '<path d="M4.5 12c4.7-.2 10.3-.2 15 0"/>'
  },
  {
    id: "check",
    title: "Check",
    lane: "Utility",
    body: '<path d="m5.2 12.6 4.1 4.1c2.8-3.5 6-6.7 9.5-9.6"/>'
  },
  {
    id: "info",
    title: "Information",
    lane: "Utility",
    body: '<circle cx="12" cy="12" r="8.5"/><path d="M12 10.8v5.3M12 7.6v.1"/>'
  },
  {
    id: "mail",
    title: "Email",
    lane: "Utility",
    body: '<rect x="3.4" y="5.8" width="17.2" height="12.6" rx="2.1"/><path d="M4.4 7.2c2.4 1.9 4.9 3.8 7.6 5.7 2.7-1.9 5.2-3.8 7.6-5.7"/>'
  },
  {
    id: "map-pin",
    title: "Map pin",
    lane: "Utility",
    body: '<path d="M12 21c-2.1-2.3-6.8-7.3-6.8-11.2a6.8 6.8 0 1 1 13.6 0C18.8 13.7 14.1 18.7 12 21Z"/><circle cx="12" cy="9.8" r="2.4"/>'
  },
  {
    id: "locate",
    title: "Locate me",
    lane: "Utility",
    body: '<circle cx="12" cy="12" r="4.3"/><path d="M12 3.2v3M12 17.8v3M3.2 12h3M17.8 12h3"/>'
  },
  {
    id: "truck",
    title: "Delivery",
    lane: "Utility",
    body: '<path d="M3.2 6.6h11.5v10H3.2zM14.7 10h3.4l2.7 3.1v3.5h-6.1z"/><circle cx="7" cy="18.1" r="1.5"/><circle cx="18" cy="18.1" r="1.5"/>'
  },
  {
    id: "lock",
    title: "Secure payment",
    lane: "Utility",
    body: '<rect x="4.7" y="10.6" width="14.6" height="9.4" rx="2"/><path d="M8 10.6V7.9a4 4 0 0 1 8 0v2.7M12 14.1v2.5"/>'
  },
  {
    id: "warning",
    title: "Warning",
    lane: "Utility",
    body: '<path d="M12 3.5c3.2 5.3 6.1 10.5 8.5 15.6H3.5C5.9 14 8.8 8.8 12 3.5Z"/><path d="M12 9v4.6M12 16.7v.1"/>'
  },
  {
    id: "storefront",
    title: "Stockist",
    lane: "Utility",
    body: '<path d="M4.2 9.2h15.6v10.1H4.2zM3.3 9.2l1.6-4.5h14.2l1.6 4.5"/><path d="M3.3 9.2c.7 1.6 2.7 1.8 4.3.2 1.5 1.6 3.4 1.6 4.8 0 1.5 1.6 3.4 1.6 4.8 0 1.6 1.6 3.6 1.4 4.3-.2M9 19.3v-5.6h6v5.6"/>'
  },
  {
    id: "instagram",
    title: "Instagram",
    lane: "Utility",
    body: '<rect x="3.7" y="3.7" width="16.6" height="16.6" rx="4.8"/><circle cx="12" cy="12" r="3.6"/><circle cx="17.3" cy="6.8" r=".75" fill="currentColor" stroke="none"/>'
  },
  {
    id: "facebook",
    title: "Facebook",
    lane: "Utility",
    body: '<path d="M13.6 20v-7h2.6l.5-3h-3.1V8.3c0-1 .5-1.7 1.8-1.7h1.5V4c-.7-.1-1.4-.2-2.1-.2-2.9 0-4.8 1.7-4.8 4.9V10H7.4v3H10v7"/>'
  },
  {
    id: "clock",
    title: "Time",
    lane: "Utility",
    body: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.2v5.2l3.7 2"/>'
  },
  {
    id: "bolt",
    title: "Stimulation",
    lane: "Editorial",
    body: '<path d="M13.3 2.8 6.8 13h4.5l-.7 8.2L17.4 11h-4.6l.5-8.2Z"/>'
  },
  {
    id: "sun",
    title: "Sun ripened",
    lane: "Editorial",
    body: '<circle cx="12" cy="12" r="3.6"/><path d="M12 2.8v3M12 18.2v3M2.8 12h3M18.2 12h3M5.5 5.5l2.1 2.1M16.4 16.4l2.1 2.1M18.5 5.5l-2.1 2.1M7.6 16.4l-2.1 2.1"/>'
  },
  {
    id: "moon",
    title: "Moon",
    lane: "Editorial",
    body: '<path d="M16.9 3.7a8.8 8.8 0 1 0 3.4 12.4 7 7 0 0 1-3.4-12.4Z"/>'
  },
  {
    id: "moon-sparkle",
    title: "Moon and sparkle",
    lane: "Editorial",
    body: '<path d="M15.7 4.2a7.7 7.7 0 1 0 3 10.9 6.1 6.1 0 0 1-3-10.9Z"/><path d="M18.6 3.3v4.2M16.5 5.4h4.2"/>'
  },
  {
    id: "bar",
    title: "Carob bar",
    lane: "Product format",
    body: '<path d="M5.2 4.4c4.5-.35 9.1-.35 13.6 0 .3 5.1.3 10.3 0 15.4-4.5.35-9.1.35-13.6 0-.3-5.1-.3-10.3 0-15.4Z"/><path d="M9.7 4.3v15.8M14.3 4.3v15.8M5 9.6h14M5 14.5h14"/>'
  },
  {
    id: "banana",
    title: "Carob banana",
    lane: "Product format",
    body: '<path d="M5 5.2c.7 7.9 5.7 13.5 13 13.7 1.5 0 2.5-.4 3-1-8.6-.4-12.3-5.8-12.7-12.8-.1-.8-.5-1.1-1.2-1.1H5.9c-.6 0-1 .5-.9 1.2Z"/><path d="M4.9 5.1 3.6 3.8"/>'
  },
  {
    id: "moon-format",
    title: "Carob Moon",
    lane: "Product format",
    body: '<path d="M16.8 4.1a8.5 8.5 0 1 0 3.1 12 6.7 6.7 0 0 1-3.1-12Z"/><path d="M7.1 16.2c2.5 1.3 5.4 1.2 7.8-.2"/>'
  },
  {
    id: "eclipse-bites",
    title: "Eclipse bites",
    lane: "Product format",
    body: '<circle cx="7" cy="7" r="2"/><circle cx="12.3" cy="6.2" r="1.7"/><circle cx="17.3" cy="8.2" r="2"/><circle cx="6.4" cy="13" r="1.7"/><circle cx="11.9" cy="12" r="2"/><circle cx="17.5" cy="13.6" r="1.7"/><circle cx="8.7" cy="18" r="2"/><circle cx="14.5" cy="18" r="1.8"/>'
  },
  {
    id: "elixir",
    title: "Carob elixir",
    lane: "Product format",
    body: '<path d="M8.1 7.1h7.8l1.5 3v9.5H6.6v-9.5l1.5-3Z"/><path d="M9.4 7.1V4h5.2v3.1M8.4 12.4c2.4.7 4.8.7 7.2 0"/><path d="M10 16.2c1.3-.8 2.7-.8 4 0"/>'
  },
  {
    id: "carob-pod",
    title: "Carob pod",
    lane: "Editorial",
    body: '<path d="M3.7 18.7c4.2-.6 6.7-3.2 8.7-7 1.8-3.4 4-5.5 7.9-6.2-.8 4.8-2.5 8.4-5.6 10.9-3.3 2.7-7.2 3.5-11 2.3Z"/><path d="M5.1 17.3c4.7-.4 9-3.7 13.3-10.1"/><circle cx="9.1" cy="15.4" r=".75" fill="currentColor" stroke="none"/><circle cx="12.2" cy="13.1" r=".75" fill="currentColor" stroke="none"/><circle cx="15" cy="10.2" r=".75" fill="currentColor" stroke="none"/>'
  },
  {
    id: "roast",
    title: "Roast",
    lane: "Editorial",
    body: '<path d="M5.3 14.2h13.4c-.6 3.8-3 6-6.7 6s-6.1-2.2-6.7-6Z"/><path d="M8.1 11.2c-1.3-1.8.9-2.6.2-4.6M12 11.2c-1.3-1.8.9-2.6.2-4.6M15.9 11.2c-1.3-1.8.9-2.6.2-4.6"/>'
  },
  {
    id: "blend",
    title: "Blend",
    lane: "Editorial",
    body: '<path d="M4.5 13h13.2c-.4 4.7-2.8 7-6.6 7s-6.2-2.3-6.6-7Z"/><path d="m14.5 12 4.7-7M13.6 7.8l3 1.9M6.4 10.1c2.5-.7 5-.7 7.5 0"/>'
  },
  {
    id: "result",
    title: "Finished carob",
    lane: "Editorial",
    body: '<path d="M6.3 4.4c3.8-.3 7.6-.3 11.4 0 .3 5.1.3 10.3 0 15.4-3.8.3-7.6.3-11.4 0-.3-5.1-.3-10.3 0-15.4Z"/><path d="M14.4 8a4.2 4.2 0 1 0 1.5 5.9 3.3 3.3 0 0 1-1.5-5.9Z"/>'
  },
  {
    id: "fibre",
    title: "High in fibre",
    lane: "Claim symbol",
    body: '<path d="M5 18.6c3.7-.6 5.7-2.9 7.3-6.2 1.4-3 3.2-5 6.7-5.8-.6 4.1-2 7.2-4.7 9.4-2.8 2.3-6 3.1-9.3 2.6Z"/><path d="M6.1 17.2c3.9-.6 7.4-3.5 11-8.9M10 14.5l-1-3M13 11.8l-.5-3.1"/>'
  },
  {
    id: "sweetness",
    title: "Naturally sweet",
    lane: "Claim symbol",
    body: '<circle cx="12" cy="11" r="3.4"/><path d="M12 3v3M12 16v3M4 11h3M17 11h3M6.3 5.3l2.1 2M15.6 14.7l2.1 2M17.7 5.3l-2.1 2M8.4 14.7l-2.1 2"/><path d="M8 21c2.4-1 5.6-1 8 0"/>'
  },
  {
    id: "caffeine-free",
    title: "Caffeine free",
    lane: "Claim symbol",
    body: '<path d="M5.3 11.2h10.8v3.2c0 3.4-2 5.5-5.4 5.5S5.3 17.8 5.3 14.4v-3.2Z"/><path d="M16.1 12.3h1.4a2.3 2.3 0 0 1 0 4.6h-1.8M8.7 8.5c-1.4-1.7.8-2.4.2-4.1M12.7 8.5c-1.4-1.7.8-2.4.2-4.1"/>'
  }
];

const escape = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

await mkdir(individual, { recursive: true });

for (const icon of icons) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" color="#1E4366" role="img" aria-labelledby="title"><title id="title">${escape(icon.title)}</title>${icon.body}</svg>\n`;
  await writeFile(join(individual, `mm-${icon.id}.svg`), svg);
}

const symbols = icons.map((icon) => `  <symbol id="mm-icon-${icon.id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${icon.body}</symbol>`).join("\n");
await writeFile(join(out, "mm-icons.svg"), `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true">\n${symbols}\n</svg>\n`);

const lanes = [...new Set(icons.map((icon) => icon.lane))];
const groups = lanes.map((lane) => {
  const cards = icons.filter((icon) => icon.lane === lane).map((icon) => `<article><span class="icon"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#mm-icon-${icon.id}"></use></svg></span><strong>${escape(icon.title)}</strong><code>mm-icon-${icon.id}</code><small>24 px</small></article>`).join("");
  return `<section><h2>${escape(lane)}</h2><div class="grid">${cards}</div></section>`;
}).join("");

const sheet = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>MapleMoon icon system</title><style>:root{color-scheme:light}*{box-sizing:border-box}body{margin:0;background:#f4f2ed;color:#172326;font:15px/1.5 Arial,sans-serif}header{padding:56px clamp(24px,6vw,88px);background:#315f88;color:#e7e4ca}h1{margin:0 0 10px;font:500 clamp(36px,5vw,64px)/1.05 Georgia,serif}header p{max-width:66ch;margin:0;opacity:.85}main{padding:40px clamp(24px,6vw,88px) 80px}section+section{margin-top:42px}h2{font:500 28px Georgia,serif}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px}article{min-height:160px;padding:20px;border:1px solid #c9d5dc;border-radius:16px;background:#fff;display:grid;align-content:start;gap:7px}.icon{display:grid;place-items:center;width:56px;height:56px;border-radius:50%;background:#315f88;color:#e7e4ca}.icon svg{width:30px;height:30px}code{font-size:11px;color:#496a85;overflow-wrap:anywhere}small{color:#667477}@media(max-width:560px){header{padding:36px 20px}main{padding:28px 16px 56px}.grid{grid-template-columns:repeat(2,minmax(0,1fr))}article{min-height:145px;padding:15px}}</style></head><body><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden">${symbols}</svg><header><h1>MapleMoon icon system</h1><p>Thin-organic utility, product-format, editorial and claim-symbol artwork. Round caps and joins, one-colour construction and clear small-size silhouettes.</p></header><main>${groups}</main></body></html>\n`;
await writeFile(join(out, "contact-sheet.html"), sheet);

const manifest = {
  schema: "maplemoon-icon-system/v1",
  generated: "2026-08-25",
  grid: 24,
  opticalCore: 18,
  stroke: 1.5,
  linecap: "round",
  linejoin: "round",
  count: icons.length,
  icons: icons.map(({ id, title, lane }) => ({ id: `mm-icon-${id}`, title, lane, individual: `individual/mm-${id}.svg` }))
};
await writeFile(join(out, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`Built ${icons.length} MapleMoon icons`);
console.log(`Sprite: ${join(out, "mm-icons.svg")}`);
console.log(`Individuals: ${individual}`);
console.log(`Contact sheet: ${join(out, "contact-sheet.html")}`);
