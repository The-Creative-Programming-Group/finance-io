import React from "react"
import { Text } from "react-native"
import { useFonts } from "expo-font"

type AppTextProps = {
  semibold?: boolean
  children: React.ReactNode
  medium?: boolean
  bold?: boolean
  className?: string
  style?: object
}

export default function AppText({
  children,
  semibold,
  bold,
  medium,
  className,
  style,
  ...rest
}: AppTextProps & Omit<React.ComponentProps<typeof Text>, keyof AppTextProps>) {
  
  const [fontsLoaded] = useFonts({
    Raleway: require("~/assets/fonts/Raleway-Regular.ttf"),
    RalewayMedium: require("~/assets/fonts/Raleway-Medium.ttf"),
    RalewaySemiBold: require("~/assets/fonts/Raleway-SemiBold.ttf"),
    RalewayBold: require("~/assets/fonts/Raleway-Bold.ttf"),
  })

  if (!fontsLoaded) {
    return null
  }

  const fontFamily = semibold
    ? "RalewaySemiBold"
    : medium
    ? "RalewayMedium"
    : bold
    ? "RalewayBold"
    : "Raleway"

  return (
    <Text
      className={className}
      style={[
        { fontFamily},
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  )
}
