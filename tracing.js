/* ===================================================================
   Ziggy's Brain Garden — Letter & Number Tracing
   A free-practice tool, not a scored game: kids trace over a faint
   guide character with a finger/mouse. No stroke grading — the point
   is fine-motor practice and letter/number familiarity.
   =================================================================== */

const TracingGame = (() => {
  let index = 0;
  let canvas, ctx2d, drawing = false, dpr = 1;

  function renderPicker(){
    const grid = document.getElementById("traceItemGrid");
    grid.innerHTML = "";
    TRACE_ITEMS.forEach((ch, i) => {
      const btn = document.createElement("button");
      btn.className = "trace-item-btn";
      btn.textContent = ch;
      btn.addEventListener("click", () => start(i));
      grid.appendChild(btn);
    });
  }

  function start(i){
    index = i;
    App.goTo("screen-game-trace");
    // Canvas must be sized after the screen becomes visible/laid out.
    requestAnimationFrame(setupCanvas);
  }

  function setupCanvas(){
    canvas = document.getElementById("traceCanvas");
    ctx2d = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawGuide();
    wireInput();
  }

  function drawGuide(){
    const rect = canvas.getBoundingClientRect();
    ctx2d.clearRect(0, 0, rect.width, rect.height);
    ctx2d.fillStyle = "#e4d9f5";
    ctx2d.font = `bold ${Math.floor(rect.height * 0.75)}px 'Baloo 2', sans-serif`;
    ctx2d.textAlign = "center";
    ctx2d.textBaseline = "middle";
    ctx2d.fillText(TRACE_ITEMS[index], rect.width / 2, rect.height / 2 + rect.height * 0.05);

    document.getElementById("traceLabel").textContent = `Trace the letter/number: ${TRACE_ITEMS[index]}`;
    document.getElementById("traceProgress").textContent = `${index + 1} / ${TRACE_ITEMS.length}`;
  }

  function wireInput(){
    ctx2d.strokeStyle = "#9B72CF";
    ctx2d.lineWidth = 10;
    ctx2d.lineCap = "round";
    ctx2d.lineJoin = "round";

    function pos(e){
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    canvas.onpointerdown = (e) => {
      drawing = true;
      canvas.setPointerCapture(e.pointerId);
      const p = pos(e);
      ctx2d.beginPath();
      ctx2d.moveTo(p.x, p.y);
    };
    canvas.onpointermove = (e) => {
      if (!drawing) return;
      const p = pos(e);
      ctx2d.lineTo(p.x, p.y);
      ctx2d.stroke();
    };
    const stop = () => { drawing = false; };
    canvas.onpointerup = stop;
    canvas.onpointercancel = stop;
    canvas.onpointerleave = stop;
  }

  function clear(){ drawGuide(); }

  function next(dir){
    index = (index + dir + TRACE_ITEMS.length) % TRACE_ITEMS.length;
    drawGuide();
  }

  function done(){
    App.recordTraced();
    App.sfxCorrect();
    App.mascotHappy();
    App.confettiBurst(14);
    App.showToast(`<span class="toast-emoji">✏️</span><div><strong>Great tracing!</strong></div>`, 1600);
    setTimeout(() => next(1), 500);
  }

  function init(){
    renderPicker();
    document.getElementById("traceClear").addEventListener("click", clear);
    document.getElementById("tracePrev").addEventListener("click", () => next(-1));
    document.getElementById("traceNext").addEventListener("click", () => next(1));
    document.getElementById("traceDone").addEventListener("click", done);
    window.addEventListener("resize", () => { if (canvas && document.getElementById("screen-game-trace").classList.contains("active")) setupCanvas(); });
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", TracingGame.init);
