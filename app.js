/* ===================================================================
   Ziggy's Brain Garden — app shell
   Handles: screen navigation, star currency, mascot reactions, sound
   effects, confetti, the result modal, and PWA install/service worker.
   =================================================================== */

const App = (() => {
  let totalStars = Number(localStorage.getItem("bg_stars") || 0);
  const totalStarsEl = document.getElementById("totalStars");

  function renderStars(){
    totalStarsEl.textContent = totalStars;
  }

  function addStars(n){
    totalStars += n;
    if (totalStars < 0) totalStars = 0;
    localStorage.setItem("bg_stars", String(totalStars));
    renderStars();
  }

  function showScreen(id){
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    const target = document.getElementById(id);
    if (target) target.classList.add("active");
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  /* Wire up every element with data-nav="screen-XXX" (without the
     "screen-" prefix in the markup) and data-back="screen-XXX" */
  function initNav(){
    document.querySelectorAll("[data-nav]").forEach(el => {
      el.addEventListener("click", () => {
        const target = "screen-" + el.dataset.nav;
        showScreen(target);
        document.dispatchEvent(new CustomEvent("screen:enter", { detail: { id: target } }));
      });
    });
    document.querySelectorAll("[data-back]").forEach(el => {
      el.addEventListener("click", () => {
        showScreen(el.dataset.back);
        document.dispatchEvent(new CustomEvent("screen:enter", { detail: { id: el.dataset.back } }));
      });
    });
  }

  function goTo(id){
    showScreen(id);
    document.dispatchEvent(new CustomEvent("screen:enter", { detail: { id } }));
  }

  /* ---------------- Sound (Web Audio, no files needed) ---------------- */
  let audioCtx = null;
  function ctx(){
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
  }
  function beep(freq = 440, duration = 0.15, type = "sine", vol = 0.18){
    try{
      const c = ctx();
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.value = vol;
      osc.connect(gain).connect(c.destination);
      const now = c.currentTime;
      gain.gain.setValueAtTime(vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      osc.start(now);
      osc.stop(now + duration);
    }catch(e){ /* audio not available, fail silently */ }
  }
  function sfxCorrect(){ beep(660, 0.12, "sine"); setTimeout(() => beep(880, 0.16, "sine"), 90); }
  function sfxWrong(){ beep(180, 0.25, "sawtooth", 0.14); }
  function sfxTap(freq){ beep(freq, 0.18, "triangle", 0.16); }
  function sfxWin(){
    [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => beep(f, 0.22, "sine"), i * 130));
  }

  /* ---------------- Mascot reactions ---------------- */
  const mascot = document.getElementById("mascot");
  function mascotHappy(){
    mascot.classList.remove("sad"); void mascot.offsetWidth;
    mascot.classList.add("happy");
    setTimeout(() => mascot.classList.remove("happy"), 650);
  }
  function mascotSad(){
    mascot.classList.remove("happy"); void mascot.offsetWidth;
    mascot.classList.add("sad");
    setTimeout(() => mascot.classList.remove("sad"), 550);
  }

  /* ---------------- Confetti ---------------- */
  const confettiColors = ["#FF6FA5","#4EC5F1","#6BCB77","#FFC93C","#9B72CF","#FF9F45"];
  function confettiBurst(count = 26){
    for (let i = 0; i < count; i++){
      const piece = document.createElement("div");
      piece.className = "confetti-piece";
      piece.style.left = Math.random() * 100 + "vw";
      piece.style.background = confettiColors[i % confettiColors.length];
      piece.style.animationDuration = (2 + Math.random() * 1.4) + "s";
      piece.style.transform = `rotate(${Math.random()*360}deg)`;
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 3600);
    }
  }

  /* ---------------- Result modal ---------------- */
  const modalOverlay = document.getElementById("modalOverlay");
  const modalEmoji = document.getElementById("modalEmoji");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  const modalHome = document.getElementById("modalHome");
  const modalAgain = document.getElementById("modalAgain");
  let againCallback = null;
  let homeCallback = null;

  function showModal({ emoji = "🎉", title = "Great job!", body = "", stars = 0, onAgain = null, onHome = null, homeLabel = "🏠 Home", againLabel = "🔁 Play Again" }){
    modalEmoji.textContent = emoji;
    modalTitle.textContent = title;
    modalBody.textContent = body;
    modalHome.textContent = homeLabel;
    modalAgain.textContent = againLabel;
    if (stars > 0){ addStars(stars); confettiBurst(); sfxWin(); mascotHappy(); }
    else { mascotSad(); }
    againCallback = onAgain;
    homeCallback = onHome;
    modalOverlay.classList.add("active");
  }
  function hideModal(){ modalOverlay.classList.remove("active"); }

  modalHome.addEventListener("click", () => {
    hideModal();
    if (typeof homeCallback === "function") homeCallback();
    else goTo("screen-home");
  });
  modalAgain.addEventListener("click", () => {
    hideModal();
    if (typeof againCallback === "function") againCallback();
  });

  /* ---------------- PWA: service worker + install prompt ---------------- */
  function initPWA(){
    if ("serviceWorker" in navigator){
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("service-worker.js").catch(() => {});
      });
    }

    let deferredPrompt = null;
    const banner = document.getElementById("installBanner");
    const installBtn = document.getElementById("installBtn");
    const dismissBtn = document.getElementById("installDismiss");

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;
      if (!localStorage.getItem("bg_install_dismissed")){
        banner.classList.add("active");
      }
    });

    installBtn.addEventListener("click", async () => {
      banner.classList.remove("active");
      if (deferredPrompt){
        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        deferredPrompt = null;
      }
    });

    dismissBtn.addEventListener("click", () => {
      banner.classList.remove("active");
      localStorage.setItem("bg_install_dismissed", "1");
    });

    window.addEventListener("appinstalled", () => {
      banner.classList.remove("active");
    });
  }

  function init(){
    renderStars();
    initNav();
    initPWA();
  }

  return {
    init, goTo, addStars,
    beep, sfxCorrect, sfxWrong, sfxTap, sfxWin,
    mascotHappy, mascotSad,
    confettiBurst,
    showModal, hideModal
  };
})();

document.addEventListener("DOMContentLoaded", App.init);
