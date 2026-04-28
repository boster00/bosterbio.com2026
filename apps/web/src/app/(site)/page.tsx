import { CategoryGridSection } from "@/components/home/CategoryGridSection"
import { CtaSection } from "@/components/home/CtaSection"
import { FeaturedProductsSection } from "@/components/home/FeaturedProductsSection"
import { HeroSection } from "@/components/home/HeroSection"
import { PromoStripSection } from "@/components/home/PromoStripSection"
import { ResourcesSection } from "@/components/home/ResourcesSection"
import { TrustSection } from "@/components/home/TrustSection"

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Boster Bio",
  alternateName: "BosterBio",
  url: "https://www.bosterbio.com",
  logo: "https://www.bosterbio.com/media/logo/stores/1/Boster-Logo-Horizontal.png",
  description:
    "High-quality antibodies, ELISA kits, and research reagents for life science research.",
  sameAs: [
    "https://www.linkedin.com/company/boster-biological-technology",
    "https://twitter.com/BosterBio",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-925-677-2200",
    contactType: "customer support",
    areaServed: "Worldwide",
    availableLanguage: ["English"],
  },
}

// ISR: homepage re-renders every 10 minutes (Featured Products refresh from Supabase)
export const revalidate = 600

type Props = { searchParams: Promise<{ subscribed?: string }> }

export default async function HomePage({ searchParams }: Props) {
  const sp = await searchParams
  const subscribed = sp.subscribed === "1"
  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      {subscribed ? (
        <div className="border-b border-green-200 bg-green-50 py-3">
          <div className="container-content flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-green-800">
              Thanks for subscribing — you&rsquo;ll get product updates monthly.
            </p>
          </div>
        </div>
      ) : null}
      <HeroSection />
      <PromoStripSection />
      <CategoryGridSection />
      <FeaturedProductsSection />
      <TrustSection />
      <ResourcesSection />
      <CtaSection />
    </main>
  )
}
