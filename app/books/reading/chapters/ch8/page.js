import WordPage from '../../../../components/Words/WordPage'
import { chapter_04 } from "@/app/data/reading/chapter_08";


export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <WordPage chapter={chapter_04}/>
    </div>
  );
} 