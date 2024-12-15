"use client";
import { useState } from "react";
import ReadingIMG from "./img/ReadingIMG";
import LsIMG from "./img/LsIMG";
import Modal from "./components/UI/Modal";

export default function Home() {
  const [showModalLS, setShowModalLS] = useState(false);
  const [showModalReading, setShowModalReading] = useState(false);

  const openModalLS = () => setShowModalLS(true);
  const closeModalLS = () => setShowModalLS(false);
  const openModalReading = () => setShowModalReading(true);
  const closeModalReading = () => setShowModalReading(false);

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div className="absolute flex flex-col mb-36 items-center justify-center">
        <h1 className="mb-10 text-4xl md:text-4xl lg:text-6xl font-bold text-neutral-400">
          Choose your book
        </h1>
        <button
          onClick={openModalReading}
          className="text-4xl md:text-6xl lg:text-6xl font-bold hover:text-lime-200 w-full"
        >
          <div className="drop-shadow-lg w-full flex flex-row mb-2 bg-gradient-to-r from-neutral-800 to-neutral-900 hover:from-sky-600 hover:to-sky-400 hover:text-sky-950 text-white font-bold py-4 px-20 items-center justify-center fill-white hover:fill-sky-950">
            Reading{" "}
            <div>
              <ReadingIMG className="w-12 h-12 ml-10" />
            </div>
          </div>
        </button>
        <button
          onClick={openModalLS}
          className="text-4xl md:text-6xl lg:text-6xl font-bold  w-full drop-shadow-sm flex flex-row mb-2 bg-gradient-to-r from-neutral-800 to-neutral-900 hover:from-lime-400 hover:to-lime-600 hover:text-lime-950 text-white py-4 px-20 items-center justify-center fill-white hover:fill-lime-950"
        >
          L&S
          <div>
            <LsIMG className="w-12 h-12 ml-10 fill-current" />
          </div>
        </button>
      </div>
      <Modal
        showModal={showModalReading}
        closeModal={closeModalReading}
        vocabLink={"./books/reading"}
        examLink={"./components/Skills/Reading_Exam"}
        skillLink={"./components/Skills/Reading_Skills"}
        practiceLink={"./components/Skills/Practice"}
      />
      <Modal
        showModal={showModalLS}
        closeModal={closeModalLS}
        vocabLink={"./books/L&S"}
        examLink={"./components/Skills/LS"}
      />
    </div>
  );
}
