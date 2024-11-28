import Link from "next/link";

export default function Home() {
  const chapters = [
    { id: 1, title: "Chapter 1", path: "./books/L&S/chapters/ch1" },
    { id: 2, title: "Chapter 2", path: "./books/L&S/chapters/ch2" },
    { id: 3, title: "Chapter 3", path: "./books/L&S/chapters/ch3" },
    { id: 4, title: "Chapter 4", path: "./books/L&S/chapters/ch4" },
    { id: 6, title: "Chapter 6", path: "./books/L&S/chapters/ch6" },
    { id: 7, title: "Chapter 7", path: "./books/L&S/chapters/ch7" },
  ];

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="  mb-10 text-4xl md:text-4xl lg:text-6xl font-bold text-neutral-400">
        Interactions 1:
        <div className="mb-10 text-4xl md:text-4xl lg:text-6xl font-bold text-lime-600">
          {" "}
          L&S
        </div>{" "}
      </h1>
      <ul className="space-y-3 ">
        {chapters.map((chapter) => (
          <li key={chapter.id}>
            <Link
              href={chapter.path}
              className="text-4xl md:text-6xl lg:text-6xl font-bold hover:text-lime-200"
            >
              <button className="flex flex-col max-w-screen-sm mb-2 bg-gradient-to-r from-neutral-700 to-neutral-900 hover:from-green-800 hover:to-green-950 text-white font-bold py-4 px-20 items-center">
                {chapter.title}
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
