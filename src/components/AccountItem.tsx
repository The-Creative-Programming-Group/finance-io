import type React from "react";
import { View, TouchableOpacity } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTheme } from "~/contexts/ThemeContext";
import AppText from "./ui/AppText";

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

  const IconWrapper = ({
    children,
    H_size = 40,
    W_size = 60,
  }: {
    children: React.ReactNode;
    H_size?: number;
    W_size?: number;
  }) => (
    <View
      className="items-center justify-center rounded-2xl"
      style={{
        width: W_size,
        height: H_size,
        backgroundColor: colors.border,
      }}
    >
      {children}
    </View>
  );

  return (
    <Animated.View
      entering={FadeInDown.delay(delay).springify()}
      className="mb-2"
    >
      <Component
        onPress={onPress}
        activeOpacity={onPress ? 0.7 : 1}
        className="mb-4 flex-row items-center rounded-xl border-2 border-dark-stroke bg-dark-secondary px-5 py-5"
      >
        {iconWrapped ? (
          <View className="mx-auto ml-2 mr-4 rounded-full bg-dark-primary p-2">
            {icon}
          </View>
        ) : (
          <View className="ml-2 mr-4 flex w-11 items-center justify-center">
            {icon}
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
              arrow
            )}
          </View>
        )}
      </Component>
    </Animated.View>
  );
};
