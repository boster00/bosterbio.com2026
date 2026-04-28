-- bosterbio.com2026 — initial schema
-- Generated 2026-04-27 from docs/product-attributes-migration-plan.md
-- Hybrid model: Type A dedicated columns + Type B flexible attr_1..attr_25
-- + product_images + attribute_definitions + cms_pages + publications + not_found_log

-- =============================================================================
-- 1. products — primary catalog table (Type A dedicated + Type B flexible)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.products (
  id              bigserial PRIMARY KEY,
  sku             text UNIQUE NOT NULL,
  title           text NOT NULL,
  handle          text UNIQUE NOT NULL,            -- url_key, used for routing
  product_template text NOT NULL,                  -- antibodies | elisa-kits | proteins | ...
  category        text,                            -- Medusa category slug (string ref)
  status          text DEFAULT 'enabled',          -- enabled | disabled
  visibility      text DEFAULT 'visible',

  -- Type A indexed/query-critical (search-critical)
  reactivity      text[] DEFAULT '{}',
  applications    text[] DEFAULT '{}',
  clone           text,                            -- merged: clonality + clone_number
  host_species    text,
  badges          text,
  target_info     jsonb DEFAULT '{}'::jsonb,       -- gene_name, uniprot_id, synonyms, protein_function, gene_full_name, protein_name

  -- Content
  description       text,
  short_description text,
  background        text,

  -- Storage / shipping
  storage                   text,
  shipping_storage_handling text,

  -- SEO meta
  meta_title       text,
  meta_description text,
  meta_keywords    text,

  -- Type B flexible attributes (attr_1..attr_25, all text)
  attr_1  text, attr_2  text, attr_3  text, attr_4  text, attr_5  text,
  attr_6  text, attr_7  text, attr_8  text, attr_9  text, attr_10 text,
  attr_11 text, attr_12 text, attr_13 text, attr_14 text, attr_15 text,
  attr_16 text, attr_17 text, attr_18 text, attr_19 text, attr_20 text,
  attr_21 text, attr_22 text, attr_23 text, attr_24 text, attr_25 text,

  -- Computed search index (filled by trigger)
  search_index   text,
  search_tsv     tsvector,

  -- Catch-all + audit
  metadata       jsonb DEFAULT '{}'::jsonb,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

-- Indexes for query-critical Type A columns
CREATE INDEX IF NOT EXISTS idx_products_template      ON public.products (product_template);
CREATE INDEX IF NOT EXISTS idx_products_category      ON public.products (category);
CREATE INDEX IF NOT EXISTS idx_products_status        ON public.products (status);
CREATE INDEX IF NOT EXISTS idx_products_clone         ON public.products (clone);
CREATE INDEX IF NOT EXISTS idx_products_host_species  ON public.products (host_species);
CREATE INDEX IF NOT EXISTS idx_products_reactivity    ON public.products USING GIN (reactivity);
CREATE INDEX IF NOT EXISTS idx_products_applications  ON public.products USING GIN (applications);
CREATE INDEX IF NOT EXISTS idx_products_target_info   ON public.products USING GIN (target_info);
CREATE INDEX IF NOT EXISTS idx_products_search_tsv    ON public.products USING GIN (search_tsv);
CREATE INDEX IF NOT EXISTS idx_products_handle        ON public.products (handle);

-- Trigger: maintain search_tsv from search_index/title/sku/target_info
CREATE OR REPLACE FUNCTION public.products_update_search_tsv() RETURNS trigger AS $$
BEGIN
  NEW.updated_at := now();
  NEW.search_tsv := to_tsvector('english',
    coalesce(NEW.search_index, '') || ' ' ||
    coalesce(NEW.title, '') || ' ' ||
    coalesce(NEW.sku, '') || ' ' ||
    coalesce(NEW.short_description, '') || ' ' ||
    coalesce(NEW.target_info->>'gene_name', '') || ' ' ||
    coalesce(NEW.target_info->>'uniprot_id', '') || ' ' ||
    coalesce(NEW.target_info->>'synonyms', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_products_update_search_tsv ON public.products;
CREATE TRIGGER trg_products_update_search_tsv
  BEFORE INSERT OR UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.products_update_search_tsv();

-- =============================================================================
-- 2. product_images — many-to-one
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.product_images (
  id              bigserial PRIMARY KEY,
  product_id      bigint NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  image_url       text NOT NULL,
  alt_text        text,
  ltx_description text,
  position        int  DEFAULT 0,
  type            text DEFAULT 'gallery',  -- hero | gallery | datasheet | swatch
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON public.product_images (product_id);
CREATE INDEX IF NOT EXISTS idx_product_images_type       ON public.product_images (type);

-- =============================================================================
-- 3. attribute_definitions — per-template Type B labels
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.attribute_definitions (
  id            bigserial PRIMARY KEY,
  template      text NOT NULL,                 -- antibodies | elisa-kits | ...
  attr_key      text NOT NULL,                 -- attr_1 | attr_2 | ... | attr_25
  label         text NOT NULL,                 -- "Sensitivity" | "Kit Components" | ...
  type          text NOT NULL DEFAULT 'text',  -- text | html
  display_order int  NOT NULL DEFAULT 0,
  required      boolean NOT NULL DEFAULT false,
  storage_type  text DEFAULT 'text',
  created_at    timestamptz NOT NULL DEFAULT now(),
  UNIQUE (template, attr_key)
);

CREATE INDEX IF NOT EXISTS idx_attrdef_template ON public.attribute_definitions (template, display_order);

-- =============================================================================
-- 4. cms_pages — migrated CMS content (481 KEEP rows from Magento)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.cms_pages (
  id              bigserial PRIMARY KEY,
  legacy_page_id  int UNIQUE,                  -- Magento page_id (preserved for traceability)
  identifier      text UNIQUE NOT NULL,        -- URL path, e.g. "diseases/celiac-disease-antibodies"
  title           text NOT NULL,
  content_heading text,
  content         text,                        -- raw HTML
  meta_title      text,
  meta_description text,
  meta_keywords   text,
  is_active       boolean NOT NULL DEFAULT true,
  legacy_created_at timestamptz,
  legacy_updated_at timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_cms_pages_identifier ON public.cms_pages (identifier);
CREATE INDEX IF NOT EXISTS idx_cms_pages_active     ON public.cms_pages (is_active);

CREATE OR REPLACE FUNCTION public.cms_pages_touch_updated() RETURNS trigger AS $$
BEGIN NEW.updated_at := now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_cms_pages_touch_updated ON public.cms_pages;
CREATE TRIGGER trg_cms_pages_touch_updated
  BEFORE UPDATE ON public.cms_pages
  FOR EACH ROW EXECUTE FUNCTION public.cms_pages_touch_updated();

-- =============================================================================
-- 5. publications — migrated as-is from Magento (52,403 rows expected)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.publications (
  id          bigserial PRIMARY KEY,
  legacy_id   int UNIQUE,
  title       text,
  authors     text,
  journal     text,
  year        int,
  pubmed_id   text,
  doi         text,
  url         text,
  abstract    text,
  raw         jsonb DEFAULT '{}'::jsonb,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_publications_pubmed ON public.publications (pubmed_id);
CREATE INDEX IF NOT EXISTS idx_publications_doi    ON public.publications (doi);

-- =============================================================================
-- 6. product_publications — link table (many-to-many)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.product_publications (
  product_id     bigint REFERENCES public.products(id) ON DELETE CASCADE,
  publication_id bigint REFERENCES public.publications(id) ON DELETE CASCADE,
  position       int DEFAULT 0,
  PRIMARY KEY (product_id, publication_id)
);

CREATE INDEX IF NOT EXISTS idx_prodpub_product ON public.product_publications (product_id, position);

-- =============================================================================
-- 7. not_found_log — 404 monitoring (alternative to bulk redirects)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.not_found_log (
  id           bigserial PRIMARY KEY,
  path         text NOT NULL,
  referrer     text,
  user_agent   text,
  ip_hash      text,                           -- hashed for privacy
  hit_count    int NOT NULL DEFAULT 1,
  first_seen   timestamptz NOT NULL DEFAULT now(),
  last_seen    timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_404_path ON public.not_found_log (path);
CREATE INDEX IF NOT EXISTS idx_404_hits ON public.not_found_log (hit_count DESC);

-- =============================================================================
-- 8. customers — staging table for Magento migration (2,352 expected)
--    Real customer auth lives in Supabase Auth; this is the import staging.
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.customers_staging (
  id               bigserial PRIMARY KEY,
  legacy_id        int UNIQUE,
  email            text UNIQUE NOT NULL,
  first_name       text,
  last_name        text,
  company          text,
  phone            text,
  default_address  jsonb,
  metadata         jsonb DEFAULT '{}'::jsonb,
  password_reset_sent_at timestamptz,
  imported_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_customers_email ON public.customers_staging (email);

-- =============================================================================
-- Done.
-- =============================================================================
