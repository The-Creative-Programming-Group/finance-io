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
import { ProfileSectionType } from "~/types";

const AnimatedView = Animated.createAnimatedComponent(Animated.View);

interface HeaderProps {
  title?: string; // keep backward compatibility
  name?: string;
  type?: ProfileSectionType; // enum key for translation
}

export const Header: React.FC<HeaderProps> = ({ title, name, type }) => {
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
      className="absolute top-0 left-0 right-0 flex-row items-center justify-center gap-3 border-b border-gray-800 px-4 py-4"
      style={[
        headerAnimatedStyle,
        { backgroundColor: colors.cardBackground },
      ]}
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
        {title ?? `${name ?? ""}${type ? ` - ${t(type)}` : ""}`}
      </AppText>
    </AnimatedView>
  );
};
