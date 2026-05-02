// POST /api/orders — captures an order in Supabase and fires a best-effort
// Zoho Books sync. Designed for the smoke 3.x.next sandbox-checkout test:
//   - No real payment-gateway connection yet (per user spec)
//   - Order rows insert with payment_method='sandbox', payment_status='unpaid'
//   - Zoho sync runs after insert; failures don't block the order capture
//     (the orders.zoho_sync_* columns track retries — see lib/zoho-books-sync.ts)
import { NextRequest, NextResponse } from "next/server"
import { supabaseService } from "@/lib/supabase/server"
import { syncOrder } from "@/lib/zoho-books-sync"

export const dynamic = "force-dynamic"

type LineIn = {
  sku: string
  title?: string
  unit_price_cents: number
  quantity: number
  template?: string
}

type OrderIn = {
  email: string
  full_name?: string
  company?: string
  phone?: string
  ship_addr1?: string
  ship_city?: string
  ship_state?: string
  ship_postal?: string
  ship_country?: string
  notes?: string
  payment_method?: string
  items: LineIn[]
}

function newOrderNumber(): string {
  const yr = new Date().getFullYear()
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase()
  return `BB-${yr}-${rand}`
}

function clamp(s: unknown, n: number): string {
  return String(s ?? "").trim().slice(0, n)
}

export async function POST(req: NextRequest) {
  let body: OrderIn
  try {
    body = (await req.json()) as OrderIn
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  // Validate
  const email = clamp(body.email, 200).toLowerCase()
  if (!/.+@.+\..+/.test(email)) return NextResponse.json({ error: "Invalid email" }, { status: 400 })
  const items = Array.isArray(body.items) ? body.items : []
  if (items.length === 0) return NextResponse.json({ error: "At least one item required" }, { status: 400 })
  for (const it of items) {
    if (!it.sku || it.unit_price_cents == null || !Number.isInteger(it.quantity) || it.quantity < 1) {
      return NextResponse.json({ error: `Bad line item: ${JSON.stringify(it).slice(0, 100)}` }, { status: 400 })
    }
  }

  const subtotal_cents = items.reduce((s, it) => s + it.unit_price_cents * it.quantity, 0)
  const total_cents = subtotal_cents // No tax / shipping yet — wire in next phase

  const sb = supabaseService()
  const order_number = newOrderNumber()

  // Insert order
  const { data: order, error: oErr } = await sb
    .from("orders")
    .insert({
      order_number,
      status: "placed",
      email,
      full_name: clamp(body.full_name, 200) || null,
      company: clamp(body.company, 200) || null,
      phone: clamp(body.phone, 50) || null,
      ship_addr1: clamp(body.ship_addr1, 200) || null,
      ship_city: clamp(body.ship_city, 100) || null,
      ship_state: clamp(body.ship_state, 100) || null,
      ship_postal: clamp(body.ship_postal, 20) || null,
      ship_country: clamp(body.ship_country, 5) || "US",
      subtotal_cents,
      total_cents,
      currency: "USD",
      payment_method: clamp(body.payment_method, 20) || "sandbox",
      payment_status: "unpaid",
      notes: clamp(body.notes, 2000) || null,
      placed_at: new Date().toISOString(),
    })
    .select("id, order_number")
    .single()
  if (oErr || !order) {
    return NextResponse.json({ error: `Order insert failed: ${oErr?.message}` }, { status: 500 })
  }

  // Insert line items
  const itemRows = items.map((it) => ({
    order_id: order.id,
    sku: clamp(it.sku, 100),
    title: clamp(it.title, 500) || it.sku,
    template: clamp(it.template, 100) || null,
    unit_price_cents: it.unit_price_cents,
    quantity: it.quantity,
  }))
  const { error: iErr } = await sb.from("order_items").insert(itemRows)
  if (iErr) {
    // Best-effort cleanup — delete the order we just made
    await sb.from("orders").delete().eq("id", order.id)
    return NextResponse.json({ error: `Order items insert failed: ${iErr.message}` }, { status: 500 })
  }

  // Fire Zoho sync, but don't block the response on it. Errors are recorded
  // in orders.zoho_sync_last_error for the retry worker.
  void syncOrder(order.id).catch((e) => {
    console.warn("[/api/orders] zoho sync threw:", e?.message ?? e)
  })

  return NextResponse.json({
    ok: true,
    order_id: order.id,
    order_number: order.order_number,
    total_cents,
    note: "Order captured in DB. Zoho Books sync running in background (stub mode until refresh_token + org_id are provisioned).",
  })
}
