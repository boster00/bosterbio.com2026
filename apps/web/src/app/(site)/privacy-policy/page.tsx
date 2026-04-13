import type { Metadata } from "next"
import { NavCmsPage } from "@/components/cms/NavCmsPage"
import { getCmsNavPage } from "@/lib/cms-nav"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "BosterBio — Privacy Policy.",
}

export default function Page() {
  const data = getCmsNavPage("privacy-policy")
  return (
    <NavCmsPage
      data={data}
      fallbackTitle="Privacy Policy"
      fallbackDescription="BosterBio — Privacy Policy."
    />
  )
}
