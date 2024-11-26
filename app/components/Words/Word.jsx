"use client";

import React from "react";
import { Fade } from "react-awesome-reveal";

const Word = ({ word, partOfSpeech }) => {
  return (
    <div className="flex flex-col h-screen items-center justify-center px-4">
      <Fade duration="2000">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold underline underline-offset-4 md:underline-offset-8 lg:underline-offset-[15px] decoration-4 md:decoration-8 lg:decoration-[15px] decoration-gray-800">
          {word}
        </h1>
      </Fade>
      <Fade delay="50" duration="2000">
        <p className="mt-5 text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-600">
          {partOfSpeech}
        </p>
      </Fade>
    </div>
  );
};

export default Word;
