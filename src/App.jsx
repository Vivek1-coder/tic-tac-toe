import React, { useState, useEffect } from "react";
import "./App.css";

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true); // Player is "X"
  const winner = calculateWinner(board);

  useEffect(() => {
    if (!isXNext && !winner) {
      const timer = setTimeout(() => {
        computerMove();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isXNext, winner]);

  const handleClick = (index) => {
    if (board[index] || winner || !isXNext) return; // Prevent invalid moves
    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    setIsXNext(false);
  };

const winningCombinations = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

const checkWinner = (board) => {
  for (const [a,b,c] of winningCombinations) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  if (board.every(cell => cell !== null)) return "draw";

  return null;
};

const minimax = (board, depth, isMaximizing) => {
  const result = checkWinner(board);

  if (result === "O") return 10 - depth;
  if (result === "X") return depth - 10;
  if (result === "draw") return 0;

  if (isMaximizing) {
    let best = -Infinity;

    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = "O";
        best = Math.max(best, minimax(board, depth + 1, false));
        board[i] = null;
      }
    }

    return best;
  } else {
    let best = Infinity;

    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = "X";
        best = Math.min(best, minimax(board, depth + 1, true));
        board[i] = null;
      }
    }

    return best;
  }
};

const computerMove = () => {
  let bestScore = -Infinity;
  let bestMove = -1;

  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = "O";

      const score = minimax(board, 0, false);

      board[i] = null;

      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  if (bestMove !== -1) {
    const newBoard = [...board];
    newBoard[bestMove] = "O";
    setBoard(newBoard);
    setIsXNext(true);
  }
};
  const renderSquare = (index) => (
    <button className="square" onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="game">
      <div className="w-full m-4 flex flex-col justify-center items-center" >
      <h1 className="w-full text-center m-4">Tic Tac Toe</h1>
        <div className="board">
          {[...Array(3)].map((_, rowIndex) => (
            <div key={rowIndex} className="board-row">
              {renderSquare(rowIndex * 3)}
              {renderSquare(rowIndex * 3 + 1)}
              {renderSquare(rowIndex * 3 + 2)}
            </div>
          ))}
        </div>
      </div>
      {winner ? (
        <div className="winner-message">
          <h2>{winner === "X" ? "You Win!" : "Computer Wins!"}</h2>
        </div>
      ) : (
        <div className="turn-message">
          <h2>Next Player: {isXNext ? "You (X)" : "Computer (O)"}</h2>
        </div>
      )}
      <button className="restart-button" onClick={handleRestart}>
        Restart Game
      </button>
    </div>
  );
}

// Utility function to calculate the winner
function calculateWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export default TicTacToe;
