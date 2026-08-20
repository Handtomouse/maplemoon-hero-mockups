import fs from 'node:fs';

const initialRecord = JSON.parse(fs.readFileSync(
  '_wip/evidence/s1b_verify_20260820/live-theme-metadata-step1.json',
  'utf8',
));
const initial = initialRecord.themes.find((theme) => theme.id.endsWith('/154500595909')).updatedAt;
const finalTranscript = fs.readFileSync(
  '_wip/evidence/s1b_verify_20260820/live-theme-metadata-final.txt',
  'utf8',
);
const finalTheme = finalTranscript.match(
  /"id": "gid:\/\/shopify\/OnlineStoreTheme\/154500595909"[\s\S]*?"updatedAt": "([^"]+)"/,
);
if (!finalTheme) throw new Error('Live theme metadata missing from final transcript');
const final = finalTheme[1];

console.log(`initial_live_154500595909_updatedAt=${initial}`);
console.log(`final_live_154500595909_updatedAt=${final}`);
console.log(`identical=${initial === final}`);
process.exitCode = initial === final ? 0 : 1;
