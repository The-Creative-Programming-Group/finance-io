import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "~/components/Header";
import { NavigationItems } from "~/types";
import React from "react";
import { useTranslation } from "react-i18next";
import { TextInput } from "~/components/ui/text-input";
import Button from "~/components/ui/button";

const ProfilePage = () => {
  const { t: tCommon } = useTranslation("common");
  const { t: tSettings } = useTranslation("settings");

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-dark-background">
      <Header type={NavigationItems.PROFILE} />
      <TextInput name={tCommon("firstName")} />
      <TextInput name={tCommon("lastName")} />
      <TextInput name={tCommon("email")} />
      <Button>{tSettings("saveChanges")}</Button>
      <Button variants={{ intent: "secondary" }}>
        {tSettings("changePassword")}
      </Button>
    </SafeAreaView>
  );
};

export default ProfilePage;
