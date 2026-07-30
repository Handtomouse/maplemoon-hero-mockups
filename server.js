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
// --- Dev feedback overlay: click-to-tag; logs to _wip/_feedback/log.jsonl; injected into every served HTML page ---
const FB_DIR = path.join(__dirname, '_wip', '_feedback');
try { fs.mkdirSync(FB_DIR, { recursive: true }); } catch (e) {}
const FB_LOG = path.join(FB_DIR, 'log.jsonl');
app.post('/__feedback', (req, res) => {
  if (!isLocal(req.socket.remoteAddress || '')) return res.status(403).json({ ok: false });
  const e = req.body || {};
  const rec = { id: Date.now().toString(36)+Math.random().toString(36).slice(2,6), t: new Date().toISOString(), session: String(e.session||'legacy').slice(0,120), url: String(e.url||'').slice(0,300), sel: String(e.sel||'').slice(0,500),
    text: String(e.text||'').slice(0,200), cat: String(e.cat||'').slice(0,28), priority: String(e.priority||'P2 · polish').slice(0,32), status: String(e.status||'Observed').slice(0,24), note: String(e.note||'').slice(0,1200),
    rect: e.rect||null, vw: e.vw||null, viewport: String(e.viewport||'desktop').slice(0,12), region: !!e.region };
  fs.appendFile(FB_LOG, JSON.stringify(rec) + '\n', () => {});
  res.json({ ok: true, id: rec.id });
});
app.get('/__feedback/log', (req, res) => { fs.readFile(FB_LOG, 'utf8', (err, d) => res.type('text/plain').send(err ? '' : d)); });
app.post('/__feedback/clear', (req, res) => { if (!isLocal(req.socket.remoteAddress || '')) return res.status(403).json({ ok:false }); fs.writeFile(FB_LOG, '', () => {}); res.json({ ok: true }); });
app.post('/__feedback/delete', (req, res) => {
  if (!isLocal(req.socket.remoteAddress || '')) return res.status(403).json({ ok:false });
  const id = String((req.body||{}).id||'');
  fs.readFile(FB_LOG, 'utf8', (err, d) => {
    if (err) return res.json({ ok:false });
    const kept = (d||'').split('\n').filter(Boolean).filter(l => { try { return JSON.parse(l).id !== id; } catch(e){ return true; } });
    fs.writeFile(FB_LOG, kept.length ? kept.join('\n')+'\n' : '', () => res.json({ ok:true }));
  });
});
app.get('/__feedback.js', (req, res) => { res.set('Cache-Control','no-store'); res.type('application/javascript').sendFile(path.join(FB_DIR, 'feedback.js')); });
// Inject the overlay into HTML responses (before static serves them raw)
app.use((req, res, next) => {
  if (req.method !== 'GET') return next();
  let p = req.path; if (p.endsWith('/')) p += 'index.html';
  if (!p.endsWith('.html')) return next();
  let file; try { file = path.join(__dirname, decodeURIComponent(p)); } catch (e) { return next(); }
  if (!file.startsWith(__dirname) || !fs.existsSync(file)) return next();
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) return next();
    const tag = '<script src="/__feedback.js"></script>';
    res.type('html').send(data.includes('</body>') ? data.replace('</body>', tag + '</body>') : data + tag);
  });
});
app.use(express.static(__dirname));
app.listen(3005, '127.0.0.1', () => console.log('MapleMoon Hero Mockups → http://localhost:3005 (localhost-only)'));
// Keep the localhost-only preview process attached when launched via npm on this Mac.
setInterval(() => {}, 2147483647);
