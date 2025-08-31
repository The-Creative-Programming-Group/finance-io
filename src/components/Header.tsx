import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useTheme } from "~/contexts/ThemeContext";
import AppText from "./ui/AppText";
import AppImage from "~/components/ui/AppImage";
import { ProfileSectionType } from "~/types";

const AnimatedView = Animated.createAnimatedComponent(Animated.View);

interface HeaderProps {
  name: string;
  type: ProfileSectionType;
}

export const Header: React.FC<HeaderProps> = ({ name, type }) => {
  const { colors } = useTheme();
  const headerOpacity = useSharedValue(0);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: withSpring(headerOpacity.value),
  }));

  useEffect(() => {
    headerOpacity.value = 1;
  }, []);

  return (
    <AnimatedView
      className="bg-black border-gray-800 w-full flex-row items-center justify-center gap-3 space-x-2 rounded-lg border-b px-4 py-3"
      style={headerAnimatedStyle}
    >
      <AppImage
        source={require("../assets/images/avatar.png")}
        className="h-6 w-6 rounded-full"
      />
      <AppText
        semibold
        className="text-center text-sm"
        style={{ color: colors.text }}
      >
        {name} - {type}
      </AppText>
    </AnimatedView>
  );
};
