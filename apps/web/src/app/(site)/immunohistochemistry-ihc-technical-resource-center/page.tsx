import type { Metadata } from "next"
import { NavCmsPage } from "@/components/cms/NavCmsPage"
import { getCmsNavPage } from "@/lib/cms-nav"

export const metadata: Metadata = {
  title: "IHC Resource Center",
  description: "BosterBio — IHC Resource Center.",
}

export default function Page() {
  const data = getCmsNavPage("immunohistochemistry-ihc-technical-resource-center")
  return (
    <NavCmsPage
      data={data}
      fallbackTitle="IHC Resource Center"
      fallbackDescription="BosterBio — IHC Resource Center."
    />
  )
}
