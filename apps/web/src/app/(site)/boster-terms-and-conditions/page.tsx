import type { Metadata } from "next"
import { NavCmsPage } from "@/components/cms/NavCmsPage"
import { getCmsNavPage } from "@/lib/cms-nav"

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "BosterBio — Terms and Conditions.",
}

export default function Page() {
  const data = getCmsNavPage("boster-terms-and-conditions")
  return (
    <NavCmsPage
      data={data}
      fallbackTitle="Terms and Conditions"
      fallbackDescription="BosterBio — Terms and Conditions."
    />
  )
}
