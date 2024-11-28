import WordPage from '../../../../components/Words/WordPage'
import { chapter_07 } from "@/app/data/reading/chapter_07";


export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <WordPage chapter={chapter_07}/>
    </div>
  );
} 