import WordPage from '../../../../components/Words/WordPage'
import { chapter_01 } from "@/app/data/reading/chapter_01";


export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <WordPage chapter={chapter_01}/>
    </div>
  );
} 