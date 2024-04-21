import { ChangeEvent, useContext, useState } from "react";
import { TKeySound, TypewriterContext } from "../contexts/typewriter-context";

const KeySoundPath: Record<TKeySound, string> = {
  "hard": "/sounds/key-hard.wav",
  "subtle": "/sounds/key-subtle.wav"
}

export default function Typearea() {
  const { keySound, content, setContent } = useContext(TypewriterContext);
  const playTypeSound = () => {
    const soundPath: string = KeySoundPath[keySound];
    const audio = new Audio(soundPath);
    audio.play();
    audio.volume = 0.3;
  };

  const autoResize = (event: ChangeEvent<HTMLTextAreaElement>) => {
    playTypeSound();
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    setContent(textarea.value);
  };

  return <div className="typeArea-textarea-wrapper">
    <textarea
      className="outline-none focus:outline-none text-lg font-medium bg-transparent w-full h-full resize-none"
      placeholder="Start typing your thoughts..."
      autoFocus
      onChange={autoResize}
      value={content}
    />
  </div>
}