"use client";

import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import Word from "./Word";
import DetailComponent from "./DetailComponent";

const WordPage = ({ chapter }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  // Safely access category and words
  const currentCategory = chapter?.[currentCategoryIndex] || {};
  const words = currentCategory?.words || [];
  const category = currentCategory?.category || "";
  const currentWord = words?.[currentWordIndex] || {};

  const navigateToNextWord = () => {
    if (
      currentCategoryIndex === chapter.length - 1 &&
      currentWordIndex === words.length - 1
    ) {
      return; // At the last word of the last category
    }
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex((prev) => prev + 1); // Next word in the same category
    } else if (currentCategoryIndex < chapter.length - 1) {
      setCurrentCategoryIndex((prevCat) => prevCat + 1); // Next category
      setCurrentWordIndex(0); // Reset to the first word of the new category
    }
  };

  const navigateToPreviousWord = () => {
    if (currentCategoryIndex === 0 && currentWordIndex === 0) {
      return; // At the first word of the first category
    }
    if (currentWordIndex > 0) {
      setCurrentWordIndex((prev) => prev - 1); // Previous word in the same category
    } else if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex((prevCat) => prevCat - 1); // Previous category
      const prevCategoryWords = chapter[currentCategoryIndex - 1]?.words || [];
      setCurrentWordIndex(prevCategoryWords.length - 1); // Last word of the previous category
    }
  };

  const navigateToDetails = () => {
    setShowDetails(true); // Show details for the current word
  };

  const navigateBackFromDetails = () => {
    setShowDetails(false); // Return to Word component
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: !showDetails ? navigateToNextWord : undefined,
    onSwipedRight: !showDetails ? navigateToPreviousWord : undefined,
    onSwipedUp: !showDetails ? navigateToDetails : undefined,
    onSwipedDown: navigateBackFromDetails,
    preventDefaultTouchmoveEvent: true,
    trackMouse: false,
  });

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (showDetails) {
        if (event.key === "ArrowDown") {
          navigateBackFromDetails(); // Return to Word component
        }
        return;
      }

      if (event.key === "ArrowRight") {
        navigateToNextWord();
      } else if (event.key === "ArrowLeft") {
        navigateToPreviousWord();
      } else if (event.key === "ArrowUp") {
        navigateToDetails();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentWordIndex, currentCategoryIndex, showDetails]);

  // Check if chapter has valid data
  if (!chapter || chapter.length === 0) {
    return <div className="text-center">No data available to display.</div>;
  }

  return (
    <div
      {...swipeHandlers} // Attach swipe handlers to the main container
      className="w-screen max-w-4xl mx-auto">
      {!showDetails ? (
        <Word
          word={currentWord.word || "No word available"}
          partOfSpeech={category}
        />
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
