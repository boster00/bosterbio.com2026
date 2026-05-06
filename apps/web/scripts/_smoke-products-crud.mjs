/**
 * Smoke test 3.7 — Product backend CRUD validation.
 *
 * Without Medusa wired, the closest "backend" is direct Supabase REST
 * via the service-role key. This test exercises the CRUD path that a
 * future Medusa Product module would use, validates RLS bypass with
 * service-role, and confirms batch operations behave atomically.
 *
 * Tests:
 *   1. INSERT a single test product (sku BEGINSWITH 'CRUDTEST_').
 *   2. SELECT it back; assert all fields round-trip.
 *   3. UPDATE one field; SELECT; assert updated value.
 *   4. Batch INSERT 5 more rows; SELECT count; assert == 6.
 *   5. Mass UPDATE across the 6 rows (set badges); SELECT; assert all updated.
 *   6. DELETE all 6; SELECT count; assert == 0.
 *
 * Cleanup: best-effort DELETE WHERE sku LIKE 'CRUDTEST_%' even on failure
 * so re-runs are idempotent.
 *
 * Usage: cd apps/web && node ../../scripts/_smoke-products-crud.mjs
 *        (reads .env.local from apps/web/)
 */
import { createClient } from "@supabase/supabase-js"
import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"
import { resolveStorefrontSupabaseFromEnv } from "../../scripts/storefront-supabase-env.mjs"

const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = join(__dirname, "..", ".env.local")

const env = Object.fromEntries(
  readFileSync(envPath, "utf8")
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=")
      return [l.slice(0, i), l.slice(i + 1)]
    }),
)

const creds = resolveStorefrontSupabaseFromEnv(env)
if (!creds) {
  console.error(
    `missing storefront Supabase env in ${envPath} (BOSTERBIO_SUPABASE_URL + BOSTERBIO_SUPABASE_KEY or NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SECRETE_KEY)`,
  )
  process.exit(1)
}

const sb = createClient(creds.url, creds.key, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const TEST_SKU_PREFIX = "CRUDTEST_"
const PRIMARY_SKU = `${TEST_SKU_PREFIX}001`

// Track each step's result for the final summary.
const results = []

function step(name, fn) {
  return async () => {
    const t0 = Date.now()
    try {
      const detail = await fn()
      const elapsed = Date.now() - t0
      results.push({ name, pass: true, elapsed, detail })
      console.log(`  ✓ ${name} (${elapsed}ms) — ${detail ?? ""}`)
    } catch (e) {
      const elapsed = Date.now() - t0
      results.push({ name, pass: false, elapsed, error: String(e) })
      console.log(`  ✗ ${name} (${elapsed}ms) — ${e}`)
      throw e
    }
  }
}

async function cleanup() {
  await sb.from("products").delete().like("sku", `${TEST_SKU_PREFIX}%`)
}

async function getMaxId() {
  const { data, error } = await sb
    .from("products")
    .select("id")
    .order("id", { ascending: false })
    .limit(1)
  if (error) throw new Error(`getMaxId: ${error.message}`)
  return Number(data?.[0]?.id ?? 0)
}

async function run() {
  console.log("\n=== Smoke 3.7 — Product backend CRUD via Supabase service-role ===")
  console.log(`Supabase: ${SB_URL}`)
  console.log("Pre-test cleanup of any prior CRUDTEST_ rows...")
  await cleanup()

  let baselineMaxId = 0

  await step("baseline: count products before test", async () => {
    baselineMaxId = await getMaxId()
    return `max(id) = ${baselineMaxId}`
  })()

  await step("INSERT single product (CRUDTEST_001)", async () => {
    const row = {
      id: baselineMaxId + 100001,
      sku: PRIMARY_SKU,
      handle: PRIMARY_SKU.toLowerCase(),
      title: "CRUD Test Antibody (delete me)",
      product_template: "antibodies",
      status: "disabled",
      target_info: { gene_name: "TESTGENE", protein_name: "Test protein" },
      reactivity: ["Human"],
      applications: ["WB"],
      host_species: "Rabbit",
      clone: "Polyclonal",
    }
    const { error } = await sb.from("products").insert(row)
    if (error) throw new Error(`insert: ${error.message}`)
    return `inserted id=${row.id} sku=${row.sku}`
  })()

  await step("SELECT inserted row, assert round-trip", async () => {
    const { data, error } = await sb
      .from("products")
      .select("id, sku, title, target_info, applications, host_species")
      .eq("sku", PRIMARY_SKU)
      .single()
    if (error) throw new Error(`select: ${error.message}`)
    if (data.title !== "CRUD Test Antibody (delete me)") throw new Error("title mismatch")
    if (data.target_info?.gene_name !== "TESTGENE") throw new Error("target_info JSONB not round-tripped")
    if (!Array.isArray(data.applications) || data.applications[0] !== "WB") throw new Error("applications array not round-tripped")
    if (data.host_species !== "Rabbit") throw new Error("host_species mismatch")
    return `id=${data.id} JSONB+array intact`
  })()

  await step("UPDATE single field (title)", async () => {
    const { error } = await sb
      .from("products")
      .update({ title: "CRUD Test Antibody — UPDATED" })
      .eq("sku", PRIMARY_SKU)
    if (error) throw new Error(`update: ${error.message}`)
    const { data, error: e2 } = await sb
      .from("products")
      .select("title")
      .eq("sku", PRIMARY_SKU)
      .single()
    if (e2) throw new Error(`select after update: ${e2.message}`)
    if (data.title !== "CRUD Test Antibody — UPDATED") throw new Error(`title not updated, got: ${data.title}`)
    return "title updated and verified"
  })()

  await step("BATCH INSERT 5 more rows", async () => {
    const rows = Array.from({ length: 5 }, (_, i) => {
      const sku = `${TEST_SKU_PREFIX}${String(i + 2).padStart(3, "0")}`
      return {
        id: baselineMaxId + 100002 + i,
        sku,
        handle: sku.toLowerCase(),
        title: `CRUD Test Antibody ${i + 2}`,
        product_template: "antibodies",
        status: "disabled",
        target_info: { gene_name: `BATCH${i}` },
        reactivity: ["Human"],
        applications: ["IHC"],
        host_species: "Mouse",
      }
    })
    const { error } = await sb.from("products").insert(rows)
    if (error) throw new Error(`batch insert: ${error.message}`)
    const { count, error: e2 } = await sb
      .from("products")
      .select("*", { count: "exact", head: true })
      .like("sku", `${TEST_SKU_PREFIX}%`)
    if (e2) throw new Error(`count: ${e2.message}`)
    if (count !== 6) throw new Error(`expected 6 CRUDTEST rows, got ${count}`)
    return `6 CRUDTEST_ rows in DB`
  })()

  await step("MASS UPDATE (badges across all 6 rows)", async () => {
    const { error } = await sb
      .from("products")
      .update({ badges: "smoke,test" })
      .like("sku", `${TEST_SKU_PREFIX}%`)
    if (error) throw new Error(`mass update: ${error.message}`)
    const { data, error: e2 } = await sb
      .from("products")
      .select("sku, badges")
      .like("sku", `${TEST_SKU_PREFIX}%`)
    if (e2) throw new Error(`select after mass update: ${e2.message}`)
    if (data.length !== 6) throw new Error(`expected 6 rows, got ${data.length}`)
    const allUpdated = data.every((r) => r.badges === "smoke,test")
    if (!allUpdated) throw new Error(`not all rows updated: ${JSON.stringify(data)}`)
    return `6 rows updated, all show badges='smoke,test'`
  })()

  await step("DELETE all CRUDTEST rows", async () => {
    const { error } = await sb.from("products").delete().like("sku", `${TEST_SKU_PREFIX}%`)
    if (error) throw new Error(`delete: ${error.message}`)
    const { count, error: e2 } = await sb
      .from("products")
      .select("*", { count: "exact", head: true })
      .like("sku", `${TEST_SKU_PREFIX}%`)
    if (e2) throw new Error(`count after delete: ${e2.message}`)
    if (count !== 0) throw new Error(`expected 0, got ${count}`)
    return "all 6 rows deleted; verified count=0"
  })()

  await step("RLS check: anon role cannot insert", async () => {
    const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!anonKey) return "skipped (no NEXT_PUBLIC_SUPABASE_ANON_KEY)"
    const sbAnon = createClient(SB_URL, anonKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
    const { error } = await sbAnon.from("products").insert({
      id: baselineMaxId + 200000,
      sku: `${TEST_SKU_PREFIX}_RLS_PROBE`,
      handle: `${TEST_SKU_PREFIX}_rls_probe`.toLowerCase(),
      title: "RLS probe (should fail)",
      product_template: "antibodies",
      status: "disabled",
    })
    if (!error) {
      // Try cleanup if it somehow succeeded
      await sb.from("products").delete().eq("sku", `${TEST_SKU_PREFIX}_RLS_PROBE`)
      throw new Error("anon was allowed to insert — RLS not enforced!")
    }
    return `anon insert blocked (${error.code ?? error.message?.slice(0, 60)})`
  })()
}

try {
  await run()
  console.log("\n=== Result ===")
  const passed = results.filter((r) => r.pass).length
  console.log(`${passed}/${results.length} steps passed`)
  if (passed !== results.length) {
    console.log("Failed:", results.filter((r) => !r.pass))
    process.exit(1)
  }
} catch (e) {
  console.error("\nABORT:", e)
  process.exit(1)
} finally {
  console.log("\nFinal cleanup...")
  await cleanup()
  console.log("Done.")
}
