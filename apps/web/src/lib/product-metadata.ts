import type { Metadata } from "next"
import { fetchCatalogProductByCatalog } from "@/lib/catalog-products"

export async function buildProductPdpMetadata(catalogRaw: string): Promise<Metadata> {
  const product = await fetchCatalogProductByCatalog(catalogRaw)
  if (!product) return { title: "Product not found" }

  const cleanName = product.name.replace(/\s*\|\s*BosterBio.*$/i, "").trim()
  const description =
    product.shortDescription ||
    (product.description
      ? `${product.description.replace(/<[^>]+>/g, "").slice(0, 200).trim()}…`
      : `${cleanName} — Catalog #${product.catalog}, sold by Boster Bio.`)

  return {
    title: `${cleanName} (${product.catalog}) | Boster Bio`,
    description,
    openGraph: {
      title: cleanName,
      description,
      ...(product.imageUrl ? { images: [{ url: product.imageUrl }] } : {}),
      type: "website",
    },
  }
}
