"use client";

import React, { useState, useEffect } from "react";
import Question from "./UI/Question";
import ReadingText from "./UI/ReadingText";
import SubmitButton from "./UI/SubmitButton";
import Header from "./UI/Header";
import CompletionModal from "./UI/CompletionModal";
import quizData from "../../data/reading/practiceExam/practiceExam";

export default function Home() {
  // State management
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [totalQuestions, setTotalQuestions] = useState(quizData.questions.length);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [isQuestionView, setIsQuestionView] = useState(false);
  const [showAnswerOverlay, setShowAnswerOverlay] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // Function to create paragraphs
  const createParagraphs = (text) => {
    return text.split('\n\n').map((paragraph, index) => (
      <p key={index} className="mb-4">{paragraph}</p>
    ));
  };

  // Function to get the correct reading text and title
  const getReadingContent = () => {
    if (currentQuestionIndex < 15) {
      return {
        title: quizData.readingTextTitle01,
        content: createParagraphs(quizData.readingText01)
      };
    } else if (currentQuestionIndex < 33) {
      return {
        title: quizData.readingTextTitle02,
        content: createParagraphs(quizData.readingText02)
      };
    }
    return { title: "", content: "" };
  };

  // Timer handlers
  const handleTimeUp = () => {
    setIsTimeUp(true);
  };

  // Answer selection handler
  const handleSelect = (questionNumber, option) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [`question_${questionNumber}`]: option,
    }));
    setIsAnswerSelected(true);
  };

  // Overlay handlers
  const handleOverlayClose = () => {
    setShowAnswerOverlay(false);
    moveToNextQuestion();
  };

  // Navigation handlers
  const moveToNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsQuizCompleted(true);
    }
    setIsAnswerSelected(false);
  };

  // Submit handler
  const handleSubmit = () => {
    const currentQuestion = quizData.questions[currentQuestionIndex];
    const selectedAnswer = answers[`question_${currentQuestion.number}`];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    }

    setShowAnswerOverlay(true);
  };

  // Question number calculator
  const getCurrentOverallQuestionNumber = () => {
    return currentQuestionIndex + 1;
  };

  // Question renderer
  const renderQuestions = () => {
    if (currentQuestionIndex >= totalQuestions) return null;

    const q = quizData.questions[currentQuestionIndex];
    const selectedAnswer = answers[`question_${q.number}`];
    const isCorrect = selectedAnswer === q.correctAnswer;

    return (
      <Question
        key={q.number}
        question={q.question}
        options={q.options}
        onSelect={(option) => handleSelect(q.number, option)}
        selectedAnswer={selectedAnswer}
        showOverlay={showAnswerOverlay}
        isCorrect={isCorrect}
        onOverlayClose={handleOverlayClose}
      />
    );
  };

  // Modal handlers
  const handleCloseModal = () => {
    setIsQuizCompleted(false);
    setIsTimeUp(false);
  };

  // View toggle handler
  const toggleView = () => {
    setIsQuestionView(!isQuestionView);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header
        currentQuestion={getCurrentOverallQuestionNumber()}
        totalQuestions={totalQuestions}
        correctAnswers={correctAnswers}
        onTimeUp={handleTimeUp}
        timeLimit={3600}
        isQuestionView={isQuestionView}
        onToggleView={toggleView}
        isQuizCompleted={isQuizCompleted}
        isTimeUp={isTimeUp}
      />

      <div className="flex flex-1 pt-16">
        {/* Desktop View */}
        <div className="hidden md:block md:w-1/2 h-full">
          <ReadingText
            content={getReadingContent().content}
            title={getReadingContent().title}
          />
        </div>
        <div className="hidden md:block md:w-1/2 h-full p-4 flex flex-col">
          <div className="overflow-y-auto flex-grow">{renderQuestions()}</div>
          <div className="mt-5">
            <SubmitButton onClick={handleSubmit} disabled={!isAnswerSelected} />
          </div>
        </div>
     
        {/* Mobile View */}
        <div className="w-full md:hidden">
          {!isQuestionView ? (
            <div className="h-[calc(100vh-120px)]">
              <ReadingText
                content={getReadingContent().content}
                title={getReadingContent().title}
              />
            </div>
          ) : (
            <div className="p-4 h-[calc(100vh-120px)] flex flex-col">
              <div className="overflow-y-auto flex-grow">
                {renderQuestions()}
              </div>
              <div className="absolute bottom-0 left-0 w-full">
                <SubmitButton
                  onClick={handleSubmit}
                  disabled={!isAnswerSelected}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {(isQuizCompleted || isTimeUp) && (
        <CompletionModal
          score={correctAnswers}
          totalQuestions={totalQuestions}
          onClose={handleCloseModal}
          isTimeout={isTimeUp}
        />
      )}
    </div>
  );
}
