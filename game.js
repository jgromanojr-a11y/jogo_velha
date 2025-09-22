const cells = document.querySelectorAll('.cell');
  const status = document.getElementById('status');
  let board = Array(9).fill(null);
  let currentPlayer = 'X';
  let running = true;

  function checkWin() {
    const winConditions = [
      [0,1,2],[3,4,5],[6,7,8], // linhas
      [0,3,6],[1,4,7],[2,5,8], // colunas
      [0,4,8],[2,4,6]          // diagonais
    ];

    for (const condition of winConditions) {
      const [a,b,c] = condition;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  function checkDraw() {
    return board.every(cell => cell !== null);
  }

  function updateStatus(text) {
    status.textContent = text;
  }

  function handleClick(e) {
    const index = e.target.getAttribute('data-index');
    if (board[index] !== null || !running) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add(currentPlayer.toLowerCase());

    const winner = checkWin();
    if (winner) {
      updateStatus(`Jogador ${winner} venceu!`);
      running = false;
      return;
    }
    if (checkDraw()) {
      updateStatus("Empate!");
      running = false;
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus(`Vez do ${currentPlayer}`);
  }

  cells.forEach(cell => cell.addEventListener('click', handleClick));
