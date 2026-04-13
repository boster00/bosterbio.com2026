import type { Metadata } from "next"
import { NavCmsPage } from "@/components/cms/NavCmsPage"
import { getCmsNavPage } from "@/lib/cms-nav"

export const metadata: Metadata = {
  title: "Western Blotting Resource Center",
  description: "BosterBio — Western Blotting Resource Center.",
}

export default function Page() {
  const data = getCmsNavPage("western-blotting-technical-resource-center")
  return (
    <NavCmsPage
      data={data}
      fallbackTitle="Western Blotting Resource Center"
      fallbackDescription="BosterBio — Western Blotting Resource Center."
    />
  )
}
