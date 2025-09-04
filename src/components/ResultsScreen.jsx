import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSyncAlt, FaClipboardList } from "react-icons/fa";

export default function ResultsScreen({ score, total, highScore, onRestart }) {
  const navigate = useNavigate();

  const handleRestart = () => {
    onRestart();
    navigate("/");
  };

  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  const getFeedback = () => {
    if (percentage === 100) return "Perfect Score! 🏆";
    if (percentage >= 75) return "Great Job! ✨";
    if (percentage >= 50) return "Not Bad! 👍";
    return "Better Luck Next Time! 🤞";
  };

  return (
    <div className="text-center p-4 animate-fade-in">
      <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
        {getFeedback()}
      </h2>
      <div className="bg-slate-700/50 p-6 rounded-xl my-8 inline-block">
        <p className="text-xl mb-2 text-slate-300">Your Score</p>
        <p className="text-6xl font-bold text-white">
          {score} <span className="text-3xl text-slate-400">/ {total}</span>
        </p>
        <p className="text-lg mt-4 text-cyan-400 font-semibold">
          High Score: {highScore}
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-4">
        <button
          onClick={handleRestart}
          className="flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white py-3 px-6 rounded-xl shadow-lg transition-transform transform hover:scale-105"
        >
          <FaSyncAlt /> Restart Quiz
        </button>
        <Link
          to="/review"
          className="flex items-center justify-center gap-2 bg-slate-600 hover:bg-slate-500 text-white py-3 px-6 rounded-xl shadow-lg transition-transform transform hover:scale-105"
        >
          <FaClipboardList /> Review Answers
        </Link>
      </div>
    </div>
  );
}
