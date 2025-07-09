import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-[#0e0e10] border-b border-cyan-600 px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-cyan-400 text-2xl font-bold tracking-wider">
        InsightDash
      </Link>

      <div className="flex items-center gap-6 text-white">
        {!user ? (
          <>
            <Link to="/login" className="hover:text-cyan-400 transition">Login</Link>
            <Link to="/register" className="hover:text-cyan-400 transition">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="hover:text-cyan-400 transition">Dashboard</Link>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-500 px-4 py-1.5 rounded-md font-medium"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
