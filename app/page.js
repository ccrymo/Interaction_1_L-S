import Link from "next/link";

export default function Home() {
  const chapters = [
    { id: 1, title: "Chapter 1", path: "/chapters/ch1" },
    { id: 2, title: "Chapter 2", path: "/chapters/ch2" },
    { id: 3, title: "Chapter 3", path: "/chapters/ch3" },
    { id: 4, title: "Chapter 4", path: "/chapters/ch4" },
    { id: 6, title: "Chapter 6", path: "/chapters/ch6" },
    { id: 7, title: "Chapter 7", path: "/chapters/ch7" },
  ];

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="  mb-10 text-4xl md:text-4xl lg:text-6xl font-bold text-neutral-400">
        Interactions 1:
        <span className="mb-10 text-4xl md:text-4xl lg:text-6xl font-bold text-lime-600"> L&S</span>{" "}
      </h1>
      <ul className="space-y-3 ">
        {chapters.map((chapter) => (
          <li key={chapter.id}>
            <Link
              href={chapter.path}
              className="text-5xl md:text-6xl lg:text-7xl font-bold hover:text-lime-200"
            >
              <h1>{chapter.title}</h1>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
