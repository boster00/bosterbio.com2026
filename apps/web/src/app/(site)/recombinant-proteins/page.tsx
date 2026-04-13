import type { Metadata } from "next"
import { NavCmsPage } from "@/components/cms/NavCmsPage"
import { getCmsNavPage } from "@/lib/cms-nav"

export const metadata: Metadata = {
  title: "Recombinant Proteins",
  description: "BosterBio — Recombinant Proteins.",
}

export default function Page() {
  const data = getCmsNavPage("recombinant-proteins")
  return (
    <NavCmsPage
      data={data}
      fallbackTitle="Recombinant Proteins"
      fallbackDescription="BosterBio — Recombinant Proteins."
    />
  )
}
