"use client";
import React, { useState, useEffect } from "react";
import Question from "./UI/Question";
import ReadingText from "./UI/ReadingText";
import SubmitButton from "./UI/SubmitButton";
import Header from "./UI/Header";
import CompletionModal from "./UI/CompletionModal";
import quizData from "../../../data/reading/practiceExam/practiceExam";

export default function QuizComponent() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [isQuestionView, setIsQuestionView] = useState(false);
  const [showAnswerOverlay, setShowAnswerOverlay] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const MAX_SCORE = 50;
  const PASS_THRESHOLD = 30; // 60% passing grade

  const handleSelect = (questionNumber, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionNumber]: option,
    }));
    setIsAnswerSelected(true);
  };

  const handleSubmit = () => {
    const currentQuestion = quizData?.questions?.[currentQuestionIndex];
    const selectedAnswer = answers[currentQuestion.number];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    if (isCorrect) {
      // Each question's weight is calculated based on total questions and max score
      const questionWeight = 50 / (quizData?.questions?.length || 1);
      setCorrectAnswers((prev) => prev + questionWeight);
    }
    setShowAnswerOverlay(true);
  };

  useEffect(() => {
    console.log("Quiz Data:", quizData); // Debug log
    if (!quizData || !quizData.questions) {
      console.error("Quiz data not loaded correctly");
    }
  }, []);

  const handleOverlayClose = () => {
    setShowAnswerOverlay(false);
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsAnswerSelected(false);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const toggleView = () => {
    setIsQuestionView(!isQuestionView);
  };
  const convertScoreToFifty = (rawScore, totalQuestions) => {
    return Math.round((rawScore * 50) / totalQuestions);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={quizData?.questions?.length || 0}
        correctAnswers={convertScoreToFifty(
          correctAnswers,
          quizData?.questions?.length || 0
        )}
        maxScore={50} // Add this new prop
        onTimeUp={() => setIsTimeUp(true)}
        timeLimit={3600}
        isQuestionView={isQuestionView}
        onToggleView={toggleView}
      />

      <div className="flex flex-1 pt-16">
        {/* Desktop View */}
        <div className="hidden md:block md:w-1/2 h-full">
          <ReadingText
            content={quizData.readingText}
            title={quizData.readingTextTitle}
          />
        </div>
        <div className="hidden md:block md:w-1/2 h-full p-4 flex flex-col">
          <div className="overflow-y-auto flex-grow">
            {currentQuestionIndex < quizData.questions.length && (
              <Question
                question={quizData.questions[currentQuestionIndex].question}
                options={quizData.questions[currentQuestionIndex].options}
                onSelect={(option) =>
                  handleSelect(
                    quizData.questions[currentQuestionIndex].number,
                    option
                  )
                }
                selectedAnswer={
                  answers[quizData.questions[currentQuestionIndex].number]
                }
                showOverlay={showAnswerOverlay}
                isCorrect={
                  answers[quizData.questions[currentQuestionIndex].number] ===
                  quizData.questions[currentQuestionIndex].correctAnswer
                }
                onOverlayClose={handleOverlayClose}
              />
            )}
          </div>
          <div className="mt-auto">
            <SubmitButton onClick={handleSubmit} disabled={!isAnswerSelected} />
          </div>
        </div>

        {/* Mobile View */}
        <div className="w-full md:hidden">
          {!isQuestionView ? (
            <div className="h-[calc(100vh-120px)]">
              <ReadingText
                content={quizData.readingText}
                title={quizData.readingTextTitle}
              />
            </div>
          ) : (
            <div className="p-4 h-[calc(100vh-120px)] flex flex-col">
              <div className="overflow-y-auto flex-grow">
                {currentQuestionIndex < quizData.questions.length && (
                  <Question
                    question={quizData.questions[currentQuestionIndex].question}
                    options={quizData.questions[currentQuestionIndex].options}
                    onSelect={(option) =>
                      handleSelect(
                        quizData.questions[currentQuestionIndex].number,
                        option
                      )
                    }
                    selectedAnswer={
                      answers[quizData.questions[currentQuestionIndex].number]
                    }
                    showOverlay={showAnswerOverlay}
                    isCorrect={
                      answers[
                        quizData.questions[currentQuestionIndex].number
                      ] ===
                      quizData.questions[currentQuestionIndex].correctAnswer
                    }
                    onOverlayClose={handleOverlayClose}
                  />
                )}
              </div>
              <div className="mt-auto">
                <SubmitButton
                  onClick={handleSubmit}
                  disabled={!isAnswerSelected}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {(isQuizCompleted || isTimeUp) && (
        <CompletionModal
          score={convertScoreToFifty(
            correctAnswers,
            quizData?.questions?.length || 0
          )}
          totalQuestions={50} // Changed from quizData.questions.length to 50
          onClose={() => {
            setIsQuizCompleted(false);
            setIsTimeUp(false);
          }}
          isTimeout={isTimeUp}
        />
      )}
    </div>
  );
}
