import type { Metadata } from "next"
import { NavCmsPage } from "@/components/cms/NavCmsPage"
import { getCmsNavPage } from "@/lib/cms-nav"

export const metadata: Metadata = {
  title: "FAQs",
  description: "BosterBio — FAQs.",
}

export default function Page() {
  const data = getCmsNavPage("faqs")
  return (
    <NavCmsPage
      data={data}
      fallbackTitle="FAQs"
      fallbackDescription="BosterBio — FAQs."
    />
  )
}
