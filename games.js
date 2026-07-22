/* ===================================================================
   Ziggy's Brain Garden — mini games
   Memory Match · Pattern Pop (Simon) · Odd One Out · Shape Sorter ·
   Count & Tap — all leveled 1-10 via the shared Levels system.
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

/** Wires a home sticker + level-picker screen together. Returns a
 *  `render()` function so a game can refresh lock/star state after
 *  finishing (e.g. right before returning to the picker screen). */
function wireLevelPicker(navKey, gridId, gameKey, totalLevels, subtitleFn, startFn){
  const container = document.getElementById(gridId);
  function render(){ Levels.renderLevelGrid(container, gameKey, totalLevels, subtitleFn, startFn); }
  const trigger = document.querySelector(`[data-nav="${navKey}"]`);
  if (trigger) trigger.addEventListener("click", render);
  render();
  return render;
}

/* =================================================================
   1) MEMORY MATCH
   ================================================================= */
const MemoryGame = (() => {
  let level = 1, cols = 4, totalPairs = 4, pairsFound = 0, moves = 0;
  let firstCard = null, secondCard = null, lock = false;
  let timerId = null, remaining = 0;
  let refreshPicker = null;

  function start(lvl){
    level = lvl;
    const cfg = MEMORY_LEVELS[level - 1];
    totalPairs = cfg.pairs; cols = cfg.cols;
    pairsFound = 0; moves = 0; firstCard = null; secondCard = null; lock = false;
    clearTimer();

    document.getElementById("memoryLevelNum").textContent = level;
    document.getElementById("memoryMoves").textContent = "0";
    document.getElementById("memoryPairs").textContent = "0";
    document.getElementById("memoryTotalPairs").textContent = totalPairs;

    const timerChip = document.getElementById("memoryTimerChip");
    if (cfg.timeLimit){
      remaining = cfg.timeLimit;
      timerChip.hidden = false;
      document.getElementById("memoryTimer").textContent = remaining;
      timerId = setInterval(tick, 1000);
    } else {
      timerChip.hidden = true;
    }

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

  function tick(){
    remaining--;
    document.getElementById("memoryTimer").textContent = Math.max(0, remaining);
    document.getElementById("memoryTimerChip").classList.toggle("low", remaining <= 5 && remaining > 0);
    if (remaining <= 0){
      clearTimer();
      lock = true;
      timeOut();
    }
  }
  function clearTimer(){ if (timerId){ clearInterval(timerId); timerId = null; } }

  function timeOut(){
    App.sfxWrong();
    App.showModal({
      emoji: "⏰",
      title: "Time's up!",
      body: `You matched ${pairsFound} of ${totalPairs} pairs.`,
      stars: 0,
      onAgain: () => start(level),
      onHome: () => { if (refreshPicker) refreshPicker(); App.goTo("screen-picker-memory"); }
    });
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
    clearTimer();
    const stars = moves <= totalPairs + 2 ? 3 : moves <= totalPairs + 6 ? 2 : 1;
    Levels.complete("memory", level, stars, 10);
    setTimeout(() => {
      App.showModal({
        emoji: "🧠",
        title: "All matched!",
        body: `You finished in ${moves} moves.`,
        stars,
        onAgain: () => start(level),
        onHome: () => { if (refreshPicker) refreshPicker(); App.goTo("screen-picker-memory"); }
      });
    }, 300);
  }

  function initPicker(){
    refreshPicker = wireLevelPicker("picker-memory", "memoryLevelGrid", "memory", 10,
      (i) => `Ages ${MEMORY_LEVELS[i-1].ages}${MEMORY_LEVELS[i-1].timeLimit ? " · " + MEMORY_LEVELS[i-1].timeLimit + "s" : ""}`,
      start);
  }

  return { start, initPicker };
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
  let level = 1, size = 3, round = 0, score = 0, totalRounds = 8, timeLimit = null;
  let timerId = null, remaining = 0, roundActive = false;
  let refreshPicker = null;

  function start(lvl){
    level = lvl;
    const cfg = ODD_LEVELS[level - 1];
    size = cfg.size; totalRounds = cfg.rounds; timeLimit = cfg.timeLimit;
    round = 0; score = 0;
    document.getElementById("oddLevelNum").textContent = level;
    document.getElementById("oddScore").textContent = "0";
    document.getElementById("oddTimerChip").hidden = !timeLimit;
    App.goTo("screen-game-odd");
    nextRound();
  }

  function nextRound(){
    clearTimer();
    round++;
    if (round > totalRounds){ return finish(); }
    document.getElementById("oddRound").textContent = round;
    roundActive = true;

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

    if (timeLimit){
      remaining = timeLimit;
      document.getElementById("oddTimer").textContent = remaining;
      timerId = setInterval(() => {
        remaining--;
        document.getElementById("oddTimer").textContent = Math.max(0, remaining);
        document.getElementById("oddTimerChip").classList.toggle("low", remaining <= 3 && remaining > 0);
        if (remaining <= 0 && roundActive){
          roundActive = false;
          clearTimer();
          App.sfxWrong();
          App.mascotSad();
          setTimeout(nextRound, 500);
        }
      }, 1000);
    }
  }

  function clearTimer(){ if (timerId){ clearInterval(timerId); timerId = null; } }

  function onTap(tile, isCorrect){
    if (!roundActive) return;
    if (isCorrect){
      roundActive = false;
      clearTimer();
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
    clearTimer();
    const stars = score >= totalRounds - 1 ? 3 : score >= Math.ceil(totalRounds * 0.6) ? 2 : score >= Math.ceil(totalRounds * 0.35) ? 1 : 0;
    Levels.complete("odd", level, stars, 10);
    App.showModal({
      emoji: "🔍",
      title: "Round complete!",
      body: `You found ${score} out of ${totalRounds}.`,
      stars,
      onAgain: () => start(level),
      onHome: () => { if (refreshPicker) refreshPicker(); App.goTo("screen-picker-odd"); }
    });
  }

  function initPicker(){
    refreshPicker = wireLevelPicker("picker-odd", "oddLevelGrid", "odd", 10,
      (i) => `Ages ${ODD_LEVELS[i-1].ages}${ODD_LEVELS[i-1].timeLimit ? " · " + ODD_LEVELS[i-1].timeLimit + "s" : ""}`,
      start);
  }

  return { start, initPicker };
})();

/* =================================================================
   4) SHAPE SORTER
   ================================================================= */
const SortGame = (() => {
  let level = 1, pieces = [], score = 0, picked = null, remainingPieces = 0;
  let timeLimit = null, timerId = null, remaining = 0, active = false;
  let refreshPicker = null;

  function start(lvl){
    level = lvl;
    const cfg = SORT_LEVELS[level - 1];
    timeLimit = cfg.timeLimit;
    score = 0; picked = null; active = true;
    document.getElementById("sortLevelNum").textContent = level;
    document.getElementById("sortScore").textContent = "0";

    pieces = pick(GAME_EMOJI.sortShapes, cfg.pieces);
    remainingPieces = pieces.length;

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

    const timerChip = document.getElementById("sortTimerChip");
    clearTimer();
    if (timeLimit){
      remaining = timeLimit;
      timerChip.hidden = false;
      document.getElementById("sortTimer").textContent = remaining;
      timerId = setInterval(() => {
        remaining--;
        document.getElementById("sortTimer").textContent = Math.max(0, remaining);
        document.getElementById("sortTimerChip").classList.toggle("low", remaining <= 5 && remaining > 0);
        if (remaining <= 0 && active){
          active = false;
          clearTimer();
          timeOut();
        }
      }, 1000);
    } else {
      timerChip.hidden = true;
    }

    App.goTo("screen-game-sort");
  }

  function clearTimer(){ if (timerId){ clearInterval(timerId); timerId = null; } }

  function timeOut(){
    App.sfxWrong();
    App.showModal({
      emoji: "⏰",
      title: "Time's up!",
      body: `You sorted ${pieces.length - remainingPieces} of ${pieces.length} shapes.`,
      stars: 0,
      onAgain: () => start(level),
      onHome: () => { if (refreshPicker) refreshPicker(); App.goTo("screen-picker-sort"); }
    });
  }

  function onPick(btn){
    if (!active || btn.classList.contains("used")) return;
    document.querySelectorAll(".sort-piece").forEach(p => p.classList.remove("picked"));
    btn.classList.add("picked");
    picked = btn;
    App.sfxTap(500);
  }

  function onBin(bin){
    if (!active || !picked || bin.classList.contains("filled")) return;
    if (picked.dataset.emoji === bin.dataset.emoji){
      bin.classList.add("filled");
      picked.classList.add("used");
      picked.classList.remove("picked");
      picked = null;
      score++;
      remainingPieces--;
      document.getElementById("sortScore").textContent = score;
      App.sfxCorrect();
      if (remainingPieces === 0) finish();
    } else {
      bin.classList.add("wrong-flash");
      App.sfxWrong();
      App.mascotSad();
      setTimeout(() => bin.classList.remove("wrong-flash"), 400);
    }
  }

  function finish(){
    active = false;
    clearTimer();
    const stars = timeLimit ? (remaining > timeLimit * 0.5 ? 3 : remaining > timeLimit * 0.2 ? 2 : 1) : 3;
    Levels.complete("sort", level, stars, 10);
    setTimeout(() => {
      App.showModal({
        emoji: "🧺",
        title: "All sorted!",
        body: "Every shape found its home!",
        stars,
        onAgain: () => start(level),
        onHome: () => { if (refreshPicker) refreshPicker(); App.goTo("screen-picker-sort"); }
      });
    }, 300);
  }

  function initPicker(){
    refreshPicker = wireLevelPicker("picker-sort", "sortLevelGrid", "sort", 10,
      (i) => `Ages ${SORT_LEVELS[i-1].ages}${SORT_LEVELS[i-1].timeLimit ? " · " + SORT_LEVELS[i-1].timeLimit + "s" : ""}`,
      start);
  }

  return { start, initPicker };
})();

/* =================================================================
   5) COUNT & TAP  (also a gentle bridge into visual math)
   ================================================================= */
const CountGame = (() => {
  let level = 1, score = 0, round = 0, totalRounds = 8, cfg = null;
  let refreshPicker = null;

  function start(lvl){
    level = lvl;
    cfg = COUNT_LEVELS[level - 1];
    score = 0; round = 0;
    document.getElementById("countLevelNum").textContent = level;
    document.getElementById("countScore").textContent = "0";
    App.goTo("screen-game-count");
    nextRound();
  }

  function buildScene(){
    const emoji = pick(GAME_EMOJI.countObjects, 1)[0];
    const mode = cfg.mode === "mixed" ? ["add", "sub", "mult"][randInt(0, 2)] : cfg.mode;

    if (mode === "count"){
      const n = randInt(2, Math.min(cfg.max, 12));
      return { html: emoji.repeat(n), answer: n };
    }
    if (mode === "add"){
      const a = randInt(1, Math.floor(cfg.max / 2));
      const b = randInt(1, Math.floor(cfg.max / 2));
      return { html: `${emoji.repeat(a)} <span class="op">+</span> ${emoji.repeat(b)} <span class="op">=</span> ?`, answer: a + b };
    }
    if (mode === "sub"){
      const a = randInt(4, Math.min(cfg.max, 12));
      const b = randInt(1, a - 1);
      return { html: `${emoji.repeat(a)} <span class="op">take away ${b}</span> <span class="op">=</span> ?`, answer: a - b };
    }
    if (mode === "mult"){
      const groups = randInt(2, 4);
      const each = randInt(2, Math.min(cfg.max, 5));
      const rows = Array.from({ length: groups }, () => emoji.repeat(each));
      return { html: rows.join("<br>") + `<div class="op">${groups} groups of ${each}</div>`, answer: groups * each };
    }
    // fallback
    const n = randInt(2, 10);
    return { html: emoji.repeat(n), answer: n };
  }

  function nextRound(){
    round++;
    if (round > totalRounds) return finish();

    const scene = buildScene();
    document.getElementById("countDisplay").innerHTML = scene.html;
    const n = scene.answer;

    const choices = new Set([n]);
    let guard = 0;
    while (choices.size < 4 && guard < 40){
      choices.add(Math.max(0, n + randInt(-4, 4)));
      guard++;
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
    Levels.complete("count", level, stars, 10);
    App.showModal({
      emoji: "🔢",
      title: "Counting complete!",
      body: `You got ${score} out of ${totalRounds} right.`,
      stars,
      onAgain: () => start(level),
      onHome: () => { if (refreshPicker) refreshPicker(); App.goTo("screen-picker-count"); }
    });
  }

  function initPicker(){
    refreshPicker = wireLevelPicker("picker-count", "countLevelGrid", "count", 10,
      (i) => `Ages ${COUNT_LEVELS[i-1].ages}`,
      start);
  }

  return { start, initPicker };
})();

/* ---------------- Wiring ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  SimonGame.init();
  MemoryGame.initPicker();
  OddGame.initPicker();
  SortGame.initPicker();
  CountGame.initPicker();
});
