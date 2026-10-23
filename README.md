# Solo Lifting

Daily quest gym tracker for the 4-day upper/lower machine split. A static web app that installs to a phone home screen, works offline, and keeps all data on the phone.

## Quick guide

### 1. Put it on GitHub Pages (one time, about 5 minutes)

1. Sign in at github.com and click **New repository**.
2. Name it `solo-lifting`, set it to **Public** (free Pages needs a public repo; no workout data is ever stored in it), and click **Create repository**.
3. Click **uploading an existing file**, drag in every file from this folder, and click **Commit changes**.
4. Go to **Settings**, then **Pages**. Under **Build and deployment**, set Source to **Deploy from a branch**, Branch to **main** and folder to **/ (root)**, then **Save**.
5. Wait a minute or two. The page shows your address: `https://<your-username>.github.io/solo-lifting/`

### 2. Install on a phone

- **Android (Chrome):** open the address, tap **⋮**, then **Install app** (or **Add to home screen**, then **Install**). It opens full screen as its own app.
- **iPhone (Safari):** open the address, tap **Share**, then **Add to Home Screen**.
- Tap your name on the toggle once. The app remembers it.

Each phone keeps its own log. Jaidyn's phone holds Jaidyn's data and Paris's phone holds Paris's. Both profiles exist on every phone, so one phone can log for both if needed.

### 3. Backups

Records tab, then **Export backup** saves a `.json` file. Keep it in Google Drive. **Restore from file** merges a backup back in (the newer copy of each session wins, so nothing is lost). Export every few weeks, and always before changing phones.

### 4. Trend analysis

Records tab, then **Export CSV** gives one row per set and one per cardio session for the selected person. Send it to Claude for analysis.

### 5. Updating the app

Upload the changed files to the repo (replacing the old ones) and, in `sw.js`, bump `VERSION` (for example `solo-lifting-v2`). Phones pick up the new version the next time the app is opened, then show it on the open after that. Workout data is not affected by updates.

## Technical details

**Files**

| File | Purpose |
|---|---|
| `index.html` | The whole app: markup, styles and script in one file |
| `manifest.webmanifest` | Install metadata (name, icons, standalone display) |
| `sw.js` | Service worker: caches the app shell, serves from cache, refreshes in the background |
| `icon-192.png`, `icon-512.png`, `icon-512-maskable.png` | Home-screen icons |

**Storage:** `localStorage` key `liftlog.v1`, holding `{ sessions, names, profile }`. The app calls `navigator.storage.persist()` to ask the browser not to evict it. Nothing leaves the phone.

**Session key:** `<profile>_<YYYY-MM-DD>_<day>`, where profile is `j` or `p` and day is `UA`, `LA`, `UB`, `LB`, `FR` or `WK`.

**Session body**

```json
{
  "profile": "j", "date": "2026-10-26", "day": "UA", "ts": 1793000000000,
  "ex": { "chest-press": [ { "w": 40, "r": 12 }, { "w": 40, "r": 11 } ] },
  "extra": ["cable-curl"],
  "cardio": { "walk": 5, "run": 10, "dist": 2.1, "kcal": 160 }
}
```

`w` is kg (null or 0 shows as bodyweight), `r` is reps. `extra` lists side-quest exercises added from another day. Empty sessions are deleted automatically.

**Program:** defined in the `PROGRAM` object at the top of the script. Each exercise is `[id, name, sets, repLow, repHigh]`. Keep ids stable so history carries over; rename the display name freely.

**Rules**

- Up a plate: shown when last session hit `repHigh` on every target set.
- Quest cleared: every program exercise has its target number of sets logged, and cardio total time meets the day's minimum (10 min Mon to Thu, 15 min Fri and weekend).
- XP: 10 per logged set, 2 per cardio minute, 50 per cleared quest.
- Level: reaching level L+1 needs 50 x L x (L+1) total XP. Rank: E (1+), D (5+), C (10+), B (20+), A (35+), S (50+).
- Countdown runs to local midnight. The Penalty Zone line rotates by date.

**CSV columns:** `type, person, date, day, item, set, weight_kg, reps, walk_min, run_min, total_min, distance_km, pace_min_per_km, kcal`

**Backup format:** `{ app: "lift-log", version: 2, exported, names, sessions }`. Restore only accepts keys matching the session key pattern above.
