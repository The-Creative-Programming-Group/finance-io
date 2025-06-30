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

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;
    setError(null);
    setIsSubmitting(true);

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress.trim(),
        password: password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("../home");
      } else {
        setError("Sign in failed. Please check your credentials.");
        console.error("Sign in not complete:", JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error("Sign in error:", JSON.stringify(err, null, 2));
      if (err?.errors?.length > 0) {
        const clerkError = err.errors[0];
        switch (clerkError.code) {
          case "form_identifier_not_found":
            setError("No account found with this email.");
            break;
          case "form_password_incorrect":
            setError("Incorrect password.");
            break;
          default:
            setError(clerkError.message || "Sign in failed.");
        }
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [isLoaded, emailAddress, password]);

  return (
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
        <View className="flex-row items-center justify-center mb-5">
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
        />

        {error && (
          <AppText semibold className="ml-6 mt-[5px] text-sm text-danger">
            {error}
          </AppText>
        )}

        <TouchableOpacity
          onPress={() => router.push("/forget-password")}
          accessibilityLabel="Forgot Password?"
          accessibilityRole="link"
        >
          <AppText className="pt-3 font-medium text-left text-blue-500">
            Forgot Password?
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onSignInPress}
          disabled={isSubmitting}
          accessibilityLabel={isSubmitting ? "Signing in" : "Sign in"}
          accessibilityRole="button"
          className={`mt-5 self-center rounded-md bg-[#007AFF] px-5 py-2.5 ${
            isSubmitting ? "opacity-50" : ""
          }`}
        >
          <AppText bold className="text-text dark:text-dark-text">
            {isSubmitting ? "Signing In..." : "Sign In"}
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/sign-up")}
          accessibilityLabel="Create a new account"
          accessibilityRole="link"
        >
          <AppText className="pt-2.5 text-center text-text dark:text-dark-text">
            Don’t have an account?{" "}
            <AppText className="font-bold text-[#007AFF]">Sign up 🚀</AppText>
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/")}
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
