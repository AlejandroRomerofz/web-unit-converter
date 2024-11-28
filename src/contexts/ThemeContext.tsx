import { createContext } from "react";

export type ThemeContextValue = {
  theme: boolean;
  setTheme: (theme: boolean) => void;
};

export const ThemeContext = createContext<ThemeContextValue>({
  theme: false,
  setTheme: () => {},
});
