// Render the captured order rows + zoho sync state as a styled HTML "DB
// evidence" page and screenshot it. Used as item-3 deliverable proof.
import { chromium } from "playwright"
import { createClient } from "@supabase/supabase-js"
import { readFileSync, mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { resolveStorefrontSupabaseFromEnv } from "../../scripts/storefront-supabase-env.mjs"

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8").split(/\r?\n/)
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => { const i = l.indexOf("="); return [l.slice(0, i), l.slice(i + 1)]; }),
)

const creds = resolveStorefrontSupabaseFromEnv(env)
if (!creds) {
  console.error("Missing BOSTERBIO_* or NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SECRETE_KEY in .env.local")
  process.exit(1)
}

const sb = createClient(creds.url, creds.key,
  { auth: { autoRefreshToken: false, persistSession: false } })

const OUT = ".audit-screenshots/q3next"
mkdirSync(OUT, { recursive: true })

const { data: orders } = await sb.from("orders")
  .select("id, order_number, status, email, full_name, company, ship_addr1, ship_city, ship_state, ship_postal, ship_country, subtotal_cents, total_cents, currency, payment_method, payment_status, zoho_synced_at, zoho_sync_attempts, zoho_sync_last_error, placed_at, created_at, order_items(sku, title, template, unit_price_cents, quantity)")
  .order("created_at", { ascending: false })
  .limit(3)

function fmt(cents) { return cents == null ? "—" : `$${(cents / 100).toFixed(2)}` }

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Smoke 3.x.next — DB evidence</title>
<style>
  body { font-family: -apple-system, "Segoe UI", system-ui, sans-serif; background: #f4f8fc; margin: 0; padding: 32px; color: #1e293b; }
  h1 { color: #004C95; font-weight: 700; margin: 0 0 4px; font-size: 28px; }
  .sub { color: #64748b; font-size: 14px; margin-bottom: 24px; }
  .card { background: white; border: 1px solid #e2eaf3; border-radius: 14px; padding: 20px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,76,149,0.06); }
  .ord-num { font-family: ui-monospace, "SF Mono", monospace; color: #EA8D28; font-size: 16px; font-weight: 700; }
  .row { display: flex; gap: 24px; flex-wrap: wrap; margin-top: 12px; }
  .col { flex: 1 1 200px; }
  .lbl { font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: #475569; font-weight: 600; }
  .val { font-size: 14px; color: #1e293b; margin-top: 2px; }
  .mono { font-family: ui-monospace, "SF Mono", monospace; font-size: 12px; color: #475569; }
  table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px; }
  th { text-align: left; background: #e8eef6; color: #003366; padding: 8px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; }
  td { padding: 8px; border-bottom: 1px solid #e2eaf3; }
  .badge { display: inline-block; padding: 3px 10px; border-radius: 999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; }
  .badge.placed { background: #dcfce7; color: #166534; }
  .badge.unpaid { background: #fef3c7; color: #92400e; }
  .badge.sandbox { background: #dbeafe; color: #1e40af; }
  .badge.stub { background: #fef3c7; color: #92400e; }
  .err { background: #fef2f2; color: #991b1b; padding: 10px; border-radius: 8px; font-size: 12px; margin-top: 8px; font-family: ui-monospace, "SF Mono", monospace; }
</style></head><body>
<h1>Smoke 3.x.next — Item 3 evidence: orders captured + Zoho fail-safe sync state</h1>
<p class="sub">Schema: <span class="mono">apps/web/sql/006_orders.sql</span> · API: <span class="mono">POST /api/orders</span> · Sync: <span class="mono">apps/web/src/lib/zoho-books-sync.ts</span> · Source: live Supabase production DB</p>

${orders?.map((o) => `
  <div class="card">
    <div style="display:flex; justify-content:space-between; align-items:flex-start;">
      <div>
        <div class="ord-num">${o.order_number}</div>
        <div class="mono" style="margin-top:4px;">id = ${o.id}</div>
      </div>
      <div style="text-align:right;">
        <span class="badge placed">${o.status}</span>
        <span class="badge unpaid" style="margin-left:6px;">${o.payment_status}</span>
        <span class="badge sandbox" style="margin-left:6px;">${o.payment_method}</span>
        <div class="mono" style="margin-top:6px;">${new Date(o.created_at).toISOString()}</div>
      </div>
    </div>

    <div class="row">
      <div class="col"><div class="lbl">Customer</div><div class="val">${o.full_name ?? "—"} · ${o.email}</div><div class="mono">${o.company ?? ""}</div></div>
      <div class="col"><div class="lbl">Ship to</div><div class="val">${o.ship_addr1 ?? ""}</div><div class="mono">${o.ship_city ?? ""}, ${o.ship_state ?? ""} ${o.ship_postal ?? ""} · ${o.ship_country ?? ""}</div></div>
      <div class="col"><div class="lbl">Totals</div><div class="val">Subtotal ${fmt(o.subtotal_cents)} · Total ${fmt(o.total_cents)} ${o.currency}</div></div>
    </div>

    <table>
      <tr><th>SKU</th><th>Title</th><th>Template</th><th style="text-align:right;">Unit</th><th style="text-align:right;">Qty</th><th style="text-align:right;">Subtotal</th></tr>
      ${(o.order_items ?? []).map((it) => `
        <tr>
          <td class="mono" style="color:#004C95;font-weight:600;">${it.sku}</td>
          <td>${it.title}</td>
          <td class="mono">${it.template ?? ""}</td>
          <td class="mono" style="text-align:right;">${fmt(it.unit_price_cents)}</td>
          <td class="mono" style="text-align:right;">${it.quantity}</td>
          <td class="mono" style="text-align:right;">${fmt(it.unit_price_cents * it.quantity)}</td>
        </tr>
      `).join("")}
    </table>

    <div style="margin-top:14px; padding-top:14px; border-top:1px dashed #e2eaf3;">
      <div class="lbl">Zoho Books fail-safe sync state</div>
      <div class="row" style="margin-top:6px;">
        <div class="col"><span class="mono">zoho_synced_at:</span> <span class="badge ${o.zoho_synced_at ? "placed" : "stub"}">${o.zoho_synced_at ?? "NULL (not yet synced)"}</span></div>
        <div class="col"><span class="mono">zoho_sync_attempts:</span> ${o.zoho_sync_attempts ?? 0}</div>
      </div>
      ${o.zoho_sync_last_error ? `<div class="err">last error: ${o.zoho_sync_last_error}</div>` : ""}
    </div>
  </div>
`).join("")}

<div class="card" style="background:#fff7ed;border-color:#fed7aa;">
  <h2 style="color:#EA8D28; margin:0 0 8px; font-size:16px;">Stub mode — what's blocking real Zoho sync</h2>
  <p style="font-size:14px; margin:0 0 8px;">Order capture works end-to-end. Zoho Books sync currently runs in stub mode — failure is logged, retry queue is set, no actual API call made — because the OAuth credentials are incomplete:</p>
  <ul style="font-size:13px; margin:8px 0 0; padding-left:20px;">
    <li>✓ <span class="mono">ZOHO_BOOKS_CLIENT_ID</span> — present in profile env_vars</li>
    <li>✓ <span class="mono">ZOHO_BOOKS_CLIENT_SECRET</span> — present in profile env_vars</li>
    <li>✗ <span class="mono">ZOHO_BOOKS_REFRESH_TOKEN</span> — NOT YET PROVISIONED (one-time interactive OAuth flow needed)</li>
    <li>✗ <span class="mono">ZOHO_BOOKS_ORG_ID</span> — NOT YET PROVISIONED (small piece of info from Zoho Books dashboard)</li>
  </ul>
  <p style="font-size:13px; margin:10px 0 0;">When refresh_token + org_id arrive, this module flips from stub → live; the cron retry sweep (<span class="mono">retryPendingZohoSyncs()</span>) backfills any pending orders.</p>
</div>

</body></html>`

const tmpFile = join(OUT, "_db_evidence.html")
writeFileSync(tmpFile, html)

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const page = await ctx.newPage()
await page.goto(`file://${process.cwd().replace(/\\/g, "/")}/${tmpFile}`)
await page.waitForTimeout(500)
await page.screenshot({ path: join(OUT, "chk_05_db_evidence.png"), fullPage: true })
await browser.close()
console.log("Wrote chk_05_db_evidence.png (orders + zoho sync state)")
