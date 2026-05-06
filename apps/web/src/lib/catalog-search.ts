import type { CatalogProduct } from "./catalog-product-types"

export function catalogSearchHaystack(p: CatalogProduct): string {
  return [
    p.name,
    p.catalog,
    p.target,
    p.host,
    p.productTemplate,
    p.applications.join(" "),
    p.reactivity.join(" "),
    p.shortDescription ?? "",
    p.clone ?? "",
    p.badges.join(" "),
  ]
    .join(" ")
    .toLowerCase()
}
