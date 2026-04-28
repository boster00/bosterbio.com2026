import { CategoryGridSection } from "@/components/home/CategoryGridSection"
import { CtaSection } from "@/components/home/CtaSection"
import { FeaturedProductsSection } from "@/components/home/FeaturedProductsSection"
import { HeroSection } from "@/components/home/HeroSection"
import { PromoStripSection } from "@/components/home/PromoStripSection"
import { ResourcesSection } from "@/components/home/ResourcesSection"
import { TrustSection } from "@/components/home/TrustSection"

export default async function HomePage() {
  return (
    <main id="main-content">
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
