import WordPage from '../../../../components/Words/WordPage'
import { chapter_06 } from "@/app/data/l&s/chapter_06";


export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <WordPage chapter={chapter_06}/>
    </div>
  );
} 