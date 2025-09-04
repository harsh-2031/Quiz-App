import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaUndo } from "react-icons/fa";

export default function ReviewScreen({ answers, onRestart }) {
  const navigate = useNavigate();

  const handleRestart = () => {
    onRestart();
    navigate("/");
  };

  return (
    <div className="p-1 animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Review Your Answers
      </h2>
      <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
        {answers.map((answer, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-slate-700/60 border border-slate-600"
          >
            <p className="font-semibold text-lg text-slate-200 mb-3">
              Q{index + 1}: {answer.question}
            </p>
            <div className="flex items-center gap-3">
              {answer.isCorrect ? (
                <FaCheckCircle className="text-green-400 text-xl flex-shrink-0" />
              ) : (
                <FaTimesCircle className="text-red-400 text-xl flex-shrink-0" />
              )}
              <p
                className={`font-medium ${
                  answer.isCorrect ? "text-green-400" : "text-red-400"
                }`}
              >
                Your Answer: {answer.selectedOption || "Skipped"}
              </p>
            </div>
            {!answer.isCorrect && (
              <div className="flex items-center gap-3 mt-2 pl-8">
                <p className="text-cyan-300">
                  Correct Answer: {answer.correctAnswer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={handleRestart}
          className="mt-8 flex items-center justify-center gap-2 mx-auto bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105"
        >
          <FaUndo /> Restart Quiz
        </button>
      </div>
    </div>
  );
}
