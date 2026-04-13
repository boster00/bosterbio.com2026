import type { Metadata } from "next"
import { NavCmsPage } from "@/components/cms/NavCmsPage"
import { getCmsNavPage } from "@/lib/cms-nav"

export const metadata: Metadata = {
  title: "Assay Services",
  description: "BosterBio — Assay Services.",
}

export default function Page() {
  const data = getCmsNavPage("services/assay-services")
  return (
    <NavCmsPage
      data={data}
      fallbackTitle="Assay Services"
      fallbackDescription="BosterBio — Assay Services."
    />
  )
}
