import type { MetadataRoute } from "next";

const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://www.bosterbio.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/account", "/cart", "/checkout", "/api/"] },
    ],
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
  };
}
