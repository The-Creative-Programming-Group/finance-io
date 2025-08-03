import type React from "react"
import { View, TouchableOpacity } from "react-native"
import Animated, { FadeInUp } from "react-native-reanimated"
import { useTheme } from "../contexts/ThemeContext"
import { ContactlessIcon, MastercardLogo } from "./Icons"
import AppText from "./AppText"
import clsx from "clsx"

interface CardComponentProps {
  title: string
  cardHolder: string
  delay?: number
  onPress?: () => void
}

export const CardComponent: React.FC<CardComponentProps> = ({
  title,
  cardHolder,
  delay = 0,
  onPress,
}) => {
  const { colors } = useTheme()

  const Component = onPress ? TouchableOpacity : View

  return (
    <Animated.View
      entering={FadeInUp.delay(delay).springify()}
      className="mb-4"
    >
      <Component
        onPress={onPress}
        className={clsx(
          "rounded-2xl p-5 border min-h-[120px]",
          onPress && "active:opacity-80"
        )}
        style={{
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
        }}
      >
        <View className="flex-row justify-between items-start">
          <AppText
            semibold
            className="text-[18px] mb-2"
            style={{ color: colors.text }}
          >
            {title}
          </AppText>
          <ContactlessIcon size={12} />
        </View>

        <View className="flex-1 justify-end">
          <View className="flex-row justify-between items-end">
            <AppText
              className="text-[14px]"
              style={{ color: colors.textSecondary }}
            >
              {cardHolder}
            </AppText>
            <MastercardLogo size={36} />
          </View>
        </View>
      </Component>
    </Animated.View>
  )
}
