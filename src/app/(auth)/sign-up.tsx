import React, { useState, useEffect } from "react";
import {
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import AppText from "~/components/ui/AppText";
import { useSignUp, useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import InputOtp from "~/components/ui/input-otp";
import { useTranslation } from "react-i18next";
import "~/i18n";
import { languageService } from "~/services/languageService";
import Button from "~/components/ui/button";
import AppImage from "~/components/ui/AppImage";

type newErrorType = {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
};

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();
  const router = useRouter();
  const { t } = useTranslation();

  // Initialize language when component mounts with better error handling
  useEffect(() => {
    const initLanguage = async () => {
      try {
        console.log("Sign-up page: Initializing language...");
        await languageService.initializeLanguage();
        console.log("Sign-up page: Language initialized successfully");
      } catch (error) {
        console.error("Sign-up page: Error initializing language:", error);
      }
    };

    void initLanguage().catch((error) => {
      console.error(
        "Sign-up page: Unhandled error during language initialization:",
        error,
      );
    });
  }, []);

  // New fields for design
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  // Removed phoneNumber state
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pendingVerification, setPendingVerification] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<newErrorType>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [otpCode, setOtpCode] = useState<string>("");

  // Validation helper
  const validate = () => {
    const newErrors: newErrorType = {};
    if (!firstname) newErrors.firstname = t("firstNameRequired");
    if (!lastname) newErrors.lastname = t("lastNameRequired");
    if (!email) newErrors.email = t("emailRequired");
    // Removed phone number validation
    if (!password) newErrors.password = t("passwordRequired");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!isLoaded) return;
    setError(null);
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      await signUp.create({
        emailAddress: email,
        password,
        firstName: firstname,
        lastName: lastname,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
      setError(null);
    } catch (err: any) {
      console.log("Sign up error:", err);

      if (err.errors) {
        const passwordError = err.errors.find(
          (error: { code: string }) => error.code === "form_password_pwned",
        );
        const lengthError = err.errors.find(
          (error: { code: string }) =>
            error.code === "form_password_length_too_short",
        );
        setError(null);
        if (passwordError)
          setError(
            "Your password has been found in a data breach, Please use a different password",
          );
        else if (lengthError)
          setError("Your password must be at least 8 characters long");
        else setError(err.errors[0]?.message || "Sign up failed");
      } else {
        setError("Unknown Error occurred");
      }
    }
    setIsSubmitting(false);
  };

  const handleVerify = async () => {
    if (!isLoaded) return;
    setError(null);
    setIsSubmitting(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: otpCode,
      });
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("../home");
      } else {
        setError("Verification failed. Please try again.");
      }
    } catch (err: any) {
      if (err.errors && err.errors.length > 0) {
        const verificationError = err.errors[0];
        if (verificationError.code === "verification_already_verified") {
          try {
            const signInAttempt = await signIn?.create({
              identifier: email,
              password,
            });
            if (signInAttempt?.status === "complete") {
              await setActive({ session: signInAttempt.createdSessionId });
              router.replace("../home");
            } else {
              setError("Email already verified. Please sign in.");
            }
          } catch (signInErr) {
            setError("Email already verified. Please sign in.");
          }
        } else if (verificationError.code === "verification_expired") {
          setError("Verification code has expired. Please request a new one");
        } else {
          setError(verificationError.message || "Invalid verification code");
        }
      } else {
        setError("Invalid verification code. Please try again.");
      }
    }
    setIsSubmitting(false);
  };

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
        <View className="mb-5 flex items-center justify-center">
          <View className="mt-20 flex-row items-center justify-center gap-7">
            <AppImage
              source={require("../../assets/images/icon.png")}
              className="h-[58px] w-[58px] rounded-xl"
            />
            <AppText className="text-4xl text-text dark:text-dark-text">
              Finance.io
            </AppText>
          </View>
          {pendingVerification ? (
            <AppText className="mx-5 mb-20 flex text-text dark:text-dark-text">
              {t("verificationCodeSent", { email })}
            </AppText>
          ) : null}
        </View>

        {!pendingVerification ? (
          <>
            <AppText className="my-[5px] ml-6 text-base text-text dark:text-dark-text">
              {t("firstName")}
            </AppText>
            <TextInput
              className="my-[6px] h-[70px] rounded-[15px] bg-secondary p-2.5 pl-5 text-text dark:bg-dark-secondary dark:text-dark-text"
              placeholder={t("John")}
              placeholderTextColor="gray"
              value={firstname}
              onChangeText={setFirstname}
            />
            {errors.firstname && (
              <AppText className="ml-6 mt-[1px] text-sm text-danger">
                {errors.firstname}
              </AppText>
            )}

            <AppText className="my-[5px] ml-6 text-base text-text dark:text-dark-text">
              {t("lastName")}
            </AppText>
            <TextInput
              className="my-[6px] h-[70px] rounded-[15px] bg-secondary p-2.5 pl-5 text-text dark:bg-dark-secondary dark:text-dark-text"
              placeholder={t("Doe")}
              placeholderTextColor="gray"
              value={lastname}
              onChangeText={setLastname}
            />
            {errors.lastname && (
              <AppText className="ml-6 mt-[1px] text-sm text-danger">
                {errors.lastname}
              </AppText>
            )}

            {/* TODO: Need to add phone number */}

            <AppText className="my-[5px] ml-6 text-base text-text dark:text-dark-text">
              {t("email")}
            </AppText>
            <TextInput
              className="my-[6px] h-[70px] rounded-[15px] bg-secondary p-2.5 pl-5 text-text dark:bg-dark-secondary dark:text-dark-text"
              placeholder={t("jamesdoe@gmail.com")}
              placeholderTextColor="gray"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && (
              <AppText className="ml-6 mt-[1px] text-sm text-danger">
                {errors.email}
              </AppText>
            )}

            <AppText className="my-[5px] ml-6 text-base text-text dark:text-dark-text">
              {t("password")}
            </AppText>
            <TextInput
              className="my-[6px] h-[70px] rounded-[15px] bg-secondary p-2.5 pl-5 text-text dark:bg-dark-secondary dark:text-dark-text"
              placeholder={t("**********")}
              placeholderTextColor="gray"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {errors.password && (
              <AppText className="ml-6 mt-[1px] text-sm text-danger">
                {errors.password}
              </AppText>
            )}

            {error && (
              <AppText className="mt-[5px] text-xs text-danger">
                {error}
              </AppText>
            )}

            <Button
              onPress={handleSignup}
              disabled={isSubmitting}
              accessibilityLabel={t("createAccount")}
              accessibilityHint="Create a new account"
              accessibilityRole="button"
            >
              {isSubmitting ? t("creatingAccount") : t("createAccount")}
            </Button>

            <TouchableOpacity
              onPress={() => router.push("./sign-in")}
              accessibilityLabel={t("alreadyHaveAccount")}
              accessibilityHint="Sign in to your account"
              accessibilityRole="link"
            >
              <AppText className="pt-2.5 text-center text-text dark:text-dark-text">
                {t("alreadyHaveAccount")}{" "}
                <AppText className="font-bold underline">{t("signIn")}</AppText>
                <AppText>🥳</AppText>
              </AppText>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <InputOtp onCodeChange={setOtpCode} />
            <Button
              onPress={handleVerify}
              disabled={isSubmitting}
              accessibilityLabel={isSubmitting ? t("verifying") : t("verify")}
              accessibilityRole="button"
            >
              {isSubmitting ? t("verifying") : t("verify")}
            </Button>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
