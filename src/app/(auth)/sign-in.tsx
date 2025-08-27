import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useCallback, useState, useEffect } from "react";
import {
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import AppText from "~/components/AppText";
import { useTranslation } from "react-i18next";
import "~/i18n";
import { languageService } from "~/services/languageService";
import Button from "~/components/ui/button";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const { t } = useTranslation();

  // Initialize language when component mounts with better error handling
  useEffect(() => {
    const initLanguage = async () => {
      try {
        console.log("Sign-in page: Initializing language...");
        await languageService.initializeLanguage();
        console.log("Sign-in page: Language initialized successfully");
      } catch (error) {
        console.error("Sign-in page: Error initializing language:", error);
      }
    };

    initLanguage();
  }, []);

  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Clear field errors when user types
  const handleEmailChange = (text: string) => {
    setEmailAddress(text);
    if (fieldErrors.email) {
      setFieldErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (fieldErrors.password) {
      setFieldErrors((prev) => ({ ...prev, password: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: {
      email?: string;
      password?: string;
    } = {};

    if (!emailAddress.trim()) {
      newErrors.email = t("emailRequired");
    } else if (!/\S+@\S+\.\S+/.test(emailAddress)) {
      newErrors.email = t("invalidEmail");
    }

    if (!password) {
      newErrors.password = t("passwordRequired");
    }

    setFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;

    // Reset previous errors
    setError(null);

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("../home");
      } else {
        setError(
          t("signInFailed", "Sign in failed. Please check your credentials"),
        );
        // JSON.stringify(signInAttempt) can include createdSessionId and other sensitive details. Don’t log this in production builds.
        if (__DEV__) {
          console.error(JSON.stringify(signInAttempt, null, 2));
        }
      }
    } catch (err) {
      // Type guard to check if err is an object and has 'errors' property
      if (
        typeof err === "object" &&
        err !== null &&
        "errors" in err &&
        Array.isArray((err as any).errors)
      ) {
        const errors = (err as { errors: { code: string }[] }).errors;
        const identifierError = errors.find(
          (error) => error.code === "form_identifier_invalid",
        );
        const passwordError = errors.find(
          (error) => error.code === "form_password_incorrect",
        );
        setError(t("signInFailed", "Sign in failed"));
        if (identifierError) {
          setError(t("userDoesNotExist", "User does not exist"));
        } else if (passwordError) {
          setError(t("incorrectPassword", "Your password is incorrect"));
        }
      } else {
        setError(t("unknownError", "Unknown Error occurred"));
        console.error(JSON.stringify(err, null, 2));
      }
    }
    setIsSubmitting(false);
  }, [isLoaded, emailAddress, password, t]);

  return (
    // Use "padding" on iOS so the view shifts up smoothly when the keyboard appears.
    // Use "height" on Android and other platforms to resize the view height when the keyboard is shown.
    // This provides the best keyboard handling experience for each platform.
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView
        className="flex-1 bg-background p-2.5 dark:bg-dark-background"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="mt-20 flex-row items-center justify-center gap-7">
          <Image
            source={require("../../assets/images/icon.png")}
            style={{ width: 58, height: 58, borderRadius: 12 }}
          />
          <AppText className="text-4xl text-text dark:text-dark-text">
            Finance.io
          </AppText>
        </View>
        <AppText className="mb-[5px] ml-6 text-base text-text dark:text-dark-text">
          {t("email")}
        </AppText>
        <TextInput
          className="my-[6px] h-[70px] rounded-[15px] bg-secondary p-2.5 pl-5 text-text dark:bg-dark-secondary dark:text-dark-text"
          autoCapitalize="none"
          value={emailAddress}
          placeholder={t("email")}
          placeholderTextColor="gray"
          onChangeText={handleEmailChange}
          keyboardType="email-address"
          accessibilityLabel="Email input"
          accessibilityHint="Enter your email address"
        />
        {fieldErrors.email && (
          <AppText className="ml-6 text-sm text-danger">
            {fieldErrors.email}
          </AppText>
        )}
        <AppText className="my-[5px] ml-6 text-base text-text dark:text-dark-text">
          {t("password")}
        </AppText>
        <TextInput
          className="my-[6px] h-[70px] rounded-[15px] bg-secondary p-2.5 pl-5 text-text dark:bg-dark-secondary dark:text-dark-text"
          value={password}
          placeholder={t("password")}
          placeholderTextColor="gray"
          secureTextEntry={true}
          onChangeText={handlePasswordChange}
          accessibilityLabel="Password input"
          accessibilityHint="Enter your password"
        />
        {fieldErrors.password && (
          <AppText className="ml-6 text-sm text-danger">
            {fieldErrors.password}
          </AppText>
        )}
        {error && (
          <AppText
            semibold={true}
            className="ml-6 mt-[5px] text-sm text-danger"
          >
            {error}
          </AppText>
        )}
        {/* TODO: Forgot password logic */}
        <Button
          onPress={onSignInPress}
          disabled={isSubmitting}
          accessibilityLabel={isSubmitting ? "Signing in" : "Sign in"}
          accessibilityRole="button"
        >
          {isSubmitting ? t("signingIn") : t("signIn")}
        </Button>
        <TouchableOpacity
          onPress={() => router.push("./sign-up")}
          accessibilityLabel="Create a new account"
          accessibilityRole="link"
        >
          <AppText className="pt-2.5 text-center text-text dark:text-dark-text">
            {t("dontHaveAccount")}{" "}
            <AppText className="font-bold underline">{t("signUp")}</AppText>
            <AppText>🥳</AppText>
          </AppText>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
