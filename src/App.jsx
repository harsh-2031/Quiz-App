import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DifficultySelector from "./components/DifficultySelector";
import QuizScreen from "./components/QuizScreen";
import ResultsScreen from "./components/ResultsScreen";
import ReviewScreen from "./components/ReviewScreen";
import Header from "./components/Header";

export default function App() {
  const [difficulty, setDifficulty] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const restartQuiz = () => {
    setDifficulty(null);
    setAnswers([]);
    setScore(0);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white min-h-screen font-['Inter',_sans-serif] flex items-center justify-center p-4">
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-2xl mx-auto border border-slate-700">
        <Header />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <DifficultySelector onSelectDifficulty={setDifficulty} />
              }
            />
            <Route
              path="/quiz"
              element={
                difficulty ? (
                  <QuizScreen
                    difficulty={difficulty}
                    setAnswers={setAnswers}
                    setScore={setScore}
                    setHighScore={setHighScore}
                  />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/results"
              element={
                <ResultsScreen
                  score={score}
                  total={answers.length}
                  highScore={highScore}
                  onRestart={restartQuiz}
                />
              }
            />
            <Route
              path="/review"
              element={
                <ReviewScreen answers={answers} onRestart={restartQuiz} />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
