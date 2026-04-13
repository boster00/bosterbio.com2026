import type { Metadata } from "next"
import { NavCmsPage } from "@/components/cms/NavCmsPage"
import { getCmsNavPage } from "@/lib/cms-nav"

export const metadata: Metadata = {
  title: "Custom Antibody Services",
  description: "BosterBio — Custom Antibody Services.",
}

export default function Page() {
  const data = getCmsNavPage("services/custom-antibody-production-services")
  return (
    <NavCmsPage
      data={data}
      fallbackTitle="Custom Antibody Services"
      fallbackDescription="BosterBio — Custom Antibody Services."
    />
  )
}
