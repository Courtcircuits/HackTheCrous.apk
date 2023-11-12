import React, { useState } from "react";
import { createContext } from "react";
import { Appearance, ColorSchemeName } from "react-native";
import { ColorScheme, GetColorScheme } from "../styles/style";

const defaultTheme = {
  theme: Appearance.getColorScheme(),
}


export const ThemeContext = createContext<{
  theme: ColorScheme;
  setTheme: (value: ColorScheme) => void;
}>({
  theme: GetColorScheme(defaultTheme.theme),
  setTheme: () => { },
});

export function ThemeProvider(props :{
  children: React.ReactNode,
  }) {
  const [theme, setTheme] = useState<ColorScheme>(GetColorScheme(defaultTheme.theme));

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
