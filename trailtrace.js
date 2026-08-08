/* ===================================================================
   Trail Trace — draw a continuous path touching each number (and, at
   higher levels, alternating letters) in ascending order. Forgiving
   by design for kids: nodes just need to be *neared* while dragging,
   lifting a finger doesn't lose progress, and there's no way to fail
   — only a star rating based on how quickly the trail is completed.
   =================================================================== */

const TrailTraceGame = (() => {
  let level = 1, nodes = [], expected = 0, dragging = false;
  let startTime = 0, lastPoint = null;
  let canvas, ctx2d, dpr = 1;
  let refreshPicker = null;

  function layoutNodes(labels){
    const n = labels.length;
    const cols = Math.ceil(Math.sqrt(n * 1.3));
    const rows = Math.ceil(n / cols);
    const cellW = 100 / cols, cellH = 100 / rows;
    const cells = [];
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) cells.push({ r, c });
    const chosen = shuffle(cells).slice(0, n);
    return labels.map((label, i) => {
      const cell = chosen[i];
      const jx = 0.28 + Math.random() * 0.44;
      const jy = 0.28 + Math.random() * 0.44;
      const x = Math.min(90, Math.max(10, (cell.c + jx) * cellW));
      const y = Math.min(88, Math.max(12, (cell.r + jy) * cellH));
      return { label, x, y, reached: false };
    });
  }

  function start(lvl){
    level = lvl;
    const seq = TRAIL_LEVELS[level - 1].gen();
    nodes = layoutNodes(seq);
    expected = 0;
    dragging = false;
    lastPoint = null;
    startTime = 0;

    document.getElementById("trailLevelNum").textContent = level;
    document.getElementById("trailStatus").textContent = `Start at ${nodes[0].label}!`;
    document.getElementById("trailProgress").textContent = `0 / ${nodes.length}`;

    renderNodes();
    App.goTo("screen-game-trail");
    requestAnimationFrame(setupCanvas);
  }

  function renderNodes(){
    const stage = document.getElementById("trailStage");
    stage.querySelectorAll(".trail-node").forEach(n => n.remove());
    nodes.forEach((node, i) => {
      const el = document.createElement("div");
      el.className = "trail-node" + (node.reached ? " reached" : i === expected ? " current" : "");
      el.textContent = node.label;
      el.style.left = node.x + "%";
      el.style.top = node.y + "%";
      stage.appendChild(el);
    });
  }

  function setupCanvas(){
    canvas = document.getElementById("trailCanvas");
    ctx2d = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx2d.strokeStyle = "#9B72CF";
    ctx2d.lineWidth = 8;
    ctx2d.lineCap = "round";
    ctx2d.lineJoin = "round";
    wireInput();
  }

  function nodePixelPos(node){
    const rect = canvas.getBoundingClientRect();
    return { x: (node.x / 100) * rect.width, y: (node.y / 100) * rect.height };
  }

  function pointerPos(e){
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function checkProximity(p){
    if (expected >= nodes.length) return;
    const target = nodePixelPos(nodes[expected]);
    const dist = Math.hypot(p.x - target.x, p.y - target.y);
    if (dist <= 30){
      nodes[expected].reached = true;
      App.sfxTap(520 + expected * 20);
      expected++;
      renderNodes();
      document.getElementById("trailProgress").textContent = `${expected} / ${nodes.length}`;
      if (expected >= nodes.length){
        finish();
      } else {
        document.getElementById("trailStatus").textContent = `Now find ${nodes[expected].label}!`;
      }
    }
  }

  function wireInput(){
    canvas.onpointerdown = (e) => {
      if (expected >= nodes.length) return;
      if (!startTime) startTime = Date.now();
      dragging = true;
      canvas.setPointerCapture(e.pointerId);
      // If some progress already exists, continue the line from the
      // last reached node rather than wherever the finger landed, so
      // lifting and re-touching still looks like one continuous trail.
      const from = expected > 0 ? nodePixelPos(nodes[expected - 1]) : pointerPos(e);
      lastPoint = from;
      ctx2d.beginPath();
      ctx2d.moveTo(from.x, from.y);
      checkProximity(pointerPos(e));
    };
    canvas.onpointermove = (e) => {
      if (!dragging) return;
      const p = pointerPos(e);
      ctx2d.lineTo(p.x, p.y);
      ctx2d.stroke();
      lastPoint = p;
      checkProximity(p);
    };
    const stop = () => { dragging = false; };
    canvas.onpointerup = stop;
    canvas.onpointercancel = stop;
    canvas.onpointerleave = stop;
  }

  function finish(){
    dragging = false;
    const elapsed = (Date.now() - startTime) / 1000;
    const target = nodes.length * 2.6;
    const stars = elapsed <= target ? 3 : elapsed <= target * 1.7 ? 2 : 1;
    Levels.complete("trail", level, stars, 10);
    document.getElementById("trailStatus").textContent = "🎉 Trail complete!";
    setTimeout(() => {
      App.showModal({
        emoji: "🧵",
        title: "Trail complete!",
        body: `You connected all ${nodes.length} in ${elapsed.toFixed(1)}s.`,
        stars,
        onAgain: () => start(level),
        onHome: () => { if (refreshPicker) refreshPicker(); App.goTo("screen-picker-trail"); }
      });
    }, 400);
  }

  function initPicker(){
    refreshPicker = wireLevelPicker("picker-trail", "trailLevelGrid", "trail", 10,
      (i) => `${TRAIL_LEVELS[i-1].label} · Ages ${TRAIL_LEVELS[i-1].ages}`,
      start);
  }

  return { start, initPicker };
})();

document.addEventListener("DOMContentLoaded", TrailTraceGame.initPicker);
