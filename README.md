# 🌟 Ziggy's Brain Garden

A stylish, installable web app of brain-training games and general-knowledge
flashcards for kids ages 3–8. Pure HTML/CSS/JS — no build step, no backend,
works fully offline once installed as a PWA.

## What's inside

**8 brain games, each with 10 levels (ages ~3 to 10)** so there's always a
next challenge instead of the same difficulty on repeat:
- 🧠 Memory Match — flip-and-match pairs; later levels add a countdown timer
- 🎵 Pattern Pop — Simon-style sequence memory (climbs infinitely, not capped at 10)
- 🔍 Odd One Out — spot-the-different-sticker attention game; later levels add a per-round timer
- 🧺 Shape Sorter — match shapes to their basket; later levels add a countdown
- 🔢 Count & Tap — counting, then bridges into visual addition/subtraction/multiplication
- 🧮 **Math Quiz** — real arithmetic: adding/subtracting, times tables, division, and two-step word problems
- 🔗 **Number Patterns** — fill in the missing number in a sequence (skip-counting, counting down, doubling patterns)
- 🔤 **Word Scramble** — tap letters in order to spell words, from 3-letter words up to "MULTIPLICATION"

Every level records a 1-3 star best score locally, and the next level
unlocks only once the current one is passed — so progress is visible and
kids have a reason to come back.

**13 flashcard decks** (Animals, Fruits & Veggies, Colors & Shapes, Numbers,
Alphabet, Body Parts, Vehicles, Science & Space, Countries & Flags, Jobs &
Helpers, **Times Tables, World Capitals, Science Explorers**) in two modes:
- 📚 Browse — flip cards to reveal the answer + a fun fact
- ❓ Quiz — multiple-choice quiz for each deck

Kids earn ⭐ stars for completing games/quizzes, saved locally on the device.
A little star mascot ("Ziggy") reacts to right/wrong answers, and everything
is chunky-button, big-emoji, easy-to-tap for small hands.

## Deploying to GitHub Pages

1. Create a new GitHub repository (or use an existing one).
2. Upload **all files in this folder** (`index.html`, `style.css`, `app.js`,
   `games.js`, `flashcards.js`, `data.js`, `manifest.json`,
   `service-worker.js`, and the `icons/` folder) to the repo root — keep the
   folder structure exactly as-is.
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

## Updating content later

- All flashcard/game content, and every level's difficulty settings, live
  in `data.js` — add more emoji entries, whole new decks, or extra levels
  there without touching any other file.
- `levels.js` holds the shared level-picker/progress system used by every
  leveled game. `games.js` has Memory Match, Pattern Pop, Odd One Out,
  Shape Sorter and Count & Tap. `mathgames.js` has Math Quiz, Number
  Patterns and Word Scramble.
- If you edit any cached file, bump `CACHE_NAME` in `service-worker.js`
  (e.g. `brain-garden-v3`) so returning visitors get the fresh version
  instead of an old cached copy.

## Browser support

Works in all modern mobile and desktop browsers. No external JS frameworks —
just vanilla HTML/CSS/JS, so it loads fast even on older phones.
