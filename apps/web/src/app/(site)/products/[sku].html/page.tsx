import { buildProductPdpMetadata } from "@/lib/product-metadata"
import { normalizeProductSkuParam } from "@/lib/product-urls"
import { ProductDetailPage } from "../ProductDetailPage"

type Props = { params: Promise<{ sku: string }> }

export const revalidate = 600

export async function generateMetadata({ params }: Props) {
  const { sku } = await params
  return buildProductPdpMetadata(normalizeProductSkuParam(sku))
}

export default async function ProductSkuHtmlPage({ params }: Props) {
  const { sku } = await params
  return <ProductDetailPage catalog={normalizeProductSkuParam(sku)} />
}
