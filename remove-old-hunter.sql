-- Remove a duplicate hunter from the shared board.
-- Run step 1 in Supabase: SQL Editor > New query. Check the results, then run step 2 with the right id.

-- STEP 1: list every hunter with how many sessions they have and when they last logged.
select h.id, h.name, h.updated_at,
       count(s.key) filter (where s.body is not null) as sessions,
       max(s.date) as last_session
from hunters h
left join sessions s on s.hunter = h.id
group by h.id, h.name, h.updated_at
order by h.name, sessions desc;

-- STEP 2: replace OLD_ID with the id of the duplicate (the Paris with few or no sessions), then run these two lines.
-- delete from sessions where hunter = 'OLD_ID';
-- delete from hunters where id = 'OLD_ID';
