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
    <div className="flex flex-col justify-center items-center h-full">
      <div className="mb-4 overflow-y-auto scroll scrollbar-thin scrollbar-thumb-gray-400 max-h-[calc(100vh-200px)]">
        <h3 className="mb-4 text-xl font-bold text-center">{question}</h3>
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
