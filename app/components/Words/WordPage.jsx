"use client";

import React, { useState, useEffect } from "react";
import Word from "./Word";
import DetailComponent from "./DetailComponent";

const WordPage = ({ chapter }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0); // Tracks the current word index
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0); // Tracks the current category index
  const [showDetails, setShowDetails] = useState(false); // Tracks whether to show the DetailComponent

  // Safely access category and words
  const currentCategory = chapter?.[currentCategoryIndex] || {};
  const words = currentCategory?.words || [];
  const category = currentCategory?.category || "";
  const currentWord = words?.[currentWordIndex] || {};

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (showDetails) {
        // When DetailComponent is displayed
        if (event.key === "ArrowUp") {
          setShowDetails(false); // Return to Word component
        }
        return; // Disable other keys while showing details
      }

      if (event.key === "ArrowRight") {
        // Navigate to next word or category
        if (
          currentCategoryIndex === chapter.length - 1 &&
          currentWordIndex === words.length - 1
        ) {
          return; // Disable Right Arrow at last word of last category
        }

        if (currentWordIndex < words.length - 1) {
          setCurrentWordIndex((prev) => prev + 1); // Next word in the same category
        } else if (currentCategoryIndex < chapter.length - 1) {
          setCurrentCategoryIndex((prevCat) => prevCat + 1); // Next category
          setCurrentWordIndex(0); // Reset to the first word of the new category
        }
      } else if (event.key === "ArrowLeft") {
        // Navigate to the previous word or category
        if (currentCategoryIndex === 0 && currentWordIndex === 0) {
          return; // Disable Left Arrow at the first word of the first category
        }

        if (currentWordIndex > 0) {
          setCurrentWordIndex((prev) => prev - 1); // Previous word in the same category
        } else if (currentCategoryIndex > 0) {
          setCurrentCategoryIndex((prevCat) => prevCat - 1); // Previous category
          const prevCategoryWords = chapter[currentCategoryIndex - 1]?.words || [];
          setCurrentWordIndex(prevCategoryWords.length - 1); // Last word of the previous category
        }
      } else if (event.key === "ArrowDown") {
        setShowDetails(true); // Show details for the current word
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentWordIndex, currentCategoryIndex, words, showDetails, chapter]);

  // Check if chapter has valid data
  if (!chapter || chapter.length === 0) {
    return <div className="text-center">No data available to display.</div>;
  }

  return (
    <div className="w-screen max-w-4xl mx-auto">
      {!showDetails ? (
        <Word word={currentWord.word || "No word available"} partOfSpeech={category} />
      ) : (
        <DetailComponent
          definition={currentWord.definition || "No definition available"}
          synonym={currentWord.synonym || "No synonym available"}
          antonym={currentWord.antonym || "No antonym available"}
        />
      )}
    </div>
  );
};

export default WordPage;
