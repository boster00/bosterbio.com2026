import type { Metadata } from "next"
import { NavCmsPage } from "@/components/cms/NavCmsPage"
import { getCmsNavPage } from "@/lib/cms-nav"

export const metadata: Metadata = {
  title: "Flow Cytometry Resource Center",
  description: "BosterBio — Flow Cytometry Resource Center.",
}

export default function Page() {
  const data = getCmsNavPage("flow-technical-resource-center")
  return (
    <NavCmsPage
      data={data}
      fallbackTitle="Flow Cytometry Resource Center"
      fallbackDescription="BosterBio — Flow Cytometry Resource Center."
    />
  )
}
