import React from "react";
import { useNavigate } from "react-router-dom";

const EasyIcon = () => <span className="mr-2">😊</span>;
const MediumIcon = () => <span className="mr-2">🤔</span>;
const HardIcon = () => <span className="mr-2">🔥</span>;

export default function DifficultySelector({ onSelectDifficulty }) {
  const navigate = useNavigate();

  const handleSelect = (level) => {
    onSelectDifficulty(level);
    navigate("/quiz");
  };

  const buttonStyles =
    "w-full flex items-center justify-center text-lg font-semibold py-3 px-6 rounded-xl shadow-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-4";

  return (
    <div className="flex flex-col items-center space-y-5 animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 text-center text-slate-100 tracking-wide">
        Choose Your Challenge
      </h2>
      <button
        onClick={() => handleSelect("easy")}
        className={`${buttonStyles} bg-green-500/80 hover:bg-green-500 border border-green-400 focus:ring-green-500/50`}
      >
        <EasyIcon /> Easy
      </button>
      <button
        onClick={() => handleSelect("medium")}
        className={`${buttonStyles} bg-yellow-500/80 hover:bg-yellow-500 border border-yellow-400 focus:ring-yellow-500/50`}
      >
        <MediumIcon /> Medium
      </button>
      <button
        onClick={() => handleSelect("hard")}
        className={`${buttonStyles} bg-red-500/80 hover:bg-red-500 border border-red-400 focus:ring-red-500/50`}
      >
        <HardIcon /> Hard
      </button>
    </div>
  );
}
