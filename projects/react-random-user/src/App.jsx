import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const ProfileCard = ({ user }) => {
  return (
    <div class="w-full max-w-md bg-[#0f1117] border border-[#2a2a32] rounded-2xl p-8 shadow-xl text-white">
      <div class="flex flex-col items-center text-center">
        <img
          src={user.picture.large}
          alt="avatar"
          class="w-28 h-28 rounded-full border-2 border-violet-500 object-cover"
        />

        <p class="mt-4 text-lg font-semibold">
          {user.name.title}. {user.name.first} {user.name.last}
        </p>
        <p class="text-sm text-zinc-400">{user.email}</p>
      </div>

      <div class="mt-6 space-y-3 text-sm">
        <div class="flex justify-between bg-[#1a1a1f] px-4 py-3 rounded-lg">
          <span class="text-zinc-400">Phone</span>
          <span>{user.phone}</span>
        </div>

        <div class="flex justify-between bg-[#1a1a1f] px-4 py-3 rounded-lg">
          <span class="text-zinc-400">Gender</span>
          <span>{user.gender}</span>
        </div>
      </div>
    </div>
  );
};

const ProfileCardSkeleton = () => {
  return (
    <div class="w-full max-w-md bg-[#0f1117] border border-[#2a2a32] rounded-2xl p-8 shadow-xl animate-pulse">
      <div class="flex flex-col items-center">
        <div class="w-28 h-28 rounded-full bg-[#1a1a1f]"></div>

        <div class="mt-4 h-4 w-32 bg-[#1a1a1f] rounded"></div>
        <div class="mt-2 h-3 w-48 bg-[#1a1a1f] rounded"></div>
      </div>

      <div class="mt-6 space-y-3">
        <div class="flex justify-between bg-[#1a1a1f] px-4 py-3 rounded-lg">
          <div class="h-3 w-16 bg-[#2a2a32] rounded"></div>
          <div class="h-3 w-24 bg-[#2a2a32] rounded"></div>
        </div>

        <div class="flex justify-between bg-[#1a1a1f] px-4 py-3 rounded-lg">
          <div class="h-3 w-16 bg-[#2a2a32] rounded"></div>
          <div class="h-3 w-20 bg-[#2a2a32] rounded"></div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const url = `https://api.freeapi.app/api/v1/public/randomusers?page=${page}&limit=1`;

      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      setUser(data.data.data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [page]);

  return (
    <div className="min-h-screen bg-[#08090c] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#0f1117] border border-[#2a2a32] rounded-2xl p-8 shadow-xl text-white">
        <h2 className="text-xl font-semibold text-center mb-6">User Profile</h2>

        {!loading && user ? (
          <ProfileCard user={user[0]} />
        ) : (
          <ProfileCardSkeleton />
        )}
        <button
          onClick={() => setPage((p) => p + 1)}
          className="mt-8 w-full cursor-pointer py-3 rounded-xl bg-gradient-to-r from-violet-700 to-violet-400 text-sm font-semibold hover:opacity-90 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
