// Bulk-migrate all active CMS pages from live Magento → apps/web/src/data/cms-nav-pages/
// As-is migration per smoke 3.4 / GFOH Q5 answer (2026-05-01):
//   "Migration must be 'as-is.' Migrate what exists. NO new content,
//    layout, features, design decisions, or restructuring."
//
// Source: live Magento bosterbio_m2 DB on 69.27.32.101:2223 via SSH+mysql
// Target: apps/web/src/data/cms-nav-pages/<identifier-with-slashes-replaced-by-__>.json
//
// File schema matches src/lib/cms-nav.ts CmsNavPayload:
//   { page_id, title, identifier, content_heading, update_time, content }
//
// Idempotent: re-running overwrites existing JSON files with the latest snapshot.
// Includes a manifest (src/data/cms-nav-pages/_manifest.json) listing all migrated identifiers.
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";

const OUT_DIR = "apps/web/src/data/cms-nav-pages";
mkdirSync(OUT_DIR, { recursive: true });

// We pull as JSON-encoded TSV: each row is identifier\ttitle\tcontent_heading\tupdate_time\tcontent
// Content is the big payload — base64 it on the server side so newlines/tabs don't corrupt the row split.
const SQL = `
SELECT
  page_id,
  identifier,
  COALESCE(title, '') AS title,
  COALESCE(content_heading, '') AS content_heading,
  COALESCE(update_time, '') AS update_time,
  TO_BASE64(REPLACE(REPLACE(IFNULL(content, ''), '\\n', '\\\\n'), '\\r', '')) AS content_b64
FROM cms_page
WHERE is_active = 1
ORDER BY identifier
`;

const sshArgs = [
  "-p", "2223",
  "-o", "BatchMode=yes",
  "boster_ooP9u@69.27.32.101",
  `mysql -h 127.0.0.1 -u bosterbio_user -p"C67*b4@VDNYyJZm8" bosterbio_m2 -B -e "${SQL.replace(/"/g, '\\"').replace(/\n/g, " ")}"`,
];

console.log("Pulling all active cms_page rows from live Magento via SSH...");
const ssh = spawn("ssh", sshArgs);
let out = "";
let err = "";
ssh.stdout.on("data", (d) => { out += d.toString(); });
ssh.stderr.on("data", (d) => { err += d.toString(); });

await new Promise((resolve, reject) => {
  ssh.on("close", (code) => {
    if (code !== 0) reject(new Error(`ssh exited ${code}: ${err}`));
    else resolve();
  });
});

// Parse TSV — first line is header
const lines = out.split(/\r?\n/).filter((l) => l.trim());
const header = lines.shift().split("\t");
console.log(`Pulled ${lines.length} CMS pages. Header: ${header.join(", ")}`);

let written = 0, skipped = 0;
const manifest = [];
for (const line of lines) {
  const cols = line.split("\t");
  if (cols.length !== header.length) {
    skipped++;
    continue;
  }
  const row = Object.fromEntries(header.map((h, i) => [h, cols[i]]));
  // Decode base64 content, restore real newlines
  const content = Buffer.from(row.content_b64, "base64").toString("utf8")
    .replace(/\\n/g, "\n");
  const identifier = String(row.identifier || "").trim();
  if (!identifier) { skipped++; continue; }
  // Slash → __ for filesystem-safe filename (matches existing convention)
  const filename = identifier.replace(/\//g, "__") + ".json";
  const payload = {
    page_id: String(row.page_id),
    title: String(row.title || ""),
    identifier,
    content_heading: String(row.content_heading || ""),
    update_time: String(row.update_time || ""),
    content,
  };
  writeFileSync(`${OUT_DIR}/${filename}`, JSON.stringify(payload, null, 2));
  manifest.push({ identifier, filename, page_id: payload.page_id, title: payload.title });
  written++;
}

writeFileSync(`${OUT_DIR}/_manifest.json`, JSON.stringify(
  { generated_at: new Date().toISOString(), source: "live Magento bosterbio_m2.cms_page WHERE is_active=1", count: manifest.length, pages: manifest },
  null, 2,
));

console.log(`\nWrote ${written} CMS page JSON files. Skipped ${skipped} malformed rows.`);
console.log(`Manifest: ${OUT_DIR}/_manifest.json`);
