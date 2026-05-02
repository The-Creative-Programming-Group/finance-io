import React from "react";
import { useTheme } from "~/contexts/ThemeContext";
import { ScrollView, StatusBar } from "react-native";
import { Header } from "~/components/Header";
import { SectionHeader } from "~/components/SectionHeader";
import { NavigationItems } from "~/types";
import { useUser } from "@clerk/clerk-expo";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InsightsScreen() {
  const { colors, isDark } = useTheme();
  const { user, isLoaded } = useUser();
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-dark-background">
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Header type={NavigationItems.INSIGHTS} />
        <SectionHeader title={t("overview")} delay={400} />
      </ScrollView>
    </SafeAreaView>
  );
}
