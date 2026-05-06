-- Batch-update product_template from migration tooling (CSV reconciliation).
-- Called via PostgREST RPC with service_role only.

CREATE OR REPLACE FUNCTION public.apply_product_template_updates(payload jsonb)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  updated_count integer;
BEGIN
  UPDATE public.products p
  SET product_template = u.product_template
  FROM (
    SELECT NULLIF(TRIM(r.sku), '') AS sku,
           NULLIF(TRIM(r.product_template), '') AS product_template
    FROM jsonb_to_recordset(payload) AS r(sku text, product_template text)
  ) u
  WHERE p.sku = u.sku
    AND u.product_template IS NOT NULL;

  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RETURN COALESCE(updated_count, 0);
END;
$$;

REVOKE ALL ON FUNCTION public.apply_product_template_updates(jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.apply_product_template_updates(jsonb) TO service_role;
