import type React from "react"
import { View, TouchableOpacity } from "react-native"
import Animated, { FadeInUp } from "react-native-reanimated"
import { useTheme } from "../contexts/ThemeContext"
import { ContactlessIcon, MastercardLogo } from "./Icons"
import AppText from "./AppText"

interface CardComponentProps {
  title: string
  cardHolder: string
  delay?: number
  onPress?: () => void
}

export const CardComponent: React.FC<CardComponentProps> = ({ title, cardHolder, delay = 0, onPress }) => {
  const { colors } = useTheme()

  const Component = onPress ? TouchableOpacity : View

  return (
    <Animated.View
      entering={FadeInUp.delay(delay).springify()}
      style={{
        marginBottom: 16,
      }}
    >
      <Component
        onPress={onPress}
        style={{
          backgroundColor: colors.cardBackground,
          borderRadius: 16,
          padding: 20,
          borderWidth: 1,
          borderColor: colors.border,
          minHeight: 120,
        }}
        activeOpacity={onPress ? 0.8 : 1}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <AppText
            semibold
            style={{
              fontSize: 18,
              color: colors.text,
              marginBottom: 8,
            }}
          >
            {title}
          </AppText>
          <ContactlessIcon size={12} />
        </View>

        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <AppText
              style={{
                fontSize: 14,
                color: colors.textSecondary,
              }}
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
