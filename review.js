/* ===================================================================
   Review — shown between a quiz-style game finishing and the results
   modal, when there were any wrong answers. Reused by Math Quiz,
   Number Patterns, and the Flashcard Quiz.
   =================================================================== */

const Review = (() => {
  let onContinue = null;

  function show(missed, continueCallback){
    onContinue = continueCallback;
    const list = document.getElementById("reviewList");
    list.innerHTML = "";
    missed.forEach(item => {
      const row = document.createElement("div");
      row.className = "review-item";
      row.innerHTML = `
        <div class="review-q">${item.prompt}</div>
        <div class="review-answers">
          <span class="review-wrong">You picked: ${item.yourAnswer}</span>
          <span class="review-correct">Correct: ${item.correctAnswer}</span>
        </div>`;
      list.appendChild(row);
    });
    document.getElementById("reviewCount").textContent = missed.length;
    App.goTo("screen-review");
  }

  function init(){
    document.getElementById("reviewContinueBtn").addEventListener("click", () => {
      if (typeof onContinue === "function") onContinue();
    });
  }

  /** Convenience: if there's anything to review, show it first; either
   *  way `finishFn` eventually runs the normal results-modal logic. */
  function maybeShow(missed, finishFn){
    if (missed && missed.length){
      show(missed, finishFn);
    } else {
      finishFn();
    }
  }

  return { show, maybeShow, init };
})();

document.addEventListener("DOMContentLoaded", Review.init);
