import React from "react"
import { Image, View } from "react-native"
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated"
import { useTheme } from "../contexts/ThemeContext"
import AppText from "./AppText"

interface HeaderProps {
  name: string
}

export const Header: React.FC<HeaderProps> = ({ name }) => {
  const { colors } = useTheme()
  const headerOpacity = useSharedValue(0)

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(headerOpacity.value),
    }
  })

  React.useEffect(() => {
    headerOpacity.value = 1
  }, [])

  return (
    <Animated.View
      style={[
        {
          width: "100%",
          backgroundColor: "#121111",
          paddingVertical: 16,
          paddingHorizontal: 16,
          borderBottomWidth: 1,
          flexDirection: "row",
          alignItems: "center",
          alignContent: "center",
          borderRadius: 8,
          justifyContent: "flex-start",
        },
        headerAnimatedStyle,
      ]}
    >
      <Image
        source={require("../assets/images/avatar.png")}
        style={{
          width: 28,
          height: 28,
          borderRadius: 16,
          marginLeft: 18,
        }}
      />
      <AppText
        semibold
        style={{
          fontSize: 16,
          color: colors.text,
          flex: 1,
          marginLeft: 8,
          textAlign: "center",
        }}
      >
        {name} - Dashboard
      </AppText>
    </Animated.View>
  )
}
