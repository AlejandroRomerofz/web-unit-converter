import "./converterValueInput.css";

export type ConverterValueInputProps = {
  onChange: (value: number) => void;
  value: number;
};

export default function ConverterValueInput({
  onChange,
  value,
}: ConverterValueInputProps) {
  return (
    <div className="converter-value-input">
      <input
        value={value}
        className="bg-primary"
        onChange={(e) => {
          onChange(parseFloat(e.target.value));
        }}
        type="number"
      />
    </div>
  );
}
