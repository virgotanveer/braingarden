/* ===================================================================
   Shadow Match — a spatial-reasoning puzzle. Colorful emoji objects
   need to be matched to their correct silhouette. Silhouettes are the
   same emoji rendered through a CSS filter (brightness:0), so no
   image assets are needed and every "shadow" is guaranteed accurate.
   =================================================================== */

const ShadowGame = (() => {
  let level = 1, items = [], score = 0, picked = null, remaining = 0;
  let timeLimit = null, timerId = null, remainingTime = 0, active = false;
  let refreshPicker = null;

  function start(lvl){
    level = lvl;
    const cfg = SHADOW_LEVELS[level - 1];
    timeLimit = cfg.timeLimit;
    score = 0; picked = null; active = true;
    document.getElementById("shadowLevelNum").textContent = level;
    document.getElementById("shadowScore").textContent = "0";

    items = pick(GAME_EMOJI.shadowItems, cfg.pairs);
    remaining = items.length;

    const tray = document.getElementById("shadowTray");
    tray.innerHTML = "";
    items.forEach((emoji, i) => {
      const btn = document.createElement("button");
      btn.className = "sort-piece";
      btn.textContent = emoji;
      btn.dataset.emoji = emoji;
      btn.addEventListener("click", () => onPick(btn));
      tray.appendChild(btn);
    });

    const grid = document.getElementById("shadowGrid");
    grid.innerHTML = "";
    shuffle(items).forEach(emoji => {
      const cell = document.createElement("button");
      cell.className = "shadow-cell";
      cell.innerHTML = `<span class="shadow-silhouette">${emoji}</span>`;
      cell.dataset.emoji = emoji;
      cell.addEventListener("click", () => onShadow(cell));
      grid.appendChild(cell);
    });

    const timerChip = document.getElementById("shadowTimerChip");
    clearTimer();
    if (timeLimit){
      remainingTime = timeLimit;
      timerChip.hidden = false;
      document.getElementById("shadowTimer").textContent = remainingTime;
      timerId = setInterval(() => {
        remainingTime--;
        document.getElementById("shadowTimer").textContent = Math.max(0, remainingTime);
        document.getElementById("shadowTimerChip").classList.toggle("low", remainingTime <= 5 && remainingTime > 0);
        if (remainingTime <= 0 && active){
          active = false;
          clearTimer();
          timeOut();
        }
      }, 1000);
    } else {
      timerChip.hidden = true;
    }

    App.goTo("screen-game-shadow");
  }

  function clearTimer(){ if (timerId){ clearInterval(timerId); timerId = null; } }

  function timeOut(){
    App.sfxWrong();
    App.showModal({
      emoji: "⏰",
      title: "Time's up!",
      body: `You matched ${items.length - remaining} of ${items.length} shadows.`,
      stars: 0,
      onAgain: () => start(level),
      onHome: () => { if (refreshPicker) refreshPicker(); App.goTo("screen-picker-shadow"); }
    });
  }

  function onPick(btn){
    if (!active || btn.classList.contains("used")) return;
    document.querySelectorAll("#shadowTray .sort-piece").forEach(p => p.classList.remove("picked"));
    btn.classList.add("picked");
    picked = btn;
    App.sfxTap(500);
  }

  function onShadow(cell){
    if (!active || !picked || cell.classList.contains("filled")) return;
    if (picked.dataset.emoji === cell.dataset.emoji){
      cell.classList.add("filled");
      cell.querySelector(".shadow-silhouette").textContent = picked.dataset.emoji;
      cell.classList.add("revealed");
      picked.classList.add("used");
      picked.classList.remove("picked");
      picked = null;
      score++;
      remaining--;
      document.getElementById("shadowScore").textContent = score;
      App.sfxCorrect();
      if (remaining === 0) finish();
    } else {
      cell.classList.add("wrong-flash");
      App.sfxWrong();
      App.mascotSad();
      setTimeout(() => cell.classList.remove("wrong-flash"), 400);
    }
  }

  function finish(){
    active = false;
    clearTimer();
    const stars = timeLimit ? (remainingTime > timeLimit * 0.5 ? 3 : remainingTime > timeLimit * 0.2 ? 2 : 1) : 3;
    Levels.complete("shadow", level, stars, 10);
    setTimeout(() => {
      App.showModal({
        emoji: "🧩",
        title: "All matched!",
        body: "Every shadow found its match!",
        stars,
        onAgain: () => start(level),
        onHome: () => { if (refreshPicker) refreshPicker(); App.goTo("screen-picker-shadow"); }
      });
    }, 300);
  }

  function initPicker(){
    refreshPicker = wireLevelPicker("picker-shadow", "shadowLevelGrid", "shadow", 10,
      (i) => `Ages ${SHADOW_LEVELS[i-1].ages}${SHADOW_LEVELS[i-1].timeLimit ? " · " + SHADOW_LEVELS[i-1].timeLimit + "s" : ""}`,
      start);
  }

  return { start, initPicker };
})();

document.addEventListener("DOMContentLoaded", ShadowGame.initPicker);
