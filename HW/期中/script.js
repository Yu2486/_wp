const board = document.getElementById("board");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");

let score = 0;
let time = 30;
let timer;
let moleTimer;

function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const hole = document.createElement("div");
    hole.classList.add("hole");
    hole.dataset.index = i;
    hole.addEventListener("click", hitMole);
    board.appendChild(hole);
  }
}

function startGame() {
  score = 0;
  time = 30;
  scoreEl.textContent = score;
  timeEl.textContent = time;
  createBoard();

  timer = setInterval(() => {
    time--;
    timeEl.textContent = time;
    if (time <= 0) {
      clearInterval(timer);
      clearInterval(moleTimer);
      alert("遊戲結束！你得了 " + score + " 分");
    }
  }, 1000);

  moleTimer = setInterval(showMole, 700);
}

function showMole() {
  document.querySelectorAll(".hole").forEach(h => h.classList.remove("mole"));
  const index = Math.floor(Math.random() * 9);
  const mole = document.querySelector(`.hole[data-index="${index}"]`);
  mole.classList.add("mole");
}

function hitMole(e) {
  if (e.target.classList.contains("mole")) {
    score++;
    scoreEl.textContent = score;
    e.target.classList.remove("mole");
  }
}
