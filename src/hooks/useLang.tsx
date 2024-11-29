import { useContext, useEffect } from "react";
import { LangContext } from "../contexts/LangContext";
import { Lang } from "../models/Lang";

export default function useLang() {
  const { lang, setLang, langStrings, setLangStrings } =
    useContext(LangContext);

  const l = (lang_string: string) => {
    return langStrings[lang_string];
  };

  const changeLang = (lang: string) => {
    fetch("/resources/languages/" + lang + ".json")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setLangStrings(res);
        setLang(lang);

        // Set default language to preserve state
        localStorage.setItem("lang", lang);
      });
  };

  const getAllLangs = async () => {
    const langs = await fetch("/resources/languages/lang-list.json").then(
      (res) => {
        return res.json();
      }
    );
    return langs.langs as Lang[];
  };

  return { l, lang, changeLang, getAllLangs };
}
