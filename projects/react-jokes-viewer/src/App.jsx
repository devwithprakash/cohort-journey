import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const App = () => {
  const [joke, setJoke] = useState(null);
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchJoke = async () => {
    setVisible(false);
    const url = "https://api.freeapi.app/api/v1/public/randomjokes/joke/random";
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      setJoke(data.data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
      setVisible(true);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <header className="border-b border-gray-900">
        <nav className="flex items-center justify-between h-13 px-6 max-w-2xl mx-auto w-full">
          <h1 className="text-base font-semibold text-white">
            Ha<span className="text-yellow-400">ha</span>
          </h1>
          <span className="text-xs text-gray-600 uppercase tracking-widest">
            Random jokes
          </span>
        </nav>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-lg w-full bg-gray-900 border border-gray-800 rounded-2xl p-8 sm:p-10">
          <div
            style={{
              transition: "opacity 250ms ease, transform 250ms ease",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(8px)",
            }}
          >
            <p className="text-4xl mb-6">😄</p>
            <p className="text-base sm:text-lg text-gray-100 leading-relaxed mb-7">
              {joke?.content}
            </p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={fetchJoke}
              disabled={loading}
              className="h-9 px-4 bg-yellow-400 cursor-pointer hover:bg-yellow-300 disabled:opacity-50 text-black text-xs font-semibold rounded-lg transition-colors"
            >
              {loading ? "Loading..." : "Next joke →"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
