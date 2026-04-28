// Server-side 404 logger — writes to Supabase not_found_log with hit_count upsert.
// Called from the catch-all CMS route before notFound().
import "server-only";
import { supabaseService } from "./server";

const SAMPLE_RATE = 1.0; // log every 404 for now; throttle later if volume is high

// Common asset/system paths we don't care about logging.
const SKIP_PATTERNS = [
  /\.(ico|png|jpg|jpeg|gif|svg|webp|avif|css|js|map|txt|xml|json|woff2?|ttf|eot)$/i,
  /^\/(_next|api|favicon|robots|sitemap|manifest|sw|service-worker)/i,
];

export async function logNotFound(path: string, opts: { referrer?: string; userAgent?: string } = {}) {
  if (Math.random() > SAMPLE_RATE) return;
  if (!path || path.length > 2000) return;
  if (SKIP_PATTERNS.some((re) => re.test(path))) return;
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
