import React from "react";
import { ScrollView, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "~/contexts/ThemeContext";
import { Header } from "~/components/Header";
import { SectionHeader } from "~/components/SectionHeader";
import { NavigationItems } from "~/types";
import { useUser } from "@clerk/clerk-expo";
import { useTranslation } from "react-i18next";
import AppText from "~/components/ui/AppText";
import { Container } from "~/components/ui/container";
import {
  BellRingIcon,
  LandmarkIcon,
  ShieldXIcon,
  SunMoonIcon,
  UsersRoundIcon,
} from "lucide-react-native";
import MoneyIcon from "~/assets/Icons/money.png";
import { Link } from "expo-router";

export default function SettingsScreen() {
  const { colors, isDark } = useTheme();
  const { t } = useTranslation("settings");

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-dark-background">
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Header type={NavigationItems.SETTINGS} />

        <SectionHeader
          size="xl"
          className="pt-16"
          title={t("user")}
          delay={400}
        />
        <View className="gap-4">
          <Link href="/settings/profile" className="mx-7 mt-2 space-y-2">
            <Container icon={UsersRoundIcon}>
              <AppText
                semibold
                className="text-xl text-text dark:text-dark-text"
              >
                {t("profile")}
              </AppText>
            </Container>
          </Link>
          <Link href="/settings/appearance" className="mx-7 mt-2 space-y-2">
            <Container icon={SunMoonIcon}>
              <AppText
                semibold
                className="text-xl text-text dark:text-dark-text"
              >
                {t("appearance")}
              </AppText>
            </Container>
          </Link>
          <Link href="/settings/notifications" className="mx-7 mt-2 space-y-2">
            <Container icon={BellRingIcon}>
              <AppText
                semibold
                className="text-xl text-text dark:text-dark-text"
              >
                {t("notifications")}
              </AppText>
            </Container>
          </Link>
        </View>
        <SectionHeader
          size="xl"
          className="pt-16"
          title={t("financial")}
          delay={400}
        />
        <View className="gap-4">
          <Link href="/settings/limits" className="mx-7 mt-2 space-y-2">
            <Container icon={ShieldXIcon} className="mx-7 mt-2 space-y-2">
              <AppText
                semibold
                className="text-xl text-text dark:text-dark-text"
              >
                {t("limits")}
              </AppText>
            </Container>
          </Link>

          <Link href="/settings/income" className="mx-7 mt-2 space-y-2">
            <Container icon={MoneyIcon} className="mx-7 mt-2 space-y-2">
              <AppText
                semibold
                className="text-xl text-text dark:text-dark-text"
              >
                {t("income")}
              </AppText>
            </Container>
          </Link>

          <Link href="/settings/bank-accounts" className="mx-7 mt-2 space-y-2">
            <Container icon={LandmarkIcon} className="mx-7 mt-2 space-y-2">
              <AppText
                semibold
                className="text-xl text-text dark:text-dark-text"
              >
                {t("bankAccounts")}
              </AppText>
            </Container>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
