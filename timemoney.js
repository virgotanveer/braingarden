/* ===================================================================
   Ziggy's Brain Garden — Telling Time & Coin Counting
   Both leveled 1-10 via the shared Levels system (from games.js).
   =================================================================== */

/* =================================================================
   TELLING TIME
   ================================================================= */
const TimeGame = (() => {
  let level = 1, qIndex = 0, score = 0, totalQuestions = 8, correctAnswer = "";
  let refreshPicker = null;

  function start(lvl){
    level = lvl;
    qIndex = 0; score = 0;
    document.getElementById("timeLevelNum").textContent = level;
    document.getElementById("timeTotal").textContent = totalQuestions;
    document.getElementById("timeScore").textContent = "0";
    App.goTo("screen-game-time");
    nextQuestion();
  }

  function setClock(hour12, minute){
    const hourDeg = (hour12 % 12) * 30 + minute * 0.5;
    const minuteDeg = minute * 6;
    document.getElementById("clockHourHand").style.transform = `rotate(${hourDeg}deg)`;
    document.getElementById("clockMinuteHand").style.transform = `rotate(${minuteDeg}deg)`;
  }

  function nextQuestion(){
    qIndex++;
    if (qIndex > totalQuestions) return finish();
    document.getElementById("timeIndex").textContent = qIndex;

    const cfg = TIME_LEVELS[level - 1];
    let promptText, choices, startHour, startMinute;

    if (cfg.elapsed){
      startHour = randInt(1, 12);
      startMinute = [0, 15, 30, 45][randInt(0, 3)];
      const delta = cfg.deltas[randInt(0, cfg.deltas.length - 1)];
      let totalMin = ((startHour % 12) * 60 + startMinute + delta) % 720;
      const endHour = Math.floor(totalMin / 60), endMinute = totalMin % 60;
      promptText = `It's ${formatClockTime(startHour, startMinute)}. What time will it be in ${delta} minutes?`;
      choices = buildTimeChoices(endHour, endMinute);
      correctAnswer = formatClockTime(endHour, endMinute);
    } else {
      startHour = randInt(1, 12);
      startMinute = cfg.genMinute();
      promptText = "What time is it?";
      choices = buildTimeChoices(startHour, startMinute);
      correctAnswer = formatClockTime(startHour, startMinute);
    }

    setClock(startHour, startMinute);
    document.getElementById("timePrompt").textContent = promptText;
    if (App.ttsSupported()){
      document.getElementById("timeSpeakBtn").onclick = () => App.speak(promptText);
    }

    const wrap = document.getElementById("timeChoices");
    wrap.innerHTML = "";
    choices.forEach(val => {
      const btn = document.createElement("button");
      btn.className = "count-choice";
      btn.textContent = val;
      btn.addEventListener("click", () => onAnswer(val === correctAnswer, btn));
      wrap.appendChild(btn);
    });
  }

  function onAnswer(correct, btn){
    document.querySelectorAll("#timeChoices .count-choice").forEach(b => b.disabled = true);
    if (correct){
      btn.style.background = "var(--green)";
      score++;
      document.getElementById("timeScore").textContent = score;
      App.sfxCorrect();
    } else {
      btn.style.background = "#ff8080";
      App.sfxWrong();
      App.mascotSad();
    }
    setTimeout(nextQuestion, 800);
  }

  function finish(){
    const stars = score >= 7 ? 3 : score >= 5 ? 2 : score >= 3 ? 1 : 0;
    Levels.complete("time", level, stars, 10);
    App.showModal({
      emoji: "🕐",
      title: "Time's up!",
      body: `You got ${score} out of ${totalQuestions} correct.`,
      stars,
      onAgain: () => start(level),
      onHome: () => { if (refreshPicker) refreshPicker(); App.goTo("screen-picker-time"); }
    });
  }

  function initPicker(){
    refreshPicker = wireLevelPicker("picker-time", "timeLevelGrid", "time", 10,
      (i) => `${TIME_LEVELS[i-1].label} · Ages ${TIME_LEVELS[i-1].ages}`,
      start);
  }

  return { start, initPicker };
})();

/* =================================================================
   COIN COUNTING
   ================================================================= */
const MoneyGame = (() => {
  let level = 1, qIndex = 0, score = 0, totalQuestions = 8;
  let refreshPicker = null;

  function start(lvl){
    level = lvl;
    qIndex = 0; score = 0;
    document.getElementById("moneyLevelNum").textContent = level;
    document.getElementById("moneyTotal").textContent = totalQuestions;
    document.getElementById("moneyScore").textContent = "0";
    App.goTo("screen-game-money");
    nextQuestion();
  }

  function nextQuestion(){
    qIndex++;
    if (qIndex > totalQuestions) return finish();
    document.getElementById("moneyIndex").textContent = qIndex;

    const cfg = MONEY_LEVELS[level - 1];
    const n = randInt(cfg.count[0], cfg.count[1]);
    const coins = Array.from({ length: n }, () => cfg.coins[randInt(0, cfg.coins.length - 1)]);
    const answer = coins.reduce((a, b) => a + b, 0);

    const row = document.getElementById("coinRow");
    row.innerHTML = "";
    coins.forEach(v => {
      const coin = document.createElement("div");
      coin.className = "coin";
      coin.style.background = COIN_COLORS[v];
      coin.textContent = COIN_LABELS[v];
      row.appendChild(coin);
    });

    const promptText = "How much money is this?";
    document.getElementById("moneyPrompt").textContent = promptText;
    if (App.ttsSupported()){
      document.getElementById("moneySpeakBtn").onclick = () => App.speak(promptText);
    }

    const rawChoices = buildNumberChoices(answer);
    const wrap = document.getElementById("moneyChoices");
    wrap.innerHTML = "";
    rawChoices.forEach(val => {
      const btn = document.createElement("button");
      btn.className = "count-choice";
      btn.textContent = formatMoney(val);
      btn.addEventListener("click", () => onAnswer(val === answer, btn));
      wrap.appendChild(btn);
    });
  }

  function onAnswer(correct, btn){
    document.querySelectorAll("#moneyChoices .count-choice").forEach(b => b.disabled = true);
    if (correct){
      btn.style.background = "var(--green)";
      score++;
      document.getElementById("moneyScore").textContent = score;
      App.sfxCorrect();
    } else {
      btn.style.background = "#ff8080";
      App.sfxWrong();
      App.mascotSad();
    }
    setTimeout(nextQuestion, 800);
  }

  function finish(){
    const stars = score >= 7 ? 3 : score >= 5 ? 2 : score >= 3 ? 1 : 0;
    Levels.complete("money", level, stars, 10);
    App.showModal({
      emoji: "💰",
      title: "All counted!",
      body: `You got ${score} out of ${totalQuestions} correct.`,
      stars,
      onAgain: () => start(level),
      onHome: () => { if (refreshPicker) refreshPicker(); App.goTo("screen-picker-money"); }
    });
  }

  function initPicker(){
    refreshPicker = wireLevelPicker("picker-money", "moneyLevelGrid", "money", 10,
      (i) => `${MONEY_LEVELS[i-1].label} · Ages ${MONEY_LEVELS[i-1].ages}`,
      start);
  }

  return { start, initPicker };
})();

document.addEventListener("DOMContentLoaded", () => {
  TimeGame.initPicker();
  MoneyGame.initPicker();
});
