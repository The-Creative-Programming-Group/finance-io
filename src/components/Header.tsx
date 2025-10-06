import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useTheme } from "~/contexts/ThemeContext";
import AppText from "./ui/AppText";
import AppImage from "~/components/ui/AppImage";
import { useTranslation } from "react-i18next";
import { NavigationItems } from "~/types";

const AnimatedView = Animated.createAnimatedComponent(Animated.View);

interface HeaderProps {
  name: string;
  type: NavigationItems; // enum key, not a translated string
}

export const Header: React.FC<HeaderProps> = ({ name, type }) => {
  const { colors } = useTheme();
  const headerOpacity = useSharedValue(0);
  const { t } = useTranslation();

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: withSpring(headerOpacity.value),
  }));

  useEffect(() => {
    headerOpacity.value = 1;
  }, []);

  return (
    <AnimatedView
      className="w-full flex-row items-center justify-center gap-3 border-b border-stroke bg-secondary pb-4 pt-16 dark:border-dark-stroke dark:bg-dark-secondary"
      style={headerAnimatedStyle}
    >
      <AppImage
        source={require("../assets/images/avatar.png")}
        className="h-7 w-7 rounded-full"
      />
      <AppText
        semibold
        className="text-center text-xl"
        style={{ color: colors.text }}
      >
        {name} - {t(type)}
      </AppText>
    </AnimatedView>
  );
};
