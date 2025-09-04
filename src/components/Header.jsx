import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function Header() {
  const location = useLocation();

  return (
    <header className="flex items-center justify-between mb-8 pb-4 border-b border-slate-700">
      <Link to="/" className="text-3xl font-bold">
        <span className="bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
          QuizMaster
        </span>
      </Link>
      <nav>
        {location.pathname !== "/" && (
          <Link
            to="/"
            className="flex items-center gap-2 bg-slate-700/80 hover:bg-slate-600 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-300"
            title="Back to Home"
          >
            <FaHome />
            Home
          </Link>
        )}
      </nav>
    </header>
  );
}
