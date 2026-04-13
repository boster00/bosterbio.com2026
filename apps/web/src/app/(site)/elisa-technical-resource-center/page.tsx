import type { Metadata } from "next"
import { NavCmsPage } from "@/components/cms/NavCmsPage"
import { getCmsNavPage } from "@/lib/cms-nav"

export const metadata: Metadata = {
  title: "ELISA Resource Center",
  description: "BosterBio — ELISA Resource Center.",
}

export default function Page() {
  const data = getCmsNavPage("elisa-technical-resource-center")
  return (
    <NavCmsPage
      data={data}
      fallbackTitle="ELISA Resource Center"
      fallbackDescription="BosterBio — ELISA Resource Center."
    />
  )
}
