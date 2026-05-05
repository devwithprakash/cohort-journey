import React, { useState, useEffect } from "react";

const RegisterUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [state, setState] = useState("login");
  const [loading, setLoading] = useState(false);

  const isLogin = state === "login";

  const text = isLogin
    ? { msg: "Don't have an account?", action: "Sign up", btnText: "Login" }
    : {
        msg: "Already have an account?",
        action: "Sign in",
        btnText: "Register",
      };

  const handleAuth = async (e) => {
    e.preventDefault();
    if (state === "login") {
      try {
        setLoading(true);
        const url = "https://api.freeapi.app/api/v1/users/login";
        const body = { username, password };

        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        if (data.success) {
          localStorage.setItem("authToken", data.data.accessToken);

          alert(data.message || "Logged in successfully!");
        } else {
          alert(data.message || "Request failed!");
        }
      } catch (error) {
        alert(error.message);
      } finally {
        setUsername("");
        setPassword("");
        setLoading(false);
        window.location.reload();
      }
    } else {
      try {
        setLoading(true);
        const url = "https://api.freeapi.app/api/v1/users/register";
        const body = { username, email, password, role };

        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        if (data.success) {
          alert(data.message || "Registered successfully!");
        } else {
          alert(data.message || "Request failed!");
        }
      } catch (error) {
        alert(error.message);
      } finally {
        setUsername("");
        setEmail("");
        setPassword("");
        setRole("");
        setLoading(false);
        setState("login");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f11] p-6">
      <div className="w-full max-w-md">
        <div className="bg-[#13131a] border border-[#1e1e28] rounded-2xl p-8 shadow-2xl">
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-white">
              {state === "login" ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              Fill in the details to get started
            </p>
          </div>

          <form className="space-y-5">
            <div className="space-y-1.5">
              <label
                htmlFor="username"
                className="block text-[0.7rem] uppercase tracking-widest font-medium text-zinc-400"
              >
                Username
              </label>
              <input
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                type="text"
                placeholder="Enter username"
                className="w-full bg-[#1a1a1f] border border-[#2a2a32] text-zinc-100 placeholder-zinc-600 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition"
              />
            </div>

            <div
              className={`space-y-1.5 ${state === "login" ? "hidden" : "block"}`}
            >
              <label
                htmlFor="email"
                className="block text-[0.7rem] uppercase tracking-widest font-medium text-zinc-400"
              >
                Email
              </label>
              <input
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="text"
                placeholder="Enter email"
                className="w-full bg-[#1a1a1f] border border-[#2a2a32] text-zinc-100 placeholder-zinc-600 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-[0.7rem] uppercase tracking-widest font-medium text-zinc-400"
              >
                Password
              </label>
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full bg-[#1a1a1f] border border-[#2a2a32] text-zinc-100 placeholder-zinc-600 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition"
              />
            </div>

            <div
              className={`space-y-1.5 ${state === "login" ? "hidden" : "block"}`}
            >
              <label
                htmlFor="role"
                className="block text-[0.7rem] uppercase tracking-widest font-medium text-zinc-400"
              >
                Role
              </label>
              <select
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                id="role"
                name="role"
                className="w-full bg-[#1a1a1f] border border-[#2a2a32] text-zinc-100 rounded-lg px-4 py-3 text-sm cursor-pointer focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition"
              >
                <option value="" disabled>
                  Choose Role
                </option>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              onClick={handleAuth}
              disabled={loading}
              className="w-full mt-2 py-3 rounded-xl bg-linear-to-r from-violet-700 to-violet-400 text-white text-sm font-semibold tracking-wide transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              {loading ? "Processing..." : text.btnText}
            </button>
          </form>

          <p className="text-center text-xs text-zinc-600 mt-6">
            {text.msg}{" "}
            <a
              href="#"
              onClick={() => setState(isLogin ? "register" : "login")}
              className="text-violet-400 hover:text-violet-300 transition-colors"
            >
              {text.action}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

const Profile = ({ onLogout, token }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser")),
  );
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const url = "https://api.freeapi.app/api/v1/users/current-user";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("authUser", JSON.stringify(data.data));
        setUser(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error.message);
      alert(error.message || "Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f11] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f11] text-white">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div>
          <h1 className="text-xl font-bold">Profile</h1>
          <p className="text-sm text-zinc-400">
            Welcome back, {user?.username}
          </p>
        </div>
        <button
          onClick={onLogout}
          className="rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500 transition"
        >
          Logout
        </button>
      </nav>

      <main className="flex min-h-[calc(100vh-76px)] items-center justify-center px-6 py-10">
        <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#13131a] p-6 shadow-2xl">
          <div className="flex flex-col items-center gap-4 text-center">
            <img
              src={
                "https://wallpapers.com/images/high/cool-neon-blue-profile-picture-u9y9ydo971k9mdcf.webp"
              }
              alt="User avatar"
              className="h-20 w-20 rounded-full border-4 border-violet-500 object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold">
                {user?.username || "Unknown User"}
              </h2>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">
                {user?.role || "User"}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="rounded-2xl border border-white/10 bg-[#0f0f13] p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Username
              </p>
              <p className="mt-2 text-sm font-semibold text-white">
                {user?.username || "-"}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#0f0f13] p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Email
              </p>
              <p className="mt-2 text-sm font-semibold text-white">
                {user?.email || "-"}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#0f0f13] p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Role
              </p>
              <p className="mt-2 text-sm font-semibold text-white">
                {user?.role || "-"}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("authToken"));

  const handleLogout = async () => {
    try {
      const url = "https://api.freeapi.app/api/v1/users/logout";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      alert(error.message || "Request failed!");
    } finally {
      localStorage.removeItem("authUser");
      localStorage.removeItem("authToken");
      setToken(null);
    }
  };

  return (
    <div>
      {token ? (
        <Profile token={token} onLogout={handleLogout} />
      ) : (
        <RegisterUser />
      )}
    </div>
  );
};

export default App;
