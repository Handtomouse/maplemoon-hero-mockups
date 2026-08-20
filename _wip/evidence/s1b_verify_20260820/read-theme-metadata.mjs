import { ensureAuthenticatedAdmin, graphqlRequest } from '/Users/handtomouse/.nvm/versions/node/v24.6.0/lib/node_modules/@shopify/cli/dist/chunk-ZVE6VSBX.js';

const store = 'maplemooncarob.myshopify.com';
const session = await ensureAuthenticatedAdmin(store);
const query = `query { themes(first: 50) { nodes { id name role updatedAt } } }`;
const result = await graphqlRequest({
  query,
  api: 'Admin',
  url: `https://${store}/admin/api/2026-07/graphql.json`,
  token: session.token,
  variables: {},
});

console.log(JSON.stringify(result, null, 2));
