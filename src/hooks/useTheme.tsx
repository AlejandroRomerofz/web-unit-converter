import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function useTheme() {
  const { setTheme, theme } = useContext(ThemeContext);
  return { setTheme, theme };
}
