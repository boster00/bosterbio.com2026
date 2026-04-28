// Fetch publications cited for a given product (joins product_publications → publications).
// Returns up to 20 by default per the migration plan ("Display first ~20 per product, with show more").
import "server-only";
import { supabaseService } from "./server";

export type ProductPublication = {
  id: number;
  title: string | null;
  authors: string | null;
  journal: string | null;
  year: number | null;
  pubmed_id: string | null;
  doi: string | null;
  url: string | null;
};

export async function getPublicationsForProduct(
  productSkuOrHandle: string,
  limit = 20,
): Promise<ProductPublication[]> {
  const sb = supabaseService();
  // Resolve product id
  let { data: prod, error } = await sb
    .from("products")
    .select("id")
    .eq("sku", productSkuOrHandle)
    .maybeSingle();
  if (!prod && !error) {
    ({ data: prod, error } = await sb
      .from("products")
      .select("id")
      .eq("handle", productSkuOrHandle)
      .maybeSingle());
  }
  if (error || !prod) return [];

  const { data: links, error: linkErr } = await sb
    .from("product_publications")
    .select("publication_id, position")
    .eq("product_id", (prod as { id: number }).id)
    .order("position", { ascending: true })
    .limit(limit);
  if (linkErr || !links?.length) return [];

  const ids = (links as { publication_id: number }[]).map((l) => l.publication_id);
  const { data: pubs, error: pubErr } = await sb
    .from("publications")
    .select("id, title, authors, journal, year, pubmed_id, doi, url")
    .in("id", ids);
  if (pubErr || !pubs) return [];
  return pubs as ProductPublication[];
}
