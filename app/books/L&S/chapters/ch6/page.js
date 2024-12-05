import WordPage from '../../../../components/Words/WordPage'
import { chapter_06 } from "@/app/data/l&s/chapter_06";

function formatChapterName(objectName) {
  if (objectName.startsWith('chapter_')) {
    const chapterNumber = parseInt(objectName.split('_')[1], 10);
    return `Chapter ${chapterNumber}`;
  }
  return objectName;
}

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <WordPage chapter={chapter_06} chapterName={formatChapterName('chapter_06')}/>
    </div>
  );
}