import type { GeneCardProps } from "@/components/gene-info-card/types"

/** Strip characters and patterns that must never appear in rendered gene cards. */
export function sanitizeDisplayText(input: string | null | undefined): string {
  if (input == null) return ""
  let s = String(input)
  s = s.replace(/\{\{[^}]*\}\}/g, "")
  s = s.replace(/\[[Ee]rror:[^\]]*\]/g, "")
  s = s.replace(/[{}]/g, "")
  s = s.replace(/\s+/g, " ").trim()
  return s
}

export function sanitizeGeneProps(props: GeneCardProps): GeneCardProps {
  const out: Record<string, unknown> = { ...props }
  for (const k of Object.keys(out)) {
    const v = out[k]
    if (typeof v === "string") out[k] = sanitizeDisplayText(v)
  }
  return out as unknown as GeneCardProps
}
