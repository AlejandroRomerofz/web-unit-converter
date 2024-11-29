import { useEffect, useState } from "react";
import useMagnitude from "../../../../hooks/useMagnitude";
import "./navegation.css";
import { Magnitude } from "../../../../models/Magnitude";
import useLang from "../../../../hooks/useLang";

export default function Navegation() {
  const { l } = useLang();

  const [allMagnitudes, setAllMagnitudes] = useState<Magnitude[]>([]);
  const { getAllMagnitudes, setActualMagnitude, actualMagnitude } =
    useMagnitude();

  useEffect(() => {
    getAllMagnitudes().then((allMagnitudes) => {
      setAllMagnitudes(allMagnitudes);
    });
  }, []);

  return (
    <div className="navegation bg-secondary">
      <div className="nav-container">
        <ul>
          {allMagnitudes.length == 0
            ? null
            : allMagnitudes.map((magnitude) => {
                return (
                  <li
                    className={`${
                      actualMagnitude?.id == magnitude.id ? "selected" : ""
                    }`}
                    onClick={() => {
                      setActualMagnitude(magnitude);
                    }}
                  >
                    <p>{l(magnitude.name)}</p>
                  </li>
                );
              })}
        </ul>
      </div>
    </div>
  );
}
