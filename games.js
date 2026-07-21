/* ===================================================================
   Ziggy's Brain Garden — mini games
   Memory Match · Pattern Pop (Simon) · Odd One Out · Shape Sorter ·
   Count & Tap
   =================================================================== */

function shuffle(arr){
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function pick(arr, n){ return shuffle(arr).slice(0, n); }
function randInt(min, max){ return Math.floor(Math.random() * (max - min + 1)) + min; }

/* =================================================================
   1) MEMORY MATCH
   ================================================================= */
const MemoryGame = (() => {
  let cols = 4, totalPairs = 4, pairsFound = 0, moves = 0;
  let firstCard = null, secondCard = null, lock = false;

  function start(sizeKey){
    const map = { "2x4": { pairs: 4, cols: 4 }, "3x4": { pairs: 6, cols: 4 }, "4x4": { pairs: 8, cols: 4 } };
    const cfg = map[sizeKey] || map["2x4"];
    totalPairs = cfg.pairs; cols = cfg.cols;
    pairsFound = 0; moves = 0; firstCard = null; secondCard = null; lock = false;

    document.getElementById("memoryMoves").textContent = "0";
    document.getElementById("memoryPairs").textContent = "0";
    document.getElementById("memoryTotalPairs").textContent = totalPairs;

    const emojis = pick(GAME_EMOJI.memory, totalPairs);
    const deck = shuffle([...emojis, ...emojis]);

    const grid = document.getElementById("memoryGrid");
    grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    grid.innerHTML = "";

    deck.forEach((emoji) => {
      const card = document.createElement("button");
      card.className = "memory-card";
      card.dataset.emoji = emoji;
      card.innerHTML = `
        <div class="memory-card-inner">
          <div class="memory-face back">❓</div>
          <div class="memory-face front">${emoji}</div>
        </div>`;
      card.addEventListener("click", () => onFlip(card));
      grid.appendChild(card);
    });

    App.goTo("screen-game-memory");
  }

  function onFlip(card){
    if (lock || card.classList.contains("flipped") || card.classList.contains("matched")) return;
    card.classList.add("flipped");
    App.sfxTap(520);

    if (!firstCard){ firstCard = card; return; }
    secondCard = card;
    lock = true;
    moves++;
    document.getElementById("memoryMoves").textContent = moves;

    if (firstCard.dataset.emoji === secondCard.dataset.emoji){
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");
      pairsFound++;
      document.getElementById("memoryPairs").textContent = pairsFound;
      App.sfxCorrect();
      resetTurn();
      if (pairsFound === totalPairs) finish();
    } else {
      App.sfxWrong();
      setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetTurn();
      }, 750);
    }
  }

  function resetTurn(){ firstCard = null; secondCard = null; lock = false; }

  function finish(){
    const stars = moves <= totalPairs + 2 ? 3 : moves <= totalPairs + 6 ? 2 : 1;
    setTimeout(() => {
      App.showModal({
        emoji: "🧠",
        title: "All matched!",
        body: `You finished in ${moves} moves.`,
        stars,
        onAgain: () => start(cols === 4 && totalPairs === 4 ? "2x4" : totalPairs === 6 ? "3x4" : "4x4")
      });
    }, 300);
  }

  return { start };
})();

/* =================================================================
   2) PATTERN POP (Simon-style sequence memory)
   ================================================================= */
const SimonGame = (() => {
  const tones = [329.6, 392.0, 440.0, 523.3];
  let sequence = [], userStep = 0, level = 0, accepting = false;
  const pads = () => document.querySelectorAll(".simon-pad");
  const levelEl = document.getElementById("simonLevel");
  const bestEl = document.getElementById("simonBest");
  const startBtn = document.getElementById("simonStart");

  function best(){ return Number(localStorage.getItem("bg_simon_best") || 0); }
  function setBest(v){ localStorage.setItem("bg_simon_best", String(v)); bestEl.textContent = v; }

  function init(){
    bestEl.textContent = best();
    pads().forEach(p => p.addEventListener("click", () => onPad(Number(p.dataset.pad))));
    startBtn.addEventListener("click", startGame);
  }

  function startGame(){
    sequence = []; level = 0; accepting = false;
    startBtn.textContent = "▶ Restart";
    nextRound();
  }

  function nextRound(){
    level++;
    levelEl.textContent = level;
    sequence.push(randInt(0, 3));
    userStep = 0;
    accepting = false;
    playSequence();
  }

  function playSequence(){
    let i = 0;
    const interval = setInterval(() => {
      if (i >= sequence.length){
        clearInterval(interval);
        accepting = true;
        return;
      }
      lightPad(sequence[i]);
      i++;
    }, 700);
  }

  function lightPad(idx){
    const pad = document.querySelector(`.simon-pad[data-pad="${idx}"]`);
    if (!pad) return;
    pad.classList.add("lit");
    App.beep(tones[idx], 0.28, "sine", 0.16);
    setTimeout(() => pad.classList.remove("lit"), 380);
  }

  function onPad(idx){
    if (!accepting) return;
    lightPad(idx);
    if (sequence[userStep] === idx){
      userStep++;
      if (userStep === sequence.length){
        accepting = false;
        App.sfxCorrect();
        setTimeout(nextRound, 600);
      }
    } else {
      accepting = false;
      App.sfxWrong();
      App.mascotSad();
      const finalLevel = level - 1;
      if (finalLevel > best()) setBest(finalLevel);
      startBtn.textContent = "▶ Start";
      setTimeout(() => {
        App.showModal({
          emoji: finalLevel >= 5 ? "🌟" : "🎵",
          title: finalLevel > 0 ? `You reached level ${finalLevel}!` : "Nice try!",
          body: "Watch closely and try again!",
          stars: finalLevel >= 8 ? 3 : finalLevel >= 4 ? 2 : finalLevel >= 1 ? 1 : 0,
          onAgain: startGame
        });
      }, 300);
    }
  }

  return { init };
})();

/* =================================================================
   3) ODD ONE OUT
   ================================================================= */
const OddGame = (() => {
  let size = 3, round = 0, score = 0, totalRounds = 8;

  function start(sizeVal){
    size = sizeVal; round = 0; score = 0;
    document.getElementById("oddScore").textContent = "0";
    App.goTo("screen-game-odd");
    nextRound();
  }

  function nextRound(){
    round++;
    if (round > totalRounds){ return finish(); }
    document.getElementById("oddRound").textContent = round;

    const pool = shuffle(GAME_EMOJI.oddOne);
    const base = pool[0];
    let odd = pool[1];
    if (odd === base) odd = pool[2];

    const cells = size * size;
    const oddIndex = randInt(0, cells - 1);

    const grid = document.getElementById("oddGrid");
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.innerHTML = "";

    for (let i = 0; i < cells; i++){
      const tile = document.createElement("button");
      tile.className = "odd-tile";
      tile.textContent = i === oddIndex ? odd : base;
      tile.addEventListener("click", () => onTap(tile, i === oddIndex));
      grid.appendChild(tile);
    }
  }

  function onTap(tile, isCorrect){
    if (isCorrect){
      tile.classList.add("correct-flash");
      score++;
      document.getElementById("oddScore").textContent = score;
      App.sfxCorrect();
      setTimeout(nextRound, 500);
    } else {
      tile.classList.add("wrong-flash");
      App.sfxWrong();
      App.mascotSad();
      setTimeout(() => tile.classList.remove("wrong-flash"), 400);
    }
  }

  function finish(){
    const stars = score >= 7 ? 3 : score >= 5 ? 2 : score >= 3 ? 1 : 0;
    App.showModal({
      emoji: "🔍",
      title: "Round complete!",
      body: `You found ${score} out of ${totalRounds}.`,
      stars,
      onAgain: () => start(size)
    });
  }

  return { start };
})();

/* =================================================================
   4) SHAPE SORTER
   ================================================================= */
const SortGame = (() => {
  let pieces = [], score = 0, picked = null, remaining = 0;

  function start(){
    score = 0;
    document.getElementById("sortScore").textContent = "0";
    pieces = pick(GAME_EMOJI.sortShapes, 6);
    remaining = pieces.length;
    picked = null;

    const tray = document.getElementById("sortTray");
    tray.innerHTML = "";
    pieces.forEach((emoji, i) => {
      const btn = document.createElement("button");
      btn.className = "sort-piece";
      btn.textContent = emoji;
      btn.dataset.emoji = emoji;
      btn.dataset.idx = i;
      btn.addEventListener("click", () => onPick(btn));
      tray.appendChild(btn);
    });

    const bins = document.getElementById("sortBins");
    bins.innerHTML = "";
    shuffle(pieces).forEach(emoji => {
      const bin = document.createElement("button");
      bin.className = "sort-bin";
      bin.textContent = emoji;
      bin.dataset.emoji = emoji;
      bin.addEventListener("click", () => onBin(bin));
      bins.appendChild(bin);
    });

    App.goTo("screen-game-sort");
  }

  function onPick(btn){
    if (btn.classList.contains("used")) return;
    document.querySelectorAll(".sort-piece").forEach(p => p.classList.remove("picked"));
    btn.classList.add("picked");
    picked = btn;
    App.sfxTap(500);
  }

  function onBin(bin){
    if (!picked || bin.classList.contains("filled")) return;
    if (picked.dataset.emoji === bin.dataset.emoji){
      bin.classList.add("filled");
      picked.classList.add("used");
      picked.classList.remove("picked");
      picked = null;
      score++;
      remaining--;
      document.getElementById("sortScore").textContent = score;
      App.sfxCorrect();
      if (remaining === 0) finish();
    } else {
      bin.classList.add("wrong-flash");
      App.sfxWrong();
      App.mascotSad();
      setTimeout(() => bin.classList.remove("wrong-flash"), 400);
    }
  }

  function finish(){
    setTimeout(() => {
      App.showModal({
        emoji: "🧺",
        title: "All sorted!",
        body: "Every shape found its home!",
        stars: 3,
        onAgain: start
      });
    }, 300);
  }

  return { start };
})();

/* =================================================================
   5) COUNT & TAP
   ================================================================= */
const CountGame = (() => {
  let score = 0, round = 0, totalRounds = 8;

  function start(){
    score = 0; round = 0;
    document.getElementById("countScore").textContent = "0";
    App.goTo("screen-game-count");
    nextRound();
  }

  function nextRound(){
    round++;
    if (round > totalRounds) return finish();

    const emoji = pick(GAME_EMOJI.countObjects, 1)[0];
    const n = randInt(2, 9);
    document.getElementById("countDisplay").innerHTML = emoji.repeat(n);

    const choices = new Set([n]);
    while (choices.size < 4){
      choices.add(randInt(Math.max(1, n - 3), Math.min(10, n + 3)));
    }
    const choiceArr = shuffle([...choices]);

    const wrap = document.getElementById("countChoices");
    wrap.innerHTML = "";
    choiceArr.forEach(val => {
      const btn = document.createElement("button");
      btn.className = "count-choice";
      btn.textContent = val;
      btn.addEventListener("click", () => onChoice(val === n, btn));
      wrap.appendChild(btn);
    });
  }

  function onChoice(correct, btn){
    if (correct){
      btn.style.background = "var(--green)";
      score++;
      document.getElementById("countScore").textContent = score;
      App.sfxCorrect();
      setTimeout(nextRound, 500);
    } else {
      btn.style.background = "#ff8080";
      App.sfxWrong();
      App.mascotSad();
    }
  }

  function finish(){
    const stars = score >= 7 ? 3 : score >= 5 ? 2 : score >= 3 ? 1 : 0;
    App.showModal({
      emoji: "🔢",
      title: "Counting complete!",
      body: `You got ${score} out of ${totalRounds} right.`,
      stars,
      onAgain: start
    });
  }

  return { start };
})();

/* ---------------- Wiring ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-memory-size]").forEach(btn => {
    btn.addEventListener("click", () => MemoryGame.start(btn.dataset.memorySize));
  });
  document.querySelectorAll("[data-odd-size]").forEach(btn => {
    btn.addEventListener("click", () => OddGame.start(Number(btn.dataset.oddSize)));
  });

  SimonGame.init();

  document.querySelector('[data-nav="game-sort"]').addEventListener("click", SortGame.start);
  document.querySelector('[data-nav="game-count"]').addEventListener("click", CountGame.start);
});
