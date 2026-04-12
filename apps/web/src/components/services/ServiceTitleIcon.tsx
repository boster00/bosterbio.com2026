import type { ReactNode } from "react"

type ServiceTitleIconVariant = "antibody" | "tube" | "chain" | "grid"

const variants: Record<ServiceTitleIconVariant, ReactNode> = {
  antibody: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2.5" fill="currentColor" stroke="none" />
      <path d="M12 7.5V11" />
      <path d="M12 11 8 19M12 11l4 8" />
    </g>
  ),
  tube: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <path d="M9 4h6v2h-1v10a2 2 0 01-2 2h0a2 2 0 01-2-2V6H9V4z" fill="currentColor" fillOpacity="0.15" />
      <path d="M9 4h6v2h-1v10a2 2 0 01-2 2h0a2 2 0 01-2-2V6H9V4z" fill="none" />
      <path d="M8 14h8" strokeLinecap="round" />
    </g>
  ),
  chain: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M8 10a3 3 0 106 0 3 3 0 10-6 0" />
      <path d="M10.5 12.5l3 3" />
      <path d="M13.5 12.5l-3 3" />
    </g>
  ),
  grid: (
    <g fill="currentColor">
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </g>
  ),
}

export function ServiceTitleIcon({
  variant,
  className = "",
}: {
  variant: ServiceTitleIconVariant
  className?: string
}) {
  return (
    <span
      className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-white shadow-md shadow-black/15 ${className}`}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6" xmlns="http://www.w3.org/2000/svg">
        {variants[variant]}
      </svg>
    </span>
  )
}
