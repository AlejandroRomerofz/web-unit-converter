import { useEffect, useState } from "react";
import "./select.css";
import useLang from "../../../hooks/useLang";

export type SelectProps = {
  onChange: (selected: any) => void;
  actualSelected: any;
  items: any[];
};

export default function Select({
  actualSelected,
  items,
  onChange,
}: SelectProps) {
  const [openSelector, setOpenSelector] = useState(false);

  const { l } = useLang();

  const toggleSelectorOpen = () => {
    openSelector ? setOpenSelector(false) : setOpenSelector(true);
  };

  return (
    <div
      onClick={() => {
        toggleSelectorOpen();
      }}
      className="select bg-secondary hover"
    >
      <p className="s-selected">{l(actualSelected.name)}</p>
      <div className={`s-selector bg-primary ${openSelector ? "open" : ""}`}>
        <div className="ss-items">
          {items
            ? items.map((item) => (
                <div
                  onClick={() => {
                    onChange(item);
                  }}
                  key={item.id}
                  className={`ss-option ${
                    actualSelected.id == item.id ? "selected" : ""
                  }`}
                >
                  <p className="ss-title">{l(item.name)}</p>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
