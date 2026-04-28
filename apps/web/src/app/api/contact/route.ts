// POST /api/contact — accepts a contact form submission and writes to Supabase.
import { NextRequest, NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const MAX_MSG = 5000;
const MIN_MSG = 10;

export async function POST(req: NextRequest) {
  let body: Record<string, unknown> = {};
  try {
    const ct = req.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      body = await req.json();
    } else {
      const fd = await req.formData();
      body = Object.fromEntries(fd.entries());
    }
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim().slice(0, 200);
  const email = String(body.email ?? "").trim().toLowerCase().slice(0, 200);
  const company = String(body.company ?? "").trim().slice(0, 200) || null;
  const phone = String(body.phone ?? "").trim().slice(0, 50) || null;
  const productSku = String(body.product_sku ?? body.product ?? "").trim().slice(0, 50) || null;
  const subject = String(body.subject ?? "").trim().slice(0, 200) || null;
  const message = String(body.message ?? "").trim();

  if (message.length < MIN_MSG) {
    return NextResponse.json({ error: "Message is too short" }, { status: 400 });
  }
  if (message.length > MAX_MSG) {
    return NextResponse.json({ error: "Message is too long" }, { status: 400 });
  }
  if (email && !/.+@.+\..+/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const ua = req.headers.get("user-agent") || null;
  const ref = req.headers.get("referer") || null;

  try {
    const sb = supabaseService();
    const { error } = await sb.from("contact_messages").insert({
      name: name || null,
      email: email || null,
      company,
      phone,
      product_sku: productSku,
      subject,
      message,
      user_agent: ua,
      referrer: ref,
    });
    if (error) {
      console.error("[contact] insert failed:", error.message);
      return NextResponse.json({ error: "Could not submit message" }, { status: 500 });
    }
  } catch (e) {
    console.error("[contact] error:", (e as Error).message);
    return NextResponse.json({ error: "Could not submit message" }, { status: 500 });
  }

  // Browsers expecting a redirect (form post without JS)
  const accept = req.headers.get("accept") || "";
  if (accept.includes("text/html") && !accept.includes("application/json")) {
    return NextResponse.redirect(new URL("/contact?ok=1", req.url), { status: 303 });
  }
  return NextResponse.json({ ok: true });
}
