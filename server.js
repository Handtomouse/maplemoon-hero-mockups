const express = require('express');
const path = require('path');
const fs = require('fs');
const os = require('os');
const app = express();
app.use(express.json({ limit: '256kb' }));

// Dev-only: the tuning playground POSTs changed CSS vars; we bake them into the .wf{} defaults of the lead file.
// Hardened: explicit key allowlist + strict value charset (no ; { } < > so a value can't escape the CSS declaration
// or the <style> element → prevents stored XSS), and localhost-only.
const APPLY_KEYS = new Set(['--rhythm','--sp-xl','--sp-lg','--sp-md','--sp-sm','--sp-xs','--hb-end','--hb-hold','--hero-h','--mist','--grain','--glow','--sky-grad','--sky-filter','--wrap-w','--pad-x','--wordmark-w','--h-scale','--flow-top','--flow-pale','--ink','--radius','--scrim','--cf-spread','--cf-tilt','--cf-depth','--bar-shadow','--pool','--cf-speed']);
const SAFE_CSS_VALUE = /^[a-zA-Z0-9_.,#()%\s-]{1,600}$/; // letters/digits/.,#()%- and spaces only — covers numbers, px/vh, gradients, filters
const isLocal = (ra) => ra === '127.0.0.1' || ra === '::1' || ra === '::ffff:127.0.0.1';

app.post('/_apply', (req, res) => {
  if (!isLocal(req.socket.remoteAddress || '')) return res.status(403).json({ ok: false, error: 'local only' });
  const vars = (req.body && req.body.vars) || {};
  const file = path.join(__dirname, 'homepage_real_1_lead.html');
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ ok: false, error: String(err) });
    try { fs.writeFileSync(path.join(os.tmpdir(), 'mm_lead.applybak.html'), data); } catch (e) {}
    let content = data; const applied = []; const rejected = []; const missed = [];
    Object.keys(vars).forEach((k) => {
      const val = String(vars[k]);
      if (!APPLY_KEYS.has(k) || !SAFE_CSS_VALUE.test(val) || /style|script|expression|url\s*\(/i.test(val)) { rejected.push(k); return; }
      // --sp-* live as calc(Npx * var(--rhythm)); keep them rhythm-scalable
      const newDecl = k.indexOf('--sp-') === 0 ? `${k}:calc(${val} * var(--rhythm));` : `${k}:${val};`;
      const esc = k.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
      const re = new RegExp(esc + ':[^;]*;'); // non-global → first (desktop default) only, not the mobile @media override
      if (re.test(content)) { content = content.replace(re, newDecl); applied.push(k); } else missed.push(k);
    });
    fs.writeFile(file, content, 'utf8', (e) => {
      if (e) return res.status(500).json({ ok: false, error: String(e) });
      res.json({ ok: true, applied, rejected, missed });
    });
  });
});

app.get('/', (req, res) => res.redirect('/index.html'));
// Serve .liquid files as HTML for browser preview (strips Liquid syntax)
app.get('/sections/:file.liquid', (req, res) => {
  const filePath = path.join(__dirname, 'sections', req.params.file + '.liquid');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(404).send('Not found');
    // Strip Liquid tags for browser preview
    let html = data
      .replace(/\{%-?\s*comment\s*-?%\}[\s\S]*?\{%-?\s*endcomment\s*-?%\}/g, '')
      .replace(/\{%-?\s*liquid[\s\S]*?-?%\}/g, '')
      .replace(/\{%-?\s*(?:if|unless|for|assign|capture|case)[\s\S]*?-?%\}/g, '')
      .replace(/\{%-?\s*(?:endif|endunless|endfor|endcapture|endcase|else|elsif|when|break)\s*-?%\}/g, '')
      .replace(/\{%-?\s*form[\s\S]*?-?%\}/g, '<form>')
      .replace(/\{%-?\s*endform\s*-?%\}/g, '</form>')
      .replace(/\{\{[^}]*\}\}/g, '')
      .replace(/\{%\s*schema\s*%\}[\s\S]*?\{%\s*endschema\s*%\}/g, '')
      // Clean broken srcset from stripped Liquid (e.g. " 300w,  600w" → remove)
      .replace(/srcset="[^"]*"/g, '');
    res.type('html').send('<!DOCTYPE html><html lang="en-AU"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>MapleMoon — Hero Evolved Preview</title><link rel="stylesheet" href="/brand_kit.css"></head><body style="margin:0;padding:0">' + html + '</body></html>');
  });
});
app.use(express.static(__dirname));
app.listen(3005, '127.0.0.1', () => console.log('MapleMoon Hero Mockups → http://localhost:3005 (localhost-only)'));
