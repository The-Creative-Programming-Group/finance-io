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
  UsersRoundIcon,
} from "lucide-react-native";
import MoneyIcon from "~/assets/Icons/money.png";

export default function SettingsScreen() {
  const { colors, isDark } = useTheme();
  const { user, isLoaded } = useUser();
  const { t } = useTranslation("settings");

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-dark-background">
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Header
          name={
            isLoaded && user
              ? user.firstName || t("defaultUser")
              : t("defaultUser")
          }
          type={NavigationItems.SETTINGS}
        />

        <SectionHeader
          size="xl"
          className="pt-16"
          title={t("user")}
          delay={400}
        />
        <View className="gap-4">
          <Container icon={UsersRoundIcon} className="mx-7 mt-2 space-y-2">
            <AppText semibold className="text-xl text-text dark:text-dark-text">
              {t("profile")}
            </AppText>
          </Container>
          <Container icon={BellRingIcon} className="mx-7 mt-2 space-y-2">
            <AppText semibold className="text-xl text-text dark:text-dark-text">
              {t("notifications")}
            </AppText>
          </Container>
        </View>
        <SectionHeader
          size="xl"
          className="pt-16"
          title={t("financial")}
          delay={400}
        />
        <View className="gap-4">
          <Container icon={ShieldXIcon} className="mx-7 mt-2 space-y-2">
            <AppText semibold className="text-xl text-text dark:text-dark-text">
              {t("limits")}
            </AppText>
          </Container>
          <Container icon={MoneyIcon} className="mx-7 mt-2 space-y-2">
            <AppText semibold className="text-xl text-text dark:text-dark-text">
              {t("income")}
            </AppText>
          </Container>
          <Container icon={LandmarkIcon} className="mx-7 mt-2 space-y-2">
            <AppText semibold className="text-xl text-text dark:text-dark-text">
              {t("bankAccounts")}
            </AppText>
          </Container>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
