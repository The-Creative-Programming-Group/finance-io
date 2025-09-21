import type React from "react"
import { TouchableOpacity } from "react-native"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated"
import { useTheme } from "~/contexts/ThemeContext"

interface ToggleProps {
  value: boolean
  onValueChange: (value: boolean) => void
}

export const Toggle: React.FC<ToggleProps> = ({ value, onValueChange }) => {
  const { colors } = useTheme()

  const translateX = useSharedValue(value ? 16 : 0)

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: value ? colors.good : colors.textSecondary,
  }))

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    backgroundColor: colors.text,
  }))

  const handlePress = () => {
    const newValue = !value
    translateX.value = withSpring(newValue ? 16 : 0, {
      damping: 15,
      stiffness: 150,
    })
    onValueChange(newValue)
  }

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <Animated.View
        className="h-6 w-10 rounded-full p-1 flex-row items-center"
        style={trackStyle}
      >
        <Animated.View
          className="h-4 w-4 rounded-full bg-white"
          style={thumbStyle}
        />
      </Animated.View>
    </TouchableOpacity>
  )
}
