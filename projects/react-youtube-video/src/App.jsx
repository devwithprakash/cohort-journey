import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const VideoCard = ({ video }) => {
  const { id, snippet, statistics } = video.items;
  return (
    <div className="cursor-pointer">
      <a href={`https://www.youtube.com/watch?v=${id}`}>
        <img
          src={snippet.thumbnails.high.url}
          alt={snippet.title}
          className="w-full aspect-video object-cover rounded-lg"
        />
        <p className="mt-2 mb-1 text-sm font-medium leading-snug text-white">
          {snippet.title}
        </p>
        <p className="text-xs text-gray-400 mb-0.5">{snippet.channelTitle}</p>
        <p className="text-xs text-gray-500">
          {Math.floor(statistics.viewCount / 1000)}k
        </p>
      </a>
    </div>
  );
};

const VideoSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="w-full aspect-video rounded-lg bg-gray-800 animate-pulse" />
      <div className="h-3 w-full rounded bg-gray-800 animate-pulse" />
      <div className="h-3 w-3/4 rounded bg-gray-800 animate-pulse" />
      <div className="h-3 w-1/2 rounded bg-gray-800 animate-pulse" />
    </div>
  );
};
const App = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.freeapi.app/api/v1/public/youtube/videos?page=${page}&limit=12`,
        { method: "GET", headers: { "Content-Type": "application/json" } },
      );

      const data = await response.json();
      setVideos(data.data.data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-950">
      <header className="border-b border-gr ay-800 bg-gray-900">
        <nav className="flex items-center gap-3 px-4 h-13 max-w-7xl mx-auto">
          <h1 className="text-lg font-medium text-red-500 tracking-tight whitespace-nowrap">
            Funtube
          </h1>
          <input
            type="text"
            placeholder="Search"
            className="flex-1 h-8 px-4 text-sm bg-gray-800 border border-gray-700 rounded-full outline-none text-white placeholder-gray-500 focus:border-gray-500"
          />
          <div className="w-8 h-8 rounded-full bg-blue-900 text-blue-300 text-xs font-medium flex items-center justify-center shrink-0">
            JD
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-4 gap-3">
          {!loading
            ? videos.map((video, index) => (
                <VideoCard key={index} video={video} />
              ))
            : [...Array(12)].map((_, i) => <VideoSkeleton key={i} />)}
        </div>

        <div className="flex items-center justify-center gap-2 py-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="w-8 h-8 border cursor-pointer border-gray-700 rounded-md text-sm text-gray-300 hover:bg-gray-800"
          >
            −
          </button>
          <span className="text-sm font-medium w-5 text-center text-gray-200">
            {page}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="w-8 h-8 border cursor-pointer border-gray-700 rounded-md text-sm text-gray-300 hover:bg-gray-800"
          >
            +
          </button>
        </div>
      </main>
    </div>
  );
};

export default App;
