// Shared utilities for the supabase adapter modules.

/**
 * Decode common HTML entities that survive the Magento → CSV → DB roundtrip.
 * React text nodes don't auto-decode, so titles like "Picokine&reg;" render
 * literally without this. Server-side only — no innerHTML available.
 */
export function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&reg;/g, "®")
    .replace(/&copy;/g, "©")
    .replace(/&trade;/g, "™")
    .replace(/&#174;/g, "®")
    .replace(/&#169;/g, "©")
    .replace(/&#8482;/g, "™")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}
