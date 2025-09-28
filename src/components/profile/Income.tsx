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
import AppText from "~/components/ui/AppText";
import AppImage from "~/components/ui/AppImage";

interface IncomeScreenProps {
  onNavigate: (screen: string) => void;
}

export const IncomeScreen: React.FC<IncomeScreenProps> = ({ onNavigate }) => {
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
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: colors.background }}
    >
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pt-16 pb-28"
      >
        <Header title="Julia's - Income" />

        <SectionHeader title="Income" delay={100} />

        <AppText
          medium
          className="mb-4 text-center text-base"
          style={{ color: colors.text }}
        >
          Every Month
        </AppText>

        <AccountItem
          icon={<IconWrapper source={require("~/assets/Icons/Y.png")} />}
          name="Company"
          amount="2000€"
          delay={200}
        />

        <SectionHeader title="Expenses" delay={300} />

        <AppText
          medium
          className="mb-4 text-center text-base"
          style={{ color: colors.text }}
        >
          Every Month
        </AppText>

        <AccountItem
          icon={<IconWrapper source={require("~/assets/Icons/rent.png")} />}
          name="Rent"
          amount="1000€"
          delay={400}
        />

        <AccountItem
          icon={<IconWrapper source={require("~/assets/Icons/netflix.png")} />}
          name="Netflix"
          amount="10,99€"
          delay={500}
        />
      </ScrollView>

      <FloatingActionButton onPress={() => console.log("Add income/expense")} />
      <BottomNavigation
        activeTab="Settings"
        onTabPress={(tab) => onNavigate(tab)}
      />
    </SafeAreaView>
  );
};
