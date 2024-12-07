"use client";

import React from "react";
import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import examRevision from "../../../data/reading/Skills/examRevision_Reading";
import { ProgressHeader } from "../../UI/ProgressBar";

const capitalizeFirstLetter = (string) => {
  if (typeof string !== "string") return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const TitleSlide = React.memo(({ title }) => (
  <div className="flex items-center justify-center h-[calc(100vh-200px)]">
    <motion.h2
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-4xl md:text-6xl lg:text-6xl font-bold text-cyan-400 text-center px-6"
    >
      {capitalizeFirstLetter(title.split(/(?=[A-Z])/).join(" "))}
    </motion.h2>
  </div>
));

const ContentSlide = React.memo(({ title, content }) => {
  const renderContent = useCallback((data) => {
    if (!data) return null;

    return Object.entries(data)
      .map(([key, value]) => {
        if (key === "title") return null;

        if (Array.isArray(value)) {
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-neutral-900/30 pb-6 px-6 rounded-xl backdrop-blur-sm "
              key={key}
            >
              <h3 className="text-2xl lg:text-4xl font-bold mb-8 text-neutral-200">
                {capitalizeFirstLetter(key.split(/(?=[A-Z])/).join(" "))}
              </h3>
              <ul className="space-y-6">
                {value.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-white lg:text-xl md:text-xl list-disc lg:ml-6 ml-1"
                  >
                    {typeof item === "object" ? (
                      <div className="mb-3">
                        {item.topic && (
                          <h4 className="text-cyan-400 font-extrabold mb-2">
                            {capitalizeFirstLetter(item.topic)}
                          </h4>
                        )}
                        {item.questions && (
                          <ul className="ml-4 space-y-2">
                            {item.questions.map((q, qIndex) => (
                              <li
                                key={qIndex}
                                className="text-neutral-200 list-disc"
                              >
                                {capitalizeFirstLetter(q)}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <span>{capitalizeFirstLetter(item)}</span>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          );
        }

        if (typeof value === "object" && value !== null) {
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-neutral-900/30  pb-6 lg:px-6  rounded-xl -xl backdrop-blur-sm "
              key={key}
            >
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">
                {capitalizeFirstLetter(key.split(/(?=[A-Z])/).join(" "))}
              </h3>
              {Object.entries(value).map(([subKey, subValue]) => (
                <div key={subKey} className="mb-4">
                  {subValue.title && (
                    <h4 className="text-xl font-semibold text-cyan-400 mb-2">
                      {capitalizeFirstLetter(subValue.title)}
                    </h4>
                  )}
                  {subValue.prompts && (
                    <ul className="space-y-4">
                      {subValue.prompts.map((prompt, pIndex) => (
                        <li
                          key={pIndex}
                          className="bg-neutral-900/20 p-4 rounded-lg"
                        >
                          {prompt.questions && (
                            <ul className="space-y-2">
                              {prompt.questions.map((question, qIndex) => (
                                <li
                                  key={qIndex}
                                  className="text-white list-disc ml-6"
                                >
                                  {capitalizeFirstLetter(question)}
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                  {!subValue.title &&
                    !subValue.prompts &&
                    (Array.isArray(subValue) ? (
                      <ul className="space-y-2">
                        {subValue.map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="text-white list-disc ml-6"
                          >
                            {capitalizeFirstLetter(item)}
                          </motion.li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-white ml-4">
                        {capitalizeFirstLetter(subValue)}
                      </p>
                    ))}
                </div>
              ))}
            </motion.div>
          );
        }

        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-neutral-900/30  pb-6 px-6 rounded-xl -xl backdrop-blur-sm "
            key={key}
          >
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">
              {capitalizeFirstLetter(key.split(/(?=[A-Z])/).join(" "))}
            </h3>
            <p className="text-white ml-4">{capitalizeFirstLetter(value)}</p>
          </motion.div>
        );
      })
      .filter(Boolean);
  }, []);

  return (
    <div className="lg:mt-10  max-w-4xl mx-auto w-full px-6 py-8 overflow-y-auto h-[calc(100vh-200px)]">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="lg:mb-14 text-4xl lg:text-6xl font-extrabold text-cyan-400  mb-8 text-left"
      >
        {capitalizeFirstLetter(title.split(/(?=[A-Z])/).join(" "))}
      </motion.h2>
      <div className="grid grid-cols-1 gap-1">{renderContent(content)}</div>
    </div>
  );
});

const SlidesPage = () => {
  const [state, setState] = useState({
    currentSection: 0,
    isTitle: true,
  });

  const sections = useMemo(() => Object.entries(examRevision), []);
  const currentSection = sections[state.currentSection];

  const getChapterName = useCallback(() => {
    const sectionKey = currentSection[0];
    switch (sectionKey) {
      case "Introduction":
        return "Introduction";
      case "listeningExam":
        return "Listening";
      case "speakingExam":
        return "Speaking";
      case "speakingPresentationTopics":
        return "Choose one of the topics";
      case "AcademicLifeAroundTheWorld":
        return "Academic Life Around The World";
      case "ExperiencingNature":
        return "Experiencing Nature";
      case "LivingToEatorEatingToLive":
        return "Living To Eat or Eating To Live";
      case "InTheCommunity":
        return "In The Community";
      case "CulturesAroundTheWorld":
        return "Cultures Around The World";
      default:
        return sectionKey;
    }
  }, [currentSection]);
  
  const totalSlides = useMemo(() => {
    return Object.entries(examRevision).reduce((total, [_, sectionContent]) => {
      // Add 2 for each section (title slide + content slide)
      return total + 2;
    }, 0);
  }, []);

  const currentOverallSlide = useMemo(() => {
    let count = state.currentSection * 2; // Each section has 2 slides
    if (!state.isTitle) {
      count += 1; // Add 1 if we're on the content slide
    }
    return count + 1; // Add 1 because we want to start from 1, not 0
  }, [state.currentSection, state.isTitle]);

  const progressPercentage = (currentOverallSlide / totalSlides) * 100;

  const handleNext = useCallback(() => {
    setState((prev) => {
      if (prev.isTitle) {
        return { ...prev, isTitle: false };
      }
      const nextSection = prev.currentSection + 1;
      if (nextSection < sections.length) {
        return { currentSection: nextSection, isTitle: true };
      }
      return prev;
    });
  }, [sections.length]);

  const handlePrev = useCallback(() => {
    setState((prev) => {
      if (!prev.isTitle) {
        return { ...prev, isTitle: true };
      }
      const prevSection = prev.currentSection - 1;
      if (prevSection >= 0) {
        return { currentSection: prevSection, isTitle: false };
      }
      return prev;
    });
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "ArrowRight") handleNext();
      if (event.key === "ArrowLeft") handlePrev();
    },
    [handleNext, handlePrev]
  );

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  const isLastSlide =
    state.currentSection === sections.length - 1 && !state.isTitle;

    return (
      <div {...handlers} className="min-h-screen bg-neutral-900 text-white relative flex flex-col items-center">
        <div className="fixed top-0 left-0 right-0 p-4 bg-neutral-900/80 backdrop-blur-sm z-10">
          <div className="max-w-4xl mx-auto">
            <ProgressHeader 
              chapterName={getChapterName()}
              currentWordIndex={currentOverallSlide - 1}
              totalWordsInChapter={totalSlides}
              overallProgress={progressPercentage}
            />
          </div>
        </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${state.currentSection}-${state.isTitle}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex-1 w-full pt-20"
        >
          {state.isTitle ? (
            <TitleSlide title={getChapterName(currentSection[0])} />
          ) : (
            <ContentSlide
              title={currentSection[0]}
              content={currentSection[1]}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-neutral-900/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-3 px-6 rounded-lg font-bold text-white hover:text-cyan-950 bg-neutral-800 hover:bg-cyan-500 transition-colors"
            onClick={handlePrev}
          >
            Previous
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex-1 py-3 px-6 rounded-lg font-bold text-white hover:text-cyan-950 ${
              isLastSlide
                ? "bg-neutral-600 cursor-not-allowed"
                : "bg-neutral-800 hover:bg-cyan-500"
            } transition-colors`}
            onClick={handleNext}
            disabled={isLastSlide}
          >
            Next
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default SlidesPage;
