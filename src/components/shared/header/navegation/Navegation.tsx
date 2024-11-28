import { useEffect, useState } from "react";
import useMagnitude from "../../../../hooks/useMagnitude";
import "./navegation.css";
import { Magnitude } from "../../../../models/Magnitude";
import useLang from "../../../../hooks/useLang";

export default function Navegation() {
  const { l } = useLang();

  const [allMagnitudes, setAllMagnitudes] = useState<Magnitude[]>([]);
  const { getAllMagnitudes, setActualMagnitudeId, actualMagnitudeId } =
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
            : allMagnitudes.map(({ id, name }) => {
                return (
                  <li
                    className={`${actualMagnitudeId == id ? "selected" : ""}`}
                    onClick={() => {
                      setActualMagnitudeId(id);
                    }}
                  >
                    <p>{l(name)}</p>
                  </li>
                );
              })}
        </ul>
      </div>
    </div>
  );
}
