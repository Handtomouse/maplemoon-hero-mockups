import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));

function replaceExpected(source, before, after, expected, label) {
  const found = source.split(before).length - 1;
  if (found !== expected) throw new Error(`${label}: expected ${expected}, found ${found}`);
  return source.split(before).join(after);
}

async function edit(relative, operations) {
  const path = join(root, relative);
  let source = await readFile(path, "utf8");
  for (const operation of operations) source = replaceExpected(source, ...operation);
  await writeFile(path, source);
  console.log(`Cleaned ${relative}`);
}

await edit("_wip/carob-story.WIP.html", [
  ['.bean-mark{position:relative;width:38px;height:64px;border:2px solid rgba(98,87,69,.72);border-radius:54% 46% 52% 48%/61% 44% 56% 39%;transform:rotate(19deg);}\n.bean-mark::after{content:"";position:absolute;top:5px;bottom:5px;left:17px;width:1px;background:rgba(98,87,69,.72);transform:rotate(-17deg);transform-origin:center;}\n', '', 1, "legacy bean drawing"],
  ['.bean-mark{width:44px;height:62px;border-color:rgba(106,81,57,.6);}.bean-mark::after{background:rgba(106,81,57,.6);}', '', 1, "legacy bean variant"],
  ['.process-icon{position:relative;width:34px;height:34px;margin-bottom:12px;border:1.5px solid var(--ink);border-radius:50%;opacity:.88;}.process-icon.pod{border-radius:55% 45% 55% 45%;transform:rotate(38deg);}.process-icon.roast::after{content:"";position:absolute;inset:6px 13px;border-radius:50%;background:var(--ink);box-shadow:-7px 8px 0 -2px var(--ink),7px 8px 0 -2px var(--ink);}.process-icon.blend{border-radius:7px 7px 45% 45%;}.process-icon.bar{border-radius:3px;transform:rotate(-20deg);}', '', 1, "legacy process drawings"],
  ['.process-steps li+li::before{content:"›";', '.process-steps li+li::before{', 1, "legacy process arrow glyph"],
  ['.cta .pill::after{content:"→";', '.cta .pill::after{', 1, "legacy CTA arrow glyph"]
]);

await edit("_wip/faq.WIP.html", [
  ['.category-nav button::after{content:"↗";', '.category-nav button::after{content:"";', 1, "legacy category glyph"]
]);

await edit("_wip/our-story.WIP.html", [
  ['.os-founder-note__more summary::after{content:"+";', '.os-founder-note__more summary::after{content:"";', 1, "legacy disclosure glyph"]
]);
