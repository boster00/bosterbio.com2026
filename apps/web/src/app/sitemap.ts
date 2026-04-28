// XML sitemap generated from Supabase cms_pages + (future) products tables.
// Next.js 15 App Router convention: default export of a function returning entries.
import type { MetadataRoute } from "next";
import { supabaseService } from "@/lib/supabase/server";

const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://www.bosterbio.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    { url: `${SITE_ORIGIN}/`, changeFrequency: "weekly", priority: 1.0 },
  ];
  try {
    const sb = supabaseService();

    // CMS pages
    const { data: cms } = await sb
      .from("cms_pages")
      .select("identifier, legacy_updated_at")
      .eq("is_active", true)
      .limit(2000);
    for (const r of cms ?? []) {
      entries.push({
        url: `${SITE_ORIGIN}/${r.identifier}`,
        lastModified: r.legacy_updated_at ? new Date(r.legacy_updated_at) : undefined,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }

    // Products (paginated; cap at 50k for now — Google sitemap-per-file limit)
    const { data: products } = await sb
      .from("products")
      .select("handle, updated_at")
      .eq("status", "enabled")
      .limit(50000);
    for (const p of products ?? []) {
      entries.push({
        url: `${SITE_ORIGIN}/${p.handle}.html`,
        lastModified: p.updated_at ? new Date(p.updated_at) : undefined,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  } catch (e) {
    console.warn("[sitemap] error reading from supabase:", (e as Error).message);
  }
  return entries;
}
