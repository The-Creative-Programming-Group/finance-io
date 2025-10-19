import { View, TouchableOpacity } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTheme } from "~/contexts/ThemeContext";
import AppText from "./ui/AppText";
import React from "react";

interface AccountItemProps {
  icon: React.ReactNode;
  iconWrapped?: boolean;
  name: string;
  amount?: string;
  delay?: number;
  onPress?: () => void;
  arrow?: React.ReactNode;
}

export const AccountItem: React.FC<AccountItemProps> = ({
  icon,
  name,
  amount,
  delay = 0,
  onPress,
  arrow,
  iconWrapped = false,
}) => {
  const { colors } = useTheme();

  const Component = onPress ? TouchableOpacity : View;

  const styledIcon = React.isValidElement(icon)
    ? React.cloneElement(icon as React.ReactElement<{ color?: string }>, {
        color: colors.text, // Apply the theme color to every Lucide icon, so it changes with dark mode
      })
    : icon;

  const styledArrow = React.isValidElement(arrow)
    ? React.cloneElement(arrow as React.ReactElement<{ color?: string }>, {
        color: colors.text, // Apply the theme color to the arrow if it's a Lucide icon, so it changes with dark mode
      })
    : arrow;

  return (
    <Animated.View
      entering={FadeInDown.delay(delay).springify()}
      className="mb-2"
    >
      <Component
        onPress={onPress}
        activeOpacity={onPress ? 0.7 : 1}
        className="mb-4 flex-row items-center rounded-xl border-2 border-stroke bg-secondary px-5 py-5 dark:border-dark-stroke dark:bg-dark-secondary"
      >
        {iconWrapped ? (
          <View className="mx-auto ml-2 mr-4 rounded-full bg-primary p-2 dark:bg-dark-primary">
            {styledIcon}
          </View>
        ) : (
          <View className="ml-2 mr-4 flex w-11 items-center justify-center">
            {styledIcon}
          </View>
        )}

        <AppText
          medium
          className="ml-4 flex-1 font-bold tracking-wider"
          style={{ color: colors.text }}
        >
          {name}
        </AppText>

        {amount && (
          <AppText
            semibold
            className="text-base"
            style={{ color: colors.good }}
          >
            {amount}
          </AppText>
        )}
        {arrow && (
          <View className="ml-2">
            {typeof arrow === "string" ? (
              <AppText semibold className="text-base">
                {arrow}
              </AppText>
            ) : (
              styledArrow
            )}
          </View>
        )}
      </Component>
    </Animated.View>
  );
};
