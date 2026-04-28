#!/usr/bin/env node
// Re-build product_publications links after a wider product migration.
// Reads boster_publications.domestic_sku from Magento, joins to current
// products.sku in Supabase, inserts missing links.

import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..');

const env = Object.fromEntries(
  readFileSync(resolve(REPO_ROOT, '.env.local'), 'utf8').split(/\r?\n/)
    .filter(l => l && !l.startsWith('#'))
    .map(l => { const i = l.indexOf('='); return [l.slice(0, i), l.slice(i + 1)]; })
);
const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = env.SUPABASE_SECRETE_KEY;

console.log('Loading SKU↔legacy_id mappings via SSH...');
const SQL = "SELECT id, domestic_sku FROM boster_publications WHERE domestic_sku IS NOT NULL AND domestic_sku != ''";
const sshArgs = ['-p', '2223', '-o', 'BatchMode=yes', 'boster_ooP9u@69.27.32.101',
  `mysql -h 127.0.0.1 -u bosterbio_user -p'C67*b4@VDNYyJZm8' bosterbio_m2 -B -e "${SQL.replace(/"/g, '\\"')}"`,
];
const proc = spawn('ssh', sshArgs, { stdio: ['ignore', 'pipe', 'inherit'] });

let buffer = '';
const records = [];
let header = null;
proc.stdout.on('data', chunk => {
  buffer += chunk.toString('utf8');
  const lines = buffer.split('\n');
  buffer = lines.pop() ?? '';
  for (const line of lines) {
    if (!header) { header = line.split('\t'); continue; }
    if (!line.trim()) continue;
    const cols = line.split('\t');
    records.push({ legacy_id: parseInt(cols[0], 10), sku: (cols[1] || '').trim().toUpperCase() });
  }
});
await new Promise((rs, rj) => proc.on('close', code => code === 0 ? rs() : rj(new Error('ssh exit ' + code))));
console.log(`Loaded ${records.length} publication↔sku rows from Magento`);

async function fetchAllRows(table, select) {
  // PostgREST's default db-max-rows is typically 1000, so paginate explicitly.
  const out = []; const PAGE = 1000; let offset = 0;
  for (;;) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=${select}&offset=${offset}&limit=${PAGE}&order=id`, {
      headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` },
    });
    if (!res.ok) throw new Error(`fetch ${table}: ${res.status}`);
    const rows = await res.json();
    out.push(...rows);
    if (rows.length < PAGE) break;
    offset += PAGE;
    if (offset > 200000) break; // safety
  }
  return out;
}

const products = await fetchAllRows('products', 'id,sku');
const skuToProductId = new Map(products.map(p => [p.sku.trim().toUpperCase(), p.id]));
console.log(`Loaded ${skuToProductId.size} products`);

const pubs = await fetchAllRows('publications', 'id,legacy_id');
const legacyToPubId = new Map(pubs.map(p => [p.legacy_id, p.id]));
console.log(`Loaded ${legacyToPubId.size} publications`);

const links = [];
for (const r of records) {
  const productId = skuToProductId.get(r.sku);
  const pubId = legacyToPubId.get(r.legacy_id);
  if (productId && pubId) links.push({ product_id: productId, publication_id: pubId, position: 0 });
}
console.log(`Will create up to ${links.length} links (duplicates ignored)`);

const BATCH = 200;
let done = 0;
for (let i = 0; i < links.length; i += BATCH) {
  const slice = links.slice(i, i + BATCH);
  const res = await fetch(`${SUPABASE_URL}/rest/v1/product_publications`, {
    method: 'POST',
    headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, 'Content-Type': 'application/json', Prefer: 'resolution=ignore-duplicates,return=minimal' },
    body: JSON.stringify(slice),
  });
  if (!res.ok && res.status !== 409) {
    const txt = await res.text();
    console.error(`\nBatch ${i / BATCH} HTTP ${res.status}: ${txt.slice(0, 200)}`);
  }
  done += slice.length;
  if ((i / BATCH) % 5 === 0) process.stdout.write(`\rLinks pushed ${done}/${links.length}`);
}
console.log(`\nDone.`);
