'use client'
import { useState } from 'react';
import Link from "next/link";
import ReadingIMG from "./img/ReadingIMG";
import LsIMG from "./img/LsIMG";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div className="absolute flex flex-col mb-36 items-center justify-center">
        <h1 className="mb-10 text-4xl md:text-4xl lg:text-6xl font-bold text-neutral-400">
          Choose your book
        </h1>
        <Link
          href="/books/reading"
          className="text-4xl md:text-6xl lg:text-6xl font-bold hover:text-lime-200 w-full">
          <button className="drop-shadow-lg w-full flex flex-row mb-2 bg-gradient-to-r from-neutral-800 to-neutral-900 hover:from-sky-600 hover:to-sky-400 hover:text-sky-950 text-white font-bold py-4 px-20 items-center justify-center fill-white hover:fill-sky-950">
            Reading <div>
              <ReadingIMG className="w-12 h-12 ml-10" />
            </div>
          </button>
        </Link>
        <button
          onClick={openModal}
          className="text-4xl md:text-6xl lg:text-6xl font-bold hover:text-lime-200 w-full drop-shadow-sm flex flex-row mb-2 bg-gradient-to-r from-neutral-800 to-neutral-900 hover:from-lime-400 hover:to-lime-600 hover:text-lime-950 text-white py-4 px-20 items-center justify-center fill-white hover:fill-lime-950">
          L&S
          <div>
            <LsIMG className="w-12 h-12 ml-10 fill-current" />
          </div>
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="bg-neutral-900 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-white mb-6">Choose an option</h2>
            <div className="flex flex-col space-y-4">
              <Link href="/books/L&S">
                <button className="w-full text-2xl font-bold py-3 px-6 rounded-lg bg-gradient-to-r from-neutral-800 to-neutral-900 hover:from-lime-400 hover:to-lime-600 hover:text-lime-950 text-white">
                  Vocabulary
                </button>
              </Link>
              <Link href="/components/Skills">
                <button className="w-full text-2xl font-bold py-3 px-6 rounded-lg bg-gradient-to-r from-neutral-800 to-neutral-900 hover:from-lime-400 hover:to-lime-600 hover:text-lime-950 text-white">
                  Skills
                </button>
              </Link>
            </div>
            <button
              onClick={closeModal}
              className="mt-6 text-white hover:text-lime-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}