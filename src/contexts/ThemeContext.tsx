import type React from "react";
import { createContext, useContext, type ReactNode } from "react";
import { useColorScheme } from "react-native";

interface ThemeColors {
  primary: string;
  background: string;
  secondary: string;
  accent: string;
  text: string;
  stroke: string;
  backgroundText: string;
  danger: string;
  warn: string;
  good: string;
}

interface ThemeContextType {
  colors: ThemeColors;
  isDark: boolean;
}

// Keep these colours with the Tailwind config in sync!
const lightColors: ThemeColors = {
  primary: "#E1E0F2",
  background: "#FBFBFE",
  secondary: "#EEEEF6",
  accent: "#3C73E9",
  text: "#050315",
  stroke: "#D1DEEB",
  backgroundText: "#606067",
  danger: "#9C2E2E",
  warn: "#9C7E2E",
  good: "#63B37E",
};

const darkColors: ThemeColors = {
  primary: "#212121",
  background: "#0B0B0B",
  secondary: "#121111",
  accent: "#3C73E9",
  text: "#DFDFDF",
  stroke: "#1C1C1C",
  backgroundText: "#C0BFD5",
  danger: "#9C2E2E",
  warn: "#9C7E2E",
  good: "#63B37E",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ colors, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
