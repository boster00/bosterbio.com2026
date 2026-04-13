import type { Metadata } from "next"
import { NavCmsPage } from "@/components/cms/NavCmsPage"
import { getCmsNavPage } from "@/lib/cms-nav"

export const metadata: Metadata = {
  title: "AAV Packaging Service",
  description: "BosterBio — AAV Packaging Service.",
}

export default function Page() {
  const data = getCmsNavPage("services/aav-packaging-service")
  return (
    <NavCmsPage
      data={data}
      fallbackTitle="AAV Packaging Service"
      fallbackDescription="BosterBio — AAV Packaging Service."
    />
  )
}
