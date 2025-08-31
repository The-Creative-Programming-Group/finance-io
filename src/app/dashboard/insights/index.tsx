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
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Header
          name={isLoaded && user ? user.firstName || "User" : "User"}
          type={t(ProfileSectionType.INSIGHTS) as ProfileSectionType}
        />
        <SectionHeader title="Overview" delay={400} />
      </ScrollView>
    </SafeAreaView>
  );
}
