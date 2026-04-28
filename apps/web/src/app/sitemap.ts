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

    // Products — paginate because PostgREST defaults to db-max-rows=1000.
    // Google sitemap files cap at 50k entries; if the catalog grows past
    // that we'll split into a sitemap index. For now just append all.
    const PAGE = 1000;
    const MAX_PAGES = 50;
    for (let offset = 0; offset < PAGE * MAX_PAGES; offset += PAGE) {
      const { data: page } = await sb
        .from("products")
        .select("handle, updated_at")
        .eq("status", "enabled")
        .order("id", { ascending: true })
        .range(offset, offset + PAGE - 1);
      if (!page || page.length === 0) break;
      for (const p of page) {
        entries.push({
          url: `${SITE_ORIGIN}/${p.handle}.html`,
          lastModified: p.updated_at ? new Date(p.updated_at) : undefined,
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
      if (page.length < PAGE) break;
    }
  } catch (e) {
    console.warn("[sitemap] error reading from supabase:", (e as Error).message);
  }
  return entries;
}
