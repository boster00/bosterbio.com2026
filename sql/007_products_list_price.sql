-- Magento-derived list price (USD) for storefront display until Medusa checkout wiring.
-- Populate via migration scripts (CSV `price` column) or controlled UPDATEs.

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS list_price numeric(12, 2);

COMMENT ON COLUMN public.products.list_price IS
  'Magento list/base price in USD for PDP/PLP display; NULL hides price until backfilled.';
