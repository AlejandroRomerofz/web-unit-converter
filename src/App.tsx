import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/home/Home";
import NotFound from "./components/pages/not-found/NotFound";
import Header from "./components/shared/header/Header";
import { useEffect, useState } from "react";
import { MagnitudeContext } from "./contexts/MagnitudeContext";
import { LangContext } from "./contexts/LangContext";
import Footer from "./components/shared/footer/Footer";
import { ThemeContext } from "./contexts/ThemeContext";

export default function App() {
  const [actualMagnitudeId, setActualMagnitudeId] = useState(0);
  const [lang, setLang] = useState("es");
  const [theme, setTheme] = useState(false);
  const [langStrings, setLangStrings] = useState<{ [id: string]: string }>({});

  const langInitializer = () => {
    fetch("/resources/languages/" + lang + ".json")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setLangStrings(res);
      });
    return null;
  };

  useEffect(() => {
    langInitializer();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <LangContext.Provider
        value={{ lang, setLang, langStrings, setLangStrings }}
      >
        <MagnitudeContext.Provider
          value={{
            actualMagnitudeId: actualMagnitudeId,
            setActualMagnitudeId: setActualMagnitudeId,
          }}
        >
          <div className={`${theme ? "dark" : ""}`}>
            {Object.keys(langStrings).length != 0 ? (
              <BrowserRouter>
                <Header></Header>
                <Routes>
                  <Route path="/" Component={Home}></Route>
                  <Route path="*" Component={NotFound}></Route>
                </Routes>
                <Footer></Footer>
              </BrowserRouter>
            ) : null}
          </div>
        </MagnitudeContext.Provider>
      </LangContext.Provider>
    </ThemeContext.Provider>
  );
}
