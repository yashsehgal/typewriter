import { useContext } from "react"
import { INITIAL_TYPEWRITER_STATE, TypewriterContext } from "../contexts/typewriter-context"

export function KeySoundSelect() {
  const { keySound, setKeySound } = useContext(TypewriterContext);
  return <div className="key-sound-select-container fixed top-4 right-4 p-2 bg-gray-300 gap-2 flex flex-row items-center justify-end rounded-lg">
    <KeySoundOption selected={keySound === "subtle"} onClick={(e) => {
      e.preventDefault();
      setKeySound("subtle");
      const subtleAudio = new Audio('/sounds/key-subtle.wav');
      subtleAudio.volume = 0.4;
      subtleAudio.play();

    }}>Subtle</KeySoundOption>
    <KeySoundOption selected={keySound === "hard"} onClick={(e) => {
      e.preventDefault();
      setKeySound("hard");
      const hardAudio = new Audio('/sounds/key-hard.wav');
      hardAudio.volume = 0.4;
      hardAudio.play();
    }}>Hard</KeySoundOption>
    <TypewriterReset />
  </div>
}

function KeySoundOption({ className, selected = false, ...args }: React.ButtonHTMLAttributes<HTMLButtonElement> & { selected: boolean }) {
  return <button className={`text-xs px-4 py-2 rounded-md shadow-sm hover:scale-95 active:scale-90 transition-all ${selected ? "bg-blue-500 text-white" : "bg-white text-gray-800"} ${className || ""}`} {...args} />
}

function TypewriterReset() {
  const { content, setContent } = useContext(TypewriterContext);
  return <button className="text-xs px-4 py-2 rounded-md shadow-sm text-white bg-gray-800 hover:scale-95 transition-all active:scale-90 disabled:hover:scale-100 disabled:active:scale-100 disabled:cursor-not-allowed disabled:opacity-30"
    onClick={(e) => {
      e.preventDefault();
      const resetAudio = new Audio('/sounds/typewriter-reset-bell.wav');
      resetAudio.volume = 0.4;
      resetAudio.play();
      setContent(INITIAL_TYPEWRITER_STATE.content);
    }}
    disabled={!content}
  >{"Clear"}</button>
}