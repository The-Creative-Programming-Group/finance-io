import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
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


export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;
    setError(null);
    setIsSubmitting(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        setError("Sign in failed. Please check your credentials");
        console.error(JSON.stringify(signInAttempt, null, 2));
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
        setError("Sign in failed");
        if (identifierError) {
          setError("User does not exist");
        } else if (passwordError) {
          setError("Your password is incorrect");
        }
      } else {
        setError("Unknown Error occurred");
        console.error(JSON.stringify(err, null, 2));
      }
    }
    setIsSubmitting(false);
  }, [isLoaded, emailAddress, password]);
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
        <View className="mb-5 flex-row items-center justify-center">
          <Image
            source={require("../../assets/images/icon.png")}
            className="mb-[18px] mr-2.5 h-[50px] w-[50px]"
          />
          <AppText
            semibold={true}
            className="mb-5 text-center text-[30px] text-text dark:text-dark-text"
          >
            Finance.io
          </AppText>
        </View>
        <AppText className="mb-[5px] ml-6 text-base text-text dark:text-dark-text">
          Email
        </AppText>
        <TextInput
          className="my-[6px] h-[70px] rounded-[15px] bg-secondary p-2.5 pl-5 text-text dark:bg-dark-secondary dark:text-dark-text"
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          placeholderTextColor="gray"
          onChangeText={setEmailAddress}
          keyboardType="email-address"
          accessibilityLabel="Email input"
          accessibilityHint="Enter your email address"
        />
        <AppText className="my-[5px] ml-6 text-base text-text dark:text-dark-text">
          Password
        </AppText>
        <TextInput
          className="my-[6px] h-[70px] rounded-[15px] bg-secondary p-2.5 pl-5 text-text dark:bg-dark-secondary dark:text-dark-text"
          value={password}
          placeholder="Enter password"
          placeholderTextColor="gray"
          secureTextEntry={true}
          onChangeText={setPassword}
          accessibilityLabel="Password input"
          accessibilityHint="Enter your password"
        />
        {error && (
          <AppText
            semibold={true}
            className="ml-6 mt-[5px] text-sm text-danger"
          >
            {error}
          </AppText>
        )}
        <TouchableOpacity
          onPress={onSignInPress}
          disabled={isSubmitting}
          accessibilityLabel={isSubmitting ? "Signing in" : "Sign in"}
          accessibilityRole="button"
          className={`mt-5 self-center rounded-md bg-[#007AFF] px-5 py-2.5 ${isSubmitting ? "opacity-50" : ""}`}
        >
          <AppText bold={true} className="text-text dark:text-dark-text">
            {isSubmitting ? "Signing In..." : "Sign In"}
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("./sign-up")}
          accessibilityLabel="Create a new account"
          accessibilityRole="link"
        >
          <AppText className="pt-2.5 text-center text-text dark:text-dark-text">
            Don&apos;t have an account?{" "}
            <AppText className="font-bold text-[#007AFF]">Sign up 🚀</AppText>
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("./")}
          accessibilityLabel="Go to home"
          accessibilityRole="link"
        >
          <AppText className="pt-2.5 text-center text-text dark:text-dark-text">
            Go to Home
          </AppText>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
