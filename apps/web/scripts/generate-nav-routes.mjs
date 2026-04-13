#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"

const WEB = path.join(import.meta.dirname, "..")
const APP = path.join(WEB, "src/app/(site)")

const routes = [
  { file: "about-us/page.tsx", id: "about-us", title: "About Us" },
  { file: "contact-us/page.tsx", id: "contact-us", title: "Contact Us", special: "contact" },
  { file: "boster-guarantee/page.tsx", id: "boster-guarantee", title: "Boster Guarantee" },
  { file: "faqs/page.tsx", id: "faqs", title: "FAQs" },
  { file: "testimonials/page.tsx", id: "testimonials", title: "Testimonials" },
  { file: "career-opportunities/page.tsx", id: "career-opportunities", title: "Careers" },
  { file: "distributors/page.tsx", id: "distributors", title: "Distributors" },
  { file: "privacy-policy/page.tsx", id: "privacy-policy", title: "Privacy Policy" },
  { file: "terms-of-service/page.tsx", id: "terms-of-service", title: "Terms of Service" },
  { file: "boster-terms-and-conditions/page.tsx", id: "boster-terms-and-conditions", title: "Terms and Conditions" },
  { file: "all-product-categories/page.tsx", id: "all-product-categories", title: "All Product Categories" },
  { file: "primary-antibodies/page.tsx", id: "primary-antibodies", title: "Primary Antibodies" },
  { file: "secondary-antibodies/page.tsx", id: "secondary-antibodies", title: "Secondary Antibodies" },
  { file: "elisa_kits_landing_page/page.tsx", id: "elisa_kits_landing_page", title: "ELISA Kits" },
  { file: "recombinant-proteins/page.tsx", id: "recombinant-proteins", title: "Recombinant Proteins" },
  { file: "antibody-categories/page.tsx", id: "antibody-categories", title: "Antibody Categories" },
  { file: "promotions/page.tsx", id: "promotions", title: "Promotions" },
  { file: "services/custom-antibody-production-services/page.tsx", id: "services/custom-antibody-production-services", title: "Custom Antibody Services" },
  { file: "services/assay-services/page.tsx", id: "services/assay-services", title: "Assay Services" },
  { file: "services/multiplex-assay-services/page.tsx", id: "services/multiplex-assay-services", title: "Multiplex Assay Services" },
  { file: "services/recombinant-protein-expression-service/page.tsx", id: "services/recombinant-protein-expression-service", title: "Protein Expression Service" },
  { file: "services/aav-packaging-service/page.tsx", id: "services/aav-packaging-service", title: "AAV Packaging Service" },
  { file: "western-blotting-technical-resource-center/page.tsx", id: "western-blotting-technical-resource-center", title: "Western Blotting Resource Center" },
  { file: "immunohistochemistry-ihc-technical-resource-center/page.tsx", id: "immunohistochemistry-ihc-technical-resource-center", title: "IHC Resource Center" },
  { file: "elisa-technical-resource-center/page.tsx", id: "elisa-technical-resource-center", title: "ELISA Resource Center" },
  { file: "flow-technical-resource-center/page.tsx", id: "flow-technical-resource-center", title: "Flow Cytometry Resource Center" },
  { file: "pcr-technical-resource-center/page.tsx", id: "pcr-technical-resource-center", title: "PCR Resource Center" },
  { file: "supportformpage/page.tsx", id: "supportformpage", title: "Technical Support" },
]

const navCms = `import type { Metadata } from "next"
import { NavCmsPage } from "@/components/cms/NavCmsPage"
import { getCmsNavPage } from "@/lib/cms-nav"

export const metadata: Metadata = {
  title: "__TITLE__",
  description: "__DESC__",
}

export default function Page() {
  const data = getCmsNavPage("__ID__")
  return (
    <NavCmsPage
      data={data}
      fallbackTitle="__TITLE__"
      fallbackDescription="__DESC__"
    />
  )
}
`

const contactUs = `export { default, metadata } from "../contact/page"
`

for (const r of routes) {
  const dir = path.join(APP, path.dirname(r.file))
  fs.mkdirSync(dir, { recursive: true })
  const fp = path.join(APP, r.file)
  if (r.special === "contact") {
    fs.writeFileSync(fp, contactUs, "utf8")
    continue
  }
  const desc = `BosterBio — ${r.title}.`
  const body = navCms.replace(/__TITLE__/g, r.title).replace(/__ID__/g, r.id).replace(/__DESC__/g, desc)
  fs.writeFileSync(fp, body, "utf8")
}
console.log("Generated", routes.length, "routes")
