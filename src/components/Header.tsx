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
  name: string
}

export const Header: React.FC<HeaderProps> = ({ name }) => {
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
      className="w-full bg-black py-3 px-4 border-b border-gray-800 flex-row items-center justify-center space-x-2 rounded-lg"
      style={headerAnimatedStyle}
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
        {name} - Dashboard
      </AppText>
    </AnimatedView>
  )
}
