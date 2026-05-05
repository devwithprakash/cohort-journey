import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const MealCard = ({ meal }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-101">
      <div className="relative">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-56 object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 leading-tight">
          {meal?.strMeal}
        </h3>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-gray-400 text-sm">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            {meal?.strCategory}
          </span>
          <span className="text-gray-400 text-sm flex items-center gap-1">
            <span>📍</span>
            {meal?.strArea}
          </span>
        </div>
      </div>
      <div className="p-4 pt-0">
        <a href={meal.strYoutube}>
          <button className="w-full bg-orange-500 cursor-pointer text-white py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">
            View Recipe
          </button>
        </a>
      </div>
    </div>
  );
};

const MealCardSkeleton = () => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <div className="w-full h-56 bg-gray-700 animate-pulse"></div>
        <div className="absolute top-3 left-3 bg-gray-700 px-3 py-1 rounded-full text-xs animate-pulse w-16 h-6"></div>
      </div>
      <div className="p-4">
        <div className="bg-gray-700 h-6 mb-2 rounded animate-pulse"></div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-700 rounded-full animate-pulse"></div>
            <div className="bg-gray-700 h-4 w-20 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center gap-1">
            <div className="bg-gray-700 h-4 w-4 rounded animate-pulse"></div>
            <div className="bg-gray-700 h-4 w-16 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="p-4 pt-0">
        <div className="w-full bg-gray-700 h-8 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};

const App = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);
        const url = `https://api.freeapi.app/api/v1/public/meals?page=${page}&limit=12`;
        const response = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application.json" },
        });

        const data = await response.json();
        setMeals(data.data.data);

      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-950">
      <header className="bg-gray-900 border-b border-gray-800">
        <nav className="flex items-center justify-between h-13 px-4 sm:px-6 max-w-6xl mx-auto">
          <h1 className="text-lg font-semibold text-white tracking-tight">
            meal<span className="text-orange-500">db</span>
          </h1>
          <div className="flex items-center gap-2 sm:gap-3">
            <input
              type="text"
              placeholder="Search..."
              className="h-8 w-28 sm:w-48 bg-gray-800 border border-gray-700 rounded-full px-3 sm:px-4 text-xs text-gray-300 placeholder-gray-600 outline-none focus:border-gray-500"
            />
            <button className="w-8 h-8 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-300">
              🍽️
            </button>
          </div>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
          {loading
            ? Array.from({ length: 12 }).map((_, i) => (
                <MealCardSkeleton key={i} />
              ))
            : meals.map((meal, i) => <MealCard key={i} meal={meal} />)}
        </div>

        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="w-8 h-8 bg-gray-900 border border-gray-800 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-gray-800 transition-colors"
          >
            −
          </button>
          <span className="text-sm font-medium text-gray-400 w-5 text-center">
            {page}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="w-8 h-8 bg-gray-900 border border-gray-800 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-gray-800 transition-colors"
          >
            +
          </button>
        </div>
      </main>
    </div>
  );
};

export default App;
