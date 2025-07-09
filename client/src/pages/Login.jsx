import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, UserPlus } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const { login, googleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed: " + (error.response?.data?.message || error.message));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      navigate("/dashboard");
    } catch (err) {
      alert("Google login failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0e0e10] px-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-lg rounded-3xl border border-white/20 shadow-[0_0_20px_rgba(0,255,255,0.1)] p-8 animate-fade-in">
        <h2 className="text-4xl font-extrabold text-cyan-400 text-center mb-8 tracking-wide">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-cyan-300" size={20} />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-3 bg-white/10 text-white rounded-xl border border-cyan-400/30 placeholder-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-cyan-300" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 bg-white/10 text-white rounded-xl border border-cyan-400/30 placeholder-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition duration-300 flex items-center justify-center gap-2"
          >
            <LogIn size={18} /> Login
          </button>
        </form>

        <div className="text-center text-gray-400 mt-4">or</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-xl hover:from-red-400 hover:to-pink-500 transition duration-300"
        >
          Sign in with Google
        </button>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-cyan-300 hover:underline font-medium flex items-center justify-center gap-1"
          >
            <UserPlus size={16} /> Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
