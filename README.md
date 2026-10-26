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

### Updating to v6 (quest points, quest days, the Vault)

No database changes this time.

1. Upload everything except `config.js`. That's `index.html`, `sw.js`, `README.md` and the whole `cards` folder (`cards/cards.js`, `cards/img`, `cards/thumb`).
   - GitHub's web upload takes at most 100 files at a time. Do `cards/img` in two goes and `cards/thumb` in two goes, or use GitHub Desktop.
2. Phones show **Update available**. Tap it.

What changes for everyone:
- Every set needs its diamond tapped before it counts.
- Days clear on points.
- Saturday and Sunday are separate days.
- Mon to Fri stay quest days until you change them in My program.
- Past days are re-scored with the new rules. Some days that missed before may now count, such as a sport day.
- Everyone gets loot boxes for their history so far, plus a Blessed launch box.

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

- **Quest:** today's quest, points bar, countdown, weekly boss, cardio and sets, plus anything extra (**+ Add exercise, sport or activity**). Pick the cardio machine with the buttons on the cardio card. Tap the diamond next to a set to confirm it; an empty set uses the grey numbers from last time. The strip at the bottom shows the last 7 days: cleared, missed, rest or excused.
- **Fuel** (card on the Quest tab, tap **+ Food**): log calories and protein through the day.
  - **Ways to log:** quick add, your saved foods, recent foods, the meal-plan foods, or "Copy yesterday".
  - **Goals:** set a calorie goal ("stay under" or "reach at least") and a protein goal. Hitting each is 10 XP and counts towards the Protein, Calories and Food log achievements. A "stay under" day only counts once at least half the target is logged.
  - **On the board:** others see only "Protein ✓ / Calories ✓", never your numbers.
- **Vault:**
  - **Opening a box:** tap a loot box (the glowing tied cube). It bursts open and a reel spins and stops on your prize: a card pack, a frame or a title.
  - **Packs:** packs can be opened straight away or saved. Swipe across the top to tear one open, then swipe the cards away. Drag a card a little way to see the glow of the next card.
  - **Viewing cards:** tap any collected card to see it up close, and tap **Use as picture** to make it your picture on the board.
- **Profile, Appearance:** choose your title (from achievements or loot), your frame, and your picture.
- **Board:** everyone ranked by XP, with today's status (Cleared, Pending, Excused or Penalty Zone), streak, week progress, and an activity feed.
- **Profile:** your title, stats, program summary, achievements and exercise log. Tap anyone on the Board to see theirs, including their program.
- **My program** (Profile, then **Edit**): pick your **quest days** (the ones you commit to) and change any day. Rename it, set the cardio minutes, add, remove or reorder exercises, and change sets and rep ranges. **Create a new exercise** adds one to the shared list for everyone (name, how it's logged, and which stat it feeds). **Reset** puts a day back to the default script.
- **Records:** **Check my log** finds numbers that look like typos, such as 1000 kg. Tap Fix to jump to that day, correct the number, and everything it unlocked by mistake is recalculated away. Also: switch hunter, sound on or off, CSV export, backup and restore.

### Releasing more cards

1. Send Claude the picked art. It comes back as WebP images (`cards/img` at 600×840 and `cards/thumb` at 220×308) plus new rows for `cards/cards.js`.
2. Upload the new images and `cards/cards.js`, and bump `VERSION` in `sw.js`.
3. New cards join the loot pool straight away. Collections are stored by card id, so never rename or reuse an id.

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
| `cards/cards.js`, `cards/img`, `cards/thumb` | Card list and card art (WebP). Add to these to release more cards |
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

- Quest points (`pointsOf`):
  - Each confirmed set: 10 points.
  - Cardio card: 4 points a minute (incline walk 3).
  - Timed activities: 4 points a minute (sport, swim, cycle, row, classes and so on); 3 for incline walk, hike, yard work, dancing and manual work; 2 for walks, dog walks, yoga and stretching.
- Quest cleared:
  - Any day reaching 120 points is cleared, or 180 in the Penalty Zone.
  - Finishing a plan worth at least 120 points also clears it. The Penalty Zone version of the plan route is every set +1 and 25 minutes of cardio.
  - Sessions from before the Saturday/Sunday split (day `WK`) keep the old 60 point target.
- Plan worth: sets × 10 + cardio minutes × 4. The editor flags a plan under 120.
- Quest days:
  - Stored per hunter in `program._sched` as `[{ from, days }]`. Changes apply from the day they're made, so past weeks keep their schedule.
  - The default is Mon to Fri.
  - Only a missed quest day drains XP and starts the Penalty Zone. Other days are optional, and still count as cleared at 120 points.
- Confirmed sets:
  - A set has `ok: false` until its diamond is tapped. Sets logged before v6 have no flag and count.
  - Confirming checks the numbers. It refuses weights over 500 kg, reps over 500 and holds over an hour. It asks first when a weight is more than 1.5× (and 20 kg over) your best, more than 150 kg with no history, more than 50 reps, or more than 5 minutes.
  - Cardio and activity fields over 4 hours (5 hours for activities), 60 km or 3000 kcal aren't saved until you confirm them.
- Bonus exercises (anything added on the day that isn't in the plan) earn XP up to 200 a day.
- Missed quest day (after the hunter's first session, not cleared or excused): -25 XP, and the Penalty Zone begins.
- Penalty Zone: the points target goes up by half (or the plan with every set +1 and 25 min cardio) until a quest is cleared. Penalties never stack. Clearing one gives +25 bonus XP and a Cursed Loot Box.
- Excuse (two taps): no drain, no penalty, streak unbroken.
- XP: 10 per set (program and bonus), 2 per program cardio minute, 50 per cleared quest, 100 per weekly boss win, plus achievement rewards. Bonus training XP (sets 10 each, cardio minutes 2, active and recovery minutes 1) is capped at 200 a day.
- Level: level L+1 needs 50 x L x (L+1) XP. XP can drain, but you never drop below your highest level. Rank: E (1+), D (5+), C (10+), B (20+), A (35+), S (50+).
- Stats start at 10. STR +1 per 6 upper-body sets, AGI +1 per 6 lower-body sets, VIT +1 per 20 cardio or active minutes, END +1 per 6 core sets and per 4 cleared quests. Bonus exercises feed the stat listed against them.
- Weekly boss: one weighted exercise from your own plans, chosen per week (seeded by the Monday date). Past weeks use the plans you actually logged, so editing never rewrites them. Beat your previous best top weight on it that week for +100 XP.
- Personal record: a session's top weight (weighted exercises) or top reps or seconds (bodyweight and holds) beats every earlier session.
- Warnings rotate every 15 seconds with a glitch transition: 22 general lines, 2 per day, plus live ones about your streak, XP to the next level and the gap to the hunter nearest you on the board. The Penalty Zone has its own set.
- Streak: consecutive cleared quests. A missed quest day resets it; rest days and excused days are skipped, and rest-day clears add to it.
- Perfect week and month: every quest day in it cleared.

**Fuel**

- **Daily log row:** keyed `<hunter>_<date>_FOOD`, with body `{ food: { items: [{ id, n, k, p, q }], goal: { k, mode, p } } }`.
  - `q` is the number of serves.
  - `goal` is a snapshot of the hunter's goals that day, so changing goals never rewrites past days.
  - The row syncs like a session. Deleting every item deletes the row.
- **Goals and saved foods:** stored in `hunters.program._fuel = { k, mode: "max" | "min", p, foods: [{ id, n, k, p }] }`.
- **Meal-plan foods:** the `STARTER` list in `index.html`.
- **Replay:** adds 10 XP per goal hit. Food days only count from the hunter's first training session.

**Cards and loot boxes**

- `cards/cards.js` sets `window.SL_CARDS = { sets, cards }`. A card is `{ id, set, no, n, r, st, f, img, alt? }`, with rarity `r` as one of C U R H F S G.
  - Images are `cards/img/<img>.webp` and `cards/thumb/<img>.webp`. The service worker caches them as they're viewed.
  - Glitched cards reuse another card's image.
- Boxes are derived in `replay()`, so every phone agrees:
  - Random: every cleared quest (`q:<date>`) and every level up (`lvl:<L>`, every 5th level is Blessed).
  - Blessed: weekly boss win (`boss:<monday>`), perfect week (`pw:<date>`), plus a one-off `gift:v6`.
  - Cursed: escaping the Penalty Zone (`pz:<date>`).
- Opening a box (`rollLoot`) first rolls a prize tier.

  | Box | Common | Uncommon | Rare | Epic | Legendary |
  |---|---|---|---|---|---|
  | Random | 62% | 25% | 9% | 3% | 1% |
  | Blessed | 0% | 30% | 40% | 22% | 8% |
  | Cursed | 34% | 20% | 18% | 16% | 12% |

  - An Epic or better is guaranteed within 25 boxes.
  - Within the tier, a frame or title you don't own yet comes up about 35% of the time (45% for Cursed). Otherwise the prize is that tier's pack.
- Packs (`PACK`):

  | Tier | Pack | Cards | Last card |
  |---|---|---|---|
  | Common | Hunter (N) | 3 | standard odds |
  | Uncommon | Elite (E) | 5 | standard odds |
  | Rare | Blessed (H) | 5 | Rare or better |
  | Epic | Radiant (D) | 5 | Holo or better |
  | Legendary | Sovereign (M) | 5 | Full Art or better |
  | Common or Uncommon, from Cursed boxes only | Cursed (X) | 3 | cursed odds |

  - Standard card odds: C 60, U 25, R 10, H 3.5, F 1.2, S 0.25, G 0.05.
  - Cursed odds: C 40, U 24, R 18, H 10, F 4, S 3, G 1.
  - Card pity: the last card is at least Holo after 19 packs without one, and at least Secret after 59.
- Cosmetics: `FRAMES` (20, three of them Cursed-only) and `TITLES` (24, four Cursed-only).
  - Equipped loot titles are stored in `hunters.title` as `t:<id>`.
  - The frame and picture are stored in `hunters.program._look = { frame, avatar }`. The picture must be a card the hunter owns.
- Storage: everything lives in a session row keyed `<hunter>_0000-00-00_VAULT`, with body `{ vault: { opened: { <boxId>: { d, at, k, item, packs: [{ t, cards, torn, td }] } }, pity: { h, s, b } } }`.
  - That row syncs like any other session, so no database change is needed.
  - The prize and the pack's cards are rolled and saved the moment the box opens, so closing the app never loses or rerolls them.
  - Cards join the collection when their pack is torn.
- The board feed shows Holo or better pulls and Epic or better frames and titles.
- Bonuses: the first copy of each card adds its rarity's stat bonus (+1, +2, +3, +5, +8, +12, +20). These are shown in gold on the profile and don't count towards stat achievements. Glitched cards add +2% XP each.
- Holo or better pulls appear in the board's activity feed.

**Achievements:** 226 fixed achievements across 31 categories, plus 4 mastery tiers (Initiate, Adept, Master, Grandmaster at 5, 25, 50 and 100 sessions) for every set-based exercise anyone has planned or logged, custom ones included. The default script's 24 machines give 322 to start, and every new exercise logged adds 4 more. They're generated by `cat()` from thresholds. Rarity comes from the estimated days to reach each threshold: Common (up to a week), Uncommon (45 days), Rare (150), Epic (a year), Legendary (two years), Mythic (beyond). XP rewards are 10, 25, 50, 100, 250 and 500 (Level achievements give none). 

**CSV columns:** `type, person, date, day, penalty_day, quest_cleared, excused, item, category, stat, in_plan, set, weight_kg, reps, seconds, walk_min, run_min, total_min, distance_km, pace_min_per_km, kcal`. Types: `lift`, `cardio`, `bonus`, `excused`.
