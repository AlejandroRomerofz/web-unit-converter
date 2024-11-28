import { createContext } from "react";

export type LangContextValue = {
  lang: string;
  setLang: (lang: string) => void;
  langStrings: { [id: string]: string };
  setLangStrings: (langString: { [id: string]: string }) => void;
};

export const LangContext = createContext<LangContextValue>({
  lang: "",
  setLang: () => {},
  langStrings: {},
  setLangStrings: () => {},
});
