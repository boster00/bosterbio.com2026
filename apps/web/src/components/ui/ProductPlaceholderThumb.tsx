import { cn } from "@/lib/cn"

/**
 * Neutral catalog placeholder — 80×80 gray tile with subtle Y-shaped antibody outline.
 * Use when the Medusa product has no thumbnail / metadata image (Magento media path may 404).
 */
export function ProductPlaceholderThumb({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-slate-200 ring-1 ring-slate-300/80",
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 32 32" className="h-9 w-9 shrink-0 text-slate-400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16 6v6M16 20v6M11 11l5 5 5-5M11 21l5-5 5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />
        <circle cx="16" cy="16" r="2.5" fill="currentColor" opacity="0.5" />
      </svg>
    </div>
  )
}
