# Solo Lifting

Daily quest gym tracker with a shared leaderboard. A static web app on GitHub Pages that installs to a phone home screen and works offline at the gym. The shared board runs on a free Supabase database.

Live at: https://jaidynkay314-cyber.github.io/solo-lifting/

## Quick guide

### Connect the shared board (one time, about 10 minutes)

1. Go to supabase.com, sign up (GitHub login works) and click **New project**. Any name, any database password, region **Sydney**. Wait a minute for it to start.
2. Open **SQL Editor**, then **New query**. Paste in all of `supabase-setup.sql` and click **Run**. It should say "Success".
3. Open **Project Settings**, then **API**. Copy the **Project URL** and the **anon public** key.
4. In the GitHub repo, open `config.js`, click the pencil, paste them between the quotes, and commit:
   ```js
   window.SL_CONFIG = {
     url: "https://xxxx.supabase.co",
     key: "eyJ..."
   };
   ```
5. Open the app. The top corner should say **Synced**.

Until this is done, the app still works, but each phone only sees its own hunters ("This phone only").

### Joining

Open the link, then sign in by tapping your name or typing a new one and tapping **Arise**. You stay signed in on that phone. There are no passwords. To switch, use **Records**, then **Switch hunter**.

Install to the home screen:
- **Android:** Chrome, then **⋮**, then **Install app**.
- **iPhone:** Safari, then **Share**, then **Add to Home Screen**.

### Tabs

- **Quest:** today's quest, countdown, weekly boss, cardio, machine sets, and bonus exercises (**+ Add bonus exercise**).
- **Board:** everyone ranked by XP, with today's status (Cleared, Pending, Excused or Penalty Zone), streak, week progress, and an activity feed.
- **Profile:** your title, stats, achievements and machine log. Tap anyone on the Board to see theirs.
- **Records:** switch hunter, sound on or off, CSV export for analysis, backup and restore.

### Updating the app

Upload changed files to the repo, but **never replace `config.js`** (it holds your board keys). In `sw.js`, bump `VERSION` (for example `solo-lifting-v4`). Phones show an **Update available** banner; tap it to switch.

### Free tier note

Supabase pauses free projects after a week with no activity. Daily gym use keeps it awake. If it ever pauses, click **Restore** in the Supabase dashboard; nothing is lost, and phones keep logging offline in the meantime.

## Technical details

**Files**

| File | Purpose |
|---|---|
| `index.html` | The whole app: markup, styles and script |
| `config.js` | Supabase URL and anon key (blank = phone-only mode) |
| `supabase-setup.sql` | Creates the `hunters` and `sessions` tables, update triggers and open access rules |
| `sw.js` | Service worker: caches the app shell, leaves database calls to the network, drives the update banner |
| `manifest.webmanifest`, `icon-*.png` | Install metadata and icons |

**Sync:** each phone keeps a full copy in `localStorage` (key `solo.v2`): `me`, `hunters`, `sessions`, `outbox`, `since`, `sound`. Edits go into an outbox and are upserted to Supabase (`POST /rest/v1/<table>` with `Prefer: resolution=merge-duplicates`) about a second later, retried while offline. Every 45 seconds, and whenever the app is reopened, the phone pulls rows with `updated_at` newer than its last sync. A cleared session is stored as `body = null` so the deletion syncs. Data from the old single-phone version (`liftlog.v1`) is carried over on first sign-in.

**Access:** anyone with the app link can read and write the board. It holds only first names and gym numbers. The anon key is designed to be public; access is controlled by the rules in `supabase-setup.sql`.

**Tables**

- `hunters(id, name, title, updated_at)`: `title` is the equipped achievement id.
- `sessions(key, hunter, date, body jsonb, updated_at)`: `key` is `<hunter>_<YYYY-MM-DD>_<day>`, day being `UA`, `LA`, `UB`, `LB`, `FR` or `WK`.

**Session body**

```json
{
  "profile": "j", "date": "2026-10-26", "day": "UA", "ts": 1793000000000,
  "ex": { "chest-press": [ { "w": 40, "r": 12 } ] },
  "extra": ["cable-curl"],
  "bonus": [ { "id": "pushups", "sets": [ { "r": 20 } ] }, { "id": "run", "min": 20, "km": 3.1 } ],
  "cardio": { "walk": 5, "run": 10, "dist": 2.1, "kcal": 160 },
  "excused": true
}
```

**Program and library:** `PROGRAM` defines the split (`[id, name, sets, repLow, repHigh]`). `LIB` defines bonus exercises (`[id, name, category, type, stat, outdoor]`, where type is `wr` weight x reps, `r` reps, `s` seconds, or `min` minutes with optional km). Keep ids stable so history carries over.

**Everything is derived by replaying history** (`replay(hunterId)`): penalties, XP, levels, streaks, stats, records, boss wins, achievements with unlock dates, and the activity feed. Nothing derived is stored, so rule changes apply retroactively.

**Rules**

- Quest cleared: every program exercise has its target sets, and cardio meets the day's minimum (10 min Mon to Thu, 15 min Fri and weekend).
- Missed weekday (Mon to Fri, after the hunter's first session, not cleared or excused): -25 XP, and the Penalty Zone begins.
- Penalty Zone: every set +1 and 25 min cardio until a quest is cleared. Penalties never stack. Clearing one gives +25 bonus XP.
- Excuse (two taps): no drain, no penalty, streak unbroken.
- XP: 10 per set (program and bonus), 2 per program cardio minute, 50 per cleared quest, 100 per weekly boss win, plus achievement rewards. Bonus training XP (sets 10 each, cardio minutes 2, active and recovery minutes 1) is capped at 200 a day.
- Level: level L+1 needs 50 x L x (L+1) XP. XP can drain, but you never drop below your highest level. Rank: E (1+), D (5+), C (10+), B (20+), A (35+), S (50+).
- Stats start at 10. STR +1 per 6 upper-body sets, AGI +1 per 6 lower-body sets, VIT +1 per 20 cardio or active minutes, END +1 per 6 core sets and per 4 cleared quests. Bonus exercises feed the stat listed against them.
- Weekly boss: one program machine chosen per week (seeded by the Monday date). Beat your previous best top weight on it that week for +100 XP.
- Personal record: a session's top weight on a machine beats every earlier session.
- Streak: consecutive cleared weekday quests. Weekends and excused days are skipped; weekend clears add to it.

**Achievements:** 322 across 55 categories, generated by `cat()` from thresholds. Rarity comes from the estimated days to reach each threshold: Common (up to a week), Uncommon (45 days), Rare (150), Epic (a year), Legendary (two years), Mythic (beyond). XP rewards are 10, 25, 50, 100, 250 and 500 (Level achievements give none). Current split: 14 Common, 68 Uncommon, 46 Rare, 83 Epic, 57 Legendary, 54 Mythic.

**CSV columns:** `type, person, date, day, penalty_day, quest_cleared, excused, item, category, set, weight_kg, reps, seconds, walk_min, run_min, total_min, distance_km, pace_min_per_km, kcal`. Types: `lift`, `cardio`, `bonus`, `excused`.
