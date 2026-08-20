const os = require('node:os');

const isolatedHome = process.env.MAPLEMOON_SHOPIFY_TEMP_HOME;
if (!isolatedHome) {
  throw new Error('MAPLEMOON_SHOPIFY_TEMP_HOME is required');
}

os.homedir = () => isolatedHome;
