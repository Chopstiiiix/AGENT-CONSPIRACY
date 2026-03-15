-- ══════════════════════════════════════════════════════════════════════
-- Agent Conspiracy — Supabase schema
-- ══════════════════════════════════════════════════════════════════════

-- Agents ─────────────────────────────────────────────────────────────
create table if not exists agents (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  name          text not null,
  code          text not null,
  specialty     text not null,
  tier          smallint not null default 1 check (tier between 1 and 3),
  hourly_rate   numeric(10,2) not null,
  description   text,
  bio           text[] not null default '{}',
  avatar_color  text not null default '#00ff88',
  avatar_bg     text not null default 'rgba(0,255,136,0.08)',
  status        text not null default 'available' check (status in ('available','busy')),
  rating        numeric(2,1) not null default 0,
  review_count  int not null default 0,
  contract_count int not null default 0,
  uptime_pct    numeric(5,2) not null default 99.90,
  response_time text not null default '0.5s',
  created_at    timestamptz not null default now()
);

create index idx_agents_slug   on agents (slug);
create index idx_agents_code   on agents (code);
create index idx_agents_status on agents (status);
create index idx_agents_rating on agents (rating desc);

-- Agent tags ─────────────────────────────────────────────────────────
create table if not exists agent_tags (
  id       uuid primary key default gen_random_uuid(),
  agent_id uuid not null references agents(id) on delete cascade,
  tag      text not null,
  color    text not null default '#00ff88'
);

create index idx_agent_tags_agent on agent_tags (agent_id);

-- Agent integrations ─────────────────────────────────────────────────
create table if not exists agent_integrations (
  id         uuid primary key default gen_random_uuid(),
  agent_id   uuid not null references agents(id) on delete cascade,
  name       text not null,
  icon_code  text not null,
  capability text not null,
  color      text not null default '#00d4ff'
);

create index idx_agent_integrations_agent on agent_integrations (agent_id);

-- Agent skills ───────────────────────────────────────────────────────
create table if not exists agent_skills (
  id         uuid primary key default gen_random_uuid(),
  agent_id   uuid not null references agents(id) on delete cascade,
  skill_name text not null,
  score      smallint not null check (score between 0 and 100)
);

create index idx_agent_skills_agent on agent_skills (agent_id);

-- Reviews ────────────────────────────────────────────────────────────
create table if not exists reviews (
  id          uuid primary key default gen_random_uuid(),
  agent_id    uuid not null references agents(id) on delete cascade,
  client_name text not null,
  rating      smallint not null check (rating between 1 and 5),
  body        text not null,
  created_at  timestamptz not null default now()
);

create index idx_reviews_agent     on reviews (agent_id);
create index idx_reviews_rating    on reviews (rating desc);
create index idx_reviews_created   on reviews (created_at desc);

-- Contracts ──────────────────────────────────────────────────────────
create table if not exists contracts (
  id                     uuid primary key default gen_random_uuid(),
  agent_id               uuid not null references agents(id) on delete cascade,
  client_id              text not null,  -- Clerk user id
  billing_period         text not null check (billing_period in ('hourly','daily','monthly','yearly')),
  status                 text not null default 'active' check (status in ('active','expired','cancelled')),
  started_at             timestamptz not null default now(),
  ends_at                timestamptz,
  stripe_subscription_id text
);

create index idx_contracts_agent     on contracts (agent_id);
create index idx_contracts_client    on contracts (client_id);
create index idx_contracts_status    on contracts (status);
