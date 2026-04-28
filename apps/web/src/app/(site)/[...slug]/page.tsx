// Dynamic catch-all CMS route — renders any URL whose identifier matches a row
// in Supabase cms_pages. Static routes (e.g. /about-us, /products) take precedence.
// When no exact match is found but child pages exist under the slug as a prefix
// (e.g. /diseases when 54 pages exist under "diseases/*"), renders a child index.
import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { NavCmsPage } from "@/components/cms/NavCmsPage";
import { CmsIndexSection } from "@/components/cms/CmsIndexSection";
import { getCmsPageBySlug, listCmsPagesUnderPrefix } from "@/lib/supabase/cms";
import { logNotFound } from "@/lib/supabase/not-found-log";
import type { CmsNavPayload } from "@/lib/cms-nav";

type Params = { slug: string[] };

// Re-fetch on every request for now; flip to ISR once cache invalidation is wired.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const identifier = slug.join("/");
  const page = await getCmsPageBySlug(identifier);
  if (page) {
    const cleanTitle = page.meta_title || page.title.replace(/\s*\|\s*BosterBio.*$/i, "").trim();
    return {
      title: page.meta_title || `${cleanTitle} | Boster Bio`,
      description: page.meta_description ?? undefined,
      keywords: page.meta_keywords ?? undefined,
    };
  }
  // Index page metadata
  const children = await listCmsPagesUnderPrefix(identifier, 1);
  if (children.length) {
    return {
      title: `${identifier.replace(/-/g, " ")} | Boster Bio`,
      description: `Browse pages under /${identifier} on Boster Bio.`,
    };
  }
  return { title: "Page not found | Boster Bio" };
}

export default async function CmsCatchAllPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const identifier = slug.join("/");

  // 1. Try exact CMS page match
  const page = await getCmsPageBySlug(identifier);
  if (page) {
    const payload: CmsNavPayload = {
      page_id: String(page.legacy_page_id ?? page.id),
      title: page.title,
      identifier: page.identifier,
      content_heading: page.content_heading ?? "",
      update_time: page.legacy_updated_at ?? "",
      content: page.content ?? "",
    };
    return <NavCmsPage data={payload} fallbackTitle={page.title} />;
  }

  // 2. Try as a parent prefix — list child pages
  const children = await listCmsPagesUnderPrefix(identifier, 200);
  if (children.length > 0) {
    return <CmsIndexSection prefix={identifier} entries={children} />;
  }

  // 3. Genuine 404 — log and return notFound
  const h = await headers();
  await logNotFound(`/${identifier}`, {
    referrer: h.get("referer") ?? undefined,
    userAgent: h.get("user-agent") ?? undefined,
  });
  notFound();
}
