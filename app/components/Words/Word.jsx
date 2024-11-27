"use client";

import React from "react";
import Arrow from "../Arrow";
import { Fade } from "react-awesome-reveal";

const Word = ({ word, partOfSpeech }) => {
  return (
    <div className="flex flex-col h-screen">
      {/** 
       * Add arrows to sides of the 'Word' component:
       * 
       * <div className="flex flex-row ">
        <div className="items-start justify-start">
          <Arrow direction="left" />
        </div>
        <div className="  items-end justify-end">
          <Arrow direction="right" />
        </div>
      </div>*/}

      <div className="flex flex-col h-screen items-center justify-center px-4">
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
        <div className="flex flex-col mb-20 items-center justify-center">
          <Arrow direction="down" />
        </div>
      </div>
    </div>
  );
};

export default Word;
