import type React from "react";
import { View, TouchableOpacity } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useTheme } from "~/contexts/ThemeContext";
import { ContactlessIcon, MastercardLogo } from "./Icons";
import AppText from "./AppText";
import clsx from "clsx";

interface CardComponentProps {
  title: string;
  cardHolder: string;
  delay?: number;
  onPress?: () => void;
}

export const CardComponent: React.FC<CardComponentProps> = ({
  title,
  cardHolder,
  delay = 0,
  onPress,
}) => {
  const { colors } = useTheme();

  const Component = onPress ? TouchableOpacity : View;

  return (
    <Animated.View
      entering={FadeInUp.delay(delay).springify()}
      className="mb-4"
    >
      <Component
        onPress={onPress}
        className={clsx(
          "min-h-[120px] rounded-2xl border p-5",
          onPress && "active:opacity-80",
        )}
        style={{
          backgroundColor: colors.secondary,
          borderColor: colors.stroke,
        }}
      >
        <View className="flex-row items-start justify-between">
          <AppText
            semibold
            className="mb-2 text-[18px]"
            style={{ color: colors.text }}
          >
            {title}
          </AppText>
          <ContactlessIcon size={12} />
        </View>

        <View className="flex-1 justify-end">
          <View className="flex-row items-end justify-between">
            <AppText
              className="text-[14px]"
              style={{ color: colors.backgroundText }}
            >
              {cardHolder}
            </AppText>
            <MastercardLogo size={36} />
          </View>
        </View>
      </Component>
    </Animated.View>
  );
};
