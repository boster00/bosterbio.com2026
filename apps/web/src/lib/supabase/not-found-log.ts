// Server-side 404 logger — writes to Supabase not_found_log with hit_count upsert.
// Called from the catch-all CMS route before notFound().
import "server-only";
import { supabaseService } from "./server";

const SAMPLE_RATE = 1.0; // log every 404 for now; throttle later if volume is high

export async function logNotFound(path: string, opts: { referrer?: string; userAgent?: string } = {}) {
  if (Math.random() > SAMPLE_RATE) return;
  if (!path || path.length > 2000) return;
  try {
    const sb = supabaseService();
    // Try increment first
    const { data: existing } = await sb
      .from("not_found_log")
      .select("id, hit_count")
      .eq("path", path)
      .maybeSingle();
    if (existing) {
      await sb
        .from("not_found_log")
        .update({ hit_count: existing.hit_count + 1, last_seen: new Date().toISOString() })
        .eq("id", existing.id);
    } else {
      await sb.from("not_found_log").insert({
        path,
        referrer: opts.referrer ?? null,
        user_agent: opts.userAgent ?? null,
        hit_count: 1,
      });
    }
  } catch (e) {
    // Never let logging break the request
    console.warn("[404] log failed:", (e as Error).message);
  }
}
