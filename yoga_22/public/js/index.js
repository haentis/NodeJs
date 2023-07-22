document.getElementById('logoutButton').addEventListener('click', () => {
    document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    location.href = '/login.html';
  });
  
  const authCookie = document.cookie
    .split(';')
    .find((item) => item.trim().startsWith('auth='));
  
  if (!authCookie) {
    location.href = '/login.html';
  }

const board = document.getElementById('board');
const cells = [];
const resetButton = document.getElementById('resetButton');
const endButton = document.getElementById('endButton');

let currentPlayer = 'X';
let gameFinished = false;

function initBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.onclick = () => makeMove(i);
    board.appendChild(cell);
    cells.push(cell);
  }
}

function makeMove(index) {
  if (gameFinished) return;

  const cell = cells[index];
  if (!cell.textContent) {
    cell.textContent = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
      gameFinished = true;
      alert(`Победил игрок ${currentPlayer}`);
      break;
    }
  }

  if (!Array.from(cells).some((cell) => cell.textContent === '')) {
    gameFinished = true;
    alert('Ничья');
  }
}

// Обработчик события завершения игры
function endGame() {
    gameFinished = true;
    alert('Игра завершена');
    location.href = '/login.html';
  }

// Обработчик события начала новой игры
function resetBoard() {
  Array.from(cells).forEach((cell) => (cell.textContent = ''));
  currentPlayer = 'X';
  gameFinished = false;
}

initBoard();