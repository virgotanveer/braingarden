# 🌟 Ziggy's Brain Garden

A stylish, installable web app of brain-training games and general-knowledge
flashcards for kids ages 3–8. Pure HTML/CSS/JS — no build step, no backend,
works fully offline once installed as a PWA.

## What's inside

**5 brain games**
- 🧠 Memory Match — flip-and-match pairs (3 difficulty levels)
- 🎵 Pattern Pop — Simon-style sequence memory
- 🔍 Odd One Out — spot-the-different-sticker attention game
- 🧺 Shape Sorter — match shapes to their basket
- 🔢 Count & Tap — counting practice

**10 flashcard decks** (Animals, Fruits & Veggies, Colors & Shapes, Numbers,
Alphabet, Body Parts, Vehicles, Science & Space, Countries & Flags, Jobs &
Helpers) in two modes:
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

- All flashcard/game content lives in `data.js` — add more emoji entries or
  whole new decks there without touching any other file.
- If you edit any cached file, bump `CACHE_NAME` in `service-worker.js`
  (e.g. `brain-garden-v2`) so returning visitors get the fresh version
  instead of an old cached copy.

## Browser support

Works in all modern mobile and desktop browsers. No external JS frameworks —
just vanilla HTML/CSS/JS, so it loads fast even on older phones.
