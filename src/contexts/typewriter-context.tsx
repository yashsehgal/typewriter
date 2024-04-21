import { createContext } from "react";

export type TKeySound = "subtle" | "hard";
export interface ITypewriterContext {
  keySound: TKeySound;
  setKeySound: (keySound: TKeySound) => void;
  content: string;
  setContent: (content: string) => void;
}

export const INITIAL_TYPEWRITER_STATE: ITypewriterContext = {
  keySound: "subtle",
  setKeySound: () => { },
  content: '',
  setContent: () => { }
}

export const TypewriterContext = createContext<ITypewriterContext>({
  ...INITIAL_TYPEWRITER_STATE
});