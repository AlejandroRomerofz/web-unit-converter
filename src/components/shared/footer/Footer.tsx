import { useEffect, useState } from "react";
import useLang from "../../../hooks/useLang";
import Select from "../selector/Select";
import "./footer.css";
import { FaMoon } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";
import { Lang } from "../../../models/Lang";
import useTheme from "../../../hooks/useTheme";

export default function Footer() {
  const { changeLang, l, getAllLangs, lang } = useLang();
  const { setTheme, theme } = useTheme();

  const [allLangs, setAllLangs] = useState<Lang[]>([]);

  useEffect(() => {
    getAllLangs().then((allLangs) => {
      setAllLangs(allLangs);
      console.log(allLangs);
    });
  }, []);

  const getSelected = () => {
    return allLangs.filter(({ iso }) => lang === iso)[0];
  };

  return (
    <div className="main-footer bg-primary">
      <div className="container mf-container">
        {allLangs.length > 0 ? (
          <Select
            actualSelected={getSelected()}
            items={allLangs}
            onChange={(lang) => {
              changeLang(lang.iso);
            }}
          ></Select>
        ) : null}
        <div className="mf-theme-switch">
          {theme ? (
            <IoSunnyOutline
              onClick={() => {
                setTheme(false);
              }}
              className="mf-theme-button light-mode"
            ></IoSunnyOutline>
          ) : (
            <FaMoon
              onClick={() => {
                setTheme(true);
              }}
              className="mf-theme-button dark-mode"
            ></FaMoon>
          )}
        </div>
      </div>
    </div>
  );
}
