const gameGrid = document.getElementById("game-grid");

const gameBoard = new Array(9).fill(null);

gameGrid.addEventListener("click", (e) => {
  const cell = document.getElementById(e.target.id);
  if (cell.textContent !== "") return;
  cell.textContent = "X";
  gameBoard[Number(e.target.id[e.target.id.length - 1])] = "X";
  if (gameover()) return;
  aiTurn();
});

const aiTurn = () => {
  while (true) {
    const cellNum = Math.floor(Math.random() * 9);
    const cell = document.getElementById(`grid-item-${cellNum}`);
    if (cell.textContent === "") {
      cell.textContent = "O";
      gameBoard[cellNum] = "O";
      break;
    }
  }
};

const gameover = () => {
  return !gameBoard.includes(null);
};
