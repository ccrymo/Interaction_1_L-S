"use client";

import React from "react";

const QuizButton = ({ isQuestionView, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-neutral-600 text-white font-bold text-lg flex items-center justify-center gap-2 px-4 lg:hidden animate-glow">
      {isQuestionView ? <span>Text</span> : <span>Exam</span>}
    </button>
  );
};

export default QuizButton;
