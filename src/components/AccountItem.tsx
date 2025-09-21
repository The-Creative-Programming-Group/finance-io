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

export const AccountItem: React.FC<AccountItemProps> = ({
  icon,
  name,
  amount,
  delay = 0,
  onPress,
}) => {
  const { colors } = useTheme()

  const Component = onPress ? TouchableOpacity : View

  const IconWrapper = ({
    children,
    H_size = 40,
    W_size = 60,
  }: {
    children: React.ReactNode
    H_size?: number
    W_size?: number
  }) => (
    <View
      className="rounded-2xl items-center justify-center"
      style={{
        width: W_size,
        height: H_size,
        backgroundColor: colors.border,
      }}
    >
      {children}
    </View>
  )

  return (
    <Animated.View
      entering={FadeInDown.delay(delay).springify()}
      className="mb-2"
    >
      <Component
        onPress={onPress}
        activeOpacity={onPress ? 0.7 : 1}
        className="flex-row items-center py-4 px-5 rounded-xl border"
        style={{
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
        }}
      >
        <View className="w-10 h-10 mr-4">{icon}</View>
        <AppText
          medium
          className="flex-1 text-base"
          style={{ color: colors.text }}
        >
          {name}
        </AppText>
        <IconWrapper H_size={40} W_size={60}>
          <AppText semibold className="text-base" style={{ color: colors.text }}>
            {amount}
          </AppText>
        </IconWrapper>
      </Component>
    </Animated.View>
  )
}
