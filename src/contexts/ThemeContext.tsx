import type React from "react";
import { createContext, useContext, type ReactNode } from "react";
import { useColorScheme } from "react-native";

interface ThemeColors {
  background: string;
  text: string;
  accent: string;
  border?: string;
  stroke?: string;
  good?: string;
  primary: string;

  cardBackground?: string;
  textSecondary?: string;
  success?: string;
  error?: string;

  secondary?: string;
  backgroundText?: string;
  danger?: string;
  warn?: string;
}

interface ThemeContextType {
  colors: ThemeColors;
  isDark: boolean;
}

const lightColors: ThemeColors = {
  background: "#FBFBFE",
  cardBackground: "#ffffff",
  text: "#050315",
  textSecondary: "#666666",
  accent: "#3C73E9",
  border: "#e0e0e0",
  success: "#00ff88",
  primary: "#E1E0F2",
  stroke: "#D1DEEB",
  good: "#63B37E",
  error: "#ea2b19",
  secondary: "#EEEEF6",
  backgroundText: "#606067",
  danger: "#9C2E2E",
  warn: "#9C7E2E",
};

const darkColors: ThemeColors = {
  background: "#0B0B0B",
  cardBackground: "#1a1a1a",
  text: "#DFDFDF",
  textSecondary: "#a0a0a0",
  accent: "#3C73E9",
  border: "#2a2a2a",
  success: "#4CAF50",
  primary: "#212121",
  stroke: "#1C1C1C",
  good: "#63B37E",
  error: "#ea2b19",
  secondary: "#121111",
  backgroundText: "#C0BFD5",
  danger: "#9C2E2E",
  warn: "#9C7E2E",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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
