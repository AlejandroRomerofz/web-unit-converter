import "./converterValueInput.css";

export type ConverterValueInputProps = {
  onChange: (value: string) => void;
  value: string;
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
          onChange(e.target.value);
        }}
        type="number"
      />
    </div>
  );
}
