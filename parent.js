/* ===================================================================
   Ziggy's Brain Garden — settings & parent zone
   The "parent gate" is a two-digit addition problem — not real
   security, just enough friction to keep a young child from wandering
   into settings/reset. Export/import lets progress survive a new
   device, since everything otherwise lives in this browser's storage.
   =================================================================== */

const GAME_LABELS = {
  memory: "🧠 Memory Match", odd: "🔍 Odd One Out", sort: "🧺 Shape Sorter",
  count: "🔢 Count & Tap", math: "🧮 Math Quiz", sequence: "🔗 Number Patterns",
  scramble: "🔤 Word Scramble", time: "🕐 Telling Time", money: "💰 Coin Counting"
};

const Settings = (() => {
  function syncToggles(){
    const s = App.getSettings();
    document.getElementById("toggleReadAloud").checked = s.readAloud;
    document.getElementById("toggleSound").checked = s.sound;
  }
  function init(){
    syncToggles();
    document.getElementById("toggleReadAloud").addEventListener("change", (e) => App.setReadAloud(e.target.checked));
    document.getElementById("toggleSound").addEventListener("change", (e) => App.setSound(e.target.checked));
    document.querySelector('[data-nav="parent-gate"]').addEventListener("click", ParentZone.newGateProblem);
  }
  return { init, syncToggles };
})();

const ParentZone = (() => {
  let gateAnswer = 0;

  function newGateProblem(){
    const a = randInt(12, 45), b = randInt(12, 45);
    gateAnswer = a + b;
    document.getElementById("gateQuestion").textContent = `${a} + ${b} = ?`;
    document.getElementById("gateInput").value = "";
    document.getElementById("gateError").hidden = true;
  }

  function checkGate(){
    const val = Number(document.getElementById("gateInput").value);
    if (val === gateAnswer){
      renderDashboard();
      App.goTo("screen-parent-dashboard");
    } else {
      document.getElementById("gateError").hidden = false;
      newGateProblem();
    }
  }

  function fmtTime(ms){
    const mins = Math.round(ms / 60000);
    if (mins < 1) return "just a moment";
    if (mins < 60) return `${mins} min`;
    return `${Math.floor(mins / 60)}h ${mins % 60}m`;
  }

  function renderDashboard(){
    const stats = App.getStats();

    const summary = document.getElementById("dashSummary");
    summary.innerHTML = `
      <div class="dash-card"><div class="dash-num">⭐ ${App.getTotalStars()}</div><div class="dash-label">Total Stars</div></div>
      <div class="dash-card"><div class="dash-num">🔥 ${App.getStreak()}</div><div class="dash-label">Day Streak</div></div>
      <div class="dash-card"><div class="dash-num">🎮 ${stats.gamesPlayed}</div><div class="dash-label">Games Played</div></div>
      <div class="dash-card"><div class="dash-num">⏱ ${fmtTime(App.getTimePlayedMs())}</div><div class="dash-label">Time in App</div></div>`;

    const levelsWrap = document.getElementById("dashLevels");
    levelsWrap.innerHTML = "";
    Object.entries(GAME_LABELS).forEach(([key, label]) => {
      const p = Levels.getProgress(key);
      const bestStars = Object.values(p.stars || {}).reduce((a, b) => a + b, 0);
      const row = document.createElement("div");
      row.className = "dash-row";
      row.innerHTML = `<span>${label}</span><span>Level ${Math.min(p.unlocked, 10)}/10 · ${bestStars}⭐</span>`;
      levelsWrap.appendChild(row);
    });

    const badgesWrap = document.getElementById("dashBadges");
    badgesWrap.innerHTML = "";
    Badges.allWithStatus().forEach(b => {
      const chip = document.createElement("div");
      chip.className = "badge-chip" + (b.earned ? "" : " locked");
      chip.innerHTML = `<span class="badge-icon">${b.earned ? b.icon : "🔒"}</span><span class="badge-name">${b.name}</span>`;
      chip.title = b.desc;
      badgesWrap.appendChild(chip);
    });

    const deckCount = stats.decksBrowsed.length;
    document.getElementById("dashDecks").textContent =
      `${deckCount} of ${Object.keys(FLASHCARD_DECKS).length} flashcard decks explored.`;
  }

  function doExport(){
    const blob = new Blob([App.exportProgress()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `brain-garden-backup-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function doImport(file){
    const reader = new FileReader();
    reader.onload = () => {
      try{
        App.importProgress(reader.result);
        App.showToast("<span class=\"toast-emoji\">✅</span><div><strong>Progress restored!</strong></div>");
        renderDashboard();
        Garden.renderHomeWidget();
      }catch(err){
        App.showToast("<span class=\"toast-emoji\">⚠️</span><div><strong>That file didn't look right.</strong></div>");
      }
    };
    reader.readAsText(file);
  }

  function doReset(){
    if (!window.confirm("This will erase all stars, levels, and badges on this device. This can't be undone. Continue?")) return;
    App.resetAllProgress();
    window.location.reload();
  }

  function init(){
    document.getElementById("gateSubmit").addEventListener("click", checkGate);
    document.getElementById("gateInput").addEventListener("keydown", (e) => { if (e.key === "Enter") checkGate(); });
    document.getElementById("dashExport").addEventListener("click", doExport);
    document.getElementById("dashImportFile").addEventListener("change", (e) => {
      if (e.target.files[0]) doImport(e.target.files[0]);
    });
    document.getElementById("dashReset").addEventListener("click", doReset);
  }

  return { init, newGateProblem, renderDashboard };
})();

document.addEventListener("DOMContentLoaded", () => {
  Settings.init();
  ParentZone.init();
});
