import { useContext } from "react";
import { ConverterContext } from "../contexts/ConverterContext";
import { Magnitude } from "../models/Magnitude";
import { Unit } from "../models/Unit";

const dataUrl = "/resources/data/";

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

  // Get conversion result from a value
  // Reverse is used to convert from the to input to the from input
  const getConversion: (value: number, reverse: boolean) => number = (
    value,
    reverse
  ) => {
    if (!currentFromUnit || !currentToUnit) return 0;
    let neutralValue = 0;
    let conversedValue = 0;
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
