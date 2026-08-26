import { createHash } from "node:crypto";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const out = join(root, "_wip/evidence/icon_session_20260825/v2_review");
const individual = join(out, "individual");

const sources = {
  brandmark: "_wip/deliverables/MapleMoon_External_Designer_Icon_Kit_20260825/03_FINAL_PRODUCTION_PENDING/01_VECTOR_SVG/MM_Brandmark_Moon-Sun.svg",
  caffeineBadge: "assets/brand/icon_caffeine_free.svg",
  bar: "assets/product_shots/bar_pure_carob_hero.webp",
  banana: "assets/product_shots/bananas_real.webp",
  moon: "assets/product_shots/moon_pure_carob.webp",
  bite: "assets/product_shots/eclipse_pecan_real.webp",
  elixir: "assets/gemini/studio/maplemoon_elixir_plain_studio_20260305.png",
};

const sourceBytes = Object.fromEntries(
  await Promise.all(Object.entries(sources).map(async ([key, relative]) => [key, await readFile(join(root, relative))]))
);
const sourceHashes = Object.fromEntries(
  Object.entries(sourceBytes).map(([key, value]) => [key, createHash("sha256").update(value).digest("hex")])
);
const dataUrl = (key, mime) => `data:${mime};base64,${sourceBytes[key].toString("base64")}`;

const caffeineSource = sourceBytes.caffeineBadge.toString("utf8");
const approvedCupPaths = [...caffeineSource.matchAll(/<path class="b" d="([^"]+)"/g)]
  .slice(0, 3)
  .map((match) => `<path d="${match[1]}"/>`)
  .join("");

const icons = [];
const add = (concept, id, title, lane, size, body, source) => icons.push({ concept, id, title, lane, size, body, source });

// Utility representatives: three genuinely separate optical cuts.
add("cart", "utility-cart-24", "Cart / bag", "Utility", 24,
  '<path d="M6.3 8.6c3.8-.3 7.6-.3 11.4 0l-.7 10.5c-3.3.3-6.7.3-10 0L6.3 8.6Z"/><path d="M8.5 8.5c.1-2.7 1.3-4.1 3.5-4.1s3.4 1.4 3.5 4.1"/><path d="M9 14.5c1.8.55 4.2.55 6 0"/>',
  "Shopping-bag convention with a single packaging-horizon cue");
add("cart", "utility-cart-20", "Cart / bag", "Utility", 20,
  '<path d="M5.2 7.2c3.2-.25 6.4-.25 9.6 0l-.6 8.8c-2.8.25-5.6.25-8.4 0l-.6-8.8Z"/><path d="M7 7.2c.1-2.2 1.1-3.4 3-3.4s2.9 1.2 3 3.4"/><path d="M7.7 12.1c1.5.45 3.1.45 4.6 0"/>',
  "Optically redrawn 20 px cut");
add("cart", "utility-cart-16", "Cart / bag", "Utility", 16,
  '<path d="M4.2 5.9c2.5-.2 5.1-.2 7.6 0l-.5 7c-2.2.2-4.4.2-6.6 0l-.5-7Z"/><path d="M5.7 5.8C5.8 4 6.5 3.2 8 3.2s2.2.8 2.3 2.6"/>',
  "Simplified 16 px cut; horizon detail removed");

add("search", "utility-search-24", "Search", "Utility", 24,
  '<path d="M16.8 10.5c0 3.6-2.7 6.3-6.3 6.3-3.7 0-6.4-2.6-6.4-6.2 0-3.7 2.7-6.4 6.3-6.4 3.7 0 6.4 2.7 6.4 6.3Z"/><path d="M15.2 15.3c1.6 1.5 3.1 3.1 4.6 4.7"/>',
  "Recognisable lens with controlled organic asymmetry");
add("search", "utility-search-20", "Search", "Utility", 20,
  '<path d="M14 8.9c0 3-2.2 5.2-5.2 5.2-3.1 0-5.3-2.2-5.3-5.2 0-3.1 2.2-5.3 5.2-5.3 3.1 0 5.3 2.2 5.3 5.3Z"/><path d="m12.7 12.9 3.8 3.9"/>',
  "Optically redrawn 20 px cut");
add("search", "utility-search-16", "Search", "Utility", 16,
  '<circle cx="7.1" cy="7.1" r="4.2"/><path d="m10.2 10.2 3.2 3.2"/>',
  "Simplified 16 px cut");

add("plus", "utility-plus-24", "Expand", "Utility", 24,
  '<path d="M12 4.2c-.2 4.9-.2 10.6 0 15.6M4.2 12c4.9-.2 10.6-.2 15.6 0"/>',
  "Soft, asymmetric control mark");
add("plus", "utility-plus-20", "Expand", "Utility", 20,
  '<path d="M10 3.6c-.15 4.1-.15 8.7 0 12.8M3.6 10c4.1-.15 8.7-.15 12.8 0"/>',
  "Optically redrawn 20 px cut");
add("plus", "utility-plus-16", "Expand", "Utility", 16,
  '<path d="M8 3v10M3 8h10"/>',
  "Simplified 16 px cut");

// Homepage category cuts. These describe the actual product silhouettes, not generic food categories.
add("category-bar", "category-bar-20", "Bars", "Homepage category", 20,
  '<path d="M5.4 2.8c3.1-.2 6.1-.2 9.2 0l-.25 14.4c-2.9.25-5.8.25-8.7 0L5.4 2.8Z"/><path d="M5.5 5.1c3-.25 6-.25 9 0M5.6 14.9c2.9.25 5.8.25 8.8 0"/><path d="M11.7 6.8c-.8.35-1.3 1.1-1.3 2 0 1.1.7 2 1.8 2.2-.9.6-2.2.5-3-.3-.9-.9-.9-2.4 0-3.3.7-.7 1.6-.9 2.5-.6Z"/>',
  "90 g wrapped bar silhouette; source: bar packshot");
add("category-bar", "category-bar-16", "Bars", "Homepage category", 16,
  '<path d="M4.5 2.3c2.4-.2 4.7-.2 7 0l-.2 11.4c-2.2.2-4.4.2-6.6 0L4.5 2.3Z"/><path d="M4.6 4.2c2.3-.2 4.6-.2 6.8 0M4.7 11.8c2.2.2 4.4.2 6.6 0"/>',
  "Simplified selector cut");

add("category-banana", "category-banana-20", "Bananas", "Homepage category", 20,
  '<path d="M4.2 3.7c.55 6.7 4.8 11.4 11 11.6 1.2.05 2.1-.25 2.7-.8-7.25-.35-10.4-4.85-10.8-10.8-.05-.65-.4-.95-1-.95h-1c-.55 0-.95.4-.9.95Z"/><path d="m4.2 3.6-1-1"/><path d="M9.5 12.1c1.8.8 3.8 1.1 6 .85"/>',
  "Coated banana silhouette; source: current banana packshot");
add("category-banana", "category-banana-16", "Bananas", "Homepage category", 16,
  '<path d="M3.5 3c.5 5.4 3.9 9.2 8.9 9.35 1 0 1.7-.25 2.1-.65-5.8-.3-8.3-3.9-8.6-8.65-.05-.55-.35-.8-.85-.8h-.8c-.45 0-.8.35-.75.75Z"/>',
  "Simplified selector cut");

add("category-moon", "category-moon-20", "Moons", "Homepage category", 20,
  '<path d="M13.9 2.8c-2.9.8-5 3.4-5 6.5 0 3.6 2.8 6.5 6.4 6.7-1.4 1-3.1 1.5-4.9 1.3-4.1-.3-7.2-3.7-7-7.8.2-4.2 3.6-7.4 7.8-7.4 1 0 1.9.25 2.7.7Z" fill="currentColor" stroke="none"/>',
  "Actual crescent product silhouette; source: Moon product shot");
add("category-moon", "category-moon-16", "Moons", "Homepage category", 16,
  '<path d="M11.2 2.2C8.9 2.9 7.2 5 7.2 7.5c0 2.9 2.2 5.2 5.1 5.4-1.1.8-2.5 1.2-3.9 1.1-3.3-.25-5.8-3-5.6-6.2.15-3.4 2.9-6 6.2-6 .8 0 1.5.15 2.2.4Z" fill="currentColor" stroke="none"/>',
  "Simplified selector cut");

add("category-bites", "category-bites-20", "Eclipse bites", "Homepage category", 20,
  '<path d="M3.5 15.7c0-5.2 2.7-8.6 6.5-8.6s6.5 3.4 6.5 8.6c0 1.3-1.1 2.1-2.4 2.1H5.9c-1.3 0-2.4-.8-2.4-2.1Z"/><path d="M7 6.8c1-2.8 4.7-3.6 6.5-1.6-1.2 1.4-3.6 2-6.5 1.6Z"/><path d="M8.3 6.5c1.2-.7 2.5-1.1 3.9-1.2"/>',
  "Single domed Eclipse Bite with pecan cue; source: current product shot");
add("category-bites", "category-bites-16", "Eclipse bites", "Homepage category", 16,
  '<path d="M3 12.7c0-4.2 2-6.9 5-6.9s5 2.7 5 6.9c0 1-.8 1.6-1.8 1.6H4.8c-1 0-1.8-.6-1.8-1.6Z"/><path d="M5.8 5.6c.8-2 3.5-2.6 4.8-1.1-1 1-2.7 1.4-4.8 1.1Z"/>',
  "Simplified single-bite selector cut");

add("category-elixir", "category-elixir-20", "Elixirs", "Homepage category", 20,
  '<path d="M5.7 4.3c0-1 1.9-1.8 4.3-1.8s4.3.8 4.3 1.8v11.3c0 1-1.9 1.8-4.3 1.8s-4.3-.8-4.3-1.8V4.3Z"/><path d="M5.7 4.3c0 1 1.9 1.8 4.3 1.8s4.3-.8 4.3-1.8M5.8 7h8.4"/><path d="M11.7 9.2c-.9.3-1.45 1.1-1.45 2 0 1.1.75 2 1.8 2.25-1 .6-2.25.45-3-.4-.85-.95-.8-2.4.15-3.25.7-.65 1.65-.8 2.5-.6Z"/>',
  "Cylindrical elixir canister; source: current product image");
add("category-elixir", "category-elixir-16", "Elixirs", "Homepage category", 16,
  '<path d="M4.8 3.6c0-.8 1.4-1.4 3.2-1.4s3.2.6 3.2 1.4v8.8c0 .8-1.4 1.4-3.2 1.4s-3.2-.6-3.2-1.4V3.6Z"/><path d="M4.8 3.6C4.8 4.4 6.2 5 8 5s3.2-.6 3.2-1.4M4.9 5.7h6.2"/>',
  "Simplified selector cut");

// Larger product representatives for the review gate.
add("product-bar", "product-bar-48", "Wrapped carob bar", "Product master", 48,
  '<path d="M12 5.5c8-.7 16-.7 24 0l-.7 37c-7.5.7-15.1.7-22.6 0L12 5.5Z"/><path d="M12.2 11c7.9-.7 15.7-.7 23.6 0M12.6 37c7.6.7 15.2.7 22.8 0"/><path d="M29.5 14.7c-3.4 1.1-5.4 4.1-5.4 7.5 0 4.2 3.1 7.6 7.2 8.1-3.6 2.1-8.2 1.4-11-1.8-3.1-3.6-2.7-9 .8-12.1 2.3-2.1 5.5-2.6 8.4-1.7Z"/><path d="M18 33c4 .9 8 .9 12 0"/>',
  "Real wrapped pack silhouette with Moon and horizon cues");
add("product-bar", "product-bar-32", "Wrapped carob bar", "Product master", 32,
  '<path d="M8 3.8c5.3-.45 10.7-.45 16 0l-.45 24.6c-5 .45-10.1.45-15.1 0L8 3.8Z"/><path d="M8.2 7.4c5.2-.45 10.4-.45 15.6 0M8.4 24.6c5.1.45 10.2.45 15.2 0"/><path d="M19.8 10c-2.2.75-3.6 2.75-3.6 5 0 2.8 2.1 5.1 4.8 5.4-2.4 1.4-5.5.9-7.3-1.2-2.1-2.4-1.8-6 .5-8.1 1.5-1.4 3.7-1.7 5.6-1.1Z"/>',
  "Simplified 32 px product cut");

add("product-moon", "product-moon-48", "Carob Moon", "Product master", 48,
  '<path d="M33.8 6.7c-7 2.1-12 8.5-12 16 0 8.7 6.6 15.8 15.1 16.5-3.4 2.6-7.7 4-12.2 3.5C14.8 41.8 7.3 33.5 8 23.6 8.6 13.6 16.8 6 26.8 6c2.5 0 4.8.25 7 .7Z" fill="currentColor" stroke="none"/><path d="M13.5 31.7c4.5 4.9 11.4 6.7 17.7 4.4" stroke="currentColor" opacity=".35"/>',
  "Actual crescent product silhouette");
add("product-moon", "product-moon-32", "Carob Moon", "Product master", 32,
  '<path d="M22.5 4.5c-4.7 1.4-8 5.7-8 10.7 0 5.8 4.4 10.5 10.1 11-2.3 1.7-5.1 2.6-8.1 2.3C9.9 27.9 4.9 22.3 5.3 15.7 5.7 9.1 11.2 4 17.9 4c1.6 0 3.1.2 4.6.5Z" fill="currentColor" stroke="none"/>',
  "Simplified 32 px product cut");

add("product-elixir", "product-elixir-48", "Carob elixir canister", "Product master", 48,
  '<path d="M13 9c0-2.4 4.9-4.4 11-4.4s11 2 11 4.4v30c0 2.4-4.9 4.4-11 4.4S13 41.4 13 39V9Z"/><path d="M13 9c0 2.4 4.9 4.4 11 4.4S35 11.4 35 9M13.2 15.2h21.6M16.2 34c5.2 1.4 10.4 1.4 15.6 0"/><path d="M28 19.2c-2.6.8-4.3 3.2-4.3 5.9 0 3.2 2.4 5.9 5.5 6.3-2.8 1.7-6.4 1.1-8.6-1.4-2.4-2.8-2.1-7 .6-9.5 1.9-1.6 4.4-2.1 6.8-1.3Z"/>',
  "Cylindrical product canister with brandmark cue");
add("product-elixir", "product-elixir-32", "Carob elixir canister", "Product master", 32,
  '<path d="M8.7 6c0-1.6 3.3-2.9 7.3-2.9S23.3 4.4 23.3 6v20c0 1.6-3.3 2.9-7.3 2.9S8.7 27.6 8.7 26V6Z"/><path d="M8.7 6c0 1.6 3.3 2.9 7.3 2.9s7.3-1.3 7.3-2.9M8.8 10.1h14.4"/><path d="M18.7 12.8c-1.8.6-2.9 2.2-2.9 4 0 2.2 1.6 4 3.7 4.2-1.9 1.1-4.3.7-5.7-.9-1.6-1.9-1.4-4.7.4-6.3 1.2-1.1 2.9-1.4 4.5-1Z"/>',
  "Simplified 32 px product cut");

// Process representatives at 48 and 32.
add("process-pod", "process-pod-48", "Carob pod", "Process", 48,
  '<path d="M6.5 36.5c9.2-1.2 14.5-6.6 18.8-14.6 3.8-7.2 8.6-11.5 16.4-12.9-1.6 10-5.5 17.3-12.3 22.5-7 5.4-15.2 7.1-22.9 5Z"/><path d="M9 34c9.7-.8 18.9-7.4 28.3-20.9"/><circle cx="16" cy="30" r="1.5" fill="currentColor" stroke="none"/><circle cx="22.5" cy="26.1" r="1.5" fill="currentColor" stroke="none"/><circle cx="28.5" cy="21" r="1.5" fill="currentColor" stroke="none"/>',
  "Organic pod and seed rhythm; source: Australian carob photography");
add("process-pod", "process-pod-32", "Carob pod", "Process", 32,
  '<path d="M4.5 24.2c6.1-.8 9.7-4.4 12.5-9.7 2.5-4.8 5.7-7.7 10.9-8.6-1.1 6.6-3.7 11.5-8.2 15-4.7 3.6-10.1 4.7-15.2 3.3Z"/><path d="M6 22.6c6.5-.5 12.6-4.9 18.9-13.9"/><circle cx="11" cy="20" r="1" fill="currentColor" stroke="none"/><circle cx="15.2" cy="17.4" r="1" fill="currentColor" stroke="none"/><circle cx="19.2" cy="14" r="1" fill="currentColor" stroke="none"/>',
  "Simplified 32 px process cut");

add("process-roast", "process-roast-48", "Roast", "Process", 48,
  '<path d="M9 27h30c-1.4 8.9-6.8 13.4-15 13.4S10.4 35.9 9 27Z"/><path d="M14 24c4.2-2.2 8.1-3 12-2.5 3 .4 5.7 1.2 8.2 2.5"/><path d="M16 18c-2.4-3.3 1.8-4.9.4-9M24 18c-2.4-3.3 1.8-4.9.4-9M32 18c-2.4-3.3 1.8-4.9.4-9"/>',
  "Roasting bowl, pod rhythm and heat");
add("process-roast", "process-roast-32", "Roast", "Process", 32,
  '<path d="M6 18h20c-.9 5.9-4.5 8.9-10 8.9S6.9 23.9 6 18Z"/><path d="M9.5 16c4.5-2.1 8.8-2.1 13 0M11 12c-1.6-2.2 1.2-3.3.3-6M16 12c-1.6-2.2 1.2-3.3.3-6M21 12c-1.6-2.2 1.2-3.3.3-6"/>',
  "Simplified 32 px process cut");

add("process-blend", "process-blend-48", "Blend", "Process", 48,
  '<path d="M8 27h29c-.9 9.2-6.1 13.8-14.5 13.8S8.9 36.2 8 27Z"/><path d="m30 25 9-15M28.5 16l6 3.6M12 22c5.8-1.8 11.5-1.8 17.2 0"/><path d="M16 32c4.3 1.4 8.7 1.4 13 0"/>',
  "Blend bowl with packaging-horizon rhythm");
add("process-blend", "process-blend-32", "Blend", "Process", 32,
  '<path d="M5.5 18h19c-.6 6.1-4 9.2-9.5 9.2S6.1 24.1 5.5 18Z"/><path d="m20 16.8 6-10M19 11l4 2.4M8 14.8c3.8-1.2 7.6-1.2 11.4 0"/>',
  "Simplified 32 px process cut");

// Homepage comparison: distinct semantics on each side rather than reusing the same symbol.
add("cacao-bitter", "comparison-cacao-bitter-24", "Cacao: naturally bitter", "Comparison", 24,
  '<path d="M12 3.5c4.7 0 7.4 3.2 7.4 8.5s-2.7 8.5-7.4 8.5S4.6 17.3 4.6 12 7.3 3.5 12 3.5Z"/><path d="M12 4.2c-2.3 2.2-3.2 4.8-2.7 7.8.5 3 1.4 5.6 2.7 7.8M12 4.2c2.3 2.2 3.2 4.8 2.7 7.8-.5 3-1.4 5.6-2.7 7.8"/><path d="M8.7 15.9c2.2-.8 4.4-.8 6.6 0"/>',
  "Cacao bean and downturned finish");
add("cacao-bitter", "comparison-cacao-bitter-20", "Cacao: naturally bitter", "Comparison", 20,
  '<path d="M10 3c3.9 0 6.1 2.7 6.1 7s-2.2 7-6.1 7-6.1-2.7-6.1-7S6.1 3 10 3Z"/><path d="M10 3.7c-1.7 1.8-2.4 3.9-2 6.3.4 2.4 1.1 4.5 2 6.3M10 3.7c1.7 1.8 2.4 3.9 2 6.3-.4 2.4-1.1 4.5-2 6.3"/>',
  "Simplified 20 px comparison cut");

add("cacao-stimulation", "comparison-cacao-stimulation-24", "Cacao: stimulating", "Comparison", 24,
  '<path d="m13.2 2.9-6.3 9.8h4.4l-.7 8.4 6.7-10.2h-4.5l.4-8Z"/><path d="M4.4 7.4 6.5 9M19.6 7.4 17.5 9M4.1 16.4 6.4 15"/>',
  "Activation bolt with outward energy");
add("cacao-stimulation", "comparison-cacao-stimulation-20", "Cacao: stimulating", "Comparison", 20,
  '<path d="m11 2.5-5.2 8.1h3.6l-.6 6.9 5.5-8.4h-3.7l.4-6.6Z"/>',
  "Simplified 20 px comparison cut");

add("cacao-activation", "comparison-cacao-activation-24", "Cacao: activating moment", "Comparison", 24,
  '<path d="M5 16.5h14M7.2 16.5a4.8 4.8 0 0 1 9.6 0"/><path d="M12 3.2v4M5.7 6l2.7 2.7M18.3 6l-2.7 2.7M3.4 11.8h3.8M16.8 11.8h3.8"/>',
  "Rising sun / activating daytime");
add("cacao-activation", "comparison-cacao-activation-20", "Cacao: activating moment", "Comparison", 20,
  '<path d="M4 14h12M6 14a4 4 0 0 1 8 0"/><path d="M10 3v3M4.8 5.5 7 7.6M15.2 5.5 13 7.6"/>',
  "Simplified 20 px comparison cut");

add("carob-sweet", "comparison-carob-sweet-24", "Carob: naturally sweet", "Comparison", 24,
  '<path d="M4 18.6c3.8-.5 6-2.9 7.8-6.2 1.6-3 3.5-4.9 6.9-5.5-.7 4.2-2.3 7.3-5.2 9.5-3 2.3-6.4 3-9.5 2.2Z"/><path d="M5.2 17c4-.35 7.9-3.1 11.8-8.8"/><path d="M18.7 3.6v3.7M16.9 5.45h3.6"/>',
  "Carob pod plus quiet sparkle");
add("carob-sweet", "comparison-carob-sweet-20", "Carob: naturally sweet", "Comparison", 20,
  '<path d="M3.4 15.5c3.2-.45 5-2.4 6.5-5.2 1.3-2.5 2.9-4.1 5.8-4.6-.6 3.5-1.9 6.1-4.3 7.9-2.5 1.9-5.3 2.5-8 1.9Z"/><path d="M4.4 14.2c3.3-.3 6.6-2.6 9.8-7.4"/>',
  "Simplified 20 px comparison cut");

add("carob-caffeine-free", "comparison-carob-caffeine-free-24", "Carob: caffeine free", "Comparison", 24,
  `<g transform="translate(-10.5 -10.7) scale(.18)" fill="currentColor" stroke="none">${approvedCupPaths}</g>`,
  "Exact central cup artwork extracted from the approved current Caffeine Free badge");
add("carob-caffeine-free", "comparison-carob-caffeine-free-20", "Carob: caffeine free", "Comparison", 20,
  '<path d="M3.8 9.2h9v2.7c0 2.8-1.7 4.6-4.5 4.6s-4.5-1.8-4.5-4.6V9.2Z"/><path d="M12.8 10.1H14a2 2 0 0 1 0 4h-1.5M6.7 7c-1.1-1.4.7-2 .2-3.5M10.2 7c-1.1-1.4.7-2 .2-3.5"/>',
  "Simplified 20 px cut derived from the approved cup symbol");

add("carob-evening", "comparison-carob-evening-24", "Carob: evening moment", "Comparison", 24,
  '<path d="M15.7 3.7a7.7 7.7 0 1 0 3 10.9 6.1 6.1 0 0 1-3-10.9Z"/><path d="M4.3 19c2.6-1 5.2-1 7.8 0 2.6 1 5.2 1 7.8 0"/>',
  "Crescent over the packaging horizon");
add("carob-evening", "comparison-carob-evening-20", "Carob: evening moment", "Comparison", 20,
  '<path d="M13 3.2a6.4 6.4 0 1 0 2.5 9.1A5.1 5.1 0 0 1 13 3.2Z"/><path d="M3.6 15.8c2.2-.8 4.3-.8 6.5 0 2.2.8 4.3.8 6.5 0"/>',
  "Simplified 20 px comparison cut");

add("comparison-check", "comparison-check-16", "Carob benefit confirmed", "Comparison", 16,
  '<path d="m2.8 8.4 3.2 3.2c2.1-2.7 4.5-5.1 7.2-7.4"/>',
  "Dedicated 16 px confirmation cut");

const escape = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const strokeFor = (size) => ({ 16: 1.25, 20: 1.4, 24: 1.5, 32: 1.7, 48: 2.05 }[size]);

await rm(out, { recursive: true, force: true });
await mkdir(individual, { recursive: true });

for (const icon of icons) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${icon.size} ${icon.size}" fill="none" stroke="currentColor" stroke-width="${strokeFor(icon.size)}" stroke-linecap="round" stroke-linejoin="round" color="#203b50" role="img" aria-labelledby="title"><title id="title">${escape(icon.title)} — ${icon.size} px review cut</title>${icon.body}</svg>\n`;
  await writeFile(join(individual, `${icon.id}.svg`), svg);
}

const symbols = icons.map((icon) => `<symbol id="v2-${icon.id}" viewBox="0 0 ${icon.size} ${icon.size}" fill="none" stroke="currentColor" stroke-width="${strokeFor(icon.size)}" stroke-linecap="round" stroke-linejoin="round">${icon.body}</symbol>`).join("");
const concepts = Object.groupBy(icons, (icon) => icon.concept);
const display = (id, px, className = "") => {
  const icon = icons.find((item) => item.id === id);
  return `<svg class="${className}" viewBox="0 0 ${icon.size} ${icon.size}" style="width:${px}px;height:${px}px" aria-hidden="true"><use href="#v2-${id}"></use></svg>`;
};

const reviewCards = Object.entries(concepts).map(([concept, variants]) => {
  const lead = variants[0];
  const sizes = variants.map((icon) => `<div class="cut">${display(icon.id, icon.size)}<b>${icon.size}</b><code>${icon.id}.svg</code></div>`).join("");
  return `<article class="review-card"><span class="lane">${escape(lead.lane)}</span><h3>${escape(lead.title)}</h3><div class="cuts">${sizes}</div><p>${escape(lead.source)}</p></article>`;
}).join("");

const categoryDefs = [
  ["category-bar-20", "Bars"],
  ["category-banana-20", "Bananas"],
  ["category-moon-20", "Moons"],
  ["category-bites-20", "Bites"],
  ["category-elixir-20", "Elixirs"],
];
const categoryButtons = categoryDefs.map(([id, label], index) => `<button class="category${index === 0 ? " active" : ""}" type="button">${display(id, 17)}<span>${label}</span></button>`).join("");

const compareRows = [
  { old: "comparison-cacao-bitter-24", oldLabel: "Sweetness", oldCopy: "Naturally bitter", fresh: "comparison-carob-sweet-24", freshLabel: "Sweetness", freshCopy: "Sweet from the pod itself, no added sugar" },
  { old: "comparison-cacao-stimulation-24", oldLabel: "Caffeine", oldCopy: "Contains caffeine and theobromine", fresh: "comparison-carob-caffeine-free-24", freshLabel: "Caffeine", freshCopy: "Naturally caffeine free, any hour you like" },
  { old: "comparison-cacao-activation-24", oldLabel: "Moment", oldCopy: "Stimulating and activating", fresh: "comparison-carob-evening-24", freshLabel: "Moment", freshCopy: "Stimulant free, for arvos and slow evenings" },
];
const panelRows = (side) => compareRows.map((row) => `<div class="compare-row"><span class="compare-icon">${display(side === "old" ? row.old : row.fresh, 22)}</span><div><b>${side === "old" ? row.oldLabel : row.freshLabel}</b><p>${side === "old" ? row.oldCopy : row.freshCopy}</p></div>${side === "fresh" ? `<span class="compare-check">${display("comparison-check-16", 14)}</span>` : ""}</div>`).join("");

const sourceCards = [
  [dataUrl("brandmark", "image/svg+xml"), "Approved Moon / Sun brandmark", sources.brandmark],
  [dataUrl("caffeineBadge", "image/svg+xml"), "Approved Caffeine Free badge", sources.caffeineBadge],
  [dataUrl("bar", "image/webp"), "Current wrapped bar silhouette", sources.bar],
  [dataUrl("banana", "image/webp"), "Current coated banana silhouette", sources.banana],
  [dataUrl("moon", "image/webp"), "Current carob Moon silhouette", sources.moon],
  [dataUrl("bite", "image/webp"), "Current Eclipse Bite silhouette", sources.bite],
  [dataUrl("elixir", "image/png"), "Current cylindrical elixir canister", sources.elixir],
].map(([src, title, path]) => `<article class="source-card"><div class="source-img"><img src="${src}" alt=""></div><b>${title}</b><code>${path}</code></article>`).join("");

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>MapleMoon icon v2 — approval review</title>
<style>
:root{--blue:#315f88;--blue-dark:#203b50;--paper:#f4f2ed;--cream:#e7e4ca;--ink:#172326;--muted:#61717a;--line:#c9d5dc;--hold:#a33b2f}*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font:15px/1.5 Arial,sans-serif}header{padding:52px clamp(20px,6vw,82px) 46px;background:var(--blue);color:var(--cream)}h1{max-width:14ch;margin:12px 0 14px;font:500 clamp(38px,5vw,64px)/1.02 Georgia,serif}.status{display:inline-flex;padding:7px 11px;border:1px solid currentColor;border-radius:999px;font-size:11px;font-weight:700;letter-spacing:.15em}.intro{max-width:70ch;margin:0;color:rgba(231,228,202,.82)}main{padding:38px clamp(16px,5vw,72px) 86px}.section{margin-block:0 0 52px}.section-head{display:grid;grid-template-columns:minmax(0,1fr) minmax(240px,42ch);align-items:end;gap:24px;margin-bottom:20px;border-bottom:1px solid var(--line);padding-bottom:14px}.section h2{margin:0;font:500 clamp(28px,3vw,42px)/1.1 Georgia,serif}.section-head p{margin:0;color:var(--muted)}.source-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}.source-card,.review-card{min-width:0;border:1px solid var(--line);border-radius:16px;background:#fff;padding:16px}.source-img{display:grid;place-items:center;height:150px;margin-bottom:12px;border-radius:10px;background:var(--blue);overflow:hidden}.source-img img{max-width:88%;max-height:88%;object-fit:contain}.source-card b{display:block;margin-bottom:6px}.source-card code,.review-card code{display:block;color:#557085;font-size:10px;overflow-wrap:anywhere}.review-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.review-card .lane{color:#8a7650;font-size:10px;letter-spacing:.14em;text-transform:uppercase}.review-card h3{margin:5px 0 14px;font:500 22px/1.1 Georgia,serif}.review-card p{margin:14px 0 0;color:var(--muted);font-size:12px}.cuts{display:flex;align-items:end;gap:18px;min-height:66px}.cut{display:grid;justify-items:center;gap:4px;color:var(--blue-dark)}.cut b{font-size:10px;color:var(--muted)}.cut code{max-width:86px;text-align:center}.homepage-review{display:grid;gap:24px}.live-label{margin:0 0 9px;color:#8a7650;font-size:10px;letter-spacing:.16em;text-transform:uppercase}.category-shell{max-width:840px;margin:auto;padding:28px;border-radius:24px;background:linear-gradient(145deg,#ddebf2,#cddfea);box-shadow:0 18px 50px rgba(32,59,80,.12)}.category-label{text-align:center;color:#61717a;font-size:10px;letter-spacing:.17em;text-transform:uppercase}.category-dock{display:flex;margin-top:10px;border:1px solid rgba(32,59,80,.18);border-radius:999px;overflow:hidden;background:rgba(255,255,255,.58)}.category{flex:1;display:flex;align-items:center;justify-content:center;gap:8px;min-height:58px;border:0;border-left:1px solid rgba(32,59,80,.14);background:none;color:#60727c}.category:first-child{border-left:0}.category.active{color:var(--ink);background:rgba(255,255,255,.65)}.category span{font-size:10px;letter-spacing:.08em;text-transform:uppercase}.comparison{display:grid;grid-template-columns:1fr 34px 1fr;align-items:center;max-width:980px;margin:auto}.panel{overflow:hidden;border:1px solid var(--line);border-radius:18px;background:#fff}.panel.fresh{background:linear-gradient(145deg,#3d5b6e,#436377);color:#f4f1e4}.panel-head{padding:22px;border-bottom:1px solid rgba(90,110,120,.2)}.panel-head span{font-size:10px;letter-spacing:.15em;text-transform:uppercase;opacity:.65}.panel-head h3{margin:5px 0 0;font:500 25px Georgia,serif}.compare-row{display:grid;grid-template-columns:44px 1fr auto;align-items:center;gap:12px;min-height:96px;padding:16px 20px;border-top:1px solid rgba(90,110,120,.16)}.compare-row:first-child{border-top:0}.compare-icon{display:grid;place-items:center;width:42px;height:42px;border-radius:50%;background:rgba(49,95,136,.1);color:var(--blue-dark)}.fresh .compare-icon{background:rgba(247,243,226,.09);color:var(--cream)}.compare-row b{font-family:Georgia,serif}.compare-row p{margin:3px 0 0;color:var(--muted);font-size:13px}.fresh .compare-row p{color:rgba(244,241,228,.76)}.compare-check{color:var(--cream)}.vs{text-align:center;font:italic 18px Georgia,serif;color:#8a7650}.gate{border:2px solid var(--hold);border-radius:18px;padding:22px;background:#fff}.gate h2{color:var(--hold)}.gate-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:18px}.gate-item{padding:16px;border:1px solid var(--line);border-radius:12px}.gate-item b{display:block;margin-bottom:5px}.gate-item span{color:var(--muted);font-size:12px}
.section{margin-block:0 52px}
@media(max-width:900px){.source-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.review-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.comparison{grid-template-columns:1fr}.vs{padding:12px}.gate-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:560px){header{padding:34px 18px}.section-head{grid-template-columns:1fr}.review-grid{grid-template-columns:1fr}.source-grid{grid-template-columns:1fr 1fr}.source-img{height:116px}.category-shell{padding:18px 10px}.category-dock{border-radius:14px}.category{min-width:0;flex-direction:column;gap:4px;padding:8px 2px}.category span{font-size:8px;letter-spacing:.02em}.panel-head{padding:18px}.compare-row{min-height:86px;padding:14px}.gate-grid{grid-template-columns:1fr}}
</style></head><body><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden">${symbols}</svg>
<header><span class="status">REVIEW ONLY · NOT APPROVED · ROUTES UNCHANGED</span><h1>MapleMoon icon direction v2</h1><p class="intro">A packaging-anchored representative set for approval before any site migration. The Moon/Sun arch, horizon rhythm, real product silhouettes and current Caffeine Free symbol are the source anchors. This is not a production icon library.</p></header>
<main>
<section class="section"><div class="section-head"><h2>Source anchors</h2><p>Current project evidence only. The bilingual packaging authority and approved exports remain unchanged.</p></div><div class="source-grid">${sourceCards}</div></section>
<section class="section"><div class="section-head"><h2>Representative cuts</h2><p>Separate optical drawings are shown at their actual master sizes. Small cuts remove detail rather than shrinking blindly.</p></div><div class="review-grid">${reviewCards}</div></section>
<section class="section homepage-review"><div class="section-head"><h2>Homepage category icons</h2><p>All five candidates shown at the live 17 px selector size. Review silhouette, distinction and rhythm as a family.</p></div><div><p class="live-label">Live-context simulation · 17 px icons</p><div class="category-shell" data-review="category-selector"><div class="category-label">Choose your carob moment</div><div class="category-dock">${categoryButtons}</div></div></div></section>
<section class="section"><div class="section-head"><h2>Carob comparison</h2><p>Each meaning now has its own symbol. The carob side uses the pod, approved caffeine-free cup and Moon/horizon language.</p></div><p class="live-label">Live-context simulation · 22 px icons · 14 px checks</p><div class="comparison" data-review="carob-comparison"><div class="panel old"><div class="panel-head"><span>The old default</span><h3>Cacao chocolate</h3></div>${panelRows("old")}</div><span class="vs">vs</span><div class="panel fresh"><div class="panel-head"><span>The Maple Moon switch</span><h3>Maple Moon carob</h3></div>${panelRows("fresh")}</div></div></section>
<section class="section gate"><div class="section-head"><h2>Approval gate</h2><p>No route replacement occurs until these four decisions are explicitly accepted.</p></div><div class="gate-grid"><div class="gate-item"><b>□ Utility character</b><span>Cart, search and plus at 24/20/16.</span></div><div class="gate-item"><b>□ Category family</b><span>Bars, Bananas, Moons, Bites and Elixirs at live size.</span></div><div class="gate-item"><b>□ Comparison language</b><span>Distinct cacao and carob meanings.</span></div><div class="gate-item"><b>□ Process character</b><span>Pod, roast and blend at 48/32.</span></div></div></section>
</main></body></html>\n`;

const manifest = {
  schema: "maplemoon-icon-review/v2",
  generated: "2026-08-25",
  status: "review_only_not_approved_routes_unchanged",
  authority: "_wip/evidence/carli_external_icon_kit_20260825/AUTHORITY-MAP.md",
  iconCount: icons.length,
  sourceHashes,
  sources,
  icons: icons.map(({ body, ...icon }) => ({ ...icon, file: `individual/${icon.id}.svg` })),
  gates: ["utility_character", "homepage_category_family", "carob_comparison_language", "process_character"],
};

const gate = `# MapleMoon icon direction v2 — review gate

Status: **REVIEW ONLY — NOT APPROVED — ROUTES UNCHANGED**

## Why this exists

The v1 website set was implemented before visual approval and did not meet its own delivery contract. This v2 package corrects the sequence: approve representative construction first, then complete and migrate the family.

## Current authority

- Packaging authority: \`${sources.brandmark}\`
- Current Caffeine Free badge: \`${sources.caffeineBadge}\`
- Product silhouettes: \`${sources.bar}\`, \`${sources.moon}\`, \`${sources.elixir}\`
- Authority map: \`_wip/evidence/carli_external_icon_kit_20260825/AUTHORITY-MAP.md\`

## Decisions required

- [ ] Utility character — cart, search and plus at 24/20/16.
- [ ] Homepage category family — Bars, Bananas, Moons, Bites and Elixirs at the live 17 px size.
- [ ] Carob comparison language — distinct cacao and carob symbols at the live module sizes.
- [ ] Process character — pod, roast and blend at 48/32.

## Explicit hold

Do not replace route icons, update the v1 route hashes, deploy, upload or send this as approved artwork until all four decisions are accepted.
`;

await writeFile(join(out, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
await writeFile(join(out, "review-sheet.html"), html);
await writeFile(join(out, "REVIEW-GATE.md"), gate);

console.log(`BUILD PASS maplemoon-icon-v2-review icons=${icons.length} sources=${Object.keys(sources).length}`);
console.log(`Review sheet: ${join(out, "review-sheet.html")}`);
console.log("ROUTES UNCHANGED");
