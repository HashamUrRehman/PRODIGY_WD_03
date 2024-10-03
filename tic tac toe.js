const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('gameStatus');
const restartBtn = document.getElementById('restartBtn');
let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

// Winning combinations
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Event listeners for each cell
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

function handleCellClick(e) {
  const clickedCell = e.target;
  const clickedCellIndex = clickedCell.getAttribute('data-index');

  if (board[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  updateCell(clickedCell, clickedCellIndex);
  checkWinner();
}

// Update cell with the current player's mark
function updateCell(cell, index) {
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

// Check for a winner or a draw
function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    let a = board[winCondition[0]];
    let b = board[winCondition[1]];
    let c = board[winCondition[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }

    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

// Restart the game
restartBtn.addEventListener('click', restartGame);

function restartGame() {
  currentPlayer = "X";
  gameActive = true;
  board = ["", "", "", "", "", "", "", "", ""];

  cells.forEach(cell => cell.textContent = "");
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}
