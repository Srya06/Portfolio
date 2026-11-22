-- PostgreSQL migration for Surya D Portfolio dynamic data (Chunk 6)
-- Compatible with Supabase Postgres

create extension if not exists "pgcrypto";

-- Enum types for message lifecycle and inquiry classification
create type message_status as enum ('new', 'notified', 'replied', 'archived', 'spam');
create type project_need as enum (
  'ai-ml',
  'agentic-systems',
  'full-stack',
  'computer-vision',
  'recruitment',
  'internship',
  'other'
);

-- Contact messages table
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  need project_need not null,
  name text not null check (char_length(name) between 2 and 80),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  message text not null check (char_length(message) between 10 and 2000),
  budget text,
  consent boolean not null default false,
  ip_hash text,
  user_agent text,
  status message_status not null default 'new',
  created_at timestamptz not null default now(),
  replied_at timestamptz
);

-- Index for admin retrieval order
create index if not exists idx_contact_messages_status_created 
  on public.contact_messages (status, created_at desc);

-- Lightweight analytics events table
create table if not exists public.events (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) < 50),
  path text,
  meta jsonb default '{}'::jsonb,
  session_id text,
  created_at timestamptz not null default now()
);

-- Index for event queries
create index if not exists idx_events_name_created 
  on public.events (name, created_at desc);

-- Row Level Security policies
alter table public.contact_messages enable row level security;
alter table public.events enable row level security;

-- Client-side insert allowed for analytics events
create policy "anon can insert events" on public.events
  for insert to anon with check (char_length(name) < 50);

-- Contact messages are server-side inserted via Supabase Service Role Key (bypasses RLS)
-- No anon read/write permissions on contact_messages
