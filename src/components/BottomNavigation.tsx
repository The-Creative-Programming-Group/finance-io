import type React from "react";
import { View, TouchableOpacity } from "react-native";
import { useTheme } from "~/contexts/ThemeContext";
import AppText from "./ui/AppText";
import AppImage from "~/components/ui/AppImage";

interface BottomNavigationProps {
  activeTab: "Banking" | "Insights" | "Settings";
  onTabPress: (tab: "Banking" | "Insights" | "Settings") => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabPress,
}) => {
  const { colors } = useTheme();

  const TabItem = ({
    tab,
    label,
    iconSource,
  }: {
    tab: "Banking" | "Insights" | "Settings";
    label: string;
    iconSource: any;
  }) => {
    const isActive = activeTab === tab;
    return (
      <TouchableOpacity
        className="flex-1 items-center py-3"
        onPress={() => onTabPress(tab)}
      >
        <AppImage
          source={iconSource}
          className="h-5 w-5"
          resizeMode="contain"
        />
        <AppText
          className="mt-1 text-xs"
          style={{ color: isActive ? colors.text : colors.text }}
        >
          {label}
        </AppText>
      </TouchableOpacity>
    );
  };

  return (
    <View
      className="flex-row border-t pb-3"
      style={{
        borderTopColor: colors.border,
        backgroundColor: colors.cardBackground,
      }}
    >
      <TabItem
        tab="Banking"
        label="Banking"
        iconSource={require("~/assets/Icons/banking.png")}
      />
      <TabItem
        tab="Insights"
        label="Insights"
        iconSource={require("~/assets/Icons/insights.png")}
      />
      <TabItem
        tab="Settings"
        label="Settings"
        iconSource={require("~/assets/Icons/settings.png")}
      />
    </View>
  );
};
