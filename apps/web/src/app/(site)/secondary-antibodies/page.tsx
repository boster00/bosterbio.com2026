import type { Metadata } from "next"
import { NavCmsPage } from "@/components/cms/NavCmsPage"
import { getCmsNavPage } from "@/lib/cms-nav"

export const metadata: Metadata = {
  title: "Secondary Antibodies",
  description: "BosterBio — Secondary Antibodies.",
}

export default function Page() {
  const data = getCmsNavPage("secondary-antibodies")
  return (
    <NavCmsPage
      data={data}
      fallbackTitle="Secondary Antibodies"
      fallbackDescription="BosterBio — Secondary Antibodies."
    />
  )
}
