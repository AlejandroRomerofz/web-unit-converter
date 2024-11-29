import { createContext } from "react";
import { Magnitude } from "../models/Magnitude";

export type MagnitudeContextValue = {
  actualMagnitude?: Magnitude;
  setActualMagnitude: (magnitudeId: Magnitude) => void;
};

export const MagnitudeContext = createContext<MagnitudeContextValue>({
  actualMagnitude: undefined,
  setActualMagnitude: () => {},
});
