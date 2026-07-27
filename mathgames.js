/* ===================================================================
   Ziggy's Brain Garden — math & logic games
   Math Quiz (real arithmetic) · Number Patterns (sequences) ·
   Word Scramble (spelling) — all leveled 1-10 via the shared
   Levels system. Reuses shuffle/pick/randInt/wireLevelPicker from
   games.js (loaded first).
   =================================================================== */

/* Converts a math symbol equation into words a screen reader / TTS
   engine will read naturally, e.g. "7 × 3 = ?" -> "7 times 3 equals what". */
function speakableMath(text){
  return text
    .replace(/×/g, " times ")
    .replace(/÷/g, " divided by ")
    .replace(/\+/g, " plus ")
    .replace(/-/g, " minus ")
    .replace(/=/g, " equals ")
    .replace(/\?/g, " what");
}

/* Builds 4 distinct, non-negative multiple-choice numbers around a
   correct numeric answer. Shared by Math Quiz & Number Patterns. */
function buildNumberChoices(answer){
  const choices = new Set([answer]);
  let guard = 0;
  while (choices.size < 4 && guard < 60){
    const offset = randInt(-6, 6) || 1;
    choices.add(Math.max(0, answer + offset));
    guard++;
  }
  return shuffle([...choices]);
}

/* =================================================================
   MATH QUIZ
   ================================================================= */
const MathQuizGame = (() => {
  let level = 1, qIndex = 0, score = 0, totalQuestions = 8, missed = [];
  let refreshPicker = null;

  function start(lvl){
    level = lvl;
    qIndex = 0; score = 0; missed = [];
    document.getElementById("mathLevelNum").textContent = level;
    document.getElementById("mathTotal").textContent = totalQuestions;
    document.getElementById("mathScore").textContent = "0";
    App.goTo("screen-game-math");
    nextQuestion();
  }

  function nextQuestion(){
    qIndex++;
    if (qIndex > totalQuestions) return finish();
    document.getElementById("mathIndex").textContent = qIndex;

    const q = MATH_LEVELS[level - 1].gen();
    document.getElementById("mathQuestion").textContent = q.text;
    document.getElementById("mathSpeakBtn").onclick = () => App.speak(speakableMath(q.text));

    const options = buildNumberChoices(q.answer);
    const wrap = document.getElementById("mathOptions");
    wrap.innerHTML = "";
    options.forEach(val => {
      const btn = document.createElement("button");
      btn.className = "quiz-option";
      btn.textContent = val;
      btn.addEventListener("click", () => onAnswer(val === q.answer, btn, q, val));
      wrap.appendChild(btn);
    });
  }

  function onAnswer(correct, btn, q, chosenVal){
    document.querySelectorAll("#mathOptions .quiz-option").forEach(b => b.disabled = true);
    if (correct){
      btn.classList.add("correct");
      score++;
      document.getElementById("mathScore").textContent = score;
      App.sfxCorrect();
    } else {
      btn.classList.add("incorrect");
      App.sfxWrong();
      App.mascotSad();
      missed.push({ prompt: q.text, yourAnswer: String(chosenVal), correctAnswer: String(q.answer) });
    }
    setTimeout(nextQuestion, 800);
  }

  function finish(){
    const stars = score >= 7 ? 3 : score >= 5 ? 2 : score >= 3 ? 1 : 0;
    Levels.complete("math", level, stars, 10);
    Review.maybeShow(missed, () => showResult(stars));
  }

  function showResult(stars){
    App.showModal({
      emoji: "🧮",
      title: "Quiz complete!",
      body: `You solved ${score} out of ${totalQuestions} correctly.`,
      stars,
      onAgain: () => start(level),
      onHome: () => { if (refreshPicker) refreshPicker(); App.goTo("screen-picker-math"); }
    });
  }

  function initPicker(){
    refreshPicker = wireLevelPicker("picker-math", "mathLevelGrid", "math", 10,
      (i) => `${MATH_LEVELS[i-1].label} · Ages ${MATH_LEVELS[i-1].ages}`,
      start);
  }

  return { start, initPicker };
})();

/* =================================================================
   NUMBER PATTERNS
   ================================================================= */
const SequenceGame = (() => {
  let level = 1, qIndex = 0, score = 0, totalQuestions = 8, missed = [];
  let refreshPicker = null;

  function start(lvl){
    level = lvl;
    qIndex = 0; score = 0; missed = [];
    document.getElementById("sequenceLevelNum").textContent = level;
    document.getElementById("sequenceTotal").textContent = totalQuestions;
    document.getElementById("sequenceScore").textContent = "0";
    App.goTo("screen-game-sequence");
    nextQuestion();
  }

  function nextQuestion(){
    qIndex++;
    if (qIndex > totalQuestions) return finish();
    document.getElementById("sequenceIndex").textContent = qIndex;

    const q = SEQUENCE_LEVELS[level - 1].gen();
    const row = document.getElementById("sequenceRow");
    row.innerHTML = "";
    q.seq.forEach((num, i) => {
      const tile = document.createElement("div");
      tile.className = "seq-tile" + (i === q.blankIndex ? " blank" : "");
      tile.textContent = i === q.blankIndex ? "?" : num;
      row.appendChild(tile);
    });

    const promptText = `Sequence: ${q.seq.map((n, i) => i === q.blankIndex ? "blank" : n).join(", ")}. What's the missing number?`;

    const options = buildNumberChoices(q.answer);
    const wrap = document.getElementById("sequenceChoices");
    wrap.innerHTML = "";
    options.forEach(val => {
      const btn = document.createElement("button");
      btn.className = "count-choice";
      btn.textContent = val;
      btn.addEventListener("click", () => onAnswer(val === q.answer, btn, promptText, q, val));
      wrap.appendChild(btn);
    });
  }

  function onAnswer(correct, btn, promptText, q, chosenVal){
    document.querySelectorAll("#sequenceChoices .count-choice").forEach(b => b.disabled = true);
    if (correct){
      btn.style.background = "var(--green)";
      score++;
      document.getElementById("sequenceScore").textContent = score;
      App.sfxCorrect();
    } else {
      btn.style.background = "#ff8080";
      App.sfxWrong();
      App.mascotSad();
      missed.push({ prompt: promptText, yourAnswer: String(chosenVal), correctAnswer: String(q.answer) });
    }
    setTimeout(nextQuestion, 800);
  }

  function finish(){
    const stars = score >= 7 ? 3 : score >= 5 ? 2 : score >= 3 ? 1 : 0;
    Levels.complete("sequence", level, stars, 10);
    Review.maybeShow(missed, () => showResult(stars));
  }

  function showResult(stars){
    App.showModal({
      emoji: "🔗",
      title: "Pattern complete!",
      body: `You solved ${score} out of ${totalQuestions} correctly.`,
      stars,
      onAgain: () => start(level),
      onHome: () => { if (refreshPicker) refreshPicker(); App.goTo("screen-picker-sequence"); }
    });
  }

  function initPicker(){
    refreshPicker = wireLevelPicker("picker-sequence", "sequenceLevelGrid", "sequence", 10,
      (i) => `${SEQUENCE_LEVELS[i-1].label} · Ages ${SEQUENCE_LEVELS[i-1].ages}`,
      start);
  }

  return { start, initPicker };
})();

/* =================================================================
   WORD SCRAMBLE
   ================================================================= */
const ScrambleGame = (() => {
  let level = 1, qIndex = 0, score = 0, words = [], totalQuestions = 6;
  let tiles = [], answer = [], currentWord = "";
  let refreshPicker = null;

  function start(lvl){
    level = lvl;
    words = shuffle(WORD_LEVELS[level - 1].words);
    totalQuestions = Math.min(6, words.length);
    qIndex = 0; score = 0;
    document.getElementById("scrambleLevelNum").textContent = level;
    document.getElementById("scrambleTotal").textContent = totalQuestions;
    document.getElementById("scrambleScore").textContent = "0";
    App.goTo("screen-game-scramble");
    nextWord();
  }

  function scrambleWord(word){
    let letters = word.split("");
    let attempts = 0;
    let shuffled;
    do{
      shuffled = shuffle(letters);
      attempts++;
    } while (shuffled.join("") === word && attempts < 12);
    return shuffled;
  }

  function nextWord(){
    qIndex++;
    if (qIndex > totalQuestions) return finish();
    document.getElementById("scrambleIndex").textContent = qIndex;

    currentWord = words[qIndex - 1];
    const scrambled = scrambleWord(currentWord);
    tiles = scrambled.map((ch, i) => ({ id: i, char: ch, placed: false }));
    answer = [];

    document.getElementById("scrambleHint").textContent = `${currentWord.length} letters — spell the word!`;
    renderTray();
    renderAnswer();
  }

  function renderTray(){
    const tray = document.getElementById("letterTray");
    tray.innerHTML = "";
    tiles.forEach(t => {
      const btn = document.createElement("button");
      btn.className = "letter-tile" + (t.placed ? " used" : "");
      btn.textContent = t.char;
      btn.disabled = t.placed;
      btn.addEventListener("click", () => onTapTray(t));
      tray.appendChild(btn);
    });
  }

  function renderAnswer(){
    const strip = document.getElementById("answerStrip");
    strip.innerHTML = "";
    for (let i = 0; i < currentWord.length; i++){
      const slot = document.createElement("button");
      slot.className = "answer-slot" + (answer[i] ? " filled" : "");
      if (answer[i]){
        slot.textContent = answer[i].char;
        slot.addEventListener("click", () => onTapAnswer(i));
      }
      strip.appendChild(slot);
    }
  }

  function onTapTray(tile){
    if (tile.placed || answer.length >= currentWord.length) return;
    tile.placed = true;
    answer.push(tile);
    App.sfxTap(500);
    renderTray();
    renderAnswer();
    if (answer.length === currentWord.length) checkAnswer();
  }

  function onTapAnswer(index){
    const tile = answer[index];
    if (!tile) return;
    tile.placed = false;
    answer.splice(index, 1);
    App.sfxTap(420);
    renderTray();
    renderAnswer();
  }

  function checkAnswer(){
    const built = answer.map(t => t.char).join("");
    if (built === currentWord){
      score++;
      document.getElementById("scrambleScore").textContent = score;
      App.sfxCorrect();
      App.mascotHappy();
      setTimeout(nextWord, 700);
    } else {
      App.sfxWrong();
      App.mascotSad();
      const strip = document.getElementById("answerStrip");
      strip.classList.add("wrong-flash");
      setTimeout(() => strip.classList.remove("wrong-flash"), 400);
    }
  }

  function clearAnswer(){
    answer.forEach(t => t.placed = false);
    answer = [];
    renderTray();
    renderAnswer();
  }

  function giveHint(){
    if (answer.length >= currentWord.length) return;
    const neededChar = currentWord[answer.length];
    const tile = tiles.find(t => !t.placed && t.char === neededChar);
    if (tile) onTapTray(tile);
  }

  function finish(){
    const stars = score >= totalQuestions - 1 ? 3 : score >= Math.ceil(totalQuestions * 0.6) ? 2 : score >= 1 ? 1 : 0;
    Levels.complete("scramble", level, stars, 10);
    App.showModal({
      emoji: "🔤",
      title: "Words complete!",
      body: `You spelled ${score} out of ${totalQuestions} words.`,
      stars,
      onAgain: () => start(level),
      onHome: () => { if (refreshPicker) refreshPicker(); App.goTo("screen-picker-scramble"); }
    });
  }

  function initPicker(){
    refreshPicker = wireLevelPicker("picker-scramble", "scrambleLevelGrid", "scramble", 10,
      (i) => `Ages ${WORD_LEVELS[i-1].ages}`,
      start);
  }

  function initControls(){
    document.getElementById("scrambleClear").addEventListener("click", clearAnswer);
    document.getElementById("scrambleHintBtn").addEventListener("click", giveHint);
  }

  return { start, initPicker, initControls };
})();

document.addEventListener("DOMContentLoaded", () => {
  MathQuizGame.initPicker();
  SequenceGame.initPicker();
  ScrambleGame.initPicker();
  ScrambleGame.initControls();
});
