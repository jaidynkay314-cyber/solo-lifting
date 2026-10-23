-- Solo Lifting shared board (v4, includes custom programs and exercises). Paste this whole file into Supabase > SQL Editor > New query, then Run.

create table if not exists hunters (
  id text primary key,
  name text not null,
  title text,
  program jsonb,               -- custom plan per day, null = default script
  updated_at timestamptz not null default now()
);

create table if not exists sessions (
  key text primary key,          -- <hunter>_<YYYY-MM-DD>_<day>
  hunter text not null,
  date text not null,
  body jsonb,                    -- null means the session was cleared
  updated_at timestamptz not null default now()
);
create index if not exists sessions_updated_at on sessions (updated_at);

-- the server stamps every write, so phones can ask "what changed since..."
create or replace function touch_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;
drop trigger if exists hunters_touch on hunters;
create trigger hunters_touch before insert or update on hunters for each row execute function touch_updated_at();
drop trigger if exists sessions_touch on sessions;
create trigger sessions_touch before insert or update on sessions for each row execute function touch_updated_at();

-- anyone with the app link can read and write the board (first names and gym numbers only)
alter table hunters enable row level security;
alter table sessions enable row level security;
drop policy if exists "board read" on hunters;   create policy "board read" on hunters for select using (true);
drop policy if exists "board add" on hunters;    create policy "board add" on hunters for insert with check (true);
drop policy if exists "board edit" on hunters;   create policy "board edit" on hunters for update using (true);
drop policy if exists "board read" on sessions;  create policy "board read" on sessions for select using (true);
drop policy if exists "board add" on sessions;   create policy "board add" on sessions for insert with check (true);
drop policy if exists "board edit" on sessions;  create policy "board edit" on sessions for update using (true);

create table if not exists exercises (
  id text primary key,
  name text not null,
  type text not null,          -- wr = weight x reps, r = reps, s = seconds
  stat text not null,          -- STR, AGI, VIT or END
  cat text not null default 'Custom',
  created_by text,
  updated_at timestamptz not null default now()
);
drop trigger if exists exercises_touch on exercises;
create trigger exercises_touch before insert or update on exercises for each row execute function touch_updated_at();
alter table exercises enable row level security;
drop policy if exists "board read" on exercises;  create policy "board read" on exercises for select using (true);
drop policy if exists "board add" on exercises;   create policy "board add" on exercises for insert with check (true);
drop policy if exists "board edit" on exercises;  create policy "board edit" on exercises for update using (true);
