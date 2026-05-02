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

const ChangeEmailPage = () => {
  const { t: tCommon } = useTranslation("common");
  const { t: tSettings } = useTranslation("settings");
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [newEmail, setNewEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [emailAddressId, setEmailAddressId] = useState<string | null>(null);

  const handleSendVerification = async () => {
    if (!user) {
      Alert.alert("Error", "User not found. Please sign in again.");
      return;
    }

    if (!newEmail) {
      Alert.alert("Error", "Please enter a new email address.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    // Check if the new email is the same as the current one
    if (newEmail === user.primaryEmailAddress?.emailAddress) {
      Alert.alert("Error", "This is already your current email address.");
      return;
    }

    setIsUpdating(true);
    try {
      const emailAddress = await user.createEmailAddress({ email: newEmail });
      await emailAddress.prepareVerification({ strategy: "email_code" });

      setEmailAddressId(emailAddress.id);
      setShowVerification(true);

      Alert.alert(
        "Verification Sent",
        `A verification code has been sent to ${newEmail}. Please check your inbox.`,
      );
    } catch (error: any) {
      console.error("Error sending verification:", error);
      Alert.alert(
        "Error",
        error?.errors?.[0]?.message ||
          "Failed to send verification email. Please try again.",
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const handleVerifyEmail = async () => {
    if (!user || !emailAddressId) {
      Alert.alert("Error", "Session expired. Please start over.");
      setShowVerification(false);
      return;
    }

    if (!verificationCode) {
      Alert.alert("Error", "Please enter the verification code.");
      return;
    }

    setIsUpdating(true);
    try {
      const emailAddress = user.emailAddresses.find(
        (e) => e.id === emailAddressId,
      );

      if (!emailAddress) {
        throw new Error("Email address not found.");
      }

      await emailAddress.attemptVerification({ code: verificationCode });

      // Set as primary email
      await user.update({
        primaryEmailAddressId: emailAddressId,
      });

      Alert.alert(
        "Success",
        "Your email address has been changed successfully!",
        [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ],
      );
    } catch (error: any) {
      console.error("Error verifying email:", error);
      Alert.alert(
        "Error",
        error?.errors?.[0]?.message ||
          "Invalid verification code. Please try again.",
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    router.back();
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
          Please sign in to change your email.
        </AppText>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-dark-background">
      <Header type={NavigationItems.PROFILE} />
      <View className="p-6">
        <AppText className="mb-4 text-xl font-semibold text-text dark:text-dark-text">
          {tSettings("changeEmail") || "Change Email"}
        </AppText>

        <AppText className="mb-4 text-sm text-text/70 dark:text-dark-text/70">
          Current email: {user.primaryEmailAddress?.emailAddress}
        </AppText>

        {!showVerification ? (
          <>
            <TextInput
              name="New Email"
              value={newEmail}
              onChangeText={setNewEmail}
              placeholder="Enter your new email address"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />

            <Button onPress={handleSendVerification} disabled={isUpdating}>
              {isUpdating ? "Sending..." : "Send Verification Code"}
            </Button>

            <Button
              variants={{ intent: "secondary" }}
              onPress={handleCancel}
              disabled={isUpdating}
            >
              {tCommon("cancel") || "Cancel"}
            </Button>
          </>
        ) : (
          <>
            <AppText className="mb-4 text-sm text-text/70 dark:text-dark-text/70">
              A verification code has been sent to {newEmail}. Please enter it
              below to confirm your new email address.
            </AppText>

            <TextInput
              name="Verification Code"
              value={verificationCode}
              onChangeText={setVerificationCode}
              placeholder="Enter 6-digit code"
              keyboardType="number-pad"
              maxLength={6}
            />

            <Button onPress={handleVerifyEmail} disabled={isUpdating}>
              {isUpdating ? "Verifying..." : "Verify Email"}
            </Button>

            <Button
              variants={{ intent: "secondary" }}
              onPress={() => setShowVerification(false)}
              disabled={isUpdating}
            >
              Back
            </Button>

            <Button
              variants={{ intent: "secondary" }}
              onPress={handleCancel}
              disabled={isUpdating}
            >
              {tCommon("cancel") || "Cancel"}
            </Button>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ChangeEmailPage;
