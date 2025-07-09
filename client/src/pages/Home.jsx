import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0e0e10] text-white px-4">
      <h1 className="text-5xl font-bold text-cyan-400 mb-6 animate-fade-in-down">🚀 Welcome to Insight Dashboard</h1>
      <p className="text-lg text-gray-300 mb-8 text-center max-w-xl">
        This is a secure authentication-based dashboard built using React, Node.js, JWT, and MongoDB.
      </p>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-6 py-3 bg-cyan-500 rounded-xl font-semibold hover:bg-cyan-400 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-3 bg-gray-700 rounded-xl font-semibold hover:bg-gray-600 transition"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
