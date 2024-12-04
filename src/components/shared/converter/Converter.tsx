import "./converter.css";
import ConverterInput from "./converter-input/ConverterInput";
import { useEffect, useState } from "react";
import useMagnitude from "../../../hooks/useMagnitude";
import useConverter from "../../../hooks/useConverter";

export default function Converter() {
  const { getAllUnits, actualMagnitude } = useMagnitude();
  const {
    getConversion,
    allUnits,
    currentFromUnit,
    currentToUnit,
    setAllUnits,
    setCurrentFromUnit,
    setCurrentToUnit,
  } = useConverter();

  const [fromValue, setFromValue] = useState("0");
  const [toValue, setToValue] = useState("0");

  // Get all units of the magnitude selected currently and save them on the state
  const updateAllUnits = () => {
    getAllUnits().then((units) => {
      setAllUnits(units!);
      setCurrentFromUnit(units![0]);
      setCurrentToUnit(units![1]);
    });
  };

  // Update value when from unit is changed
  useEffect(() => {
    setFromValue(getConversion(parseFloat(toValue), true).toString());
  }, [currentFromUnit]);

  // Update value when to unit is changed
  useEffect(() => {
    setToValue(getConversion(parseFloat(fromValue), false).toString());
  }, [currentToUnit]);

  // Reset all values on magnitude change
  useEffect(() => {
    updateAllUnits();
    setFromValue("0");
    setToValue("0");
  }, [actualMagnitude]);

  useEffect(() => {
    updateAllUnits();
  }, []);

  const handleFromInputValueChange = (value: string) => {
    console.log(value);
    const numberValue = parseFloat(value);
    console.log(numberValue);

    // Avoid void input
    if (isNaN(numberValue)) {
      setToValue("0");
      setFromValue("0");
      return;
    }

    setFromValue(numberValue.toString());
    setToValue(getConversion(numberValue, false).toString());
  };

  const handleToInputValueChange = (value: string) => {
    const numberValue = parseFloat(value);

    // Avoid void input
    if (isNaN(numberValue)) {
      setToValue("0");
      setFromValue("");
      return;
    }

    setToValue(numberValue.toString());
    setFromValue(getConversion(numberValue, true).toString());
  };

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
  ) : null;
}
