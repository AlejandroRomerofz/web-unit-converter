import { createContext } from "react";

export type MagnitudeContextValue = {
  actualMagnitudeId: number;
  setActualMagnitudeId: (magnitudeId: number) => void;
};

export const MagnitudeContext = createContext<MagnitudeContextValue>({
  actualMagnitudeId: 0,
  setActualMagnitudeId: () => {},
});
