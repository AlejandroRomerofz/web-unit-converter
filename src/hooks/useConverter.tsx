import { useContext } from "react";
import { ConverterContext } from "../contexts/ConverterContext";
import { Magnitude } from "../models/Magnitude";
import { Unit } from "../models/Unit";

const host = "http://localhost:3000";
const dataUrl = host + "/resources/data/";

export default function useConverter() {
  const {
    currentFromUnit,
    currentToUnit,
    allUnits,
    setAllUnits,
    setCurrentFromUnit,
    setCurrentToUnit,
  } = useContext(ConverterContext);

  const getUnitById = (unitId: number) => {
    return allUnits.filter(({ id }) => id == unitId)[0];
  };

  const getConversion: (value: number, reverse: boolean) => number = (
    value,
    reverse = false
  ) => {
    console.log(currentFromUnit);

    if (!currentFromUnit || !currentToUnit) return 0;
    let neutralValue = 0;
    let conversedValue = 0;
    console.log(currentToUnit);
    if (reverse) {
      neutralValue = value * currentToUnit.conversion_factor;
      conversedValue = neutralValue / currentFromUnit.conversion_factor;
    } else {
      neutralValue = value * currentFromUnit.conversion_factor;
      conversedValue = neutralValue / currentToUnit.conversion_factor;
    }

    return conversedValue;
  };

  return {
    currentFromUnit,
    currentToUnit,
    allUnits,
    getConversion,
    getUnitById,
    setAllUnits,
    setCurrentFromUnit,
    setCurrentToUnit,
  };
}
