"use client";
import React, { useState, useEffect } from "react";
import Question from "./UI/Question";
import ReadingText from "./UI/ReadingText";
import SubmitButton from "./UI/SubmitButton";
import Header from "./UI/Header";
import CompletionModal from "./UI/CompletionModal";
import quizData from "../../data/practiceExam/practiceExam";
import QuizButton from "./UI/QuizButton";

export default function Home() {
  // State management
  const [currentQuestionSet, setCurrentQuestionSet] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [isQuestionView, setIsQuestionView] = useState(false);
  const [showAnswerOverlay, setShowAnswerOverlay] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // Content from quiz data
  const readingTextContent = quizData.readingText;
  const readingTextTitle = quizData.readingTextTitle;

  // Calculate total questions on component mount
  useEffect(() => {
    const totalQuestionsCount = Object.keys(quizData)
      .filter((key) => key.startsWith("questions"))
      .reduce((total, key) => total + quizData[key].length, 0);

    setTotalQuestions(totalQuestionsCount);
  }, []);

  // Timer handlers
  const handleTimeUp = () => {
    setIsTimeUp(true);
  };

  // Answer selection handler
  const handleSelect = (questionNumber, option) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [`question${currentQuestionSet}_${questionNumber}`]: option,
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
    const questionSet = quizData[`questions${currentQuestionSet}`];
    if (currentQuestionIndex < questionSet.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else if (
      currentQuestionSet <
      Object.keys(quizData).filter((key) => key.startsWith("questions")).length
    ) {
      setCurrentQuestionSet((prevSet) => prevSet + 1);
      setCurrentQuestionIndex(0);
      setAnswers({});
    } else {
      setIsQuizCompleted(true);
    }
    setIsAnswerSelected(false);
  };

  // Submit handler
  const handleSubmit = () => {
    const questionSet = quizData[`questions${currentQuestionSet}`];
    const currentQuestion = questionSet[currentQuestionIndex];
    const selectedAnswer =
      answers[`question${currentQuestionSet}_${currentQuestion.number}`];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    }

    setShowAnswerOverlay(true);
  };

  // Question number calculator
  const getCurrentOverallQuestionNumber = () => {
    let previousQuestionsCount = 0;
    for (let i = 1; i < currentQuestionSet; i++) {
      previousQuestionsCount += quizData[`questions${i}`].length;
    }
    return previousQuestionsCount + currentQuestionIndex + 1;
  };

  // Question renderer
  const renderQuestions = () => {
    const questionSet = quizData[`questions${currentQuestionSet}`];
    if (!questionSet || currentQuestionIndex >= questionSet.length) return null;

    const q = questionSet[currentQuestionIndex];
    const selectedAnswer =
      answers[`question${currentQuestionSet}_${q.number}`];
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
      />

      <div className="flex flex-1 pt-16">
        {/* Desktop View */}
        <div className="hidden md:block md:w-1/2 h-full">
          <ReadingText content={readingTextContent} title={readingTextTitle} />
        </div>
        <div className="hidden md:block md:w-1/2 h-full p-4 flex flex-col">
          <div className="overflow-y-auto flex-grow">
            {renderQuestions()}
          </div>
          <div className="mt-auto">
            <SubmitButton onClick={handleSubmit} disabled={!isAnswerSelected} />
          </div>
        </div>

        {/* Mobile View */}
        <div className="w-full md:hidden">
          {!isQuestionView ? (
            <div className="h-[calc(100vh-120px)]">
              <ReadingText content={readingTextContent} title={readingTextTitle} />
            </div>
          ) : (
            <div className="p-4 h-[calc(100vh-120px)] flex flex-col">
              <div className="overflow-y-auto flex-grow">
                {renderQuestions()}
              </div>
              <div className="mt-auto">
                <SubmitButton onClick={handleSubmit} disabled={!isAnswerSelected} />
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
