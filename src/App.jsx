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
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const findWinningMove = (board, player) => {
  for (const [a, b, c] of winningCombinations) {
    const line = [board[a], board[b], board[c]];

    if (
      line.filter((cell) => cell === player).length === 2 &&
      line.includes(null)
    ) {
      if (board[a] === null) return a;
      if (board[b] === null) return b;
      return c;
    }
  }
  return null;
};

const computerMove = () => {
  let move = null;

  // 1. Win if possible
  move = findWinningMove(board, "O");

  // 2. Block opponent
  if (move === null) {
    move = findWinningMove(board, "X");
  }

  // 3. Take center
  if (move === null && board[4] === null) {
    move = 4;
  }

  // 4. Take a random corner
  if (move === null) {
    const corners = [0, 2, 6, 8].filter((i) => board[i] === null);
    if (corners.length) {
      move = corners[Math.floor(Math.random() * corners.length)];
    }
  }

  // 5. Take any remaining side
  if (move === null) {
    const sides = [1, 3, 5, 7].filter((i) => board[i] === null);
    if (sides.length) {
      move = sides[Math.floor(Math.random() * sides.length)];
    }
  }

  if (move === null) return;

  const newBoard = [...board];
  newBoard[move] = "O";
  setBoard(newBoard);
  setIsXNext(true);
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
