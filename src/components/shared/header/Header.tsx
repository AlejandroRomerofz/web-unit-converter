import useLang from "../../../hooks/useLang";
import "./header.css";
import Navegation from "./navegation/Navegation";

export default function Header() {
  const { l } = useLang();
  return (
    <div className="main-header">
      <div className="bg-primary mh-top">
        <div className="container mh-top-container">
          <h1 className="mh-title">{l("TITLE")}</h1>
        </div>
      </div>
      <Navegation></Navegation>
    </div>
  );
}
