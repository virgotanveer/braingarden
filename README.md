# 🌟 Minha's Garden

A stylish, installable web app of brain-training games and general-knowledge
flashcards for kids ages 3–10. Pure HTML/CSS/JS — no build step, no backend,
works fully offline once installed as a PWA.

## What's inside

**👋 Multiple child profiles** — each profile (pick a name + animal avatar)
gets its own stars, levels, badges, streak, and shop items, kept completely
separate. A "Who's Playing?" screen shows on first launch and whenever
switching; a small avatar button in the top bar switches profiles anytime.

**9 brain games, each with 10 levels (ages ~3 to 10)** so there's always a
next challenge instead of the same difficulty on repeat:
- 🧠 Memory Match — flip-and-match pairs; later levels add a countdown timer
- 🎵 Pattern Pop — Simon-style sequence memory (climbs infinitely, not capped at 10)
- 🔍 Odd One Out — spot-the-different-sticker attention game; later levels add a per-round timer
- 🧺 Shape Sorter — match shapes to their basket; later levels add a countdown
- 🔢 Count & Tap — counting, then bridges into visual addition/subtraction/multiplication
- 🧩 **Shadow Match** — match colorful objects to their silhouette; a jigsaw-style spatial puzzle
- 🧮 Math Quiz — real arithmetic: adding/subtracting, times tables, division, and two-step word problems
- 🔗 Number Patterns — fill in the missing number in a sequence (skip-counting, counting down, doubling patterns)
- 🔤 Word Scramble — tap letters in order to spell words, from 3-letter words up to "MULTIPLICATION"

Every level records a 1-3 star best score, and the next level unlocks only
once the current one is passed. **Math Quiz, Number Patterns, and the
flashcard Quiz** now show a "Let's Review!" screen listing anything missed,
with the correct answer, before the results screen — so a wrong guess
becomes a quick lesson instead of just a lower score.

**14 flashcard decks** (Animals, Fruits & Veggies, Colors & Shapes, Numbers,
Alphabet, Body Parts, Vehicles, Science & Space, Countries & Flags, Jobs &
Helpers, Times Tables, World Capitals, Science Explorers, **My Feelings**)
in two modes:
- 📚 Browse — flip cards to reveal the answer + a fun fact
- ❓ Quiz — multiple-choice quiz for each deck

**🎬 A curated Video Library** — 11 hand-picked educational videos across 6
categories, from well-established children's channels: Super Simple Songs,
SciShow Kids, National Geographic Kids, and Sesame Street. See "About the
Video Library" below — this is not a YouTube search, and it's worth reading
before you deploy.

**✍️ Writing & Time practice:**
- Letter & Number Tracing — freehand canvas practice tracing over a faint guide character, for all 26 letters + 0-9
- Telling Time — read an analog clock, 10 levels from "o'clock" up to elapsed-time word problems
- Coin Counting — add up pennies/nickels/dimes/quarters, 10 levels up to mixed big totals

**🔊 Read-aloud support** — flashcards, math questions, telling-time/coin
prompts, and flashcard-quiz choices can be read aloud via the browser's
built-in text-to-speech (works offline, no external service). Toggle it in
Settings.

**🏅 Streaks, badges & a growing garden** — a daily play streak, 13
unlockable badges, and a home-screen garden that visibly grows (seed →
sprout → blooming tree) as total stars add up.

**🛍️ Ziggy's Shop** — spend stars on cosmetic colors and accessories for
the mascot (purely cosmetic, no gameplay advantage — this keeps it a reward
loop rather than pay-to-win pressure). Accessible from the shopping-bag icon
in the top bar.

**👋 Parent Dashboard** — behind a simple "solve this addition problem"
gate: stars, streak, time in app, level progress per game, earned badges (all
for whichever profile is currently active), and buttons to **export/import a
progress backup** as a JSON file, or reset that profile's progress.

Kids earn ⭐ stars for completing games/quizzes, saved locally on the device.
A little star mascot ("Ziggy") reacts to right/wrong answers, and everything
is chunky-button, big-emoji, easy-to-tap for small hands.

## About the Video Library — please read before deploying

Every video is a **specific, individually chosen YouTube video ID** hardcoded
in `data.js` — there is no search box, no YouTube Data API call, and no
"related videos" browsing inside the app. This was a deliberate choice: a
live search or API-driven feed could surface anything matching a keyword,
which isn't acceptable for a young child's app. A short whitelist that a
human has actually looked at is the safer trade-off, even though it means
fewer videos.

Some technical choices that reduce (but can't eliminate) the chance of a
child wandering off to unrelated content:
- Embeds use `youtube-nocookie.com`, which reduces tracking and limits
  YouTube's end-of-video suggestions to the same channel rather than the
  wider platform.
- The player screen tears down the video (removes the iframe) the instant
  the "Back" button is tapped, so nothing keeps playing in the background.
- A short "we hand-picked these" note is shown on both the category and
  player screens.

**What this can't do:** it can't guarantee a video stays appropriate forever
— channels occasionally get hacked, videos get re-edited, or YouTube changes
how its player behaves. Please treat the starter list as a first draft:
watch each video yourself before handing the app to a child, and remove
anything you're not comfortable with. If you add more videos later, follow
the same rule that was used here — pick one specific, known video from a
channel you trust, and paste in its ID; never wire up a search query.

## Deploying to GitHub Pages

1. Create a new GitHub repository (or use an existing one).
2. Upload **every file in this folder** (all the `.js` files, `index.html`,
   `style.css`, `manifest.json`, `service-worker.js`, and the `icons/`
   folder) to the repo root — keep the folder structure exactly as-is.
3. In the repo, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to "Deploy from a branch",
   pick your branch (e.g. `main`) and folder `/ (root)`, then **Save**.
5. Wait a minute, then visit `https://<your-username>.github.io/<repo-name>/`.

That's it — no build tools, npm, or server needed. Everything is relative
paths, so it works whether it's served from a domain root or a repo subpath.

## Mobile "install as an app" (PWA)

Once deployed, visiting the site on a phone:
- **Android/Chrome:** a banner offers "Install"; or use the browser menu →
  "Add to Home screen".
- **iPhone/Safari:** tap Share → "Add to Home Screen".

After installing, the app opens full-screen with its own icon and works
**offline** — the service worker caches everything on first visit.

## How profiles & storage work (for anyone extending this later)

Almost everything is namespaced per child profile through a small
`Storage.get/set` wrapper in `profiles.js` — it prefixes every key with the
active profile's id (e.g. `p_abc123_bg_stars`) so siblings never see each
other's stars or levels. Only the profile list itself, which profile is
currently active, and the one-time "install banner dismissed" flag stay
un-namespaced.

If you're upgrading from an earlier version of this app that didn't have
profiles, don't worry — the first profile ever created automatically
inherits any progress that was saved under the old un-namespaced keys.

If you add a new feature that needs to remember something per child, always
go through `Storage.get("bg_your_key")` / `Storage.set(...)`, never raw
`localStorage` — otherwise it'll leak across profiles.

## Updating content later

- All flashcard/game content, and every level's difficulty settings, live
  in `data.js` — add more emoji entries, whole new decks, or extra levels
  there without touching any other file.
- `profiles.js` handles profiles and the `Storage` namespacing wrapper —
  load this before every other script. `levels.js` holds the shared
  level-picker/progress system used by every leveled game. `games.js` has
  Memory Match, Pattern Pop, Odd One Out, Shape Sorter and Count & Tap.
  `mathgames.js` has Math Quiz, Number Patterns and Word Scramble.
  `timemoney.js` has Telling Time and Coin Counting. `tracing.js` has the
  letter/number tracing tool. `shadow.js` has the Shadow Match puzzle.
  `videos.js` renders the Video Library from `VIDEO_LIBRARY` in `data.js`.
  `progress.js` handles badges and the home-screen garden. `parent.js`
  handles Settings, the parent gate, and the dashboard. `shop.js` handles
  Ziggy's Shop and mascot customization. `review.js` shows the "missed
  questions" recap screen.
- If you edit any cached file, bump `CACHE_NAME` in `service-worker.js`
  (e.g. `brain-garden-v6`) so returning visitors get the fresh version
  instead of an old cached copy.

## A note on the Parent Dashboard gate

The "solve this addition problem" gate in front of Settings → Parent Zone
is deliberately lightweight — it's meant to stop a young child from
wandering into Reset/Export, not to be real security. Anyone older than
about 7-8 could solve it. If you want a stronger barrier, swap the gate
question in `parent.js` (`ParentZone.newGateProblem`) for a PIN of your
choosing.

## Older Android / Android 5 compatibility

A few fixes went in specifically for older devices:

- **Country flags weren't showing country names.** Flag emoji (and other
  compound emoji like the job-icons in "Jobs & Helpers") are some of the
  least reliably-rendered characters on Android — this isn't only an
  old-device problem; Android's emoji font has historically been
  inconsistent about flags on many versions. The **World Capitals** deck now
  always shows the country name as real text alongside the flag, so the
  card still makes sense even if the flag glyph itself doesn't render.
  (I didn't do this for the "Countries & Flags" or "Jobs & Helpers" decks,
  since in those decks the picture *is* the question being asked — adding
  the text there would just show the answer. If flags/job-icons are
  rendering as blank boxes for you, that's a real limitation of those two
  decks on affected devices; let me know if you'd like them reworked.)
- **Removed a hard syntax-error risk.** A few badge conditions used
  JavaScript optional chaining (`?.`), which needs a 2020-era JS engine.
  On an older WebView that doesn't recognize it, that one bad line would
  have failed to parse and broken the *entire app*, not just badges. It's
  now written the old-fashioned way (`a && a.b`) so it parses everywhere.
- **CSS Grid / flexbox `gap` / `aspect-ratio` fallbacks.** These are the
  three CSS features the whole layout leans on most, and none of them
  existed in the browser engine Android 5 originally shipped with (2014).
  There are now `@supports` fallback rules — invisible to modern browsers —
  that switch to plain flexbox-with-margins and fixed heights if the
  browser doesn't understand the newer syntax, so squares/cards/the video
  player can't silently collapse to zero height.

**One important caveat:** Android 5.0+ can actually receive WebView updates
through the Play Store independently of the Android OS version — so how
old the *actual rendering engine* is depends on whether that specific
device kept getting WebView updates, not just the "Android 5" label. If
you're still seeing problems after these fixes, it's worth checking Play
Store → Android System WebView → whether an update is available for that
device. There's a deeper (and much larger) fix available if needed: this
app's CSS relies heavily on CSS custom properties (`var(--color)`), which
needs a 2016-era browser at minimum. If colors/theming look broken (not
just missing pictures), that's the likely cause, and let me know — it would
mean rewriting the whole stylesheet without variables.

## Browser support

Otherwise, works in all modern mobile and desktop browsers. No external JS
frameworks — just vanilla HTML/CSS/JS, so it loads fast even on older phones.
