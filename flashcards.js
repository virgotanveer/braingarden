/* ===================================================================
   Ziggy's Brain Garden — flashcards
   Deck picker → flip-card browse mode, and a separate multiple-choice
   quiz mode that reuses the same GK content.
   =================================================================== */

const Flashcards = (() => {
  let deckKey = null, cards = [], index = 0, flipped = false;

  function renderDeckPickers(){
    const browseGrid = document.getElementById("deckPickerGrid");
    const quizGrid = document.getElementById("quizPickerGrid");
    browseGrid.innerHTML = "";
    quizGrid.innerHTML = "";

    Object.entries(FLASHCARD_DECKS).forEach(([key, deck]) => {
      const bCard = document.createElement("button");
      bCard.className = "picker-card";
      bCard.style.borderTop = `6px solid ${deck.color}`;
      bCard.innerHTML = `<span class="emoji">${deck.icon}</span><span class="deck-title">${deck.title}</span>`;
      bCard.addEventListener("click", () => startBrowse(key));
      browseGrid.appendChild(bCard);

      const qCard = document.createElement("button");
      qCard.className = "picker-card";
      qCard.style.borderTop = `6px solid ${deck.color}`;
      qCard.innerHTML = `<span class="emoji">${deck.icon}</span><span class="deck-title">${deck.title}</span>`;
      qCard.addEventListener("click", () => Quiz.start(key));
      quizGrid.appendChild(qCard);
    });
  }

  function startBrowse(key){
    deckKey = key;
    cards = shuffle(FLASHCARD_DECKS[key].cards);
    index = 0; flipped = false;
    document.getElementById("deckTitle").textContent = FLASHCARD_DECKS[key].icon + " " + FLASHCARD_DECKS[key].title;
    render();
    App.goTo("screen-flashcards");
  }

  function render(){
    const card = cards[index];
    document.getElementById("cardFront").textContent = card.q;
    document.getElementById("cardBack").textContent = card.a;
    document.getElementById("cardFact").textContent = card.fact;
    document.getElementById("cardProgress").textContent = `${index + 1} / ${cards.length}`;
    const el = document.getElementById("flashcard");
    el.classList.toggle("flipped", flipped);
  }

  function flip(){
    flipped = !flipped;
    document.getElementById("flashcard").classList.toggle("flipped", flipped);
    App.sfxTap(flipped ? 600 : 480);
  }

  function go(delta){
    flipped = false;
    index = (index + delta + cards.length) % cards.length;
    render();
  }

  function init(){
    renderDeckPickers();
    document.getElementById("flashcard").addEventListener("click", flip);
    document.getElementById("cardPrev").addEventListener("click", () => go(-1));
    document.getElementById("cardNext").addEventListener("click", () => go(1));
  }

  return { init };
})();

/* ---------------- Quiz mode ---------------- */
const Quiz = (() => {
  let deckKey = null, questions = [], qIndex = 0, score = 0;

  function allAnswers(exceptKey){
    const pool = [];
    Object.entries(FLASHCARD_DECKS).forEach(([key, deck]) => {
      deck.cards.forEach(c => pool.push(c.a));
    });
    return pool;
  }

  function start(key){
    deckKey = key;
    const deck = FLASHCARD_DECKS[key];
    questions = shuffle(deck.cards).slice(0, Math.min(8, deck.cards.length));
    qIndex = 0; score = 0;
    document.getElementById("quizTotal").textContent = questions.length;
    document.getElementById("quizScore").textContent = "0";
    App.goTo("screen-quiz");
    renderQuestion();
  }

  function renderQuestion(){
    if (qIndex >= questions.length) return finish();
    const q = questions[qIndex];
    document.getElementById("quizIndex").textContent = qIndex + 1;
    document.getElementById("quizPrompt").textContent = q.q;

    const distractors = shuffle(
      allAnswers().filter(a => a !== q.a)
    ).slice(0, 3);
    const options = shuffle([q.a, ...distractors]);

    const wrap = document.getElementById("quizOptions");
    wrap.innerHTML = "";
    options.forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "quiz-option";
      btn.textContent = opt;
      btn.addEventListener("click", () => onAnswer(opt === q.a, btn));
      wrap.appendChild(btn);
    });
  }

  function onAnswer(correct, btn){
    document.querySelectorAll(".quiz-option").forEach(b => b.disabled = true);
    if (correct){
      btn.classList.add("correct");
      score++;
      document.getElementById("quizScore").textContent = score;
      App.sfxCorrect();
    } else {
      btn.classList.add("incorrect");
      App.sfxWrong();
      App.mascotSad();
    }
    qIndex++;
    setTimeout(renderQuestion, 800);
  }

  function finish(){
    const stars = score >= 7 ? 3 : score >= 5 ? 2 : score >= 3 ? 1 : 0;
    App.showModal({
      emoji: "🏅",
      title: "Quiz complete!",
      body: `You scored ${score} out of ${questions.length}.`,
      stars,
      onAgain: () => start(deckKey)
    });
  }

  return { start };
})();

document.addEventListener("DOMContentLoaded", Flashcards.init);
