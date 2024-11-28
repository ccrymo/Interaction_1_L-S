import Link from "next/link";

export default function Home() {
  const chapters = [
    { id: 1, title: "Chapter 1", path: "./reading/chapters/ch1" },
    { id: 2, title: "Chapter 2", path: "./reading/chapters/ch2" },
    { id: 3, title: "Chapter 3", path: "./reading/chapters/ch3" },
    { id: 6, title: "Chapter 6", path: "./reading/chapters/ch6" },
    { id: 7, title: "Chapter 7", path: "./reading/chapters/ch7" },
    { id: 8, title: "Chapter 8", path: "./reading/chapters/ch8" },

  ];

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="flex flex-col items-center justify-center top-0 text-4xl md:text-4xl lg:text-6xl font-bold text-neutral-400">
        Interactions 1:
        <div className="mb-8 text-4xl md:text-4xl lg:text-6xl font-bold text-sky-300 ">
          {" "}
          Reading
        </div>{" "}
      </h1>
      <ul className="space-y-3 ">
        {chapters.map((chapter) => (
          <li key={chapter.id}>
            <Link
              href={chapter.path}
              className="text-2xl md:text-3xl lg:text-4xl font-bold hover:text-sky-200"
            >
              <button className="flex flex-col max-w-screen-sm mb-2 bg-gradient-to-r from-neutral-700 to-neutral-900 hover:from-sky-400 hover:to-sky-600 hover:text-sky-950 text-white font-bold py-4 px-20 items-center">
                {chapter.title}
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
