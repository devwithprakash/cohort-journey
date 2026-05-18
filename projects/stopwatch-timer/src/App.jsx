import { useRef, useState } from "react";

function App() {
  const [activeTab, setActiveTab] = useState("stopwatch");

  const [stopWatchValue, setStopWatchValue] = useState(0);

  const [time, setTime] = useState("12:12:12");
  const [initialTime, setInitialTime] = useState("12:12:12");

  let stopWatchIntervalRef = useRef(null);
  let timerIntervalRef = useRef(null);

  // Stop watch
  const startStopWatch = () => {
    stopWatchIntervalRef.current = setInterval(() => {
      setStopWatchValue((p) => p + 1);
    }, 1000);
  };

  const formatStopWatch = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60;

    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  const stopStopWatch = () => {
    clearInterval(stopWatchIntervalRef.current);
  };

  const resetStopWatch = () => {
    clearInterval(stopWatchIntervalRef.current);

    setStopWatchValue(0);

    stopWatchIntervalRef.current = null;
  };

  // Timer
  const formatTime = (total) => {
    const hours = Math.floor(total / 3600);

    const minutes = Math.floor((total % 3600) / 60);

    const seconds = total % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0",
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const startTimer = () => {
    const isValidTime = (value) => {
      return /^([0-1]?\d|2[0-3]):([0-5]?\d):([0-5]?\d)$/.test(value);
    };

    if (!isValidTime(time)) {
      alert("Invalid time format");
      return;
    }

    setInitialTime(time);

    const [hours, minutes, seconds] = time.split(":").map(Number);

    let totalSeconds = hours * 3600 + minutes * 60 + seconds;

    clearInterval(timerIntervalRef.current);

    timerIntervalRef.current = setInterval(() => {
      if (totalSeconds <= 0) {
        clearInterval(timerIntervalRef.current);
        return;
      }

      totalSeconds--;

      setTime(formatTime(totalSeconds));
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(timerIntervalRef.current);

    timerIntervalRef.current = null;
  };

  const resetTimer = () => {
    clearInterval(timerIntervalRef.current);

    setTime(initialTime);

    timerIntervalRef.current = null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 text-zinc-800 flex items-center justify-center p-6 overflow-hidden relative">
      {/* Sakura Blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-rose-300/30 rounded-full blur-3xl" />

      {/* Floating Sakura */}
      <div className="absolute top-10 left-10 text-3xl opacity-30 animate-bounce">
        🌸
      </div>

      <div className="absolute top-32 right-20 text-2xl opacity-20 animate-pulse">
        🌸
      </div>

      <div className="absolute bottom-20 left-20 text-4xl opacity-20 animate-bounce">
        🌸
      </div>

      <div className="w-full max-w-md rounded-[32px] border border-pink-200/60 bg-white/70 backdrop-blur-xl p-6 shadow-[0_20px_60px_rgba(244,114,182,0.15)] relative z-10">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-wide text-rose-500">
            時間
          </h1>

          <p className="text-sm text-zinc-500 mt-2 tracking-[0.2em] uppercase">
            Sakura Time
          </p>
        </div>

        <div className="flex bg-rose-100/80 rounded-2xl p-1 mb-8">
          <button
            onClick={() => setActiveTab("stopwatch")}
            className={`flex-1 rounded-xl py-2.5 font-medium transition-all duration-300 ${
              activeTab === "stopwatch"
                ? "bg-white text-rose-500 shadow-md"
                : "text-zinc-500 hover:text-rose-500"
            }`}
          >
            Stopwatch
          </button>

          <button
            onClick={() => setActiveTab("timer")}
            className={`flex-1 rounded-xl py-2.5 font-medium transition-all duration-300 ${
              activeTab === "timer"
                ? "bg-white text-rose-500 shadow-md"
                : "text-zinc-500 hover:text-rose-500"
            }`}
          >
            Timer
          </button>
        </div>

        {activeTab === "stopwatch" && (
          <div className="flex flex-col items-center gap-8">
            <h1 className="text-6xl font-bold tracking-widest text-rose-400 drop-shadow-sm">
              {formatStopWatch(stopWatchValue)}
            </h1>

            <div className="flex gap-3 w-full">
              <button
                onClick={startStopWatch}
                className="flex-1 rounded-2xl bg-gradient-to-r from-rose-400 to-pink-400 text-white py-3 font-semibold shadow-lg hover:scale-[1.03] active:scale-[0.98] transition"
              >
                Start
              </button>

              <button
                onClick={stopStopWatch}
                className="flex-1 rounded-2xl bg-white border border-rose-200 py-3 font-semibold text-zinc-700 hover:bg-rose-50 transition"
              >
                Pause
              </button>

              <button
                onClick={resetStopWatch}
                className="flex-1 rounded-2xl bg-red-400 text-white py-3 font-semibold hover:bg-red-500 transition"
              >
                Reset
              </button>
            </div>
          </div>
        )}

        {activeTab === "timer" && (
          <div className="flex flex-col gap-6">
            <input
              type="text"
              value={time}
              onChange={(e) => {
                clearInterval(timerIntervalRef.current);
                return setTime(e.target.value);
              }}
              placeholder="HH:MM:SS"
              className="w-full rounded-2xl bg-white/80 border border-rose-200 px-4 py-4 text-center text-3xl tracking-widest outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-200/40 transition shadow-sm"
            />

            <div className="flex gap-3">
              <button
                onClick={startTimer}
                className="flex-1 rounded-2xl bg-gradient-to-r from-rose-400 to-pink-400 text-white py-3 font-semibold shadow-lg hover:scale-[1.03] active:scale-[0.98] transition"
              >
                Start
              </button>

              <button
                onClick={pauseTimer}
                className="flex-1 rounded-2xl bg-white border border-rose-200 py-3 font-semibold text-zinc-700 hover:bg-rose-50 transition"
              >
                Pause
              </button>

              <button
                onClick={resetTimer}
                className="flex-1 rounded-2xl bg-red-400 text-white py-3 font-semibold hover:bg-red-500 transition"
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
