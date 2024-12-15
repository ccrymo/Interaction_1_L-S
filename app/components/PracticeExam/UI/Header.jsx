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
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          onTimeUp?.(); // Call onTimeUp when timer completes
          return 100;
        }
        return prevProgress + 100 / (timeLimit * 10);
      });
    }, 100);

    return () => clearInterval(timer);
  }, [currentQuestion, timeLimit, onTimeUp]);

  const getColor = () => {
    if (progress < 50) return "bg-green-500";
    if (progress < 75) return "bg-yellow-500";
    return "bg-red-500";
  };
  return (
    <div className="fixed top-0 left-0 right-0 z-10">
      <header className="bg-stone-800 text-white flex justify-between items-stretch shadow-lg filter drop-shadow-2xl">
        <div className="flex items-center space-x-2 text-lg p-4">
          <span className="font-bold">Progress:</span>
          <span>
            {currentQuestion}/{totalQuestions}
          </span>
          <span className="text-gray-400">|</span>
          <span className="font-bold">Score:</span>
          <span>
            {correctAnswers}/{totalQuestions}
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
