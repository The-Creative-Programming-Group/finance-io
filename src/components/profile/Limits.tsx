import type React from "react";
import {
  ScrollView,
  StatusBar,
  SafeAreaView,
  View,
  ImageSourcePropType,
} from "react-native";
import { useTheme } from "~/contexts/ThemeContext";
import { Header } from "~/components/Header";
import { SectionHeader } from "~/components/SectionHeader";
import { AccountItem } from "~/components/AccountItem";
import { BottomNavigation } from "~/components/BottomNavigation";
import { FloatingActionButton } from "~/components/FloatingActionButton";
import AppImage from "~/components/ui/AppImage";

interface LimitsScreenProps {
  onNavigate: (screen: string) => void;
}

export const LimitsScreen: React.FC<LimitsScreenProps> = ({ onNavigate }) => {
  const { colors, isDark } = useTheme();
  const IconWrapper = ({
    source,
    iconW = 18,
    iconH = 18,
  }: {
    source: ImageSourcePropType;
    iconW?: number;
    iconH?: number;
  }) => (
    <View
      className="h-10 w-10 items-center justify-center rounded-full"
      style={{ backgroundColor: colors.border }}
    >
      <AppImage
        source={source}
        style={{ width: iconW, height: iconH }}
        resizeMode="contain"
      />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pt-20 pb-36"
      >
        <Header title="Julia's - Limit" />

        <SectionHeader title="Daily Account Limit" delay={100} />

        <View className="mt-6">
          <AccountItem
            icon={
              <IconWrapper
                source={require("~/assets/Icons/entertainment.png")}
              />
            }
            name="Entertainment"
            amount="200€"
            delay={200}
          />
          <AccountItem
            icon={<IconWrapper source={require("~/assets/Icons/rent.png")} />}
            name="Rent"
            amount="1000€"
            delay={300}
          />
        </View>
      </ScrollView>

      <FloatingActionButton onPress={() => onNavigate("AddLimit")} />
      <BottomNavigation
        activeTab="Settings"
        onTabPress={(tab) => onNavigate(tab)}
      />
    </SafeAreaView>
  );
};
