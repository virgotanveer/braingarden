/* ===================================================================
   Ziggy's Brain Garden — badges & garden
   Badges are checked opportunistically whenever stats change (a game
   finishes, a deck is browsed, a level unlocks). The garden widget on
   the home screen grows through GARDEN_STAGES as total stars grow.
   =================================================================== */

const Badges = (() => {
  function earnedIds(){
    try{ return JSON.parse(Storage.get("bg_badges")) || []; }
    catch(e){ return []; }
  }
  function saveEarned(ids){ Storage.set("bg_badges", JSON.stringify(ids)); }

  function snapshotState(){
    const stats = App.getStats();
    const levelKeys = ["memory","odd","sort","count","math","sequence","scramble","time","money","shadow","tictactoe","trail"];
    const levels = {};
    levelKeys.forEach(k => levels[k] = Levels.getProgress(k));
    return {
      ...stats,
      totalStars: App.getTotalStars(),
      streak: App.getStreak(),
      levels
    };
  }

  function checkAll(){
    const state = snapshotState();
    const earned = new Set(earnedIds());
    const newlyEarned = [];
    BADGES.forEach(b => {
      if (!earned.has(b.id) && b.check(state)){
        earned.add(b.id);
        newlyEarned.push(b);
      }
    });
    if (newlyEarned.length) saveEarned([...earned]);
    return newlyEarned;
  }

  function allWithStatus(){
    const earned = new Set(earnedIds());
    return BADGES.map(b => ({ ...b, earned: earned.has(b.id) }));
  }

  function announceNew(){
    const newly = checkAll();
    newly.forEach((b, i) => {
      setTimeout(() => {
        App.showToast(`<span class="toast-emoji">${b.icon}</span><div><strong>New Badge!</strong><br>${b.name}</div>`);
      }, i * 900);
    });
  }

  return { checkAll, allWithStatus, announceNew };
})();

const Garden = (() => {
  function stageFor(stars){
    let stage = GARDEN_STAGES[0];
    for (const s of GARDEN_STAGES){ if (stars >= s.min) stage = s; }
    return stage;
  }
  function nextStage(stars){
    return GARDEN_STAGES.find(s => s.min > stars) || null;
  }
  function renderHomeWidget(){
    const el = document.getElementById("gardenWidget");
    if (!el) return;
    const stars = App.getTotalStars();
    const stage = stageFor(stars);
    const next = nextStage(stars);
    const streak = App.getStreak();

    let progressHtml = "";
    if (next){
      const prevMin = GARDEN_STAGES[GARDEN_STAGES.indexOf(stage)].min;
      const pct = Math.min(100, Math.round(((stars - prevMin) / (next.min - prevMin)) * 100));
      progressHtml = `
        <div class="garden-bar"><div class="garden-bar-fill" style="width:${pct}%"></div></div>
        <div class="garden-next">${next.min - stars} ⭐ to ${next.emoji} ${next.label}</div>`;
    } else {
      progressHtml = `<div class="garden-next">🎉 Your garden is fully grown!</div>`;
    }

    el.innerHTML = `
      <div class="garden-emoji">${stage.emoji}</div>
      <div class="garden-info">
        <div class="garden-label">${stage.label}</div>
        ${progressHtml}
      </div>
      ${streak > 0 ? `<div class="streak-chip">🔥 ${streak}</div>` : ""}`;
  }

  return { stageFor, nextStage, renderHomeWidget };
})();

document.addEventListener("bg:statsUpdated", () => {
  Badges.announceNew();
  Garden.renderHomeWidget();
});
document.addEventListener("screen:enter", (e) => {
  if (e.detail && e.detail.id === "screen-home") Garden.renderHomeWidget();
});
document.addEventListener("DOMContentLoaded", () => {
  Garden.renderHomeWidget();
  Badges.checkAll();
});
