"use client";

import { useState, useEffect } from "react";
import QuizButton from "./QuizButton";

const Header = ({
  currentQuestion,
  totalQuestions,
  correctAnswers,
  timeLimit = 3600,
  onTimeUp,
  isQuestionView,
  onToggleView,
  isQuizCompleted,
  isTimeUp,
}) => {
  const [progress, setProgress] = useState(100); // Start at 100%

  useEffect(() => {
    // Only reset progress when the quiz is completed or time runs out
    if (isQuizCompleted || isTimeUp) {
      setProgress(100);
    }

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress <= 0) {
          clearInterval(timer);
          onTimeUp?.(); // Call onTimeUp when timer completes
          return 0;
        }
        return prevProgress - 100 / (timeLimit * 10); // Decrease progress
      });
    }, 100);

    return () => clearInterval(timer);
  }, [isQuizCompleted, isTimeUp, timeLimit, onTimeUp]);

  const getColor = () => {
    if (progress > 50) return "bg-cyan-500";
    if (progress > 25) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-10">
      <header className="bg-stone-800 text-white flex justify-between items-stretch shadow-lg filter drop-shadow-2xl">
        <div className="flex items-center space-x-2 text-lg p-4">
          <span className="font-bold text-stone-300">Q?</span>
          <span className="text-white">
            {currentQuestion} / {totalQuestions}
          </span>
          <span className="text-stone-300">|</span>
          <span className="font-bold text-stone-300">Score:</span>
          <span className="text-white">
            {correctAnswers} / {totalQuestions}
          </span>
        </div>
        <QuizButton isQuestionView={isQuestionView} onClick={onToggleView} />
      </header>
      <div className="h-3 w-full bg-stone-700">
        <div
          className={`h-full transition-all duration-100 ease-linear ${getColor()}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Header;
