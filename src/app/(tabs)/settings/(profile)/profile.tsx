import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "~/components/Header";
import { NavigationItems } from "~/types";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { TextInput } from "~/components/ui/text-input";
import Button from "~/components/ui/button";
import { View, Alert, ActivityIndicator } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import AppText from "~/components/ui/AppText";

const ProfilePage = () => {
  const { t: tCommon } = useTranslation("common");
  const { t: tSettings } = useTranslation("settings");
  const { user, isLoaded } = useUser();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // Load user data when component mounts
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.primaryEmailAddress?.emailAddress || "");
    }
  }, [user]);

  const handleSaveChanges = async () => {
    if (!user) {
      Alert.alert("Error", "User not found. Please sign in again.");
      return;
    }

    setIsUpdating(true);
    try {
      await user.update({
        firstName: firstName,
        lastName: lastName,
      });

      Alert.alert("Success", "Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isLoaded) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background dark:bg-dark-background">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-background dark:bg-dark-background">
        <AppText className="text-text dark:text-dark-text">
          Please sign in to view your profile.
        </AppText>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-dark-background">
      <Header type={NavigationItems.PROFILE} />
      <View className="p-6">
        <TextInput
          name={tCommon("firstName")}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Enter your first name"
          autoCapitalize="words"
        />
        <TextInput
          name={tCommon("lastName")}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Enter your last name"
          autoCapitalize="words"
        />
        <Button onPress={handleSaveChanges} disabled={isUpdating}>
          {isUpdating ? "Saving..." : tSettings("saveChanges")}
        </Button>
        <Button
          variants={{ intent: "secondary" }}
          href="/settings/change-email"
        >
          {tSettings("changeEmail")}
        </Button>
        <Button
          variants={{ intent: "secondary" }}
          href="/settings/change-password"
        >
          {tSettings("changePassword")}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ProfilePage;
