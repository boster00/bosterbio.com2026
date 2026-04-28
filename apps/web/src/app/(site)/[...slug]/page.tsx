// Dynamic catch-all CMS route — renders any URL whose identifier matches a row
// in Supabase cms_pages. Static routes (e.g. /about-us, /products) take precedence.
import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { NavCmsPage } from "@/components/cms/NavCmsPage";
import { getCmsPageBySlug } from "@/lib/supabase/cms";
import { logNotFound } from "@/lib/supabase/not-found-log";
import type { CmsNavPayload } from "@/lib/cms-nav";

type Params = { slug: string[] };

// Re-fetch on every request for now; flip to ISR once cache invalidation is wired.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const identifier = slug.join("/");
  const page = await getCmsPageBySlug(identifier);
  if (!page) return { title: "Page not found | Boster Bio" };
  const cleanTitle = page.meta_title || page.title.replace(/\s*\|\s*BosterBio.*$/i, "").trim();
  return {
    title: page.meta_title || `${cleanTitle} | Boster Bio`,
    description: page.meta_description ?? undefined,
    keywords: page.meta_keywords ?? undefined,
  };
}

export default async function CmsCatchAllPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const identifier = slug.join("/");
  const page = await getCmsPageBySlug(identifier);
  if (!page) {
    const h = await headers();
    await logNotFound(`/${identifier}`, {
      referrer: h.get("referer") ?? undefined,
      userAgent: h.get("user-agent") ?? undefined,
    });
    notFound();
  }

  // Adapt CmsPageRow → CmsNavPayload shape expected by NavCmsPage
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
