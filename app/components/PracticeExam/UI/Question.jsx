"use client";
import { useState, useEffect } from "react";
import Button from "./Button";
import OverlayMessage from "./OverlayMessage";
const Question = ({
  question,
  options,
  onSelect,
  selectedAnswer,
  showOverlay,
  isCorrect,
  onOverlayClose,
}) => {
  return (
    <div className="flex flex-col justify-center items-center h-full lg:mt-28 lg:mb-5 md:mt-20">
      <div className="mb-4 overflow-y-auto scroll scrollbar scrollbar-thumb-gray-400 max-h-screen">
        <h3 className="mb-4 lg:text-4xl text-2xl font-bold text-center text-white ">
          {question}
        </h3>
        {options.map((option, index) => (
          <Button
            key={index}
            onClick={() => onSelect(option)}
            colour="red"
            isSelected={option === selectedAnswer}>
            {option}
          </Button>
        ))}
      </div>
      <OverlayMessage
        message={isCorrect ? "Correct!👌" : "Wrong 🤕"}
        isVisible={showOverlay}
        onClose={onOverlayClose}
      />
    </div>
  );
};

export default Question;
