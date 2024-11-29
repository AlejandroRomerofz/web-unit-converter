import { useContext } from "react";
import { Magnitude } from "../models/Magnitude";
import { Unit } from "../models/Unit";
import { MagnitudeContext } from "../contexts/MagnitudeContext";

const dataUrl = "./resources/data/";

export default function useMagnitude() {
  const { actualMagnitude, setActualMagnitude } = useContext(MagnitudeContext);

  const getAllMagnitudes = async () => {
    const allUnits = await fetch(dataUrl + "magnitude-list.json").then((data) =>
      data.json()
    );
    return allUnits.magnitudes as Magnitude[];
  };

  // Get all units registered for the magnitude selected currently
  const getAllUnits = async () => {
    if (!actualMagnitude) return;

    const allUnits = await fetch(dataUrl + actualMagnitude.url).then((data) =>
      data.json()
    );

    return allUnits.units as Unit[];
  };

  return {
    actualMagnitude,
    getAllMagnitudes,
    getAllUnits,
    setActualMagnitude,
  };
}
