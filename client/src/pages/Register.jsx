import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, UserPlus } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(email, password); // from AuthContext
      // auto-login and redirect handled in context
    } catch (err) {
      alert("Register failed: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0e0e10] px-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-lg rounded-3xl border border-white/20 shadow-[0_0_20px_rgba(0,255,255,0.1)] p-8 animate-fade-in">
        <h2 className="text-4xl font-extrabold text-cyan-400 text-center mb-8 tracking-wide">
          Create Account ✨
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">
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
            className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-400 hover:to-emerald-500 transition duration-300 flex items-center justify-center gap-2"
          >
            <UserPlus size={18} /> Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-cyan-300 hover:underline font-medium flex items-center justify-center gap-1"
          >
            <LogIn size={16} /> Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
