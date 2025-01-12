import { useState } from "react";

// function Square({ value, index, onSquareClick, xIsNext }) {
//   const handleClick = () => {
//     if (value) return;

//     let val = value;
//     if (xIsNext) val = "X";
//     else val = "O";

//     onSquareClick(val, index);
//   };

//   return (
//     <button className="square" onClick={handleClick}>
//       {value}
//     </button>
//   );
// }

function Square({ value, onSquareClick, winner }) {
  return (
    <button
      className="square"
      onClick={onSquareClick}
      style={{ color: winner ? "green" : "" }}
    >
      {value}
    </button>
  );
}

// function Board() {
function Board({ xIsNext, squares, onPlay, draw }) {
  // const [squares, setSquares] = useState(Array(9).fill(null));
  // const [isXTurn, setIsXTurn] = useState(true);

  // const [xIsNext, setXIsNext] = useState(true);
  // const winner = calculateWinner(squares);
  // let status;
  // if (winner) {
  //   status = "Winner: " + winner;
  // } else {
  //   status = "Next player: " + (isXTurn ? "X" : "O");
  // }

  // const handleClick = (val, index) => {
  //   if (squares[index] || calculateWinner(squares)) {
  //     return;
  //   }

  //   console.log(`val: ${val}`);
  //   console.log(`index: ${index}`);
  //   const i = +index;

  //   let newSquares = [...squares.slice(0, i), val, ...squares.slice(i + 1)];
  //   console.log(`newSquares: ${newSquares}`);

  //   setSquares(newSquares);
  //   setIsXTurn(!isXTurn);
  // };

  // function handleClick(i) {
  //   const nextSquares = squares.slice();
  //   if (xIsNext) {
  //     nextSquares[i] = "X";
  //   } else {
  //     nextSquares[i] = "O";
  //   }

  //   setSquares(nextSquares);
  //   setXIsNext(!xIsNext);
  // }

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) nextSquares[i] = "X";
    else nextSquares[i] = "O";

    onPlay(nextSquares);
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner?.value;
  } else if (draw) {
    status = "Match is draw";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const renderSquare = (index, row, col) => (
    <Square
      value={squares[index]}
      index={index}
      winner={
        calculateWinner(squares)
          ? calculateWinner(squares).line.findIndex((x) => x === index) !== -1
          : false
      }
      onSquareClick={() => handleClick(index)}
    />
  );

  const renderRow = (row) => (
    <div className="board-row" key={row}>
      {[0, 1, 2].map((col) => (
        <span key={col}>{renderSquare(row * 3 + col, row, col)}</span>
      ))}
    </div>
  );

  return (
    <>
      <div className="status">{status}</div>
      {[0, 1, 2].map(renderRow)}
      {/* <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div> */}
    </>
  );

  // return (
  //   <>
  //     <div className="status">{status}</div>
  //     <div className="board-row">
  //       <Square
  //         value={squares[0]}
  //         index="0"
  //         onSquareClick={handleClick}
  //         xIsNext={xIsNext}
  //       />
  //       <Square
  //         value={squares[1]}
  //         index="1"
  //         onSquareClick={handleClick}
  //         xIsNext={xIsNext}
  //       />
  //       <Square
  //         value={squares[2]}
  //         index="2"
  //         onSquareClick={handleClick}
  //         xIsNext={xIsNext}
  //       />
  //     </div>
  //     <div className="board-row">
  //       <Square
  //         value={squares[3]}
  //         index="3"
  //         onSquareClick={handleClick}
  //         xIsNext={xIsNext}
  //       />
  //       <Square
  //         value={squares[4]}
  //         index="4"
  //         onSquareClick={handleClick}
  //         xIsNext={xIsNext}
  //       />
  //       <Square
  //         value={squares[5]}
  //         index="5"
  //         onSquareClick={handleClick}
  //         xIsNext={xIsNext}
  //       />
  //     </div>
  //     <div className="board-row">
  //       <Square
  //         value={squares[6]}
  //         index="6"
  //         onSquareClick={handleClick}
  //         xIsNext={xIsNext}
  //       />
  //       <Square
  //         value={squares[7]}
  //         index="7"
  //         onSquareClick={handleClick}
  //         xIsNext={xIsNext}
  //       />
  //       <Square
  //         value={squares[8]}
  //         index="8"
  //         onSquareClick={handleClick}
  //         xIsNext={xIsNext}
  //       />
  //     </div>
  //   </>
  // );
}

export default function Game() {
  // const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [movesHistory, setMovesHistory] = useState([0]);
  // const [movesHistory, setMovesHistory] = useState([]);
  // const currentSquares = history[history.length - 1];
  const [sortDesc, setSortDesc] = useState(true);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    const movesAsc = movesHistory.toSorted((a, b) => a - b);
    const nextMovesHistory = [
      ...movesAsc.slice(0, currentMove + 1),
      currentMove + 1,
    ];
    // const nextMoveHistory = [
    //   ...movesHistory.slice(0, currentMove + 1),
    //   { currentMove, nextHistory },
    // ];
    // setHistory([...history, nextSquares]);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    const sorted = !sortDesc
      ? nextMovesHistory.toSorted((a, b) => b - a)
      : nextMovesHistory.toSorted((a, b) => a - b);
    setMovesHistory(sorted);
    // setXIsNext(!xIsNext);
    // setMovesHistory(nextMoveHistory);
  };

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
    // setXIsNext(nextMove % 2 === 0);
  };

  const moves = movesHistory.map((move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + (move + 1);
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        {currentMove === move && "You are at move# " + (move + 1)}
        {currentMove !== move && (
          <button onClick={() => jumpTo(move)}>{description}</button>
        )}
      </li>
    );
  });

  const sortMoves = () => {
    const sorted = sortDesc
      ? movesHistory.toSorted((a, b) => b - a)
      : movesHistory.toSorted((a, b) => a - b);
    setSortDesc(!sortDesc);
    setMovesHistory(sorted);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          draw={movesHistory.length - 1 === 9}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
      <div className="game-info">
        <button onClick={sortMoves}>Toggle moves</button>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        value: squares[a],
        line: lines[i],
      };
    }
  }
  return null;
}
