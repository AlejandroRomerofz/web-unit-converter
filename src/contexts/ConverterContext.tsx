import { createContext } from "react";
import { Unit } from "../models/Unit";

export type ConverterContextValue = {
  currentFromUnit?: Unit;
  setCurrentFromUnit: (unit: Unit) => void;
  currentToUnit?: Unit;
  setCurrentToUnit: (unitId: Unit) => void;
  allUnits: Unit[];
  setAllUnits: (unitId: Unit[]) => void;
};

export const ConverterContext = createContext<ConverterContextValue>({
  currentFromUnit: undefined,
  setCurrentFromUnit: (unit: Unit) => {},
  currentToUnit: undefined,
  setCurrentToUnit: (unitId: Unit) => {},
  allUnits: [],
  setAllUnits: () => {},
});
