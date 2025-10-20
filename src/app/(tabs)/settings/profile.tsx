import AppText from "~/components/ui/AppText";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "~/components/Header";
import { NavigationItems } from "~/types";
import React from "react";
import { useTranslation } from "react-i18next";

const ProfilePage = () => {
  const { t } = useTranslation("settings");

  return (
    <SafeAreaView>
      <Header type={NavigationItems.PROFILE} />
      <AppText className="text-text dark:text-dark-text">Hiiii</AppText>
    </SafeAreaView>
  );
};

export default ProfilePage;
