import type { Metadata } from "next"
import { NavCmsPage } from "@/components/cms/NavCmsPage"
import { getCmsNavPage } from "@/lib/cms-nav"

export const metadata: Metadata = {
  title: "Multiplex Assay Services",
  description: "BosterBio — Multiplex Assay Services.",
}

export default function Page() {
  const data = getCmsNavPage("services/multiplex-assay-services")
  return (
    <NavCmsPage
      data={data}
      fallbackTitle="Multiplex Assay Services"
      fallbackDescription="BosterBio — Multiplex Assay Services."
    />
  )
}
