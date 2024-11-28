import Link from "next/link";

export default function Home() {
  const chapters = [
    { id: 1, title: "Chapter 1", path: "./L&S/chapters/ch1" },
    { id: 2, title: "Chapter 2", path: "./L&S/chapters/ch2" },
    { id: 3, title: "Chapter 3", path: "./L&S/chapters/ch3" },
    { id: 4, title: "Chapter 4", path: "./L&S/chapters/ch4" },
    { id: 6, title: "Chapter 6", path: "./L&S/chapters/ch6" },
    { id: 7, title: "Chapter 7", path: "./L&S/chapters/ch7" },
  ];

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="flex flex-col items-center justify-center top-0 text-4xl md:text-4xl lg:text-6xl font-bold text-neutral-400">
        Interactions 1:
        <div className="mb-8 text-4xl md:text-4xl lg:text-6xl font-bold text-lime-400 ">
          {" "}
          L&S
        </div>{" "}
      </h1>
      <ul className="space-y-3 ">
        {chapters.map((chapter) => (
          <li key={chapter.id}>
            <Link
              href={chapter.path}
              className="text-2xl md:text-3xl lg:text-4xl font-bold "
            >
              <button className="flex flex-col max-w-screen-sm mb-2 bg-gradient-to-r from-neutral-700 to-neutral-900 hover:from-lime-400 hover:to-lime-600 hover:text-lime-950 text-white font-bold py-4 px-20 items-center">
                {chapter.title}
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
