import type { Metadata } from "next"
import { NavCmsPage } from "@/components/cms/NavCmsPage"
import { getCmsNavPage } from "@/lib/cms-nav"

export const metadata: Metadata = {
  title: "Distributors",
  description: "BosterBio — Distributors.",
}

export default function Page() {
  const data = getCmsNavPage("distributors")
  return (
    <NavCmsPage
      data={data}
      fallbackTitle="Distributors"
      fallbackDescription="BosterBio — Distributors."
    />
  )
}
