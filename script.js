// HTML Elements

const gameGrid = document.getElementById("game-grid");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

// Global Elements

const gameBoard = new Array(9).fill(null);

let gameOver;

const wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
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
  while (true) {
    const cellNum = Math.floor(Math.random() * 9);
    const cell = document.getElementById(`grid-item-${cellNum}`);
    if (cell.textContent === "") {
      cell.textContent = "O";
      gameBoard[cellNum] = "O";
      break;
    }
  }
// };

const aiTurn = () => {
  const scores = gameBoard.map((item) => {
  return  item === null ? 0 : null;
  })
  // Guaranteed win 100_00
  // Block win 10_00
  // Two in a row with a blank 100
  // Has empty row | has empty column | has empty diagonal 10
  // Is corner 1
}

const checkGameOver = () => {
  for (const win of wins) {
    if (
      gameBoard[win[0]] !== null &&
      gameBoard[win[0]] === gameBoard[win[1]] &&
      gameBoard[win[0]] === gameBoard[win[2]]
    ) {
      gameOver = true;
      if (gameBoard[win[0]] === "X") statusText.textContent = "Player Wins!";
      else statusText.textContent = "Computer Wins!";
      return;
    }
  }
  if (gameBoard.includes(null)) {
    gameOver = true;
    statusText.textContent = "Draw!";
  }
};

// Helper Functions