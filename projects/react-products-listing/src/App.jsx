import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="w-48 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden cursor-pointer hover:border-gray-600 transition-colors">
      <div className="relative aspect-square bg-gray-800">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
          −{product.discountPercentage}%
        </span>
      </div>

      <div className="p-3">
        <p className="text-sm font-medium text-gray-100 leading-snug line-clamp-2 mb-1">
          {product.title}
        </p>
        <p className="text-[11px] text-gray-500 line-clamp-2 mb-2">
          {product.description}
        </p>
        <p className="text-[10px]">⭐⭐⭐⭐⭐</p>
        <div className="flex items-baseline gap-1.5 mt-2">
          <span className="text-sm font-semibold text-gray-100">
            ${product.price}
          </span>
          <span className="text-[11px] text-gray-600 line-through">
            ${product.price + (product.price * 10) / 100}
          </span>
        </div>
      </div>
    </div>
  );
};

const ProductCardSkeleton = () => {
  return (
    <div className="w-48 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
      <div className="aspect-square bg-gray-800 animate-pulse" />

      <div className="p-3 flex flex-col gap-2">
        <div className="h-3 w-full bg-gray-800 rounded animate-pulse" />
        <div className="h-3 w-3/4 bg-gray-800 rounded animate-pulse" />

        <div className="h-3 w-full bg-gray-800 rounded animate-pulse" />
        <div className="h-3 w-1/2 bg-gray-800 rounded animate-pulse" />

        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 bg-gray-800 rounded-sm animate-pulse"
            />
          ))}
        </div>

        <div className="flex gap-2 mt-1">
          <div className="h-3 w-1/3 bg-gray-800 rounded animate-pulse" />
          <div className="h-3 w-1/3 bg-gray-800 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const url = `https://api.freeapi.app/api/v1/public/randomproducts?page=${page}&limit=12`;
        const response = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();

        setProducts(data.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-950">
      <header className="bg-gray-900 border-b border-gray-800">
        <nav className="flex items-center justify-between h-13 px-4 sm:px-6 max-w-6xl mx-auto">
          <h1 className="text-lg font-semibold text-white tracking-tight">
            Shop<span className="text-orange-500">cart</span>
          </h1>
          <div className="flex items-center gap-2 sm:gap-3">
            <input
              type="text"
              placeholder="Search..."
              className="h-8 w-28 sm:w-48 bg-gray-800 border border-gray-700 rounded-full px-3 sm:px-4 text-xs text-gray-300 placeholder-gray-600 outline-none focus:border-gray-500"
            />
            <button className="w-8 h-8 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-300">
              🛒
            </button>
          </div>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            : products.map((product, i) => (
                <ProductCard key={i} product={product} />
              ))}
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
