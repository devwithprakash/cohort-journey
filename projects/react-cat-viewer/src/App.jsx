import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const App = () => {
  const [catData, setCatData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCat = async () => {
    try {
      setLoading(true);
      const url = "https://api.freeapi.app/api/v1/public/cats/cat/random";
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      setCatData(data.data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCat();
  }, []);

  const stats = [
    { icon: "⏳", label: "Lifespan", value: catData?.life_span },
    { icon: "🌍", label: "Origin", value: catData?.origin },
    { icon: "⚖️", label: "Weight", value: catData?.weight.imperial },
    { icon: "🧠", label: "Intelligence", value: catData?.intelligence },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="w-80 bg-gray-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        <div className="h-28 bg-gradient-to-br from-violet-900 via-purple-700 to-fuchsia-600 relative flex items-end justify-center">
          <span className="absolute top-4 right-5 text-2xl opacity-20 rotate-12"></span>
          <span className="absolute top-10 left-5 text-lg opacity-15 -rotate-12"></span>

          <div
            className="absolute -bottom-11 left-1/2 -translate-x-1/2 rounded-full border-4 border-gray-900 overflow-hidden bg-purple-900 flex items-center justify-center shadow-lg shadow-purple-900/50"
            style={{ width: 140, height: 140 }}
          >
            {loading ? (
              <div className="w-full h-full bg-gray-800 animate-pulse flex items-center justify-center">
                <span className="text-5xl opacity-30">🐱</span>
              </div>
            ) : (
              <img
                src={catData?.image}
                alt={catData?.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        <div className="pt-16 pb-7 px-7 text-center">
          {loading ? (
            <div className="h-7 w-32 bg-gray-700 rounded-full animate-pulse mx-auto mb-2" />
          ) : (
            <h2 className="font-serif text-2xl font-medium text-white tracking-tight mb-1">
              {catData?.name}
            </h2>
          )}

          <div className="border-t border-white/5 mb-5" />

          <div className="grid grid-cols-2 gap-3 text-left">
            {stats.map((s) => (
              <div key={s.label} className="bg-gray-800 rounded-xl p-3">
                <p className="text-gray-500 text-xs font-medium tracking-widest uppercase mb-1 flex items-center gap-1">
                  <span className="text-xs">{s.icon}</span>
                  {s.label}
                </p>
                <p className="text-gray-200 text-sm font-medium">{s.value}</p>
              </div>
            ))}
          </div>

          <p className="text-gray-500 text-xs leading-relaxed text-center mt-5 mb-1 line-clamp-4">
            {catData?.description}
          </p>

          <div className="border-t border-white/5 mt-5 mb-5" />

          <button
            onClick={fetchCat}
            disabled={loading}
            className="w-full cursor-pointer py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-sm font-semibold tracking-wide shadow-lg shadow-purple-900/40 hover:from-violet-500 hover:to-fuchsia-500 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            Next Cat
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
