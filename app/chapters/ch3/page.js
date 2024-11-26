import WordPage from '../../components/Words/WordPage'
import { chapter_03 } from "@/app/data/chapter_03";


export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <WordPage chapter={chapter_03}/>
    </div>
  );
} 