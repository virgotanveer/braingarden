/* ===================================================================
   Ziggy's Brain Garden — level progression system
   Every leveled game (Memory Match, Odd One Out, Shape Sorter,
   Count & Tap, Math Quiz, Number Patterns, Word Scramble) shares this:
   10 levels, unlocked one at a time, with a 1-3 star best score saved
   per level in localStorage so kids always have a next goal.
   =================================================================== */

const Levels = (() => {
  function key(gameKey){ return "bg_level_" + gameKey; }

  function getProgress(gameKey){
    try{
      const raw = localStorage.getItem(key(gameKey));
      if (raw) return JSON.parse(raw);
    }catch(e){ /* ignore corrupt data */ }
    return { unlocked: 1, stars: {} };
  }

  function saveProgress(gameKey, progress){
    localStorage.setItem(key(gameKey), JSON.stringify(progress));
  }

  /** Call when a level is completed. Records best star score and
   *  unlocks the next level. Returns the updated progress object. */
  function complete(gameKey, levelNum, starsEarned, totalLevels){
    const p = getProgress(gameKey);
    if (starsEarned > (p.stars[levelNum] || 0)) p.stars[levelNum] = starsEarned;
    if (starsEarned > 0 && levelNum + 1 > p.unlocked){
      p.unlocked = Math.min(levelNum + 1, totalLevels);
    }
    saveProgress(gameKey, p);
    return p;
  }

  /** Renders a grid of level tiles into `container`.
   *  subtitleFn(levelNum) -> short string shown on each tile (e.g. "Ages 5-6").
   *  onSelect(levelNum) -> called when an unlocked tile is tapped. */
  function renderLevelGrid(container, gameKey, totalLevels, subtitleFn, onSelect){
    const p = getProgress(gameKey);
    container.innerHTML = "";
    for (let i = 1; i <= totalLevels; i++){
      const locked = i > p.unlocked;
      const stars = p.stars[i] || 0;
      const tile = document.createElement("button");
      tile.className = "level-tile" + (locked ? " locked" : "") + (i === p.unlocked ? " current" : "");
      tile.innerHTML = `
        <span class="level-num">${locked ? "🔒" : i}</span>
        <span class="level-stars">${locked ? "" : (stars > 0 ? "⭐".repeat(stars) : "☆")}</span>
        <span class="level-sub">${subtitleFn(i)}</span>`;
      if (!locked){
        tile.addEventListener("click", () => onSelect(i));
      } else {
        tile.disabled = true;
      }
      container.appendChild(tile);
    }
  }

  return { getProgress, saveProgress, complete, renderLevelGrid };
})();
