import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import questionsData from "../data/questions.json";

export default function QuizScreen({
  difficulty,
  setAnswers,
  setScore,
  setHighScore,
}) {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [localScore, setLocalScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedOption, setSelectedOption] = useState(null);
  const [localAnswers, setLocalAnswers] = useState([]);

  useEffect(() => {
    if (questionsData[difficulty]) {
      setQuestions(questionsData[difficulty]);
    }
  }, [difficulty]);

  useEffect(() => {
    if (timeLeft > 0 && !selectedOption) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSkip();
    }
  }, [timeLeft, selectedOption]);

  const handleAnswer = (option) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = option === currentQuestion.answer;

    if (isCorrect) setLocalScore(localScore + 1);

    setSelectedOption(option);
    setLocalAnswers([
      ...localAnswers,
      {
        question: currentQuestion.question,
        selectedOption: option,
        correctAnswer: currentQuestion.answer,
        isCorrect,
      },
    ]);
  };

  const handleSkip = () => {
    const currentQuestion = questions[currentQuestionIndex];
    setLocalAnswers([
      ...localAnswers,
      {
        question: currentQuestion.question,
        selectedOption: null,
        correctAnswer: currentQuestion.answer,
        isCorrect: false,
      },
    ]);
    goNext();
  };

  const goNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(15);
      setSelectedOption(null);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const finalLocalAnswers = [...localAnswers];
    // Ensure the last answer is recorded if not already
    if (selectedOption && localAnswers.length === currentQuestionIndex) {
      const currentQuestion = questions[currentQuestionIndex];
      const isCorrect = selectedOption === currentQuestion.answer;
      finalLocalAnswers.push({
        question: currentQuestion.question,
        selectedOption,
        correctAnswer: currentQuestion.answer,
        isCorrect,
      });
      if (isCorrect) setLocalScore((prev) => prev + 1);
    }

    setScore(localScore);
    setAnswers(finalLocalAnswers);

    const prevHighScore =
      parseInt(localStorage.getItem(`${difficulty}HighScore`)) || 0;
    if (localScore > prevHighScore) {
      setHighScore(localScore);
      localStorage.setItem(`${difficulty}HighScore`, localScore);
    } else {
      setHighScore(prevHighScore);
    }

    navigate("/results");
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  const getButtonClass = (option) => {
    if (!selectedOption) {
      return "bg-slate-700/60 hover:bg-cyan-600/80 border-slate-600 hover:border-cyan-500";
    }
    if (option === currentQuestion.answer) {
      return "bg-green-500/80 border-green-400 scale-105"; // Correct
    }
    if (option === selectedOption) {
      return "bg-red-500/80 border-red-400"; // Selected Wrong
    }
    return "bg-slate-700/60 border-slate-600 opacity-50"; // Others disabled
  };

  return (
    <div className="animate-fade-in">
      {/* Top Bar: Progress and Timer */}
      <div className="flex justify-between items-center mb-6">
        {/* Progress bar */}
        <div className="w-full bg-slate-700 rounded-full h-2.5 mr-4">
          <div
            className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${
                ((currentQuestionIndex + 1) / questions.length) * 100
              }%`,
            }}
          ></div>
        </div>
        {/* Timer */}
        <div className="relative h-12 w-12 flex items-center justify-center">
          <svg
            className="transform -rotate-90"
            width="48"
            height="48"
            viewBox="0 0 48 48"
          >
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              className="text-slate-700"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 20}
              strokeDashoffset={
                2 * Math.PI * 20 - (timeLeft / 15) * (2 * Math.PI * 20)
              }
              className="text-cyan-400 transition-all duration-1000 linear"
            />
          </svg>
          <span className="absolute text-sm font-bold">{timeLeft}s</span>
        </div>
      </div>

      {/* Question */}
      <h3 className="text-xl md:text-2xl font-semibold mb-6 text-slate-100 leading-relaxed text-center">
        {currentQuestion.question}
      </h3>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !selectedOption && handleAnswer(option)}
            className={`py-3 px-4 rounded-xl shadow-lg transition-all duration-300 border-2 ${getButtonClass(
              option
            )}`}
            disabled={!!selectedOption}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Action buttons */}
      <div className="mt-8 flex justify-between items-center">
        <p className="text-sm font-semibold text-gray-400">
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
        <div>
          {!selectedOption && (
            <button
              onClick={handleSkip}
              className="bg-yellow-600/80 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              Skip
            </button>
          )}
          {selectedOption && (
            <button
              onClick={goNext}
              className="bg-purple-600/80 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-lg transition-colors animate-pulse-once"
            >
              {currentQuestionIndex < questions.length - 1
                ? "Next →"
                : "Finish Quiz"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
