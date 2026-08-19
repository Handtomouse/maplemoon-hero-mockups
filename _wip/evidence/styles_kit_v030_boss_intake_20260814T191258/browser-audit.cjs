const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");
const { chromium } = require("playwright");

const evidence = "/Users/handtomouse/maplemoon-website/_wip/evidence/styles_kit_v030_boss_intake_20260814T191258";
const kitRoot = "/Users/handtomouse/Documents/Codex/2026-08-13/maple-moon-shared-site-styles-kit/outputs";
const candidateRoot = "/Users/handtomouse/maplemoon_build_20260813";
const mime = { ".html":"text/html", ".css":"text/css", ".js":"text/javascript", ".svg":"image/svg+xml", ".png":"image/png", ".jpg":"image/jpeg", ".jpeg":"image/jpeg", ".webp":"image/webp", ".woff2":"font/woff2", ".mp4":"video/mp4" };

function server(root) {
  return http.createServer((req, res) => {
    let rel;
    try { rel = decodeURIComponent(new URL(req.url, "http://localhost").pathname).replace(/^\/+/, ""); }
    catch { res.writeHead(400).end(); return; }
    if (rel === "favicon.ico") { res.writeHead(204).end(); return; }
    if (!rel) rel = "style-kit-playground.html";
    const target = path.resolve(root, rel);
    if (!target.startsWith(`${path.resolve(root)}${path.sep}`) && target !== path.resolve(root)) { res.writeHead(403).end(); return; }
    fs.readFile(target, (error, bytes) => {
      if (error) { res.writeHead(404).end("not found"); return; }
      res.writeHead(200, { "content-type": mime[path.extname(target).toLowerCase()] || "application/octet-stream", "cache-control":"no-store" });
      res.end(bytes);
    });
  });
}

const listen = (instance) => new Promise((resolve) => instance.listen(0, "127.0.0.1", () => resolve(instance.address().port)));
const close = (instance) => new Promise((resolve) => instance.close(resolve));

function auditCollectors(page) {
  const errors = { console: [], page: [], request: [], response: [] };
  page.on("console", (message) => { if (message.type() === "error") errors.console.push(message.text()); });
  page.on("pageerror", (error) => errors.page.push(error.message));
  page.on("requestfailed", (request) => errors.request.push(`${request.method()} ${request.url()} :: ${request.failure()?.errorText}`));
  page.on("response", (response) => { if (response.status() >= 400) errors.response.push(`${response.status()} ${response.url()}`); });
  return errors;
}

async function metrics(page) {
  return page.evaluate(() => {
    const visible = (element) => {
      const style = getComputedStyle(element); const rect = element.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) > 0 && rect.width > 0 && rect.height > 0;
    };
    const required = [...document.querySelectorAll("button,input,select,textarea,summary,[role=tab],a.btn,a.button-link,a.icon-control")].filter(visible);
    const sub44 = required.map((element) => {
      const rect = element.getBoundingClientRect();
      return { selector: element.id ? `#${element.id}` : `${element.tagName.toLowerCase()}.${[...element.classList].join(".")}`, width: +rect.width.toFixed(2), height: +rect.height.toFixed(2), text: (element.textContent || element.getAttribute("aria-label") || "").trim().slice(0,60) };
    }).filter((entry) => entry.width < 44 || entry.height < 44);
    const images = [...document.images];
    return {
      url: location.href,
      viewport: { width: innerWidth, height: innerHeight },
      bodyScrollWidth: document.body.scrollWidth,
      documentScrollWidth: document.documentElement.scrollWidth,
      overflow: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) > innerWidth + 1,
      requiredTargets: required.length,
      sub44,
      images: images.length,
      brokenImages: images.filter((image) => image.complete && (!image.naturalWidth || !image.naturalHeight)).map((image) => image.currentSrc || image.src),
      nonblank: document.body.innerText.trim().length > 100 && document.body.getBoundingClientRect().height > innerHeight / 2
    };
  });
}

function rgb(value) {
  const parts = String(value).match(/[\d.]+/g)?.slice(0,3).map(Number);
  return parts?.length === 3 ? parts : null;
}
function luminance(color) {
  const channels = rgb(color)?.map((number) => number / 255);
  if (!channels) return null;
  const linear = channels.map((value) => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
  return .2126 * linear[0] + .7152 * linear[1] + .0722 * linear[2];
}
function contrast(a, b) {
  const first = luminance(a); const second = luminance(b);
  if (first == null || second == null) return null;
  return (Math.max(first, second) + .05) / (Math.min(first, second) + .05);
}

(async () => {
  const kitServer = server(kitRoot); const candidateServer = server(candidateRoot);
  const kitPort = await listen(kitServer); const candidatePort = await listen(candidateServer);
  const browser = await chromium.launch({ headless: true, executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", args:["--disable-background-networking", "--disable-component-update", "--no-default-browser-check"] });
  const result = { schema:"maplemoon-styles-kit-v030-browser-audit/v1", kit:[], interactions:{}, candidate:[], summary:{} };
  try {
    const sizes = [[1440,1000],[1024,900],[768,900],[390,844]];
    for (const [width,height] of sizes) {
      const page = await browser.newPage({ viewport:{width,height}, deviceScaleFactor:1 });
      const errors = auditCollectors(page);
      await page.goto(`http://127.0.0.1:${kitPort}/style-kit-playground.html`, { waitUntil:"networkidle" });
      await page.locator("body").evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(250);
      await page.screenshot({ path:path.join(evidence, `kit-${width}x${height}-full.png`), fullPage:true });
      const pageMetrics = await metrics(page);
      const sections = await page.evaluate(() => ["shell","page-headers","sections-media","components","utility","overlays-states"].map((id) => ({ id, exists:!!document.getElementById(id), text:(document.getElementById(id)?.innerText || "").trim().length })));
      result.kit.push({ width,height, metrics:pageMetrics, sections, errors });
      if (width === 1440 || width === 390) {
        for (const name of ["story","carob","faq","shop","stockists"]) {
          await page.locator(`[data-header-tab="${name}"]`).click();
          await page.locator(`[data-header-panel="${name}"]`).screenshot({ path:path.join(evidence, `kit-header-${name}-${width}.png`) });
        }
      }
      await page.close();
    }

    const interactionPage = await browser.newPage({ viewport:{width:390,height:844} });
    const interactionErrors = auditCollectors(interactionPage);
    await interactionPage.goto(`http://127.0.0.1:${kitPort}/style-kit-playground.html#overlays-states`, { waitUntil:"networkidle" });
    const modalOpen = interactionPage.locator("[data-modal-open]");
    await modalOpen.click();
    const modalEntry = await interactionPage.evaluate(() => ({ open:document.querySelector("#specimen-modal").open, active:document.activeElement?.outerHTML.slice(0,120) }));
    await interactionPage.keyboard.press("Escape");
    const modalExit = await interactionPage.evaluate(() => ({ open:document.querySelector("#specimen-modal").open, returned:document.activeElement === document.querySelector("[data-modal-open]") }));
    await interactionPage.locator("[data-drawer-open]").click();
    const drawerEntry = await interactionPage.evaluate(() => ({ hidden:document.querySelector("[data-drawer-panel]").getAttribute("aria-hidden"), activeInside:document.querySelector("[data-drawer-panel]").contains(document.activeElement), pageInert:document.querySelector(".drawer-demo-page").inert }));
    await interactionPage.keyboard.press("Escape");
    const drawerExit = await interactionPage.evaluate(() => ({ hidden:document.querySelector("[data-drawer-panel]").getAttribute("aria-hidden"), returned:document.activeElement === document.querySelector("[data-drawer-open]") }));
    await interactionPage.locator("[data-popover-toggle]").click();
    const popoverEntry = await interactionPage.evaluate(() => ({ hidden:document.querySelector("[data-popover-panel]").hidden, focused:document.activeElement === document.querySelector("[data-popover-panel]") }));
    await interactionPage.keyboard.press("Escape");
    const popoverExit = await interactionPage.evaluate(() => ({ hidden:document.querySelector("[data-popover-panel]").hidden, returned:document.activeElement === document.querySelector("[data-popover-toggle]") }));
    result.interactions = { modal:{entry:modalEntry,exit:modalExit}, drawer:{entry:drawerEntry,exit:drawerExit}, popover:{entry:popoverEntry,exit:popoverExit}, errors:interactionErrors, classification:"catalogue proof only; not real-candidate technical evidence" };
    await interactionPage.close();

    const routeSpecs = {
      "homepage.html": { headline:"h1", media:null, boundary:"Home cinematic exception; excluded from RESP-008" },
      "our-story.html": { headline:".os-story-hero__copy h1", media:".os-story-hero__portrait" },
      "carob-story.html": { headline:".hero .hd", media:".hero .pic" },
      "faq.html": { headline:".faq-hero h1", media:".faq-hero", pseudo:"::after" },
      "shop.html": { headline:".sp-opening .sp-head h1", media:null },
      "stockists.html": { headline:".sp-head h1", media:".sp-head", pseudo:"::after" },
      "pure-carob-bar.html": { headline:"#product-title", media:".pd-visual", boundary:"Pure product-detail route; excluded from RESP-008" }
    };
    const candidateSizes = [[390,844],[900,900],[1440,1000]];
    for (const [route,spec] of Object.entries(routeSpecs)) {
      for (const [width,height] of candidateSizes) {
        const page = await browser.newPage({ viewport:{width,height}, deviceScaleFactor:1 });
        const errors = auditCollectors(page);
        await page.goto(`http://127.0.0.1:${candidatePort}/${route}`, { waitUntil:"networkidle" });
        await page.waitForTimeout(200);
        await page.screenshot({ path:path.join(evidence, `candidate-${route.replace(".html","")}-${width}.png`), fullPage:false });
        const baseMetrics = await metrics(page);
        const details = await page.evaluate(({spec}) => {
          const headline = document.querySelector(spec.headline);
          const h = headline ? getComputedStyle(headline) : null;
          const media = spec.media ? document.querySelector(spec.media) : null;
          const m = media ? getComputedStyle(media, spec.pseudo || null) : null;
          const rect = (element) => { if (!element) return null; const r=element.getBoundingClientRect(); return {top:+r.top.toFixed(2),left:+r.left.toFixed(2),width:+r.width.toFixed(2),height:+r.height.toFixed(2),bottom:+r.bottom.toFixed(2)}; };
          const imageStats = [...document.images].map((img) => ({ src:img.getAttribute("src"), width:img.getAttribute("width"), height:img.getAttribute("height"), loading:img.getAttribute("loading"), decoding:img.getAttribute("decoding"), alt:img.getAttribute("alt"), naturalWidth:img.naturalWidth, naturalHeight:img.naturalHeight, inPicture:Boolean(img.closest("picture")), hasSrcset:Boolean(img.getAttribute("srcset") || img.closest("picture")?.querySelector("source[srcset]")), hasSizes:Boolean(img.getAttribute("sizes") || img.closest("picture")?.querySelector("source[sizes]")), hasErrorHandler:Boolean(img.getAttribute("onerror")) }));
          const goldSelectors = ".eyebrow,.qkick,.pdp-eyebrow,.kick,.sp-flag,.pd-eyebrow,.wf-peyebrow";
          const gold = [...document.querySelectorAll(goldSelectors)].filter((element) => { const r=element.getBoundingClientRect(); const s=getComputedStyle(element); return r.width>0 && r.height>0 && s.display!=="none"; }).map((element) => {
            let field = element; let background = "rgba(0, 0, 0, 0)";
            while (field) { background=getComputedStyle(field).backgroundColor; if (background !== "rgba(0, 0, 0, 0)" && background !== "transparent") break; field=field.parentElement; }
            const s=getComputedStyle(element); return {selector:element.className || element.tagName, text:element.textContent.trim().slice(0,80), color:s.color, fontSize:s.fontSize, background};
          });
          return {
            headlineExists:Boolean(headline),
            headlineRect:rect(headline),
            headlineStyle:h ? {fontFamily:h.fontFamily,fontSize:h.fontSize,lineHeight:h.lineHeight,letterSpacing:h.letterSpacing,fontWeight:h.fontWeight} : null,
            mediaExists:spec.media ? Boolean(media) : null,
            mediaRect:rect(media),
            mediaStyle:m ? {backgroundImage:m.backgroundImage,maskImage:m.maskImage,webkitMaskImage:m.webkitMaskImage,opacity:m.opacity,display:m.display} : null,
            copyBeforeMedia: headline && media ? headline.getBoundingClientRect().top <= media.getBoundingClientRect().top : null,
            images:imageStats,
            gold
          };
        }, {spec});
        details.gold = details.gold.map((entry) => ({...entry, contrast:+contrast(entry.color,entry.background).toFixed(2)}));
        const delivery = {
          total:details.images.length,
          naturalNonzero:details.images.filter((i)=>i.naturalWidth>0&&i.naturalHeight>0).length,
          intrinsicDimensions:details.images.filter((i)=>i.width&&i.height).length,
          responsiveSource:details.images.filter((i)=>i.hasSrcset).length,
          sizes:details.images.filter((i)=>i.hasSizes).length,
          loading:details.images.filter((i)=>i.loading).length,
          decoding:details.images.filter((i)=>i.decoding).length,
          errorHandler:details.images.filter((i)=>i.hasErrorHandler).length
        };
        result.candidate.push({route,width,height,metrics:baseMetrics,details:{...details,images:undefined},delivery,errors});
        await page.close();
      }
    }
    result.summary = {
      kitWidths: result.kit.length,
      kitPass: result.kit.every((entry) => entry.metrics.nonblank && !entry.metrics.overflow && !entry.metrics.brokenImages.length && !entry.metrics.sub44.length && Object.values(entry.errors).every((list)=>!list.length) && entry.sections.every((section)=>section.exists&&section.text>20)),
      interactionsPass: result.interactions.modal.entry.open && result.interactions.modal.exit.returned && !result.interactions.modal.exit.open && result.interactions.drawer.entry.hidden === "false" && result.interactions.drawer.entry.activeInside && result.interactions.drawer.entry.pageInert && result.interactions.drawer.exit.hidden === "true" && result.interactions.drawer.exit.returned && !result.interactions.popover.entry.hidden && result.interactions.popover.entry.focused && result.interactions.popover.exit.hidden && result.interactions.popover.exit.returned,
      candidateRenders: result.candidate.length,
      candidateNetworkPass: result.candidate.every((entry)=>entry.metrics.nonblank&&!entry.metrics.overflow&&!entry.metrics.brokenImages.length&&Object.values(entry.errors).every((list)=>!list.length))
    };
    fs.writeFileSync(path.join(evidence,"browser-audit.json"), JSON.stringify(result,null,2)+"\n");
    console.log(JSON.stringify(result.summary,null,2));
    console.log(`RESULT ${Object.values(result.summary).every((value)=>typeof value === "number" ? value>0 : value) ? "PASS" : "FAIL"}`);
    if (!result.summary.kitPass || !result.summary.interactionsPass || !result.summary.candidateNetworkPass) process.exitCode=1;
  } finally {
    await browser.close(); await close(kitServer); await close(candidateServer);
  }
})().catch((error) => { console.error(error.stack || error); process.exit(1); });
