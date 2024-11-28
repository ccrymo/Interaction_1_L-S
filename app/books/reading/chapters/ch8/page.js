import WordPage from '../../../../components/Words/WordPage'
import { chapter_08 } from "@/app/data/reading/chapter_08";


export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <WordPage chapter={chapter_08}/>
    </div>
  );
} 