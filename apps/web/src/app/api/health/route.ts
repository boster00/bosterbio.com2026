// GET /api/health — lightweight liveness check.
// Returns 200 + JSON if Supabase is reachable, 503 otherwise.
import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase/server";
import { supabaseCatalogConfigured } from "@/lib/supabase/catalog-env";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!supabaseCatalogConfigured()) {
    return NextResponse.json(
      { ok: false, reason: "Supabase not configured" },
      { status: 503 },
    );
  }
  const t0 = Date.now();
  try {
    const sb = supabaseService();
    const { error } = await sb
      .from("products")
      .select("*", { count: "exact", head: true })
      .limit(1);
    const elapsed = Date.now() - t0;
    if (error) {
      return NextResponse.json(
        { ok: false, reason: error.message, elapsed_ms: elapsed },
        { status: 503 },
      );
    }
    return NextResponse.json({ ok: true, supabase_rtt_ms: elapsed });
  } catch (e) {
    return NextResponse.json(
      { ok: false, reason: (e as Error).message, elapsed_ms: Date.now() - t0 },
      { status: 503 },
    );
  }
}
