import WordPage from '../../../../components/Words/WordPage'
import { chapter_07 } from "@/app/data/l&s/chapter_07";

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
      <WordPage chapter={chapter_07} chapterName={formatChapterName('chapter_07')}/>
    </div>
  );
}