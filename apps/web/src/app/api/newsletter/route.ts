// POST /api/newsletter — accepts an email + source, writes to newsletter_signups.
import { NextRequest, NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown> = {};
  try {
    const ct = req.headers.get("content-type") || "";
    if (ct.includes("application/json")) body = await req.json();
    else body = Object.fromEntries((await req.formData()).entries());
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  const source = String(body.source ?? "footer").trim().slice(0, 50) || "footer";

  if (!/.+@.+\..+/.test(email) || email.length > 200) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  try {
    const sb = supabaseService();
    const { error } = await sb
      .from("newsletter_signups")
      .insert({
        email,
        source,
        user_agent: req.headers.get("user-agent") || null,
        referrer: req.headers.get("referer") || null,
      });
    if (error && !error.message.includes("duplicate")) {
      console.error("[newsletter] insert failed:", error.message);
      return NextResponse.json({ error: "Could not subscribe" }, { status: 500 });
    }
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }

  const accept = req.headers.get("accept") || "";
  if (accept.includes("text/html") && !accept.includes("application/json")) {
    return NextResponse.redirect(new URL("/?subscribed=1", req.url), { status: 303 });
  }
  return NextResponse.json({ ok: true });
}
