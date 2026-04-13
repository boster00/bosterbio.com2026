import type { Metadata } from "next"
import { NavCmsPage } from "@/components/cms/NavCmsPage"
import { getCmsNavPage } from "@/lib/cms-nav"

export const metadata: Metadata = {
  title: "Testimonials",
  description: "BosterBio — Testimonials.",
}

export default function Page() {
  const data = getCmsNavPage("testimonials")
  return (
    <NavCmsPage
      data={data}
      fallbackTitle="Testimonials"
      fallbackDescription="BosterBio — Testimonials."
    />
  )
}
