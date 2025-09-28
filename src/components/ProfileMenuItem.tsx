import type React from "react";
import { View, TouchableOpacity } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTheme } from "~/contexts/ThemeContext";
import AppText from "./ui/AppText";
import AppImage from "~/components/ui/AppImage";

interface ProfileMenuItemProps {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
  delay?: number;
}

export const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({
  icon,
  title,
  onPress,
  delay = 0,
}) => {
  const { colors } = useTheme();

  return (
    <Animated.View
      entering={FadeInDown.delay(delay).springify()}
      className="mb-2"
    >
      <TouchableOpacity
        className="flex-row items-center rounded-xl border px-5 py-4"
        style={{
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
        }}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View className="mr-4 h-10 w-10 items-center justify-center">
          {icon}
        </View>

        <AppText
          medium
          className="flex-1 text-lg"
          style={{ color: colors.text }}
        >
          {title}
        </AppText>

        <View className="h-8 w-8 items-center justify-center rounded-full">
          <AppImage
            source={require("~/assets/Icons/arrow.png")}
            className="h-4 w-4"
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
