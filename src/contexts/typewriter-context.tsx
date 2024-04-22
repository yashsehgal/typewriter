import { createContext } from "react";

const WELCOME_CONTENT: string = `-----------------------------------------------
A fun typewriter project
Used React, Typescript & Tailwind - v0.1
-----------------------------------------------

I built this as a fun project. I will be adding
more subtle features and improvements.

Turn on your volume while typing :)

Cheers
Yash`

export type TKeySound = "subtle" | "hard";
export interface ITypewriterContext {
  keySound: TKeySound;
  setKeySound: (keySound: TKeySound) => void;
  content: string;
  setContent: (content: string) => void;
  isTypearea: boolean;
  setIsTypearea: (state: boolean) => void;
}

export const INITIAL_TYPEWRITER_STATE: ITypewriterContext = {
  keySound: "subtle",
  setKeySound: () => { },
  content: WELCOME_CONTENT,
  setContent: () => { },
  isTypearea: true,
  setIsTypearea: () => { }
}

export const TypewriterContext = createContext<ITypewriterContext>({
  ...INITIAL_TYPEWRITER_STATE
});