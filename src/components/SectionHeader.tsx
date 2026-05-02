import type React from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTheme } from "~/contexts/ThemeContext";
import AppText from "./ui/AppText";
import { cn } from "~/utils/lib";

interface SectionHeaderProps {
  title: string;
  delay?: number;
  size?: "large" | "medium" | "small" | "xl";
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  delay = 0,
  size = "large",
  className,
}) => {
  const { colors } = useTheme();

  const sizeClassMap = {
    xl: "text-2xl mt-8",
    large: "text-xl mt-6",
    medium: "text-base mt-4",
    small: "text-sm mt-3",
  };

  return (
    <Animated.View entering={FadeInDown.delay(delay).springify()}>
      <AppText
        className={cn(`mb-4 text-center ${sizeClassMap[size]}`, className)}
        style={{ color: colors.text }}
        semibold
      >
        {title}
      </AppText>
    </Animated.View>
  );
};
