import type { Metadata } from "next"
import { NavCmsPage } from "@/components/cms/NavCmsPage"
import { getCmsNavPage } from "@/lib/cms-nav"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "BosterBio — Terms of Service.",
}

export default function Page() {
  const data = getCmsNavPage("terms-of-service")
  return (
    <NavCmsPage
      data={data}
      fallbackTitle="Terms of Service"
      fallbackDescription="BosterBio — Terms of Service."
    />
  )
}
