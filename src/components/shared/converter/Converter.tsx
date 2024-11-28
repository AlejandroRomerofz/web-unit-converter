import "./converter.css";
import ConverterInput from "./converter-input/ConverterInput";
import { useEffect, useState } from "react";
import useMagnitude from "../../../hooks/useMagnitude";
import useConverter from "../../../hooks/useConverter";

export default function Converter() {
  const { getAllUnits, actualMagnitudeId } = useMagnitude();
  const {
    getConversion,
    allUnits,
    currentFromUnit,
    currentToUnit,
    setAllUnits,
    setCurrentFromUnit,
    setCurrentToUnit,
  } = useConverter();

  const updateAllUnits = () => {
    getAllUnits().then((units) => {
      setAllUnits(units);
      setCurrentFromUnit(units[0]);
      setCurrentToUnit(units[1]);
    });
  };

  useEffect(() => {
    updateAllUnits();
    setFromValue(0);
    setToValue(0);
  }, [actualMagnitudeId]);

  useEffect(() => {
    setFromValue(getConversion(toValue, true));
  }, [currentFromUnit]);

  useEffect(() => {
    setToValue(getConversion(fromValue, false));
  }, [currentToUnit]);

  useEffect(() => {
    updateAllUnits();
    setFromValue(0);
    setToValue(0);
  }, [actualMagnitudeId]);

  useEffect(() => {
    updateAllUnits();
  }, []);

  const handleFromInputValueChange = (value: number) => {
    if (isNaN(value)) {
      setToValue(0);
      setFromValue(0);
      return;
    }

    setFromValue(value);
    setToValue(getConversion(value, false));
  };

  const handleToInputValueChange = (value: number) => {
    if (isNaN(value)) {
      setToValue(0);
      setFromValue(0);
      return;
    }

    setToValue(value);
    setFromValue(getConversion(value, true));
  };

  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);

  return allUnits.length > 0 && currentFromUnit && currentToUnit ? (
    <div className="converter">
      <div className="con-from">
        <ConverterInput
          value={fromValue}
          selectOnChange={() => {}}
          valueOnChange={handleFromInputValueChange}
          actualSelected={currentFromUnit}
          setActualSelect={setCurrentFromUnit}
        ></ConverterInput>
      </div>
      <p className="con-equal">=</p>
      <div className="con-to">
        <ConverterInput
          value={toValue}
          selectOnChange={() => {}}
          valueOnChange={handleToInputValueChange}
          actualSelected={currentToUnit}
          setActualSelect={setCurrentToUnit}
        ></ConverterInput>
      </div>
    </div>
  ) : (
    <p>cargando...</p>
  );
}
