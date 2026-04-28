-- Row Level Security policies for bosterbio.com2026 storefront.
-- Storefront is read-only from the browser; only server-side service-role can write.
-- Public read access is enabled for catalog content; staging tables stay locked down.

-- =============================================================================
-- products — public read (storefront browses freely)
-- =============================================================================
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "products read public" ON public.products;
CREATE POLICY "products read public" ON public.products
  FOR SELECT
  TO anon, authenticated
  USING (status = 'enabled');

-- =============================================================================
-- product_images — public read
-- =============================================================================
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "product_images read public" ON public.product_images;
CREATE POLICY "product_images read public" ON public.product_images
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- =============================================================================
-- attribute_definitions — public read (drives PDP labels)
-- =============================================================================
ALTER TABLE public.attribute_definitions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "attribute_definitions read public" ON public.attribute_definitions;
CREATE POLICY "attribute_definitions read public" ON public.attribute_definitions
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- =============================================================================
-- cms_pages — public read (storefront content pages)
-- =============================================================================
ALTER TABLE public.cms_pages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "cms_pages read public" ON public.cms_pages;
CREATE POLICY "cms_pages read public" ON public.cms_pages
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- =============================================================================
-- publications + product_publications — public read (PDP citations)
-- =============================================================================
ALTER TABLE public.publications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "publications read public" ON public.publications;
CREATE POLICY "publications read public" ON public.publications
  FOR SELECT
  TO anon, authenticated
  USING (true);

ALTER TABLE public.product_publications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "product_publications read public" ON public.product_publications;
CREATE POLICY "product_publications read public" ON public.product_publications
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- =============================================================================
-- not_found_log — anon write-only (browser can log a 404 hit) but no read.
-- The storefront calls a server route via service-role to avoid this entirely;
-- this policy is defense-in-depth in case a route is wired client-side later.
-- =============================================================================
ALTER TABLE public.not_found_log ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "not_found_log insert anon" ON public.not_found_log;
CREATE POLICY "not_found_log insert anon" ON public.not_found_log
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
-- No SELECT policy → table is invisible to anon, only service role reads.

-- =============================================================================
-- customers_staging — service-role only (staging table; never public)
-- =============================================================================
ALTER TABLE public.customers_staging ENABLE ROW LEVEL SECURITY;
-- No anon/authenticated policy → only service role can read/write.

-- service_role bypasses RLS by default; no explicit policies needed.
