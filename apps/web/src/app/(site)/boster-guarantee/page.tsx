import type { Metadata } from "next"
import { NavCmsPage } from "@/components/cms/NavCmsPage"
import { getCmsNavPage } from "@/lib/cms-nav"

export const metadata: Metadata = {
  title: "Boster Guarantee",
  description: "BosterBio — Boster Guarantee.",
}

export default function Page() {
  const data = getCmsNavPage("boster-guarantee")
  return (
    <NavCmsPage
      data={data}
      fallbackTitle="Boster Guarantee"
      fallbackDescription="BosterBio — Boster Guarantee."
    />
  )
}
