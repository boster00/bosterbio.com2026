import type { Metadata } from "next"
import { NavCmsPage } from "@/components/cms/NavCmsPage"
import { getCmsNavPage } from "@/lib/cms-nav"

export const metadata: Metadata = {
  title: "Antibody Categories",
  description: "BosterBio — Antibody Categories.",
}

export default function Page() {
  const data = getCmsNavPage("antibody-categories")
  return (
    <NavCmsPage
      data={data}
      fallbackTitle="Antibody Categories"
      fallbackDescription="BosterBio — Antibody Categories."
    />
  )
}
