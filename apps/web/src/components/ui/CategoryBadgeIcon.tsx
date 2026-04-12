import type { ReactNode } from "react"
import { cn } from "@/lib/cn"

type Variant = "antibodies" | "elisa" | "proteins" | "custom" | "secondary" | "conjugation" | "protocols" | "resources"

/** Fixed inner SVG size so icons never expand to full viewport (Tailwind [&_svg] was ineffective). */
const icons: Record<Variant, (props: { className?: string }) => ReactNode> = {
  antibodies: ({ className }) => (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <path
        d="M16 4v6M16 22v6M10 10l4 4 4-4M10 22l4-4 4 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="16" r="3" fill="currentColor" />
    </svg>
  ),
  secondary: ({ className }) => (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <path
        d="M8 12c0-2.2 1.8-4 4-4h8c2.2 0 4 1.8 4 4v8c0 2.2-1.8 4-4 4h-8c-2.2 0-4-1.8-4-4v-8z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M14 10v12M18 10v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  elisa: ({ className }) => (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <rect x="6" y="8" width="20" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      <path
        d="M10 14h4M18 14h4M10 18h4M18 18h4M10 22h4M18 22h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  proteins: ({ className }) => (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <path
        d="M8 20c2-4 6-6 8-8 2 2 6 4 8 8M10 24c2-2 5-3 6-4 1 1 4 2 6 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="16" cy="10" r="2" fill="currentColor" />
    </svg>
  ),
  custom: ({ className }) => (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <path
        d="M14 8l-4 4v8l4 4h4l4-4v-8l-4-4h-4z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M16 12v8M12 16h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  conjugation: ({ className }) => (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <circle cx="11" cy="16" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="21" cy="16" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M15 16h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  protocols: ({ className }) => (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <path
        d="M10 6h12v20H10V6z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M13 11h6M13 16h6M13 21h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  resources: ({ className }) => (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <path
        d="M8 8h8v16H8V8zM18 10h6v4h-6M18 18h6v6h-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  ),
}

type Props = {
  variant: Variant
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

const sizeClasses: Record<NonNullable<Props["size"]>, { outer: string; inner: string }> = {
  sm: { outer: "h-10 w-10 min-h-10 min-w-10", inner: "h-4 w-4 shrink-0" },
  md: { outer: "h-12 w-12 min-h-12 min-w-12", inner: "h-6 w-6 shrink-0" },
  lg: { outer: "h-12 w-12 min-h-12 min-w-12", inner: "h-6 w-6 shrink-0" },
  /** Category tiles — 64px orange circle per brand spec */
  xl: { outer: "h-16 w-16 min-h-16 min-w-16", inner: "h-8 w-8 shrink-0" },
}

export function CategoryBadgeIcon({ variant, size = "md", className }: Props) {
  const Icon = icons[variant]
  const { outer, inner } = sizeClasses[size]
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-accent text-white shadow-md shadow-accent/25",
        outer,
        className,
      )}
      aria-hidden
    >
      <Icon className={cn(inner, "text-white")} />
    </span>
  )
}
