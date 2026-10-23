-- Solo Lifting v4 update: custom programs and shared custom exercises.
-- Paste into Supabase > SQL Editor > New query, then Run. Safe to run more than once.

alter table hunters add column if not exists program jsonb;

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
