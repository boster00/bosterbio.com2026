/** Legacy Magento-style PDP URLs use a `.html` suffix. */

export function productDetailPath(catalog: string): string {
  const sku = catalog.trim()
  return `/products/${encodeURIComponent(sku)}.html`
}

/** Normalize dynamic route param from `/products/[sku]` or `/products/[sku].html`. */
export function normalizeProductSkuParam(raw: string): string {
  return decodeURIComponent(raw).replace(/\.html$/i, "").trim()
}
