const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
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
      .replace(/\{\{[^}]*\}\}/g, '')
      .replace(/\{%\s*schema\s*%\}[\s\S]*?\{%\s*endschema\s*%\}/g, '');
    res.type('html').send('<!DOCTYPE html><html lang="en-AU"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>MapleMoon — Hero Evolved Preview</title><link rel="stylesheet" href="/brand_kit.css"></head><body style="margin:0;padding:0">' + html + '</body></html>');
  });
});
app.use(express.static(__dirname));
app.listen(3005, () => console.log('MapleMoon Hero Mockups → http://localhost:3005'));
