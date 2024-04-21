import { ReactNode, useState } from "react";
import { INITIAL_TYPEWRITER_STATE, TKeySound, TypewriterContext } from "../contexts/typewriter-context";

export default function TypewriterContextProvider({ children }: { children: ReactNode }) {
  const [keySound, setKeySound] = useState<TKeySound>(INITIAL_TYPEWRITER_STATE.keySound);
  const [content, setContent] = useState<string>(INITIAL_TYPEWRITER_STATE.content);
  const [isTypearea, setIsTypearea] = useState<boolean>(INITIAL_TYPEWRITER_STATE.isTypearea);
  return <TypewriterContext.Provider value={{ keySound, setKeySound, content, setContent, isTypearea, setIsTypearea }}>
    {children}
  </TypewriterContext.Provider>
}