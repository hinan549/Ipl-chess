const PIECES = {
  'r': '♜',
  'n': '♞',
  'b': '♝',
  'q': '♛',
  'k': '♚',
  'p': '♟',
  'R': '♖',
  'N': '♘',
  'B': '♗',
  'Q': '♕',
  'K': '♔',
  'P': '♙',
};

const START_FEN = 
  "rnbqkbnr" +
  "pppppppp" +
  "........" +
  "........" +
  "........" +
  "........" +
  "PPPPPPPP" +
  "RNBQKBNR";

const boardElement = document.getElementById('board');
let board = [];
let selectedSquare = null;

function createBoard() {
  boardElement.innerHTML = '';
  board = [];
  for(let i=0; i<64; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    const row = Math.floor(i/8);
    const col = i % 8;
    if ((row + col) % 2 === 0) {
      square.classList.add('light');
    } else {
      square.classList.add('dark');
    }
    square.dataset.index = i;
    square.addEventListener('click', onSquareClick);
    boardElement.appendChild(square);
    board.push(square);
  }
}

function loadPosition(fen) {
  for(let i=0; i<64; i++) {
    const char = fen[i];
    const sq = board[i];
    if(char === '.') {
      sq.textContent = '';
      sq.classList.remove('csk', 'mi');
    } else {
      sq.textContent = PIECES[char];
      if(char === char.toUpperCase()) {
        sq.classList.add('csk');
        sq.classList.remove('mi');
      } else {
        sq.classList.add('mi');
        sq.classList.remove('csk');
      }
    }
  }
}

function onSquareClick(e) {
  const idx = parseInt(e.currentTarget.dataset.index);
  if(selectedSquare === null) {
    if(board[idx].textContent !== '') {
      selectedSquare = idx;
      board[idx].classList.add('selected');
    }
  } else {
    movePiece(selectedSquare, idx);
    board[selectedSquare].classList.remove('selected');
    selectedSquare = null;
  }
}

function movePiece(from, to) {
  const fromPiece = board[from].textContent;
  const toPiece = board[to].textContent;
  if(from === to) return;
  if(board[from].classList.contains('csk') && board[to].classList.contains('csk')) return;
  if(board[from].classList.contains('mi') && board[to].classList.contains('mi')) return;

  board[to].textContent = fromPiece;
  board[to].className = 'square ' + (board[to].classList.contains('light') ? 'light' : 'dark');
  if(board[from].classList.contains('csk')) board[to].classList.add('csk');
  else board[to].classList.add('mi');

  board[from].textContent = '';
  board[from].classList.remove('csk', 'mi');
}

createBoard();
loadPosition(START_FEN);