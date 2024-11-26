import "reveal.js/dist/reveal.css"; // Keep the core CSS for functionality
import Presentation from "./components/Presentation";

export default function Home() {
  return (
    <div className="reveal">
      <Presentation />
    </div>
  );
}
