import type React from "react"
import Animated, { FadeInDown } from "react-native-reanimated"
import { useTheme } from "../contexts/ThemeContext"
import AppText from "./AppText"

interface SectionHeaderProps {
  title: string
  delay?: number
  size?: "large" | "medium" | "small"
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, delay = 0, size = "large" }) => {
  const { colors } = useTheme()

  const fontSize = {
    large: 20,
    medium: 16,
    small: 14,
  }[size]

  const marginTop = {
    large: 24,
    medium: 16,
    small: 12,
  }[size]

  const fontWeight = size === "large" ? "bold" : size === "medium" ? "semibold" : "medium"

  return (
    <Animated.View entering={FadeInDown.delay(delay).springify()}>
      <AppText
        {...{ [fontWeight]: true }}
        style={{
          fontSize,
          color: colors.text,
          marginBottom: 16,
          marginTop,
          textAlign: "center",
        }}
      >
        {title}
      </AppText>
    </Animated.View>
  )
}
