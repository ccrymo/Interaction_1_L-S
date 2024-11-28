import Link from "next/link";

export default function Home() {
  return (
    <div className=" flex flex-col h-screen items-center justify-center">
      <div className="absolute flex flex-col mb-36 items-center justify-center">
      <h1 className="mb-10 text-4xl md:text-4xl lg:text-6xl font-bold text-neutral-400">
        Choose your book
      </h1>
      <Link
        href='/books/reading'
        className="text-4xl md:text-6xl lg:text-6xl font-bold hover:text-lime-200"
      >
        <button className="flex flex-col mb-2 bg-gradient-to-r from-neutral-800 to-neutral-900 hover:from-neutral-900 hover:to-neutral-950 text-white font-bold py-4 px-20 items-center">
          Reading
        </button>
      </Link>
      <Link
        href='/books/L&S'
        className="text-4xl md:text-6xl lg:text-6xl font-bold hover:text-lime-200"
      >
        <button className="flex flex-col mb-2 bg-gradient-to-r  from-neutral-800 to-neutral-900 hover:from-neutral-900 hover:to-neutral-950 text-white font-bold py-4 px-20 items-center">
          Listening & Speaking
        </button>
      </Link>
      </div>
    </div>
  );
}
