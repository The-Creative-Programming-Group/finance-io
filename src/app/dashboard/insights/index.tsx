import React from "react";
import { useTheme } from "~/contexts/ThemeContext";
import { SafeAreaView, ScrollView, StatusBar } from "react-native";
import { Header } from "~/components/Header";
import { SectionHeader } from "~/components/SectionHeader";
import { ProfileSectionType } from "~/types";
import { useUser } from "@clerk/clerk-expo";
import { useTranslation } from "react-i18next";

export default function InsightsScreen() {
  const { colors, isDark } = useTheme();
  const { user, isLoaded } = useUser();
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 bg-dark-background">
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />
      <ScrollView className="flex-1 p-8" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Header
          name={
            isLoaded && user
              ? user.firstName || t("defaultUser")
              : t("defaultUser")
          }
          type={ProfileSectionType.INSIGHTS}
        />
        <SectionHeader title={t("overview")} delay={400} />
      </ScrollView>
    </SafeAreaView>
  );
}
