# DATABASE_SCHEMA.md (Supabase / PostgreSQL)

> Philosophy: static content (projects, story, doors) lives in typed files for speed. The DB stores **dynamic data**: contact messages, analytics events, and optionally projects if you later want a CMS. Section 4 gives an optional CMS-ready schema.

## 1. Entities
```
contact_messages ─┐
                  ├─ (no FK; independent)
events            ─┘
projects ─< project_tags >─ tags        (optional CMS)
projects >─ categories
```

## 2. Core SQL
```sql
-- extensions
create extension if not exists "pgcrypto";

-- enums
create type message_status as enum ('new','notified','replied','archived','spam');
create type project_need   as enum ('web','app','uiux','graphic','photo','question','other');

-- contact messages
create table public.contact_messages (
  id            uuid primary key default gen_random_uuid(),
  need          project_need not null,
  name          text not null check (char_length(name) between 2 and 80),
  email         text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  message       text not null check (char_length(message) between 10 and 2000),
  budget        text,
  consent       boolean not null default false,
  ip_hash       text,                 -- sha256(ip + salt), never raw IP
  user_agent    text,
  status        message_status not null default 'new',
  created_at    timestamptz not null default now(),
  replied_at    timestamptz
);
create index on public.contact_messages (status, created_at desc);

-- lightweight analytics events (optional; Vercel Analytics covers most)
create table public.events (
  id          bigint generated always as identity primary key,
  name        text not null,          -- hire_click, resume_download, door_open, contact_submit
  path        text,
  meta        jsonb default '{}'::jsonb,
  session_id  text,
  created_at  timestamptz not null default now()
);
create index on public.events (name, created_at desc);
```

## 3. Row Level Security
```sql
alter table public.contact_messages enable row level security;
alter table public.events           enable row level security;

-- No public policies: all writes happen server-side with the service-role key.
-- (Service role bypasses RLS.) Never expose service key to the client.
-- If events must be written from the client, add an insert-only policy:
create policy "anon can insert events" on public.events
  for insert to anon with check (char_length(name) < 50);
```

## 4. Optional CMS Tables (v2)
```sql
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  blurb text,
  cover_image text,          -- e.g. /images/doors/web.png
  accent text,               -- hex
  sort_order int default 0
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  slug text unique not null,
  title text not null,
  summary text not null,
  role text, year int,
  cover_image text,
  gallery text[] default '{}',
  stack text[] default '{}',
  live_url text, repo_url text,
  body_mdx text,
  featured boolean default false,
  published boolean default false,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table public.tags (id serial primary key, name text unique not null);
create table public.project_tags (
  project_id uuid references public.projects(id) on delete cascade,
  tag_id int references public.tags(id) on delete cascade,
  primary key (project_id, tag_id)
);

alter table public.categories enable row level security;
alter table public.projects   enable row level security;
create policy "public read categories" on public.categories for select using (true);
create policy "public read published projects" on public.projects for select using (published = true);
```

## 5. Typed Content Shapes (v1 files)
```ts
// src/content/types.ts
export type Door = { slug: string; title: string; blurb: string; image: string; accent: string };
export type StoryItem = {
  type: 'work' | 'education'; start: string; end: string | 'Now';
  title: string; org: string; location?: string; bullets: string[];
};
export type Project = {
  slug: string; category: Door['slug']; title: string; summary: string;
  role: string; year: number; stack: string[]; tags: string[];
  cover: string; gallery: string[]; live?: string; repo?: string;
  sections: { heading: string; body: string }[];
};
```

## 6. Retention & Privacy
- Delete `contact_messages` older than 24 months (scheduled function).
- Store only hashed IP. Provide deletion on request via email.
- Backups: Supabase daily (free tier: 7 days).
