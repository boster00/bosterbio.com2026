import type { Metadata } from "next"
import { NavCmsPage } from "@/components/cms/NavCmsPage"
import { getCmsNavPage } from "@/lib/cms-nav"

export const metadata: Metadata = {
  title: "Careers",
  description: "BosterBio — Careers.",
}

export default function Page() {
  const data = getCmsNavPage("career-opportunities")
  return (
    <NavCmsPage
      data={data}
      fallbackTitle="Careers"
      fallbackDescription="BosterBio — Careers."
    />
  )
}
