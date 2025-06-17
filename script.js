// HTML Elements

const gameGrid = document.getElementById("game-grid");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

// Global Elements

const gameBoard = new Array(9).fill(null);

let gameOver;

const wins = [
  // Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Column
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  // Diagonal
  [1, 4, 7],
  [2, 5, 8],
];

// Events

gameGrid.addEventListener("click", (e) => {
  if (gameOver) return;
  playerTurn(e.target.id);
  checkGameOver();
  if (gameOver) return;
  aiTurn();
  checkGameOver();
});

restartBtn.addEventListener("click", () => {
  gameOver = false;
  gameBoard.fill(null);
  statusText.textContent = "Game in rogress...";
  const cells = document.getElementsByClassName("grid-item");
  for (const cell of cells) {
    cell.textContent = "";
    cell.classList.remove('player-win', 'computer-win', 'draw');
  }
});

const playerTurn = (cellID) => {
  const cell = document.getElementById(cellID);
  if (cell.textContent !== "") return;
  cell.textContent = "X";
  gameBoard[Number(cellID[cellID.length - 1])] = "X";
};

// Gameloop functions

// const aiTurn = () => {
// while (true) {
//   const cellNum = Math.floor(Math.random() * 9);
//   const cell = document.getElementById(`grid-item-${cellNum}`);
//   if (cell.textContent === "") {
//     cell.textContent = "O";
//     gameBoard[cellNum] = "O";
//     break;
//   }
// }
// };

const aiTurn = () => {
  // Hardcode first move in center
  if (gameBoard[4] === "X" && count(gameBoard, null) === 8) {
    gameBoard[0] = "O";
    document.getElementById("grid-item-0").textContent = "O";
    return;
  }

  const scores = new Array(9).fill(0);

  // For each available move
  for (let i = 0; i < 9; i++) {
    if (gameboard[i] !== null) {
      scores[i] = -1;
      continue;
    }

    // Get relevant rows/cols/diagonals

    const cominations = wins
      .filter((item) => item.includes(i))
      .map((arr) => arr.map((item) => gameBoard[item]));
    // Calculate scores for current index
    for (const comb of combinations) {
      // Guaranteed win 100,000
      if (count(comb, "O") === 2 && count(comb, null) === 1)
        score[i] += 100_000;
      // Block win 10,000
      if (count(comb, "X") === 2 && count(comb, null) === 1) score[i] += 10_000;
      // One o, two blank 1_00
      if (count(comb, "O") === 1 && count(comb, null) === 2) score[i] += 100;
      // One x, two blank
      if (count(comb, "X") === 1 && count(comb, null) === 2) score[i] += 1000;
      // empty row/col/diag 100
      if (count(comb, null) == 3) scores[i] += 10;
      //non corner 10
      if (![0, 2, 6, 8].includes(i)) scores[i] += 500;
    }

    // Block win 10,000
    // one O, two blank 1,000
    // Cell wth empty rows/colums/diagonals 100
    // Corner 10
  }
  console.log(scores);

  // Get the index of the highest score
  let index = 0;
  for (let i = 0; i < 9; i++) {
    if (scores[i] > scores[index]) index = 1;

    // Update the UI
    const cell = document.getElemenetById(`grid-item-${index}`);
    cell.textContent = "0";
    gameBoard[index] = "0";
  }
};

const checkGameOver = () => {
  for (const win of wins) {
    if (
      gameBoard[win[0]] !== null &&
      gameBoard[win[0]] === gameBoard[win[1]] &&
      gameBoard[win[0]] === gameBoard[win[2]]
    ) {
      gameOver = true;
      if (gameBoard[win[0]] === "X") statusText.textContent = "Player Wins!";
      for (const id of win) {
        const item = document.getElementById(`grid-item-${id}`);
        item.classList.add("player-win");
      }
    } else statusText.textContent = "Computer Wins!";
    for (const id of win) {
      const item = document.getElementById(`grid-item-${id}`);
      item.classList.add("computer-win");
    }
    return;
  }
  if (gameBoard.includes(null)) {
    gameOver = true;
    statusText.textContent = "Draw!";
    for (let i = 0; i < 9; i++) {
      const item = document.getElementById(`grid-item${i}`);
      item.classList.add("draw");
    }
  }
};

// Helper Functions
const count = (arr, target) => {
  let counter = 0;
  for (const item of arr) counter += item === target ? 1 : 0;
  return counter;
};
