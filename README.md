# Solo Lifting

Daily quest gym tracker with a shared leaderboard. A static web app on GitHub Pages that installs to a phone home screen and works offline at the gym. The shared board runs on a free Supabase database.

Live at: https://jaidynkay314-cyber.github.io/solo-lifting/

## Quick guide

### Connect the shared board (one time, about 10 minutes)

1. Go to supabase.com, sign up (GitHub login works) and click **New project**. Any name, any database password, region **Sydney**. Wait a minute for it to start.
2. Open **SQL Editor**, then **New query**. Paste in all of `supabase-setup.sql` and click **Run**. It should say "Success".
3. Click **Connect** (or **Project Settings**, then **API Keys**). Copy the **Project URL** and the **publishable** key (`sb_publishable_...`). An older **anon public** key (`eyJ...`) also works.
4. In the GitHub repo, open `config.js`, click the pencil, paste them between the quotes, and commit:
   ```js
   window.SL_CONFIG = {
     url: "https://xxxx.supabase.co",
     key: "sb_publishable_..."
   };
   ```
5. Open the app. The top corner should say **Synced**.

Until this is done, the app still works, but each phone only sees its own hunters ("This phone only").

### Updating to v4 (custom programs)

1. In Supabase, open **SQL Editor**, then **New query**. Paste in all of `supabase-update-v4.sql` and click **Run**.
2. Upload the new files to the repo (everything except `config.js`) and commit.
3. Phones show **Update available**. Tap it.

If the database step is skipped, the app still works, but programs and custom exercises stay on each phone and Records shows a reminder.

### Joining

Open the link, then sign in by tapping your name or typing a new one and tapping **Arise**. You stay signed in on that phone. There are no passwords. To switch, use **Records**, then **Switch hunter**.

Install to the home screen:
- **Android:** Chrome, then **⋮**, then **Install app**.
- **iPhone:** Safari, then **Share**, then **Add to Home Screen**.

### Tabs

- **Quest:** today's quest, countdown, weekly boss, cardio, machine sets, and bonus exercises (**+ Add bonus exercise**).
- **Board:** everyone ranked by XP, with today's status (Cleared, Pending, Excused or Penalty Zone), streak, week progress, and an activity feed.
- **Profile:** your title, stats, program summary, achievements and exercise log. Tap anyone on the Board to see theirs, including their program.
- **My program** (Profile, then **Edit**): change any day. Rename it, set the cardio minutes, add, remove or reorder exercises, and change sets and rep ranges. **Create a new exercise** adds one to the shared list for everyone (name, how it's logged, and which stat it feeds). **Reset** puts a day back to the default script.
- **Records:** switch hunter, sound on or off, CSV export for analysis, backup and restore.

### Updating the app

Upload changed files to the repo, but **never replace `config.js`** (it holds your board keys). In `sw.js`, bump `VERSION` (for example `solo-lifting-v6`). Phones show an **Update available** banner; tap it to switch.

### Free tier note

Supabase pauses free projects after a week with no activity. Daily gym use keeps it awake. If it ever pauses, click **Restore** in the Supabase dashboard; nothing is lost, and phones keep logging offline in the meantime.

## Technical details

**Files**

| File | Purpose |
|---|---|
| `index.html` | The whole app: markup, styles and script |
| `config.js` | Supabase URL and anon key (blank = phone-only mode) |
| `supabase-setup.sql` | Full setup for a new database: `hunters`, `sessions` and `exercises` tables, update triggers and open access rules |
| `supabase-update-v4.sql` | Upgrade for a database made with the earlier setup: adds `hunters.program` and the `exercises` table |
| `sw.js` | Service worker: caches the app shell, leaves database calls to the network, drives the update banner |
| `manifest.webmanifest`, `icon-*.png` | Install metadata and icons |

**Sync:** each phone keeps a full copy in `localStorage` (key `solo.v2`): `me`, `hunters` (with programs), `sessions`, `custom` (shared exercises), `outbox`, `since`, `sinceX`, `sound`. Edits go into an outbox and are upserted to Supabase (`POST /rest/v1/<table>` with `Prefer: resolution=merge-duplicates`) about a second later, retried while offline. Every 45 seconds, and whenever the app is reopened, the phone pulls rows with `updated_at` newer than its last sync. A cleared session is stored as `body = null` so the deletion syncs. Data from the old single-phone version (`liftlog.v1`) is carried over on first sign-in.

**Access:** anyone with the app link can read and write the board. It holds only first names and gym numbers. The anon key is designed to be public; access is controlled by the rules in `supabase-setup.sql`.

**Tables**

- `hunters(id, name, title, program jsonb, updated_at)`: `title` is the equipped achievement id; `program` holds only the days that differ from the default script.
- `exercises(id, name, type, stat, cat, created_by, updated_at)`: shared custom exercises. Ids look like `c-cable-woodchop-x7k2`. Names are checked against the whole list before creating, so there are no duplicates.
- `sessions(key, hunter, date, body jsonb, updated_at)`: `key` is `<hunter>_<YYYY-MM-DD>_<day>`, day being `UA`, `LA`, `UB`, `LB`, `FR` or `WK`.

**Session body**

```json
{
  "profile": "j", "date": "2026-10-26", "day": "UA", "ts": 1793000000000,
  "plan": { "name": "Upper A", "label": "Upper A", "focus": "Push focus", "cardio": 10, "ex": [["chest-press", 3, 8, 12]] },
  "ex": { "chest-press": [ { "w": 40, "r": 12 } ] },
  "extra": ["cable-curl"],
  "bonus": [ { "id": "pushups", "sets": [ { "r": 20 } ] }, { "id": "run", "min": 20, "km": 3.1 } ],
  "cardio": { "walk": 5, "run": 10, "dist": 2.1, "kcal": 160 },
  "excused": true
}
```

**Plans:** each session stores the `plan` it was logged against, so editing a program never changes past quests (sessions from before v4 use the default script). Editing a day updates today's session for that day straight away. A day plan is `{ name, label, focus, cardio, ex: [[id, sets, lo, hi]] }`; for `s` exercises the range is seconds.

**Program and library:** `PROGRAM` defines the default script (`[id, name, sets, repLow, repHigh]`). `LIB` defines bonus exercises (`[id, name, category, type, stat, outdoor]`, where type is `wr` weight x reps, `r` reps, `s` seconds, or `min` minutes with optional km). Keep ids stable so history carries over.

**Everything is derived by replaying history** (`replay(hunterId)`): penalties, XP, levels, streaks, stats, records, boss wins, achievements with unlock dates, and the activity feed. Nothing derived is stored, so rule changes apply retroactively.

**Rules**

- Quest cleared: every exercise in that day's plan has its target sets, and cardio meets the plan's minutes.
- Quest minimum (fairness floor): a plan only counts as a quest if it has at least 12 sets and 10 min cardio (Mon to Thu), 6 sets and 15 min (Fri), or 15 min cardio (weekend). The editor and the Quest tab both flag a plan below it.
- Bonus exercises (anything added on the day that isn't in the plan) earn XP up to 200 a day.
- Missed weekday (Mon to Fri, after the hunter's first session, not cleared or excused): -25 XP, and the Penalty Zone begins.
- Penalty Zone: every set +1 and 25 min cardio until a quest is cleared. Penalties never stack. Clearing one gives +25 bonus XP.
- Excuse (two taps): no drain, no penalty, streak unbroken.
- XP: 10 per set (program and bonus), 2 per program cardio minute, 50 per cleared quest, 100 per weekly boss win, plus achievement rewards. Bonus training XP (sets 10 each, cardio minutes 2, active and recovery minutes 1) is capped at 200 a day.
- Level: level L+1 needs 50 x L x (L+1) XP. XP can drain, but you never drop below your highest level. Rank: E (1+), D (5+), C (10+), B (20+), A (35+), S (50+).
- Stats start at 10. STR +1 per 6 upper-body sets, AGI +1 per 6 lower-body sets, VIT +1 per 20 cardio or active minutes, END +1 per 6 core sets and per 4 cleared quests. Bonus exercises feed the stat listed against them.
- Weekly boss: one weighted exercise from your own plans, chosen per week (seeded by the Monday date). Past weeks use the plans you actually logged, so editing never rewrites them. Beat your previous best top weight on it that week for +100 XP.
- Personal record: a session's top weight (weighted exercises) or top reps or seconds (bodyweight and holds) beats every earlier session.
- Warnings rotate every 9 seconds with a glitch transition: 22 general lines, 2 per day, plus live ones about your streak, XP to the next level and the gap to the hunter nearest you on the board. The Penalty Zone has its own set.
- Streak: consecutive cleared weekday quests. Weekends and excused days are skipped; weekend clears add to it.

**Achievements:** 226 fixed achievements across 31 categories, plus 4 mastery tiers (Initiate, Adept, Master, Grandmaster at 5, 25, 50 and 100 sessions) for every set-based exercise anyone has planned or logged, custom ones included. The default script's 24 machines give 322 to start, and every new exercise logged adds 4 more. They're generated by `cat()` from thresholds. Rarity comes from the estimated days to reach each threshold: Common (up to a week), Uncommon (45 days), Rare (150), Epic (a year), Legendary (two years), Mythic (beyond). XP rewards are 10, 25, 50, 100, 250 and 500 (Level achievements give none). 

**CSV columns:** `type, person, date, day, penalty_day, quest_cleared, excused, item, category, stat, in_plan, set, weight_kg, reps, seconds, walk_min, run_min, total_min, distance_km, pace_min_per_km, kcal`. Types: `lift`, `cardio`, `bonus`, `excused`.
