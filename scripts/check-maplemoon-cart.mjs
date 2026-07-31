#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const repo = resolve(import.meta.dirname, "..");
const staging = resolve(
  repo,
  "docs/client-review/2026-08-01-saturday-review/staging-v1"
);
const aliases = [
  "homepage.html",
  "carob-story.html",
  "shop.html",
  "our-story.html",
  "stockists.html",
  "faq.html"
];
const failures = [];

function read(path) {
  return readFileSync(resolve(repo, path), "utf8");
}

function expect(condition, message) {
  if (!condition) failures.push(message);
}

const sourceScript = read(
  "docs/client-review/2026-08-01-saturday-review/shared/mock-cart.js"
);
const sourceStyle = read(
  "docs/client-review/2026-08-01-saturday-review/shared/mock-cart.css"
);

expect(
  /const products = prepareShopProducts\(\);\s*setupCart\(products\);/.test(sourceScript),
  "review cart is not initialized on ordinary review routes"
);
expect(
  /sessionStorage/.test(sourceScript),
  "cart shell is not scoped to per-tab session storage"
);
expect(
  /button\.textContent = "Add to cart"/.test(sourceScript) &&
    /priceWithoutSize\(priceElement\)/.test(sourceScript),
  "visible product cards are not bound to Add to cart with their displayed prices"
);
expect(
  /card\.classList\.add\("mm-hide-clean"\)/.test(sourceScript) &&
    /action\.textContent = "Unavailable"/.test(sourceScript),
  "pending product treatment is missing"
);
expect(
  /Thanks, your demo order was received\./.test(sourceScript),
  "fake order completion state is missing"
);
expect(
  /normalizeReviewNavigation\(\)/.test(sourceScript) &&
    /shop\.html#bars/.test(sourceScript) &&
    /Mobile page navigation/.test(sourceScript),
  "shared review navigation and purchase-route normalization are missing"
);
expect(
  /wf-tab\[data-cat="bananas"\]/.test(sourceScript) &&
    /wf-tab\[data-cat="crescents"\]/.test(sourceScript) &&
    /wf-tab\[data-cat="eclipseBites"\]/.test(sourceScript),
  "clean Homepage pending-format exclusions are missing"
);
expect(
  /Review preview: your email was not saved\./.test(sourceScript),
  "local newsletter discard notice is missing"
);
expect(
  /params\.get\("q"\)/.test(sourceScript) &&
    /search\.dispatchEvent\(new Event\("input"/.test(sourceScript),
  "Homepage-to-directory stockist search handoff is missing"
);
expect(
  !/\b(?:fetch|XMLHttpRequest|sendBeacon|WebSocket)\s*\(/.test(sourceScript),
  "cart shell contains a network-capable call"
);
expect(
  !/\b(?:subtotal|tax|discount|shippingTotal)\s*[:=(]/i.test(sourceScript),
  "cart shell invents a calculated commerce total"
);
expect(
  /prefers-reduced-motion/.test(sourceStyle),
  "reduced-motion treatment is missing"
);
expect(
  /min-height:\s*44px/.test(sourceStyle),
  "44px control target rule is missing"
);
expect(
  /\.mm-review-mobile-nav/.test(sourceStyle),
  "mobile review navigation styles are missing"
);

for (const mode of ["clean", "annotated"]) {
  const root = resolve(staging, mode);
  const builtScript = readFileSync(resolve(root, "mock-cart.js"), "utf8");
  const builtStyle = readFileSync(resolve(root, "mock-cart.css"), "utf8");
  expect(builtScript === sourceScript, `${mode} mock-cart.js differs from source`);
  expect(builtStyle === sourceStyle, `${mode} mock-cart.css differs from source`);

  for (const alias of aliases) {
    const html = readFileSync(resolve(root, alias), "utf8");
    const mainCount = (html.match(/<main\b/gi) || []).length;
    const h1Count = (html.match(/<h1\b/gi) || []).length;
    const idValues = Array.from(
      html.matchAll(/\bid=["']([^"']+)["']/gi),
      (match) => match[1]
    );
    const duplicateIds = idValues.filter(
      (id, index) => idValues.indexOf(id) !== index
    );
    const skipMatch = html.match(
      /<a\b[^>]*\bhref=["']#([^"']+)["'][^>]*>\s*Skip\b/i
    );
    expect(
      html.includes('<link rel="stylesheet" href="mock-cart.css">'),
      `${mode}/${alias} is missing mock-cart.css`
    );
    expect(
      html.includes('<script src="mock-cart.js"></script>'),
      `${mode}/${alias} is missing mock-cart.js`
    );
    expect(
      html.includes('params.get("cart-qa") === "1"'),
      `${mode}/${alias} is missing the early cart-QA mode gate`
    );
    expect(mainCount === 1, `${mode}/${alias} must contain exactly one main landmark`);
    expect(h1Count === 1, `${mode}/${alias} must contain exactly one h1`);
    expect(
      duplicateIds.length === 0,
      `${mode}/${alias} contains duplicate IDs: ${[...new Set(duplicateIds)].join(", ")}`
    );
    expect(Boolean(skipMatch), `${mode}/${alias} is missing a keyboard skip route`);
    if (skipMatch) {
      expect(
        new RegExp(`\\bid=["']${skipMatch[1]}["']`, "i").test(html),
        `${mode}/${alias} skip route target is missing: #${skipMatch[1]}`
      );
    }
    expect(
      /prefers-reduced-motion/.test(html),
      `${mode}/${alias} is missing page-level reduced-motion treatment`
    );
    expect(
      /focus-visible|:focus/.test(html),
      `${mode}/${alias} is missing visible-focus treatment`
    );
  }

  const shop = readFileSync(resolve(root, "shop.html"), "utf8");
  expect(
    (shop.match(/pending:true/g) || []).length === 2,
    `${mode}/shop.html does not preserve exactly two pending Moon products`
  );
  expect(
    (shop.match(/\{n:'/g) || []).length === 22,
    `${mode}/shop.html does not preserve the 22-item review catalogue`
  );
}

if (failures.length) {
  failures.forEach((failure) => console.error(`FAIL ${failure}`));
  console.error(`Summary: ${failures.length} failure(s)`);
  process.exit(1);
}

console.log(
  "PASS ordinary Add to cart binding, pending-product treatment, fake checkout, local form, accessibility and no-network checks"
);
