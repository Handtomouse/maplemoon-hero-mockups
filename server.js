const express = require('express');
const app = express();
app.use(express.static(__dirname));
app.listen(3004, () => console.log('MapleMoon Hero Mockups → http://localhost:3004'));
