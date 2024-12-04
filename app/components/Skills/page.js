'use client'

import React from 'react';
import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { FixedSizeList } from 'react-window';
import skills from '../../data/l&s/Skills/all_chapters_skills';

const ListItem = React.memo(({ item, index }) => (
  <motion.li 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
    className="py-2 px-4 hover:bg-neutral-800/20 rounded-lg transition-colors"
    key={`item-${index}`}
  >
    {typeof item === 'object' ? (
      <div>
        {item.course && <p>Course: {item.course}</p>}
        {item.note && <p>Note: {item.note}</p>}
      </div>
    ) : item}
  </motion.li>
));

const SlideContent = React.memo(({ title, content }) => {
  const renderContent = useCallback((data) => {
    if (!data) return null;
    
    return Object.entries(data).map(([key, value]) => {
      if (key === 'title') return null;
      
      if (Array.isArray(value)) {
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-neutral-900/30 p-6 rounded-xl backdrop-blur-sm"
            key={key}
          >
            <h3 className="text-2xl font-bold mb-4 text-lime-400">{key}</h3>
            <FixedSizeList
              height={200}
              itemCount={value.length}
              itemSize={40}
              width="100%"
              className="custom-scrollbar"
            >
              {({ index, style }) => (
                <div style={style}>
                  <ListItem 
                    item={value[index]}
                    index={index}
                  />
                </div>
              )}
            </FixedSizeList>
          </motion.div>
        );
      }
      
      if (typeof value === 'object' && value !== null) {
        if (value.course || value.note) {
          return (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-neutral-900/30 p-4 rounded-lg"
              key={key}
            >
              {value.course && <p className="text-lime-400">Course: {value.course}</p>}
              {value.note && <p className="text-neutral-300">Note: {value.note}</p>}
            </motion.div>
          );
        }
        return (
          <div className='space-y-4' key={key}>
            <h3 className='text-2xl font-bold text-lime-400'>{key}</h3>
            {renderContent(value)}
          </div>
        );
      }
      
      return (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-neutral-300"
          key={key}
        >
          <strong className="text-lime-400">{key}:</strong> {value}
        </motion.p>
      );
    }).filter(Boolean);
  }, []);

  return (
    <div className="max-w-4xl mx-auto w-full px-6 py-8">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-lime-400 mb-8 text-center"
      >
        {title}
      </motion.h2>
      <div className="grid grid-cols-1 gap-6">
        {renderContent(content)}
      </div>
    </div>
  );
});

const ProgressBar = ({ current, total }) => (
  <div className="w-full bg-neutral-800 rounded-full h-1.5">
    <div 
      className="bg-lime-400 h-1.5 rounded-full transition-all duration-300"
      style={{ width: `${(current / total) * 100}%` }}
    />
  </div>
);

const SlidesPage = () => {
  const [state, setState] = useState({
    currentChapter: 0,
    currentSlide: 0
  });

  const chapters = useMemo(() => Object.values(skills), []);
  const currentChapterSlides = useMemo(
    () => Object.values(chapters[state.currentChapter]?.slides || {}),
    [chapters, state.currentChapter]
  );

  const handleNext = useCallback(() => {
    setState(prevState => {
      const nextSlide = prevState.currentSlide + 1;
      if (nextSlide < currentChapterSlides.length) {
        return { ...prevState, currentSlide: nextSlide };
      }
      const nextChapter = prevState.currentChapter + 1;
      return {
        currentChapter: nextChapter < chapters.length ? nextChapter : prevState.currentChapter,
        currentSlide: 0
      };
    });
  }, [currentChapterSlides.length, chapters.length]);

  const handlePrev = useCallback(() => {
    setState(prevState => {
      if (prevState.currentSlide > 0) {
        return { ...prevState, currentSlide: prevState.currentSlide - 1 };
      }
      const prevChapter = prevState.currentChapter - 1;
      if (prevChapter >= 0) {
        return {
          currentChapter: prevChapter,
          currentSlide: Object.values(chapters[prevChapter].slides).length - 1
        };
      }
      return prevState;
    });
  }, [chapters]);

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const handleKeyPress = useCallback((event) => {
    if (event.key === 'ArrowRight') {
      handleNext();
    } else if (event.key === 'ArrowLeft') {
      handlePrev();
    }
  }, [handleNext, handlePrev]);

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div 
      {...handlers} 
      className="min-h-screen bg-neutral-900 text-white relative flex flex-col items-center"
    >
      <div className="fixed top-0 left-0 right-0 p-4 bg-neutral-900/80 backdrop-blur-sm z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lime-400">
              Chapter {state.currentChapter + 1} of {chapters.length}
            </span>
            <span className="text-neutral-400">
              Slide {state.currentSlide + 1} of {currentChapterSlides.length}
            </span>
          </div>
          <ProgressBar 
            current={state.currentSlide + 1}
            total={currentChapterSlides.length}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${state.currentChapter}-${state.currentSlide}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex-1 w-full pt-20"
        >
          <SlideContent 
            title={currentChapterSlides[state.currentSlide]?.title}
            content={currentChapterSlides[state.currentSlide]}
          />
        </motion.div>
      </AnimatePresence>

      <div className="fixed bottom-0  left-0 right-0 p-6 bg-neutral-900/80 backdrop-blur-sm">
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
            className="flex-1 py-3 px-6 rounded-lg font-bold text-white hover:text-lime-950 bg-neutral-800 hover:bg-lime-500 transition-colors"
            onClick={handleNext}
          >
            Next
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default SlidesPage;