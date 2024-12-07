import React from "react";

const ProgressBar = ({ current, total }) => (
  <div className="w-full bg-neutral-800 rounded-full h-1.5 ">
    <div
      className="bg-neutral-600 h-2 rounded-full transition-all duration-300"
      style={{ width: `${(current / total) * 100}%` }}
    />
  </div>
);

const ProgressHeader = ({
  chapterName,
  currentWordIndex,
  totalWordsInChapter,
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 p-4  bg-neutral-900/80 backdrop-blur-sm z-10">
      <div className="max-w-4xl mx-auto ">
        <div className="flex justify-between items-center mb-2 gabarito">
          <span className="text-neutral-400  text-sm lg:text-xl md:text-lg">{chapterName}</span>
          <span className="text-neutral-400 lg:text-xl md:text-lg">
            Slide: {currentWordIndex + 1} of {totalWordsInChapter}
          </span>
        </div>
        <ProgressBar
          current={currentWordIndex + 1}
          total={totalWordsInChapter}
        />
      </div>
    </div>
  );
};

export { ProgressBar, ProgressHeader };
