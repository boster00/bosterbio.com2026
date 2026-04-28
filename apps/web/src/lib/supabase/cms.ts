// CMS page fetcher backed by Supabase cms_pages table.
// Used by the dynamic catch-all route at app/(site)/[...slug]/page.tsx.
import "server-only";
import { supabaseService } from "./server";

export type CmsPageRow = {
  id: number;
  legacy_page_id: number | null;
  identifier: string;
  title: string;
  content_heading: string | null;
  content: string | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  is_active: boolean;
  legacy_updated_at: string | null;
  legacy_created_at: string | null;
};

export async function getCmsPageBySlug(slug: string): Promise<CmsPageRow | null> {
  const sb = supabaseService();
  const { data, error } = await sb
    .from("cms_pages")
    .select("*")
    .eq("identifier", slug)
    .eq("is_active", true)
    .maybeSingle();
  if (error) {
    console.error("[cms] getCmsPageBySlug error:", error.message, "slug=", slug);
    return null;
  }
  return data as CmsPageRow | null;
}

export async function listAllCmsIdentifiers(): Promise<string[]> {
  const sb = supabaseService();
  const { data, error } = await sb
    .from("cms_pages")
    .select("identifier")
    .eq("is_active", true)
    .limit(2000);
  if (error) {
    console.error("[cms] listAllCmsIdentifiers error:", error.message);
    return [];
  }
  return (data ?? []).map((r) => r.identifier);
}

export type CmsIndexEntry = {
  identifier: string;
  title: string;
  legacy_updated_at: string | null;
};

/**
 * Returns CMS pages whose identifier starts with the given prefix.
 * Used by the catch-all to render a parent-listing page when no exact
 * identifier match is found (e.g. /diseases lists 54 child pages).
 */
export async function listCmsPagesUnderPrefix(prefix: string, limit = 200): Promise<CmsIndexEntry[]> {
  if (!prefix) return [];
  const sb = supabaseService();
  const { data, error } = await sb
    .from("cms_pages")
    .select("identifier, title, legacy_updated_at")
    .like("identifier", `${prefix}/%`)
    .eq("is_active", true)
    .order("title", { ascending: true })
    .limit(limit);
  if (error) {
    console.error("[cms] listCmsPagesUnderPrefix error:", error.message);
    return [];
  }
  return (data ?? []) as CmsIndexEntry[];
}
