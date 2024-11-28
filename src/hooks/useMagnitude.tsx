import { useContext } from "react";
import { ConverterContext } from "../contexts/ConverterContext";
import { Magnitude } from "../models/Magnitude";
import { Unit } from "../models/Unit";
import { MagnitudeContext } from "../contexts/MagnitudeContext";

const dataUrl = "/resources/data/";

export default function useMagnitude() {
  const { actualMagnitudeId, setActualMagnitudeId } =
    useContext(MagnitudeContext);

  const getAllMagnitudes = async () => {
    const allUnits = await fetch(dataUrl + "magnitude-list.json").then((data) =>
      data.json()
    );
    return allUnits.magnitudes as Magnitude[];
  };

  const getMagnitudeDataById = async (magnitudeId: number) => {
    const allMagnitudes = await getAllMagnitudes();

    return allMagnitudes.filter((mag) => mag.id == magnitudeId)[0];
  };

  const getActualMagnitudeData = async () => {
    return await getMagnitudeDataById(actualMagnitudeId);
  };

  const getAllUnits = async () => {
    const actualMagnitudeData = await getActualMagnitudeData();
    const allUnits = await fetch(dataUrl + actualMagnitudeData.url).then(
      (data) => data.json()
    );

    return allUnits.units as Unit[];
  };

  return {
    actualMagnitudeId,
    getAllMagnitudes,
    getAllUnits,
    setActualMagnitudeId,
  };
}
