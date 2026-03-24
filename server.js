const express = require('express');
const app = express();
app.get('/', (req, res) => res.redirect('/index.html'));
app.use(express.static(__dirname));
app.listen(3005, () => console.log('MapleMoon Hero Mockups → http://localhost:3005'));
