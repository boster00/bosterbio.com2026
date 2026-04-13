import type { Metadata } from "next"
import { NavCmsPage } from "@/components/cms/NavCmsPage"
import { getCmsNavPage } from "@/lib/cms-nav"

export const metadata: Metadata = {
  title: "Technical Support",
  description: "BosterBio — Technical Support.",
}

export default function Page() {
  const data = getCmsNavPage("supportformpage")
  return (
    <NavCmsPage
      data={data}
      fallbackTitle="Technical Support"
      fallbackDescription="BosterBio — Technical Support."
    />
  )
}
