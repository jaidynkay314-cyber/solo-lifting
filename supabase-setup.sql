-- Solo Lifting shared board. Paste this whole file into Supabase > SQL Editor > New query, then Run.

create table if not exists hunters (
  id text primary key,
  name text not null,
  title text,
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
