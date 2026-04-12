import { cn } from "@/lib/cn"

type Variant = "antibodies" | "elisa" | "proteins" | "custom" | "secondary" | "conjugation" | "protocols" | "resources"

/** White line icons on orange badges — assets in `public/images/icons/`. */
const iconSrc: Record<Variant, string> = {
  antibodies: "/images/icons/antibody.svg",
  secondary: "/images/icons/secondary.svg",
  elisa: "/images/icons/elisa.svg",
  proteins: "/images/icons/protein.svg",
  custom: "/images/icons/services.svg",
  conjugation: "/images/icons/conjugation.svg",
  protocols: "/images/icons/protocols.svg",
  resources: "/images/icons/resources.svg",
}

type Props = {
  variant: Variant
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

/** Inner icon ~60% of outer circle diameter for category tiles; proportionally larger at sm/md. */
const sizeClasses: Record<NonNullable<Props["size"]>, { outer: string; inner: string }> = {
  sm: { outer: "h-10 w-10 min-h-10 min-w-10", inner: "h-6 w-6 shrink-0" },
  md: { outer: "h-12 w-12 min-h-12 min-w-12", inner: "h-7 w-7 shrink-0" },
  lg: { outer: "h-12 w-12 min-h-12 min-w-12", inner: "h-7 w-7 shrink-0" },
  /** Category tiles — 64px orange circle per brand spec */
  xl: { outer: "h-16 w-16 min-h-16 min-w-16", inner: "h-10 w-10 shrink-0" },
}

export function CategoryBadgeIcon({ variant, size = "md", className }: Props) {
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
      <img src={iconSrc[variant]} alt="" className={cn(inner, "object-contain")} width={40} height={40} />
    </span>
  )
}
