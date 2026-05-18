import { useState } from "react";
import { toast } from "react-hot-toast";

function App() {
  const [sign, setSign] = useState(null);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [gameStarted, setGameStarted] = useState(false);
  const [result, setResult] = useState(null);

  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkPattern = (board) => {
    for (const pattern of winningPatterns) {
      const [a, b, c] = pattern;

      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        setResult(board[a]);
        return;
      }
    }

    if (!board.includes(null)) {
      setResult("draw");
    }
  };

  const handleClick = (index) => {
    if (!gameStarted) return;
    if (board[index]) return;

    const newBoard = [...board];
    newBoard[index] = sign;

    setBoard(newBoard);
    checkPattern(newBoard);

    setSign((prev) => (prev === "O" ? "X" : "O"));
  };

  const restart = () => {
    setBoard(Array(9).fill(null));
    setGameStarted(false);
    setSign(null);
  };

  const startGame = (chosenSign) => {
    setSign(chosenSign);
    setGameStarted(true);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center text-white overflow-hidden bg-gradient-to-br from-zinc-950 via-black to-zinc-900">
      {result && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-zinc-900 border border-rose-500/30 rounded-3xl p-8 text-center w-[300px] shadow-2xl backdrop-blur-xl">
            {result === "draw" ? (
              <h1 className="text-2xl font-bold text-zinc-300">
                🌸 It's a Draw!
              </h1>
            ) : (
              <h1 className="text-2xl font-bold text-rose-400">
                🏆 Winner: {result}
              </h1>
            )}

            <p className="text-sm text-zinc-400 mt-2">Game Over</p>

            <button
              onClick={() => {
                setBoard(Array(9).fill(null));
                setResult(null);
                setGameStarted(false);
                setSign(null);
              }}
              className="mt-5 px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl transition"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl" />

      <div className="absolute top-10 left-10 text-3xl opacity-20 animate-bounce">
        🌸
      </div>
      <div className="absolute top-40 right-20 text-2xl opacity-10 animate-pulse">
        🌸
      </div>
      <div className="absolute bottom-20 left-20 text-4xl opacity-10 animate-bounce">
        🌸
      </div>

      <div className="relative z-10">
        {!gameStarted && (
          <div className="bg-zinc-900/70 backdrop-blur-xl border border-zinc-700 rounded-3xl p-8 text-center shadow-2xl w-[340px]">
            <h1 className="text-4xl font-bold text-rose-400 tracking-wide">
              Tic Tac Toe
            </h1>

            <p className="text-sm text-zinc-400 mt-2 mb-6 tracking-widest">
              Choose your sign
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => startGame("X")}
                className="w-20 h-20 text-3xl font-bold bg-zinc-800 border border-zinc-700 text-rose-300 rounded-2xl shadow-md hover:bg-rose-500/20 hover:border-rose-400 hover:scale-105 transition"
              >
                X
              </button>

              <button
                onClick={() => startGame("O")}
                className="w-20 h-20 text-3xl font-bold bg-zinc-800 border border-zinc-700 text-rose-300 rounded-2xl shadow-md hover:bg-rose-500/20 hover:border-rose-400 hover:scale-105 transition"
              >
                O
              </button>
            </div>
          </div>
        )}

        {gameStarted && (
          <div className="flex flex-col items-center gap-6">
            <div className="text-lg text-zinc-300">
              Current Turn:{" "}
              <span className="text-rose-400 font-bold">{sign}</span>
            </div>

            <div className="grid grid-cols-3 gap-3 p-4 bg-zinc-900/60 backdrop-blur-xl rounded-3xl border border-zinc-700 shadow-2xl">
              {board.map((cell, index) => (
                <button
                  key={index}
                  onClick={() => handleClick(index)}
                  className={`w-24 h-24 border rounded-2xl flex items-center justify-center text-3xl font-bold shadow-md transition active:scale-95 hover:scale-105 ${
                    cell === "X"
                      ? "text-violet-300 border-violet-500/40 hover:bg-violet-500/10 shadow-[0_0_10px_rgba(167,139,250,0.25)]"
                      : cell === "O"
                        ? "text-rose-400 border-rose-500/40 hover:bg-rose-500/10 shadow-[0_0_10px_rgba(244,114,182,0.25)]"
                        : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700"
                  }`}
                >
                  {cell}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={restart}
                className="px-5 py-2 rounded-xl bg-rose-500/80 text-white shadow-md hover:bg-rose-500 transition"
              >
                Restart
              </button>

              <button
                onClick={() => {
                  setBoard(Array(9).fill(null));
                  setGameStarted(false);
                  setSign(null);
                }}
                className="px-5 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 transition"
              >
                New Game
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
