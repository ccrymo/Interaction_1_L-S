"use client";
import React from "react";
import Arrow from "../Arrow";
import { Fade } from "react-awesome-reveal";

const Word = ({ word, partOfSpeech, isFirstWord, isLastWord }) => {
  const words = word.split(' ');
  
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-row"></div>
      <div className="flex flex-col h-screen items-center justify-center px-4">
        <div className="flex flex-col h-screen items-center justify-center px-4">
          <Fade duration="2000">
            <div className="flex flex-row items-center justify-center">
              <div className="mr-3 md:mr-20 lg:mr-52" style={{ opacity: isFirstWord ? 0.0 : 1 }}>
                <Arrow direction="left" />
              </div>
              <h1 className="font-bold underline underline-offset-4 md:underline-offset-8 lg:underline-offset-[15px] decoration-4 md:decoration-8 lg:decoration-[15px] decoration-gray-800">
                {words.map((w, index) => (
                  <span key={index} className={`${words.length > 1 ? 'text-4xl md:text-6xl lg:text-8xl mx-0 md:mx-2 lg:mx-3' : 'text-6xl md:text-8xl lg:text-9xl'} ${index > 0 ? 'ml-2' : ''}`}>
                    {w}
                  </span>
                ))}
              </h1>
              <div className="ml-3 md:ml-20 lg:ml-52" style={{ opacity: isLastWord ? 0.0 : 1 }}>
                <Arrow direction="right" />
              </div>
            </div>
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