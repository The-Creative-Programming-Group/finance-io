import type React from "react"
import { View, TouchableOpacity } from "react-native"
import Animated, { FadeInDown } from "react-native-reanimated"
import { useTheme } from "../contexts/ThemeContext"
import AppText from "./AppText"

interface AccountItemProps {
  icon: React.ReactNode
  name: string
  amount: string
  delay?: number
  onPress?: () => void
}

export const AccountItem: React.FC<AccountItemProps> = ({ icon, name, amount, delay = 0, onPress }) => {
  const { colors } = useTheme()

  const Component = onPress ? TouchableOpacity : View

  return (
    <Animated.View
      entering={FadeInDown.delay(delay).springify()}
      style={{
        marginBottom: 8,
      }}
    >
      <Component
        onPress={onPress}
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 16,
          paddingHorizontal: 20,
          backgroundColor: colors.cardBackground,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: colors.border,
        }}
        activeOpacity={onPress ? 0.7 : 1}
      >
        <View style={{ width: 40, height: 40, marginRight: 16 }}>{icon}</View>
        <AppText
          medium
          style={{
            flex: 1,
            fontSize: 16,
            color: colors.text,
          }}
        >
          {name}
        </AppText>
        <AppText
          semibold
          style={{
            fontSize: 16,
            color: colors.accent,
          }}
        >
          {amount}
        </AppText>
      </Component>
    </Animated.View>
  )
}
