import WordPage from '../../../../components/Words/WordPage'
import { chapter_02 } from "@/app/data/l&s/chapter_02";


export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <WordPage chapter={chapter_02}/>
    </div>
  );
} 