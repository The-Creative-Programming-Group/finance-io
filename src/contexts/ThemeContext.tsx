import type React from "react"
import { createContext, useContext, type ReactNode } from "react"
import { useColorScheme } from "react-native"

interface ThemeColors {
  background: string
  cardBackground: string
  text: string
  textSecondary: string
  accent: string
  border: string
  success: string
  primary: string
}

interface ThemeContextType {
  colors: ThemeColors
  isDark: boolean
}

const lightColors: ThemeColors = {
  background: "#f5f5f5",
  cardBackground: "#ffffff",
  text: "#000000",
  textSecondary: "#666666",
  accent: "#00ff88",
  border: "#e0e0e0",
  success: "#00ff88",
  primary: "#007AFF",
}

const darkColors: ThemeColors = {
  background: "#000000",
  cardBackground: "#1a1a1a",
  text: "#ffffff",
  textSecondary: "#a0a0a0",
  accent: "#00ff88",
  border: "#333333",
  success: "#00ff88",
  primary: "#0A84FF",
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === "dark"
  const colors = isDark ? darkColors : lightColors

  return <ThemeContext.Provider value={{ colors, isDark }}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
