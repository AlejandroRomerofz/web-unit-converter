import { useEffect, useState } from "react";
import { ConverterContext } from "../../../contexts/ConverterContext";
import useLang from "../../../hooks/useLang";
import Converter from "../../shared/converter/Converter";
import "./home.css";
import { Unit } from "../../../models/Unit";
import { useLocation } from "react-router-dom";
import useMagnitude from "../../../hooks/useMagnitude";

export default function Home() {
  const { l } = useLang();
  const { pathname } = useLocation();
  const { actualMagnitude, setActualMagnitude, getAllMagnitudes } =
    useMagnitude();

  const [currentFromUnit, setCurrentFromUnit] = useState<Unit>();
  const [currentToUnit, setCurrentToUnit] = useState<Unit>();

  const [allUnits, setAllUnits] = useState<Unit[]>([]);

  useEffect(() => {
    const pathnameWithoutBar = pathname.replace("/", "");
    getAllMagnitudes().then((magnitudes) => {
      for (var i = 0; i < magnitudes.length; i++) {
        const mag = magnitudes[i];
        const magRouteName = mag.name.split("_")[1].toLowerCase();

        if (pathnameWithoutBar === magRouteName) {
          setActualMagnitude(mag);
          return;
        }
      }
      setActualMagnitude(magnitudes[0]);
    });
  }, []);

  return actualMagnitude ? (
    <div className="">
      <div className="container">
        <div className="home-converter">
          <ConverterContext.Provider
            value={{
              currentFromUnit,
              currentToUnit,
              setCurrentFromUnit,
              setCurrentToUnit,
              allUnits,
              setAllUnits,
            }}
          >
            <Converter></Converter>
          </ConverterContext.Provider>
        </div>
      </div>
    </div>
  ) : null;
}
