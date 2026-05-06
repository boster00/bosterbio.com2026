#!/usr/bin/env node
// Migrate customer staging data from Magento customer_entity into
// Supabase customers_staging. Auth/login is intentionally NOT created here —
// downstream password-reset flow will provision real Supabase Auth accounts.
//
// Joins:
//   customer_entity (email, firstname, lastname, store_id, group_id)
//   ⨯ customer_address_entity (default billing, picked by customer.default_billing FK)
//
// Usage: node scripts/migrate-customers.mjs

import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { resolveStorefrontSupabaseFromEnv } from './storefront-supabase-env.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..');

const env = Object.fromEntries(
  readFileSync(resolve(REPO_ROOT, '.env.local'), 'utf8')
    .split(/\r?\n/).filter(l => l && !l.startsWith('#'))
    .map(l => { const i = l.indexOf('='); return [l.slice(0, i), l.slice(i + 1)]; })
);
const creds = resolveStorefrontSupabaseFromEnv(env);
if (!creds) {
  console.error('Missing storefront Supabase: set BOSTERBIO_SUPABASE_URL + BOSTERBIO_SUPABASE_KEY or NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SECRETE_KEY in .env.local');
  process.exit(1);
}
const SUPABASE_URL = creds.url;
const SERVICE_KEY = creds.key;

const SQL = `
SELECT
  c.entity_id,
  c.email,
  c.firstname,
  c.lastname,
  IFNULL(a.company, '') AS company,
  IFNULL(a.telephone, '') AS phone,
  IFNULL(a.street, '') AS street,
  IFNULL(a.city, '') AS city,
  IFNULL(a.region, '') AS region,
  IFNULL(a.postcode, '') AS postcode,
  IFNULL(a.country_id, '') AS country
FROM customer_entity c
LEFT JOIN customer_address_entity a ON a.entity_id = c.default_billing
WHERE c.email IS NOT NULL AND c.email != ''
`;

console.log('Streaming customers via SSH...');

const sshArgs = ['-p', '2223', '-o', 'BatchMode=yes', 'boster_ooP9u@69.27.32.101',
  `mysql -h 127.0.0.1 -u bosterbio_user -p'C67*b4@VDNYyJZm8' bosterbio_m2 -B -e "${SQL.replace(/\n/g, ' ').replace(/"/g, '\\"')}"`,
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
    const obj = {};
    for (let i = 0; i < header.length; i++) obj[header[i]] = cols[i] ?? '';
    records.push(obj);
  }
});

await new Promise((rs, rj) => proc.on('close', code => code === 0 ? rs() : rj(new Error('ssh exit ' + code))));
if (buffer.trim() && header) {
  const cols = buffer.split('\t');
  const obj = {};
  for (let i = 0; i < header.length; i++) obj[header[i]] = cols[i] ?? '';
  records.push(obj);
}
console.log(`Streamed ${records.length} customer records`);

function nullify(s) { return s == null || s === '' ? null : s; }

const seen = new Set();
const customerRows = records
  .filter(r => r.email && !seen.has(r.email.toLowerCase()) && (seen.add(r.email.toLowerCase()), true))
  .map(r => ({
    legacy_id: parseInt(r.entity_id, 10),
    email: r.email.toLowerCase().trim(),
    first_name: nullify(r.firstname),
    last_name: nullify(r.lastname),
    company: nullify(r.company),
    phone: nullify(r.phone),
    default_address: r.street ? {
      street: r.street.replace(/\\n/g, '\n'),
      city: r.city,
      region: r.region,
      postcode: r.postcode,
      country: r.country,
    } : null,
  }));

console.log(`Built ${customerRows.length} unique-email rows; pushing to Supabase...`);

async function upsertBatch(rows) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/customers_staging?on_conflict=email`, {
    method: 'POST',
    headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify(rows),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HTTP ${res.status}: ${txt.slice(0, 500)}`);
  }
}

const BATCH = 100;
let done = 0;
for (let i = 0; i < customerRows.length; i += BATCH) {
  const slice = customerRows.slice(i, i + BATCH);
  try { await upsertBatch(slice); done += slice.length; }
  catch (e) {
    console.error(`\nBatch ${i / BATCH}: ${e.message.slice(0, 200)}`);
    for (const row of slice) {
      try { await upsertBatch([row]); done++; }
      catch (ee) { console.error(`  ${row.email}: ${ee.message.slice(0, 100)}`); }
    }
  }
}
console.log(`\nDone. Upserted ${done} customer staging rows.`);
