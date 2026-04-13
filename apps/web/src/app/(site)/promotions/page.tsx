import type { Metadata } from "next"
import { NavCmsPage } from "@/components/cms/NavCmsPage"
import { getCmsNavPage } from "@/lib/cms-nav"

export const metadata: Metadata = {
  title: "Promotions",
  description: "BosterBio — Promotions.",
}

export default function Page() {
  const data = getCmsNavPage("promotions")
  return (
    <NavCmsPage
      data={data}
      fallbackTitle="Promotions"
      fallbackDescription="BosterBio — Promotions."
    />
  )
}
