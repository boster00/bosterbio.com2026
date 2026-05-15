import { hydrateCmsHtml } from "@/lib/cms-nav"
import { annotateCmsSections } from "./annotate-sections"

/** Full pipeline: legacy Magento HTML → hydrated prose + section annotations. */
export function composeTransmutedArticleHtml(rawHtml: string, pageHeading: string | undefined): string {
  return annotateCmsSections(hydrateCmsHtml(rawHtml, pageHeading))
}
