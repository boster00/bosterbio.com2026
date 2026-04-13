import type { Metadata } from "next"
import { NavCmsPage } from "@/components/cms/NavCmsPage"
import { getCmsNavPage } from "@/lib/cms-nav"

export const metadata: Metadata = {
  title: "About Us",
  description: "BosterBio — About Us.",
}

export default function Page() {
  const data = getCmsNavPage("about-us")
  return (
    <NavCmsPage
      data={data}
      fallbackTitle="About Us"
      fallbackDescription="BosterBio — About Us."
    />
  )
}
