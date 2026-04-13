import type { Metadata } from "next"
import { NavCmsPage } from "@/components/cms/NavCmsPage"
import { getCmsNavPage } from "@/lib/cms-nav"

export const metadata: Metadata = {
  title: "Primary Antibodies",
  description: "BosterBio — Primary Antibodies.",
}

export default function Page() {
  const data = getCmsNavPage("primary-antibodies")
  return (
    <NavCmsPage
      data={data}
      fallbackTitle="Primary Antibodies"
      fallbackDescription="BosterBio — Primary Antibodies."
    />
  )
}
