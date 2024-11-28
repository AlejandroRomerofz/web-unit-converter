import { useState } from "react";
import { ConverterContext } from "../../../contexts/ConverterContext";
import useLang from "../../../hooks/useLang";
import Converter from "../../shared/converter/Converter";
import "./home.css";
import { Unit } from "../../../models/Unit";

export default function Home() {
  const { l } = useLang();

  const [currentFromUnit, setCurrentFromUnit] = useState<Unit>();
  const [currentToUnit, setCurrentToUnit] = useState<Unit>();

  const [allUnits, setAllUnits] = useState<Unit[]>([]);

  return (
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
  );
}
