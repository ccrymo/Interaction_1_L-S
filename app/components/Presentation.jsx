"use client";
// components/Presentation.js
import { useEffect, useRef } from "react";
import Reveal from "reveal.js";
import { chapter_03 } from "../data/chapter_03";
import "reveal.js/dist/reveal.css"; // Keep the core CSS for functionality
// Removed the default theme CSS to use Tailwind instead

export default function Presentation() {
  const deckRef = useRef(null);

  useEffect(() => {
    const deck = new Reveal(deckRef.current, {
      controls: true,
      progress: true,
      center: true,
      transition: "slide", // Transition effect
    });

    deck.initialize();

    return () => deck.destroy();
  }, []);

  return (
    <div className="reveal h-full w-full overflow-hidden" ref={deckRef}>
      <div className="slides">
        {/* Title Slide */}
        <section className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-600 to-purple-600 text-white">
          <h1 className="text-5xl font-bold mb-4">Chapter 3 Vocabulary</h1>
          <p className="text-2xl">
            Explore key terms with definitions, synonyms, and antonyms.
          </p>
        </section>

        {/* Generate slides dynamically */}
        {chapter_03.map((category) => (
          <section key={category.category}>
            {/* Category Slide */}
            <section className="flex items-center justify-center h-full bg-gray-800 text-white">
              <h2 className="text-4xl font-semibold">{category.category}</h2>
            </section>

            {/* Word Slides */}
            {category.words.map((word) => (
              <section key={word.word} className="p-10 bg-white text-gray-900">
                <h3 className="text-3xl font-bold mb-6">{word.word}</h3>
                <p className="mb-4">
                  <strong>Definition:</strong> {word.definition}
                </p>
                <p className="mb-4">
                  <strong>Synonym:</strong> {word.synonym}
                </p>
                <p>
                  <strong>Antonym:</strong> {word.antonym}
                </p>
              </section>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
