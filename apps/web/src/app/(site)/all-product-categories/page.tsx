import type { Metadata } from "next"
import { NavCmsPage } from "@/components/cms/NavCmsPage"
import { getCmsNavPage } from "@/lib/cms-nav"

export const metadata: Metadata = {
  title: "All Product Categories",
  description: "BosterBio — All Product Categories.",
}

export default function Page() {
  const data = getCmsNavPage("all-product-categories")
  return (
    <NavCmsPage
      data={data}
      fallbackTitle="All Product Categories"
      fallbackDescription="BosterBio — All Product Categories."
    />
  )
}
