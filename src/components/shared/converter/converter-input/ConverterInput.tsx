import useConverter from "../../../../hooks/useConverter";
import { Unit } from "../../../../models/Unit";
import Select from "../../selector/Select";
import ConverterSelect, {
  ConverterSelectProps,
} from "./converter-select/ConverterSelect";
import ConverterValueInput from "./converter-value-input/ConverterValueInput";
import "./converterInput.css";

export type ConverterInputProps = {
  selectOnChange: (selectedId: number) => void;
  valueOnChange: (value: number) => void;
  actualSelected: Unit;
  setActualSelect: (unit: Unit) => void;
  value: number;
};

export default function ConverterInput({
  selectOnChange,
  actualSelected,
  valueOnChange,
  setActualSelect,
  value,
}: ConverterInputProps) {
  const { allUnits } = useConverter();

  return (
    <div className="converter-input">
      <ConverterValueInput
        value={value}
        onChange={valueOnChange}
      ></ConverterValueInput>
      <Select
        actualSelected={actualSelected}
        items={allUnits}
        onChange={(item) => {
          setActualSelect(item);
        }}
      ></Select>
    </div>
  );
}
