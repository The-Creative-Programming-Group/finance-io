import React, { useEffect } from "react"
import { Image } from "react-native"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated"
import { useTheme } from "../contexts/ThemeContext"
import AppText from "./AppText"

const AnimatedView = Animated.createAnimatedComponent(Animated.View)

interface HeaderProps {
  title: string
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const { colors } = useTheme()
  const headerOpacity = useSharedValue(0)

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: withSpring(headerOpacity.value),
  }))

  useEffect(() => {
    headerOpacity.value = 1
  }, [])

  return (
    <AnimatedView
      className="absolute top-0 left-0 right-0 flex-row items-center justify-center space-x-4 py-6 px-6 border-b border-gray-800"
      style={[
        headerAnimatedStyle,
        { backgroundColor: colors.cardBackground },
      ]}
    >
      <Image
        source={require("../assets/images/avatar.png")}
        style={{ width: 22, height: 22, borderRadius: 9999 }}
      />
      <AppText
        semibold
        className="text-sm text-center"
        style={{ color: colors.text }}
      >
        {title}
      </AppText>
    </AnimatedView>
  )
}
