"use client"

import { useState } from "react"

const FALLBACK_WB =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Western_Blot_of_Hsp90_with_tag-specific_and_GST-specific_antibodies.jpg/800px-Western_Blot_of_Hsp90_with_tag-specific_and_GST-specific_antibodies.jpg"

type Props = {
  src: string
  alt?: string
  className?: string
}

/**
 * Prefer Medusa / Magento CDN; if blocked or broken, show a western-blot reference image.
 */
export function CatalogProductImage({ src, alt = "", className }: Props) {
  const [current, setCurrent] = useState(src)

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={current}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => {
        if (current !== FALLBACK_WB) setCurrent(FALLBACK_WB)
      }}
    />
  )
}
