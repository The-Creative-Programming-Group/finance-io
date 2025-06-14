import { useFonts } from "expo-font";
import React from "react";
// eslint-disable-next-line no-restricted-imports
import { Text } from "react-native";

type AppTextProps = {
  semibold?: boolean;
  children: React.ReactNode;
  medium?: boolean;
  bold?: boolean;
  className?: string;
  style?: object;
};

export default function AppText({
  children,
  semibold,
  bold,
  medium,
  className,
  style,
  ...rest
}: AppTextProps & Omit<React.ComponentProps<typeof Text>, keyof AppTextProps>) {
  // This is a Component that we use to render text with custom fonts
  const [fontsLoaded] = useFonts({
    Raleway: require("~/assets/fonts/Raleway-Regular.ttf"),
    RalewayMedium: require("~/assets/fonts/Raleway-Medium.ttf"),
    RalewaySemiBold: require("~/assets/fonts/Raleway-SemiBold.ttf"),
    RalewayBold: require("~/assets/fonts/Raleway-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const fontFamily = semibold
    ? "RalewaySemiBold"
    : medium
      ? "RalewayMedium"
      : bold
        ? "RalewayBold"
        : "Raleway";

  return (
    // eslint-disable-next-line no-restricted-syntax
    <Text className={className} style={{ fontFamily, ...style }} {...rest}>
      {children}
    </Text>
  );
}
