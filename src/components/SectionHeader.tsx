import type React from "react"
import Animated, { FadeInDown } from "react-native-reanimated"
import { useTheme } from "../contexts/ThemeContext"
import AppText from "./AppText"

interface SectionHeaderProps {
  title: string
  delay?: number
  size?: "large" | "medium" | "small"
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  delay = 0,
  size = "large",
}) => {
  const { colors } = useTheme()

  const sizeClassMap = {
    large: "text-xl mt-6 font-bold",
    medium: "text-base mt-4 font-semibold",
    small: "text-sm mt-3 font-medium",
  }

  return (
    <Animated.View entering={FadeInDown.delay(delay).springify()}>
      <AppText
        className={`text-center mb-4 ${sizeClassMap[size]}`}
        style={{ color: colors.text }}
      >
        {title}
      </AppText>
    </Animated.View>
  )
}
