import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/home/Home";
import NotFound from "./components/pages/not-found/NotFound";
import Header from "./components/shared/header/Header";
import { useEffect, useState } from "react";
import { MagnitudeContext } from "./contexts/MagnitudeContext";
import { LangContext } from "./contexts/LangContext";
import Footer from "./components/shared/footer/Footer";
import { ThemeContext } from "./contexts/ThemeContext";
import { Magnitude } from "./models/Magnitude";

// Get default language either from local storage or browser
const getDefaultLang = () => {
  const langFromStorage = localStorage.getItem("lang");
  if (langFromStorage && langFromStorage.length == 2) {
    return langFromStorage;
  }
  if (navigator.language) {
    const browserLang = navigator.language.split("-")[0];
    return browserLang;
  }
  return "en";
};

export default function App() {
  const [actualMagnitude, setActualMagnitude] = useState<Magnitude>();
  const [lang, setLang] = useState(getDefaultLang());
  const [theme, setTheme] = useState(false);
  const [langStrings, setLangStrings] = useState<{ [id: string]: string }>({});

  // Get lang strings first time
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
            actualMagnitude,
            setActualMagnitude,
          }}
        >
          <div className={`${theme ? "dark" : ""}`}>
            {
              // Check if langstring are already loaded to show the content
              Object.keys(langStrings).length != 0 ? (
                <BrowserRouter>
                  <Header></Header>
                  <Routes>
                    <Route path="/" Component={Home}></Route>
                    <Route path="/:magnitude" Component={Home}></Route>
                    <Route path="*" Component={NotFound}></Route>
                  </Routes>
                  <Footer></Footer>
                </BrowserRouter>
              ) : null
            }
          </div>
        </MagnitudeContext.Provider>
      </LangContext.Provider>
    </ThemeContext.Provider>
  );
}
