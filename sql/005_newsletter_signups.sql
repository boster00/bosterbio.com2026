-- Newsletter signups — minimal schema for capturing email subscriptions.
CREATE TABLE IF NOT EXISTS public.newsletter_signups (
  id          bigserial PRIMARY KEY,
  email       text UNIQUE NOT NULL,
  source      text DEFAULT 'footer',  -- footer | popup | landing | manual
  user_agent  text,
  referrer    text,
  ip_hash     text,
  unsubscribed_at timestamptz,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_newsletter_signups_active
  ON public.newsletter_signups (created_at DESC)
  WHERE unsubscribed_at IS NULL;

ALTER TABLE public.newsletter_signups ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "newsletter_signups insert anon" ON public.newsletter_signups;
CREATE POLICY "newsletter_signups insert anon" ON public.newsletter_signups
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(email) > 5 AND char_length(email) <= 200
    AND email LIKE '%@%.%'
  );
-- Service role only for SELECT/UPDATE/DELETE (no policies → blocked).
