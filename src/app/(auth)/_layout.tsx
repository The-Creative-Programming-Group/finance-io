import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { View, ActivityIndicator } from "react-native";
import { useTranslation } from "react-i18next";
import "~/i18n";
import Home from "~/app/home";

export default function AuthRoutesLayout(): React.ReactElement {
  const { isSignedIn, isLoaded } = useAuth();
  const { t } = useTranslation();

  // Show a loading indicator while Clerk is initializing
  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isSignedIn) {
    return <Redirect href={"../home"} />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
