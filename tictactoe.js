/* ===================================================================
   Tic Tac Toe — kid plays X, Ziggy plays O. AI blends a random move
   with a minimax-optimal move; the blend ratio is what makes each of
   the 10 levels harder than the last. 5 rounds per level; a draw
   against a perfect opponent still counts as good play.
   =================================================================== */

const TicTacToeGame = (() => {
  const WIN_LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  let level = 1, smart = 0.5;
  let board = Array(9).fill(null);
  let active = false;
  let round = 0, totalRounds = 5, wins = 0, draws = 0, losses = 0;
  let refreshPicker = null;

  function checkWinner(bd){
    for (const [a,b,c] of WIN_LINES){
      if (bd[a] && bd[a] === bd[b] && bd[b] === bd[c]) return { winner: bd[a], line: [a,b,c] };
    }
    if (bd.every(c => c)) return { winner: "draw", line: null };
    return null;
  }

  function minimaxScore(bd, isMax){
    const result = checkWinner(bd);
    if (result){
      if (result.winner === "O") return 1;
      if (result.winner === "X") return -1;
      return 0;
    }
    let best = isMax ? -Infinity : Infinity;
    for (let i = 0; i < 9; i++){
      if (!bd[i]){
        bd[i] = isMax ? "O" : "X";
        const score = minimaxScore(bd, !isMax);
        bd[i] = null;
        best = isMax ? Math.max(best, score) : Math.min(best, score);
      }
    }
    return best;
  }

  function bestMove(bd){
    let best = null, bestScore = -Infinity;
    for (let i = 0; i < 9; i++){
      if (!bd[i]){
        bd[i] = "O";
        const score = minimaxScore(bd, false);
        bd[i] = null;
        if (score > bestScore){ bestScore = score; best = i; }
      }
    }
    return best;
  }

  function aiMove(){
    const empties = [];
    board.forEach((v, i) => { if (!v) empties.push(i); });
    if (empties.length === 0) return null;
    return (Math.random() < smart) ? bestMove(board) : empties[randInt(0, empties.length - 1)];
  }

  function start(lvl){
    level = lvl;
    smart = TICTACTOE_LEVELS[level - 1].smart;
    round = 0; wins = 0; draws = 0; losses = 0;
    document.getElementById("tttLevelNum").textContent = level;
    updateHud();
    App.goTo("screen-game-tictactoe");
    startRound();
  }

  function startRound(){
    round++;
    if (round > totalRounds) return finish();
    board = Array(9).fill(null);
    active = true;
    document.getElementById("tttRound").textContent = round;
    document.getElementById("tttStatus").textContent = "Your turn — tap a square!";
    renderBoard();
  }

  function renderBoard(winLine){
    const grid = document.getElementById("tttBoard");
    grid.innerHTML = "";
    board.forEach((val, i) => {
      const cell = document.createElement("button");
      cell.className = "ttt-cell" + (val ? " " + val.toLowerCase() : "") + (winLine && winLine.includes(i) ? " win" : "");
      cell.textContent = val === "X" ? "❌" : val === "O" ? "⭐" : "";
      cell.disabled = !!val || !active;
      cell.addEventListener("click", () => onCellClick(i));
      grid.appendChild(cell);
    });
  }

  function onCellClick(i){
    if (!active || board[i]) return;
    board[i] = "X";
    renderBoard();
    App.sfxTap(500);

    const result = checkWinner(board);
    if (result){ return endRound(result); }

    active = false;
    document.getElementById("tttStatus").textContent = "Ziggy is thinking...";
    setTimeout(() => {
      const move = aiMove();
      if (move !== null) board[move] = "O";
      const result2 = checkWinner(board);
      if (result2){
        renderBoard(result2.line);
        return endRound(result2);
      }
      active = true;
      renderBoard();
      document.getElementById("tttStatus").textContent = "Your turn — tap a square!";
    }, 500);
  }

  function endRound(result){
    active = false;
    renderBoard(result.line);
    if (result.winner === "X"){
      wins++; App.sfxCorrect(); App.mascotHappy();
      document.getElementById("tttStatus").textContent = "You win! 🎉";
    } else if (result.winner === "O"){
      losses++; App.sfxWrong(); App.mascotSad();
      document.getElementById("tttStatus").textContent = "Ziggy wins this one!";
    } else {
      draws++; App.sfxTap(440);
      document.getElementById("tttStatus").textContent = "It's a draw — good game!";
    }
    updateHud();
    setTimeout(startRound, 1400);
  }

  function updateHud(){
    document.getElementById("tttWins").textContent = wins;
    document.getElementById("tttDraws").textContent = draws;
    document.getElementById("tttLosses").textContent = losses;
  }

  function finish(){
    const points = wins * 2 + draws;
    const stars = points >= 8 ? 3 : points >= 5 ? 2 : points >= 2 ? 1 : 0;
    Levels.complete("tictactoe", level, stars, 10);
    App.showModal({
      emoji: "⭕",
      title: "Match complete!",
      body: `${wins} win${wins===1?"":"s"}, ${draws} draw${draws===1?"":"s"}, ${losses} loss${losses===1?"":"es"} out of ${totalRounds} games.`,
      stars,
      onAgain: () => start(level),
      onHome: () => { if (refreshPicker) refreshPicker(); App.goTo("screen-picker-tictactoe"); }
    });
  }

  function initPicker(){
    refreshPicker = wireLevelPicker("picker-tictactoe", "tictactoeLevelGrid", "tictactoe", 10,
      (i) => `${TICTACTOE_LEVELS[i-1].label} · Ages ${TICTACTOE_LEVELS[i-1].ages}`,
      start);
  }

  return { start, initPicker };
})();

document.addEventListener("DOMContentLoaded", TicTacToeGame.initPicker);
