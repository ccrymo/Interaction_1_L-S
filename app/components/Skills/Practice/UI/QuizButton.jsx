import React from "react";
import ReadingTextIMG from "@/app/img/ReadingTextIMG";
import QuizButtonIMG from "@/app/img/QuizButtonIMG";

const QuizButton = ({ isQuestionView, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-amber-400 text-neutral-800 font-bold text-sm flex items-center justify-center gap-2 px-4">
      {isQuestionView ? (
        <>
          <span>Text</span>
          <ReadingTextIMG className="w-4 h-4" />
        </>
      ) : (
        <>
          <span>Exam</span>
          <QuizButtonIMG className="w-4 h-4" />
        </>
      )}
    </button>
  );
};

export default QuizButton;
