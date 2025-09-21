import type React from "react"
import { TouchableOpacity, Image } from "react-native"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated"
import AppText from "./AppText"
import { useTheme } from "~/contexts/ThemeContext"

interface FloatingActionButtonProps {
  onPress: () => void
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onPress }) => {
  const { colors } = useTheme()
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const handlePressIn = () => {
    scale.value = withSpring(0.95)
  }

  const handlePressOut = () => {
    scale.value = withSpring(1)
  }

  return (
    <Animated.View
      className="absolute bottom-24 right-5 w-12 h-12 rounded-full items-center justify-center shadow-lg"
      style={[{ backgroundColor: colors.primary }, animatedStyle]}
    >
      <TouchableOpacity
        className="w-full h-full items-center justify-center"
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <Image
          source={require("~/assets/Icons/plus.png")}
          style={{ width: 12, height: 12 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </Animated.View>
  )
}
