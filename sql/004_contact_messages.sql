-- Contact form submissions table.
-- Public can INSERT (via anon key), but only service role can read/update.

CREATE TABLE IF NOT EXISTS public.contact_messages (
  id              bigserial PRIMARY KEY,
  name            text,
  email           text,
  company         text,
  phone           text,
  product_sku     text,                  -- pre-populated from /products/[sku] CTAs
  subject         text,
  message         text NOT NULL,
  user_agent      text,
  referrer        text,
  ip_hash         text,
  status          text NOT NULL DEFAULT 'new', -- new | read | replied | spam
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON public.contact_messages (status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email  ON public.contact_messages (email);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "contact_messages insert anon" ON public.contact_messages;
CREATE POLICY "contact_messages insert anon" ON public.contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(coalesce(message, '')) BETWEEN 10 AND 5000
    AND char_length(coalesce(email, '')) <= 200
    AND char_length(coalesce(name, '')) <= 200
  );
-- No SELECT/UPDATE/DELETE policy → only service role reads.
