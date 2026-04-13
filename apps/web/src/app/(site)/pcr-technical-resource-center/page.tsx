import type { Metadata } from "next"
import { NavCmsPage } from "@/components/cms/NavCmsPage"
import { getCmsNavPage } from "@/lib/cms-nav"

export const metadata: Metadata = {
  title: "PCR Resource Center",
  description: "BosterBio — PCR Resource Center.",
}

export default function Page() {
  const data = getCmsNavPage("pcr-technical-resource-center")
  return (
    <NavCmsPage
      data={data}
      fallbackTitle="PCR Resource Center"
      fallbackDescription="BosterBio — PCR Resource Center."
    />
  )
}
