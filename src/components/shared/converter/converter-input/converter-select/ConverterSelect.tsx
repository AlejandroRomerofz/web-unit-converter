import { useEffect, useState } from "react";
import "./converterSelect.css";
import { Unit } from "../../../../../models/Unit";
import useConverter from "../../../../../hooks/useConverter";
import useLang from "../../../../../hooks/useLang";

export type ConverterSelectProps = {
  onChange: (selectedId: number) => void;
  actualSelected: Unit;
  setActualSelected: (unit: Unit) => void;
};

export default function ConverterSelect({
  actualSelected,
  setActualSelected,
  onChange,
}: ConverterSelectProps) {
  const [openSelector, setOpenSelector] = useState(false);
  const { allUnits, getUnitById } = useConverter();
  const { l } = useLang();

  const toggleSelectorOpen = () => {
    openSelector ? setOpenSelector(false) : setOpenSelector(true);
  };

  return (
    <div
      onClick={() => {
        toggleSelectorOpen();
      }}
      className="converter-select bg-secondary hover"
    >
      <p className="cs-selected">{l(actualSelected.name)}</p>
      <div className={`cs-selector bg-primary ${openSelector ? "open" : ""}`}>
        <div className="css-units">
          {allUnits
            ? allUnits.map((unit) => (
                <div
                  onClick={() => {
                    if (actualSelected.id != unit.id) {
                      setActualSelected(unit);
                      onChange(unit.id);
                    }
                  }}
                  key={unit.id}
                  data-conversion_factor={unit.conversion_factor}
                  className={`css-option ${
                    actualSelected.id == unit.id ? "selected" : ""
                  }`}
                >
                  <p className="css-title">{l(unit.name)}</p>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
