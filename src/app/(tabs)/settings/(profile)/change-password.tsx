import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "~/components/Header";
import { NavigationItems } from "~/types";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { TextInput } from "~/components/ui/text-input";
import Button from "~/components/ui/button";
import { View, Alert, ActivityIndicator } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import AppText from "~/components/ui/AppText";
import { useRouter } from "expo-router";

const ChangePasswordPage = () => {
  const { t: tSettings } = useTranslation("settings");
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChangePassword = async () => {
    if (!user) {
      Alert.alert("Error", "User not found. Please sign in again.");
      return;
    }

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long.");
      return;
    }

    setIsUpdating(true);
    try {
      await user.updatePassword({
        currentPassword: currentPassword,
        newPassword: newPassword,
      });

      Alert.alert("Success", "Password updated successfully!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);

      // Clear fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.error("Error updating password:", error);
      const errorMessage =
        error?.errors?.[0]?.message ||
        "Failed to update password. Please check your current password and try again.";
      Alert.alert("Error", errorMessage);
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
          Please sign in to change your password.
        </AppText>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-dark-background">
      <Header type={NavigationItems.PROFILE} />
      <View className="p-6">
        <AppText className="mb-4 text-xl font-semibold text-text dark:text-dark-text">
          {tSettings("changePassword")}
        </AppText>

        <TextInput
          name="Current Password"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          placeholder="Enter your current password"
          secureTextEntry
          autoCapitalize="none"
        />

        <TextInput
          name="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="Enter your new password"
          secureTextEntry
          autoCapitalize="none"
        />

        <TextInput
          name="Confirm New Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm your new password"
          secureTextEntry
          autoCapitalize="none"
        />

        <AppText className="mb-2 ml-6 text-sm text-backgroundText dark:text-dark-backgroundText">
          Password must be at least 8 characters long
        </AppText>

        <Button onPress={handleChangePassword} disabled={isUpdating}>
          {isUpdating ? "Updating..." : tSettings("changePassword")}
        </Button>

        <Button
          variants={{ intent: "secondary" }}
          onPress={() => router.back()}
          disabled={isUpdating}
        >
          Cancel
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ChangePasswordPage;
