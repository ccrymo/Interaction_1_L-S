'use client'

import { useState } from 'react';
import styled from '@emotion/styled';
import { Fade } from 'react-awesome-reveal';
import { useSwipeable } from 'react-swipeable';
import skills  from '../../data/l&s/Skills/all_chapters_skills'

const SlideContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const SlideContent = styled.div`
  max-width: 800px;
  width: 100%;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Navigation = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  background: #0070f3;
  color: white;
  cursor: pointer;
  &:hover {
    background: #0051a2;
  }
`;

const Progress = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  font-size: 0.9rem;
`;

const Slide = ({ content }) => {
  const renderContent = (data) => {
    if (!data) return null;
    
    return Object.entries(data).map(([key, value]) => {
      if (Array.isArray(value)) {
        return (
          <div key={key}>
            <h3>{key}</h3>
            <ul>
              {value.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        );
      }
      
      if (typeof value === 'object') {
        return (
          <div key={key}>
            <h3>{key}</h3>
            {renderContent(value)}
          </div>
        );
      }
      
      return (
        <p key={key}>
          <strong>{key}:</strong> {value}
        </p>
      );
    });
  };

  return (
    <SlideContent>
      <h2>{content.title}</h2>
      {renderContent(content)}
    </SlideContent>
  );
};

const SlidesPage = () => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const chapters = Object.values(skills);
  const currentChapterSlides = Object.values(chapters[currentChapter]?.slides || {});

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const handleNext = () => {
    if (currentSlide < currentChapterSlides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else if (currentChapter < chapters.length - 1) {
      setCurrentChapter(prev => prev + 1);
      setCurrentSlide(0);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    } else if (currentChapter > 0) {
      setCurrentChapter(prev => prev - 1);
      setCurrentSlide(Object.values(chapters[currentChapter - 1].slides).length - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="fixed top-4 right-4 text-sm dark:text-white">
        Chapter {currentChapter + 1}/{chapters.length} • 
        Slide {currentSlide + 1}/{currentChapterSlides.length}
      </div>
      
      <Fade key={`${currentChapter}-${currentSlide}`}>
        <Slide content={currentChapterSlides[currentSlide]} />
      </Fade>

      <nav className="flex gap-4 mt-8">
        <button className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white" onClick={handlePrev}>Previous</button>
        <button className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white" onClick={handleNext}>Next</button>
      </nav>
    </div>
  );
};

export default SlidesPage;