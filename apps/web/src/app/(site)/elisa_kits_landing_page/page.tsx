import type { Metadata } from "next"
import { NavCmsPage } from "@/components/cms/NavCmsPage"
import { getCmsNavPage } from "@/lib/cms-nav"

export const metadata: Metadata = {
  title: "ELISA Kits",
  description: "BosterBio — ELISA Kits.",
}

export default function Page() {
  const data = getCmsNavPage("elisa_kits_landing_page")
  return (
    <NavCmsPage
      data={data}
      fallbackTitle="ELISA Kits"
      fallbackDescription="BosterBio — ELISA Kits."
    />
  )
}
