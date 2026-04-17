-- Apply in Supabase SQL editor (GuildOS project) if quest_inventory is missing.
-- Enables Round 1 deliverables: INSERT per page, keyed by quest_id + item_key.

create table if not exists public.quest_inventory (
  id uuid primary key default gen_random_uuid(),
  quest_id uuid not null references public.quests (id) on delete cascade,
  item_key text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (quest_id, item_key)
);

create index if not exists quest_inventory_quest_id_idx on public.quest_inventory (quest_id);

alter table public.quest_inventory enable row level security;

-- Service role bypasses RLS; optional policy for authenticated GuildOS roles can be added later.

comment on table public.quest_inventory is 'Per-deliverable rows for quests (screenshots, URLs, figma_score).';
