import type React from "react";
import { View, TouchableOpacity } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTheme } from "../contexts/ThemeContext";
import AppText from "./AppText";

interface AccountItemProps {
  icon: React.ReactNode;
  name: string;
  amount: string;
  delay?: number;
  onPress?: () => void;
}

export const AccountItem: React.FC<AccountItemProps> = ({
  icon,
  name,
  amount,
  delay = 0,
  onPress,
}) => {
  const { colors } = useTheme();

  const Component = onPress ? TouchableOpacity : View;

  return (
    <Animated.View
      entering={FadeInDown.delay(delay).springify()}
      className="mb-2"
    >
      <Component
        onPress={onPress}
        activeOpacity={onPress ? 0.7 : 1}
        className="flex-row items-center rounded-xl border px-5 py-4"
        style={{
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
        }}
      >
        <View className="mr-4 h-10 w-10">{icon}</View>

        <AppText
          medium
          className="flex-1 text-base"
          style={{ color: colors.text }}
        >
          {name}
        </AppText>

        <AppText
          semibold
          className="text-base"
          style={{ color: colors.accent }}
        >
          {amount}
        </AppText>
      </Component>
    </Animated.View>
  );
};
