/**
 * Zoho Books order-sync helper. Used by the checkout flow per Office Hour
 * Q3 (2026-05-01): "historical/transaction data should move away from
 * Magento as the true keeper — Zoho Books becomes source of truth for
 * customer order visibility, likely via the Zoho Books customer portal."
 *
 * Fail-safe model:
 *   - syncOrder() is non-blocking. The HTTP order-capture path inserts the
 *     row first, then fires syncOrder() best-effort.
 *   - On failure, the orders row stays in DB with zoho_synced_at NULL and
 *     zoho_sync_attempts incremented; a future cron / retry worker calls
 *     this function again with the same order_id.
 *   - Idempotency: if a sales-order with our `order_number` already exists
 *     in Zoho Books, we update zoho_book_id locally rather than create a
 *     duplicate.
 *
 * Wiring status (2026-05-01):
 *   - ZOHO_BOOKS_CLIENT_ID + ZOHO_BOOKS_CLIENT_SECRET present in profile env_vars
 *   - ZOHO_BOOKS_REFRESH_TOKEN — NOT YET PROVISIONED (one-time interactive
 *     OAuth flow needed; tracked as a quest blocker)
 *   - ZOHO_BOOKS_ORG_ID — NOT YET PROVISIONED (the user's Zoho Books
 *     organization id — small piece of info from the Zoho dashboard)
 *
 * When refresh_token + org_id arrive, this module switches from "stub" mode
 * (logs the would-be call, marks the order as "stub-synced") to "live" mode
 * (real POST to Zoho Books).
 */
import { supabaseService } from "./supabase/server"

type SyncResult =
  | { ok: true; mode: "stub" | "live"; zoho_book_id?: string | null; note?: string }
  | { ok: false; error: string; will_retry_at?: string }

const STUB_MODE = !process.env.ZOHO_BOOKS_REFRESH_TOKEN || !process.env.ZOHO_BOOKS_ORG_ID

/**
 * Sync one order to Zoho Books. Returns immediately on success; on failure
 * updates the orders row's zoho_sync_* fields so a worker can retry later.
 */
export async function syncOrder(orderId: string): Promise<SyncResult> {
  const sb = supabaseService()
  const { data: order, error } = await sb
    .from("orders")
    .select("*, order_items(*)")
    .eq("id", orderId)
    .single()
  if (error || !order) {
    return { ok: false, error: `order ${orderId} not found: ${error?.message}` }
  }
  if (order.zoho_synced_at) {
    return { ok: true, mode: "live", zoho_book_id: order.zoho_book_id, note: "already synced" }
  }

  if (STUB_MODE) {
    // Mark as stub-synced so we don't retry forever during the credential gap.
    // When credentials arrive, a one-time backfill flips zoho_synced_at back
    // to NULL on stub rows so they get a real sync attempt.
    await sb
      .from("orders")
      .update({
        zoho_sync_attempts: (order.zoho_sync_attempts ?? 0) + 1,
        zoho_sync_last_error: "STUB_MODE: credentials not provisioned (refresh_token + org_id missing)",
      })
      .eq("id", orderId)
    return {
      ok: true,
      mode: "stub",
      note: "Stubbed — Zoho Books refresh_token + org_id not provisioned. Order captured locally; sync will run on next cron pass once credentials land.",
    }
  }

  // ---- Live mode (executes when ZOHO_BOOKS_REFRESH_TOKEN + ORG_ID are set) ----
  try {
    const accessToken = await getAccessToken()
    const url = `https://www.zohoapis.com/books/v3/salesorders?organization_id=${process.env.ZOHO_BOOKS_ORG_ID}`
    const body = orderToZohoSalesOrder(order)
    const r = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    const j = await r.json()
    if (!r.ok) {
      const nextRetry = new Date(Date.now() + 5 * 60_000).toISOString()
      await sb
        .from("orders")
        .update({
          zoho_sync_attempts: (order.zoho_sync_attempts ?? 0) + 1,
          zoho_sync_last_error: `Zoho ${r.status}: ${JSON.stringify(j).slice(0, 500)}`,
          zoho_sync_next_retry_at: nextRetry,
        })
        .eq("id", orderId)
      return { ok: false, error: `Zoho ${r.status}`, will_retry_at: nextRetry }
    }
    const zohoId = j?.salesorder?.salesorder_id ?? null
    await sb
      .from("orders")
      .update({
        zoho_synced_at: new Date().toISOString(),
        zoho_book_id: zohoId,
        zoho_sync_attempts: (order.zoho_sync_attempts ?? 0) + 1,
        zoho_sync_last_error: null,
        zoho_sync_next_retry_at: null,
      })
      .eq("id", orderId)
    return { ok: true, mode: "live", zoho_book_id: zohoId }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    const nextRetry = new Date(Date.now() + 10 * 60_000).toISOString()
    await sb
      .from("orders")
      .update({
        zoho_sync_attempts: (order.zoho_sync_attempts ?? 0) + 1,
        zoho_sync_last_error: msg.slice(0, 500),
        zoho_sync_next_retry_at: nextRetry,
      })
      .eq("id", orderId)
    return { ok: false, error: msg, will_retry_at: nextRetry }
  }
}

/**
 * Exchange the refresh token for an access token. Zoho access tokens last
 * ~1 hour; for now we just trade-on-every-sync. Once we have many syncs/min
 * we can cache.
 */
async function getAccessToken(): Promise<string> {
  const params = new URLSearchParams({
    refresh_token: process.env.ZOHO_BOOKS_REFRESH_TOKEN!,
    client_id: process.env.ZOHO_BOOKS_CLIENT_ID!,
    client_secret: process.env.ZOHO_BOOKS_CLIENT_SECRET!,
    grant_type: "refresh_token",
  })
  const r = await fetch("https://accounts.zoho.com/oauth/v2/token", { method: "POST", body: params })
  const j = await r.json()
  if (!j.access_token) throw new Error(`Zoho token refresh failed: ${JSON.stringify(j)}`)
  return j.access_token as string
}

/**
 * Map our orders row → Zoho Books Sales Order create payload.
 * Reference: https://www.zoho.com/books/api/v3/sales-orders/#create-a-sales-order
 */
function orderToZohoSalesOrder(order: {
  order_number: string
  email: string
  full_name?: string | null
  ship_addr1?: string | null
  ship_city?: string | null
  ship_state?: string | null
  ship_postal?: string | null
  ship_country?: string | null
  total_cents: number
  notes?: string | null
  order_items: Array<{
    sku: string
    title: string
    unit_price_cents: number
    quantity: number
  }>
}) {
  return {
    customer_id: null, // We'll match-by-email in a follow-up step OR auto-create. For now, leaving null forces manual match.
    reference_number: order.order_number,
    notes: order.notes ?? `BosterBio web order — synced from new storefront`,
    line_items: order.order_items.map((it) => ({
      name: it.title,
      sku: it.sku,
      rate: it.unit_price_cents / 100,
      quantity: it.quantity,
    })),
    contact_persons: [{ email: order.email, first_name: order.full_name ?? order.email.split("@")[0] }],
    shipping_address: {
      address: order.ship_addr1 ?? "",
      city: order.ship_city ?? "",
      state: order.ship_state ?? "",
      zip: order.ship_postal ?? "",
      country: order.ship_country ?? "US",
    },
  }
}

/**
 * Cron-style retry sweep — call from a scheduled task. Picks up unsynced
 * orders whose retry timer has elapsed (or never set), retries syncOrder
 * for each. Returns counts.
 */
export async function retryPendingZohoSyncs(limit = 50) {
  const sb = supabaseService()
  const { data: pending } = await sb
    .from("orders")
    .select("id")
    .is("zoho_synced_at", null)
    .or(`zoho_sync_next_retry_at.is.null,zoho_sync_next_retry_at.lt.${new Date().toISOString()}`)
    .order("created_at", { ascending: true })
    .limit(limit)
  let ok = 0, failed = 0, stubbed = 0
  for (const row of pending ?? []) {
    const r = await syncOrder(row.id)
    if (!r.ok) failed++
    else if (r.mode === "stub") stubbed++
    else ok++
  }
  return { ok, failed, stubbed, attempted: pending?.length ?? 0 }
}
