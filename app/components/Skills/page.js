'use client';

import React from 'react';
import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import examRevision from '../../data/l&s/Skills/all_chapters_skills';
import { ProgressHeader } from '../UI/ProgressBar';

const capitalizeFirstLetter = (string) => {
  if (typeof string !== 'string') return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const TitleSlide = React.memo(({ title }) => (
  <div className="flex items-center justify-center h-[calc(100vh-200px)]">
    <motion.h2 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-6xl font-bold text-lime-400 text-center px-6"
    >
      {capitalizeFirstLetter(title.split(/(?=[A-Z])/).join(" "))}
    </motion.h2>
  </div>
));

const ContentSlide = React.memo(({ title, content }) => {
  const renderContent = useCallback((data) => {
    if (!data) return null;

    return Object.entries(data).map(([key, value]) => {
      if (key === 'title') return null;

      if (Array.isArray(value)) {
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-neutral-900/30 p-6 rounded-xl backdrop-blur-sm mb-6"
            key={key}
          >
            <h3 className="text-2xl font-bold mb-4 text-lime-400">
              {capitalizeFirstLetter(key.split(/(?=[A-Z])/).join(" "))}
            </h3>
            <ul className="space-y-3">
              {value.map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-white list-disc ml-6"
                >
                  {typeof item === 'object' ? (
                    <div className="mb-3">
                      {item.topic && (
                        <h4 className="text-lime-400 font-semibold mb-2">
                          {capitalizeFirstLetter(item.topic)}
                        </h4>
                      )}
                      {item.questions && (
                        <ul className="ml-4 space-y-2">
                          {item.questions.map((q, qIndex) => (
                            <li key={qIndex} className="text-neutral-200 list-disc">
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

      if (typeof value === 'object' && value !== null) {
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-neutral-900/30 p-6 rounded-xl backdrop-blur-sm mb-6"
            key={key}
          >
            <h3 className="text-2xl font-bold text-lime-400 mb-4">
              {capitalizeFirstLetter(key.split(/(?=[A-Z])/).join(" "))}
            </h3>
            {Object.entries(value).map(([subKey, subValue]) => (
              <div key={subKey} className="mb-4">
                {subValue.title && (
                  <h4 className="text-xl font-semibold text-lime-400 mb-2">
                    {capitalizeFirstLetter(subValue.title)}
                  </h4>
                )}
                {subValue.prompts && (
                  <ul className="space-y-4">
                    {subValue.prompts.map((prompt, pIndex) => (
                      <li key={pIndex} className="bg-neutral-900/20 p-4 rounded-lg">
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
                {!subValue.title && !subValue.prompts && (
                  Array.isArray(subValue) ? (
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
                    <p className="text-white ml-4">{capitalizeFirstLetter(subValue)}</p>
                  )
                )}
              </div>
            ))}
          </motion.div>
        );
      }

      return (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-neutral-900/30 p-6 rounded-xl backdrop-blur-sm mb-6"
          key={key}
        >
          <h3 className="text-2xl font-bold text-lime-400 mb-4">
            {capitalizeFirstLetter(key.split(/(?=[A-Z])/).join(" "))}
          </h3>
          <p className="text-white ml-4">{capitalizeFirstLetter(value)}</p>
        </motion.div>
      );
    }).filter(Boolean);
  }, []);

  return (
    <div className="max-w-4xl mx-auto w-full px-6 py-8 overflow-y-auto h-[calc(100vh-200px)]">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-lime-400 mb-8 text-center"
      >
        {capitalizeFirstLetter(title.split(/(?=[A-Z])/).join(" "))}
      </motion.h2>
      <div className="grid grid-cols-1 gap-6">
        {renderContent(content)}
      </div>
    </div>
  );
});

const SlidesPage = () => {
  const [state, setState] = useState({
    currentSection: 0,
    isTitle: true
  });

  const sections = useMemo(() => Object.entries(examRevision), []);
  const currentSection = sections[state.currentSection];

  const getChapterName = useCallback(() => {
    const sectionKey = currentSection[0];
    switch (sectionKey) {
      case 'Introduction': return 'Introduction';
      case 'listeningExam': return 'Listening';
      case 'speakingExam': return 'Speaking';
      default: return sectionKey;
    }
  }, [currentSection]);

  const totalSlides = 15;
  const currentOverallSlide = useMemo(() => {
    let slideIndex = 0;
    for (let i = 0; i < state.currentSection; i++) {
      const sectionSlides = Object.keys(sections[i][1]).length;
      slideIndex += sectionSlides > 1 ? sectionSlides * 2 : 2;
    }
    if (state.isTitle) {
      return slideIndex + 1;
    } else {
      slideIndex += 1;
      return slideIndex + (Object.keys(currentSection[1]).length - 1);
    }
  }, [state, sections, currentSection]);

  const progressPercentage = Math.round((currentOverallSlide / totalSlides) * 100);

  const handleNext = useCallback(() => {
    setState(prev => {
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
    setState(prev => {
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
    trackMouse: true
  });

  const handleKeyPress = useCallback((event) => {
    if (event.key === 'ArrowRight') handleNext();
    if (event.key === 'ArrowLeft') handlePrev();
  }, [handleNext, handlePrev]);

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const isLastSlide = state.currentSection === sections.length - 1 && !state.isTitle;

  return (
    <div 
      {...handlers} 
      className="min-h-screen bg-neutral-900 text-white relative flex flex-col items-center"
    >
      <div className="fixed top-0 left-0 right-0 p-4 bg-neutral-900/80 backdrop-blur-sm z-10">
        <div className="max-w-4xl mx-auto">
          <ProgressHeader 
            chapterName={getChapterName()}
            currentWordIndex={state.isTitle ? 0 : 1}
            totalWordsInChapter={2}
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
            <TitleSlide title={currentSection[0]} />
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
            className="flex-1 py-3 px-6 rounded-lg font-bold text-white hover:text-lime-950 bg-neutral-800 hover:bg-lime-500 transition-colors"
            onClick={handlePrev}
          >
            Previous
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex-1 py-3 px-6 rounded-lg font-bold text-white hover:text-lime-950 ${
              isLastSlide 
                ? 'bg-neutral-600 cursor-not-allowed' 
                : 'bg-neutral-800 hover:bg-lime-500'
            } transition-colors`}
            onClick={handleNext}
            disabled={isLastSlide}
          >
            {!state.isTitle && state.currentSection < sections.length - 1 ? 'Next Section' : 'Next'}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default SlidesPage;