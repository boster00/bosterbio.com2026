import type { Metadata } from "next"
import { NavCmsPage } from "@/components/cms/NavCmsPage"
import { getCmsNavPage } from "@/lib/cms-nav"

export const metadata: Metadata = {
  title: "Protein Expression Service",
  description: "BosterBio — Protein Expression Service.",
}

export default function Page() {
  const data = getCmsNavPage("services/recombinant-protein-expression-service")
  return (
    <NavCmsPage
      data={data}
      fallbackTitle="Protein Expression Service"
      fallbackDescription="BosterBio — Protein Expression Service."
    />
  )
}
