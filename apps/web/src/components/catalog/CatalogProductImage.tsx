"use client"

import { useEffect, useMemo, useState } from "react"

const FALLBACK_WB =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Western_Blot_of_Hsp90_with_tag-specific_and_GST-specific_antibodies.jpg/800px-Western_Blot_of_Hsp90_with_tag-specific_and_GST-specific_antibodies.jpg"

type Props = {
  src: string
  alt?: string
  className?: string
}

function displaySrc(src: string): string {
  try {
    const u = new URL(src, typeof window !== "undefined" ? window.location.origin : "http://localhost")
    if (u.hostname === "www.bosterbio.com" || u.hostname === "bosterbio.com") {
      return `/api/proxy-product-image?url=${encodeURIComponent(src)}`
    }
  } catch {
    /* relative or invalid */
  }
  return src
}

/**
 * BosterBio CDN is proxied same-origin to avoid hotlink blocks; on failure, WB reference image.
 */
export function CatalogProductImage({ src, alt = "", className }: Props) {
  const initial = useMemo(() => displaySrc(src), [src])
  const [current, setCurrent] = useState(initial)
  useEffect(() => {
    setCurrent(displaySrc(src))
  }, [src])

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
