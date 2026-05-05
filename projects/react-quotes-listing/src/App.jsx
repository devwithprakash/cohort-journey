import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const App = () => {
  const [quote, setQuote] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      const url = "https://api.freeapi.app/api/v1/public/quotes/quote/random";
      try {
        setLoading(true);
        const response = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();

        setQuote(data.data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
        setVisible(true);
      }
    };

    setVisible(false);
    const timer = setTimeout(fetchQuote, 300);
    return () => clearTimeout(timer);
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <header className="border-b border-gray-900">
        <nav className="flex items-center justify-between h-13 px-6 max-w-2xl mx-auto w-full">
          <h1 className="text-base font-semibold text-white tracking-tight">
            Quote<span className="text-orange-500">ly</span>
          </h1>
          <span className="text-xs text-gray-600 uppercase tracking-widest">
            Daily inspiration
          </span>
        </nav>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-lg w-full bg-gray-900 border border-gray-800 rounded-2xl p-8 sm:p-10">
          <div
            style={{
              transition: "opacity 300ms ease, transform 300ms ease",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(10px)",
            }}
          >
            <p className="text-6xl text-orange-500 font-serif leading-none mb-1">
              "
            </p>
            <p className="text-base sm:text-lg text-gray-200 leading-relaxed italic font-serif mb-6">
              {quote.content}
            </p>
            <div className="w-8 h-px bg-orange-500 mb-4" />
            <p className="text-xs font-semibold text-orange-500 tracking-widest uppercase">
              {quote.author}
            </p>
          </div>

          <div className="flex justify-end mt-7">
            <button
              onClick={() => setPage((p) => p + 1)}
              className="h-9 px-4 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-white text-xs font-medium rounded-lg transition-colors"
            >
              Next quote →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
