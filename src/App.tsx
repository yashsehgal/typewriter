import { KeySoundSelect } from "./components/key-sound-select";
import Typearea from "./components/typearea";

export default function App() {
  return <main className="typewriter-app-container p-12 max-md:pt-28">
    <KeySoundSelect />
    <div className="typeArea-container">
      <Typearea />
    </div>
  </main>
}