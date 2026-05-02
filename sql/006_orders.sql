-- Orders capture for the new storefront.
-- Smoke 3.x.next item 3: ready-to-test checkout that captures order in DB
-- before any real payment-gateway connection. Schema is intentionally
-- payment-provider-agnostic so the same row works for the future
-- Auth.net / Stripe abstraction (Q2 from Office Hour).
--
-- Sync target: Zoho Books (Q3 — historical/transaction source of truth
-- moves to Zoho Books). The `zoho_sync_*` columns track the fail-safe
-- queue + retry state per the Q3 mandate.

CREATE TABLE IF NOT EXISTS orders (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number    text UNIQUE NOT NULL,                 -- BB-2026-000001 style
  status          text NOT NULL DEFAULT 'pending',      -- pending|placed|paid|fulfilled|cancelled|failed
  -- Customer (snapshot at order time; we don't have customer accounts wired yet)
  email           text NOT NULL,
  full_name       text,
  company         text,
  phone           text,
  -- Shipping
  ship_addr1      text,
  ship_addr2      text,
  ship_city       text,
  ship_state      text,
  ship_postal     text,
  ship_country    text,
  -- Billing (defaults to shipping if not set)
  bill_same_as_ship boolean NOT NULL DEFAULT true,
  bill_addr1      text,
  bill_addr2      text,
  bill_city       text,
  bill_state      text,
  bill_postal     text,
  bill_country    text,
  -- Money
  subtotal_cents  integer NOT NULL DEFAULT 0,
  tax_cents       integer NOT NULL DEFAULT 0,
  shipping_cents  integer NOT NULL DEFAULT 0,
  total_cents     integer NOT NULL DEFAULT 0,
  currency        text NOT NULL DEFAULT 'USD',
  -- Payment (provider-agnostic; populated by the future PAYMENT_GATEWAY abstraction)
  payment_method  text,                                  -- 'sandbox'|'authnet'|'stripe'|'po'
  payment_status  text DEFAULT 'unpaid',                 -- 'unpaid'|'authorized'|'captured'|'refunded'|'failed'
  payment_intent_id text,
  payment_meta    jsonb,                                 -- gateway-specific blob
  -- Notes
  notes           text,
  internal_notes  text,
  -- Zoho Books fail-safe sync state (Q3)
  zoho_synced_at  timestamptz,
  zoho_book_id    text,                                  -- Zoho Books estimate / sales-order / invoice id
  zoho_sync_attempts integer NOT NULL DEFAULT 0,
  zoho_sync_last_error text,
  zoho_sync_next_retry_at timestamptz,                   -- when the retry worker should try again
  -- Audit
  placed_at       timestamptz,                           -- set when status moves to 'placed'
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_zoho_pending ON orders(zoho_sync_next_retry_at) WHERE zoho_synced_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);

CREATE TABLE IF NOT EXISTS order_items (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id        uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  -- Snapshot of the product at order time (don't FK to products — products may
  -- be edited or de-listed without affecting historical orders)
  sku             text NOT NULL,
  product_id      bigint,                                -- nullable FK reference (informational)
  title           text NOT NULL,
  template        text,                                  -- antibodies / elisa-kits / etc.
  unit_price_cents integer NOT NULL,
  quantity        integer NOT NULL CHECK (quantity > 0),
  line_subtotal_cents integer GENERATED ALWAYS AS (unit_price_cents * quantity) STORED,
  -- Snapshot extras
  format          text,                                  -- "100µg / vial" etc. — for future variant support
  variant_meta    jsonb,                                 -- snapshot of selected options
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_sku ON order_items(sku);

-- updated_at trigger on orders
CREATE OR REPLACE FUNCTION orders_touch_updated() RETURNS trigger AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_orders_touch_updated ON orders;
CREATE TRIGGER trg_orders_touch_updated BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION orders_touch_updated();

-- RLS: orders are insert-only-from-public (anyone can place an order via the
-- checkout API), but reads go through the API with service-role.
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "orders insert anon" ON orders;
CREATE POLICY "orders insert anon" ON orders FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "order_items insert anon" ON order_items;
CREATE POLICY "order_items insert anon" ON order_items FOR INSERT WITH CHECK (true);
